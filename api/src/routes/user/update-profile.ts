import { hash, verify } from "argon2"
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { ClientError } from "@/errors/client-error"
import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import {
  BadRequestSchema,
  NoContentSchema,
  NotFoundSchema,
} from "@/utils/global-response-schema"

export const updateProfile: FastifyPluginAsyncZod = async app => {
  app.register(auth).put(
    "/profile",
    {
      schema: {
        tags: ["profile"],
        summary: "Update profile from logged user",
        security: [{ cookieAuth: [] }],
        body: z
          .object({
            name: z.string().nonempty().optional(),
            email: z.email().optional(),
            password: z.string().min(6).optional(),
            currentPassword: z.string().min(6).optional(),
          })
          .refine(
            data =>
              data.password || data.currentPassword
                ? data.password && data.currentPassword
                : true,
            {
              message: "Current password and new password are required",
              path: ["currentPassword", "password"],
            },
          ),
        response: {
          204: NoContentSchema,
          400: BadRequestSchema,
          404: NotFoundSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = await request.getCurrentUser()

      const { email, name, password, currentPassword } = request.body

      let passwordHash: string | undefined

      const user = await prisma.user.findUnique({
        where: { id },
      })

      if (!user) {
        throw new ClientError("User not found", 404)
      }

      if (currentPassword) {
        const doesPasswordMatch = await verify(user.password, currentPassword)

        if (!doesPasswordMatch) {
          throw new ClientError("The current password does not match")
        }
      }

      if (password) {
        const doesPasswordMatch = await verify(user.password, password)

        if (doesPasswordMatch) {
          throw new ClientError(
            "New password cannot be equal to the current password",
          )
        }

        passwordHash = await hash(password)
      }

      await prisma.user.update({
        where: { id },
        data: {
          name,
          email,
          password: passwordHash,
        },
      })

      return reply.status(204).send()
    },
  )
}
