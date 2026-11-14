"use client";

import { useRef, useState, type ComponentProps } from "react";
import { CheckIcon, CopyIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const iconos = { listo: CopyIcon, copiado: CheckIcon, error: XIcon };
const mensajes = { listo: "Copiar", copiado: "Copiado", error: "No se pudo copiar" };

// Patrón estándar: solo cambia el icono (copiar → check), el ancho no se mueve.
// Sin `etiqueta` es un botón solo icono con tooltip; con `etiqueta` el texto queda fijo.
export function Copiar({
  texto,
  etiqueta,
  ...props
}: { texto: string; etiqueta?: string } & ComponentProps<typeof Button>) {
  const [estado, setEstado] = useState<keyof typeof iconos>("listo");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const Icono = iconos[estado];

  async function copiar() {
    try {
      // Sin contexto seguro (http fuera de localhost) navigator.clipboard no existe.
      await navigator.clipboard.writeText(texto);
      setEstado("copiado");
    } catch {
      setEstado("error");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setEstado("listo"), 2000);
  }

  const anuncio = (
    <span aria-live="polite" className="sr-only">
      {estado === "listo" ? "" : mensajes[estado]}
    </span>
  );

  if (etiqueta) {
    // La ✓ basta para el éxito; el error sí necesita texto visible, en tooltip para no mover el ancho.
    return (
      <Tooltip open={estado === "error"}>
        <TooltipTrigger
          render={
            <Button size="sm" onClick={copiar} {...props}>
              <Icono data-icon="inline-start" aria-hidden />
              {etiqueta}
              {anuncio}
            </Button>
          }
        />
        <TooltipContent>{mensajes.error}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger
        closeOnClick={false}
        render={
          <Button size="icon-sm" variant="ghost" aria-label="Copiar" onClick={copiar} {...props}>
            <Icono aria-hidden />
            {anuncio}
          </Button>
        }
      />
      <TooltipContent>{mensajes[estado]}</TooltipContent>
    </Tooltip>
  );
}
