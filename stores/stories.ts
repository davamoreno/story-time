import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useNuxtApp } from '#app'
import axios from 'axios';

export const useStories = defineStore('stories', () => {
  const stories = ref<any[]>([])
  const storiesDetail = ref({})
  const keyword = ref('')
  const sortBy = ref('sort') // options: 'newest', 'az', 'za'
  const nuxtApp = useNuxtApp()
  const page = ref(0)
  const hasMore = ref(true)
  const selectedStoryId = ref(null)

  const fetchStories = async (loadMore: boolean = false) => {
    try {
      if(!loadMore){
        stories.value = []
        page.value = 0
        hasMore.value = true
      }
      const { data } = await nuxtApp.$axios.get('/stories', {
        params: {
          keyword: keyword.value || undefined,
          sort: sortBy.value || undefined,
          author: "",
          page: page.value
        }
      })

      let sortedStories = data.data

      if (sortBy.value === 'az') {
        sortedStories = sortedStories.sort((a: any, b: any) => a.title.localeCompare(b.title))
      } else if (sortBy.value === 'za') {
        sortedStories = sortedStories.sort((a: any, b: any) => b.title.localeCompare(a.title))
      } else if (sortBy.value === 'newest') {
        sortedStories = sortedStories.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      }

      if (loadMore) {
        stories.value.push(...sortedStories)
      } else {
        stories.value = sortedStories
      }

      if (sortedStories.length < 10) { // Assuming each page has 10 stories
        hasMore.value = false
      } else {
        page.value += 1
      }
      const newInfos = data.data;
      for (const item of newInfos) {
          const isExisting = stories.value.find(existing => existing.id === item.id);
          if(!isExisting) {
              stories.value.push(item);
          }
      }

    } catch (error) {
      console.error('Error fetching stories:', error)
      hasMore.value = false
    }
  }

  const getStoriesDetail = async(id:any) => {
    try {
      const {data} = await axios.get(`/stories/${id}`);
      storiesDetail.value = data.data;
      selectedStoryId.value = id;
    }
    catch (err){
        console.log(err)
    }
  }

  const setKeyword = (newKeyword) => {
    keyword.value = newKeyword
    fetchStories()
  }

  const setSortBy = (newSortBy) => {
    sortBy.value = newSortBy
    fetchStories()
  }

  return { stories,storiesDetail, keyword, sortBy, page, hasMore,selectedStoryId, fetchStories, setKeyword, setSortBy, getStoriesDetail }
})