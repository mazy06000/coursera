// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Kutubun',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'The Open Source Bookstore' },
      ],
    },
  },
  devtools: { enabled: true },
  alias: {
    '@': resolve(__dirname, '/'),
  },
  css : [
    '~/assets/main.css',
  ],
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.json'
      },
      {
        code: 'fr',
        file: 'fr.json'
      }
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'fr'
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: false,
})
