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
        security: [{ cookieAuth: [] }],
        response: {
          200: z
            .object({
              technicians: z.array(
                z.object({
                  id: z.uuid(),
                  name: z.string(),
                  email: z.email(),
                  image: z.string().nullable(),
                  hours: z.array(z.string()),
                }),
              ),
            })
            .describe("OK"),
        },
      },
    },
    async (_, reply) => {
      const technicians = await prisma.user.findMany({
        where: {
          role: "TECHNICIAN",
        },
      })

      return reply.send({ technicians })
    },
  )
}
