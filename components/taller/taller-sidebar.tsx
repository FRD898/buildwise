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
import {
  AVAILABLE_TALLERES,
  TALLER_COUNT,
  TALLER_SHORT_LABELS,
} from "@/lib/talleres";
import { AVAILABLE_PLANTILLAS } from "@/lib/plantillas";
import { AVAILABLE_PROYECTO } from "@/lib/proyecto";
import { AVAILABLE_CRITERIOS } from "@/lib/criterios";

const TALLERES = Array.from({ length: TALLER_COUNT }, (_, i) => i + 1);
const AVAILABLE = new Set(AVAILABLE_TALLERES);

const PLANTILLA_LABELS: Record<string, string> = {
  "product-brief": "Product Brief",
  prd: "PRD",
  adr: "ADR",
};

const PROYECTO_LABELS: Record<string, string> = {
  brief: "Brief",
  backlog: "Backlog",
  "decision-producto": "Decisión de producto",
};

const CRITERIO_LABELS: Record<string, string> = {
  priorizacion: "Priorización",
};

export function TallerSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="px-2 py-1 text-xl font-bold">
          BuildWise
        </Link>
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
                const shortLabel = TALLER_SHORT_LABELS[n];
                const content = (
                  <>
                    <span>{label}</span>
                    <span className="truncate text-sidebar-foreground/70">
                      {shortLabel}
                    </span>
                  </>
                );
                return (
                  <SidebarMenuItem key={n}>
                    <SidebarMenuButton
                      isActive={pathname === href}
                      disabled={!available}
                      render={
                        available ? <Link href={href}>{content}</Link> : undefined
                      }
                    >
                      {!available && content}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Proyecto</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {AVAILABLE_PROYECTO.map((slug) => {
                const href = `/proyecto/${slug}`;
                return (
                  <SidebarMenuItem key={slug}>
                    <SidebarMenuButton
                      isActive={pathname === href}
                      render={<Link href={href}>{PROYECTO_LABELS[slug] ?? slug}</Link>}
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Criterios</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {AVAILABLE_CRITERIOS.map((slug) => {
                const href = `/criterios/${slug}`;
                return (
                  <SidebarMenuItem key={slug}>
                    <SidebarMenuButton
                      isActive={pathname === href}
                      render={<Link href={href}>{CRITERIO_LABELS[slug] ?? slug}</Link>}
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Plantillas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {AVAILABLE_PLANTILLAS.map((slug) => {
                const href = `/plantillas/${slug}`;
                return (
                  <SidebarMenuItem key={slug}>
                    <SidebarMenuButton
                      isActive={pathname === href}
                      render={<Link href={href}>{PLANTILLA_LABELS[slug] ?? slug}</Link>}
                    />
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
