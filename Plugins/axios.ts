import { defineNuxtPlugin } from '#app'
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const instance = axios.create({
    baseURL: 'https://storytime-api.strapi.timedoor-js.web.id//api',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  nuxtApp.provide('axios', instance)
})