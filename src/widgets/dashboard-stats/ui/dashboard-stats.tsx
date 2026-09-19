import {
    CreditCard,
    Users,
    WalletCards,
    Zap,
} from 'lucide-react';

import {StatCard} from '@/widgets/dashboard-stats/ui/stat-card.tsx';

const stats = [
    {
        title: 'Total users',
        value: '1.284',
        description: 'Registered Telegram users',
        icon: Users,
    },
    {
        title: 'Active subscriptions',
        value: '312',
        description: 'Lite and Pro subscriptions',
        icon: WalletCards,
    },
    {
        title: 'Revenue',
        value: '₽186,240',
        description: 'Total successful payments',
        icon: CreditCard,
    },
    {
        title: 'Energy usage',
        value: '8.491',
        description: 'Energy units consumed',
        icon: Zap,
    },
]

export function DashboardStats() {
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