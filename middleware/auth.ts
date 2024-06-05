import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(() => {
  const store = useAuthStore()
  if (!store.isLogin) {
    return navigateTo('/login')
  }
})