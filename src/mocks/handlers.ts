import { HttpResponse, http } from 'msw';

import { dashboardSummaryMock } from '@/mocks/data/dashboard';
import { usersMock } from '@/mocks/data/users';

export const handlers = [
  http.get('/api/admin/dashboard', () => {
    return HttpResponse.json(dashboardSummaryMock);
  }),

  http.get('/api/admin/users', ({ request }) => {
    const url = new URL(request.url);

    const requestedPage = Number(url.searchParams.get('page') ?? 1);

    const requestedPageSize = Number(url.searchParams.get('pageSize') ?? 10);

    const page = Math.max(1, requestedPage);

    const pageSize = Math.min(100, Math.max(1, requestedPageSize));

    const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();

    const filteredUsers = usersMock.filter((user) => {
      if (!search) {
        return true;
      }

      return [user.telegramId, user.username, user.firstName].some((value) =>
        value?.toLowerCase().includes(search),
      );
    });

    const total = filteredUsers.length;

    const totalPages = Math.ceil(total / pageSize);

    const start = (page - 1) * pageSize;

    const items = filteredUsers.slice(start, start + pageSize);

    return HttpResponse.json({
      items,

      pagination: {
        page,
        pageSize,
        total,
        totalPages,
      },
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

      if (!user.energy) {
        return HttpResponse.json(
          {
            error: 'ENERGY_ACCOUNT_NOT_FOUND',
          },
          {
            status: 409,
          },
        );
      }

      const balanceBefore = user.energy.balance;

      user.energy.balance += amount;

      user.energy.available = user.energy.balance - user.energy.reserved;

      return HttpResponse.json({
        user: {
          id: user.id,

          telegramId: user.telegramId,

          username: user.username,

          firstName: user.firstName,
        },

        energy: {
          granted: amount,

          balanceBefore,

          balanceAfter: user.energy.balance,

          reserved: user.energy.reserved,

          availableAfter: user.energy.available,
        },
      });
    },
  ),
];
