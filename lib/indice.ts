// Única lista de lo publicado: el sitio y el conector salen de aquí.
// Al agregar un archivo a templates/ o criterios/, agrega su entrada en el mismo cambio.
export type Tipo = "plantilla" | "criterios";

export type Entrada = {
  nombre: string; // el del archivo, sin extensión
  tipo: Tipo;
  descripcion: string; // una línea: qué es y para qué sirve
  otros: string[]; // otros nombres con que se le conoce
};

export const INDICE: Entrada[] = [
  { nombre: "product-brief", tipo: "plantilla", descripcion: "Estructura del documento de una página que da contexto del producto (qué es, para quién, qué no hace) antes de tocar código.", otros: ["brief"] },
  { nombre: "prd", tipo: "plantilla", descripcion: "Estructura para escribir la especificación de una funcionalidad: qué se construye, cómo se comporta y sus criterios de aceptación.", otros: ["spec", "especificación"] },
  { nombre: "adr", tipo: "plantilla", descripcion: "Estructura para documentar una decisión técnica no obvia: contexto, decisión, alternativas descartadas y consecuencias.", otros: ["decisión técnica"] },
  { nombre: "diseno-tecnico", tipo: "plantilla", descripcion: "Estructura para escribir el diseño técnico: cómo se arma lo que describe la spec.", otros: ["system design", "diseño técnico"] },
  { nombre: "que-probar", tipo: "criterios", descripcion: "Criterios para decidir qué prueba hacer primero antes de construir, según el tipo de duda.", otros: [] },
  { nombre: "revisar-prd", tipo: "criterios", descripcion: "Preguntas para revisar un PRD (spec) antes de construir.", otros: ["revisar spec"] },
  { nombre: "revisar-diseno", tipo: "criterios", descripcion: "Preguntas para revisar un diseño técnico junto a su spec antes de construir.", otros: ["revisar diseño técnico"] },
];

export const nombresDe = (tipo: Tipo) =>
  INDICE.filter((e) => e.tipo === tipo).map((e) => e.nombre);
