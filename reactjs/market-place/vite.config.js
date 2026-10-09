import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <- ongeraho uyu murongo

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <- n'uyu hano
  ],
})