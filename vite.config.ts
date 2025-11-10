import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',               // dominio propio en la raíz: https://hargna.com
  build: {
    outDir: 'docs',        // Vite generará la web final en /docs
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
