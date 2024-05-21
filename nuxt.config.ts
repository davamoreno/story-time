// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias:{
    assets:"/<rootDir>/assets",
  },
  css:['bootstrap/dist/css/bootstrap.min.css', '~/assets/styles/main.scss'],
})
