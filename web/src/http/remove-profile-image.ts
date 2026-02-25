import { api } from "@/lib/axios"

export async function removeProfileImage() {
  await api.delete("/profile/image")
}
