import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import axios from 'axios'
import { useCookie } from '#app';

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

interface StoryPayload {
  id: number;
  title: string;
  content: string;
  category: number;
}

interface StoryState {
  user: any;
  stories: Story[];
  storyList: Story[];
  selectedStory: Story | null;
  keyword: string | null;
  sort: string | null;
  page: number;
  pageCount: number;
}

export const useStories = defineStore('stories', {
  state: (): StoryState => ({
    user: useAuthStore(),
    storyList: [],
    stories: [],
    selectedStory: null,
    keyword: '',
    sort: '',
    page: 1,
    pageCount: 1
  }),

  actions: {
    async fetchStories(payload: any) {
      const {page,sort,keyword,author} = payload
      const storyUrl = "https://storytime-api.strapi.timedoor-js.web.id/api/stories"
      try {
        const response = await axios.get<{ data: Story[] }>(storyUrl, {
          params: {
            page: page,
            sort: sort,
            keyword: keyword,
            author: author,
          }
        })

        let newStories = response.data.data
        this.page = response.data.meta.pagination.page
        this.pageCount = response.data.meta.pagination.pageCount

        if (page > 1) {
          this.stories = [...this.stories, ...newStories]
        } else {
          this.stories = newStories
        }

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
    async getUserStory(){
      const data = this.user.userProfile;
      const userStory  = `https://storytime-api.strapi.timedoor-js.web.id/api/stories?keyword&author=${data.id}&page`;
      try{
        const response = await axios.get(userStory);
        const dataUser = await response.data.data;
        console.log(dataUser);
        
        this.storyList = response.data.data;
        console.log(this.storyList); 
        
      }catch(err){
        console.log(err)
      }
      
    },

    async createStory(story: Partial<Story>) {
      try {
        const response = await axios.post("https://storytime-api.strapi.timedoor-js.web.id/api/stories", story, { 
          headers:{
            Authorization: `Bearer ${useCookie('jwt').value}`,
          }
         });
         console.log();
        this.stories.push(response.data.data);
        return response.data.data.id;
      } catch (error) {
        console.error('Error creating story:', error);
        throw Error;
      }
    }, 
    
    async createImage(image: any){
      try{
        const images = await axios.post("https://storytime-api.strapi.timedoor-js.web.id/api/upload", image , {
              headers:{
                  Authorization: `Bearer ${useCookie('jwt').value}`,
                  'Content-Type': 'multipart/form-data',
              }
          })
      return images.data.data;
      } catch(err){
          console.log('error', err);
          throw Error;
      }
  },

    async updateStory(id: number, updatedStory: Partial<Story>) {
      const storyUrl = `https://storytime-api.strapi.timedoor-js.web.id/api/stories/${id}`
      try {
        const response = await axios.put<{ data: Story }>(storyUrl, { data: updatedStory })
        const index = this.stories.findIndex(story => story.id === id)
        if (index !== -1) {
          this.stories[index] = response.data.data
        }
      } catch (error) {
        console.error('Error updating story:', error)
      }
    },

    async deleteStory(id: number) {
      try {
        const deleteStory = await axios.delete(`https://storytime-api.strapi.timedoor-js.web.id/api/stories/${id}`,{
          headers:{
            Authorization: `Bearer ${useCookie('jwt').value}`,
        }
        });
        this.stories = this.stories.filter(story => story.id !== id);
      } catch (error) {
        console.error('Error deleting story:', error)
      }
    },
    async deleteImg(id: number,) {
      try {
        const imageId = this.stories.cover_image.id;
        const imageUrl = await axios.delete(`https://storytime-api.strapi.timedoor-js.web.id/api/upload/files/${imageId}`, {
          headers: {
            Authorization: `Bearer ${useCookie('jwt').value}`,
          }
        })
        if (!imageId) {
          console.warn('Tidak ada gambar yang ditemukan untuk cerita ini.');
          return;
      }
      return imageUrl.data;
    } catch(err){
      throw new Error("error");
      
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