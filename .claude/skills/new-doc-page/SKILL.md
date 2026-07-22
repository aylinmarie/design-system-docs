---
name: new-doc-page
description: Scaffold a new documentation page in src/pages/ following this project's established MDX page pattern (frontmatter, DocPage chrome, Callout), and wire it into routing and navigation.
disable-model-invocation: true
---

# New Doc Page

Every page in `src/pages/` is an `.mdx` file following the same shape. This
skill scaffolds a new one from that pattern instead of improvising a new
structure.

## Usage

`/new-doc-page <PageName> "<Section title>" "<route path>"`

Example: `/new-doc-page Motion "Foundations" "/motion"`

## Steps

1. Read one existing page as the structural reference — `src/pages/Spacing.mdx`
   is a good default (no exotic widgets). Match its shape exactly; don't invent
   a new layout. Also skim `src/components/DocPage.tsx` so you know what chrome
   it already supplies (category label, `<h1>`, dek, TOC, `<DocNav>`) — none of
   that belongs in the MDX file itself.
2. Create `src/pages/<PageName>.mdx`:
   - YAML frontmatter with `category` (matches the `navigation.ts` group name),
     `title`, and `dek` (one sentence, no hedging, states what the page covers).
   - If the page uses `Callout` or any Radix primitives for a custom widget,
     `import` them at the top (`import { Callout } from '../components/Callout'`,
     `import { Box, Flex, Text } from '@radix-ui/themes'`, etc.). Reuse
     `src/components/mdx/DemoCard.tsx` for the common "labeled card with rows"
     shape instead of hand-rolling the `demo-card`/`demo-card-header` markup.
   - Body content starts at `##` (h2) — plain Markdown prose, lists, and code
     fences. Don't write a `toc` array, a `<Heading as="h1">`, or manual heading
     `id`s — `DocPage` and `rehype-slug` handle all of that automatically from
     the rendered `##`/`###` headings.
   - Data-driven demo widgets: declare `export const someArray = [...]` and use
     it inline with `.map()` in JSX, same as the existing pages.
3. Register the route in `src/App.tsx`: import both the default export and its
   `frontmatter` named export (`import PageName, { frontmatter as pageNameFm }
   from './pages/<PageName>.mdx'`), then add `{docRoute('<route path>', PageName,
   pageNameFm)}` in the existing grouped order.
4. Add the page to `src/data/navigation.ts`. **Check first** — most groups in
   that file are currently commented out (only "Getting Started" is active).
   Ask whether the new entry belongs in an existing active group, an existing
   commented-out group that should now be uncommented, or a new group —
   don't silently guess.
5. Reuse existing CSS classes already used across `src/pages/*.mdx`
   (`demo-card`, `demo-card-header`, `demo-row`, `demo-label`, `token-mono`,
   `token-mono-flex`, `token-mono-muted`, `token-mono-accent`) instead of adding
   new ones, unless the content genuinely can't be expressed with them.

## Non-goals

This skill produces structure, not prose. The actual explanatory content is the
user's call — fill the placeholder sections with real writing yourself, or ask
the user for it. Don't fabricate technical claims to fill space.
