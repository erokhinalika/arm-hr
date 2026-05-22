---
name: ui-polish-pass
description: Use when implementing visual polish on one or more static HTML prototype screens.
---

# UI Polish Pass Skill

## Goal
Improve perceived quality while preserving prototype behavior and product meaning.

## Workflow
1. Read `context/scope.md`, `context/screen-map.md`, and the target HTML.
2. Find related CSS in `styles.css` before adding new CSS.
3. Improve hierarchy first, then spacing, then component consistency, then microcopy.
4. Prefer token-level or shared component fixes when multiple screens benefit.
5. Keep changes small and reversible.

## Checks
- No new product screens.
- No new framework.
- No broken links between prototype pages.
- No removed `data-mock-*` hooks.
- Russian UI copy remains natural and concise.
