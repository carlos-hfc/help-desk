import { randomUUID } from "node:crypto"

import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"
import { makeCall } from "@/test/make-call"
import { makeService } from "@/test/make-service"
import { makeTechnician } from "@/test/make-technician"

describe("Create a call [POST] /calls", () => {
  it("should be able to create a call", async () => {
    const { token: tokenAdmin } = await createAndAuthUser(app, {
      role: "ADMIN",
    })

    const technician = makeTechnician({ firstAccess: null })

    const technicianResponse = await request(app.server)
      .post("/technicians")
      .set("Cookie", tokenAdmin)
      .send(technician)

    const serviceResponse = await request(app.server)
      .post("/services")
      .set("Cookie", tokenAdmin)
      .send(makeService())

    const { token } = await createAndAuthUser(app, { role: "CLIENT" })

    const response = await request(app.server)
      .post("/calls")
      .set("Cookie", token)
      .send(
        makeCall({
          serviceId: serviceResponse.body.serviceId,
          technicianId: technicianResponse.body.technicianId,
          hour: technician.hours[0],
        }),
      )

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      callId: expect.any(String),
    })
  })

  it("should not be able to create a call with inexistent or inactive service", async () => {
    const { token: tokenAdmin } = await createAndAuthUser(app, {
      role: "ADMIN",
    })

    const technician = makeTechnician({ firstAccess: null })

    const technicianResponse = await request(app.server)
      .post("/technicians")
      .set("Cookie", tokenAdmin)
      .send(technician)

    const { token } = await createAndAuthUser(app, { role: "CLIENT" })

    const response = await request(app.server)
      .post("/calls")
      .set("Cookie", token)
      .send(
        makeCall({
          serviceId: randomUUID(),
          technicianId: technicianResponse.body.technicianId,
          hour: technician.hours[0],
        }),
      )

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message", "Service not found")
  })

  it("should not be able to create a call with inexistent technician", async () => {
    const { token: tokenAdmin } = await createAndAuthUser(app, {
      role: "ADMIN",
    })

    const serviceResponse = await request(app.server)
      .post("/services")
      .set("Cookie", tokenAdmin)
      .send(makeService())

    const { token } = await createAndAuthUser(app, { role: "CLIENT" })

    const response = await request(app.server)
      .post("/calls")
      .set("Cookie", token)
      .send(
        makeCall({
          technicianId: randomUUID(),
          serviceId: serviceResponse.body.serviceId,
        }),
      )

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message", "Technician not found")
  })

  it("should not be able to create a call at an hour when the technician is unavailable", async () => {
    const { token: tokenAdmin } = await createAndAuthUser(app, {
      role: "ADMIN",
    })

    const technician = makeTechnician({ firstAccess: null, hours: ["08:00"] })

    const technicianResponse = await request(app.server)
      .post("/technicians")
      .set("Cookie", tokenAdmin)
      .send(technician)

    const serviceResponse = await request(app.server)
      .post("/services")
      .set("Cookie", tokenAdmin)
      .send(makeService())

    const { token } = await createAndAuthUser(app, { role: "CLIENT" })

    const response = await request(app.server)
      .post("/calls")
      .set("Cookie", token)
      .send(
        makeCall({
          technicianId: technicianResponse.body.technicianId,
          serviceId: serviceResponse.body.serviceId,
          hour: "09:00",
        }),
      )

    console.log(response.body)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty(
      "message",
      "The selected technician is not available during these hours",
    )
  })
})
