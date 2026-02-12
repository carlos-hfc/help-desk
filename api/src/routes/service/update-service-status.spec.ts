import { randomUUID } from "node:crypto"

import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"
import { makeService } from "@/test/make-service"

describe("Update service status [PATCH] /services/:serviceId/status", () => {
  it("should be able to update service status", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const serviceResponse = await request(app.server)
      .post("/services")
      .set("Cookie", token)
      .send(makeService())

    const response = await request(app.server)
      .patch(`/services/${serviceResponse.body.serviceId}/status`)
      .set("Cookie", token)
      .send()

    expect(response.status).toEqual(204)
  })

  it("should be able to update the status of an inactive service", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const serviceResponse = await request(app.server)
      .post("/services")
      .set("Cookie", token)
      .send(makeService())

    await request(app.server)
      .patch(`/services/${serviceResponse.body.serviceId}/status`)
      .set("Cookie", token)
      .send()

    const response = await request(app.server)
      .patch(`/services/${serviceResponse.body.serviceId}/status`)
      .set("Cookie", token)
      .send()

    expect(response.status).toEqual(204)
  })

  it("should not be able to update the status of the an inexistent service", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const response = await request(app.server)
      .patch(`/services/${randomUUID()}/status`)
      .set("Cookie", token)
      .send()

    expect(response.status).toEqual(404)
    expect(response.body).toHaveProperty("message", "Service not found")
  })
})
