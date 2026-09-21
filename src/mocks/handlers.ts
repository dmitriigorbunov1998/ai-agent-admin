import {
    HttpResponse,
    http,
} from 'msw';

import {dashboardSummaryMock} from '@/mocks/data/dashboard.ts';

export const handlers = [
    http.get(
        '/api/admin/dashboard',
        () => {
            return HttpResponse.json(
                dashboardSummaryMock,
            )
        },
    ),
]