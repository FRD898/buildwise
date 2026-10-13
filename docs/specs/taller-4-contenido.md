# Contenido de taller 4

| Campo | Valor |
|-------|-------|
| **Estado** | Borrador |
| **Módulo** | Contenido del curso |
| **Depende de** | `docs/specs/conector-buildwise.md` revisada (`taller-03-fin`); `templates/diseno-tecnico.md` y `criterios/revisar-diseno.md` en `main` |
| **Diseño técnico** | Ninguno (el render ya está en [Renderizado de talleres (MDX)](./render-talleres.md)) |
| **ADR relacionado** | [Formato de contenido para talleres](../adrs/content-format-for-workshops.md), [Estructura de presentación en clase](../adrs/estructura-de-presentacion-en-clase.md), [Distribuir como servidor MCP](../adrs/distribuir-como-servidor-mcp.md) |

---

## 1. Resumen

Taller 3 dejó la spec del conector revisada y con cinco `[PENDIENTE]` que mandan al diseño técnico. Taller 4 escribe ese diseño con un agente, lo revisa con otro y, en la misma sesión, construye las herramientas que fija el diseño, con pruebas que citan los criterios de la spec. Termina con el conector respondiendo en local a tres pedidos. Cambia el plan original (terminar en un documento) por el feedback de que los talleres eran muy teóricos: la teoría se reduce a lo necesario para juzgar lo que produce el agente. Este spec define el contenido que alimenta `docs/curso/taller-4.mdx`, para el alumno que está en vivo y para el que ve la grabación después.

## 2. Alcance

**Incluye**
- **Apertura:** los cuatro tiempos del ADR. Dónde estamos apunta a la spec del conector y a sus cinco pendientes. El cambio de plan se presenta como una decisión de producto a la vista ("recibimos feedback"), sin señalar a nadie.
- **Pregunta:** *"¿Alguna vez un agente te construyó algo que funcionaba por sí solo, pero no encajaba con el resto: duplicaba algo que ya existía o rompía otra parte?"* Se retoma en la segunda idea, al leer el diseño y en el Cierre.
- **Concepto, dos ideas.** Cuatro nombres en total: design doc (Google), system design, Mermaid (texto que se dibuja como diagrama), MCP (el protocolo con el que un agente usa servicios externos).
  - *¿Este cambio necesita diseño?* Tabla de tres filas según riesgo, no tamaño: pedido directo; spec sin diseño; spec y diseño (componente nuevo, datos, contrato o difícil de deshacer). Es el primer bloque de `criterios/revisar-diseno.md`: "no necesitaba diseño" también es una revisión.
  - *Qué va en un system design, y qué no.* Tabla va / no va. Cada componente se marca nuevo, existente o modificado: es lo que responde la pregunta de apertura. Sin código ni casi código: lo que el diseño no decide lo decide el agente, y lo que es detalle se le deja. Link a `templates/diseno-tecnico.md`; es referencia, no formulario.
- **Aplicación, cuatro partes con el agente:**
  - *Parte 1, diseño:* un prompt copiable que pide `docs/system-design/conector-buildwise.md` con la plantilla, alternativas comparadas para cada decisión grande, qué aplica y qué no del artículo de Anthropic sobre herramientas, un diagrama Mermaid y una respuesta o un `[PENDIENTE]` con dueño para cada pendiente de la spec. No le dice qué elegir. Quien hace la práctica apuesta antes de lanzarlo. Mientras el agente escribe, un segundo prompt copiable genera una explicación interactiva de MCP (herramientas, recursos y prompts), que se contrasta con la página oficial de arquitectura. Al terminar se lee el diseño en tres lugares: el diagrama (dónde entra en lo que ya existe), el contrato de las herramientas y los pendientes de la spec.
  - *Revisión breve:* prompt copiable, en una sesión nueva, con el diseño, la spec y la rúbrica; máximo cinco hallazgos. Solo se corrige lo que bloquea construir.
  - *Parte 2, construir:* prompt copiable que pide primero una prueba por criterio del conector (CONECTOR-1 a 4, 13 y 14) más un nombre con `../`, y correrlas para verlas fallar; recién después, las herramientas del contrato del diseño, donde el diseño las ubica. Cada prueba lleva el código del criterio en su nombre. Las pruebas salen de la spec antes de que exista el código. Termina con todas las pruebas pasando.
  - *Parte 3, tres pedidos:* comandos copiables para levantar el sitio y conectarlo al agente, y una sesión abierta desde un directorio fuera del repositorio, con por qué. Tres pedidos: por nombre, por otro nombre y el indirecto del taller 2. Apuesta antes. Se mira si el agente llamó la herramienta y si mostró el contenido sin cambiarlo (CONECTOR-6).
