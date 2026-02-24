import { api } from "@/lib/axios"

export interface RegisterServiceRequest {
  name: string
  price: number
}

export interface RegisterServiceResponse {
  serviceId: string
}

export async function registerService({ name, price }: RegisterServiceRequest) {
  const response = await api.post<RegisterServiceResponse>("/services", {
    name,
    price,
  })

  return response.data
}
