import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
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
    port: 5175,
    strictPort: false,
    hmr: {
      port: 5175,
      host: '0.0.0.0'
    },
    cors: true,
    open: false
  },

  build: {
    outDir: 'dist',
    sourcemap: true
  },

  // Handle TypeScript properly
  esbuild: {
    target: 'es2020'
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom']
  },

  // Preview configuration for production builds
  preview: {
    host: '0.0.0.0',
    cors: true,
    strictPort: false
  }
})