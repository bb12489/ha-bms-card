/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, at = z.ShadowRoot && (z.ShadyCSS === void 0 || z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, lt = Symbol(), St = /* @__PURE__ */ new WeakMap();
let Vt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== lt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (at && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = St.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && St.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const pe = (s) => new Vt(typeof s == "string" ? s : s + "", void 0, lt), Gt = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, n, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[r + 1], s[0]);
  return new Vt(e, s, lt);
}, ue = (s, t) => {
  if (at) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = z.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, s.appendChild(i);
  }
}, Et = at ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return pe(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: _e, defineProperty: ge, getOwnPropertyDescriptor: fe, getOwnPropertyNames: me, getOwnPropertySymbols: $e, getPrototypeOf: be } = Object, q = globalThis, Mt = q.trustedTypes, ye = Mt ? Mt.emptyScript : "", xe = q.reactiveElementPolyfillSupport, O = (s, t) => s, j = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? ye : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, ct = (s, t) => !_e(s, t), Tt = { attribute: !0, type: String, converter: j, reflect: !1, useDefault: !1, hasChanged: ct };
Symbol.metadata ??= Symbol("metadata"), q.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Tt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && ge(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: r } = fe(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: n, set(o) {
      const a = n?.call(this);
      r?.call(this, o), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(O("elementProperties"))) return;
    const t = be(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(O("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(O("properties"))) {
      const e = this.properties, i = [...me(e), ...$e(e)];
      for (const n of i) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, n] of e) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const n = this._$Eu(e, i);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) e.unshift(Et(n));
    } else t !== void 0 && e.push(Et(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ue(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : j).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const r = i.getPropertyOptions(n), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : j;
      this._$Em = n;
      const a = o.fromAttribute(e, r.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, r) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (r = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? ct)(r, e) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: r }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, r] of i) {
        const { wrapped: o } = r, a = this[n];
        o !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, r, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[O("elementProperties")] = /* @__PURE__ */ new Map(), A[O("finalized")] = /* @__PURE__ */ new Map(), xe?.({ ReactiveElement: A }), (q.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = globalThis, kt = (s) => s, V = ht.trustedTypes, Ot = V ? V.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, qt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, Zt = "?" + $, ve = `<${Zt}>`, x = document, R = () => x.createComment(""), H = (s) => s === null || typeof s != "object" && typeof s != "function", dt = Array.isArray, Ae = (s) => dt(s) || typeof s?.[Symbol.iterator] == "function", Y = `[ 	
\f\r]`, k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pt = /-->/g, Rt = />/g, b = RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ht = /'/g, Lt = /"/g, Xt = /^(?:script|style|textarea|title)$/i, we = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), f = we(1), C = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), It = /* @__PURE__ */ new WeakMap(), y = x.createTreeWalker(x, 129);
function Kt(s, t) {
  if (!dt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ot !== void 0 ? Ot.createHTML(t) : t;
}
const Ce = (s, t) => {
  const e = s.length - 1, i = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = k;
  for (let a = 0; a < e; a++) {
    const l = s[a];
    let h, d, c = -1, _ = 0;
    for (; _ < l.length && (o.lastIndex = _, d = o.exec(l), d !== null); ) _ = o.lastIndex, o === k ? d[1] === "!--" ? o = Pt : d[1] !== void 0 ? o = Rt : d[2] !== void 0 ? (Xt.test(d[2]) && (n = RegExp("</" + d[2], "g")), o = b) : d[3] !== void 0 && (o = b) : o === b ? d[0] === ">" ? (o = n ?? k, c = -1) : d[1] === void 0 ? c = -2 : (c = o.lastIndex - d[2].length, h = d[1], o = d[3] === void 0 ? b : d[3] === '"' ? Lt : Ht) : o === Lt || o === Ht ? o = b : o === Pt || o === Rt ? o = k : (o = b, n = void 0);
    const g = o === b && s[a + 1].startsWith("/>") ? " " : "";
    r += o === k ? l + ve : c >= 0 ? (i.push(h), l.slice(0, c) + qt + l.slice(c) + $ + g) : l + $ + (c === -2 ? a : g);
  }
  return [Kt(s, r + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class L {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, l = this.parts, [h, d] = Ce(t, e);
    if (this.el = L.createElement(h, i), y.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = y.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const c of n.getAttributeNames()) if (c.endsWith(qt)) {
          const _ = d[o++], g = n.getAttribute(c).split($), v = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: r, name: v[2], strings: g, ctor: v[1] === "." ? Ee : v[1] === "?" ? Me : v[1] === "@" ? Te : Z }), n.removeAttribute(c);
        } else c.startsWith($) && (l.push({ type: 6, index: r }), n.removeAttribute(c));
        if (Xt.test(n.tagName)) {
          const c = n.textContent.split($), _ = c.length - 1;
          if (_ > 0) {
            n.textContent = V ? V.emptyScript : "";
            for (let g = 0; g < _; g++) n.append(c[g], R()), y.nextNode(), l.push({ type: 2, index: ++r });
            n.append(c[_], R());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Zt) l.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = n.data.indexOf($, c + 1)) !== -1; ) l.push({ type: 7, index: r }), c += $.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = x.createElement("template");
    return i.innerHTML = t, i;
  }
}
function S(s, t, e = s, i) {
  if (t === C) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const r = H(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(s), n._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = S(s, n._$AS(s, t.values), n, i)), t;
}
class Se {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? x).importNode(e, !0);
    y.currentNode = n;
    let r = y.nextNode(), o = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let h;
        l.type === 2 ? h = new I(r, r.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (h = new ke(r, this, t)), this._$AV.push(h), l = i[++a];
      }
      o !== l?.index && (r = y.nextNode(), o++);
    }
    return y.currentNode = x, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class I {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = S(this, t, e), H(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== C && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ae(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && H(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = L.createElement(Kt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const r = new Se(n, this), o = r.u(this.options);
      r.p(e), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = It.get(t.strings);
    return e === void 0 && It.set(t.strings, e = new L(t)), e;
  }
  k(t) {
    dt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const r of t) n === e.length ? e.push(i = new I(this.O(R()), this.O(R()), this, this.options)) : i = e[n], i._$AI(r), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = kt(t).nextSibling;
      kt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Z {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, r) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(t, e = this, i, n) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = S(this, t, e, 0), o = !H(t) || t !== this._$AH && t !== C, o && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++) h = S(this, a[i + l], e, l), h === C && (h = this._$AH[l]), o ||= !H(h) || h !== this._$AH[l], h === p ? t = p : t !== p && (t += (h ?? "") + r[l + 1]), this._$AH[l] = h;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ee extends Z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Me extends Z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Te extends Z {
  constructor(t, e, i, n, r) {
    super(t, e, i, n, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? p) === C) return;
    const i = this._$AH, n = t === p && i !== p || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== p && (i === p || n);
    n && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ke {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const Oe = ht.litHtmlPolyfillSupport;
Oe?.(L, I), (ht.litHtmlVersions ??= []).push("3.3.3");
const Pe = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const r = e?.renderBefore ?? null;
    i._$litPart$ = n = new I(t.insertBefore(R(), r), r, void 0, e ?? {});
  }
  return n._$AI(s), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = globalThis;
let w = class extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Pe(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return C;
  }
};
w._$litElement$ = !0, w.finalized = !0, pt.litElementHydrateSupport?.({ LitElement: w });
const Re = pt.litElementPolyfillSupport;
Re?.({ LitElement: w });
(pt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jt = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const He = { attribute: !0, type: String, converter: j, reflect: !1, hasChanged: ct }, Le = (s = He, t, e) => {
  const { kind: i, metadata: n } = e;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), r.set(e.name, s), i === "accessor") {
    const { name: o } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, l, s, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, s, a), a;
    } };
  }
  if (i === "setter") {
    const { name: o } = e;
    return function(a) {
      const l = this[o];
      t.call(this, a), this.requestUpdate(o, l, s, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function ut(s) {
  return (t, e) => typeof e == "object" ? Le(s, t, e) : ((i, n, r) => {
    const o = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, i), o ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function _t(s) {
  return ut({ ...s, state: !0, attribute: !1 });
}
var Bt, Ut;
(function(s) {
  s.language = "language", s.system = "system", s.comma_decimal = "comma_decimal", s.decimal_comma = "decimal_comma", s.space_comma = "space_comma", s.none = "none";
})(Bt || (Bt = {})), function(s) {
  s.language = "language", s.system = "system", s.am_pm = "12", s.twenty_four = "24";
}(Ut || (Ut = {}));
var st = function(s, t, e, i) {
  i = i || {}, e = e ?? {};
  var n = new Event(t, { bubbles: i.bubbles === void 0 || i.bubbles, cancelable: !!i.cancelable, composed: i.composed === void 0 || i.composed });
  return n.detail = e, s.dispatchEvent(n), n;
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ie = (s) => s.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Be = { CHILD: 2 }, Ue = (s) => (...t) => ({ _$litDirective$: s, values: t });
class Ne {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = (s, t) => {
  const e = s._$AN;
  if (e === void 0) return !1;
  for (const i of e) i._$AO?.(t, !1), P(i, t);
  return !0;
}, G = (s) => {
  let t, e;
  do {
    if ((t = s._$AM) === void 0) break;
    e = t._$AN, e.delete(s), s = t;
  } while (e?.size === 0);
}, Qt = (s) => {
  for (let t; t = s._$AM; s = t) {
    let e = t._$AN;
    if (e === void 0) t._$AN = e = /* @__PURE__ */ new Set();
    else if (e.has(s)) break;
    e.add(s), ze(t);
  }
};
function De(s) {
  this._$AN !== void 0 ? (G(this), this._$AM = s, Qt(this)) : this._$AM = s;
}
function Fe(s, t = !1, e = 0) {
  const i = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (t) if (Array.isArray(i)) for (let r = e; r < i.length; r++) P(i[r], !1), G(i[r]);
  else i != null && (P(i, !1), G(i));
  else P(this, s);
}
const ze = (s) => {
  s.type == Be.CHILD && (s._$AP ??= Fe, s._$AQ ??= De);
};
class We extends Ne {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, e, i) {
    super._$AT(t, e, i), Qt(this), this.isConnected = t._$AU;
  }
  _$AO(t, e = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), e && (P(this, t), G(this));
  }
  setValue(t) {
    if (Ie(this._$Ct)) this._$Ct._$AI(t, this);
    else {
      const e = [...this._$Ct._$AH];
      e[this._$Ci] = t, this._$Ct._$AI(e, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
class je {
  constructor(t, { target: e, config: i, callback: n, skipInitial: r }) {
    this.t = /* @__PURE__ */ new Set(), this.o = !1, this.i = !1, this.h = t, e !== null && this.t.add(e ?? t), this.l = i, this.o = r ?? this.o, this.callback = n, window.ResizeObserver ? (this.u = new ResizeObserver((o) => {
      this.handleChanges(o), this.h.requestUpdate();
    }), t.addController(this)) : console.warn("ResizeController error: browser does not support ResizeObserver.");
  }
  handleChanges(t) {
    this.value = this.callback?.(t, this.u);
  }
  hostConnected() {
    for (const t of this.t) this.observe(t);
  }
  hostDisconnected() {
    this.disconnect();
  }
  async hostUpdated() {
    !this.o && this.i && this.handleChanges([]), this.i = !1;
  }
  observe(t) {
    this.t.add(t), this.u.observe(t, this.l), this.i = !0, this.h.requestUpdate();
  }
  unobserve(t) {
    this.t.delete(t), this.u.unobserve(t);
  }
  disconnect() {
    this.u.disconnect();
  }
  target(t) {
    return Ve(this, t);
  }
}
const Ve = Ue(class extends We {
  constructor() {
    super(...arguments), this.observing = !1;
  }
  render(s, t) {
  }
  update(s, [t, e]) {
    this.controller = t, this.part = s, this.observe = e, e === !1 ? (t.unobserve(s.element), this.observing = !1) : this.observing === !1 && (t.observe(s.element), this.observing = !0);
  }
  disconnected() {
    this.controller?.unobserve(this.part.element), this.observing = !1;
  }
  reconnected() {
    this.observe !== !1 && this.observing === !1 && (this.controller?.observe(this.part.element), this.observing = !0);
  }
}), gt = "ha-bms-card", Ge = "HA BMS Card", Yt = "ha-bms-card-editor", Nt = 2.9, qe = 3.65, te = 3, ee = 3.55, Ze = [244, 67, 54], Xe = [255, 152, 0], Ke = "#f44336", Je = "#ff9800", Qe = "#26a69a", Ye = ["Bulk", "Absorption", "Float"], ts = {
  Bulk: "#ff9800",
  Absorption: "#42a5f5",
  Float: "#4caf50"
}, se = {
  16: { barW: 20, gap: 3, barH: 72, font: 8, badgeFont: 7, labelFont: 7.5 },
  8: { barW: 34, gap: 8, barH: 94, font: 11, badgeFont: 9, labelFont: 9.5 },
  4: { barW: 54, gap: 16, barH: 116, font: 13, badgeFont: 11, labelFont: 11 },
  2: { barW: 84, gap: 24, barH: 140, font: 15, badgeFont: 12, labelFont: 12.5 }
}, Dt = Object.keys(se).map(Number).sort((s, t) => s - t);
function it(s) {
  let t = Dt[0], e = Math.abs(s - t);
  for (const i of Dt) {
    const n = Math.abs(s - i);
    n < e && (t = i, e = n);
  }
  return se[t];
}
const ie = "#FF7043", ne = "#66BB6A", re = "#66BB6A", es = ["#FFB74D", "#FFA726", "#FF7043", "#EC407A"], ss = ["#26C6DA", "#42A5F5", "#66BB6A", "#26A69A"], is = ["#42A5F5", "#26A69A", "#7E57C2", "#66BB6A"], ns = ["off", "0", "no alarm", "ok", "normal", "false"];
function Ft(s) {
  return (s - Nt) / (qe - Nt) * 100;
}
function oe(s, t, e) {
  return s + (t - s) * e;
}
function nt(s) {
  return s <= te ? "low" : s >= ee ? "high" : "ok";
}
function tt(s) {
  const t = s.replace("#", ""), e = [0, 2, 4].map((i) => parseInt(t.substring(i, i + 2), 16));
  return [e[0] || 0, e[1] || 0, e[2] || 0];
}
function W(s) {
  return `rgb(${s[0]},${s[1]},${s[2]})`;
}
function et(s, t) {
  return `rgba(${s[0]},${s[1]},${s[2]},${t})`;
}
function ae(s, t, e) {
  const i = Math.max(0, Math.min(100, s)) / 100;
  return [0, 1, 2].map((n) => Math.round(oe(t[n], e[n], i)));
}
function rs(s, t) {
  return s.map((e) => Math.max(0, Math.min(255, Math.round(e * t))));
}
function os(s, t, e, i, n, r, o) {
  const a = nt(s);
  if (a === "low") return W(Ze);
  if (a === "high") return W(Xe);
  const l = i ? ae(e, n, r) : o, h = Math.max(0, Math.min(1, (t - 33) / 44)), d = oe(0.88, 1.1, h);
  return W(rs(l, d));
}
const zt = 14, as = 100, Wt = it(8), ls = 8 * Wt.barW + 7 * Wt.gap;
function cs(s, t) {
  return t === "single-row" ? s : t === "two-row" ? Math.max(1, Math.ceil(s / 2)) : null;
}
function jt(s, t, e) {
  const i = cs(s, e);
  let n = i ?? s;
  if (i === null && t > 0) {
    n = 1;
    for (let a = s; a >= 1; a--) {
      const l = it(a).gap;
      if ((t - (a - 1) * l) / a >= zt) {
        n = a;
        break;
      }
    }
  }
  n = Math.max(1, Math.min(n, s));
  const r = it(n);
  let o = r.barW;
  if (t > 0) {
    const a = (t - (n - 1) * r.gap) / n;
    o = Math.max(zt, Math.min(as, a));
  }
  return {
    ...r,
    barW: o,
    perRow: n,
    rowWidth: n * o + (n - 1) * r.gap
  };
}
function hs(s) {
  return `${s.toFixed(2)}V`;
}
function ds(s) {
  return `${s.toFixed(3)} V`;
}
function ps(s) {
  return s.toFixed(3);
}
function us(s) {
  const t = Math.max(0, s), e = Math.floor(t / 86400), i = Math.floor(t % 86400 / 3600);
  return `${e}d ${i}h`;
}
function _s(s) {
  const t = Math.round(s);
  return `${t >= 0 ? "+" : ""}${t} mV`;
}
var gs = Object.defineProperty, fs = Object.getOwnPropertyDescriptor, ft = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? fs(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && gs(t, e, n), n;
};
const ms = [
  { name: "name", selector: { text: {} } },
  {
    type: "expandable",
    flatten: !0,
    name: "cells",
    title: "Cell voltages",
    expanded: !0,
    schema: [
      {
        name: "cell_entities",
        required: !0,
        selector: { entity: { multiple: !0, domain: "sensor" } }
      },
      { name: "min_cell_id_entity", selector: { entity: {} } },
      { name: "max_cell_id_entity", selector: { entity: {} } },
      { name: "deviation_entity", selector: { entity: { domain: "sensor" } } }
    ]
  },
  {
    type: "expandable",
    flatten: !0,
    name: "pack",
    title: "Pack state",
    expanded: !0,
    schema: [
      { name: "soc_entity", required: !0, selector: { entity: { domain: "sensor" } } },
      { name: "power_entity", selector: { entity: { domain: "sensor" } } },
      { name: "current_entity", selector: { entity: { domain: "sensor" } } },
      { name: "pack_voltage_entity", selector: { entity: { domain: "sensor" } } },
      { name: "charge_mode_entity", selector: { entity: { domain: "sensor" } } }
    ]
  },
  {
    type: "expandable",
    flatten: !0,
    name: "health",
    title: "Capacity & health",
    schema: [
      { name: "capacity_remaining_entity", selector: { entity: { domain: "sensor" } } },
      { name: "capacity_installed_entity", selector: { entity: { domain: "sensor" } } },
      { name: "temperature_entity", selector: { entity: { domain: "sensor" } } },
      { name: "cycles_entity", selector: { entity: { domain: "sensor" } } },
      { name: "since_full_charge_entity", selector: { entity: { domain: "sensor" } } }
    ]
  },
  {
    type: "expandable",
    flatten: !0,
    name: "alarms",
    title: "Alarms & status",
    schema: [
      {
        name: "alarm_entities",
        selector: { entity: { multiple: !0 } }
      }
    ]
  },
  {
    type: "expandable",
    flatten: !0,
    name: "layout",
    title: "Layout",
    schema: [
      {
        name: "layout_mode",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "auto", label: "Auto (fit to card width)" },
              { value: "single-row", label: "Force single row" },
              { value: "two-row", label: "Force two rows" }
            ]
          }
        }
      },
      { name: "gradient_enabled", selector: { boolean: {} } }
    ]
  }
], $s = {
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
  gradient_enabled: "SOC color gradient"
}, bs = {
  alarm_entities: 'Any entity not in a healthy state shows as a warning banner. Entities whose id or name contains "allow" (e.g. Allow to charge) are treated as inverted - healthy is "on".',
  cell_entities: "Selection order sets the physical cell order shown on the card.",
  layout_mode: `Auto reflows the cell bars to fit the card's actual rendered width as you resize it. "Force single/two row" always uses that many rows regardless of width.`
}, ys = [
  { key: "soc_warm_color", label: "SOC gradient — warm (low charge)", swatches: es, fallback: ie },
  { key: "soc_cool_color", label: "SOC gradient — cool (high charge)", swatches: ss, fallback: ne },
  { key: "flat_cell_color", label: "Flat cell color (gradient off)", swatches: is, fallback: re }
];
let E = class extends w {
  constructor() {
    super(...arguments), this._computeLabel = (s) => s.title ? s.title : $s[s.name] ?? s.name, this._computeHelper = (s) => bs[s.name];
  }
  setConfig(s) {
    this._config = s;
  }
  render() {
    return !this.hass || !this._config ? p : f`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ms}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="colors">
        ${ys.map((s) => this._renderColorRow(s))}
      </div>
    `;
  }
  _renderColorRow(s) {
    const t = this._config?.[s.key] || s.fallback;
    return f`
      <div class="color-row">
        <div class="color-label">${s.label}</div>
        ${s.swatches.map(
      (e) => f`
            <div
              class="swatch ${t.toLowerCase() === e.toLowerCase() ? "selected" : ""}"
              style="background:${e};"
              title=${e}
              @click=${() => this._setColor(s.key, e)}
            ></div>
          `
    )}
        <label class="custom-swatch" style="background:${t};" title="Custom color">
          <input
            type="color"
            .value=${t}
            @change=${(e) => this._setColor(s.key, e.target.value)}
          />
        </label>
      </div>
    `;
  }
  _setColor(s, t) {
    if (!this._config) return;
    const e = { ...this._config, [s]: t };
    st(this, "config-changed", { config: e });
  }
  _valueChanged(s) {
    s.stopPropagation(), st(this, "config-changed", { config: s.detail.value });
  }
};
E.styles = Gt`
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
ft([
  ut({ attribute: !1 })
], E.prototype, "hass", 2);
ft([
  _t()
], E.prototype, "_config", 2);
E = ft([
  Jt(Yt)
], E);
const xs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get HaBmsCardEditor() {
    return E;
  }
}, Symbol.toStringTag, { value: "Module" }));
var vs = Object.defineProperty, As = Object.getOwnPropertyDescriptor, X = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? As(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && vs(t, e, n), n;
};
const rt = 32;
let M = class extends w {
  constructor() {
    super(...arguments), this._selectedCellIndex = null, this._resizeController = new je(this, {
      callback: (s) => s[0]?.contentRect.width ?? 0
    });
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => xs), document.createElement(Yt);
  }
  static getStubConfig() {
    return {
      type: `custom:${gt}`,
      cell_entities: [],
      soc_entity: "",
      layout_mode: "auto",
      gradient_enabled: !0
    };
  }
  setConfig(s) {
    if (!s || typeof s != "object")
      throw new Error("Invalid configuration");
    if (s.cell_entities !== void 0 && !Array.isArray(s.cell_entities))
      throw new Error("ha-bms-card: `cell_entities` must be a list of entity ids");
    this._config = { layout_mode: "auto", gradient_enabled: !0, ...s }, this._selectedCellIndex = null;
  }
  get _measuredWidth() {
    return this._resizeController.value ?? 0;
  }
  getCardSize() {
    if (!this._config?.cell_entities?.length || !this._config?.soc_entity) return 2;
    const s = this._config.cell_entities.length, t = jt(s, this._measuredWidth - rt, this._config.layout_mode ?? "auto");
    let i = 4 + Math.ceil(s / t.perRow);
    return this._alarmMessages().length && (i += 1), this._selectedCellIndex !== null && (i += 1), i;
  }
  getGridOptions() {
    let t = 5 + ((this._config?.cell_entities?.length ?? 8) > 8 ? 1 : 0);
    return this._alarmMessages().length && (t += 1), this._selectedCellIndex !== null && (t += 1), { columns: 12, rows: t, min_columns: 4, min_rows: 3 };
  }
  render() {
    if (!this._config || !this.hass) return p;
    if (!this._config.cell_entities?.length || !this._config.soc_entity)
      return f`
        <ha-card>
          <div class="setup-hint">
            <div class="setup-hint-title">HA BMS Card isn't configured yet</div>
            <div>
              Edit this card and pick at least one cell voltage entity and a
              state-of-charge entity to get started.
            </div>
          </div>
        </ha-card>
      `;
    const s = this._config, t = !!this.hass.themes?.darkMode, e = this._themeTokens(t), i = this._cellVoltages(), n = i.length, r = this._num(s.soc_entity) ?? 0, o = s.gradient_enabled ?? !0, a = tt(s.soc_warm_color || ie), l = tt(s.soc_cool_color || ne), h = tt(s.flat_cell_color || re), d = s.layout_mode ?? "auto", c = jt(n, this._measuredWidth - rt, d), _ = c.rowWidth, { minIdx: g, maxIdx: v } = this._minMaxIdx(i), le = this._average(i), mt = i.map((u, m) => {
      const J = m === g, Q = m === v;
      return u === null ? {
        index: m,
        label: `C${m + 1}`,
        voltage: NaN,
        voltageLabel: "--",
        heightPct: 0,
        color: e.barTrackBg,
        badge: "",
        badgeColor: "transparent",
        isMin: !1,
        isMax: !1
      } : {
        index: m,
        label: `C${m + 1}`,
        voltage: u,
        voltageLabel: hs(u),
        heightPct: Math.max(0, Math.min(100, Ft(u))),
        color: os(u, Ft(u), r, o, a, l, h),
        badge: J ? "▼" : Q ? "▲" : "",
        badgeColor: J ? Ke : Q ? Je : "transparent",
        isMin: J,
        isMax: Q
      };
    }), B = o ? ae(r, a, l) : h, K = W(B), U = this._alarmMessages(), ce = U.length > 0, N = i.filter((u) => u !== null), $t = this._num(s.pack_voltage_entity) ?? N.reduce((u, m) => u + m, 0), D = this._num(s.current_entity), bt = this._num(s.power_entity) ?? (D !== null ? D * $t : null), he = this._num(s.deviation_entity) ?? (N.length ? Math.max(...N) - Math.min(...N) : 0), yt = this._num(s.capacity_remaining_entity), xt = this._num(s.capacity_installed_entity), vt = this._num(s.cycles_entity), At = this._num(s.since_full_charge_entity), wt = this._state(s.temperature_entity), de = s.temperature_entity ? this.hass.states[s.temperature_entity]?.attributes?.unit_of_measurement ?? "" : "", T = this._state(s.charge_mode_entity), Ct = T && Ye.includes(T) ? ts[T] : "#9e9e9e", F = this._expandedDetail(mt, le);
    return f`
      <ha-card
        style="background:${e.cardBg};color:${e.primaryText};box-shadow:${e.cardShadow};"
      >
        <div
          class="header"
          style="background:linear-gradient(180deg, ${et(B, e.socHeaderTintAlpha)}, rgba(0,0,0,0));"
        >
          <div class="icon-badge" style="background:${et(B, e.socIconBgAlpha)};">
            <div class="battery-glyph" style="border-color:${K};">
              <span style="background:${K};"></span>
            </div>
          </div>
          <div class="title-block">
            <div class="title">${s.name || "Battery Bank"}</div>
            <div class="subtitle" style="color:${e.subtitleText};">LiFePO4 · ${n}S</div>
          </div>
          <div class="soc-chip" style="background:${et(B, e.socChipBgAlpha)};color:${K};">
            ${Math.round(r)}%
          </div>
          <div class="kebab" style="color:${e.kebabText};" @click=${this._handleMoreInfo}>⋮</div>
        </div>

        <div class="badges-row">
          <div class="pill" style="background:${e.powerPillBg};color:${e.primaryText};">
            ⚡ ${bt !== null ? bt.toFixed(1) : "--"} W
          </div>
          ${T ? f`<div
                class="pill"
                style="background:${Ct}${e.chargeModeAlpha};color:${Ct};"
              >
                ${T}
              </div>` : p}
        </div>

        ${ce ? f`<div
              class="alarm-banner"
              style="background:${e.alarmBg};border:1px solid ${e.alarmBorder};color:${e.alarmText};"
            >
              ⚠ ${U[0]}${U.length > 1 ? ` (+${U.length - 1} more)` : ""}
            </div>` : p}

        <div class="cells-wrap">
          <div class="cells-row" style="gap:${c.gap}px;width:${_}px;">
            ${mt.map(
      (u) => f`
                <div class="cell" style="width:${c.barW}px;" @click=${() => this._toggleCell(u.index)}>
                  <div
                    class="cell-voltage"
                    style="font-size:${c.font}px;height:${c.font}px;color:${e.primaryText};"
                  >
                    ${u.voltageLabel}
                  </div>
                  <div
                    class="cell-badge"
                    style="font-size:${c.badgeFont}px;height:${c.badgeFont}px;color:${u.badgeColor};"
                  >
                    ${u.badge}
                  </div>
                  <div
                    class="cell-track"
                    style="width:${c.barW}px;height:${c.barH}px;background:${e.barTrackBg};border:${this._selectedCellIndex === u.index ? `2px solid ${Qe}` : `1px solid ${e.barTrackBorder}`};"
                  >
                    <div class="cell-fill" style="height:${u.heightPct}%;background:${u.color};"></div>
                  </div>
                  <div class="cell-label" style="font-size:${c.labelFont}px;color:${e.cellIndexText};">
                    ${u.label}
                  </div>
                </div>
              `
    )}
          </div>
        </div>

        ${F ? f`<div
              class="expanded-panel"
              style="background:${e.expandedBg};border:1px solid ${e.expandedBorder};"
            >
              <div class="expanded-title">${F.title}</div>
              <div style="color:${e.expandedSecondaryText};">${F.line1}</div>
              <div style="color:${e.expandedSecondaryText};">${F.line2}</div>
            </div>` : p}

        <div class="divider" style="background:${e.hairlineMain};"></div>

        <div class="stats-grid">
          ${this._statRow("Pack voltage", `${$t.toFixed(2)} V`, e)}
          ${this._statRow("Deviation", `${ps(he)} V`, e)}
          ${this._statRow("Current", D !== null ? `${D.toFixed(1)} A` : "--", e)}
          ${this._statRow("Remaining", yt !== null ? `${yt.toFixed(1)} Ah` : "--", e)}
          ${this._statRow("Temp", wt !== null ? `${wt}${de}` : "--", e)}
          ${this._statRow("Installed", xt !== null ? `${xt.toFixed(1)} Ah` : "--", e)}
          ${this._statRow("Cycles", vt !== null ? `${Math.round(vt)}` : "--", e, !0)}
          ${this._statRow(
      "Since full charge",
      At !== null ? us(At) : "--",
      e,
      !0
    )}
        </div>
      </ha-card>
    `;
  }
  _statRow(s, t, e, i = !1) {
    return f`<div
      class="stat-row"
      style="${i ? "" : `border-bottom:1px solid ${e.hairlineStat};`}"
    >
      <span style="color:${e.statLabelText};">${s}</span>
      <b>${t}</b>
    </div>`;
  }
  _themeTokens(s) {
    return s ? {
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
      socHeaderTintAlpha: 0.16
    } : {
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
      socHeaderTintAlpha: 0.1
    };
  }
  _num(s) {
    if (!s || !this.hass) return null;
    const t = this.hass.states[s];
    if (!t || t.state === "unknown" || t.state === "unavailable") return null;
    const e = parseFloat(t.state);
    return Number.isFinite(e) ? e : null;
  }
  _state(s) {
    if (!s || !this.hass) return null;
    const t = this.hass.states[s];
    return !t || t.state === "unknown" || t.state === "unavailable" ? null : t.state;
  }
  _friendlyName(s) {
    return this.hass?.states[s]?.attributes?.friendly_name ?? s;
  }
  _cellVoltages() {
    return (this._config.cell_entities ?? []).map((s) => this._num(s));
  }
  _minMaxIdx(s) {
    const t = this._config;
    let e = -1, i = -1;
    const n = t.min_cell_id_entity ? this._num(t.min_cell_id_entity) : null, r = t.max_cell_id_entity ? this._num(t.max_cell_id_entity) : null;
    if (n !== null && n >= 1 && n <= s.length && (e = Math.round(n) - 1), r !== null && r >= 1 && r <= s.length && (i = Math.round(r) - 1), e === -1 || i === -1) {
      let o = 1 / 0, a = -1 / 0, l = -1, h = -1;
      s.forEach((d, c) => {
        d !== null && (d < o && (o = d, l = c), d > a && (a = d, h = c));
      }), e === -1 && (e = l), i === -1 && (i = h);
    }
    return { minIdx: e, maxIdx: i };
  }
  _average(s) {
    const t = s.filter((e) => e !== null);
    return t.length ? t.reduce((e, i) => e + i, 0) / t.length : 0;
  }
  _normalizeAlarm(s) {
    if (typeof s == "string") {
      const t = this._friendlyName(s), e = /allow/i.test(s) || /allow/i.test(t);
      return { entity: s, invert: e };
    }
    return s;
  }
  _isAlarmProblem(s) {
    const t = this._state(s.entity);
    if (t === null) return !1;
    const e = t.toLowerCase();
    return s.invert ? e !== "on" : !(s.ok_states ?? ns).map((n) => n.toLowerCase()).includes(e);
  }
  _alarmMessages() {
    if (!this._config || !this.hass) return [];
    const s = [], t = this._cellVoltages(), e = t.findIndex((n) => n !== null && nt(n) === "high"), i = t.findIndex((n) => n !== null && nt(n) === "low");
    e !== -1 && s.push(`High cell voltage — C${e + 1} exceeds ${ee.toFixed(2)} V`), i !== -1 && s.push(`Low cell voltage — C${i + 1} at or below ${te.toFixed(2)} V`);
    for (const n of this._config.alarm_entities ?? []) {
      const r = this._normalizeAlarm(n);
      if (this._isAlarmProblem(r)) {
        const o = r.name ?? this._friendlyName(r.entity), a = this._state(r.entity);
        s.push(`${o}${a ? `: ${a}` : ""}`);
      }
    }
    return s;
  }
  _expandedDetail(s, t) {
    if (this._selectedCellIndex === null) return null;
    const e = s[this._selectedCellIndex];
    if (!e || Number.isNaN(e.voltage)) return null;
    const i = (e.voltage - t) * 1e3, n = e.isMin ? "Lowest cell in pack" : e.isMax ? "Highest cell in pack — actively balancing" : "Within normal range";
    return {
      title: `Cell ${e.index + 1} · ${ds(e.voltage)}`,
      line1: `${_s(i)} from pack average`,
      line2: n
    };
  }
  _toggleCell(s) {
    this._selectedCellIndex = this._selectedCellIndex === s ? null : s;
  }
  _handleMoreInfo(s) {
    s.stopPropagation();
    const t = this._config.soc_entity;
    t && st(this, "hass-more-info", { entityId: t });
  }
};
M.styles = Gt`
    :host {
      display: block;
      min-width: ${ls + rt}px;
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
      flex-shrink: 0;
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
    .setup-hint {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 13px;
      color: var(--secondary-text-color, rgba(0, 0, 0, 0.6));
    }
    .setup-hint-title {
      font-size: 15px;
      font-weight: 500;
      color: var(--primary-text-color, inherit);
    }
  `;
X([
  ut({ attribute: !1 })
], M.prototype, "hass", 2);
X([
  _t()
], M.prototype, "_config", 2);
X([
  _t()
], M.prototype, "_selectedCellIndex", 2);
M = X([
  Jt(gt)
], M);
const ot = window;
ot.customCards = ot.customCards || [];
ot.customCards.push({
  type: gt,
  name: Ge,
  description: "Per-cell voltage, balancing, SOC, power, and health monitoring for a LiFePO4 battery pack.",
  preview: !0,
  documentationURL: "https://github.com/bb12489/ha-bms-card"
});
export {
  M as HaBmsCard
};
