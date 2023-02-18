<script setup lang="ts">
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style>
/* @tailwind base;
@tailwind components;
@tailwind utilities; */
</style>
