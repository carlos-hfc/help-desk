import request from "supertest"

import { app } from "@/app"

describe("Sign out user [POST] /sessions/sign-out", () => {
  it("should be able to sign out user", async () => {
    const response = await request(app.server).post("/sessions/sign-out").send()

    expect(response.status).toEqual(200)
  })
})
