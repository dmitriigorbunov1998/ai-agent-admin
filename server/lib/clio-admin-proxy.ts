import type { NextFunction, Request, Response } from 'express';

function getClioApiBaseUrl() {
  const value = process.env.CLIO_API_BASE_URL;

  if (!value) {
    throw new Error('CLIO_API_BASE_URL is not configured');
  }

  return value.replace(/\/$/, '');
}

function copyRequestHeader(
  headers: Headers,
  name: string,
  value: string | string[] | undefined,
) {
  if (!value) {
    return;
  }

  headers.set(name, Array.isArray(value) ? value.join(', ') : value);
}

export async function clioAdminProxy(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const target = new URL(request.originalUrl, getClioApiBaseUrl());

    const headers = new Headers();

    copyRequestHeader(headers, 'Accept', request.headers.accept);

    copyRequestHeader(headers, 'Content-Type', request.headers['content-type']);

    copyRequestHeader(headers, 'Cookie', request.headers.cookie);

    copyRequestHeader(headers, 'Origin', request.headers.origin);

    const method = request.method.toUpperCase();

    const canHaveBody = method !== 'GET' && method !== 'HEAD';

    const upstream = await fetch(target, {
      method,

      headers,

      redirect: 'manual',

      body:
        canHaveBody && request.body !== undefined
          ? JSON.stringify(request.body)
          : undefined,
    });

    response.status(upstream.status);

    const contentType = upstream.headers.get('Content-Type');

    if (contentType) {
      response.setHeader('content-type', contentType);
    }

    const cacheControl = upstream.headers.get('cache-Control');

    if (cacheControl) {
      response.setHeader('cache-control', cacheControl);
    }

    const retryAfter = upstream.headers.get('retry-after');

    if (retryAfter) {
      response.setHeader('retry-after', retryAfter);
    }

    const headersWithCookies = upstream.headers as Headers & {
      getSetCookies: () => string[];
    };

    const cookies = headersWithCookies.getSetCookie?.() ?? [];

    if (cookies.length > 0) {
      for (const cookie of cookies) {
        response.append('set-cookie', cookie);
      }
    } else {
      const cookie = upstream.headers.get('set-cookie');

      if (cookie) {
        response.setHeader('set-cookie', cookie);
      }
    }

    if (upstream.status === 204) {
      response.end();

      return;
    }

    const body = Buffer.from(await upstream.arrayBuffer());

    response.send(body);
  } catch (error) {
    next(error);
  }
}
