# redesign.md — WriteLite Website Redesign

Working file for the website redesign. Details are planned here; settled
decisions get lifted into CLAUDE.md's Project Specifics. This file is cleared
out as the work is implemented — retire it when the redesign ships.

We work item by item.

---

## Item 1 — About section / landing-page layout

**Goal:** The landing-page lower stack skims easily and uses its space well.

**Open note — home-lower empty space:** Empty space sits under the bullets and
next to the screenshot in the home-lower band. It could be filled — a logo, or
another element. Low priority; may be left until there's real user feedback.

---

## Item 2 — Donation page funding trackers

**Goal:** Two graphics on the donation page that show progress toward concrete
funding goals.

**Settled design:**
- Two thick horizontal progress bars, stacked, sitting inside the existing support content
- Monthly development tracker — goal $4,000, framed as "this month" (resets each month)
- macOS release tracker — one-time goal $2,000
- Dependency — the monthly bar gates the macOS bar
- macOS stays dimmed and locked ("Unlocks once this month is funded") until monthly hits $4,000, then activates and fills
- Each bar shows label, raised-of-goal figure, and percentage fill
- Fill — solid amber accent (#d4a030) on a dark track

**Updates — manual:**
- Each tracker's raised and goal values live in one clearly-commented config block at the top of the donation section
- Editing a number is the only step to update progress
- No Stripe integration — trackers are temporary and easy to update by hand

---

## Item 3 — Documentation page

**Goal:** A "how to use it" page that makes users comfortable — the basics, plus
the file/data story that builds trust. No useless detail, no overload, nothing
important left out.

**Section 1 — The basics**
*Layer note: include screenshots from the app, edited to highlight what the section is teaching the user.*
- The toolbar / UI buttons — what each control does
- Where the basic controls live
- How to reach settings

**Section 2 — Your files & how WriteLite works**
*Layer note: each topic layered — plain-language first, "under the hood" beneath — except backup, which stays a how-to.*
- The registry — what it is, what it tracks
- How project folders work
- Backup — high-level how-to: projects are real folders, copy them to cloud or USB like anything else
- Hidden files — what they are, what they do, and a warning against tampering
- Inside a `.wlite` file:
  - the `<!-- .wlite:meta -->` comment block
  - the inline `<span>` font elements
  - renaming to `.md` — opens anywhere, but carries the spans and comment along

**Open note — export to markdown (deferred):** Write this once the export
feature ships. Export strips the `<span>` elements and the `.wlite:meta` comment
block for a clean, WriteLite-independent file — unlike renaming to `.md`, which
keeps them.

---

## Decision log

*Each settled decision lands here as a one-liner, ready to lift into CLAUDE.md's
Project Specifics.*

- Donation page targets: $4,000/month development funding; $2,000 one-time macOS release fund
- $4,000 validated against comparable donation-funded apps (sits on the median; Krita ~€4k/mo is the closest analog)
- Funding trackers update manually — raised/goal values in one commented config block per tracker; no Stripe integration (trackers are temporary)
- Trackers are two stacked thick horizontal bars; the monthly bar gates the macOS bar (macOS locked/dimmed until the month is funded)
- Tracker fill is solid amber accent on a dark track; each bar shows label, raised-of-goal, and percentage
- Docs page: two sections — "the basics" (toolbar/controls/settings, with annotated screenshots) and "your files & how WriteLite works" (technical topics layered plain-language + under-the-hood)
