import { app } from "@/app"
import { Prisma } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"

beforeAll(async () => {
  const tablenames = await prisma.$queryRaw<Array<{ tablename: string }>>(
    Prisma.sql`SELECT tablename FROM pg_tables WHERE schemaname='public'`,
  )

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter(name => name !== "_prisma_migrations")
    .map(name => `"public"."${name}"`)
    .join(", ")

  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
  } catch (error) {
    console.log({ error })
  }

  await app.ready()
})

afterAll(async () => {
  await app.close()
})
