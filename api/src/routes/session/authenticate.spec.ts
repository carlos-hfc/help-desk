import request from "supertest"

import { app } from "@/app"
import { makeUser } from "@/test/make-user"

describe("Authenticate user [POST] /sessions/authenticate", () => {
  it("should be able to authenticate an user", async () => {
    const user = makeUser({ firstAccess: null })

    await request(app.server).post("/sessions/register").send(user)
    await request(app.server).patch("/sessions/first-access").send(user)
    await request(app.server).post("/sessions/create-password").send(user)

    const response = await request(app.server)
      .post("/sessions/authenticate")
      .send({
        email: user.email,
        password: user.password,
      })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
      role: expect.any(String),
    })
    expect(response.get("Set-Cookie")).toEqual([expect.any(String)])
  })

  it("should not be able to authenticate an user with wrong e-mail", async () => {
    const user = makeUser()

    await request(app.server).post("/sessions/register").send(user)

    const response = await request(app.server)
      .post("/sessions/authenticate")
      .send({
        email: "email@email.com",
        password: user.password,
      })

    expect(response.status).toEqual(400)
    expect(response.body).toHaveProperty("message", "Invalid credentials")
  })

  it("should not be able to authenticate an user with wrong password", async () => {
    const user = makeUser()

    await request(app.server).post("/sessions/register").send(user)

    const response = await request(app.server)
      .post("/sessions/authenticate")
      .send({
        email: user.email,
        password: "user.password",
      })

    expect(response.status).toEqual(400)
    expect(response.body).toHaveProperty("message", "Invalid credentials")
  })
})
