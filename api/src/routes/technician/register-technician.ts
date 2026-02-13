import { randomBytes } from "node:crypto"

import { hash } from "argon2"
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { ClientError } from "@/errors/client-error"
import { UserAlreadyExists } from "@/errors/user-already-exists"
import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { verifyUserRole } from "@/middlewares/verify-user-role"
import {
  BadRequestSchema,
  ConflictSchema,
} from "@/utils/global-response-schema"
import { hours as availableHours } from "@/utils/hours"

export const registerTechnician: FastifyPluginAsyncZod = async app => {
  app.register(auth).post(
    "/technicians",
    {
      preHandler: [verifyUserRole("ADMIN")],
      schema: {
        tags: ["technician"],
        summary: "Register a technician",
        security: [{ cookieAuth: [] }],
        body: z.object({
          name: z.string().nonempty(),
          email: z.email(),
          hours: z.array(z.string()),
        }),
        response: {
          201: z
            .object({
              technicianId: z.uuid(),
            })
            .describe("Created"),
          400: BadRequestSchema,
          409: ConflictSchema,
        },
      },
    },
    async (request, reply) => {
      const { email, hours, name } = request.body

      const userExists = await prisma.user.findUnique({
        where: { email },
      })

      if (userExists) {
        throw new UserAlreadyExists()
      }

      const password = await hash(randomBytes(10).toString("hex"))

      for (let index = 0; index < hours.length; index++) {
        const hour = hours[index]

        if (!availableHours.includes(hour)) {
          throw new ClientError(`The hour ${hour} is not allowed`)
        }
      }

      const { id: technicianId } = await prisma.user.create({
        data: {
          name,
          password,
          email,
          role: "TECHNICIAN",
          hours,
        },
      })

      return reply.status(201).send({ technicianId })
    },
  )
}
