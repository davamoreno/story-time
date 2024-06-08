<template>
  <div v-if="fetchStoriesDetail">
    <h2>{{ fetchStoriesDetail.title }}</h2>
    <p v-if="fetchStoriesDetail.createdAt" style="font-size: 14px;">{{ formatDate(fetchStoriesDetail.createdAt) }}</p>
    <div class="position-relative mb-4">
      <img v-if="fetchStoriesDetail.cover_image" class="w-100 h-auto object-fit-cover rounded" :src="urlBase + fetchStoriesDetail.cover_image.url" alt="">
      <button @click="handleClick" class="position-absolute rounded-circle btn btn-light p-0 top-0 end-0 mx-3 my-3">
        <i class="fa-regular fa-bookmark rounded-circle p-3 m-0" style="font-size: 18px;"></i>
      </button>
    </div>
    <div class="m-0 p-0" v-html="fetchStoriesDetail.content"></div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue'

interface StoryDetail {
  id: number;
  title: string;
  createdAt: string;
  cover_image: {
    url: string;
  };
  content: string;
}

const props = defineProps<{
  fetchStoriesDetail: StoryDetail | null;
}>()

const emits = defineEmits<{
  (e: 'select', id: number): void;
}>()

const handleClick = () => {
  if (props.fetchStoriesDetail) {
    emits('select', props.fetchStoriesDetail.id)
  }
}

// Base URL
const urlBase = 'https://storytime-api.strapi.timedoor-js.web.id/'

// Fungsi formatDate (Anda bisa menyesuaikan dengan format yang diinginkan)
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}
</script>