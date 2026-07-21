import { Box, Heading, Text, Card, Flex } from '@radix-ui/themes'
import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'models', label: 'Contribution models', level: 2 },
  { id: 'intake', label: 'Intake & prioritization', level: 2 },
  { id: 'review', label: 'Review process', level: 2 },
  { id: 'adoption', label: 'Driving adoption', level: 2 },
]

const contributionModels = [
  {
    model: 'Centralized',
    desc: 'A dedicated design system team owns everything. Contributions go through formal review.',
    pro: 'Highest consistency and quality control',
    con: 'Bottleneck at scale; product teams feel blocked',
    when: 'Early-stage systems, small organizations',
  },
  {
    model: 'Federated',
    desc: 'Core team maintains foundations; product teams contribute patterns under guidance.',
    pro: 'Scales with the organization; reduces bottlenecks',
    con: 'Requires strong documentation and review processes to maintain quality',
    when: 'Most medium-to-large organizations',
  },
  {
    model: 'Distributed',
    desc: 'Any team can contribute; system team curates and ratifies.',
    pro: 'Maximum contribution velocity',
    con: 'High governance overhead; inconsistency risk without strong tooling',
    when: 'Large orgs with mature systems and established culture',
  },
]

export function Governance() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="doc-article">
        <Text size="1" weight="bold" color="violet" className="doc-category">Governance</Text>
        <Heading as="h1" size="8" mb="2">Contribution Model</Heading>
        <Text as="p" size="3" color="gray" className="doc-lead">
          Who can contribute what, and how? Governance is what separates a design system that scales from one that quietly forks.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[0].id}>{toc[0].label}</Heading>
        <Text as="p" size="3" mb="3">Three archetypes, each with different tradeoffs:</Text>

        <Box mb="5">
          {contributionModels.map(item => (
            <Card key={item.model} variant="surface" mb="3">
              <Text as="div" size="2" weight="bold" mb="1">{item.model}</Text>
              <Text as="p" size="2" color="gray" mb="3">{item.desc}</Text>
              <Flex gap="4">
                <Text size="1" color="green"><strong>+</strong> {item.pro}</Text>
                <Text size="1" color="red"><strong>–</strong> {item.con}</Text>
              </Flex>
              <Text size="1" color="gray" mt="2" style={{ display: 'block' }}>Best for: {item.when}</Text>
            </Card>
          ))}
        </Box>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[1].id}>{toc[1].label}</Heading>
        <Text as="p" size="3" mb="3">
          Define a clear process for how component requests enter the system. The questions that should drive prioritization:
        </Text>
        <ul>
          <li><strong>How many teams need this?</strong> — A component needed by 5 teams is a better investment than one needed by 1</li>
          <li><strong>What's the current divergence cost?</strong> — If 5 teams have all built their own version, the system version consolidates maintenance</li>
          <li><strong>Is this a pattern or a one-off?</strong> — Patterns generalize; one-offs don't belong in the system</li>
          <li><strong>Does it belong in the system or in product code?</strong> — Very domain-specific components (a product tour widget, a specific analytics chart) often don't generalize</li>
        </ul>

        <Callout type="info" title="The request log">
          Keep a public log of all component requests, their status, and rationale for accept/reject decisions. Transparency reduces the frustration of teams whose requests are declined. They can see the reasoning and know their request was considered.
        </Callout>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[2].id}>{toc[2].label}</Heading>
        <Text as="p" size="3" mb="3">
          For contributed components, a quality bar checklist before merge:
        </Text>
        <ol>
          <li><strong>Design review</strong> — does it align with existing patterns? Is it visually consistent?</li>
          <li><strong>Accessibility review</strong> — keyboard operable, screen reader tested, passes automated axe-core scan</li>
          <li><strong>API review</strong> — follows naming conventions, minimal surface area, sensible defaults</li>
          <li><strong>Token compliance</strong> — uses system tokens, not hardcoded values</li>
          <li><strong>Documentation</strong> — usage guidelines, props table, interactive examples, do/don't patterns</li>
          <li><strong>Testing</strong> — unit tests, visual regression baseline</li>
        </ol>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[3].id}>{toc[3].label}</Heading>
        <Text as="p" size="3" mb="3">
          The hardest part of running a design system isn't building it — it's getting teams to use it and stay on it. Things that work:
        </Text>
        <ul>
          <li><strong>Make the right thing easy</strong> — the system component should be the path of least resistance, not a hurdle</li>
          <li><strong>Office hours</strong> — regular time for product teams to get help from the system team</li>
          <li><strong>Contribution credit</strong> — acknowledge product teams who contribute components, visibly</li>
          <li><strong>Adoption metrics</strong> — track coverage (% of UI using system components) and report it to leadership</li>
          <li><strong>Migration guides</strong> — when breaking changes happen, provide codemods and a migration path, not just a changelog entry</li>
        </ul>

        <DocNav currentPath={pathname} />
    </article>
    </>
  )
}
