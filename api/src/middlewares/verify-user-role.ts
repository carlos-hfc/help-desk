import { FastifyRequest } from "fastify"

import { Unauthorized } from "@/errors/unauthorized"
import { UserRole } from "@/generated/prisma/enums"

export function verifyUserRole(...roleToVerify: UserRole[]) {
  return async (request: FastifyRequest) => {
    const { role } = await request.getCurrentUser()

    if (!roleToVerify.includes(role)) {
      throw new Unauthorized()
    }
  }
}
