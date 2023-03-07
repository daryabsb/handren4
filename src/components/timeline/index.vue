<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import useTimeline from '@/composables/useTimeline';
import { Appointment } from '@/composables/interfaces';

interface Props {
    clientId: number;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    pageSize?: number;
}

const props: Props = defineProps({
    clientId: { type: Number, required: true },
    dateFrom: { type: String },
    dateTo: { type: String },
    page: { type: Number },
    pageSize: { type: Number },
});

const { state, loadPastAppointments, loadUpcomingAppointments } = useTimeline();
const pastAppointments = ref<Appointment[]>();
const upcomingAppointments = ref<Appointment[]>();

const load = async () => {
    await Promise.all([
        loadPastAppointments(),
        loadUpcomingAppointments(),
    ]);
};

onMounted(load);

watch(
    () => [props.clientId, props.dateFrom, props.dateTo, props.page, props.pageSize],
    load,
);

</script>

<template>
    <!-- {{ state }} -->
    <div v-if="state.isLoading">Loading...</div>
    <div v-if="state.error">Error: {{ state.error.message }}</div>
    <div v-if="!state.isLoading && !state.error">
        <!-- Render appointment data here -->
        <div v-for="appointment in state.past" :key="appointment.id">
            <pre>
                                     {{ appointment }}
                                   </pre>
        </div>
    </div>
</template>