import { faker } from "@faker-js/faker"
import request from "supertest"

import { app } from "@/app"
import { createAndAuthUser } from "@/test/create-and-auth-user"
import { makeService } from "@/test/make-service"

interface Services {
  id: string
  name: string
  price: number
  isActive: boolean
}

describe("List services [GET] /services", () => {
  it("should be able to list services", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    for (let index = 0; index < 5; index++) {
      const service = makeService()

      await request(app.server)
        .post("/services")
        .set("Cookie", token)
        .send(service)
    }

    const response = await request(app.server)
      .get("/services")
      .set("Cookie", token)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      services: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          price: expect.any(Number),
          isActive: expect.any(Boolean),
        }),
      ]),
    })
  })

  it("should be able to list services, including inactive services", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const services = []

    for (let index = 0; index < 5; index++) {
      const service = makeService()

      services.push(
        await request(app.server)
          .post("/services")
          .set("Cookie", token)
          .send(service),
      )
    }

    await request(app.server)
      .patch(
        `/services/${faker.helpers.arrayElement(services).body.serviceId}/status`,
      )
      .set("Cookie", token)
      .send()

    const response = await request(app.server)
      .get("/services")
      .set("Cookie", token)
      .send()

    expect(response.status).toEqual(200)

    const servicesBody = response.body.services
    expect(servicesBody).toContainEqual({
      id: expect.any(String),
      name: expect.any(String),
      price: expect.any(Number),
      isActive: false,
    })
  })

  it("should be able to list only active services", async () => {
    const { token } = await createAndAuthUser(app, { role: "ADMIN" })

    const services = []

    for (let index = 0; index < 10; index++) {
      const service = makeService()

      services.push(
        await request(app.server)
          .post("/services")
          .set("Cookie", token)
          .send(service),
      )
    }

    for (let index = 0; index < 2; index++) {
      const service = services[index]

      await request(app.server)
        .patch(`/services/${service.body.serviceId}/status`)
        .set("Cookie", token)
        .send()
    }

    const { token: tokenClient } = await createAndAuthUser(app, {
      role: "CLIENT",
    })

    const response = await request(app.server)
      .get("/services")
      .set("Cookie", tokenClient)
      .send()

    expect(response.status).toEqual(200)

    const servicesBody = response.body.services.every(
      (item: Services) => item.isActive,
    )

    expect(servicesBody).toBe(true)
  })
})
