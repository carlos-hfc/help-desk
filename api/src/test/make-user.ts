import { faker } from "@faker-js/faker"

import { Prisma } from "@/generated/prisma/browser"

export type MakeUserParams = Prisma.UserCreateInput

export function makeUser(override: Partial<MakeUserParams> = {}) {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    firstAccess: faker.helpers.arrayElement([true, false, null]),
    image: faker.helpers.arrayElement(["image.png", null]),
    ...override,
  }
}
