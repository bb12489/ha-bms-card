export const CARD_TYPE = "battery-cell-card";
export const CARD_NAME = "Battery Cell Card";
export const EDITOR_TAG = "battery-cell-card-editor";

// LiFePO4 cell range spans ~2.90V (near-empty knee) to ~3.65V (near-full knee).
export const SCALE_MIN = 2.9;
export const SCALE_MAX = 3.65;
export const WARN_LOW = 3.0;
export const WARN_HIGH = 3.55;

export const STATUS_LOW_RGB: [number, number, number] = [244, 67, 54];
export const STATUS_HIGH_RGB: [number, number, number] = [255, 152, 0];
export const STATUS_LOW_HEX = "#f44336";
export const STATUS_HIGH_HEX = "#ff9800";
export const SELECTED_CELL_BORDER_HEX = "#26a69a";

export type ChargeMode = "Bulk" | "Absorption" | "Float";
export const CHARGE_MODES: ChargeMode[] = ["Bulk", "Absorption", "Float"];
export const CHARGE_MODE_COLOR: Record<ChargeMode, string> = {
  Bulk: "#ff9800",
  Absorption: "#42a5f5",
  Float: "#4caf50",
};

export interface CellSizing {
  barW: number;
  gap: number;
  barH: number;
  font: number;
  badgeFont: number;
  labelFont: number;
}

// Bar sizing keyed by how many cells sit in a single row - fewer per row means
// more room, so bars grow to use it.
export const SIZING: Record<number, CellSizing> = {
  16: { barW: 20, gap: 3, barH: 72, font: 8, badgeFont: 7, labelFont: 7.5 },
  8: { barW: 34, gap: 8, barH: 94, font: 11, badgeFont: 9, labelFont: 9.5 },
  4: { barW: 54, gap: 16, barH: 116, font: 13, badgeFont: 11, labelFont: 11 },
  2: { barW: 84, gap: 24, barH: 140, font: 15, badgeFont: 12, labelFont: 12.5 },
};
const SIZING_BUCKETS = Object.keys(SIZING).map(Number).sort((a, b) => a - b);

/** Picks the closest defined sizing bucket for an arbitrary cells-per-row count. */
export function sizingFor(cellsPerRow: number): CellSizing {
  let closest = SIZING_BUCKETS[0];
  let bestDelta = Math.abs(cellsPerRow - closest);
  for (const bucket of SIZING_BUCKETS) {
    const delta = Math.abs(cellsPerRow - bucket);
    if (delta < bestDelta) {
      closest = bucket;
      bestDelta = delta;
    }
  }
  return SIZING[closest];
}

export const DEFAULT_SOC_WARM_COLOR = "#FF7043";
export const DEFAULT_SOC_COOL_COLOR = "#66BB6A";
export const DEFAULT_FLAT_CELL_COLOR = "#66BB6A";

// Curated swatch options surfaced in the card editor color pickers.
export const SOC_WARM_SWATCHES = ["#FFB74D", "#FFA726", "#FF7043", "#EC407A"];
export const SOC_COOL_SWATCHES = ["#26C6DA", "#42A5F5", "#66BB6A", "#26A69A"];
export const FLAT_CELL_SWATCHES = ["#42A5F5", "#26A69A", "#7E57C2", "#66BB6A"];

// States that count as "not a problem" for a configured alarm/status entity,
// unless the entity is marked invert: true (e.g. "Allow to charge", where the
// healthy state is "on" and the problem is anything else).
export const DEFAULT_OK_STATES = ["off", "0", "no alarm", "ok", "normal", "false"];
