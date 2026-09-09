"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AVAILABLE_TALLERES, TALLER_COUNT } from "@/lib/talleres";

const TALLERES = Array.from({ length: TALLER_COUNT }, (_, i) => i + 1);
const AVAILABLE = new Set(AVAILABLE_TALLERES);

export function TallerSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <span className="px-2 py-1 text-xl font-bold">BuildWise</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Talleres</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {TALLERES.map((n) => {
                const href = `/taller/${n}`;
                const available = AVAILABLE.has(n);
                const label = `Taller ${n}`;
                return (
                  <SidebarMenuItem key={n}>
                    <SidebarMenuButton
                      isActive={pathname === href}
                      disabled={!available}
                      render={available ? <Link href={href}>{label}</Link> : undefined}
                    >
                      {!available && label}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
