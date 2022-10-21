<template>
  <a class="tag">{{ $props.postTag }}</a>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    postTag: {
      type: String,
      default: () => '',
    },
  },
})
</script>

<style scoped lang="scss">
.tag {
  --a: 12px;
  @apply flex px-[16px] py-[1.2px] text-xs text-light-100 border-2 border-black cursor-pointer hover:bg-[#dd7a38];
  background-color: #d36922;
  box-shadow: 3px 3px 0 0 #000;
}
</style>
