import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    base: './',
    define: {
      VITE_API_URL: process.env.VITE_API_URL
    }
  };
});
