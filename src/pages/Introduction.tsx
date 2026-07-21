import { Box, Heading, Text, Flex, Card } from '@radix-ui/themes'
import { GitBranch } from 'lucide-react'
import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'who-this-is-for', label: 'Who this is for', level: 2 },
  { id: 'contribute', label: 'Contribute', level: 2 },
]

export function Introduction() {
  const { pathname } = useLocation()
  return (
    <>
      <TableOfContents items={toc} />
      <article className="doc-article">
        <Text size="1" weight="bold" color="violet" className="doc-category">Getting Started</Text>
        <Heading as="h1" size="8" mb="2">Introduction</Heading>
        <Text as="p" size="3" color="gray" className="doc-lead">
          An open source knowledge base on design systems.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[0].id}>{toc[0].label}</Heading>
        <Text as="p" size="3" mb="3">
          This guide is for practitioners — designers and engineers who are building, contributing to, or inheriting a design system. It assumes you're already building products and have hit some of the friction that a design system is meant to solve.
        </Text>
        <Text as="p" size="3" mb="3">
          The scope runs from a solo designer formalizing conventions to a tech lead architecting a platform for dozens of product squads.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[1].id}>{toc[1].label}</Heading>
        <Text as="p" size="3" mb="3">
          This guide is open source. If you find an error, want to add nuance to a section, or think something important is missing, contributions are welcome.
        </Text>
        <ul>
          <li><strong>Corrections</strong> — open an issue or PR on GitHub with a specific change and why</li>
          <li><strong>New sections</strong> — open an issue first to discuss scope before writing; it's easier to align before than after</li>
          <li><strong>Examples</strong> — real-world examples from your own experience are the highest-value addition</li>
        </ul>
        <Text as="p" size="3" mb="5">
          The goal is to keep this opinionated but not dogmatic. Design systems work looks different at different scales and in different organizations. Where there are genuine tradeoffs, the guide names them rather than pretending there's one right answer.
        </Text>

        <Card variant="surface" mt="2">
          <Flex align="center" gap="4">
            <Box className="github-icon-wrap" aria-hidden="true">
              <GitBranch size={18} />
            </Box>
            <Box flexGrow="1">
              <Text as="div" size="2" weight="bold" mb="1">Open source on GitHub</Text>
              <Text as="div" size="1" color="gray">Star it, fork it, or open a PR — the source is public and contributions are welcome.</Text>
            </Box>
            <a
              href="https://github.com/aylinmarie/design-system-docs"
              className="github-cta-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </Flex>
        </Card>

        <DocNav currentPath={pathname} />
      </article>
    </>
  )
}
