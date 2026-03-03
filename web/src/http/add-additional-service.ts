import { api } from "@/lib/axios"

export interface AddAdditionalServiceRequest {
  serviceId: string
  callId: string
}

export async function addAdditionalService({
  serviceId,
  callId,
}: AddAdditionalServiceRequest) {
  await api.patch(`/calls/${callId}/service`, { serviceId })
}
