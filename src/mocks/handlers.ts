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
];
