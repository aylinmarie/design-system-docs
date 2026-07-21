import { Heading, Text } from '@radix-ui/themes'
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
      <article className="doc-article">
        <Text size="1" weight="bold" color="blue" className="doc-category">Accessibility</Text>
        <Heading as="h1" size="8" mb="2">ARIA & Semantics</Heading>
        <Text as="p" size="3" color="gray" className="doc-lead">
          Semantic HTML communicates structure. ARIA fills the gaps for patterns that HTML can't express natively.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[0].id}>{toc[0].label}</Heading>
        <Text as="p" size="3" mb="3">
          The first rule of ARIA use: <strong>don't use ARIA if you can use a native HTML element that already has the role and behavior you need.</strong>
        </Text>
        <pre><code>{`<!-- ❌ Unnecessary ARIA — use native HTML instead -->
<div role="button" tabindex="0" aria-pressed="false">
  Toggle
</div>

<!-- ✅ Native semantics — built-in keyboard, role, and state -->
<button type="button" aria-pressed="false">
  Toggle
</button>`}</code></pre>
        <Text as="p" size="3" mb="3">
          Native HTML elements give you role, keyboard behavior, and state management for free. ARIA only adds a role to the accessibility tree — it doesn't add keyboard interaction. You still have to wire that up.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[1].id}>{toc[1].label}</Heading>
        <Text as="p" size="3" mb="3">ARIA has three categories of attributes:</Text>
        <h3>Roles</h3>
        <Text as="p" size="3" mb="3">
          Define what an element is. <code>role="dialog"</code>, <code>role="tablist"</code>, <code>role="combobox"</code>. Use only when the native element semantics aren't sufficient.
        </Text>
        <h3>States</h3>
        <Text as="p" size="3" mb="3">
          Communicate dynamic, changing conditions. <code>aria-expanded</code>, <code>aria-checked</code>, <code>aria-selected</code>, <code>aria-disabled</code>. These must be updated in JavaScript when the state changes.
        </Text>
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
        <Text as="p" size="3" mb="3">
          Describe relationships and metadata. <code>aria-label</code>, <code>aria-describedby</code>, <code>aria-controls</code>, <code>aria-owns</code>. These are typically static or set once.
        </Text>

        <Callout type="warning" title="ARIA doesn't change appearance">
          ARIA attributes modify the accessibility tree only. <code>aria-hidden="true"</code> removes something from screen readers but doesn't hide it visually. Always pair ARIA with appropriate visual presentation.
        </Callout>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[2].id}>{toc[2].label}</Heading>
        <Text as="p" size="3" mb="3">
          Live regions announce dynamic content changes to screen readers without moving focus. Critical for: form validation errors, toast notifications, search results updating, status messages.
        </Text>
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
        <Text as="p" size="3" mb="3">
          Use <code>assertive</code> sparingly — it interrupts whatever the screen reader is currently reading. Reserve it for actual errors. Use <code>polite</code> for status updates and confirmations.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[3].id}>{toc[3].label}</Heading>
        <Text as="p" size="3" mb="3">
          Every interactive element needs an accessible name. The precedence order (highest to lowest):
        </Text>
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
