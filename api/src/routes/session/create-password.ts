import { hash } from "argon2"
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { ClientError } from "@/errors/client-error"
import { prisma } from "@/lib/prisma"

export const createPassword: FastifyPluginAsyncZod = async app => {
  app.post(
    "/sessions/create-password",
    {
      schema: {
        tags: ["session"],
        summary: "Create password after the user validates the first access",
        body: z.object({
          email: z.email(),
          password: z.string().min(6),
        }),
        response: {
          204: z.void().describe("No Content"),
          404: z
            .object({
              message: z.string(),
              statusCode: z.number(),
            })
            .describe("Not Found"),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const user = await prisma.user.findUnique({
        where: { email, firstAccess: true },
      })

      if (!user) {
        throw new ClientError("User not found", 404)
      }

      const passwordHash = await hash(password)

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: passwordHash,
          firstAccess: false,
        },
      })

      return reply.status(204).send()
    },
  )
}
