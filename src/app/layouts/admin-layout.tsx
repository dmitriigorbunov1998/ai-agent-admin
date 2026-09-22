import { Outlet } from 'react-router-dom';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar.tsx';
import { Separator } from '@/components/ui/separator';
import { AppSidebar } from '@/widgets/app-sidebar';

export function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator orientation="vertical" className="mr-2 h-4" />

          <div className="flex flex-col">
            <span className="text-sm font-medium">Clio Admin</span>

            <span className="text-xs text-muted-foreground">
              Administration Console
            </span>
          </div>
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
