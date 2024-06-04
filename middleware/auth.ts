import { defineNuxtMiddleware } from '#app'

export default defineNuxtMiddleware(({ $cookies, redirect }) => {
  const token = $cookies.get('authToken')
  if (!token) {
    return redirect('/login')
  }
})