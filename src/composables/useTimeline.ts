import { ref } from "vue";
import axios from "axios";
import { useClientStore } from "@/stores/client.js";
import { Appointment, TimelineState } from "./interfaces";

export default function useTimeline() {
  const state = ref<TimelineState>({
    past: [],
    upcoming: [],
    isLoading: false,
    error: null,
  });

  const store = useClientStore();
  const config = store.useConfig;

  const loadPastAppointments = async () => {
    state.value.isLoading = true;

    try {
      const url = "http://127.0.0.1:8000/timeline/past/";

      const response = await axios.get(url, config);

      const appointments: Appointment[] = response.data.results;

      state.value.past = appointments;
    } catch (error) {
      state.value.error = error;
    } finally {
      state.value.isLoading = false;
    }
  };

  const loadUpcomingAppointments = async () => {
    state.value.isLoading = true;

    try {
      const url = "http://127.0.0.1:8000/timeline/upcoming/";

      const response = await axios.get(url, config);

      const appointments: Appointment[] = response.data.results;

      state.value.upcoming = appointments;
    } catch (error) {
      state.value.error = error;
    } finally {
      state.value.isLoading = false;
    }
  };

  return {
    state,
    loadPastAppointments,
    loadUpcomingAppointments,
  };
}
