import { Heading, Text } from '@radix-ui/themes'
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
      <article className="doc-article">
        <Text size="1" weight="bold" color="violet" className="doc-category">Component Architecture</Text>
        <Heading as="h1" size="8" mb="2">Component API Design</Heading>
        <Text as="p" size="3" color="gray" className="doc-lead">
          A component's API is a contract with every team that uses it. Design it with the same care you'd give a public SDK.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[0].id}>{toc[0].label}</Heading>
        <Text as="p" size="3" mb="3">Good component APIs share common traits:</Text>
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

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[1].id}>{toc[1].label}</Heading>
        <Text as="p" size="3" mb="3">
          Props-only APIs break down when component interiors need to be customized. Use slots (named children) to give consumers control over interior content without exposing every internal detail:
        </Text>
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
        <Text as="p" size="3" mb="3">
          The slot pattern is more verbose but far more flexible. Reserve props-only APIs for truly atomic components where slot composition would be unnecessary.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[2].id}>{toc[2].label}</Heading>
        <Text as="p" size="3" mb="3">
          A common API design question: should visual variations be a single <code>variant</code> prop or separate boolean props?
        </Text>
        <Text as="p" size="3" mb="3">
          Use a <code>variant</code> prop when variations are <strong>mutually exclusive</strong> (a button can't be both primary and secondary). Use separate props when variations are <strong>independent</strong> (a button can be loading AND disabled at the same time).
        </Text>
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

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[3].id}>{toc[3].label}</Heading>
        <Text as="p" size="3" mb="3">
          The most extensible design system architecture separates logic and behavior from styling. Radix UI popularized this pattern: headless, unstyled primitives that handle accessibility and interaction, with styling layered on top.
        </Text>
        <Text as="p" size="3" mb="3">The benefits:</Text>
        <ul>
          <li>Product teams can fully control the visual appearance without fighting the component's built-in styles</li>
          <li>Accessibility behavior is shared; visual expression is not</li>
          <li>Easier to adopt gradually — teams can use the primitive without adopting the full design system aesthetic</li>
        </ul>
        <Text as="p" size="3" mb="3">
          Libraries worth knowing: <a href="https://www.radix-ui.com/" target="_blank" rel="noopener noreferrer">Radix UI</a>, <a href="https://react-spectrum.adobe.com/react-aria/" target="_blank" rel="noopener noreferrer">React Aria</a> (Adobe), <a href="https://headlessui.com/" target="_blank" rel="noopener noreferrer">Headless UI</a> (Tailwind Labs). These are solid foundations to build a component library on top of, rather than implementing accessibility primitives from scratch.
        </Text>

        <DocNav currentPath={pathname} />
    </article>
    </>
  )
}
