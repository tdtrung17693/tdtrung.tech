<template>
  <div>
    <div>
      <a class="btn-back" @click="goBack">« Back</a>
    </div>
    <div class="mb-10">
        <h1 class="text-4xl">{{ titleize(post.title) }}</h1>
        <div class="mt-2">
          <time
            class="flex text-sm text-gray-500"
            datetime="${post.modifiedAt || post.createdAt}"
            >{{formatDate((post.modifiedAt) || post.createdAt) }}</time
          >
        </div>
        <div>
          <ul class="flex">
            <li v-for="tag in post.tags" :key="tag" class="mr-2">
              <post-tag :post-tag="tag" />
            </li>
          </ul>
        </div>
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <article class="post" v-html="renderMarkdownContent($props.post.content)">
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import PostTag from '@/components/blocks/PostTag.vue'
import { Post } from '~/services/data.service'
import { dateTimeMixins } from '~/utils/datetime.utils'
import { stringMixins } from '~/utils/string.utils'
export default Vue.extend({
  components: {PostTag},
  mixins: [dateTimeMixins, stringMixins],
  props: {
    post: {
      type: Object as PropType<Post>,
      default: () => ({
        title: '',
        content: '',
        createdAt: new Date(),
        modifiedAt: null,
        tags: [],
        revised: '',
        id: '',
      }),
    },
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    renderMarkdownContent(markdown: string) {
      return markdown
    }
  }
})
</script>

<style scoped lang="scss">
.btn-back {
  @apply inline-block text-sm text-gray-500 duration-300;
  cursor: pointer;

  &:hover {
    @apply transform-gpu;
    --tw-translate-x: 5px;
  }
}
</style>
