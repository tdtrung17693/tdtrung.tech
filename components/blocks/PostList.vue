<template>
  <div>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <NuxtLink
          tag="a"
          :to="`/posts/${post.id}-${slug(post.title)}`"
          class="block cursor-pointer px-2 py-[1.5rem] border-b-1 border-black"
        >
          <time
            class="flex text-sm text-gray-500"
            :datetime="post.modifiedAt || post.createdAt"
            >{{ formatDate(post.modifiedAt || post.createdAt) }}</time
          >
          <span class="text-2xl font-bold">
            {{ titleize(post.title) }}
          </span>
          <template v-if="post.tags.length > 0">
            <span class="block mt-2">
              <ul class="flex">
                <li v-for="tag in post.tags" :key="tag" class="mr-2">
                  <post-tag :post-tag="tag" />
                </li>
              </ul>
            </span>
          </template>
          <template v-else>
            <span class="block mt-2">
              <ul class="flex">
                <li class="mr-2">
                  <post-tag post-tag="uncategorized" />
                </li>
              </ul>
            </span>
          </template>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import slug from 'slug'
import type { PropType } from 'vue'
import { Post } from '~/services/data.service'
import PostTag from '@/components/blocks/PostTag.vue'
import { dateTimeMixins } from '~/utils/datetime.utils'
import { stringMixins } from '~/utils/string.utils'
export default Vue.extend({
  components: { PostTag },
  mixins: [dateTimeMixins, stringMixins],
  props: {
    posts: {
      type: Array as PropType<Post[]>,
      default: () => [
        {
          id: '', //
          title: '',
          content: '',
          createdAt: new Date().toString(),
          revised: '', // commit number goes here
          tags: [],
          path: "",
        } as Post,
      ],
    },
  },
  methods: {
    slug(str: string) {
      return slug(str)
    },
  },
})
</script>
