<template>
    <div class="left-side flex gt-sm  border-r border-[var(--border-color)] 
                overflow-hidden flex-shrink-0">
        <div v-if="isNav" class="side-wrapper mt-5">
            <SideNavigationMenuItems v-for="item in menu" :key="item.id" :menu-item="item" />
        </div>
        <slot v-else />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SideNavigationMenuItems from "./SideNavigationMenuItems.vue"

interface Props { isNav: boolean }
const props = withDefaults(defineProps<Props>(), {
    isNav: false
})

const menu = ref([
    {
        id: 1, title: 'Apps', sections: [
            {
                title: "All Apps",
                icon: 'apps'
            },
            {
                title: "Updates",
                icon: 'update'
            },
        ]
    },
    {
        id: 2, title: 'Categories', sections: [
            { title: "Photography", icon: "photo_camera" },
            { title: "Graphic Design", icon: "architecture" },
            { title: "Video", icon: "video_stable" },
            { title: "Illustrations", icon: "palette" },
            { title: "UI/UX", icon: "grid_view" },
            { title: "3D/AR", icon: "view_in_ar" },
        ]
    },
    {
        id: 3, title: 'Fonts', sections: [
            { title: "Manage Fonts", icon: "text_format" },

        ]
    },
    {
        id: 4, title: 'Resource Links', sections: [
            { title: "Stock", icon: "inventory" },
            { title: "Tutorials", icon: "cast_for_education" },
            { title: "Portfolio", icon: "face" },
            { title: "Behance", icon: "water_drop" },
            { title: "Social Forum", icon: "military_tech" },
        ]
    },

])


</script>