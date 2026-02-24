import { api } from "@/lib/axios"

export interface Service {
  id: string
  name: string
  price: number
  isActive: boolean
}

export interface ListServicesResponse {
  services: Service[]
}

export async function listServices() {
  const response = await api.get<ListServicesResponse>("/services")

  return response.data
}
