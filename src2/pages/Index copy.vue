<script setup lang="ts">
import Calendar from "@/components/Home/Calendar.vue";
</script>
<template>
  <q-layout>

    <div class="flex items-center justify-center py-12 ">
      <div class="max-w-7xl mx-auto py-2 pt-1 ">

        <main class="mx-auto">
          <!-- Replace with your content -->
          <div class="flex px-4 py-2 sm:px-0">
            <div class=" rounded-lg border-4 border-dashed border-gray-200 p-4">
              <calendar />
            </div>

          </div>
          <!-- /End replace -->
        </main>
      </div>
    </div>

  </q-layout>
</template>

