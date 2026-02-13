import { faker } from "@faker-js/faker"
import request from "supertest"

import { app } from "@/app"
import { CallStatus } from "@/generated/prisma/enums"
import { createAndAuthUser } from "@/test/create-and-auth-user"
import { createCompleteCall } from "@/test/create-complete-call"
import { makeTechnician } from "@/test/make-technician"

describe("List calls by client [GET] /clients/calls", () => {
  it("should be able to list calls by logged user", async () => {
    const { token, user: technician } = await createAndAuthUser(app, {
      role: "TECHNICIAN",
      hours: makeTechnician().hours,
    })

    for (let index = 0; index < 5; index++) {
      await createCompleteCall({
        status: faker.helpers.enumValue(CallStatus),
        technicianId: technician.id,
        hour: technician.hours[0],
      })
    }

    const response = await request(app.server)
      .get("/technicians/calls")
      .set("Cookie", token)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      calls: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          status: expect.any(String),
          updatedAt: expect.any(String),
          service: expect.any(String),
          totalValue: expect.any(Number),
          client: expect.objectContaining({
            name: expect.any(String),
            image: expect.toBeOneOf([null, expect.any(String)]),
          }),
        }),
      ]),
    })
  })
})
