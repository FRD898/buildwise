import type { ComponentType } from "react";

export const CRITERIOS: Record<string, () => Promise<{ default: ComponentType }>> = {
  "que-probar": () => import("@/criterios/que-probar.md"),
  "revisar-prd": () => import("@/criterios/revisar-prd.md"),
  "revisar-diseno": () => import("@/criterios/revisar-diseno.md"),
};

export const AVAILABLE_CRITERIOS = Object.keys(CRITERIOS);
