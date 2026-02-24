import { api } from "@/lib/axios"

export interface EditTechnicianAvailabilityRequest {
  id: string
  hours: string[]
}

export async function editTechnicianAvailability({
  hours,
  id,
}: EditTechnicianAvailabilityRequest) {
  await api.patch(`/technicians/${id}/hours`, {
    hours,
  })
}
