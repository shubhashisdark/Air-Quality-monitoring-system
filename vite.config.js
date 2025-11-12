// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'], // move react libraries to separate chunk
          vendor: ['axios', 'chart.js'], // example: move other libs if needed
        },
      },
    },
  },
});
