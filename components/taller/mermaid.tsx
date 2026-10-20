"use client";

import { useEffect, useId, useRef } from "react";
import mermaid from "mermaid";

let initialized = false;

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "-");

  useEffect(() => {
    if (!initialized) {
      // ponytail: hex copiados de los tokens de :root (Mermaid no lee oklch ni var()); actualizar si cambia la paleta
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        themeVariables: {
          fontFamily: "var(--font-geist-sans), sans-serif",
          background: "#fcfdfd",
          primaryColor: "#e2f3ed",
          primaryTextColor: "#0d261e",
          primaryBorderColor: "#0c7c56",
          lineColor: "#0c7c56",
          textColor: "#0d261e",
        },
      });
      initialized = true;
    }
    let cancelled = false;
    mermaid.render(`mermaid-${id}`, chart).then(({ svg }) => {
      if (!cancelled && ref.current) ref.current.innerHTML = svg;
    });
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return <div ref={ref} className="my-6 flex justify-center" />;
}
