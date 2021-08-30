export class CustomError extends Error {
  public readonly isCustom = true;
}

export function isCustomError(error: unknown): error is CustomError {
  return (error as CustomError).isCustom;
}
