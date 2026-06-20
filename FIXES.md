# FIXES.md — Prioritised bug/UX fixes for Athena; checked off as each is completed.

- [x] **1. `src/app/notes/new/page.tsx` — wrap `createNote` in try/catch, call `toast.error(...)`, and reset `setSaving(false)` on failure so the button doesn't lock permanently when the API call fails**
- [x] **2. `src/app/notes/[id]/ChatPanel.tsx` — destructure `error` from `useChat` and fire `toast.error(error.message)` in a `useEffect` so streaming failures are visible instead of silently swallowed**
- [x] **3. `src/app/notes/new/page.tsx` — add `disabled={saving}` to `<Input>` and `<Textarea>` so both fields lock during save and prevent mid-flight edits**
- [x] **4. `src/app/notes/page.tsx` — add `truncate` class to the note title `<p>` so long titles don't wrap and break the list-row layout**
- [x] **5. `src/app/notes/loading.tsx` (new file) — add a Skeleton loading UI for the note list so users see a placeholder instead of a blank page during server-side data fetching**
- [x] **6. `src/app/notes/[id]/loading.tsx` (new file) — add a Skeleton loading UI for the note detail page (title, body, generate button area, chat panel) to cover the three-query server load**
- [x] **7. `src/app/notes/[id]/practice/page.tsx` — call `getNote(id)` and `notFound()` if it returns null, so a direct URL to a non-existent note ID shows a 404 instead of an empty flashcard screen**
- [ ] **8. `src/app/notes/new/page.tsx` — add `maxLength={200}` to the title `<Input>` and a live character counter or `maxLength` cap on the body `<Textarea>` to prevent oversized payloads being sent to Claude**
- [ ] **9. `src/app/notes/[id]/GenerateButton.tsx` — when `hasCards` is true, show a "Regenerate" option alongside "Practice →" (with a confirmation Dialog) so users can refresh stale flashcards without manually deleting them from the DB**
- [ ] **10. `src/app/error.tsx` (new file) — add a global error boundary that renders a friendly message and a "Go back" link instead of the raw Next.js error page when a server component throws**
