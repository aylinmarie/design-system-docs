import { Box, Heading, Text, Flex, Badge } from '@radix-ui/themes'
import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'ratios', label: 'Contrast ratios', level: 2 },
  { id: 'wcag3', label: 'WCAG 3 & APCA', level: 2 },
  { id: 'token-pairs', label: 'Safe token pairings', level: 2 },
  { id: 'non-text', label: 'Non-text contrast', level: 2 },
]

const contrastPairs = [
  { bg: '#ffffff', text: '#111827', ratio: '18.1:1', pass: 'AAA', bgLabel: 'white', textLabel: 'gray-900' },
  { bg: '#ffffff', text: '#374151', ratio: '10.7:1', pass: 'AAA', bgLabel: 'white', textLabel: 'gray-700' },
  { bg: '#ffffff', text: '#6b7280', ratio: '5.7:1', pass: 'AA', bgLabel: 'white', textLabel: 'gray-500' },
  { bg: '#ffffff', text: '#7c3aed', ratio: '5.2:1', pass: 'AA', bgLabel: 'white', textLabel: 'violet-600' },
  { bg: '#ede9fe', text: '#7c3aed', ratio: '3.1:1', pass: 'AA Large', bgLabel: 'violet-100', textLabel: 'violet-600' },
  { bg: '#7c3aed', text: '#ffffff', ratio: '5.2:1', pass: 'AA', bgLabel: 'violet-600', textLabel: 'white' },
]

const badgeColor = (pass: string): 'green' | 'violet' | 'yellow' =>
  pass === 'AAA' ? 'green' : pass === 'AA' ? 'violet' : 'yellow'

export function AccessibilityContrast() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="doc-article">
        <Text size="1" weight="bold" color="blue" className="doc-category">Accessibility</Text>
        <Heading as="h1" size="8" mb="2">Color & Contrast</Heading>
        <Text as="p" size="3" color="gray" className="doc-lead">
          Contrast is a prerequisite for legibility. Every text and interactive element needs a measurable, passing contrast ratio.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[0].id}>{toc[0].label}</Heading>
        <Text as="p" size="3" mb="3">
          WCAG contrast ratios are calculated against the relative luminance of foreground and background colors. The formula is well-defined but rarely done by hand — use a checker.
        </Text>

        <Box className="demo-card">
          <Box className="demo-card-header">
            <Text size="1" weight="bold" color="gray" className="demo-label">System color pairings — contrast check</Text>
          </Box>
          {contrastPairs.map((pair, i) => (
            <Flex key={i} align="center" gap="4" className="demo-row">
              <Box
                className="contrast-sample"
                style={{ '--sample-bg': pair.bg, '--sample-fg': pair.text } as React.CSSProperties}
              >
                Sample
              </Box>
              <Text as="span" size="2" color="gray" style={{ flex: 1 }}>
                <strong>{pair.bgLabel}</strong>
                <span style={{ color: 'var(--gray-8)', margin: '0 4px' }}>/</span>
                {pair.textLabel}
              </Text>
              <Text as="span" className="token-mono">{pair.ratio}</Text>
              <Badge color={badgeColor(pair.pass)} variant="soft" size="1">{pair.pass}</Badge>
            </Flex>
          ))}
        </Box>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[1].id}>{toc[1].label}</Heading>
        <Text as="p" size="3" mb="3">
          <a href="https://www.w3.org/TR/wcag-3.0/" target="_blank" rel="noopener noreferrer">WCAG 3</a> introduces the <a href="https://apcacontrast.com/" target="_blank" rel="noopener noreferrer">Advanced Perceptual Contrast Algorithm (APCA)</a>, which is a more accurate model of human contrast perception. Differences from WCAG 2.1:
        </Text>
        <ul>
          <li>APCA is asymmetric — light text on dark is scored differently than dark text on light</li>
          <li>Font weight and size are factored into the score, not just color</li>
          <li>The score is a "Lc" value (Lightness Contrast), not a ratio like 4.5:1</li>
          <li>APCA allows some combinations that WCAG 2.1 fails, and fails some it passes</li>
        </ul>

        <Callout type="info">
          APCA is not yet the legal standard anywhere. Target <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">WCAG 2.1</a> AA for compliance; use APCA for a more accurate perceptual quality check. The Figma plugin "Contrast" and the <a href="https://apcacontrast.com/" target="_blank" rel="noopener noreferrer">APCA calculator</a> both support it.
        </Callout>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[2].id}>{toc[2].label}</Heading>
        <Text as="p" size="3" mb="3">
          The safest approach: define which token combinations are valid. Document approved background / foreground pairings so components don't have to check at runtime.
        </Text>
        <pre><code>{`/* Approved pairings — comment which WCAG level they meet */
--pair-primary:       /* violet-600 on white — AA (5.2:1) */
  background: var(--color-interactive-primary);
  color: #ffffff;

--pair-text-default:  /* gray-900 on white — AAA (18.1:1) */
  background: white;
  color: var(--color-text-default);

/* Flag this in component review — only passes at large size */
--pair-subtle:        /* violet-600 on violet-100 — AA Large only */
  background: var(--color-interactive-subtle);
  color: var(--color-interactive-primary);`}</code></pre>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[3].id}>{toc[3].label}</Heading>
        <Text as="p" size="3" mb="3">
          WCAG 1.4.11 (Non-text Contrast, AA) requires 3:1 contrast for:
        </Text>
        <ul>
          <li>UI component boundaries (input borders, button outlines)</li>
          <li>Focus indicators</li>
          <li>Graphical objects (icons used to convey information, chart lines)</li>
        </ul>
        <Text as="p" size="3" mb="3">
          This is frequently missed. A gray border on a white background is often the failure point. Check your input and form element borders — they're the most common violation in audit findings.
        </Text>

        <DocNav currentPath={pathname} />
    </article>
    </>
  )
}
