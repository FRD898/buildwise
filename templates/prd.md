<!--
Ejemplo de referencia, no un formulario: si una sección no aplica a tu proyecto, la sacas.
Lo que no se saca son los límites (qué no incluye) y los criterios de aceptación.

Un PRD (spec) describe qué se construye y cómo se comporta, desde quien lo usa. No repite
el porqué (eso ya está en el brief o en un ADR: enlázalo) y no dice cómo se implementa:
librerías, estructura, dependencias o pasos de trabajo no van aquí (si tu proyecto tiene
diseño técnico o tareas, van ahí).

Escríbelo en lenguaje simple: alguien de producto sin conocimientos técnicos debe poder
leerlo y decir si está de acuerdo. Si usas un término técnico, explícalo en una línea.

Si no sabes algo, no lo inventes: escribe [PENDIENTE: la pregunta] donde va y llévala a
"Preguntas abiertas". Mejor una sección con un [PENDIENTE] que una sección rellena.

Sugerencia, si tu proyecto no tiene otra convención: guárdalo en docs/specs/ con un nombre
descriptivo, sin prefijo numérico (kebab-case-title.md).
-->

# [Nombre de la funcionalidad]

| Campo | Valor |
|-------|-------|
| **Estado** | Borrador \| En progreso \| Listo |
| **Módulo** | [a qué parte del proyecto pertenece] |
| **Depende de** | [otra spec o funcionalidad que tiene que existir antes, o "Nada"] |
| **Diseño técnico** | [link, "Pendiente" o "Ninguno"] |
| **ADR relacionado** | [link, o "Ninguno"] |

---

## 1. Resumen

[Qué problema resuelve y para quién, en dos o tres frases.]

## 2. Alcance

**Incluye**
- [...]

**No incluye — y por qué**
- [Lo que queda fuera] — [por qué, en una línea]

## 3. Cómo lo usa quien lo usa

[Caminos desde quien lo usa: qué pide o hace, y qué recibe. No describas qué pasa por
dentro. Cubre tres tipos:
- el camino normal: todo sale bien;
- los errores: algo sale mal (no existe, no tiene permiso, falla algo);
- los casos límite: pedidos raros o ambiguos, vacíos, al borde de lo que se soporta.]

1. [Quien lo usa hace o pide algo] → [qué recibe]
2. Si [algo sale mal] → [qué recibe]
3. Si [caso límite] → [qué recibe]

## 4. Criterios de aceptación

<!--
Cómo se sabe que esto está listo. Una sola cosa por criterio, y que alguien que no lo
escribió pueda marcarlo como cumplido o no, sin preguntarte. Si tiene "y además", son dos.

No repitas los caminos: cada criterio agrega lo que el camino no dice (qué exactamente se
recibe, quién responde, cuántas veces se prueba). Sigue siendo producto: se verifica
mirando qué recibe quien lo usa, no leyendo el código.

Forma (EARS):
- "Cuando [situación], el sistema debe [respuesta]."
- Para errores: "Si [situación], entonces el sistema debe [respuesta]."
- Si responde un modelo de IA (un agente, un asistente), puede variar: di cuántas veces y
  con qué pedidos. Ej.: "Cuando el cliente pide hablar con una persona, el asistente debe
  derivarlo, en 3 de 3 intentos con pedidos redactados distinto." La lista de pedidos se
  escribe después de construir.

Cada criterio lleva un código, para citarlo en un commit, un PR u otra spec. El formato
es tuyo; una opción: prefijo corto de la funcionalidad o el módulo + número (EMAIL-1).
Si la spec crece, puedes agrupar por tema (EMAIL-ENVIO-1). No lo armes por camino ni
por tipo (normal, error): eso cambia, el código no. En borrador renumera libre; desde que
se empieza a construir, ya lo citan: si borras uno, su número no se reusa.
-->

- **[PREFIJO]-1** — Cuando [situación], el sistema debe [respuesta].
- **[PREFIJO]-2** — Si [situación], entonces el sistema debe [respuesta].

## 5. Preguntas abiertas

[Lo que no se sabe todavía, y quién o cuándo lo decide. Cada [PENDIENTE] del texto apunta
aquí.]

- [PENDIENTE: ...]
