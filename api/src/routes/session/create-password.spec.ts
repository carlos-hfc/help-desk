import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"
import { makeTechnician } from "@/test/make-technician"

describe("Create password [POST] /sessions/create-password", () => {
  it("should be able to create password after registration", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const technician = makeTechnician()

    await request(app.server)
      .post("/technicians")
      .set("Cookie", token)
      .send(technician)

    const response = await request(app.server)
      .post("/sessions/create-password")
      .send({
        email: technician.email,
        password: technician.password,
      })

    expect(response.status).toEqual(204)
  })

  it("should not be able to create password after registration with wrong e-mail", async () => {
    const response = await request(app.server)
      .post("/sessions/create-password")
      .send({
        email: "user.email@email.com",
        password: "user.password",
      })

    expect(response.status).toEqual(404)
    expect(response.body).toHaveProperty("message", "Technician not found")
  })
})
