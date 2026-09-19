# Contenido de taller 2

| Campo | Valor |
|-------|-------|
| **Estado** | Borrador |
| **Módulo** | Contenido del curso |
| **ADR relacionado** | [Formato de contenido para talleres](../adrs/content-format-for-workshops.md), [Estructura de presentación en clase](../adrs/estructura-de-presentacion-en-clase.md) |

---

## 1. Resumen

Taller 1 decidió *qué* construir: el conector MCP (B5), sobre un backlog ya armado y 5 criterios ya fijos ([`decision-producto.md`](../proyecto/decision-producto.md)). Taller 2 no construye el conector todavía — cierra el hueco que taller 1 dejó sin mostrar (de dónde sale una opción antes de existir en una tabla) y responde, con el mínimo trabajo posible, dos preguntas que solo se resuelven probando: cómo debe actuar el agente ante lo que pide el alumno, y si un servidor MCP mínimo puede entregarle una plantilla del curso al agente. Este spec define el contenido pedagógico que alimenta `docs/curso/taller-2.mdx`.

## 2. Alcance

**Incluye**
- Bloque Concepto: por qué no se construye ya, apoyado en que investigar y prototipar antes de comprometerse con un alcance es un patrón real en más de un método de producto (Shape Up, flujos de skills de agente, OpenSpec; Design Sprint solo como referencia) — no una afirmación aislada del docente.
- Una investigación corta y en vivo con el agente sobre cómo exponer contenido versionado a un agente de código, sin adelantarle al agente la respuesta — la práctica que taller 1 no mostró.
- Una tabla de comportamiento esperado (pedido del alumno / qué hace el agente) que define cómo debe actuar el agente (qué pregunta, qué herramienta elige, qué entrega) y si los nombres de las herramientas confunden, antes de escribir servidor. Es modelado en papel, no un prototipo ni una prueba: el spike comprueba si el agente lo cumple.
- Un spike técnico con condición de parada definida de antemano, que valida si el agente llama una herramienta MCP y recibe la plantilla completa.
- Regla de decisión: qué tipo de duda va con qué tipo de prueba (investigación, comportamiento esperado, spike, prototipo de interfaz).
- Pregunta de apertura, formulada según el ADR y sin exigir experiencia previa (todos pueden apostar): *"Vamos a construir el conector MCP. ¿Qué parte no estás seguro de que vaya a funcionar?"* Prepara el spike, que prueba justo la parte más incierta.
- Cierre con checkpoint de fin de sesión y entregables versionados.

**No incluye**
- Construir el conector MCP real, con sus herramientas completas — eso empieza en taller 4+.
- Reabrir la decisión de taller 1 (qué candidato ganó) o su framing completo (entrevista de 5 dimensiones) — ya cerrado en `decision-producto.md`.
- Decidir entre MCP y una alternativa técnica — si la investigación de hoy encuentra una, queda anotada, no resuelta, para taller 3 o un ADR aparte.
- La infraestructura de renderizado del taller — ver [Renderizado de talleres (MDX)](./render-talleres.md).

## 3. Bloque Concepto — por qué no construir ya

Máximo 3 ideas (ver [Estructura de presentación en clase](../adrs/estructura-de-presentacion-en-clase.md)).

**Idea 1 — Un flujo, nombres distintos.**
Definir el problema, investigar y prototipar antes de comprometerse con un alcance no es una regla inventada para esta clase — es un tramo que se repite, con otro nombre, en Shape Up, en flujos de skills para agentes de código y en OpenSpec; Design Sprint aparece al final de la tabla, solo como referencia. Ninguno calza perfecto con el nuestro (Shape Up no separa investigación externa como paso propio, Design Sprint decide antes de prototipar, no después) — el guion lo dice explícito en vez de forzar el paralelo.

**Idea 2 — Cómo investigar y prototipar rápido.**
Repaso corto de las cuatro formas de resolver una duda (investigar, definir el comportamiento esperado, spike técnico, prototipo de interfaz; las tres primeras se hacen hoy) y qué pregunta responde cada una, apoyado en `research` y `prototype` de Pocock. Interfaz: se nombra el rango (boceto a mano de Shape Up hasta variantes en código con datos reales de Pocock) sin elegir; cuál usar es taller 7. Regla del curso: un prototipo responde una pregunta; si no puedes decir cuál, es trabajo adelantado. Distingue spike de proof of concept: el spike de hoy tiene pregunta cerrada y condición de parada fijada antes de empezar, y su código no se reutiliza, sin importar el resultado.

