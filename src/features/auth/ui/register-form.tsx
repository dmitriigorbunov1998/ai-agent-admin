import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { registerSchema, type RegisterFormValues } from '../model/schemas';

type RegisterFormProps = {
  isPending?: boolean;

  onSubmit: (values: RegisterFormValues) => void;
};

export function RegisterForm({
  isPending = false,
  onSubmit,
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      login: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="login"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-login">Login</FieldLabel>

              <Input
                {...field}
                id="register-login"
                autoFocus
                autoComplete="username"
                disabled={isPending}
                aria-invalid={fieldState.invalid}
                placeholder="admin"
              />

              <FieldDescription>
                This will be your administrator login.
              </FieldDescription>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-password">Password</FieldLabel>

              <div className="relative">
                <Input
                  {...field}
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  disabled={isPending}
                  aria-invalid={fieldState.invalid}
                  className="pr-10"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
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

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirm-password">
                Confirm password
              </FieldLabel>

              <Input
                {...field}
                id="confirm-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                disabled={isPending}
                aria-invalid={fieldState.invalid}
                placeholder="••••••••"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          <UserPlus className="size-4" />

          {isPending ? 'Creating administrator...' : 'Create administrator'}
        </Button>
      </FieldGroup>
    </form>
  );
}
