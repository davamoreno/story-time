<template>
    <div class="container-fluid">
        <a class="navbar-brand" href="#"><img src="/logo.svg" alt=""></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <LoginBar></LoginBar>
        </div>
    </div>
</template>

<script setup>
    import LoginBar from './LoginBar.vue'
</script>

<style lang="scss" scoped>
</style>