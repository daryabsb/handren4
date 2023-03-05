<template>
    <div class=" wrapper flex flex-1 overflow-hidden">
        <SideNavigation :is-nav="false">




            <ClientsList v-model:activeClient="activeClient" />



        </SideNavigation>
        <div class="col grow  overflow-hidden">


            <div
                class=" bg-[var(--theme-bg-color)] overflow-hidden row items-center justify-center border-b border-[var(--border-color)] h-14 flex-shrink-0">


                <q-tabs v-model="loadedPage" active-color="bg-pink-600" active-bg-color="bg-[var(--theme-bg-color)]"
                    class="text-[var(--theme-color)]">
                    <q-tab as="a" v-for="link in menu" :key="link.id" class="main-header-link " :name="link.name" href="#">
                        {{ link.title }}</q-tab>
                </q-tabs>
            </div>
            <q-tab-panels animated v-model="loadedPage" class=" bg-[var(--theme-bg-color)] "
                style="background-color: none;">
                <q-tab-panel class="bg-none q-pa-none" name="overview">

                    <div
                        class="content-wrapper pb-10 min-h-[720px] overflow-hidden w-full col text-[var(--theme-color)]  bg-[var(--theme-bg-color)] ">

                        <div class=" border border-[var(--border-color)]">
                            <Calendar width="350px" :disable-views="['years', 'year', 'week', 'day']" active-view="month"
                                :withClients="true" />
                        </div>
                    </div>
                </q-tab-panel>
                <q-tab-panel class="bg-none q-pa-none" name="client">
                    <div v-if="activeClient"
                        class="content-wrapper w-full col text-[var(--theme-color)]  h-full overflow-auto bg-[var(--theme-bg-color)]">

                        <!-- <div class="text-2xl font-extralight uppercase">{{ activeClient.name }}</div> -->
                        <div class="w-full">
                            <SelectedClient :client-id="activeClient.id" />
                        </div>
                    </div>
                    <div v-else
                        class="content-wrapper w-full col text-[var(--theme-color)] py-4 px-4 h-full overflow-auto bg-[var(--theme-bg-color)]">

                        <div class="text-2xl font-extralight uppercase">PLEASE SELECT A CLIENT TO SHOW</div>

                    </div>
                </q-tab-panel>
                <q-tab-panel class="bg-none q-pa-none" name="schedule">
                    <div
                        class="content-wrapper w-full col text-[var(--theme-color)] py-4 px-4 h-full overflow-auto bg-[var(--theme-bg-color)]">

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

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed, watchEffect, onBeforeUnmount } from "vue"
import { useQuasar } from 'quasar'

import SideNavigation from "@/components/navigations/SideNavigation.vue"
import Calendar from "@/components/calendar/index.vue"
import { Client, Appointment, ReturnedData } from "@/composables/interfaces";
import ClientsList from "@/components/client/ClientsList.vue";
import SelectedClient from "@/components/client/SelectedClient.vue";


const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
}


const activeClient = ref<Client | null>(null);







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