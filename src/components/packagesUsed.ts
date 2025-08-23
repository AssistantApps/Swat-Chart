import packages from '@/assets/packagesUsed.json';

export type PackagesUsedType = {
  generatedDate: string;
  generatedDateFormat: string;
  list: Array<PackagesUsedItemType>;
};
export type PackagesUsedItemType = {
  name: string;
  version: string;
  licenseType: string;
  repoUrl: string;
  licenceUrl?: string;
};

export const packagesUsed = (): PackagesUsedType => packages;
