<!--
Ejemplo de referencia, no un estándar obligatorio. Un PRD (spec) describe qué se construye
y cómo se comporta, desde la perspectiva de quien lo usa — no repite el porqué (eso ya
está en el brief o en un ADR, enlázalo). Nombra el archivo con slug descriptivo, sin
prefijo numérico (kebab-case-title.md), en docs/specs/. Adapta las secciones a tu propio
flujo si te sirve más así.

Si un spec tiene reglas de validación finas que varios specs o tests van a necesitar citar,
se le puede agregar una sección "Requisitos" con IDs estables por regla — prefijo por
módulo + número, ej. `TALLER-001`, el ID no cambia aunque el texto se ajuste. No es la
norma: solo cuando de verdad hace falta trazabilidad (specs complejos, con tests que citan
el ID). No hay suite de tests todavía, así que no aplica por ahora.
-->

# [Nombre de la funcionalidad]

| Campo | Valor |
|-------|-------|
| **Estado** | Borrador \| En progreso \| Listo |
| **Módulo** | [a qué parte del proyecto pertenece] |
| **ADR relacionado** | [link, o "Ninguno"] |

---

## 1. Resumen

[Qué es, en dos o tres frases. Qué problema resuelve para quien lo usa.]

## 2. Alcance

**Incluye**
- [...]

**No incluye**
- [...]

## 3. Cómo funciona

[El comportamiento/flujo desde la perspectiva de quien lo usa — no la implementación interna.]

## 4. Requisitos técnicos

[Qué ya existe y qué falta agregar para construir esto: dependencias, versiones, archivos
de configuración. Concreto, no una lista de ideas.]

## 5. Plan de implementación

[Pasos en el orden real en que se van a hacer — no una lista de features.]

1. [Paso 1]
2. [Paso 2]
3. [...]

## 6. Criterios de aceptación

[Cómo se sabe que esto está listo. Verificable, no "se ve bien". Código estable por
criterio (`CA-1`, `CA-2`, ...) para poder citarlo después — en un commit, un PR, otro
spec, o un test el día que exista uno.]

- **CA-1** — [...]
- **CA-2** — [...]

## 7. Fuera de alcance / Decisiones

| Decisión o algo descartado | Por qué |
|---|---|
| [...] | [...] |
