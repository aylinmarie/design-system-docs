import { Box, Heading, Text, Flex } from '@radix-ui/themes'
import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'why-explore-others', label: 'Why explore other systems', level: 2 },
  { id: 'the-collection', label: 'The collection', level: 2 },
  { id: 'how-to-use-this', label: 'How to use this list', level: 2 },
]

const designSystems = [
  {
    name: 'Material Design',
    org: 'Google',
    url: 'https://m3.material.io/',
    note: 'The most widely adopted open design language; strong theming and token model.',
  },
  {
    name: 'Carbon Design System',
    org: 'IBM',
    url: 'https://carbondesignsystem.com/',
    note: 'Enterprise-grade, thoroughly documented, and fully open source down to the Figma kit.',
  },
  {
    name: 'Polaris',
    org: 'Shopify',
    url: 'https://polaris.shopify.com/',
    note: 'A good reference for merchant-facing admin UI and content design guidelines.',
  },
  {
    name: 'Fluent 2',
    org: 'Microsoft',
    url: 'https://fluent2.microsoft.design/',
    note: 'Cross-platform system spanning web, Windows, and mobile with shared tokens.',
  },
  {
    name: 'Atlassian Design System',
    org: 'Atlassian',
    url: 'https://atlassian.design/',
    note: 'Clear component API documentation and unusually candid guidance on when not to use a pattern.',
  },
  {
    name: 'Lightning Design System',
    org: 'Salesforce',
    url: 'https://www.lightningdesignsystem.com/',
    note: 'One of the earliest large-scale design systems; mature governance and versioning practices.',
  },
  {
    name: 'Spectrum',
    org: 'Adobe',
    url: 'https://spectrum.adobe.com/',
    note: 'Pairs with React Aria and React Spectrum for accessible, unstyled-to-styled component layering.',
  },
  {
    name: 'Primer',
    org: 'GitHub',
    url: 'https://primer.style/',
    note: 'Small, developer-tool-flavored system; a good reference for dense, technical interfaces.',
  },
  {
    name: 'Base Web',
    org: 'Uber',
    url: 'https://baseweb.design/',
    note: 'Built around a "base" theming layer, making it a solid reference for token-driven theming.',
  },
  {
    name: 'Ant Design',
    org: 'Ant Group',
    url: 'https://ant.design/',
    note: 'Extensive component coverage; widely used as a starting point for internal admin tools.',
  },
]

export function DSCollections() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="doc-article">
        <Text size="1" weight="bold" color="blue" className="doc-category">Resources</Text>
        <Heading as="h1" size="8" mb="2">DS Collections</Heading>
        <Text as="p" size="3" color="gray" className="doc-lead">
          A curated list of publicly documented design systems worth studying, from companies that have open-sourced their tokens, components, and guidelines.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[0].id}>{toc[0].label}</Heading>
        <Text as="p" size="3" mb="3">
          Reading other teams' design systems is one of the fastest ways to calibrate your own. Every system here made deliberate tradeoffs — in token structure, component API, documentation format, governance model — that you can borrow from or deliberately avoid.
        </Text>
        <Text as="p" size="3" mb="3">
          None of these are meant to be copied wholesale. Your product, team size, and platform constraints will differ. Use them as reference points, not templates.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[1].id}>{toc[1].label}</Heading>
        <Box className="demo-card">
          <Box className="demo-card-header">
            <Text size="1" weight="bold" color="gray" className="demo-label">Public design systems</Text>
          </Box>
          {designSystems.map((system) => (
            <Flex key={system.name} align="center" justify="between" gap="4" className="demo-row">
              <Box>
                <Text as="div" size="2" weight="bold">{system.name}</Text>
                <Text as="div" size="1" color="gray" mb="1">{system.org}</Text>
                <Text as="div" size="2" color="gray">{system.note}</Text>
              </Box>
              <a
                href={system.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ flexShrink: 0 }}
              >
                Visit &rarr;
              </a>
            </Flex>
          ))}
        </Box>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[2].id}>{toc[2].label}</Heading>
        <Text as="p" size="3" mb="3">
          When evaluating a system for reference, look past the visual style to the underlying decisions: how tokens are structured and named, how components expose variants versus composition, and how documentation explains the "why" behind a pattern rather than just the "how."
        </Text>

        <Callout type="tip" title="Missing a system you'd add?">
          This list is intentionally short and opinionated rather than exhaustive. If there's a public design system with documentation worth studying, open an issue or PR — see the Introduction page for contribution guidelines.
        </Callout>

        <DocNav currentPath={pathname} />
      </article>
    </>
  )
}
