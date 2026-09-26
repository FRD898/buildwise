# Conector Buildwise

| Campo | Valor |
|-------|-------|
| **Estado** | Revisado |
| **Módulo** | Conector Buildwise |
| **Depende de** | Las plantillas y los criterios publicados en el curso |
| **Diseño técnico** | Pendiente |
| **ADR relacionado** | [Distribuir el contenido del curso como servidor MCP](../adrs/distribuir-como-servidor-mcp.md) |

---

## 1. Resumen

Quien sigue el curso trabaja con un agente de IA en su propio proyecto, pero las plantillas (product brief, PRD, ADR) y los criterios para revisarlas viven en este repositorio: para usarlas tiene que buscarlas y copiarlas a mano, y lo que copia se queda viejo cuando el curso las actualiza. El conector Buildwise le entrega ese contenido a su agente, en el momento en que lo pide, tal como está en el curso y sin login.

Lo puede usar quien tenga un agente que acepte conectores MCP (el estándar con el que los agentes se conectan a servicios externos). Por qué esta forma y no otra está en el ADR.

**Términos que usa esta spec**
- **Plantillas:** los archivos de `templates/`, la estructura de ejemplo de cada documento (product brief, PRD, ADR).
- **Criterios:** los archivos de `criterios/`, preguntas para revisar un documento (ej.: cómo revisar un PRD) o para decidir algo (ej.: qué probar antes de construir).
- **Publicado:** lo que está en la rama `main` de este repositorio, la versión vigente del curso.

## 2. Alcance

**Incluye**
- Entregar una plantilla completa, idéntica al archivo publicado.
- Entregar unos criterios completos, idénticos al archivo publicado.
- Entregar la lista de plantillas y criterios publicados, cada uno con una descripción de una línea que escribe el curso.
- Responder que algo no existe cuando se pide una plantilla o unos criterios que el curso no tiene, junto con lo que sí existe.
- Entregar siempre la versión vigente: lo que se agrega o cambia en el curso le llega al alumno sin que reinstale ni actualice nada.

**No incluye — y por qué**
- Que el agente reconozca un pedido que no nombra el artefacto (ej.: "estoy empezando un producto, ¿con qué documento arranco?", esperando el product brief) — en la prueba del taller 2 este pedido falló y no se sabe todavía si se puede lograr; queda como pregunta abierta, no como criterio de esta versión.
- Revisar o calificar el documento del alumno — cada alumno adapta las plantillas y los criterios a su propio flujo, así que no hay una versión fija contra la cual calificar (product brief: "referencia adaptable, no estándar"). El conector entrega los criterios; aplicarlos es trabajo del alumno y su agente.
- Adaptar una plantilla al proyecto del alumno — el conector entrega la original; adaptarla lo hace el agente del alumno a partir de ella.
- Diagnosticar qué le falta del método al repositorio del alumno, o comparar su entregable con el de referencia — son capacidades de fase 2 del mismo conector (B8 y B9 en la [decisión de producto](../proyecto/decision-producto.md)).
- Crear, editar o borrar plantillas y criterios — el conector es de solo lectura; el contenido cambia en este repositorio.
- Contenido de los talleres (páginas de clase, videos) — el conector trae el método al proyecto del alumno, no reemplaza al curso.
- Cuentas, login o datos del alumno — todo el contenido es público, igual que el repositorio.
- Cómo se construye: qué herramientas expone, si lista o busca, dónde se aloja — va en el diseño técnico.

## 3. Cómo lo usa quien lo usa

Quien lo usa es el alumno, a través de su agente con el conector instalado.

**Camino normal**
1. El alumno pide una plantilla por su nombre ("pásame la plantilla de PRD") → recibe la plantilla tal cual está en el curso, sin resumir ni cambiar.
2. El alumno pregunta cómo revisar un documento ("¿cómo reviso mi PRD?") → recibe los criterios para revisar ese documento, no la plantilla.
3. El alumno pide criterios que no son para revisar un documento ("¿qué pruebo antes de construir?") → recibe esos criterios.
4. El alumno pregunta qué tiene el curso ("¿qué plantillas y criterios hay?") → recibe la lista, cada elemento con la descripción que escribió el curso.
5. El curso publica una plantilla nueva o corrige una existente → cuando el alumno la pide, recibe la versión nueva, sin hacer nada. [PENDIENTE: cuánto tarda en llegar después de publicarse].

**Errores**

6. El alumno pide una plantilla o unos criterios que el curso no tiene ("dame la plantilla de casos de uso") → se le dice que el curso no la tiene y cuáles sí; el agente no escribe una propia en su lugar.
7. El alumno pide criterios para revisar un documento que tiene plantilla pero no criterios (ej.: cómo revisar un ADR, si todavía no existen) → se le dice que no existen y cuáles sí; no recibe la plantilla en su lugar.
8. El conector no responde (caído o sin conexión) → [PENDIENTE: qué ve el alumno y si el agente debe decírselo explícitamente].

**Casos límite**

9. El alumno pide "la plantilla" sin decir cuál → recibe la lista para elegir; el agente no elige una por su cuenta.
10. El alumno pide varias cosas a la vez ("la plantilla y los criterios de PRD") → recibe todas, cada una completa.
11. El alumno usa otro nombre o pide en otro idioma ("el brief", "la spec", "PRD template") → [PENDIENTE: qué sinónimos e idiomas debe reconocer]. Lo que recibe está siempre en español, tal como está en el curso.
12. El alumno pide la plantilla ya adaptada a su proyecto → recibe la original; adaptarla queda en manos de su agente (ver "No incluye").
13. El alumno pide algo sin nombrar el artefacto ("estoy empezando un producto, ¿con qué documento arranco?") → fuera de esta versión (ver "No incluye"). [PENDIENTE: si se puede lograr que el agente use el conector aquí].

