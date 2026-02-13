import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { verifyUserRole } from "@/middlewares/verify-user-role"

export const createService: FastifyPluginAsyncZod = async app => {
  app.register(auth).post(
    "/services",
    {
      preHandler: [verifyUserRole("ADMIN")],
      schema: {
        tags: ["service"],
        summary: "Create a service",
        security: [{ cookieAuth: [] }],
        body: z.object({
          name: z.string(),
          price: z.number().positive(),
        }),
        response: {
          201: z
            .object({
              serviceId: z.uuid(),
            })
            .describe("Created"),
        },
      },
    },
    async (request, reply) => {
      const { name, price } = request.body

      const { id: serviceId } = await prisma.service.create({
        data: {
          name,
          price,
        },
      })

      return reply.status(201).send({ serviceId })
    },
  )
}
