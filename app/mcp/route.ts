import { readFileSync } from "node:fs";
import { join } from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { z } from "zod";
import { CATALOGO, TIPOS, archivoDe, buscar, idDe, type Elemento } from "@/lib/catalogo";

export const dynamic = "force-dynamic";

const INSTRUCCIONES =
  "Plantillas y criterios del curso Buildwise. Si una herramienta falla, díselo al alumno; no escribas de memoria una plantilla o unos criterios 'parecidos'.";

const SOLO_LECTURA = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };

const texto = (text: string) => ({ type: "text" as const, text });
const log = (o: object) => console.log(JSON.stringify({ conector: "buildwise", ...o }));

// Los .md llegan al despliegue por outputFileTracingIncludes (next.config.ts); el ignore evita que Turbopack trace todo el proyecto.
const leer = (e: Elemento) => readFileSync(join(/*turbopackIgnore: true*/ process.cwd(), archivoDe(e)), "utf8");

const listaTexto = () =>
  TIPOS
    .map((t) => `${t === "plantilla" ? "Plantillas" : "Criterios"}:\n` +
      CATALOGO.filter((e) => e.tipo === t).map((e) => `- ${idDe(e)}: ${e.descripcion}`).join("\n"))
    .join("\n\n");

const FALLO = "El conector falló y no pudo leer el contenido. Dile al alumno que falló; no escribas una plantilla o unos criterios de memoria.";

function crearServidor() {
  const server = new McpServer({ name: "buildwise", version: "1.0.0" }, { instructions: INSTRUCCIONES });

  server.registerTool(
    "buildwise_listar",
    {
      description:
        "Lista las plantillas y los criterios del curso Buildwise, con una línea que dice para qué sirve cada uno. " +
        "Plantilla: la estructura de ejemplo de un documento (product brief, PRD, ADR, diseño técnico). " +
        "Criterios: preguntas para revisar un documento o para decidir algo (ej.: qué probar antes de construir). " +
        "Llámala al empezar un documento, cuando el alumno pida algo 'del curso' o cuando el pedido no diga cuál.",
      annotations: SOLO_LECTURA,
    },
    async () => {
      log({ herramienta: "listar", error: false });
      return { content: [texto(listaTexto())] };
    },
  );

  server.registerTool(
    "buildwise_obtener",
    {
      description:
        "Entrega el texto completo y sin cambios de plantillas o criterios del curso Buildwise. " +
        "Para revisar un documento (ej.: 'revisar mi PRD') pide los criterios, no la plantilla. " +
        "Para empezar un documento pide su plantilla. Los identificadores salen de buildwise_listar " +
        "(forma exacta: plantilla/<nombre> o criterios/<nombre>). " +
        "Después de recibir el contenido, adáptalo al proyecto del alumno.",
      inputSchema: { ids: z.array(z.string()).describe("Identificadores copiados de buildwise_listar, p. ej. plantilla/prd") },
      annotations: SOLO_LECTURA,
    },
    async ({ ids }) => {
      if (ids.length === 0) {
        log({ herramienta: "obtener", pedidos: 0, inexistentes: 0, error: true });
        return { isError: true, content: [texto("Falta al menos un identificador. Puedes llamar a buildwise_listar para ver cuáles hay.")] };
      }
      const content: ReturnType<typeof texto>[] = [];
      let inexistentes = 0;
      const publicados: string[] = []; // solo ids del catálogo: los inexistentes son texto libre y no se registran
      try {
        for (const id of ids) {
          const e = buscar(id);
          if (!e) {
            inexistentes++;
            content.push(texto(
              `"${id}" no existe: el curso no lo tiene. No escribas uno propio. Esto es lo que sí existe:\n\n${listaTexto()}`,
            ));
            continue;
          }
          // Etiqueta y archivo en bloques separados: el archivo sale sin tocar.
          content.push(texto(id), texto(leer(e)));
          publicados.push(id);
        }
      } catch (err) {
        log({ herramienta: "obtener", ids: publicados, inexistentes, error: true, causa: String(err) });
        return { isError: true, content: [texto(FALLO)] };
      }
      log({ herramienta: "obtener", ids: publicados, inexistentes, error: inexistentes > 0 });
      return { isError: inexistentes > 0, content };
    },
  );

  return server;
}

// Sin estado: cada pedido crea su propio servidor y transporte.
async function manejar(req: Request) {
  const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  await crearServidor().connect(transport);
  return transport.handleRequest(req);
}

export { manejar as GET, manejar as POST, manejar as DELETE };
