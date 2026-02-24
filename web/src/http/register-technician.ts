import { api } from "@/lib/axios"

export interface RegisterTechnicianRequest {
  name: string
  email: string
  hours: string[]
}

export interface RegisterTechnicianResponse {
  technicianId: string
}

export async function registerTechnician({
  email,
  hours,
  name,
}: RegisterTechnicianRequest) {
  const response = await api.post<RegisterTechnicianResponse>("/technicians", {
    email,
    name,
    hours,
  })

  return response.data
}
