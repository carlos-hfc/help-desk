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
import { authenticate } from "./routes/session/authenticate"
import { register } from "./routes/session/register"

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
app.register(authenticate)