- **Cierre:** retomar la pregunta. Entregable: el diseño revisado y las herramientas con sus pruebas en verde, en `taller-04-fin`. Tarea para el proyecto propio: ubicar su funcionalidad en la tabla de la primera idea y, si cae en la tercera fila, escribir el diseño y pedir la revisión. Gancho al taller 5.
- **Extra (para leer después):** el flujo commit → PR → revisión automática → merge, hecho con lo del día; dónde buscar servidores MCP (registro oficial y de GitHub) y por qué instalarlos como una dependencia; tabla design doc largo vs. system design; lecturas.

**No incluye — y por qué**
- Publicar el conector — el merge y el deploy pasan entre el taller 4 y el 5, fuera de cámara; el taller 5 lo abre publicado.
- Escribir o editar la plantilla y la rúbrica en clase — llegan con `taller-04-inicio`.
- Elegir el SDK de MCP antes de construir — es implementación: lo elige el agente en la Parte 2 y se revisa en su código, como cualquier otra decisión de implementación.
- Probar los criterios de la capa del agente (CONECTOR-5 a 11, 19 y 20) — los tres pedidos de la Parte 3 no son la evaluación; los pedidos de prueba se escriben en el taller 10.
- Que el pedido indirecto funcione — sigue fuera de la v1 del conector; si falla en la Parte 3, es dato.
- Reabrir MCP vs. skills — ya decidido en el ADR del taller 2.
- Material de respaldo (diseño, crítica del revisor, rama de rescate) — vive solo en la máquina del docente hasta después de clase: publicado antes sería la respuesta de la práctica. El alumno ve la rama de rescate solo si se usa en vivo.
- Minutos y guion de dictado — el ritmo en vivo se define fuera de este repo (ADR de estructura).
- Cuestionario del taller — vive en la plataforma, aparte.

## 3. Cómo lo usa quien lo usa

1. El alumno sigue la sesión en vivo → hace las cuatro partes con su agente y termina con el diseño revisado y el conector respondiendo en local.
2. El alumno ve la grabación o abre la página después → encuentra en la página los prompts copiables de cada parte, los comandos para conectar el conector y los links a la plantilla y la rúbrica.
3. El alumno se suma en el taller 4 → parte de `taller-04-inicio`, que ya trae la spec revisada, la plantilla, la rúbrica y el comando de pruebas; sin pruebas del conector ni dependencias de MCP: las agrega el agente en la Parte 2.
4. El alumno quiere aplicarlo a su proyecto → la tarea del Cierre le dice cómo decidir si necesita diseño y qué hacer si lo necesita.
5. Si el agente escribe un diseño que no sirve para la práctica → el docente sigue con el diseño de respaldo.
6. Si el diseño decide distinto que el diseño de respaldo → se discute al leerlo; si no se resuelve ahí, la Parte 2 sigue con el diseño de respaldo, para que el rescate encaje.
7. Si las pruebas no pasan a mitad de la Parte 2 → se achica a la herramienta que entrega un artefacto, con su respuesta de "no existe"; el resto queda para después.
8. Si al final de la Parte 2 sigue sin pasar → el docente cambia a la rama de rescate y lo dice; lo que falló se mira en el taller 10.
9. Si la explicación de MCP falla o tarda → el docente muestra la tabla herramientas / recursos / prompts y vuelve al diseño.
10. Si nadie responde la pregunta de apertura → el docente da un ejemplo propio o el de este repo (una segunda lista de plantillas que se desalinea con la del sitio).
11. Si el tiempo se atrasa → se recorta Extra, luego la explicación de MCP se reemplaza por la tabla, luego el diseño se reduce al diagrama; Parte 2, Parte 3 y Cierre no se tocan.
12. Si el agente mete código en el diseño → se corrige en vivo, como ejemplo de lo que no va.

## 4. Criterios de aceptación

