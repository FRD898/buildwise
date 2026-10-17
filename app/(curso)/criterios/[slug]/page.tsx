import { nombres } from "@/lib/catalogo";

export function generateStaticParams() {
  return nombres("criterios").map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function CriterioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Criterio } = await import(`@/criterios/${slug}.md`);

  return (
    <main className="px-6 py-12">
      <Criterio />
    </main>
  );
}
