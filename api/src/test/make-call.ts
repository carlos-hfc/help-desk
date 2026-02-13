import { faker } from "@faker-js/faker"

import { Prisma } from "@/generated/prisma/client"
import { hours } from "@/utils/hours"

export type MakeCallParams = Prisma.CallUncheckedCreateInput & {
  serviceId: string
}

export function makeCall(override: Partial<MakeCallParams> = {}) {
  return {
    title: faker.lorem.words(2),
    description: faker.lorem.words(10),
    hour: faker.helpers.arrayElement(hours),
    ...override,
  }
}
