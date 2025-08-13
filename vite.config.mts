import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const r = (p: string) => path.resolve(fileURLToPath(new URL('.', import.meta.url)), p)

export default defineConfig({
  root: 'client',
  resolve: {
    alias: {
      '@': r('client/src'),
    },
  },
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
