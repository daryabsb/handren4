<template>
    <q-card>

        <vue-cal ref="vuecal" :small="true" :selected-date="date_today" :time-from="12 * 60" :time-to="22 * 60"
            :timeStep="120" :timeCellHeight="90" active-view="day" :snapToTime="30" :watchRealTime="true"
            :startWeekOnSunday="true" @event-duration-change="onEventDurationChange" :on-event-click="onEventClick"
            :editable-events="{ title: false, drag: true, resize: true, delete: true, create: true }"
            :events="appToCalendar" :onEventDblclick="onEventDoubleClick" @event-drop="onEventDrop"
            @event-drag-create="showEventCreationDialog = true" @cell-focus="selectedDate = $event"
            @event-delete="onEventDelete">

            <template v-slot:title="{ title, view }">


                <span v-if="view.id === 'years'">Years</span>
                <!-- Using Vue Cal injected Date prototypes -->
                <span v-else-if="view.id === 'year'">{{ view.startDate.format('YYYY') }}</span>
                <span v-else-if="view.id === 'month'">{{ view.startDate.format('MMMM YYYY') }}</span>
                <!-- <span v-else-if="view.id === 'week'">w{{ view.startDate.getWeek() }} ({{ view.startDate.format('MMM YYYY') }})</span> -->
                <span class="text-right" v-else-if="view.id === 'week'">{{ view.startDate.format('MMMM (YYYY)') }}</span>
                <span v-else-if="view.id === 'day'">{{ view.startDate.format('dddd D MMMM (YYYY)') }}</span>

            </template>
        </vue-cal>

    </q-card>
</template>

<script setup>

import { computed, ref, watch } from "@vue/runtime-core"
import moment from "moment"


const examinations = ref([])
const selectedPatient = ref(null)
const selectedEvent = ref(null)
// LEFT TABLE DATA
const fields = ref(["name"])
const appointmentsFields = ref([
    "patientName",
    "description",
    "date",
    "time",
    "actions",
])
const nameDelete = ref("")
const idDelete = ref("")
const date_today = ref(new Date())
const selectedDate = ref("")

// allAppointments: [],
const link = ref("")
const searchQuery = ref("")
const url = ref("")
const currentPage = ref(1)
const events = ref([])
const tabIndex = ref(0)
const secondTabTitle = ref(false)

const selectedID = ref("")
const activeView = ref("day")
const appointmentID = ref("")
const editDate = ref("")
const editTime = ref("")
const edit = ref(false)
const showEventCreationDialog = ref(false)


