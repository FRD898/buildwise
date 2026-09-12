import { AVAILABLE_PLANTILLAS, PLANTILLAS } from "@/lib/plantillas";

export function generateStaticParams() {
  return AVAILABLE_PLANTILLAS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function PlantillaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Plantilla } = await PLANTILLAS[slug]();

  return (
    <main className="px-6 py-12">
      <Plantilla />
    </main>
  );
}
