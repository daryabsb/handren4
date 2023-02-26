<template>
  <div class="h-full q-pa-md flex divide-x divide-gray-200">
    <section :class="[
      withClients
        ? '2/3'
        : 'w-full',
      ' relative']">
      <div class="flex items-center q-py-sm">
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

      <vue-cal ref="vuecal" :events="events" :small="false" :time-from="12 * 60" :time-to="22 * 60" :timeStep="120"
        :hideTitleBar="true" @cell-click="selectDate($event)" :timeCellHeight="90" :active-view="activeView"
        :snapToTime="30" :watchRealTime="true" :startWeekOnSunday="true" :disable-views="disableViews"
        :editable-events="{ title: false, drag: true, resize: true, delete: true, create: true }"
        :selected-date="selectedDate" @view-change="viewChange($event)" @cell-focus="selectedDate = $event"
        hide-view-selector @event-drop="onEventDrop($event)" :onEventCreate="onEventCreate" style="min-height: 20rem;">
        <!-- @event-duration-change="onEventDurationChange"
                              style="max-width: 450px;height: 350px" 
                              @cell-click="selectDate($event)" 
                                :time="false"
                                  :onEventDblclick="onEventDoubleClick"
                                  :events="appToCalendar"
                                  :on-event-click="onEventClick"
                                  @event-drag-create="showEventCreationDialog = true"
                                  @event-delete="onEventDelete"-->
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
          <span class="vuecal__cell-events-count" v-if="view.id === 'month' && events.length">{{ events.length }}</span>
          <span class="vuecal__no-event" v-if="['week', 'day'].includes(view.id) && !events.length">Nothing here
            👌</span>
        </template>
        <template #event="{ event, view }">
          <q-card padding="xs" class="my-card q-pa-none" flat bordered>
            <q-item>
              <q-item-section v-if="event.client" avatar>
                <q-avatar>
                  <q-img :src="getClient(event.client).image">
                    <template #loading>
                      <q-inner-loading>
                        <q-spinner-gears size="50px" color="primary" />
                      </q-inner-loading>
                    </template>
                  </q-img>
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ event.title }}</q-item-label>
                <q-item-label caption>
                  {{ event.start.formatTime("hh:mm") }}-{{ event.end.formatTime("h:m") }}
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
import { ref, onMounted, computed, inject } from "vue"
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

interface Props {
  withClients: false,
  activeView?: string,
  disableViews: string[]
}

const props = withDefaults(defineProps<Props>(), {
  withClients: false,
  activeView: 'month',
  disableViews: ['years']
})

const { data, error } = useFetchAppointments({ viewForFetch, viewStartDate, createdEvent })
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
const createdEvent = ref({})
const title = ref('')
const vuecal = ref(null)
const selectedDate = ref(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
const currentView = ref('')



const month = computed({
  get: () => currentMonth.value,
  set: (value) => currentMonth.value = value
});
const eventCreated = computed({
  get() {
    return createdEvent.value
  },
  set(newEvent) {
    createdEvent.value = newEvent
  }
})
const viewForFetch = computed({
  get: () => currentView.value,
  set: (value) => currentView.value = value
});
const events = computed(() => data.value.results)
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






onMounted(async () => {
  today.value = new Date(selectedDate.value)
  currentView.value = props.activeView
  viewStartDate.value = new Date(selectedDate.value)
  currentMonth.value = moment(new Date()).format("MMMM YYYY");

  await store.fetchClients()
})

function selectDate(e: any) {
  selectedDate.value = new Date(new Date(e).getFullYear(), new Date(e).getMonth(), new Date(e).getDate())
}
function viewChange({ view, startDate }: ViewChange) {
  viewStartDate.value = startDate;
  currentView.value = view
}

async function onEventCreate(event: any, deleteEventFunction: void) {
  selectedEvent.value = event
  createdEvent.value = event
  return event
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
  @apply bg-pink-200 text-amber-800
}

.vuecal__event-title {
  @apply text-zinc-900 font-semibold uppercase
}

.vuecal__event-time {
  @apply text-pink-500 bg-opacity-25
}

.vuecal__time-cell-line.hours:before {
  border-color: #42b983;
}

.vuecal__event {
  @apply flex flex-col justify-center items-center border border-zinc-400 p-0
}

/* .vuecal__time-column{}
.vuecal__time-cell {

} */
</style>