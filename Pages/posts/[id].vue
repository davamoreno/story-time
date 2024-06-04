<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, watch } from 'vue'
import { useStories } from '~/stores/stories'

// Mendapatkan route dan router
const route = useRoute()
const router = useRouter()

// Menggunakan store
const { storiesDetail, getStoriesDetail } = useStories()

// Mendapatkan ID dari route params
const id = route.params.id as string

// Memanggil fungsi getStoriesDetail saat komponen dimount
onMounted(() => {
  getStoriesDetail(id)
})

// Mengamati perubahan ID dan memanggil ulang getStoriesDetail jika berubah
watch(() => route.params.id, (newId) => {
  getStoriesDetail(newId as string)
})

useHead({
  title: `StoryTime | Detail ${id}`
})
</script>

<template>
  <div class="container-lg" style="margin-bottom: 5%; margin-top: 8%;">
    <div class="row">
      <div class="p-3 col-lg-8">
        <DetailContent :storiesDetail="storiesDetail"></DetailContent>
      </div>
    </div>
  </div>
</template>