import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { ClientError } from "@/errors/client-error"
import { CallStatus, CreatedBy } from "@/generated/prisma/enums"
import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { NotFoundSchema } from "@/utils/global-response-schema"

export const getCallById: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    "/calls/:callId",
    {
      schema: {
        tags: ["call"],
        summary: "Get call by ID",
        security: [{ cookieAuth: [] }],
        params: z.object({
          callId: z.uuid(),
        }),
        response: {
          200: z
            .object({
              call: z.object({
                id: z.uuid(),
                clientId: z.uuid(),
                technicianId: z.uuid(),
                protocol: z.number(),
                title: z.string().nullable(),
                description: z.string().nullable(),
                totalValue: z.number(),
                hour: z.string(),
                status: z.enum(CallStatus),
                createdAt: z.date(),
                updatedAt: z.date(),
                client: z.object({
                  name: z.string(),
                  image: z.string().nullable(),
                }),
                technician: z.object({
                  name: z.string(),
                  email: z.email(),
                  image: z.string().nullable(),
                }),
                services: z.array(
                  z.object({
                    id: z.uuid(),
                    name: z.string(),
                    price: z.number(),
                    createdBy: z.enum(CreatedBy),
                  }),
                ),
              }),
            })
            .describe("OK"),
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
          clientId: role === "CLIENT" ? id : undefined,
          technicianId: role === "TECHNICIAN" ? id : undefined,
        },
        include: {
          client: {
            select: {
              name: true,
              image: true,
            },
          },
          technician: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
          callServices: {
            select: {
              createdBy: true,
              service: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
      })

      if (!call) {
        throw new ClientError("Call not found", 404)
      }

      return reply.send({
        call: {
          ...call,
          totalValue: call.totalValue.toNumber(),
          services: call.callServices.map(item => ({
            ...item.service,
            price: item.service.price.toNumber(),
            createdBy: item.createdBy,
          })),
        },
      })
    },
  )
}
