import fs from 'node:fs';
import path from 'node:path';
import { writeLinesToFile } from '../helpers/fileHelper';

const outputFile = {
  swat: 'swat.export.ts',
};
const excludedFolders = ['data'];
const excludedFiles = [
  'storybook.ts', // example
  'index.d.ts',
  'preBuild.ts',
  'postBuild.ts',
  'report.ts',
  ...Object.values(outputFile),
];

export const generateExports = async (props: { directory: string }) => {
  const filePaths: Array<string> = [];

  const srcDir = path.join(props.directory, '../');
  const exportPaths = findExportableFiles(srcDir);
  for (const exportPath of exportPaths) {
    if (excludedFolders.some((f) => exportPath.includes(f)) || excludedFiles.includes(exportPath)) {
      continue;
    }
    filePaths.push(exportPath);
  }

  await writeExportFile(filePaths, path.join(props.directory, '../', outputFile.swat));
};

export const removeExports = async (props: { directory: string }) => {
  const files = [outputFile.swat];

  for (const file of files) {
    try {
      fs.unlinkSync(path.resolve(props.directory, file));
      console.log(`✅ Deleted '${file}'`);
    } catch {
      console.error(`❌ Unable to delete '${file}'`);
    }
  }
};

const writeExportFile = async (lines: Array<string>, outputFile: string) => {
  const content = lines.map((p) => `export * from '${p}';`).join('\n');
  const writeResult = await writeLinesToFile(content + '\n', outputFile);

  if (writeResult.isSuccess) console.log(`🤖 Generated ${outputFile} with ${lines.length} exports.`);
  else console.error(`❌ Failed to generate ${outputFile}.`);
};

const findExportableFiles = (dir: string, baseDir = ''): Array<string> => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(baseDir, entry.name);

    if (entry.isDirectory()) {
      if (excludedFolders.includes(entry.name)) return [];

      return findExportableFiles(fullPath, relativePath);
    }

    const isTypescript = entry.name.endsWith('.ts') || entry.name.endsWith('.tsx');
    if (isTypescript == false) return [];

    const isNotTest = entry.name.includes('.test.ts') == false;
    if (isNotTest == false) return [];

    const isNotStory = entry.name.includes('.stories.ts') == false;
    if (isNotStory == false) return [];

    const shouldBeIncluded = excludedFiles.includes(entry.name) == false;
    if (shouldBeIncluded == false) return [];

    return [`./${relativePath.replaceAll('\\', '/').replace(/\.(ts|tsx)$/, '')}`];
  });
};
