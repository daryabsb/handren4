<template>
    <div class="sm:grid sm:grid-cols-2 sm:divide-x sm:divide-gray-200 pt-4 q-py-4">
        <section class=" sm:pl-14">
            <div class="flex items-center px-2 py-4">
                <h2 v-if="vuecal" class="flex-auto text-2xl font-semibold text-gray-900">{{ currentMonth }}</h2>
                <button type="button"
                    class="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                    @click="prevMonth">
                    <!-- @click="vuecal.previous()"> -->
                    <span class="sr-only">Previous month</span>
                    <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                </button>
                <button type="button"
                    class="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                    @click="nextMonth">
                    <span class="sr-only">Next month</span>
                    <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
            <vue-cal ref="vuecal" @cell-click="selectDate($event)" :events="data.results" xsmall :time="false"
                hide-view-selector :active-view="activeAiew" :selected-date="selectedDate"
                :disable-views="['years', 'year', 'week']" style="max-width: 450px;height: 350px" :hideTitleBar="true">

            </vue-cal>
        </section>
        <clients-of-the-day :appointments="appointments" :selected-date="selectedDate" />
    </div>
</template>
  
<script setup lang="ts">
import { defineProps, ref, onMounted, computed, watch } from "vue"
import { Appointment, Client } from "@/composables/interfaces"
import moment from "moment"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
import useFetchData from '@/composables/useFetchData'
import { useClientStore } from "@/stores/client"
import ClientsOfTheDay from "./ClientsOfTheDay.vue"

interface Props {
    activeView?: string
}

const props = withDefaults(defineProps<Props>(), {
    activeView: 'week',
})

const store = useClientStore()
const vuecal = ref<null | any>(null)
const currentMonth = ref(moment().format('MMMM YYYY'))
const startDate = ref(moment())
const selectedDate = ref(moment())
const title = ref('')
const today = ref(moment())

const selectDate = (e: any) => {
    selectedDate.value = moment(e)
}

const { data, error } = useFetchData(props.activeView, startDate)

watch(selectedDate, () => {
    startDate.value = selectedDate.value.clone().startOf(props.activeView as string)
})

onMounted(async () => {
    await store.fetchClients()
    selectedDate.value = moment()
})

const appointments = computed(() => {
    const todayDate = selectedDate.value.date();
    const todayMonth = selectedDate.value.month();
    return data.value.results.filter((item: Appointment) => {
        const itemDate = moment(item.date).date();
        const itemStart = moment(item.start).date();
        const itemMonth = moment(item.start).month();
        const isCurrentMonth = itemMonth === selectedDate.value.month();
        const isCurrentDate = itemDate === todayDate;
        const isCurrentMonthAndAfterToday = isCurrentMonth && itemDate >= todayDate;
        const isNextMonthAndBeforeToday = !isCurrentMonth && itemStart < todayDate;
        return isCurrentDate || isCurrentMonthAndAfterToday || isNextMonthAndBeforeToday;
    })
})

const clients = computed(() => {
    const appointmentsOfTheDay = appointments.value.filter((appointment: Appointment) => {
        return moment(appointment.date).isSame(selectedDate.value, props.activeView as string)
    })
    const clientIds = appointmentsOfTheDay.map((appointment: Appointment) => appointment.client)
    return store.clients.filter((client: Client) => {
        return clientIds.includes(client.id)
    })
})

const prevMonth = () => {
    selectedDate.value = selectedDate.value.subtract(1, props.activeView as string)
}

const nextMonth = () => {
    selectedDate.value = selectedDate.value.add(1, props.activeView as string)
}

const openEditModal = (id: number) => {
    console.log(`Opening edit modal for appointment with id: ${id}`);
}

const openDeleteModal = (id: number) => {
    console.log(`Opening delete modal for appointment with id: ${id}`);
}
</script>
  
<style>
.vuecal__cell--selected {
    background-color: #ca1c90;
    color: beige;
    z-index: 2;
}

.vuecal__cell-events-count {
    position: absolute;
    left: 20%;
    top: 0%;
    transform: translate(-50%);
    min-width: 22px;
    height: 22px;
    line-height: 12px;
    padding: 0 3px;
    background: #999;
    color: #fff;
    border-radius: 12px;
    font-size: 10px;
    box-sizing: border-box;
}
</style>