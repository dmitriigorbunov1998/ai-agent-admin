import { Outlet } from 'react-router-dom';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar.tsx';
import { AppSidebar } from '@/widgets/app-sidebar';

import { useQuery } from '@tanstack/react-query';

import { AdminSessionControls, authQueryKeys, getMe } from '@/features/auth';

export function AdminLayout() {
  const meQuery = useQuery({
    queryKey: authQueryKeys.me(),

    queryFn: getMe,

    retry: false,
  });

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />

            {/*<Separator orientation="vertical" className="mr-2 h-4" />*/}

            <div className="flex flex-col">
              <span className="text-sm font-medium">Clio Admin</span>

              <span className="text-xs text-muted-foreground">
                Administration Console
              </span>
            </div>
          </div>

          {meQuery.data?.user && (
            <AdminSessionControls user={meQuery.data.user} />
          )}
        </header>

        <main className="flex flex-1 flex-col">
          <div className="flex-1 p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
