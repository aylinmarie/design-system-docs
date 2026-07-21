# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Design Systems Docs — an open source knowledge base on design systems (foundations, component architecture, accessibility, data visualization, governance). A static content site: React 19 + React Router 7 + Radix UI Themes + Vite + TypeScript, no backend.

## Commands

```bash
npm install
npm run dev      # dev server
npm run build    # tsc -b && vite build (type-check is part of the build, not a separate step)
npm run lint      # oxlint (not ESLint — config in .oxlintrc.json)
npm run preview   # preview the production build
```

No test suite or CI is configured in this repo.

**Environment gotcha**: oxlint requires Node `^20.19.0 || >=22.12.0`. Under older Node 22.x builds it fails with a native-binding `MODULE_NOT_FOUND` error rather than a normal lint error — that's an engine mismatch, not a broken install.

## Architecture

**Routing is centralized and manual.** Every page in `src/pages/` must be explicitly imported and added as a `<Route>` in `src/App.tsx` — there's no file-based routing.

**Every doc page follows one strict skeleton**, and new pages should match it exactly rather than improvising:
- A `toc: TocItem[]` array (`{ id, label, level: 2 | 3 }`) declared at module scope
- `doc-category` label → `<Heading as="h1">` → `doc-lead` dek paragraph
- One `<Heading as="h2" id={toc[i].id}>` per toc entry, in the same order, with body content underneath
- Optional `<Callout type="info" | "tip" | "warning" | "success">` blocks
- `<DocNav currentPath={pathname} />` as the last element

The heading `id` attributes **must** match the `toc` entry ids exactly — `TableOfContents.tsx` uses an `IntersectionObserver` keyed on those ids to highlight the active section as the user scrolls (scrollspy). A mismatch silently breaks the highlight, not the render.

**`src/data/navigation.ts` drives both the sidebar and prev/next paging** (`Sidebar.tsx` renders it directly; `DocNav.tsx` flattens all groups' `items` into one list and finds prev/next by matching `currentPath`). A page that's routed in `App.tsx` but missing from `navigation.ts` will render fine but won't get sidebar visibility or prev/next links.

**Known quirk**: most groups in `navigation.ts` (Foundations, Accessibility, Data Visualization, Component Architecture, Governance) are currently commented out even though their corresponding pages exist and are fully routed in `App.tsx` — only "Getting Started" is active. Don't assume a page is unreachable just because it's absent from the live nav; check for a commented-out block before adding a new one.

**Design system**: Radix UI Themes is configured once in `main.tsx` (`accentColor="violet" grayColor="slate" radius="medium"`) and used throughout via its component primitives (`Box`, `Heading`, `Text`, `Flex`, `Card`, `Badge`) rather than raw HTML + utility classes. Tailwind is still a devDependency from an earlier scaffold but is not the active styling approach — layout and one-off styling live in `src/index.css` as plain CSS with custom properties (`--header-height`, `--sidebar-width`, `--toc-width`, etc.), not Tailwind classes. Icons are from `lucide-react`.

## Project automations

`.claude/` in this repo already defines:
- Skills: `new-doc-page` (scaffolds a page matching the pattern above and wires up routing/nav), `writing-style-check` (applies the anti-AI writing checklist from aiwritingguide.misterburton.com to page prose)
- Subagent: `docs-consistency-reviewer` (checks toc/heading correspondence, route/nav wiring, CSS class reuse — structural consistency only, not prose or general code review)
- Hooks: blocks direct edits to `package-lock.json`; runs `oxlint` on `.ts`/`.tsx` edits
