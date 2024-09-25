import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// you can copy the base structure of manifest object.
const manifestForPlugIn = {
  name: 'React-vite-app',
  short_name: 'react-vite-app',
  description: 'I am a simple vite app',
  icons: [
    {
      src: '/pwa-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/pwa-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
    {
      src: '/maskable_icon.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: '/maskable_icon.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],
  theme_color: '#000000',
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: manifestForPlugIn,
      devOptions: { enabled: true },
    }),
  ],
  server: {
    port: 3000,
  },
  test: { environment: 'happy-dom' }, // vitest's config
});
