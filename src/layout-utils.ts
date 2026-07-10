import { sizingFor, type CellSizing } from "./const";
import type { LayoutMode } from "./types";

// Never render a bar narrower than the design's own smallest reference bar
// (the 16-per-row bucket) - below that it reads as too cramped, so auto mode
// wraps to another row instead of squeezing further.
const MIN_BAR_WIDTH = 20;
const MAX_BAR_WIDTH = 100;

// Width of the cell-bars row needed to show 8 cells in a single row at their
// reference size - the card is given a CSS min-width based on this so it
// never has to shrink bars below a readable size (and never needs to scroll).
const EIGHT_CELL_SIZING = sizingFor(8);
export const MIN_CELLS_ROW_WIDTH = 8 * EIGHT_CELL_SIZING.barW + 7 * EIGHT_CELL_SIZING.gap;

export interface CellLayout extends CellSizing {
  perRow: number;
  rowWidth: number;
}

function forcedPerRow(totalCells: number, mode: LayoutMode): number | null {
  if (mode === "single-row") return totalCells;
  if (mode === "two-row") return Math.max(1, Math.ceil(totalCells / 2));
  return null;
}

/**
 * Picks how many cells sit in a row and how wide their bars are, given the
 * actual measured width available to the cell area. In "auto" mode this
 * searches by row count (1, 2, 3, ...) rather than raw cells-per-row, so
 * cells split evenly across rows (e.g. 16 cells -> 8+8, not a lopsided
 * 14+2) - it picks the fewest rows whose even split keeps bars at or above
 * a readable minimum, so the card reflows as it's resized instead of being
 * locked to a fixed pixel width. "single-row"/"two-row" force the row count
 * but still fit the bars to the available width.
 */
export function computeCellLayout(totalCells: number, availableWidth: number, mode: LayoutMode): CellLayout {
  const forced = forcedPerRow(totalCells, mode);
  let perRow = forced ?? totalCells;

  if (forced === null && availableWidth > 0) {
    perRow = 1;
    for (let rows = 1; rows <= totalCells; rows++) {
      const candidate = Math.ceil(totalCells / rows);
      const gap = sizingFor(candidate).gap;
      const fitted = (availableWidth - (candidate - 1) * gap) / candidate;
      if (fitted >= MIN_BAR_WIDTH) {
        perRow = candidate;
        break;
      }
    }
  }

  perRow = Math.max(1, Math.min(perRow, totalCells));
  const reference = sizingFor(perRow);

  let barW = reference.barW;
  if (availableWidth > 0) {
    const fitted = (availableWidth - (perRow - 1) * reference.gap) / perRow;
    barW = Math.max(MIN_BAR_WIDTH, Math.min(MAX_BAR_WIDTH, fitted));
  }

  return {
    ...reference,
    barW,
    perRow,
    rowWidth: perRow * barW + (perRow - 1) * reference.gap,
  };
}
