# Handoff: LiFePO4 Battery Cell Card (Home Assistant)

## Overview
A Home Assistant Lovelace card for monitoring a LiFePO4 battery pack (per-cell voltages, balancing status, SOC, power, charge mode, capacity, temperature, and cycle count). It's designed to work with any BMS integration exposing per-cell voltage entities — built and validated against a real **SerialBattery (EG4 LifePower)** 8S pack — rather than being tied to one specific BMS card (e.g. the existing JK BMS card).

## About the Design Files
The file in this bundle (`Battery Cell Card.dc.html`) is a **design reference built in an internal HTML prototyping tool** — it renders live and is interactive (try clicking a cell bar), but it is **not production code to copy directly**. It uses a proprietary template syntax (`{{ }}` bindings, `<sc-for>`, `<sc-if>`, a `DCLogic` class) that only runs inside that tool.

**Your task is to recreate this design as a real Home Assistant custom Lovelace card** — i.e. a `LitElement`/TypeScript card (`my-battery-cell-card.ts` or similar) following HA's standard custom-card conventions (`setConfig()`, `hass` setter, `getCardSize()`, a config editor), registered via `customCards` the usual way. If this repo doesn't have a custom-card scaffold yet, use the standard HA custom-card boilerplate (LitElement + `card-mod`-friendly CSS custom properties).

## Fidelity
**High-fidelity.** Colors, spacing, typography, and states below are final — implement pixel-for-pixel where possible, adapting only where HA's real component primitives (`ha-card`, `ha-icon`, `more-info-dialog`) naturally replace the mocked equivalents.

## Real entities this binds to (SerialBattery / EG4 LifePower example)
Confirmed from the user's live HA instance, entity domain `sensor.*` unless noted:
- `Cell 1 voltage` … `Cell N voltage` (one per cell — this pack has 8)
- `Minimum voltage cell ID` / `Maximum voltage cell ID` (which cell to badge as ▼ / ▲ — don't just recompute min/max locally if these entities exist, they're authoritative)
- `Cell voltage deviation` (max − min, in V)
- `Charge` (SOC %)
- `Power` (W), `DC bus current` (A), `DC bus voltage` (V, = pack voltage)
- `Charge mode` (string: `Bulk` | `Absorption` | `Float`)
- `Capacity` (Ah remaining) / `Installed capacity` (Ah rated)
- `Temperature` (°F or °C per HA unit system)
- `Total charge cycles`
- `Time since last full charge` (**raw seconds** — must be formatted client-side, see Design Tokens → Formatting)
- Alarm/status entities worth surfacing as the warning banner when not "No alarm"/"On": `BMS cable`, `High voltage`, `Low voltage`, `High charge current`, `High/low charge temperature`, `Allow to charge`, `Allow to discharge`

All of these are currently **hardcoded mock values** in the prototype (see `DATASETS`, `currentA = 0.0`, `installedCapacityAh = 182.4`, `secondsSinceFullCharge = 216205`, etc. in the `<script>` block) — replace every one with a real `hass.states[entity_id].state` lookup driven by card config.

## Screens / Views
Single card, two theme variants (light / dark) that should instead just follow HA's active theme automatically in production (the prototype exposes a manual `darkMode` toggle only because it has no real theme context).

### Layout (top to bottom)
1. **Dashboard wrapper** — padding 20px, border-radius 14px, background `#fafafa` (light) / `#111111` (dark). In production this is just the dashboard's own background — don't render it as part of the card; it's shown in the mock purely for context.
2. **Card** — `border-radius: 12px`, `overflow: hidden`, background `#fff` (light) / `#1c1c1c` (dark), shadow `0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)` (light) — darker alpha values in dark mode (see Design Tokens).
3. **Header row** — flex, `align-items:center`, `gap:12px`, padding `16px 16px 4px`, background is a subtle top-down gradient tinted by the current SOC color (see Cell Coloring below) fading to transparent.
   - 34×34px circular icon badge (background = SOC color at 14% opacity light / 22% dark) containing a small hand-drawn battery glyph (a 14×20px rounded rect border + a small nub on top), stroked in the current SOC color.
   - Title block, `flex:1`: "Battery Bank" (16px/500), subtitle "LiFePO4 · {cellCount}S" (12px, secondary text color).
   - SOC chip: bold 13px, pill (`border-radius:12px`, padding `4px 10px`), background/color = SOC color at 14% opacity / full SOC color.
   - Kebab menu "⋮" (18px, 35% opacity) — wire to HA's standard more-info / card actions.
