<template>
    <q-list bordered>
        <div v-for="client in clients" :key="client.id" draggable="true" @dragstart="onDragStart($event, client)"
            class="overflow-y-hidden">
            <ClientListItem :active="selectedClient === client.id" :client="client" @click="selectClient(client.id)" />

        </div>
    </q-list>
</template>

<script setup lang="ts">
import useCalendar from '@/composables/useCalendar';
import { Client } from "@/composables/interfaces"
import ClientListItem from './ClientListItem.vue';
interface Props {
    clients: Client[];
}

withDefaults(defineProps<Props>(), {
    clients: []
})
function selectClient(id: number) {
    console.log("active client: ", id)
    selectedClient.value = id
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