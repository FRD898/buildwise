import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { verificarCatalogo } from "../lib/verificar-catalogo.ts";

const entrada = (nombre: string, descripcion = "algo útil") => ({ tipo: "plantilla" as const, nombre, descripcion });

// Raíz temporal con templates/ y criterios/ que contienen los archivos dados.
function raiz(plantillas: string[], criterios: string[] = []) {
  const r = mkdtempSync(join(tmpdir(), "catalogo-"));
  for (const [dir, nombres] of [["templates", plantillas], ["criterios", criterios]] as const) {
    mkdirSync(join(r, dir));
    for (const n of nombres) writeFileSync(join(r, dir, `${n}.md`), "x");
  }
  return r;
}

test("catálogo y carpetas alineados: no falla", () => {
  verificarCatalogo([entrada("a")], raiz(["a"]));
});

test("archivo publicado sin entrada en el catálogo: falla", () => {
  assert.throws(() => verificarCatalogo([entrada("a")], raiz(["a", "b"])), /Sin entrada: templates\/b\.md/);
});

test("entrada sin archivo: falla", () => {
  assert.throws(() => verificarCatalogo([entrada("a"), entrada("b")], raiz(["a"])), /Sin archivo: templates\/b\.md/);
});

test("descripción vacía: falla", () => {
  assert.throws(() => verificarCatalogo([entrada("a", "")], raiz(["a"])), /Sin descripción: templates\/a\.md/);
});

test("descripción de solo espacios: falla", () => {
  assert.throws(() => verificarCatalogo([entrada("a", " \n\t ")], raiz(["a"])), /Sin descripción: templates\/a\.md/);
});
