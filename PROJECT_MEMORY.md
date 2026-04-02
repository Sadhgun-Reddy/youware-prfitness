# Project Memory: FitSync Pro

This memory file captures the working context, decisions, design-system state, and patch history to preserve continuity across sessions and chats.

Version: 1.0
Last Updated: 2026-04-01

1) Project snapshot
- Name: FitSync Pro (design system hub + gym management MVP)
- Tech stack (frontend): React 18, TypeScript, Vite, Tailwind CSS, Zustand, Framer Motion
- Actors: Admin (gym owner/head trainer) and User (member)
- Core MVP flows covered: multi-step registration, plan selection, MVP payment flow, geo-verified check-in (client-side), progress history, video library, admin dashboard scaffolding

2) Design system state (tokens memory)
- Colors (as token names):
  - Primary navy: #1A3C5E
  - Accent: #E87722
  - Surface: #FFFFFF
  - Background: #F8FAFC
  - Success: #1E7A45
  - Error: #C0392B
- Typography: Inter, system-ui; headings and body defined in token system
- Ridges: border radii ~12px; card elevation shadows as per Tailwind tokens
- Design-system usage: tokens are provided via tailwind.config.js and some components reference brand/blue tokens (legacy) — a migration plan is noted in the PROCESS.md

3) Phase plan (high-level)
- Phase 0: Stabilize UX and architecture (header across auth, theming alignment)
- Phase 1: Authentication backbone (mock -> token-based, route guards, Step 3 fix)
- Phase 2: Plan selection + MVP payment flow
- Phase 3: Geo-check-in hardening (server-validated)
- Phase 4: Progress tracking MVP (weekly/Sunday windows)
- Phase 5: Video library and admin video management
- Phase 6: PT workflows (My Workout Plan, Diet Plan, Trainer Remarks)
- Phase 7: Admin dashboards and member management
- Phase 8: Testing, CI, and docs
- Phase 9: Security hardening and runbooks

4) Key decisions (current)
- Auth layout: central header via AuthLayout for auth screens to ensure consistency
- Payment: MVP MVP flow with a simulated payment screen (no real Razorpay integration yet). Future: real Razorpay with server endpoints and webhook validation
- Memory strategy: memory is persisted in the repository as a file to preserve context across chats. This can be extended to a small “design-system hub” for tokens and a “patch log” for patch history.

5) Patch history (high-level)
- Patch 0: Added PROCESS.md (SOP for future tasks)
- Patch 1: Introduced AuthLayout and updated routes to render header on auth screens
- Patch 2: MVP payment flow and PlanSelection wiring
- Patch 3: Auth token state augmentation in useAuthStore
- Patch 4: Admin ProgressReviews fix (hook-order) to prevent runtime errors
- Patch 5: Tailwind theme token extension to support dark/brand tokens
- Patch 6: New PROJECT_MEMORY.md to capture memory state going forward

6) How to resume in new chat
- When starting a new chat, copy this file’s contents into the chat to rehydrate context and continue the task from the last state.
- I will use memory as reference to avoid re-asking for the same context and proceed with the next patch or plan steps.

7) Notes for future maintenance
- The memory file is a living artifact. Update it after every significant design decision, patch, or critical bug fix.
- If memory diverges from repository state due to rebase or merge, I will reconcile it by updating the memory with the exact diff or by documenting the divergence in memory.

8) Chat History (Current Session)
- Summary: Expanded memory to capture ongoing chat context for continuity across sessions.
- Transcript: Key decisions and actions from this chat session are now captured in memory (auth header, memory plan, patches, design-system tokens, etc.).
- Next steps: Update memory after every patch; use the memory reader to verify content when starting a new chat.

End of memory.
9) Patch Log (Concrete Patches Applied This Session)
- Patch 1: Add PROCESS.md
  - Summary: Added Process SOP for task execution
  - Files: PROCESS.md
  - Acceptance: SOP exists and is readable
- Patch 2: Add memory scaffolding files
  - Summary: Added PROJECT_MEMORY.md and memory scripts
- Patch 3: Add AuthLayout and routing fix
- Patch 4: Add MVP Payment flow
- Patch 5: Hook-order fix on ProgressReviews
- Patch 6: Tailwind token extension
- Patch 7: Memory read tooling
- Patch 8: Update memory with chat history
- Patch 9: Extend AuthState with token and memory hooks in store
- Patch 10: Rework ProgressReviews to stable hook order and ensure UI renders
