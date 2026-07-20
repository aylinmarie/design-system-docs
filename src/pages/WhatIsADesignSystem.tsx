import { TableOfContents, type TocItem } from "../components/TableOfContents";
import { DocNav } from "../components/DocNav";
import { useLocation } from "react-router-dom";

const toc: TocItem[] = [
  { id: "the-definition", label: "The definition", level: 2 },
  { id: "layers", label: "The three layers", level: 2 },
  { id: "what-it-is-not", label: "What it's not", level: 2 },
  { id: "the-real-value", label: "The real value", level: 2 },
];

export function WhatIsADesignSystem() {
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
        <h1>What Is a Design System?</h1>
        <p
          className="text-lg text-gray-500 mt-2 mb-8"
          style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}
        >
          A shared language for building products — made of decisions, not just
          components.
        </p>

        <h2 id={toc[0].id}>{toc[0].label}</h2>
        <p>
          A design system is the set of decisions a team has made about how to
          build — and the tools, documentation, and components that make those
          decisions reusable. At its core, it's a source of truth that reduces
          the number of decisions any one person has to make.
        </p>
        <p>
          <a
            href="https://atomicdesign.bradfrost.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Brad Frost's <em>Atomic Design</em>
          </a>{" "}
          gave us a useful vocabulary.{" "}
          <a
            href="https://www.eightshapes.com/nathan-curtis.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nathan Curtis
          </a>{" "}
          and others showed how to operate these systems at scale. But the
          concept predates both: whenever a team writes down a style guide or
          component spec, they're starting a design system.
        </p>

        <h2 id={toc[1].id}>{toc[1].label}</h2>
        <p>
          Design systems are usefully thought of in three layers, each building
          on the one below:
        </p>

        {/* Layered diagram */}
        <div className="my-6 rounded-xl border border-gray-100 overflow-hidden">
          {[
            {
              label: "Patterns & Guidance",
              sublabel: "How components compose into flows",
              color: "#7c3aed",
              textColor: "white",
              opacity: 1,
            },
            {
              label: "Components",
              sublabel: "Reusable UI building blocks",
              color: "#7c3aed",
              textColor: "white",
              opacity: 0.7,
            },
            {
              label: "Tokens & Foundations",
              sublabel: "The raw decisions: color, type, spacing",
              color: "#7c3aed",
              textColor: "white",
              opacity: 0.45,
            },
          ].map((layer, i) => (
            <div
              key={i}
              className="px-6 py-4 flex items-center justify-between"
              style={{
                background: `rgba(124, 58, 237, ${layer.opacity * 0.12})`,
                borderBottom: i < 2 ? "1px solid rgba(124, 58, 237, 0.08)" : "",
              }}
            >
              <div>
                <p className="font-semibold text-sm text-gray-900 mb-0.5">
                  {layer.label}
                </p>
                <p className="text-xs text-gray-500">{layer.sublabel}</p>
              </div>
              <div
                className="text-xs font-semibold px-2 py-1 rounded-full"
                style={{
                  background: `rgba(124, 58, 237, 0.12)`,
                  color: "#7c3aed",
                }}
              >
                Layer {3 - i}
              </div>
            </div>
          ))}
        </div>

        <p>
          Most teams start at the wrong layer. They build components first, then
          realize they need a shared token system to keep the components
          consistent. Starting with tokens — the raw decisions — makes
          everything above it more coherent.
        </p>

        <h2 id={toc[2].id}>{toc[2].label}</h2>
        <p>
          A design system is <strong>not</strong>:
        </p>
        <ul>
          <li>
            A component library in isolation — code without documentation and
            rationale isn't a system, it's a library
          </li>
          <li>
            A Storybook — Storybook is a tool for documenting components, not
            the system itself
          </li>
          <li>
            A Figma file — Figma is where design decisions live, not the
            canonical source of the system
          </li>
          <li>
            A one-time project — systems require ongoing investment and
            governance to stay healthy
          </li>
        </ul>

        <h2 id={toc[3].id}>{toc[3].label}</h2>
        <p>
          The ROI of a design system is rarely in the components themselves.
          It's in the decisions that don't have to be made twice. Every time a
          product team reaches for a button and doesn't have to debate its
          border-radius, focus state, and accessible label — that's the system
          working.
        </p>
        <p>
          At scale, the compounding effect is enormous. A team of 50 designers
          shipping 10 features a quarter is making thousands of micro-decisions.
          A design system handles the ones that don't need to be re-decided,
          freeing people to focus on the ones that do.
        </p>

        <DocNav currentPath={pathname} />
      </article>
    </>
  );
}
