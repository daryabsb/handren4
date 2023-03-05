import { ref } from "vue";
import axios, { AxiosError } from "axios";
import { useClientStore } from "@/stores/client";
import { Client } from "./interfaces";
import { Loading } from "quasar";

interface UseFetchClientsReturn {
  clients: Client[] | null;
  error: AxiosError | null;
}

export default function useFetchClients(): UseFetchClientsReturn {
  Loading.show();
  const clients = ref<Client[] | null>(null);
  const error = ref<AxiosError | null>(null);

  const store = useClientStore();
  const config = store.useConfig;

  const fetchClients = async () => {
    try {
      const response = await axios.get<Client[]>(
        "http://127.0.0.1:8000/clients/all/",
        config
      );

      clients.value = response.data;
    } catch (e) {
      error.value = e;
    }
  };

  fetchClients();
  Loading.hide();
  return { clients, error };
}
