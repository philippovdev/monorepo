import LiveView from '@/modules/live/presentation/pages/LiveView.vue'
import { ROUTES } from '@/modules/core/application/router/routes'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from 'onvp-app/src/modules/auth/infrastructure/store/useAuthStore'

export const liveRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: () => {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated) return { name: ROUTES.live.name }
      return { name: ROUTES.auth.login.name }
    }
  },
  {
    path: ROUTES.live.path,
    name: ROUTES.live.name,
    component: LiveView
  }
]
