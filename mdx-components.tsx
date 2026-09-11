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

function A({ className, ...props }: ComponentProps<"a">) {
  return (
    <a
      className={`text-primary underline underline-offset-2 hover:text-primary/80 ${className ?? ""}`}
      {...props}
    />
  );
}

function H1(props: ComponentProps<"h1">) {
  return <h1 className="text-3xl font-bold tracking-tight" {...props} />;
}

function H2(props: ComponentProps<"h2">) {
  return <h2 className="text-2xl font-semibold tracking-tight" {...props} />;
}

function H3(props: ComponentProps<"h3">) {
  return (
    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground" {...props} />
  );
}

function P(props: ComponentProps<"p">) {
  return <p className="leading-relaxed" {...props} />;
}

function Ul(props: ComponentProps<"ul">) {
  return <ul className="list-disc space-y-1 pl-6 leading-relaxed" {...props} />;
}

function Ol(props: ComponentProps<"ol">) {
  return <ol className="list-decimal space-y-1 pl-6 leading-relaxed" {...props} />;
}

function Code(props: ComponentProps<"code">) {
  const isBlock = typeof props.children === "string" && props.children.includes("\n");
  if (isBlock) return <code {...props} />;
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]" {...props} />
  );
}

function Table(props: ComponentProps<"table">) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left" {...props} />
    </div>
  );
}

function Th(props: ComponentProps<"th">) {
  return <th className="border-b border-border px-3 py-2 font-semibold" {...props} />;
}

function Td(props: ComponentProps<"td">) {
  return <td className="border-b border-border px-3 py-2 align-top" {...props} />;
}

const components: MDXComponents = {
  pre: Pre,
  a: A,
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  ul: Ul,
  ol: Ol,
  code: Code,
  table: Table,
  th: Th,
  td: Td,
  wrapper: TallerSections,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
