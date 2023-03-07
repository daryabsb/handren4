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

const { state, loadAppointments } = useTimeline();

const appointments = ref<Appointment[]>([]);

const load = async () => {
    await loadAppointments(
        props.clientId,
        props.dateFrom,
        props.dateTo,
        props.page,
        props.pageSize,
    );
};

onMounted(load);

watch(
    () => [props.clientId, props.dateFrom, props.dateTo, props.page, props.pageSize],
    load,
);

</script>

<template>
    <div v-if="state.isLoading">Loading...</div>
    <div v-if="state.error">Error: {{ state.error.message }}</div>
    <div v-if="!state.isLoading && !state.error">
        <!-- Render appointment data here -->
    </div>
    <div v-for="appointment in state.appointments" :key="appointment.id">
        <pre>
                        {{ appointment }}
                    </pre>
    </div>
</template>