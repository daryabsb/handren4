import { ref } from "vue";
import axios from "axios";
import { Appointment, TimelineParams, TimelineState } from "./interfaces";
import { useClientStore } from "@/stores/client";

const endpoints = {
  timeline: "http://127.0.0.1:8000/timeline/timeline/",
};

const asyncExec = async (promise: Promise<any>) => {
  try {
    const result = await promise;
    return [null, result];
  } catch (error) {
    return [error, null];
  }
};

export default function useTimeline() {
  const state = ref<TimelineState>({
    appointments: [],
    isLoading: false,
    error: null,
  });
  const store = useClientStore();
  const config = store.useConfig;

  const loadAppointments = async (params: TimelineParams) => {
    state.value.isLoading = true;

    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${endpoints.timeline}?${queryParams}`;
      const response = await axios.get(url, config);

      const appointments: Appointment[] = response.data;
      // .map((result: any) => {
      //   return {
      //     id: result.id,
      //     title: result.title,
      //     start: new Date(result.start),
      //     end: new Date(result.end),
      //     description: result.description,
      //     client: {
      //       id: result.client.id,
      //       name: result.client.name,
      //     },
      //     treatments: result.treatments.map((treatment: any) => {
      //       return {
      //         id: treatment.id,
      //         name: treatment.name,
      //         price: treatment.price,
      //       };
      //     }),
      //     attachments: result.attachments.map((attachment: any) => {
      //       return {
      //         id: attachment.id,
      //         name: attachment.name,
      //         file: attachment.file,
      //       };
      //     }),
      //   };
      // });

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
