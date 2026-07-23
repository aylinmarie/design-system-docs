import { useEffect, useRef, useState, type ReactNode } from "react";
import { Heading, Text } from "@radix-ui/themes";
import { useLocation } from "react-router-dom";
import { TableOfContents, type TocItem } from "./TableOfContents";
import { DocNav } from "./DocNav";

export interface Frontmatter {
  category: string;
  title: string;
  dek?: string;
}

interface DocPageProps extends Frontmatter {
  children: ReactNode;
}

export function DocPage({ category, title, dek, children }: DocPageProps) {
  const { pathname } = useLocation();
  const articleRef = useRef<HTMLElement>(null);
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;
    const headings = Array.from(el.querySelectorAll("h2[id]"));
    setToc(
      headings.map((h) => ({
        id: h.id,
        label: h.textContent ?? "",
        level: 2 as const,
      })),
    );
  }, [children]);

  return (
    <>
      <TableOfContents items={toc} />
      <article className="doc-article" ref={articleRef}>
        <Text size="1" weight="bold" color="indigo" className="doc-category">
          {category}
        </Text>
        <Heading as="h1" size="8" mb="2">
          {title}
        </Heading>
        {dek && (
          <Text as="p" size="3" color="gray" className="doc-lead">
            {dek}
          </Text>
        )}
        {children}
        <DocNav currentPath={pathname} />
      </article>
    </>
  );
}
