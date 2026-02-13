import { faker } from "@faker-js/faker"

import { Prisma, UserRole } from "@/generated/prisma/browser"

export type MakeUserParams = Prisma.UserCreateInput

export function makeUser(override: Partial<MakeUserParams> = {}) {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    image: faker.helpers.arrayElement(["image.png", null]),
    role: faker.helpers.enumValue(UserRole),
    ...override,
  }
}
