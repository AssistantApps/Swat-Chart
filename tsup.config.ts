import { defineConfig } from 'tsup';
import fs from 'fs';
import path from 'path';

function updatePackageJson() {
  const pkgPath = path.resolve(__dirname, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  pkg.exports = {
    '.': {
      import: './dist/swat.export.js',
    },
  };

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}

export default defineConfig((options) => {
  const isWatching = !!options.watch;

  if (!isWatching) {
    updatePackageJson();
  }

  return {
    entry: ['src/swat.export.ts'],
    format: ['esm'],
    sourcemap: false,
    splitting: true,
    minify: true,
    clean: true,
    dts: true,
    outDir: 'dist',
    target: 'esnext',
  };
});
