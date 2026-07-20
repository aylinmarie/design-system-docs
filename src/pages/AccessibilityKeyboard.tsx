import { TableOfContents, type TocItem } from '../components/TableOfContents'
import { DocNav } from '../components/DocNav'
import { Callout } from '../components/Callout'
import { useLocation } from 'react-router-dom'

const toc: TocItem[] = [
  { id: 'why-keyboard', label: 'Why keyboard access', level: 2 },
  { id: 'focus-order', label: 'Focus order & management', level: 2 },
  { id: 'patterns', label: 'Common keyboard patterns', level: 2 },
  { id: 'traps', label: 'Focus traps', level: 2 },
]

const keyboardPatterns = [
  { widget: 'Button', keys: 'Enter, Space', behavior: 'Activates the button' },
  { widget: 'Link', keys: 'Enter', behavior: 'Navigates to destination' },
  { widget: 'Checkbox', keys: 'Space', behavior: 'Toggles checked state' },
  { widget: 'Radio group', keys: 'Arrow keys', behavior: 'Moves between options (roving tabindex)' },
  { widget: 'Select / Combobox', keys: 'Enter/Space to open, arrows to navigate, Enter to select', behavior: 'Opens listbox, moves through options' },
  { widget: 'Dialog', keys: 'Escape', behavior: 'Closes and returns focus to trigger' },
  { widget: 'Tabs', keys: 'Arrow keys to switch, Tab to move into panel', behavior: 'Roving tabindex across tab list' },
  { widget: 'Menu', keys: 'Escape to close, arrows to navigate', behavior: 'Roving tabindex, Escape dismisses' },
]

export function AccessibilityKeyboard() {
  const { pathname } = useLocation()

  return (
    <>
      <TableOfContents items={toc} />
      <article className="prose">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">Accessibility</span>
        </div>
        <h1>Keyboard Navigation</h1>
        <p className="text-lg text-gray-500 mt-2 mb-8" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
          Keyboard accessibility enables anyone who can't use a pointer — motor disabilities, power users, assistive tech users — to use your product fully.
        </p>

        <h2 id={toc[0].id}>{toc[0].label}</h2>
        <p>
          Keyboard-accessible interfaces support: people with motor impairments who use keyboards, switches, or voice control; screen reader users who navigate primarily via keyboard; power users who prefer keyboard for efficiency; and developers testing the product.
        </p>
        <p>
          Every interactive element must be reachable by Tab key, operable by keyboard, and clearly indicate focus. No exceptions.
        </p>

        <Callout type="warning" title="The click-only trap">
          The most common keyboard failure: attaching behavior only to <code>click</code> events on non-button elements. A <code>div</code> with <code>onClick</code> doesn't receive keyboard events, doesn't appear in the tab order, and provides no semantic role. Use native elements (<code>button</code>, <code>a</code>) or add <code>role</code>, <code>tabindex</code>, and <code>onKeyDown</code>.
        </Callout>

        <h2 id={toc[1].id}>{toc[1].label}</h2>
        <p>
          The natural tab order follows DOM order. This means the visual layout and DOM order must be aligned — don't reorder elements with CSS in a way that breaks keyboard traversal.
        </p>
        <p>
          Three situations where programmatic focus management is required:
        </p>
        <ol>
          <li><strong>Opening a modal</strong> — focus must move into the dialog on open, and return to the trigger on close</li>
          <li><strong>Client-side navigation</strong> — focus should move to the new page heading or main content area</li>
          <li><strong>Dynamic content</strong> — when content updates without a navigation (inline errors, expanded sections), move focus to the updated element or a relevant heading</li>
        </ol>

        <pre><code>{`// Moving focus to a dialog on open
function openDialog(dialogRef: RefObject<HTMLElement>) {
  // Find the first focusable element
  const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  firstFocusable?.focus()
}

// Returning focus after close
function closeDialog(triggerRef: RefObject<HTMLElement>) {
  triggerRef.current?.focus()
}`}</code></pre>

        <h2 id={toc[2].id}>{toc[2].label}</h2>
        <p>
          The <a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank" rel="noopener noreferrer">ARIA Authoring Practices Guide (APG)</a> defines keyboard interaction patterns for common widget types. These are the patterns your system components should implement:
        </p>

        <div className="my-5 rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Keyboard interaction patterns</p>
          </div>
          <div className="divide-y divide-gray-50">
            {keyboardPatterns.map(pattern => (
              <div key={pattern.widget} className="px-4 py-3 grid grid-cols-3 gap-4 text-sm">
                <span className="font-medium text-gray-900 text-xs">{pattern.widget}</span>
                <span className="text-violet-600" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
                  {pattern.keys}
                </span>
                <span className="text-gray-500 text-xs">{pattern.behavior}</span>
              </div>
            ))}
          </div>
        </div>

        <h2 id={toc[3].id}>{toc[3].label}</h2>
        <p>
          A focus trap keeps keyboard focus inside a container — required for modals and dialogs (users shouldn't be able to Tab out of an open modal). Implementing one correctly:
        </p>
        <ul>
          <li>Find all focusable elements within the container</li>
          <li>On Tab at the last element, move to the first</li>
          <li>On Shift+Tab at the first element, move to the last</li>
          <li>Release the trap when the dialog closes</li>
        </ul>
        <p>
          Don't implement this yourself — use a well-tested library like <a href="https://github.com/focus-trap/focus-trap-react" target="_blank" rel="noopener noreferrer"><code>focus-trap-react</code></a> or the focus trap built into <a href="https://www.radix-ui.com/primitives/docs/components/dialog" target="_blank" rel="noopener noreferrer">Radix UI's Dialog primitive</a>. Focus traps are deceptively subtle to get right across browsers and screen readers.
        </p>

        <DocNav currentPath={pathname} />
      </article>
    </>
  )
}
