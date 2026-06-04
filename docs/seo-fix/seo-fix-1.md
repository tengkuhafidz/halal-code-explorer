# SEO Fix Task — ecodehalalcheck.com

You are working in the codebase for **ecodehalalcheck.com**, a site that tells users whether food additives (E-numbers / E-codes) are halal or haram. Each additive has a page at `/ecode/{number}` (e.g. `/ecode/621`), plus a homepage and an `/all-ecodes` hub.

I analyzed one month of Google Search Console data (May 2026: ~171k impressions, 4,118 clicks, 2.40% overall CTR). The diagnosis and required fixes are below. Work through them in priority order. Before editing, explore the codebase to learn the framework, the page/template structure, where titles/meta tags are set, and where the E-number data lives.

## The core problem
The `/ecode/*` pages are already ranking on page 1 of Google (average position ~7) but earn almost no clicks: combined they got **118,853 impressions and only 568 clicks — a 0.48% CTR**. This is a click-through and ranking-polish problem, not a "we don't rank" problem. The homepage is fine (6.27% CTR); the ingredient pages are where the lost traffic is.

Evidence of the pattern (query → impressions / clicks / avg position):
- `fd c red 40 halal` → 5,418 / 0 / 7.3  (this is E129)
- `e621 halal or haram` → 2,473 / 4 / 7.5
- `e330 halal` → 1,076 / 2 / 7.0
- `guar gum halal` → 944 / 1 / 7.8  (this is E412)
- `carrageenan halal` → 586 / 0 / 10.7  (this is E407)
- `carnauba wax halal` → 636 / 0 / 8.2  (this is E903)

Highest-impression ecode pages to prioritize: 621, 129, 412, 476, 407, 330, 422, 500, 202, 211, 551, 150, 410.

---

## Fix 1 — Rewrite ecode page titles, H1s, and meta descriptions (HIGHEST PRIORITY)
Root cause: titles use the E-number only, but people search by **common ingredient name** ("guar gum halal", "fd c red 40 halal") and with **intent phrasing** ("halal or haram"). The snippet doesn't match the query, so users skip it.

This should be a **template change** so it applies to all ~270 ecode pages at once. Pull the common name (and any aliases like "FD&C Red 40", "Allura Red", "MSG") from the existing additive data in the codebase. If common names / aliases aren't already in the data model, add a field for them and populate it for at least the priority pages above.

Target formats:
- **Title tag:** `Is E{num} ({Common Name}) Halal or Haram? | EcodeHalalCheck`
  - e.g. `Is E129 (Allura Red / FD&C Red 40) Halal or Haram? | EcodeHalalCheck`
- **H1:** `Is E{num} ({Common Name}) Halal?`
- **Meta description:** one sentence with the verdict + source, e.g. `E129 (Allura Red / FD&C Red 40) is a synthetic color. Find out if it's halal, haram, or doubtful, its source, and the ruling — verified on EcodeHalalCheck.`

Keep titles under ~60 characters where possible; truncate the alias list if needed but always keep the primary common name and "Halal".

## Fix 2 — Add depth to ecode page content
Position ~7 earns few clicks even with a perfect snippet. To push priority pages toward the top 3, ensure each ecode page renders substantive, unique content (not a thin template): what the additive is, its source (animal / plant / synthetic / microbial), the halal verdict and the reasoning, and any differences between rulings/madhahib or certification bodies. Make sure the verdict appears above the fold. If content fields already exist in the data, surface them fully; if pages are thin, flag which ones need data added.

## Fix 3 — Add structured data (schema.org)
The site currently shows no rich results in Search (only "Translated results"). Add JSON-LD to ecode pages:
- **FAQPage** or **QAPage** schema with the question "Is E{num} ({Common Name}) halal?" and the verdict as the answer. These queries trigger People-Also-Ask boxes, and schema helps win them and lifts CTR.
- Validate the output against Google's Rich Results structure (correct types, required fields).

## Fix 4 — Strengthen the `/all-ecodes` hub and internal linking
`/all-ecodes` ranks at position 14 (page 2). Improve it and use it to pass authority to every ecode page: ensure it links to all ecode pages with descriptive anchor text (E-number + common name), and link to it prominently from the homepage. Add contextual internal links between related additives where sensible.

## Fix 5 — Investigate desktop underperformance
Desktop CTR is 0.77% vs mobile 2.94% at similar rankings. Check whether the desktop layout buries the verdict below the fold, renders differently, or has a slower/heavier above-the-fold experience. The title fix above helps, but verify the desktop page presents the halal verdict immediately.

## Fix 6 — Reinforce homepage head terms
`halal check` (3,273 impr) and `halal checker` (2,172 impr) sit at position ~6.5 — these are the brand-defining terms. Make sure the homepage title, H1, and intro copy target these exact phrases naturally so they can climb into the top 3.

---

## Working instructions
- Start by exploring the repo and summarizing the stack, template structure, and where titles/meta/schema and additive data live — before making changes.
- Prefer template-level changes (one fix → all pages) over per-page edits. Fix 1 and Fix 3 should be template/component changes.
- Make changes incrementally and explain each. Don't invent halal/haram verdicts or ingredient facts — only use data already in the codebase; if data is missing, list exactly what needs to be supplied.
- After changes, verify titles/meta/schema render correctly for a sample of pages (e.g. 129, 412, 407, 621) and that the JSON-LD validates.