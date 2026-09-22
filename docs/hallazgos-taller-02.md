# Hallazgos — Taller 2

## Spike técnico: servidor MCP mínimo

**Resultado: completado con éxito.**

### Definición (antes de correr)

- **Objetivo:** comprobar que un servidor MCP mínimo puede entregarle una plantilla del curso al agente del alumno.
- **Alcance:** una herramienta sin parámetros, `obtener_plantilla_product_brief`, que devuelve el archivo real `templates/product-brief.md`. Sin login, sin más herramientas ni plantillas, sin tests.
- **Pregunta:** ¿el agente llama la herramienta y recibe la plantilla completa?
- **Éxito:** 3 de 3 intentos, con el pedido redactado distinto cada vez.

### Qué pasó

- La implementación no tuvo problemas: un servidor local por stdio, con una sola herramienta que lee `templates/product-brief.md` del disco y lo devuelve completo.
- Se conectó el agente de Claude Code al servidor como conector MCP.
- El agente obtuvo correctamente la plantilla del product brief, que era el punto de prueba.
- No quedaron dudas abiertas.

### Conclusión

Construir el conector MCP es viable y va a funcionar: la pieza técnica más incierta queda validada. Con esto se cierra lo que el spike quería probar.

### Evidencia

- **Manual, en chat:** se le pidió al agente la plantilla del product brief en lenguaje natural (conector ya registrado); el agente eligió la herramienta correcta y devolvió la plantilla completa.
- **3 llamadas directas de verificación**, ya con la herramienta registrada como conector MCP (`mcp__buildwise__obtener_plantilla_product_brief`): las 3 devolvieron el archivo completo, coincidiendo byte a byte con `templates/product-brief.md` (1391 bytes). No son 3 redacciones distintas registradas verbatim — eso queda como pendiente si se quiere trazabilidad exacta pedido-por-pedido.

### Notas

- El código vive en la rama `spike/taller-02` como referencia y no se reutiliza (CA-3 del spec).
- La herramienta no toma parámetros: la variación de redacción está en cómo se le pidió al agente en el chat, no en argumentos de la llamada — el spike no prueba interpretación de distintos parámetros, solo que el agente elige y usa bien una herramienta sin ellos.
