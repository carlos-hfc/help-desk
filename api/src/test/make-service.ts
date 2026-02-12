import { faker } from "@faker-js/faker"

import { Prisma } from "@/generated/prisma/client"

type MakeServiceParams = Prisma.ServiceCreateInput

export function makeService(override: Partial<MakeServiceParams> = {}) {
  return {
    name: faker.lorem.words({ min: 1, max: 5 }),
    price: Number(faker.commerce.price()),
    ...override,
  }
}
