import 'uno.css'
import 'virtual:uno.css'
import 'primeicons/primeicons.css'
import './assets/styles/main.scss'

import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import { router } from '@/modules/core/application/router'
import { pinia } from '@/modules/core/application/store'
import { ONVP_PRESET } from '@/modules/core/application/ui/primeVuePreset'
import { createChargebeePlugin } from '@/modules/core/infrastructure/plugins/chargebee'

import App from './App.vue'
import { useCoreController } from './modules/core/domain/core.controller'

const app = createApp(App)

const bootstrap = async () => {
  app.use(
    createChargebeePlugin({ site: import.meta.env.VITE_CHARGEBEE_SITE_ID })
  )
  app.use(pinia)

  const coreController = useCoreController()
  await coreController.init()

  app.use(router)
  app.use(PrimeVue, { theme: { preset: ONVP_PRESET } })

  app.mount('#app')
}

bootstrap()
