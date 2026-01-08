import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: false,
  clean: true,
  sourcemap: false,
  external: [],
  bundle: false,
  splitting: false,
  minify: false,
  shims: false,
  target: 'node18',
  platform: 'node',
});
