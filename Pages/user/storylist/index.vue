<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useStories } from '~/stores/stories';

const storyStore = useStories();
const authStore = useAuthStore();
const storyDeleteId = ref<number | null>(null);

onMounted( async () => {
  try {
    await storyStore.getUserStory();
  } catch (err) {
    console.log(err);
  }
});

const setDeleteId = (storyId: any) => {
  storyDeleteId.value = storyId;
};

const deleteStory = async () => {
  if (storyDeleteId.value) {
    try {
      await storyStore.deleteStory(storyDeleteId.value);
      storyDeleteId.value = null;
    } catch (err) {
      console.log(err);
    }
  }
};

onMounted( () => {
  storyDeleteId.value = null;
});
</script>

<template>
  <main class="main-wrapper">
    <section class="section-space">
      <div class="container">
        <div class="row">
          <PagesUserPage />
          <div class="col-lg-9">
            <div class="story-list">
              <div class="story-list__header">
                <h1 class="story-list__title">Story List</h1>
                <NuxtLink to="/user/storylist/create" class="btn btn-primary btn-sm mr-5px" target="_self">+ Create Story</NuxtLink>
              </div>
              <div class="story-list__wrapper" v-if="storyStore.storyList.length === 0">
                <div class="empty-state">
                  <img src="/empty-data.svg" class="empty-state__img" />
                  <p class="empty-state__desc">No data found</p>
                </div>
              </div>
              <div class="story-list__wrapper" v-else>
                <table class="table story-list__table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Last Update</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    <tr v-for="(story, index) in storyStore.storyList" :key="story.id" style="font-size: 14px;">
                      <td>
                        <NuxtLink :to="'/details/' + story.id" class="text-decoration-none text-black">
                          {{ story.title }}
                        </NuxtLink>
                      </td>
                      <td>{{ story.updatedAt }}</td>
                      <td>
                        <NuxtLink :to="'/user/storylist/' + story.id + '/edit'" class="btn btn-outline-dark rounded-0 py-1 px-3 me-3 btn-edit">
                          <i class="fa-solid fa-pen"></i> Edit
                        </NuxtLink>
                        <button class="btn btn-outline-danger rounded-0 py-1 px-3 btn-delete" data-bs-toggle="modal" data-bs-target="#deleteModal" @click="setDeleteId(story.id)">
                          <i class="fa-solid fa-trash-can"></i> Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Delete Confirmation Modal -->
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">Confirm Delete</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete this story?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger" @click="deleteStory()" data-bs-dismiss="modal">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  padding: 78px 0 100px;
}

.section-space {
  padding-top: 22px;
}

.story-list {
  padding: 25px;
  border: none;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

.story-list__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

h1 {
  margin-bottom: 0;
}

.story-list__title {
  font-size: 24px;
}

.btn {
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0;
}

.btn-sm {
  padding: 5px 15px;
}

.mr-5px {
  margin-right: 5px !important;
}

.empty-state {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty-state__img {
  width: 20%;
  margin: 0 auto;
}

.empty-state__desc {
  font-size: 24px;
  font-weight: 500;
  margin-top: 15px;
}
</style>
