import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',  // important! makes asset paths relative
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'], // optional: separate React
          vendor: ['axios', 'chart.js'], // optional: separate other libs
        },
      },
    },
  },
});