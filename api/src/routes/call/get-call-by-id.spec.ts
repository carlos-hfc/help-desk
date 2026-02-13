import { randomUUID } from "node:crypto"

import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"
import { createCompleteCall } from "@/test/create-complete-call"

describe("Get call by ID [GET] /calls/:callId", () => {
  it("should be able to get call by ID", async () => {
    const { call } = await createCompleteCall()

    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const response = await request(app.server)
      .get(`/calls/${call.id}`)
      .set("Cookie", token)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      call: expect.objectContaining({
        id: expect.any(String),
        status: expect.any(String),
        updatedAt: expect.any(String),
        client: expect.objectContaining({
          name: expect.any(String),
          image: expect.toBeOneOf([null, expect.any(String)]),
        }),
        technician: expect.objectContaining({
          name: expect.any(String),
          image: expect.toBeOneOf([null, expect.any(String)]),
        }),
        services: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            price: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      }),
    })
  })

  it("should not be able to get inexistent call", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const response = await request(app.server)
      .get(`/calls/${randomUUID()}`)
      .set("Cookie", token)
      .send()

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message", "Call not found")
  })
})
