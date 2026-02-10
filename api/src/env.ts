import z from "zod"

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.url(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  COOKIE_NAME: z.string(),
  JWT_SECRET: z.string(),
  ALLOWED_ORIGINS: z.string().optional(),
})

export const env = envSchema.parse(process.env)
