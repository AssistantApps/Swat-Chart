import { writeLinesToFile } from '@/data/helpers/fileHelper';
import { execute } from '@/data/functions/executeProcess';

const outputFile = 'packageUpdates.md';
export const createOutdatedPackagesSummary = async (props: {
  directory: string; //
}) => {
  const cliOut = await execute({
    args: ['npx --yes npm-check-updates'],
    workingDir: props.directory,
  });

  if (cliOut.isSuccess == false) {
    console.error(`❌ pkg - Failed to check updates when writing write ${outputFile}. Err: ${cliOut.errorMessage}`);
    return;
  }

  let keyword = 'package.json\n\n';
  let keywordIndex = cliOut.value.indexOf(keyword);
  let content = cliOut.value.substring(keywordIndex + keyword.length);

  keyword = 'Run npx npm-check-updates';
  keywordIndex = content.indexOf(keyword);
  content = content.substring(0, keywordIndex);

  const mdFileLines: Array<string> = [
    '# Packages that have available updates', //
    '',
  ];

  if (content.length > 10) {
    mdFileLines.push('| Package | Version | Latest |');
    mdFileLines.push('|---|:-:|:-:|');
    for (const line of content.split('\n')) {
      const parsed = parseOutput(line);
      if (parsed == null) {
        continue;
      }
      const packageLink = `[${parsed.name}](https://www.npmjs.com/package/${parsed.name})`;
      mdFileLines.push(`| ${packageLink} | ${parsed.currentVersion} | ${parsed.availableVersion} |`);
    }
    mdFileLines.push('\nRun `npx npm-check-updates -u` to upgrade');
  } else {
    mdFileLines.push('All packages are up to date 😁');
  }

  mdFileLines.push(`\nGenerated on ${new Date().toISOString().slice(0, 10)}\n`);

  try {
    await writeLinesToFile(mdFileLines.join('\n'), `./docs/${outputFile}`);
    console.log(`✅ pkg - ${outputFile} was created`);
  } catch (ex) {
    console.error(`❌ pkg - Failed to write ${outputFile}. Err: ${ex?.toString?.()}`);
  }
};

interface IUpdatePackageOutputParsed {
  name: string;
  currentVersion: string;
  availableVersion: string;
}
const parseOutput = (line: string): IUpdatePackageOutputParsed | undefined => {
  if (line.length < 10) return;
  const outLines: Array<string> = [];
  let tempOutLine: string = '';
  let isInWhitespace = false;
  for (const char of line.trim()) {
    if (char.trim().length < 1) {
      if (isInWhitespace == false) {
        outLines.push(`${tempOutLine}`);
        tempOutLine = '';
        isInWhitespace = true;
      }
      continue;
    } else {
      if (isInWhitespace == true) {
        tempOutLine = '';
        isInWhitespace = false;
      }
    }
    tempOutLine += char;
  }
  outLines.push(`${tempOutLine}`);

  return {
    name: outLines[0] ?? '',
    currentVersion: outLines[1] ?? '',
    availableVersion: outLines[3] ?? '',
  };
};
