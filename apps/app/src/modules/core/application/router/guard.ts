import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from 'vue-router'

import { useAuthStore } from '@/modules/auth/infrastructure/store/useAuthStore'
import { ROUTES } from '@/modules/core/application/router/routes'
import { useUserStore } from '@/modules/user/infrastructure/store/useUserStore'

export const redirectIfAuthenticated = (to: RouteLocationNormalized) => {
  const authStore = useAuthStore()

  if (to.name === ROUTES.auth.login.name && authStore.isAuthenticated) {
    return { name: ROUTES.live.name }
  }

  return null
}

export const checkAuth = (to: RouteLocationNormalized) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: ROUTES.auth.login.name,
      query: { redirect: to.fullPath },
    }
  }

  return null
}

export const checkAdmin = (to: RouteLocationNormalized) => {
  const userStore = useUserStore()

  if (to.meta.requiresAdmin && !userStore.isAdmin) {
    return { name: ROUTES.live.name }
  }

  return null
}

const guardPipeline = [redirectIfAuthenticated, checkAuth, checkAdmin]

export const runGuardPipeline = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoaded,
  next: NavigationGuardNext
) => {
  for (const guardCheck of guardPipeline) {
    const redirect = guardCheck(to)

    if (redirect) {
      return next(redirect)
    }
  }

  return next()
}
