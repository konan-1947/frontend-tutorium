import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Backend chạy trên cổng 3001
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') 
      },
      '/auth': {
        target: 'http://localhost:3001', // Chuyển hướng sang backend
        changeOrigin: true,
        secure: false,
      },
    }
  }
});