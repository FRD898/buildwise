import { test } from "node:test";
import assert from "node:assert/strict";
import { unirLineas } from "./unir-lineas.ts";

test("une líneas cortadas, respeta párrafos y listas", () => {
  const prompt = [
    "Primero las pruebas, sin escribir",
    "el conector:",
    "- Una por cada criterio,",
    "  en el nombre.",
    "- Una más.",
    "Llaman al conector",
    "por MCP.",
    "",
    "Después construye.",
  ].join("\n");

  assert.equal(
    unirLineas(prompt),
    [
      "Primero las pruebas, sin escribir el conector:",
      "- Una por cada criterio, en el nombre.",
      "- Una más.",
      "Llaman al conector por MCP.",
      "",
      "Después construye.",
    ].join("\n"),
  );
});

test("una línea con solo espacios separa párrafos", () => {
  assert.equal(unirLineas("Uno\n  \nDos\ntres"), "Uno\n\nDos tres");
});

test("solo los marcadores de lista reales cortan la unión", () => {
  assert.equal(unirLineas("**Nota:** esto\nsigue aquí"), "**Nota:** esto sigue aquí");
  assert.equal(unirLineas("Tarda\n1.5 segundos"), "Tarda 1.5 segundos");
  assert.equal(unirLineas("+ uno\n+ dos"), "+ uno\n+ dos");
});
