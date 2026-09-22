import type { AdminUserListItem } from '@/pages/users/model/types';

const names = [
  'Alex',
  'Maria',
  'Dmitrii',
  'Anna',
  'Nikita',
  'Elena',
  'Maxim',
  'Sofia',
  'Ivan',
  'Victoria',
];

export const usersMock: AdminUserListItem[] = Array.from(
  { length: 37 },
  (_, index) => {
    const id = index + 1;

    const plan =
      index % 10 === 0
        ? {
            planCode: 'pro' as const,
            planName: 'Pro',
          }
        : index % 4 === 0
          ? {
              planCode: 'lite' as const,
              planName: 'Lite',
            }
          : {
              planCode: 'freemium' as const,
              planName: 'Freemium',
            };

    return {
      id,

      telegramId: String(700_000_000 + id),

      username: `clio_user_${id}`,

      firstName: names[index % names.length],

      isActive: index % 13 !== 0,

      createdAt: new Date(Date.UTC(2026, 7, 10 + index)).toISOString(),

      subscription: plan,

      energy: {
        balance:
          plan.planCode === 'pro'
            ? 78 - (index % 20)
            : plan.planCode === 'lite'
              ? 31 - (index % 12)
              : Math.max(0, 5 - (index % 6)),

        monthlyLimit: 100,
      },
    };
  },
);
