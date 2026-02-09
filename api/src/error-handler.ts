import { FastifyInstance } from "fastify"
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod"

import { ClientError } from "./errors/client-error"

type FastifyErrorHandler = FastifyInstance["errorHandler"]

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: "Validation error",
      statusCode: 400,
      errors: error.validation,
    })
  }

  if (error instanceof ClientError) {
    return reply.status(error.statusCode).send(error)
  }

  return reply.status(500).send({
    error: JSON.stringify(error),
    statusCode: 500,
  })
}
