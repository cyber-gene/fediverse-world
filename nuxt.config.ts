// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,

  nitro: {
    preset: 'netlify',
  },

  modules: ['@nuxt/fonts'],

  fonts: {
    families: [{ name: 'Noto Sans', provider: 'google' }, { name: 'JetBrains Mono', provider: 'google' }],
  },
});
