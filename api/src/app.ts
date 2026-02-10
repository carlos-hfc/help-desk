import fastifySwagger from "@fastify/swagger"
import fastifyApiReference from "@scalar/fastify-api-reference"
import fastify from "fastify"
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod"

import { register } from "@/routes/session/register"

import { errorHandler } from "./error-handler"

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

app.register(register)
