import type { LovelaceCardConfig } from "custom-card-helpers";

/**
 * An alarm/status entity to surface as the warning banner when it reports a
 * problem. Most BMS alarm sensors are "healthy at rest" (e.g. "No alarm" /
 * "off" / "0"); a few (like "Allow to charge") are inverted - healthy is
 * "on" and the problem is anything else - set invert: true for those.
 *
 * A plain entity-id string is also accepted (e.g. from the GUI editor); it is
 * normalized at render time, inferring `invert` from the entity/friendly
 * name containing "allow".
 */
export interface AlarmEntityConfig {
  entity: string;
  name?: string;
  invert?: boolean;
  ok_states?: string[];
}
export type AlarmEntityEntry = string | AlarmEntityConfig;

export type LayoutMode = "auto" | "single-row" | "two-row";

export interface HaBmsCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;

  /** Per-cell voltage sensor entities, in physical cell order (cell 1 first). */
  cell_entities: string[];

  /** Authoritative "which cell is min/max" entities, when the BMS exposes them. */
  min_cell_id_entity?: string;
  max_cell_id_entity?: string;

  /** Cell voltage deviation (max-min) sensor, in volts. Computed locally if omitted. */
  deviation_entity?: string;

  /** Pack state of charge, in percent. */
  soc_entity: string;

  /** Pack power, in watts. Derived from current x pack voltage if omitted. */
  power_entity?: string;
  /** Pack current, in amps. */
  current_entity?: string;
  /** Pack voltage, in volts. Summed from cell_entities if omitted. */
  pack_voltage_entity?: string;

  /** Charge mode sensor - expected states: Bulk | Absorption | Float. */
  charge_mode_entity?: string;

  capacity_remaining_entity?: string;
  capacity_installed_entity?: string;
  temperature_entity?: string;
  cycles_entity?: string;
  /** Seconds since the pack was last fully charged. */
  since_full_charge_entity?: string;

  alarm_entities?: AlarmEntityEntry[];

  layout_mode?: LayoutMode;
  gradient_enabled?: boolean;
  soc_warm_color?: string;
  soc_cool_color?: string;
  flat_cell_color?: string;
}

export interface CellRenderData {
  index: number;
  label: string;
  voltage: number;
  voltageLabel: string;
  heightPct: number;
  color: string;
  badge: "▼" | "▲" | "";
  badgeColor: string;
  isMin: boolean;
  isMax: boolean;
}

export interface ExpandedCellDetail {
  title: string;
  line1: string;
  line2: string;
}

export interface ThemeTokens {
  cardBg: string;
  primaryText: string;
  subtitleText: string;
  statLabelText: string;
  cellIndexText: string;
  kebabText: string;
  cardShadow: string;
  hairlineMain: string;
  hairlineStat: string;
  barTrackBg: string;
  barTrackBorder: string;
  powerPillBg: string;
  alarmBg: string;
  alarmBorder: string;
  alarmText: string;
  expandedBg: string;
  expandedBorder: string;
  expandedSecondaryText: string;
  chargeModeAlpha: string;
  socIconBgAlpha: number;
  socChipBgAlpha: number;
  socHeaderTintAlpha: number;
}
