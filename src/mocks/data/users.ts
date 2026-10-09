import type { AdminUserListItem } from '@/pages/users/model/types';

export const usersMock: AdminUserListItem[] = Array.from(
  { length: 37 },
  (_, index) => {
    const id = index + 1;

    const plan =
      index % 10 === 0
        ? {
            code: 'pro' as const,
            name: 'Pro',
          }
        : index % 4 === 0
          ? {
              code: 'lite' as const,
              name: 'Lite',
            }
          : {
              code: 'freemium' as const,
              name: 'Freemium',
            };

    const energy =
      plan.code === 'pro'
        ? 78 - (index % 20)
        : plan.code === 'lite'
          ? 31 - (index % 12)
          : Math.max(0, 5 - (index % 6));

    const createdAt =
      plan.code === 'freemium'
        ? null
        : new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();

    return {
      id,

      telegramId: String(700_000_000 + id),

      username: `clio_user_${id}`,

      plan,

      energy,

      createdAt,
    };
  },
);
