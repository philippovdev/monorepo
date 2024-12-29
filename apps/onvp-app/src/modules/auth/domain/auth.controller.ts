import { computed, reactive } from 'vue'

import type { LoginPayload } from '@/modules/auth/domain/types'
import { useAuthStore } from '@/modules/auth/infrastructure/store/useAuthStore'
import type {
  AuthErrorState,
  AuthLoadingState,
} from '@/modules/core/domain/types'

import { useAuthService } from './auth.service'

export const useAuthController = () => {
  const authService = useAuthService()
  const authStore = useAuthStore()
  const loadingState = reactive<AuthLoadingState>({} as AuthLoadingState)
  const errorState = reactive<AuthErrorState>({} as AuthErrorState)

  const googleUrl = computed(() => {
    return `${import.meta.env.VITE_API_BASE_URL}/api/users/login/google`
  })

  async function csrf() {
    return await authService.csrf()
  }

  async function onLogin(payload: LoginPayload) {
    loadingState.onLogin = true

    try {
      await authService.login(payload)
      authStore.onSetAuthenticated(true)
      errorState.onLogin = null
    } catch (error) {
      errorState.onLogin = error
      authStore.onSetAuthenticated(false)
    } finally {
      loadingState.onLogin = false
    }
  }

  async function onSubmitGoogleForm() {
    const callbackUrl = window.location.origin + '/oauth-callback'
    const googleUrlWithCallback = `${googleUrl.value}?redirectUrl=${encodeURIComponent(callbackUrl)}`

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = googleUrlWithCallback

    document.body.appendChild(form)
    form.submit()
  }

  return {
    loadingState,
    errorState,

    onSubmitGoogleForm,
    onLogin,
    csrf,
  }
}
