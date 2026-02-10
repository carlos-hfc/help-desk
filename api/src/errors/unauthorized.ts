import { ClientError } from "./client-error"

export class Unauthorized extends ClientError {
  constructor() {
    super("Unauthorized", 401)
  }
}
