import { nombres } from "@/lib/catalogo";

export function generateStaticParams() {
  return nombres("plantilla").map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function PlantillaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Plantilla } = await import(`@/templates/${slug}.md`);

  return (
    <main className="px-6 py-12">
      <Plantilla />
    </main>
  );
}
