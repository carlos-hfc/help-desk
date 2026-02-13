import { randomUUID } from "node:crypto"

import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"
import { createCompleteCall } from "@/test/create-complete-call"
import { makeService } from "@/test/make-service"
import { makeTechnician } from "@/test/make-technician"

describe("Add additional service to call [PATCH] /calls/:callId/service", () => {
  it("should be able to add additional service to call", async () => {
    const { token: tokenAdmin } = await createAndAuthUser(app, {
      role: "ADMIN",
    })

    const serviceResponse = await request(app.server)
      .post("/services")
      .set("Cookie", tokenAdmin)
      .send(makeService())

    const { token, user: technician } = await createAndAuthUser(app, {
      role: "TECHNICIAN",
      hours: makeTechnician().hours,
    })

    const { call } = await createCompleteCall({
      technicianId: technician.id,
      hour: technician.hours[0],
      status: "IN_PROGRESS",
    })

    const response = await request(app.server)
      .patch(`/calls/${call.id}/service`)
      .set("Cookie", token)
      .send({
        serviceId: serviceResponse.body.serviceId,
      })

    expect(response.status).toBe(204)
  })

  it("should not be able to add additional service to inexistent call", async () => {
    const { token } = await createAndAuthUser(app, {
      role: "TECHNICIAN",
      hours: makeTechnician().hours,
    })

    const response = await request(app.server)
      .patch(`/calls/${randomUUID()}/service`)
      .set("Cookie", token)
      .send({
        serviceId: randomUUID(),
      })

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message", "Call not found")
  })

  it("should not be able to add additional service to call that has already been added", async () => {
    const { token, user: technician } = await createAndAuthUser(app, {
      role: "TECHNICIAN",
      hours: makeTechnician().hours,
    })

    const { call, service } = await createCompleteCall({
      technicianId: technician.id,
      hour: technician.hours[0],
      status: "IN_PROGRESS",
    })

    const response = await request(app.server)
      .patch(`/calls/${call.id}/service`)
      .set("Cookie", token)
      .send({
        serviceId: service.id,
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty(
      "message",
      "This service has already been added to the call",
    )
  })
})
