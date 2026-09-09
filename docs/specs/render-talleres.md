# Renderizado de talleres (MDX)

| Campo | Valor |
|-------|-------|
| **Estado** | Borrador |
| **Módulo** | Contenido del curso |
| **ADR relacionado** | [Formato de contenido para talleres](../adrs/content-format-for-workshops.md) |

---

## 1. Resumen

Infraestructura de render para los talleres: ruta dinámica que importa `.mdx` desde `docs/curso/`, con modo lectura y modo presentación, y soporte de diagramas Mermaid. Se construye una sola vez — taller 1 es el primero en usarla, talleres 2 al 11 solo agregan su `.mdx` y una entrada en `generateStaticParams`, sin volver a tocar esta infraestructura.

## 2. Alcance

**Incluye**
- Instalar y configurar MDX en Next.js.
- Ruta `/taller/[slug]` que importa el `.mdx` correspondiente desde `docs/curso/`.
- Modo lectura (scroll normal) y modo presentación (una sección por pantalla, navegación con flechas), a partir de los `##` del `.mdx`.
- Render de diagramas Mermaid dentro del `.mdx`.
- Volcar a `docs/curso/taller-1.mdx` el contenido definido en [Contenido de taller 1](./taller-1-contenido.md).

**No incluye**
- `docs/curso/conceptos/*.mdx` y su ruta `/conceptos/[slug]` — se arma cuando algún taller lo necesite primero, no antes.
- Sistema de diseño propio — el brief dice que entra a partir de taller 7; por ahora se usa lo que ya trae shadcn/ui.
- Transiciones o animaciones avanzadas en modo presentación.

## 3. Cómo funciona

El alumno entra a `/taller/1` y ve el contenido en modo lectura por default — todo el documento, scroll normal. Un control cambia a modo presentación: se ve una sección (`##`) a la vez, a pantalla completa, y se avanza o retrocede con las flechas del teclado. Cualquier diagrama Mermaid del documento se dibuja automáticamente en los dos modos.

## 4. Requisitos técnicos

Ya instalado: Next.js 16.3.4, React 19.2.8, Tailwind v4, shadcn/ui, TypeScript 5.

Falta agregar:
- `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx` — soporte de MDX en Next.js.
- `mermaid` — dibuja los diagramas en el navegador.
- `next.config.ts` envuelto con `createMDX()`.
- `mdx-components.tsx` en la raíz (obligatorio en App Router) — ahí se conectan el modo slide y el render de Mermaid.

## 5. Plan de implementación

1. `pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx mermaid`
2. Configurar `next.config.ts` con `createMDX()`.
3. Crear `mdx-components.tsx`: marca cada `h2` como corte de diapositiva; el bloque de código con lenguaje `mermaid` se delega a un componente cliente.
4. Componente cliente que dibuja un diagrama Mermaid a partir del texto del bloque.
5. Componente cliente que agrupa el contenido por `h2` y ofrece modo lectura / modo presentación con navegación por teclado.
6. Crear `app/taller/[slug]/page.tsx`: importa `docs/curso/taller-${slug}.mdx` dinámicamente, `generateStaticParams` con `{ slug: '1' }`, `dynamicParams = false`.
7. Escribir `docs/curso/taller-1.mdx` con el contenido de [Contenido de taller 1](./taller-1-contenido.md) (backlog + criterios + métodos) + un diagrama Mermaid de ejemplo.
8. Probar con `pnpm dev`: revisar `/taller/1` en los dos modos y que el diagrama se dibuje.

## 6. Criterios de aceptación

- **CA-1** — `/taller/1` carga y muestra contenido real, no un placeholder.
- **CA-2** — Cada `##` del `.mdx` se ve como una sección navegable en modo presentación.
- **CA-3** — Modo lectura muestra todo el documento en scroll normal.
- **CA-4** — Un bloque ```mermaid del taller se dibuja como diagrama, no como texto plano.
- **CA-5** — `pnpm lint` pasa sin errores nuevos.

## 7. Fuera de alcance / Decisiones

| Decisión o algo descartado | Por qué |
|---|---|
| `conceptos/*.mdx` + ruta `/conceptos/[slug]` | Se arma cuando un taller lo necesite primero, no antes de tener contenido real que mostrar (ver ADR). |
| Tema visual definitivo | El sistema de diseño propio entra en taller 7 según el brief; por ahora se usa el default de shadcn/ui. |
| Transiciones avanzadas en modo presentación | CSS + teclado alcanza por ahora; revisar Reveal.js solo si se vuelve insuficiente (ver ADR, Escalation triggers). |
