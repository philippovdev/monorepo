import { useUserApi } from '@/modules/user/infrastructure/http/user.http'

const api = useUserApi()

export const useUserService = () => {
  const getUser = () => api.get()

  return { getUser }
}
