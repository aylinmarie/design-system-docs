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

export function Governance() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="prose">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Governance</span>
        </div>
        <h1>Contribution Model</h1>
        <p className="text-lg text-gray-500 mt-2 mb-8" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
          Who can contribute what, and how? Governance is what separates a design system that scales from one that quietly forks.
        </p>

        <h2 id={toc[0].id}>{toc[0].label}</h2>
        <p>
          Three archetypes, each with different tradeoffs:
        </p>

        <div className="my-5 space-y-3">
          {[
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
          ].map(item => (
            <div key={item.model} className="p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-900">{item.model}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
              <div className="flex gap-4 text-xs">
                <span className="text-green-600"><strong>+</strong> {item.pro}</span>
                <span className="text-red-500"><strong>–</strong> {item.con}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Best for: {item.when}</p>
            </div>
          ))}
        </div>

        <h2 id={toc[1].id}>{toc[1].label}</h2>
        <p>
          Define a clear process for how component requests enter the system. The questions that should drive prioritization:
        </p>
        <ul>
          <li><strong>How many teams need this?</strong> — A component needed by 5 teams is a better investment than one needed by 1</li>
          <li><strong>What's the current divergence cost?</strong> — If 5 teams have all built their own version, the system version consolidates maintenance</li>
          <li><strong>Is this a pattern or a one-off?</strong> — Patterns generalize; one-offs don't belong in the system</li>
          <li><strong>Does it belong in the system or in product code?</strong> — Very domain-specific components (a product tour widget, a specific analytics chart) often don't generalize</li>
        </ul>

        <Callout type="info" title="The request log">
          Keep a public log of all component requests, their status, and rationale for accept/reject decisions. Transparency reduces the frustration of teams whose requests are declined. They can see the reasoning and know their request was considered.
        </Callout>

        <h2 id={toc[2].id}>{toc[2].label}</h2>
        <p>
          For contributed components, a quality bar checklist before merge:
        </p>
        <ol>
          <li><strong>Design review</strong> — does it align with existing patterns? Is it visually consistent?</li>
          <li><strong>Accessibility review</strong> — keyboard operable, screen reader tested, passes automated axe-core scan</li>
          <li><strong>API review</strong> — follows naming conventions, minimal surface area, sensible defaults</li>
          <li><strong>Token compliance</strong> — uses system tokens, not hardcoded values</li>
          <li><strong>Documentation</strong> — usage guidelines, props table, interactive examples, do/don't patterns</li>
          <li><strong>Testing</strong> — unit tests, visual regression baseline</li>
        </ol>

        <h2 id={toc[3].id}>{toc[3].label}</h2>
        <p>
          The hardest part of running a design system isn't building it — it's getting teams to use it and stay on it. Things that work:
        </p>
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
