import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { ClientError } from "@/errors/client-error"
import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { verifyUserRole } from "@/middlewares/verify-user-role"
import { deleteFileFromStorage } from "@/utils/delete-file-from-storage"
import { NoContentSchema, NotFoundSchema } from "@/utils/global-response-schema"

export const removeClient: FastifyPluginAsyncZod = async app => {
  app.register(auth).delete(
    "/clients/:clientId",
    {
      preHandler: [verifyUserRole("ADMIN")],
      schema: {
        tags: ["client"],
        summary: "Delete a client",
        security: [{ cookieAuth: [] }],
        params: z.object({
          clientId: z.uuid(),
        }),
        response: {
          204: NoContentSchema,
          404: NotFoundSchema,
        },
      },
    },
    async (request, reply) => {
      const { clientId } = request.params

      const client = await prisma.user.findUnique({
        where: {
          id: clientId,
          role: "CLIENT",
        },
      })

      if (!client) {
        throw new ClientError("User not found", 404)
      }

      await deleteFileFromStorage(client.image)

      await prisma.user.delete({
        where: {
          id: client.id,
        },
      })

      return reply.status(204).send()
    },
  )
}
