import { api } from "@/lib/axios"

export interface SignUpRequest {
  name: string
  email: string
  password: string
}

export interface SignUpResponse {
  userId: string
}

export async function signUp({ name, email, password }: SignUpRequest) {
  const response = await api.post<SignUpResponse>("/sessions/register", {
    name,
    email,
    password,
  })

  return response.data
}
