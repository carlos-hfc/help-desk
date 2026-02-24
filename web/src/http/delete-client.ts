import { api } from "@/lib/axios"

export interface DeleteClientRequest {
  id: string
}

export async function deleteClient({ id }: DeleteClientRequest) {
  await api.delete(`/clients/${id}`)
}
