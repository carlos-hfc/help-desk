import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { env } from "@/env"

export const signOut: FastifyPluginAsyncZod = async app => {
  app.post(
    "/sessions/sign-out",
    {
      schema: {
        tags: ["session"],
        summary: "Sign out user",
        response: {
          200: z.void().describe("OK"),
        },
      },
    },
    async (_, reply) => {
      return reply.clearCookie(env.COOKIE_NAME).send()
    },
  )
}
