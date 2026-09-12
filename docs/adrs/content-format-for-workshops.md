# Formato de contenido para talleres

**Estado:** Aceptada
**Fecha:** 2026-09-08
**Quién decide:** Freider Achic
**ADRs relacionados:** Ninguno

---

## Contexto

Cada taller necesita un punto de control versionado (`docs/`, `templates/`, `criterios/`) que sirva para dos cosas a la vez:

- material de clase en vivo, tipo diapositiva, un concepto por pantalla
- documento de auto-estudio para quien llega después por la grabación, o entra a mitad de ruta ([`docs/product-brief.md`](../product-brief.md))

El contenido tiene que:
- vivir como texto versionado en el repo (sin CMS, sin login, todo público)
- soportar diagramas
- verse bien en modo lectura normal y en modo presentación, sin mantener dos copias del mismo contenido

Markdown simple no permite layouts personalizados (modo diapositiva) ni diagramas embebidos. HTML a mano se ve mal como texto plano, mezcla etiquetas con contenido, y hace difícil comparar cambios en el historial de git.

## Decisión

**MDX** como formato de los talleres (`docs/curso/taller-N.mdx`), con diagramas en **Mermaid** (bloques ```mermaid que se dibujan en el navegador).

### Estructura de carpetas

```
docs/
  curso/
    taller-N.mdx           — resumen de esa sesión (uno por taller impartido)
    conceptos/
      adr.mdx               — qué es un concepto (ADR, PRD, ...) y cuándo se usa —
      prd.mdx                 un archivo por concepto, listo antes del taller que lo
                               introduce; talleres siguientes enlazan, no repiten
  proyecto/                 — artefactos del caso Buildwise generados en los talleres
    backlog.md                (ej. backlog, decisiones de producto)
    decision-producto.md
  adrs/                     — decisiones de este proyecto (no contenido del curso)
  specs/                    — especificaciones del proyecto
  system-design/            — system design del proyecto
templates/
  *.md                      — plantillas copiables para el alumno (product brief, PRD, ADR)
criterios/
  taller-N.md               — criterios de decisión de un taller
```

Cada carpeta tiene un propósito distinto:

- **`docs/curso/conceptos/`** explica qué es un concepto y cuándo usarlo (ej. qué es un ADR). No contiene las decisiones reales del proyecto.
- **`templates/`** contiene plantillas que el alumno puede copiar y adaptar a su propio proyecto.
- **`docs/proyecto/`** agrupa los artefactos del caso Buildwise que se construyen en vivo: backlog de candidatos, decisiones de producto, etc.
- **`docs/adrs/`**, **`docs/specs/`** y **`docs/system-design/`** son documentos técnicos del proyecto; cada tipo sigue en su propia carpeta.
- **`criterios/`** guarda los criterios de decisión de cada taller.

`docs/proyecto/` no reemplaza a `docs/adrs/`, `docs/specs/` ni `docs/system-design/`. `templates/` y `criterios/` solo existen cuando ese taller los necesita — no son carpetas que se llenan siempre, para cada taller. Ver [Alternativas consideradas](#alternativas-consideradas) para por qué el concepto va separado del resumen de la clase.

**Nombres en inglés o español:** el propio `product-brief.md` ya fija la regla — escribe `` `docs/`, `templates/`, `criterios/` `` mezclando inglés (sustantivos genéricos de ingeniería, prestados igual que ADR/PRD/MDX) con español (`criterios`, vocabulario propio del curso). Se sigue esa misma línea: `docs/`, `templates/`, `adrs/` en inglés (nadie del curso los lee como contenido); `curso/`, `taller-N.mdx`, `conceptos/`, `criterios/` en español (palabras que el alumno ya escucha en clase). El contenido de cada archivo, siempre en español, sin excepción.

El `product-brief.md` no se repite por taller: vive en `docs/product-brief.md` y se expone como `/proyecto/brief`. Los talleres que lo necesiten enlazan a esa ruta. Mismo criterio para `docs/curso/conceptos/*.mdx`.

Nota: `docs/curso/conceptos/adr.mdx` (qué es un ADR, en general) y `docs/adrs/` (las decisiones reales de este proyecto) son cosas distintas — no confundir.

### Dónde vive el contenido y cómo se muestra

Los `.mdx` no están dentro de `app/` como ruta directa — quedan en `docs/curso/`, y una ruta dinámica (`app/taller/[slug]/page.tsx`, mismo patrón para `app/conceptos/[slug]/page.tsx`) los importa. Patrón documentado en Next.js (`node_modules/next/dist/docs/01-app/02-guides/mdx.md`, "Using dynamic imports") — no es algo inventado para este proyecto.

### Un archivo, dos formas de verlo

Cada `##` dentro de `taller-N.mdx` es una diapositiva. La página lee esos bloques y ofrece:
- **modo lectura**: scroll normal, todo el documento
- **modo presentación**: una sección a pantalla completa, se avanza con flechas

Sin juego de diapositivas aparte — el mismo archivo sirve para los dos modos.

## Alternativas consideradas

### A. Markdown simple

**Veredicto:** Rechazada. No permite componentes propios (modo diapositiva) ni control de layout. Mermaid sería posible con un plugin, pero el modo presentación no.

### B. HTML a mano por taller

**Veredicto:** Rechazada. Se ve mal como texto plano, mezcla contenido con etiquetas, difícil de revisar en un PR, contradice "contenido versionado en markdown" del brief.

### C. Herramienta gráfica externa para diagramas (Figma, Excalidraw, etc.)

**Veredicto:** Rechazada. Rompe "todo versionado como texto" — exporta imágenes o depende de un servicio externo. Mermaid, al ser texto en el mismo archivo, se puede comparar en git y no depende de nada afuera del repo.

### D. Juego de diapositivas real (Reveal.js u otro) separado del documento

**Veredicto:** Rechazada por ahora. Mantener el contenido de clase y el de auto-estudio sincronizados en dos archivos es doble trabajo. Un layout simple de "una sección por pantalla" con navegación por teclado, sobre el mismo MDX, cubre el caso sin esa complejidad. Revisar si el modo presentación llega a necesitar transiciones que esta aproximación no pueda dar.

### E. Archivos `.mdx` directo bajo `app/` (ruta de archivo directa)

**Veredicto:** Rechazada. Mezclaría el contenido del curso con el código de la app en el mismo árbol — rompe la separación "contenido versionado aparte" que ya pide este mismo ADR para `docs/`. El import dinámico desde `docs/` da la misma ruta pública sin esa mezcla.

### F. Explicar cada concepto (ADR, PRD, ...) dentro del taller que lo usa, sin archivo propio

**Veredicto:** Rechazada. El brief nombra ADR, PRD, brief y diseño técnico como referencia que se repite a lo largo de los once talleres, no contenido de una sola sesión. Explicarlos ahí adentro obliga a los talleres siguientes a enlazar a `taller-1.mdx#adr` — un archivo pensado para narrar una clase específica, no para ser la fuente de un concepto reusable. Separar `docs/curso/conceptos/*.mdx` mantiene "un origen por concepto" sin ese amarre.

## Consecuencias

### Lo positivo

- Una sola fuente por taller — no hay diferencias entre "lo que se presenta en clase" y "lo que se lee después".
- Diagramas versionados como texto, se pueden comparar en git, sin depender de nada externo.
- Estructura `docs/` (curso, proyecto, adrs, specs, system-design), `templates/` y `criterios/` queda fija y replicable taller a taller, tal como pide el brief.

### Restricciones / limitaciones

- Agrega dependencia de MDX (`@next/mdx`) y de un renderer de Mermaid — justificado porque markdown simple no cubre ni diapositivas ni diagramas.
- Cada `##` cuenta como una diapositiva nueva; si un taller necesita más niveles dentro del mismo concepto, usar `###`, que no cuenta como diapositiva nueva.

### Cuándo revisar esta decisión

- Si el modo presentación necesita transiciones o navegación más elaborada que CSS + teclado, evaluar Reveal.js sobre el mismo MDX, en vez de mantener dos fuentes de contenido.
- Si crecen los talleres con diagramas complejos y Mermaid se queda corto, revisar una alternativa sin abandonar "texto versionado" como restricción.
