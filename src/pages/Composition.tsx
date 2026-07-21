import { Heading, Text } from '@radix-ui/themes'
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
      <article className="doc-article">
        <Text size="1" weight="bold" color="blue" className="doc-category">Component Architecture</Text>
        <Heading as="h1" size="8" mb="2">Composition Patterns</Heading>
        <Text as="p" size="3" color="gray" className="doc-lead">
          Components compose upward. The patterns you choose at the component level determine how flexible the system is at the product level.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[0].id}>{toc[0].label}</Heading>
        <Text as="p" size="3" mb="3">
          Brad Frost's atomic design gives us a useful vocabulary: atoms (Button, Input), molecules (FormField = Label + Input + Error), organisms (LoginForm = multiple molecules), templates, and pages.
        </Text>
        <Text as="p" size="3" mb="3">
          In practice, strict adherence to all five levels creates overhead without benefit. The more useful distinction is between:
        </Text>
        <ul>
          <li><strong>Primitive components</strong> — atomic, low-level (Button, Input, Icon, Badge). These live in the design system.</li>
          <li><strong>Pattern components</strong> — composed from primitives (DataTable, SearchBar, Toast). These can live in the system or in a shared product layer.</li>
          <li><strong>Product components</strong> — highly specific, assembled from patterns (CheckoutFlow, OnboardingWizard). These live in product code.</li>
        </ul>
        <Text as="p" size="3" mb="3">
          The design system should own primitives and some widely-shared patterns. It shouldn't try to own product components — that's where teams need maximum flexibility.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[1].id}>{toc[1].label}</Heading>
        <Text as="p" size="3" mb="3">
          Compound components are a pattern where multiple sub-components work together through shared context, rather than a single monolithic component with dozens of props:
        </Text>
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
        <Text as="p" size="3" mb="3">
          This pattern (used by Radix UI) gives consumers fine-grained control over every part of the component while keeping the logic and accessibility centralized.
        </Text>

        <Callout type="tip" title="The complexity tradeoff">
          Compound components are more powerful but more complex for consumers to learn. Use them for complex widgets (Select, Dialog, Tabs, Menu). For simple components, a flat props API is easier to adopt.
        </Callout>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[2].id}>{toc[2].label}</Heading>
        <Text as="p" size="3" mb="3">
          Compound components usually rely on React context to share state between parent and children without prop drilling. The pattern:
        </Text>
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
