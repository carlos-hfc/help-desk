import "fastify"

import { UserRole } from "@/generated/prisma/enums"

interface CurrentUser {
  id: string
  name: string
  email: string
  role: UserRole
  hours: string[]
  image: string | null
}

declare module "fastify" {
  export interface FastifyRequest {
    getCurrentUser(): Promise<CurrentUser>
    upload: {
      fileUrl: string
      deleteOldFile(url: string | null): Promise<void>
    }
  }
}
