import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    hmr: false,
    cors: true,
    open: false,
    // Use polling for file watching in container environments
    watch: {
      usePolling: true,
      interval: 100
    }
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