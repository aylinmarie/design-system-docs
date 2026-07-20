import { TableOfContents, type TocItem } from "../components/TableOfContents";
import { DocNav } from "../components/DocNav";
import { useLocation } from "react-router-dom";
import { BookOpen, GitBranch } from "lucide-react";

const toc: TocItem[] = [
  { id: "who-this-is-for", label: "Who this is for", level: 2 },
  { id: "how-to-use", label: "How to use this guide", level: 2 },
  { id: "why-free", label: "Why it's free", level: 2 },
  { id: "philosophy", label: "A note on philosophy", level: 2 },
  { id: "contribute", label: "Contribute", level: 2 },
];

const principles = [
  {
    icon: BookOpen,
    title: "Open source",
    desc: "The source is public. If something is wrong, outdated, or incomplete, anyone can open a PR and make it better.",
  },
  {
    icon: GitBranch,
    title: "Community owned",
    desc: "No single company controls this. No VC funding, no exit strategy. It exists because it should exist.",
  },
];

export function Introduction() {
  const { pathname } = useLocation();

  return (
    <>
      <TableOfContents items={toc} />
      <article className="prose">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">
            Getting Started
          </span>
        </div>
        <h1>Introduction</h1>
        <p
          className="text-lg text-gray-500 mt-2 mb-8"
          style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}
        >
          A free, ad-free, open source knowledge base on design systems — no
          course to buy, no email to give, no paywall to hit.
        </p>

        <h2 id="who-this-is-for">Who this is for</h2>
        <p>
          This guide is for practitioners — designers and engineers who are
          building, contributing to, or inheriting a design system. It assumes
          you're already building products and have hit some of the friction
          that a design system is meant to solve.
        </p>
        <p>
          Whether you're a solo designer formalizing conventions, a team trying
          to align on patterns, or a tech lead architecting a platform that will
          scale across dozens of product squads, there's something here for you.
        </p>

        <h2 id="how-to-use">How to use this guide</h2>
        <p>
          This isn't meant to be read cover to cover. Use the sidebar to jump to
          what's relevant right now. Topics are organized roughly by the order
          in which they matter:
        </p>
        <ol>
          <li>
            <strong>Foundations first</strong> — Tokens, typography, and color
            are the bedrock. Get these right and everything else becomes easier.
          </li>
          <li>
            <strong>Accessibility throughout</strong> — Not a layer added at the
            end. The accessibility section explains how to wire it in from day
            one.
          </li>
          <li>
            <strong>Architecture and governance last</strong> — Only after you
            understand what you're building do the structural questions make
            sense.
          </li>
        </ol>

        <h2 id="why-free">Why it's free</h2>
        <p>
          There are a lot of courses, ebooks, and workshops about design systems
          — most of them cost money. The practitioners who need this knowledge
          most — junior designers at under-resourced companies, engineers
          inheriting legacy codebases, teams at nonprofits — are often the least
          able to pay $300 for a course or $80 for an ebook.
        </p>
        <p>
          The paid content industry around design systems has grown a lot, and
          some of it is genuinely excellent. But the existence of good paid
          content doesn't mean free content can't also exist. Information
          compounds. One clear explanation shared publicly reaches far more
          people than the same content locked behind a paywall.
        </p>

        <div className="grid grid-cols-2 gap-3 my-6 not-prose">
          {principles.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-4 rounded-xl border border-gray-100 bg-white"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: "#f5f3ff" }}
              >
                <Icon
                  size={15}
                  style={{ color: "#7c3aed" }}
                  aria-hidden="true"
                />
              </div>
              <p className="font-semibold text-sm text-gray-900 mb-1">
                {title}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed m-0">
                {desc}
              </p>
            </div>
          ))}
        </div>

        <h2 id="philosophy">A note on philosophy</h2>
        <p>
          A design system is not a component library. It's a product with
          customers — your internal teams. Like any product, it needs to solve
          real problems, have a clear point of view, and evolve based on
          feedback.
        </p>
        <p>
          Systems fail in two directions: too rigid (no room for product teams
          to diverge when they need to) or too loose (no shared language, just a
          bucket of components with no coherence). The sweet spot is a system
          with strong opinions at the foundation level and flexibility at the
          component level.
        </p>
        <p>
          Design systems work is infrastructure work. It pays dividends slowly
          and painfully, but compounds over time. The teams that stick with it
          always look back and wonder how they shipped anything without it.
        </p>

        <h2 id="contribute">Contribute</h2>
        <p>
          This guide is open source. If you find an error, want to add nuance to
          a section, or think something important is missing, contributions are
          welcome.
        </p>
        <ul>
          <li>
            <strong>Corrections</strong> — open an issue or PR on GitHub with a
            specific change and why
          </li>
          <li>
            <strong>New sections</strong> — open an issue first to discuss scope
            before writing; it's easier to align before than after
          </li>
          <li>
            <strong>Examples</strong> — real-world examples from your own
            experience are the highest-value addition
          </li>
        </ul>
        <p>
          The goal is to keep this opinionated but not dogmatic. Design systems
          work looks different at different scales and in different organizations.
          Where there are genuine tradeoffs, the guide names them rather than
          pretending there's one right answer.
        </p>

        <div
          className="flex items-center gap-4 p-5 rounded-xl mt-6 not-prose"
          style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#111827" }}
          >
            <GitBranch size={18} color="white" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900 mb-0.5">
              Open source on GitHub
            </p>
            <p className="text-xs text-gray-500 m-0">
              Star it, fork it, or open a PR — the source is public and
              contributions are welcome.
            </p>
          </div>
          <a
            href="https://github.com/aylinmarie/design-system-docs"
            className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
            style={{
              background: "#7c3aed",
              color: "white",
              textDecoration: "none",
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
  );
}
