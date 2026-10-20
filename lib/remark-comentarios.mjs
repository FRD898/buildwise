// Los comentarios <!-- --> de las plantillas explican para qué sirve cada documento.
// En el archivo siguen ocultos; en la web se muestran como nota.
function nota(value) {
  const texto = value.replace(/^<!--/, "").replace(/-->$/, "").trim();
  return {
    type: "blockquote",
    data: {
      hName: "aside",
      hProperties: { className: "space-y-2 rounded-md bg-accent px-4 py-3 text-sm leading-relaxed" },
    },
    children: texto.split(/\n\s*\n/).map((parrafo) => ({
      type: "paragraph",
      children: [{ type: "text", value: parrafo.replace(/\s*\n\s*/g, " ") }],
    })),
  };
}

export default function remarkComentarios() {
  return function transform(node) {
    node.children?.forEach((child, i) => {
      if (child.type === "html" && child.value.trim().startsWith("<!--")) {
        node.children[i] = nota(child.value.trim());
      } else {
        transform(child);
      }
    });
  };
}
