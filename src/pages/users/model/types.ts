import type { PlanCode } from '@/entities/plan';

export type AdminUserListItem = {
  id: number;

  telegramId: string;
  username: string | null;

  plan: {
    code: PlanCode;
    name: string;
  };

  energy: number | null;

  createdAt: string | null;
};

export type AdminUsersResponse = {
  users: AdminUserListItem[];

  limit: number;
  offset: number;
  total: number;
};

export type GetAdminUsersParams = {
  limit: number;
  offset: number;
};
