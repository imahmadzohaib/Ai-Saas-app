// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/mdc',
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig:{
    tursoDatabaseUrl:"",
    tursoAuthToken: "",
    githubClientId:"",
    githubClientSecret:"", 
    googleClientId:"",
    googleClientSecret:"",
    cloudinaryApiKey:"",
    cloudinaryApiSecret:"",
    cloudinaryCloudName:"",
    geminiApi:"",
    public:{
      appEnv:""
    }
  },
  mdc: {
    components: {
      prose: true,
    },
  },

})