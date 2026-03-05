import { api } from "@/lib/axios"

export interface EndServiceRequest {
  id: string
}

export async function endService({ id }: EndServiceRequest) {
  await api.patch(`/calls/${id}/status`, {
    status: "CLOSED",
  })
}
