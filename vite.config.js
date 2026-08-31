import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import fs from 'node:fs'

// Deployed under a subpath? set BASE_PATH at build time (e.g. GitHub Pages).
const base = process.env.BASE_PATH || '/'

// Installing to a home screen and working offline both need a secure origin,
// which a phone on the LAN doesn't get over plain http. `HTTPS=1` serves with
// the self-signed cert in .certs/ so the real thing can be tested on a phone.
// See README, "Testing on a phone". Never used for the production build.
const https =
  process.env.HTTPS && fs.existsSync('.certs/cert.pem')
    ? { key: fs.readFileSync('.certs/key.pem'), cert: fs.readFileSync('.certs/cert.pem') }
    : undefined

export default defineConfig({
  base,
  server: { host: true, https },
  preview: { host: true, https },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.png'],
      workbox: {
        // The whole course ships in the JS bundle, so precaching the build
        // is enough to make every lesson work with no connection at all.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        cleanupOutdatedCaches: true,
        navigateFallback: base + 'index.html',
      },
      manifest: {
        name: 'Computer Basics',
        short_name: 'Basics',
        description: 'Learn to use a computer, one short lesson at a time.',
        start_url: base,
        scope: base,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#f7f5f0',
        theme_color: '#f7f5f0',
        lang: 'en',
        categories: ['education'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
})
