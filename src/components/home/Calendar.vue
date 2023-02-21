<template>
  <div class=" md:divide-gray-200">

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
    <vue-cal ref="vuecal" @cell-click="selectDate($event)" :events="data.results" xsmall :time="false" hide-view-selector
      active-view="month" :selected-date="selectedDate" :disable-views="['years', 'year', 'week']"
      style="max-width: 450px;height: 350px" :hideTitleBar="true">

    </vue-cal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, inject } from "vue"
import { Appointment, Client } from "@/composables/interfaces"
import moment from "moment"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
import useFetchData from '@/composables/useFetchData'
import { useClientStore } from "@/stores/client"

const store = useClientStore()
const { open, toggleQuickView } = inject("quickview")
const currentMonth = ref('')
const month = computed({
  get: () => currentMonth.value,
  set: (value) => currentMonth.value = value
});

const title = ref('')
const vuecal = ref(null)
const selectedDate = ref(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
const selectDate = (e: any) => {
  selectedDate.value = new Date(new Date(e).getFullYear(), new Date(e).getMonth(), new Date(e).getDate())
};

const today = ref(new Date())

const { data, error } = useFetchData(month)

onMounted(async () => {
  today.value = new Date(selectedDate.value)
  currentMonth.value = moment(new Date()).format("MMMM YYYY");
  await store.fetchClients()
})

const appointments = computed(() => {
  const todayDate = selectedDate.value.getDate();
  const todayMonth = selectedDate.value.getMonth();
  return data.value.results.filter((item: Appointment) => {
    const itemDate = new Date(item.date).getDate();
    const itemStart = new Date(item.start).getDate();
    const itemMonth = new Date(item.start).getMonth();
    return itemDate === todayDate && itemMonth === todayMonth || itemStart === todayDate && itemMonth === todayMonth;
  })
})
const getClient = (id: number) => {
  return store.useClients.find((client: Client) => client.id === id)
}
const prevMonth = () => {
  vuecal.value.previous();
  currentMonth.value = vuecal.value.viewTitle;
};

const nextMonth = () => {
  vuecal.value.next();
  currentMonth.value = vuecal.value.viewTitle;
};
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