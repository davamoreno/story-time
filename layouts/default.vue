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
  authStore.initialAuth()

})
</script>

<script lang="ts">
export default{
  middleware: 'auth'
}
</script>

<style lang="scss" scoped>

</style>