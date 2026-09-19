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

    proxy: {
      '/uploads': {
        target: 'http://172.16.68.238:5277',
        changeOrigin: true,
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
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }),
  ],
});
