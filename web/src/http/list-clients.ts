import { api } from "@/lib/axios"

export interface Client {
  id: string
  name: string
  email: string
  image: string | null
}

export interface ListClientsResponse {
  clients: Client[]
}

export async function listClients() {
  const response = await api.get<ListClientsResponse>("/clients")

  return response.data
}
