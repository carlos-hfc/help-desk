import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { auth } from "@/middlewares/auth"

export const getProfile: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    "/profile",
    {
      schema: {
        tag: ["profile"],
        summary: "Get profile from logged user",
        response: {
          200: z
            .object({
              user: z.object({
                id: z.uuid(),
                name: z.string(),
                email: z.email(),
                image: z.string().nullable(),
              }),
            })
            .describe("OK"),
        },
      },
    },
    async (request, reply) => {
      const user = await request.getCurrentUser()

      return reply.send({ user })
    },
  )
}
