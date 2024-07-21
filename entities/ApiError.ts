export class ApiError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    }
  }
}
