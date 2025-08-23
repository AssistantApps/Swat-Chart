export const getEnvValue = (property: string, defaultValue?: string): string => {
  let value: string | undefined = undefined;
  value = (import.meta as any)?.env?.[property];

  if (defaultValue != null) {
    return value ?? defaultValue;
  }
  return value ?? '';
};

export const getPackageVersion = () => getEnvValue('npm_package_version');
