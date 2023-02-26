import { ref } from "vue";
import axios, { AxiosError } from "axios";
import moment from "moment";
import { useClientStore } from "@/stores/client";
import { date } from "quasar";
import { Appointment } from "./interfaces";

interface UseHandleAppointmentReturn {
  addAppointment: void;
  editAppointment: void;
}
interface NewAppointment {
  id?: number;
  client: number;
  title: string;
  date: string;
  date_to: string;
}

export default function handleAppointments(): UseHandleAppointmentReturn {
  const appointment = ref<NewAppointment | null>(null);
  const error = ref<AxiosError | null>(null);

  const store = useClientStore();
  const config = store.useConfig;

  const url = "http://127.0.0.1:8000/appointment/all/";

  const addAppointment = async (data: NewAppointment) => {
    if (!data.date_to) {
      data.date_to = moment(data.date)
        .add(2, "hours")
        .format("YYYY-MM-DDTHH:mm");
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
        url + data.id + "/",
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
  const deleteAppointment = async (id: number) => {
    try {
      const response = await axios.delete(url + id, config);
      return response.data;
    } catch (e) {
      error.value = e;
    }
  };
  return {
    addAppointment,
    editAppointment,
    deleteAppointment,
  };
}
