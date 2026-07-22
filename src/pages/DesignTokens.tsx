import { Box, Heading, Text, Flex } from '@radix-ui/themes'
import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'what-are-tokens', label: 'What are tokens?', level: 2 },
  { id: 'taxonomy', label: 'Taxonomy: global → semantic → component', level: 2 },
  { id: 'naming', label: 'Naming conventions', level: 2 },
  { id: 'tooling', label: 'Tooling & delivery', level: 2 },
  { id: 'token-formats', label: 'Token formats (W3C)', level: 2 },
]

const tokenSwatches = [
  { name: 'global.color.blue.600', value: '#2563eb', label: '#2563eb' },
  { name: 'global.color.blue.100', value: '#dbeafe', label: '#dbeafe' },
  { name: 'global.color.gray.900', value: '#111827', label: '#111827' },
  { name: 'global.color.gray.50', value: '#f9fafb', label: '#f9fafb' },
]

const semanticTokens = [
  { name: 'color.interactive.primary', references: 'global.color.blue.600', value: '#2563eb' },
  { name: 'color.text.default', references: 'global.color.gray.900', value: '#111827' },
  { name: 'color.surface.subtle', references: 'global.color.gray.50', value: '#f9fafb' },
]

export function DesignTokens() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="doc-article">
        <Text size="1" weight="bold" color="blue" className="doc-category">Foundations</Text>
        <Heading as="h1" size="8" mb="2">Design Tokens</Heading>
        <Text as="p" size="3" color="gray" className="doc-lead">
          The atomic decisions of your system. Every visual property that repeats is a candidate for a token.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[0].id}>{toc[0].label}</Heading>
        <Text as="p" size="3" mb="3">
          Design tokens are named entities that store design values. Instead of hardcoding <code>#2563eb</code> in a component, you reference <code>color.interactive.primary</code>. The name carries intent; the value can change without the component knowing.
        </Text>
        <Text as="p" size="3" mb="3">
          This indirection is what makes tokens powerful. You can theme your system, support dark mode, and swap brand colors without touching component code.
        </Text>

        <Box className="demo-card">
          <Box className="demo-card-header">
            <Text size="1" weight="bold" color="gray" className="demo-label">Global color tokens</Text>
          </Box>
          {tokenSwatches.map(token => (
            <Flex key={token.name} align="center" gap="4" className="demo-row">
              <Box
                className="color-swatch"
                style={{ '--swatch-bg': token.value } as React.CSSProperties}
                aria-hidden="true"
              />
              <Text as="span" className="token-mono token-mono-flex">{token.name}</Text>
              <Text as="span" className="token-mono token-mono-muted">{token.label}</Text>
            </Flex>
          ))}
        </Box>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[1].id}>{toc[1].label}</Heading>
        <Text as="p" size="3" mb="3">The most scalable token systems use three tiers:</Text>

        <h3>1. Global (primitive) tokens</h3>
        <Text as="p" size="3" mb="3">
          Raw values — the full palette, the full type scale. Named by what they are, not how they're used. <code>global.color.blue.600</code> is a global token. There can be many of these, and that's fine — they're the vocabulary, not the grammar.
        </Text>

        <h3>2. Semantic (alias) tokens</h3>
        <Text as="p" size="3" mb="3">
          Intent-bearing names that reference global tokens. <code>color.interactive.primary</code> points to <code>global.color.blue.600</code>. This is the layer you swap for theming. Components reference semantic tokens, never globals directly.
        </Text>

        <Box className="demo-card">
          <Box className="demo-card-header">
            <Text size="1" weight="bold" color="gray" className="demo-label">Semantic tokens → Global references</Text>
          </Box>
          {semanticTokens.map(token => (
            <Flex key={token.name} align="center" gap="4" className="demo-row">
              <Box
                className="color-swatch-sm"
                style={{ '--swatch-bg': token.value } as React.CSSProperties}
                aria-hidden="true"
              />
              <Text as="span" className="token-mono token-mono-flex">{token.name}</Text>
              <Text as="span" color="gray" size="1">→</Text>
              <Text as="span" className="token-mono token-mono-muted">{token.references}</Text>
            </Flex>
          ))}
        </Box>

        <h3>3. Component tokens</h3>
        <Text as="p" size="3" mb="3">
          Scoped to a specific component. <code>button.background.primary</code> → <code>color.interactive.primary</code>. Use these when components have unique styling needs that shouldn't be shared globally.
        </Text>

        <Callout type="tip" title="Start with semantic tokens">
          Most teams start with component tokens and then struggle to theme the system. Start with semantic tokens — they give you theming for free.
        </Callout>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[2].id}>{toc[2].label}</Heading>
        <Text as="p" size="3" mb="3">
          Good token names follow a predictable pattern: <code>category.property.variant.state</code>.
        </Text>
        <pre><code>{`// Category: what it applies to
// Property: what visual attribute
// Variant: which variant of that attribute
// State: optional — hover, focus, disabled

color.text.default          // default body text
color.text.muted            // secondary/helper text
color.border.interactive    // borders on interactive elements
color.border.interactive.focus  // focus state border
spacing.component.padding.sm    // small component padding`}</code></pre>
        <Text as="p" size="3" mb="3">
          Avoid encoding values in names (<code>color-gray-200</code> is a global token, not a semantic one) and avoid encoding components in semantic names (<code>button-blue</code> leaks into the wrong tier).
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[3].id}>{toc[3].label}</Heading>
        <Text as="p" size="3" mb="3">The primary tools in this space:</Text>
        <ul>
          <li><a href="https://styledictionary.com/" target="_blank" rel="noopener noreferrer"><strong>Style Dictionary</strong></a> (Amazon) — transform tokens into CSS custom properties, Sass variables, iOS/Android formats. The most battle-tested tool.</li>
          <li><strong>Theo</strong> (Salesforce) — similar to Style Dictionary, slightly different DX.</li>
          <li><strong>Token Pipeline</strong> / <strong>Token Transformer</strong> — part of the <a href="https://tokens.studio/" target="_blank" rel="noopener noreferrer">Tokens Studio</a> ecosystem, closer to the W3C spec format.</li>
          <li><a href="https://tokens.studio/" target="_blank" rel="noopener noreferrer"><strong>Tokens Studio for Figma</strong></a> — design-side authoring that outputs W3C-format JSON, consumed by a build step.</li>
        </ul>
        <Text as="p" size="3" mb="3">The general architecture looks like this:</Text>
        <pre><code>{`Design (Figma / Tokens Studio)
  ↓  JSON token files
Build step (Style Dictionary)
  ↓  Platform-specific outputs
├── CSS custom properties  (web)
├── Swift/ObjC constants  (iOS)
└── Kotlin constants       (Android)`}</code></pre>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[4].id}>{toc[4].label}</Heading>
        <Text as="p" size="3" mb="3">
          The <a href="https://www.w3.org/community/design-tokens/" target="_blank" rel="noopener noreferrer">W3C Design Tokens Community Group</a> is standardizing a JSON format for design tokens. Aligning to it makes your tokens portable between tools — Tokens Studio, Style Dictionary, and others already support reading and writing this format.
        </Text>
        <pre><code>{`{
  "color": {
    "interactive": {
      "primary": {
        "$value": "{global.color.blue.600}",
        "$type": "color",
        "$description": "Primary action color"
      }
    }
  }
}`}</code></pre>

        <Callout type="info">
          The <a href="https://tr.designtokens.org/format/" target="_blank" rel="noopener noreferrer">W3C Design Tokens spec</a> uses <code>$type</code> and <code>$value</code> as reserved keys, and references other tokens with curly brace syntax: <code>{'{token.name}'}</code>.
        </Callout>

        <DocNav currentPath={pathname} />
    </article>
    </>
  )
}
