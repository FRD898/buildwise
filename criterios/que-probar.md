# Qué probar primero

Antes de construir, elige la prueba según el tipo de duda. Regla: cada prueba responde una sola pregunta; si no puedes decir cuál, no la hagas todavía.

## 1. ¿Cómo lo resuelven otros?

**Investiga.** Pídele al agente que busque cómo otros resuelven algo parecido y que cite las fuentes. Antes de leer la respuesta, escribe tu propia apuesta y compárala: no aceptes lo que dice el agente sin contrastarlo.

*Ejemplo:* estás armando un asistente por chat que reserva canchas. Antes de decidir cómo cobra, investigas cómo lo hacen otros: ¿pago por adelantado, en la cancha, con enlace?

## 2. ¿Cómo debería comportarse?

**Define el comportamiento esperado.** Es probar la lógica, no la pantalla. Escribe, para cada situación posible, qué debería pasar: qué pregunta, qué decide, qué entrega. No construyes nada todavía. Sirve para detectar casos ambiguos antes de escribir código.

*Ejemplo:* "resérvame mañana" no dice la hora ni la cancha. El asistente debe preguntar antes de reservar, no elegir por su cuenta.

Esto no prueba que se comporte así de verdad. Eso lo comprueba un spike.

## 3. ¿Funciona técnicamente?

**Haz un spike.** Es una prueba corta que responde una sola pregunta técnica, y el código se tira después. Antes de correrlo, define:

- **Objetivo:** qué quieres comprobar.
- **Alcance:** lo mínimo que hace falta, nada más.
- **Pregunta:** lo que el spike responde con sí o no.
- **Éxito:** cuándo cuenta como que funcionó.

*Ejemplo:* objetivo, cobrar una reserva; alcance, un solo pago de prueba sin login ni historial; pregunta, ¿el asistente recibe la confirmación del pago?; éxito, 3 de 3 intentos.

## 4. ¿Cómo debería verse y usarse?

**Prototipa la interfaz.** Puede ser un boceto a mano o una pantalla clicable con datos de ejemplo. Lo que importa es que otra persona intente usarla y veas dónde se traba.

*Ejemplo:* muestras la pantalla de pago a alguien y le pides que reserve una cancha. Si no sabe dónde tocar, el problema es de interfaz, no de código.
