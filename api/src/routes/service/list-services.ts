import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"

export const listServices: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    "/services",
    {
      schema: {
        tags: ["service"],
        summary: "List services",
        security: [{ cookieAuth: [] }],
        response: {
          200: z
            .object({
              services: z.array(
                z.object({
                  id: z.uuid(),
                  name: z.string(),
                  price: z.number().positive(),
                  isActive: z.boolean(),
                }),
              ),
            })
            .describe("OK"),
        },
      },
    },
    async (request, reply) => {
      const { role } = await request.getCurrentUser()

      const services = await prisma.service.findMany({
        where: {
          deletedAt: role !== "ADMIN" ? null : undefined,
        },
      })

      return reply.send({
        services: services.map(service => ({
          ...service,
          price: service.price.toNumber(),
          isActive: !Boolean(service.deletedAt),
        })),
      })
    },
  )
}