4. **Power + charge-mode badges row** — padding `2px 16px 10px`, flex gap 8px. Two pills: "⚡ {power}W" (neutral gray pill) and "{chargeMode}" (colored pill — background = mode color at ~13% opacity, text = mode color).
5. **Alarm banner** (conditional — only rendered when an alarm/fault entity is active) — margin `0 16px 8px`, padding `7px 10px`, red-tinted (`rgba(244,67,54,.1)` bg / `#c62828` text light, `rgba(244,67,54,.16)` / `#ff8a80` dark), border-radius 8px, "⚠ {message}".
6. **Cell bars row** — centered flex-wrap container, sized to exactly fit N bars per row (width = `cellsPerRow × barWidth + (cellsPerRow−1) × gap`) so it never clips and never orphans a partial row. Each cell:
   - Voltage label above (monospace, bold, e.g. "3.407V" — **always include the V unit**).
   - A ▼ or ▲ badge (red / amber) directly below the label, ONLY on the pack's min/max cell — reserve the same vertical space even when empty so bars stay aligned.
   - The bar itself: rounded-rect track (6% black/8% white opacity fill, 1px border), with an inner fill anchored to the bottom whose height % = `(voltage − 2.90) / (3.65 − 2.90) × 100` (i.e. position within the LiFePO4 2.90–3.65V operating band), colored per Cell Coloring rules below.
   - Cell index label below ("C1", "C2", …).
   - Entire cell is clickable → toggles the expanded detail panel (see Interactions).
7. **Expanded cell detail panel** (conditional, shown when a cell is selected) — margin `0 16px 10px`, padding `9px 11px`, subtle gray/white panel, border-radius 8px: bold title "Cell {n} · {v.toFixed(3)} V", then "{±mV} from pack average", then a rank line ("Lowest cell in pack" / "Highest cell in pack — actively balancing" / "Within normal range").
8. **Divider** — 1px hairline, margin `6px 16px`.
9. **Stats grid** — 2-column CSS grid, `gap: 0 20px`, padding `8px 16px 16px`. Each row is a flex space-between pair (label left, secondary color, 11.5px / bold value right), with a bottom hairline border except the last row. Rows, in this exact order (left col then right col, row by row):
   - Pack voltage (V) | Deviation (V)
   - Current (A) | Remaining capacity (Ah)
   - Temp | Installed capacity (Ah)
   - Cycles | Since full charge

## Interactions & Behavior
- **Tap a cell bar** → toggles the expanded detail panel for that cell (tap again, or tap a different cell, to switch/close). Pure local UI state, no HA calls needed — implement as component state (`selectedCellIndex: number | null`).
- **Tap the header kebab** → should open the card's standard more-info / edit actions (not yet wired in the prototype — it's decorative there).
- No animations currently specified; a simple `transition` on the bar fill height and the detail panel's reveal would be reasonable but is not required by the design.

## State Management
- `selectedCellIndex: number | null` — which cell's detail panel is expanded. Everything else is pure derived-from-config/entities render, no other local state.

## Design Tokens

### Colors — Light theme
- Dashboard bg (context only, not part of card): `#fafafa`
- Card bg: `#fff` · Primary text: `#212121` · Secondary text: `rgba(0,0,0,.6)` (subtitle) / `rgba(0,0,0,.55)` (stat labels) / `rgba(0,0,0,.45)` (cell index labels) / `rgba(0,0,0,.35)` (kebab)
- Card shadow: `0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)`
- Hairlines: `rgba(0,0,0,.08)` (main divider), `rgba(0,0,0,.06)` (stat row borders)
- Bar track (empty): `rgba(0,0,0,.06)` fill, `rgba(0,0,0,.08)` border

### Colors — Dark theme
- Dashboard bg: `#111111` · Card bg: `#1c1c1c` · Primary text: `#e1e1e1` · Secondary text: `rgba(255,255,255,.6)` / `.4` / `.35`
- Card shadow: `0 2px 1px -1px rgba(0,0,0,.5), 0 1px 1px 0 rgba(0,0,0,.4), 0 1px 3px 0 rgba(0,0,0,.35)`
- Hairlines: `rgba(255,255,255,.12)` (main divider), `rgba(255,255,255,.08)` (stat row borders)
- Bar track (empty): `rgba(255,255,255,.08)` fill, `rgba(255,255,255,.14)` border

