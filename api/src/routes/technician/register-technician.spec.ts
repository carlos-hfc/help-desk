import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"
import { makeTechnician } from "@/test/make-technician"

describe("Register technician [POST] /techinicians", () => {
  it("should be able to register a technician", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const technician = makeTechnician({ firstAccess: null })

    const response = await request(app.server)
      .post("/technicians")
      .set("Cookie", token)
      .send(technician)

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({
      technicianId: expect.any(String),
    })
  })

  it("should not be able to register a technician with a non-admin user", async () => {
    const { token } = await createAndAuthUser(app)

    const technician = makeTechnician({ firstAccess: null })

    const response = await request(app.server)
      .post("/technicians")
      .set("Cookie", token)
      .send(technician)

    expect(response.status).toEqual(401)
    expect(response.body).toHaveProperty("message", "Unauthorized")
  })

  it("should not be able to register a technician without JWT token", async () => {
    const technician = makeTechnician({ firstAccess: null })

    const response = await request(app.server)
      .post("/technicians")
      .send(technician)

    expect(response.status).toEqual(401)
    expect(response.body).toHaveProperty("message", "Unauthorized")
  })

  it("should not be able to register a technician with available hour not allowed", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const technician = makeTechnician({ firstAccess: null, hours: ["00:00"] })

    const response = await request(app.server)
      .post("/technicians")
      .set("Cookie", token)
      .send(technician)

    expect(response.status).toEqual(400)
    expect(response.body).toHaveProperty(
      "message",
      "The hour 00:00 is not allowed",
    )
  })
})
