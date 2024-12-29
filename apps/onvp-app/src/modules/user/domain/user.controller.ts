import { reactive } from 'vue'

import { useAuthStore } from '@/modules/auth/infrastructure/store/useAuthStore'
import type {
  UserErrorState,
  UserLoadingState,
} from '@/modules/user/domain/types'
import { useUserService } from '@/modules/user/domain/user.service'
import { useUserStore } from '@/modules/user/infrastructure/store/useUserStore'

export const useUserController = () => {
  const userService = useUserService()
  const userStore = useUserStore()
  const authStore = useAuthStore()

  const loadingState = reactive<UserLoadingState>({} as UserLoadingState)
  const errorState = reactive<UserErrorState>({} as UserErrorState)

  const getUser = async () => {
    loadingState.getUser = true

    try {
      const user = await userService.getUser()

      if (user) {
        userStore.onSetUser(user)
        authStore.onSetAuthenticated(true)
      }
    } catch (error) {
      errorState.getUser = error
      authStore.onSetAuthenticated(false)
    } finally {
      loadingState.getUser = false
    }
  }

  return { loadingState, errorState, getUser }
}
