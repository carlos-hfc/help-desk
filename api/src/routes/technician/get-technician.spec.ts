import { randomUUID } from "node:crypto"

import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"

describe("Get a technician [GET] /technicians/:technicianId", () => {
  it("should be able to get a technician", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })
    const { user } = await createAndAuthUser(app, { role: "TECHNICIAN" })

    const response = await request(app.server)
      .get(`/technicians/${user.id}`)
      .set("Cookie", token)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      technician: expect.objectContaining({
        id: user.id,
        name: user.name,
        hours: user.hours,
      }),
    })
  })

  it("should not be able to get an inexistent technician", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const response = await request(app.server)
      .get(`/technicians/${randomUUID()}`)
      .set("Cookie", token)
      .send()

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message", "Technician not found")
  })
})
