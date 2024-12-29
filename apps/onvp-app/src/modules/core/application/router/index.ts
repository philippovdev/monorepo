import { createRouter, createWebHistory } from 'vue-router'

import { authRoutes } from '@/modules/auth/application/router'
import { runGuardPipeline } from '@/modules/core/application/router/guard'
import { liveRoutes } from '@/modules/live/application/router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...liveRoutes, ...authRoutes],
})

router.beforeEach(runGuardPipeline)
