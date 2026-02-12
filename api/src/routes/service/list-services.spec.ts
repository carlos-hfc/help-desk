import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"
import { makeService } from "@/test/make-service"

describe("List services [GET] /services", () => {
  it("should be able to list services", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    for (let index = 0; index < 5; index++) {
      const service = makeService()

      await request(app.server)
        .post("/services")
        .set("Cookie", token)
        .send(service)
    }

    const response = await request(app.server)
      .get("/services")
      .set("Cookie", token)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      services: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          price: expect.any(Number),
          isActive: expect.any(Boolean),
        }),
      ]),
    })
  })
})
