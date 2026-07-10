import { sizingFor, type CellSizing } from "./const";
import type { LayoutMode } from "./types";

const MIN_BAR_WIDTH = 14;
const MAX_BAR_WIDTH = 100;

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
 * chooses the largest cells-per-row (fewest rows) whose bars stay at or
 * above a readable minimum, so the card reflows as it's resized instead of
 * being locked to a fixed pixel width. "single-row"/"two-row" force the row
 * count but still fit the bars to the available width.
 */
export function computeCellLayout(totalCells: number, availableWidth: number, mode: LayoutMode): CellLayout {
  const forced = forcedPerRow(totalCells, mode);
  let perRow = forced ?? totalCells;

  if (forced === null && availableWidth > 0) {
    perRow = 1;
    for (let candidate = totalCells; candidate >= 1; candidate--) {
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
