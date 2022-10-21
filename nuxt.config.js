import { text } from 'express'
import slug from 'slug'
import { telefunc, provideTelefuncContext } from 'telefunc'
import 'telefunc/async_hooks'
import { getPosts } from './services/index.telefunc'

export default {
  target: 'static',
  generate: {
    async routes(callback) {
      try {
        const response = await getPosts(
          process.env.GH_USER,
          process.env.GH_REPO_NAME
        )
        return callback(null, [
          ...Object.values(response.posts)
            .map((p) => {
              if (!p.title) {
                return { route: '' }
              }
              return `/posts/${p.id}-${slug(p.title)}`
            })
            .filter((r) => r.length > 0),
          '/me',
          '/',
        ])
      } catch (error) {
        callback(error)
      }
    },
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/base.scss', '~/assets/styles/highlight.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-placeholders.js',
    '~/plugins/vue-observe-visibility.plugin.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    // '@nuxtjs/stylelint-module',
    'nuxt-windicss',
    '@nuxtjs/svg',
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
  ],
  optimizedImages: {
    optimizeImages: true,
    handleImages: ['jpeg', 'png', 'webp', 'gif'],
  },
  styleResources: {
    scss: ['~/assets/styles/tokens.scss'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', 'telefunc/nuxt', sendServerIsReadyMessage],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  publicRuntimeConfig: {
    baseApiUrl: process.env.BASE_API_URL,
    siteName: process.env.SITE_NAME,
    gitHubRepoName: process.env.GH_REPO_NAME,
    gitHubUsername: process.env.GH_USER,
    linkedinUsername: process.env.LINKEDIN_USER,
    myEmail: process.env.MY_EMAIL,
  },
  privateRuntimeConfig: {
    gitHubToken: process.env.GH_TOKEN,
  },
  telemetry: false,
  serverMiddleware: [
    text(), // Telefunc needs the HTTP request body
    telefuncContextMiddleware,
    telefuncMiddleware,
  ],
}
// We provide the Telefunc context for not only for `/_telefunc` but all requests,
// so that the context is available also during SSR.
function telefuncContextMiddleware(req, _res, next) {
  provideTelefuncContext({ req })
  next?.()
}

async function telefuncMiddleware(req, res, next) {
  const { url, method, body } = req
  if (url !== '/_telefunc') {
    next?.()
    return
  }
  const httpResponse = await telefunc({ url, method, body })
  res.writeHead(httpResponse.statusCode).end(httpResponse.body)
}

// Nuxt uses the logging library `consola` which breaks `@brillout/test-e2e`'s log listening mechanism;
// we need to log a custom message so that `@brillout/test-e2e` can know when the build is finished.
function sendServerIsReadyMessage() {
  this.nuxt.hook('build:done', () => {
    process.stdout.write(`SERVER_IS_READY\n`)
  })
}