**La página**
- **TALLER4-1** — Cuando el alumno abre la página del taller 4, la página debe mostrar las secciones en el orden del ADR de estructura: Apertura, Pregunta, Concepto, Aplicación, Cierre, Extra.
- **TALLER4-2** — La página debe tener como máximo dos ideas en Concepto.
- **TALLER4-3** — Fuera de Extra y las lecturas, la página debe nombrar solo estas fuentes: en Concepto, design doc (Google), system design, Mermaid y MCP; en Aplicación, además, el artículo de Anthropic sobre herramientas y la página oficial de arquitectura de MCP.
- **TALLER4-4** — Cuando el alumno llega a la primera idea, la página debe mostrar la tabla de tres filas que decide si un cambio necesita diseño.
- **TALLER4-5** — Cuando el alumno llega a la segunda idea, la página debe enlazar `templates/diseno-tecnico.md` y `criterios/revisar-diseno.md` en vez de copiar su contenido.
- **TALLER4-6** — Cuando el alumno llega a cada parte de Aplicación que usa un prompt, la página debe mostrar el prompt completo, en un bloque que se pueda copiar.
- **TALLER4-7** — El prompt de la Parte 1 no debe decirle al agente qué herramientas, cuántas ni qué transporte elegir.
- **TALLER4-8** — El prompt de la Parte 1 debe pedir el diseño sin código, versiones de librerías ni estructura de carpetas interna.
- **TALLER4-9** — Cuando el alumno llega a la revisión breve, la página debe decirle que se hace en una sesión nueva.
- **TALLER4-10** — Cuando el alumno llega a la revisión breve, la página debe decirle que solo se corrige lo que bloquea construir.
- **TALLER4-13** — Cuando el alumno llega a la Parte 3, la página debe mostrar los comandos para levantar el sitio y conectarlo al agente.
- **TALLER4-14** — Cuando el alumno llega a la Parte 3, la página debe decir por qué la sesión se abre fuera del repositorio.
- **TALLER4-15** — Cuando el alumno llega a la Parte 3, la página debe decir que los tres pedidos no son la evaluación del conector.
- **TALLER4-16** — Cuando el alumno llega al Cierre, la página debe nombrar `docs/system-design/conector-buildwise.md` y las pruebas del conector como entregables.
- **TALLER4-17** — Cuando el alumno llega al Cierre, la página debe nombrar `taller-04-fin` como punto de control.
- **TALLER4-18** — Cuando el alumno llega al Cierre, la página debe darle la tarea para su proyecto propio.
- **TALLER4-19** — La página debe referirse a sesiones anteriores por número ("en el taller 3"), nunca con fechas relativas.
- **TALLER4-31** — Cuando el alumno llega a la Pregunta, la página debe mostrarla, y el Cierre debe retomarla.
- **TALLER4-32** — El prompt de la Parte 2 debe pedir las pruebas antes que las herramientas, y que se corran y fallen antes de implementar.

**El repositorio**
- **TALLER4-20** — Cuando alguien parte de `taller-04-inicio`, el repositorio debe contener `docs/specs/conector-buildwise.md` revisada, `templates/diseno-tecnico.md` y `criterios/revisar-diseno.md`.
- **TALLER4-21** — Cuando alguien parte de `taller-04-inicio` y corre `pnpm test`, debe terminar sin errores y sin pruebas del conector.
- **TALLER4-22** — Cuando alguien parte de `taller-04-inicio`, `AGENTS.md` debe decir cómo correr las pruebas.
- **TALLER4-23** — Cuando alguien parte de `taller-04-inicio`, `pnpm install` debe bastar para correr `pnpm test`.
- **TALLER4-24** — En `taller-04-fin`, `docs/system-design/conector-buildwise.md` debe tener un diagrama Mermaid de los componentes.
- **TALLER4-25** — En `taller-04-fin`, `docs/system-design/conector-buildwise.md` no debe tener código ni versiones de librerías.
- **TALLER4-26** — En `taller-04-fin`, `docs/system-design/conector-buildwise.md` debe tener, para cada `[PENDIENTE]` de la spec del conector, una respuesta o un `[PENDIENTE]` que diga quién lo decide.
- **TALLER4-27** — En `taller-04-fin`, `pnpm test` debe pasar con al menos una prueba por cada uno de CONECTOR-1 a 4, 13 y 14, cada una con su código en el nombre.
- **TALLER4-28** — En `taller-04-fin`, `pnpm test` debe incluir una prueba que pida un nombre con `../` y reciba la respuesta de "no existe".
- **TALLER4-29** — En `taller-04-fin`, `docs/specs/conector-buildwise.md` debe enlazar el diseño en su campo "Diseño técnico".
- **TALLER4-30** — En ningún punto de control, `templates/` ni `criterios/` deben mencionar los talleres ni el conector.

## 5. Preguntas abiertas

- [PENDIENTE: ¿los clientes que usan los alumnos soportan herramientas MCP por HTTP sin pasos extra?] — El docente, antes del ensayo; si alguno no, la página de la Parte 3 lo dice.