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
      const tokenCookie = useCookie('token')
      const token = tokenCookie.value
      console.log("initialAuth: token from cookie", token)
      if (token) {
        this.token = token
        this.isLogin = true
        await this.getUserProfile()
      }
    },

    async getRegister(payload: any) {
      const authUrl = "https://storytime-api.strapi.timedoor-js.web.id/api/auth/local/register"
      try {
        if (!payload.username || !payload.email || !payload.password || !payload.name) {
          throw new Error("Data harus diisi semua !")
        }
        const response = await axios.post(authUrl, {
          username: payload.username,
          name: payload.name,
          email: payload.email,
          password: payload.password
        })
        const token = response.data.jwt
        const tokenCookie = useCookie('token')
        tokenCookie.value = token
        console.log("getRegister: token", token)
        this.token = token
        this.isLogin = true
        await this.getUserProfile()
      } catch (err) {
        console.log(err)
      }
    },

    async getUserLogin(payload: any) {
      const authUrl = "https://storytime-api.strapi.timedoor-js.web.id/api/auth/local"
      try {
        if (!payload.identifier || !payload.password) {
          throw new Error("Username Dan Password Harus Diisi !")
        }
        const response = await axios.post(authUrl, {
          identifier: payload.identifier,
          password: payload.password
        })
        const token = response.data.jwt
        const tokenCookie = useCookie('token')
        tokenCookie.value = token
        console.log("getUserLogin: token", token)
        this.token = token
        this.isLogin = true
        await this.getUserProfile()
      } catch (err) {
        console.log(err)
      }
    },

    async getUserProfile() {
      const profileUrl = "https://storytime-api.strapi.timedoor-js.web.id/api/users/me"
      try {
        const response = await axios.get(profileUrl, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        console.log("getUserProfile: profile data", response.data)
        this.userProfile = response.data
      } catch (err) {
        console.log("Get Profile Error:", err)
      }
    },

    async logout() {
      const tokenCookie = useCookie('token')
      tokenCookie.value = null
      console.log("logout: token cleared")
      this.token = null
      this.isLogin = false
      this.userProfile = {}
    }
  },
})
