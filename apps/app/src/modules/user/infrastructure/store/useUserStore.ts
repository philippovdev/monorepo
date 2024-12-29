import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { User } from '@/modules/user/domain/types'

export const useUserStore = defineStore('userStore', () => {
  const user = ref<User | null>(null)

  const isAdmin = computed(() => {
    return user.value?.is_admin ?? false
  })

  function onSetUser(_user: User) {
    user.value = _user
  }

  function $reset() {
    user.value = null
  }

  return {
    user,
    isAdmin,

    onSetUser,
    $reset,
  }
})
