import { faker } from "@faker-js/faker"

import { Prisma } from "@/generated/prisma/browser"

type Override = Partial<Prisma.UserCreateInput>

export function makeUser(override: Override = {}) {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    ...override,
  }
}
