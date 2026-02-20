import { api } from "@/lib/axios"

export interface UpdateProfileRequest {
  name?: string
  email?: string
  password?: string
  currentPassword?: string
}

export async function updateProfile({
  email,
  name,
  password,
  currentPassword,
}: UpdateProfileRequest) {
  await api.put("/profile", {
    email,
    name,
    password,
    currentPassword,
  })
}
