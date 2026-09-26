# Contenido de taller 3

| Campo | Valor |
|-------|-------|
| **Estado** | Borrador |
| **Módulo** | Contenido del curso |
| **Depende de** | `templates/prd.md` y `criterios/revisar-prd.md` en `main`; [`hallazgos-taller-02.md`](../hallazgos-taller-02.md) |
| **Diseño técnico** | Ninguno (el render ya está en [Renderizado de talleres (MDX)](./render-talleres.md)) |
| **ADR relacionado** | [Formato de contenido para talleres](../adrs/content-format-for-workshops.md), [Estructura de presentación en clase](../adrs/estructura-de-presentacion-en-clase.md), [Distribuir como servidor MCP](../adrs/distribuir-como-servidor-mcp.md) |

---

## 1. Resumen

Taller 2 probó la parte más riesgosa del conector y dejó hallazgos, no una especificación: el servidor entregó la plantilla completa siempre que lo llamaron, pero el agente lo llamó 2 de 3 veces. Taller 3 ordena esos hallazgos y los convierte en el PRD del conector (`docs/specs/conector-buildwise.md`), escrito por un agente con la plantilla del curso y revisado por otro agente con la rúbrica. Este spec define el contenido que alimenta `docs/curso/taller-3.mdx`, para el alumno que está en vivo y para el que ve la grabación después.

## 2. Alcance

**Incluye**
- **Apertura:** los cuatro tiempos del ADR. Dónde estamos apunta a `docs/hallazgos-taller-02.md` y cita el 2 de 3 como dato, sin discutirlo. Se presenta como ordenar lo que dejó la exploración, no como limpieza.
- **Pregunta:** *"La última vez que un agente te entregó algo distinto a lo que querías, ¿qué pasó: hizo de más, se quedó corto, o inventó algo que no le dijiste?"* Se retoma en el Cierre.
- **Concepto, tres ideas.** Cuatro nombres en total: Cagan, SDD, EARS, Spec Kit.
  - *Qué es un PRD y cuánto especificar.* La línea de Cagan (2005) y la tabla PRD / spec funcional / spec técnica (las dos últimas filas, Spolsky 2000, atribución al pie). En el curso, PRD y spec funcional son un documento; la técnica es el diseño técnico del taller 4. Afirmación central: los límites y los criterios de aceptación los decide quien especifica, no el modelo. Un arreglo puntual no necesita spec.
  - *Nuestra plantilla.* Link a `templates/prd.md` y link al diff contra la versión sembrada antes del taller 1. Tres cosas: no hay sección de cómo; criterios con forma EARS; `[PENDIENTE]` y Preguntas abiertas (equivalente a `[NEEDS CLARIFICATION]` de Spec Kit). Un pendiente puede decidirse ahora, al construir o dejarse al agente, siempre que diga quién lo decide. La plantilla es referencia, no formulario.
  - *Un criterio que se pueda marcar.* Quiz de cuatro opciones con casi-aciertos del propio conector (respuesta: la c). Dos reglas: atómico y verificable. Códigos `CONECTOR-N` estables. Dos capas según el sujeto: "el conector debe" se prueba una vez; "el agente del alumno, con el conector instalado, debe" se prueba en 3 de 3 intentos con pedidos redactados distinto, escritos después de construir (taller 10). Ejemplos: `CONECTOR-1` y `CONECTOR-5`.
- **Aplicación, dos partes con el agente:**
  - *Contarle al agente y pedirle la spec:* un solo prompt, copiable y corto: qué es el conector, dónde leer los hallazgos del taller 2 y los cuatro caminos esperados. Las reglas de escritura no se repiten: están en la plantilla. Produce `docs/specs/conector-buildwise.md` con la plantilla. No le dice qué queda fuera ni qué queda abierto: lo decide al llenar la plantilla. Quien hace la práctica apuesta antes de leer el resultado, y al empezar la revisión la compara con el "No incluye".
  - *Revisión con ojos nuevos:* instrucción, sin prompt copiable, de revisar en una sesión nueva con solo el PRD y `criterios/revisar-prd.md`; y las dos formas de pasarle los hallazgos al agente original: que aplique lo que el docente eligió, o que opine sobre cada uno (aceptarlo o defender lo escrito) antes de que el docente decida.
- **Cierre:** tabla respuesta de la pregunta → sección de la plantilla (hizo de más → "No incluye"; se quedó corto → caminos y criterios; inventó → `[PENDIENTE]`). Entregable: `docs/specs/conector-buildwise.md` revisado y corregido, en `taller-03-fin`. Tarea para el proyecto propio: los mismos dos pasos sobre una funcionalidad nueva. Gancho al taller 4.
- **Extra (para leer después):** tabla de formas de escribir una spec (plantilla en prosa vs. formato validable), una misma regla en EARS y en OpenSpec, links a los tres archivos reales (OpenSpec, Spec Kit, `to-spec` de Pocock) y lecturas.

