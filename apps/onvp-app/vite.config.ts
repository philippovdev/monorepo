import { fileURLToPath, URL } from 'node:url'

import unoCssConfig from '@onvp/ui/unocss'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: 'local-app.staging-onvp.click',
    port: 8080,
  },
  plugins: [vue(), mkcert(), UnoCSS(unoCssConfig), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