## 4. Criterios de aceptación

Dos capas, según quién responde. "El conector debe…" responde igual cada vez: se prueba una vez. "El agente del alumno, con el conector instalado, debe…" puede variar: se prueba en 3 de 3 intentos con pedidos redactados distinto, que se escriben después de construir. Los pedidos entre comillas de la sección 3 son ejemplos, no la lista de prueba.

**Entrega del contenido**
- **CONECTOR-1** — Cuando se le pide la plantilla de PRD, el conector debe entregar contenido idéntico a `templates/prd.md`.
- **CONECTOR-2** — Cuando se le pide cualquier plantilla publicada, el conector debe entregar contenido idéntico a ese archivo de `templates/`.
- **CONECTOR-3** — Cuando se le piden cualesquiera criterios publicados, el conector debe entregar contenido idéntico a ese archivo de `criterios/`.
- **CONECTOR-4** — Cuando se le pide la lista, el conector debe incluir exactamente las plantillas y los criterios publicados: ni uno de más, ni uno de menos.

**Pedidos del alumno**
- **CONECTOR-5** — Cuando el alumno pregunta cómo revisar su PRD, el agente del alumno, con el conector instalado, debe entregarle los criterios de revisión y no la plantilla, en 3 de 3 intentos con pedidos redactados distinto.
- **CONECTOR-6** — Cuando el alumno pide una plantilla por su nombre, el agente del alumno, con el conector instalado, debe mostrarle la plantilla idéntica a la que entregó el conector, sin resumirla ni cambiarla, en 3 de 3 intentos con pedidos redactados distinto.
- **CONECTOR-7** — Cuando el alumno pregunta qué plantillas y criterios tiene el curso, el agente del alumno, con el conector instalado, debe entregarle la lista del conector, en 3 de 3 intentos con pedidos redactados distinto.
- **CONECTOR-8** — Cuando el alumno pide "la plantilla" sin decir cuál, el agente del alumno, con el conector instalado, debe mostrarle la lista en vez de entregar una plantilla, en 3 de 3 intentos con pedidos redactados distinto.
- **CONECTOR-9** — Cuando el alumno pide varias plantillas o criterios en un mismo pedido, el agente del alumno, con el conector instalado, debe entregarle todos los que pidió, en 3 de 3 intentos con pedidos redactados distinto.
- **CONECTOR-10** — Si el alumno pide una plantilla o unos criterios que el curso no tiene, entonces el agente del alumno, con el conector instalado, debe decirle que el curso no los tiene en vez de escribir unos propios, en 3 de 3 intentos con pedidos redactados distinto.
- **CONECTOR-11** — Si el alumno pide criterios para revisar un documento que no tiene criterios, entonces el agente del alumno, con el conector instalado, no debe entregarle la plantilla de ese documento en su lugar, en 3 de 3 intentos con pedidos redactados distinto.

**La lista y lo que no existe**
- **CONECTOR-12** — Cuando se le pide la lista, el conector debe mostrar junto a cada elemento la descripción que escribió el curso para ese archivo.
- **CONECTOR-13** — Si se le pide una plantilla o unos criterios que no están publicados, entonces el conector debe responder que no existen.
- **CONECTOR-14** — Si se le pide una plantilla o unos criterios que no están publicados, entonces el conector debe incluir en la respuesta la lista de lo que sí existe.
- **CONECTOR-15** — Si se le piden criterios para revisar un documento que no tiene criterios, entonces el conector no debe entregar la plantilla de ese documento en su lugar.

**Versión y acceso**
- **CONECTOR-16** — Cuando se publica un cambio en `templates/` o `criterios/`, el conector debe entregar la versión nueva sin que el alumno reinstale ni actualice nada. [PENDIENTE: en cuánto tiempo]
- **CONECTOR-17** — El conector debe entregar todo su contenido sin pedir login, cuenta ni credenciales.
- **CONECTOR-18** — El conector no debe ofrecer ninguna forma de crear, cambiar ni borrar plantillas o criterios.

## 5. Preguntas abiertas

- [PENDIENTE: ¿se puede lograr que el agente del alumno use el conector cuando el pedido no nombra el artefacto, como en el intento 3 de la prueba del taller 2?] — Lo intenta quien diseñe y construya (diseño técnico, taller 4; construcción, taller 8) y se mide en las evaluaciones del taller 10. Si se logra, entra como criterio de la capa del agente.
- [PENDIENTE: ¿qué sinónimos ("brief", "spec", "documento de requisitos") e idiomas ("PRD template") debe reconocer el agente?] — Se decide en el diseño técnico, taller 4.
- [PENDIENTE: cuando el conector no responde, ¿qué ve el alumno y el agente debe decírselo explícitamente?] — Se decide en el diseño técnico, taller 4; se revisa al depurar en el taller 10.
- [PENDIENTE: después de publicar un cambio, ¿en cuánto tiempo debe entregarlo el conector (camino 5, CONECTOR-16)?] — Se decide en el diseño técnico, taller 4, junto con dónde se aloja.
- [PENDIENTE: la descripción de una línea la escribe el curso, ¿pero dónde se guarda y cómo se mantiene al agregar un archivo (CONECTOR-12)?] — Se decide en el diseño técnico, taller 4.
