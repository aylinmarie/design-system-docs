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
  { name: 'global.color.violet.600', value: '#7c3aed', label: '#7c3aed' },
  { name: 'global.color.violet.100', value: '#ede9fe', label: '#ede9fe' },
  { name: 'global.color.gray.900', value: '#111827', label: '#111827' },
  { name: 'global.color.gray.50', value: '#f9fafb', label: '#f9fafb' },
]

const semanticTokens = [
  { name: 'color.interactive.primary', references: 'global.color.violet.600', value: '#7c3aed' },
  { name: 'color.text.default', references: 'global.color.gray.900', value: '#111827' },
  { name: 'color.surface.subtle', references: 'global.color.gray.50', value: '#f9fafb' },
]

export function DesignTokens() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="prose">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Foundations</span>
        </div>
        <h1>Design Tokens</h1>
        <p className="text-lg text-gray-500 mt-2 mb-8" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
          The atomic decisions of your system. Every visual property that repeats is a candidate for a token.
        </p>

        <h2 id="what-are-tokens">What are tokens?</h2>
        <p>
          Design tokens are named entities that store design values. Instead of hardcoding <code>#7c3aed</code> in a component, you reference <code>color.interactive.primary</code>. The name carries intent; the value can change without the component knowing.
        </p>
        <p>
          This indirection is what makes tokens powerful. You can theme your system, support dark mode, and swap brand colors without touching component code.
        </p>

        {/* Live token demo */}
        <div className="my-6 rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Global color tokens</p>
          </div>
          <div className="divide-y divide-gray-50">
            {tokenSwatches.map(token => (
              <div key={token.name} className="flex items-center gap-4 px-4 py-3">
                <div
                  className="w-8 h-8 rounded-md flex-shrink-0 border border-gray-100"
                  style={{ background: token.value }}
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <code className="text-xs text-gray-700" style={{ fontFamily: 'JetBrains Mono, monospace', background: 'none', border: 'none', padding: 0 }}>
                    {token.name}
                  </code>
                </div>
                <code className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace', background: 'none', border: 'none', padding: 0 }}>
                  {token.label}
                </code>
              </div>
            ))}
          </div>
        </div>

        <h2 id="taxonomy">Taxonomy: global → semantic → component</h2>
        <p>
          The most scalable token systems I've seen use three tiers:
        </p>

        <h3>1. Global (primitive) tokens</h3>
        <p>
          Raw values — the full palette, the full type scale. Named by what they are, not how they're used. <code>global.color.violet.600</code> is a global token. There can be many of these, and that's fine — they're the vocabulary, not the grammar.
        </p>

        <h3>2. Semantic (alias) tokens</h3>
        <p>
          Intent-bearing names that reference global tokens. <code>color.interactive.primary</code> points to <code>global.color.violet.600</code>. This is the layer you swap for theming. Components reference semantic tokens, never globals directly.
        </p>

        {/* Semantic token table */}
        <div className="my-4 rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Semantic tokens → Global references</p>
          </div>
          <div className="divide-y divide-gray-50">
            {semanticTokens.map(token => (
              <div key={token.name} className="flex items-center gap-4 px-4 py-3">
                <div
                  className="w-6 h-6 rounded flex-shrink-0 border border-gray-100"
                  style={{ background: token.value }}
                  aria-hidden="true"
                />
                <code className="text-xs text-gray-800 flex-1" style={{ fontFamily: 'JetBrains Mono, monospace', background: 'none', border: 'none', padding: 0 }}>
                  {token.name}
                </code>
                <span className="text-gray-300 text-xs">→</span>
                <code className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace', background: 'none', border: 'none', padding: 0 }}>
                  {token.references}
                </code>
              </div>
            ))}
          </div>
        </div>

        <h3>3. Component tokens</h3>
        <p>
          Scoped to a specific component. <code>button.background.primary</code> → <code>color.interactive.primary</code>. Use these when components have unique styling needs that shouldn't be shared globally.
        </p>

        <Callout type="tip" title="Start with semantic tokens">
          Most teams start with component tokens and then struggle to theme the system. Start with semantic tokens — they give you theming for free.
        </Callout>

        <h2 id="naming">Naming conventions</h2>
        <p>
          Good token names follow a predictable pattern. I use <code>category.property.variant.state</code>:
        </p>

        <pre><code>{`// Category: what it applies to
// Property: what visual attribute
// Variant: which variant of that attribute
// State: optional — hover, focus, disabled

color.text.default          // default body text
color.text.muted            // secondary/helper text
color.border.interactive    // borders on interactive elements
color.border.interactive.focus  // focus state border
spacing.component.padding.sm    // small component padding`}</code></pre>

        <p>Avoid encoding values in names (<code>color-gray-200</code> is a global token, not a semantic one) and avoid encoding components in semantic names (<code>button-blue</code> leaks into the wrong tier).</p>

        <h2 id="tooling">Tooling & delivery</h2>
        <p>
          The primary tools in this space:
        </p>
        <ul>
          <li><a href="https://styledictionary.com/" target="_blank" rel="noopener noreferrer"><strong>Style Dictionary</strong></a> (Amazon) — transform tokens into CSS custom properties, Sass variables, iOS/Android formats. The most battle-tested tool.</li>
          <li><strong>Theo</strong> (Salesforce) — similar to Style Dictionary, slightly different DX.</li>
          <li><strong>Token Pipeline</strong> / <strong>Token Transformer</strong> — part of the <a href="https://tokens.studio/" target="_blank" rel="noopener noreferrer">Tokens Studio</a> ecosystem, closer to the W3C spec format.</li>
          <li><a href="https://tokens.studio/" target="_blank" rel="noopener noreferrer"><strong>Tokens Studio for Figma</strong></a> — design-side authoring that outputs W3C-format JSON, consumed by a build step.</li>
        </ul>

        <p>The general architecture looks like this:</p>
        <pre><code>{`Design (Figma / Tokens Studio)
  ↓  JSON token files
Build step (Style Dictionary)
  ↓  Platform-specific outputs
├── CSS custom properties  (web)
├── Swift/ObjC constants  (iOS)
└── Kotlin constants       (Android)`}</code></pre>

        <h2 id="token-formats">Token formats (W3C)</h2>
        <p>
          The <a href="https://www.w3.org/community/design-tokens/" target="_blank" rel="noopener noreferrer">W3C Design Tokens Community Group</a> is standardizing a JSON format for design tokens. Aligning to it makes your tokens portable between tools — Tokens Studio, Style Dictionary, and others already support reading and writing this format.
        </p>
        <pre><code>{`{
  "color": {
    "interactive": {
      "primary": {
        "$value": "{global.color.violet.600}",
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
