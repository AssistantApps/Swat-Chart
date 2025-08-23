import { writeLinesToFile } from '@/data/helpers/fileHelper';
import { execute } from '@/data/functions/executeProcess';
import { getPackageVersion } from './packageVersion';

export const generateMeta = async (props: {
  directory: string; //
  metaOutputPath: string;
  extraRecords?: Record<string, string>;
}) => {
  const metaRecord: Record<string, string> = props.extraRecords ?? {};

  metaRecord.packageVersion = getPackageVersion();
  metaRecord.date = new Date().toISOString().slice(0, 10);

  const gitCommitHashResult = await execute({ args: ['git rev-parse HEAD'], workingDir: props.directory });
  if (gitCommitHashResult.isSuccess) metaRecord.gitCommitHash = (gitCommitHashResult.value ?? '').trim();

  try {
    await writeLinesToFile(JSON.stringify(metaRecord, null, 2), props.metaOutputPath);
    console.log(`✅ meta - Meta json was created`);
  } catch (ex) {
    console.error(`❌ meta - Failed to write meta.json. Err: ${ex?.toString?.()}`);
  }
};
