# Contenido de taller 5

| Campo | Valor |
|-------|-------|
| **Estado** | Borrador |
| **Módulo** | Contenido del curso |
| **Depende de** | Nada nuevo en `main` |
| **Diseño técnico** | Ninguno (el render ya está en [Renderizado de talleres (MDX)](./render-talleres.md)) |
| **ADR relacionado** | [Formato de contenido para talleres](../adrs/content-format-for-workshops.md), [Estructura de presentación en clase](../adrs/estructura-de-presentacion-en-clase.md) |

---

## 1. Resumen

Hasta el taller 4, el alumno trabajó con un agente a la vez, en una sola copia del proyecto. El taller 5 muestra cómo se organiza el trabajo cuando el agente escribe y uno revisa: cada tarea en su propio espacio, con su agente, y el docente revisando diffs en vez de teclear. Lo muestra con el entorno real del docente, resolviendo en vivo tareas pequeñas del curso, y una de ellas llega como interrupción a mitad de otra. También cuenta cómo nacen las skills, de algo que se repite, y cuándo se retiran.

Los talleres son mensuales y en vivo. Este no es un paso a paso: es una demostración con material para llevar. El producto no gana funciones. Este spec define el contenido que alimenta `docs/curso/taller-5.mdx`.

## 2. Alcance

**Incluye**
- **Apertura:** del conector construido en el taller 4 a preparar el terreno de trabajo.
- **Pregunta:** *"Estás a mitad de una tarea y llega un bug urgente. ¿Qué haces con lo que tenías a medias?"*. Se retoma en el Cierre.
- **Concepto, tres ideas:**
  - *El entorno tiene capas,* y cada salto (terminal, agente, editor, orquestador, nube) responde a un dolor. El orquestador es la capa que se enseña hoy.
  - *Una tarea, un espacio, un agente; y tú revisas.* Aislar cada tarea en su propio espacio (un worktree) permite atender una interrupción sin perder lo que estabas haciendo. El aislamiento tiene límites: separa el código, no todo lo que comparte la máquina.
  - *Las skills nacen de una repetición y se retiran cuando sobran.* Historias reales del docente: skills que nacieron y siguen en uso, y una que se retiró porque el modelo ya no la necesitaba. Qué distingue una buena skill. Una skill da procedimiento; un MCP da capacidad. Ejemplo: darle al agente un navegador para que compruebe su propio trabajo antes de que tú lo revises, un patrón con varias formas de resolverlo. Y las skills y plugins de otros: qué instalan de verdad, porque pueden ejecutar código en tu máquina en cada sesión.
- **Aplicación:** el docente resuelve en vivo una tarea principal y atiende una interrupción, cada una en su espacio. Revisa el resultado de cada una y la lleva de commits atómicos a PR y, si el tiempo alcanza, a merge; el tag del taller 4 queda para después de clase. Termina revisando en pantalla qué datos envía el propio entorno (telemetría, audio del dictado) y apagando lo que no hace falta. La página dice qué observar en cada momento y trae los prompts usados.
- **Cierre:** la pregunta retomada y qué se lleva el alumno a su proyecto: su próxima tarea en su propio espacio y una primera skill para algo que repite, creada por su agente y ajustada con el uso.
- **Extra (para leer después):** cómo montar el entorno, con orquestador y sin él; qué revisar antes de instalar; cuándo usar skill, MCP, hook o `AGENTS.md`; formas de darle un navegador al agente y su costo; lecturas.

**No incluye — y por qué**
- Construir o cambiar el conector — este taller prepara el terreno; no construye.
- Trabajar en paralelo sobre un mismo trabajo — es el taller 8.
- Revisión de código a fondo (revisores automáticos, rúbricas) — es el taller 9. Aquí la revisión es el gesto mínimo.
- Publicar las skills del docente o una plantilla de skill — cada alumno crea las suyas con su agente.
- Presentar el orquestador del docente como la única opción — el mapa de capas nombra alternativas.
- Minutos, guion y material de respaldo — viven fuera de este repo (ADR de estructura).
- Cuestionario del taller — vive en la plataforma, aparte.

