import { verify } from "argon2"
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { env } from "@/env"
import { InvalidCredentials } from "@/errors/invalid-credentials"
import { UserRole } from "@/generated/prisma/enums"
import { prisma } from "@/lib/prisma"

export const authenticate: FastifyPluginAsyncZod = async app => {
  app.post(
    "/sessions/authenticate",
    {
      schema: {
        tags: ["session"],
        summary: "Authenticate user",
        body: z.object({
          email: z.email(),
          password: z.string().min(6),
        }),
        response: {
          200: z
            .object({
              token: z.jwt(),
              role: z.enum(UserRole),
            })
            .describe("OK"),
          400: z
            .object({
              message: z.string(),
              statusCode: z.number(),
            })
            .describe("Bad Request"),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const user = await prisma.user.findUnique({
        where: { email, firstAccess: false },
      })

      if (!user) {
        throw new InvalidCredentials()
      }

      const doesPasswordMatch = await verify(user.password, password)

      if (!doesPasswordMatch) {
        throw new InvalidCredentials()
      }

      const token = await reply.jwtSign(
        { sub: user.id, role: user.role },
        {
          sign: {
            expiresIn: "1d",
          },
        },
      )

      return reply
        .setCookie(env.COOKIE_NAME, token, {
          path: "/",
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 1 * 60 * 60 * 24, // 1 day
        })
        .send({ token, role: user.role })
    },
  )
}