### Status colors (fixed — always render these exact hex values regardless of theme or config; they're safety signals, not decoration)
- Low-voltage danger (cell ≤ 3.00V): `#f44336`
- High-voltage / balancing (cell ≥ 3.55V): `#ff9800`
- Selected-cell border accent: `#26a69a`

### Charge-mode colors
- Bulk: `#ff9800` · Absorption: `#42a5f5` · Float: `#4caf50`
(badge background = mode color at ~13–20% opacity, text = full mode color)

### Cell coloring (the "healthy" / in-range cells — the tunable part)
Cells inside the safe voltage band (3.00–3.55V) are colored by blending two configurable colors based on **pack-wide SOC** (not per-cell): a "warm" color at low SOC and a "cool" color at high SOC, linearly interpolated in RGB space by `soc/100`. Within that blended color, apply a further ±12% lightness shade based on the cell's relative position in the safe band (`(pct−33)/(77−33)` clamped to 0–1, factor range 0.88–1.1) so cells still show subtle individual variation. **Current saved defaults**: warm = `#FF7043`, cool = `#66BB6A`.
There's also a **gradient on/off toggle**: when off, skip the SOC blend and just use a single flat configurable color for all in-range cells (current default: `#66BB6A`), still with the same ±12% per-cell shading. Danger-zone cells (`#f44336`/`#ff9800`) are NEVER affected by this toggle or by the color pickers — they're fixed for safety.

### Typography
- Font: Roboto, weights 400/500/600/700 (Google Fonts)
- Title: 16px/500 · Subtitle/stat labels: 12–12.5px · SOC chip / stat values: 13px bold / 11.5px bold · Cell voltage label / bar-track font size / index label: scales with layout density — see table below.

### Bar sizing (scales inversely with cells-per-row so smaller packs get proportionally bigger bars)
| cells per row | bar width | gap | bar height | voltage font | badge font | index-label font |
|---|---|---|---|---|---|---|
| 16 | 20px | 3px | 72px | 8px | 7px | 7.5px |
| 8  | 34px | 8px | 94px | 11px | 9px | 9.5px |
| 4  | 54px | 16px | 116px | 13px | 11px | 11px |
| 2  | 84px | 24px | 140px | 15px | 12px | 12.5px |

"Cells per row" = total cell count in single-row layout mode, or half the total in two-row mode (which wraps into 8-top/8-bottom, etc.) — the card width is computed to exactly fit that row so nothing clips.

### Formatting
- Voltage: always `X.XXV` (2 decimals + unit letter, no space) on cell bars; `X.XXX V` (3 decimals, spaced) in the expanded detail panel and stats grid.
- Deviation: in **volts**, 3 decimals (e.g. `0.005 V`) — not millivolts.
- "Since full charge": source entity is raw seconds — convert to `{days}d {hours}h` (e.g. `216205` seconds → `2d 12h`). Formula: `days = floor(seconds/86400)`, `hours = floor((seconds % 86400)/3600)`.

## Config options (map these to the custom card's `setConfig()` schema)
- `cellCount`: 4 | 8 | 16 (or auto-detect from the number of configured cell-voltage entities)
- `layoutMode`: `single-row` | `two-row`
- `gradientEnabled`: boolean
- `socWarmColor`, `socCoolColor`, `flatCellColor`: hex strings (expose as a small curated swatch picker in the card editor, not a raw color wheel, per the prototype's Tweaks panel)
- `chargeMode` binding: entity id for the Bulk/Absorption/Float sensor
- `alarmActive`: derived, not configured — computed from whichever alarm/fault entities the integration exposes
- Entity mappings for every value in "Real entities this binds to" above

## Assets
None — no images/icons beyond the Google Fonts Roboto import and one hand-built CSS battery glyph (a bordered rounded rect + small top nub, no SVG/image asset needed).

## Screenshots
See `screenshots/`:
- `01-card.png` — default state (dark theme, 8 cells, single row, 100% SOC, Float mode)
- `02-light-theme.png` — same state in light theme
- `03-alarm-state.png` — alarm banner active, Bulk charge mode, lower SOC (light theme)
- `04-16cell-tworow-dark.png` — 16-cell pack in two-row layout (8 top / 8 bottom), dark theme, showing a balancing (amber) cell mid-charge

## Files
- `Battery Cell Card.dc.html` — the interactive design reference described above. Open it in a browser to see it live; use the Tweaks panel (if the tool's chrome is visible) to explore all config permutations, or read the inline `<script>` block's `Component.renderVals()` for the exact derivation logic behind every value (safe to read as pseudocode — don't port its template syntax).
