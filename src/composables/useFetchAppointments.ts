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
  currentView: Ref<string | null>;
  viewStartDate: Ref<string | null>;
}

interface UseFetchDataReturn {
  data: Ref<Data | null>;
  error: Ref<AxiosError<any> | null>;
}

export default function useFetchAppointments({
  viewForFetch,
  viewStartDate,
}: UseFetchDataProps): UseFetchDataReturn {
  const data = ref<Data | null>({
    count: 0,
    next: "",
    previous: "",
    results: [],
  });
  const error = ref<AxiosError<any> | null>(null);
  const url = ref<string>("");

  const fetchData = async () => {
    let baseUrl = "http://127.0.0.1:8000/appointment/appointments/";
    try {
      // Sample of the mont queryset is: ?month=March 2023

      if (viewForFetch.value == "year") {
        url.value = `${baseUrl}?year=${moment(viewStartDate.value).format(
          "YYYY"
        )}`;
      } else if (viewForFetch.value == "month") {
        url.value = `${baseUrl}?month=${moment(viewStartDate.value).format(
          "MMMM YYYY"
        )}`;
      } else if (viewForFetch.value == "week") {
        url.value = `${baseUrl}?week=${moment(viewStartDate.value).format(
          "YYYY-MM-DD"
        )}`;
      } else if (viewForFetch.value == "day") {
        url.value = `${baseUrl}?date=${moment(viewStartDate.value).format(
          "YYYY-MM-DD"
        )}`;
      }

      const response = await axios.get<Data>(url.value, config);

      data.value = response.data;
    } catch (e) {
      error.value = e;
    }
  };

  watch([viewForFetch, viewStartDate], fetchData, { immediate: true });

  return { data, error };
}
