import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  server: {
    port: 5256,
    http: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  },

  build: {
    chunkSizeWarningLimit: 700,
  },

  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: true,
    }),
  ],
});
