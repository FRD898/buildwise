# Buildwise — Product Brief

## Qué es
**Buildwise** es la aplicación companion de la ruta "Product Builder con IA" de Netzun: once talleres, del problema al producto en producción, con agentes de IA.

No reemplaza al curso — los videos, la inscripción y el certificado se quedan en Netzun. Buildwise es donde vive el **método**: los criterios, plantillas y decisiones que se construyen en vivo en cada taller, versionados en un repositorio público, y expuestos al agente de código del propio alumno.

## El problema
Un ingeniero de software que recibe tareas ya especificadas sabe programar, pero no ha practicado el ciclo completo: decidir qué construir, definirlo antes de que un agente lo ejecute, diseñarlo, revisarlo, publicarlo y medirlo. Ese ciclo es lo que separa a alguien que ejecuta de alguien que puede asumir un producto de punta a punta — un **product builder**.

Enseñar ese salto solo mostrando documentos (brief, PRD, diseño técnico, ADR) falla de dos formas. Si se presentan como estructura a memorizar, el alumno aprende a llenar secciones, no a decidir cuándo un cambio necesita diseño o qué hace verificable un criterio de aceptación — vuelve a ejecutar, ahora con más papeleo. Y si el método se queda en una página web separada del editor, no convive con el lugar donde el alumno realmente trabaja.

## Nuestra postura
La IA no elimina el criterio de producto, diseño o ingeniería — reduce el costo de producir y explorar, de modo que una persona pueda asumir más del ciclo y pedir ayuda especializada cuando el riesgo lo exige. El nivel *staff* deja de ser el techo de la carrera y se vuelve el piso: la IA absorbe la ejecución, y lo que queda del lado humano es entender, definir, delegar y revisar. El nuevo piso exige criterio, y el criterio se construye con contexto — no con más documentos, con mejores.

## Nuestra solución
Buildwise es **spec-driven development enseñado como cambio de rol, no como plantilla que llenar**. Los documentos que se comparten (brief, PRD, diseño técnico, ADR) son ejemplos de referencia, no un estándar obligatorio: lo que importa es entender **para qué sirve cada uno** — qué decisión sostiene, quién lo lee después, qué evita que un agente adivine — y cada alumno adapta esa estructura a su propio flujo.

El contenido y los criterios viven como **markdown versionado en un repositorio público** — un punto de control descargable por taller — y se exponen al agente del propio alumno como referencia, para que estén disponibles en el momento de trabajar, sin que haga falta memorizarlos ni copiarlos a mano. Qué forma toma exactamente esa exposición es una decisión de producto, no un hecho de este brief: se decide en el taller 1, sobre un backlog de candidatos y criterios explícitos — no técnicos —, y se documenta ahí.

## Capacidades clave

**Contenido del curso**
- Los once talleres en markdown, publicados uno a uno conforme avanza la ruta
- Un punto de control (`docs/`, `templates/`, `criterios/`) por taller, replicable desde cero

**Sistema de diseño**
- Identidad visual propia, versionada, aplicada a partir del taller 7

## Cómo nos diferenciamos
- Enseña **el rol de product builder**, no una lista de features de IA: qué cambia cuando una persona puede asumir producto, diseño, construcción y calidad a la vez
- Las plantillas se presentan como **referencia adaptable**, no como estándar: el objetivo es que el alumno entienda el propósito de cada documento y decida cuándo lo necesita, no que reproduzca su estructura de memoria
- El método no se explica, **se usa**: se pone disponible dentro del flujo de trabajo real del alumno, no en una página aparte
- Cada artefacto que se sirve tiene origen rastreable en una sesión del curso — no hay contenido inventado para llenar un catálogo
- El repositorio es público y con puntos de control por taller: cualquiera puede replicar el estado exacto de cualquier taller, sin depender de haber visto los anteriores

## Usuarios objetivo
- **El alumno que sigue la ruta** — usa el método taller a taller para aplicarlo sobre su propio proyecto
- **El alumno que se suma a mitad de ruta** — descarga el punto de control de ese taller y arranca sin depender de lo anterior
- **El que llega por la grabación, meses después** — encuentra el contenido y el repositorio en el mismo estado en que se dictó esa clase

## Qué no es
- No es una base de conocimiento general de patrones de ingeniería — el contenido se limita a lo que la ruta enseña, no a documentar teoría de software en general.
- No tiene autenticación ni cuentas — todo el contenido es público, igual que el repositorio.
- No evalúa ni califica automáticamente el trabajo del alumno — compara contra un punto de control de referencia, no emite un veredicto.
- No es un catálogo de skills para terceros — sí construimos las propias del curso, pero viven en este repositorio, no se publican como paquete independiente.

## Visión
Que un ingeniero de software recorra el ciclo completo de un producto — entender el problema, definirlo, diseñarlo, construirlo, revisarlo, publicarlo y medirlo — sin separar velocidad, calidad y responsabilidad, y sostenga cada decisión ante quien pregunte por qué. Un back end que asume también front end, diseño y calidad; y a la inversa.
