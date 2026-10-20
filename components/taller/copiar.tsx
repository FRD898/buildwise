"use client";

import { useState, type ComponentProps } from "react";
import { Button } from "@/components/ui/button";

export function Copiar({
  texto,
  etiqueta = "Copiar",
  ...props
}: { texto: string; etiqueta?: string } & ComponentProps<typeof Button>) {
  const [estado, setEstado] = useState<"listo" | "copiado" | "error">("listo");

  async function copiar() {
    try {
      // Sin contexto seguro (http fuera de localhost) navigator.clipboard no existe.
      await navigator.clipboard.writeText(texto);
      setEstado("copiado");
    } catch {
      setEstado("error");
    }
    setTimeout(() => setEstado("listo"), 2000);
  }

  return (
    <Button size="sm" onClick={copiar} {...props}>
      {estado === "copiado" ? "Copiado" : estado === "error" ? "No se pudo copiar" : etiqueta}
    </Button>
  );
}
