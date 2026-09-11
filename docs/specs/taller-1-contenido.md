# Contenido de taller 1

| Campo | Valor |
|-------|-------|
| **Estado** | Borrador |
| **Módulo** | Contenido del curso |
| **ADR relacionado** | [Formato de contenido para talleres](../adrs/content-format-for-workshops.md), [Estructura de presentación en clase](../adrs/estructura-de-presentacion-en-clase.md) |

---

## 1. Resumen

Taller 1 decide cómo se expone el método (criterios, plantillas, decisiones) al agente de código del propio alumno — lo que el brief deja abierto explícitamente: *"se decide en el taller 1, sobre un backlog de candidatos y criterios explícitos — no técnicos —, y se documenta ahí"*. Este spec define el contenido pedagógico que alimenta `docs/curso/taller-1.mdx`: el bloque Concepto (por qué conocer el producto importa), el backlog real de taller 1, los criterios, métodos de referencia, y el bloque Aplicación donde se decide en vivo.

## 2. Alcance

**Incluye**
- Bloque Concepto: por qué conocer el producto importa, y cómo cambia el rol de ingeniero de software — con fuentes citadas, no afirmaciones sueltas.
- Backlog de candidatos real del curso, agrupado por a quién sirve (ver sección 4) — no inventado para este spec.
- Criterios de priorización no técnicos, sacados del propio brief (no inventados).
- Resumen de 3 métodos simples de priorización, como referencia — no se prescribe uno.
- Bloque Aplicación: cómo se estructura el ejercicio en vivo (agente propone, criterios deciden).
- Pregunta, formulada según el ADR: *"¿Alguna vez construiste algo que nadie terminó usando?"*
- Cierre: entregables de la semana (`docs/decision-producto.md`, `criterios/priorizacion.md`).

**No incluye**
- La decisión final (qué mecanismo se elige) — eso se decide en vivo, en el taller, no en este spec.
- La infraestructura para renderizar el taller (ruta, MDX, modo diapositiva) — ver [Renderizado de talleres (MDX)](./render-talleres.md).

## 3. Bloque Concepto — por qué conocer el producto importa

Máximo 3 ideas (ver [Estructura de presentación en clase](../adrs/estructura-de-presentacion-en-clase.md)). Cada una lleva su afirmación y su evidencia — no párrafos de teoría en la diapositiva, eso queda para la voz del docente.

