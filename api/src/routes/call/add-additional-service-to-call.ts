import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { ClientError } from "@/errors/client-error"
import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { verifyUserRole } from "@/middlewares/verify-user-role"
import {
  BadRequestSchema,
  NoContentSchema,
  NotFoundSchema,
} from "@/utils/global-response-schema"

export const addAdditionalServiceToCall: FastifyPluginAsyncZod = async app => {
  app.register(auth).patch(
    "/calls/:callId/service",
    {
      preHandler: [verifyUserRole("TECHNICIAN")],
      schema: {
        tags: ["call"],
        summary: "Add additional service to the call",
        params: z.object({
          callId: z.uuid(),
        }),
        body: z.object({
          serviceId: z.uuid(),
        }),
        response: {
          204: NoContentSchema,
          400: BadRequestSchema,
          404: NotFoundSchema,
        },
      },
    },
    async (request, reply) => {
      const { callId } = request.params

      const { id: technicianId } = await request.getCurrentUser()

      const call = await prisma.call.findUnique({
        where: {
          id: callId,
          technicianId,
          status: "IN_PROGRESS",
        },
        include: {
          callServices: true,
        },
      })

      if (!call) {
        throw new ClientError("Call not found", 404)
      }

      const { serviceId } = request.body

      const service = await prisma.service.findUnique({
        where: {
          id: serviceId,
        },
      })

      if (!service) {
        throw new ClientError("Service not found", 404)
      }

      if (call.callServices.find(item => item.serviceId === serviceId)) {
        throw new ClientError("This service has already been added to the call")
      }

      await prisma.call.update({
        where: {
          id: callId,
          technicianId,
          status: "IN_PROGRESS",
        },
        data: {
          totalValue: call.totalValue.toNumber() + service.price.toNumber(),
          updatedAt: new Date(),
          callServices: {
            create: {
              createdBy: "TECHNICIAN",
              serviceId,
            },
          },
        },
      })

      // await prisma.callService.create({
      //   data: {
      //     createdBy: "TECHNICIAN",
      //     callId,
      //     serviceId,
      //   },
      // })

      return reply.status(204).send()
    },
  )
}
