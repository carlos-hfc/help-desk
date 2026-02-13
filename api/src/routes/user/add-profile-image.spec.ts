import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"

describe("Add profile image from logged user [PATCH] /profile/image", () => {
  it("should be able to add profile image", async () => {
    const { token } = await createAndAuthUser(app)

    const file = Buffer.alloc(1024, "0")

    const response = await request(app.server)
      .patch("/profile/image")
      .set("Cookie", token)
      .attach("file", file, "image.png")

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      image: expect.any(String),
    })
  })

  it("should not be able to add profile image with invalid mimetype", async () => {
    const { token } = await createAndAuthUser(app)

    const file = Buffer.alloc(1024, "0")

    const response = await request(app.server)
      .patch("/profile/image")
      .set("Cookie", token)
      .attach("file", file, "doc.pdf")

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty(
      "message",
      "File type is invalid. Use JPEG, PNG or WEBP file",
    )
  })

  it("should not be able to add profile image with invalid size", async () => {
    const { token } = await createAndAuthUser(app)

    const file = Buffer.alloc(5.1 * 1024 * 1024, "0")

    const response = await request(app.server)
      .patch("/profile/image")
      .set("Cookie", token)
      .attach("file", file, "image.jpg")

    console.log(response.body)

    expect(response.status).toBe(413)
    // expect(response.body).toHaveProperty("message","File type is invalid. Use JPEG, PNG or WEBP file")
  })
})
