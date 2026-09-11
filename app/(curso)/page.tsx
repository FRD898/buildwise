import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="flex max-w-2xl flex-col items-center gap-8 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          Buildwise
        </h1>
        <p className="text-xl leading-8 text-muted-foreground">
          El método detrás de{" "}
          <strong className="text-foreground">Product Builder con IA</strong>: del
          problema al producto en producción, con agentes de IA.
        </p>
        <p className="text-base leading-7 text-muted-foreground">
          Companion app de la ruta de Netzun. Método, criterios y plantillas
          versionadas en markdown público para que apliques el ciclo completo en
          tu propio proyecto.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/taller/1"
            className="inline-flex h-11 items-center justify-center rounded-md bg-foreground px-8 text-sm font-medium text-background hover:bg-foreground/90"
          >
            Empezar el taller 1
          </Link>
        </div>
      </div>
      <footer className="mt-24 flex gap-6 text-sm text-muted-foreground">
        <a
          href="https://github.com/freider/buildwise"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          Repo
        </a>
        <a
          href="https://netzun.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          Netzun
        </a>
      </footer>
    </div>
  );
}
