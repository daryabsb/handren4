import { ref, watch, Ref } from "vue";
import axios, { AxiosError } from "axios";
import moment from "moment";
import { Loading } from "quasar";
import {
  Appointment,
  Data,
  UseFetchDataProps,
  UseFetchDataReturn,
} from "./interfaces";

import { useClientStore } from "@/stores/client";
const store = useClientStore();
const config = store.useConfig;

export default function useFetchAppointments({
  viewForFetch,
  viewStartDate,
}: UseFetchDataProps): UseFetchDataReturn {
  const data = ref<Appointment[] | null>([]);
  const error = ref<AxiosError<any> | null>(null);
  const url = ref<string>("http://127.0.0.1:8000/appointment/all/");

  async function fetchData() {
    Loading.show();
    // Sample of the mont queryset is: ?month=March 2023
    let query = "";
    try {
      if (viewForFetch.value == "year") {
        query = `?year=${moment(viewStartDate.value).format("YYYY")}`;
      } else if (viewForFetch.value == "month") {
        query = `?month=${moment(viewStartDate.value).format("MMMM YYYY")}`;
      } else if (viewForFetch.value == "week") {
        query = `?week=${moment(viewStartDate.value)
          .subtract(1, "days")
          .format("YYYY-MM-DD")}`;
      } else if (viewForFetch.value == "day") {
        query = `?date=${moment(viewStartDate.value).format("YYYY-MM-DD")}`;
      }

      const response = await axios.get<Data>(url.value + query, config);

      data.value = response.data;
    } catch (e) {
      error.value = e;
    }
    Loading.hide();
  }

  watch([viewForFetch, viewStartDate], fetchData, {
    immediate: true,
  });
  return { data, error };
}
