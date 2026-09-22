import { readFile } from "node:fs/promises";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const TEMPLATE = new URL("../templates/product-brief.md", import.meta.url);

const server = new McpServer({ name: "buildwise", version: "0.0.0" });

server.registerTool(
  "obtener_plantilla_product_brief",
  { description: "Devuelve la plantilla completa de product brief (templates/product-brief.md)." },
  async () => ({ content: [{ type: "text", text: await readFile(TEMPLATE, "utf8") }] }),
);

await server.connect(new StdioServerTransport());
