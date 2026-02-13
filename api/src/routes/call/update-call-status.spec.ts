import { randomUUID } from "node:crypto"

import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"
import { createCompleteCall } from "@/test/create-complete-call"
import { makeTechnician } from "@/test/make-technician"

describe("Update call status [PATCH] /calls/:callId/status", () => {
  it("should be able to update call status", async () => {
    const { token, user: technician } = await createAndAuthUser(app, {
      role: "TECHNICIAN",
      hours: makeTechnician().hours,
    })

    const { call } = await createCompleteCall({
      technicianId: technician.id,
      hour: technician.hours[0],
    })

    const response = await request(app.server)
      .patch(`/calls/${call.id}/status`)
      .set("Cookie", token)
      .send({
        status: "IN_PROGRESS",
      })

    expect(response.status).toBe(204)
  })

  it("should not be able to update the status of the an inexistent call", async () => {
    const { token } = await createAndAuthUser(app, {
      role: "TECHNICIAN",
      hours: makeTechnician().hours,
    })

    const response = await request(app.server)
      .patch(`/calls/${randomUUID()}/status`)
      .set("Cookie", token)
      .send({
        status: "IN_PROGRESS",
      })

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message", "Call not found")
  })

  it("should not be able to update the status of a closed call", async () => {
    const { token, user: technician } = await createAndAuthUser(app, {
      role: "TECHNICIAN",
      hours: makeTechnician().hours,
    })

    const { call } = await createCompleteCall({
      technicianId: technician.id,
      hour: technician.hours[0],
      status: "CLOSED",
    })

    const response = await request(app.server)
      .patch(`/calls/${call.id}/status`)
      .set("Cookie", token)
      .send({
        status: "IN_PROGRESS",
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty(
      "message",
      "The call has already been closed and cannot be updated",
    )
  })
})