function onEventClick(event, e) {


    selectedPatient.value = patientsData.results.find(
        (p) => p.id === event.patient
    );

    selectedEvent.value = event;

    e.stopPropagation();
}
function selectTabEvent() {
    secondTabTitle.value = false;
}
function onEventDelete(event) {
    let id = event.id;

    try {
        console.log('$store.dispatch("onDeleteAppointment)');
        console.log(`$bvToast.toast("Your event is deleted`)
    } catch (error) {
        console.log("Your event is not deleted!")
    }
}
function onEventDragStart(e, item) {

    e.dataTransfer.setData("event", JSON.stringify(item));
    e.dataTransfer.setData("cursor-grab-at", e.offsetY);
    // console.log(item);
}
function onEventDrop({ event, originalEvent, external }, deleteEvent) {

    if (external) {
        let data = {
            patient: event.id,
            title: event.name,
            description: "",
            date: moment(event.startDate).format(
                "yyyy-MM-DDTHH:mm"
            ),
        };
        // console.log("data: ", data);
        console.log("$store.dispatch('addAppointment')");
        console.log(`Your added an appointment for ${data.title}!`)

        // event.title = event.name;
    } else {
        let data = {
            id: event.id,
            patient: event.patient,
            title: event.title,
            description: "",
            date: moment(event.startDate).format(
                "yyyy-MM-DDTHH:mm"
            ),
            date_to: moment(event.endDate).format(
                "yyyy-MM-DDTHH:mm"
            ),
        };
        console.log('$store.dispatch("editAppointment")');
    }
}
function onEventDurationChange(event) {

    let data = {
        id: event.event.id,
        patient: event.event.patient,
        title: event.event.title,
        description: event.event.content,
        date: moment(event.event.startDate).format(
            "yyyy-MM-DDTHH:mm"
        ),
        date_to: moment(event.event.endDate).format(
            "yyyy-MM-DDTHH:mm"
        ),
    };
    console.log('$store.dispatch("editAppointment")');
}
function deleteEvent(event) {
    let id = event.id;
    console.log('$store.dispatch("onDeleteAppointment")');
}
function scrollToCurrentTime() {
    const calendar = document.querySelector("#vuecal .vuecal__bg");
    const hours = now.value.getHours() + now.value.getMinutes() / 60;
    calendar.scrollTo({
        top: hours * timeCellHeight.value,
        behavior: "smooth",
    });
}
function onEventDoubleClick(event, e) {

    let ev = events.value.find((evt) => evt.id === event.id);

    selectedEvent.value = event;
    if (ev.id) {
        appointmentID.value = ev.id;
        selectedID.value = ev.patient;
        editDate.value = moment(ev.start).format("yyyy-MM-DD");

        editTime.value = moment(ev.start).format("hh:mm");
        edit.value = true;
    }

    showPatientAppointmentModal();

    // Prevent navigating to narrower view (default vue-cal behavior).
    e.stopPropagation();
}
function showPatientAppointmentModal() {

    console.log('$refs["p-appointment-modal"].show()');

}
function hidePatientAppointmentModal() {
    console.log('$refs["p-appointment-modal"].hide()');
}
function onEventCreate(event, deleteEventFunction) {
    selectedEvent.value = event;
    console.log(selectedEvent.value);
    showPatientAppointmentModal();

    deleteEventFunction.value = deleteEventFunction;

    return event;
}
function openPdf(url) {

    url.value = url;
    console.log('mutations.togglePdfModal()');
}
function confirmDelete(name, id) {
    (nameDelete.value = name),
        (idDelete.value = id),
        console.log('mutations.toggleConfirmDelete()');
}
function calculatePagesCount(pageSize, totalCount) {
    // we suppose that if we have 0 items we want 1 empty page
    return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
}
function retreiveDataForPage(page) {
    currentPage.value = page;
    let data = {
        param: `?page=${page}`,
        module: "APPOINTMENTS",
    };
    console.log('$store.dispatch("onChangePagination", data)');
}
function lastObject(arr) {
    return arr[arr.length - 1];
}
function patientVisits(id) {
    let today = new Date();
    const formats = 'yyyy-MM-DD'
    const pApps = getAllAppointments
        .filter((appt) =>
            moment(appt.date).format(formats) <= moment(today).format(formats)
        )
        .filter(appt => appt.patient === id)
        .sort((a, b) => a.date - b.date);
    // console.log("CALLED FROM HERE", pApps);
    return pApps;
}

const searchAppointments = computed(() => {
    return getAppointments.filter((appt) => {
        return (
            appt.patientName
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase()) ||
            appt.description
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase())
        );
    });
})

const isConfirmDeleteOpen = computed(() => {
    return console.log('store.isConfirmDeleteOpen');
})
const numUsers = computed(() => {
    return console.log('$refs["p-appointment-modal"].show()');
})
const numTreatments = computed(() => {
    return console.log('$store.state.treatments.length');
})
const numPatients = computed(() => {
    return console.log('$store.state.patients.length');
})
const numPages = computed(() => {
    let count = getAppointments.count;
    let pages = calculatePagesCount(10, count);
    return pages;
})
const appToCalendar = computed({
    get() {
        let calEv = [];
        getAllAppointments.forEach((app) => {
            let evt = {};
            evt.id = app.id;
            evt.patient = app.patient;
            evt.title = app.title;
            evt.start = app.start;
            evt.end = app.end;
            evt.content = app.description;
            // evt.class = 'sport'
            calEv.push(evt);
        });
        return calEv;
    },
    set(newValue) {
        console.log("new value", newValue);
    }
});

