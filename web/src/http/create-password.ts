import { api } from "@/lib/axios"

export interface CreatePasswordRequest {
  email: string
  password: string
}

export async function createPassword({
  email,
  password,
}: CreatePasswordRequest) {
  await api.post("/sessions/create-password", {
    email,
    password,
  })
}
