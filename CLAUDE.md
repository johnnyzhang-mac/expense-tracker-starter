# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

No test framework is configured.

## Architecture

No routing, no context, no external state management. `App` is the sole data layer — it holds the `transactions` array and passes it down to child components.

**Component breakdown:**
- `App` — owns `transactions` state and `handleAdd`; renders the other three components
- `Summary` — receives `transactions`, computes `totalIncome`, `totalExpenses`, and `balance` internally
- `TransactionForm` — owns its own form state; calls `onAdd(transaction)` prop on submit
- `TransactionList` — receives `transactions`, owns filter state (`filterType`, `filterCategory`) internally

**Known issues (intentional — this is a course starter project):**
- "Freelance Work" is seeded as `type: "expense"` but `category: "salary"` — logically inconsistent
- No delete functionality
- UI/CSS is intentionally rough
