import request from "supertest"

import { app } from "@/app"
import { makeUser } from "@/test/make-user"

describe("Create password [POST] /sessions/create-password", () => {
  it("should be able to create password after registration", async () => {
    const user = makeUser()

    await request(app.server).post("/sessions/register").send(user)

    const response = await request(app.server)
      .post("/sessions/create-password")
      .send({
        email: user.email,
        password: user.password,
      })

    expect(response.status).toEqual(204)
  })

  it("should not be able to create password after registration with wrong e-mail", async () => {
    const response = await request(app.server)
      .post("/sessions/create-password")
      .send({
        email: "user.email@email.com",
        password: "user.password",
      })

    expect(response.status).toEqual(404)
    expect(response.body).toHaveProperty("message", "User not found")
  })
})
