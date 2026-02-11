import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"
import { makeUser } from "@/test/make-user"

describe("List clients [GET] /clients", () => {
  it("should be able to list clients", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    for (let index = 0; index < 3; index++) {
      const client = makeUser()

      await request(app.server).post("/sessions/register").send(client)
    }

    const response = await request(app.server)
      .get("/clients")
      .set("Cookie", token)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      clients: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
        }),
      ]),
    })
  })

  it("should not be able to list clients with a non-admin user", async () => {
    const { token } = await createAndAuthUser(app, { role: "TECHNICIAN" })

    const response = await request(app.server)
      .get("/clients")
      .set("Cookie", token)
      .send()

    expect(response.status).toEqual(401)
    expect(response.body).toHaveProperty("message", "Unauthorized")
  })

  it("should not be able to list clients without JWT token", async () => {
    const response = await request(app.server).get("/clients").send()

    expect(response.status).toEqual(401)
    expect(response.body).toHaveProperty("message", "Unauthorized")
  })
})
