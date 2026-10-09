import { HttpResponse, http } from 'msw';

import { dashboardSummaryMock } from '@/mocks/data/dashboard';
import { usersMock } from '@/mocks/data/users';
import { createUserDetailsMock } from '@/mocks/data/user-detais';
import { authMockState, mockAdminUser } from '@/mocks/data/auth';

export const handlers = [
  http.get('/api/v1/admin/auth/me', () => {
    if (!authMockState.authenticated || !authMockState.user) {
      return HttpResponse.json(
        {
          error: 'UNAUTHORIZED',
        },
        {
          status: 401,
        },
      );
    }

    return HttpResponse.json({
      user: authMockState.user,
    });
  }),

  http.get('/api/admin/dashboard', () => {
    return HttpResponse.json(dashboardSummaryMock);
  }),

  http.get('/api/admin/users', ({ request }) => {
    const url = new URL(request.url);

    const requestedLimit = Number(url.searchParams.get('limit') ?? 10);

    const requestedOffset = Number(url.searchParams.get('offset') ?? 0);

    const limit = Math.min(100, Math.max(1, requestedLimit));

    const offset = Math.max(0, requestedOffset);

    const total = usersMock.length;

    const users = usersMock.slice(offset, offset + limit);

    return HttpResponse.json({
      users,
      limit,
      offset,
      total,
    });
  }),

  http.get('/api/admin/users/:userId', ({ params }) => {
    const userId = Number(params.userId);

    const user = usersMock.find((item) => item.id === userId);

    if (!user) {
      return HttpResponse.json(
        {
          error: 'USER_NOT_FOUND',
        },
        {
          status: 404,
        },
      );
    }

    return HttpResponse.json(createUserDetailsMock(user));
  }),

  http.post(
    '/api/v1/admin/auth/login',

    async ({ request }) => {
      const body = (await request.json()) as {
        email?: unknown;
        password?: unknown;
      };

      if (typeof body.email !== 'string' || typeof body.password !== 'string') {
        return HttpResponse.json(
          {
            error: 'INVALID_REQUEST',
          },
          {
            status: 400,
          },
        );
      }

      if (
        body.email !== 'admin@example.com' ||
        body.password !== 'admin-password-123'
      ) {
        return HttpResponse.json(
          {
            error: 'INVALID_CREDENTIALS',
          },
          {
            status: 401,
          },
        );
      }

      authMockState.authenticated = true;

      authMockState.user = mockAdminUser;

      return HttpResponse.json({
        user: mockAdminUser,
      });
    },
  ),

  http.post('/api/v1/admin/auth/logout', () => {
    authMockState.authenticated = false;

    authMockState.user = null;

    return new HttpResponse(null, {
      status: 204,
    });
  }),

  http.post(
    '/api/admin/users/:telegramId/energy/grants',

    async ({ params, request }) => {
      const telegramId = String(params.telegramId);

      const body = (await request.json()) as {
        amount?: unknown;
        reason?: unknown;
      };

      const amount = Number(body.amount);

      if (!Number.isSafeInteger(amount) || amount <= 0) {
        return HttpResponse.json(
          {
            error: 'INVALID_ENERGY_AMOUNT',
          },
          {
            status: 400,
          },
        );
      }

      const user = usersMock.find((item) => item.telegramId === telegramId);

      if (!user) {
        return HttpResponse.json(
          {
            error: 'USER_NOT_FOUND',
          },
          {
            status: 404,
          },
        );
      }

      if (user.energy === null) {
        return HttpResponse.json(
          {
            error: 'ENERGY_ACCOUNT_NOT_FOUND',
          },
          {
            status: 409,
          },
        );
      }

      const balanceBefore = user.energy;

      user.energy += amount;

      return HttpResponse.json({
        user: {
          id: user.id,

          telegramId: user.telegramId,

          username: user.username,
        },

        energy: {
          granted: amount,

          balanceBefore,

          balanceAfter: user.energy,

          availableAfter: user.energy,
        },
      });
    },
  ),
];
