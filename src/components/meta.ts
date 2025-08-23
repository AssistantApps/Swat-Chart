import meta from '@/assets/meta.json';

export type PackageMetaType = {
  packageVersion: string;
  date: string;
  gitCommitHash: string;
};

export const packageMeta = (): PackageMetaType => meta;
