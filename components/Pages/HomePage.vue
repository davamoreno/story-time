<template>
    <section class="home__hero">
        <div class="container">
            <div class="title">
                Welcome to <img src="/logo.svg" alt="" height="60" class="ml-15px">
            </div>
            <h1>The world's most-loved social storytelling platform.</h1>
            <p class="subtitle">
                Story time connects a global community of 90 million readers and writers through the power of story.
            </p>
        </div>
    </section>
</template>

<script setup>
   definePageMeta({
    layout: 'default'
   })
</script>
    
<style lang="scss" scoped>
body{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.home__hero{
    display: flex;
    justify-content: center;
}
.home__hero{ 
    text-align: center;
    height: 100vh;
    align-items: center;
    h1{
        font-size: 32px;
        font-weight: 400;
    }
    .title{
    font-size: 53px;
    line-height: 1;
    font-weight: 500;
    margin-bottom: 10px;
    }
    .subtitle{
        font-size: 32px;
    }
}
</style>