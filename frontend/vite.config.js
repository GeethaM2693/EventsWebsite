import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Forward /api to the Express backend so the browser sees one origin (no CORS setup needed in dev).
    proxy: { '/api': 'http://localhost:5001' },
  },
})
