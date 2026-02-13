import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { CallStatus } from "@/generated/prisma/enums"
import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { verifyUserRole } from "@/middlewares/verify-user-role"

export const listCalls: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    "/calls",
    {
      preHandler: [verifyUserRole("ADMIN")],
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
    async (_, reply) => {
      const calls = await prisma.call.findMany({
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
