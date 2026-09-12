import { AVAILABLE_PROYECTO, PROYECTO } from "@/lib/proyecto";

export function generateStaticParams() {
  return AVAILABLE_PROYECTO.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function ProyectoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: ProyectoDoc } = await PROYECTO[slug]();

  return (
    <main className="px-6 py-12">
      <ProyectoDoc />
    </main>
  );
}
