// Pruebas del conector por MCP (HTTP, sin sesión), como lo llamaría un agente.
// CONECTOR_URL apunta a un conector ya levantado; si no, se levanta `next dev`.
import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import { spawn, type ChildProcess } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";

const PORT = 3917;
const URL_CONECTOR = process.env.CONECTOR_URL ?? `http://localhost:${PORT}/mcp`;

const publicados = (dir: string) =>
  readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3));
const PLANTILLAS = publicados("templates");
const CRITERIOS = publicados("criterios");

let server: ChildProcess | undefined;

before(async () => {
  if (process.env.CONECTOR_URL) return;
  server = spawn("pnpm", ["exec", "next", "dev", "-p", String(PORT)], { stdio: "ignore" });
  for (let i = 0; i < 120; i++) {
    try {
      await fetch(`http://localhost:${PORT}/`);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error("next dev no levantó");
});

after(() => {
  server?.kill();
});

type Resultado = { isError?: boolean; content: { type: string; text: string }[] };

async function rpc(method: string, params: object, id: number) {
  const res = await fetch(URL_CONECTOR, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json, text/event-stream" },
    body: JSON.stringify({ jsonrpc: "2.0", id, method, params }),
  });
  const cuerpo = await res.text();
  assert.equal(res.status, 200, `${method}: HTTP ${res.status}`);
  const json = res.headers.get("content-type")?.includes("text/event-stream")
    ? cuerpo.split("\n").find((l) => l.startsWith("data:"))!.slice(5)
    : cuerpo;
  const msg = JSON.parse(json);
  assert.ok(!msg.error, `${method}: ${JSON.stringify(msg.error)}`);
  return msg.result;
}

async function llamar(tool: string, args: object = {}) {
  await rpc(
    "initialize",
    { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "test", version: "0" } },
    1,
  );
  const r = (await rpc("tools/call", { name: tool, arguments: args }, 2)) as Resultado;
  return { isError: r.isError === true, texto: r.content.map((c) => c.text).join("") };
}

const archivo = (ruta: string) => readFileSync(ruta, "utf8");

describe("conector", () => {
  test("CONECTOR-1: la plantilla de PRD es idéntica a templates/prd.md", async () => {
    const r = await llamar("obtener_plantilla", { nombre: "prd" });
    assert.equal(r.isError, false);
    assert.equal(r.texto, archivo("templates/prd.md"));
  });

  test("CONECTOR-2: cada plantilla publicada es idéntica a su archivo", async () => {
    for (const n of PLANTILLAS) {
      const r = await llamar("obtener_plantilla", { nombre: n });
      assert.equal(r.texto, archivo(`templates/${n}.md`), n);
    }
  });

  test("CONECTOR-3: cada criterio publicado es idéntico a su archivo", async () => {
    for (const n of CRITERIOS) {
      const r = await llamar("obtener_criterios", { nombre: n });
      assert.equal(r.texto, archivo(`criterios/${n}.md`), n);
    }
  });

  test("CONECTOR-4: la lista trae exactamente lo publicado", async () => {
    const { texto } = await llamar("listar_plantillas_y_criterios");
    const todos = [...PLANTILLAS, ...CRITERIOS];
    for (const n of todos) assert.ok(texto.includes(n), `falta ${n}`);
    // supone un elemento por línea con viñeta ("- nombre: descripción")
    const elementos = texto.split("\n").filter((l) => /^\s*[-*]\s/.test(l));
    assert.equal(elementos.length, todos.length, "elementos de más o de menos");
  });

  test("CONECTOR-13: una plantilla o criterios no publicados responden que no existen", async () => {
    for (const [tool, nombre] of [
      ["obtener_plantilla", "casos-de-uso"],
      ["obtener_criterios", "casos-de-uso"],
    ]) {
      const r = await llamar(tool, { nombre });
      assert.equal(r.isError, true, tool);
      assert.match(r.texto, /no existe/i, tool);
    }
  });

  test("CONECTOR-14: lo no publicado trae la lista de lo que sí existe", async () => {
    for (const tool of ["obtener_plantilla", "obtener_criterios"]) {
      const r = await llamar(tool, { nombre: "casos-de-uso" });
      for (const n of [...PLANTILLAS, ...CRITERIOS]) assert.ok(r.texto.includes(n), `${tool}: falta ${n}`);
    }
  });

  test('un nombre con "../" responde que no existe', async () => {
    for (const tool of ["obtener_plantilla", "obtener_criterios"]) {
      const r = await llamar(tool, { nombre: "../templates/prd" });
      assert.equal(r.isError, true, tool);
      assert.match(r.texto, /no existe/i, tool);
      assert.ok(!r.texto.includes(archivo("templates/prd.md")), `${tool}: filtró el archivo`);
    }
  });
});
