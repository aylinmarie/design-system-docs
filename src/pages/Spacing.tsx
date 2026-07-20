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
  { name: 'spacing.0', value: '0px', px: 0 },
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
      <article className="prose">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Foundations</span>
        </div>
        <h1>Spacing & Grid</h1>
        <p className="text-lg text-gray-500 mt-2 mb-8" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
          Spacing and layout are where visual rhythm lives. Consistent spacing makes interfaces feel considered, not arbitrary.
        </p>

        <h2 id={toc[0].id}>{toc[0].label}</h2>
        <p>
          Every spacing system starts from a base unit. <strong>4px</strong> works well — everything becomes a multiple of 4. It's granular enough for tight UI work and constrained enough to prevent arbitrary values.
        </p>
        <p>
          Some teams use 8px as the base (the "8-point grid"). 4px is more flexible for component-level spacing while still being consistent at the layout level.
        </p>

        <Callout type="tip" title="Enforce via tokens, not convention">
          "Use multiples of 4" only works if it's hard to do otherwise. Spacing tokens make it structural — designers pick from a finite set, and engineers map to a Tailwind scale or CSS custom properties. Arbitrary values become obvious violations.
        </Callout>

        <h2 id={toc[1].id}>{toc[1].label}</h2>
        <p>
          The scale below is a solid starting point. Steps 1–6 are for component-level spacing; 8–16 for layout-level spacing.
        </p>

        <div className="my-6 rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Spacing scale (4px base)</p>
          </div>
          <div className="divide-y divide-gray-50">
            {spacingScale.filter(s => s.px > 0).map(step => (
              <div key={step.name} className="flex items-center gap-4 px-4 py-2">
                <code className="text-xs text-violet-500 w-28 flex-shrink-0" style={{ fontFamily: 'JetBrains Mono, monospace', background: 'none', border: 'none', padding: 0 }}>
                  {step.name}
                </code>
                <div
                  className="flex-shrink-0"
                  style={{ width: `${Math.min(step.px * 3, 240)}px`, height: '16px', background: 'rgba(124, 58, 237, 0.15)', borderRadius: '3px', minWidth: '4px' }}
                  aria-hidden="true"
                />
                <code className="text-xs text-gray-400 ml-auto" style={{ fontFamily: 'JetBrains Mono, monospace', background: 'none', border: 'none', padding: 0 }}>
                  {step.value}
                </code>
              </div>
            ))}
          </div>
        </div>

        <h2 id={toc[2].id}>{toc[2].label}</h2>
        <p>
          A layout grid defines how content aligns within a viewport. The standard web approach:
        </p>
        <ul>
          <li><strong>12 columns</strong> — gives the most flexibility for 1, 2, 3, 4, and 6-column layouts</li>
          <li><strong>24px gutter</strong> — increases to 32px on large screens</li>
          <li><strong>16–24px margin</strong> — the outer padding on small screens</li>
          <li><strong>Max-width container</strong> — 1280px or 1440px on large displays</li>
        </ul>

        <p>
          Document your breakpoints explicitly. A common five-step set: <code>xs (0)</code>, <code>sm (640)</code>, <code>md (768)</code>, <code>lg (1024)</code>, <code>xl (1280)</code>. Match these to your token system and your team's mental model.
        </p>

        <h2 id={toc[3].id}>{toc[3].label}</h2>
        <p>
          Spacing tokens come in two flavors: raw scale tokens, and semantic component tokens.
        </p>
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
