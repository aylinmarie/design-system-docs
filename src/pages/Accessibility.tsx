import { Box, Heading, Text, Flex } from '@radix-ui/themes'
import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'wcag', label: 'WCAG conformance levels', level: 2 },
  { id: 'system-role', label: "The system's role", level: 2 },
  { id: 'built-in', label: 'Baking in accessibility', level: 2 },
  { id: 'testing', label: 'Testing strategy', level: 2 },
]

const wcagLevels = [
  { level: 'A', color: '#22c55e', label: 'Minimum', desc: 'Basic access. Failing A criteria creates hard blocks for assistive technology users. These are non-negotiable.' },
  { level: 'AA', color: '#7c3aed', label: 'Standard', desc: 'The legal standard in most jurisdictions and the target for most products. Covers contrast, keyboard access, and error handling.' },
  { level: 'AAA', color: '#6366f1', label: 'Enhanced', desc: 'The highest level. Not required for entire sites but worth targeting for specific high-priority flows.' },
]

export function Accessibility() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="doc-article">
        <Text size="1" weight="bold" color="violet" className="doc-category">Accessibility</Text>
        <Heading as="h1" size="8" mb="2">Why it matters</Heading>
        <Text as="p" size="3" color="gray" className="doc-lead">
          Accessibility is a technical and design standard that determines whether your product works for the full range of people who use it — including those with visual, motor, cognitive, or auditory disabilities.
        </Text>

        <Callout type="tip" title="The multiplier effect">
          Fix accessibility in the system once and every product team that consumes it inherits the fix. That's a much better return than each team solving the same problem independently.
        </Callout>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[0].id}>{toc[0].label}</Heading>
        <Text as="p" size="3" mb="3">
          The <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">Web Content Accessibility Guidelines (WCAG)</a> organize requirements into three levels:
        </Text>

        <Box mb="5">
          {wcagLevels.map(item => (
            <Flex key={item.level} gap="4" align="start" p="4" mb="3" style={{ border: '1px solid var(--gray-a5)', borderRadius: 'var(--radius-3)' }}>
              <Box
                className="wcag-badge"
                style={{ '--badge-bg': item.color } as React.CSSProperties}
                aria-label={`Level ${item.level}`}
              >
                {item.level}
              </Box>
              <Box>
                <Text as="div" size="2" weight="bold" mb="1">{item.label}</Text>
                <Text as="div" size="2" color="gray">{item.desc}</Text>
              </Box>
            </Flex>
          ))}
        </Box>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[1].id}>{toc[1].label}</Heading>
        <Text as="p" size="3" mb="3">
          A design system can't guarantee accessible products — that depends on how components are used in context. But it can dramatically raise the floor by making accessible patterns the default and inaccessible patterns harder to produce.
        </Text>
        <Text as="p" size="3" mb="3">What the system should own:</Text>
        <ul>
          <li>Focus management and visible focus styles on all interactive elements</li>
          <li>Color token pairings that pass contrast in their intended combinations</li>
          <li>Semantic HTML choices in component markup (not just <code>div</code> everywhere)</li>
          <li>ARIA patterns for complex widgets (modals, comboboxes, tabs, trees)</li>
          <li>Motion reduction support via <code>prefers-reduced-motion</code></li>
        </ul>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[2].id}>{toc[2].label}</Heading>
        <Text as="p" size="3" mb="3">Concrete things to do at the system level:</Text>
        <h3>Focus styles</h3>
        <Text as="p" size="3" mb="3">
          Never remove focus outlines without replacing them. The default browser focus ring is ugly but functional — replace it with a branded, clearly visible ring:
        </Text>
        <pre><code>{`/* System-level focus reset */
:focus-visible {
  outline: 2px solid var(--color-interactive-primary);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Remove outline for mouse users — :focus-visible handles this
   automatically, but be explicit for older browser support */
:focus:not(:focus-visible) {
  outline: none;
}`}</code></pre>

        <h3>Motion</h3>
        <pre><code>{`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}</code></pre>

        <h3>Skip links</h3>
        <Text as="p" size="3" mb="3">
          Every page that includes a navigation sidebar needs a "Skip to main content" link as the first focusable element:
        </Text>
        <pre><code>{`<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>`}</code></pre>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[3].id}>{toc[3].label}</Heading>
        <Text as="p" size="3" mb="3">
          Automated tools catch ~30–40% of accessibility issues. Manual testing catches the rest. A solid strategy covers both:
        </Text>
        <ol>
          <li><strong>Automated</strong> — axe-core in CI (via jest-axe or Playwright), catching contrast failures, missing labels, and structure issues</li>
          <li><strong>Keyboard testing</strong> — navigate every component with Tab, Shift+Tab, Enter, Space, Escape, and arrow keys</li>
          <li><strong>Screen reader testing</strong> — VoiceOver on macOS, NVDA + Chrome on Windows. Quarterly audits at minimum.</li>
          <li><strong>Zoom testing</strong> — test at 200% and 400% zoom. Content should reflow, not overflow.</li>
        </ol>

        <Callout type="info">
          Add axe-core to your Storybook or component test suite. A failure caught at the system level fixes every product that consumes that component — which is a much better return than catching it in individual product code reviews.
        </Callout>

        <DocNav currentPath={pathname} />
    </article>
    </>
  )
}
