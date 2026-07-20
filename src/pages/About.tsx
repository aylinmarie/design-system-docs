import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { useLocation } from 'react-router-dom'
import { Heart, BookOpen, GitBranch, Lock } from 'lucide-react'

const toc: TocItem[] = [
  { id: 'why-free', label: 'Why free and open source', level: 2 },
  { id: 'who-wrote-this', label: 'Who wrote this', level: 2 },
  { id: 'whats-covered', label: "What's covered", level: 2 },
  { id: 'contribute', label: 'Contribute', level: 2 },
]

const principles = [
  {
    icon: Heart,
    title: 'Free, always',
    desc: 'No paywalls. No freemium tiers. No "buy the full course to unlock chapter 4." Every page, every concept, every diagram — free.',
  },
  {
    icon: Lock,
    title: 'No ads, ever',
    desc: 'No sponsored content, no affiliate links, no tracking pixels. The only agenda here is sharing knowledge.',
  },
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

export function About() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="prose">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Getting Started</span>
        </div>

        <h1>About this guide</h1>
        <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: '#6b7280', marginTop: '0.5rem', marginBottom: '2.5rem' }}>
          A free, open source knowledge base on design systems — no courses to buy, no email to give, no paywall to hit.
        </p>

        {/* Mission statement */}
        <div
          className="rounded-xl p-6 mb-8"
          style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)', border: '1px solid #ddd6fe' }}
        >
          <p
            className="text-gray-800 m-0"
            style={{ fontSize: '1.0625rem', lineHeight: 1.75, fontStyle: 'italic' }}
          >
            "There are a lot of courses, ebooks, and workshops about design systems — most of them cost money.
            I believe this knowledge should be freely available to anyone trying to build better products,
            regardless of their budget or where they work."
          </p>
          <p className="text-sm text-violet-600 font-medium mt-3 mb-0">— The author</p>
        </div>

        <h2 id="why-free">Why free and open source</h2>
        <p>
          Design systems knowledge shouldn't be gated. The practitioners who need it most — junior designers at under-resourced companies, engineers inheriting legacy codebases, teams at nonprofits — are often the least able to pay $300 for a course or $80 for an ebook.
        </p>
        <p>
          The paid content industry around design systems has grown a lot in the past few years, and some of it is genuinely excellent. But the existence of good paid content doesn't mean free content can't also exist. Information compounds. When one person learns something and shares it, it grows.
        </p>

        {/* Principles grid */}
        <div className="grid grid-cols-2 gap-3 my-6 not-prose">
          {principles.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-4 rounded-xl border border-gray-100 bg-white"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: '#f5f3ff' }}
              >
                <Icon size={15} style={{ color: '#7c3aed' }} aria-hidden="true" />
              </div>
              <p className="font-semibold text-sm text-gray-900 mb-1">{title}</p>
              <p className="text-xs text-gray-500 leading-relaxed m-0">{desc}</p>
            </div>
          ))}
        </div>

        <h2 id="who-wrote-this">Who wrote this</h2>
        <p>
          I'm a design systems tech lead. I've spent years building and scaling design systems across organizations — from early-stage startups to large enterprises — working alongside design, engineering, and product teams.
        </p>
        <p>
          Along the way I've picked up a lot of hard-won knowledge: which abstractions hold up at scale, which accessibility patterns teams actually ship, which governance models create bottlenecks versus which ones enable contribution. This guide is my attempt to write all of that down in one place.
        </p>
        <p>
          I'm not writing this as a brand or a business. I'm writing it because I wish it had existed when I started, and because the design systems community gave me a lot — this is one way to give back.
        </p>

        <h2 id="whats-covered">What's covered</h2>
        <p>
          This is a living document covering design systems from first principles to production-scale operation:
        </p>
        <ul>
          <li><strong>Foundations</strong> — design tokens, typography, color, spacing, and iconography — the bedrock decisions every system builds on</li>
          <li><strong>Accessibility</strong> — not as an afterthought, but as a first-class concern woven through every layer of the system</li>
          <li><strong>Data visualization</strong> — a topic underserved by most design system resources, covering perceptual principles through token systems</li>
          <li><strong>Component architecture</strong> — API design, composition patterns, headless primitives, and the tradeoffs between them</li>
          <li><strong>Governance</strong> — contribution models, intake processes, versioning, and the organizational side of running a system</li>
        </ul>
        <p>
          What this guide deliberately doesn't cover: step-by-step tutorials for specific tools (Figma, Storybook, Style Dictionary each have their own excellent docs), framework-specific implementation details that change too fast, and company-specific case studies that don't generalize.
        </p>

        <h2 id="contribute">Contribute</h2>
        <p>
          This guide is open source. If you find an error, want to add nuance to a section, or think something important is missing, contributions are welcome.
        </p>
        <ul>
          <li><strong>Corrections</strong> — open an issue or PR on GitHub with a specific change and why</li>
          <li><strong>New sections</strong> — open an issue first to discuss scope before writing; it's easier to align before than after</li>
          <li><strong>Examples</strong> — real-world examples from your own experience are the highest-value addition</li>
        </ul>
        <p>
          The goal is to keep this opinionated but not dogmatic. Design systems work looks different at different scales and in different organizations. Where there are genuine tradeoffs, the guide tries to name them rather than pretend there's one right answer.
        </p>

        {/* GitHub CTA */}
        <div
          className="flex items-center gap-4 p-5 rounded-xl mt-6 not-prose"
          style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: '#111827' }}
          >
            <GitBranch size={18} color="white" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900 mb-0.5">Open source on GitHub</p>
            <p className="text-xs text-gray-500 m-0">Star it, fork it, or open a PR — the source is public and contributions are welcome.</p>
          </div>
          <a
            href="https://github.com"
            className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
            style={{
              background: '#7c3aed',
              color: 'white',
              textDecoration: 'none',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>

        <DocNav currentPath={pathname} />
      </article>
    </>
  )
}
