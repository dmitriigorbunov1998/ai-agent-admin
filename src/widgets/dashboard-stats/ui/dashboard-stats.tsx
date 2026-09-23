import { CreditCard, Users, WalletCards, Zap } from 'lucide-react';

import { StatCard } from '@/widgets/dashboard-stats/ui/stat-card';

type DashboardStatsProps = {
  totalUsers: number;
  activeUsers: number;

  paidSubscriptions: number;
  liteSubscriptions: number;
  proSubscriptions: number;

  revenueRub: number;
  successfulPayments: number;

  energyBalance: number;
};

const rubFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

export function DashboardStats({
  totalUsers,
  activeUsers,
  paidSubscriptions,
  liteSubscriptions,
  proSubscriptions,
  revenueRub,
  successfulPayments,
  energyBalance,
}: DashboardStatsProps) {
  const stats = [
    {
      title: 'Total users',
      value: totalUsers.toLocaleString(),
      description: `${activeUsers.toLocaleString()} active users`,
      icon: Users,
    },
    {
      title: 'Paid subscriptions',
      value: paidSubscriptions.toLocaleString(),
      description: `${liteSubscriptions} Lite · ${proSubscriptions} Pro`,
      icon: WalletCards,
    },
    {
      title: 'Revenue',
      value: rubFormatter.format(revenueRub),
      description: `${successfulPayments.toLocaleString()} successful payments`,
      icon: CreditCard,
    },
    {
      title: 'Energy balance',
      value: energyBalance.toLocaleString(),
      description: 'Available energy across users',
      icon: Zap,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
