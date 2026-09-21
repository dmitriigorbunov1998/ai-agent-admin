import type {DashboardSummary} from '@/pages/dashboard/model/types';

export const dashboardSummaryMock: DashboardSummary = {
    users: {
        total: 1284,
        active: 1217,
    },

    subscriptions: {
        paid: 312,

        freemium: 972,
        lite: 244,
        pro: 68,
    },

    payments: {
        succeeded: 356,
        revenueRub: 186_240,
    },

    energy: {
        totalBalance: 8_491,
    },
}