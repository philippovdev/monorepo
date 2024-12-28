import { createApp } from 'vue'
import 'uno.css'
import './assets/styles/main.scss'

import App from './App.vue'
import PrimeVue from 'primevue/config';
import { router } from '@/modules/core/application/router'
import { pinia } from '@/modules/core/application/store'
import { ONVP_PRESET } from '@/modules/core/application/ui/primeVuePreset.ts'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(PrimeVue, { theme: { preset: ONVP_PRESET } })

app.mount('#app')
