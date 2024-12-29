<script setup lang="ts">
defineOptions({ name: 'LayoutUser' })
</script>
<template>
  <div :class="s.wrapper">
    <slot />
  </div>
</template>
<style module="s" lang="scss">
.wrapper {
  @apply min-w-vw min-h-vh w-full h-full;
}
</style>
