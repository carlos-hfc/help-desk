import { ClientError } from "./client-error"

export class UserAlreadyExists extends ClientError {
  constructor() {
    super("User already exists", 409)
  }
}
