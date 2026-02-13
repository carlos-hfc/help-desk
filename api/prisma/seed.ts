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
    },
  })

  const technicians = await prisma.user.createManyAndReturn({
    data: [
      {
        name: "Tech 1",
        email: "tech1@email.com",
        password,
        role: "TECHNICIAN",
        hours: hours.slice(0, 5),
      },
      {
        name: "Tech 2",
        email: "tech2@email.com",
        password,
        role: "TECHNICIAN",
        hours: hours.slice(5, 10),
      },
      {
        name: "Tech 3",
        email: "tech3@email.com",
        password,
        role: "TECHNICIAN",
        hours: hours.slice(10, 15),
      },
    ],
  })

  await prisma.user.create({
    data: {
      name: "Client",
      email: "client@email.com",
      password,
      role: "CLIENT",
    },
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
