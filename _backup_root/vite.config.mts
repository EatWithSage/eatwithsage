import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import history from 'connect-history-api-fallback'

const r = (p: string) => path.resolve(fileURLToPath(new URL('.', import.meta.url)), p)

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': r('src')
    }
  },
  plugins: [
    react(),
    {
      name: 'spa-fallback',
      configureServer(server) {
        server.middlewares.use(history())
      }
    }
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    host: true,
    port: 4173,
    strictPort: true,
    allowedHosts: 'all'
  }
})
