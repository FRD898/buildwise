import type { ComponentType } from "react";
import { nombresDe } from "@/lib/indice";

export const CRITERIOS: Record<string, () => Promise<{ default: ComponentType }>> = {
  "que-probar": () => import("@/criterios/que-probar.md"),
  "revisar-prd": () => import("@/criterios/revisar-prd.md"),
  "revisar-diseno": () => import("@/criterios/revisar-diseno.md"),
};

export const AVAILABLE_CRITERIOS = nombresDe("criterios");
