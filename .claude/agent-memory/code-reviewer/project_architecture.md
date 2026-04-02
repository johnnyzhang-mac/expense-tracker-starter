---
name: Project architecture and patterns
description: Key architectural decisions and patterns observed across the full codebase review
type: project
---

App is the sole state owner (transactions array + handleAdd + handleDelete). All child components receive transactions as a prop. No context, no external state management.

Component roles:
- Summary: pure display, computes totals inline (no memoization)
- TransactionForm: owns its own local form state, calls onAdd prop on submit
- TransactionList: owns filter state and confirmingId for delete confirmation flow
- SpendingChart: derives expensesByCategory from transactions prop inline

Key patterns observed:
- `categories` array is duplicated identically in both TransactionForm and TransactionList — a shared constants module would be the clean fix
- CSS lives in App.css (component styles) and index.css (reset + fonts). No CSS modules or scoped styles.
- IDs are generated with Date.now() in TransactionForm — not collision-safe for rapid adds
- Hardcoded color values (#6b7c5c) appear in JSX (SpendingChart) despite CSS custom properties being defined for the same value

**Why:** First full codebase review completed 2026-04-01.
**How to apply:** Use this as baseline context when reviewing future changes. Flag regressions against these patterns.
