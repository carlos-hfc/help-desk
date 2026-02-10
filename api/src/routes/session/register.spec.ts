import request from "supertest"

import { app } from "@/app"
import { makeUser } from "@/test/make-user"

describe("Register client [POST] /sessions/register", () => {
  it("should be able to register a client", async () => {
    const user = makeUser()

    const response = await request(app.server)
      .post("/sessions/register")
      .send(user)

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({
      userId: expect.any(String),
    })
  })

  it("should not be able to register a client with existent e-mail", async () => {
    const user = makeUser()

    await request(app.server).post("/sessions/register").send(user)

    const response = await request(app.server)
      .post("/sessions/register")
      .send(user)

    expect(response.status).toEqual(409)
    expect(response.body).toHaveProperty("message", "User already exists")
  })
})
