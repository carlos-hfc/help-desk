import z from "zod"

export const ErrorResponseSchema = z.object({
  message: z.string(),
})

export const NoContentSchema = z.void().describe("No Content")
export const BadRequestSchema = ErrorResponseSchema.extend({
  statusCode: z.literal(400),
}).describe("Bad Request")
export const NotFoundSchema = ErrorResponseSchema.extend({
  statusCode: z.literal(404),
}).describe("Not Found")
export const UnauthorizedSchema = ErrorResponseSchema.extend({
  statusCode: z.literal(401),
}).describe("Unauthorized")
export const ConflictSchema = ErrorResponseSchema.extend({
  statusCode: z.literal(409),
}).describe("Conflict")
export const ContentTooLargeSchema = ErrorResponseSchema.extend({
  statusCode: z.literal(413),
}).describe("Content Too Large")
