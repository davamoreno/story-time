<template>
    <div>
        <PagesNavigationPage></PagesNavigationPage>
        <slot />
        <PagesFooterPage></PagesFooterPage>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initialAuth().then(() => {
    console.log("Layout: isLogin", authStore.isLogin)
    console.log("Layout: userProfile", authStore.userProfile)
  })
})
</script>

<style lang="scss" scoped>

</style>