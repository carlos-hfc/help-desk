import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"

import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { deleteFileFromStorage } from "@/utils/delete-file-from-storage"
import { NoContentSchema } from "@/utils/global-response-schema"

export const removeProfileImage: FastifyPluginAsyncZod = async app => {
  app.register(auth).delete(
    "/profile/image",
    {
      schema: {
        tags: ["profile"],
        summary: "Remove profile image",
        security: [{ cookieAuth: [] }],
        response: {
          204: NoContentSchema,
        },
      },
    },
    async (request, reply) => {
      const { id, image } = await request.getCurrentUser()

      await prisma.user.update({
        where: { id },
        data: {
          image: null,
        },
      })

      await deleteFileFromStorage(image)

      return reply.status(204).send()
    },
  )
}
