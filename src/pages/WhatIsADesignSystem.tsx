import { Box, Heading, Text, Flex } from '@radix-ui/themes'
import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'the-definition', label: 'The definition', level: 2 },
  { id: 'layers', label: 'The three layers', level: 2 },
  { id: 'what-it-is-not', label: "What it's not", level: 2 },
  { id: 'the-real-value', label: 'The real value', level: 2 },
]

const layers = [
  { label: 'Patterns & Guidance', sublabel: 'How components compose into flows', opacity: 1 },
  { label: 'Components', sublabel: 'Reusable UI building blocks', opacity: 0.7 },
  { label: 'Tokens & Foundations', sublabel: 'The raw decisions: color, type, spacing', opacity: 0.45 },
]

export function WhatIsADesignSystem() {
  const { pathname } = useLocation()
  return (
    <>
      <TableOfContents items={toc} />
      <article className="doc-article">
        <Text size="1" weight="bold" color="violet" className="doc-category">Getting Started</Text>
        <Heading as="h1" size="8" mb="2">What Is a Design System?</Heading>
        <Text as="p" size="3" color="gray" className="doc-lead">
          A shared language for building products — made of decisions, not just components.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[0].id}>{toc[0].label}</Heading>
        <Text as="p" size="3" mb="3">
          A design system is the set of decisions a team has made about how to build — and the tools, documentation, and components that make those decisions reusable. At its core, it's a source of truth that reduces the number of decisions any one person has to make.
        </Text>
        <Text as="p" size="3" mb="3">
          <a href="https://atomicdesign.bradfrost.com/" target="_blank" rel="noopener noreferrer">Brad Frost's <em>Atomic Design</em></a> gave us a useful vocabulary. <a href="https://www.eightshapes.com/nathan-curtis.html" target="_blank" rel="noopener noreferrer">Nathan Curtis</a> and others showed how to operate these systems at scale. But the concept predates both: whenever a team writes down a style guide or component spec, they're starting a design system.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[1].id}>{toc[1].label}</Heading>
        <Text as="p" size="3" mb="4">
          Design systems are usefully thought of in three layers, each building on the one below:
        </Text>

        <Box className="demo-card" mb="5">
          {layers.map((layer, i) => (
            <Box
              key={i}
              className="layer-item"
              style={{ background: `rgba(124, 58, 237, ${layer.opacity * 0.1})` } as React.CSSProperties}
            >
              <Box>
                <Text as="div" size="2" weight="bold" mb="1">{layer.label}</Text>
                <Text as="div" size="1" color="gray">{layer.sublabel}</Text>
              </Box>
              <Box className="layer-badge">Layer {3 - i}</Box>
            </Box>
          ))}
        </Box>

        <Text as="p" size="3" mb="3">
          Most teams start at the wrong layer. They build components first, then realize they need a shared token system to keep the components consistent. Starting with tokens — the raw decisions — makes everything above it more coherent.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[2].id}>{toc[2].label}</Heading>
        <Text as="p" size="3" mb="3">A design system is <strong>not</strong>:</Text>
        <ul>
          <li>A component library in isolation — code without documentation and rationale isn't a system, it's a library</li>
          <li>A Storybook — Storybook is a tool for documenting components, not the system itself</li>
          <li>A Figma file — Figma is where design decisions live, not the canonical source of the system</li>
          <li>A one-time project — systems require ongoing investment and governance to stay healthy</li>
        </ul>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[3].id}>{toc[3].label}</Heading>
        <Text as="p" size="3" mb="3">
          The ROI of a design system is rarely in the components themselves. It's in the decisions that don't have to be made twice. Every time a product team reaches for a button and doesn't have to debate its border-radius, focus state, and accessible label — that's the system working.
        </Text>
        <Text as="p" size="3" mb="3">
          At scale, the compounding effect is enormous. A team of 50 designers shipping 10 features a quarter is making thousands of micro-decisions. A design system handles the ones that don't need to be re-decided, freeing people to focus on the ones that do.
        </Text>

        <Flex justify="end">
          <DocNav currentPath={pathname} />
        </Flex>
    </article>
    </>
  )
}
