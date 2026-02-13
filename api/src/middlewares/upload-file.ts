import { randomUUID } from "node:crypto"
import { createWriteStream, existsSync, promises } from "node:fs"
import { join, resolve } from "node:path"
import { pipeline } from "node:stream"
import { promisify } from "node:util"

import { FastifyRequest } from "fastify"

import { env } from "@/env"
import { ClientError } from "@/errors/client-error"
import { deleteFileFromStorage } from "@/utils/delete-file-from-storage"

export const ACCEPTED_FILES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]
export const UPLOAD_FOLDER = resolve(__dirname, "..", "..", "uploads")
const pump = promisify(pipeline)

export async function uploadFile(request: FastifyRequest) {
  const data = await request.file()

  if (!data) {
    throw new ClientError("File is required")
  }

  if (!ACCEPTED_FILES.includes(data.mimetype)) {
    data.file.resume()

    throw new ClientError("File type is invalid. Use JPEG, PNG or WEBP file")
  }

  await promises.mkdir(UPLOAD_FOLDER, { recursive: true })

  const filename = `${randomUUID()}-${data.filename}`
  const filepath = join(UPLOAD_FOLDER, filename)

  await pump(data.file, createWriteStream(filepath))

  if (data.file.truncated) {
    if (existsSync(filepath)) {
      await promises.unlink(filepath)
    }

    throw new ClientError(
      "File size is too large. The image must be least 5 MB",
      413,
    )
  }

  const fileUrl = `http://localhost:${env.PORT}/uploads/${filename}`

  request.upload = {
    fileUrl,
    deleteOldFile: deleteFileFromStorage,
  }
}
