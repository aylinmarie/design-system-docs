import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'semver', label: 'Semantic versioning', level: 2 },
  { id: 'breaking-changes', label: 'Managing breaking changes', level: 2 },
  { id: 'release-process', label: 'Release process', level: 2 },
  { id: 'multi-version', label: 'Supporting multiple versions', level: 2 },
]

export function Versioning() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="prose">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Governance</span>
        </div>
        <h1>Versioning & Releases</h1>
        <p className="text-lg text-gray-500 mt-2 mb-8" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
          How you version and release your system determines how much trust product teams put in it. Predictability is the goal.
        </p>

        <h2 id={toc[0].id}>{toc[0].label}</h2>
        <p>
          Design systems should follow semantic versioning (semver): <code>MAJOR.MINOR.PATCH</code>.
        </p>
        <ul>
          <li><strong>PATCH</strong> (1.0.x) — bug fixes, visual tweaks that don't break existing usage</li>
          <li><strong>MINOR</strong> (1.x.0) — new components, new props with defaults, non-breaking additions</li>
          <li><strong>MAJOR</strong> (x.0.0) — breaking changes: removed props, renamed components, changed behavior</li>
        </ul>
        <p>
          Be strict about this. A "minor" breaking change is still a major version bump. Teams pin versions and have CI — they'll feel it if you're inconsistent.
        </p>

        <Callout type="warning" title="Version 0.x is not an excuse">
          Some teams use <code>0.x</code> versioning to avoid commitment to a stable API. This is fine early in development but creates problems as teams adopt the system. Move to <code>1.0</code> when you're ready to make stability commitments — and then keep them.
        </Callout>

        <h2 id={toc[1].id}>{toc[1].label}</h2>
        <p>
          Breaking changes are sometimes necessary. When they are:
        </p>
        <ol>
          <li><strong>Communicate early</strong> — deprecate before removing. Mark props as deprecated with a console warning 1–2 major versions before removing them</li>
          <li><strong>Provide codemods</strong> — a codemod script that migrates usage automatically reduces the cost of breaking changes significantly</li>
          <li><strong>Write a migration guide</strong> — before/after examples, not just "removed <code>isDisabled</code> prop"</li>
          <li><strong>Time it well</strong> — batch breaking changes into fewer major releases rather than releasing major versions constantly</li>
        </ol>
        <pre><code>{`// Deprecation warning pattern
function Button({ isDisabled, disabled, ...props }) {
  if (isDisabled !== undefined) {
    console.warn(
      '[DesignSystem] Button: isDisabled is deprecated. Use disabled instead. ' +
      'isDisabled will be removed in v4.0.'
    )
  }
  return <button disabled={isDisabled ?? disabled} {...props} />
}`}</code></pre>

        <h2 id={toc[2].id}>{toc[2].label}</h2>
        <p>
          A good release process is automated, predictable, and generates useful changelogs:
        </p>
        <ul>
          <li><strong>Conventional commits</strong> — enforce commit message format (<code>feat:</code>, <code>fix:</code>, <code>BREAKING CHANGE:</code>) to automate changelog generation</li>
          <li><strong>Changesets</strong> — the <code>@changesets/cli</code> package manages version bumps and changelogs for monorepos. Highly recommended.</li>
          <li><strong>Release preview</strong> — publish alpha/beta/rc tags for large changes so adopters can test before stable release</li>
          <li><strong>Automated publish</strong> — CI publishes on merge to main; no manual npm publish steps</li>
        </ul>

        <h2 id={toc[3].id}>{toc[3].label}</h2>
        <p>
          As the organization grows, some product teams will lag behind on versions. At scale, you'll likely need to support N and N-1 simultaneously with security patches.
        </p>
        <p>
          Strategies for managing this:
        </p>
        <ul>
          <li>Publish LTS (Long-Term Support) versions for major releases that will receive bug and security fixes for 12–18 months</li>
          <li>Track adoption metrics by version — know exactly which teams are on which version</li>
          <li>Set a sunset date for old major versions and hold teams accountable with product leadership support</li>
        </ul>

        <DocNav currentPath={pathname} />
      </article>
    </>
  )
}
