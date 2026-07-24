# Design Systems Docs

An open source knowledge base on design systems, for designers and engineers who are building, contributing to, or inheriting one. It covers the ground between a solo designer formalizing conventions and a tech lead architecting a platform for dozens of product squads: foundations, component architecture, accessibility, data visualization, and governance.

## Sections

- **Getting Started** — what a design system is, and who this guide is for
- **Foundations** — design tokens, typography, color, spacing & grid, iconography
- **Component Architecture** — component API design, composition patterns
- **Accessibility** — WCAG conformance, color & contrast, keyboard navigation, ARIA & semantics
- **Data Visualization** — principles, color, chart patterns
- **Governance** — contribution models, versioning & releases

## Stack

React 19, React Router 7, [Radix UI Themes](https://www.radix-ui.com/themes), Vite, TypeScript. Linted with [oxlint](https://oxc.rs).

## Development

```bash
pnpm install
pnpm run dev      # start the dev server
pnpm run build    # type-check and build for production
pnpm run lint     # run oxlint
pnpm run preview  # preview the production build locally
```

## Contributing

This guide is open source and opinionated but not dogmatic — where there are genuine tradeoffs, it names them rather than pretending there's one right answer.

- **Corrections** — open an issue or PR with a specific change and why
- **New sections** — open an issue first to discuss scope before writing
- **Examples** — real-world examples from your own experience are the highest-value addition

Source: [github.com/aylinmarie/design-system-docs](https://github.com/aylinmarie/design-system-docs)
