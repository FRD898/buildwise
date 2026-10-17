// Única lista de plantillas y criterios publicados: la leen el sitio y el conector.
// Agregar un archivo a templates/ o criterios/ exige su entrada aquí (ver verificarCatalogo).
export const TIPOS = ["plantilla", "criterios"] as const;
export type Tipo = (typeof TIPOS)[number];

export const CATALOGO = [
  { tipo: "plantilla", nombre: "product-brief", descripcion: "Contexto de un producto en un archivo: qué es, qué problema resuelve y para quién, antes de tocar código." },
  { tipo: "plantilla", nombre: "prd", descripcion: "Spec de producto: qué se construye y cómo se comporta, desde quien lo usa, con límites y criterios de aceptación." },
  { tipo: "plantilla", nombre: "adr", descripcion: "Registro de una decisión técnica no obvia: contexto, qué se decidió, alternativas descartadas y consecuencias." },
  { tipo: "plantilla", nombre: "diseno-tecnico", descripcion: "Cómo se arma lo que describe la spec: componentes, flujo, reglas, datos y decisiones, sin código." },
  { tipo: "criterios", nombre: "revisar-prd", descripcion: "Preguntas para revisar un PRD antes de construir." },
  { tipo: "criterios", nombre: "revisar-diseno", descripcion: "Preguntas para revisar un diseño técnico antes de construir, junto a su spec." },
  { tipo: "criterios", nombre: "que-probar", descripcion: "Cómo elegir la primera prueba según el tipo de duda, antes de construir." },
] as const satisfies readonly { tipo: Tipo; nombre: string; descripcion: string }[];

export type Elemento = (typeof CATALOGO)[number];

export const carpeta = (tipo: Tipo) => (tipo === "plantilla" ? "templates" : "criterios");
export type Entrada = { tipo: Tipo; nombre: string; descripcion: string };
export const idDe = (e: Pick<Entrada, "tipo" | "nombre">) => `${e.tipo}/${e.nombre}`;
export const archivoDe = (e: Pick<Entrada, "tipo" | "nombre">) => `${carpeta(e.tipo)}/${e.nombre}.md`;
export const nombres = (tipo: Tipo) => CATALOGO.filter((e) => e.tipo === tipo).map((e) => e.nombre);
// Comparación exacta: sin normalizar mayúsculas, rutas ni alias.
export const buscar = (id: string) => CATALOGO.find((e) => idDe(e) === id);
