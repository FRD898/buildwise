import { readFile } from "node:fs/promises";
import path from "node:path";
import { INDICE, type Tipo } from "./indice";

const CARPETA: Record<Tipo, string> = { plantilla: "templates", criterios: "criterios" };

type Respuesta = { text: string; isError: boolean; nombre?: string }; // nombre: solo si está en el índice

const linea = (e: (typeof INDICE)[number]) =>
  `- ${e.nombre}: ${e.descripcion}${e.otros.length ? ` (también: ${e.otros.join(", ")})` : ""}`;

export function lista() {
  const de = (t: Tipo) => INDICE.filter((e) => e.tipo === t).map(linea).join("\n");
  return `Plantillas:\n${de("plantilla")}\n\nCriterios:\n${de("criterios")}`;
}

export const instrucciones = () =>
  `Conector del curso Buildwise (solo lectura). Úsalo cuando el alumno pida una plantilla o unos criterios, o pregunte con qué documento empezar o cómo revisar uno. ` +
  `Muestra el contenido tal cual, sin resumirlo. Si el curso no tiene lo pedido, dilo; no escribas uno propio. Si el conector falla, díselo al alumno. ` +
  `Esta lista se arma al conectarse y puede estar vieja en una sesión larga: la fuente actual es listar_plantillas_y_criterios.\n\n${lista()}`;

export async function obtener(tipo: Tipo, nombre: unknown): Promise<Respuesta> {
  const pedido = typeof nombre === "string" ? nombre.trim().toLowerCase() : "";
  const otro: Tipo = tipo === "plantilla" ? "criterios" : "plantilla";
  const entrada = INDICE.find((e) => e.tipo === tipo && e.nombre === pedido);
  const error = (msg: string) => ({ isError: true, text: `${msg}\n\n${lista()}` });
  const herramienta = (t: Tipo) => (t === "plantilla" ? "obtener_plantilla" : "obtener_criterios");

  if (!pedido) return error("Falta el nombre. Elige uno de la lista; no elijas por el alumno.");
  if (!entrada) {
    // el nombre solo se compara con el índice, nunca arma una ruta
    const hay = INDICE.some((e) => e.tipo === otro && e.nombre === pedido);
    return error(
      `No existe ${tipo} "${pedido.slice(0, 80)}" en el curso. No escribas una propia.` +
        (hay ? ` Existe como ${otro}: usa ${herramienta(otro)}.` : ""),
    );
  }
  try {
    const text = await readFile(path.join(process.cwd(), CARPETA[tipo], `${entrada.nombre}.md`), "utf8");
    return { isError: false, text, nombre: entrada.nombre };
  } catch {
    return { isError: true, text: `El contenido de "${entrada.nombre}" no está disponible. Díselo al alumno; no escribas uno propio.` };
  }
}
