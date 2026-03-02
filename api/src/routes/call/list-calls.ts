import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { CallStatus } from "@/generated/prisma/enums"
import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"

export const listCalls: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    "/calls",
    {
      schema: {
        tags: ["call"],
        summary: "List calls",
        security: [{ cookieAuth: [] }],
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
                  client: z.object({
                    name: z.string(),
                    image: z.string().nullable(),
                  }),
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
      const { id, role } = await request.getCurrentUser()

      const calls = await prisma.call.findMany({
        where: {
          technicianId: role === "TECHNICIAN" ? id : undefined,
          clientId: role === "CLIENT" ? id : undefined,
        },
        select: {
          id: true,
          protocol: true,
          title: true,
          status: true,
          totalValue: true,
          updatedAt: true,
          client: {
            select: {
              name: true,
              image: true,
            },
          },
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
              service: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      })

      return reply.send({
        calls: calls.map(call => ({
          ...call,
          updatedAt: call.updatedAt,
          totalValue: call.totalValue.toNumber(),
          service: call.callServices[0].service.name,
        })),
      })
    },
  )
}
