"use client"

import * as React from "react"
import {
  Bot, LucideProps,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useUser } from "@/providers/UserProvider";
import { User } from "@/interfaces/user";
import {ForwardRefExoticComponent, RefAttributes} from "react";

// This is sample data.
const data :
    {
      user: User | null,
      navMain: {
        title: string,
        url: string,
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
        items: { title: string, url: string}[]
      }[]
    }
    = {
  user : null,
  navMain: [
    {
      title: "Settings",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "All settings",
          url: "/dashboard",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in</p>;

  data.user = user;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/*add custom header logo*/}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
