import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"
import { createCompleteCall } from "@/test/create-complete-call"

describe("List calls [GET] /calls", () => {
  it("should be able to list calls", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    for (let index = 0; index < 5; index++) {
      await createCompleteCall()
    }

    const response = await request(app.server)
      .get("/calls")
      .set("Cookie", token)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      calls: expect.arrayContaining([
        expect.objectContaining({
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
          service: expect.any(String),
          totalValue: expect.any(Number),
        }),
      ]),
    })
  })
})
