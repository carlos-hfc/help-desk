import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { ClientError } from "@/errors/client-error"
import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { verifyUserRole } from "@/middlewares/verify-user-role"
import { NoContentSchema, NotFoundSchema } from "@/utils/global-response-schema"

export const removeAdditionalServiceToCall: FastifyPluginAsyncZod =
  async app => {
    app.register(auth).patch(
      "/calls/:callId/service/:serviceId",
      {
        preHandler: [verifyUserRole("TECHNICIAN")],
        schema: {
          tags: ["call"],
          summary: "Delete additional service to the call",
          security: [{ cookieAuth: [] }],
          params: z.object({
            callId: z.uuid(),
            serviceId: z.uuid(),
          }),
          response: {
            204: NoContentSchema,
            404: NotFoundSchema,
          },
        },
      },
      async (request, reply) => {
        const { callId, serviceId } = request.params

        const { id: technicianId } = await request.getCurrentUser()

        const callService = await prisma.callService.findFirst({
          where: {
            callId,
            serviceId,
          },
          include: {
            call: true,
            service: true,
          },
        })

        if (!callService) {
          throw new ClientError("Call or service not found", 404)
        }

        await prisma.call.update({
          where: {
            id: callId,
          },
          data: {
            totalValue:
              callService.call.totalValue.toNumber() -
              callService.service.price.toNumber(),
            callServices: {
              delete: {
                id: callService.id,
              },
            },
          },
        })

        return reply.status(204).send()
      },
    )
  }
