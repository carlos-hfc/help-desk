import { hash } from "argon2"
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { UserAlreadyExists } from "@/errors/user-already-exists"
import { prisma } from "@/lib/prisma"

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
          password: z.string().min(6),
        }),
        response: {
          201: z
            .object({
              userId: z.uuid(),
            })
            .describe("Created"),
          409: z
            .object({
              message: z.string(),
              statusCode: z.number(),
            })
            .describe("Conflict"),
        },
      },
    },
    async (request, reply) => {
      const { email, name, password } = request.body

      const userExists = await prisma.user.findUnique({
        where: { email },
      })

      if (userExists) {
        throw new UserAlreadyExists()
      }

      const passwordHash = await hash(password)

      const { id: userId } = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
          role: "CLIENT",
        },
      })

      return reply.status(201).send({ userId })
    },
  )
}
