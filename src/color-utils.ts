import { SCALE_MAX, SCALE_MIN, STATUS_HIGH_RGB, STATUS_LOW_RGB, WARN_HIGH, WARN_LOW } from "./const";

export type Rgb = [number, number, number];
export type CellStatus = "low" | "high" | "ok";

/** Position of a cell voltage within the LiFePO4 operating band, as a 0-100 percentage. */
export function pctFor(voltage: number): number {
  return ((voltage - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function statusOf(voltage: number): CellStatus {
  if (voltage <= WARN_LOW) return "low";
  if (voltage >= WARN_HIGH) return "high";
  return "ok";
}

export function hexToRgb(hex: string): Rgb {
  const h = hex.replace("#", "");
  const parts = [0, 2, 4].map((i) => parseInt(h.substring(i, i + 2), 16));
  return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
}

export function rgbToCss(rgb: Rgb): string {
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
}

export function rgbaCss(rgb: Rgb, alpha: number): string {
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
}

/** Blends the warm/cool configured colors by pack-wide SOC (0-100). */
export function socMidRgb(soc: number, warmRgb: Rgb, coolRgb: Rgb): Rgb {
  const t = Math.max(0, Math.min(100, soc)) / 100;
  return [0, 1, 2].map((i) => Math.round(lerp(warmRgb[i], coolRgb[i], t))) as Rgb;
}

export function shade(rgb: Rgb, factor: number): Rgb {
  return rgb.map((c) => Math.max(0, Math.min(255, Math.round(c * factor)))) as Rgb;
}

/**
 * Danger-zone cells stay pure, fixed colors so an at-risk cell always pops.
 * Only "ok" cells take the SOC-tinted (or flat) color, shaded +/-12% by the
 * cell's relative position within the safe band so per-cell differences still
 * read within it.
 */
export function cellColor(
  voltage: number,
  pct: number,
  soc: number,
  gradientEnabled: boolean,
  warmRgb: Rgb,
  coolRgb: Rgb,
  flatRgb: Rgb
): string {
  const status = statusOf(voltage);
  if (status === "low") return rgbToCss(STATUS_LOW_RGB);
  if (status === "high") return rgbToCss(STATUS_HIGH_RGB);
  const mid = gradientEnabled ? socMidRgb(soc, warmRgb, coolRgb) : flatRgb;
  const t = Math.max(0, Math.min(1, (pct - 33) / (77 - 33)));
  const factor = lerp(0.88, 1.1, t);
  return rgbToCss(shade(mid, factor));
}
