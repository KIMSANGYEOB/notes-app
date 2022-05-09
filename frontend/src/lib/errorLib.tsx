interface ICognitoError extends Error {
  code: string
}

export function onError(error: unknown): boolean {
  let message = (error as Error).toString();

  // Auth errors
  if (!(error instanceof Error) && (error as Error).message) {
    message = (error as Error).message;
  }

  // Cognito errors
  if ((error as ICognitoError).code === 'UsernameExistsException') return true;

  alert(message);

  return false;
}