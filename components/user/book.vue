<template>
    <div class="m-0 px-4 w-100 mb-4 story-list">
        <div class="d-flex justify-content-between align-items-center align-content-center">
            <h4 class="m-0 p-0">Bookmark</h4>
        </div>
        <div v-if="!bookmarks.length" class="mt-5 mb-3">
            <div class="text-center">
                <img class="me-4" style="width: 20%;" src="~/public/empty-data.svg" alt="">
                <p class="p-0 mt-3 fw-semibold" style="font-size: 24px;">No data found</p>
            </div>
        </div>
        <div v-else>
            <UserBookmarks :bookmarks="bookmarks" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStories } from '~/stores/stories';

const stories = useStories();
const bookmarks = computed(()=> stories.getBookmarks)

</script>

<style scoped>
.story-list {
  padding: 25px;
  border: none;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

</style>