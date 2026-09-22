import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AdminLayout } from '@/app/layouts/admin-layout';
import { AiUsagePage } from '@/pages/ai-usage/ui/ai-usage-page';
import { DashboardPage } from '@/pages/dashboard/ui/dashboard-page';
import { PaymentsPage } from '@/pages/payments/ui/payments-page';
import { SubscriptionsPage } from '@/pages/subscriptions/ui/subscriptions-page';
import { SystemPage } from '@/pages/system/ui/system-page';
import { UsersPage } from '@/pages/users/ui/users-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'subscriptions',
        element: <SubscriptionsPage />,
      },
      {
        path: 'payments',
        element: <PaymentsPage />,
      },
      {
        path: 'ai-usage',
        element: <AiUsagePage />,
      },
      {
        path: 'system',
        element: <SystemPage />,
      },
    ],
  },
]);
