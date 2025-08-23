import path from 'node:path';
import url from 'node:url';

import { createLicenseSummary } from '@/data/functions/licence';
import { createOutdatedPackagesSummary } from '@/data/functions/outdatedPackages';

const currentFileName = url.fileURLToPath(import.meta.url);
const directory = path.dirname(currentFileName);

const report = async () => {
  console.log('Report');

  const otherProps = {
    pathToNodeModules: '../../node_modules',
    pathToPackageJson: '../../package.json',
    output: {
      mdFile: './docs/packagesUsed.md',
      jsonFile: './src/assets/packagesUsed.json',
    },
  };

  const tasks = [
    createLicenseSummary({ directory, ...otherProps }), //
    createOutdatedPackagesSummary({ directory }),
  ];
  await Promise.all(tasks);
};

report();
