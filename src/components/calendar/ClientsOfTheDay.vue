<template>
    <div
        class=" md:mt-0 ml-5 max-h-full min-h-[500px] overflow-hidden pl-10  py-12 sm-col  mx-auto bg-[var(--content-bg)] bg-opacity-10 grow">

        <h1 class=" font-semibold text-3xl text-[var(--content-title-color)] py-2"><time> {{
            moment(selectedDate).format("MMMM DD, YYYY")
        }}</time>
        </h1>
        <q-separator></q-separator>
        <ol class="mt-4 space-y-1 text-sm leading-6  text-[var(--theme-color)]">
            <li v-for="item in appointments" :key="item.id"
                class="group relative flex items-center space-x-4  py-2 px-4 focus-within:bg-[var(--hover-menu-bg)] hover:bg-[var(--hover-menu-bg)]"
                @click="toggleQuickView(item.client)">
                <img :src="getClient(item.client).image" alt=""
                    class="h-12 w-12 flex-none transition-all object-cover hover:scale-150 rounded-full" />
                <div class="flex-auto">
                    <Suspense>
                        <h2 class="text-xl font-thin">{{ getClient(item.client).name }}</h2>
                        <template #fallback>
                            Comming...
                        </template>
                    </Suspense>
                    <!-- <p>{{ moment(item.start).format('MMMM DD, YYYY') }}</p> -->
                    <p class="mt-0.5">
                        <time>{{ moment(item.start).format('HH:mm') }}</time>
                        -
                        <time>{{ moment(item.end).format('HH:mm') }}</time>
                    </p>
                </div>
                <Menu as="div" class="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100">
                    <div>
                        <MenuButton
                            class="-m-2 flex items-center rounded-full p-1.5 text-[var(--theme-color)] hover:text-[var(--inactive-color)]">
                            <span class="sr-only">Open options</span>
                            <EllipsisVerticalIcon class="h-6 w-6" aria-hidden="true" />
                        </MenuButton>
                    </div>
                    <transition enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                        <MenuItems
                            class="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div class="py-1">
                                <MenuItem v-slot="{ active }">
                                <a href="#"
                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit</a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                <a href="#"
                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Cancel</a>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </transition>
                </Menu>
            </li>
        </ol>
    </div>
</template>

<script setup lang="ts">
import { inject } from "vue"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
import moment from "moment"
import { Appointment, Client } from "@/composables/interfaces"
import { useClientStore } from "@/stores/client"

defineProps<{
    appointments?: Appointment[],
    selectedDate?: any
}>()
const store = useClientStore()
const { open, toggleQuickView } = inject("quickview")

const getClient = (id: number) => {
    return store.useClients.find((client: Client) => client.id === id)
}

</script>