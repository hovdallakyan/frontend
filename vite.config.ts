import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Forward /api/* to the NestJS backend during development so the
    // frontend never talks to PokéAPI directly and we avoid CORS in dev.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
