import type { AdminUserDetails } from '@/pages/user-details/model/types.ts';
import type { AdminUserListItem } from '@/pages/users/model/types.ts';

export function createUserDetailsMock(
  user: AdminUserListItem,
): AdminUserDetails {
  const planCode = user.plan.code;

  const createdAt = new Date(Date.UTC(2026, 7, 10 + user.id)).toISOString();

  const plan =
    planCode === 'pro'
      ? {
          id: 3,
          code: 'pro' as const,
          name: 'Pro',
          priceRub: 1490,
          energyLimit: 100,
          maxConcurrentTasks: 5,
          maxCronJobs: 10,
        }
      : planCode === 'lite'
        ? {
            id: 2,
            code: 'lite' as const,
            name: 'Lite',
            priceRub: 599,
            energyLimit: 40,
            maxConcurrentTasks: 2,
            maxCronJobs: 3,
          }
        : {
            id: 1,
            code: 'freemium' as const,
            name: 'Freemium',
            priceRub: 0,
            energyLimit: 5,
            maxConcurrentTasks: 1,
            maxCronJobs: 0,
          };

  const paidPlan = plan.code !== 'freemium';

  return {
    user: {
      id: user.id,
      telegramId: user.telegramId,
      username: user.username,
      firstName: null,
      isActive: true,
      createdAt,
      updatedAt: createdAt,
    },

    subscription: {
      id: user.id,

      status: 'active',

      startedAt: createdAt,

      expiresAt:
        user.createdAt ??
        new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),

      plan,
    },

    energy:
      user.energy === null
        ? null
        : {
            balance: user.energy,
            reserved: 0,
            available: user.energy,
          },

    aiActivity: {
      totalTasks: 20 + user.id * 3,

      runningTasks: user.id % 4 === 0 ? 1 : 0,

      completedTasks: 18 + user.id * 3,

      failedTasks: user.id * 5,

      spentUsd: (0.18 + user.id * 0.047).toFixed(6),

      reservedUsd: '0.00000',

      lastTaskAt: new Date(Date.now() - user.id * 1000 * 60 * 13).toISOString(),
    },

    payments: paidPlan
      ? [
          {
            id: user.id * 10 + 1,

            amountRub: plan.priceRub,

            provider: 'mock',

            status: 'succeeded',

            createdAt,

            paidAt: createdAt,
          },
          {
            id: user.id * 10 + 2,

            amountRub: plan.priceRub,

            provider: 'mock',

            status: 'succeeded',

            createdAt: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 30,
            ).toISOString(),

            paidAt: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 30,
            ).toISOString(),
          },
        ]
      : [],
  };
}
