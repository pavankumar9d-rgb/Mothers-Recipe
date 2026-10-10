import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || './',
  plugins: [react()],
  server: {
    port: 5188,
    strictPort: true,
    open: false,
    watch: {
      ignored: ['**/*.md', '**/.git/**', '**/dist/**', '**/node_modules/**']
    }
  }
});
