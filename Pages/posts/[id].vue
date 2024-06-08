<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, watch, computed } from 'vue'
import { useStories } from '~/stores/stories'

// Mendapatkan route dan router
const route = useRoute()

// Menggunakan store
const store = useStories()

// Mendapatkan ID dari route params
const id = route.params.id as string

// Memanggil fungsi fetchStoryDetails saat komponen dimount
onMounted(async () => {
  store.resetSelectedStory()
  await store.fetchStoryDetails(Number(id))
})

// Reaktif data untuk selectedStory
const storyDetail = computed(() => {
  return store.selectedStory
})
</script>

<template>
  <div class="container-lg" style="margin-bottom: 5%; margin-top: 8%;">
    <div class="row">
      <div class="p-3 col-lg-8">
        <DetailContent :fetchStoriesDetail="storyDetail"></DetailContent>
      </div>
    </div>
  </div>
</template>