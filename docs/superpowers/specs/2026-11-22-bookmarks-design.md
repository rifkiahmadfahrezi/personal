# Bookmarks page: design

Status: waiting for approval.

## Intent

A page at `/bookmarks` on rifkiaf.my.id listing websites saved for a specific
purpose. Mainly for personal use, but public. Content lives in git and is edited
through a form UI.

## Goals

- Add, edit and delete bookmarks from a form, on desktop or phone.
- Find a saved site quickly by purpose or tag.
- Only the owner's GitHub accounts edit content.

## Non-goals

Database, login inside this site, browser extension, automatic metadata or
screenshot fetching, public submission form, per-bookmark pages.

## Anti-goals

- The preloader must not delay this page, since it is opened often in new tabs.
- No private, internal or token-bearing links. The repository and its git history
  are public.

## Approaches

| Approach | Trade-off |
|---|---|
| A. JSON edited on GitHub | No third party. Raw JSON, no form. |
| **B. JSON + Pages CMS (picked by owner)** | Full form UI, no dependency in the app. A third-party GitHub App gets write access to the repository. |
| C. Keystatic inside the app | Own admin UI. Needs a dependency, a GitHub App and Worker secrets. |
| D. Issue Form + GitHub Actions | No third party. The form only adds entries. |

A subdomain was also considered. It only pays off if others should fork the app
without the portfolio.

B was picked for its UI. A remains the fallback, because the data file is the same.

## Data

`src/data/bookmarks.json` is a top-level array and starts as `[]`:

```json
{
  "title": "Coolors",
  "url": "https://coolors.co",
  "purpose": "Find color palettes",
  "tags": ["design", "color"]
}
```

`title`, `url` and `purpose` are required. `tags` is optional, and the page must
accept it being missing.

## CMS

`.pages.yml` at the repository root:

```yaml
settings:
  hide: true
content:
  - name: bookmarks
    label: Bookmarks
    type: file
    path: src/data/bookmarks.json
    format: json
    list: true
    fields:
      - name: title
        label: Title
        type: string
        required: true
      - name: url
        label: URL
        type: string
        required: true
        pattern:
          regex: "^https?://.+"
          message: "Must start with http:// or https://"
      - name: purpose
        label: Purpose
        type: string
        required: true
      - name: tags
        label: Tags
        type: string
        list: true
```

This narrows the form to the bookmarks file. It does not narrow the GitHub App's
own permissions.

## Page

`src/app/(main)/bookmarks/page.tsx` is static and imports the JSON. It throws on a
non-http(s) URL, so a bad hand edit fails the build and the previous version stays
live. One client component holds search and tag filtering.

```
All bookmarks                       Sites I keep for a reason.

[ Search...                 ]   (design) (color) (tools)

Find color palettes                      coolors.co  ↗
Coolors                                  design, color
------------------------------------------------------
```

- Native `<input type="search">`, matching title, purpose, URL and tags.
- Tag buttons with `aria-pressed`, one active at a time.
- Links open in a new tab with `rel="noopener noreferrer"`.
- One empty state for no bookmarks and no matches.
- Visual style follows `/project`.

## Other changes

- `preloader-script.ts`: on `/bookmarks`, add the `loaded` class, set `__rfDone`
  and return before `rf-loading` is added. A separate layout without `Preloader`
  would not be enough: the root script locks scrolling, and only `Preloader`
  unlocks it.
- `page-transition.tsx`: add `"/bookmarks": "Bookmarks"` to `LABELS`.
- `sitemap.ts`: add `/bookmarks`.
- `footer.tsx`: link to `/bookmarks`. The navbar is already tight on mobile.

## Access

- Repository write access: `rifkiahmadfahrezi` and `rifkigobimbel`, both the owner's.
- Install the app with "Only select repositories", `personal` only.
- Invite no collaborators in Pages CMS.
- Enable 2FA on both GitHub accounts.

## Prerequisites and checks

1. A push to `master` must deploy automatically. The repository only shows a manual
   `deploy` script, so confirm Workers Builds is connected in Cloudflare.
2. Review the permissions on the install screen. If too broad, do not install;
   fall back to A or D.
3. Select `master` in Pages CMS.
4. Sign in with an unrelated GitHub account and confirm it cannot save. The docs read
   do not state the write-access requirement explicitly.
5. Run `next build`. In a fresh tab, confirm `/bookmarks` shows no preloader and
   scrolls, and `/` still shows the preloader.
6. Add, edit and delete a bookmark in Pages CMS. Confirm each commit deploys.

## Builder's calls

Footer placement, single active tag, filter state not kept in the URL, empty initial
list, English copy.
