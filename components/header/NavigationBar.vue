<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

const isLogin = computed(() => authStore.isLogin)


const login = async () => {
  await authStore.initialAuth()
  if (authStore.isLogin) {
    await authStore.getUserProfile()
  }
}
await login()

onMounted(() => {
  authStore.getUserProfile();
})
</script>

<template>
<nav class="navbar fixed-top navbar-expand-lg navbar-light">
  <div class="container">
    <a class="navbar-brand" href="/"><img src="/logo.svg" alt="Logo"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto" v-if="!isLogin">
        <li class="nav-item">
          <a href="#" class="nav-link"><NuxtLink to="/signup" type="button" class="btn btn-outline-primary">Register</NuxtLink></a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link"><NuxtLink to="/login" type="button" class="btn btn-primary">Login</NuxtLink></a>
        </li>
      </ul>
      <div class="gap-3 d-flex ms-auto" v-else>
        <NuxtLink to="/user" class="btn btn-primary fs-6 rounded-0 px-4" type="submit">
          <svg data-v-d9c281ee="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 32 32" class="font20 iconify iconify--carbon"><path fill="none" d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0M20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5"></path><path fill="currentColor" d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.9 13.9 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3q.418.457.87.87q.14.124.28.242q.48.415.99.782c.044.03.084.069.128.1v-.012a13.9 13.9 0 0 0 16 0v.012c.044-.031.083-.07.128-.1q.51-.368.99-.782q.14-.119.28-.242q.451-.413.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0"></path></svg>
          <span class="navbar-text text-white">{{ authStore.userProfile.name }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</nav>
</template>

<style lang="scss" scoped>
.navbar-nav {
    display: flex;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
}
.nav-item{
  a:-webkit-any-link {
    cursor: pointer;
}
}
.navbar{
    background-color: #fff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
    padding: 10px 15px;
 }

.nav-link {
  padding: .5rem 1rem;
}

.btn {
  border-radius: 0;
  padding: 7px 25px;
  font-weight: 500;
}

.btn-outline-primary {
  color: #0e0e0e;
  border-color: #0e0e0e;
}

.btn-outline-primary:hover {
  background-color: #fff;
  color: #0e0e0e;
  border-color: #0e0e0e;
}

.btn-primary {
  background: #343434;
  color: #fff;
}

.btn-primary:hover {
  background: #343434;
  color: #fff;
}

</style>
