import { ref, watch, Ref } from "vue";
import axios, { AxiosError } from "axios";
import moment from "moment";

import { useClientStore } from "@/stores/client";
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
  caseType: string;
  startDate: Ref<string>;
}

interface UseFetchDataReturn {
  data: Ref<Data | null>;
  error: Ref<AxiosError<any> | null>;
}

export default function useFetchAppointments({
  caseType,
  startDate,
}: UseFetchDataProps): UseFetchDataReturn {
  const data = ref<Data | null>({
    count: 0,
    next: "",
    previous: "",
    results: [],
  });
  const error = ref<AxiosError<any> | null>(null);

  const fetchData = async () => {
    console.log(startDate.value);
    try {
      let url = "http://127.0.0.1:8000/appointment/appointments/";
      // Sample of the mont queryset is: ?month=March 2023

      if (caseType === "year") {
        url += `?year=${moment(startDate.value).format("YYYY")}`;
      } else if (caseType === "month") {
        url += `?month=${moment(startDate.value).format("MMMM YYYY")}`;
      } else if (caseType === "week") {
        url += `?week=${moment(startDate.value).format("YYYY-MM-DD")}`;
      } else if (caseType === "day") {
        url += `?date=${moment(startDate.value).format("YYYY-MM-DD")}`;
      }

      const response = await axios.get<Data>(url, config);

      data.value = response.data;
    } catch (e) {
      error.value = e;
    }
  };

  watch(startDate, fetchData, { immediate: true });

  console.log(data.value);
  return { data, error };
}
