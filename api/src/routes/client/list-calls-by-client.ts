import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { CallStatus } from "@/generated/prisma/enums"
import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { verifyUserRole } from "@/middlewares/verify-user-role"

export const listCallsByClient: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    "/clients/calls",
    {
      preHandler: [verifyUserRole("CLIENT")],
      schema: {
        tags: ["client"],
        summary: "List calls by client",
        response: {
          200: z
            .object({
              calls: z.array(
                z.object({
                  id: z.uuid(),
                  protocol: z.number(),
                  title: z.string().nullable(),
                  service: z.string(),
                  totalValue: z.number(),
                  technician: z.object({
                    name: z.string(),
                    image: z.string().nullable(),
                  }),
                  status: z.enum(CallStatus),
                  updatedAt: z.date(),
                }),
              ),
            })
            .describe("OK"),
        },
      },
    },
    async (request, reply) => {
      const { id: clientId } = await request.getCurrentUser()

      const calls = await prisma.call.findMany({
        where: { clientId },
        select: {
          id: true,
          protocol: true,
          title: true,
          status: true,
          totalValue: true,
          technician: {
            select: {
              name: true,
              image: true,
            },
          },
          callServices: {
            where: {
              createdBy: "CLIENT",
            },
            select: {
              updatedAt: true,
              service: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      })

      return reply.send({
        calls: calls.map(call => ({
          ...call,
          updatedAt: call.callServices[0].updatedAt,
          totalValue: call.totalValue.toNumber(),
          service: call.callServices[0].service.name,
        })),
      })
    },
  )
}
