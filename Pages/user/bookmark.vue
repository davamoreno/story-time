<script setup lang="ts">
    
</script>

<template>
    <main class="main-wrapper">
        <section class="section-space">
            <div class="container">
                <div class="row">
                    <PagesUserPage></PagesUserPage>
                    <div class="col-4">
                        <div class="story h-100" is-bookmark="true">
                            <a href="/story/787" class="story__image"><img src="https://storytime-api.strapi.timedoor-js.web.id/uploads/Kancil_ad0184e9bc.jpg" class="img-fluid"></a> 
                            <div class="story__info">
                                <a href="/story/787" class="story__link">
                                    <h2 class="story__title">
                                        Hai
                                    </h2>
                                </a> 
                                <p class="story__desc">
                                    
                                </p> 
                                <div class="story__footer">
                                    <p class="story__sub-info">
                                        by moreno
                                    </p> 
                                    <p class="story__sub-info">
                                        28 Jun 24
                                    </p> 
                                    <button class="btn story__favorite shadow">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 32 32" class="font20 iconify iconify--carbon">
                                            <path fill="currentColor" d="M24 2H8a2 2 0 0 0-2 2v26l10-5.054L26 30V4a2 2 0 0 0-2-2"></path></svg>
                                        </button>
                                </div> 
                                <div class="story__footer">
                                    <span class="badge badge-secondary">
                                        Romance
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-9">
                        <div class="favorite">
                            <h1 class="favorite__title">
                                Bookmark
                            </h1> 
                            <div class="row">

                            </div> 
                            <div class="empty-state">
                                <img src="/public/empty-data.svg" class="empty-state__img" width="150">
                                <p class="empty-state__desc">
                                    No data found
                                </p>
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