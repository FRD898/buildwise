import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

// Dirección del conector; el diseño aún no fija la ruta final.
const URL_CONECTOR = process.env.CONECTOR_URL ?? "http://localhost:3000/mcp";

const publicados = [
  ...readdirSync("templates").map((f) => `plantilla/${f.replace(/\.md$/, "")}`),
  ...readdirSync("criterios").map((f) => `criterios/${f.replace(/\.md$/, "")}`),
];
const archivo = (id: string) => {
  const [tipo, nombre] = id.split("/");
  return readFileSync(`${tipo === "plantilla" ? "templates" : "criterios"}/${nombre}.md`, "utf8");
};

let client: Client;
before(async () => {
  client = new Client({ name: "agente-de-prueba", version: "0" });
  await client.connect(new StreamableHTTPClientTransport(new URL(URL_CONECTOR)));
});
after(() => client?.close());

async function llamar(name: string, args: Record<string, unknown> = {}) {
  const r = await client.callTool({ name, arguments: args });
  const textos = (r.content as { type: string; text: string }[]).map((b) => b.text);
  return { isError: !!r.isError, textos, todo: textos.join("\n") };
}
const obtener = (...ids: string[]) => llamar("buildwise_obtener", { ids });

test("CONECTOR-1: la plantilla de PRD es idéntica a templates/prd.md", async () => {
  const r = await obtener("plantilla/prd");
  assert.ok(r.textos.includes(readFileSync("templates/prd.md", "utf8")));
});

test("CONECTOR-2: cada plantilla publicada es idéntica a su archivo", async () => {
  for (const id of publicados.filter((i) => i.startsWith("plantilla/"))) {
    assert.ok((await obtener(id)).textos.includes(archivo(id)), id);
  }
});

test("CONECTOR-3: cada criterios publicado es idéntico a su archivo", async () => {
  for (const id of publicados.filter((i) => i.startsWith("criterios/"))) {
    assert.ok((await obtener(id)).textos.includes(archivo(id)), id);
  }
});

test("CONECTOR-4: la lista tiene exactamente lo publicado", async () => {
  const { todo } = await llamar("buildwise_listar");
  const ids = new Set(todo.match(/(?:plantilla|criterios)\/[a-z0-9-]+/g));
  assert.deepEqual([...ids].sort(), [...publicados].sort());
});

test("CONECTOR-13: lo no publicado responde que no existe", async () => {
  for (const id of ["plantilla/casos-de-uso", "criterios/revisar-adr"]) {
    const r = await obtener(id);
    assert.ok(r.isError, id);
    assert.match(r.todo, /no existe/i, id);
  }
});

test("CONECTOR-14: lo no publicado incluye la lista de lo que sí existe", async () => {
  const r = await obtener("plantilla/casos-de-uso");
  for (const id of publicados) assert.ok(r.todo.includes(id), id);
});

test('un nombre con "../" recibe "no existe"', async () => {
  const r = await obtener("plantilla/../package.json");
  assert.ok(r.isError);
  assert.match(r.todo, /no existe/i);
  assert.ok(!r.todo.includes('"name": "buildwise"'), "no debe filtrar archivos fuera de la lista");
});
