import { ref } from "vue";
import moment from "moment";
import handleAppointments from "@/composables/handleAppointments";
import { Appointment } from "@/types/Appointment";
import { useQuasar } from "quasar";

import { Client } from "./interfaces";

const $q = useQuasar();

export default function useCalendar() {
  const {
    addAppointment,
    editAppointment,
    deleteAppointment,
  } = handleAppointments();

  const selectedClient = ref(null as null | any);
  const selectedEvent = ref(null as null | Appointment);

  // function onDragStart(e: any, client: Client) {
  //   e.dataTransfer!.setData("event", JSON.stringify(client));
  //   e.dataTransfer!.setData("cursor-grab-at", e.offsetY.toString());
  // }

  function onEventDurationChange(event: any) {
    const data = {
      id: event.event.id,
      patient: event.event.patient,
      title: event.event.title,
      description: event.event.content,
      date: moment(event.event.startDate).format("yyyy-MM-DDTHH:mm"),
      date_to: moment(event.event.endDate).format("yyyy-MM-DDTHH:mm"),
    };
    editAppointment(data);
  }

  function onEventClick(event: any, e: MouseEvent) {
    selectedClient.value = patientsData.results.find(
      (p: any) => p.id === event.patient
    );
    selectedEvent.value = event;
    e.stopPropagation();
  }

  function onEventDoubleClick(event: any, e: MouseEvent) {
    const ev = events.value.find((evt: any) => evt.id === event.id);

    selectedEvent.value = event;
    if (ev.id) {
      appointmentID.value = ev.id;
      selectedID.value = ev.patient;
      editDate.value = moment(ev.start).format("yyyy-MM-DD");

      editTime.value = moment(ev.start).format("hh:mm");
      edit.value = true;
    }

    showPatientAppointmentModal();

    e.stopPropagation();
  }
  function onDragStart(e: any, client: Client) {
    e.dataTransfer.setData("event", JSON.stringify(client));
    e.dataTransfer.setData("cursor-grab-at", e.offsetY);
  }
  function onEventCreate(e) {
    console.log(e);
  }
  // function onEventDrop({ e, originalEvent, external }: any, onEventDelete) {
  function onEventDrop({ event, originalEvent, external }: any, onEventDelete) {
    console.log("from drop", event, originalEvent, external);

    if (external) {
      let data = {
        client: event.id,
        title: event.name,
        description: "",
        date: moment(event.startDate, moment.ISO_8601),
        // .format("yyyy-MM-DDTHH:mm"),
      };
      addAppointment(data);
    } else {
      //
      //   const data = {
      //     id: e.id,
      //     client: e.client,
      //     date: moment(e.startDate).format("yyyy-MM-DDTHH:mm"),
      //     date_to: moment(e.endDate).format("yyyy-MM-DDTHH:mm"),
      //   };
      //   editAppointment(data);
      //   $q.notify("Appointment edited successfully");
    }
  }

  function onEventDelete(event: Appointment) {
    const id = event.id;
    deleteAppointment(id);
    $q.notify("Appointment deleted successfully");
  }

  return {
    selectedClient,
    selectedEvent,
    onEventCreate,
    onDragStart,
    onEventDurationChange,
    onEventClick,
    onEventDoubleClick,
    onEventDrop,
    onEventDelete,
  };
}
