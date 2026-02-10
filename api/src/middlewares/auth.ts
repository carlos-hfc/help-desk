import fastifyPlugin from "fastify-plugin"

import { env } from "@/env"
import { Unauthorized } from "@/errors/unauthorized"
import { prisma } from "@/lib/prisma"

export const auth = fastifyPlugin(async app => {
  app.addHook("preHandler", async (request, reply) => {
    request.getCurrentUser = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()

        const user = await prisma.user.findUnique({
          where: {
            id: sub,
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true,
          },
        })

        if (!user) {
          return reply.clearCookie(env.COOKIE_NAME).send()
        }

        return user
      } catch (error) {
        throw new Unauthorized()
      }
    }
  })
})
