import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AdminLayout } from '@/app/layouts/admin-layout';
import { RequireAuth } from '@/app/router/require-auth';

import { AuthPage } from '@/pages/auth/ui/auth-page';
import { AiUsagePage } from '@/pages/ai-usage/ui/ai-usage-page';
import { DashboardPage } from '@/pages/dashboard/ui/dashboard-page';
import { PaymentsPage } from '@/pages/payments/ui/payments-page';
import { SubscriptionsPage } from '@/pages/subscriptions/ui/subscriptions-page';
import { SystemPage } from '@/pages/system/ui/system-page';
import { UsersPage } from '@/pages/users/ui/users-page';
import { UserDetailsPage } from '@/pages/user-details/ui/user-details-page';

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />,
  },

  {
    element: <RequireAuth />,

    children: [
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
            path: 'users/:userId',
            element: <UserDetailsPage />,
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
    ],
  },
]);
