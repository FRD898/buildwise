import type { ComponentType } from "react";

export const PROYECTO: Record<string, () => Promise<{ default: ComponentType }>> = {
  brief: () => import("@/docs/product-brief.md"),
  backlog: () => import("@/docs/proyecto/backlog.md"),
  "decision-producto": () => import("@/docs/proyecto/decision-producto.md"),
};

export const AVAILABLE_PROYECTO = Object.keys(PROYECTO);
