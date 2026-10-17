import { readdirSync } from "node:fs";
import { CATALOGO, TIPOS, archivoDe, carpeta, type Entrada } from "./catalogo.ts";

// Falla el build si el catálogo y las carpetas no coinciden, o si falta una descripción.
// Los parámetros existen para probarla con un catálogo y una raíz distintos de los reales.
export function verificarCatalogo(catalogo: readonly Entrada[] = CATALOGO, raiz = ".") {
  const enCatalogo = catalogo.map(archivoDe);
  const enDisco = TIPOS.flatMap((t) =>
    readdirSync(`${raiz}/${carpeta(t)}`).filter((f) => f.endsWith(".md")).map((f) => `${carpeta(t)}/${f}`),
  );
  const sobran = enDisco.filter((f) => !enCatalogo.includes(f));
  const faltan = enCatalogo.filter((f) => !enDisco.includes(f));
  const sinDescripcion = catalogo.filter((e) => !e.descripcion.trim()).map(archivoDe);
  if (sobran.length || faltan.length || sinDescripcion.length) {
    throw new Error(
      `Catálogo desalineado. Sin entrada: ${sobran}. Sin archivo: ${faltan}. Sin descripción: ${sinDescripcion}.`,
    );
  }
}