## 3. Cómo lo usa quien lo usa

**El alumno**

1. Sigue la sesión en vivo → mira la demo, sin reproducirla en su máquina. Ve cómo se atiende una interrupción sin perder la tarea principal, y se lleva el mapa de capas y la idea de una tarea por espacio.
2. Ve la grabación o abre la página después → encuentra qué observar en cada momento de la demo, los prompts y, en Extra, cómo montar su entorno.
3. Se suma en el taller 5 → puede seguirlo sin haber hecho los talleres anteriores: es una demostración y no hay punto de control nuevo.
4. No quiere instalar un orquestador → monta el mismo flujo a mano, con la receta de Extra.
5. Quiere su primera skill → elige algo que repite, se la pide a su agente con el prompt del Cierre, la revisa con lo que distingue una buena skill y la ajusta con el uso.
6. Ya instaló skills o plugins de terceros → revisa qué instaló de verdad, con la lista de Extra.

**El docente, en vivo**

7. Un agente tarda más de lo previsto → atiende la otra tarea mientras tanto: es lo que muestra el taller.
8. El dictado no entiende un término → pega el prompt desde la página.
9. Nadie responde la Pregunta → da su propia respuesta: qué hacía antes con lo que tenía a medias.
10. El tiempo se atrasa → recorta en este orden: el merge (el PR queda abierto), el PR de la interrupción, la portada, el ADR.
11. La demo falla → sigue desde un respaldo preparado y lo dice.

## 4. Criterios de aceptación

- **TALLER5-1** — Cuando el alumno abre la página del taller 5, la página debe mostrar las secciones en el orden del ADR de estructura: Apertura, Pregunta, Concepto, Aplicación, Cierre, Extra.
- **TALLER5-2** — La página debe tener como máximo tres ideas en Concepto.
- **TALLER5-3** — Cuando el alumno llega a la Pregunta, la página debe mostrarla, y el Cierre debe retomarla.
- **TALLER5-4** — Cuando el alumno llega a la primera idea, la página debe mostrar las capas del entorno y en cuál está el orquestador.
- **TALLER5-5** — Cuando el alumno llega a la segunda idea, la página debe decir qué aísla un worktree y qué no.
- **TALLER5-7** — Cuando el alumno llega a la tercera idea, la página debe contar de qué repetición nació cada skill del docente y por qué una se retiró.
- **TALLER5-8** — Cuando el alumno llega a la tercera idea, la página debe distinguir lo que da una skill de lo que da un MCP, con el ejemplo de darle un navegador al agente.
- **TALLER5-9** — La página no debe incluir el contenido completo de ninguna skill del docente.
- **TALLER5-10** — Cuando el alumno llega a Aplicación, la página debe decir qué observar en cada momento de la demo.
- **TALLER5-11** — Cuando el alumno llega a un momento con prompt, la página debe mostrar el prompt completo, en un bloque que se pueda copiar.
- **TALLER5-12** — Cuando el alumno llega a Aplicación, la página debe decir qué no se hace en vivo y por qué.
- **TALLER5-13** — Cuando el alumno llega a la tercera idea, la página debe decirle qué puede instalar de verdad una skill o un plugin de terceros. Cuando llega a Aplicación, debe decirle qué datos envía su entorno y cómo apagarlos. Cuando llega a Extra, debe tener la lista de qué revisar antes de instalar.
- **TALLER5-14** — Cuando el alumno llega al Cierre, la página debe darle la tarea para su proyecto propio.
- **TALLER5-15** — Cuando el alumno llega a Extra, la página debe decirle cómo montar el entorno con orquestador y sin él.
- **TALLER5-16** — La página debe referirse a sesiones anteriores por número ("en el taller 4"), nunca con fechas relativas.

## 5. Preguntas abiertas

Ninguna.
