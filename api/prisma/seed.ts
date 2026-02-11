import { faker } from "@faker-js/faker"
import { hash } from "argon2"

import { prisma } from "@/lib/prisma"
import { hours } from "@/utils/hours"

export async function main() {
  const password = await hash("123456")

  await prisma.user.create({
    data: {
      name: "Carlos",
      email: "carlos@email.com",
      password,
      role: "ADMIN",
      firstAccess: false,
    },
  })

  const technicians = await prisma.user.createManyAndReturn({
    data: [
      {
        name: "Tech 1",
        email: "tech1@email.com",
        password,
        role: "TECHNICIAN",
        firstAccess: false,
      },
      {
        name: "Tech 2",
        email: "tech2@email.com",
        password,
        role: "TECHNICIAN",
        firstAccess: false,
      },
      {
        name: "Tech 3",
        email: "tech3@email.com",
        password,
        role: "TECHNICIAN",
        firstAccess: false,
      },
    ],
  })

  await prisma.user.create({
    data: {
      name: "Client",
      email: "client@email.com",
      password,
      role: "CLIENT",
      firstAccess: false,
    },
  })

  const technicianAvailability = technicians.flatMap((technician, index) => {
    const init = index * 5
    const end = init + 5

    const technicianHours = hours.slice(init, end)

    return technicianHours.map(hour => ({
      hour,
      technicianId: technician.id,
    }))
  })

  await prisma.technicianAvailability.createMany({
    data: technicianAvailability,
  })

  const serviceName = [
    "Instalação e atualização de softwares",
    "Instalação e atualização de hardwares",
    "Diagnóstico e remoção de vírus",
    "Suporte a impressoras",
    "Suporte a periféricos",
    "Solução de problemas de conectividade de internet",
    "Backup e recuperação de dados",
    "Otimização de desempenho do sistema operacional",
    "Configuração de VPN e Acesso Remoto",
  ]

  await prisma.service.createManyAndReturn({
    data: serviceName.map(item => ({
      name: item,
      price: faker.commerce.price(),
    })),
  })
}

main()
