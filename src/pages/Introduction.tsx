import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'who-this-is-for', label: 'Who this is for', level: 2 },
  { id: 'how-to-use', label: 'How to use this guide', level: 2 },
  { id: 'philosophy', label: 'My philosophy', level: 2 },
]

export function Introduction() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="prose">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Getting Started</span>
        </div>
        <h1>Introduction</h1>
        <p className="text-lg text-gray-500 mt-2 mb-8" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
          A practical knowledge base on design systems — built from years of leading system work across product orgs of every size.
        </p>

        <Callout type="tip" title="From the author">
          I've spent years building and scaling design systems as a tech lead. This guide distills what I wish I'd had when I started — the frameworks, tradeoffs, and hard-won lessons.
        </Callout>

        <h2 id="who-this-is-for">Who this is for</h2>
        <p>
          This guide is for practitioners — designers and engineers who are building, contributing to, or inheriting a design system. It assumes you're already building products and have hit some of the friction that a design system is meant to solve.
        </p>
        <p>
          Whether you're a solo designer formalizing conventions, a team trying to align on patterns, or a tech lead architecting a platform that will scale across dozens of product squads, there's something here for you.
        </p>

        <h2 id="how-to-use">How to use this guide</h2>
        <p>
          This isn't meant to be read cover to cover. Use the sidebar to jump to what's relevant right now. Topics are organized roughly by the order in which they matter:
        </p>
        <ol>
          <li><strong>Foundations first</strong> — Tokens, typography, and color are the bedrock. Get these right and everything else becomes easier.</li>
          <li><strong>Accessibility throughout</strong> — Not a layer added at the end. The accessibility section explains how to wire it in from day one.</li>
          <li><strong>Architecture and governance last</strong> — Only after you understand what you're building do the structural questions make sense.</li>
        </ol>

        <h2 id="philosophy">My philosophy</h2>
        <p>
          A design system is not a component library. It's a product with customers — your internal teams. Like any product, it needs to solve real problems, have a clear point of view, and evolve based on feedback.
        </p>
        <p>
          The systems I've seen fail were either too rigid (no room for product teams to diverge when they needed to) or too loose (no shared language, just a bucket of components with no coherence). The sweet spot is a system with strong opinions at the foundation level and flexibility at the component level.
        </p>

        <Callout type="info">
          Design systems work is infrastructure work. It pays dividends slowly and painfully, but compounds over time. The teams that stick with it always look back and wonder how they shipped anything without it.
        </Callout>

        <DocNav currentPath={pathname} />
      </article>
    </>
  )
}
