import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { verificarCatalogo } from "./lib/verificar-catalogo.ts";

verificarCatalogo();

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
