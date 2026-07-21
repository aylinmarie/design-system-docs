import { Box, Heading, Text } from '@radix-ui/themes'
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
      <article className="doc-article">
        <Text size="1" weight="bold" color="violet" className="doc-category">Accessibility</Text>
        <Heading as="h1" size="8" mb="2">Keyboard Navigation</Heading>
        <Text as="p" size="3" color="gray" className="doc-lead">
          Keyboard accessibility enables anyone who can't use a pointer — motor disabilities, power users, assistive tech users — to use your product fully.
        </Text>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[0].id}>{toc[0].label}</Heading>
        <Text as="p" size="3" mb="3">
          Keyboard-accessible interfaces support: people with motor impairments who use keyboards, switches, or voice control; screen reader users who navigate primarily via keyboard; power users who prefer keyboard for efficiency; and developers testing the product.
        </Text>
        <Text as="p" size="3" mb="3">
          Every interactive element must be reachable by Tab key, operable by keyboard, and clearly indicate focus. No exceptions.
        </Text>

        <Callout type="warning" title="The click-only trap">
          The most common keyboard failure: attaching behavior only to <code>click</code> events on non-button elements. A <code>div</code> with <code>onClick</code> doesn't receive keyboard events, doesn't appear in the tab order, and provides no semantic role. Use native elements (<code>button</code>, <code>a</code>) or add <code>role</code>, <code>tabindex</code>, and <code>onKeyDown</code>.
        </Callout>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[1].id}>{toc[1].label}</Heading>
        <Text as="p" size="3" mb="3">
          The natural tab order follows DOM order. This means the visual layout and DOM order must be aligned — don't reorder elements with CSS in a way that breaks keyboard traversal.
        </Text>
        <Text as="p" size="3" mb="3">
          Three situations where programmatic focus management is required:
        </Text>
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

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[2].id}>{toc[2].label}</Heading>
        <Text as="p" size="3" mb="3">
          The <a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank" rel="noopener noreferrer">ARIA Authoring Practices Guide (APG)</a> defines keyboard interaction patterns for common widget types. These are the patterns your system components should implement:
        </Text>

        <Box className="demo-card">
          <Box className="kbd-table-header">
            <Text size="1" weight="bold" color="gray" className="demo-label">Widget</Text>
            <Text size="1" weight="bold" color="gray" className="demo-label">Keys</Text>
            <Text size="1" weight="bold" color="gray" className="demo-label">Behavior</Text>
          </Box>
          {keyboardPatterns.map(pattern => (
            <Box key={pattern.widget} className="kbd-table-row">
              <Text size="1" weight="medium">{pattern.widget}</Text>
              <Text as="span" className="kbd-mono">{pattern.keys}</Text>
              <Text size="1" color="gray">{pattern.behavior}</Text>
            </Box>
          ))}
        </Box>

        <Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[3].id}>{toc[3].label}</Heading>
        <Text as="p" size="3" mb="3">
          A focus trap keeps keyboard focus inside a container — required for modals and dialogs (users shouldn't be able to Tab out of an open modal). Implementing one correctly:
        </Text>
        <ul>
          <li>Find all focusable elements within the container</li>
          <li>On Tab at the last element, move to the first</li>
          <li>On Shift+Tab at the first element, move to the last</li>
          <li>Release the trap when the dialog closes</li>
        </ul>
        <Text as="p" size="3" mb="3">
          Don't implement this yourself — use a well-tested library like <a href="https://github.com/focus-trap/focus-trap-react" target="_blank" rel="noopener noreferrer"><code>focus-trap-react</code></a> or the focus trap built into <a href="https://www.radix-ui.com/primitives/docs/components/dialog" target="_blank" rel="noopener noreferrer">Radix UI's Dialog primitive</a>. Focus traps are deceptively subtle to get right across browsers and screen readers.
        </Text>

        <DocNav currentPath={pathname} />
    </article>
    </>
  )
}
