"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import ModeToggle from "./mode-toggle";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Productos",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Categorías",
          url: "/admin/categories",
        },
        {
          title: "Marcas",
          url: "/admin/brands",
        },
        {
          title: "Productos",
          url: "/admin/products",
        },
      ],
    },
    {
      title: "Ordenes",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Ordenes",
          url: "#",
        },
      ],
    },
    {
      title: "Paginas",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Home",
          url: "#",
        },
        {
          title: "Sobre nosotros",
          url: "#",
        },
        {
          title: "Contactos",
          url: "#",
        },
        {
          title: "Envios",
          url: "#",
        },
      ],
    },
    {
      title: "Usuarios",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Usuarios",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <p>Sidebar</p>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="pl-3">
          <ModeToggle size="large" title="Cambiar tema" />
        </div>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