**Idea 1 — Conocer el producto suma directo a tu trabajo de ingeniero: mejores decisiones, menos retrabajo.**
No es un "extra" de habilidades blandas — un ingeniero con contexto de producto (usuarios, objetivo, quién decide) propone soluciones más simples, evita retrabajo tardío y arquitecturas que no aguantan el rumbo real del producto. Es la base de por qué este taller existe antes de escribir una sola línea de código.
Evidencia: [LogRocket — Get engineers involved in product development earlier](https://blog.logrocket.com/product-management/get-engineers-involved-product-development-earlier/) (EN).

**Idea 2 — Por eso el rol cambia: de implementar lo que piden a decidir qué se construye — el cambio a product builder.**
La IA reduce el costo de producir código; lo escaso pasa a ser el criterio para decidir qué construir y revisar si lo que se construyó sirve. Es el mismo principio que atraviesa toda la ruta (revisar documentos, interfaces y código en talleres 1 a 9) — taller 1 es donde se nombra por primera vez, y es el puente directo al ejercicio del bloque Aplicación: el backlog de la sección 4.
Evidencia: [IEEE Spectrum — AI code review shifts the engineer's role](https://spectrum.ieee.org/ai-code-review-software-engineers) (EN).

**Nota de terminología — "product builder" vs. "product engineer":** son términos relacionados, no sinónimos. El curso usa **product builder** (así se llama la ruta completa) porque implica dueño de punta a punta: decide qué construir, lo construye, y responde por el resultado. "Product engineer" (Atlassian) es el término más establecido en la industria para "ingeniero con criterio de producto" — se puede mencionar como referencia, pero sin dar a entender que son lo mismo. Fuentes: [Atlassian — The rise of product engineering](https://www.atlassian.com/agile/product-management/product-engineering) (EN), [Marian — Product builder vs. product engineer](https://www.marian.coach/blog/product-builder-role/) (EN, tiene la comparación más directa entre los dos términos).

**Lecturas opcionales** (marcadas "para leer después" en el `.mdx`, no se presentan en vivo — ver regla de Extra en el ADR de estructura):
- [Product Builder — qué es (ES)](https://www.productbuilder.net/es/learn/what-is-a-product-builder) — versión en español, definición directa del rol.
- [Sprintt.ai — The product builder role in 2026](https://sprintt.ai/blog/product-builder-role-2026) (EN) — pieza de predicción de industria, la fuente más especulativa de esta lista, usar como contexto, no como cita firme.

## 4. Backlog de candidatos (real, del curso)

Backlog real de taller 1, agrupado por a quién sirve — no inventado para este spec. Los tres primeros grupos son los públicos objetivo que nombra `product-brief.md`; los dos últimos (docente, comunidad/negocio) vienen del mismo backlog real y se dejan porque sirven para ver los criterios trabajar en vivo, aunque no sean público objetivo de Buildwise.

**Al alumno que se acaba de sumar**

| # | Candidato | Qué resuelve |
|---|---|---|
| B1 | Descarga del checkpoint en un clic | Empezar sin pelear con Git |
| B2 | Instrucciones de arranque por taller | Levantarlo en cinco minutos |
| B3 | Vista previa desplegada de cada checkpoint | Ver el estado sin instalar nada |
| B4 | Mapa de la ruta con dependencias | Saber qué necesito antes de este taller |

**Al alumno que sigue la ruta**

| # | Candidato | Qué resuelve |
|---|---|---|
| B5 | Conector MCP con plantillas y criterios | Aplicar el método sin salir de donde trabaja |
| B6 | Progreso y checklist por módulo | Saber dónde voy |
| B7 | Bitácora de entregables | Tener mi portafolio al terminar |
| B8 | Diagnóstico de mi repositorio | Saber qué me falta del método |
| B9 | Comparar mi entregable con el de referencia | Saber si lo hice bien |
| B10 | Ejercicios autoevaluables | Practicar sin esperar corrección |
| B11 | Notas personales sobre el material | No perder lo que se me ocurrió leyendo |

**Al que llega por la grabación, meses después**

| # | Candidato | Qué resuelve |
|---|---|---|
| B12 | Transcripción buscable | Encontrar el minuto donde se explicó algo |
| B13 | Capítulos enlazados al contenido escrito | Saltar a la parte que importa |
| B14 | Fragmentos compartibles | Mandarle a alguien "mira esto" |
| B15 | Glosario con enlaces cruzados | Entender un término sin ver la clase entera |

**Al docente** (fuera de los públicos objetivo del brief — se deja para contraste en vivo)

| # | Candidato | Qué resuelve |
|---|---|---|
| B16 | Captura de dudas por clase | Material real para el taller 11 |
| B17 | Feedback por sección | Saber qué contenido falla |
| B18 | Analítica de lectura y abandono | Saber dónde se pierde la gente |

**A la comunidad y al negocio** (fuera de los públicos objetivo del brief — se deja para contraste en vivo)

| # | Candidato | Qué resuelve |
|---|---|---|
| B19 | Muro de entregables, con permiso | Ver cómo lo resolvieron otros |
| B20 | Comentarios por sección | Preguntar donde surge la duda |
| B21 | Aviso de nueva clase por correo | Que vuelvan |
| B22 | Certificado al completar | Que terminen |

## 5. Criterios de priorización (no técnicos, del brief)

| Criterio | De dónde sale |
|---|---|
| **Disponible en el flujo real de trabajo** — no una página aparte que hay que ir a buscar | *"El método no se explica, se usa: se pone disponible dentro del flujo de trabajo real del alumno, no en una página aparte"* |
| **No requiere memorizar ni copiar a mano** | *"para que estén disponibles en el momento de trabajar, sin que haga falta memorizarlos ni copiarlos a mano"* |
| **Origen rastreable a una sesión del curso** — nada inventado para llenar un catálogo | *"Cada artefacto que se sirve tiene origen rastreable en una sesión del curso"* |
| **Replicable sin depender de talleres anteriores** | *"cualquiera puede replicar el estado exacto de cualquier taller, sin depender de haber visto los anteriores"* |
| **Sin cuentas ni login** — todo público | *"No tiene autenticación ni cuentas — todo el contenido es público"* |

## 6. Métodos de priorización (referencia, no prescrito)

Se presentan los tres en el taller como opciones — el alumno compara el backlog contra los criterios con el que le resulte más claro, no hay uno "correcto".

**Matriz de criterios ponderada** — una tabla candidato × criterio, cada celda marca si ese candidato cumple ese criterio (sí/no/parcial). El candidato con más criterios cumplidos queda mejor posicionado. Simple, visual, no pide inventar números.

**MoSCoW** — cada candidato se clasifica en Must / Should / Could / Won't have. Más rápido que la matriz, pero agrupado por categorías: no distingue *cuánto* cumple cada criterio, solo si entra en la versión actual o no.

**Matriz esfuerzo/impacto** — un cuadrante 2×2, cada candidato se ubica según cuánto esfuerzo estimado requiere y cuánto impacto tiene sobre los criterios. Útil cuando el esfuerzo de construir varía mucho entre candidatos (ej. un chat conversacional vs. un comando de sync) — los otros dos métodos no distinguen eso.

## 7. Bloque Aplicación — el agente propone, los criterios deciden

Antes de aplicar los criterios de la sección 5, se le pide al agente que priorice el backlog **sin darle ningún criterio** — solo el texto de los 22 candidatos.

Lo esperable, y lo que conviene decir en voz alta cuando pase: sin instrucción, el agente tiende a inventar una métrica tipo RICE (alcance, impacto, confianza, esfuerzo) para justificar un orden — números con apariencia de rigor sobre un backlog sin datos reales de uso. Es exactamente la falsa precisión que esta misma spec descarta como método (sección 9, fila RICE).

Después se aplican los 5 criterios no técnicos de la sección 5, en vivo, y se compara: ¿coincide el orden del agente con el de los criterios? El momento más útil para señalar en vivo: varios candidatos de "Al docente" y "A la comunidad y al negocio" (B16-B22) quedan descartados con un único criterio — **sin cuentas ni login** — porque certificado, comentarios, avisos por correo o un muro con permiso necesitan identificar a alguien. No hace falta pasarlos por los 5 criterios completos para descartarlos: uno solo ya alcanza, y eso demuestra por qué el criterio está redactado tan explícito. La lección no es "el agente se equivocó" — es que el agente ejecuta y sintetiza, pero decidir requiere criterio explícito, no solo pedir una priorización.

Esto no cambia la conclusión del taller — sigue ganando el candidato del conector MCP — lo que se enriquece es el razonamiento en vivo, no el resultado.

**Pendiente fuera de este repo:** el rol del agente en taller 1, tal como está descrito en la propuesta enviada a Netzun, dice "analizar y sintetizar el backlog de candidatos" — no incluye este paso de "proponer su propia priorización". Falta actualizar esa línea en el documento de propuesta (fuera de este repo) para que no contradiga lo que se enseña en vivo.

## 8. Criterios de aceptación

- **CA-1** — El backlog es el real del curso (no inventado), cubre los 3 públicos objetivo del brief (ruta, mitad de ruta, grabación), y conserva los grupos extra (docente, comunidad/negocio) que sirven de contraste en vivo.
- **CA-2** — Cada criterio de priorización cita la frase exacta del brief de donde sale — ninguno inventado.
- **CA-3** — Los 3 métodos están resumidos en un párrafo o menos cada uno, sin necesitar fórmulas ni estimaciones numéricas complejas.
- **CA-4** — El bloque Concepto tiene máximo 3 ideas, cada una con afirmación + evidencia citada (fuente real, no inventada).
- **CA-5** — El bloque Aplicación describe el paso "agente propone sin criterio, luego se aplican los criterios explícitos" sin prescribir RICE ni otra fórmula como método del taller.
- **CA-6** — El contenido de este spec es suficiente para escribir `docs/curso/taller-1.mdx` sin inventar nada nuevo en el momento.

## 9. Fuera de alcance / Decisiones

| Decisión o algo descartado | Por qué |
|---|---|
| RICE (Reach/Impact/Confidence/Effort) como método prescrito | Pide estimar números (alcance, esfuerzo) sin datos reales de uso todavía — enseñaría falsa precisión. Se deja entrar solo como lo que el agente propone por defecto sin criterio (sección 7), no como método recomendado. |
| Prescribir un solo método de priorización | El brief pide que la decisión de taller 1 quede documentada con "criterios explícitos", no que se imponga una metodología — se muestran 3 simples y el alumno elige. |
| Backlog con candidatos técnicos (arquitectura, stack) | El brief pide criterios "no técnicos" para esta decisión — los candidatos son sobre *qué forma toma la exposición*, no *cómo se implementa*. |
| Usar "product engineer" como sinónimo de "product builder" en el `.mdx` | Son términos relacionados pero no idénticos (ver sección 3) — el curso ya fijó "product builder" como su nombre; mezclar los dos confunde a quien lo ve por grabación meses después. |
