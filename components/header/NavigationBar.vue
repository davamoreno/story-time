<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

const isLogin = computed(() => authStore.isLogin)
const userProfile = computed(() => authStore.userProfile)

onMounted(async () => {
  await authStore.initialAuth()
  if (authStore.isLogin) {
    await authStore.getUserProfile()
  }
})

const logout = () => {
  authStore.logout()
  console.log("Navbar: User logged out")
}
</script>

<template>
  <div class="container">
    <a class="navbar-brand" href="/"><img src="/logo.svg" alt="Logo"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="d-flex col-2 gap-2 ms-auto" v-if="!isLogin">
        <HeaderSignupBar />
        <HeaderLoginBar />
      </div>
      <div class="gap-3 d-flex ms-auto" v-else>
        <NuxtLink to="/user" class="btn btn-dark fs-6 rounded-0 px-4" type="submit">
          <i class="fa-regular fa-user me-1"></i>
          <span class="navbar-text">{{ userProfile.username }}</span>
        </NuxtLink>
        <button class="btn btn-outline-dark fs-6 rounded-0 px-4" @click="logout">
          <i class="fa-solid fa-sign-out-alt me-1"></i>
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
}
</style>
