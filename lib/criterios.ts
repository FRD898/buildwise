import type { ComponentType } from "react";

export const CRITERIOS: Record<string, () => Promise<{ default: ComponentType }>> = {
  priorizacion: () => import("@/criterios/priorizacion.md"),
  "que-probar": () => import("@/criterios/que-probar.md"),
  "revisar-especificacion": () => import("@/criterios/revisar-especificacion.md"),
};

export const AVAILABLE_CRITERIOS = Object.keys(CRITERIOS);
