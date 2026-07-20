import { TableOfContents, type TocItem } from "../components/TableOfContents";
import { DocNav } from "../components/DocNav";
import { useLocation } from "react-router-dom";
import { BookOpen, GitBranch } from "lucide-react";

const toc: TocItem[] = [
  { id: "why-free", label: "Why free and open source", level: 2 },
  { id: "who-wrote-this", label: "Who wrote this", level: 2 },
  { id: "whats-covered", label: "What's covered", level: 2 },
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

export function About() {
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

        <h1>About</h1>
        <p
          style={{
            fontSize: "1.0625rem",
            lineHeight: 1.7,
            color: "#6b7280",
            marginTop: "0.5rem",
            marginBottom: "2.5rem",
          }}
        >
          A free (and ad-free), open source knowledge base on design systems.
        </p>

        <h2 id="why-free">Why</h2>
        <p>
          Design systems knowledge shouldn't be gated. The paid content industry
          around design systems has grown a lot in the past few years, and some
          of it is genuinely excellent. But the existence of good paid content
          doesn't mean free content can't also exist. Information compounds.
          When one person learns something and shares it, it grows.
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
          work looks different at different scales and in different
          organizations. Where there are genuine tradeoffs, the guide tries to
          name them rather than pretend there's one right answer.
        </p>

        {/* GitHub CTA */}
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
            href="https://github.com"
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
