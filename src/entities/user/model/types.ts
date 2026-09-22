export type User = {
  id: number;

  telegramId: string;

  username: string | null;
  firstName: string | null;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
};
