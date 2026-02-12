import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { ClientError } from "@/errors/client-error"
import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { verifyUserRole } from "@/middlewares/verify-user-role"

export const editService: FastifyPluginAsyncZod = async app => {
  app.register(auth).put(
    "/services/:serviceId",
    {
      preHandler: [verifyUserRole("ADMIN")],
      schema: {
        tags: ["service"],
        summary: "Edit a service",
        body: z.object({
          name: z.string().optional(),
          price: z.number().positive().optional(),
        }),
        params: z.object({
          serviceId: z.uuid(),
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
      const { serviceId } = request.params

      const service = await prisma.service.findUnique({
        where: {
          id: serviceId,
        },
      })

      if (!service) {
        throw new ClientError("Service not found", 404)
      }

      const { name, price } = request.body

      await prisma.service.update({
        where: {
          id: service.id,
        },
        data: {
          name,
          price,
        },
      })

      return reply.status(204).send()
    },
  )
}
