---
name: Recurring issues identified in full codebase review
description: Bugs and patterns found in the 2026-04-01 full review that may recur or need follow-up
type: project
---

Critical bug: TransactionForm passes `amount` as a string (from input value) to onAdd, but Summary and SpendingChart treat amounts as numbers. This causes string concatenation instead of addition in reduce() calls once a user-added transaction is included.

Recurring pattern — formatting inconsistency: Summary uses toLocaleString() for amounts; TransactionList uses raw ${t.amount} with no formatting. These will diverge visually for large numbers.

Recurring pattern — categories duplication: The `categories` array is copy-pasted into both TransactionForm.jsx and TransactionList.jsx. Should live in a shared constants file (e.g., src/constants.js).

Edge case: confirmingId in TransactionList is never reset when the transactions prop changes (e.g., after a delete initiated elsewhere). In the current single-delete-path this is fine, but would be a stale state bug if delete could be triggered externally.

SpendingChart: bar fill color (#6b7c5c) is hardcoded in JSX, duplicating the --olive CSS variable. Should reference the variable or a shared constant.

**Why:** Identified during first full codebase review 2026-04-01.
**How to apply:** When reviewing future PRs, check whether these have been addressed. Flag if new code repeats the same anti-patterns.
