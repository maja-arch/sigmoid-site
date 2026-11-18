# Sigmoid · Design 2 · design system

Reference for turning the homepage (`index.html` + `d2.css` + `d2.js`) into Figma files and a UI kit. Every value below exists as a CSS variable or class, so each Figma style and component maps 1:1 to code.

## Foundations

### Colour

| Token | Value | Use |
|---|---|---|
| `--bg` / Platinum | `#F1F2F2` | page, card fill |
| `--ink` / Graphite | `#373636` | text, primary button, icons |
| `--ink-2` | `rgba(55,54,54,.78)` | secondary text (AA on platinum) |
| `--green` / Sigmoid Green | `#98BF5A` | highlight, hover of primary, nav Contact |
| `--lime` / Lime cream | `#DBE580` | "How disciplines combine" card, project visual |
| `--bone` / Bone | `#D9D6C9` | ticker, footer band, project visual, selection |
| `--midnight` | `#26233C` | project visual |
| `--gridline` | `rgba(55,54,54,.07)` | 8 vertical page hairlines |
| `--line-l` | `rgba(55,54,54,.2)` | dividers |

### Type

| Style | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Hero title | Oswald | clamp(46px, 8vw, 148px) | 400 | uppercase, line-height .88 |
| Block heading | Oswald | clamp(46px, 7.4vw, 136px) | 300 | uppercase; long version clamp(38px, 5.2vw, 92px) |
| Giant abbreviation | Oswald | clamp(104px, 14.5vw, 260px) | 500 | RHG, SW, LT… (15+, 04 use 300) |
| Card title | Oswald | clamp(20px, 1.9vw, 32px) | 400 | uppercase |
| Counter number | Oswald | clamp(76px, 6.8vw, 128px) | 300 | tabular numerals |
| Big text | Roboto | clamp(21px, 2.1vw, 34px) | 300 | |
| Body | Roboto | 16–18px | 300 | |
| Label / tab | Roboto | 11px | 500 | uppercase, +0.08em |
| Button | Roboto | 12px (11px small) | 500 | uppercase, +0.07em |

### Shape and spacing

- Facet (cut corner): `clip-path: var(--facet)` with `--c` = cut size. Cards 14px, side cards 12px, counters 14px, buttons 9px (small 7px), chips 5px.
- Decagon: `var(--decagon)`. Used for icon buttons, slider arrows and the industry link icon.
- 1px outline that follows the cut: the element background is the line colour and an `:after`/`:before` layer `inset: 1px` holds the fill.
- Gap `--gap: 8px`, page padding `--pad: clamp(8px, .9vw, 14px)`, header height `--hd: 60px` (56px on mobile).

### Motion

- Hover: colour fade `.45s cubic-bezier(.4,0,.2,1)` (`--t-hover`, `--soft`). Arrows do not move.
- Reveal: rise 40px and fade in, staggered 70ms.
- Icons: Figma "Visual Language - dinamic" loops (`.ti-sw` 4.2s, `.ti-em` 2.2s, `.ti-rb` 4.2s, `.ti-mx` 2.68s).
- Logo: Figma "Proposal 01 - logo animation", facets shade in from the bottom, 3s loop (`.side-logo`).
- Decode text: `[data-scramble]` mixes 0/1 and letters, then settles, repeats.
- All motion is switched off with `prefers-reduced-motion`.

## Components

| Component | Class | Variants / states |
|---|---|---|
| Button | `.pill` | primary `.pill-green` (graphite → green), secondary `.pill` / `.pill-ghost` (outline → graphite fill), small `.pill-sm`, nav Contact `.hd-cta` (green → graphite) |
| Icon button | `.hero-arrow` | default graphite, hover green, disabled |
| Header | `.hd` | desktop nav links with green triangle, mobile `Menu` + overlay `.menu` |
| Hero slider | `.hero` | title, lede, 2 buttons, `.hero-tab` ×5 (icon, number, label, progress line), arrows |
| Ticker | `.ticker` | text + animated icons, endless |
| Card | `.card` | outline facet; lime `.card-lime` |
| Discipline card | `.card.xp` | number tab, abbreviation, animated icon, title, text, button |
| Way card | `.card.way` | abbreviation, title, "Your situation" / "What Sigmoid takes on", two buttons |
| Module | `.module` | big card `.mod-main` + side column `.mod-side` (side card, pill list) on the right |
| Side card | `.side-card` | label, state, bar, animated logo or icon, tags |
| Counter | `.counter` | icon, label, big number; industry link variant `.ind-card` |
| Project visual | `.visual` | `.v-lime`, `.v-dark`, `.v-bone`, `.v-green` |
| Steps list | `.num-list` | number, title, text |
| Quote | `.quote` | label, glitch heading, sub text |
| Footer | `.ft` | numbered list, logo card, two decagon links, link columns, bar |
| Cookie banner | `.cookie` | summary, customize with switches, 3 buttons |

## Breakpoints

- Desktop ≥ 1521px: counters and industry cards in a row.
- MacBook 1181–1520px (1280, 1440, 1512): counters and industry cards stacked inside the module, everything else as desktop.
- Tablet 801–1180px: nav collapses to `Menu`, expertise and industries in 2 columns.
- Mobile ≤ 800px: one column, side column moves under the big card, slider arrows under the tabs.