**No incluye — y por qué**
- Construir el conector — es el taller 8.
- Nombres de herramientas, si el conector lista o busca, dónde vive el contenido — es diseño técnico, taller 4.
- Reabrir MCP vs. skills — ya decidido en el ADR del taller 2; el PRD lo enlaza.
- Que el agente reconozca un pedido que no nombra el artefacto — el spike mostró que falla y no se sabe si se puede lograr; no es criterio de la v1, queda como pendiente para quien diseñe y construya.
- Escribir o editar la plantilla y la rúbrica en clase — llegan con `taller-03-inicio`; lo que el revisor encuentre sobre ellas se anota para después.
- Material de respaldo (PRD de Parte 1, crítica del revisor) — vive fuera del repositorio, con el guion: en un repo público, un PRD de respaldo antes de clase sería la respuesta de la práctica.
- Minutos y guion de dictado — el ritmo en vivo se define fuera de este repo (ADR de estructura).
- Cuestionario del taller — vive en la plataforma, aparte.
- Specs de proyectos reales del docente — son repos privados; solo en voz, en Extra.

## 3. Cómo lo usa quien lo usa

1. El alumno sigue la sesión en vivo → hace las dos partes con su agente y termina con el PRD del conector revisado, igual al de `taller-03-fin`.
2. El alumno ve la grabación o abre la página después → encuentra en la página el prompt copiable de Parte 1, el link a la plantilla con su diff y el link a la rúbrica.
3. El alumno se suma en el taller 3 → parte de `taller-03-inicio`, que ya trae plantilla, rúbrica, hallazgos y ADR del taller 2.
4. El alumno quiere aplicarlo a su proyecto → la tarea del Cierre le dice los dos pasos, y el prompt está en la página.
5. Si el agente en vivo escribe un PRD que no sirve para la práctica → el docente sigue con el PRD de respaldo.
6. Si el revisor no encuentra nada → el docente muestra la crítica de respaldo.
7. Si el agente aplica mal una corrección → se termina después de clase, antes de etiquetar `taller-03-fin`.
8. Si nadie responde la pregunta de apertura → el docente da una respuesta propia preparada.
9. Si el tiempo se atrasa → se recorta Extra, luego la primera idea se reduce a la tabla; Parte 2 y Cierre no se tocan.
10. Si un alumno pregunta por qué MCP y no una skill → se le remite al ADR, sin reabrir la decisión.

## 4. Criterios de aceptación

- **TALLER3-1** — Cuando el alumno abre la página del taller 3, la página debe mostrar las secciones en el orden del ADR de estructura: Apertura, Pregunta, Concepto, Aplicación, Cierre, Extra.
- **TALLER3-2** — La página debe tener como máximo tres ideas en Concepto.
- **TALLER3-3** — Fuera de Extra y las lecturas, la página debe nombrar como fuentes solo a Cagan, SDD, EARS y Spec Kit, salvo la atribución a Spolsky al pie de la tabla de la primera idea.
- **TALLER3-4** — Cuando el alumno llega a la idea de la plantilla, la página debe enlazar `templates/prd.md` en vez de copiar su contenido.
- **TALLER3-5** — Cuando el alumno llega a la idea de la plantilla, la página debe enlazar el diff de la plantilla contra la versión sembrada antes del taller 1.
- **TALLER3-6** — Cuando el alumno llega al quiz, la página debe mostrar las cuatro opciones antes de la respuesta.
- **TALLER3-7** — Cuando el alumno llega a las dos capas, la página debe mostrar un criterio de cada capa, cada uno con su código.
- **TALLER3-8** — El prompt de Parte 1 no debe decirle al agente qué queda fuera ni qué queda abierto.
- **TALLER3-9** — Cuando el alumno llega a Parte 1, la página debe mostrar el prompt completo, en un bloque que se pueda copiar.
- **TALLER3-10** — Cuando el alumno llega a Parte 2, la página debe decirle que la revisión se hace en una sesión nueva, con solo la spec y la rúbrica.
- **TALLER3-11** — Cuando el alumno llega al Cierre, la página debe mostrar la tabla que ubica cada respuesta de la pregunta en una sección de la plantilla.
- **TALLER3-12** — Cuando el alumno llega al Cierre, la página debe nombrar `docs/specs/conector-buildwise.md` como entregable y `taller-03-fin` como punto de control.
- **TALLER3-13** — Cuando el alumno llega al Cierre, la página debe darle la tarea para su proyecto propio.
- **TALLER3-14** — La página debe referirse a sesiones anteriores por número ("en el taller 2"), nunca con fechas relativas.
- **TALLER3-15** — Cuando alguien parte de `taller-03-inicio`, el repositorio debe contener `templates/prd.md`, `criterios/revisar-prd.md`, `docs/hallazgos-taller-02.md` y `docs/adrs/distribuir-como-servidor-mcp.md`.
- **TALLER3-16** — En `taller-03-fin`, `docs/specs/conector-buildwise.md` debe listar el pedido que no nombra el artefacto en "No incluye — y por qué" y no en los criterios de aceptación.
- **TALLER3-17** — En `taller-03-fin`, `docs/specs/conector-buildwise.md` debe tener en Preguntas abiertas un `[PENDIENTE]` sobre ese pedido que diga quién lo decide.
- **TALLER3-18** — En `taller-03-fin`, `docs/specs/conector-buildwise.md` no debe nombrar herramientas del conector, librerías ni estructura de código.

## 5. Preguntas abiertas


Ninguna por ahora.
