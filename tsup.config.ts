import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    minify: true,
    sourcemap: true,
    treeshake: true,
  },
  {
    entry: ['src/index.ts'],
    format: ['iife'],
    globalName: 'Radman',
    minify: true,
    sourcemap: true,
    noExternal: ['uqr'],
    treeshake: true,
  },
]);
