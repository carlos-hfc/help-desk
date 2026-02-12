import { randomUUID } from "node:crypto"

import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"
import { makeService } from "@/test/make-service"

describe("Edit service [PUT] /services/:serviceId", () => {
  it("should be able to edit a service", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const serviceResponse = await request(app.server)
      .post("/services")
      .set("Cookie", token)
      .send(makeService())

    const response = await request(app.server)
      .put(`/services/${serviceResponse.body.serviceId}`)
      .set("Cookie", token)
      .send({
        name: "New service",
        price: 100,
      })

    expect(response.status).toEqual(204)
  })

  it("should not be able to edit an inexistent service", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const response = await request(app.server)
      .put(`/services/${randomUUID()}`)
      .set("Cookie", token)
      .send({
        name: "New service",
        price: 100,
      })

    expect(response.status).toEqual(404)
    expect(response.body).toHaveProperty("message", "Service not found")
  })
})
