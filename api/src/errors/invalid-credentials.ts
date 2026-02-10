import { ClientError } from "./client-error"

export class InvalidCredentials extends ClientError {
  constructor() {
    super("Invalid credentials", 400)
  }
}
