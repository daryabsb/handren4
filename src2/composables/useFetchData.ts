import { ref, watch } from "vue";
import axios from "axios";

import { useClientStore } from "../stores/client";
const store = useClientStore();
const config = store.useConfig;

interface Appointment {
  user: any;
  client: any;
  title: string;
  description: string;
  date: string;
  date_to: string;
  created: string;
  updated: string;
}
interface Data {
  count: number;
  next: string;
  previous: string;
  results: Appointment[];
}

interface UseFetchDataProps {
  month: any;
}

interface UseFetchDataReturn {
  data: Data | null;
  error: any;
}

export default function useFetchData(month: any): UseFetchDataReturn {
  const data = ref<Appointment[] | null>([]);
  const error = ref<any>(null);

  const fetchData = async () => {
    try {
      let url = "http://127.0.0.1:8000/appointment/all/";
      if (month.value) {
        url += `?month=${month.value}`;
      }

      const response = await axios.get<Data>(url, config);

      data.value = response.data;
    } catch (e) {
      error.value = e;
    }
  };
  const fetchWeekData = async () => {
    try {
      let url = "http://127.0.0.1:8000/appointment/appointments/";
      if (month.value) {
        url += `?month=${month.value}`;
      }

      const response = await axios.get<Data>(url, config);

      data.value = response.data;
    } catch (e) {
      error.value = e;
    }
  };

  watch(month, fetchData);

  return { data, error };
}
