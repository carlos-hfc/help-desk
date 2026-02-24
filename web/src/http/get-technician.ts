import { api } from "@/lib/axios"

import type { Technician } from "./list-technicians"

export interface GetTechnicianRequest {
  id: string
}

export interface GetTechnicianResponse {
  technician: Technician
}

export async function getTechnician({ id }: GetTechnicianRequest) {
  const response = await api.get<GetTechnicianResponse>(`/technicians/${id}`)

  return response.data
}
