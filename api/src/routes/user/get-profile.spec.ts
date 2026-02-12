import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"

describe("Get profile from logged user [GET] /profile", () => {
  it("should be able to get profile from logged user", async () => {
    const { token, user } = await createAndAuthUser(app)

    const response = await request(app.server)
      .get("/profile")
      .set("Cookie", token)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    })
  })

  it("should not be able to get profile from unlogged user", async () => {
    const response = await request(app.server).get("/profile").send()

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message", "Unauthorized")
  })
})
