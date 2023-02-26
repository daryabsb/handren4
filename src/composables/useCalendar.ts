import { ref } from "vue";
import moment from "moment";
import handleAppointments from "@/composables/handleAppointments";
import { Appointment } from "@/types/Appointment";
import { useQuasar, Notify } from "quasar";

import { Client } from "./interfaces";

interface NotifyConfig {
  position?: string;
  type?: string;
  message: string;
}

function notify({
  position = "top-right",
  type = "positive",
  message,
}: NotifyConfig) {
  Notify.create({ position, type, message });
}

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

  async function onEventDurationChange(
    { event, originalEvent, external }: any,
    onEventDelete: void
  ) {
    const data = {
      id: event.id,
      client: event.client,
      date: moment(event.start).format("YYYY-MM-DDTHH:mm"),
      date_to: moment(event.end).format("YYYY-MM-DDTHH:mm"),
    };
    await editAppointment(data);
    Notify.create("Appointment edited successfully");
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

  // function onEventDrop({ e, originalEvent, external }: any, onEventDelete) {
  async function onEventDrop(
    { event, originalEvent, external }: any,
    onEventDelete: void
  ) {
    if (external) {
      let data = {
        client: event.id,
        title: event.name,
        date: moment(event.start).format("YYYY-MM-DDTHH:mm"),
      };

      await addAppointment(data);

      notify({
        message: "Appointment added successfully.",
      });
    } else {
      const data = {
        id: event.id,
        client: event.client,
        date: moment(event.start).format("YYYY-MM-DDTHH:mm"),
        date_to: moment(event.end).format("YYYY-MM-DDTHH:mm"),
      };
      await editAppointment(data);
      Notify.create("Appointment edited successfully");
    }
  }

  function onEventDelete(event: Appointment) {
    const id = event.id;
    deleteAppointment(id);
    const $q = useQuasar();
    $q.notify("Appointment deleted successfully");
  }

  return {
    selectedClient,
    selectedEvent,
    // onEventCreate,
    onDragStart,
    onEventDurationChange,
    onEventClick,
    onEventDoubleClick,
    onEventDrop,
    onEventDelete,
  };
}
