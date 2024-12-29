import { useAuthController } from '@/modules/auth/domain/auth.controller'
import { useUserController } from '@/modules/user/domain/user.controller'

export const useCoreController = () => {
  const authController = useAuthController()
  const userController = useUserController()
  const init = async () => {
    await authController.csrf()
    await userController.getUser()
  }

  return { init }
}
