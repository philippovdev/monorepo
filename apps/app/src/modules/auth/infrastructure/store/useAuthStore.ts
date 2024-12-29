import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const isAuthenticated = ref(false)

  function onSetAuthenticated(value: boolean) {
    isAuthenticated.value = value
  }

  function $reset() {
    isAuthenticated.value = false
  }

  return {
    isAuthenticated,

    onSetAuthenticated,
    $reset,
  }
})
