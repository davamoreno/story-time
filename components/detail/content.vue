<script setup lang="ts">
import { defineProps, defineEmits, onUnmounted } from 'vue'
import { useRoute } from 'vue-router';
  
const props = defineProps({
  storiesDetail: {
    type: Object,
    required: false,
    default: null
  }
})
const emits = defineEmits(['select'])
const handleClick = () => {
  if (props.storiesDetail) {
    emits('select', props.storiesDetail.id)
  }
}

// Base URL
const urlBase = 'https://storytime-api.strapi.timedoor-js.web.id'

// Fungsi formatDate (Anda bisa menyesuaikan dengan format yang diinginkan)
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}
</script>

<template>
    <div v-if="storiesDetail">
    <h2>{{ storiesDetail.title }}</h2>
    <p v-if="storiesDetail.createdAt" style="font-size: 14px;">{{ formatDate(storiesDetail.createdAt) }}</p>
    <div class="position-relative mb-4">
      <img v-if="storiesDetail.cover_image" class="w-100 h-auto object-fit-cover rounded" :src="urlBase + storiesDetail.cover_image?.url" alt="">
      <button @click="handleClick" class="position-absolute rounded-circle btn btn-light p-0 top-0 end-0 mx-3 my-3">
        <i class="fa-regular fa-bookmark rounded-circle p-3 m-0" style="font-size: 18px;"></i>
      </button>
    </div>
    <div class="m-0 p-0" v-html="storiesDetail.content"></div>
  </div>
  <div v-else>
    <p>loading...</p>
  </div>
</template>