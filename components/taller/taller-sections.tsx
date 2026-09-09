"use client";

import {
  Children,
  Fragment,
  isValidElement,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Section = { heading: ReactNode; content: ReactNode[] };

function flatten(node: ReactNode): ReactNode[] {
  if (isValidElement(node) && node.type === Fragment) {
    return Children.toArray((node.props as { children?: ReactNode }).children);
  }
  return Children.toArray(node);
}

function groupByH2(children: ReactNode): { intro: ReactNode[]; sections: Section[] } {
  const intro: ReactNode[] = [];
  const sections: Section[] = [];

  for (const block of flatten(children)) {
    if (isValidElement(block) && block.type === "h2") {
      sections.push({ heading: block, content: [] });
    } else if (sections.length === 0) {
      intro.push(block);
    } else {
      sections[sections.length - 1].content.push(block);
    }
  }

  return { intro, sections };
}

export function TallerSections({ children }: { children: ReactNode }) {
  const { intro, sections } = groupByH2(children);
  const slides: ReactNode[][] = [
    ...(intro.length > 0 ? [intro] : []),
    ...sections.map((s) => [s.heading, ...s.content]),
  ];
  const [mode, setMode] = useState<"lectura" | "presentacion">("lectura");
  const [current, setCurrent] = useState(0);
  const goPrev = () => setCurrent((c) => Math.max(c - 1, 0));
  const goNext = () => setCurrent((c) => Math.min(c + 1, slides.length - 1));

  useEffect(() => {
    if (mode !== "presentacion") return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setCurrent((c) => Math.min(c + 1, slides.length - 1));
      if (e.key === "ArrowLeft") setCurrent((c) => Math.max(c - 1, 0));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mode, slides.length]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div className="flex gap-2">
          <Button
            variant={mode === "lectura" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("lectura")}
          >
            Lectura
          </Button>
          <Button
            variant={mode === "presentacion" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("presentacion")}
          >
            Presentación
          </Button>
        </div>
        {mode === "presentacion" && slides.length > 0 && (
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Button variant="ghost" size="sm" onClick={goPrev} disabled={current === 0}>
              ←
            </Button>
            <span>
              {current + 1} / {slides.length}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={goNext}
              disabled={current === slides.length - 1}
            >
              →
            </Button>
          </div>
        )}
      </div>

      <div
        className={cn(
          "space-y-4",
          mode === "presentacion" && "flex min-h-[60vh] flex-col justify-center",
        )}
      >
        {mode === "lectura" ? (
          <>
            {intro}
            {sections.map((s, i) => (
              <div key={i} className="space-y-4">
                {s.heading}
                {s.content}
              </div>
            ))}
          </>
        ) : (
          slides[current]
        )}
      </div>
    </div>
  );
}
