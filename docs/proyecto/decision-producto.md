# Decisión de producto — Taller 1

## Ganador: B5 — Conector MCP con plantillas y criterios

Construye primero. En la matriz de 5 criterios (abajo) queda empatado en el
grupo top junto a otros candidatos — el empate se rompe con los descartes de
la sección siguiente, no con un criterio nuevo.

Además es infraestructura habilitante, no solo la mejor puntuada: al construirlo
primero, expone qué otros aspectos hacen falta en el flujo real de construcción
(diagnóstico, comparación contra referencia, lo que venga) en vez de adivinarlos
por adelantado. B8 y B9 (fase 2, abajo) son ejemplos de eso — surgen al usar el
conector, no se definieron antes de tenerlo.

## Fase 2 — capacidades del mismo conector, no candidatos aparte

- **B8 — Diagnóstico de mi repositorio**: válido solo como check estructural
  (¿hay checkpoints? ¿se usaron las plantillas?), nunca como juicio sobre si
  la decisión de producto del alumno fue "correcta" — el brief dice
  explícito que Buildwise no evalúa ni califica.
- **B9 — Comparar mi entregable con el de referencia**: mismo límite. Comparar
  contra un checkpoint de referencia es diff, no calificación — así lo
  resuelve el brief (*"no evalúa ni califica... compara contra un punto de
  control de referencia"*).

Ambos se sirven vía el conector de B5, no como productos separados.

## Descartados (motivo fuera de los 5 criterios del brief)

| # | Candidato | Por qué cae |
|---|---|---|
| B16 | Captura de dudas por clase | Netzun ya cubre esto con comentarios/chat en vivo por taller — duplicaría infraestructura existente. |
| B13 | Capítulos enlazados al contenido | Ya ocurre orgánicamente (Taller 1 ya enlaza al product brief); no hace falta construir nada. |
| B10 | Ejercicios autoevaluables | Si el check es diff contra checkpoint, es B9 con otro nombre. Si juzga si la definición de producto está "bien", contradice la postura de no evaluar. |
| B2 | Instrucciones de arranque por taller | La app no cambia de taller a taller — solo clonar/hacer checkout al tag correspondiente. Bajo valor diferencial. |
| B12 | Transcripción buscable | El video es territorio de Netzun, no de Buildwise (brief: *"los videos... se quedan en Netzun"*) — aunque sirva a una persona declarada (llega por grabación), opera sobre un artefacto fuera de nuestro alcance. |
| B14 | Fragmentos compartibles | Mismo motivo que B12: opera sobre el video, no sobre el método versionado. |

**Nota aparte — fuera de personas declaradas:** el brief lista exactamente 3
usuarios objetivo, todos alumno (sigue ruta / se suma a mitad / llega por
grabación). Docente (B16, B17, B18) y comunidad/negocio (B19, B20, B21) no
son personas declaradas en el brief — caen antes de competir por cualquier
criterio, no por perder la matriz.

## Matriz de puntuación — candidato × criterio

Los 5 criterios son los de [`criterios/priorizacion.md`](/criterios/priorizacion):
flujo real, no memorizar, origen en sesión, replicable, sin login.

| # | Candidato | Flujo real | No memorizar | Origen sesión | Replicable | Sin login | Total |
|---|---|:-:|:-:|:-:|:-:|:-:|:-:|
| B2 | Instrucciones arranque por taller | ✅ | ✅ | ✅ | ✅ | ✅ | 5 |
| B5 | Conector MCP plantillas+criterios | ✅ | ✅ | ✅ | ✅ | ✅ | 5 |
| B8 | Diagnóstico de mi repo | ✅ | ✅ | ✅ | ✅ | ✅ | 5 |
| B9 | Comparar entregable vs referencia | ✅ | ✅ | ✅ | ✅ | ✅ | 5 |
| B10 | Ejercicios autoevaluables | ✅ | ✅ | ✅ | ✅ | ✅ | 5 |
| B13 | Capítulos enlazados al contenido | ✅ | ✅ | ✅ | ✅ | ✅ | 5 |
| B1 | Descarga checkpoint 1 clic | ✅ | ✅ | ❌ | ✅ | ✅ | 4 |
| B3 | Preview desplegado checkpoint | ❌ | ✅ | ✅ | ✅ | ✅ | 4 |
| B11 | Notas personales sobre material | ✅ | ✅ | ❌ | ✅ | ✅ | 4 |
| B12 | Transcripción buscable | ❌ | ✅ | ✅ | ✅ | ✅ | 4 |
| B14 | Fragmentos compartibles | ❌ | ✅ | ✅ | ✅ | ✅ | 4 |
| B15 | Glosario cruzado | ✅ | ✅ | ❌ | ✅ | ✅ | 4 |
| B16 | Captura de dudas por clase | ✅ | ✅ | ✅ | ✅ | ❌ | 4 |
| B4 | Mapa ruta con dependencias | ✅ | ✅ | ❌ | ✅ | ✅ | 3 |
| B17 | Feedback por sección | ✅ | ✅ | ❌ | ✅ | ❌ | 3 |
| B18 | Analítica lectura/abandono | ✅ | ✅ | ❌ | ✅ | ❌ | 3 |
| B19 | Muro entregables con permiso | ❌ | ✅ | ❌ | ✅ | ❌ | 2 |
| B20 | Aviso correo nueva clase | ❌ | ✅ | ❌ | ✅ | ❌ | 2 |
| B6 | Progreso/checklist módulo | ❌ | ✅ | ❌ | ❌ | ❌ | 1 |
| B7 | Bitácora entregables | ❌ | ✅ | ❌ | ❌ | ❌ | 1 |
| B21 | Certificado al completar | ❌ | ✅ | ❌ | ❌ | ❌ | 1 |

Empate arriba (B2, B5, B8, B9, B10, B13 en 5/5): los 5 criterios del brief no
bastan solos para desempatar — de ahí los descartes de la sección anterior
(scope, redundancia, contradice "no evalúa"), que sí rompen el empate a favor
de B5.
