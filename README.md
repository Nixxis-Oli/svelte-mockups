# Svelte UI mockups — Skeleton vs shadcn vs Ark UI

Three throwaway SvelteKit apps built to compare the candidate component approaches
for an admin-app rewrite. Same features, same data, same non-UI code — only the
component layer differs.

| | Library | Styling model | Tour |
|---|---|---|---|
| `skeleton-mock` | Skeleton 5 | design system provided (24 themes) | via Ark |
| `shadcn-mock` | bits-ui + shadcn conventions | tokens authored in `app.css` | via Ark |
| `ark-mock` | Ark UI | tokens authored in `app.css` | native |

## Run locally

```bash
cd shadcn-mock && npm install && npm run dev
```

## Build

```bash
npm run build      # → build/
npm run preview
```

Each app prerenders to **14 static pages** in `build/`. Any static host will serve
that directory as-is. For a host serving from a subdirectory (GitHub project pages):

```bash
BASE_PATH=/your-repo-name npm run build
```

## The data is a snapshot

These apps originally read a live admin API. For publication they were converted to
**fully static**: `src/lib/fixtures/contexts.json` holds a snapshot of five contexts,
and `src/lib/data.ts` reads it. No API is called at runtime, no key is needed, and
nothing is written anywhere.

Consequences, all deliberate:

- **The login is decorative.** Any email and password opens the app; the session is
  a `localStorage` flag. It gates nothing.
- **Save does nothing.** The edit screen keeps a local draft and shows a confirmation,
  so the form behaves realistically, but the snapshot is never modified.
- The snapshot contains test-tenant data (bots named "Toto", "sqdsq"…). Edit that one
  JSON file to change what the demo shows.

## What each app does

- `/login` — fake sign-in.
- Left sidebar, collapsible **offcanvas** (button or Ctrl/Cmd+B) and **resizable**
  by dragging its right edge (200–480px, arrow keys, double-click to reset). The
  choice persists in `localStorage`.
- A sticky breadcrumb above every screen, derived from the URL and the loaded record.
- `/chatbots` — the five contexts with a derived description and their timestamps.
- `/chatbots/[id]` — edit screen: five personality sliders (1–5), model selects,
  a max-tokens slider, a debug switch, and a read-only metadata sidebar.
- A theme picker at the bottom of the sidebar, plus a light/dark toggle.
- **Take the tour** on the chat bots screen — a guided walkthrough with backdrop
  and spotlight, from Ark UI's `Tour`.

## Notes worth keeping

**Skeleton and Ark share an engine.** Both are built on Zag.js (`skeleton-mock` and
`ark-mock` each install ~50–77 `@zag-js` packages); bits-ui is an independent
implementation. Adding Ark to the Skeleton app deduped to a single set of Zag
packages rather than stacking two engines.

**Ark's Tour needs two undocumented CSS fixes.** Zag only injects positioning styles
for `tooltip` steps, so a `dialog` step must be centred by the app; and the
positioner's inline `z-index: var(--z-index)` resolves to an invalid `calc()` unless
the app defines `--tour-z-index`. Both are handled in each `app.css`.

**No Skeleton theme is black and white.** Measured across all 24: `hamlindigo` has
the least colourful primary ramp (mean chroma 0.052) against shadcn's default
`neutral`, which is chroma 0 throughout.

## Versions

SvelteKit 2.70 · Svelte 5.57 · Vite 8.3 · Tailwind 4.3 ·
Skeleton 5.0.1 · bits-ui 2.19.2 · Ark UI 5.24.2
