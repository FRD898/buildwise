import { AVAILABLE_CRITERIOS, CRITERIOS } from "@/lib/criterios";

export function generateStaticParams() {
  return AVAILABLE_CRITERIOS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function CriterioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Criterio } = await CRITERIOS[slug]();

  return (
    <main className="px-6 py-12">
      <Criterio />
    </main>
  );
}
