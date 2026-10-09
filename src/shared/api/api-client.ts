import { emitAuthUnauthorized } from './auth-events';

export class ApiError extends Error {
  public readonly status: number;

  constructor(status: number, message: string) {
    super(message);

    this.name = 'ApiError';
    this.status = status;
  }
}

type ApiClientOptions = RequestInit & {
  skipUnauthorizedEvent?: boolean;
};

export async function apiClient<T>(
  path: string,
  options?: ApiClientOptions,
): Promise<T> {
  const { skipUnauthorizedEvent = false, ...requestOptions } = options ?? {};

  const response = await fetch(path, {
    ...requestOptions,

    credentials: 'include',

    headers: {
      'Content-Type': 'application/json',
      ...requestOptions.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401 && !skipUnauthorizedEvent) {
      emitAuthUnauthorized();
    }

    let message = 'Something went wrong';

    try {
      const body = await response.json();

      if (
        typeof body === 'object' &&
        body !== null &&
        'error' in body &&
        typeof body.error === 'string'
      ) {
        message = body.error;
      }
    } catch {
      // Response has no JSON body.
    }

    throw new ApiError(response.status, message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
