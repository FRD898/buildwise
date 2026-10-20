import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";
import { archivoDe, nombres } from "@/lib/catalogo";
import { Copiar } from "@/components/taller/copiar";

export function generateStaticParams() {
  return nombres("plantilla").map((slug) => ({ slug }));
}

export const dynamicParams = false;

// Una plantilla se lee o se copia, no se presenta: sin el selector Lectura/Presentación de los talleres.
function Wrapper({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}

export default async function PlantillaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Plantilla } = await import(`@/templates/${slug}.md`);
  const markdown = await readFile(path.join(process.cwd(), archivoDe({ tipo: "plantilla", nombre: slug })), "utf8");

  return (
    <main className="px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <Copiar texto={markdown} etiqueta="Copiar markdown" />
          <a
            href={`https://github.com/FRD898/buildwise/blob/main/templates/${slug}.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline underline-offset-2 hover:text-primary/80"
          >
            Ver en GitHub
          </a>
        </div>
        <Plantilla components={{ wrapper: Wrapper }} />
      </div>
    </main>
  );
}
