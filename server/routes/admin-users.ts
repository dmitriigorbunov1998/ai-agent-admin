import type { Request, Response } from 'express';

import { clioAdminFetch } from '../lib/clio-admin-client';

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

function readInteger(
  value: unknown,
  fallback: number,
  min: number,
  max: number,
) {
  if (typeof value !== 'string' || !/^\d+$/.test(value)) {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isSafeInteger(parsed)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, parsed));
}

export async function getAdminUsers(request: Request, response: Response) {
  const limit = readInteger(request.query.limit, DEFAULT_LIMIT, 1, MAX_LIMIT);

  const offset = readInteger(
    request.query.offset,
    0,
    0,
    Number.MAX_SAFE_INTEGER,
  );

  try {
    const searchParams = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
    });

    const upstream = await clioAdminFetch(
      `/api/v1/admin/users?${searchParams.toString()}`,
    );

    if (upstream.status === 401) {
      console.error('Clio Admin API rejected server credentials');

      response.status(502).json({
        error: 'CLIO_ADMIN_AUTH_FAILED',
      });

      return;
    }

    const body = await upstream.text();

    response
      .status(upstream.status)
      .type(upstream.headers.get('content-type') ?? 'application/json')
      .send(body);
  } catch (error) {
    console.error('Failed to request Clio Admin API', error);

    response.status(502).json({
      error: 'CLIO_ADMIN_API_UNAVAILABLE',
    });
  }
}
