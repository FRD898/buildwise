# Estructura de presentación en clase

**Estado:** Aceptada
**Fecha:** 2026-09-10
**Quién decide:** Freider Achic
**ADRs relacionados:** [Formato de contenido para talleres](./content-format-for-workshops.md)

---

## Contexto

El ADR de formato fijó *dónde* vive el contenido (MDX, modo lectura + presentación). Falta fijar qué **secciones** tiene cada `taller-N.mdx` y en qué orden — sin eso, cada taller improvisa su propia estructura.

Un estudio comparó juegos de diapositivas tradicionales (título + viñetas) contra "assertion-evidence" (afirmación corta como título + una imagen/dato como única evidencia): el segundo da mejor comprensión y recuerdo. Regla UCSD: cuatro viñetas o menos, cuatro conceptos o menos cada uno.

**No fija minutos** — el ritmo en vivo de cada sesión se define aparte, fuera de este repo. Este ADR solo decide secciones, orden y densidad de texto.

## Decisión

**Secciones fijas, mismo orden en los once talleres:**

1. **Apertura** — qué construimos · qué problema resuelve · dónde estamos (un link al taller anterior relevante) · qué hacemos hoy. Mismo formato que ya usa el curso en vivo.
2. **Pregunta** (1 diapositiva) — pregunta corta de experiencia propia, formulada doble: *"respóndelo en el chat, o si ves la grabación, pausa y piénsalo"*. Se retoma en el Cierre, por escrito, para quien ve la grabación; a mitad de clase, solo en voz.
3. **Concepto** — **máximo 3 ideas** (no un número de diapositivas fijo; cada idea puede ocupar 1-3 diapositivas).
4. **Aplicación** — las instrucciones para hacerlo, no el resultado: el prompt copiable, la apuesta y qué mirar. Una diapositiva por paso. Sin transcripción de lo construido/decidido en vivo: eso queda en el checkpoint de cierre.
5. **Cierre** — la pregunta de apertura retomada, el entregable de la semana (ya definido por el plan de cada taller, fuera de este repo) y el checkpoint de cierre. Puede ocupar más de una diapositiva.
6. **Extra** (opcional, solo lectura) — lo que no entró arriba, marcado "para leer después".

**Cada diapositiva de Concepto/Aplicación — assertion-evidence:** título = afirmación, cuerpo = evidencia visual, máx 4 viñetas de ~4 palabras. Si no entra, se parte en más diapositivas, no se comprime texto.

**Qué no va en ninguna diapositiva:** teoría completa, historia, ejemplos con nuance — eso lo da el profesor en vivo, o vive en `docs/curso/conceptos/*.mdx` si es reutilizable.

**Dos reglas transversales:** ninguna diapositiva usa fechas relativas ("la clase pasada" → "en el taller N"); ninguna diapositiva muestra en pantalla una herramienta que el curso no haya introducido todavía en un taller anterior.

## Alternativas descartadas

| Alternativa | Por qué no |
|---|---|
| Notas de profesor separadas (diapositiva limpia + panel oculto) | El ADR de formato ya rechazó capas duplicadas — una sola fuente. Teoría duradera va a `conceptos/*.mdx`. |
| Orden libre, se decide taller a taller | El alumno pierde la previsibilidad de "ya sé qué viene". |
| Bullets tradicionales con texto explicativo | El estudio citado muestra peor comprensión/recuerdo. |
| Hook nuevo (pregunta provocadora) como apertura | El curso ya tiene su tarjeta de apertura fija y probada — no duplicar mecanismo. |
| Micro-actividad en pareja | No aplica a "cinco en vivo, cientos después" — se reemplaza por la pregunta. |
| Check de comprensión como diapositiva | Duplicaría el quiz de plataforma (5 preguntas/taller) que ya existe aparte. |
| Minutos fijos escritos en este ADR | El ritmo en vivo ya se define aparte — dos fuentes de lo mismo. |

## Consecuencias

- Mismo orden de secciones cada taller, sin necesitar minutos para eso.
- Cap de 3 ideas obliga a elegir, no a listar.
- Aplicación queda como instrucciones reproducibles: quien ve la grabación puede hacer la práctica con la página, sin transcripción de lo que salió en vivo.
- Contenido específico de cada taller (qué idea, qué pregunta, qué entregable) se sigue decidiendo en el spec de esa clase.

**Revisar si:** algún taller necesita una tabla/comparación que no cabe en 4 viñetas ni como imagen; o el cap de 3 ideas no alcanza para un taller con más carga conceptual.
