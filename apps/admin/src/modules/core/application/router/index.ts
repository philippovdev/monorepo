import { createRouter, createWebHistory } from 'vue-router'
import { liveRoutes } from '@/modules/live/application/router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: liveRoutes
})
