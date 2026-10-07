import { z } from 'zod';

export const loginSchema = z.object({
  login: z
    .string()
    .trim()
    .min(3, 'Login must contain at least 3 characters.')
    .max(64, 'Login is too long.'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(128, 'Password is too long.'),
});

export const registerSchema = z
  .object({
    login: z
      .string()
      .trim()
      .min(3, 'Login must contain at least 3 characters.')
      .max(64, 'Login is too long.'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .max(128, 'Password is too long.'),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;

export type RegisterFormValues = z.infer<typeof registerSchema>;
