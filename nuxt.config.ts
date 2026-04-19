// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,

  experimental: {
    serverAppConfig: false,
  },

  nitro: {
    preset: 'netlify',
  },

  modules: ['@nuxt/fonts'],

  app: {
    head: {
      title: 'Fediverse World',
      meta: [
        {
          name: 'description',
          content:
            'Fediverse World introduces you to the Fediverse — a network of interconnected, decentralized social media platforms.',
        },
        { property: 'og:title', content: 'Fediverse World' },
        {
          property: 'og:description',
          content:
            'Fediverse World introduces you to the Fediverse — a network of interconnected, decentralized social media platforms.',
        },
        { property: 'og:type', content: 'website' },
      ],
    },
  },

  fonts: {
    families: [
      { name: 'Noto Sans', provider: 'google' },
      { name: 'JetBrains Mono', provider: 'google' },
    ],
  },
});
