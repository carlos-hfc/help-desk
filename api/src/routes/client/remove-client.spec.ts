import { randomUUID } from "node:crypto"

import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"
import { makeUser } from "@/test/make-user"

describe("Delete a client [DELETE] /clients/:clientId", () => {
  it("should be able to delete a client", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const client = makeUser()

    const clientResponse = await request(app.server)
      .post("/sessions/register")
      .send(client)

    const response = await request(app.server)
      .delete(`/clients/${clientResponse.body.userId}`)
      .set("Cookie", token)
      .send()

    expect(response.status).toEqual(204)
  })

  it("should not be able to delete an inexistent client", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const response = await request(app.server)
      .delete(`/clients/${randomUUID()}`)
      .set("Cookie", token)
      .send()

    expect(response.status).toEqual(404)
    expect(response.body).toHaveProperty("message", "User not found")
  })
})
