<template>
 <p>This is page {{ id }}</p>
</template>

<script setup lang="ts">
    const { id } = useRoute().params;
</script>
