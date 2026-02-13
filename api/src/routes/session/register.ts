import { randomBytes } from "node:crypto"

import { hash } from "argon2"
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { UserAlreadyExists } from "@/errors/user-already-exists"
import { prisma } from "@/lib/prisma"
import { ConflictSchema } from "@/utils/global-response-schema"

export const register: FastifyPluginAsyncZod = async app => {
  app.post(
    "/sessions/register",
    {
      schema: {
        tags: ["session"],
        summary: "Register a client",
        body: z.object({
          name: z.string().nonempty(),
          email: z.email(),
        }),
        response: {
          201: z
            .object({
              userId: z.uuid(),
            })
            .describe("Created"),
          409: ConflictSchema,
        },
      },
    },
    async (request, reply) => {
      const { email, name } = request.body

      const userExists = await prisma.user.findUnique({
        where: { email },
      })

      if (userExists) {
        throw new UserAlreadyExists()
      }

      const password = await hash(randomBytes(10).toString("hex"))

      const { id: userId } = await prisma.user.create({
        data: {
          name,
          email,
          password,
          role: "CLIENT",
        },
      })

      return reply.status(201).send({ userId })
    },
  )
}
