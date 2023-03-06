<script lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import axios from 'axios'
import useTimeline from "@/composables/useTimeline"

interface Appointment {
    id: number
    client: number
    title: string | null
    date: string
    date_to: string | null
    treatments: any[]
    attachments: any[]
    prescriptions: any[]
}

export default {
    props: {
        clientId: {
            type: Number,
            default: null
        },
        dateRange: {
            type: Object,
            default: null
        }
    },
    setup(props) {

        const nextPageUrl = ref<string | null>(null)
        const isLoading = ref(false)
        const { loadAppointments, state } = useTimeline()

        const loadAppointmentGuru = async () => {
            isLoading.value = true
            try {
                let url = '/api/timeline/'
                if (props.clientId) {
                    url += `?client=${props.clientId}`
                }
                if (props.dateRange) {
                    url += `&start=${props.dateRange.start}&end=${props.dateRange.end}`
                }
                const response = await axios.get(url)
                // appointments.value = response.data.results
                nextPageUrl.value = response.data.next
            } catch (error) {
                console.error(error)
            } finally {
                isLoading.value = false
            }
        }

        watchEffect(() => {
            loadAppointments()
        })

        const loadMore = async () => {
            if (nextPageUrl.value) {
                isLoading.value = true
                try {
                    const response = await axios.get(nextPageUrl.value)
                    appointments.value.push(...response.data.results)
                    nextPageUrl.value = response.data.next
                } catch (error) {
                    console.error(error)
                } finally {
                    isLoading.value = false
                }
            }
        }

        return {
            state,
            isLoading,
            loadMore
        }
    }
}
</script>
<template>
    <button @click="loadMore">load more</button>
    <pre>{{ state }}</pre>
    <ul>
        <li v-for="appointment in state.appointments" :key="appointment.id">{{ appointment }}</li>

    </ul>
</template>