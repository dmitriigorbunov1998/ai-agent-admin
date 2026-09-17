import {
    Activity,
    CreditCard,
    Gauge,
    LayoutDashboard,
    Users,
    WalletCards,
} from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const navigation = [
    {
        label: 'Dashboard',
        to: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        label: 'Users',
        to: '/users',
        icon: Users,
    },
    {
        label: 'Subscriptions',
        to: '/subscriptions',
        icon: WalletCards,
    },
    {
        label: 'Payments',
        to: '/payments',
        icon: CreditCard,
    },
    {
        label: 'AI Usage',
        to: '/ai-usage',
        icon: Activity,
    },
    {
        label: 'System',
        to: '/system',
        icon: Gauge,
    },
]

export function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-neutral-950 text-white">
            <aside className="flex w-64 flex-col border-r border-neutral-800 bg-neutral-950">
                <div className="flex h-16 items-center border-b border-neutral-800 px-6">
                    <span className="text-lg font-semibold tracking-tight">
                        Clio Admin
                    </span>
                </div>

                <nav className="flex flex-1 flex-col gap-1 p-3">
                    {navigation.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) => [
                                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                                    isActive
                                        ? 'bg-neutral-800 text-white'
                                        : 'text-neutral-400 hover:bg-neutral-900 hover:text-white',
                                    ].join(' ')
                                }
                            >
                                <Icon size={18} strokeWidth={1.8} />

                                <span>{item.label}</span>
                            </NavLink>
                        )
                    })}
                </nav>

                <div className="border-t border-neutral-800 p-4">
                    <div className="text-xs text-neutral-500">
                        Clio AI
                    </div>

                    <div className="mt-1 text-xs text-neutral-600">
                        Admin Console
                    </div>
                </div>
            </aside>

            <main className="min-w-0 flex-1">
                <header className="flex h-16 items-center border-b border-neutral-800 px-8">
                    <span className="text-sm text-neutral-400">
                        Administration
                    </span>
                </header>

                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}