<template>
    <main class="main-wrapper pt-0 home">
        <PagesHomePage></PagesHomePage>
        <PagesStoryPage></PagesStoryPage>
    </main>
</template>

<script setup>
   definePageMeta({
    layout: 'default'
   })
</script>
    
<style lang="scss" scoped>
.main-wrapper {
    padding: 78px 0 100px;
}
</style>