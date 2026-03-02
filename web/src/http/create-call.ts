import { api } from "@/lib/axios"

export interface CreateCallRequest {
  title: string
  description: string
  serviceId: string
  technicianId: string
  hour: string
}

export interface CreateCallResponse {
  callId: string
  protocol: number
}

export async function createCall({
  description,
  hour,
  serviceId,
  technicianId,
  title,
}: CreateCallRequest) {
  const response = await api.post<CreateCallResponse>("/calls", {
    description,
    hour,
    serviceId,
    technicianId,
    title,
  })

  return response.data
}
