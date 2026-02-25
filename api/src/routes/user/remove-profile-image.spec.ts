import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"

describe("Remove profile image from logged user [DELETE] /profile/image", () => {
  it("should be able to remove profile image", async () => {
    const { token } = await createAndAuthUser(app)

    const file = Buffer.alloc(1024, "0")

    await request(app.server)
      .patch("/profile/image")
      .set("Cookie", token)
      .attach("file", file, "image.png")

    const response = await request(app.server)
      .delete("/profile/image")
      .set("Cookie", token)
      .send()

    expect(response.status).toBe(204)
  })
})
