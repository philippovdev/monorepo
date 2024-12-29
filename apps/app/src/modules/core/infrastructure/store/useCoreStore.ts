import { defineStore } from 'pinia'

import { useCoreController } from '@/modules/core/domain/core.controller'

export const useCoreStore = defineStore('coreStore', () => {
  const coreController = useCoreController()
  const init = async () => {
    await coreController.init()
  }

  return { init }
})
