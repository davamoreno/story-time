import { defineStore } from 'pinia'
import { useCookie } from '#app'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    isLogin: false,
    userProfile: {} as any,
  }),

  actions: {
    async initialAuth() {
      const cookieToken = useCookie('token')
      const token = cookieToken.value
      if (token) {
        this.token = token
        this.isLogin = true
      } else {
        this.token = null
        this.isLogin = false
      }
    },

    async getRegister(payload: any) {
      const authUrl = "https://storytime-api.strapi.timedoor-js.web.id/api/auth/local/register"
      try {
        if (!payload.username || !payload.email || !payload.password || !payload.name) {
          throw new Error("Data harus diisi semua!")
        }
        await axios.post(authUrl, {
          username: payload.username,
          name: payload.name,
          email: payload.email,
          password: payload.password,
        })
        this.isLogin = true
      } catch (err) {
        console.log(err)
      }
    },

    async getUserLogin(payload: any) {
      const authUrl = "https://storytime-api.strapi.timedoor-js.web.id/api/auth/local"
      try {
        if (!payload.identifier || !payload.password) {
          throw new Error("Username dan password harus diisi!")
        }
        const response = await axios.post(authUrl, {
          identifier: payload.identifier,
          password: payload.password,
        })
        this.token = response.data.jwt
        this.isLogin = true

        // Save token to cookie
        const cookieToken = useCookie('token')
        cookieToken.value = this.token
      } catch (err) {
        console.log(err)
      }
    },

    async getUserProfile() {
      const profileUrl = "https://storytime-api.strapi.timedoor-js.web.id/api/users/me"
      try {
        const response = await axios.get(profileUrl, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        this.userProfile = response.data
      } catch (err) {
        console.log("Get Profile Error:", err)
      }
    },

    async logout() {
      this.token = null
      this.isLogin = false

      // Clear token from cookie
      const cookieToken = useCookie('token')
      cookieToken.value = null
    },
  },
})