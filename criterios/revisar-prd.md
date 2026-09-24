# Revisar un PRD — Taller 3

Preguntas para revisar un PRD antes de construir. Sirven para cualquier especificación.

Quien revisa no debería ser quien escribió: el autor lee lo que quiso decir, no lo que dice. Por cada problema, cita la sección o el criterio y di qué falla. No propongas cómo implementarlo.

## 1. ¿Es un documento de producto?

> Un PRD describe el problema, no la solución, y lo lee todo el equipo, no solo quien construye.

- **¿Se coló el cómo?** Librerías, estructura de código, pasos de implementación. Eso no va en la spec: es implementación.
- **¿Lo entendería alguien de producto sin conocimientos técnicos?** Si hay un término técnico sin explicar, no.
- **¿Dice qué no incluye, y por qué?** Si faltan, quien escribió tiene que decidirlos.

## 2. ¿Dice lo que sabe y marca lo que no?

> Quien escribe tiende a rellenar lo que no sabe. Por eso existe el `[PENDIENTE]`.

- **¿Alguna sección está rellena en vez de marcada?** Si suena genérica o no dice nada concreto, probablemente debía ser un `[PENDIENTE]`.
- **¿Lo que no se sabe está en Preguntas abiertas?** Cada `[PENDIENTE]` del texto tiene que aparecer ahí, con quién o cuándo lo decide.

## 3. ¿Cada criterio se puede marcar?

> Alguien que no lo escribió puede decir sí o no, sin preguntarte.

- **¿Cada criterio se puede marcar como cumplido o no?** "Rápido", "correcto", "intuitivo" o "sin errores" no se pueden marcar.
- **¿Cada criterio dice una sola cosa?** Si tiene "y además", son dos.
- **¿Cada criterio tiene un código estable?** Sin código no se puede citar en un commit o un PR.

## 4. ¿Se puede construir sin preguntarte?

> Quien la construya no va a poder preguntarte. Revísala como si fueras esa persona.

- **¿Los caminos cubren el normal, los errores y los casos límite?** Si solo está el que sale bien, faltan.
- **¿Alguna sección admite dos lecturas?** Escribe las dos.
- **¿Qué decisión tendría que tomar por su cuenta quien la construya?** Si el documento no la dice y nadie la marcó como pendiente, falta.
