import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',                  // importante para dominio propio en la raíz
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
