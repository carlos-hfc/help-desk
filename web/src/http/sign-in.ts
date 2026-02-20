import type { Role } from "@/@types/user"
import { api } from "@/lib/axios"

export interface SignInRequest {
  email: string
  password: string
}

export interface SignInResponse {
  role: Role
}

export async function signIn({ email, password }: SignInRequest) {
  const response = await api.post<SignInResponse>("/sessions/authenticate", {
    email,
    password,
  })

  return response.data
}
