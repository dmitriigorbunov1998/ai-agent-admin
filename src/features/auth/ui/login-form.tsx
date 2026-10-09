import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import {
  loginSchema,
  type LoginFormValues,
} from '@/features/auth/model/schemas';

type LoginFormProps = {
  isPending?: boolean;

  onSubmit: (values: LoginFormValues) => void;
};

export function LoginForm({ isPending = false, onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input
                {...field}
                id="email"
                type="email"
                autoComplete="username"
                autoFocus
                disabled={isPending}
                aria-invalid={fieldState.invalid}
                placeholder="admin@example.com"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>

              <div className="relative">
                <Input
                  {...field}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  disabled={isPending}
                  aria-invalid={fieldState.invalid}
                  className="pr-10"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          <LogIn className="size-4" />

          {isPending ? 'Singing in...' : 'Sign in'}
        </Button>
      </FieldGroup>
    </form>
  );
}
