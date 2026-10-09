import type { AdminUser } from '@/features/auth';

export type { AdminUser } from '@/features/auth';

export const authMockState = {
  authenticated: false,

  user: null as AdminUser | null,
};

export const mockAdminUser: AdminUser = {
  id: 'admin-1',

  name: 'Clio Administrator',

  email: 'admin@example.com',

  emailVerified: true,

  image: null,

  role: 'admin',
};
