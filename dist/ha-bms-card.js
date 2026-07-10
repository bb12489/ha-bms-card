/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis, lt = z.ShadowRoot && (z.ShadyCSS === void 0 || z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ct = Symbol(), Et = /* @__PURE__ */ new WeakMap();
let Gt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== ct) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (lt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Et.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Et.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const _e = (s) => new Gt(typeof s == "string" ? s : s + "", void 0, ct), qt = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, n, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[o + 1], s[0]);
  return new Gt(e, s, ct);
}, ge = (s, t) => {
  if (lt) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = z.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, s.appendChild(i);
  }
}, Mt = lt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return _e(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: fe, defineProperty: me, getOwnPropertyDescriptor: $e, getOwnPropertyNames: be, getOwnPropertySymbols: ye, getPrototypeOf: xe } = Object, q = globalThis, Tt = q.trustedTypes, ve = Tt ? Tt.emptyScript : "", Ae = q.reactiveElementPolyfillSupport, k = (s, t) => s, j = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? ve : null;
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
} }, ht = (s, t) => !fe(s, t), kt = { attribute: !0, type: String, converter: j, reflect: !1, useDefault: !1, hasChanged: ht };
Symbol.metadata ??= Symbol("metadata"), q.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = kt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && me(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: o } = $e(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
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
      const e = this.properties, i = [...be(e), ...ye(e)];
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
      for (const n of i) e.unshift(Mt(n));
    } else t !== void 0 && e.push(Mt(t));
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
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : j).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = i.getPropertyOptions(n), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : j;
      this._$Em = n;
      const l = r.fromAttribute(e, o.type);
      this[n] = l ?? this._$Ej?.get(n) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (n === !1 && (o = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? ht)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: o }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[k("elementProperties")] = /* @__PURE__ */ new Map(), A[k("finalized")] = /* @__PURE__ */ new Map(), Ae?.({ ReactiveElement: A }), (q.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt = globalThis, Ot = (s) => s, V = dt.trustedTypes, Pt = V ? V.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Zt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, Xt = "?" + $, we = `<${Xt}>`, x = document, P = () => x.createComment(""), R = (s) => s === null || typeof s != "object" && typeof s != "function", pt = Array.isArray, Ce = (s) => pt(s) || typeof s?.[Symbol.iterator] == "function", tt = `[ 	
\f\r]`, T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Rt = /-->/g, Ht = />/g, b = RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Lt = /'/g, It = /"/g, Kt = /^(?:script|style|textarea|title)$/i, Se = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), f = Se(1), C = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), Bt = /* @__PURE__ */ new WeakMap(), y = x.createTreeWalker(x, 129);
function Jt(s, t) {
  if (!pt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pt !== void 0 ? Pt.createHTML(t) : t;
}
const Ee = (s, t) => {
  const e = s.length - 1, i = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = T;
  for (let l = 0; l < e; l++) {
    const a = s[l];
    let h, d, c = -1, _ = 0;
    for (; _ < a.length && (r.lastIndex = _, d = r.exec(a), d !== null); ) _ = r.lastIndex, r === T ? d[1] === "!--" ? r = Rt : d[1] !== void 0 ? r = Ht : d[2] !== void 0 ? (Kt.test(d[2]) && (n = RegExp("</" + d[2], "g")), r = b) : d[3] !== void 0 && (r = b) : r === b ? d[0] === ">" ? (r = n ?? T, c = -1) : d[1] === void 0 ? c = -2 : (c = r.lastIndex - d[2].length, h = d[1], r = d[3] === void 0 ? b : d[3] === '"' ? It : Lt) : r === It || r === Lt ? r = b : r === Rt || r === Ht ? r = T : (r = b, n = void 0);
    const g = r === b && s[l + 1].startsWith("/>") ? " " : "";
    o += r === T ? a + we : c >= 0 ? (i.push(h), a.slice(0, c) + Zt + a.slice(c) + $ + g) : a + $ + (c === -2 ? l : g);
  }
  return [Jt(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class H {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const l = t.length - 1, a = this.parts, [h, d] = Ee(t, e);
    if (this.el = H.createElement(h, i), y.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = y.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const c of n.getAttributeNames()) if (c.endsWith(Zt)) {
          const _ = d[r++], g = n.getAttribute(c).split($), v = /([.?@])?(.*)/.exec(_);
          a.push({ type: 1, index: o, name: v[2], strings: g, ctor: v[1] === "." ? Te : v[1] === "?" ? ke : v[1] === "@" ? Oe : Z }), n.removeAttribute(c);
        } else c.startsWith($) && (a.push({ type: 6, index: o }), n.removeAttribute(c));
        if (Kt.test(n.tagName)) {
          const c = n.textContent.split($), _ = c.length - 1;
          if (_ > 0) {
            n.textContent = V ? V.emptyScript : "";
            for (let g = 0; g < _; g++) n.append(c[g], P()), y.nextNode(), a.push({ type: 2, index: ++o });
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
  static createElement(t, e) {
    const i = x.createElement("template");
    return i.innerHTML = t, i;
  }
}
function S(s, t, e = s, i) {
  if (t === C) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = R(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(s), n._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = S(s, n._$AS(s, t.values), n, i)), t;
}
class Me {
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
    let o = y.nextNode(), r = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let h;
        a.type === 2 ? h = new L(o, o.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (h = new Pe(o, this, t)), this._$AV.push(h), a = i[++l];
      }
      r !== a?.index && (o = y.nextNode(), r++);
    }
    return y.currentNode = x, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class L {
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
    t = S(this, t, e), R(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== C && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ce(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && R(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = H.createElement(Jt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const o = new Me(n, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Bt.get(t.strings);
    return e === void 0 && Bt.set(t.strings, e = new H(t)), e;
  }
  k(t) {
    pt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const o of t) n === e.length ? e.push(i = new L(this.O(P()), this.O(P()), this, this.options)) : i = e[n], i._$AI(o), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
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
  constructor(t, e, i, n, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(t, e = this, i, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = S(this, t, e, 0), r = !R(t) || t !== this._$AH && t !== C, r && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = o[0], a = 0; a < o.length - 1; a++) h = S(this, l[i + a], e, a), h === C && (h = this._$AH[a]), r ||= !R(h) || h !== this._$AH[a], h === p ? t = p : t !== p && (t += (h ?? "") + o[a + 1]), this._$AH[a] = h;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Te extends Z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class ke extends Z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Oe extends Z {
  constructor(t, e, i, n, o) {
    super(t, e, i, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? p) === C) return;
    const i = this._$AH, n = t === p && i !== p || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== p && (i === p || n);
    n && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Pe {
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
const Re = dt.litHtmlPolyfillSupport;
Re?.(H, L), (dt.litHtmlVersions ??= []).push("3.3.3");
const He = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = n = new L(t.insertBefore(P(), o), o, void 0, e ?? {});
  }
  return n._$AI(s), n;
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
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = He(e, this.renderRoot, this.renderOptions);
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
const Qt = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ie = { attribute: !0, type: String, converter: j, reflect: !1, hasChanged: ht }, Be = (s = Ie, t, e) => {
  const { kind: i, metadata: n } = e;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), o.set(e.name, s), i === "accessor") {
    const { name: r } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(r, a, s, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, s, l), l;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(l) {
      const a = this[r];
      t.call(this, l), this.requestUpdate(r, a, s, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function _t(s) {
  return (t, e) => typeof e == "object" ? Be(s, t, e) : ((i, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function gt(s) {
  return _t({ ...s, state: !0, attribute: !1 });
}
var Ut, Nt;
(function(s) {
  s.language = "language", s.system = "system", s.comma_decimal = "comma_decimal", s.decimal_comma = "decimal_comma", s.space_comma = "space_comma", s.none = "none";
})(Ut || (Ut = {})), function(s) {
  s.language = "language", s.system = "system", s.am_pm = "12", s.twenty_four = "24";
}(Nt || (Nt = {}));
var it = function(s, t, e, i) {
  i = i || {}, e = e ?? {};
  var n = new Event(t, { bubbles: i.bubbles === void 0 || i.bubbles, cancelable: !!i.cancelable, composed: i.composed === void 0 || i.composed });
  return n.detail = e, s.dispatchEvent(n), n;
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ue = (s) => s.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ne = { CHILD: 2 }, De = (s) => (...t) => ({ _$litDirective$: s, values: t });
class Fe {
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
const O = (s, t) => {
  const e = s._$AN;
  if (e === void 0) return !1;
  for (const i of e) i._$AO?.(t, !1), O(i, t);
  return !0;
}, G = (s) => {
  let t, e;
  do {
    if ((t = s._$AM) === void 0) break;
    e = t._$AN, e.delete(s), s = t;
  } while (e?.size === 0);
}, Yt = (s) => {
  for (let t; t = s._$AM; s = t) {
    let e = t._$AN;
    if (e === void 0) t._$AN = e = /* @__PURE__ */ new Set();
    else if (e.has(s)) break;
    e.add(s), je(t);
  }
};
function ze(s) {
  this._$AN !== void 0 ? (G(this), this._$AM = s, Yt(this)) : this._$AM = s;
}
function We(s, t = !1, e = 0) {
  const i = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (t) if (Array.isArray(i)) for (let o = e; o < i.length; o++) O(i[o], !1), G(i[o]);
  else i != null && (O(i, !1), G(i));
  else O(this, s);
}
const je = (s) => {
  s.type == Ne.CHILD && (s._$AP ??= We, s._$AQ ??= ze);
};
class Ve extends Fe {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, e, i) {
    super._$AT(t, e, i), Yt(this), this.isConnected = t._$AU;
  }
  _$AO(t, e = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), e && (O(this, t), G(this));
  }
  setValue(t) {
    if (Ue(this._$Ct)) this._$Ct._$AI(t, this);
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
class Ge {
  constructor(t, { target: e, config: i, callback: n, skipInitial: o }) {
    this.t = /* @__PURE__ */ new Set(), this.o = !1, this.i = !1, this.h = t, e !== null && this.t.add(e ?? t), this.l = i, this.o = o ?? this.o, this.callback = n, window.ResizeObserver ? (this.u = new ResizeObserver((r) => {
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
}), ft = "ha-bms-card", Ze = "HA BMS Card", te = "ha-bms-card-editor", Dt = 2.9, Xe = 3.65, ee = 3, se = 3.55, Ke = [244, 67, 54], Je = [255, 152, 0], Qe = "#f44336", Ye = "#ff9800", ts = "#26a69a", es = ["Bulk", "Absorption", "Float"], ss = {
  Bulk: "#ff9800",
  Absorption: "#42a5f5",
  Float: "#4caf50"
}, ie = {
  16: { barW: 20, gap: 3, barH: 72, font: 8, badgeFont: 7, labelFont: 7.5 },
  8: { barW: 34, gap: 8, barH: 94, font: 11, badgeFont: 9, labelFont: 9.5 },
  4: { barW: 54, gap: 16, barH: 116, font: 13, badgeFont: 11, labelFont: 11 },
  2: { barW: 84, gap: 24, barH: 140, font: 15, badgeFont: 12, labelFont: 12.5 }
}, Ft = Object.keys(ie).map(Number).sort((s, t) => s - t);
function nt(s) {
  let t = Ft[0], e = Math.abs(s - t);
  for (const i of Ft) {
    const n = Math.abs(s - i);
    n < e && (t = i, e = n);
  }
  return ie[t];
}
const ne = "#FF7043", oe = "#66BB6A", re = "#66BB6A", is = ["#FFB74D", "#FFA726", "#FF7043", "#EC407A"], ns = ["#26C6DA", "#42A5F5", "#66BB6A", "#26A69A"], os = ["#42A5F5", "#26A69A", "#7E57C2", "#66BB6A"], rs = ["off", "0", "no alarm", "ok", "normal", "false"];
function zt(s) {
  return (s - Dt) / (Xe - Dt) * 100;
}
function ae(s, t, e) {
  return s + (t - s) * e;
}
function ot(s) {
  return s <= ee ? "low" : s >= se ? "high" : "ok";
}
function et(s) {
  const t = s.replace("#", ""), e = [0, 2, 4].map((i) => parseInt(t.substring(i, i + 2), 16));
  return [e[0] || 0, e[1] || 0, e[2] || 0];
}
function W(s) {
  return `rgb(${s[0]},${s[1]},${s[2]})`;
}
function st(s, t) {
  return `rgba(${s[0]},${s[1]},${s[2]},${t})`;
}
function le(s, t, e) {
  const i = Math.max(0, Math.min(100, s)) / 100;
  return [0, 1, 2].map((n) => Math.round(ae(t[n], e[n], i)));
}
function as(s, t) {
  return s.map((e) => Math.max(0, Math.min(255, Math.round(e * t))));
}
function ls(s, t, e, i, n, o, r) {
  const l = ot(s);
  if (l === "low") return W(Ke);
  if (l === "high") return W(Je);
  const a = i ? le(e, n, o) : r, h = Math.max(0, Math.min(1, (t - 33) / 44)), d = ae(0.88, 1.1, h);
  return W(as(a, d));
}
const Wt = 20, cs = 100, jt = nt(8), hs = 8 * jt.barW + 7 * jt.gap;
function ds(s, t) {
  return t === "single-row" ? s : t === "two-row" ? Math.max(1, Math.ceil(s / 2)) : null;
}
function Vt(s, t, e) {
  const i = ds(s, e);
  let n = i ?? s;
  if (i === null && t > 0) {
    n = 1;
    for (let l = 1; l <= s; l++) {
      const a = Math.ceil(s / l), h = nt(a).gap;
      if ((t - (a - 1) * h) / a >= Wt) {
        n = a;
        break;
      }
    }
  }
  n = Math.max(1, Math.min(n, s));
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
function ps(s) {
  return `${s.toFixed(2)}V`;
}
function us(s) {
  return `${s.toFixed(3)} V`;
}
function _s(s) {
  return s.toFixed(3);
}
function gs(s) {
  const t = Math.max(0, s), e = Math.floor(t / 86400), i = Math.floor(t % 86400 / 3600);
  return `${e}d ${i}h`;
}
function fs(s) {
  const t = Math.round(s);
  return `${t >= 0 ? "+" : ""}${t} mV`;
}
var ms = Object.defineProperty, $s = Object.getOwnPropertyDescriptor, mt = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? $s(t, e) : t, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = (i ? r(t, e, n) : r(n)) || n);
  return i && n && ms(t, e, n), n;
};
const bs = [
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
], ys = {
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
    super(...arguments), this._computeLabel = (s) => s.title ? s.title : ys[s.name] ?? s.name, this._computeHelper = (s) => xs[s.name];
  }
  setConfig(s) {
    this._config = s;
  }
  render() {
    return !this.hass || !this._config ? p : f`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${bs}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="colors">
        ${vs.map((s) => this._renderColorRow(s))}
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
    it(this, "config-changed", { config: e });
  }
  _valueChanged(s) {
    s.stopPropagation(), it(this, "config-changed", { config: s.detail.value });
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
var ws = Object.defineProperty, Cs = Object.getOwnPropertyDescriptor, X = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Cs(t, e) : t, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = (i ? r(t, e, n) : r(n)) || n);
  return i && n && ws(t, e, n), n;
};
const rt = 32;
let M = class extends w {
  constructor() {
    super(...arguments), this._selectedCellIndex = null, this._resizeController = new Ge(this, {
      callback: (s) => s[0]?.contentRect.width ?? 0
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
    const s = this._config.cell_entities.length, t = Vt(s, this._measuredWidth - rt, this._config.layout_mode ?? "auto");
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
    const s = this._config, t = !!this.hass.themes?.darkMode, e = this._themeTokens(t), i = this._cellVoltages(), n = i.length, o = this._num(s.soc_entity) ?? 0, r = s.gradient_enabled ?? !0, l = et(s.soc_warm_color || ne), a = et(s.soc_cool_color || oe), h = et(s.flat_cell_color || re), d = s.layout_mode ?? "auto", c = Vt(n, this._measuredWidth - rt, d), _ = c.rowWidth, { minIdx: g, maxIdx: v } = this._minMaxIdx(i), ce = this._average(i), $t = i.map((u, m) => {
      const Q = m === g, Y = m === v;
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
        voltageLabel: ps(u),
        heightPct: Math.max(0, Math.min(100, zt(u))),
        color: ls(u, zt(u), o, r, l, a, h),
        badge: Q ? "▼" : Y ? "▲" : "",
        badgeColor: Q ? Qe : Y ? Ye : "transparent",
        isMin: Q,
        isMax: Y
      };
    }), I = r ? le(o, l, a) : h, K = W(I), B = this._alarmMessages(), he = B.length > 0, U = i.filter((u) => u !== null), bt = this._num(s.pack_voltage_entity) ?? U.reduce((u, m) => u + m, 0), N = this._num(s.current_entity), yt = this._num(s.power_entity) ?? (N !== null ? N * bt : null), de = this._num(s.deviation_entity) ?? (U.length ? Math.max(...U) - Math.min(...U) : 0), xt = this._num(s.capacity_remaining_entity), vt = this._num(s.capacity_installed_entity), At = this._num(s.cycles_entity), wt = this._num(s.since_full_charge_entity), Ct = this._state(s.temperature_entity), pe = s.temperature_entity ? this.hass.states[s.temperature_entity]?.attributes?.unit_of_measurement ?? "" : "", D = this._state(s.charge_mode_entity), J = D ? es.find((u) => u.toLowerCase() === D.toLowerCase()) : void 0, St = J ? ss[J] : "#9e9e9e", ue = J ?? D, F = this._expandedDetail($t, ce);
    return f`
      <ha-card
        style="background:${e.cardBg};color:${e.primaryText};box-shadow:${e.cardShadow};"
      >
        <div
          class="header"
          style="background:linear-gradient(180deg, ${st(I, e.socHeaderTintAlpha)}, rgba(0,0,0,0));"
        >
          <div class="icon-badge" style="background:${st(I, e.socIconBgAlpha)};">
            <div class="battery-glyph" style="border-color:${K};">
              <span style="background:${K};"></span>
            </div>
          </div>
          <div class="title-block">
            <div class="title">${s.name || "Battery Bank"}</div>
            <div class="subtitle" style="color:${e.subtitleText};">LiFePO4 · ${n}S</div>
          </div>
          <div class="soc-chip" style="background:${st(I, e.socChipBgAlpha)};color:${K};">
            ${Math.round(o)}%
          </div>
          <div class="kebab" style="color:${e.kebabText};" @click=${this._handleMoreInfo}>⋮</div>
        </div>

        <div class="badges-row">
          <div class="pill" style="background:${e.powerPillBg};color:${e.primaryText};">
            ⚡ ${yt !== null ? yt.toFixed(1) : "--"} W
          </div>
          ${D ? f`<div
                class="pill"
                style="background:${St}${e.chargeModeAlpha};color:${St};"
              >
                ${ue}
              </div>` : p}
        </div>

        ${he ? f`<div
              class="alarm-banner"
              style="background:${e.alarmBg};border:1px solid ${e.alarmBorder};color:${e.alarmText};"
            >
              ⚠ ${B[0]}${B.length > 1 ? ` (+${B.length - 1} more)` : ""}
            </div>` : p}

        <div class="cells-wrap">
          <div class="cells-row" style="gap:${c.gap}px;width:${_}px;">
            ${$t.map(
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
                    style="width:${c.barW}px;height:${c.barH}px;background:${e.barTrackBg};border:${this._selectedCellIndex === u.index ? `2px solid ${ts}` : `1px solid ${e.barTrackBorder}`};"
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
          ${this._statRow("Pack voltage", `${bt.toFixed(2)} V`, e)}
          ${this._statRow("Deviation", `${_s(de)} V`, e)}
          ${this._statRow("Current", N !== null ? `${N.toFixed(1)} A` : "--", e)}
          ${this._statRow("Remaining", xt !== null ? `${xt.toFixed(1)} Ah` : "--", e)}
          ${this._statRow("Temp", Ct !== null ? `${Ct}${pe}` : "--", e)}
          ${this._statRow("Installed", vt !== null ? `${vt.toFixed(1)} Ah` : "--", e)}
          ${this._statRow("Cycles", At !== null ? `${Math.round(At)}` : "--", e, !0)}
          ${this._statRow(
      "Since full charge",
      wt !== null ? gs(wt) : "--",
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
    const n = t.min_cell_id_entity ? this._num(t.min_cell_id_entity) : null, o = t.max_cell_id_entity ? this._num(t.max_cell_id_entity) : null;
    if (n !== null && n >= 1 && n <= s.length && (e = Math.round(n) - 1), o !== null && o >= 1 && o <= s.length && (i = Math.round(o) - 1), e === -1 || i === -1) {
      let r = 1 / 0, l = -1 / 0, a = -1, h = -1;
      s.forEach((d, c) => {
        d !== null && (d < r && (r = d, a = c), d > l && (l = d, h = c));
      }), e === -1 && (e = a), i === -1 && (i = h);
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
    return s.invert ? e !== "on" : !(s.ok_states ?? rs).map((n) => n.toLowerCase()).includes(e);
  }
  _alarmMessages() {
    if (!this._config || !this.hass) return [];
    const s = [], t = this._cellVoltages(), e = t.findIndex((n) => n !== null && ot(n) === "high"), i = t.findIndex((n) => n !== null && ot(n) === "low");
    e !== -1 && s.push(`High cell voltage — C${e + 1} exceeds ${se.toFixed(2)} V`), i !== -1 && s.push(`Low cell voltage — C${i + 1} at or below ${ee.toFixed(2)} V`);
    for (const n of this._config.alarm_entities ?? []) {
      const o = this._normalizeAlarm(n);
      if (this._isAlarmProblem(o)) {
        const r = o.name ?? this._friendlyName(o.entity), l = this._state(o.entity);
        s.push(`${r}${l ? `: ${l}` : ""}`);
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
      title: `Cell ${e.index + 1} · ${us(e.voltage)}`,
      line1: `${fs(i)} from pack average`,
      line2: n
    };
  }
  _toggleCell(s) {
    this._selectedCellIndex = this._selectedCellIndex === s ? null : s;
  }
  _handleMoreInfo(s) {
    s.stopPropagation();
    const t = this._config.soc_entity;
    t && it(this, "hass-more-info", { entityId: t });
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
