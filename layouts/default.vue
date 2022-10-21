<template>
  <div class="w-3xl py-5 mx-auto">
    <site-header class="mb-20"></site-header>
    <main>
      <nuxt keep-alive></nuxt>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SiteHeader from '~/components/layout/SiteHeader.vue'
export default Vue.extend({
  components: { SiteHeader },
  head: {
    link: [
      {
        rel: 'preconnect',
        href: 'fonts.googleapis.com',
        crossorigin: true,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true,
      },
      {
        href: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,400;0,700;1,300;1,400;1,700&display=swap',
        rel: 'stylesheet',
      },
    ],
  },
})
</script>

SiteHeader
