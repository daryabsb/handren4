<template>
  <div class="max-h-full h-[45rem] q-pa-md flex divide-x divide-[var(--border-color)] overflow-hidden">
    <section :class="[
      withClients
        ? '2/3'
        : 'w-full',
      ' relative h-[430px]']">
      <div class="flex items-center q-py-sm">
        <h2 v-if="vuecal" class="flex-auto text-2xl font-semibold text-white">{{ currentMonth }}</h2>

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

      <vue-cal ref="vuecal" :events="events" :small="true" :time-from="12 * 60" :time-to="24 * 60" :timeStep="15"
        :twelve-hour="true" :hideTitleBar="true" @cell-click="selectDate($event)" :timeCellHeight="20"
        :active-view="activeView" :snapToTime="30" :watchRealTime="true" :startWeekOnSunday="true"
        :disable-views="disableViews" :on-event-click="onEventClick"
        :editable-events="{ title: false, drag: true, resize: true, delete: true, create: true }"
        @event-duration-change="onDrop" :selected-date="selectedDate" @view-change="viewChange($event)"
        @cell-focus="selectedDate = $event" hide-view-selector @event-drop="onEventDrop($event)" :time="true"
        :onEventCreate="onEventCreate" :style="{ minHeight: height, maxWidth: width }" @event-delete="onDelete">
        <!-- @event-duration-change="onEventDurationChange"
                              :showTimeInCells="true"
                                                                                                                  style="max-width: 450px;height: 350px" 
                                                                                                                  @cell-click="selectDate($event)" 
                                                                                                                    :time="false"
                                                                                                                      :onEventDblclick="onEventDoubleClick"
                                                                                                                      :events="appToCalendar"
                                                                                                                      @event-drag-create="showEventCreationDialog = true"
                                                                                                                      -->
        <template #time-cell="{ hours, minutes }">
          <div :class="{ 'vuecal__time-cell-line': true, hours: !minutes }">
            <strong v-if="!minutes" style="font-size: 15px">{{ hours }}</strong>
            <span v-else style="font-size: 11px">{{ minutes }}</span>
          </div>
        </template>
        <!-- Custom cells -->
        <template #cell-content="{ cell, view, events, goNarrower }">
          <span class="vuecal__cell-date" :class="view.id" v-if="view.id === 'day'" @click="goNarrower">
            {{ cell.date.getDate() }}
          </span>
          <!-- <span class="vuecal__cell-events-count" v-if="view.id === 'month' && events.length">{{ events.length }}</span> -->
          <span class="vuecal__no-event" v-if="['week', 'day'].includes(view.id) && !events.length">Nothing here
            👌</span>
        </template>
        <template #event="{ event, view }">
          <q-card padding="xs" class="my-card q-pa-none bg-transparent border-0 text-neutral-300" flat bordered>
            <q-item>

              <!-- <q-item-section v-if="event.client" avatar>
                                                                                         </q-avatar>
                                                                                                    <q-avatar>
                                                                                                      <q-img :src="getClient(event.client).image" class="hidden">
                                                                                                        <template #loading>
                                                                                                          <q-inner-loading>
                                                                                                            <q-spinner-gears size="50px" color="primary" />
                                                                                                          </q-inner-loading>
                                                                                                        </template>
                                                                                                      </q-img>
                                                                                                  </q-item-section> -->

              <q-item-section>
                <q-item-label class="text-xs drop-shadow-sm leading-tighter text-white uppercase font-normal">{{
                  event.title
                }}</q-item-label>
                <q-item-label caption class="text-sm tracking-tighter text-neutral-400">
                  {{ event.start.formatTime("hh:mm") }}-{{ event.end.formatTime("hh:mm") }}
                </q-item-label>
              </q-item-section>
            </q-item>

          </q-card>


          <!-- <div class="vuecal__event-title vuecal__event-title--edit" contenteditable
                @blur="event.title = $event.target.innerHTML" v-html="event.title" /> -->

          <!-- <small class="vuecal__event-time">
            <strong>Event start:</strong> <span>{{ event.start.formatTime("h O'clock") }}</span><br />
            <strong>Event end:</strong> <span>{{ event.end.formatTime("h O'clock") }}</span>
          </small> -->
        </template>
      </vue-cal>

    </section>

    <clients-of-the-day v-if="withClients" :appointments="appointments" :selected-date="selectedDate" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, inject, nextTick, watchEffect } from "vue"
