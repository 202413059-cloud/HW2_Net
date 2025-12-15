import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],

  // 🔴 GitHub Pages 배포용 base 경로
  // 레포 이름이 HW2_Net 이라면 반드시 이 값
  base: '/HW2_Net/',

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
