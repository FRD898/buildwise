// Los prompts vienen cortados a ~80 columnas en el .mdx: se muestran unidos para que fluyan al
// ancho de pantalla (se copian tal cual). Un punto de lista solo absorbe su continuación sangrada.
export function unirLineas(texto: string) {
  const esLista = (l: string) => /^\s*([-*+]|\d+\.)\s/.test(l);
  const salida: string[] = [];
  for (const cruda of texto.split("\n")) {
    const linea = cruda.trim() ? cruda : "";
    const previa = salida.at(-1);
    const continua =
      previa && linea.trim() && !esLista(linea) && (!esLista(previa) || /^\s/.test(linea));
    if (continua) salida[salida.length - 1] = `${previa} ${linea.trim()}`;
    else salida.push(linea);
  }
  return salida.join("\n");
}
