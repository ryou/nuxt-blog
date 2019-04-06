import { map } from 'lodash'
import pkg from './package'
import { fileMap } from './static/posts/_json/summary.json'
import sourceFileNameToUrl from './sourceFileNameToUrl'

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: (title) => {
      return title ? `${title} - SD MILIEU TECH MEMO` : 'SD MILIEU TECH MEMO'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Allerta+Stencil'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
        integrity: 'sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf',
        crossorigin: 'anonymous'
      },
      {
        rel: 'stylesheet',
        href: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/default.min.css'
      }
    ]
  },

  generate: {
    routes: function (callback) {
      const routes = map(fileMap, (file, fileName) => {
        return sourceFileNameToUrl(fileName)
      })
      callback(null, routes)
    }
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/sass/init.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',

    // 共通でscssファイルをimportさせるためのモジュール
    '@nuxtjs/style-resources'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  styleResources: {
    sass: [
      '~assets/sass/init.scss'
    ]
  }
}
