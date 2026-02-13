import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { ClientError } from "@/errors/client-error"
import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { verifyUserRole } from "@/middlewares/verify-user-role"
import { NoContentSchema, NotFoundSchema } from "@/utils/global-response-schema"

export const updateServiceStatus: FastifyPluginAsyncZod = async app => {
  app.register(auth).patch(
    "/services/:serviceId/status",
    {
      preHandler: [verifyUserRole("ADMIN")],
      schema: {
        tags: ["service"],
        summary: "Update service status",
        security: [{ cookieAuth: [] }],
        params: z.object({
          serviceId: z.uuid(),
        }),
        response: {
          204: NoContentSchema,
          404: NotFoundSchema,
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

      await prisma.service.update({
        where: {
          id: service.id,
        },
        data: {
          deletedAt: service.deletedAt ? null : new Date(),
        },
      })

      return reply.status(204).send()
    },
  )
}
