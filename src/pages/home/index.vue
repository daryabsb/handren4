<template>
    <div class=" wrapper flex flex-1 overflow-hidden">
        <SideNavigation :is-nav="false">


            <div class="overflow-hidden  flex-shrink-0  dark:border-gray-800 lg:block">
                <div class="text-md q-pa-sm text-gray-400 tracking-wider">CLIENTS</div>
                <div class="relative my-2 mr-3 shadow">
                    <input type="text" v-model="searchQuery"
                        class="w-full m-1 pl-8 h-9 bg-[var(--search-bg)] 
                                                                                                                                                                                                                                                         font-extralight        border border-gray-300 dark:border-gray-700 

                                                                                                                                                                                                                                                                text-[var(--theme-color)] placeholder:text-[var(--inactive-color)]  
                                                                                                                                                                                                                                                                                                 rounded-md text-sm"
                        placeholder="Search" />
                    <svg viewBox="0 0 24 24"
                        class="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-3"
                        stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                <div v-if="error">
                    {{ error }}
                </div>
                <div v-else class="max-h-[50em] overflow-auto px-1.5">
                    <div v-if="filteredClients">
                        <ClientsList :clients="filteredClients" />

                    </div>
                    <div v-else-if="clients">No clients found.</div>
                    <div v-else class="h-full w-full flex justify-center items-center">
                        <q-circular-progress indeterminate size="75px" :thickness="0.6" color="lime" center-color="grey-8"
                            class="q-ma-md" />
                    </div>
                </div>
            </div>

        </SideNavigation>
        <div class="col grow overflow-hidden">
            <q-layout view="hHr LpR lFf" container>
                <q-drawer overlay side="left" v-model="leftDrawerOpen" bordered>
                    Put something here
                </q-drawer>
                <q-page-container>
                    <div
                        class="overflow-hidden row items-center justify-center border-b border-[var(--border-color)] h-14 flex-shrink-0">

                        <q-tabs v-model="loadedPage" class="text-[var(--theme-color)]">
                            <q-tab as="a" v-for="link in menu" :key="link.id" class="main-header-link " :name="link.name"
                                href="#">
                                {{ link.title }}</q-tab>
                        </q-tabs>
                    </div>
                    <q-tab-panels animated v-model="loadedPage" class=" bg-[var(--theme-bg-color)]"
                        style="background-color: none;">
                        <q-tab-panel class="bg-none q-pa-none " name="overview">

                            <div
                                class="content-wrapper min-h-[720px] overflow-hidden w-full col text-[var(--theme-color)] py-4 px-4 bg-[var(--theme-bg-color)]">
                                <div class="text-2xl font-extralight uppercase">Overview</div>
                                <div class="w-full h-full">
                                    <Calendar width="350px" :disable-views="['years', 'year', 'week', 'day']"
                                        active-view="month" :withClients="true" />
                                </div>
                            </div>
                        </q-tab-panel>
                        <q-tab-panel class="bg-none q-pa-none" name="client">
                            <div
                                class="content-wrapper w-full col text-[var(--theme-color)] py-4 px-4 h-full overflow-auto bg-[var(--theme-bg-color)]">
                                <div class="text-2xl font-extralight uppercase">Current client</div>
                                <div class="w-full h-96 bg-pink-700">
                                    THIS IS THE MOBILE
                                </div>
                            </div>
                        </q-tab-panel>
                        <q-tab-panel class="bg-none q-pa-none" name="schedule">
                            <div
                                class="content-wrapper w-full col text-[var(--theme-color)] py-4 px-4 h-full overflow-auto bg-[var(--theme-bg-color)]">
                                <div class="text-2xl font-extralight uppercase">Schedule</div>
                                <div class="w-full h-full">
                                    <Calendar height="600px" width="850px" active-view="week"
                                        :disable-views="['years', 'year', 'month', 'day']" :withClients="false" />
                                </div>
                            </div>
                        </q-tab-panel>
                        <q-tab-panel class="bg-none q-pa-none" name="users">
                            <div
                                class="content-wrapper w-full col text-[var(--theme-color)] py-4 px-4 h-full overflow-auto bg-[var(--theme-bg-color)]">
                                <div class="text-2xl font-extralight uppercase">Users</div>
                                <div class="w-full h-96 bg-pink-700"></div>
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </q-page-container>
            </q-layout>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onBeforeUnmount } from "vue"
import { useQuasar } from 'quasar'
import useFetchClients from "@/composables/useFetchClients";
import SideNavigation from "@/components/glossy/SideNavigation.vue"
import Calendar from "@/components/home/Calendar.vue"
import { Client, Appointment, ReturnedData } from "@/composables/interfaces";
import ClientsList from "@/components/client/ClientsList.vue";
const { clients, error } = useFetchClients();

const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
}


const searchQuery = ref("");

const normalizedSearchQuery = computed(() => {
    return searchQuery.value.trim().toLowerCase();
});
const filteredClients = computed(() => {
    const query = normalizedSearchQuery.value;
    if (!query) {
        return clients.value;
    } else {
        return clients.value.filter((client: Client) => {
            const [firstName, lastName] = client.name.split(" ");
            return (
                firstName.toLowerCase().includes(query) ||
                lastName.toLowerCase().includes(query)
            );
        });
    }
});


watchEffect(() => {
    filteredClients.value;
});
const $q = useQuasar()
const timer = ref()
onBeforeUnmount(() => {
    if (timer.value !== void 0) {
        clearTimeout(timer.value)
        $q.loading.hide()
    }
})







const loadedPage = ref('overview')
const menu = ref([
    {
        id: 1, title: 'Overview', href: '#', name: 'overview'
    },
    {
        id: 2, title: 'Current Client', href: '#', name: 'client'
    },
    {
        id: 3, title: 'Schedule', href: '#', name: 'schedule'
    },
    {
        id: 4, title: 'Users', href: '#', name: 'users'
    },
])
</script>