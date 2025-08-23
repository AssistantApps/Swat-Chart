import { defineConfig } from 'tsup';
import * as preset from 'tsup-preset-solid';

const entries = [
  {
    name: 'swat',
    entry: 'src/swat.export.ts',
    format: ['esm'],
    sourcemap: false,
    splitting: true,
    minify: true,
    clean: true,
    dts: true,
    outDir: 'dist',
  },
];

const presetOptions: preset.PresetOptions = {
  entries,
  drop_console: false,
  cjs: false,
};

export default defineConfig((config) => {
  const watching = !!config.watch;
  const parsed = preset.parsePresetOptions(presetOptions, watching);

  if (!watching) {
    const pkgExports = preset.generatePackageExports(parsed);
    preset.writePackageJson(pkgExports);
  }

  return preset.generateTsupOptions(parsed);
});
