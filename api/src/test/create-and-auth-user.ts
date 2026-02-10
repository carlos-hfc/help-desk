import { hash } from "argon2"
import { FastifyInstance } from "fastify"
import request from "supertest"

import { prisma } from "@/lib/prisma"

import { makeUser, MakeUserParams } from "./make-user"

export async function createAndAuthUser(
  app: FastifyInstance,
  override: Partial<MakeUserParams> = {},
) {
  const user = makeUser(override)

  await prisma.user.create({
    data: {
      email: user.email,
      password: await hash(user.password),
      name: user.name,
      role: user.role ?? "CLIENT",
    },
  })

  const response = await request(app.server)
    .post("/sessions/authenticate")
    .send(user)

  const token = response.get("Set-Cookie") as string[]

  return {
    user,
    token,
  }
}
