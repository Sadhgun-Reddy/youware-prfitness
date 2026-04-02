# Task Processing Standard Operating Procedure (SOP)

Purpose
- This document defines a repeatable, explicit process for analyzing, designing, implementing, validating, and documenting changes in the repository. It ensures consistency, quality, and traceability across tasks.

Scope
- Applies to feature work, bug fixes, migrations, and design-to-code translation tasks within this repository.

Core Principles
- Clarity: start with a precise problem statement and acceptance criteria.
- Safety: avoid destructive commands; prefer non-destructive edits and reversible patches.
- Traceability: changes must be patch-based (apply_patch) with a clear commit history and PR narrative.
- Quality: enforce tests, linting, and simple guardrails before merging.

Role and Responsibilities
- Implementer: executes the plan, edits files, and runs validations.
- Reviewer: (if applicable) inspects diffs, tests results, and ensures alignment to acceptance criteria.
- Maintainer: approves PRs and ensures branch hygiene and release readiness.

Intake (Task Scoping)
- Capture requirements: what problem are we solving? what is the deemed outcome?
- Define acceptance criteria (one or two sentences per criterion).
- Identify dependencies and any risks or constraints.
- Decide on a plan: split the work into phases with clear milestones.

Plan and Execution Workflow
1) Discovery and Analysis
- Use Glob to locate relevant files and Grep to search for relevant content (e.g., Button usage, auth flows).
- Create a short summary of the current state and the gap(s).
2) Plan Generation (Patch Plan)
- Break down the work into concrete patches grouped by feature area.
- For each patch:
  - Target file(s)
  - Change description (what, why, how)
  - Acceptance criteria
3) Implementation
- Create a branch per feature/bug fix (e.g., feat/auth-flow, fix/reg-step-3-validation).
- Use the patch tool (apply_patch) to implement changes.
- Ensure non-breaking edits; avoid large rewrites unless necessary.
4) Verification
- Run unit tests and type checks (npm test, npm run lint, npm run build if available).
- Manual verification: follow the acceptance criteria with a quick QA pass.
- If UI changes, render across desktop/tablet/mobile viewports.
5) Documentation and Diffs
- Update any relevant docs or PRD mappings to reflect changes.
- Provide a concise patch summary in the PR description.
6) Review and Merge
- A reviewer validates the patch diffs and test results before merge.
- If pre-commit hooks fail, fix and re-run.
7) Rollback Plan
- If issues are detected in production, revert the patch on a new branch and reapply a corrected patch.

Branching and Commit Hygiene
- Branch naming:
  - feat/<short-description>
  - fix/<short-description>
  - chore/<short-description>
- Commit message format (why-based):
  - feat(auth): add JWT-based flow outline
  - fix(reg): correct Step 3 validation and typing alignment
  - chore(theming): extend Tailwind color scales
- Use conventional commits style where possible.

Testing and Quality Assurance
- Unit tests: add tests for core logic (e.g., auth store, registration validation) where feasible.
- Integration tests: cover critical flows (signup -> plan -> payment -> dashboard) using Playwright or Cypress.
- Linting/Type-check: ensure code passes eslint and TypeScript checks on CI.

Design and UX notes
- Where designs exist (e.g., designs/png or Figma), align visuals with the design system.
- If pixel-perfect is required, consider a pixel-diff approach with a tolerance window.

Error Handling and Accessibility
- Add error boundaries for major route constellations.
- Ensure forms have proper labels and aria attributes where needed; ensure adequate color contrast.

Patch Delivery and Verification Plan (Template)
- Patch 1 (Phase 0): Auth header consistency and theming hygiene. Acceptance: header visible on login/register; no missing tokens.
- Patch 2 (Phase 1): Auth backbone (mock -> JWT-like flow) and Step 3 fix. Acceptance: protected routes gate, Step 3 validation fixed, types aligned.
- Patch 3 (Phase 2): Plan selection + MVP payment flow. Acceptance: end-to-end flow yields a payment success scenario.
- Patch 4 (Phase 3+): Geo-check-in server-side validation, Progress MVP, Admin dashboards, and tests/CI.

How to Test This SOP (Commands and Checks)
- Globs/search:
  - rg -n "pattern" <path>
- Show changed files after patch:
  - git diff --name-only --staged
- Apply patches:
  - Use the provided apply_patch format in this environment.
- Run tests and lint:
  - npm run lint
  - npm test
  - npm run build (if available)

Patch/Change Patch Delivery Notes
- Every patch should be delivered as a patch diff (Git patch style) or as a series of apply_patch blocks.
- Every patch should include: File(s) touched, a concise description, and acceptance criteria.
- Provide a short post-patch verification guide.

Patch example (diff patch format)
```
*** Begin Patch
*** Update File: path/to/file.tsx
+ // summary of changes
*** End Patch
```

End of SOP
