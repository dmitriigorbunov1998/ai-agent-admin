import {
    CreditCard,
    Users,
    WalletCards,
    Zap,
} from 'lucide-react';

import type {DashboardSummary} from '@/pages/dashboard/model/types.ts';

import {StatCard} from '@/widgets/dashboard-stats/ui/stat-card.tsx';

type DashboardStatsProps = {
    data: DashboardSummary;
}

const rubFormatter = new Intl.NumberFormat(
    'ru-RU',
    {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
    },
)

export function DashboardStats({data}: DashboardStatsProps) {
    const stats = [
        {
            title: 'Total users',

            value: data.users.total.toLocaleString(),

            description: `${data.users.active.toLocaleString()} active users`,

            icon: Users,
        },
        {
            title: 'Paid subscriptions',

            value: data.subscriptions.paid.toLocaleString(),

            description: `${data.subscriptions.lite} Lite · ${data.subscriptions.pro} Pro`,

            icon: WalletCards,
        },
        {
            title: 'Revenue',

            value: rubFormatter.format(data.payments.revenueRub),

            description: `${data.payments.succeeded.toLocaleString()} successful payments`,

            icon: CreditCard,
        },
        {
            title: 'Energy balance',

            value: data.energy.totalBalance.toLocaleString(),

            description: 'Available energy across users',

            icon: Zap,
        },
    ]

    return (
        <div className="grid gap-4 mt:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <StatCard
                    key={stat.title}
                    {...stat}
                />
            ))}
        </div>
    )
}