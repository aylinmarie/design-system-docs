import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'
import { Search, Bell, Settings, ArrowRight, Check, X, ChevronDown, Home, User, Lock, Eye, Star, Heart } from 'lucide-react'

const toc: TocItem[] = [
  { id: 'icon-system', label: 'Designing the system', level: 2 },
  { id: 'sizes', label: 'Sizes & grid', level: 2 },
  { id: 'accessibility', label: 'Accessible icons', level: 2 },
  { id: 'delivery', label: 'Delivery formats', level: 2 },
]

const sampleIcons = [
  { icon: Search, name: 'Search' },
  { icon: Bell, name: 'Bell' },
  { icon: Settings, name: 'Settings' },
  { icon: ArrowRight, name: 'ArrowRight' },
  { icon: Check, name: 'Check' },
  { icon: X, name: 'X' },
  { icon: ChevronDown, name: 'ChevronDown' },
  { icon: Home, name: 'Home' },
  { icon: User, name: 'User' },
  { icon: Lock, name: 'Lock' },
  { icon: Eye, name: 'Eye' },
  { icon: Star, name: 'Star' },
  { icon: Heart, name: 'Heart' },
]

export function Iconography() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="prose">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Foundations</span>
        </div>
        <h1>Iconography</h1>
        <p className="text-lg text-gray-500 mt-2 mb-8" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
          Icons are functional glyphs, not decoration. They need to be legible, consistent, and accessible.
        </p>

        <h2 id={toc[0].id}>{toc[0].label}</h2>
        <p>
          Most teams don't design their own icon set — they choose an existing one and customize it. The decision criteria:
        </p>
        <ul>
          <li><strong>Visual style consistency</strong> — stroke weight, corner radius, and fill approach should be uniform</li>
          <li><strong>Coverage</strong> — does it have the icons your product needs? Industry icons, directional arrows, status indicators?</li>
          <li><strong>License</strong> — MIT-licensed sets (Lucide, Heroicons, Phosphor) are safe for commercial use</li>
          <li><strong>Figma support</strong> — the set should have a Figma library with components, not just SVG exports</li>
        </ul>

        {/* Icon showcase */}
        <div className="my-6 rounded-xl border border-gray-100 p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Sample icon set (Lucide)</p>
          <div className="flex flex-wrap gap-4">
            {sampleIcons.map(({ icon: Icon, name }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg hover:bg-violet-50 transition-colors cursor-default"
                title={name}
              >
                <Icon size={20} className="text-gray-700" aria-hidden="true" />
                <span className="text-gray-400" style={{ fontSize: '0.6rem', fontFamily: 'JetBrains Mono, monospace' }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <h2 id={toc[1].id}>{toc[1].label}</h2>
        <p>
          Icons should be drawn on a consistent grid (16×16 or 24×24 being most common) and scaled in multiples. Define your sizes as tokens:
        </p>
        <ul>
          <li><strong>12px</strong> — status indicators inside dense UI</li>
          <li><strong>16px</strong> — inline with text, most common UI size</li>
          <li><strong>20px</strong> — nav items, primary actions</li>
          <li><strong>24px</strong> — empty states, feature icons, large CTAs</li>
          <li><strong>32–48px</strong> — illustration-scale icons</li>
        </ul>

        <Callout type="tip" title="Optical size matters">
          A 24px icon scaled to 16px looks thin and weak. An icon drawn for 16px has a heavier stroke that compensates for its small size. Use icons from the correct size grid, or switch to a variable icon set that handles this automatically.
        </Callout>

        <h2 id={toc[2].id}>{toc[2].label}</h2>
        <p>
          Icons are one of the most common sources of accessibility failures. The rule is simple:
        </p>
        <ul>
          <li><strong>Decorative icons</strong> (always paired with visible text) → <code>aria-hidden="true"</code></li>
          <li><strong>Standalone icons</strong> (icon-only buttons) → need an accessible name via <code>aria-label</code> or a visually hidden label</li>
          <li><strong>Informational icons</strong> (status indicators, severity) → need a text alternative nearby or <code>aria-label</code></li>
        </ul>
        <pre><code>{`<!-- Decorative icon — hidden from screen readers -->
<button>
  <SearchIcon aria-hidden="true" />
  Search
</button>

<!-- Standalone icon button — needs accessible name -->
<button aria-label="Search">
  <SearchIcon aria-hidden="true" />
</button>

<!-- Informational icon — status must be communicated -->
<span>
  <ErrorIcon aria-hidden="true" />
  <span class="sr-only">Error: </span>
  Invalid email address
</span>`}</code></pre>

        <h2 id={toc[3].id}>{toc[3].label}</h2>
        <p>
          Three options for delivering icons in a design system:
        </p>
        <ol>
          <li><strong>SVG sprites</strong> — a single SVG file with all icons, referenced by ID. Good for performance; requires a build step.</li>
          <li><strong>Inline SVG components</strong> — each icon is a React (or Vue, Svelte) component. Best DX; slightly larger bundle if not tree-shaken properly.</li>
          <li><strong>Icon font</strong> — avoid. Poor accessibility, rendering artifacts, and loading behavior.</li>
        </ol>

        <DocNav currentPath={pathname} />
      </article>
    </>
  )
}
