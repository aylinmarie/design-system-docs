import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'type-scale', label: 'The type scale', level: 2 },
  { id: 'typeface-selection', label: 'Typeface selection', level: 2 },
  { id: 'line-height', label: 'Line height & measure', level: 2 },
  { id: 'type-tokens', label: 'Typography tokens', level: 2 },
  { id: 'responsive', label: 'Responsive type', level: 2 },
]

const typeScale = [
  { name: 'display.2xl', size: '3rem', weight: '700', lh: '1.1', sample: 'The quick brown fox', token: 'font.size.display.2xl' },
  { name: 'display.xl', size: '2.25rem', weight: '700', lh: '1.2', sample: 'The quick brown fox jumps', token: 'font.size.display.xl' },
  { name: 'heading.lg', size: '1.5rem', weight: '600', lh: '1.3', sample: 'Section heading example', token: 'font.size.heading.lg' },
  { name: 'heading.md', size: '1.125rem', weight: '600', lh: '1.4', sample: 'Subsection heading for context', token: 'font.size.heading.md' },
  { name: 'body.lg', size: '1rem', weight: '400', lh: '1.7', sample: 'Body text for reading long-form prose content in the interface', token: 'font.size.body.lg' },
  { name: 'body.sm', size: '0.875rem', weight: '400', lh: '1.6', sample: 'Smaller body text for secondary information', token: 'font.size.body.sm' },
  { name: 'label', size: '0.75rem', weight: '600', lh: '1.4', sample: 'LABEL TEXT', token: 'font.size.label' },
]

export function Typography() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="prose">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Foundations</span>
        </div>
        <h1>Typography</h1>
        <p className="text-lg text-gray-500 mt-2 mb-8" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
          A type system is a fixed set of size, weight, and spacing decisions made once, named by purpose, and reused everywhere. Without one, teams pick values ad hoc and the interface reads as inconsistent.
        </p>

        <h2 id={toc[0].id}>{toc[0].label}</h2>
        <p>
          A type scale is a limited set of font sizes with names that describe their purpose, not their pixel value. Naming sizes semantically — <code>heading.lg</code> rather than <code>24px</code> — decouples intent from implementation and makes responsive scaling possible.
        </p>
        <p>
          Use a mathematical ratio to generate your scale. Common ratios: <strong>1.25 (Major Third)</strong> for compact UIs, <strong>1.333 (Perfect Fourth)</strong> for content-heavy products, <strong>1.5 (Perfect Fifth)</strong> for dramatic hierarchy.
        </p>

        {/* Live type scale */}
        <div className="my-6 rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Type scale — Inter, Major Third (1.25)</p>
          </div>
          <div className="divide-y divide-gray-50">
            {typeScale.map(step => (
              <div key={step.name} className="px-4 py-4 flex items-baseline gap-6">
                <div className="w-28 flex-shrink-0">
                  <code className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace', background: 'none', border: 'none', padding: 0 }}>
                    {step.size}
                  </code>
                  <br />
                  <code className="text-xs text-violet-400" style={{ fontFamily: 'JetBrains Mono, monospace', background: 'none', border: 'none', padding: 0 }}>
                    {step.name}
                  </code>
                </div>
                <p
                  className="text-gray-900 m-0"
                  style={{
                    fontSize: step.size,
                    fontWeight: step.weight,
                    lineHeight: step.lh,
                    letterSpacing: parseFloat(step.size) > 1.5 ? '-0.02em' : 'normal',
                  }}
                >
                  {step.sample}
                </p>
              </div>
            ))}
          </div>
        </div>

        <h2 id={toc[1].id}>{toc[1].label}</h2>
        <p>
          Most design systems use one typeface family with a variable or multi-weight setup. Criteria for selecting one:
        </p>
        <ul>
          <li><strong>Legibility at small sizes</strong> — the UI needs to work at 12–14px labels, not just 32px headlines</li>
          <li><strong>Weight range</strong> — you need at least 4 weights: 400, 500, 600, 700</li>
          <li><strong>Numeric variants</strong> — tabular figures for data tables, so numbers align vertically</li>
          <li><strong>OpenType features</strong> — small caps, ligatures, and stylistic sets for richness</li>
          <li><strong>Licensing</strong> — system fonts (Inter, IBM Plex, Source Sans) are free; brand fonts need licensing budget and a fallback stack</li>
        </ul>

        <Callout type="tip" title="Don't use system-ui as your primary typeface">
          System-ui renders differently on Windows vs macOS vs iOS. Use a web font with explicit fallbacks. Inter is the right call for most products — it was designed for screens, has excellent OpenType support, and is free.
        </Callout>

        <h2 id={toc[2].id}>{toc[2].label}</h2>
        <p>
          Two properties that designers often underspecify:
        </p>
        <h3>Line height</h3>
        <p>
          Use a <strong>unitless multiplier</strong> in tokens, not a fixed pixel value. <code>1.7</code> scales with font size; <code>27px</code> doesn't. For headings: 1.1–1.3. For body: 1.6–1.8. For UI labels: 1.3–1.4.
        </p>
        <h3>Measure (line length)</h3>
        <p>
          The optimal reading length is 50–75 characters per line. In CSS: <code>max-width: 65ch</code> on your prose containers. Never let content run full-width on wide screens — it destroys readability.
        </p>

        <h2 id={toc[3].id}>{toc[3].label}</h2>
        <p>
          Tokenize the full type style, not just font size. A type style token bundles size, weight, line height, and letter spacing:
        </p>
        <pre><code>{`{
  "font": {
    "style": {
      "heading.lg": {
        "$type": "typography",
        "$value": {
          "fontFamily": "{font.family.sans}",
          "fontSize": "{font.size.heading.lg}",
          "fontWeight": "{font.weight.semibold}",
          "lineHeight": "{font.lineHeight.tight}",
          "letterSpacing": "-0.015em"
        }
      }
    }
  }
}`}</code></pre>

        <h2 id={toc[4].id}>{toc[4].label}</h2>
        <p>
          Don't just scale text down on mobile — rethink the hierarchy. A 3rem display heading often needs to drop to 2rem on small screens, and the relative weights may need to shift too.
        </p>
        <p>
          Use CSS <code>clamp()</code> for fluid type that scales with the viewport without breakpoint math:
        </p>
        <pre><code>{`/* Fluid display heading: 1.75rem at 320px, 3rem at 1280px */
font-size: clamp(1.75rem, 4vw + 0.5rem, 3rem);`}</code></pre>

        <DocNav currentPath={pathname} />
      </article>
    </>
  )
}
