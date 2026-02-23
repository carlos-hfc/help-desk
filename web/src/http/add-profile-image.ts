import { api } from "@/lib/axios"

export interface AddProfileImageRequest {
  file: File
}

export interface AddProfileImageResponse {
  image: string
}

export async function addProfileImage({ file }: AddProfileImageRequest) {
  const data = new FormData()

  data.append("file", file)

  const response = await api.patch<AddProfileImageResponse>(
    "/profile/image",
    data,
  )

  return response.data
}
