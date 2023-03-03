<template>
    <div class="overflow-hidden  flex-shrink-0  dark:border-gray-800 lg:block">
        <div class="relative my-2 mr-3 shadow">
            <input type="text" v-model="searchQuery"
                class="w-full m-1 pl-8 h-9 bg-[var(--search-bg)] 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     font-extralight        border border-gray-300 dark:border-gray-700 

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            text-[var(--theme-color)] placeholder:text-[var(--inactive-color)]  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             rounded-md text-sm"
                placeholder="Search clients" />
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
                <!-- <q-infinite-scroll @load="onLoad" :offset="750"> -->
                <q-list bordered>
                    <div v-for="client in clients" :key="client.id" draggable="true"
                        @dragstart="onDragStart($event, client)" class="overflow-y-hidden">
                        <ClientListItem :active="selectedClient === client" :client="client"
                            @click="selectClient(client)" />

                    </div>
                </q-list>

                <!-- </q-infinite-scroll> -->
            </div>
            <div v-else-if="clients">No clients found.</div>
            <div v-else class="h-full w-full flex justify-center items-center">
                <div class="row justify-center q-my-md">
                    <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, onBeforeUnmount } from "vue"
import { useQuasar } from 'quasar'
import useFetchClients from "@/composables/useFetchAllClients";
import useCalendar from '@/composables/useCalendar';
import { Client } from "@/composables/interfaces"
import ClientListItem from './ClientListItem.vue';
// interface Props {
//     activeClient?: Client;
//     clients: Client[];
// }

// withDefaults(defineProps<Props>(), {
//     clients: []
// })

const { clients, error, fetchClients } = useFetchClients();

const $q = useQuasar()
const timer = ref()
onBeforeUnmount(() => {
    if (timer.value !== void 0) {
        clearTimeout(timer.value)
        $q.loading.hide()
    }
})

const searchQuery = ref("");
const activeClient = ref<Client | null>(null);

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


const emit = defineEmits(['update:activeClient'])

function selectClient(client: Client) {
    // console.log("active client: ", client)
    selectedClient.value = client
    emit('update:activeClient', client)
}
const {
    selectedClient,
    onDragStart,
} = useCalendar();

// async function onLoad(index: number, done: any) {
//     console.log(index);
//     const { clients, error, fetchClients } = useFetchClients();
//     await fetchClients(index, pageSize.value)
//     done()

// }

// onMounted(async () => {
//     await fetchClients(1, 15)
// })
watchEffect(() => {
    filteredClients.value;
    console.log(activeClient.value);

});
</script>