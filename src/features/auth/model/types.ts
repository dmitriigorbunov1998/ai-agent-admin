export type AdminIdentity = {
  id: number;
  login: string;
};

export type AuthStatus = {
  setupRequired: boolean;
  authenticated: boolean;
  admin: AdminIdentity | null;
};

export type LoginPayload = {
  login: string;
  password: string;
};

export type RegisterPayload = {
  login: string;
  password: string;
};

export type AuthResponse = {
  admin: AdminIdentity;
};
