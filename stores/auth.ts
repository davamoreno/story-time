import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useNuxtApp } from '#app';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        username: '',
        email: '',
        password: '',
        name:'',
        passwordConfirm:'',
        error: null as string | null,
    }),
    actions: {
        async register() {
          const { $axios } = useNuxtApp()
          if (this.password !== this.passwordConfirm) {
            this.error = "Passwords do not match"
            return
          }
          try {
            const response = await $axios.post('/auth/local/register', {
              username: this.username,
              name: this.name,
              email: this.email,
              password: this.password,
            })
    
            console.log('Registration successful', response.data)
            this.error = null
            // Handle success, like redirecting the user or showing a success message
          } catch (error: any) {
            this.error = error.response?.data?.message || error.message
          }
        },
    },     
}) 