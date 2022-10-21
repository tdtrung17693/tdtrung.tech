<template>
  <div>
    <post-block :post="post"></post-block>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import matter from 'gray-matter'
import hljs from 'highlight.js'
// import dayjs from 'dayjs'
import {marked} from 'marked'
import { getPost } from '../post.telefunc'
import PostBlock from '@/components/blocks/PostBlock.vue'
import "highlight.js/styles/base16/equilibrium-light.css";

export default Vue.extend({
  components: {PostBlock},
  async asyncData({ $config: { gitHubRepoName, gitHubUsername, siteDomain }, route }) {
    const { slug } = route.params
    const id: string = slug.split("-")?.[0] || "1"
    const post = await getPost(gitHubUsername, gitHubRepoName, id )
    
    
    const {content} = matter(post.content)
    const customRenderer = {
        heading: function (
            text: string,
            level: 1 | 2 | 3 | 4 | 5 | 6,
        ) {
            const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
            if (level === 1) {
                // const titleText = text.replace("/", " / ");
                return `<div class="">
                </div>`
            } else {
                return '<h' + level + '><a class="font-bold" name="' +
                    escapedText +
                    '" href="#' +
                    escapedText +
                    '">' + text + '</a></h' + level + '>';
            }
        },
        link(href: string, _title: string, text: string) {
            if (href.startsWith("http") && href.includes(siteDomain)) {
                return `<a class="external-link" href='${href}' target="_blank" rel="noopener">${text}</a><sup class="arrow link">&urtri;</sup>`;
            }
            return false;
        }
    };


    marked.setOptions({
      highlight: (code, lang) => {
        const language = lang || "plaintext"
        const result = hljs.highlight(code, {language}).value
        
        return result
      },
      langPrefix: 'hljs lang-',
    })
    marked.use({ renderer: customRenderer });
    const html = marked.parse(content)
    return {
      post: {...post, content: html }
    }
  },
  data: () => {
    return {post: {
        title: '',
        content: '',
        createdAt: new Date(),
        modifiedAt: null,
        tags: [],
        revised: '',
        id: '',
    }}
  },
head: {
  link: [
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css",
    },
  ]
}
})
</script>