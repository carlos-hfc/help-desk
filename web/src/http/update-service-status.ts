import { api } from "@/lib/axios"

export interface UpdateServiceStatusRequest {
  id: string
}

export async function updateServiceStatus({ id }: UpdateServiceStatusRequest) {
  await api.patch(`/services/${id}/status`)
}
