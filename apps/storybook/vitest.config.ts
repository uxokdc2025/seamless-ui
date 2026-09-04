import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@seamless/tokens': path.resolve(__dirname, '../../packages/tokens/src'),
      '@seamless/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@seamless/layout': path.resolve(__dirname, '../../packages/layout/src'),
      '@seamless/saas': path.resolve(__dirname, '../../packages/saas/src'),
      '@seamless/ai': path.resolve(__dirname, '../../packages/ai/src'),
      '@seamless/themes': path.resolve(__dirname, '../../packages/themes/src'),
      '@seamless/blocks': path.resolve(__dirname, '../../packages/blocks/src'),
    },
  },
});
