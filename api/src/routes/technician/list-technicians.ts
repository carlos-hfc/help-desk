import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { verifyUserRole } from "@/middlewares/verify-user-role"

export const listTechnicians: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    "/technicians",
    {
      preHandler: [verifyUserRole("ADMIN")],
      schema: {
        tags: ["technician"],
        summary: "List technicians",
        response: {
          200: z.object({
            technicians: z.array(
              z.object({
                id: z.uuid(),
                name: z.string(),
                email: z.email(),
                image: z.string().nullable(),
                availabilities: z.array(
                  z.object({
                    id: z.uuid(),
                    hour: z.string(),
                  }),
                ),
              }),
            ),
          }),
        },
      },
    },
    async (_, reply) => {
      const technicians = await prisma.user.findMany({
        where: {
          role: "TECHNICIAN",
        },
        include: {
          technicianAvailabilities: true,
        },
      })

      return reply.send({
        technicians: technicians.map(tech => ({
          ...tech,
          availabilities: tech.technicianAvailabilities.map(availability => ({
            id: availability.id,
            hour: availability.hour,
          })),
        })),
      })
    },
  )
}
