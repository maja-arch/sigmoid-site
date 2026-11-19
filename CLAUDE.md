# Sigmoid website — instructions for Claude

Static HTML/CSS/JS site for the client **Sigmoid** (engineering company, Novi Sad). No build step.
The user (designer) writes in **Serbian**: always reply in Serbian, short and clear, no jargon.

## Where we work

- Git repo: https://github.com/maja-arch/sigmoid-site
- **Branch `dizajn-2`** = current design (homepage). Always work here.
- Branch `main` + tag `dizajn-1` = the old Design 1. Do not change it.
- Live site: https://sigmoid-dizajn-2.vercel.app (Vercel project `sigmoid-dizajn-2`)
- The design history and every decision (including what the user **rejected**) is in
  [docs/dizajn-2-odluke.md](docs/dizajn-2-odluke.md). Read it before changing the look of a section.

## Files that matter

| File | What |
|---|---|
| `index.html` | the homepage (Design 2) |
| `d2.css` | all homepage styles. Changes are **appended at the end** in blocks titled `ROUND nn`; later rules override earlier ones (many use `!important`). |
| `d2.js` | homepage interactions: hero slider (`SLIDES`), success-stories box, ticker, industries tabs, digital "scramble" words, robot eyes, clock, back to top |
| `cookies.css`, `cookies.js` | cookie banner (Accept + Reject link only) |
| `images/` | photos (`images/solve`, `images/insights`, …) |
| other `*.html` + `styles.css`/`script.js` | inner pages, still the older design |

`DESIGN-SYSTEM.md` is **outdated** in places (it still says uppercase titles and faceted buttons). The rules below win.

## After every finished change (the user wants this without asking)

1. Bump the cache-busting version on `?v=` in `index.html` (all links to css/js), e.g. on macOS
   `V=$(date +%s); sed -i '' "s/?v=[0-9]*/?v=$V/g" index.html`
   (PowerShell: `(Get-Content index.html) -replace '\?v=\d+', "?v=$([DateTimeOffset]::Now.ToUnixTimeSeconds())" | Set-Content index.html`).
2. Check the page at 390px, 1280px and 1440px wide: nothing may stick out horizontally.
3. Commit on `dizajn-2` with a short message describing the change.
4. `git push` (origin/dizajn-2). **That is the deploy:** Vercel is connected to the GitHub repo and publishes every push to `dizajn-2` to production automatically (about a minute). No Vercel CLI needed. Pushes to other branches only make preview links.
5. After ~1–2 minutes confirm the live page shows the change.
6. Tell the user in Serbian what changed, by section.

## Content source

Copy (hero slide titles, subtitles, buttons, section texts) comes from the prototype https://sigmoid-website-prototype.vercel.app/#home — use its wording exactly; do not shorten or rewrite it unless the user asks.

## Design rules (agreed with the user)

**Colours** — brand palette from the Figma brand guide, saved in `d2.css` under the brand names: `--sigmoid-green #98BF5A` · `--midnight #26233C` · `--lime-cream #DBE580` · `--graphite #373636` · `--bone #D9D6C9` · `--platinum #F1F2F2`. Working aliases used in the CSS: `--green` = Sigmoid Green, `--lime` = Lime cream, `--ink` = Graphite (text), `--bg` = Platinum (page). Extra: `--green-text #4F6E22` for green text on light backgrounds. Use these variables, not new hex values. (The guide's printed HEX for Graphite "014744" and Bone "D6D6C9" are typos; the swatches are #373636 and #D9D6C9.)

**Type:** Oswald for titles, Roboto for text. **All titles Oswald Regular (400)**; only big numbers/abbreviations (01, SW, 15+, 80%) and client quotes are Oswald Light (300).
- **Titles are NOT all caps.** Normal case, as written in the text.
- Section titles are all the same size; card titles are all the same size (`clamp(22px,1.9vw,30px)`); subtitles are all the same size (`clamp(18px,1.4vw,22px)`, weight 300).
- Small labels above titles use curly braces: `{ Expertise }`, `{ 01 / 05 — Sigmoid }` — never `[ ]`.
- Every button text starts with a verb ("Read all insights", "See how we work", "Learn about Sigmoid").

**Buttons:** plain **rectangles with sharp 90° corners** (no cut corners, no pointed ends, no rounding).
Slider/quote arrows stay decagons. Cards and boxes keep the cut corners (`--facet`).

**Links:** text + thin 1px **green underline** that **redraws on hover**, plus a long thin arrow (1px line) for "Read", "Read the article", "See this expertise", examples. One link style everywhere.

**Hovers:** cream (`--bone`), no outlines/borders; never white. Footer links: underline on hover.

**Digital effect:** words marked `<span class="scramble" data-scramble>` flicker through 0/1 and letters ("development", "Data Centers").

**Outlines (cards, buttons, tags):** a real `border:1px solid transparent` with the line colour as the element background and the fill layer (`:before`/`:after`) at `inset:0`; corners cut with `var(--facetx)` (only the corners are clipped). Never go back to "fill layer inset by 1px" — it looks uneven and shimmers on scaled laptop screens (125%). Test at `deviceScaleFactor 1.25`.

**Hero title:** each line is a mask for the entry animation; it has extra room below/above so letters like g, p, y are never cut. Check every slide when changing the title size.

**Favicon:** the assembling ball, animated in `d2.js` (drawn on a canvas from the `.lopta-anim` paths).

**Robot (footer + "Our Experts" badge):** one shared drawing (`#robotArt`, the badge uses `<use href="#robotArt">`). Green, glossy, head with cut corners, dark visor, eyes follow the mouse, on the antenna the logo polyhedron with the same assembling animation as in "Accumulated engineering experience". It must not fall or wobble.

## Content still to replace before launch

Testimonials, people (names/photos), phone number (+381 12 345 67 is an example), stock photos, the footer line "Let's build it." (may change). The Cookies link should go to `cookies.html` when that page exists.
