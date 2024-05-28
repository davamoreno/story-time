import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useNuxtApp } from '#app'

export const useStoriesStore = defineStore('stories', () => {
  const stories = ref<any[]>([])
  const keyword = ref('')
  const sortBy = ref('sort') // options: 'newest', 'az', 'za'
  const nuxtApp = useNuxtApp()
  const page = ref(0)
  const hasMore = ref(true)

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

    } catch (error) {
      console.error('Error fetching stories:', error)
      hasMore.value = false
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

  return { stories, keyword, sortBy, page, hasMore, fetchStories, setKeyword, setSortBy }
})