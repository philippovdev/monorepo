import { createApp } from 'vue'
import 'uno.css'
import './assets/styles/main.scss'

import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura'
import { router } from '@/modules/core/application/router'
import { pinia } from '@/modules/core/application/store'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(PrimeVue, { theme: { preset: Aura } })

app.mount('#app')
