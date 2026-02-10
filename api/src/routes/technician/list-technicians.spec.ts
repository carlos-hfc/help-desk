import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"

describe("List technicians [GET] /technicians", () => {
  it("should be able to list technicians", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const response = await request(app.server)
      .get("/technicians")
      .set("Cookie", token)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      technicians: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          availabilities: expect.arrayContaining([
            expect.objectContaining({
              hour: expect.any(String),
            }),
          ]),
        }),
      ]),
    })
  })

  it("should not be able to list technicians with a non-admin user", async () => {
    const { token } = await createAndAuthUser(app, { role: "CLIENT" })

    const response = await request(app.server)
      .get("/technicians")
      .set("Cookie", token)
      .send()

    expect(response.status).toEqual(401)
    expect(response.body).toHaveProperty("message", "Unauthorized")
  })

  it("should not be able to list technicians without JWT token", async () => {
    const response = await request(app.server).get("/technicians").send()

    expect(response.status).toEqual(401)
    expect(response.body).toHaveProperty("message", "Unauthorized")
  })
})
