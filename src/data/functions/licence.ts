import fs from 'node:fs/promises';
import path from 'node:path';

import { fileExists, writeLinesToFile } from '@/data/helpers/fileHelper';

export const createLicenseSummary = async (props: {
  directory: string; //
  pathToNodeModules?: string;
  pathToPackageJson?: string;
  output: {
    mdFile?: string;
    jsonFile?: string;
  };
}) => {
  const outputsNotNull = [props.output?.mdFile, props.output?.jsonFile].filter((o) => o != null).length;
  if (outputsNotNull < 1) {
    console.error('❌ lic - No outputs specified');
    return;
  }

  const pathToNodeModules = props.pathToNodeModules ?? '../../node_modules';
  const pathToPackageJson = props.pathToPackageJson ?? '../../package.json';
  const rootPackagePath = path.join(props.directory, pathToPackageJson);
  const rootPackageContent = await fs.readFile(rootPackagePath, 'utf-8');
  const rootPackageContentObj = JSON.parse(rootPackageContent);

  const packages: Array<string> = [];
  for (const depName in rootPackageContentObj.dependencies) {
    packages.push(depName);
  }
  for (const depName in rootPackageContentObj.devDependencies) {
    packages.push(depName);
  }
  const sortedPackages = packages.sort((a, b) => a.localeCompare(b));

  const details: Array<IPackageDetails> = [];
  for (const packageItem of sortedPackages) {
    const packageDetail = await getPackageDetails(props.directory, packageItem, pathToNodeModules);
    if (packageDetail == null) {
      console.error(`❌ lic - ${packageItem} - missing details`);
      continue;
    }
    details.push(packageDetail);
  }

  let numLicences = details.length;
  const generatedDateFormat = new Date().toISOString().slice(0, 10);
  if (props.output?.jsonFile != null) {
    const json = {
      generatedDate: new Date(),
      generatedDateFormat,
      list: details,
    };
    try {
      await writeLinesToFile(JSON.stringify(json, null, 2), props.output?.jsonFile);
      console.log(`✅ lic - packagesUsed.json was created (containing ${numLicences} licences)`);
    } catch (ex) {
      console.error(`❌ lic - Failed to write packagesUsed.json. Err: ${ex?.toString?.()}`);
    }
  }

  if (props.output?.mdFile != null) {
    const mdFileLines: Array<string> = [
      '# Packages used',
      '',
      '| Package | Version | Type | Link |',
      '|---|---|:-:|:-:|',
    ];
    for (const packageDetail of details) {
      const line = getMarkdownRowFromPackageDetails(packageDetail);
      mdFileLines.push(line);
    }
    mdFileLines.push(`\nGenerated on ${generatedDateFormat}\n`);

    try {
      await writeLinesToFile(mdFileLines.join('\n'), props.output?.mdFile);
      console.log(`✅ lic - packagesUsed.md was created (containing ${numLicences} licences)`);
    } catch (ex) {
      console.error(`❌ lic - Failed to write packagesUsed.md. Err: ${ex?.toString?.()}`);
    }
  }
};

const getMarkdownRowFromPackageDetails = (details: IPackageDetails) => {
  const lines: Array<string> = [
    `| [${details.name}](https://www.npmjs.com/package/${details.name})`,
    `${details.version}`,
    `[${
      details.licenseType
    }](https://choosealicense.com/licenses/${details.licenseType.toLowerCase()}){target="_blank"}`,
  ];

  if (details.licenceUrl != null) {
    lines.push(`[LICENCE](${details.licenceUrl})|`);
  } else {
    lines.push(' |');
  }

  return lines.join(' | ');
};

interface IPackageDetails {
  name: string;
  version: string;
  licenseType: string;
  repoUrl?: string;
  licenceUrl?: string;
}

const getPackageDetails = async (
  directory: string,
  packageName: string,
  pathToNodeModules: string,
): Promise<IPackageDetails | undefined> => {
  const packagePath = path.join(directory, pathToNodeModules, packageName);
  const packageJsonPath = path.join(packagePath, 'package.json');

  const packageJsonExists = await fileExists(packageJsonPath);
  if (packageJsonExists == false) {
    console.error(`❌ lic - ${packageName} - missing package.json`);
    return;
  }

  const possibleLicenceFileNames = ['LICENSE', 'LICENSE.md'];
  let licenceName = '';
  let licencePath = '';
  let licenceExists = false;
  for (const possibleLicense of possibleLicenceFileNames) {
    licenceName = `${possibleLicense}`;
    licencePath = path.join(packagePath, possibleLicense);
    licenceExists = await fileExists(licencePath);
    if (licenceExists == true) break;
  }

  const packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8');
  const packageJsonContentObj = JSON.parse(packageJsonContent);

  let item: IPackageDetails = {
    name: packageName,
    version: packageJsonContentObj.version,
    licenseType: packageJsonContentObj.license,
  };

  const repoUrl = packageJsonContentObj.repository?.url;
  if (repoUrl != null) {
    item.repoUrl = repoUrl.replace('git+https', 'https');
    const potentialLicenceUrl = `${repoUrl
      .replace('.git', '')
      .replace('git+https', 'https')}/blob/master/${licenceName}`;
    item.licenceUrl = await testLicenceUrl(potentialLicenceUrl);
  } else {
    item.repoUrl = `https://www.npmjs.com/package/${item.name}`;
  }
  return item;
};

const goodStatusCodes = [200, 302];
export const testLicenceUrl = async (licenceUrl: string): Promise<string | undefined> => {
  if ((licenceUrl?.length ?? 0) < 1) return undefined;
  let localUrl = `${licenceUrl}` //
    .replace('git+ssh://', '')
    .replace('git+http', 'http')
    .replace('git://', 'https://')
    .replace('github.com:', 'github.com/')
    .replace('git@github', 'https://github');
  if (localUrl.startsWith('http') == false) {
    console.error(`❌ lic - ${localUrl}`);
    return;
  }

  let netResult = await fetch(localUrl);
  if (goodStatusCodes.includes(netResult.status)) return localUrl;

  if (localUrl.includes('/main/')) {
    localUrl = localUrl.replace('/main/', '/master/');
    netResult = await fetch(localUrl);
    if (goodStatusCodes.includes(netResult.status)) return localUrl;
  }
};
