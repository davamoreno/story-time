<template>
    <div class="container">
        <a class="navbar-brand" href="/"><img src="/logo.svg" alt=""></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="d-flex col-2 gap-2 ms-auto">
                <HeaderSignupBar></HeaderSignupBar>
                <headerLoginBar></headerLoginBar>
            </div>
        </div>
    </div>
</template>

<script setup>
 
</script>

<style lang="scss" scoped>
 .container{
    width: 100%;
   }
</style>