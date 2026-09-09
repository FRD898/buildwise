import { AVAILABLE_TALLERES } from "@/lib/talleres";

export function generateStaticParams() {
  return AVAILABLE_TALLERES.map((n) => ({ slug: String(n) }));
}

export const dynamicParams = false;

export default async function TallerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Taller } = await import(`@/docs/curso/taller-${slug}.mdx`);

  return (
    <main className="px-6 py-12">
      <Taller />
    </main>
  );
}
