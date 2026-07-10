/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, lt = z.ShadowRoot && (z.ShadyCSS === void 0 || z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ct = Symbol(), Et = /* @__PURE__ */ new WeakMap();
let Gt = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== ct) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (lt && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = Et.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Et.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const _e = (e) => new Gt(typeof e == "string" ? e : e + "", void 0, ct), qt = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, n, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new Gt(s, e, ct);
}, ge = (e, t) => {
  if (lt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), n = z.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = s.cssText, e.appendChild(i);
  }
}, Mt = lt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return _e(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: fe, defineProperty: me, getOwnPropertyDescriptor: $e, getOwnPropertyNames: ye, getOwnPropertySymbols: be, getPrototypeOf: xe } = Object, q = globalThis, Tt = q.trustedTypes, ve = Tt ? Tt.emptyScript : "", Ae = q.reactiveElementPolyfillSupport, k = (e, t) => e, j = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ve : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let s = e;
  switch (t) {
    case Boolean:
      s = e !== null;
      break;
    case Number:
      s = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(e);
      } catch {
        s = null;
      }
  }
  return s;
} }, ht = (e, t) => !fe(e, t), kt = { attribute: !0, type: String, converter: j, reflect: !1, useDefault: !1, hasChanged: ht };
Symbol.metadata ??= Symbol("metadata"), q.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = kt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, s);
      n !== void 0 && me(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: n, set: o } = $e(this.prototype, t) ?? { get() {
      return this[s];
    }, set(r) {
      this[s] = r;
    } };
    return { get: n, set(r) {
      const l = n?.call(this);
      o?.call(this, r), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? kt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(k("elementProperties"))) return;
    const t = xe(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
      const s = this.properties, i = [...ye(s), ...be(s)];
      for (const n of i) this.createProperty(n, s[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [i, n] of s) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const n = this._$Eu(s, i);
      n !== void 0 && this._$Eh.set(n, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) s.unshift(Mt(n));
    } else t !== void 0 && s.push(Mt(t));
    return s;
  }
  static _$Eu(t, s) {
    const i = s.attribute;
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
    const t = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const i of s.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ge(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, s, i) {
    this._$AK(t, i);
  }
  _$ET(t, s) {
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : j).toAttribute(s, i.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = i.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : j;
      this._$Em = n;
      const l = r.fromAttribute(s, o.type);
      this[n] = l ?? this._$Ej?.get(n) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, n = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? ht)(o, s) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: i, reflect: n, wrapped: o }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? s ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
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
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: r } = o, l = this[n];
        r !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, o, l);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(s)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((s) => s.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach((s) => this._$ET(s, this[s])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[k("elementProperties")] = /* @__PURE__ */ new Map(), A[k("finalized")] = /* @__PURE__ */ new Map(), Ae?.({ ReactiveElement: A }), (q.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt = globalThis, Ot = (e) => e, V = dt.trustedTypes, Pt = V ? V.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Zt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, Xt = "?" + $, we = `<${Xt}>`, x = document, P = () => x.createComment(""), R = (e) => e === null || typeof e != "object" && typeof e != "function", pt = Array.isArray, Ce = (e) => pt(e) || typeof e?.[Symbol.iterator] == "function", tt = `[ 	
\f\r]`, T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Rt = /-->/g, Ht = />/g, y = RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Lt = /'/g, Bt = /"/g, Kt = /^(?:script|style|textarea|title)$/i, Se = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), f = Se(1), C = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), It = /* @__PURE__ */ new WeakMap(), b = x.createTreeWalker(x, 129);
function Jt(e, t) {
  if (!pt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pt !== void 0 ? Pt.createHTML(t) : t;
}
const Ee = (e, t) => {
  const s = e.length - 1, i = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = T;
  for (let l = 0; l < s; l++) {
    const a = e[l];
    let h, d, c = -1, _ = 0;
    for (; _ < a.length && (r.lastIndex = _, d = r.exec(a), d !== null); ) _ = r.lastIndex, r === T ? d[1] === "!--" ? r = Rt : d[1] !== void 0 ? r = Ht : d[2] !== void 0 ? (Kt.test(d[2]) && (n = RegExp("</" + d[2], "g")), r = y) : d[3] !== void 0 && (r = y) : r === y ? d[0] === ">" ? (r = n ?? T, c = -1) : d[1] === void 0 ? c = -2 : (c = r.lastIndex - d[2].length, h = d[1], r = d[3] === void 0 ? y : d[3] === '"' ? Bt : Lt) : r === Bt || r === Lt ? r = y : r === Rt || r === Ht ? r = T : (r = y, n = void 0);
    const g = r === y && e[l + 1].startsWith("/>") ? " " : "";
    o += r === T ? a + we : c >= 0 ? (i.push(h), a.slice(0, c) + Zt + a.slice(c) + $ + g) : a + $ + (c === -2 ? l : g);
  }
  return [Jt(e, o + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class H {
  constructor({ strings: t, _$litType$: s }, i) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const l = t.length - 1, a = this.parts, [h, d] = Ee(t, s);
    if (this.el = H.createElement(h, i), b.currentNode = this.el.content, s === 2 || s === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = b.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const c of n.getAttributeNames()) if (c.endsWith(Zt)) {
          const _ = d[r++], g = n.getAttribute(c).split($), v = /([.?@])?(.*)/.exec(_);
          a.push({ type: 1, index: o, name: v[2], strings: g, ctor: v[1] === "." ? Te : v[1] === "?" ? ke : v[1] === "@" ? Oe : Z }), n.removeAttribute(c);
        } else c.startsWith($) && (a.push({ type: 6, index: o }), n.removeAttribute(c));
        if (Kt.test(n.tagName)) {
          const c = n.textContent.split($), _ = c.length - 1;
          if (_ > 0) {
            n.textContent = V ? V.emptyScript : "";
            for (let g = 0; g < _; g++) n.append(c[g], P()), b.nextNode(), a.push({ type: 2, index: ++o });
            n.append(c[_], P());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Xt) a.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = n.data.indexOf($, c + 1)) !== -1; ) a.push({ type: 7, index: o }), c += $.length - 1;
      }
      o++;
    }
  }
  static createElement(t, s) {
    const i = x.createElement("template");
    return i.innerHTML = t, i;
  }
}
function S(e, t, s = e, i) {
  if (t === C) return t;
  let n = i !== void 0 ? s._$Co?.[i] : s._$Cl;
  const o = R(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, s, i)), i !== void 0 ? (s._$Co ??= [])[i] = n : s._$Cl = n), n !== void 0 && (t = S(e, n._$AS(e, t.values), n, i)), t;
}
class Me {
  constructor(t, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: s }, parts: i } = this._$AD, n = (t?.creationScope ?? x).importNode(s, !0);
    b.currentNode = n;
    let o = b.nextNode(), r = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let h;
        a.type === 2 ? h = new L(o, o.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (h = new Pe(o, this, t)), this._$AV.push(h), a = i[++l];
      }
      r !== a?.index && (o = b.nextNode(), r++);
    }
    return b.currentNode = x, n;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class L {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, i, n) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && t?.nodeType === 11 && (t = s.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, s = this) {
    t = S(this, t, s), R(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== C && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ce(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && R(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = H.createElement(Jt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(s);
    else {
      const o = new Me(n, this), r = o.u(this.options);
      o.p(s), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let s = It.get(t.strings);
    return s === void 0 && It.set(t.strings, s = new H(t)), s;
  }
  k(t) {
    pt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, n = 0;
    for (const o of t) n === s.length ? s.push(i = new L(this.O(P()), this.O(P()), this, this.options)) : i = s[n], i._$AI(o), n++;
    n < s.length && (this._$AR(i && i._$AB.nextSibling, n), s.length = n);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const i = Ot(t).nextSibling;
      Ot(t).remove(), t = i;
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
  constructor(t, s, i, n, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = s, this._$AM = n, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, s = this, i, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = S(this, t, s, 0), r = !R(t) || t !== this._$AH && t !== C, r && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = o[0], a = 0; a < o.length - 1; a++) h = S(this, l[i + a], s, a), h === C && (h = this._$AH[a]), r ||= !R(h) || h !== this._$AH[a], h === u ? t = u : t !== u && (t += (h ?? "") + o[a + 1]), this._$AH[a] = h;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Te extends Z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class ke extends Z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Oe extends Z {
  constructor(t, s, i, n, o) {
    super(t, s, i, n, o), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = S(this, t, s, 0) ?? u) === C) return;
    const i = this._$AH, n = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== u && (i === u || n);
    n && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Pe {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const Re = dt.litHtmlPolyfillSupport;
Re?.(H, L), (dt.litHtmlVersions ??= []).push("3.3.3");
const He = (e, t, s) => {
  const i = s?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const o = s?.renderBefore ?? null;
    i._$litPart$ = n = new L(t.insertBefore(P(), o), o, void 0, s ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = globalThis;
let w = class extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = He(s, this.renderRoot, this.renderOptions);
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
w._$litElement$ = !0, w.finalized = !0, ut.litElementHydrateSupport?.({ LitElement: w });
const Le = ut.litElementPolyfillSupport;
Le?.({ LitElement: w });
(ut.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qt = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Be = { attribute: !0, type: String, converter: j, reflect: !1, hasChanged: ht }, Ie = (e = Be, t, s) => {
  const { kind: i, metadata: n } = s;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(s.name, e), i === "accessor") {
    const { name: r } = s;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(r, a, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, e, l), l;
    } };
  }
  if (i === "setter") {
    const { name: r } = s;
    return function(l) {
      const a = this[r];
      t.call(this, l), this.requestUpdate(r, a, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function _t(e) {
  return (t, s) => typeof s == "object" ? Ie(e, t, s) : ((i, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function gt(e) {
  return _t({ ...e, state: !0, attribute: !1 });
}
var Ut, Nt;
(function(e) {
  e.language = "language", e.system = "system", e.comma_decimal = "comma_decimal", e.decimal_comma = "decimal_comma", e.space_comma = "space_comma", e.none = "none";
})(Ut || (Ut = {})), function(e) {
  e.language = "language", e.system = "system", e.am_pm = "12", e.twenty_four = "24";
}(Nt || (Nt = {}));
var it = function(e, t, s, i) {
  i = i || {}, s = s ?? {};
  var n = new Event(t, { bubbles: i.bubbles === void 0 || i.bubbles, cancelable: !!i.cancelable, composed: i.composed === void 0 || i.composed });
  return n.detail = s, e.dispatchEvent(n), n;
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ue = (e) => e.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ne = { CHILD: 2 }, De = (e) => (...t) => ({ _$litDirective$: e, values: t });
class Fe {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, s, i) {
    this._$Ct = t, this._$AM = s, this._$Ci = i;
  }
  _$AS(t, s) {
    return this.update(t, s);
  }
  update(t, s) {
    return this.render(...s);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = (e, t) => {
  const s = e._$AN;
  if (s === void 0) return !1;
  for (const i of s) i._$AO?.(t, !1), O(i, t);
  return !0;
}, G = (e) => {
  let t, s;
  do {
    if ((t = e._$AM) === void 0) break;
    s = t._$AN, s.delete(e), e = t;
  } while (s?.size === 0);
}, Yt = (e) => {
  for (let t; t = e._$AM; e = t) {
    let s = t._$AN;
    if (s === void 0) t._$AN = s = /* @__PURE__ */ new Set();
    else if (s.has(e)) break;
    s.add(e), je(t);
  }
};
function ze(e) {
  this._$AN !== void 0 ? (G(this), this._$AM = e, Yt(this)) : this._$AM = e;
}
function We(e, t = !1, s = 0) {
  const i = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (t) if (Array.isArray(i)) for (let o = s; o < i.length; o++) O(i[o], !1), G(i[o]);
  else i != null && (O(i, !1), G(i));
  else O(this, e);
}
const je = (e) => {
  e.type == Ne.CHILD && (e._$AP ??= We, e._$AQ ??= ze);
};
class Ve extends Fe {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, s, i) {
    super._$AT(t, s, i), Yt(this), this.isConnected = t._$AU;
  }
  _$AO(t, s = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), s && (O(this, t), G(this));
  }
  setValue(t) {
    if (Ue(this._$Ct)) this._$Ct._$AI(t, this);
    else {
      const s = [...this._$Ct._$AH];
      s[this._$Ci] = t, this._$Ct._$AI(s, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
class Ge {
  constructor(t, { target: s, config: i, callback: n, skipInitial: o }) {
    this.t = /* @__PURE__ */ new Set(), this.o = !1, this.i = !1, this.h = t, s !== null && this.t.add(s ?? t), this.l = i, this.o = o ?? this.o, this.callback = n, window.ResizeObserver ? (this.u = new ResizeObserver((r) => {
      this.handleChanges(r), this.h.requestUpdate();
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
    return qe(this, t);
  }
}
const qe = De(class extends Ve {
  constructor() {
    super(...arguments), this.observing = !1;
  }
  render(e, t) {
  }
  update(e, [t, s]) {
    this.controller = t, this.part = e, this.observe = s, s === !1 ? (t.unobserve(e.element), this.observing = !1) : this.observing === !1 && (t.observe(e.element), this.observing = !0);
  }
  disconnected() {
    this.controller?.unobserve(this.part.element), this.observing = !1;
  }
  reconnected() {
    this.observe !== !1 && this.observing === !1 && (this.controller?.observe(this.part.element), this.observing = !0);
  }
}), ft = "ha-bms-card", Ze = "HA BMS Card", te = "ha-bms-card-editor", Dt = 2.9, Xe = 3.65, ee = 3, se = 3.55, Ke = [244, 67, 54], Je = [255, 152, 0], Qe = "#f44336", Ye = "#ff9800", ts = "#26a69a", es = ["Bulk", "Absorption", "Float"], ss = {
  Bulk: "#ff9800",
  Absorption: "#42a5f5",
  Float: "#4caf50"
}, ie = {
  16: { barW: 20, gap: 3, barH: 72, font: 8, badgeFont: 7, labelFont: 7.5 },
  8: { barW: 34, gap: 8, barH: 94, font: 11, badgeFont: 9, labelFont: 9.5 },
  4: { barW: 54, gap: 16, barH: 116, font: 13, badgeFont: 11, labelFont: 11 },
  2: { barW: 84, gap: 24, barH: 140, font: 15, badgeFont: 12, labelFont: 12.5 }
}, Ft = Object.keys(ie).map(Number).sort((e, t) => e - t);
function nt(e) {
  let t = Ft[0], s = Math.abs(e - t);
  for (const i of Ft) {
    const n = Math.abs(e - i);
    n < s && (t = i, s = n);
  }
  return ie[t];
}
const ne = "#FF7043", oe = "#66BB6A", re = "#66BB6A", is = ["#FFB74D", "#FFA726", "#FF7043", "#EC407A"], ns = ["#26C6DA", "#42A5F5", "#66BB6A", "#26A69A"], os = ["#42A5F5", "#26A69A", "#7E57C2", "#66BB6A"], rs = ["off", "0", "no alarm", "ok", "normal", "false"];
function zt(e) {
  return (e - Dt) / (Xe - Dt) * 100;
}
function ae(e, t, s) {
  return e + (t - e) * s;
}
function ot(e) {
  return e <= ee ? "low" : e >= se ? "high" : "ok";
}
function et(e) {
  const t = e.replace("#", ""), s = [0, 2, 4].map((i) => parseInt(t.substring(i, i + 2), 16));
  return [s[0] || 0, s[1] || 0, s[2] || 0];
}
function W(e) {
  return `rgb(${e[0]},${e[1]},${e[2]})`;
}
function st(e, t) {
  return `rgba(${e[0]},${e[1]},${e[2]},${t})`;
}
function le(e, t, s) {
  const i = Math.max(0, Math.min(100, e)) / 100;
  return [0, 1, 2].map((n) => Math.round(ae(t[n], s[n], i)));
}
function as(e, t) {
  return e.map((s) => Math.max(0, Math.min(255, Math.round(s * t))));
}
function ls(e, t, s, i, n, o, r) {
  const l = ot(e);
  if (l === "low") return W(Ke);
  if (l === "high") return W(Je);
  const a = i ? le(s, n, o) : r, h = Math.max(0, Math.min(1, (t - 33) / 44)), d = ae(0.88, 1.1, h);
  return W(as(a, d));
}
const Wt = 20, cs = 100, jt = nt(8), hs = 8 * jt.barW + 7 * jt.gap;
function ds(e, t) {
  return t === "single-row" ? e : t === "two-row" ? Math.max(1, Math.ceil(e / 2)) : null;
}
function Vt(e, t, s) {
  const i = ds(e, s);
  let n = i ?? e;
  if (i === null && t > 0) {
    n = 1;
    for (let l = 1; l <= e; l++) {
      const a = Math.ceil(e / l), h = nt(a).gap;
      if ((t - (a - 1) * h) / a >= Wt) {
        n = a;
        break;
      }
    }
  }
  n = Math.max(1, Math.min(n, e));
  const o = nt(n);
  let r = o.barW;
  if (t > 0) {
    const l = (t - (n - 1) * o.gap) / n;
    r = Math.max(Wt, Math.min(cs, l));
  }
  return {
    ...o,
    barW: r,
    perRow: n,
    rowWidth: n * r + (n - 1) * o.gap
  };
}
function ps(e) {
  return `${e.toFixed(2)}V`;
}
function us(e) {
  return `${e.toFixed(3)} V`;
}
function _s(e) {
  return e.toFixed(3);
}
function gs(e) {
  const t = Math.max(0, e), s = Math.floor(t / 86400), i = Math.floor(t % 86400 / 3600);
  return `${s}d ${i}h`;
}
function fs(e) {
  const t = Math.round(e);
  return `${t >= 0 ? "+" : ""}${t} mV`;
}
var ms = Object.defineProperty, $s = Object.getOwnPropertyDescriptor, mt = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? $s(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && ms(t, s, n), n;
};
const ys = [
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
], bs = {
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
}, xs = {
  alarm_entities: 'Any entity not in a healthy state shows as a warning banner. Entities whose id or name contains "allow" (e.g. Allow to charge) are treated as inverted - healthy is "on".',
  cell_entities: "Selection order sets the physical cell order shown on the card.",
  layout_mode: `Auto reflows the cell bars to fit the card's actual rendered width as you resize it. "Force single/two row" always uses that many rows regardless of width.`
}, vs = [
  { key: "soc_warm_color", label: "SOC gradient — warm (low charge)", swatches: is, fallback: ne },
  { key: "soc_cool_color", label: "SOC gradient — cool (high charge)", swatches: ns, fallback: oe },
  { key: "flat_cell_color", label: "Flat cell color (gradient off)", swatches: os, fallback: re }
];
let E = class extends w {
  constructor() {
    super(...arguments), this._computeLabel = (e) => e.title ? e.title : bs[e.name] ?? e.name, this._computeHelper = (e) => xs[e.name];
  }
  setConfig(e) {
    this._config = e;
  }
  render() {
    return !this.hass || !this._config ? u : f`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ys}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="colors">
        ${vs.map((e) => this._renderColorRow(e))}
      </div>
    `;
  }
  _renderColorRow(e) {
    const t = this._config?.[e.key] || e.fallback;
    return f`
      <div class="color-row">
        <div class="color-label">${e.label}</div>
        ${e.swatches.map(
      (s) => f`
            <div
              class="swatch ${t.toLowerCase() === s.toLowerCase() ? "selected" : ""}"
              style="background:${s};"
              title=${s}
              @click=${() => this._setColor(e.key, s)}
            ></div>
          `
    )}
        <label class="custom-swatch" style="background:${t};" title="Custom color">
          <input
            type="color"
            .value=${t}
            @change=${(s) => this._setColor(e.key, s.target.value)}
          />
        </label>
      </div>
    `;
  }
  _setColor(e, t) {
    if (!this._config) return;
    const s = { ...this._config, [e]: t };
    it(this, "config-changed", { config: s });
  }
  _valueChanged(e) {
    e.stopPropagation(), it(this, "config-changed", { config: e.detail.value });
  }
};
E.styles = qt`
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
mt([
  _t({ attribute: !1 })
], E.prototype, "hass", 2);
mt([
  gt()
], E.prototype, "_config", 2);
E = mt([
  Qt(te)
], E);
const As = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get HaBmsCardEditor() {
    return E;
  }
}, Symbol.toStringTag, { value: "Module" }));
var ws = Object.defineProperty, Cs = Object.getOwnPropertyDescriptor, X = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? Cs(t, s) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && ws(t, s, n), n;
};
const rt = 32;
let M = class extends w {
  constructor() {
    super(...arguments), this._selectedCellIndex = null, this._resizeController = new Ge(this, {
      callback: (e) => e[0]?.contentRect.width ?? 0
    });
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => As), document.createElement(te);
  }
  static getStubConfig() {
    return {
      type: `custom:${ft}`,
      cell_entities: [],
      soc_entity: "",
      layout_mode: "auto",
      gradient_enabled: !0
    };
  }
  setConfig(e) {
    if (!e || typeof e != "object")
      throw new Error("Invalid configuration");
    if (e.cell_entities !== void 0 && !Array.isArray(e.cell_entities))
      throw new Error("ha-bms-card: `cell_entities` must be a list of entity ids");
    this._config = { layout_mode: "auto", gradient_enabled: !0, ...e }, this._selectedCellIndex = null;
  }
  get _measuredWidth() {
    return this._resizeController.value ?? 0;
  }
  getCardSize() {
    if (!this._config?.cell_entities?.length || !this._config?.soc_entity) return 2;
    const e = this._config.cell_entities.length, t = Vt(e, this._measuredWidth - rt, this._config.layout_mode ?? "auto");
    let i = 4 + Math.ceil(e / t.perRow);
    return this._alarmMessages().length && (i += 1), this._selectedCellIndex !== null && (i += 1), i;
  }
  getGridOptions() {
    let t = 5 + ((this._config?.cell_entities?.length ?? 8) > 8 ? 1 : 0);
    return this._alarmMessages().length && (t += 1), this._selectedCellIndex !== null && (t += 1), { columns: 12, rows: t, min_columns: 4, min_rows: 3 };
  }
  render() {
    if (!this._config || !this.hass) return u;
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
    const e = this._config, t = !!this.hass.themes?.darkMode, s = this._themeTokens(t), i = this._cellVoltages(), n = i.length, o = this._num(e.soc_entity) ?? 0, r = e.gradient_enabled ?? !0, l = et(e.soc_warm_color || ne), a = et(e.soc_cool_color || oe), h = et(e.flat_cell_color || re), d = e.layout_mode ?? "auto", c = Vt(n, this._measuredWidth - rt, d), _ = c.rowWidth, { minIdx: g, maxIdx: v } = this._minMaxIdx(i), ce = this._average(i), $t = i.map((p, m) => {
      const Q = m === g, Y = m === v;
      return p === null ? {
        index: m,
        label: `C${m + 1}`,
        voltage: NaN,
        voltageLabel: "--",
        heightPct: 0,
        color: s.barTrackBg,
        badge: "",
        badgeColor: "transparent",
        isMin: !1,
        isMax: !1
      } : {
        index: m,
        label: `C${m + 1}`,
        voltage: p,
        voltageLabel: ps(p),
        heightPct: Math.max(0, Math.min(100, zt(p))),
        color: ls(p, zt(p), o, r, l, a, h),
        badge: Q ? "▼" : Y ? "▲" : "",
        badgeColor: Q ? Qe : Y ? Ye : "transparent",
        isMin: Q,
        isMax: Y
      };
    }), B = r ? le(o, l, a) : h, K = W(B), I = this._alarmMessages(), he = I.length > 0, U = i.filter((p) => p !== null), yt = this._num(e.pack_voltage_entity) ?? U.reduce((p, m) => p + m, 0), N = this._num(e.current_entity), bt = this._num(e.power_entity) ?? (N !== null ? N * yt : null), de = this._num(e.deviation_entity) ?? (U.length ? Math.max(...U) - Math.min(...U) : 0), xt = this._num(e.capacity_remaining_entity), vt = this._num(e.capacity_installed_entity), At = this._num(e.cycles_entity), wt = this._num(e.since_full_charge_entity), Ct = this._state(e.temperature_entity), pe = e.temperature_entity ? this.hass.states[e.temperature_entity]?.attributes?.unit_of_measurement ?? "" : "", D = this._state(e.charge_mode_entity), J = D ? es.find((p) => p.toLowerCase() === D.toLowerCase()) : void 0, St = J ? ss[J] : "#9e9e9e", ue = J ?? D, F = this._expandedDetail($t, ce);
    return f`
      <ha-card
        style="background:${s.cardBg};color:${s.primaryText};box-shadow:${s.cardShadow};"
      >
        <div
          class="header"
          style="background:linear-gradient(180deg, ${st(B, s.socHeaderTintAlpha)}, rgba(0,0,0,0));"
        >
          <div class="icon-badge" style="background:${st(B, s.socIconBgAlpha)};">
            <div class="battery-glyph" style="border-color:${K};">
              <span style="background:${K};"></span>
            </div>
          </div>
          <div class="title-block">
            <div class="title">${e.name || "Battery Bank"}</div>
            <div class="subtitle" style="color:${s.subtitleText};">LiFePO4 · ${n}S</div>
          </div>
          <div
            class="soc-chip"
            style="background:${st(B, s.socChipBgAlpha)};color:${K};cursor:pointer;"
            @click=${(p) => this._openMoreInfo(p, e.soc_entity)}
          >
            ${Math.round(o)}%
          </div>
        </div>

        <div class="badges-row">
          <div
            class="pill"
            style="background:${s.powerPillBg};color:${s.primaryText};${e.power_entity ? "cursor:pointer;" : ""}"
            @click=${(p) => this._openMoreInfo(p, e.power_entity)}
          >
            ⚡ ${bt !== null ? bt.toFixed(1) : "--"} W
          </div>
          ${D ? f`<div
                class="pill"
                style="background:${St}${s.chargeModeAlpha};color:${St};"
              >
                ${ue}
              </div>` : u}
        </div>

        ${he ? f`<div
              class="alarm-banner"
              style="background:${s.alarmBg};border:1px solid ${s.alarmBorder};color:${s.alarmText};"
            >
              ⚠ ${I[0]}${I.length > 1 ? ` (+${I.length - 1} more)` : ""}
            </div>` : u}

        <div class="cells-wrap">
          <div class="cells-row" style="gap:${c.gap}px;width:${_}px;">
            ${$t.map(
      (p) => f`
                <div class="cell" style="width:${c.barW}px;" @click=${() => this._toggleCell(p.index)}>
                  <div
                    class="cell-voltage"
                    style="font-size:${c.font}px;height:${c.font}px;color:${s.primaryText};"
                  >
                    ${p.voltageLabel}
                  </div>
                  <div
                    class="cell-badge"
                    style="font-size:${c.badgeFont}px;height:${c.badgeFont}px;color:${p.badgeColor};"
                  >
                    ${p.badge}
                  </div>
                  <div
                    class="cell-track"
                    style="width:${c.barW}px;height:${c.barH}px;background:${s.barTrackBg};border:${this._selectedCellIndex === p.index ? `2px solid ${ts}` : `1px solid ${s.barTrackBorder}`};"
                  >
                    <div class="cell-fill" style="height:${p.heightPct}%;background:${p.color};"></div>
                  </div>
                  <div class="cell-label" style="font-size:${c.labelFont}px;color:${s.cellIndexText};">
                    ${p.label}
                  </div>
                </div>
              `
    )}
          </div>
        </div>

        ${F ? f`<div
              class="expanded-panel"
              style="background:${s.expandedBg};border:1px solid ${s.expandedBorder};"
            >
              <div class="expanded-title">${F.title}</div>
              <div style="color:${s.expandedSecondaryText};">${F.line1}</div>
              <div style="color:${s.expandedSecondaryText};">${F.line2}</div>
            </div>` : u}

        <div class="divider" style="background:${s.hairlineMain};"></div>

        <div class="stats-grid">
          ${this._statRow("Pack voltage", `${yt.toFixed(2)} V`, s, e.pack_voltage_entity)}
          ${this._statRow("Deviation", `${_s(de)} V`, s, e.deviation_entity)}
          ${this._statRow(
      "Current",
      N !== null ? `${N.toFixed(1)} A` : "--",
      s,
      e.current_entity
    )}
          ${this._statRow(
      "Remaining",
      xt !== null ? `${xt.toFixed(1)} Ah` : "--",
      s,
      e.capacity_remaining_entity
    )}
          ${this._statRow(
      "Temp",
      Ct !== null ? `${Ct}${pe}` : "--",
      s,
      e.temperature_entity
    )}
          ${this._statRow(
      "Installed",
      vt !== null ? `${vt.toFixed(1)} Ah` : "--",
      s,
      e.capacity_installed_entity
    )}
          ${this._statRow(
      "Cycles",
      At !== null ? `${Math.round(At)}` : "--",
      s,
      e.cycles_entity,
      !0
    )}
          ${this._statRow(
      "Since full charge",
      wt !== null ? gs(wt) : "--",
      s,
      e.since_full_charge_entity,
      !0
    )}
        </div>
      </ha-card>
    `;
  }
  _statRow(e, t, s, i, n = !1) {
    return f`<div
      class="stat-row"
      style="${n ? "" : `border-bottom:1px solid ${s.hairlineStat};`}${i ? "cursor:pointer;" : ""}"
      @click=${(o) => this._openMoreInfo(o, i)}
    >
      <span style="color:${s.statLabelText};">${e}</span>
      <b>${t}</b>
    </div>`;
  }
  _themeTokens(e) {
    return e ? {
      cardBg: "#1c1c1c",
      primaryText: "#e1e1e1",
      subtitleText: "rgba(255,255,255,.6)",
      statLabelText: "rgba(255,255,255,.6)",
      cellIndexText: "rgba(255,255,255,.4)",
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
  _num(e) {
    if (!e || !this.hass) return null;
    const t = this.hass.states[e];
    if (!t || t.state === "unknown" || t.state === "unavailable") return null;
    const s = parseFloat(t.state);
    return Number.isFinite(s) ? s : null;
  }
  _state(e) {
    if (!e || !this.hass) return null;
    const t = this.hass.states[e];
    return !t || t.state === "unknown" || t.state === "unavailable" ? null : t.state;
  }
  _friendlyName(e) {
    return this.hass?.states[e]?.attributes?.friendly_name ?? e;
  }
  _cellVoltages() {
    return (this._config.cell_entities ?? []).map((e) => this._num(e));
  }
  _minMaxIdx(e) {
    const t = this._config;
    let s = -1, i = -1;
    const n = t.min_cell_id_entity ? this._num(t.min_cell_id_entity) : null, o = t.max_cell_id_entity ? this._num(t.max_cell_id_entity) : null;
    if (n !== null && n >= 1 && n <= e.length && (s = Math.round(n) - 1), o !== null && o >= 1 && o <= e.length && (i = Math.round(o) - 1), s === -1 || i === -1) {
      let r = 1 / 0, l = -1 / 0, a = -1, h = -1;
      e.forEach((d, c) => {
        d !== null && (d < r && (r = d, a = c), d > l && (l = d, h = c));
      }), s === -1 && (s = a), i === -1 && (i = h);
    }
    return { minIdx: s, maxIdx: i };
  }
  _average(e) {
    const t = e.filter((s) => s !== null);
    return t.length ? t.reduce((s, i) => s + i, 0) / t.length : 0;
  }
  _normalizeAlarm(e) {
    if (typeof e == "string") {
      const t = this._friendlyName(e), s = /allow/i.test(e) || /allow/i.test(t);
      return { entity: e, invert: s };
    }
    return e;
  }
  _isAlarmProblem(e) {
    const t = this._state(e.entity);
    if (t === null) return !1;
    const s = t.toLowerCase();
    return e.invert ? s !== "on" : !(e.ok_states ?? rs).map((n) => n.toLowerCase()).includes(s);
  }
  _alarmMessages() {
    if (!this._config || !this.hass) return [];
    const e = [], t = this._cellVoltages(), s = t.findIndex((n) => n !== null && ot(n) === "high"), i = t.findIndex((n) => n !== null && ot(n) === "low");
    s !== -1 && e.push(`High cell voltage — C${s + 1} exceeds ${se.toFixed(2)} V`), i !== -1 && e.push(`Low cell voltage — C${i + 1} at or below ${ee.toFixed(2)} V`);
    for (const n of this._config.alarm_entities ?? []) {
      const o = this._normalizeAlarm(n);
      if (this._isAlarmProblem(o)) {
        const r = o.name ?? this._friendlyName(o.entity), l = this._state(o.entity);
        e.push(`${r}${l ? `: ${l}` : ""}`);
      }
    }
    return e;
  }
  _expandedDetail(e, t) {
    if (this._selectedCellIndex === null) return null;
    const s = e[this._selectedCellIndex];
    if (!s || Number.isNaN(s.voltage)) return null;
    const i = (s.voltage - t) * 1e3, n = s.isMin ? "Lowest cell in pack" : s.isMax ? "Highest cell in pack — actively balancing" : "Within normal range";
    return {
      title: `Cell ${s.index + 1} · ${us(s.voltage)}`,
      line1: `${fs(i)} from pack average`,
      line2: n
    };
  }
  _toggleCell(e) {
    this._selectedCellIndex = this._selectedCellIndex === e ? null : e;
  }
  _openMoreInfo(e, t) {
    e.stopPropagation(), t && it(this, "hass-more-info", { entityId: t });
  }
};
M.styles = qt`
    :host {
      display: block;
      min-width: ${hs + rt}px;
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
  _t({ attribute: !1 })
], M.prototype, "hass", 2);
X([
  gt()
], M.prototype, "_config", 2);
X([
  gt()
], M.prototype, "_selectedCellIndex", 2);
M = X([
  Qt(ft)
], M);
const at = window;
at.customCards = at.customCards || [];
at.customCards.push({
  type: ft,
  name: Ze,
  description: "Per-cell voltage, balancing, SOC, power, and health monitoring for a LiFePO4 battery pack.",
  preview: !0,
  documentationURL: "https://github.com/bb12489/ha-bms-card"
});
export {
  M as HaBmsCard
};
