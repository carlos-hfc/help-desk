import { api } from "@/lib/axios"

export interface RemoveRemoveAdditionalServiceRequest {
  serviceId: string
  callId: string
}

export async function removeRemoveAdditionalService({
  serviceId,
  callId,
}: RemoveRemoveAdditionalServiceRequest) {
  await api.patch(`/calls/${callId}/service/${serviceId}`)
}
