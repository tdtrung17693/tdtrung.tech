<template>
  <div>
    <div class="intro-box">
      <p class="text-3xl">Hi!</p>
      <p>I'm <strong>Trung</strong>, a software engineer based in Vietnam.</p>
      <p>
        This site is my personal blog where I keep my writing on tech and other
        stuff that I find interesting.
      </p>
      <p>
        You can reach me via
        <a
          class="social"
          :href="`https://www.linkedin.com/in/${$config.linkedinUsername}`"
          >Linkedin</a
        >,
        <a
          class="social"
          :href="`https://www.github.com/${$config.gitHubUsername}`"
          >GitHub</a
        >
        or <a class="social" :href="`mailto:${$config.myEmail}`">email</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style scoped lang="scss">
.social {
  text-decoration: underline;
}

.intro-box {
  @apply text-xl border-2 p-4 border-black rounded-lg leading-relaxed;

  box-shadow: 3px 3px 0 0 #000;
}
</style>
