import type { PlanCode } from '@/entities/plan';

export type AdminUserListItem = {
  id: number;

  telegramId: string;

  username: string | null;
  firstName: string | null;

  isActive: boolean;

  createdAt: string;
  subscription: {
    planCode: PlanCode;
    planName: string;
  } | null;

  energy: {
    balance: number;
    monthlyLimit: number;
  } | null;
};

export type AdminUsersResponse = {
  items: AdminUserListItem[];

  pagination: {
    page: number;
    pageSize: number;

    total: number;
    totalPages: number;
  };
};

export type GetAdminUsersParams = {
  page: number;
  pageSize: number;
  search?: string;
};
