<template>
    <div>
        <div class="side-title text-[var(--inactive-color)] mb-3">{{ menuItem.title }}</div>
        <div class="side-menu  col whitespace-nowrap">
            <a v-for="(link, index) in menuItem.sections" :key="index" href="#"
                class="relative
                                                                                                                                                                                                                                                    w-full hover:bg-[var(--hover-menu-bg)] decoration-[none] 
                                                                                                                                                                                                                                                    text-[var(--theme-color)] flex items-center py-2 text-sm rounded-md transition-all">
                <q-icon class="mr-3 w-4" :name="link.icon" size="sm" />

                {{ link.title }}
                <q-badge v-if="index === 1" color="blue" class="ml-4">4</q-badge>


            </a>
        </div>
    </div>
</template>

<script setup lang="ts">

interface MenuItem {
    id: number;
    title: string;
    sections: string[]
}



const props = defineProps<{
    menuItem: MenuItem
}>()
</script>