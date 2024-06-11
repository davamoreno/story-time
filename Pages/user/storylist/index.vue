<script setup lang="ts">

</script>

<template>
    <main class="main-wrapper">
        <section class="section-space">
            <div class="container">
                <div class="row">
                    <PagesUserPage></PagesUserPage>
                    <div class="col-lg-9">
                        <div class="story-list">
                            <div class="story-list__header">
                                <h1 class="story-list__title">
                                    Story List
                                </h1> 
                                <NuxtLink to="/user/storylist/create" class="btn btn-primary btn-sm mr-5px" target="_self">
                                    + Create Story
                                </NuxtLink>
                            </div>
                            <div class="story-list__wrapper">
                                <div class="empty-state">
                                    <img src="/empty-data.svg" class="empty-state__img"> 
                                    <p data-v-72aafb26="" class="empty-state__desc">
                                        No data found
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>

.main-wrapper {
    padding: 78px 0 100px;
}

.section-space{
    padding-top: 22px;
}

.story-list{
    padding: 25px;
    border: none;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
    border-radius: 0;
}

.story-list__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}

h1{
    margin-bottom: 0;
    
}

.story-list__title{
    font-size: 24px;
}

.btn-primary {
    background: #343434;
    border-color: #343434;
    color: #fff;
}

.btn:hover{
    background: #0e0e0e;
    border-color: #0e0e0e;
}

.btn {
    font-size: .875rem;
    line-height: 1.5;
    .btn-sm {
    padding: 5px 15px;
    }
}

.mr-5px {
    margin-right: 5px !important;
}

.empty-state {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.empty-state__img {
    width: 20%;
    margin: 0 auto;
}

.empty-state__desc {
    font-size: 24px;
    font-weight: 500;
    margin-top: 15px;
}
</style>