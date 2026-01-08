import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.{test,spec.ts}'],
    exclude: ['node_modules', 'dist'],
    environment: 'node',
  coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'lcovonly'],
      exclude: [
        'tests/**',
        '**/*.test.ts',
        '**/*.spec.ts',
        'node_modules/**',
        'dist/**',
      ],
    },
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    },
    watch: false,
    globals: true,
    testTimeout: 10000,
  },
});
