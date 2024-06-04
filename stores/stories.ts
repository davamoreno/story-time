import { defineStore } from 'pinia'
import axios from 'axios'

export const useStories = defineStore('stories', {
  state: () => ({
    stories: [] as Array<any>,
    selectedStory: null as any | null,
    keyword: '' as string | null,
    sort: '' as string | null,
    page: 0 as number,
    hasMore: true as boolean,
  }),

  actions: {
    async fetchStories(loadMore: boolean = false) {
      const storyUrl = "https://storytime-api.strapi.timedoor-js.web.id/api/stories"
      try {
        if (!loadMore) {
          this.stories = []
          this.page = 0
          this.hasMore = true
        }

        const response = await axios.get(storyUrl, {
          params: {
            _q: this.keyword || undefined,
            _sort: this.sort,
            _start: this.page * 10,
            _limit: 10,
          }
        })

        let newStories = response.data.data

        if(this.sort === "az"){
          newStories = newStories.sort((a: any, b:any) => a.title.localeCompare(b.title)) 
        }
        else if(this.sort === "za"){
          newStories = newStories.sort((a:any, b:any) => b.title.localeCompare(b.title))
        }
        else if(this.sort === "newest"){
          newStories = newStories.sort((a: any, b:any) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime())
        }

        if (loadMore) {
          this.stories.push(...newStories)
        } else {
          this.stories = newStories
        }

        if (newStories.length < 10) {
          this.hasMore = false
        } else {
          this.page += 1
        }
      } catch (error) {
        console.error('Error fetching stories:', error)
        this.hasMore = false
      }
    },

    async fetchStoryDetails(id: number) {
      const storyDetailUrl = `https://storytime-api.strapi.timedoor-js.web.id/api/stories/${id}`
      try {
        const response = await axios.get(storyDetailUrl)
        this.selectedStory = response.data.data
      } catch (err) {
        console.error('Fetch story details error:', err)
      }
    },

    setKeyword(newKeyword: string) {
      this.keyword = newKeyword
      this.fetchStories()
    },

    setSortBy(newSortBy: string) {
      this.sort = newSortBy
      this.fetchStories()
    }
  }
})