<template>
  <div class="flex justify-center items-center py-2 bg-[#d7d7d7]">
    <NuxtLink class="rainbow" to="/">tdtrung.tech</NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style module lang="scss">
.logo-shadow {
  @apply transform-gpu;

  width: 100%;
  height: 100%;
  position: absolute;
  background: #000;
  z-index: 1;
  top: 0;
  left: 0;

  --tw-translate-x: 4px;
  --tw-translate-y: 4px;
}

.logo-link {
  @apply inline-flex px-4 py-1 transition-all duration-50;

  color: #fff;
  background-color: var(--color-logo);
  border: 2px solid #000;
  z-index: 2;
}

.logo {
  @apply relative inline-flex mr-auto;

  &:hover .logo-shadow {
    @apply transform-gpu;

    --tw-translate-x: 6px;
    --tw-translate-y: 6px;
  }

  &:hover .logo-link {
    @apply transform-gpu;

    --tw-translate-x: -2px;
    --tw-translate-y: -2px;

    color: #fff;
  }
}
</style>
