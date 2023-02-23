import { ref } from "vue";
import axios, { AxiosError } from "axios";
import { useClientStore } from "@/stores/client";
import { date } from "quasar";

interface UseHandleAppointmentReturn {
  addAppointment: void;
  editAppointment: void;
}
interface NewAppointment {
  id?: number;
  client: number;
  date: string;
  date_to: string;
}

export default function handleAppointments(): UseHandleAppointmentReturn {
  const appointment = ref<NewAppointment | null>(null);
  const error = ref<AxiosError | null>(null);

  const store = useClientStore();
  const config = store.useConfig;

  const url = "http://127.0.0.1:8000/appointment/appointments/";

  const addAppointment = async (data: NewAppointment) => {
    console.log("from handle", data);
    if (!data.date_to) {
      data.date_to = date
        .subtractFromDate(data.date, { hours: 2 })
        .toDateString();
    }

    try {
      const response = await axios.post<NewAppointment>(url, data, config);

      return response.data;
    } catch (e) {
      error.value = e;
    }
  };
  const editAppointment = async (data: NewAppointment) => {
    try {
      const response = await axios.put<NewAppointment>(
        url + data.id,
        data,
        config
      );

      // Map over the clients and fetch the related counts for each one

      // Wait for all the count requests to finish and set the clients with counts
      return response.data;
    } catch (e) {
      error.value = e;
    }
  };
  return {
    addAppointment,
    editAppointment,
  };
}
