import type { RouteRecordRaw } from 'vue-router'

import LoginView from '@/modules/auth/presentation/pages/LoginView.vue'
import { ROUTES } from '@/modules/core/application/router/routes'

export const authRoutes: RouteRecordRaw[] = [
  {
    name: ROUTES.auth.login.name,
    path: ROUTES.auth.login.path,
    component: LoginView,
    meta: {
      requiresAuth: false,
      layout: 'guest',
    },
  },
]
