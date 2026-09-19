import {Bot} from 'lucide-react';
import {NavLink} from 'react-router-dom';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import {navigation} from '@/shared/config/navigation';

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="border-b">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            tooltip="Clio Admin"
                            className="cursor-default"
                        >
                            <div
                                className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <Bot className="size-4"/>
                            </div>

                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    Clio
                                </span>

                                <span className="truncate text-xs text-muted-foreground">
                                    Admin Console
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Management
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigation.map((item) => {
                                const Icon = item.icon

                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <NavLink to={item.href}>
                                            {({isActive}) => (
                                                <SidebarMenuButton
                                                    isActive={isActive}
                                                    tooltip={item.label}
                                                >
                                                    <Icon/>
                                                    <span>{item.label}</span>
                                                </SidebarMenuButton>
                                            )}
                                        </NavLink>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t">
                <div className="px-2 py-1 group-data-[collapsible=icon]:hidden">
                    <p className="text-xs text-muted-foreground">
                        Clio AI
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground/60">
                        Private administration
                    </p>
                </div>
            </SidebarFooter>

            <SidebarRail/>
        </Sidebar>
    )
}