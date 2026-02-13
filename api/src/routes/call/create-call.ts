import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { ClientError } from "@/errors/client-error"
import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { verifyUserRole } from "@/middlewares/verify-user-role"
import {
  BadRequestSchema,
  NotFoundSchema,
} from "@/utils/global-response-schema"

export const createCall: FastifyPluginAsyncZod = async app => {
  app.register(auth).post(
    "/calls",
    {
      preHandler: [verifyUserRole("CLIENT")],
      schema: {
        tags: ["call"],
        summary: "Create a call",
        security: [{ cookieAuth: [] }],
        body: z.object({
          title: z.string().nonempty(),
          description: z.string().nonempty(),
          serviceId: z.uuid(),
          technicianId: z.uuid(),
          hour: z.string(),
        }),
        response: {
          201: z
            .object({
              callId: z.uuid(),
            })
            .describe("Created"),
          400: BadRequestSchema,
          404: NotFoundSchema,
        },
      },
    },
    async (request, reply) => {
      const { description, technicianId, serviceId, title, hour } = request.body

      const { id: clientId } = await request.getCurrentUser()

      const service = await prisma.service.findUnique({
        where: {
          id: serviceId,
          deletedAt: null,
        },
      })

      if (!service) {
        throw new ClientError("Service not found", 404)
      }

      const technician = await prisma.user.findUnique({
        where: {
          id: technicianId,
          role: "TECHNICIAN",
        },
      })

      if (!technician) {
        throw new ClientError("Technician not found", 404)
      }

      if (!technician.hours.includes(hour)) {
        throw new ClientError(
          "The selected technician is not available during these hours",
        )
      }

      const { id: callId } = await prisma.call.create({
        data: {
          hour,
          description,
          title,
          clientId,
          technicianId,
          totalValue: service.price.toNumber(),
          callServices: {
            create: {
              serviceId,
              createdBy: "CLIENT",
            },
          },
        },
      })

      return reply.status(201).send({ callId })
    },
  )
}
