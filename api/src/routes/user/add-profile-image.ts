import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"

import { prisma } from "@/lib/prisma"
import { auth } from "@/middlewares/auth"
import { uploadFile } from "@/middlewares/upload-file"

const ACCEPTED_FILES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const MAX_FILE_SIZE = 1024 * 1024 * 5 // 5 MB

export const addImageProfile: FastifyPluginAsyncZod = async app => {
  app.register(auth).patch(
    "/profile/image",
    {
      preHandler: [uploadFile],
      schema: {
        tag: ["profile"],
        summary: "Add image profile from logged user",
        consumes: ["multipart/form-data"],
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
