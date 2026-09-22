# Hallazgos — Taller 2

## Spike técnico: servidor MCP mínimo

**Resultado: parcial — 2 de 3. El criterio de éxito, tal como se definió, no se cumple.**

### Definición (antes de correr)

- **Objetivo:** comprobar que un servidor MCP mínimo puede entregarle una plantilla del curso al agente del alumno.
- **Alcance:** una herramienta sin parámetros, `obtener_plantilla_product_brief`, que devuelve el archivo real `templates/product-brief.md`. Sin login, sin más herramientas ni plantillas, sin tests.
- **Pregunta:** ¿el agente llama la herramienta y recibe la plantilla completa?
- **Éxito:** 3 de 3 intentos, con el pedido redactado distinto cada vez.

### Qué pasó

- La implementación no tuvo problemas: un servidor local por stdio, con una sola herramienta que lee `templates/product-brief.md` del disco y lo devuelve completo.
- Se conectó el conector MCP `buildwise` a Claude Code.
- Se probó con un agente independiente, sin el contexto de esta conversación (sesión limpia), con 3 pedidos redactados distinto y sin nombrar la herramienta.

### Evidencia — 3 intentos, agente sin contexto previo

| # | Pedido | Llamó la herramienta | Resultado |
|---|--------|:---:|---|
| 1 | "¿Tienes la plantilla del product brief? Pásamela completa." | Sí | Completa. El agente confirmó "Plantilla completa arriba" |
| 2 | "Voy a arrancar un product brief nuevo, ¿con qué la empiezo?" | Sí | Completa — las 9 secciones que enumeró coinciden con la plantilla real |
| 3 | "¿Cómo documento de qué trata este proyecto y para quién es, antes de tocar código?" | **No** | El agente no relacionó el pedido con la herramienta. Listó el directorio (vacío) y respondió con consejo genérico de bootstrapping (README.md, CLAUDE.md) sin mencionar la plantilla del curso |

- **3 llamadas directas de verificación adicionales** (ya con la herramienta elegida explícitamente): las 3 devolvieron el archivo completo, coincidiendo byte a byte con `templates/product-brief.md` (1391 bytes). Confirma que el servidor en sí no falla — cuando se lo invoca, siempre entrega el archivo completo y sin modificar.

### Conclusión

El servidor MCP funciona: nunca entregó un archivo incompleto o inventado. Pero el spike no cumple su propio criterio de éxito (3 de 3) — el intento 3 muestra que un pedido indirecto, sin las palabras "plantilla" o "product brief", no dispara la llamada a la herramienta. El agente cae en conocimiento genérico (README/CLAUDE.md) en vez de descubrir la herramienta disponible.

Esto no invalida la idea de MCP como conector: valida la entrega del archivo, que era la parte más incierta. Pero abre una pregunta nueva, no resuelta hoy — cómo nombrar/describir las herramientas para que el agente las relacione con pedidos indirectos. Queda anotada para taller 4+, cuando se construya el conector real.

### Notas

- El código vive en la rama `spike/taller-02` como referencia y no se reutiliza (CA-3 del spec).
- La herramienta no toma parámetros: la variación de redacción está en cómo se le pidió al agente en el chat, no en argumentos de la llamada.
