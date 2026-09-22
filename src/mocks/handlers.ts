import {
    HttpResponse,
    http,
} from 'msw';

import {dashboardSummaryMock} from '@/mocks/data/dashboard';
import {usersMock} from '@/mocks/data/users';

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