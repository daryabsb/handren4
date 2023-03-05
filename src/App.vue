<script setup lang="ts">
import { ref } from "vue"

const lightMode = ref(false)
function toggleLightMode() {
  lightMode.value = !lightMode.value
  console.log('clicked');

}
</script>

<template>
  <div :class="{ 'light-mode': lightMode }">
    <div class="video-bg">
      <video width="320" height="240" autoplay loop muted>
        <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="dark-light" @click="toggleLightMode">
      <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>

    </div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style lang="scss">
/* @tailwind base;
@tailwind components;
@tailwind utilities; */
</style>
