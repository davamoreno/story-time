<script setup lang="ts">
import { ref } from 'vue';
import { useStories } from '@/stores/stories';
import { useRouter } from 'vue-router';

const storiesStore = useStories();
const router = useRouter();

const title = ref('');
const category = ref();
const content = ref('');
const imageUrl = ref('');
const image = ref();

const createStory = async () => {
  const newStory = {
    title: title.value,
    category: category.value,
    content: content.value,
  };

  try {
    const story = await storiesStore.createStory(newStory);
    console.log(story);
    

    if (story && image.value) {
      const newImage = new FormData();
      newImage.append('files', image.value);
      newImage.append('refId', story);
      newImage.append('ref', 'api::story.story');
      newImage.append('field', 'cover_image');

      await storiesStore.createImage(newImage);
    }

    router.push('/user/storylist');
  } catch (error) {
    console.error('Kesalahan saat membuat cerita:', error);
  }
};


const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0] || null;
  if (file) {
    image.value = file;
    imageUrl.value = URL.createObjectURL(file );
  }
};
</script>


<template>
    <main class="main-wrapper">
      <section class="section-space">
        <div class="container">
          <div class="row">
            <PagesUserPage></PagesUserPage>
            <div class="col-lg-9">
              <div class="story-form">
                <div class="story-form__head">
                  <NuxtLink to="/user/storylist" target="_self" class="mr-20px">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" viewBox="0 0 24 24" class="font20 iconify iconify--akar-icons">
                      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m11 5l-7 7l7 7m-7-7h16"></path>
                    </svg>
                  </NuxtLink>
                  <h1 class="story-form__title">
                    Create Story
                  </h1>
                </div>
                <div class="story-form__wrapper">
                  <span>
                    <form @submit.prevent="createStory">
                      <span>
                        <div role="group" class="form-group" id="__BVID__278">
                          <label for="title" class="d-block" id="__BVID__278__BV_label_">
                            Title
                          </label>
                          <div>
                            <input v-model="title" id="title" type="text" placeholder="Enter a story title" class="form-control">
                          </div>
                        </div>
                      </span>
                      <span>
                        <div role="group" class="form-group" id="__BVID__281">
                          <label for="category" class="d-block" id="__BVID__281__BV_label_">
                            Category
                          </label>
                          <div>
                            <select v-model="category" id="category" class="custom-select">
                              <option disabled value="">
                                Select a category
                              </option>
                              <option value="3">Comedy</option>
                              <option value="4">Horror</option>
                              <option value="5">Romance</option>
                            </select>
                          </div>
                        </div>
                      </span>
                      <span>
                        <div role="group" class="form-group" id="__BVID__284">
                          <label for="content" class="d-block" id="__BVID__284__BV_label_">
                            Content
                          </label>
                          <div>
                            <ClientOnly>
                              <Quill v-model:content="content" name="content"/>
                            </ClientOnly>
                          </div>
                        </div>
                      </span>
                      <span>
                        <div role="group" class="form-group" id="__BVID__287">
                          <label for="cover-image" class="d-block" id="__BVID__287__BV_label_">
                            Cover Image
                          </label>
                          <div>
                            <div class="image-upload">
                              <label for="image-upload" class="image-upload__label form-control">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#000000" width="20" height="20">
                                  <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path>
                                </svg>
                                <img :src="imageUrl" alt="" style="width: 200px;">
                                <p>Add Image</p>
                              </label>
                              <input @change="handleFileChange" type="file" id="image-upload" accept=".png, .jpg, .jpeg" class="d-none form-control-file">
                            </div>
                          </div>
                        </div>
                      </span>
                      <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-outline-primary mr-5px">
                          Batal
                        </button>
                        <button type="submit" class="btn btn-primary">
                          Simpan
                        </button>
                      </div>
                    </form>
                  </span>
                </div>
              </div>
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

.section-space {
  padding-top: 22px;
}
</style>
