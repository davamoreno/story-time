<template>
  <div>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/auth';
import { useStories } from './stores/stories';
const layout = "default";

const auth = useAuthStore();
const stories = useStories();

// const { $bs } = useNuxtApp();

// onMounted(() => {
//   try {
//     const collapse = new $bs.Collapse('#navbarSupportedContent');
//     collapse.show();
//   } catch (e) {
//     console.log('Bootstrap error: ', e);
//   }
// });

onMounted(async () => {
    await auth.initialAuth();
    stories.loadBookmarks();
});
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
</style>
