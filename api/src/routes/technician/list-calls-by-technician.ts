import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { CallStatus } from "@/generated/prisma/enums"
import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { verifyUserRole } from "@/middlewares/verify-user-role"

export const listCallsByTechnician: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    "/technicians/calls",
    {
      preHandler: [verifyUserRole("TECHNICIAN")],
      schema: {
        tags: ["technician"],
        summary: "List calls by technician",
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
                  client: z.string(),
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
      const { id: technicianId } = await request.getCurrentUser()

      const calls = await prisma.call.findMany({
        where: { technicianId },
        select: {
          id: true,
          protocol: true,
          title: true,
          status: true,
          totalValue: true,
          client: {
            select: {
              name: true,
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
          client: call.client.name,
          service: call.callServices[0].service.name,
        })),
      })
    },
  )
}
