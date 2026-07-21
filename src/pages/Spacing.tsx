import { Box, Heading, Text, Flex } from '@radix-ui/themes'
import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'base-unit', label: 'The base unit', level: 2 },
  { id: 'spacing-scale', label: 'Spacing scale', level: 2 },
  { id: 'grid', label: 'Layout grid', level: 2 },
  { id: 'spacing-tokens', label: 'Spacing tokens', level: 2 },
]

const spacingScale = [
  { name: 'spacing.1', value: '4px', px: 4 },
  { name: 'spacing.2', value: '8px', px: 8 },
  { name: 'spacing.3', value: '12px', px: 12 },
  { name: 'spacing.4', value: '16px', px: 16 },
  { name: 'spacing.5', value: '20px', px: 20 },
  { name: 'spacing.6', value: '24px', px: 24 },
  { name: 'spacing.8', value: '32px', px: 32 },
  { name: 'spacing.10', value: '40px', px: 40 },
  { name: 'spacing.12', value: '48px', px: 48 },
  { name: 'spacing.16', value: '64px', px: 64 },
]

export function Spacing() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="doc-article">
        <Text size="1" weight="bold" color="blue" className="doc-category">Foundations</Text>
        <Heading as="h1" size="8" mb="2">Spacing & Grid</Heading>
        <Text as="p" size="3" color="gray" className="doc-lead">
          Spacing and layout are where visual rhythm lives. Consistent spacing makes interfaces feel considered, not arbitrary.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[0].id}>{toc[0].label}</Heading>
        <Text as="p" size="3" mb="3">
          Every spacing system starts from a base unit. <strong>4px</strong> works well — everything becomes a multiple of 4. It's granular enough for tight UI work and constrained enough to prevent arbitrary values.
        </Text>
        <Text as="p" size="3" mb="3">
          Some teams use 8px as the base (the "8-point grid"). 4px is more flexible for component-level spacing while still being consistent at the layout level.
        </Text>

        <Callout type="tip" title="Enforce via tokens, not convention">
          "Use multiples of 4" only works if it's hard to do otherwise. Spacing tokens make it structural — designers pick from a finite set, and engineers map to a Tailwind scale or CSS custom properties. Arbitrary values become obvious violations.
        </Callout>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[1].id}>{toc[1].label}</Heading>
        <Text as="p" size="3" mb="3">
          The scale below is a solid starting point. Steps 1–6 are for component-level spacing; 8–16 for layout-level spacing.
        </Text>

        <Box className="demo-card">
          <Box className="demo-card-header">
            <Text size="1" weight="bold" color="gray" className="demo-label">Spacing scale (4px base)</Text>
          </Box>
          {spacingScale.map(step => (
            <Flex key={step.name} align="center" gap="4" className="demo-row">
              <Text as="span" className="token-mono token-mono-accent" style={{ width: '7rem', flexShrink: 0 }}>{step.name}</Text>
              <Box
                className="spacing-bar"
                aria-hidden="true"
                style={{ '--bar-width': `${Math.min(step.px * 3, 240)}px` } as React.CSSProperties}
              />
              <Text as="span" className="token-mono token-mono-muted" style={{ marginLeft: 'auto' }}>{step.value}</Text>
            </Flex>
          ))}
        </Box>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[2].id}>{toc[2].label}</Heading>
        <Text as="p" size="3" mb="3">
          A layout grid defines how content aligns within a viewport. The standard web approach:
        </Text>
        <ul>
          <li><strong>12 columns</strong> — gives the most flexibility for 1, 2, 3, 4, and 6-column layouts</li>
          <li><strong>24px gutter</strong> — increases to 32px on large screens</li>
          <li><strong>16–24px margin</strong> — the outer padding on small screens</li>
          <li><strong>Max-width container</strong> — 1280px or 1440px on large displays</li>
        </ul>
        <Text as="p" size="3" mb="3">
          Document your breakpoints explicitly. A common five-step set: <code>xs (0)</code>, <code>sm (640)</code>, <code>md (768)</code>, <code>lg (1024)</code>, <code>xl (1280)</code>. Match these to your token system and your team's mental model.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[3].id}>{toc[3].label}</Heading>
        <Text as="p" size="3" mb="3">
          Spacing tokens come in two flavors: raw scale tokens, and semantic component tokens.
        </Text>
        <pre><code>{`/* Raw scale — the vocabulary */
--spacing-1:  4px;
--spacing-2:  8px;
--spacing-4:  16px;
--spacing-6:  24px;

/* Semantic component tokens — the grammar */
--component-padding-sm:  var(--spacing-2) var(--spacing-3);   /* 8px 12px */
--component-padding-md:  var(--spacing-3) var(--spacing-4);   /* 12px 16px */
--component-padding-lg:  var(--spacing-4) var(--spacing-6);   /* 16px 24px */

/* Layout tokens */
--layout-gutter:      var(--spacing-6);  /* 24px */
--layout-max-width:   1280px;
--layout-section-gap: var(--spacing-16); /* 64px */`}</code></pre>

        <DocNav currentPath={pathname} />
    </article>
    </>
  )
}
