export class AppError extends Error {
  statusCode: number;
  errors?: string[];

  constructor(message: string, statusCode = 500, errors?: string[]) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