**Idea 3 — Regla de decisión.**
Cuatro preguntas simples deciden qué prueba usar según el tipo de duda: cómo lo resuelven otros → investigar; cómo debe comportarse el agente ante cada pedido → definir el comportamiento esperado; si algo técnico funciona → spike; cómo debe verse o si se entiende una pantalla → prototipo de interfaz (no aplica hoy). Mapea directo a las partes del bloque Aplicación. No tiene diapositiva propia: la columna "Qué responde" de la tabla de la Idea 2 es la regla, y el docente la dice en voz alta. La versión completa se publica en `criterios/que-probar.md`.

## 4. Bloque Aplicación — investigar, dialogar, probar

Tres partes cortas, en vivo, todas con el agente:

- **Investigación rápida** — se le presenta al agente el problema (exponer contenido versionado al agente del alumno) sin nombrarle la alternativa a comparar, para que cualquier patrón distinto a MCP salga de la investigación y no de lo que el docente ya sabía. El docente compara su propia apuesta contra la respuesta del agente antes de aceptarla — evita sesgo de automatización. Se guarda como artefacto versionado.
- **Comportamiento esperado, como tabla** — situación / lo que pide el alumno / lo que hace el agente / qué pasa después, construida en vivo (opcional: el agente entrevista al docente, estilo `grill-me`). Más reusable que un diálogo libre; se corrige ahí mismo si el nombre de una herramienta genera ambigüedad, antes de que exista una línea de servidor.
- **Spike técnico** — se define antes de correr: objetivo (comprobar que un servidor MCP mínimo entrega una plantilla del curso al agente), alcance (una herramienta sin parámetros, `obtener_plantilla_product_brief`, que devuelve `templates/product-brief.md`), pregunta (¿el agente la llama y recibe la plantilla completa?), criterio de éxito (3 de 3 intentos, con el pedido redactado distinto cada vez). Devuelve el archivo real de `templates/`, no texto inventado. El código se guarda como referencia y no se reutiliza; el resultado se anota en `docs/hallazgos-taller-02.md`.

Cierre de la sesión: se retoma la pregunta de apertura (¿fue eso lo que probamos?), se muestra en pantalla qué queda versionado en el repo, y se marca el checkpoint de fin de taller.

## 5. Criterios de aceptación

- **CA-1** — El bloque Concepto tiene máximo 3 ideas, cada una apoyada en una fuente verificable (no solo la palabra del docente) cuando afirma que el patrón "investigar y prototipar antes de construir" es real en otros métodos.
- **CA-2** — La investigación en vivo no le nombra al agente la alternativa a comparar — cualquier opción distinta a MCP tiene que salir de la respuesta del agente, no del prompt.
- **CA-3** — El spike define objetivo, alcance, pregunta y criterio de éxito *antes* de correr en vivo, y su código no se reutiliza independientemente del resultado.
- **CA-4** — La sesión no reabre ni el candidato ganador de taller 1 ni su framing completo — cualquier alternativa técnica que surja de la investigación queda anotada, no decidida, en este taller.
- **CA-5** — Existe una regla de decisión explícita (qué duda va con qué tipo de prueba) y las tres partes de la aplicación se pueden trazar cada una a una de esas preguntas.
- **CA-6** — El contenido de este spec es suficiente para escribir `docs/curso/taller-2.mdx` sin inventar nada nuevo en el momento.

## 6. Fuera de alcance / Decisiones

| Decisión o algo descartado | Por qué |
|---|---|
| Reabrir el framing completo del problema (entrevista de 5 dimensiones, nuevas opciones de solución) | Ya cerrado en taller 1 con `decision-producto.md` — taller 2 solo llena el hueco de "de dónde sale una opción", no vuelve a decidir cuál. |
| Decidir MCP vs. una alternativa técnica que traiga la investigación | El spike sigue siendo sobre MCP: es el compromiso público vigente y el mismo conector ya tiene planeadas capacidades (B8, B9) que necesitan lo que MCP resuelve. La duda técnica queda anotada, no resuelta hoy. |
| Construir el conector con sus herramientas completas | Corresponde a taller 4 en adelante — hoy es investigación y prototipo, no construcción. |
| Prototipo de interfaz / pantalla clicable | El conector no tiene pantalla propia — es una de las cuatro ramas de la regla de decisión pero no aplica hoy; se nombra en Concepto y se cubre a fondo en taller 7. |
