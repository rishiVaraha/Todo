"use client";

import * as React from "react";
import { UserRound, ListTodo, CalendarDays } from "lucide-react";

import { NavMain } from "@/components/sideMenu/nav-main";
import { NavUser } from "@/components/sideMenu/nav-user";
import { TeamSwitcher } from "@/components/sideMenu/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/userContext";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Member",
      url: "/dashboard/member",
      icon: UserRound,
      isActive: true,
    },
    { title: "Todo", url: "/dashboard/todos", icon: ListTodo, isActive: true },
    {
      title: "Calendar",
      url: "/dashboard/calendar",
      icon: CalendarDays,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  // console.log(user);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
