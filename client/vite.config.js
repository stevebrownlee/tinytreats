import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/auth': {
        target: 'https://localhost:7086',
        changeOrigin: true,
        secure: false
      },
      '/products': {
        target: 'https://localhost:7086',
        changeOrigin: true,
        secure: false
      },
      '/orders': {
        target: 'https://localhost:7086',
        changeOrigin: true,
        secure: false
      },
      '/users': {
        target: 'https://localhost:7086',
        changeOrigin: true,
        secure: false
      },
      '/roles': {
        target: 'https://localhost:7086',
        changeOrigin: true,
        secure: false
      }
      // Add any other API endpoints you need
    }
  }
})