<script setup lang="ts">
    
</script>

<template>
    <main class="main-wrapper">
        <section class="section-space">
            <div class="container">
                <div class="row">
                    <PagesUserPage></PagesUserPage>
                    <div class="col-lg-9">
                        <UserBook/>
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