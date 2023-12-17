import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 设置为true时，运行npm run dev时将自动打开浏览器
    open: true, 
  },
})
