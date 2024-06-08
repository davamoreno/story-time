import { defineStore } from 'pinia'
import axios from 'axios'

interface Story {
  id: number;
  title: string;
  createdAt: string;
  cover_image: {
    url: string;
  };
  content: string;
  author: {
    username: string;
  };
  category: {
    name: string;
  };
}

interface StoryState {
  stories: Story[];
  selectedStory: Story | null;
  keyword: string | null;
  sort: string | null;
  page: number;
  pageCount: number
}

export const useStories = defineStore('stories', {
  state: (): StoryState => ({
    stories: [],
    selectedStory: null,
    keyword: '',
    sort: '',
    page: 1,
    pageCount: 1
  }),

  actions: {
    async fetchStories(payload: any) {
      const {page,sort,keyword} = payload
      const storyUrl = "https://storytime-api.strapi.timedoor-js.web.id/api/stories"
      try {
        const response = await axios.get<{ data: Story[] }>(storyUrl, {
          params: {
            page: page,
            sort: sort,
            keyword: keyword
          }
        })

        let newStories = response.data.data
        this.page = response.data.meta.pagination.page
        this.pageCount = response.data.meta.pagination.pageCount

        // if (this.sort === "az") {
        //   newStories = newStories.sort((a, b) => a.title.localeCompare(b.title)) 
        // } else if (this.sort === "za") {
        //   newStories = newStories.sort((a, b) => b.title.localeCompare(a.title))
        // } else if (this.sort === "newest") {
        //   newStories = newStories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        // }

        if (page > 1) {
          this.stories = [...this.stories, ...newStories]
        } else {
          this.stories = newStories
        }

        // if (newStories.length < 10) {
        //   this.hasMore = false
        // } else {
        //   this.page += 1
        // }
      } catch (error) {
        console.error('Error fetching stories:', error)
      }
    },

    async fetchStoryDetails(id: number) {
      const storyDetailUrl = `https://storytime-api.strapi.timedoor-js.web.id/api/stories/${id}`
      try {
        const response = await axios.get<{ data: Story }>(storyDetailUrl)
        this.selectedStory = response.data.data
      } catch (err) {
        console.error('Fetch story details error:', err)
      }
    },

    resetSelectedStory() {
      this.selectedStory = null
    },

    setKeyword(newKeyword: string) {
      this.fetchStories(newKeyword)
    },

    setSortBy(newSortBy: string) {
      this.fetchStories(newSortBy)
    }
  }
})
