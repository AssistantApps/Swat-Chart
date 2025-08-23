import path from 'node:path';
import url from 'node:url';

import { generateMeta } from '@/data/functions/generateMeta';
import { generateExports } from '@/data/functions/generateExports';

const currentFileName = url.fileURLToPath(import.meta.url);
const directory = path.dirname(currentFileName);

const preBuild = async () => {
  console.log('PreBuild');

  const otherProps = {
    metaOutputPath: './src/assets/meta.json',
  };

  const tasks = [
    generateMeta({ directory, ...otherProps }), //
    generateExports({ directory }), //
  ];
  await Promise.all(tasks);
};

preBuild();
