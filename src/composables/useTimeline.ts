import { ref } from "vue";
import axios from "axios";
import { Appointment, TimelineParams, TimelineState } from "./interfaces";
import { useClientStore } from "@/stores/client";

export default function useTimeline() {
  const state = ref<TimelineState>({
    data: null,
    appointments: [],
    isLoading: false,
    error: null,
  });
  const store = useClientStore();
  const config = store.useConfig;

  const loadAppointments = async (params: TimelineParams) => {
    state.value.isLoading = true;

    const { clientId, dateFrom, dateTo, page, pageSize } = params;

    const queryParams = new URLSearchParams();

    if (clientId) queryParams.append("client_id", String(clientId));
    if (dateFrom) queryParams.append("date_from", String(dateFrom));
    if (dateTo) queryParams.append("date_to", String(dateTo));
    if (page) queryParams.append("page", String(page));
    if (pageSize) queryParams.append("page_size", String(pageSize));
    if (pageXOffset) queryParams.append("page_x_offset", String(pageXOffset));


    const paramsToQueryString = (params: any) => {
      const queryParams = new URLSearchParams();
    
      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          queryParams.append(key, "null");
          continue;
        }
    
        queryParams.append(key, value);
      }
    
      return queryParams.toString();
    };


    const url = `http://127.0.0.1:8000/timeline/timeline/?${queryParams.toString()}`;

    try {
      const response = await axios.get(url, config);

      const appointments: Appointment[] = response.data.results;

      state.value.data = response.data;
      state.value.appointments = appointments;
    } catch (error) {
      state.value.error = error;
    } finally {
      state.value.isLoading = false;
    }
  };

  return {
    state,
    loadAppointments,
  };
}


const loadAppointments = async (params: TimelineParams) => {
  state.value.isLoading = true;

  try {
    const queryParams = new URLSearchParams({
      client_id: params.clientId,
      date_from: params.dateFrom,
      date_to: params.dateTo,
      page: params.page,
      page_size: params.pageSize,
    }).toString();

    const url = `http://127.0.0.1:8000/timeline/timeline/?${queryParams}`;

    const response = await axios.get(url, config);

    const appointments: Appointment[] = response.data.results;

    state.value.data = response.data;
    state.value.appointments = appointments;
  } catch (error) {
    state.value.error = error;