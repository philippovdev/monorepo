import LiveView from '@/modules/live/presentation/pages/LiveView.vue'
import { ROUTES } from '@/modules/core/application/router/routes.ts'
import type { RouteRecordRaw } from 'vue-router'

export const liveRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: ROUTES.live.name }
  },
  {
    path: ROUTES.live.path,
    name: ROUTES.live.name,
    component: LiveView
  }
]
