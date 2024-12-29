import type { LoginPayload } from '@/modules/auth/domain/types'
import { client, clientV2 } from '@/modules/core/infrastructure/http'

export const useAuthApi = () => {
  const login = (data: LoginPayload) =>
    clientV2.post<(data: LoginPayload) => void>('/users/login', data)
  const csrf = () => client.get('/sanctum/csrf-cookie')

  return { csrf, login }
}
