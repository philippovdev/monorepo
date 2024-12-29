import type { RouteRecordRaw } from 'vue-router'

import { ROUTES } from '@/modules/core/application/router/routes'
import LiveView from '@/modules/live/presentation/pages/LiveView.vue'

export const liveRoutes: RouteRecordRaw[] = [
  {
    path: ROUTES.home.path,
    name: ROUTES.home.name,
    redirect: { name: ROUTES.live.name },
  },
  {
    path: ROUTES.live.path,
    name: ROUTES.live.name,
    component: LiveView,
    meta: {
      requiresAuth: true,
      layout: 'user',
    },
  },
]
