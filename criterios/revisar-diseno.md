# Revisar un diseño técnico

Preguntas para revisar un diseño técnico antes de construir. Se revisa junto a su spec.

Quien revisa no debería ser quien escribió. Por cada problema, cita la sección y di qué falla. Si no hay problemas, apruébalo; si los que hay no bloquean, apruébalo con condición: "sí, si cambias esto". No escribas tú el diseño ni la implementación.

## 1. ¿Hacía falta un diseño?

- **¿Crea un componente nuevo, guarda datos, expone algo que otros llaman o es difícil de deshacer?** Si no, bastaba la spec. "Esto no necesitaba diseño" también es una revisión.
- **¿El largo va con el riesgo?** Si una sección explica lo que quien construye decidiría bien solo, sobra.

## 2. ¿Dice cada cosa una sola vez, sin meterse en la spec ni en el código?

- **¿Repite la spec?** Un camino o un criterio de aceptación dicho con otras palabras sigue siendo la spec: va un link. Mira sobre todo las reglas y el contrato.
- **¿Se repite a sí mismo?** Si algo está en dos secciones, una sobra. Un `[PENDIENTE]` en su lugar y en "Preguntas abiertas" no cuenta.
- **¿Se coló la implementación?** Código o pseudocódigo; nombres de funciones, archivos, variables o tablas; tipos de columna o índices; versiones o configuración; pasos de trabajo. No cuentan los nombres del contrato ni los que la spec ya usa.

## 3. ¿Está lo que solo el diseño puede decir?

- **¿Encaja con lo que existe?** Si un componente, un ADR o una convención del proyecto ya cubre algo parecido, el diseño dice qué pasa con eso.
- **¿El flujo dice qué pasa si algo falla, se repite o se corta?**
- **¿Las reglas se pueden comprobar?** "Debe ser robusto" no; "un pedido repetido no crea un segundo registro" sí.
- **¿Cada decisión tiene su alternativa descartada?** Si se apoya en un pendiente, dice qué pasa si sale al revés. Si afecta a más que esta funcionalidad, va en un ADR.
- **¿El contrato dice qué recibe, qué devuelve y qué pasa si falla?**
- **¿Seguridad, migración, rollback y caída tienen respuesta, o "no aplica" con su porqué?**

## 4. ¿Se puede construir sin preguntarte?

- **¿Cada pendiente de la spec tiene respuesta en el diseño, o quién y cuándo lo decide?**
- **Si lo construyeras tú, ¿qué tendrías que decidir solo?** Si es caro de cambiar después, tenía que estar escrito o marcado como pendiente.
- **¿Algo suena genérico o no dice nada concreto?** Probablemente debía ser un `[PENDIENTE]`.
- **¿Algo admite dos lecturas?** Escribe las dos.
