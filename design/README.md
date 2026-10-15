# City Discovery — Design Handoff (Variation A)

Design exported from a Claude chat design canvas ("City Discovery — Homepage Variations").
Use this folder as the **spec** for implementation in Claude Code.

## How to read these files

Each screen is in `project/<Screen>.dc.html`. They use a lightweight design-canvas format, not production code:

- `<x-dc>` … `</x-dc>` wraps the page markup. All styling is **inline styles**.
- `<helmet>` holds the font link and global CSS.
- `{{value}}` are template bindings filled by the `Component` class in the `<script type="text/x-dc">` block at the bottom of each file. That class also holds the **sample data** and the interaction logic (tabs, remove/undo, etc.).
- `<sc-if value="…">` = conditional render, `<sc-for list="…" as="x">` = loop.
- `support.js` is the canvas runtime and is **not included**; the files won't render standalone. Treat them as the source of truth for layout, copy, data shape and behavior, and rebuild them as real components.
- "Photo · …" chips are image placeholders (the text describes the intended photo). `[Brand]` is a placeholder for the name.

## Screens (`project/canvas.json` has the board order)

| File | Screen |
|---|---|
| `Main.dc.html` | Homepage — Variation A, Minimal Editorial |
| `Explore.dc.html` | Explore |
| `EventDetail.dc.html` | Event detail |
| `Saved.dc.html` | Saved events (Upcoming / Past / Places tabs) |
| `ListEvent.dc.html` | List your event (organizers) |
| `Search.dc.html` | Search — type-ahead + results |
| `DatePicker.dc.html` | Custom dates picker |
| `Collection.dc.html` | Collection page template |

## Design tokens

| Token | Value | Use |
|---|---|---|
| bg | `#F7F5EF` | Page background |
| surface | `#FFFFFF` | Cards, inputs |
| text | `#202820` | Body text |
| text-muted | `#62685F` | Secondary text |
| border | `#E5E3DA` | Card/divider borders |
| primary | `#36563B` | Olive — links, buttons, accents |
| primary-deep | `#263D2A` | Hover, dark bands |
| accent | `#C95335` | Terracotta — focus ring, highlights |
| primary-soft | `#E8EDE5` | Soft green fills, banners |
| accent-soft | `#F8E9E2` | Soft terracotta fills |

- Font: **Manrope** (300–800, Google Fonts). Headings mix weight 300 with a weight-700 olive emphasis span.
- Radius: 12px buttons/inputs, 14–16px cards, 999px pills.
- Min touch target 44–48px. Focus: `2px solid #C95335`, offset 2px.
- Content width 1200px, side padding `clamp(16px, 4vw, 40px)`.

## Behavior specs (from the canvas notes)

**Search**
- Focus on empty field → recent searches, popular this week, date shortcuts, categories.
- 2+ characters → grouped suggestions: Events (matched text in bold), Categories, Areas & venues, then "See all results".
- Enter / Search → results page with date tabs, category facets (with counts) and cards.
- No match → "No results" with spelling-tolerant tips and popular searches.
- Up/Down arrows move through suggestions; Esc closes the panel.

**Custom dates**
- Opens from "Custom Dates" as a popover on desktop, full-screen sheet on phones.
- Two months side by side; past days disabled.
- First click = start, second = end; clicking before the start restarts the range.
- Dots mark days that have events.
- Presets: Next 7 days, Next 2 weekends, Rest of this month, Next month.
- Time-of-day filter + live summary; Apply updates results, Clear resets.

**Collection template** (one page, many entry points)
- Plan your weekend, All exhibitions, All markets, All family picks, All business events, View all trending, Hidden gems — all open this page with a different collection.
- Same parts every time: header band, collection switcher, date tabs, sub-filters, featured pick, grouped card sections, related collections.
- Only the data changes: title, intro, sub-filter chips, how groups are split (by day, by status, by type).

## Notes

- All listings are sample content, not verified events. Keep the sample-data banner until real data is wired in.
- City selector defaults to Hyderabad.
