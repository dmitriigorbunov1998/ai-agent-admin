export class ApiError extends Error {
    public readonly status: number;

    constructor(
        status: number,
        message: string,
    ) {
        super(message);

        this.name = 'ApiError';
        this.status = status;
    }
}

const API_URL = (
    import.meta.env.VITE_API_URL ?? ''
).replace(/^\//, '');

export async function apiClient<T>(
    path: string,
    options?: RequestInit,
): Promise<T> {
    const response = await fetch(
        `${API_URL}${path}`,
        {
            ...options,

            credentials: 'include',

            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        },
    )

    if (!response.ok) {
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

        throw new ApiError(
            response.status,
            message,
        )
    }

    return await response.json() as T;
}