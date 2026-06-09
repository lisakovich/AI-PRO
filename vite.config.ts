import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './'  // <--- Эта строка заставляет пути к CSS и JS стать относительными
})