# Distribuir el contenido del curso como servidor MCP

**Estado:** Aceptada
**Fecha:** Taller 2 (registrado el 2026-09-23)
**Quién decide:** Freider Achic
**ADRs relacionados:** Ninguno

---

## Contexto

Buildwise tiene que poner plantillas y criterios del curso al alcance del agente de cada alumno, en su propio proyecto, sin que los busque y copie a mano, sin login y sin tocar la estructura de su proyecto ([product brief](../product-brief.md), [decisión de producto](../proyecto/decision-producto.md)).

En el taller 2 se le planteó ese problema al agente sin nombrarle alternativas. Aparecieron dos formas: un servidor MCP y skills. La decisión se tomó en clase: servidor MCP, porque sirve mejor para enseñar y porque una skill no se actualiza sola. El plan de ese taller era dejar la alternativa anotada sin decidir (CA-4 de [taller-2-contenido](../specs/taller-2-contenido.md)); se registra aquí tal como pasó. Que sea remoto viene del plan de la ruta; la razón de medir el uso se agregó al registrarlo. Ver [hallazgos del taller 2](../hallazgos-taller-02.md).

## Decisión

El conector es un **servidor MCP remoto y de solo lectura** que entrega al agente del alumno lo que está en `templates/` y `criterios/` de este repositorio, desde una sola fuente.

Remoto porque así lo planea la ruta: se publica en el taller 9 y el taller 11 mide su uso. Dónde y cómo se aloja se decide en el diseño técnico (taller 4). El spike del taller 2 fue un servidor local: servía para probar si el agente lo llamaba, no es la forma de distribución.

## Alternativas consideradas

### Skills (sueltas o dentro de un plugin)

**Veredicto:** Rechazada

- **Son una copia.** La skill vive en el entorno del alumno. Instalada por plugin se puede actualizar, pero el alumno tiene que hacerlo; si no, trabaja con una plantilla o un criterio viejo sin saberlo. Un servidor remoto entrega siempre la versión vigente del curso. (Un servidor MCP local instalado como paquete tendría el mismo problema: por eso la decisión es remoto.)
- **No se puede medir.** Con un servidor remoto se sabe qué herramientas se usan y cuáles fallan (telemetría del taller 11). Una skill no deja ninguna señal de uso.
- **No hay nada que construir.** Una skill es markdown. El curso enseña a construir producto con agentes: en el taller 6 se consumen MCPs, en el 8 se publica uno, en el 9 se revisa y en el 10 se depura. Con skills, esa ruta no tendría software que diseñar, desplegar, probar ni arreglar.

Lo que **no** es razón: "un servidor sirve más contenido". Una skill también puede traer varios archivos.

### Servidor MCP

**Veredicto:** Aceptada

Una sola fuente viva, con uso medible, y un producto real que el curso diseña, construye, publica y depura.

## Consecuencias

### Lo positivo

- El alumno recibe siempre el contenido vigente, sin copiar ni actualizar nada.
- Se puede medir qué herramientas se usan y cuáles fallan.
- La ruta del curso tiene un artefacto de software completo para los talleres 4 a 11.
- Las capacidades de fase 2 (B8, B9) se agregan al mismo servidor.

### Restricciones / limitaciones

- Hay que alojar y mantener un servidor: tiene costo y puede caerse. Dónde y cómo, en el taller 4.
- El agente del alumno tiene que soportar MCP.
- **No resuelve el descubrimiento:** en el spike, con un pedido indirecto, el agente no usó la herramienta (2 de 3). Ese problema existe igual con skills; queda como pregunta abierta en la especificación del conector.

### Cuándo revisar esta decisión

- Si el costo de mantener el servidor supera lo que aporta frente a un plugin con skills.
- Si las evaluaciones del taller 10 muestran que el agente descubre mucho peor el servidor que una skill equivalente.
