import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { ClientError } from "@/errors/client-error"
import { CallStatus } from "@/generated/prisma/enums"
import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { verifyUserRole } from "@/middlewares/verify-user-role"
import {
  BadRequestSchema,
  NoContentSchema,
  NotFoundSchema,
} from "@/utils/global-response-schema"

export const updateCallStatus: FastifyPluginAsyncZod = async app => {
  app.register(auth).patch(
    "/calls/:callId/status",
    {
      preHandler: [verifyUserRole("TECHNICIAN", "ADMIN")],
      schema: {
        tags: ["call"],
        summary: "Update call status",
        params: z.object({
          callId: z.uuid(),
        }),
        body: z.object({
          status: z.string().toUpperCase().pipe(z.enum(CallStatus)),
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

      const { id, role } = await request.getCurrentUser()

      const call = await prisma.call.findUnique({
        where: {
          id: callId,
          technicianId: role === "TECHNICIAN" ? id : undefined,
        },
      })

      if (!call) {
        throw new ClientError("Call not found", 404)
      }

      if (call.status === "CLOSED") {
        throw new ClientError(
          "The call has already been closed and cannot be updated",
        )
      }

      const { status } = request.body

      if (status === "OPEN" || call.status === status) {
        return reply.status(204).send()
      }

      await prisma.call.update({
        where: {
          id: callId,
          technicianId: role === "TECHNICIAN" ? id : undefined,
        },
        data: { status },
      })

      return reply.status(204).send()
    },
  )
}
