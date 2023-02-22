import { ref } from "vue";
import axios, { AxiosError } from "axios";
import { useClientStore } from "@/stores/client";
import { Client } from "./interfaces";

interface UseFetchClientsReturn {
  clients: Client[] | null;
  error: AxiosError | null;
}

export default function useFetchClients(): UseFetchClientsReturn {
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

      // Map over the clients and fetch the related counts for each one
      const clientCountPromises = response.data.map(async (client) => {
        const countResponse = await axios.get(
          `http://127.0.0.1:8000/clients/${client.id}/counts`,
          config
        );
        return {
          ...client,
          ...countResponse.data,
        };
      });

      // Wait for all the count requests to finish and set the clients with counts
      clients.value = await Promise.all(clientCountPromises);
    } catch (e) {
      error.value = e;
    }
  };

  fetchClients();

  return { clients, error };
}
