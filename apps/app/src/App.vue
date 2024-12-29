<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import LayoutGuest from '@/modules/core/presentation/pages/LayoutGuest.vue'
import LayoutUser from '@/modules/core/presentation/pages/LayoutUser.vue'

const route = useRoute()

const layoutComponent = computed(() => {
  const routeLayout = route?.meta?.layout as 'guest' | 'user'
  const layouts = {
    guest: LayoutGuest,
    user: LayoutUser,
  }

  return layouts[routeLayout] ?? LayoutGuest
})
</script>

<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>
