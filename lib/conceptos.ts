import type { ComponentType } from "react";

export const CONCEPTOS: Record<string, () => Promise<{ default: ComponentType }>> = {
  "product-brief": () => import("@/docs/product-brief.md"),
};

export const AVAILABLE_CONCEPTOS = Object.keys(CONCEPTOS);
