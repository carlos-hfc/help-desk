import { Prisma } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"

import { makeCall } from "./make-call"
import { makeService } from "./make-service"
import { makeTechnician } from "./make-technician"
import { makeUser } from "./make-user"

export type CreateCompleteCallParams = Prisma.CallUncheckedCreateInput

export async function createCompleteCall(
  override: Partial<CreateCompleteCallParams> = {},
) {
  const client = await prisma.user.create({
    data: makeUser(),
  })

  const technician = await prisma.user.create({
    data: makeTechnician(),
  })

  const service = await prisma.service.create({
    data: makeService(),
  })

  const fakeCall = makeCall(override)

  const call = await prisma.call.create({
    data: {
      ...fakeCall,
      totalValue: service.price.toNumber(),
      hour: override.hour ?? technician.hours[0],
      clientId: override.clientId ?? client.id,
      technicianId: override.technicianId ?? technician.id,
      callServices: {
        create: {
          serviceId: service.id,
          createdBy: "CLIENT",
        },
      },
    },
  })

  return {
    call,
    service,
  }
}
