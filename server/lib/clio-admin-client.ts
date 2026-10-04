const DEFAULT_CLIO_API_URL = 'https://api.efimenko.tech';

function getApiKey() {
  const apiKey = process.env.ADMIN_API_KEY;

  if (!apiKey) {
    throw new Error('ADMIN_API_KEY is not configured');
  }

  return apiKey;
}

function getApiBaseUrl() {
  return (process.env.CLIO_API_BASE_URL ?? DEFAULT_CLIO_API_URL).replace(
    /\/$/,
    '',
  );
}

export async function clioAdminFetch(path: string, init?: RequestInit) {
  const apiKey = getApiKey();

  return fetch(`${getApiBaseUrl()}${path}`, {
    ...init,

    headers: {
      Accept: 'application/json',

      ...init?.headers,

      Authorization: `Bearer ${apiKey}`,
    },

    signal: AbortSignal.timeout(10_000),
  });
}
