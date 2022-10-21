<template>
  <div>
    <!-- <post-block v-for="post in posts" :key="post.id" :post="post" /> -->
    <div class="hero-banner mb-16">
      <div class="outer-wrap">
        <div class="text-5xl mb-2">
          <p>Hi,</p>
          <p>I'm Trung!</p>
        </div>
        <p class="text-xl border-b-2 border-black subtitle">
          This is a place where I keep all of my notes on tech and other random
          stuff. Hope you have fun reading my writing.
        </p>
      </div>
    </div>
    <div>
      <post-list :posts="posts"></post-list>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getPosts } from '@/services/index.telefunc'
// import PostBlock from '@/components/blocks/PostBlock.vue'
import { Post } from '~/services/data.service'
import PostList from '@/components/blocks/PostList.vue'
export default Vue.extend({
  // components: { PostBlock },
  components: { PostList },
  async asyncData({ $config: { gitHubRepoName, gitHubUsername } }) {
    const response = await getPosts(gitHubUsername, gitHubRepoName)

    return {
      posts: Object.values(response.posts).filter((p) => !!p.title),
    }
  },
  data: () => {
    return { posts: [] as Post[] }
  },
})
</script>

<style lang="scss" scoped>
.hero-banner {
  $hero-banner-gap: 2;

  .outer-wrap {
    @apply relative;

    padding-bottom: theme('spacing.#{$hero-banner-gap}');
    padding-left: theme('spacing.#{$hero-banner-gap}');

    &::after,
    &::before {
      content: '';
      display: block;
    }

    &::after {
      width: calc(100% - theme('spacing.#{$hero-banner-gap}'));
      height: 2px;
      background: #000;
      bottom: 0;
      position: absolute;
      left: 0;
    }

    &::before {
      position: absolute;
      height: 60px;
      width: 2px;
      background-color: #000;
      left: 0;
      bottom: 0;
    }
  }

  .subtitle {
    padding-bottom: theme('spacing.#{$hero-banner-gap}');
  }
}
</style>
