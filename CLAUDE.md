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

This is a single-file React app (`src/App.jsx`) with all state and logic in one `App` component. There is no routing, no context, and no external state management.

**Known bugs and issues (intentional — this is a course starter project):**
- `amount` is stored as a string in state, so `totalIncome` and `totalExpenses` use string concatenation instead of numeric addition (the `reduce` sums are wrong)
- "Freelance Work" is seeded as `type: "expense"` but `category: "salary"` — logically inconsistent
- No delete functionality
- UI/CSS is intentionally rough
