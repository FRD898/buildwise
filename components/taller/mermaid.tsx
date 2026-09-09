"use client";

import { useEffect, useId, useRef } from "react";
import mermaid from "mermaid";

let initialized = false;

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "-");

  useEffect(() => {
    if (!initialized) {
      mermaid.initialize({ startOnLoad: false });
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
