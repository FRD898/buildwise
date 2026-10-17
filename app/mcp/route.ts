import type { Tipo } from "@/lib/indice";
import { instrucciones, lista, obtener } from "@/lib/conector";

// MCP por HTTP, sin sesiones ni estado: cada POST es un mensaje JSON-RPC.
const nombre = { type: "string", description: "Nombre tal como lo muestra la lista." };
const soloLectura = { readOnlyHint: true, openWorldHint: false };

const TOOLS = [
  {
    name: "listar_plantillas_y_criterios",
    description:
      "Lista las plantillas y los criterios del curso, con su descripción. Úsala si el alumno pide 'la plantilla' sin decir cuál, pregunta qué hay, o para ver la lista actual.",
    inputSchema: { type: "object", properties: {} },
    annotations: soloLectura,
  },
  {
    name: "obtener_plantilla",
    description:
      "Devuelve una plantilla del curso (la estructura para escribir un documento: brief, PRD, ADR...) idéntica a la publicada. Muéstrala tal cual, sin resumir. No sirve para revisar un documento: para eso usa obtener_criterios. Si no existe, no escribas una propia.",
    inputSchema: { type: "object", properties: { nombre }, required: ["nombre"] },
    annotations: soloLectura,
  },
  {
    name: "obtener_criterios",
    description:
      "Devuelve unos criterios del curso (las preguntas para revisar un documento o decidir algo, ej.: cómo revisar un PRD) idénticos a los publicados. Muéstralos tal cual. No son la plantilla: para escribir un documento usa obtener_plantilla. Si no existen, no entregues la plantilla en su lugar.",
    inputSchema: { type: "object", properties: { nombre }, required: ["nombre"] },
    annotations: soloLectura,
  },
];

async function llamar(name: string, args: { nombre?: unknown }) {
  const tipo: Tipo | undefined =
    name === "obtener_plantilla" ? "plantilla" : name === "obtener_criterios" ? "criterios" : undefined;
  const r = tipo ? await obtener(tipo, args.nombre) : { isError: false, text: lista() };
  // el nombre libre solo se registra si coincide con el índice
  console.log(JSON.stringify({ mcp: name, ok: !r.isError, nombre: tipo ? (r.nombre ?? "no existente") : undefined }));
  return { isError: r.isError, content: [{ type: "text", text: r.text }] };
}

const json = (body: unknown, status = 200) => Response.json(body, { status });
const rpcError = (id: unknown, code: number, message: string) =>
  json({ jsonrpc: "2.0", id, error: { code, message } });

export async function POST(request: Request) {
  // un navegador no es cliente esperado; los agentes no mandan Origin
  if (request.headers.get("origin")) return new Response("Forbidden", { status: 403 });
  let msg;
  try {
    msg = await request.json();
  } catch {
    return rpcError(null, -32700, "JSON inválido");
  }
  const { id, method, params } = msg ?? {};
  if (id === undefined) return new Response(null, { status: 202 }); // notificación

  switch (method) {
    case "initialize":
      return json({
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: params?.protocolVersion ?? "2025-06-18",
          capabilities: { tools: {} },
          serverInfo: { name: "buildwise", version: "1.0.0" },
          instructions: instrucciones(),
        },
      });
    case "ping":
      return json({ jsonrpc: "2.0", id, result: {} });
    case "tools/list":
      return json({ jsonrpc: "2.0", id, result: { tools: TOOLS } });
    case "tools/call":
      if (!TOOLS.some((t) => t.name === params?.name)) return rpcError(id, -32602, "Herramienta desconocida");
      return json({ jsonrpc: "2.0", id, result: await llamar(params.name, params.arguments ?? {}) });
    default:
      return rpcError(id, -32601, "Método no soportado");
  }
}

export const GET = () => new Response("Method Not Allowed", { status: 405 });
