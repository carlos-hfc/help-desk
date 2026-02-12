import { hash } from "argon2"
import { FastifyInstance } from "fastify"
import request from "supertest"

import { prisma } from "@/lib/prisma"

import { makeUser, MakeUserParams } from "./make-user"

export async function createAndAuthUser(
  app: FastifyInstance,
  override: Partial<MakeUserParams> = {},
) {
  const createdUser = makeUser(override)

  const user = await prisma.user.create({
    data: {
      email: createdUser.email,
      password: await hash(createdUser.password),
      name: createdUser.name,
      role: createdUser.role ?? "CLIENT",
      firstAccess: false,
      image: createdUser.image,
    },
  })

  const response = await request(app.server)
    .post("/sessions/authenticate")
    .send(createdUser)

  const token = response.get("Set-Cookie") as string[]

  return {
    user,
    token,
  }
}
