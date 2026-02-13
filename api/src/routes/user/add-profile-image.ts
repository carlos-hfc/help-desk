import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"

import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { uploadFile } from "@/middlewares/upload-file"
import {
  BadRequestSchema,
  ContentTooLargeSchema,
} from "@/utils/global-response-schema"

export const addImageProfile: FastifyPluginAsyncZod = async app => {
  app.register(auth).patch(
    "/profile/image",
    {
      preHandler: [uploadFile],
      schema: {
        tags: ["profile"],
        summary: "Add image profile from logged user",
        security: [{ cookieAuth: [] }],
        consumes: ["multipart/form-data"],
        response: {
          200: z
            .object({
              image: z.url(),
            })
            .describe("OK"),
          400: BadRequestSchema,
          413: ContentTooLargeSchema,
        },
      },
    },
    async (request, reply) => {
      const { fileUrl, deleteOldFile } = request.upload

      const { id, image } = await request.getCurrentUser()

      await deleteOldFile(image)

      await prisma.user.update({
        where: { id },
        data: { image: fileUrl },
      })

      return reply.send({ image: fileUrl })
    },
  )
}
