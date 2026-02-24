import { api } from "@/lib/axios"

export type CallStatusType = "OPEN" | "IN_PROGRESS" | "CLOSED"

export interface Call {
  id: string
  protocol: number
  title: string | null
  service: string
  totalValue: number
  status: CallStatusType
  updatedAt: string
  client: {
    name: string
    image: string | null
  }
  technician: {
    name: string
    image: string | null
  }
}

export interface ListCallsResponse {
  calls: Call[]
}

export async function listCalls() {
  const response = await api.get<ListCallsResponse>("/calls")

  return response.data
}
