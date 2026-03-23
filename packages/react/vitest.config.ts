import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@ajentik/doo-iconik',
        replacement: path.resolve(__dirname, '../core/src/index.ts'),
      },
    ],
  },
  test: {
    include: ['src/__tests__/**/*.test.tsx'],
    environment: 'jsdom',
  },
});
