import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'atomic-design', label: 'Atomic design in practice', level: 2 },
  { id: 'compound', label: 'Compound components', level: 2 },
  { id: 'context', label: 'Context & state sharing', level: 2 },
]

export function Composition() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="prose">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Component Architecture</span>
        </div>
        <h1>Composition Patterns</h1>
        <p className="text-lg text-gray-500 mt-2 mb-8" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
          Components compose upward. The patterns you choose at the component level determine how flexible the system is at the product level.
        </p>

        <h2 id="atomic-design">Atomic design in practice</h2>
        <p>
          Brad Frost's atomic design gives us a useful vocabulary: atoms (Button, Input), molecules (FormField = Label + Input + Error), organisms (LoginForm = multiple molecules), templates, and pages.
        </p>
        <p>
          In practice, I've found that strict adherence to all five levels creates overhead without benefit. The more useful distinction is between:
        </p>
        <ul>
          <li><strong>Primitive components</strong> — atomic, low-level (Button, Input, Icon, Badge). These live in the design system.</li>
          <li><strong>Pattern components</strong> — composed from primitives (DataTable, SearchBar, Toast). These can live in the system or in a shared product layer.</li>
          <li><strong>Product components</strong> — highly specific, assembled from patterns (CheckoutFlow, OnboardingWizard). These live in product code.</li>
        </ul>
        <p>
          The design system should own primitives and some widely-shared patterns. It shouldn't try to own product components — that's where teams need maximum flexibility.
        </p>

        <h2 id="compound">Compound components</h2>
        <p>
          Compound components are a pattern where multiple sub-components work together through shared context, rather than a single monolithic component with dozens of props:
        </p>
        <pre><code>{`// Compound component pattern
<Select value={selected} onChange={setSelected}>
  <Select.Trigger>
    <Select.Value placeholder="Choose a country" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Content>
      <Select.ScrollUpButton />
      <Select.Viewport>
        <Select.Item value="us">United States</Select.Item>
        <Select.Item value="ca">Canada</Select.Item>
        <Select.Item value="uk">United Kingdom</Select.Item>
      </Select.Viewport>
      <Select.ScrollDownButton />
    </Select.Content>
  </Select.Portal>
</Select>`}</code></pre>
        <p>
          This pattern (used by Radix UI) gives consumers fine-grained control over every part of the component while keeping the logic and accessibility centralized.
        </p>

        <Callout type="tip" title="The complexity tradeoff">
          Compound components are more powerful but more complex for consumers to learn. Use them for complex widgets (Select, Dialog, Tabs, Menu). For simple components, a flat props API is easier to adopt.
        </Callout>

        <h2 id="context">Context & state sharing</h2>
        <p>
          Compound components usually rely on React context to share state between parent and children without prop drilling. The pattern:
        </p>
        <pre><code>{`// Internal context for compound component state
const SelectContext = createContext<SelectContextValue | null>(null)

function useSelectContext() {
  const ctx = useContext(SelectContext)
  if (!ctx) throw new Error('Must be used within <Select>')
  return ctx
}

// Parent component provides context
export function Select({ value, onChange, children }) {
  return (
    <SelectContext.Provider value={{ value, onChange }}>
      {children}
    </SelectContext.Provider>
  )
}

// Sub-component consumes it
export function SelectItem({ value, children }) {
  const { value: selected, onChange } = useSelectContext()
  return (
    <li
      role="option"
      aria-selected={selected === value}
      onClick={() => onChange(value)}
    >
      {children}
    </li>
  )
}`}</code></pre>

        <DocNav currentPath={pathname} />
      </article>
    </>
  )
}
