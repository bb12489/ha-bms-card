import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fireEvent, type HomeAssistant, type LovelaceCardEditor } from "custom-card-helpers";
import {
  DEFAULT_FLAT_CELL_COLOR,
  DEFAULT_SOC_COOL_COLOR,
  DEFAULT_SOC_WARM_COLOR,
  EDITOR_TAG,
  FLAT_CELL_SWATCHES,
  SOC_COOL_SWATCHES,
  SOC_WARM_SWATCHES,
} from "./const";
import type { BatteryCellCardConfig } from "./types";

const SCHEMA = [
  { name: "name", selector: { text: {} } },
  {
    type: "expandable",
    name: "cells",
    title: "Cell voltages",
    expanded: true,
    schema: [
      {
        name: "cell_entities",
        required: true,
        selector: { entity: { multiple: true, domain: "sensor" } },
      },
      { name: "min_cell_id_entity", selector: { entity: {} } },
      { name: "max_cell_id_entity", selector: { entity: {} } },
      { name: "deviation_entity", selector: { entity: { domain: "sensor" } } },
    ],
  },
  {
    type: "expandable",
    name: "pack",
    title: "Pack state",
    expanded: true,
    schema: [
      { name: "soc_entity", required: true, selector: { entity: { domain: "sensor" } } },
      { name: "power_entity", selector: { entity: { domain: "sensor" } } },
      { name: "current_entity", selector: { entity: { domain: "sensor" } } },
      { name: "pack_voltage_entity", selector: { entity: { domain: "sensor" } } },
      { name: "charge_mode_entity", selector: { entity: { domain: "sensor" } } },
    ],
  },
  {
    type: "expandable",
    name: "health",
    title: "Capacity & health",
    schema: [
      { name: "capacity_remaining_entity", selector: { entity: { domain: "sensor" } } },
      { name: "capacity_installed_entity", selector: { entity: { domain: "sensor" } } },
      { name: "temperature_entity", selector: { entity: { domain: "sensor" } } },
      { name: "cycles_entity", selector: { entity: { domain: "sensor" } } },
      { name: "since_full_charge_entity", selector: { entity: { domain: "sensor" } } },
    ],
  },
  {
    type: "expandable",
    name: "alarms",
    title: "Alarms & status",
    schema: [
      {
        name: "alarm_entities",
        selector: { entity: { multiple: true } },
      },
    ],
  },
  {
    type: "expandable",
    name: "layout",
    title: "Layout",
    schema: [
      {
        name: "layout_mode",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "single-row", label: "Single row" },
              { value: "two-row", label: "Two rows" },
            ],
          },
        },
      },
      { name: "gradient_enabled", selector: { boolean: {} } },
    ],
  },
] as const;

const LABELS: Record<string, string> = {
  name: "Card name",
  cell_entities: "Cell voltage entities (in physical order, C1 first)",
  min_cell_id_entity: "Minimum voltage cell ID entity (optional)",
  max_cell_id_entity: "Maximum voltage cell ID entity (optional)",
  deviation_entity: "Cell voltage deviation entity (optional, else computed)",
  soc_entity: "State of charge entity",
  power_entity: "Power entity (optional, else computed from current x voltage)",
  current_entity: "Current entity",
  pack_voltage_entity: "Pack voltage entity (optional, else summed from cells)",
  charge_mode_entity: "Charge mode entity (Bulk / Absorption / Float)",
  capacity_remaining_entity: "Remaining capacity entity",
  capacity_installed_entity: "Installed capacity entity",
  temperature_entity: "Temperature entity",
  cycles_entity: "Charge cycles entity",
  since_full_charge_entity: "Time since full charge entity (seconds)",
  alarm_entities: "Alarm / fault / status entities",
  layout_mode: "Layout",
  gradient_enabled: "SOC color gradient",
};

const HELPERS: Record<string, string> = {
  alarm_entities:
    'Any entity not in a healthy state shows as a warning banner. Entities whose id or name contains "allow" (e.g. Allow to charge) are treated as inverted - healthy is "on".',
  cell_entities: "Selection order sets the physical cell order shown on the card.",
};

interface ColorField {
  key: "soc_warm_color" | "soc_cool_color" | "flat_cell_color";
  label: string;
  swatches: readonly string[];
  fallback: string;
}

const COLOR_FIELDS: ColorField[] = [
  { key: "soc_warm_color", label: "SOC gradient — warm (low charge)", swatches: SOC_WARM_SWATCHES, fallback: DEFAULT_SOC_WARM_COLOR },
  { key: "soc_cool_color", label: "SOC gradient — cool (high charge)", swatches: SOC_COOL_SWATCHES, fallback: DEFAULT_SOC_COOL_COLOR },
  { key: "flat_cell_color", label: "Flat cell color (gradient off)", swatches: FLAT_CELL_SWATCHES, fallback: DEFAULT_FLAT_CELL_COLOR },
];

@customElement(EDITOR_TAG)
export class BatteryCellCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config?: BatteryCellCardConfig;

  public setConfig(config: BatteryCellCardConfig): void {
    this._config = config;
  }

  static styles = css`
    .colors {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px 4px 4px;
    }
    .color-row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .color-label {
      flex: 1 0 100%;
      font-size: 14px;
      color: var(--secondary-text-color);
    }
    .swatch {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid transparent;
      box-sizing: border-box;
    }
    .swatch.selected {
      border-color: var(--primary-text-color);
    }
    .custom-swatch {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      cursor: pointer;
      border: 1px solid var(--divider-color);
      padding: 0;
      background: none;
      position: relative;
      overflow: hidden;
    }
    .custom-swatch input[type="color"] {
      position: absolute;
      inset: -4px;
      border: none;
      padding: 0;
      cursor: pointer;
    }
  `;

  protected render() {
    if (!this.hass || !this._config) return nothing;

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="colors">
        ${COLOR_FIELDS.map((field) => this._renderColorRow(field))}
      </div>
    `;
  }

  private _renderColorRow(field: ColorField) {
    const current = (this._config?.[field.key] as string | undefined) || field.fallback;
    return html`
      <div class="color-row">
        <div class="color-label">${field.label}</div>
        ${field.swatches.map(
          (hex) => html`
            <div
              class="swatch ${current.toLowerCase() === hex.toLowerCase() ? "selected" : ""}"
              style="background:${hex};"
              title=${hex}
              @click=${() => this._setColor(field.key, hex)}
            ></div>
          `
        )}
        <label class="custom-swatch" style="background:${current};" title="Custom color">
          <input
            type="color"
            .value=${current}
            @change=${(ev: Event) => this._setColor(field.key, (ev.target as HTMLInputElement).value)}
          />
        </label>
      </div>
    `;
  }

  private _setColor(key: ColorField["key"], value: string): void {
    if (!this._config) return;
    const newConfig = { ...this._config, [key]: value };
    fireEvent(this, "config-changed", { config: newConfig });
  }

  private _computeLabel = (schema: { name: string; title?: string }): string => {
    if (schema.title) return schema.title;
    return LABELS[schema.name] ?? schema.name;
  };

  private _computeHelper = (schema: { name: string }): string | undefined => {
    return HELPERS[schema.name];
  };

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    fireEvent(this, "config-changed", { config: ev.detail.value });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_TAG]: BatteryCellCardEditor;
  }
}
