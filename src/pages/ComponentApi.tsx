import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'props-api', label: 'Designing the props API', level: 2 },
  { id: 'slots', label: 'Slots & composition', level: 2 },
  { id: 'variants', label: 'Variants vs. props', level: 2 },
  { id: 'primitives', label: 'Unstyled primitives', level: 2 },
]

export function ComponentApi() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="prose">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Component Architecture</span>
        </div>
        <h1>Component API Design</h1>
        <p className="text-lg text-gray-500 mt-2 mb-8" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
          A component's API is a contract with every team that uses it. Design it with the same care you'd give a public SDK.
        </p>

        <h2 id="props-api">Designing the props API</h2>
        <p>
          Good component APIs share common traits:
        </p>
        <ul>
          <li><strong>Minimal surface area</strong> — expose only what users need to control. Every prop is a maintenance commitment.</li>
          <li><strong>Sensible defaults</strong> — the most common use case should require zero props</li>
          <li><strong>Consistent naming</strong> — use the same prop names across similar components. <code>isDisabled</code> vs <code>disabled</code> — pick one and stick to it.</li>
          <li><strong>Semantic types</strong> — use string unions over booleans for states: <code>size="sm" | "md" | "lg"</code> is more extensible than <code>isSmall</code></li>
        </ul>
        <pre><code>{`// ❌ Inconsistent, unclear API
<Button
  btnColor="blue"
  big
  notDisabled={false}
  handleClick={fn}
/>

// ✅ Consistent, semantic API
<Button
  variant="primary"
  size="lg"
  isDisabled={false}
  onClick={fn}
/>`}</code></pre>

        <Callout type="tip" title="The rule of least surprise">
          If a developer has to read the documentation to understand a prop, the prop name is wrong. Name it so the usage is self-documenting.
        </Callout>

        <h2 id="slots">Slots & composition</h2>
        <p>
          Props-only APIs break down when component interiors need to be customized. Use slots (named children) to give consumers control over interior content without exposing every internal detail:
        </p>
        <pre><code>{`// Rigid props-only API — inflexible
<Card
  title="Revenue"
  subtitle="Last 30 days"
  icon="chart"
  value="$12,400"
/>

// Composable slot-based API — flexible
<Card>
  <Card.Header>
    <ChartIcon aria-hidden="true" />
    <Card.Title>Revenue</Card.Title>
    <Card.Subtitle>Last 30 days</Card.Subtitle>
  </Card.Header>
  <Card.Body>
    <MetricValue value={12400} currency="USD" />
  </Card.Body>
</Card>`}</code></pre>
        <p>
          The slot pattern is more verbose but far more flexible. Reserve props-only APIs for truly atomic components where slot composition would be unnecessary.
        </p>

        <h2 id="variants">Variants vs. props</h2>
        <p>
          A common API design question: should visual variations be a single <code>variant</code> prop or separate boolean props?
        </p>
        <p>
          Use a <code>variant</code> prop when variations are <strong>mutually exclusive</strong> (a button can't be both primary and secondary). Use separate props when variations are <strong>independent</strong> (a button can be loading AND disabled at the same time).
        </p>
        <pre><code>{`// Variant — mutually exclusive visual treatments
<Button variant="primary" />
<Button variant="secondary" />
<Button variant="destructive" />

// Independent props — combinable states
<Button
  variant="primary"
  isLoading={isSubmitting}
  isDisabled={!isValid}
/>`}</code></pre>

        <h2 id="primitives">Unstyled primitives</h2>
        <p>
          The most extensible design system architecture separates logic and behavior from styling. Radix UI popularized this pattern: headless, unstyled primitives that handle accessibility and interaction, with styling layered on top.
        </p>
        <p>
          The benefits:
        </p>
        <ul>
          <li>Product teams can fully control the visual appearance without fighting the component's built-in styles</li>
          <li>Accessibility behavior is shared; visual expression is not</li>
          <li>Easier to adopt gradually — teams can use the primitive without adopting the full design system aesthetic</li>
        </ul>
        <p>
          Libraries worth knowing: <a href="https://www.radix-ui.com/" target="_blank" rel="noopener noreferrer">Radix UI</a>, <a href="https://react-spectrum.adobe.com/react-aria/" target="_blank" rel="noopener noreferrer">React Aria</a> (Adobe), <a href="https://headlessui.com/" target="_blank" rel="noopener noreferrer">Headless UI</a> (Tailwind Labs). These are solid foundations to build a component library on top of, rather than implementing accessibility primitives from scratch.
        </p>

        <DocNav currentPath={pathname} />
      </article>
    </>
  )
}
