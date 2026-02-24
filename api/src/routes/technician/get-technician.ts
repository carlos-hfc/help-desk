import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { ClientError } from "@/errors/client-error"
import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { verifyUserRole } from "@/middlewares/verify-user-role"
import { NotFoundSchema } from "@/utils/global-response-schema"

export const getTechnician: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    "/technicians/:technicianId",
    {
      preHandler: [verifyUserRole("ADMIN")],
      schema: {
        tags: ["technician"],
        summary: "Get a technician",
        params: z.object({
          technicianId: z.uuid(),
        }),
        response: {
          200: z.object({
            technician: z.object({
              id: z.uuid(),
              name: z.string(),
              email: z.email(),
              hours: z.array(z.string()),
              image: z.string().nullable(),
            }),
          }),
          404: NotFoundSchema,
        },
      },
    },
    async (request, reply) => {
      const { technicianId } = request.params

      const technician = await prisma.user.findUnique({
        where: {
          id: technicianId,
        },
      })

      if (!technician) {
        throw new ClientError("Technician not found", 404)
      }

      return reply.send({ technician })
    },
  )
}
