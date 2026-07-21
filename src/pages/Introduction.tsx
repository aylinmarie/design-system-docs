import { Box, Heading, Text, Flex, Grid, Card } from '@radix-ui/themes'
import { BookOpen, GitBranch } from 'lucide-react'
import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'who-this-is-for', label: 'Who this is for', level: 2 },
  { id: 'how-to-use', label: 'How to use this guide', level: 2 },
  { id: 'why-free', label: "Why it's free", level: 2 },
  { id: 'contribute', label: 'Contribute', level: 2 },
]

const principles = [
  {
    icon: BookOpen,
    title: 'Open source',
    desc: 'The source is public. If something is wrong, outdated, or incomplete, anyone can open a PR and make it better.',
  },
  {
    icon: GitBranch,
    title: 'Community owned',
    desc: 'No single company controls this. No VC funding, no exit strategy. It exists because it should exist.',
  },
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
          Whether you're a solo designer formalizing conventions, a team trying to align on patterns, or a tech lead architecting a platform that will scale across dozens of product squads, there's something here for you.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[1].id}>{toc[1].label}</Heading>
        <Text as="p" size="3" mb="3">
          This isn't meant to be read cover to cover. Use the sidebar to jump to what's relevant right now. Topics are organized roughly by the order in which they matter:
        </Text>
        <ol>
          <li><strong>Foundations first</strong> — Tokens, typography, and color are the bedrock. Get these right and everything else becomes easier.</li>
          <li><strong>Accessibility throughout</strong> — Not a layer added at the end. The accessibility section explains how to wire it in from day one.</li>
          <li><strong>Architecture and governance last</strong> — Only after you understand what you're building do the structural questions make sense.</li>
        </ol>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[2].id}>{toc[2].label}</Heading>
        <Text as="p" size="3" mb="3">
          There are a lot of courses, ebooks, and workshops about design systems — most of them cost money. The practitioners who need this knowledge most — junior designers at under-resourced companies, engineers inheriting legacy codebases, teams at nonprofits — are often the least able to pay $300 for a course or $80 for an ebook.
        </Text>
        <Text as="p" size="3" mb="5">
          The paid content industry around design systems has grown a lot, and some of it is genuinely excellent. But the existence of good paid content doesn't mean free content can't also exist. Information compounds. One clear explanation shared publicly reaches far more people than the same content locked behind a paywall.
        </Text>

        <Grid columns="2" gap="3" mb="7">
          {principles.map(({ icon: Icon, title, desc }) => (
            <Card key={title} variant="surface">
              <Box className="principle-icon" mb="3" aria-hidden="true">
                <Icon size={15} />
              </Box>
              <Text as="div" size="2" weight="bold" mb="1">{title}</Text>
              <Text as="div" size="1" color="gray">{desc}</Text>
            </Card>
          ))}
        </Grid>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[3].id}>{toc[3].label}</Heading>
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
