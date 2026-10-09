export type AdminUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: string | null;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: AdminUser;
};
