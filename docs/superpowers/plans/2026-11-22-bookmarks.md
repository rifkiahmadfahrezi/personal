# Bookmarks Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A public `/bookmarks` page whose content is edited through Pages CMS.

**Architecture:** A static page imports `src/data/bookmarks.json`. One client component filters it. Pages CMS edits the JSON through commits to `master`.

**Tech Stack:** Next 16, React 19, Tailwind 4, Bun (test runner only), Pages CMS

**Spec:** `docs/superpowers/specs/2026-11-22-bookmarks-design.md`

## Global Constraints

- No new dependency.
- `title`, `url`, `purpose` required; `tags` optional and possibly missing.
- URLs must match `^https?://.+`; a violation fails the build.
- English copy. Visual style follows `/project`.
- External links: `target="_blank" rel="noopener noreferrer"`.
- Commit or push only after the owner says so.

## Review Focus

- An entry without `tags` is listed, with no crash. (Task 1 test)
- Search with capitals or surrounding spaces still matches. (Task 1 test)
- A hand-edited `javascript:` URL fails the build. (Task 1 test)
- Two bookmarks share one URL: no React key collision. (Task 2 uses the index in the key)
- First visit to `/bookmarks` in a fresh tab can scroll. (Task 3 check)

---

### Task 1: Data, CMS config and filter logic

**Files:**
- Modify: `.pages.yml` (exists on `origin/master`, empty)
- Create: `src/data/bookmarks.json`, `src/lib/bookmarks.ts`
- Test: `src/lib/bookmarks.test.ts`

**Interfaces:**
- Produces:
  - `type Bookmark = { title: string; url: string; purpose: string; tags?: string[] }`
  - `parseBookmarks(items: Bookmark[]): Bookmark[]` returns items, throws on a bad URL
  - `filterBookmarks(items: Bookmark[], query: string, tag: string | null): Bookmark[]`

- [ ] **Step 1:** `git pull --ff-only`, then branch: `git switch -c feat/bookmarks`.
- [ ] **Step 2:** Fill `.pages.yml` with the exact YAML from the spec's CMS section. Create `src/data/bookmarks.json` containing `[]`.
- [ ] **Step 3:** Write the failing test:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import { filterBookmarks, parseBookmarks, type Bookmark } from "./bookmarks";

const items: Bookmark[] = [
   { title: "Coolors", url: "https://coolors.co", purpose: "Find color palettes", tags: ["design"] },
   { title: "Regex101", url: "https://regex101.com", purpose: "Test regex" },
];
const titles = (query: string, tag: string | null = null) =>
   filterBookmarks(items, query, tag).map((b) => b.title);

test("filters", () => {
   assert.deepEqual(titles(""), ["Coolors", "Regex101"]);
   assert.deepEqual(titles("  PALETTES "), ["Coolors"]);
   assert.deepEqual(titles("regex101.com"), ["Regex101"]);
   assert.deepEqual(titles("design"), ["Coolors"]);
   assert.deepEqual(titles("", "design"), ["Coolors"]);
   assert.deepEqual(titles("regex", "design"), []);
});

test("rejects non-http(s) URLs", () => {
   assert.deepEqual(parseBookmarks(items), items);
   assert.throws(() => parseBookmarks([{ ...items[0], url: "javascript:alert(1)" }]));
});
```

- [ ] **Step 4:** Run `bun test src/lib/bookmarks.test.ts`. Expected: FAIL, module not found.
- [ ] **Step 5:** Implement `src/lib/bookmarks.ts`. Match is a case-insensitive substring over title, purpose, URL and tags, with the query trimmed. The error message names the bookmark title.
- [ ] **Step 6:** Run the test again. Expected: PASS.

### Task 2: Page and list

**Files:**
- Create: `src/app/(main)/bookmarks/page.tsx`, `src/components/page/bookmarks/bookmark-list.tsx`

**Interfaces:**
- Consumes: everything Task 1 produces
- Produces: `BookmarkList({ items }: { items: Bookmark[] })`, a client component

- [ ] **Step 1:** Create the page, copying `/project`'s header structure. Title "All *bookmarks*", text "Sites I keep for a reason.", metadata title "Bookmarks", description "Websites Rifki Ahmad Fahrezi keeps, each for a specific purpose.". Call `parseBookmarks(data as Bookmark[])` at module level.
- [ ] **Step 2:** Create `BookmarkList`: labelled `<input type="search">`; sorted unique tags as `<button type="button" aria-pressed>`, one active, clicking it again clears it; rows with `purpose` as the heading, title and tags below, and hostname with `ArrowUpRight`. Keys are `${url}-${index}`. Empty text inside an `aria-live="polite"` element: "No bookmarks yet." when `items` is empty, otherwise "No matches.". Hide search and tags when `items` is empty.
- [ ] **Step 3:** Run `bunx tsc --noEmit && bunx eslint src`. Expected: no new errors.

### Task 3: Site integration

**Files:**
- Modify: `src/components/fx/preloader-script.ts`, `src/components/fx/page-transition.tsx:9`, `src/app/sitemap.ts`, `src/components/footer.tsx`

- [ ] **Step 1:** In `preloaderScript`, after the theme `try` and before the `sessionStorage` check, add:

```js
if(/^\/bookmarks\/?$/.test(location.pathname)){r.classList.add("loaded");window.__rfDone=1;return}
```

The string is a template literal, so write the backslashes doubled in the source. Extend the file's comment to say why `/bookmarks` is skipped.

- [ ] **Step 2:** Add `"/bookmarks": "Bookmarks"` to `LABELS`; add `${siteConfig.url}/bookmarks` to the sitemap with `changeFrequency: "weekly"`, `priority: 0.6`; add a `/bookmarks` link under the footer's local time, using `next/link` and the existing `roll` markup.
- [ ] **Step 3:** Run `bun run build`. Expected: success, `/bookmarks` listed as static.
- [ ] **Step 4:** Put two temporary entries in the JSON and run the app. Check: fresh tab on `/bookmarks` shows no preloader, the heading appears, and the page scrolls; fresh tab on `/` still shows the preloader; `/` to `/bookmarks` shows the curtain label; search, tags and the 375px layout work. Restore `[]`.
- [ ] **Step 5:** Put a `javascript:` URL in the JSON and run the build. Expected: failure naming the bookmark. Restore `[]`.

### Task 4: Ship (owner's approval required)

- [ ] **Step 1:** Commit, merge to `master`, push.
- [ ] **Step 2:** Owner: select `master` in Pages CMS; add, edit and delete a bookmark, confirming each deploys; sign in with an unrelated GitHub account and confirm saving fails.
