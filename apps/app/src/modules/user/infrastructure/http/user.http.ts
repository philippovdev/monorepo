import { clientV2 } from '@/modules/core/infrastructure/http'
import type { User } from '@/modules/user/domain/types'

export const useUserApi = () => {
  const get = () => clientV2.get<User>('/users')

  return { get }
}
