import { defineStore } from 'pinia'
import { useCookie } from '#app'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    isLogin: false,
    bookmarks : [] as any,
    userProfile: {} as any,
  }),
  getters:{
    isBookmarked: (state) => (id:any) => {
        return state.bookmarks.some(item => item.id === id);
    }
  },
  actions: {
    async initialAuth() {
      const cookieToken = useCookie('jwt');
      const token = cookieToken.value;
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
        const response = await axios.post(authUrl, {
          username: payload.username,
          name: payload.name,
          email: payload.email,
          password: payload.password,
        })
        this.token = response.data.data.jwt
        this.isLogin = true
        const cookieToken = useCookie('jwt')
        cookieToken.value = this.token
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
        this.token = response.data.data.jwt
        this.isLogin = true
        const cookieToken = useCookie('jwt')
        cookieToken.value = this.token
      } catch (err) {
        throw new Error(err)
      }
    },

    async logout() {
      this.token = null
      this.isLogin = false

      // Clear token from cookie
      const cookieToken = useCookie('jwt')
      cookieToken.value = null
    },

    async getUserProfile() {
        try {
        const profileUrl = "https://storytime-api.strapi.timedoor-js.web.id/api/users/me"
          const response = await axios.get(profileUrl, {
            headers: {
              Authorization: `Bearer ${useCookie('jwt').value}`,
            },
          })
          this.userProfile = response.data.data;
        } catch (err) {
          console.log("Get Profile Error:", err)
        }
      },

      async editUserProfile(name: any, biodata:any){
        try {
          if(!name){
            throw new Error("Nama Harus Diisi !!!");
          }
          const response = await axios.patch(`https://storytime-api.strapi.timedoor-js.web.id/api/users/me`,{name, biodata}, {
            headers: {
              Authorization: `Bearer ${useCookie('jwt').value}`,
              'Content-Type': 'application/json'
            }
          });
        this.userProfile = response.data.data;
        } catch (err) {
          throw new Error("Error", err);
          
        }
      },

      async uploadUserPicture(image: any){
        try {
          const response = await axios.post('https://storytime-api.strapi.timedoor-js.web.id/api/upload', image, {
            headers:{
              Authorization: `Bearer ${useCookie('jwt').value}`,
              'Content-Type': 'multipart/form-data'
          } 
        })
        this.userProfile = response.data.data;
        } catch (err) {
          throw new Error("Error", err);
        }
      },

      toogleBookmark(story : any){
        const index = this.bookmarks.findIndex(item => item.id === story.id);
        if (index === -1) {
            this.bookmarks.push(story);
        }
        else{
            this.bookmarks.splice(index, 1);
        }
        this.saveBookmarks();
      },

      saveBookmarks(){
        const token = useCookie('jwt').value;
        if(token){
            const userId = this.userProfile.id;
            localStorage.setItem(`bookmarks_${userId}`, JSON.stringify(this.bookmarks));
        }
      },

      loadBookmars(){
        const userId = this.userProfile.id;
        const savedBookmarks = localStorage.getItem(`bookmarks_${userId}`);
        if (savedBookmarks) {
            this.bookmarks = JSON.parse(savedBookmarks);
        }
      },
      
      clearBookmarks(){
        const userId = this.userProfile.id;
        localStorage.removeItem(`bookmarks_${userId}`)
      }
  },
})