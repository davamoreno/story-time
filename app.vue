<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
const { $bs } = useNuxtApp();

onMounted(() => {
  try {
    const collapse = new $bs.Collapse('#navbarSupportedContent');
    collapse.show();
  } catch (e) {
    console.log('Bootstrap error: ', e);
  }
});
</script>

<style lang="scss">
  @use "~/assets/styles/main.scss";
</style>
