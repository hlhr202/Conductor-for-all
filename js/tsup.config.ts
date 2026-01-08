import { defineConfig } from 'tsup';
import { copy } from 'fs-extra';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: false,
  clean: true,
  sourcemap: false,
  external: [],
  bundle: true,
  splitting: false,
  minify: false,
  shims: true,
  target: 'node18',
  platform: 'node',
  onSuccess: async () => {
    await copy('../gemini-conductor-codebase', 'dist/templates');
    console.log('Templates copied to dist/templates');
  },
});
