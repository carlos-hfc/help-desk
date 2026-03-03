import { api } from "@/lib/axios"

export interface StartServiceRequest {
  id: string
}

export async function startService({ id }: StartServiceRequest) {
  await api.patch(`/calls/${id}/status`, {
    status: "IN_PROGRESS",
  })
}
