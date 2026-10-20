import type { NextConfig } from "next";
import path from "node:path";
import createMDX from "@next/mdx";
import { verificarCatalogo } from "./lib/verificar-catalogo.ts";

verificarCatalogo();

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // El conector lee los .md como texto en tiempo de ejecución.
  outputFileTracingIncludes: { "/mcp": ["./templates/*.md", "./criterios/*.md"] },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-gfm", path.resolve("lib/remark-comentarios.mjs")],
  },
});

export default withMDX(nextConfig);
