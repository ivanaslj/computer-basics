import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import fs from 'node:fs'

// Deployed under a subpath? set BASE_PATH at build time (e.g. GitHub Pages).
const base = process.env.BASE_PATH || '/'

// Shown in Settings > About. When someone reports that a change is missing,
// this says immediately whether they are on an old cached build or whether the
// change genuinely isn't there.
const buildId =
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || new Date().toISOString().slice(0, 10)

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
  define: { __BUILD_ID__: JSON.stringify(buildId) },
  server: { host: true, https },
  preview: { host: true, https },
  build: {
    // Every course's text ships in the bundle so the app works offline from
    // the first load. That puts it over Vite's default 500 kB warning, which
    // measures uncompressed size — the number that actually crosses the wire
    // is roughly a third of that, downloaded once and then cached forever.
    //
    // When this does become a real problem, the fix is loading each course's
    // modules on demand rather than all of them up front. That means making
    // the course registry async, so it is its own change, not a tweak here.
    chunkSizeWarningLimit: 900,
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      // The plugin's own injected snippet only calls register() and then
      // forgets about it, so a phone that already has the app keeps running
      // the build it first loaded — forever. src/lib/updates.js registers
      // instead, and reloads when a new version takes over.
      injectRegister: null,
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
