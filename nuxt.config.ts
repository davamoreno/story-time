import { Head } from "#build/components";
import { errorMessages } from "vue/compiler-sfc";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled : true},
  ssr: true,
  app:{
    head:{
      script:[{
        src:"https://kit.fontawesome.com/f1a55980af.js", 
        crossorigin:"anonymous",
      }]
    }
  },
  alias:{
    assets:"/<rootDir>/assets",
  },
  components: true,
  css:['bootstrap/dist/css/bootstrap.min.css',  '@/assets/styles/main.scss'],
  build: {
    loaders: {
      scss: {
        implementation: require('sass')
      }
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/styles/_colors.scss";
          `
        }
      }
    }
  },
  plugins: [
    '~/plugins/vee-validate.ts', '~/plugins/fontawesome.ts' , '~/plugins/pinia.ts',
  ],
  pages: true,
});
