import request from "supertest"

import { app } from "@/app"
import { makeUser } from "@/test/make-user"

describe("Validate first access of the user [PATCH] /sessions/first-access", () => {
  it("should be able to validate first access", async () => {
    const user = makeUser({ firstAccess: null })

    await request(app.server).post("/sessions/register").send(user)

    const response = await request(app.server)
      .patch("/sessions/first-access")
      .send({
        email: user.email,
      })

    expect(response.status).toEqual(204)
  })

  it("should not be able to validate first access with wrong e-mail", async () => {
    const response = await request(app.server)
      .patch("/sessions/first-access")
      .send({
        email: "user.email@email.com",
      })

    expect(response.status).toEqual(404)
    expect(response.body).toHaveProperty("message", "User not found")
  })
})