import { Appointment, Client, ViewChange } from "@/composables/interfaces"
import moment from "moment"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
import useFetchData from '@/composables/useFetchData'
import useFetchAppointments from '@/composables/useFetchAppointments'
import { useClientStore } from "@/stores/client"
import ClientsOfTheDay from "./ClientsOfTheDay.vue"
import useCalendar from '@/composables/useCalendar';
import {
  Loading,

  // optional!, for example below
  // with custom spinner
  QSpinnerGears
} from 'quasar'

interface Props {
  width?: string,
  height?: string,
  withClients: boolean,
  activeView?: string,
  disableViews: string[]
}

const props = withDefaults(defineProps<Props>(), {
  width: '350px',
  height: '20rem',
  withClients: false,
  activeView: 'month',
  disableViews: ['years']
})

const { open, toggleQuickView } = inject("quickview")

const {
  selectedClient,
  selectedEvent,
  // onEventCreate,
  onDragStart,
  onEventDurationChange,
  onEventClick,
  onEventDoubleClick,
  onEventDrop, onEventDelete
} = useCalendar();
const today = ref(new Date())
const viewStartDate = ref()
const store = useClientStore()
const currentMonth = ref('')
const title = ref('')
const vuecal = ref(null)
const selectedDate = ref(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
const currentView = ref('')



const month = computed({
  get: () => currentMonth.value,
  set: (value) => currentMonth.value = value
});

const viewForFetch = computed({
  get: () => currentView.value,
  set: (value) => currentView.value = value
});
const { data, error, fetchData } = useFetchAppointments({ viewForFetch, viewStartDate })
const events = computed(() => data.value)
const appointments = computed(() => {
  const todayDate = selectedDate.value.getDate();
  const todayMonth = selectedDate.value.getMonth();
  return data.value.filter((item: Appointment) => {
    const itemDate = new Date(item.date).getDate();
    const itemStart = new Date(item.start).getDate();
    const itemMonth = new Date(item.start).getMonth();
    return itemDate === todayDate && itemMonth === todayMonth || itemStart === todayDate && itemMonth === todayMonth;
  })

})






onMounted(async () => {
  today.value = new Date(selectedDate.value)
  currentView.value = props.activeView
  viewStartDate.value = new Date(selectedDate.value)
  currentMonth.value = moment(new Date()).format("MMMM YYYY");

  await store.fetchClients()
})

watchEffect(async () => await fetchData())

function selectDate(e: any) {
  selectedDate.value = new Date(new Date(e).getFullYear(), new Date(e).getMonth(), new Date(e).getDate())
}
function viewChange({ view, startDate }: ViewChange) {
  viewStartDate.value = startDate;
  currentView.value = view
}

async function onEventCreate(event: any, deleteEventFunction: void) {
  // await fetchData()
  return event
}
async function onDrop(event: any) {
  Loading.show()
  await onEventDrop(event)
  await nextTick()
  // await fetchData()
  Loading.hide()
}
async function onDelete(event: Appointment) {
  console.log(event);
  Loading.show()
  event.class = "line-throug"
  await onEventDelete(event)
  // await fetchData()
  Loading.hide()
}

function getClient(id: number) {
  return store.useClients.find((client: Client) => client.id === id)
}
function prevMonth() {
  vuecal.value.previous();
  currentMonth.value = vuecal.value.viewTitle;
};

function nextMonth() {
  vuecal.value.next();
  currentMonth.value = vuecal.value.viewTitle;
};




</script>

<style>
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

.vuecal__cell--selected {
  @apply bg-teal-600 text-green-400 bg-opacity-40
}

.vuecal__cell--today {
  @apply bg-[var(--theme-bg-color)]
}

.vuecal__event-title {
  @apply text-[var(--content-title-color)] font-semibold uppercase
}

.vuecal__time-column {
  @apply w-2
}

.vuecal__event-time {
  @apply text-pink-500 bg-opacity-30
}

.vuecal__time-cell-line.hours:before {
  border-color: #42b983;
}

.vuecal__event {
  @apply flex flex-col bg-[var(--content-bg)] flex-wrap justify-center items-center cursor-pointer border border-[var(--border-color)] p-0
}

/* .vuecal__time-column{}
.vuecal__time-cell {

} */
</style>