import { Box, Heading, Text, Flex } from '@radix-ui/themes'
import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'palette', label: 'The palette structure', level: 2 },
  { id: 'semantic', label: 'Semantic color roles', level: 2 },
  { id: 'dark-mode', label: 'Dark mode', level: 2 },
  { id: 'contrast', label: 'Contrast & accessibility', level: 2 },
]

const palette = [
  { name: 'violet', shades: [
    { step: '50', hex: '#f5f3ff' },
    { step: '100', hex: '#ede9fe' },
    { step: '200', hex: '#ddd6fe' },
    { step: '400', hex: '#a78bfa' },
    { step: '600', hex: '#7c3aed' },
    { step: '700', hex: '#6d28d9' },
    { step: '900', hex: '#4c1d95' },
  ]},
  { name: 'gray', shades: [
    { step: '50', hex: '#f9fafb' },
    { step: '100', hex: '#f3f4f6' },
    { step: '200', hex: '#e5e7eb' },
    { step: '400', hex: '#9ca3af' },
    { step: '600', hex: '#4b5563' },
    { step: '800', hex: '#1f2937' },
    { step: '900', hex: '#111827' },
  ]},
]

export function Color() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="doc-article">
        <Text size="1" weight="bold" color="blue" className="doc-category">Foundations</Text>
        <Heading as="h1" size="8" mb="2">Color</Heading>
        <Text as="p" size="3" color="gray" className="doc-lead">
          A color system is a structured set of palette and semantic decisions. Without one, the same interactive state gets a different shade in every component and the visual language breaks down.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[0].id}>{toc[0].label}</Heading>
        <Text as="p" size="3" mb="3">
          Start with a global palette — a full range of named steps for each color. A 50–900 step system (following Tailwind's approach) gives enough resolution for subtle backgrounds, borders, and high-contrast text.
        </Text>

        {palette.map(color => (
          <Box key={color.name} mb="4">
            <Text size="1" weight="bold" color="gray" className="demo-label" mb="2" style={{ display: 'block' }}>{color.name}</Text>
            <Flex gap="2">
              {color.shades.map(shade => (
                <Box key={shade.step} className="palette-col">
                  <Box
                    className="palette-swatch"
                    style={{ '--swatch-bg': shade.hex } as React.CSSProperties}
                    title={shade.hex}
                    aria-label={`${color.name} ${shade.step}: ${shade.hex}`}
                  />
                  <Text as="span" className="swatch-step">{shade.step}</Text>
                </Box>
              ))}
            </Flex>
          </Box>
        ))}

        <Text as="p" size="3" mb="3">
          The global palette should be exhaustive but not opinionated about usage. It's a vocabulary — semantic tokens assign the meaning.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[1].id}>{toc[1].label}</Heading>
        <Text as="p" size="3" mb="3">
          Semantic tokens give names to color roles. The four main categories:
        </Text>
        <ul>
          <li><strong>Interactive</strong> — primary action color (buttons, links, focus rings)</li>
          <li><strong>Neutral</strong> — text, borders, surfaces in the gray range</li>
          <li><strong>Feedback</strong> — success (green), warning (amber), error (red), info (blue)</li>
          <li><strong>Brand</strong> — marketing/brand-specific uses, often same as interactive but kept separate to allow divergence</li>
        </ul>
        <pre><code>{`/* Semantic layer in CSS custom properties */
:root {
  /* Interactive */
  --color-interactive-primary:    var(--global-violet-600);
  --color-interactive-primary-hover: var(--global-violet-700);
  --color-interactive-subtle:     var(--global-violet-50);

  /* Text */
  --color-text-default:   var(--global-gray-900);
  --color-text-secondary: var(--global-gray-600);
  --color-text-muted:     var(--global-gray-400);

  /* Feedback */
  --color-feedback-success: var(--global-green-600);
  --color-feedback-error:   var(--global-red-600);
  --color-feedback-warning: var(--global-amber-600);
}`}</code></pre>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[2].id}>{toc[2].label}</Heading>
        <Text as="p" size="3" mb="3">
          Dark mode is where a semantic token layer pays off immediately. With semantic tokens, dark mode is a token override — not a stylesheet full of overrides on every component.
        </Text>
        <pre><code>{`[data-theme="dark"] {
  --color-interactive-primary:    var(--global-violet-400);
  --color-text-default:           var(--global-gray-50);
  --color-text-secondary:         var(--global-gray-400);
  --color-interactive-subtle:     var(--global-violet-900);
}`}</code></pre>

        <Callout type="warning" title="Don't just invert">
          Dark mode isn't a color inversion. Dark surfaces should use slightly elevated grays (not pure black), and you often need to reduce the saturation of accent colors to prevent them from vibrating against dark backgrounds.
        </Callout>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[3].id}>{toc[3].label}</Heading>
        <Text as="p" size="3" mb="3">
          <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">WCAG 2.1</a> sets minimums: 4.5:1 for body text, 3:1 for large text and UI components. WCAG 3.0 introduces <a href="https://apcacontrast.com/" target="_blank" rel="noopener noreferrer">APCA</a>, a perceptual model that factors in font weight and size.
        </Text>
        <Text as="p" size="3" mb="3">
          Bake contrast checking into your token definition process. Tools like Figma's built-in checker, <code>contrast-color</code> npm package, or Polychrome can flag violations before they ship.
        </Text>

        <DocNav currentPath={pathname} />
    </article>
    </>
  )
}
