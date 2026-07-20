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

export function AccessibilityContrast() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="prose">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Accessibility</span>
        </div>
        <h1>Color & Contrast</h1>
        <p className="text-lg text-gray-500 mt-2 mb-8" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
          Contrast is a prerequisite for legibility. Every text and interactive element needs a measurable, passing contrast ratio.
        </p>

        <h2 id="ratios">Contrast ratios</h2>
        <p>
          WCAG contrast ratios are calculated against the relative luminance of foreground and background colors. The formula is well-defined but rarely done by hand — use a checker.
        </p>

        <div className="my-6 rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">System color pairings — contrast check</p>
          </div>
          <div className="divide-y divide-gray-50">
            {contrastPairs.map((pair, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3">
                <div
                  className="w-20 h-8 rounded-md flex-shrink-0 flex items-center justify-center text-xs font-medium border border-gray-100"
                  style={{ background: pair.bg, color: pair.text }}
                >
                  Sample
                </div>
                <div className="flex-1 text-xs text-gray-500">
                  <span className="text-gray-700 font-medium">{pair.bgLabel}</span>
                  <span className="text-gray-300 mx-1">/</span>
                  <span>{pair.textLabel}</span>
                </div>
                <span className="text-xs font-mono text-gray-600">{pair.ratio}</span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded"
                  style={{
                    background: pair.pass === 'AAA' ? '#dcfce7' : pair.pass === 'AA' ? '#ede9fe' : '#fef9c3',
                    color: pair.pass === 'AAA' ? '#15803d' : pair.pass === 'AA' ? '#7c3aed' : '#854d0e',
                  }}
                >
                  {pair.pass}
                </span>
              </div>
            ))}
          </div>
        </div>

        <h2 id="wcag3">WCAG 3 & APCA</h2>
        <p>
          <a href="https://www.w3.org/TR/wcag-3.0/" target="_blank" rel="noopener noreferrer">WCAG 3</a> introduces the <a href="https://apcacontrast.com/" target="_blank" rel="noopener noreferrer">Advanced Perceptual Contrast Algorithm (APCA)</a>, which is a more accurate model of human contrast perception. Differences from WCAG 2.1:
        </p>
        <ul>
          <li>APCA is asymmetric — light text on dark is scored differently than dark text on light</li>
          <li>Font weight and size are factored into the score, not just color</li>
          <li>The score is a "Lc" value (Lightness Contrast), not a ratio like 4.5:1</li>
          <li>APCA allows some combinations that WCAG 2.1 fails, and fails some it passes</li>
        </ul>

        <Callout type="info">
          APCA is not yet the legal standard anywhere. Target <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">WCAG 2.1</a> AA for compliance; use APCA for a more accurate perceptual quality check. The Figma plugin "Contrast" and the <a href="https://apcacontrast.com/" target="_blank" rel="noopener noreferrer">APCA calculator</a> both support it.
        </Callout>

        <h2 id="token-pairs">Safe token pairings</h2>
        <p>
          The safest approach: define which token combinations are valid. Document approved background / foreground pairings so components don't have to check at runtime.
        </p>
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

        <h2 id="non-text">Non-text contrast</h2>
        <p>
          WCAG 1.4.11 (Non-text Contrast, AA) requires 3:1 contrast for:
        </p>
        <ul>
          <li>UI component boundaries (input borders, button outlines)</li>
          <li>Focus indicators</li>
          <li>Graphical objects (icons used to convey information, chart lines)</li>
        </ul>
        <p>
          This is frequently missed. A gray border on a white background is often the failure point. Check your input and form element borders — they're the most common violation in audit findings.
        </p>

        <DocNav currentPath={pathname} />
      </article>
    </>
  )
}
