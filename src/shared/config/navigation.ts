import {
    Activity,
    CreditCard,
    Gauge,
    LayoutDashboard,
    Users,
    WalletCards,
} from 'lucide-react';

export const navigation = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        label: 'Users',
        href: '/users',
        icon: Users,
    },
    {
        label: 'Subscriptions',
        href: '/subscriptions',
        icon: WalletCards,
    },
    {
        label: 'Payments',
        href: '/payments',
        icon: CreditCard,
    },
    {
        label: 'AI Usage',
        href: '/ai-usage',
        icon: Activity,
    },
    {
        label: 'System',
        href: '/system',
        icon: Gauge,
    },
] as const;