import fastifyCookie from "@fastify/cookie"
import fastifyCors from "@fastify/cors"
import fastifyJwt from "@fastify/jwt"
import fastifySwagger from "@fastify/swagger"
import fastifyApiReference from "@scalar/fastify-api-reference"
import fastify from "fastify"
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod"

import { env } from "./env"
import { errorHandler } from "./error-handler"
import { listClients } from "./routes/client/list-clients"
import { authenticate } from "./routes/session/authenticate"
import { createPassword } from "./routes/session/create-password"
import { register } from "./routes/session/register"
import { signOut } from "./routes/session/sign-out"
import { validateFirstAccess } from "./routes/session/validate-first-acess"
import { editAvailability } from "./routes/technician/edit-availability"
import { listTechnicians } from "./routes/technician/list-technicians"
import { registerTechnician } from "./routes/technician/register-technician"

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Help Desk",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifyApiReference, {
  routePrefix: "/docs",
  configuration: {
    theme: "kepler",
  },
})

app.register(fastifyCookie)
app.register(fastifyCors, {
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  origin: env.ALLOWED_ORIGINS?.split(",") ?? [""],
})
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: env.COOKIE_NAME,
    signed: false,
  },
  sign: {
    expiresIn: "1d",
  },
})

app.register(register)
app.register(validateFirstAccess)
app.register(createPassword)
app.register(authenticate)
app.register(signOut)

app.register(listTechnicians)
app.register(registerTechnician)
app.register(editAvailability)

app.register(listClients)
