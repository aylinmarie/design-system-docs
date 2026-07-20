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

export function Accessibility() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="prose">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Accessibility</span>
        </div>
        <h1>Why it matters</h1>
        <p className="text-lg text-gray-500 mt-2 mb-8" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
          Accessibility is a technical and design standard that determines whether your product works for the full range of people who use it — including those with visual, motor, cognitive, or auditory disabilities.
        </p>

        <Callout type="tip" title="The multiplier effect">
          Fix accessibility in the system once and every product team that consumes it inherits the fix. That's a much better return than each team solving the same problem independently.
        </Callout>

        <h2 id={toc[0].id}>{toc[0].label}</h2>
        <p>
          The <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">Web Content Accessibility Guidelines (WCAG)</a> organize requirements into three levels:
        </p>

        <div className="my-5 space-y-3">
          {[
            { level: 'A', color: '#22c55e', label: 'Minimum', desc: 'Basic access. Failing A criteria creates hard blocks for assistive technology users. These are non-negotiable.' },
            { level: 'AA', color: '#7c3aed', label: 'Standard', desc: 'The legal standard in most jurisdictions and the target for most products. Covers contrast, keyboard access, and error handling.' },
            { level: 'AAA', color: '#6366f1', label: 'Enhanced', desc: 'The highest level. Not required for entire sites but worth targeting for specific high-priority flows.' },
          ].map(item => (
            <div key={item.level} className="flex gap-4 p-4 rounded-lg border border-gray-100">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white flex-shrink-0 text-sm"
                style={{ background: item.color }}
                aria-label={`Level ${item.level}`}
              >
                {item.level}
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900 mb-0.5">{item.label}</p>
                <p className="text-sm text-gray-600 m-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 id={toc[1].id}>{toc[1].label}</h2>
        <p>
          A design system can't guarantee accessible products — that depends on how components are used in context. But it can dramatically raise the floor by making accessible patterns the default and inaccessible patterns harder to produce.
        </p>
        <p>
          What the system should own:
        </p>
        <ul>
          <li>Focus management and visible focus styles on all interactive elements</li>
          <li>Color token pairings that pass contrast in their intended combinations</li>
          <li>Semantic HTML choices in component markup (not just <code>div</code> everywhere)</li>
          <li>ARIA patterns for complex widgets (modals, comboboxes, tabs, trees)</li>
          <li>Motion reduction support via <code>prefers-reduced-motion</code></li>
        </ul>

        <h2 id={toc[2].id}>{toc[2].label}</h2>
        <p>
          Concrete things to do at the system level:
        </p>
        <h3>Focus styles</h3>
        <p>
          Never remove focus outlines without replacing them. The default browser focus ring is ugly but functional — replace it with a branded, clearly visible ring:
        </p>
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
        <p>
          Every page that includes a navigation sidebar needs a "Skip to main content" link as the first focusable element:
        </p>
        <pre><code>{`<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>`}</code></pre>

        <h2 id={toc[3].id}>{toc[3].label}</h2>
        <p>
          Automated tools catch ~30–40% of accessibility issues. Manual testing catches the rest. A solid strategy covers both:
        </p>
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
