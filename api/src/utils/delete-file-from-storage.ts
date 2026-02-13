import { existsSync, promises } from "node:fs"
import { join } from "node:path"

import { UPLOAD_FOLDER } from "@/middlewares/upload-file"

export async function deleteFileFromStorage(fileUrl: string | null) {
  if (!fileUrl) return

  try {
    const fileName = fileUrl.split("/").pop()
    if (!fileName) return

    const filePath = join(UPLOAD_FOLDER, fileName)

    if (existsSync(filePath)) {
      await promises.unlink(filePath)
    }
  } catch (error) {
    console.error(`Falha ao remover arquivo: ${fileUrl}`, error)
  }
}
