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
      <article className="prose">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Foundations</span>
        </div>
        <h1>Color</h1>
        <p className="text-lg text-gray-500 mt-2 mb-8" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
          A color system is a structured set of palette and semantic decisions. Without one, the same interactive state gets a different shade in every component and the visual language breaks down.
        </p>

        <h2 id="palette">The palette structure</h2>
        <p>
          Start with a global palette — a full range of named steps for each color. I use 50–900 steps (following Tailwind's approach), which gives enough resolution for subtle backgrounds, borders, and high-contrast text.
        </p>

        {palette.map(color => (
          <div key={color.name} className="my-4">
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">{color.name}</p>
            <div className="flex gap-1.5">
              {color.shades.map(shade => (
                <div key={shade.step} className="flex-1 min-w-0">
                  <div
                    className="h-10 rounded-md mb-1"
                    style={{ background: shade.hex }}
                    title={shade.hex}
                    aria-label={`${color.name} ${shade.step}: ${shade.hex}`}
                  />
                  <p className="text-center text-gray-400 m-0" style={{ fontSize: '0.65rem', fontFamily: 'JetBrains Mono, monospace' }}>
                    {shade.step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <p>
          The global palette should be exhaustive but not opinionated about usage. It's a vocabulary — semantic tokens assign the meaning.
        </p>

        <h2 id="semantic">Semantic color roles</h2>
        <p>
          Semantic tokens give names to color roles. The four main categories:
        </p>
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

        <h2 id="dark-mode">Dark mode</h2>
        <p>
          Dark mode is where a semantic token layer pays off immediately. With semantic tokens, dark mode is a token override — not a stylesheet full of overrides on every component.
        </p>
        <pre><code>{`[data-theme="dark"] {
  --color-interactive-primary:    var(--global-violet-400);
  --color-text-default:           var(--global-gray-50);
  --color-text-secondary:         var(--global-gray-400);
  --color-interactive-subtle:     var(--global-violet-900);
}`}</code></pre>

        <Callout type="warning" title="Don't just invert">
          Dark mode isn't a color inversion. Dark surfaces should use slightly elevated grays (not pure black), and you often need to reduce the saturation of accent colors to prevent them from vibrating against dark backgrounds.
        </Callout>

        <h2 id="contrast">Contrast & accessibility</h2>
        <p>
          <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">WCAG 2.1</a> sets minimums: 4.5:1 for body text, 3:1 for large text and UI components. WCAG 3.0 introduces <a href="https://apcacontrast.com/" target="_blank" rel="noopener noreferrer">APCA</a>, a perceptual model that factors in font weight and size.
        </p>
        <p>
          Bake contrast checking into your token definition process. Tools like Figma's built-in checker, <code>contrast-color</code> npm package, or Polychrome can flag violations before they ship.
        </p>

        <DocNav currentPath={pathname} />
      </article>
    </>
  )
}
