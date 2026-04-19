// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,

  nitro: {
    preset: 'netlify',
  },

  modules: ['@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      'Noto+Sans': true,
      'JetBrains+Mono': true,
    },
  },
});
