import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'first-rule', label: 'First rule of ARIA', level: 2 },
  { id: 'roles', label: 'Roles, states, properties', level: 2 },
  { id: 'live-regions', label: 'Live regions', level: 2 },
  { id: 'labeling', label: 'Labeling patterns', level: 2 },
]

export function AccessibilityAria() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="prose">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Accessibility</span>
        </div>
        <h1>ARIA & Semantics</h1>
        <p className="text-lg text-gray-500 mt-2 mb-8" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
          Semantic HTML communicates structure. ARIA fills the gaps for patterns that HTML can't express natively.
        </p>

        <h2 id="first-rule">First rule of ARIA</h2>
        <p>
          The first rule of ARIA use: <strong>don't use ARIA if you can use a native HTML element that already has the role and behavior you need.</strong>
        </p>
        <pre><code>{`<!-- ❌ Unnecessary ARIA — use native HTML instead -->
<div role="button" tabindex="0" aria-pressed="false">
  Toggle
</div>

<!-- ✅ Native semantics — built-in keyboard, role, and state -->
<button type="button" aria-pressed="false">
  Toggle
</button>`}</code></pre>
        <p>
          Native HTML elements give you role, keyboard behavior, and state management for free. ARIA only adds a role to the accessibility tree — it doesn't add keyboard interaction. You still have to wire that up.
        </p>

        <h2 id="roles">Roles, states, properties</h2>
        <p>
          ARIA has three categories of attributes:
        </p>
        <h3>Roles</h3>
        <p>
          Define what an element is. <code>role="dialog"</code>, <code>role="tablist"</code>, <code>role="combobox"</code>. Use only when the native element semantics aren't sufficient.
        </p>
        <h3>States</h3>
        <p>
          Communicate dynamic, changing conditions. <code>aria-expanded</code>, <code>aria-checked</code>, <code>aria-selected</code>, <code>aria-disabled</code>. These must be updated in JavaScript when the state changes.
        </p>
        <pre><code>{`// Keep ARIA state in sync with component state
function Accordion({ label, children }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        aria-expanded={open}
        aria-controls="panel-id"
        onClick={() => setOpen(!open)}
      >
        {label}
      </button>
      <div id="panel-id" hidden={!open}>
        {children}
      </div>
    </>
  )
}`}</code></pre>

        <h3>Properties</h3>
        <p>
          Describe relationships and metadata. <code>aria-label</code>, <code>aria-describedby</code>, <code>aria-controls</code>, <code>aria-owns</code>. These are typically static or set once.
        </p>

        <Callout type="warning" title="ARIA doesn't change appearance">
          ARIA attributes modify the accessibility tree only. <code>aria-hidden="true"</code> removes something from screen readers but doesn't hide it visually. Always pair ARIA with appropriate visual presentation.
        </Callout>

        <h2 id="live-regions">Live regions</h2>
        <p>
          Live regions announce dynamic content changes to screen readers without moving focus. Critical for: form validation errors, toast notifications, search results updating, status messages.
        </p>
        <pre><code>{`<!-- Status message that updates dynamically -->
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  {statusMessage}
</div>

<!-- Error that needs immediate attention -->
<div
  role="alert"
  aria-live="assertive"
>
  {errorMessage}
</div>`}</code></pre>
        <p>
          Use <code>assertive</code> sparingly — it interrupts whatever the screen reader is currently reading. Reserve it for actual errors. Use <code>polite</code> for status updates and confirmations.
        </p>

        <h2 id="labeling">Labeling patterns</h2>
        <p>
          Every interactive element needs an accessible name. The precedence order (highest to lowest):
        </p>
        <ol>
          <li><code>aria-labelledby</code> — references another visible element's text</li>
          <li><code>aria-label</code> — provides a string label directly</li>
          <li>Native <code>&lt;label&gt;</code> element (for form inputs)</li>
          <li>Title attribute (last resort, poor support)</li>
        </ol>
        <pre><code>{`<!-- aria-labelledby — preferred when a visible heading exists -->
<section aria-labelledby="section-heading">
  <h2 id="section-heading">User profile</h2>
  ...
</section>

<!-- aria-label — for icon buttons, landmarks without headings -->
<button aria-label="Close dialog">
  <XIcon aria-hidden="true" />
</button>

<!-- Visually hidden label — shows in the DOM, hidden visually -->
<label>
  <span class="sr-only">Search</span>
  <input type="search" />
</label>`}</code></pre>

        <DocNav currentPath={pathname} />
      </article>
    </>
  )
}
