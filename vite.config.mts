import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: './client',
  publicDir: 'public',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@assets': path.resolve(__dirname, './attached_assets'),
    },
  },

  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    allowedHosts: true,
    hmr: {
      clientPort: 443,
    },
    cors: true,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: '../dist',
    sourcemap: true,
    emptyOutDir: true,
  },

  esbuild: {
    target: 'es2020',
  },

  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})