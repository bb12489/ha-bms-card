/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, it = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, nt = Symbol(), vt = /* @__PURE__ */ new WeakMap();
let Ut = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== nt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (it && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = vt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && vt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const re = (s) => new Ut(typeof s == "string" ? s : s + "", void 0, nt), Ft = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, n, r) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[r + 1], s[0]);
  return new Ut(e, s, nt);
}, oe = (s, t) => {
  if (it) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = D.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, s.appendChild(i);
  }
}, At = it ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return re(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ae, defineProperty: le, getOwnPropertyDescriptor: ce, getOwnPropertyNames: de, getOwnPropertySymbols: he, getPrototypeOf: pe } = Object, V = globalThis, wt = V.trustedTypes, ue = wt ? wt.emptyScript : "", ge = V.reactiveElementPolyfillSupport, O = (s, t) => s, W = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? ue : null;
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
} }, rt = (s, t) => !ae(s, t), Ct = { attribute: !0, type: String, converter: W, reflect: !1, useDefault: !1, hasChanged: rt };
Symbol.metadata ??= Symbol("metadata"), V.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ct) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && le(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: r } = ce(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: n, set(o) {
      const l = n?.call(this);
      r?.call(this, o), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(O("elementProperties"))) return;
    const t = pe(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(O("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(O("properties"))) {
      const e = this.properties, i = [...de(e), ...he(e)];
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
      for (const n of i) e.unshift(At(n));
    } else t !== void 0 && e.push(At(t));
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
    return oe(t, this.constructor.elementStyles), t;
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
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : W).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const r = i.getPropertyOptions(n), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : W;
      this._$Em = n;
      const l = o.fromAttribute(e, r.type);
      this[n] = l ?? this._$Ej?.get(n) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, r) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (r = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? rt)(r, e) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
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
        const { wrapped: o } = r, l = this[n];
        o !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, r, l);
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[O("elementProperties")] = /* @__PURE__ */ new Map(), A[O("finalized")] = /* @__PURE__ */ new Map(), ge?.({ ReactiveElement: A }), (V.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis, St = (s) => s, j = ot.trustedTypes, Et = j ? j.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Nt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, Dt = "?" + $, _e = `<${Dt}>`, x = document, P = () => x.createComment(""), R = (s) => s === null || typeof s != "object" && typeof s != "function", at = Array.isArray, me = (s) => at(s) || typeof s?.[Symbol.iterator] == "function", J = `[ 	
\f\r]`, k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Tt = /-->/g, Mt = />/g, y = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), kt = /'/g, Ot = /"/g, zt = /^(?:script|style|textarea|title)$/i, fe = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), m = fe(1), C = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), Pt = /* @__PURE__ */ new WeakMap(), b = x.createTreeWalker(x, 129);
function Wt(s, t) {
  if (!at(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Et !== void 0 ? Et.createHTML(t) : t;
}
const $e = (s, t) => {
  const e = s.length - 1, i = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = k;
  for (let l = 0; l < e; l++) {
    const a = s[l];
    let d, h, c = -1, u = 0;
    for (; u < a.length && (o.lastIndex = u, h = o.exec(a), h !== null); ) u = o.lastIndex, o === k ? h[1] === "!--" ? o = Tt : h[1] !== void 0 ? o = Mt : h[2] !== void 0 ? (zt.test(h[2]) && (n = RegExp("</" + h[2], "g")), o = y) : h[3] !== void 0 && (o = y) : o === y ? h[0] === ">" ? (o = n ?? k, c = -1) : h[1] === void 0 ? c = -2 : (c = o.lastIndex - h[2].length, d = h[1], o = h[3] === void 0 ? y : h[3] === '"' ? Ot : kt) : o === Ot || o === kt ? o = y : o === Tt || o === Mt ? o = k : (o = y, n = void 0);
    const _ = o === y && s[l + 1].startsWith("/>") ? " " : "";
    r += o === k ? a + _e : c >= 0 ? (i.push(d), a.slice(0, c) + Nt + a.slice(c) + $ + _) : a + $ + (c === -2 ? l : _);
  }
  return [Wt(s, r + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class B {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const l = t.length - 1, a = this.parts, [d, h] = $e(t, e);
    if (this.el = B.createElement(d, i), b.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = b.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const c of n.getAttributeNames()) if (c.endsWith(Nt)) {
          const u = h[o++], _ = n.getAttribute(c).split($), v = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: r, name: v[2], strings: _, ctor: v[1] === "." ? be : v[1] === "?" ? xe : v[1] === "@" ? ve : q }), n.removeAttribute(c);
        } else c.startsWith($) && (a.push({ type: 6, index: r }), n.removeAttribute(c));
        if (zt.test(n.tagName)) {
          const c = n.textContent.split($), u = c.length - 1;
          if (u > 0) {
            n.textContent = j ? j.emptyScript : "";
            for (let _ = 0; _ < u; _++) n.append(c[_], P()), b.nextNode(), a.push({ type: 2, index: ++r });
            n.append(c[u], P());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Dt) a.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = n.data.indexOf($, c + 1)) !== -1; ) a.push({ type: 7, index: r }), c += $.length - 1;
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
  const r = R(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(s), n._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = S(s, n._$AS(s, t.values), n, i)), t;
}
class ye {
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
    b.currentNode = n;
    let r = b.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let d;
        a.type === 2 ? d = new L(r, r.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (d = new Ae(r, this, t)), this._$AV.push(d), a = i[++l];
      }
      o !== a?.index && (r = b.nextNode(), o++);
    }
    return b.currentNode = x, n;
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
    t = S(this, t, e), R(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== C && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : me(t) ? this.k(t) : this._(t);
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
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = B.createElement(Wt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const r = new ye(n, this), o = r.u(this.options);
      r.p(e), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Pt.get(t.strings);
    return e === void 0 && Pt.set(t.strings, e = new B(t)), e;
  }
  k(t) {
    at(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const r of t) n === e.length ? e.push(i = new L(this.O(P()), this.O(P()), this, this.options)) : i = e[n], i._$AI(r), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = St(t).nextSibling;
      St(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class q {
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
    if (r === void 0) t = S(this, t, e, 0), o = !R(t) || t !== this._$AH && t !== C, o && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = r[0], a = 0; a < r.length - 1; a++) d = S(this, l[i + a], e, a), d === C && (d = this._$AH[a]), o ||= !R(d) || d !== this._$AH[a], d === p ? t = p : t !== p && (t += (d ?? "") + r[a + 1]), this._$AH[a] = d;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class be extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class xe extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class ve extends q {
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
class Ae {
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
const we = ot.litHtmlPolyfillSupport;
we?.(B, L), (ot.litHtmlVersions ??= []).push("3.3.3");
const Ce = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const r = e?.renderBefore ?? null;
    i._$litPart$ = n = new L(t.insertBefore(P(), r), r, void 0, e ?? {});
  }
  return n._$AI(s), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt = globalThis;
class w extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ce(e, this.renderRoot, this.renderOptions);
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
}
w._$litElement$ = !0, w.finalized = !0, lt.litElementHydrateSupport?.({ LitElement: w });
const Se = lt.litElementPolyfillSupport;
Se?.({ LitElement: w });
(lt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jt = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ee = { attribute: !0, type: String, converter: W, reflect: !1, hasChanged: rt }, Te = (s = Ee, t, e) => {
  const { kind: i, metadata: n } = e;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), r.set(e.name, s), i === "accessor") {
    const { name: o } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, a, s, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, s, l), l;
    } };
  }
  if (i === "setter") {
    const { name: o } = e;
    return function(l) {
      const a = this[o];
      t.call(this, l), this.requestUpdate(o, a, s, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function ct(s) {
  return (t, e) => typeof e == "object" ? Te(s, t, e) : ((i, n, r) => {
    const o = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, i), o ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function dt(s) {
  return ct({ ...s, state: !0, attribute: !1 });
}
var Rt, Bt;
(function(s) {
  s.language = "language", s.system = "system", s.comma_decimal = "comma_decimal", s.decimal_comma = "decimal_comma", s.space_comma = "space_comma", s.none = "none";
})(Rt || (Rt = {})), function(s) {
  s.language = "language", s.system = "system", s.am_pm = "12", s.twenty_four = "24";
}(Bt || (Bt = {}));
var tt = function(s, t, e, i) {
  i = i || {}, e = e ?? {};
  var n = new Event(t, { bubbles: i.bubbles === void 0 || i.bubbles, cancelable: !!i.cancelable, composed: i.composed === void 0 || i.composed });
  return n.detail = e, s.dispatchEvent(n), n;
};
const ht = "battery-cell-card", Vt = "battery-cell-card-editor", Lt = 2.9, Me = 3.65, qt = 3, Gt = 3.55, ke = [244, 67, 54], Oe = [255, 152, 0], Pe = "#f44336", Re = "#ff9800", Be = "#26a69a", Le = ["Bulk", "Absorption", "Float"], He = {
  Bulk: "#ff9800",
  Absorption: "#42a5f5",
  Float: "#4caf50"
}, Xt = {
  16: { barW: 20, gap: 3, barH: 72, font: 8, badgeFont: 7, labelFont: 7.5 },
  8: { barW: 34, gap: 8, barH: 94, font: 11, badgeFont: 9, labelFont: 9.5 },
  4: { barW: 54, gap: 16, barH: 116, font: 13, badgeFont: 11, labelFont: 11 },
  2: { barW: 84, gap: 24, barH: 140, font: 15, badgeFont: 12, labelFont: 12.5 }
}, Ht = Object.keys(Xt).map(Number).sort((s, t) => s - t);
function Ie(s) {
  let t = Ht[0], e = Math.abs(s - t);
  for (const i of Ht) {
    const n = Math.abs(s - i);
    n < e && (t = i, e = n);
  }
  return Xt[t];
}
const Zt = "#FF7043", Kt = "#66BB6A", Jt = "#66BB6A", Ue = ["#FFB74D", "#FFA726", "#FF7043", "#EC407A"], Fe = ["#26C6DA", "#42A5F5", "#66BB6A", "#26A69A"], Ne = ["#42A5F5", "#26A69A", "#7E57C2", "#66BB6A"], De = ["off", "0", "no alarm", "ok", "normal", "false"];
function It(s) {
  return (s - Lt) / (Me - Lt) * 100;
}
function Yt(s, t, e) {
  return s + (t - s) * e;
}
function et(s) {
  return s <= qt ? "low" : s >= Gt ? "high" : "ok";
}
function Y(s) {
  const t = s.replace("#", ""), e = [0, 2, 4].map((i) => parseInt(t.substring(i, i + 2), 16));
  return [e[0] || 0, e[1] || 0, e[2] || 0];
}
function z(s) {
  return `rgb(${s[0]},${s[1]},${s[2]})`;
}
function Q(s, t) {
  return `rgba(${s[0]},${s[1]},${s[2]},${t})`;
}
function Qt(s, t, e) {
  const i = Math.max(0, Math.min(100, s)) / 100;
  return [0, 1, 2].map((n) => Math.round(Yt(t[n], e[n], i)));
}
function ze(s, t) {
  return s.map((e) => Math.max(0, Math.min(255, Math.round(e * t))));
}
function We(s, t, e, i, n, r, o) {
  const l = et(s);
  if (l === "low") return z(ke);
  if (l === "high") return z(Oe);
  const a = i ? Qt(e, n, r) : o, d = Math.max(0, Math.min(1, (t - 33) / 44)), h = Yt(0.88, 1.1, d);
  return z(ze(a, h));
}
function je(s) {
  return `${s.toFixed(2)}V`;
}
function Ve(s) {
  return `${s.toFixed(3)} V`;
}
function qe(s) {
  return s.toFixed(3);
}
function Ge(s) {
  const t = Math.max(0, s), e = Math.floor(t / 86400), i = Math.floor(t % 86400 / 3600);
  return `${e}d ${i}h`;
}
function Xe(s) {
  const t = Math.round(s);
  return `${t >= 0 ? "+" : ""}${t} mV`;
}
var Ze = Object.defineProperty, Ke = Object.getOwnPropertyDescriptor, pt = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Ke(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && Ze(t, e, n), n;
};
const Je = [
  { name: "name", selector: { text: {} } },
  {
    type: "expandable",
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
              { value: "two-row", label: "Two rows" }
            ]
          }
        }
      },
      { name: "gradient_enabled", selector: { boolean: {} } }
    ]
  }
], Ye = {
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
}, Qe = {
  alarm_entities: 'Any entity not in a healthy state shows as a warning banner. Entities whose id or name contains "allow" (e.g. Allow to charge) are treated as inverted - healthy is "on".',
  cell_entities: "Selection order sets the physical cell order shown on the card."
}, ts = [
  { key: "soc_warm_color", label: "SOC gradient — warm (low charge)", swatches: Ue, fallback: Zt },
  { key: "soc_cool_color", label: "SOC gradient — cool (high charge)", swatches: Fe, fallback: Kt },
  { key: "flat_cell_color", label: "Flat cell color (gradient off)", swatches: Ne, fallback: Jt }
];
let E = class extends w {
  constructor() {
    super(...arguments), this._computeLabel = (s) => s.title ? s.title : Ye[s.name] ?? s.name, this._computeHelper = (s) => Qe[s.name];
  }
  setConfig(s) {
    this._config = s;
  }
  render() {
    return !this.hass || !this._config ? p : m`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Je}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="colors">
        ${ts.map((s) => this._renderColorRow(s))}
      </div>
    `;
  }
  _renderColorRow(s) {
    const t = this._config?.[s.key] || s.fallback;
    return m`
      <div class="color-row">
        <div class="color-label">${s.label}</div>
        ${s.swatches.map(
      (e) => m`
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
    tt(this, "config-changed", { config: e });
  }
  _valueChanged(s) {
    s.stopPropagation(), tt(this, "config-changed", { config: s.detail.value });
  }
};
E.styles = Ft`
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
pt([
  ct({ attribute: !1 })
], E.prototype, "hass", 2);
pt([
  dt()
], E.prototype, "_config", 2);
E = pt([
  jt(Vt)
], E);
const es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get BatteryCellCardEditor() {
    return E;
  }
}, Symbol.toStringTag, { value: "Module" }));
var ss = Object.defineProperty, is = Object.getOwnPropertyDescriptor, G = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? is(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && ss(t, e, n), n;
};
let T = class extends w {
  constructor() {
    super(...arguments), this._selectedCellIndex = null;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => es), document.createElement(Vt);
  }
  static getStubConfig() {
    return {
      type: `custom:${ht}`,
      cell_entities: [],
      soc_entity: "",
      layout_mode: "single-row",
      gradient_enabled: !0
    };
  }
  setConfig(s) {
    if (!s)
      throw new Error("Invalid configuration");
    if (!Array.isArray(s.cell_entities) || s.cell_entities.length === 0)
      throw new Error(
        "battery-cell-card: `cell_entities` must be a non-empty list of per-cell voltage entity ids"
      );
    if (!s.soc_entity)
      throw new Error("battery-cell-card: `soc_entity` is required");
    this._config = { layout_mode: "single-row", gradient_enabled: !0, ...s }, this._selectedCellIndex = null;
  }
  getCardSize() {
    let s = 5;
    return this._alarmMessages().length && (s += 1), this._selectedCellIndex !== null && (s += 1), s;
  }
  getGridOptions() {
    return { columns: 12, rows: 5, min_columns: 6, min_rows: 4 };
  }
  render() {
    if (!this._config || !this.hass) return p;
    const s = this._config, t = !!this.hass.themes?.darkMode, e = this._themeTokens(t), i = this._cellVoltages(), n = i.length, r = this._num(s.soc_entity) ?? 0, o = s.gradient_enabled ?? !0, l = Y(s.soc_warm_color || Zt), a = Y(s.soc_cool_color || Kt), d = Y(s.flat_cell_color || Jt), c = (s.layout_mode ?? "single-row") === "two-row" ? Math.ceil(n / 2) : n, u = Ie(c), _ = c * u.barW + (c - 1) * u.gap, { minIdx: v, maxIdx: te } = this._minMaxIdx(i), ee = this._average(i), ut = i.map((g, f) => {
      const Z = f === v, K = f === te;
      return g === null ? {
        index: f,
        label: `C${f + 1}`,
        voltage: NaN,
        voltageLabel: "--",
        heightPct: 0,
        color: e.barTrackBg,
        badge: "",
        badgeColor: "transparent",
        isMin: !1,
        isMax: !1
      } : {
        index: f,
        label: `C${f + 1}`,
        voltage: g,
        voltageLabel: je(g),
        heightPct: Math.max(0, Math.min(100, It(g))),
        color: We(g, It(g), r, o, l, a, d),
        badge: Z ? "▼" : K ? "▲" : "",
        badgeColor: Z ? Pe : K ? Re : "transparent",
        isMin: Z,
        isMax: K
      };
    }), H = o ? Qt(r, l, a) : d, X = z(H), I = this._alarmMessages(), se = I.length > 0, U = i.filter((g) => g !== null), gt = this._num(s.pack_voltage_entity) ?? U.reduce((g, f) => g + f, 0), F = this._num(s.current_entity), _t = this._num(s.power_entity) ?? (F !== null ? F * gt : null), ie = this._num(s.deviation_entity) ?? (U.length ? Math.max(...U) - Math.min(...U) : 0), mt = this._num(s.capacity_remaining_entity), ft = this._num(s.capacity_installed_entity), $t = this._num(s.cycles_entity), yt = this._num(s.since_full_charge_entity), bt = this._state(s.temperature_entity), ne = s.temperature_entity ? this.hass.states[s.temperature_entity]?.attributes?.unit_of_measurement ?? "" : "", M = this._state(s.charge_mode_entity), xt = M && Le.includes(M) ? He[M] : "#9e9e9e", N = this._expandedDetail(ut, ee);
    return m`
      <ha-card
        style="background:${e.cardBg};color:${e.primaryText};box-shadow:${e.cardShadow};"
      >
        <div
          class="header"
          style="background:linear-gradient(180deg, ${Q(H, e.socHeaderTintAlpha)}, rgba(0,0,0,0));"
        >
          <div class="icon-badge" style="background:${Q(H, e.socIconBgAlpha)};">
            <div class="battery-glyph" style="border-color:${X};">
              <span style="background:${X};"></span>
            </div>
          </div>
          <div class="title-block">
            <div class="title">${s.name || "Battery Bank"}</div>
            <div class="subtitle" style="color:${e.subtitleText};">LiFePO4 · ${n}S</div>
          </div>
          <div class="soc-chip" style="background:${Q(H, e.socChipBgAlpha)};color:${X};">
            ${Math.round(r)}%
          </div>
          <div class="kebab" style="color:${e.kebabText};" @click=${this._handleMoreInfo}>⋮</div>
        </div>

        <div class="badges-row">
          <div class="pill" style="background:${e.powerPillBg};color:${e.primaryText};">
            ⚡ ${_t !== null ? _t.toFixed(1) : "--"} W
          </div>
          ${M ? m`<div
                class="pill"
                style="background:${xt}${e.chargeModeAlpha};color:${xt};"
              >
                ${M}
              </div>` : p}
        </div>

        ${se ? m`<div
              class="alarm-banner"
              style="background:${e.alarmBg};border:1px solid ${e.alarmBorder};color:${e.alarmText};"
            >
              ⚠ ${I[0]}${I.length > 1 ? ` (+${I.length - 1} more)` : ""}
            </div>` : p}

        <div class="cells-wrap">
          <div class="cells-row" style="gap:${u.gap}px;width:${_}px;">
            ${ut.map(
      (g) => m`
                <div class="cell" style="width:${u.barW}px;" @click=${() => this._toggleCell(g.index)}>
                  <div
                    class="cell-voltage"
                    style="font-size:${u.font}px;height:${u.font}px;color:${e.primaryText};"
                  >
                    ${g.voltageLabel}
                  </div>
                  <div
                    class="cell-badge"
                    style="font-size:${u.badgeFont}px;height:${u.badgeFont}px;color:${g.badgeColor};"
                  >
                    ${g.badge}
                  </div>
                  <div
                    class="cell-track"
                    style="width:${u.barW}px;height:${u.barH}px;background:${e.barTrackBg};border:${this._selectedCellIndex === g.index ? `2px solid ${Be}` : `1px solid ${e.barTrackBorder}`};"
                  >
                    <div class="cell-fill" style="height:${g.heightPct}%;background:${g.color};"></div>
                  </div>
                  <div class="cell-label" style="font-size:${u.labelFont}px;color:${e.cellIndexText};">
                    ${g.label}
                  </div>
                </div>
              `
    )}
          </div>
        </div>

        ${N ? m`<div
              class="expanded-panel"
              style="background:${e.expandedBg};border:1px solid ${e.expandedBorder};"
            >
              <div class="expanded-title">${N.title}</div>
              <div style="color:${e.expandedSecondaryText};">${N.line1}</div>
              <div style="color:${e.expandedSecondaryText};">${N.line2}</div>
            </div>` : p}

        <div class="divider" style="background:${e.hairlineMain};"></div>

        <div class="stats-grid">
          ${this._statRow("Pack voltage", `${gt.toFixed(2)} V`, e)}
          ${this._statRow("Deviation", `${qe(ie)} V`, e)}
          ${this._statRow("Current", F !== null ? `${F.toFixed(1)} A` : "--", e)}
          ${this._statRow("Remaining", mt !== null ? `${mt.toFixed(1)} Ah` : "--", e)}
          ${this._statRow("Temp", bt !== null ? `${bt}${ne}` : "--", e)}
          ${this._statRow("Installed", ft !== null ? `${ft.toFixed(1)} Ah` : "--", e)}
          ${this._statRow("Cycles", $t !== null ? `${Math.round($t)}` : "--", e, !0)}
          ${this._statRow(
      "Since full charge",
      yt !== null ? Ge(yt) : "--",
      e,
      !0
    )}
        </div>
      </ha-card>
    `;
  }
  _statRow(s, t, e, i = !1) {
    return m`<div
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
      let o = 1 / 0, l = -1 / 0, a = -1, d = -1;
      s.forEach((h, c) => {
        h !== null && (h < o && (o = h, a = c), h > l && (l = h, d = c));
      }), e === -1 && (e = a), i === -1 && (i = d);
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
    return s.invert ? e !== "on" : !(s.ok_states ?? De).map((n) => n.toLowerCase()).includes(e);
  }
  _alarmMessages() {
    if (!this._config || !this.hass) return [];
    const s = [], t = this._cellVoltages(), e = t.findIndex((n) => n !== null && et(n) === "high"), i = t.findIndex((n) => n !== null && et(n) === "low");
    e !== -1 && s.push(`High cell voltage — C${e + 1} exceeds ${Gt.toFixed(2)} V`), i !== -1 && s.push(`Low cell voltage — C${i + 1} at or below ${qt.toFixed(2)} V`);
    for (const n of this._config.alarm_entities ?? []) {
      const r = this._normalizeAlarm(n);
      if (this._isAlarmProblem(r)) {
        const o = r.name ?? this._friendlyName(r.entity), l = this._state(r.entity);
        s.push(`${o}${l ? `: ${l}` : ""}`);
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
      title: `Cell ${e.index + 1} · ${Ve(e.voltage)}`,
      line1: `${Xe(i)} from pack average`,
      line2: n
    };
  }
  _toggleCell(s) {
    this._selectedCellIndex = this._selectedCellIndex === s ? null : s;
  }
  _handleMoreInfo(s) {
    s.stopPropagation();
    const t = this._config.soc_entity;
    t && tt(this, "hass-more-info", { entityId: t });
  }
};
T.styles = Ft`
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
G([
  ct({ attribute: !1 })
], T.prototype, "hass", 2);
G([
  dt()
], T.prototype, "_config", 2);
G([
  dt()
], T.prototype, "_selectedCellIndex", 2);
T = G([
  jt(ht)
], T);
const st = window;
st.customCards = st.customCards || [];
st.customCards.push({
  type: ht,
  name: "Battery Cell Card",
  description: "Per-cell voltage, balancing, SOC, power, and health monitoring for a LiFePO4 battery pack.",
  preview: !0,
  documentationURL: "https://github.com/bb12489/ha-bms-card"
});
export {
  T as BatteryCellCard
};
