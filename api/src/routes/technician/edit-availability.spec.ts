import { randomUUID } from "node:crypto"

import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"
import { makeTechnician } from "@/test/make-technician"

describe("Edit availability [PATCH] /technicians/hours/:technicianId", () => {
  it("should be able to update the available hours of a technician", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const technician = makeTechnician({
      firstAccess: false,
      hours: ["08:00", "09:00", "10:00"],
    })

    const technicianResponse = await request(app.server)
      .post("/technicians")
      .set("Cookie", token)
      .send(technician)

    const response = await request(app.server)
      .patch(`/technicians/hours/${technicianResponse.body.technicianId}`)
      .set("Cookie", token)
      .send({
        hours: [...technician.hours, "11:00"],
      })

    expect(response.status).toEqual(204)
  })

  it("should not be able to update the available hours of an inexistent technician", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const response = await request(app.server)
      .patch(`/technicians/hours/${randomUUID()}`)
      .set("Cookie", token)
      .send({
        hours: ["11:00"],
      })

    expect(response.status).toEqual(404)
    expect(response.body).toHaveProperty("message", "Technician not found")
  })

  it("should not be able to update the available hours of a technician with hour not allowed", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const technician = makeTechnician({
      firstAccess: false,
      hours: ["08:00", "09:00", "10:00"],
    })

    const technicianResponse = await request(app.server)
      .post("/technicians")
      .set("Cookie", token)
      .send(technician)

    const response = await request(app.server)
      .patch(`/technicians/hours/${technicianResponse.body.technicianId}`)
      .set("Cookie", token)
      .send({
        hours: ["00:00"],
      })

    expect(response.status).toEqual(400)
    expect(response.body).toHaveProperty(
      "message",
      "The hour 00:00 is not allowed",
    )
  })
})
