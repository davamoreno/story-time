<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <navigation-bar></navigation-bar>
    </nav>
</template>

<script setup>
    import NavigationBar from "./header/NavigationBar.vue";
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

<style lang="scss" scoped>
    
</style>