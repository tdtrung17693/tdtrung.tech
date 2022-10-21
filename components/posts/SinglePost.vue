<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { Post } from '~/services/data.service'
export default Vue.extend({
  props: {
    post: {
      type: Object as PropType<Post>,
      default: () => ({}),
    },
  },
})
</script>
