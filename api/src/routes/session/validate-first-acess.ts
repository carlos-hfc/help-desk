import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { ClientError } from "@/errors/client-error"
import { prisma } from "@/lib/prisma"

export const validateFirstAccess: FastifyPluginAsyncZod = async app => {
  app.patch(
    "/sessions/first-access",
    {
      schema: {
        tags: ["session"],
        summary: "Validate first access of the user",
        body: z.object({
          email: z.email(),
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
      const { email } = request.body

      const user = await prisma.user.findUnique({
        where: { email, firstAccess: null },
      })

      if (!user) {
        throw new ClientError("User not found", 404)
      }

      await prisma.user.update({
        where: { email },
        data: {
          firstAccess: true,
        },
      })

      return reply.status(204).send()
    },
  )
}
