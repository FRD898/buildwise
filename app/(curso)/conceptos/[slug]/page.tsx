import { AVAILABLE_CONCEPTOS, CONCEPTOS } from "@/lib/conceptos";

export function generateStaticParams() {
  return AVAILABLE_CONCEPTOS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function ConceptoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Concepto } = await CONCEPTOS[slug]();

  return (
    <main className="px-6 py-12">
      <Concepto />
    </main>
  );
}
