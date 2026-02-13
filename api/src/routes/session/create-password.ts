import { hash } from "argon2"
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { ClientError } from "@/errors/client-error"
import { prisma } from "@/lib/prisma"
import { NoContentSchema, NotFoundSchema } from "@/utils/global-response-schema"

export const createPassword: FastifyPluginAsyncZod = async app => {
  app.post(
    "/sessions/create-password",
    {
      schema: {
        tags: ["session"],
        summary: "Create password",
        body: z.object({
          email: z.email(),
          password: z.string().min(6),
        }),
        response: {
          204: NoContentSchema,
          404: NotFoundSchema,
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const user = await prisma.user.findUnique({
        where: { email },
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
        },
      })

      return reply.status(204).send()
    },
  )
}
