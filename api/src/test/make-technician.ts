import { faker } from "@faker-js/faker"

import { makeUser, MakeUserParams } from "./make-user"

export type MakeTechnicianParams = MakeUserParams & {
  hours: string[]
}

export function makeTechnician(override: Partial<MakeTechnicianParams> = {}) {
  const user = makeUser(override)

  return {
    ...user,
    role: "TECHNICIAN",
    hoursAvailability:
      override.hours ??
      faker.helpers.multiple(() =>
        String(faker.number.int({ min: 8, max: 22 }))
          .padStart(2, "0")
          .padEnd(5, ":00"),
      ),
  }
}
