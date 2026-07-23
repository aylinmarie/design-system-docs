import { Text, Heading } from '@radix-ui/themes'
import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'what-we-collect', label: 'What we collect', level: 2 },
  { id: 'what-we-dont-collect', label: "What we don't collect", level: 2 },
  { id: 'why', label: 'Why we collect it', level: 2 },
  { id: 'retention', label: 'Retention & access', level: 2 },
  { id: 'third-parties', label: 'Third parties', level: 2 },
  { id: 'contact', label: 'Contact', level: 2 },
]

export function PrivacyPolicy() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="doc-article">
        <Text size="1" weight="bold" color="blue" className="doc-category">Legal</Text>
        <Heading as="h1" size="8" mb="2">Privacy Policy</Heading>
        <Text as="p" size="3" color="gray" className="doc-lead">
          This site uses Vercel Web Analytics to understand how it's used. Here's exactly what that means.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[0].id}>{toc[0].label}</Heading>
        <Text as="p" size="3" mb="3">
          We use <a href="https://vercel.com/docs/analytics" target="_blank" rel="noopener noreferrer">Vercel Web Analytics</a> to
          collect basic, aggregated usage data:
        </Text>
        <ul>
          <li>Pages visited and the referring site or link that brought you here</li>
          <li>Approximate location, limited to country and region</li>
          <li>Device type, operating system, and browser</li>
          <li>Timestamp of the visit</li>
        </ul>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[1].id}>{toc[1].label}</Heading>
        <Text as="p" size="3" mb="3">
          Vercel Web Analytics is cookieless and doesn't use any persistent identifiers. We don't collect:
        </Text>
        <ul>
          <li>Names, email addresses, or any other personal information</li>
          <li>Precise location or IP addresses in stored records</li>
          <li>Cross-site browsing history</li>
          <li>Any data via cookies or local storage</li>
        </ul>
        <Text as="p" size="3" mb="3">
          Because no cookies or device identifiers are stored, visits can't be tied back to an individual person or linked
          together across sessions.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[2].id}>{toc[2].label}</Heading>
        <Text as="p" size="3" mb="3">
          This is an open source documentation site with no accounts, no forms, and no product to sell. The only reason we
          look at analytics is to see which pages are actually useful, so we know where to invest editing effort and
          whether new sections are worth writing.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[3].id}>{toc[3].label}</Heading>
        <Text as="p" size="3" mb="3">
          Analytics data is retained and processed by Vercel on our behalf, aggregated at the page level. We don't
          export, sell, or share this data with any other party. See{' '}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel's privacy policy</a>{' '}
          for how Vercel itself handles the underlying data.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[4].id}>{toc[4].label}</Heading>
        <Text as="p" size="3" mb="3">
          Vercel Web Analytics is the only tracking on this site. There are no advertising pixels, no third-party
          trackers, and no social media embeds that phone home.
        </Text>

        <Callout type="info" title="Open source">
          This site's source is public. If you want to verify any of this, the analytics integration is a few lines in{' '}
          <code>src/App.tsx</code> — nothing hidden.
        </Callout>

        <Heading as="h2" size="6" mt="7" mb="5" className="doc-h2" id={toc[5].id}>{toc[5].label}</Heading>
        <Text as="p" size="3" mb="5">
          Questions about this policy? Open an issue on{' '}
          <a href="https://github.com/aylinmarie/design-system-docs" target="_blank" rel="noopener noreferrer">GitHub</a>.
        </Text>

        <DocNav currentPath={pathname} />
      </article>
    </>
  )
}
