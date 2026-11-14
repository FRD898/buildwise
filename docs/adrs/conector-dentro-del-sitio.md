# El conector vive dentro del sitio y entrega el contenido de cada despliegue

**Estado:** Aceptada
**Fecha:** Taller 4 (registrado el 2026-11-14)
**Quién decide:** Freider Achic
**ADRs relacionados:** [Distribuir el contenido del curso como servidor MCP](distribuir-como-servidor-mcp.md)

---

## Contexto

El ADR anterior decidió que el conector es un servidor MCP remoto y de solo lectura, y dejó para el taller 4 dónde y cómo se aloja. La [spec](../specs/conector-buildwise.md) pide que el alumno reciba siempre la versión vigente de `templates/` y `criterios/` sin reinstalar ni actualizar nada (CONECTOR-16), y que la lista y el contenido coincidan con lo publicado (CONECTOR-1 a 4).

El sitio del curso ya se publica desde `main` en Vercel y ya lee esos mismos archivos. Hay que decidir tres cosas que van juntas: dónde corre el conector, de dónde saca el contenido que entrega y por qué protocolo le habla el agente del alumno. El detalle está en el [diseño técnico, §7](../system-design/conector-buildwise.md#7-decisiones-y-alternativas).

## Decisión

El conector es una ruta **dentro del sitio**, en el mismo proyecto de Vercel y el mismo repositorio. Entrega el contenido que **trae cada despliegue de `main`**, sin leerlo de otro lugar y sin caché propia.

"Publicado" pasa a significar "lo que incluye el último despliegue de `main`". Un cambio llega a los alumnos cuando termina ese despliegue; el objetivo es 10 minutos desde que el cambio llega a `main`.

El agente del alumno llega por **HTTP remoto directo**, con el transporte HTTP de MCP (*Streamable HTTP*) en modo pedido y respuesta: sin sesión y sin estado entre pedidos. El alumno agrega una dirección a su agente y nada más; no instala ni actualiza nada.

**Por qué este protocolo:** es el único de los transportes de MCP que llega a un servidor remoto sin que el alumno instale algo en su máquina, que es justo lo que el ADR anterior le reprochó a las skills. Y como cada pedido se responde de una vez y sin sesión, corre en las funciones sin servidor de Vercel donde ya vive el sitio, sin mantener conexiones abiertas.

## Alternativas consideradas

### Dónde corre y de dónde saca el contenido

### Leer de GitHub (`main`) en cada pedido

**Veredicto:** Rechazada

- El cambio llega al instante, pero el conector depende de que GitHub responda.
- Sin credenciales, GitHub limita los pedidos.
- Entregaría un cambio roto antes de que el despliegue lo compruebe.

### Copiar el contenido a un almacenamiento aparte

**Veredicto:** Rechazada

Una base de datos o un almacén de archivos, con un paso de sincronización. Agrega un sistema que mantener y un momento en que el sitio y el conector difieren, para siete archivos.

### Otro proyecto de Vercel, con su propio repositorio o carpeta

**Veredicto:** Rechazada

Habría que traer o sincronizar los archivos del curso, y dos despliegues pueden dejar el sitio y el conector en versiones distintas.

### Otro proveedor de funciones

**Veredicto:** Rechazada

Otro proveedor, otra cuenta y otro despliegue, por una ruta que corre bien donde ya se publica el sitio.

### Dentro del sitio, con el contenido del despliegue

**Veredicto:** Aceptada

Un solo despliegue, un solo lugar donde ver errores, y la lista y el contenido salen de la misma versión que muestra el sitio.

### Por qué protocolo llega el agente

Ver [diseño, §7](../system-design/conector-buildwise.md#cómo-llega-el-agente-al-servidor-http-remoto-directo).

#### Servidor local instalado como paquete (stdio)

**Veredicto:** Rechazada

Ya descartado en el ADR anterior: es una copia que el alumno tiene que actualizar, y no deja medir el uso.

#### Puente local que reenvía al servidor remoto

**Veredicto:** Rechazada como camino principal

Sirve para agentes que solo hablan con procesos locales, pero obliga a instalar algo y a mantenerlo al día. Queda como indicación aparte para esos agentes.

#### Transporte antiguo con conexión abierta y sesión (HTTP + SSE)

**Veredicto:** Rechazada

Mantiene estado por conexión, que no calza con funciones sin servidor ni con la regla de no guardar estado entre pedidos. Las herramientas del conector responden de una vez: no necesitan una conexión abierta.

#### HTTP remoto directo, sin sesión

**Veredicto:** Aceptada

El alumno solo agrega una dirección (spec, sección 1 y CONECTOR-16), y el servidor corre donde ya corre el sitio.

## Consecuencias

### Lo positivo

- El sitio y el conector nunca muestran versiones distintas del contenido.
- No hay otro sistema que mantener ni otra cuenta que pagar.
- Un cambio roto no llega a los alumnos: si el despliegue falla, se sigue entregando la versión anterior.
- Volver atrás es volver al despliegue anterior; la dirección no cambia y los alumnos no reconfiguran nada.

### Restricciones / limitaciones

- Un fallo de construcción del sitio también bloquea al conector.
- Volver a un despliegue anterior revierte el sitio y el conector juntos.
- Un cambio no llega al instante: espera a que termine el despliegue.
- El agente del alumno tiene que aceptar servidores MCP remotos por HTTP; si solo acepta procesos locales, necesita el puente.
- La dirección es lo más caro de cambiar: cambiarla obliga a cada alumno a reconfigurar su agente.

### Cuándo revisar esta decisión

- Si el conector necesita un acceso distinto al del sitio, u otro ritmo de despliegue.
- Si en fase 2 necesita permisos sobre el repositorio del alumno.
- Si los primeros cambios reales no cumplen el objetivo de 10 minutos (CONECTOR-16).
