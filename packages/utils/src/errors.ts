export class AppError extends Error {
  constructor(
    public override message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_ERROR',
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'You do not have permission to perform this action') {
    super(message, 403, 'FORBIDDEN')
    this.name = 'ForbiddenError'
  }
}

export class ValidationError extends AppError {
  public fieldErrors?: Record<string, string[]>

  constructor(message = 'Validation failed', fieldErrors?: Record<string, string[]>) {
    super(message, 400, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
    this.fieldErrors = fieldErrors
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409, 'CONFLICT')
    this.name = 'ConflictError'
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Too many requests. Please slow down.') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED')
    this.name = 'RateLimitError'
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

export function toHttpError(error: unknown): {
  statusCode: number
  message: string
  code: string
} {
  if (isAppError(error)) {
    return {
      statusCode: error.statusCode,
      message: error.message,
      code: error.code,
    }
  }

  if (error instanceof Error) {
    return {
      statusCode: 500,
      message: error.message,
      code: 'INTERNAL_ERROR',
    }
  }

  return {
    statusCode: 500,
    message: 'An unexpected error occurred',
    code: 'INTERNAL_ERROR',
  }
}
