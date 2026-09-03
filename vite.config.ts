import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Honour a PORT assigned by the tooling; fall back to Vite's default.
  server: { port: Number(process.env.PORT) || 5173 },
  plugins: [react()],
})
