// import { ref } from "vue";
// import axios from "axios";
// import { useClientStore } from "@/stores/client";

// import { TimelineState } from "./interfaces";

// export default function useTimeline() {
//   const store = useClientStore();
//   const config = store.useConfig;

//   const state = ref<TimelineState>({
//     appointments: [],
//     isLoading: false,
//     error: null,
//   });

//   const loadAppointments = async (
//     clientId?: number,
//     startDate?: string,
//     endDate?: string,
//     page?: number,
//     pageSize?: number
//   ) => {
//     state.value.isLoading = true;

//     try {
//       const params = {
//         client_id: clientId,
//         start_date: startDate,
//         end_date: endDate,
//         page: page,
//         page_size: pageSize,
//       };

//       config.value.headers.Authorization = `Bearer ${config.value.token}`;

//       const response = await axios.get(
//         "http://127.0.0.1:8000/timeline/timeline/",
//         { params, headers: config }
//       );

//       state.value.appointments = response.data.results;
//     } catch (error) {
//       state.value.error = error;
//     } finally {
//       state.value.isLoading = false;
//     }
//   };

//   return {
//     state,
//     loadAppointments,
//   };
// }

import { ref } from "vue";
import axios from "axios";
import { TimelineState, Appointment } from "./interfaces";
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
  const loadAppointments = async (
    clientId?: number,
    startDate?: string,
    endDate?: string,
    page?: number,
    pageSize?: number
  ) => {
    state.value.isLoading = true;

    try {
      const params = {
        client_id: clientId,
        start_date: startDate,
        end_date: endDate,
        page: page,
        page_size: pageSize,
      };
      let queryParams = "";
      for (const key in params) {
        if (params.hasOwnProperty(key) && params[key] !== undefined) {
          queryParams += `${key}=${params[key]}&`;
        }
      }
      const url = `http://127.0.0.1:8000/timeline/timeline/?${queryParams.slice(
        0,
        -1
      )}`;
      const response = await axios.get(url, config);

      const appointments: Appointment[] = response.data.results.map(
        (result: any) => {
          return {
            id: result.id,
            title: result.title,
            start: new Date(result.start),
            end: new Date(result.end),
            description: result.description,
            client: {
              id: result.client.id,
              name: result.client.name,
            },
            treatments: result.treatments.map((treatment: any) => {
              return {
                id: treatment.id,
                name: treatment.name,
                price: treatment.price,
              };
            }),
            attachments: result.attachments.map((attachment: any) => {
              return {
                id: attachment.id,
                name: attachment.name,
                file: attachment.file,
              };
            }),
          };
        }
      );

      state.value.appointments = appointments;
    } catch (error) {
      state.value.error = error;
    } finally {
      state.value.isLoading = false;
    }
  };

  return {
    appointments,
    state,
    loadAppointments,
  };
}
