import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Ensure this matches the port you're using
    open: true, // Automatically open the browser
  },
  resolve: {
    alias: {
      // Optional: Add aliases if needed for easier imports
      '@': '/src',
    },
  },
});