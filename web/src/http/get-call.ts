import { api } from "@/lib/axios"

import type { Call } from "./list-calls"
import type { Service } from "./list-services"

export interface GetCallRequest {
  id: string
}

export interface GetCallResponse {
  call: Omit<Call, "service"> & {
    technician: {
      name: string
      email: string
      image: string | null
    }
    description: string | null
    hour: string
    createdAt: string
    services: Array<
      Service & {
        createdBy: "CLIENT" | "TECHNICIAN"
      }
    >
  }
}

export async function getCall({ id }: GetCallRequest) {
  const response = await api.get<GetCallResponse>(`/calls/${id}`)

  return response.data
}
