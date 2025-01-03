import { fileURLToPath, URL } from 'node:url'

import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import unoCssConfig from '@repo/ui/unocss'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3030
  },
  plugins: [
    vue(),
    UnoCSS(unoCssConfig),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
