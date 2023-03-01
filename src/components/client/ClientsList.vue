<template>
    <q-list bordered>
        <div v-for="client in clients" :key="client.id" draggable="true" @dragstart="onDragStart($event, client)"
            class="overflow-y-hidden">
            <ClientListItem :active="selectedClient === client" :client="client" @click="selectClient(client)" />

        </div>
    </q-list>
</template>

<script setup lang="ts">
import useCalendar from '@/composables/useCalendar';
import { Client } from "@/composables/interfaces"
import ClientListItem from './ClientListItem.vue';
interface Props {
    activeClient?: Client;
    clients: Client[];
}

withDefaults(defineProps<Props>(), {
    clients: []
})

const emit = defineEmits(['update:activeClient'])

function selectClient(client: Client) {
    // console.log("active client: ", client)
    selectedClient.value = client
    emit('update:activeClient', client)
}
const {
    selectedClient,
    selectedEvent,
    onDragStart,
    onEventDurationChange,
    onEventClick,
    onEventDoubleClick,
    onEventDrop, onEventDelete
} = useCalendar();
</script>