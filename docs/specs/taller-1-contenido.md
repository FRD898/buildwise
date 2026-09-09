# Contenido de taller 1

| Campo | Valor |
|-------|-------|
| **Estado** | Borrador |
| **Módulo** | Contenido del curso |
| **ADR relacionado** | [Formato de contenido para talleres](../adrs/content-format-for-workshops.md) |

---

## 1. Resumen

Taller 1 decide cómo se expone el método (criterios, plantillas, decisiones) al agente de código del propio alumno — lo que el brief deja abierto explícitamente: *"se decide en el taller 1, sobre un backlog de candidatos y criterios explícitos — no técnicos —, y se documenta ahí"*. Este spec define el contenido pedagógico que alimenta `docs/curso/taller-1.mdx`: el backlog simulado, los criterios, y métodos de referencia para comparar candidatos.

## 2. Alcance

**Incluye**
- Backlog de candidatos simulados: pedidos de los 3 públicos que nombra el brief (alumno que sigue la ruta, alumno que se suma a mitad de ruta, alumno que llega por grabación).
- Criterios de priorización no técnicos, sacados del propio brief (no inventados).
- Resumen de 3 métodos simples de priorización, como referencia — no se prescribe uno.

**No incluye**
- La decisión final (qué mecanismo se elige) — eso se decide en vivo, en el taller, no en este spec.
- La infraestructura para renderizar el taller (ruta, MDX, modo slide) — ver [Renderizado de talleres (MDX)](./render-talleres.md).

## 3. Backlog de candidatos (simulado)

Cada uno representa un pedido de un público real del curso, no una idea técnica nuestra.

| # | Quién pide | Pedido (simulado) |
|---|---|---|
| B1 | Alumno que sigue la ruta | "Quiero que mi agente sepa los criterios del taller de esta semana sin que yo tenga que copiarlos a mano cada vez." |
| B2 | Alumno a mitad de ruta | "Llegué en el taller 5. Necesito bajar el punto de control completo y que mi agente lo entienda de una, sin depender de lo que pasó en talleres anteriores." |
| B3 | Alumno por grabación (meses después) | "Estoy viendo la grabación del taller 3, seis meses después. Quiero ver exactamente el mismo contenido y criterios que se usaron esa clase, no una versión actualizada silenciosamente." |
| B4 | Alumno que sigue la ruta | "Prefiero preguntarle a un chat dentro de la misma app 'qué plantilla uso para esto' en vez de andar buscando en carpetas." |
| B5 | Alumno a mitad de ruta | "Mi agente de código (Claude/Cursor) debería poder leer los criterios directo, sin que yo se los pegue en el prompt." |
| B6 | Alumno que sigue la ruta | "Quiero un comando que sincronice los criterios de la semana a mi propio `AGENTS.md`, para no salir de mi editor." |
| B7 | Alumno por grabación | "No tengo ni quiero cuenta ni login — solo quiero poder ver y bajar el contenido público, como cualquier repo." |
| B8 | Alumno a mitad de ruta | "Si el contenido cambia después de mi taller, quiero poder saber qué versión vi yo — no que se pierda." |

## 4. Criterios de priorización (no técnicos, del brief)

| Criterio | De dónde sale |
|---|---|
| **Disponible en el flujo real de trabajo** — no una página aparte que hay que ir a buscar | *"El método no se explica, se usa: se pone disponible dentro del flujo de trabajo real del alumno, no en una página aparte"* |
| **No requiere memorizar ni copiar a mano** | *"para que estén disponibles en el momento de trabajar, sin que haga falta memorizarlos ni copiarlos a mano"* |
| **Origen rastreable a una sesión del curso** — nada inventado para llenar un catálogo | *"Cada artefacto que se sirve tiene origen rastreable en una sesión del curso"* |
| **Replicable sin depender de talleres anteriores** | *"cualquiera puede replicar el estado exacto de cualquier taller, sin depender de haber visto los anteriores"* |
| **Sin cuentas ni login** — todo público | *"No tiene autenticación ni cuentas — todo el contenido es público"* |

## 5. Métodos de priorización (referencia, no prescrito)

Se presentan los tres en el taller como opciones — el alumno compara el backlog contra los criterios con el que le haga más sentido, no hay uno "correcto".

**Matriz de criterios ponderada** — una tabla candidato × criterio, cada celda marca si ese candidato cumple ese criterio (sí/no/parcial). El candidato con más criterios cumplidos gana visibilidad. Simple, visual, no pide inventar números.

**MoSCoW** — cada candidato se clasifica en Must / Should / Could / Won't have. Más rápido que la matriz, pero binario por candidato: no distingue *cuánto* cumple cada criterio, solo si entra en la versión actual o no.

**Matriz esfuerzo/impacto** — un cuadrante 2×2, cada candidato se ubica según cuánto esfuerzo estimado toma y cuánto impacto tiene sobre los criterios. Útil cuando el esfuerzo de construir varía mucho entre candidatos (ej. un chat conversacional vs. un comando de sync) — los otros dos métodos no distinguen eso.

## 6. Criterios de aceptación

- **CA-1** — El backlog tiene al menos 6 candidatos y cubre los 3 públicos del brief (ruta, mitad de ruta, grabación).
- **CA-2** — Cada criterio de priorización cita la frase exacta del brief de donde sale — ninguno inventado.
- **CA-3** — Los 3 métodos están resumidos en un párrafo o menos cada uno, sin necesitar fórmulas ni estimaciones numéricas complejas.
- **CA-4** — El contenido de este spec es suficiente para escribir `docs/curso/taller-1.mdx` sin inventar nada nuevo en el momento.

## 7. Fuera de alcance / Decisiones

| Decisión o algo descartado | Por qué |
|---|---|
| RICE (Reach/Impact/Confidence/Effort) | Pide estimar números (alcance, esfuerzo) sin datos reales de uso todavía — enseñaría falsa precisión. |
| Prescribir un solo método | El brief pide que la decisión de taller 1 quede documentada con "criterios explícitos", no que se imponga una metodología — se muestran 3 simples y el alumno elige. |
| Backlog con candidatos técnicos (arquitectura, stack) | El brief pide criterios "no técnicos" para esta decisión — los candidatos son sobre *qué forma toma la exposición*, no *cómo se implementa*. |
