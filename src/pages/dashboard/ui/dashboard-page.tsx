import {Badge} from '@/components/ui/badge.tsx';
import {DashboardStats} from '@/widgets/dashboard-stats';

export function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-semibold tracking-light">
                        Dashboard
                    </h1>

                    <Badge variant="secondary">
                        Live
                    </Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                    Overview of users, subscriptions and Clio activity.
                </p>
            </div>

            <DashboardStats />
        </div>
    )
}