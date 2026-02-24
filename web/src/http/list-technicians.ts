import { api } from "@/lib/axios"

export interface Technician {
  id: string
  name: string
  email: string
  image: string | null
  hours: string[]
}

export interface ListTechniciansResponse {
  technicians: Technician[]
}

export async function listTechnicians() {
  const response = await api.get<ListTechniciansResponse>("/technicians")

  return {
    ...response.data,
    technicians: response.data.technicians.map(technician => ({
      ...technician,
      hours: technician.hours.sort(),
    })),
  }
}
