import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fireEvent, type HomeAssistant, type LovelaceCardEditor } from "custom-card-helpers";
import {
  CARD_TYPE,
  CHARGE_MODE_COLOR,
  CHARGE_MODES,
  DEFAULT_FLAT_CELL_COLOR,
  DEFAULT_OK_STATES,
  DEFAULT_SOC_COOL_COLOR,
  DEFAULT_SOC_WARM_COLOR,
  EDITOR_TAG,
  SELECTED_CELL_BORDER_HEX,
  STATUS_HIGH_HEX,
  STATUS_LOW_HEX,
  WARN_HIGH,
  WARN_LOW,
  sizingFor,
} from "./const";
import { cellColor, hexToRgb, pctFor, rgbaCss, rgbToCss, socMidRgb, statusOf } from "./color-utils";
import {
  formatCellVoltageShort,
  formatDeltaMv,
  formatDeviation,
  formatSinceFullCharge,
  formatVoltageLong,
} from "./format-utils";
import type {
  AlarmEntityConfig,
  AlarmEntityEntry,
  BatteryCellCardConfig,
  CellRenderData,
  ExpandedCellDetail,
  ThemeTokens,
} from "./types";
import "./battery-cell-card-editor";

@customElement(CARD_TYPE)
export class BatteryCellCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config!: BatteryCellCardConfig;

  @state() private _selectedCellIndex: number | null = null;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./battery-cell-card-editor");
    return document.createElement(EDITOR_TAG) as LovelaceCardEditor;
  }

  public static getStubConfig(): Partial<BatteryCellCardConfig> {
    return {
      type: `custom:${CARD_TYPE}`,
      cell_entities: [],
      soc_entity: "",
      layout_mode: "single-row",
      gradient_enabled: true,
    };
  }

  public setConfig(config: BatteryCellCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    if (!Array.isArray(config.cell_entities) || config.cell_entities.length === 0) {
      throw new Error(
        "battery-cell-card: `cell_entities` must be a non-empty list of per-cell voltage entity ids"
      );
    }
    if (!config.soc_entity) {
      throw new Error("battery-cell-card: `soc_entity` is required");
    }
    this._config = { layout_mode: "single-row", gradient_enabled: true, ...config };
    this._selectedCellIndex = null;
  }

  public getCardSize(): number {
    let size = 5;
    if (this._alarmMessages().length) size += 1;
    if (this._selectedCellIndex !== null) size += 1;
    return size;
  }

  public getGridOptions(): {
    columns: number;
    rows: number;
    min_columns: number;
    min_rows: number;
  } {
    return { columns: 12, rows: 5, min_columns: 6, min_rows: 4 };
  }

  static styles = css`
    :host {
      display: block;
    }
    ha-card {
      border-radius: 12px;
      overflow: hidden;
      font-family: "Roboto", sans-serif;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 16px 4px;
    }
    .icon-badge {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: none;
      box-sizing: border-box;
    }
    .battery-glyph {
      width: 14px;
      height: 20px;
      border-width: 2px;
      border-style: solid;
      border-radius: 2px;
      position: relative;
      box-sizing: border-box;
    }
    .battery-glyph span {
      position: absolute;
      top: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 7px;
      height: 3px;
      border-radius: 1px 1px 0 0;
    }
    .title-block {
      flex: 1;
      min-width: 0;
    }
    .title {
      font-size: 16px;
      font-weight: 500;
      line-height: 1.3;
    }
    .subtitle {
      font-size: 12px;
    }
    .soc-chip {
      font-size: 13px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 12px;
      flex: none;
    }
    .kebab {
      font-size: 18px;
      line-height: 1;
      cursor: pointer;
      flex: none;
    }
    .badges-row {
      display: flex;
      gap: 8px;
      padding: 2px 16px 10px;
      flex-wrap: wrap;
    }
    .pill {
      display: flex;
      align-items: center;
      gap: 5px;
      border-radius: 8px;
      padding: 4px 10px;
      font-size: 11.5px;
      font-weight: 600;
    }
    .alarm-banner {
      margin: 0 16px 8px;
      padding: 7px 10px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 500;
    }
    .cells-wrap {
      display: flex;
      justify-content: center;
      padding: 4px 16px 6px;
    }
    .cells-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      cursor: pointer;
    }
    .cell-voltage {
      font-family: ui-monospace, Menlo, monospace;
      font-weight: 600;
    }
    .cell-badge {
      line-height: 1;
    }
    .cell-track {
      border-radius: 6px;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
    }
    .cell-fill {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 6px 6px 2px 2px;
      transition: height 0.3s ease;
    }
    .expanded-panel {
      margin: 0 16px 10px;
      padding: 9px 11px;
      border-radius: 8px;
      font-size: 11.5px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      transition: opacity 0.15s ease;
      box-sizing: border-box;
    }
    .expanded-title {
      font-weight: 600;
    }
    .divider {
      height: 1px;
      margin: 6px 16px;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0 20px;
      padding: 8px 16px 16px;
    }
    .stat-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      font-size: 11.5px;
    }
  `;

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const cfg = this._config;
    // hass.themes.darkMode is a real, long-standing HA runtime property that
    // custom-card-helpers' bundled types don't include.
    const dark = !!(this.hass.themes as unknown as { darkMode?: boolean })?.darkMode;
    const theme = this._themeTokens(dark);

    const voltages = this._cellVoltages();
    const cellCount = voltages.length;
    const packSoc = this._num(cfg.soc_entity) ?? 0;
    const gradientEnabled = cfg.gradient_enabled ?? true;
    const warmRgb = hexToRgb(cfg.soc_warm_color || DEFAULT_SOC_WARM_COLOR);
    const coolRgb = hexToRgb(cfg.soc_cool_color || DEFAULT_SOC_COOL_COLOR);
    const flatRgb = hexToRgb(cfg.flat_cell_color || DEFAULT_FLAT_CELL_COLOR);
    const layoutMode = cfg.layout_mode ?? "single-row";
    const cellsPerRow = layoutMode === "two-row" ? Math.ceil(cellCount / 2) : cellCount;
    const sizing = sizingFor(cellsPerRow);
    const cellsRowWidth = cellsPerRow * sizing.barW + (cellsPerRow - 1) * sizing.gap;

    const { minIdx, maxIdx } = this._minMaxIdx(voltages);
    const avg = this._average(voltages);

    const cells: CellRenderData[] = voltages.map((v, i) => {
      const isMin = i === minIdx;
      const isMax = i === maxIdx;
      if (v === null) {
        return {
          index: i,
          label: `C${i + 1}`,
          voltage: NaN,
          voltageLabel: "--",
          heightPct: 0,
          color: theme.barTrackBg,
          badge: "",
          badgeColor: "transparent",
          isMin: false,
          isMax: false,
        };
      }
      return {
        index: i,
        label: `C${i + 1}`,
        voltage: v,
        voltageLabel: formatCellVoltageShort(v),
        heightPct: Math.max(0, Math.min(100, pctFor(v))),
        color: cellColor(v, pctFor(v), packSoc, gradientEnabled, warmRgb, coolRgb, flatRgb),
        badge: isMin ? "▼" : isMax ? "▲" : "",
        badgeColor: isMin ? STATUS_LOW_HEX : isMax ? STATUS_HIGH_HEX : "transparent",
        isMin,
        isMax,
      };
    });

    const midRgb = gradientEnabled ? socMidRgb(packSoc, warmRgb, coolRgb) : flatRgb;
    const socColorCss = rgbToCss(midRgb);

    const alarmMessages = this._alarmMessages();
    const alarmActive = alarmMessages.length > 0;

    const validVoltages = voltages.filter((v): v is number => v !== null);
    const packVoltage = this._num(cfg.pack_voltage_entity) ?? validVoltages.reduce((a, b) => a + b, 0);
    const currentA = this._num(cfg.current_entity);
    const powerW = this._num(cfg.power_entity) ?? (currentA !== null ? currentA * packVoltage : null);
    const deviation =
      this._num(cfg.deviation_entity) ??
      (validVoltages.length ? Math.max(...validVoltages) - Math.min(...validVoltages) : 0);
    const remainingAh = this._num(cfg.capacity_remaining_entity);
    const installedAh = this._num(cfg.capacity_installed_entity);
    const cycles = this._num(cfg.cycles_entity);
    const sinceFullChargeSeconds = this._num(cfg.since_full_charge_entity);
    const tempState = this._state(cfg.temperature_entity);
    const tempUnit = cfg.temperature_entity
      ? this.hass.states[cfg.temperature_entity]?.attributes?.unit_of_measurement ?? ""
      : "";

    const chargeModeState = this._state(cfg.charge_mode_entity);
    const chargeModeColor =
      chargeModeState && (CHARGE_MODES as string[]).includes(chargeModeState)
        ? CHARGE_MODE_COLOR[chargeModeState as (typeof CHARGE_MODES)[number]]
        : "#9e9e9e";

    const expandedDetail = this._expandedDetail(cells, avg);

    return html`
      <ha-card
        style="background:${theme.cardBg};color:${theme.primaryText};box-shadow:${theme.cardShadow};"
      >
        <div
          class="header"
          style="background:linear-gradient(180deg, ${rgbaCss(midRgb, theme.socHeaderTintAlpha)}, rgba(0,0,0,0));"
        >
          <div class="icon-badge" style="background:${rgbaCss(midRgb, theme.socIconBgAlpha)};">
            <div class="battery-glyph" style="border-color:${socColorCss};">
              <span style="background:${socColorCss};"></span>
            </div>
          </div>
          <div class="title-block">
            <div class="title">${cfg.name || "Battery Bank"}</div>
            <div class="subtitle" style="color:${theme.subtitleText};">LiFePO4 · ${cellCount}S</div>
          </div>
          <div class="soc-chip" style="background:${rgbaCss(midRgb, theme.socChipBgAlpha)};color:${socColorCss};">
            ${Math.round(packSoc)}%
          </div>
          <div class="kebab" style="color:${theme.kebabText};" @click=${this._handleMoreInfo}>⋮</div>
        </div>

        <div class="badges-row">
          <div class="pill" style="background:${theme.powerPillBg};color:${theme.primaryText};">
            ⚡ ${powerW !== null ? powerW.toFixed(1) : "--"} W
          </div>
          ${chargeModeState
            ? html`<div
                class="pill"
                style="background:${chargeModeColor}${theme.chargeModeAlpha};color:${chargeModeColor};"
              >
                ${chargeModeState}
              </div>`
            : nothing}
        </div>

        ${alarmActive
          ? html`<div
              class="alarm-banner"
              style="background:${theme.alarmBg};border:1px solid ${theme.alarmBorder};color:${theme.alarmText};"
            >
              ⚠ ${alarmMessages[0]}${alarmMessages.length > 1 ? ` (+${alarmMessages.length - 1} more)` : ""}
            </div>`
          : nothing}

        <div class="cells-wrap">
          <div class="cells-row" style="gap:${sizing.gap}px;width:${cellsRowWidth}px;">
            ${cells.map(
              (c) => html`
                <div class="cell" style="width:${sizing.barW}px;" @click=${() => this._toggleCell(c.index)}>
                  <div
                    class="cell-voltage"
                    style="font-size:${sizing.font}px;height:${sizing.font}px;color:${theme.primaryText};"
                  >
                    ${c.voltageLabel}
                  </div>
                  <div
                    class="cell-badge"
                    style="font-size:${sizing.badgeFont}px;height:${sizing.badgeFont}px;color:${c.badgeColor};"
                  >
                    ${c.badge}
                  </div>
                  <div
                    class="cell-track"
                    style="width:${sizing.barW}px;height:${sizing.barH}px;background:${theme.barTrackBg};border:${
                      this._selectedCellIndex === c.index
                        ? `2px solid ${SELECTED_CELL_BORDER_HEX}`
                        : `1px solid ${theme.barTrackBorder}`
                    };"
                  >
                    <div class="cell-fill" style="height:${c.heightPct}%;background:${c.color};"></div>
                  </div>
                  <div class="cell-label" style="font-size:${sizing.labelFont}px;color:${theme.cellIndexText};">
                    ${c.label}
                  </div>
                </div>
              `
            )}
          </div>
        </div>

        ${expandedDetail
          ? html`<div
              class="expanded-panel"
              style="background:${theme.expandedBg};border:1px solid ${theme.expandedBorder};"
            >
              <div class="expanded-title">${expandedDetail.title}</div>
              <div style="color:${theme.expandedSecondaryText};">${expandedDetail.line1}</div>
              <div style="color:${theme.expandedSecondaryText};">${expandedDetail.line2}</div>
            </div>`
          : nothing}

        <div class="divider" style="background:${theme.hairlineMain};"></div>

        <div class="stats-grid">
          ${this._statRow("Pack voltage", `${packVoltage.toFixed(2)} V`, theme)}
          ${this._statRow("Deviation", `${formatDeviation(deviation)} V`, theme)}
          ${this._statRow("Current", currentA !== null ? `${currentA.toFixed(1)} A` : "--", theme)}
          ${this._statRow("Remaining", remainingAh !== null ? `${remainingAh.toFixed(1)} Ah` : "--", theme)}
          ${this._statRow("Temp", tempState !== null ? `${tempState}${tempUnit}` : "--", theme)}
          ${this._statRow("Installed", installedAh !== null ? `${installedAh.toFixed(1)} Ah` : "--", theme)}
          ${this._statRow("Cycles", cycles !== null ? `${Math.round(cycles)}` : "--", theme, true)}
          ${this._statRow(
            "Since full charge",
            sinceFullChargeSeconds !== null ? formatSinceFullCharge(sinceFullChargeSeconds) : "--",
            theme,
            true
          )}
        </div>
      </ha-card>
    `;
  }

  private _statRow(label: string, value: string, theme: ThemeTokens, noBorder = false) {
    return html`<div
      class="stat-row"
      style="${noBorder ? "" : `border-bottom:1px solid ${theme.hairlineStat};`}"
    >
      <span style="color:${theme.statLabelText};">${label}</span>
      <b>${value}</b>
    </div>`;
  }

  private _themeTokens(dark: boolean): ThemeTokens {
    return dark
      ? {
          cardBg: "#1c1c1c",
          primaryText: "#e1e1e1",
          subtitleText: "rgba(255,255,255,.6)",
          statLabelText: "rgba(255,255,255,.6)",
          cellIndexText: "rgba(255,255,255,.4)",
          kebabText: "rgba(255,255,255,.35)",
          cardShadow: "0 2px 1px -1px rgba(0,0,0,.5),0 1px 1px 0 rgba(0,0,0,.4),0 1px 3px 0 rgba(0,0,0,.35)",
          hairlineMain: "rgba(255,255,255,.12)",
          hairlineStat: "rgba(255,255,255,.08)",
          barTrackBg: "rgba(255,255,255,.08)",
          barTrackBorder: "rgba(255,255,255,.14)",
          powerPillBg: "rgba(255,255,255,.06)",
          alarmBg: "rgba(244,67,54,.16)",
          alarmBorder: "rgba(244,67,54,.4)",
          alarmText: "#ff8a80",
          expandedBg: "rgba(255,255,255,.05)",
          expandedBorder: "rgba(255,255,255,.12)",
          expandedSecondaryText: "rgba(255,255,255,.65)",
          chargeModeAlpha: "33",
          socIconBgAlpha: 0.22,
          socChipBgAlpha: 0.22,
          socHeaderTintAlpha: 0.16,
        }
      : {
          cardBg: "#fff",
          primaryText: "#212121",
          subtitleText: "rgba(0,0,0,.6)",
          statLabelText: "rgba(0,0,0,.55)",
          cellIndexText: "rgba(0,0,0,.45)",
          kebabText: "rgba(0,0,0,.35)",
          cardShadow: "0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)",
          hairlineMain: "rgba(0,0,0,.08)",
          hairlineStat: "rgba(0,0,0,.06)",
          barTrackBg: "rgba(0,0,0,.06)",
          barTrackBorder: "rgba(0,0,0,.08)",
          powerPillBg: "rgba(0,0,0,.045)",
          alarmBg: "rgba(244,67,54,.1)",
          alarmBorder: "rgba(244,67,54,.3)",
          alarmText: "#c62828",
          expandedBg: "rgba(0,0,0,.035)",
          expandedBorder: "rgba(0,0,0,.1)",
          expandedSecondaryText: "rgba(0,0,0,.6)",
          chargeModeAlpha: "22",
          socIconBgAlpha: 0.14,
          socChipBgAlpha: 0.14,
          socHeaderTintAlpha: 0.1,
        };
  }

  private _num(entityId?: string): number | null {
    if (!entityId || !this.hass) return null;
    const st = this.hass.states[entityId];
    if (!st || st.state === "unknown" || st.state === "unavailable") return null;
    const n = parseFloat(st.state);
    return Number.isFinite(n) ? n : null;
  }

  private _state(entityId?: string): string | null {
    if (!entityId || !this.hass) return null;
    const st = this.hass.states[entityId];
    if (!st || st.state === "unknown" || st.state === "unavailable") return null;
    return st.state;
  }

  private _friendlyName(entityId: string): string {
    return this.hass?.states[entityId]?.attributes?.friendly_name ?? entityId;
  }

  private _cellVoltages(): (number | null)[] {
    return (this._config.cell_entities ?? []).map((id) => this._num(id));
  }

  private _minMaxIdx(voltages: (number | null)[]): { minIdx: number; maxIdx: number } {
    const cfg = this._config;
    let minIdx = -1;
    let maxIdx = -1;
    const minIdEntity = cfg.min_cell_id_entity ? this._num(cfg.min_cell_id_entity) : null;
    const maxIdEntity = cfg.max_cell_id_entity ? this._num(cfg.max_cell_id_entity) : null;
    if (minIdEntity !== null && minIdEntity >= 1 && minIdEntity <= voltages.length) {
      minIdx = Math.round(minIdEntity) - 1;
    }
    if (maxIdEntity !== null && maxIdEntity >= 1 && maxIdEntity <= voltages.length) {
      maxIdx = Math.round(maxIdEntity) - 1;
    }
    if (minIdx === -1 || maxIdx === -1) {
      let minV = Infinity;
      let maxV = -Infinity;
      let mi = -1;
      let ma = -1;
      voltages.forEach((v, i) => {
        if (v === null) return;
        if (v < minV) {
          minV = v;
          mi = i;
        }
        if (v > maxV) {
          maxV = v;
          ma = i;
        }
      });
      if (minIdx === -1) minIdx = mi;
      if (maxIdx === -1) maxIdx = ma;
    }
    return { minIdx, maxIdx };
  }

  private _average(voltages: (number | null)[]): number {
    const valid = voltages.filter((v): v is number => v !== null);
    if (!valid.length) return 0;
    return valid.reduce((a, b) => a + b, 0) / valid.length;
  }

  private _normalizeAlarm(entry: AlarmEntityEntry): AlarmEntityConfig {
    if (typeof entry === "string") {
      const friendly = this._friendlyName(entry);
      const invert = /allow/i.test(entry) || /allow/i.test(friendly);
      return { entity: entry, invert };
    }
    return entry;
  }

  private _isAlarmProblem(alarm: AlarmEntityConfig): boolean {
    const state = this._state(alarm.entity);
    if (state === null) return false;
    const normalized = state.toLowerCase();
    if (alarm.invert) return normalized !== "on";
    const okStates = (alarm.ok_states ?? DEFAULT_OK_STATES).map((s) => s.toLowerCase());
    return !okStates.includes(normalized);
  }

  private _alarmMessages(): string[] {
    if (!this._config || !this.hass) return [];
    const messages: string[] = [];
    const voltages = this._cellVoltages();
    const firstHigh = voltages.findIndex((v) => v !== null && statusOf(v) === "high");
    const firstLow = voltages.findIndex((v) => v !== null && statusOf(v) === "low");
    if (firstHigh !== -1) {
      messages.push(`High cell voltage — C${firstHigh + 1} exceeds ${WARN_HIGH.toFixed(2)} V`);
    }
    if (firstLow !== -1) {
      messages.push(`Low cell voltage — C${firstLow + 1} at or below ${WARN_LOW.toFixed(2)} V`);
    }
    for (const raw of this._config.alarm_entities ?? []) {
      const alarm = this._normalizeAlarm(raw);
      if (this._isAlarmProblem(alarm)) {
        const label = alarm.name ?? this._friendlyName(alarm.entity);
        const state = this._state(alarm.entity);
        messages.push(`${label}${state ? `: ${state}` : ""}`);
      }
    }
    return messages;
  }

  private _expandedDetail(cells: CellRenderData[], avg: number): ExpandedCellDetail | null {
    if (this._selectedCellIndex === null) return null;
    const cell = cells[this._selectedCellIndex];
    if (!cell || Number.isNaN(cell.voltage)) return null;
    const deltaMv = (cell.voltage - avg) * 1000;
    const rank = cell.isMin
      ? "Lowest cell in pack"
      : cell.isMax
      ? "Highest cell in pack — actively balancing"
      : "Within normal range";
    return {
      title: `Cell ${cell.index + 1} · ${formatVoltageLong(cell.voltage)}`,
      line1: `${formatDeltaMv(deltaMv)} from pack average`,
      line2: rank,
    };
  }

  private _toggleCell(index: number): void {
    this._selectedCellIndex = this._selectedCellIndex === index ? null : index;
  }

  private _handleMoreInfo(ev: Event): void {
    ev.stopPropagation();
    const entityId = this._config.soc_entity;
    if (!entityId) return;
    fireEvent(this, "hass-more-info", { entityId });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_TYPE]: BatteryCellCard;
  }
}

const registrationWindow = window as unknown as {
  customCards?: Array<Record<string, unknown>>;
};
registrationWindow.customCards = registrationWindow.customCards || [];
registrationWindow.customCards.push({
  type: CARD_TYPE,
  name: "Battery Cell Card",
  description: "Per-cell voltage, balancing, SOC, power, and health monitoring for a LiFePO4 battery pack.",
  preview: true,
  documentationURL: "https://github.com/bb12489/ha-bms-card",
});
