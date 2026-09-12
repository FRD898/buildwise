import type { ComponentType } from "react";

export const CRITERIOS: Record<string, () => Promise<{ default: ComponentType }>> = {
  priorizacion: () => import("@/criterios/priorizacion.md"),
};

export const AVAILABLE_CRITERIOS = Object.keys(CRITERIOS);
