import type { LoginPayload } from '@/modules/auth/domain/types'
import { useAuthApi } from '@/modules/auth/infrastructure/http/auth.http'

const api = useAuthApi()

export const useAuthService = () => {
  const login = (payload: LoginPayload) => api.login(payload)
  const csrf = () => api.csrf()

  return { login, csrf }
}
