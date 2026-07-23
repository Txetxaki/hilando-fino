import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts', 'tools/**/*.spec.mjs'],
    environment: 'node',
    globals: true
  }
});
