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

### Notas

- El código vive en la rama `spike/taller-02` como referencia y no se reutiliza (CA-3 del spec).
- Número de intentos y redacción de cada pedido: sin registrar.
