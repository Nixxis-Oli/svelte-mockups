# Svelte UI mockups — shadcn-svelte vs Ark UI

Two throwaway SvelteKit apps built to compare the shortlisted component approaches
for an admin-app rewrite. Same features, same data, same non-UI code — only the
component layer differs.

| | Library | Styling model | Tour |
|---|---|---|---|
| `shadcn-mock` | bits-ui + shadcn conventions | tokens authored in `app.css` | via Ark |
| `ark-mock` | Ark UI | tokens authored in `app.css` | native |

A third mockup on Skeleton was built and then dropped once the shortlist narrowed.

## Why the two look identical

They are meant to. The comparison is only meaningful if the design is held constant,
so both apps share the same token file, the same layout markup and the same
Button / Card / Badge / Input / Label — Ark and bits-ui both supply behaviour, not
looks, so those primitives are pure styling either way.

Measured across the two `src` trees: **32 of 40 files are byte-identical**, and the
two `app.css` files differ by **zero CSS rules** (only their comments differ). The
real divergence is four behavioural components — avatar, slider, switch, select —
plus the pages that consume them.

Both now render a real listbox for the **model dropdown** on a chat bot's edit
screen — bits-ui's `Select` on one side, Ark's on the other — so even that no longer
looks different. The comparison is therefore not about appearance at all; it is
about catalogue breadth, longevity and how much component code you carry.

What the two listboxes cost, as a measure of that: Ark ships the whole anatomy in
one namespace, while the bits-ui version needs trigger, portal, content, viewport,
two scroll buttons and items wired by hand.

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
BASE_PATH=/your-repo-name/shadcn npm run build
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
  choice persists in `localStorage`. Its header links back to the index page.
- A sticky breadcrumb above every screen, derived from the URL and the loaded record.
- `/chatbots` — the five contexts with a derived description and their timestamps.
- `/chatbots/[id]` — edit screen: five personality sliders (1–5), model selects,
  a max-tokens slider, a debug switch, and a read-only metadata sidebar.
- A palette picker at the bottom of the sidebar, plus a light/dark toggle. The
  default palette is shadcn's own `neutral` — chroma 0 throughout.
- **Take the tour** on the chat bots screen — a guided walkthrough with backdrop
  and spotlight, from Ark UI's `Tour`. `shadcn-mock` installs Ark solely for this.

## Notes worth keeping

**Ark and Skeleton share an engine.** Both are built on Zag.js; bits-ui is an
independent implementation. Adding Ark to a Zag-based app dedupes to a single set of
`@zag-js` packages rather than stacking two engines.

**Ark's Tour needs two undocumented CSS fixes.** Zag only injects positioning styles
for `tooltip` steps, so a `dialog` step must be centred by the app; and the
positioner's inline `z-index: var(--z-index)` resolves to an invalid `calc()` unless
the app defines `--tour-z-index`. Both are handled in each `app.css`.

**Licensing.** Everything here is MIT, except Lucide icons (ISC, with the
Feather-derived icons under MIT). All permissive, all fine for commercial use, with
the usual attribution clause.

## Versions

SvelteKit 2.70 · Svelte 5.57 · Vite 8.3 · Tailwind 4.3 ·
bits-ui 2.19.2 · Ark UI 5.24.2
