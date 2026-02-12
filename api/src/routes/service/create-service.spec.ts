import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"
import { makeService } from "@/test/make-service"

describe("Create a service [POST] /services", () => {
  it("should be able to create a service", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const response = await request(app.server)
      .post("/services")
      .set("Cookie", token)
      .send(makeService())

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({
      serviceId: expect.any(String),
    })
  })
})
