import type { MDXComponents } from "mdx/types";
import type { ComponentProps, ReactElement } from "react";
import { Mermaid } from "@/components/taller/mermaid";
import { TallerSections } from "@/components/taller/taller-sections";

function Pre({ children, ...props }: ComponentProps<"pre">) {
  const child = children as ReactElement<{ className?: string; children?: string }>;
  const className = child?.props?.className ?? "";

  if (/language-mermaid/.test(className)) {
    return <Mermaid chart={String(child.props.children).trim()} />;
  }

  return <pre {...props}>{children}</pre>;
}

const components: MDXComponents = {
  pre: Pre,
  wrapper: TallerSections,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
