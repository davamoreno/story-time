<template>
    <header>
        <nav class="navbar fixed-top navbar-expand-lg navbar-light border-bottom shadow">
            <HeaderNavigationBar></HeaderNavigationBar>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initialAuth
  })
</script>

<style lang="scss" scoped>
 .navbar{
    background-color: #fff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
    padding: 10px 15px;
 }
</style>