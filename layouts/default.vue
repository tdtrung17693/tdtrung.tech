<template>
  <div class="min-h-screen flex flex-col">
    <div class="max-w-3xl w-full py-5 mx-auto mb-auto px-8 lg:px-0">
      <site-header class="mb-20"></site-header>
      <main>
        <nuxt keep-alive></nuxt>
      </main>
    </div>
    <site-footer class="mt-20"></site-footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SiteHeader from '~/components/layout/SiteHeader.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
export default Vue.extend({
  components: { SiteHeader, SiteFooter },
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
