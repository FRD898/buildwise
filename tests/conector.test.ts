import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chmodSync, readdirSync, readFileSync, statSync } from "node:fs";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

// Requiere `pnpm dev` levantado (recarga el código al guardar); CONECTOR_URL apunta a otro servidor.
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
  try {
    await client.connect(new StreamableHTTPClientTransport(new URL(URL_CONECTOR)));
  } catch (err) {
    throw new Error(`No hay conector en ${URL_CONECTOR}: levanta pnpm dev. (${err})`);
  }
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
  const ids = [
    "plantilla/../package.json",
    "criterios/../package.json",
    "../package.json",
    "plantilla/prd/../../package.json",
    "/etc/passwd",
  ];
  for (const id of ids) {
    const r = await obtener(id);
    assert.ok(r.isError, id);
    assert.match(r.todo, /no existe/i, id);
    assert.ok(!r.todo.includes('"name": "buildwise"'), `${id}: no debe filtrar archivos fuera de la lista`);
  }
});

test("CONECTOR-12: cada elemento de la lista trae su descripción", async () => {
  const { todo } = await llamar("buildwise_listar");
  for (const id of publicados) {
    const linea = todo.split("\n").find((l) => l.includes(id));
    assert.ok(linea && linea.split(id)[1].replace(/^\W+/, "").length > 10, id);
  }
});

test("CONECTOR-15: criterios de un documento sin criterios no entregan su plantilla", async () => {
  const r = await obtener("criterios/adr");
  assert.ok(r.isError);
  assert.match(r.todo, /no existe/i);
  assert.ok(!r.textos.includes(archivo("plantilla/adr")));
});

test("CONECTOR-17: responde sin login ni credenciales", async () => {
  const res = await fetch(URL_CONECTOR, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json, text/event-stream" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
  });
  assert.equal(res.status, 200);
});

test("CONECTOR-18: solo ofrece las dos herramientas, ambas de solo lectura", async () => {
  const { tools } = await client.listTools();
  assert.deepEqual(tools.map((t) => t.name).sort(), ["buildwise_listar", "buildwise_obtener"]);
  for (const t of tools) {
    assert.equal(t.annotations?.readOnlyHint, true, t.name);
    assert.equal(t.annotations?.destructiveHint, false, t.name);
  }
});

test("pedido mixto: entrega completo lo que existe y avisa de lo que no", async () => {
  const r = await obtener("plantilla/prd", "plantilla/casos-de-uso");
  assert.ok(r.isError);
  assert.ok(r.textos.includes(archivo("plantilla/prd")));
  assert.match(r.todo, /casos-de-uso.*no existe/i);
  for (const id of publicados) assert.ok(r.todo.includes(id), id);
});

test("lista vacía: error que apunta a buildwise_listar", async () => {
  const r = await obtener();
  assert.ok(r.isError);
  assert.match(r.todo, /buildwise_listar/);
});

test("etiqueta aparte: primero el identificador, después el archivo exacto", async () => {
  const r = await obtener("plantilla/prd", "criterios/revisar-prd");
  assert.deepEqual(r.textos, [
    "plantilla/prd",
    archivo("plantilla/prd"),
    "criterios/revisar-prd",
    archivo("criterios/revisar-prd"),
  ]);
});

// Quita el permiso de lectura al segundo archivo; como root el permiso no se aplica, así que se salta.
test("fallo de lectura: devuelve solo el aviso, sin contenido parcial", { skip: process.getuid?.() === 0 }, async () => {
  const segundo = "templates/adr.md";
  const modo = statSync(segundo).mode;
  chmodSync(segundo, 0o000);
  try {
    const r = await obtener("plantilla/prd", "plantilla/adr");
    assert.ok(r.isError);
    assert.equal(r.textos.length, 1);
    assert.match(r.todo, /falló/);
    assert.ok(!r.todo.includes(archivo("plantilla/prd").slice(0, 200)), "no debe incluir parte del primer archivo");
  } finally {
    chmodSync(segundo, modo);
  }
});