// COMING FROM THE STORE
const isAuthenticated = []
const loggedInUser = []
const getAllAppointments = []
// "getTreatments
const getAppointments = []
const patientsData = []
const allPatients = []
const colPatients = []

console.log(`
...mapGetters([
    "isAuthenticated",
    "loggedInUser",
    "getAllAppointments",
    // "getTreatments",
    "getAppointments",
    "patientsData",
    "allPatients",
    "colPatients",
]),
`)
// mounted() {
// 	let calEvents = [];
// 		getAppointments.results.forEach(app=>{
// 			let evt = {};
// 			let patient = patientsData.results.find(p=>p.id===app.patient);
// 			evt.id= app.id;
// 			evt.patient= app.patient;
// 			evt.start= $moment(app.date).format('yyyy-MM-DD hh:mm');
// 			// evt.end= $moment(app.date).add(3600, 'seconds').format('yyyy-MM-DD hh:mm');
// 			evt.end= $moment(app.date_to).format('yyyy-MM-DD hh:mm');

//   			evt.title = app.title;
//   			evt.icon = patient.image; // Custom attribute.
//   			evt.content = app.description;
//   			// evt.contentFull: 'Okay.<br>It will be a 18 hole golf course.', // Custom attribute.
// 			  evt.class = 'sport'
// 			 events.push(evt)
// 			  calEvents.push(evt)
// 		});

// 		// console.log(events)
// },
watch(() =>
    function calEvents() {
        let calEv = [];
        getAppointments.results.forEach((app) => {
            let evt = {};
            let patient = patientsData.results.find(
                (p) => p.id === app.patient
            );
            evt.id = app.id;
            evt.patient = app.patient;
            evt.start = moment(app.date).format("yyyy-MM-DD hh:mm");

            evt.end = moment(app.date_to).format("yyyy-MM-DD hh:mm");

            evt.title = app.title;
            evt.icon = patient.image; // Custom attribute.
            evt.content = app.description;
            // evt.contentFull: 'Okay.<br>It will be a 18 hole golf course.', // Custom attribute.
            evt.class = "sport";
            events.value.push(evt);
            calEv.push(evt);
        });
        return calEv;
    }
) 
</script>
<style>
@import "vue-cal/dist/vuecal.css";

/*
#cal2 {
	 height: 70vh; 
}
*/
.vuecal__event {
    cursor: pointer;

    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.vuecal__event-title {
    font-size: 0.7rem;
    color: rgb(20, 137, 247);
    /* font-weight: bold; */
    margin: 0;
}

.vuecal__event-time {
    font-size: 0.7rem;
    display: inline-block;
    margin-bottom: 0.4em;
    margin-top: -4px;
    padding-bottom: 12px;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.2); */
}

.vuecal span {
    font-size: 1em;
    /* display: inline-block; */
    margin-bottom: 12px;
    margin-top: -4px;
    padding-bottom: 12px;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.2); */
}

.vuecal__event-content {
    font-style: italic;
}

.vuecal--blue-theme .vuecal__event {
    display: flex;
    background-color: #dcdcdc;
    justify-content: space-around;
    align-items: center;
}

.vuecal--blue-theme .vuecal__event .vuecal__event-title,
.vuecal--blue-theme .vuecal__event .vuecal__event-time,
.vuecal--blue-theme .vuecal__event .vuecal__event-time {
    margin-top: 0;
    padding-bottom: 0;
    font-weight: 400;
    font-size: 1rem;
}

.vuecal__view-btn .vuecal__view-btn--active {
    border-bottom: 0;
}

.larger-thumb {
    width: 8rem;
    height: 8rem;
}
</style>
 