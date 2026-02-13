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
import { hours as availableHours } from "@/utils/hours"

export const editAvailability: FastifyPluginAsyncZod = async app => {
  app.register(auth).patch(
    "/technicians/:technicianId/hours",
    {
      preHandler: [verifyUserRole("ADMIN")],
      schema: {
        tags: ["technician"],
        summary: "Edit availability technician hours",
        security: [{ cookieAuth: [] }],
        body: z.object({
          hours: z.array(z.string()),
        }),
        params: z.object({
          technicianId: z.uuid(),
        }),
        response: {
          204: NoContentSchema,
          400: BadRequestSchema,
          404: NotFoundSchema,
        },
      },
    },
    async (request, reply) => {
      const { technicianId } = request.params

      const technician = await prisma.user.findUnique({
        where: {
          role: "TECHNICIAN",
          id: technicianId,
        },
      })

      if (!technician) {
        throw new ClientError("Technician not found", 404)
      }

      const { hours } = request.body

      for (let index = 0; index < hours.length; index++) {
        const hour = hours[index]

        if (!availableHours.includes(hour)) {
          throw new ClientError(`The hour ${hour} is not allowed`)
        }
      }

      await prisma.user.update({
        where: {
          role: "TECHNICIAN",
          id: technicianId,
        },
        data: {
          hours,
        },
      })

      return reply.status(204).send()
    },
  )
}
