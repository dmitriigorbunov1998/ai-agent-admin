import { ArrowLeft, User } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export function UserDetailsPage() {
  const { userId } = useParams();

  return (
    <div className="space-y-6">
      <Link
        to="/users"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Users
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg border bg-muted">
          <User className="size-5" />
        </div>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            User #{userId}
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            User profile and account activity.
          </p>
        </div>
      </div>
    </div>
  );
}
