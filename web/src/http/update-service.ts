import { api } from "@/lib/axios"

export interface UpdateServiceRequest {
  id: string
  name?: string
  price?: number
}

export async function updateService({ id, name, price }: UpdateServiceRequest) {
  await api.put(`/services/${id}`, {
    name,
    price,
  })
}
