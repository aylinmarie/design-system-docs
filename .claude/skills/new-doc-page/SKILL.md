---
name: new-doc-page
description: Scaffold a new documentation page in src/pages/ following this project's established page pattern (toc array, Heading/Text/Callout, DocNav), and wire it into routing and navigation.
disable-model-invocation: true
---

# New Doc Page

Every page in `src/pages/` follows the same skeleton. This skill scaffolds a new
one from that pattern instead of improvising a new structure.

## Usage

`/new-doc-page <PageName> "<Section title>" "<route path>"`

Example: `/new-doc-page Motion "Foundations" "/motion"`

## Steps

1. Read one existing page as the structural reference — `src/pages/Spacing.tsx`
   is a good default (no exotic props). Match its shape exactly; don't invent a
   new layout.
2. Create `src/pages/<PageName>.tsx`:
   - Imports: only the Radix primitives actually used (`Box`, `Heading`, `Text`,
     `Flex`, etc. from `@radix-ui/themes`), `TableOfContents`/`TocItem` from
     `../components/TableOfContents`, `DocNav` from `../components/DocNav`,
     `Callout` from `../components/Callout` (only if the page uses one),
     `useLocation` from `react-router-dom`.
   - `const toc: TocItem[]` — 2–5 entries: `{ id: 'kebab-id', label: 'Sentence case label', level: 2 }`.
   - `export function <PageName>()` reading `pathname` via `useLocation()`.
   - `<TableOfContents items={toc} />` then `<article className="doc-article">`.
   - `<Text size="1" weight="bold" color="violet" className="doc-category">` —
     the section title, matches the `navigation.ts` group name.
   - `<Heading as="h1" size="8" mb="2">` — the page title.
   - `<Text as="p" size="3" color="gray" className="doc-lead">` — one sentence,
     no hedging, states what the page covers.
   - One `<Heading as="h2" size="6" mt="7" mb="3" className="doc-h2" id={toc[i].id}>{toc[i].label}</Heading>`
     per toc entry, each followed by placeholder body content.
   - `<DocNav currentPath={pathname} />` as the last element inside `<article>`.
3. Register the route in `src/App.tsx`: add the import in the existing
   alphabetical/grouped order and a `<Route path="<route path>" element={<PageName />} />`.
4. Add the page to `src/data/navigation.ts`. **Check first** — most groups in
   that file are currently commented out (only "Getting Started" is active).
   Ask whether the new entry belongs in an existing active group, an existing
   commented-out group that should now be uncommented, or a new group —
   don't silently guess.
5. Reuse existing CSS classes already used across `src/pages/*.tsx`
   (`demo-card`, `demo-card-header`, `demo-row`, `demo-label`, `token-mono`,
   `token-mono-flex`, `token-mono-muted`, `token-mono-accent`) instead of adding
   new ones, unless the content genuinely can't be expressed with them.

## Non-goals

This skill produces structure, not prose. The actual explanatory content is the
user's call — fill the placeholder sections with real writing yourself, or ask
the user for it. Don't fabricate technical claims to fill space.
