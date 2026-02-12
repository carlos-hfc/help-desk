import { hash } from "argon2"
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"

export const updateProfile: FastifyPluginAsyncZod = async app => {
  app.register(auth).put(
    "/profile",
    {
      schema: {
        tag: ["profile"],
        summary: "Update profile from logged user",
        body: z.object({
          name: z.string().optional(),
          email: z.email().optional(),
          password: z.string().min(6).optional(),
        }),
        response: {
          204: z.void().describe("OK"),
        },
      },
    },
    async (request, reply) => {
      const { id } = await request.getCurrentUser()

      const { email, name, password } = request.body

      const passwordHash = password ? await hash(password) : undefined

      await prisma.user.update({
        where: { id },
        data: {
          name,
          email,
          password: passwordHash,
        },
      })

      return reply.status(204).send()
    },
  )
}
