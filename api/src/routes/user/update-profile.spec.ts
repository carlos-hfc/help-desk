import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"

describe("Update profile from logged user [PUT] /profile", () => {
  it("should be able to update profile from logged user", async () => {
    const { token } = await createAndAuthUser(app)

    const response = await request(app.server)
      .put("/profile")
      .set("Cookie", token)
      .send({
        password: "123456",
      })

    expect(response.status).toBe(204)
  })

  it("should not be able to update profile from unlogged user", async () => {
    const response = await request(app.server).put("/profile").send({
      name: "John Doe",
    })

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message", "Unauthorized")
  })
})
