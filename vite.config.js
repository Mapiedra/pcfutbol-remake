import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },
  build: {
    target: 'ES2020',
    outDir: 'dist',
    sourcemap: process.env.VITE_APP_ENV !== 'production',
    minify: 'terser',
  },
  base: './',
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
})
