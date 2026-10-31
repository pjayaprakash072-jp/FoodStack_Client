import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA(
      {
registerType: "autoUpdate",

      includeAssets: [
        "apple-touch-icon.png",
      ],

      manifest: {
        id: "/",
        name: "FoodStack",
        short_name: "FoodStack",
        description: "Order delicious food from FoodStack.",

        theme_color: "#121063",
        background_color: "#fffaf6",

        display: "standalone",
        orientation: "portrait",
        start_url: "/",

        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      workbox: {
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,woff2}",
        ],

        navigateFallback: "/index.html",

        cleanupOutdatedCaches: true,
      },
      }
    )
  ],
})
