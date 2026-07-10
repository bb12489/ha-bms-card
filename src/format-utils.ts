/** "3.41V" - 2 decimals + unit letter, no space, used on cell bars. */
export function formatCellVoltageShort(volts: number): string {
  return `${volts.toFixed(2)}V`;
}

/** "3.407 V" - 3 decimals, spaced, used in the expanded detail panel and stats grid. */
export function formatVoltageLong(volts: number): string {
  return `${volts.toFixed(3)} V`;
}

/** Deviation is always shown in volts, 3 decimals (e.g. "0.005"), not millivolts. */
export function formatDeviation(volts: number): string {
  return volts.toFixed(3);
}

/** Raw seconds since last full charge -> "{days}d {hours}h". */
export function formatSinceFullCharge(seconds: number): string {
  const clamped = Math.max(0, seconds);
  const days = Math.floor(clamped / 86400);
  const hours = Math.floor((clamped % 86400) / 3600);
  return `${days}d ${hours}h`;
}

export function formatDeltaMv(deltaMv: number): string {
  const rounded = Math.round(deltaMv);
  return `${rounded >= 0 ? "+" : ""}${rounded} mV`;
}
