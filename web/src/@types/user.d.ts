import type { Role } from "./enums"

export interface User {
  id: string
  name: string
  email: string
  image: string | null
  role: typeof Role
  hours: string[]
}
