---
name: writing-style-check
description: Review documentation prose in this site against the anti-AI writing guide (aiwritingguide.misterburton.com, sourced from Wikipedia's "Signs of AI writing") and fix genuine violations.
---

# Writing Style Check

Applies the checklist at https://aiwritingguide.misterburton.com/ (itself
sourced from Wikipedia's "Signs of AI writing") to prose in `src/pages/*.tsx`.

## What to check

**Banned/overused words** — flag any use, then judge in context:
`additionally, align with, bolster, crucial, delve, emphasizing, enduring,
enhance, foster, garner, highlight, interplay, intricate, key, landscape,
meticulous, pivotal, robust, showcase, tapestry, testament, underscore,
valuable, vibrant, boasts, rich, profound, nestled, "in the heart of",
groundbreaking, renowned, "diverse array"`

**Copula avoidance** — "serves as / stands as / functions as / represents /
offers / boasts" used where a plain "is/are" would be more direct.

**Negative parallelism** — "Not just X, but Y," "It's not X, it's Y," and
overused "X rather than Y" constructions.

**Rule-of-three hedging** — mechanical adjective/adjective/adjective triplets,
or "Whether you're X, Y, or Z, there's something for everyone" closers.

**Vague attribution / promotional language** — "industry reports show,"
"experts argue," unearned superlatives with no source behind them.

**Formatting tells** — Title Case creeping into headings that are sentence
case elsewhere, mechanical boldface on every key term.

**Not a violation on this site**: em dashes used as a glossary-style separator
(`term — definition`) are this site's established convention throughout
`src/pages/`, not "dramatic effect" — don't flag or strip them.

## Process

1. Grep the target file(s) for the banned-word list above.
2. For each hit, read the full sentence and judge whether it's a genuine tell
   or an ordinary, load-bearing use of a common word (e.g. "highlights" as a
   plain noun in a bullet list is fine; "underscores the importance of" is
   not).
3. Rewrite only flagged sentences — make them direct and specific, matching
   the site's existing terse, confident voice (short declarative sentences,
   concrete claims, no hedging, no inclusive-closer filler).
4. Report each change as one line: what was flagged, what it became, why.

## Non-goals

This is a targeted pass against the checklist, not a full copyedit — don't
rewrite sentences that don't trip a rule just for variety.
