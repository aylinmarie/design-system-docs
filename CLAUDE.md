# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Design Systems Docs — an open source knowledge base on design systems (foundations, component architecture, accessibility, data visualization, governance). A static content site: React 19 + React Router 7 + Radix UI Themes + Vite + TypeScript, no backend. Page content is authored in MDX, with TSX components consumed inside it where markdown isn't enough.

## Commands

This project uses **pnpm** (`pnpm-lock.yaml` is the only committed lockfile — don't run plain `npm install`, it regenerates a stray `package-lock.json` that conflicts with the pnpm-based Vercel deploy):

```bash
pnpm install
pnpm run dev      # dev server
pnpm run build    # tsc -b && vite build (type-check is part of the build, not a separate step)
pnpm run lint      # oxlint (not ESLint — config in .oxlintrc.json)
pnpm run preview   # preview the production build
```

No test suite is configured in this repo. Vercel deploys on every push/PR and runs `pnpm install --frozen-lockfile`, so `pnpm-lock.yaml` must stay in sync with `package.json` — run `pnpm install` (not `npm install`) after changing dependencies.

**Environment gotcha**: oxlint requires Node `^20.19.0 || >=22.12.0`. Under older Node 22.x builds it fails with a native-binding `MODULE_NOT_FOUND` error rather than a normal lint error — that's an engine mismatch, not a broken install.

## Architecture

**Routing is centralized and manual.** Every page in `src/pages/` is an `.mdx` file that must be explicitly imported (both the default export and its `frontmatter` named export) and wired up via the `docRoute(path, Content, frontmatter)` helper in `src/App.tsx` — there's no file-based routing.

**Every doc page is an MDX file that follows one shape**, and new pages should match it rather than improvising:
- YAML frontmatter with `category`, `title`, and an optional `dek` (the dek/lead paragraph) — parsed by `remark-frontmatter` + `remark-mdx-frontmatter` into a `frontmatter` named export
- A body written in plain Markdown starting at `##` (h2) sections — no `<Heading as="h1">`, no manual `toc` array, no `<TableOfContents>`/`<DocNav>` wiring in the file itself
- Optional `<Callout type="info" | "tip" | "warning" | "success">` blocks, imported from `../components/Callout`
- Custom demo widgets (data-driven swatches, tables, scales) as inline JSX using `export const someArray = [...]` plus a `.map()` — reuse `src/components/mdx/DemoCard.tsx` for the common "labeled card with rows" shape where it fits

`src/components/DocPage.tsx` supplies everything else: it renders the `doc-category` label, `<h1>`, and `dek` from the frontmatter props, wraps the MDX body in `<article className="doc-article">`, and appends `<DocNav currentPath={pathname} />`. The route helper in `App.tsx` wraps each page's MDX content in `<DocPage {...frontmatter}>`.

**There's no hand-authored `toc` array anymore.** `DocPage` scans its own rendered article for `h2[id]` elements after mount and builds the table of contents from that — `rehype-slug` (configured in `vite.config.ts`) auto-generates each heading's `id` from its text, so the heading and its TOC entry can't drift out of sync the way they could in the old hand-maintained-array pattern.

**MDX → Radix wiring**: `vite.config.ts` registers `@mdx-js/rollup` (with `remark-gfm`, `remark-frontmatter`/`remark-mdx-frontmatter`, and `rehype-slug`) ahead of `@vitejs/plugin-react`. `src/mdxComponents.tsx` + the `<MDXProvider>` in `main.tsx` map compiled markdown `h2`/`p` elements to Radix `Heading`/`Text` so prose renders identically to the old hand-written TSX. Don't render a raw `<p>` inside a `<Callout>` (or anything else that itself renders a `<p>`) — Callout's `Text` renders as a `div` specifically to avoid nested `<p>` tags, since MDX wraps standalone block text in its own `<p>` before the component-mapping ever runs.

**`src/data/navigation.ts` drives both the sidebar and prev/next paging** (`Sidebar.tsx` renders it directly; `DocNav.tsx` flattens all groups' `items` into one list and finds prev/next by matching `currentPath`). A page that's routed in `App.tsx` but missing from `navigation.ts` will render fine but won't get sidebar visibility or prev/next links.

**Known quirk**: most groups in `navigation.ts` (Foundations, Accessibility, Data Visualization, Component Architecture, Governance) are currently commented out even though their corresponding pages exist and are fully routed in `App.tsx` — only "Getting Started" is active. Don't assume a page is unreachable just because it's absent from the live nav; check for a commented-out block before adding a new one.

**Design system**: Radix UI Themes is configured once in `main.tsx` (`accentColor="violet" grayColor="slate" radius="medium"`) and used throughout via its component primitives (`Box`, `Heading`, `Text`, `Flex`, `Card`, `Badge`) rather than raw HTML + utility classes. Tailwind is still a devDependency from an earlier scaffold but is not the active styling approach — layout and one-off styling live in `src/index.css` as plain CSS with custom properties (`--header-height`, `--sidebar-width`, `--toc-width`, etc.), not Tailwind classes. Icons are from `lucide-react`.

## Project automations

`.claude/` in this repo already defines:
- Skills: `new-doc-page` (scaffolds a page matching the pattern above and wires up routing/nav), `writing-style-check` (applies the anti-AI writing checklist from aiwritingguide.misterburton.com to page prose)
- Subagent: `docs-consistency-reviewer` (checks toc/heading correspondence, route/nav wiring, CSS class reuse — structural consistency only, not prose or general code review)
- Hooks: blocks direct edits to `package-lock.json`; runs `oxlint` on `.ts`/`.tsx` edits
