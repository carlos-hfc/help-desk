import z from "zod"

export const ErrorResponseSchema = z.object({
  message: z.string(),
  statusCode: z.number(),
})

export const NoContentSchema = z.void().describe("No Content")
export const BadRequestSchema = ErrorResponseSchema.describe("Bad Request")
export const NotFoundSchema = ErrorResponseSchema.describe("Not Found")
export const UnauthorizedSchema = ErrorResponseSchema.describe("Unauthorized")
