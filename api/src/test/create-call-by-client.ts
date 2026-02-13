import { Prisma } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"

import { makeCall } from "./make-call"
import { makeService } from "./make-service"
import { makeTechnician } from "./make-technician"

export type CreateCallByClientParams = Prisma.CallUncheckedCreateInput & {
  clientId: string
}

export async function createCallByClient(
  override: Partial<CreateCallByClientParams> = {},
) {
  const technician = await prisma.user.create({
    data: makeTechnician({
      firstAccess: null,
    }),
  })

  const service = await prisma.service.create({
    data: makeService(),
  })

  const fakeCall = makeCall(override)

  return await prisma.call.create({
    data: {
      ...fakeCall,
      totalValue: service.price.toNumber(),
      hour: technician.hours[0],
      clientId: override.clientId!,
      technicianId: technician.id,
      callServices: {
        create: {
          serviceId: service.id,
          createdBy: "CLIENT",
        },
      },
    },
  })
}
