import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icons/apple-touch-icon.png', 'icons/maskable-icon-192x192.png'],
      manifest: {
        name: 'PC Futbol Remake',
        short_name: 'PC Futbol',
        description: 'Un juego de gestión de fútbol inspirado en el clásico PC Futbol 7',
        theme_color: '#1e40af',
        background_color: '#1e40af',
        display: 'standalone',
        start_url: './index.html',
        orientation: 'landscape',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icons/maskable-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'icons/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
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
