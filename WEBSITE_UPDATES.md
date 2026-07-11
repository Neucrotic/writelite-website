# WEBSITE_UPDATES.md — Posting Updates to writelite.net
*Reference file — living document, updated in place. Read by Nelson or any agent posting a release, patch note, or roadmap change to the website.*
*The site's structure and design are owned by the site files themselves; this file owns only the posting procedure.*

---

## The site in one paragraph

writelite.net is a static GitHub Pages site — plain HTML, one shared `styles.css`, no build step. Nelson deploys by pushing to the repo. The current app version and per-platform release URLs live in one shared config file (`site-config.js`); every download button on every page reads from it. The synopsis page owns patch notes and the roadmap; the home page carries only a trimmed roadmap teaser that links there.

---

## When a new version ships

Do these in order. Steps 1–3 are the release itself; 4 is conditional.

**1. Update the site config**
Edit `site-config.js` only:
- Version string
- Windows release URL
- macOS release URL
No other file contains these values. If a version number or release URL is found hardcoded anywhere else, that is a bug — fix it by pointing the page at the config, and flag it to Nelson.

**2. Add a patch-note block to the synopsis page**
Copy the template below into `synopsis.html`'s patch-notes section, **newest at the top**. Never edit or delete previous blocks — patch notes are append-only history (the one exception to the site's rewrite-in-place habit, because they are a public record).

```html
<!-- ── vX.Y.Z — DD Month YYYY ── -->
<div class="patch-block">
  <div class="patch-head">
    <span class="patch-version">vX.Y.Z</span>
    <span class="patch-date">DD Month YYYY</span>
  </div>
  <ul class="patch-list">
    <li>Change one</li>
    <li>Change two</li>
  </ul>
</div>
```

Writing the notes:
- Short, declarative, user-facing — what changed for the writer, not the commit log
- Sentence case, British-leaning spelling, no exclamation marks, no emoji
- Bug fixes can be grouped ("Fixed three sidebar bugs…") when the detail wouldn't matter to a user
- Source material: Nelson supplies the change list (BUG_LOG.md entries are his reference, not the agent's to fetch)

**3. Check the roadmap**
If the release completes a roadmap item:
- Move or remove that item on the **synopsis page** (the roadmap's single authority)
- Update the **home teaser** so it shows the next one or two upcoming items — the teaser must never lag behind the synopsis page or show something already shipped

**4. If copy mentions the version anywhere in prose** — rare — search the site for the old version string and update it. The config file should make this a no-op.

---

## When only the roadmap changes (no release)

- Edit the roadmap on the synopsis page
- Re-check the home teaser against it (same rule as step 3 above)
- No patch note — patch notes are for shipped versions only

---

## What this procedure never touches

- `latest.json` and the app's auto-updater — that is the **app release pipeline**, not the website. The website only ever points at GitHub release URLs.
- The funding tracker figures on /support — Nelson updates those by hand on his own cadence; they are not part of a release.
- Stripe Payment Links and their redirect settings — Stripe dashboard, Nelson only.
- The Cloudflare Worker download counter — separate thread, separate work.
- Previous patch-note blocks — append-only, see step 2.

---

## Standing rules for any agent editing the site

- Plan first, show Nelson, then edit. Nelson pushes and deploys himself.
- All colours via the `:root` tokens in `styles.css` — never raw hex in markup.
- New strings follow the site voice: direct, low-key, sentence case, em dashes, no hype.
- Do not restructure pages, rename files, or add pages under this procedure — that is redesign work and needs its own brief.
