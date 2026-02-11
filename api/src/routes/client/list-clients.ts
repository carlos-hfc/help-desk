import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { verifyUserRole } from "@/middlewares/verify-user-role"

export const listClients: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    "/clients",
    {
      preHandler: [verifyUserRole("ADMIN")],
      schema: {
        tags: ["client"],
        summary: "List clients",
        response: {
          200: z.object({
            clients: z.array(
              z.object({
                id: z.uuid(),
                name: z.string(),
                email: z.email(),
                image: z.string().nullable(),
              }),
            ),
          }),
        },
      },
    },
    async (_, reply) => {
      const clients = await prisma.user.findMany({
        where: {
          role: "CLIENT",
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      })

      return reply.send({ clients })
    },
  )
}
