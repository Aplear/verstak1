if (function(t, e) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
            if (!t.document) throw new Error("jQuery requires a window with a document");
            return e(t)
        } : e(t)
    }("undefined" != typeof window ? window : this, function(t, e) {
        function n(t) {
            var e = !!t && "length" in t && t.length,
                n = tt.type(t);
            return "function" !== n && !tt.isWindow(t) && ("array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
        }

        function i(t, e, n) {
            if (tt.isFunction(e)) return tt.grep(t, function(t, i) {
                return !!e.call(t, i, t) !== n
            });
            if (e.nodeType) return tt.grep(t, function(t) {
                return t === e !== n
            });
            if ("string" == typeof e) {
                if (dt.test(e)) return tt.filter(e, t, n);
                e = tt.filter(e, t)
            }
            return tt.grep(t, function(t) {
                return V.call(e, t) > -1 !== n
            })
        }

        function o(t, e) {
            for (;
                (t = t[e]) && 1 !== t.nodeType;);
            return t
        }

        function r() {
            z.removeEventListener("DOMContentLoaded", r), t.removeEventListener("load", r), tt.ready()
        }

        function s() {
            this.expando = tt.expando + s.uid++
        }

        function a(t, e, n) {
            var i;
            if (void 0 === n && 1 === t.nodeType)
                if (i = "data-" + e.replace(St, "-$&").toLowerCase(), "string" == typeof(n = t.getAttribute(i))) {
                    try {
                        n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : wt.test(n) ? tt.parseJSON(n) : n)
                    } catch (t) {}
                    bt.set(t, e, n)
                } else n = void 0;
            return n
        }

        function l(t, e, n, i) {
            var o, r = 1,
                s = 20,
                a = i ? function() {
                    return i.cur()
                } : function() {
                    return tt.css(t, e, "")
                },
                l = a(),
                c = n && n[3] || (tt.cssNumber[e] ? "" : "px"),
                d = (tt.cssNumber[e] || "px" !== c && +l) && Tt.exec(tt.css(t, e));
            if (d && d[3] !== c) {
                c = c || d[3], n = n || [], d = +l || 1;
                do {
                    r = r || ".5", d /= r, tt.style(t, e, d + c)
                } while (r !== (r = a() / l) && 1 !== r && --s)
            }
            return n && (d = +d || +l || 0, o = n[1] ? d + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, i.start = d, i.end = o)), o
        }

        function c(t, e) {
            var n = void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e || "*") : void 0 !== t.querySelectorAll ? t.querySelectorAll(e || "*") : [];
            return void 0 === e || e && tt.nodeName(t, e) ? tt.merge([t], n) : n
        }

        function d(t, e) {
            for (var n = 0, i = t.length; i > n; n++) xt.set(t[n], "globalEval", !e || xt.get(e[n], "globalEval"))
        }

        function u(t, e, n, i, o) {
            for (var r, s, a, l, u, f, p = e.createDocumentFragment(), h = [], g = 0, m = t.length; m > g; g++)
                if ((r = t[g]) || 0 === r)
                    if ("object" === tt.type(r)) tt.merge(h, r.nodeType ? [r] : r);
                    else if (It.test(r)) {
                for (s = s || p.appendChild(e.createElement("div")), a = (Dt.exec(r) || ["", ""])[1].toLowerCase(), l = At[a] || At._default, s.innerHTML = l[1] + tt.htmlPrefilter(r) + l[2], f = l[0]; f--;) s = s.lastChild;
                tt.merge(h, s.childNodes), (s = p.firstChild).textContent = ""
            } else h.push(e.createTextNode(r));
            for (p.textContent = "", g = 0; r = h[g++];)
                if (i && tt.inArray(r, i) > -1) o && o.push(r);
                else if (u = tt.contains(r.ownerDocument, r), s = c(p.appendChild(r), "script"), u && d(s), n)
                for (f = 0; r = s[f++];) $t.test(r.type || "") && n.push(r);
            return p
        }

        function f() {
            return !0
        }

        function p() {
            return !1
        }

        function h() {
            try {
                return z.activeElement
            } catch (t) {}
        }

        function g(t, e, n, i, o, r) {
            var s, a;
            if ("object" == typeof e) {
                "string" != typeof n && (i = i || n, n = void 0);
                for (a in e) g(t, a, n, i, e[a], r);
                return t
            }
            if (null == i && null == o ? (o = n, i = n = void 0) : null == o && ("string" == typeof n ? (o = i, i = void 0) : (o = i, i = n, n = void 0)), !1 === o) o = p;
            else if (!o) return t;
            return 1 === r && (s = o, o = function(t) {
                return tt().off(t), s.apply(this, arguments)
            }, o.guid = s.guid || (s.guid = tt.guid++)), t.each(function() {
                tt.event.add(this, e, o, i, n)
            })
        }

        function m(t, e) {
            return tt.nodeName(t, "table") && tt.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
        }

        function v(t) {
            return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
        }

        function y(t) {
            var e = Pt.exec(t.type);
            return e ? t.type = e[1] : t.removeAttribute("type"), t
        }

        function x(t, e) {
            var n, i, o, r, s, a, l, c;
            if (1 === e.nodeType) {
                if (xt.hasData(t) && (r = xt.access(t), s = xt.set(e, r), c = r.events)) {
                    delete s.handle, s.events = {};
                    for (o in c)
                        for (n = 0, i = c[o].length; i > n; n++) tt.event.add(e, o, c[o][n])
                }
                bt.hasData(t) && (a = bt.access(t), l = tt.extend({}, a), bt.set(e, l))
            }
        }

        function b(t, e) {
            var n = e.nodeName.toLowerCase();
            "input" === n && _t.test(t.type) ? e.checked = t.checked : "input" !== n && "textarea" !== n || (e.defaultValue = t.defaultValue)
        }

        function w(t, e, n, i) {
            e = X.apply([], e);
            var o, r, s, a, l, d, f = 0,
                p = t.length,
                h = p - 1,
                g = e[0],
                m = tt.isFunction(g);
            if (m || p > 1 && "string" == typeof g && !Z.checkClone && Lt.test(g)) return t.each(function(o) {
                var r = t.eq(o);
                m && (e[0] = g.call(this, o, r.html())), w(r, e, n, i)
            });
            if (p && (o = u(e, t[0].ownerDocument, !1, t, i), r = o.firstChild, 1 === o.childNodes.length && (o = r), r || i)) {
                for (a = (s = tt.map(c(o, "script"), v)).length; p > f; f++) l = o, f !== h && (l = tt.clone(l, !0, !0), a && tt.merge(s, c(l, "script"))), n.call(t[f], l, f);
                if (a)
                    for (d = s[s.length - 1].ownerDocument, tt.map(s, y), f = 0; a > f; f++) l = s[f], $t.test(l.type || "") && !xt.access(l, "globalEval") && tt.contains(d, l) && (l.src ? tt._evalUrl && tt._evalUrl(l.src) : tt.globalEval(l.textContent.replace(Rt, "")))
            }
            return t
        }

        function S(t, e, n) {
            for (var i, o = e ? tt.filter(e, t) : t, r = 0; null != (i = o[r]); r++) n || 1 !== i.nodeType || tt.cleanData(c(i)), i.parentNode && (n && tt.contains(i.ownerDocument, i) && d(c(i, "script")), i.parentNode.removeChild(i));
            return t
        }

        function C(t, e) {
            var n = tt(e.createElement(t)).appendTo(e.body),
                i = tt.css(n[0], "display");
            return n.detach(), i
        }

        function T(t) {
            var e = z,
                n = Ht[t];
            return n || ("none" !== (n = C(t, e)) && n || (qt = (qt || tt("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), (e = qt[0].contentDocument).write(), e.close(), n = C(t, e), qt.detach()), Ht[t] = n), n
        }

        function k(t, e, n) {
            var i, o, r, s, a = t.style;
            return n = n || zt(t), "" !== (s = n ? n.getPropertyValue(e) || n[e] : void 0) && void 0 !== s || tt.contains(t.ownerDocument, t) || (s = tt.style(t, e)), n && !Z.pixelMarginRight() && Ft.test(s) && Wt.test(e) && (i = a.width, o = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = o, a.maxWidth = r), void 0 !== s ? s + "" : s
        }

        function E(t, e) {
            return {
                get: function() {
                    return t() ? void delete this.get : (this.get = e).apply(this, arguments)
                }
            }
        }

        function _(t) {
            if (t in Kt) return t;
            for (var e = t[0].toUpperCase() + t.slice(1), n = Gt.length; n--;)
                if ((t = Gt[n] + e) in Kt) return t
        }

        function D(t, e, n) {
            var i = Tt.exec(e);
            return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : e
        }

        function $(t, e, n, i, o) {
            for (var r = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0, s = 0; 4 > r; r += 2) "margin" === n && (s += tt.css(t, n + kt[r], !0, o)), i ? ("content" === n && (s -= tt.css(t, "padding" + kt[r], !0, o)), "margin" !== n && (s -= tt.css(t, "border" + kt[r] + "Width", !0, o))) : (s += tt.css(t, "padding" + kt[r], !0, o), "padding" !== n && (s += tt.css(t, "border" + kt[r] + "Width", !0, o)));
            return s
        }

        function A(t, e, n) {
            var i = !0,
                o = "width" === e ? t.offsetWidth : t.offsetHeight,
                r = zt(t),
                s = "border-box" === tt.css(t, "boxSizing", !1, r);
            if (0 >= o || null == o) {
                if ((0 > (o = k(t, e, r)) || null == o) && (o = t.style[e]), Ft.test(o)) return o;
                i = s && (Z.boxSizingReliable() || o === t.style[e]), o = parseFloat(o) || 0
            }
            return o + $(t, e, n || (s ? "border" : "content"), i, r) + "px"
        }

        function I(t, e) {
            for (var n, i, o, r = [], s = 0, a = t.length; a > s; s++)(i = t[s]).style && (r[s] = xt.get(i, "olddisplay"), n = i.style.display, e ? (r[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && Et(i) && (r[s] = xt.access(i, "olddisplay", T(i.nodeName)))) : (o = Et(i), "none" === n && o || xt.set(i, "olddisplay", o ? n : tt.css(i, "display"))));
            for (s = 0; a > s; s++)(i = t[s]).style && (e && "none" !== i.style.display && "" !== i.style.display || (i.style.display = e ? r[s] || "" : "none"));
            return t
        }

        function O(t, e, n, i, o) {
            return new O.prototype.init(t, e, n, i, o)
        }

        function N() {
            return t.setTimeout(function() {
                Zt = void 0
            }), Zt = tt.now()
        }

        function M(t, e) {
            var n, i = 0,
                o = {
                    height: t
                };
            for (e = e ? 1 : 0; 4 > i; i += 2 - e) n = kt[i], o["margin" + n] = o["padding" + n] = t;
            return e && (o.opacity = o.width = t), o
        }

        function j(t, e, n) {
            for (var i, o = (B.tweeners[e] || []).concat(B.tweeners["*"]), r = 0, s = o.length; s > r; r++)
                if (i = o[r].call(n, e, t)) return i
        }

        function B(t, e, n) {
            var i, o, r = 0,
                s = B.prefilters.length,
                a = tt.Deferred().always(function() {
                    delete l.elem
                }),
                l = function() {
                    if (o) return !1;
                    for (var e = Zt || N(), n = Math.max(0, c.startTime + c.duration - e), i = 1 - (n / c.duration || 0), r = 0, s = c.tweens.length; s > r; r++) c.tweens[r].run(i);
                    return a.notifyWith(t, [c, i, n]), 1 > i && s ? n : (a.resolveWith(t, [c]), !1)
                },
                c = a.promise({
                    elem: t,
                    props: tt.extend({}, e),
                    opts: tt.extend(!0, {
                        specialEasing: {},
                        easing: tt.easing._default
                    }, n),
                    originalProperties: e,
                    originalOptions: n,
                    startTime: Zt || N(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(e, n) {
                        var i = tt.Tween(t, c.opts, e, n, c.opts.specialEasing[e] || c.opts.easing);
                        return c.tweens.push(i), i
                    },
                    stop: function(e) {
                        var n = 0,
                            i = e ? c.tweens.length : 0;
                        if (o) return this;
                        for (o = !0; i > n; n++) c.tweens[n].run(1);
                        return e ? (a.notifyWith(t, [c, 1, 0]), a.resolveWith(t, [c, e])) : a.rejectWith(t, [c, e]), this
                    }
                }),
                d = c.props;
            for (function(t, e) {
                    var n, i, o, r, s;
                    for (n in t)
                        if (i = tt.camelCase(n), o = e[i], r = t[n], tt.isArray(r) && (o = r[1], r = t[n] = r[0]), n !== i && (t[i] = r, delete t[n]), (s = tt.cssHooks[i]) && "expand" in s) {
                            r = s.expand(r), delete t[i];
                            for (n in r) n in t || (t[n] = r[n], e[n] = o)
                        } else e[i] = o
                }(d, c.opts.specialEasing); s > r; r++)
                if (i = B.prefilters[r].call(c, t, d, c.opts)) return tt.isFunction(i.stop) && (tt._queueHooks(c.elem, c.opts.queue).stop = tt.proxy(i.stop, i)), i;
            return tt.map(d, j, c), tt.isFunction(c.opts.start) && c.opts.start.call(t, c), tt.fx.timer(tt.extend(l, {
                elem: t,
                anim: c,
                queue: c.opts.queue
            })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
        }

        function L(t) {
            return t.getAttribute && t.getAttribute("class") || ""
        }

        function P(t) {
            return function(e, n) {
                "string" != typeof e && (n = e, e = "*");
                var i, o = 0,
                    r = e.toLowerCase().match(gt) || [];
                if (tt.isFunction(n))
                    for (; i = r[o++];) "+" === i[0] ? (i = i.slice(1) || "*", (t[i] = t[i] || []).unshift(n)) : (t[i] = t[i] || []).push(n)
            }
        }

        function R(t, e, n, i) {
            function o(a) {
                var l;
                return r[a] = !0, tt.each(t[a] || [], function(t, a) {
                    var c = a(e, n, i);
                    return "string" != typeof c || s || r[c] ? s ? !(l = c) : void 0 : (e.dataTypes.unshift(c), o(c), !1)
                }), l
            }
            var r = {},
                s = t === xe;
            return o(e.dataTypes[0]) || !r["*"] && o("*")
        }

        function q(t, e) {
            var n, i, o = tt.ajaxSettings.flatOptions || {};
            for (n in e) void 0 !== e[n] && ((o[n] ? t : i || (i = {}))[n] = e[n]);
            return i && tt.extend(!0, t, i), t
        }

        function H(t, e, n, i) {
            var o;
            if (tt.isArray(e)) tt.each(e, function(e, o) {
                n || Ce.test(t) ? i(t, o) : H(t + "[" + ("object" == typeof o && null != o ? e : "") + "]", o, n, i)
            });
            else if (n || "object" !== tt.type(e)) i(t, e);
            else
                for (o in e) H(t + "[" + o + "]", e[o], n, i)
        }

        function W(t) {
            return tt.isWindow(t) ? t : 9 === t.nodeType && t.defaultView
        }
        var F = [],
            z = t.document,
            U = F.slice,
            X = F.concat,
            Y = F.push,
            V = F.indexOf,
            Q = {},
            G = Q.toString,
            K = Q.hasOwnProperty,
            Z = {},
            J = "2.2.4",
            tt = function(t, e) {
                return new tt.fn.init(t, e)
            },
            et = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            nt = /^-ms-/,
            it = /-([\da-z])/gi,
            ot = function(t, e) {
                return e.toUpperCase()
            };
        tt.fn = tt.prototype = {
            jquery: J,
            constructor: tt,
            selector: "",
            length: 0,
            toArray: function() {
                return U.call(this)
            },
            get: function(t) {
                return null != t ? 0 > t ? this[t + this.length] : this[t] : U.call(this)
            },
            pushStack: function(t) {
                var e = tt.merge(this.constructor(), t);
                return e.prevObject = this, e.context = this.context, e
            },
            each: function(t) {
                return tt.each(this, t)
            },
            map: function(t) {
                return this.pushStack(tt.map(this, function(e, n) {
                    return t.call(e, n, e)
                }))
            },
            slice: function() {
                return this.pushStack(U.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(t) {
                var e = this.length,
                    n = +t + (0 > t ? e : 0);
                return this.pushStack(n >= 0 && e > n ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: Y,
            sort: F.sort,
            splice: F.splice
        }, tt.extend = tt.fn.extend = function() {
            var t, e, n, i, o, r, s = arguments[0] || {},
                a = 1,
                l = arguments.length,
                c = !1;
            for ("boolean" == typeof s && (c = s, s = arguments[a] || {}, a++), "object" == typeof s || tt.isFunction(s) || (s = {}), a === l && (s = this, a--); l > a; a++)
                if (null != (t = arguments[a]))
                    for (e in t) n = s[e], i = t[e], s !== i && (c && i && (tt.isPlainObject(i) || (o = tt.isArray(i))) ? (o ? (o = !1, r = n && tt.isArray(n) ? n : []) : r = n && tt.isPlainObject(n) ? n : {}, s[e] = tt.extend(c, r, i)) : void 0 !== i && (s[e] = i));
            return s
        }, tt.extend({
            expando: "jQuery" + (J + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(t) {
                throw new Error(t)
            },
            noop: function() {},
            isFunction: function(t) {
                return "function" === tt.type(t)
            },
            isArray: Array.isArray,
            isWindow: function(t) {
                return null != t && t === t.window
            },
            isNumeric: function(t) {
                var e = t && t.toString();
                return !tt.isArray(t) && e - parseFloat(e) + 1 >= 0
            },
            isPlainObject: function(t) {
                var e;
                if ("object" !== tt.type(t) || t.nodeType || tt.isWindow(t)) return !1;
                if (t.constructor && !K.call(t, "constructor") && !K.call(t.constructor.prototype || {}, "isPrototypeOf")) return !1;
                for (e in t);
                return void 0 === e || K.call(t, e)
            },
            isEmptyObject: function(t) {
                var e;
                for (e in t) return !1;
                return !0
            },
            type: function(t) {
                return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? Q[G.call(t)] || "object" : typeof t
            },
            globalEval: function(t) {
                var e, n = eval;
                (t = tt.trim(t)) && (1 === t.indexOf("use strict") ? (e = z.createElement("script"), e.text = t, z.head.appendChild(e).parentNode.removeChild(e)) : n(t))
            },
            camelCase: function(t) {
                return t.replace(nt, "ms-").replace(it, ot)
            },
            nodeName: function(t, e) {
                return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
            },
            each: function(t, e) {
                var i, o = 0;
                if (n(t))
                    for (i = t.length; i > o && !1 !== e.call(t[o], o, t[o]); o++);
                else
                    for (o in t)
                        if (!1 === e.call(t[o], o, t[o])) break;
                return t
            },
            trim: function(t) {
                return null == t ? "" : (t + "").replace(et, "")
            },
            makeArray: function(t, e) {
                var i = e || [];
                return null != t && (n(Object(t)) ? tt.merge(i, "string" == typeof t ? [t] : t) : Y.call(i, t)), i
            },
            inArray: function(t, e, n) {
                return null == e ? -1 : V.call(e, t, n)
            },
            merge: function(t, e) {
                for (var n = +e.length, i = 0, o = t.length; n > i; i++) t[o++] = e[i];
                return t.length = o, t
            },
            grep: function(t, e, n) {
                for (var i = [], o = 0, r = t.length, s = !n; r > o; o++) !e(t[o], o) !== s && i.push(t[o]);
                return i
            },
            map: function(t, e, i) {
                var o, r, s = 0,
                    a = [];
                if (n(t))
                    for (o = t.length; o > s; s++) null != (r = e(t[s], s, i)) && a.push(r);
                else
                    for (s in t) null != (r = e(t[s], s, i)) && a.push(r);
                return X.apply([], a)
            },
            guid: 1,
            proxy: function(t, e) {
                var n, i, o;
                return "string" == typeof e && (n = t[e], e = t, t = n), tt.isFunction(t) ? (i = U.call(arguments, 2), o = function() {
                    return t.apply(e || this, i.concat(U.call(arguments)))
                }, o.guid = t.guid = t.guid || tt.guid++, o) : void 0
            },
            now: Date.now,
            support: Z
        }), "function" == typeof Symbol && (tt.fn[Symbol.iterator] = F[Symbol.iterator]), tt.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, e) {
            Q["[object " + e + "]"] = e.toLowerCase()
        });
        var rt = function(t) {
            function e(t, e, n, i) {
                var o, r, s, a, l, c, u, p, h = e && e.ownerDocument,
                    g = e ? e.nodeType : 9;
                if (n = n || [], "string" != typeof t || !t || 1 !== g && 9 !== g && 11 !== g) return n;
                if (!i && ((e ? e.ownerDocument || e : R) !== I && A(e), e = e || I, N)) {
                    if (11 !== g && (c = mt.exec(t)))
                        if (o = c[1]) {
                            if (9 === g) {
                                if (!(s = e.getElementById(o))) return n;
                                if (s.id === o) return n.push(s), n
                            } else if (h && (s = h.getElementById(o)) && L(e, s) && s.id === o) return n.push(s), n
                        } else {
                            if (c[2]) return K.apply(n, e.getElementsByTagName(t)), n;
                            if ((o = c[3]) && b.getElementsByClassName && e.getElementsByClassName) return K.apply(n, e.getElementsByClassName(o)), n
                        } if (b.qsa && !z[t + " "] && (!M || !M.test(t))) {
                        if (1 !== g) h = e, p = t;
                        else if ("object" !== e.nodeName.toLowerCase()) {
                            for ((a = e.getAttribute("id")) ? a = a.replace(yt, "\\$&") : e.setAttribute("id", a = P), r = (u = T(t)).length, l = ut.test(a) ? "#" + a : "[id='" + a + "']"; r--;) u[r] = l + " " + f(u[r]);
                            p = u.join(","), h = vt.test(t) && d(e.parentNode) || e
                        }
                        if (p) try {
                            return K.apply(n, h.querySelectorAll(p)), n
                        } catch (t) {} finally {
                            a === P && e.removeAttribute("id")
                        }
                    }
                }
                return E(t.replace(st, "$1"), e, n, i)
            }

            function n() {
                function t(n, i) {
                    return e.push(n + " ") > w.cacheLength && delete t[e.shift()], t[n + " "] = i
                }
                var e = [];
                return t
            }

            function i(t) {
                return t[P] = !0, t
            }

            function o(t) {
                var e = I.createElement("div");
                try {
                    return !!t(e)
                } catch (t) {
                    return !1
                } finally {
                    e.parentNode && e.parentNode.removeChild(e), e = null
                }
            }

            function r(t, e) {
                for (var n = t.split("|"), i = n.length; i--;) w.attrHandle[n[i]] = e
            }

            function s(t, e) {
                var n = e && t,
                    i = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || X) - (~t.sourceIndex || X);
                if (i) return i;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === e) return -1;
                return t ? 1 : -1
            }

            function a(t) {
                return function(e) {
                    return "input" === e.nodeName.toLowerCase() && e.type === t
                }
            }

            function l(t) {
                return function(e) {
                    var n = e.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && e.type === t
                }
            }

            function c(t) {
                return i(function(e) {
                    return e = +e, i(function(n, i) {
                        for (var o, r = t([], n.length, e), s = r.length; s--;) n[o = r[s]] && (n[o] = !(i[o] = n[o]))
                    })
                })
            }

            function d(t) {
                return t && void 0 !== t.getElementsByTagName && t
            }

            function u() {}

            function f(t) {
                for (var e = 0, n = t.length, i = ""; n > e; e++) i += t[e].value;
                return i
            }

            function p(t, e, n) {
                var i = e.dir,
                    o = n && "parentNode" === i,
                    r = H++;
                return e.first ? function(e, n, r) {
                    for (; e = e[i];)
                        if (1 === e.nodeType || o) return t(e, n, r)
                } : function(e, n, s) {
                    var a, l, c, d = [q, r];
                    if (s) {
                        for (; e = e[i];)
                            if ((1 === e.nodeType || o) && t(e, n, s)) return !0
                    } else
                        for (; e = e[i];)
                            if (1 === e.nodeType || o) {
                                if (c = e[P] || (e[P] = {}), l = c[e.uniqueID] || (c[e.uniqueID] = {}), (a = l[i]) && a[0] === q && a[1] === r) return d[2] = a[2];
                                if (l[i] = d, d[2] = t(e, n, s)) return !0
                            }
                }
            }

            function h(t) {
                return t.length > 1 ? function(e, n, i) {
                    for (var o = t.length; o--;)
                        if (!t[o](e, n, i)) return !1;
                    return !0
                } : t[0]
            }

            function g(t, e, n, i, o) {
                for (var r, s = [], a = 0, l = t.length, c = null != e; l > a; a++)(r = t[a]) && (n && !n(r, i, o) || (s.push(r), c && e.push(a)));
                return s
            }

            function m(t, n, o, r, s, a) {
                return r && !r[P] && (r = m(r)), s && !s[P] && (s = m(s, a)), i(function(i, a, l, c) {
                    var d, u, f, p = [],
                        h = [],
                        m = a.length,
                        v = i || function(t, n, i) {
                            for (var o = 0, r = n.length; r > o; o++) e(t, n[o], i);
                            return i
                        }(n || "*", l.nodeType ? [l] : l, []),
                        y = !t || !i && n ? v : g(v, p, t, l, c),
                        x = o ? s || (i ? t : m || r) ? [] : a : y;
                    if (o && o(y, x, l, c), r)
                        for (d = g(x, h), r(d, [], l, c), u = d.length; u--;)(f = d[u]) && (x[h[u]] = !(y[h[u]] = f));
                    if (i) {
                        if (s || t) {
                            if (s) {
                                for (d = [], u = x.length; u--;)(f = x[u]) && d.push(y[u] = f);
                                s(null, x = [], d, c)
                            }
                            for (u = x.length; u--;)(f = x[u]) && (d = s ? J(i, f) : p[u]) > -1 && (i[d] = !(a[d] = f))
                        }
                    } else x = g(x === a ? x.splice(m, x.length) : x), s ? s(null, a, x, c) : K.apply(a, x)
                })
            }

            function v(t) {
                for (var e, n, i, o = t.length, r = w.relative[t[0].type], s = r || w.relative[" "], a = r ? 1 : 0, l = p(function(t) {
                        return t === e
                    }, s, !0), c = p(function(t) {
                        return J(e, t) > -1
                    }, s, !0), d = [function(t, n, i) {
                        var o = !r && (i || n !== _) || ((e = n).nodeType ? l(t, n, i) : c(t, n, i));
                        return e = null, o
                    }]; o > a; a++)
                    if (n = w.relative[t[a].type]) d = [p(h(d), n)];
                    else {
                        if ((n = w.filter[t[a].type].apply(null, t[a].matches))[P]) {
                            for (i = ++a; o > i && !w.relative[t[i].type]; i++);
                            return m(a > 1 && h(d), a > 1 && f(t.slice(0, a - 1).concat({
                                value: " " === t[a - 2].type ? "*" : ""
                            })).replace(st, "$1"), n, i > a && v(t.slice(a, i)), o > i && v(t = t.slice(i)), o > i && f(t))
                        }
                        d.push(n)
                    } return h(d)
            }

            function y(t, n) {
                var o = n.length > 0,
                    r = t.length > 0,
                    s = function(i, s, a, l, c) {
                        var d, u, f, p = 0,
                            h = "0",
                            m = i && [],
                            v = [],
                            y = _,
                            x = i || r && w.find.TAG("*", c),
                            b = q += null == y ? 1 : Math.random() || .1,
                            S = x.length;
                        for (c && (_ = s === I || s || c); h !== S && null != (d = x[h]); h++) {
                            if (r && d) {
                                for (u = 0, s || d.ownerDocument === I || (A(d), a = !N); f = t[u++];)
                                    if (f(d, s || I, a)) {
                                        l.push(d);
                                        break
                                    } c && (q = b)
                            }
                            o && ((d = !f && d) && p--, i && m.push(d))
                        }
                        if (p += h, o && h !== p) {
                            for (u = 0; f = n[u++];) f(m, v, s, a);
                            if (i) {
                                if (p > 0)
                                    for (; h--;) m[h] || v[h] || (v[h] = Q.call(l));
                                v = g(v)
                            }
                            K.apply(l, v), c && !i && v.length > 0 && p + n.length > 1 && e.uniqueSort(l)
                        }
                        return c && (q = b, _ = y), m
                    };
                return o ? i(s) : s
            }
            var x, b, w, S, C, T, k, E, _, D, $, A, I, O, N, M, j, B, L, P = "sizzle" + 1 * new Date,
                R = t.document,
                q = 0,
                H = 0,
                W = n(),
                F = n(),
                z = n(),
                U = function(t, e) {
                    return t === e && ($ = !0), 0
                },
                X = 1 << 31,
                Y = {}.hasOwnProperty,
                V = [],
                Q = V.pop,
                G = V.push,
                K = V.push,
                Z = V.slice,
                J = function(t, e) {
                    for (var n = 0, i = t.length; i > n; n++)
                        if (t[n] === e) return n;
                    return -1
                },
                tt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                et = "[\\x20\\t\\r\\n\\f]",
                nt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                it = "\\[" + et + "*(" + nt + ")(?:" + et + "*([*^$|!~]?=)" + et + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + nt + "))|)" + et + "*\\]",
                ot = ":(" + nt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + it + ")*)|.*)\\)|)",
                rt = new RegExp(et + "+", "g"),
                st = new RegExp("^" + et + "+|((?:^|[^\\\\])(?:\\\\.)*)" + et + "+$", "g"),
                at = new RegExp("^" + et + "*," + et + "*"),
                lt = new RegExp("^" + et + "*([>+~]|" + et + ")" + et + "*"),
                ct = new RegExp("=" + et + "*([^\\]'\"]*?)" + et + "*\\]", "g"),
                dt = new RegExp(ot),
                ut = new RegExp("^" + nt + "$"),
                ft = {
                    ID: new RegExp("^#(" + nt + ")"),
                    CLASS: new RegExp("^\\.(" + nt + ")"),
                    TAG: new RegExp("^(" + nt + "|[*])"),
                    ATTR: new RegExp("^" + it),
                    PSEUDO: new RegExp("^" + ot),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + et + "*(even|odd|(([+-]|)(\\d*)n|)" + et + "*(?:([+-]|)" + et + "*(\\d+)|))" + et + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + tt + ")$", "i"),
                    needsContext: new RegExp("^" + et + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + et + "*((?:-\\d)?\\d*)" + et + "*\\)|)(?=[^-]|$)", "i")
                },
                pt = /^(?:input|select|textarea|button)$/i,
                ht = /^h\d$/i,
                gt = /^[^{]+\{\s*\[native \w/,
                mt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                vt = /[+~]/,
                yt = /'|\\/g,
                xt = new RegExp("\\\\([\\da-f]{1,6}" + et + "?|(" + et + ")|.)", "ig"),
                bt = function(t, e, n) {
                    var i = "0x" + e - 65536;
                    return i != i || n ? e : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
                },
                wt = function() {
                    A()
                };
            try {
                K.apply(V = Z.call(R.childNodes), R.childNodes), V[R.childNodes.length].nodeType
            } catch (t) {
                K = {
                    apply: V.length ? function(t, e) {
                        G.apply(t, Z.call(e))
                    } : function(t, e) {
                        for (var n = t.length, i = 0; t[n++] = e[i++];);
                        t.length = n - 1
                    }
                }
            }
            b = e.support = {}, C = e.isXML = function(t) {
                var e = t && (t.ownerDocument || t).documentElement;
                return !!e && "HTML" !== e.nodeName
            }, A = e.setDocument = function(t) {
                var e, n, i = t ? t.ownerDocument || t : R;
                return i !== I && 9 === i.nodeType && i.documentElement ? (I = i, O = I.documentElement, N = !C(I), (n = I.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", wt, !1) : n.attachEvent && n.attachEvent("onunload", wt)), b.attributes = o(function(t) {
                    return t.className = "i", !t.getAttribute("className")
                }), b.getElementsByTagName = o(function(t) {
                    return t.appendChild(I.createComment("")), !t.getElementsByTagName("*").length
                }), b.getElementsByClassName = gt.test(I.getElementsByClassName), b.getById = o(function(t) {
                    return O.appendChild(t).id = P, !I.getElementsByName || !I.getElementsByName(P).length
                }), b.getById ? (w.find.ID = function(t, e) {
                    if (void 0 !== e.getElementById && N) {
                        var n = e.getElementById(t);
                        return n ? [n] : []
                    }
                }, w.filter.ID = function(t) {
                    var e = t.replace(xt, bt);
                    return function(t) {
                        return t.getAttribute("id") === e
                    }
                }) : (delete w.find.ID, w.filter.ID = function(t) {
                    var e = t.replace(xt, bt);
                    return function(t) {
                        var n = void 0 !== t.getAttributeNode && t.getAttributeNode("id");
                        return n && n.value === e
                    }
                }), w.find.TAG = b.getElementsByTagName ? function(t, e) {
                    return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : b.qsa ? e.querySelectorAll(t) : void 0
                } : function(t, e) {
                    var n, i = [],
                        o = 0,
                        r = e.getElementsByTagName(t);
                    if ("*" === t) {
                        for (; n = r[o++];) 1 === n.nodeType && i.push(n);
                        return i
                    }
                    return r
                }, w.find.CLASS = b.getElementsByClassName && function(t, e) {
                    return void 0 !== e.getElementsByClassName && N ? e.getElementsByClassName(t) : void 0
                }, j = [], M = [], (b.qsa = gt.test(I.querySelectorAll)) && (o(function(t) {
                    O.appendChild(t).innerHTML = "<a id='" + P + "'></a><select id='" + P + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && M.push("[*^$]=" + et + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || M.push("\\[" + et + "*(?:value|" + tt + ")"), t.querySelectorAll("[id~=" + P + "-]").length || M.push("~="), t.querySelectorAll(":checked").length || M.push(":checked"), t.querySelectorAll("a#" + P + "+*").length || M.push(".#.+[+~]")
                }), o(function(t) {
                    var e = I.createElement("input");
                    e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && M.push("name" + et + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || M.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), M.push(",.*:")
                })), (b.matchesSelector = gt.test(B = O.matches || O.webkitMatchesSelector || O.mozMatchesSelector || O.oMatchesSelector || O.msMatchesSelector)) && o(function(t) {
                    b.disconnectedMatch = B.call(t, "div"), B.call(t, "[s!='']:x"), j.push("!=", ot)
                }), M = M.length && new RegExp(M.join("|")), j = j.length && new RegExp(j.join("|")), e = gt.test(O.compareDocumentPosition), L = e || gt.test(O.contains) ? function(t, e) {
                    var n = 9 === t.nodeType ? t.documentElement : t,
                        i = e && e.parentNode;
                    return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
                } : function(t, e) {
                    if (e)
                        for (; e = e.parentNode;)
                            if (e === t) return !0;
                    return !1
                }, U = e ? function(t, e) {
                    if (t === e) return $ = !0, 0;
                    var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                    return n || (1 & (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || !b.sortDetached && e.compareDocumentPosition(t) === n ? t === I || t.ownerDocument === R && L(R, t) ? -1 : e === I || e.ownerDocument === R && L(R, e) ? 1 : D ? J(D, t) - J(D, e) : 0 : 4 & n ? -1 : 1)
                } : function(t, e) {
                    if (t === e) return $ = !0, 0;
                    var n, i = 0,
                        o = t.parentNode,
                        r = e.parentNode,
                        a = [t],
                        l = [e];
                    if (!o || !r) return t === I ? -1 : e === I ? 1 : o ? -1 : r ? 1 : D ? J(D, t) - J(D, e) : 0;
                    if (o === r) return s(t, e);
                    for (n = t; n = n.parentNode;) a.unshift(n);
                    for (n = e; n = n.parentNode;) l.unshift(n);
                    for (; a[i] === l[i];) i++;
                    return i ? s(a[i], l[i]) : a[i] === R ? -1 : l[i] === R ? 1 : 0
                }, I) : I
            }, e.matches = function(t, n) {
                return e(t, null, null, n)
            }, e.matchesSelector = function(t, n) {
                if ((t.ownerDocument || t) !== I && A(t), n = n.replace(ct, "='$1']"), b.matchesSelector && N && !z[n + " "] && (!j || !j.test(n)) && (!M || !M.test(n))) try {
                    var i = B.call(t, n);
                    if (i || b.disconnectedMatch || t.document && 11 !== t.document.nodeType) return i
                } catch (t) {}
                return e(n, I, null, [t]).length > 0
            }, e.contains = function(t, e) {
                return (t.ownerDocument || t) !== I && A(t), L(t, e)
            }, e.attr = function(t, e) {
                (t.ownerDocument || t) !== I && A(t);
                var n = w.attrHandle[e.toLowerCase()],
                    i = n && Y.call(w.attrHandle, e.toLowerCase()) ? n(t, e, !N) : void 0;
                return void 0 !== i ? i : b.attributes || !N ? t.getAttribute(e) : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
            }, e.error = function(t) {
                throw new Error("Syntax error, unrecognized expression: " + t)
            }, e.uniqueSort = function(t) {
                var e, n = [],
                    i = 0,
                    o = 0;
                if ($ = !b.detectDuplicates, D = !b.sortStable && t.slice(0), t.sort(U), $) {
                    for (; e = t[o++];) e === t[o] && (i = n.push(o));
                    for (; i--;) t.splice(n[i], 1)
                }
                return D = null, t
            }, S = e.getText = function(t) {
                var e, n = "",
                    i = 0,
                    o = t.nodeType;
                if (o) {
                    if (1 === o || 9 === o || 11 === o) {
                        if ("string" == typeof t.textContent) return t.textContent;
                        for (t = t.firstChild; t; t = t.nextSibling) n += S(t)
                    } else if (3 === o || 4 === o) return t.nodeValue
                } else
                    for (; e = t[i++];) n += S(e);
                return n
            }, (w = e.selectors = {
                cacheLength: 50,
                createPseudo: i,
                match: ft,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(t) {
                        return t[1] = t[1].replace(xt, bt), t[3] = (t[3] || t[4] || t[5] || "").replace(xt, bt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                    },
                    CHILD: function(t) {
                        return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                    },
                    PSEUDO: function(t) {
                        var e, n = !t[6] && t[2];
                        return ft.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && dt.test(n) && (e = T(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(t) {
                        var e = t.replace(xt, bt).toLowerCase();
                        return "*" === t ? function() {
                            return !0
                        } : function(t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e
                        }
                    },
                    CLASS: function(t) {
                        var e = W[t + " "];
                        return e || (e = new RegExp("(^|" + et + ")" + t + "(" + et + "|$)")) && W(t, function(t) {
                            return e.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(t, n, i) {
                        return function(o) {
                            var r = e.attr(o, t);
                            return null == r ? "!=" === n : !n || (r += "", "=" === n ? r === i : "!=" === n ? r !== i : "^=" === n ? i && 0 === r.indexOf(i) : "*=" === n ? i && r.indexOf(i) > -1 : "$=" === n ? i && r.slice(-i.length) === i : "~=" === n ? (" " + r.replace(rt, " ") + " ").indexOf(i) > -1 : "|=" === n && (r === i || r.slice(0, i.length + 1) === i + "-"))
                        }
                    },
                    CHILD: function(t, e, n, i, o) {
                        var r = "nth" !== t.slice(0, 3),
                            s = "last" !== t.slice(-4),
                            a = "of-type" === e;
                        return 1 === i && 0 === o ? function(t) {
                            return !!t.parentNode
                        } : function(e, n, l) {
                            var c, d, u, f, p, h, g = r !== s ? "nextSibling" : "previousSibling",
                                m = e.parentNode,
                                v = a && e.nodeName.toLowerCase(),
                                y = !l && !a,
                                x = !1;
                            if (m) {
                                if (r) {
                                    for (; g;) {
                                        for (f = e; f = f[g];)
                                            if (a ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) return !1;
                                        h = g = "only" === t && !h && "nextSibling"
                                    }
                                    return !0
                                }
                                if (h = [s ? m.firstChild : m.lastChild], s && y) {
                                    for (x = (p = (c = (d = (u = (f = m)[P] || (f[P] = {}))[f.uniqueID] || (u[f.uniqueID] = {}))[t] || [])[0] === q && c[1]) && c[2], f = p && m.childNodes[p]; f = ++p && f && f[g] || (x = p = 0) || h.pop();)
                                        if (1 === f.nodeType && ++x && f === e) {
                                            d[t] = [q, p, x];
                                            break
                                        }
                                } else if (y && (f = e, u = f[P] || (f[P] = {}), d = u[f.uniqueID] || (u[f.uniqueID] = {}), c = d[t] || [], p = c[0] === q && c[1], x = p), !1 === x)
                                    for (;
                                        (f = ++p && f && f[g] || (x = p = 0) || h.pop()) && ((a ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++x || (y && (u = f[P] || (f[P] = {}), d = u[f.uniqueID] || (u[f.uniqueID] = {}), d[t] = [q, x]), f !== e)););
                                return (x -= o) === i || x % i == 0 && x / i >= 0
                            }
                        }
                    },
                    PSEUDO: function(t, n) {
                        var o, r = w.pseudos[t] || w.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                        return r[P] ? r(n) : r.length > 1 ? (o = [t, t, "", n], w.setFilters.hasOwnProperty(t.toLowerCase()) ? i(function(t, e) {
                            for (var i, o = r(t, n), s = o.length; s--;) i = J(t, o[s]), t[i] = !(e[i] = o[s])
                        }) : function(t) {
                            return r(t, 0, o)
                        }) : r
                    }
                },
                pseudos: {
                    not: i(function(t) {
                        var e = [],
                            n = [],
                            o = k(t.replace(st, "$1"));
                        return o[P] ? i(function(t, e, n, i) {
                            for (var r, s = o(t, null, i, []), a = t.length; a--;)(r = s[a]) && (t[a] = !(e[a] = r))
                        }) : function(t, i, r) {
                            return e[0] = t, o(e, null, r, n), e[0] = null, !n.pop()
                        }
                    }),
                    has: i(function(t) {
                        return function(n) {
                            return e(t, n).length > 0
                        }
                    }),
                    contains: i(function(t) {
                        return t = t.replace(xt, bt),
                            function(e) {
                                return (e.textContent || e.innerText || S(e)).indexOf(t) > -1
                            }
                    }),
                    lang: i(function(t) {
                        return ut.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(xt, bt).toLowerCase(),
                            function(e) {
                                var n;
                                do {
                                    if (n = N ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (n = n.toLowerCase()) === t || 0 === n.indexOf(t + "-")
                                } while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function(e) {
                        var n = t.location && t.location.hash;
                        return n && n.slice(1) === e.id
                    },
                    root: function(t) {
                        return t === O
                    },
                    focus: function(t) {
                        return t === I.activeElement && (!I.hasFocus || I.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                    },
                    enabled: function(t) {
                        return !1 === t.disabled
                    },
                    disabled: function(t) {
                        return !0 === t.disabled
                    },
                    checked: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && !!t.checked || "option" === e && !!t.selected
                    },
                    selected: function(t) {
                        return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
                    },
                    empty: function(t) {
                        for (t = t.firstChild; t; t = t.nextSibling)
                            if (t.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(t) {
                        return !w.pseudos.empty(t)
                    },
                    header: function(t) {
                        return ht.test(t.nodeName)
                    },
                    input: function(t) {
                        return pt.test(t.nodeName)
                    },
                    button: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && "button" === t.type || "button" === e
                    },
                    text: function(t) {
                        var e;
                        return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                    },
                    first: c(function() {
                        return [0]
                    }),
                    last: c(function(t, e) {
                        return [e - 1]
                    }),
                    eq: c(function(t, e, n) {
                        return [0 > n ? n + e : n]
                    }),
                    even: c(function(t, e) {
                        for (var n = 0; e > n; n += 2) t.push(n);
                        return t
                    }),
                    odd: c(function(t, e) {
                        for (var n = 1; e > n; n += 2) t.push(n);
                        return t
                    }),
                    lt: c(function(t, e, n) {
                        for (var i = 0 > n ? n + e : n; --i >= 0;) t.push(i);
                        return t
                    }),
                    gt: c(function(t, e, n) {
                        for (var i = 0 > n ? n + e : n; ++i < e;) t.push(i);
                        return t
                    })
                }
            }).pseudos.nth = w.pseudos.eq;
            for (x in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) w.pseudos[x] = a(x);
            for (x in {
                    submit: !0,
                    reset: !0
                }) w.pseudos[x] = l(x);
            return u.prototype = w.filters = w.pseudos, w.setFilters = new u, T = e.tokenize = function(t, n) {
                var i, o, r, s, a, l, c, d = F[t + " "];
                if (d) return n ? 0 : d.slice(0);
                for (a = t, l = [], c = w.preFilter; a;) {
                    i && !(o = at.exec(a)) || (o && (a = a.slice(o[0].length) || a), l.push(r = [])), i = !1, (o = lt.exec(a)) && (i = o.shift(), r.push({
                        value: i,
                        type: o[0].replace(st, " ")
                    }), a = a.slice(i.length));
                    for (s in w.filter) !(o = ft[s].exec(a)) || c[s] && !(o = c[s](o)) || (i = o.shift(), r.push({
                        value: i,
                        type: s,
                        matches: o
                    }), a = a.slice(i.length));
                    if (!i) break
                }
                return n ? a.length : a ? e.error(t) : F(t, l).slice(0)
            }, k = e.compile = function(t, e) {
                var n, i = [],
                    o = [],
                    r = z[t + " "];
                if (!r) {
                    for (e || (e = T(t)), n = e.length; n--;)(r = v(e[n]))[P] ? i.push(r) : o.push(r);
                    (r = z(t, y(o, i))).selector = t
                }
                return r
            }, E = e.select = function(t, e, n, i) {
                var o, r, s, a, l, c = "function" == typeof t && t,
                    u = !i && T(t = c.selector || t);
                if (n = n || [], 1 === u.length) {
                    if ((r = u[0] = u[0].slice(0)).length > 2 && "ID" === (s = r[0]).type && b.getById && 9 === e.nodeType && N && w.relative[r[1].type]) {
                        if (!(e = (w.find.ID(s.matches[0].replace(xt, bt), e) || [])[0])) return n;
                        c && (e = e.parentNode), t = t.slice(r.shift().value.length)
                    }
                    for (o = ft.needsContext.test(t) ? 0 : r.length; o-- && (s = r[o], !w.relative[a = s.type]);)
                        if ((l = w.find[a]) && (i = l(s.matches[0].replace(xt, bt), vt.test(r[0].type) && d(e.parentNode) || e))) {
                            if (r.splice(o, 1), !(t = i.length && f(r))) return K.apply(n, i), n;
                            break
                        }
                }
                return (c || k(t, u))(i, e, !N, n, !e || vt.test(t) && d(e.parentNode) || e), n
            }, b.sortStable = P.split("").sort(U).join("") === P, b.detectDuplicates = !!$, A(), b.sortDetached = o(function(t) {
                return 1 & t.compareDocumentPosition(I.createElement("div"))
            }), o(function(t) {
                return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
            }) || r("type|href|height|width", function(t, e, n) {
                return n ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
            }), b.attributes && o(function(t) {
                return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
            }) || r("value", function(t, e, n) {
                return n || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
            }), o(function(t) {
                return null == t.getAttribute("disabled")
            }) || r(tt, function(t, e, n) {
                var i;
                return n ? void 0 : !0 === t[e] ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
            }), e
        }(t);
        tt.find = rt, tt.expr = rt.selectors, tt.expr[":"] = tt.expr.pseudos, tt.uniqueSort = tt.unique = rt.uniqueSort, tt.text = rt.getText, tt.isXMLDoc = rt.isXML, tt.contains = rt.contains;
        var st = function(t, e, n) {
                for (var i = [], o = void 0 !== n;
                    (t = t[e]) && 9 !== t.nodeType;)
                    if (1 === t.nodeType) {
                        if (o && tt(t).is(n)) break;
                        i.push(t)
                    } return i
            },
            at = function(t, e) {
                for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
                return n
            },
            lt = tt.expr.match.needsContext,
            ct = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
            dt = /^.[^:#\[\.,]*$/;
        tt.filter = function(t, e, n) {
            var i = e[0];
            return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? tt.find.matchesSelector(i, t) ? [i] : [] : tt.find.matches(t, tt.grep(e, function(t) {
                return 1 === t.nodeType
            }))
        }, tt.fn.extend({
            find: function(t) {
                var e, n = this.length,
                    i = [],
                    o = this;
                if ("string" != typeof t) return this.pushStack(tt(t).filter(function() {
                    for (e = 0; n > e; e++)
                        if (tt.contains(o[e], this)) return !0
                }));
                for (e = 0; n > e; e++) tt.find(t, o[e], i);
                return i = this.pushStack(n > 1 ? tt.unique(i) : i), i.selector = this.selector ? this.selector + " " + t : t, i
            },
            filter: function(t) {
                return this.pushStack(i(this, t || [], !1))
            },
            not: function(t) {
                return this.pushStack(i(this, t || [], !0))
            },
            is: function(t) {
                return !!i(this, "string" == typeof t && lt.test(t) ? tt(t) : t || [], !1).length
            }
        });
        var ut, ft = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
        (tt.fn.init = function(t, e, n) {
            var i, o;
            if (!t) return this;
            if (n = n || ut, "string" == typeof t) {
                if (!(i = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : ft.exec(t)) || !i[1] && e) return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
                if (i[1]) {
                    if (e = e instanceof tt ? e[0] : e, tt.merge(this, tt.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : z, !0)), ct.test(i[1]) && tt.isPlainObject(e))
                        for (i in e) tt.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                    return this
                }
                return (o = z.getElementById(i[2])) && o.parentNode && (this.length = 1, this[0] = o), this.context = z, this.selector = t, this
            }
            return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : tt.isFunction(t) ? void 0 !== n.ready ? n.ready(t) : t(tt) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), tt.makeArray(t, this))
        }).prototype = tt.fn, ut = tt(z);
        var pt = /^(?:parents|prev(?:Until|All))/,
            ht = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        tt.fn.extend({
            has: function(t) {
                var e = tt(t, this),
                    n = e.length;
                return this.filter(function() {
                    for (var t = 0; n > t; t++)
                        if (tt.contains(this, e[t])) return !0
                })
            },
            closest: function(t, e) {
                for (var n, i = 0, o = this.length, r = [], s = lt.test(t) || "string" != typeof t ? tt(t, e || this.context) : 0; o > i; i++)
                    for (n = this[i]; n && n !== e; n = n.parentNode)
                        if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && tt.find.matchesSelector(n, t))) {
                            r.push(n);
                            break
                        } return this.pushStack(r.length > 1 ? tt.uniqueSort(r) : r)
            },
            index: function(t) {
                return t ? "string" == typeof t ? V.call(tt(t), this[0]) : V.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(t, e) {
                return this.pushStack(tt.uniqueSort(tt.merge(this.get(), tt(t, e))))
            },
            addBack: function(t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
            }
        }), tt.each({
            parent: function(t) {
                var e = t.parentNode;
                return e && 11 !== e.nodeType ? e : null
            },
            parents: function(t) {
                return st(t, "parentNode")
            },
            parentsUntil: function(t, e, n) {
                return st(t, "parentNode", n)
            },
            next: function(t) {
                return o(t, "nextSibling")
            },
            prev: function(t) {
                return o(t, "previousSibling")
            },
            nextAll: function(t) {
                return st(t, "nextSibling")
            },
            prevAll: function(t) {
                return st(t, "previousSibling")
            },
            nextUntil: function(t, e, n) {
                return st(t, "nextSibling", n)
            },
            prevUntil: function(t, e, n) {
                return st(t, "previousSibling", n)
            },
            siblings: function(t) {
                return at((t.parentNode || {}).firstChild, t)
            },
            children: function(t) {
                return at(t.firstChild)
            },
            contents: function(t) {
                return t.contentDocument || tt.merge([], t.childNodes)
            }
        }, function(t, e) {
            tt.fn[t] = function(n, i) {
                var o = tt.map(this, e, n);
                return "Until" !== t.slice(-5) && (i = n), i && "string" == typeof i && (o = tt.filter(i, o)), this.length > 1 && (ht[t] || tt.uniqueSort(o), pt.test(t) && o.reverse()), this.pushStack(o)
            }
        });
        var gt = /\S+/g;
        tt.Callbacks = function(t) {
            t = "string" == typeof t ? function(t) {
                var e = {};
                return tt.each(t.match(gt) || [], function(t, n) {
                    e[n] = !0
                }), e
            }(t) : tt.extend({}, t);
            var e, n, i, o, r = [],
                s = [],
                a = -1,
                l = function() {
                    for (o = t.once, i = e = !0; s.length; a = -1)
                        for (n = s.shift(); ++a < r.length;) !1 === r[a].apply(n[0], n[1]) && t.stopOnFalse && (a = r.length, n = !1);
                    t.memory || (n = !1), e = !1, o && (r = n ? [] : "")
                },
                c = {
                    add: function() {
                        return r && (n && !e && (a = r.length - 1, s.push(n)), function e(n) {
                            tt.each(n, function(n, i) {
                                tt.isFunction(i) ? t.unique && c.has(i) || r.push(i) : i && i.length && "string" !== tt.type(i) && e(i)
                            })
                        }(arguments), n && !e && l()), this
                    },
                    remove: function() {
                        return tt.each(arguments, function(t, e) {
                            for (var n;
                                (n = tt.inArray(e, r, n)) > -1;) r.splice(n, 1), a >= n && a--
                        }), this
                    },
                    has: function(t) {
                        return t ? tt.inArray(t, r) > -1 : r.length > 0
                    },
                    empty: function() {
                        return r && (r = []), this
                    },
                    disable: function() {
                        return o = s = [], r = n = "", this
                    },
                    disabled: function() {
                        return !r
                    },
                    lock: function() {
                        return o = s = [], n || (r = n = ""), this
                    },
                    locked: function() {
                        return !!o
                    },
                    fireWith: function(t, n) {
                        return o || (n = n || [], n = [t, n.slice ? n.slice() : n], s.push(n), e || l()), this
                    },
                    fire: function() {
                        return c.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!i
                    }
                };
            return c
        }, tt.extend({
            Deferred: function(t) {
                var e = [
                        ["resolve", "done", tt.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", tt.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", tt.Callbacks("memory")]
                    ],
                    n = "pending",
                    i = {
                        state: function() {
                            return n
                        },
                        always: function() {
                            return o.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var t = arguments;
                            return tt.Deferred(function(n) {
                                tt.each(e, function(e, r) {
                                    var s = tt.isFunction(t[e]) && t[e];
                                    o[r[1]](function() {
                                        var t = s && s.apply(this, arguments);
                                        t && tt.isFunction(t.promise) ? t.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[r[0] + "With"](this === i ? n.promise() : this, s ? [t] : arguments)
                                    })
                                }), t = null
                            }).promise()
                        },
                        promise: function(t) {
                            return null != t ? tt.extend(t, i) : i
                        }
                    },
                    o = {};
                return i.pipe = i.then, tt.each(e, function(t, r) {
                    var s = r[2],
                        a = r[3];
                    i[r[1]] = s.add, a && s.add(function() {
                        n = a
                    }, e[1 ^ t][2].disable, e[2][2].lock), o[r[0]] = function() {
                        return o[r[0] + "With"](this === o ? i : this, arguments), this
                    }, o[r[0] + "With"] = s.fireWith
                }), i.promise(o), t && t.call(o, o), o
            },
            when: function(t) {
                var e, n, i, o = 0,
                    r = U.call(arguments),
                    s = r.length,
                    a = 1 !== s || t && tt.isFunction(t.promise) ? s : 0,
                    l = 1 === a ? t : tt.Deferred(),
                    c = function(t, n, i) {
                        return function(o) {
                            n[t] = this, i[t] = arguments.length > 1 ? U.call(arguments) : o, i === e ? l.notifyWith(n, i) : --a || l.resolveWith(n, i)
                        }
                    };
                if (s > 1)
                    for (e = new Array(s), n = new Array(s), i = new Array(s); s > o; o++) r[o] && tt.isFunction(r[o].promise) ? r[o].promise().progress(c(o, n, e)).done(c(o, i, r)).fail(l.reject) : --a;
                return a || l.resolveWith(i, r), l.promise()
            }
        });
        var mt;
        tt.fn.ready = function(t) {
            return tt.ready.promise().done(t), this
        }, tt.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(t) {
                t ? tt.readyWait++ : tt.ready(!0)
            },
            ready: function(t) {
                (!0 === t ? --tt.readyWait : tt.isReady) || (tt.isReady = !0, !0 !== t && --tt.readyWait > 0 || (mt.resolveWith(z, [tt]), tt.fn.triggerHandler && (tt(z).triggerHandler("ready"), tt(z).off("ready"))))
            }
        }), tt.ready.promise = function(e) {
            return mt || (mt = tt.Deferred(), "complete" === z.readyState || "loading" !== z.readyState && !z.documentElement.doScroll ? t.setTimeout(tt.ready) : (z.addEventListener("DOMContentLoaded", r), t.addEventListener("load", r))), mt.promise(e)
        }, tt.ready.promise();
        var vt = function(t, e, n, i, o, r, s) {
                var a = 0,
                    l = t.length,
                    c = null == n;
                if ("object" === tt.type(n)) {
                    o = !0;
                    for (a in n) vt(t, e, a, n[a], !0, r, s)
                } else if (void 0 !== i && (o = !0, tt.isFunction(i) || (s = !0), c && (s ? (e.call(t, i), e = null) : (c = e, e = function(t, e, n) {
                        return c.call(tt(t), n)
                    })), e))
                    for (; l > a; a++) e(t[a], n, s ? i : i.call(t[a], a, e(t[a], n)));
                return o ? t : c ? e.call(t) : l ? e(t[0], n) : r
            },
            yt = function(t) {
                return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
            };
        s.uid = 1, s.prototype = {
            register: function(t, e) {
                var n = e || {};
                return t.nodeType ? t[this.expando] = n : Object.defineProperty(t, this.expando, {
                    value: n,
                    writable: !0,
                    configurable: !0
                }), t[this.expando]
            },
            cache: function(t) {
                if (!yt(t)) return {};
                var e = t[this.expando];
                return e || (e = {}, yt(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, {
                    value: e,
                    configurable: !0
                }))), e
            },
            set: function(t, e, n) {
                var i, o = this.cache(t);
                if ("string" == typeof e) o[e] = n;
                else
                    for (i in e) o[i] = e[i];
                return o
            },
            get: function(t, e) {
                return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][e]
            },
            access: function(t, e, n) {
                var i;
                return void 0 === e || e && "string" == typeof e && void 0 === n ? void 0 !== (i = this.get(t, e)) ? i : this.get(t, tt.camelCase(e)) : (this.set(t, e, n), void 0 !== n ? n : e)
            },
            remove: function(t, e) {
                var n, i, o, r = t[this.expando];
                if (void 0 !== r) {
                    if (void 0 === e) this.register(t);
                    else {
                        tt.isArray(e) ? i = e.concat(e.map(tt.camelCase)) : (o = tt.camelCase(e), e in r ? i = [e, o] : (i = o, i = i in r ? [i] : i.match(gt) || [])), n = i.length;
                        for (; n--;) delete r[i[n]]
                    }(void 0 === e || tt.isEmptyObject(r)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando])
                }
            },
            hasData: function(t) {
                var e = t[this.expando];
                return void 0 !== e && !tt.isEmptyObject(e)
            }
        };
        var xt = new s,
            bt = new s,
            wt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            St = /[A-Z]/g;
        tt.extend({
            hasData: function(t) {
                return bt.hasData(t) || xt.hasData(t)
            },
            data: function(t, e, n) {
                return bt.access(t, e, n)
            },
            removeData: function(t, e) {
                bt.remove(t, e)
            },
            _data: function(t, e, n) {
                return xt.access(t, e, n)
            },
            _removeData: function(t, e) {
                xt.remove(t, e)
            }
        }), tt.fn.extend({
            data: function(t, e) {
                var n, i, o, r = this[0],
                    s = r && r.attributes;
                if (void 0 === t) {
                    if (this.length && (o = bt.get(r), 1 === r.nodeType && !xt.get(r, "hasDataAttrs"))) {
                        for (n = s.length; n--;) s[n] && 0 === (i = s[n].name).indexOf("data-") && (i = tt.camelCase(i.slice(5)), a(r, i, o[i]));
                        xt.set(r, "hasDataAttrs", !0)
                    }
                    return o
                }
                return "object" == typeof t ? this.each(function() {
                    bt.set(this, t)
                }) : vt(this, function(e) {
                    var n, i;
                    if (r && void 0 === e) {
                        if (void 0 !== (n = bt.get(r, t) || bt.get(r, t.replace(St, "-$&").toLowerCase()))) return n;
                        if (i = tt.camelCase(t), void 0 !== (n = bt.get(r, i))) return n;
                        if (void 0 !== (n = a(r, i, void 0))) return n
                    } else i = tt.camelCase(t), this.each(function() {
                        var n = bt.get(this, i);
                        bt.set(this, i, e), t.indexOf("-") > -1 && void 0 !== n && bt.set(this, t, e)
                    })
                }, null, e, arguments.length > 1, null, !0)
            },
            removeData: function(t) {
                return this.each(function() {
                    bt.remove(this, t)
                })
            }
        }), tt.extend({
            queue: function(t, e, n) {
                var i;
                return t ? (e = (e || "fx") + "queue", i = xt.get(t, e), n && (!i || tt.isArray(n) ? i = xt.access(t, e, tt.makeArray(n)) : i.push(n)), i || []) : void 0
            },
            dequeue: function(t, e) {
                e = e || "fx";
                var n = tt.queue(t, e),
                    i = n.length,
                    o = n.shift(),
                    r = tt._queueHooks(t, e);
                "inprogress" === o && (o = n.shift(), i--), o && ("fx" === e && n.unshift("inprogress"), delete r.stop, o.call(t, function() {
                    tt.dequeue(t, e)
                }, r)), !i && r && r.empty.fire()
            },
            _queueHooks: function(t, e) {
                var n = e + "queueHooks";
                return xt.get(t, n) || xt.access(t, n, {
                    empty: tt.Callbacks("once memory").add(function() {
                        xt.remove(t, [e + "queue", n])
                    })
                })
            }
        }), tt.fn.extend({
            queue: function(t, e) {
                var n = 2;
                return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? tt.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                    var n = tt.queue(this, t, e);
                    tt._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && tt.dequeue(this, t)
                })
            },
            dequeue: function(t) {
                return this.each(function() {
                    tt.dequeue(this, t)
                })
            },
            clearQueue: function(t) {
                return this.queue(t || "fx", [])
            },
            promise: function(t, e) {
                var n, i = 1,
                    o = tt.Deferred(),
                    r = this,
                    s = this.length,
                    a = function() {
                        --i || o.resolveWith(r, [r])
                    };
                for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; s--;)(n = xt.get(r[s], t + "queueHooks")) && n.empty && (i++, n.empty.add(a));
                return a(), o.promise(e)
            }
        });
        var Ct = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Tt = new RegExp("^(?:([+-])=|)(" + Ct + ")([a-z%]*)$", "i"),
            kt = ["Top", "Right", "Bottom", "Left"],
            Et = function(t, e) {
                return t = e || t, "none" === tt.css(t, "display") || !tt.contains(t.ownerDocument, t)
            },
            _t = /^(?:checkbox|radio)$/i,
            Dt = /<([\w:-]+)/,
            $t = /^$|\/(?:java|ecma)script/i,
            At = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        At.optgroup = At.option, At.tbody = At.tfoot = At.colgroup = At.caption = At.thead, At.th = At.td;
        var It = /<|&#?\w+;/;
        ! function() {
            var t = z.createDocumentFragment().appendChild(z.createElement("div")),
                e = z.createElement("input");
            e.setAttribute("type", "radio"), e.setAttribute("checked", "checked"), e.setAttribute("name", "t"), t.appendChild(e), Z.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", Z.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
        }();
        var Ot = /^key/,
            Nt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            Mt = /^([^.]*)(?:\.(.+)|)/;
        tt.event = {
            global: {},
            add: function(t, e, n, i, o) {
                var r, s, a, l, c, d, u, f, p, h, g, m = xt.get(t);
                if (m)
                    for (n.handler && (r = n, n = r.handler, o = r.selector), n.guid || (n.guid = tt.guid++), (l = m.events) || (l = m.events = {}), (s = m.handle) || (s = m.handle = function(e) {
                            return void 0 !== tt && tt.event.triggered !== e.type ? tt.event.dispatch.apply(t, arguments) : void 0
                        }), c = (e = (e || "").match(gt) || [""]).length; c--;) a = Mt.exec(e[c]) || [], p = g = a[1], h = (a[2] || "").split(".").sort(), p && (u = tt.event.special[p] || {}, p = (o ? u.delegateType : u.bindType) || p, u = tt.event.special[p] || {}, d = tt.extend({
                        type: p,
                        origType: g,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: o,
                        needsContext: o && tt.expr.match.needsContext.test(o),
                        namespace: h.join(".")
                    }, r), (f = l[p]) || (f = l[p] = [], f.delegateCount = 0, u.setup && !1 !== u.setup.call(t, i, h, s) || t.addEventListener && t.addEventListener(p, s)), u.add && (u.add.call(t, d), d.handler.guid || (d.handler.guid = n.guid)), o ? f.splice(f.delegateCount++, 0, d) : f.push(d), tt.event.global[p] = !0)
            },
            remove: function(t, e, n, i, o) {
                var r, s, a, l, c, d, u, f, p, h, g, m = xt.hasData(t) && xt.get(t);
                if (m && (l = m.events)) {
                    for (c = (e = (e || "").match(gt) || [""]).length; c--;)
                        if (a = Mt.exec(e[c]) || [], p = g = a[1], h = (a[2] || "").split(".").sort(), p) {
                            for (u = tt.event.special[p] || {}, f = l[p = (i ? u.delegateType : u.bindType) || p] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = r = f.length; r--;) d = f[r], !o && g !== d.origType || n && n.guid !== d.guid || a && !a.test(d.namespace) || i && i !== d.selector && ("**" !== i || !d.selector) || (f.splice(r, 1), d.selector && f.delegateCount--, u.remove && u.remove.call(t, d));
                            s && !f.length && (u.teardown && !1 !== u.teardown.call(t, h, m.handle) || tt.removeEvent(t, p, m.handle), delete l[p])
                        } else
                            for (p in l) tt.event.remove(t, p + e[c], n, i, !0);
                    tt.isEmptyObject(l) && xt.remove(t, "handle events")
                }
            },
            dispatch: function(t) {
                t = tt.event.fix(t);
                var e, n, i, o, r, s = [],
                    a = U.call(arguments),
                    l = (xt.get(this, "events") || {})[t.type] || [],
                    c = tt.event.special[t.type] || {};
                if (a[0] = t, t.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, t)) {
                    for (s = tt.event.handlers.call(this, t, l), e = 0;
                        (o = s[e++]) && !t.isPropagationStopped();)
                        for (t.currentTarget = o.elem, n = 0;
                            (r = o.handlers[n++]) && !t.isImmediatePropagationStopped();) t.rnamespace && !t.rnamespace.test(r.namespace) || (t.handleObj = r, t.data = r.data, void 0 !== (i = ((tt.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, a)) && !1 === (t.result = i) && (t.preventDefault(), t.stopPropagation()));
                    return c.postDispatch && c.postDispatch.call(this, t), t.result
                }
            },
            handlers: function(t, e) {
                var n, i, o, r, s = [],
                    a = e.delegateCount,
                    l = t.target;
                if (a && l.nodeType && ("click" !== t.type || isNaN(t.button) || t.button < 1))
                    for (; l !== this; l = l.parentNode || this)
                        if (1 === l.nodeType && (!0 !== l.disabled || "click" !== t.type)) {
                            for (i = [], n = 0; a > n; n++) r = e[n], o = r.selector + " ", void 0 === i[o] && (i[o] = r.needsContext ? tt(o, this).index(l) > -1 : tt.find(o, this, null, [l]).length), i[o] && i.push(r);
                            i.length && s.push({
                                elem: l,
                                handlers: i
                            })
                        } return a < e.length && s.push({
                    elem: this,
                    handlers: e.slice(a)
                }), s
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(t, e) {
                    return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(t, e) {
                    var n, i, o, r = e.button;
                    return null == t.pageX && null != e.clientX && (n = t.target.ownerDocument || z, i = n.documentElement, o = n.body, t.pageX = e.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0), t.pageY = e.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0)), t.which || void 0 === r || (t.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), t
                }
            },
            fix: function(t) {
                if (t[tt.expando]) return t;
                var e, n, i, o = t.type,
                    r = t,
                    s = this.fixHooks[o];
                for (s || (this.fixHooks[o] = s = Nt.test(o) ? this.mouseHooks : Ot.test(o) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, t = new tt.Event(r), e = i.length; e--;) n = i[e], t[n] = r[n];
                return t.target || (t.target = z), 3 === t.target.nodeType && (t.target = t.target.parentNode), s.filter ? s.filter(t, r) : t
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        return this !== h() && this.focus ? (this.focus(), !1) : void 0
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        return this === h() && this.blur ? (this.blur(), !1) : void 0
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        return "checkbox" === this.type && this.click && tt.nodeName(this, "input") ? (this.click(), !1) : void 0
                    },
                    _default: function(t) {
                        return tt.nodeName(t.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(t) {
                        void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                    }
                }
            }
        }, tt.removeEvent = function(t, e, n) {
            t.removeEventListener && t.removeEventListener(e, n)
        }, tt.Event = function(t, e) {
            return this instanceof tt.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? f : p) : this.type = t, e && tt.extend(this, e), this.timeStamp = t && t.timeStamp || tt.now(), void(this[tt.expando] = !0)) : new tt.Event(t, e)
        }, tt.Event.prototype = {
            constructor: tt.Event,
            isDefaultPrevented: p,
            isPropagationStopped: p,
            isImmediatePropagationStopped: p,
            isSimulated: !1,
            preventDefault: function() {
                var t = this.originalEvent;
                this.isDefaultPrevented = f, t && !this.isSimulated && t.preventDefault()
            },
            stopPropagation: function() {
                var t = this.originalEvent;
                this.isPropagationStopped = f, t && !this.isSimulated && t.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var t = this.originalEvent;
                this.isImmediatePropagationStopped = f, t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation()
            }
        }, tt.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(t, e) {
            tt.event.special[t] = {
                delegateType: e,
                bindType: e,
                handle: function(t) {
                    var n, i = t.relatedTarget,
                        o = t.handleObj;
                    return i && (i === this || tt.contains(this, i)) || (t.type = o.origType, n = o.handler.apply(this, arguments), t.type = e), n
                }
            }
        }), tt.fn.extend({
            on: function(t, e, n, i) {
                return g(this, t, e, n, i)
            },
            one: function(t, e, n, i) {
                return g(this, t, e, n, i, 1)
            },
            off: function(t, e, n) {
                var i, o;
                if (t && t.preventDefault && t.handleObj) return i = t.handleObj, tt(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                if ("object" == typeof t) {
                    for (o in t) this.off(o, e, t[o]);
                    return this
                }
                return !1 !== e && "function" != typeof e || (n = e, e = void 0), !1 === n && (n = p), this.each(function() {
                    tt.event.remove(this, t, n, e)
                })
            }
        });
        var jt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
            Bt = /<script|<style|<link/i,
            Lt = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Pt = /^true\/(.*)/,
            Rt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        tt.extend({
            htmlPrefilter: function(t) {
                return t.replace(jt, "<$1></$2>")
            },
            clone: function(t, e, n) {
                var i, o, r, s, a = t.cloneNode(!0),
                    l = tt.contains(t.ownerDocument, t);
                if (!(Z.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || tt.isXMLDoc(t)))
                    for (s = c(a), r = c(t), i = 0, o = r.length; o > i; i++) b(r[i], s[i]);
                if (e)
                    if (n)
                        for (r = r || c(t), s = s || c(a), i = 0, o = r.length; o > i; i++) x(r[i], s[i]);
                    else x(t, a);
                return (s = c(a, "script")).length > 0 && d(s, !l && c(t, "script")), a
            },
            cleanData: function(t) {
                for (var e, n, i, o = tt.event.special, r = 0; void 0 !== (n = t[r]); r++)
                    if (yt(n)) {
                        if (e = n[xt.expando]) {
                            if (e.events)
                                for (i in e.events) o[i] ? tt.event.remove(n, i) : tt.removeEvent(n, i, e.handle);
                            n[xt.expando] = void 0
                        }
                        n[bt.expando] && (n[bt.expando] = void 0)
                    }
            }
        }), tt.fn.extend({
            domManip: w,
            detach: function(t) {
                return S(this, t, !0)
            },
            remove: function(t) {
                return S(this, t)
            },
            text: function(t) {
                return vt(this, function(t) {
                    return void 0 === t ? tt.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t)
                    })
                }, null, t, arguments.length)
            },
            append: function() {
                return w(this, arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        m(this, t).appendChild(t)
                    }
                })
            },
            prepend: function() {
                return w(this, arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = m(this, t);
                        e.insertBefore(t, e.firstChild)
                    }
                })
            },
            before: function() {
                return w(this, arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this)
                })
            },
            after: function() {
                return w(this, arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                })
            },
            empty: function() {
                for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (tt.cleanData(c(t, !1)), t.textContent = "");
                return this
            },
            clone: function(t, e) {
                return t = null != t && t, e = null == e ? t : e, this.map(function() {
                    return tt.clone(this, t, e)
                })
            },
            html: function(t) {
                return vt(this, function(t) {
                    var e = this[0] || {},
                        n = 0,
                        i = this.length;
                    if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                    if ("string" == typeof t && !Bt.test(t) && !At[(Dt.exec(t) || ["", ""])[1].toLowerCase()]) {
                        t = tt.htmlPrefilter(t);
                        try {
                            for (; i > n; n++) 1 === (e = this[n] || {}).nodeType && (tt.cleanData(c(e, !1)), e.innerHTML = t);
                            e = 0
                        } catch (t) {}
                    }
                    e && this.empty().append(t)
                }, null, t, arguments.length)
            },
            replaceWith: function() {
                var t = [];
                return w(this, arguments, function(e) {
                    var n = this.parentNode;
                    tt.inArray(this, t) < 0 && (tt.cleanData(c(this)), n && n.replaceChild(e, this))
                }, t)
            }
        }), tt.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(t, e) {
            tt.fn[t] = function(t) {
                for (var n, i = [], o = tt(t), r = o.length - 1, s = 0; r >= s; s++) n = s === r ? this : this.clone(!0), tt(o[s])[e](n), Y.apply(i, n.get());
                return this.pushStack(i)
            }
        });
        var qt, Ht = {
                HTML: "block",
                BODY: "block"
            },
            Wt = /^margin/,
            Ft = new RegExp("^(" + Ct + ")(?!px)[a-z%]+$", "i"),
            zt = function(e) {
                var n = e.ownerDocument.defaultView;
                return n && n.opener || (n = t), n.getComputedStyle(e)
            },
            Ut = function(t, e, n, i) {
                var o, r, s = {};
                for (r in e) s[r] = t.style[r], t.style[r] = e[r];
                o = n.apply(t, i || []);
                for (r in e) t.style[r] = s[r];
                return o
            },
            Xt = z.documentElement;
        ! function() {
            function e() {
                a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", a.innerHTML = "", Xt.appendChild(s);
                var e = t.getComputedStyle(a);
                n = "1%" !== e.top, r = "2px" === e.marginLeft, i = "4px" === e.width, a.style.marginRight = "50%", o = "4px" === e.marginRight, Xt.removeChild(s)
            }
            var n, i, o, r, s = z.createElement("div"),
                a = z.createElement("div");
            a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", Z.clearCloneStyle = "content-box" === a.style.backgroundClip, s.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", s.appendChild(a), tt.extend(Z, {
                pixelPosition: function() {
                    return e(), n
                },
                boxSizingReliable: function() {
                    return null == i && e(), i
                },
                pixelMarginRight: function() {
                    return null == i && e(), o
                },
                reliableMarginLeft: function() {
                    return null == i && e(), r
                },
                reliableMarginRight: function() {
                    var e, n = a.appendChild(z.createElement("div"));
                    return n.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", a.style.width = "1px", Xt.appendChild(s), e = !parseFloat(t.getComputedStyle(n).marginRight), Xt.removeChild(s), a.removeChild(n), e
                }
            }))
        }();
        var Yt = /^(none|table(?!-c[ea]).+)/,
            Vt = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            Qt = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            Gt = ["Webkit", "O", "Moz", "ms"],
            Kt = z.createElement("div").style;
        tt.extend({
            cssHooks: {
                opacity: {
                    get: function(t, e) {
                        if (e) {
                            var n = k(t, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                float: "cssFloat"
            },
            style: function(t, e, n, i) {
                if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                    var o, r, s, a = tt.camelCase(e),
                        c = t.style;
                    return e = tt.cssProps[a] || (tt.cssProps[a] = _(a) || a), s = tt.cssHooks[e] || tt.cssHooks[a], void 0 === n ? s && "get" in s && void 0 !== (o = s.get(t, !1, i)) ? o : c[e] : ("string" === (r = typeof n) && (o = Tt.exec(n)) && o[1] && (n = l(t, e, o), r = "number"), void(null != n && n == n && ("number" === r && (n += o && o[3] || (tt.cssNumber[a] ? "" : "px")), Z.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (c[e] = "inherit"), s && "set" in s && void 0 === (n = s.set(t, n, i)) || (c[e] = n))))
                }
            },
            css: function(t, e, n, i) {
                var o, r, s, a = tt.camelCase(e);
                return e = tt.cssProps[a] || (tt.cssProps[a] = _(a) || a), (s = tt.cssHooks[e] || tt.cssHooks[a]) && "get" in s && (o = s.get(t, !0, n)), void 0 === o && (o = k(t, e, i)), "normal" === o && e in Qt && (o = Qt[e]), "" === n || n ? (r = parseFloat(o), !0 === n || isFinite(r) ? r || 0 : o) : o
            }
        }), tt.each(["height", "width"], function(t, e) {
            tt.cssHooks[e] = {
                get: function(t, n, i) {
                    return n ? Yt.test(tt.css(t, "display")) && 0 === t.offsetWidth ? Ut(t, Vt, function() {
                        return A(t, e, i)
                    }) : A(t, e, i) : void 0
                },
                set: function(t, n, i) {
                    var o, r = i && zt(t),
                        s = i && $(t, e, i, "border-box" === tt.css(t, "boxSizing", !1, r), r);
                    return s && (o = Tt.exec(n)) && "px" !== (o[3] || "px") && (t.style[e] = n, n = tt.css(t, e)), D(0, n, s)
                }
            }
        }), tt.cssHooks.marginLeft = E(Z.reliableMarginLeft, function(t, e) {
            return e ? (parseFloat(k(t, "marginLeft")) || t.getBoundingClientRect().left - Ut(t, {
                marginLeft: 0
            }, function() {
                return t.getBoundingClientRect().left
            })) + "px" : void 0
        }), tt.cssHooks.marginRight = E(Z.reliableMarginRight, function(t, e) {
            return e ? Ut(t, {
                display: "inline-block"
            }, k, [t, "marginRight"]) : void 0
        }), tt.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(t, e) {
            tt.cssHooks[t + e] = {
                expand: function(n) {
                    for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) o[t + kt[i] + e] = r[i] || r[i - 2] || r[0];
                    return o
                }
            }, Wt.test(t) || (tt.cssHooks[t + e].set = D)
        }), tt.fn.extend({
            css: function(t, e) {
                return vt(this, function(t, e, n) {
                    var i, o, r = {},
                        s = 0;
                    if (tt.isArray(e)) {
                        for (i = zt(t), o = e.length; o > s; s++) r[e[s]] = tt.css(t, e[s], !1, i);
                        return r
                    }
                    return void 0 !== n ? tt.style(t, e, n) : tt.css(t, e)
                }, t, e, arguments.length > 1)
            },
            show: function() {
                return I(this, !0)
            },
            hide: function() {
                return I(this)
            },
            toggle: function(t) {
                return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                    Et(this) ? tt(this).show() : tt(this).hide()
                })
            }
        }), tt.Tween = O, (O.prototype = {
            constructor: O,
            init: function(t, e, n, i, o, r) {
                this.elem = t, this.prop = n, this.easing = o || tt.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = r || (tt.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var t = O.propHooks[this.prop];
                return t && t.get ? t.get(this) : O.propHooks._default.get(this)
            },
            run: function(t) {
                var e, n = O.propHooks[this.prop];
                return this.options.duration ? this.pos = e = tt.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : O.propHooks._default.set(this), this
            }
        }).init.prototype = O.prototype, (O.propHooks = {
            _default: {
                get: function(t) {
                    var e;
                    return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = tt.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0
                },
                set: function(t) {
                    tt.fx.step[t.prop] ? tt.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[tt.cssProps[t.prop]] && !tt.cssHooks[t.prop] ? t.elem[t.prop] = t.now : tt.style(t.elem, t.prop, t.now + t.unit)
                }
            }
        }).scrollTop = O.propHooks.scrollLeft = {
            set: function(t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
            }
        }, tt.easing = {
            linear: function(t) {
                return t
            },
            swing: function(t) {
                return .5 - Math.cos(t * Math.PI) / 2
            },
            _default: "swing"
        }, tt.fx = O.prototype.init, tt.fx.step = {};
        var Zt, Jt, te = /^(?:toggle|show|hide)$/,
            ee = /queueHooks$/;
        tt.Animation = tt.extend(B, {
                tweeners: {
                    "*": [function(t, e) {
                        var n = this.createTween(t, e);
                        return l(n.elem, t, Tt.exec(e), n), n
                    }]
                },
                tweener: function(t, e) {
                    tt.isFunction(t) ? (e = t, t = ["*"]) : t = t.match(gt);
                    for (var n, i = 0, o = t.length; o > i; i++) n = t[i], B.tweeners[n] = B.tweeners[n] || [], B.tweeners[n].unshift(e)
                },
                prefilters: [function(t, e, n) {
                    var i, o, r, s, a, l, c, d = this,
                        u = {},
                        f = t.style,
                        p = t.nodeType && Et(t),
                        h = xt.get(t, "fxshow");
                    n.queue || (null == (a = tt._queueHooks(t, "fx")).unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
                        a.unqueued || l()
                    }), a.unqueued++, d.always(function() {
                        d.always(function() {
                            a.unqueued--, tt.queue(t, "fx").length || a.empty.fire()
                        })
                    })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], "inline" === ("none" === (c = tt.css(t, "display")) ? xt.get(t, "olddisplay") || T(t.nodeName) : c) && "none" === tt.css(t, "float") && (f.display = "inline-block")), n.overflow && (f.overflow = "hidden", d.always(function() {
                        f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
                    }));
                    for (i in e)
                        if (o = e[i], te.exec(o)) {
                            if (delete e[i], r = r || "toggle" === o, o === (p ? "hide" : "show")) {
                                if ("show" !== o || !h || void 0 === h[i]) continue;
                                p = !0
                            }
                            u[i] = h && h[i] || tt.style(t, i)
                        } else c = void 0;
                    if (tt.isEmptyObject(u)) "inline" === ("none" === c ? T(t.nodeName) : c) && (f.display = c);
                    else {
                        h ? "hidden" in h && (p = h.hidden) : h = xt.access(t, "fxshow", {}), r && (h.hidden = !p), p ? tt(t).show() : d.done(function() {
                            tt(t).hide()
                        }), d.done(function() {
                            var e;
                            xt.remove(t, "fxshow");
                            for (e in u) tt.style(t, e, u[e])
                        });
                        for (i in u) s = j(p ? h[i] : 0, i, d), i in h || (h[i] = s.start, p && (s.end = s.start, s.start = "width" === i || "height" === i ? 1 : 0))
                    }
                }],
                prefilter: function(t, e) {
                    e ? B.prefilters.unshift(t) : B.prefilters.push(t)
                }
            }), tt.speed = function(t, e, n) {
                var i = t && "object" == typeof t ? tt.extend({}, t) : {
                    complete: n || !n && e || tt.isFunction(t) && t,
                    duration: t,
                    easing: n && e || e && !tt.isFunction(e) && e
                };
                return i.duration = tt.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in tt.fx.speeds ? tt.fx.speeds[i.duration] : tt.fx.speeds._default, null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                    tt.isFunction(i.old) && i.old.call(this), i.queue && tt.dequeue(this, i.queue)
                }, i
            }, tt.fn.extend({
                fadeTo: function(t, e, n, i) {
                    return this.filter(Et).css("opacity", 0).show().end().animate({
                        opacity: e
                    }, t, n, i)
                },
                animate: function(t, e, n, i) {
                    var o = tt.isEmptyObject(t),
                        r = tt.speed(e, n, i),
                        s = function() {
                            var e = B(this, tt.extend({}, t), r);
                            (o || xt.get(this, "finish")) && e.stop(!0)
                        };
                    return s.finish = s, o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s)
                },
                stop: function(t, e, n) {
                    var i = function(t) {
                        var e = t.stop;
                        delete t.stop, e(n)
                    };
                    return "string" != typeof t && (n = e, e = t, t = void 0), e && !1 !== t && this.queue(t || "fx", []), this.each(function() {
                        var e = !0,
                            o = null != t && t + "queueHooks",
                            r = tt.timers,
                            s = xt.get(this);
                        if (o) s[o] && s[o].stop && i(s[o]);
                        else
                            for (o in s) s[o] && s[o].stop && ee.test(o) && i(s[o]);
                        for (o = r.length; o--;) r[o].elem !== this || null != t && r[o].queue !== t || (r[o].anim.stop(n), e = !1, r.splice(o, 1));
                        !e && n || tt.dequeue(this, t)
                    })
                },
                finish: function(t) {
                    return !1 !== t && (t = t || "fx"), this.each(function() {
                        var e, n = xt.get(this),
                            i = n[t + "queue"],
                            o = n[t + "queueHooks"],
                            r = tt.timers,
                            s = i ? i.length : 0;
                        for (n.finish = !0, tt.queue(this, t, []), o && o.stop && o.stop.call(this, !0), e = r.length; e--;) r[e].elem === this && r[e].queue === t && (r[e].anim.stop(!0), r.splice(e, 1));
                        for (e = 0; s > e; e++) i[e] && i[e].finish && i[e].finish.call(this);
                        delete n.finish
                    })
                }
            }), tt.each(["toggle", "show", "hide"], function(t, e) {
                var n = tt.fn[e];
                tt.fn[e] = function(t, i, o) {
                    return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(M(e, !0), t, i, o)
                }
            }), tt.each({
                slideDown: M("show"),
                slideUp: M("hide"),
                slideToggle: M("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(t, e) {
                tt.fn[t] = function(t, n, i) {
                    return this.animate(e, t, n, i)
                }
            }), tt.timers = [], tt.fx.tick = function() {
                var t, e = 0,
                    n = tt.timers;
                for (Zt = tt.now(); e < n.length; e++)(t = n[e])() || n[e] !== t || n.splice(e--, 1);
                n.length || tt.fx.stop(), Zt = void 0
            }, tt.fx.timer = function(t) {
                tt.timers.push(t), t() ? tt.fx.start() : tt.timers.pop()
            }, tt.fx.interval = 13, tt.fx.start = function() {
                Jt || (Jt = t.setInterval(tt.fx.tick, tt.fx.interval))
            }, tt.fx.stop = function() {
                t.clearInterval(Jt), Jt = null
            }, tt.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, tt.fn.delay = function(e, n) {
                return e = tt.fx ? tt.fx.speeds[e] || e : e, n = n || "fx", this.queue(n, function(n, i) {
                    var o = t.setTimeout(n, e);
                    i.stop = function() {
                        t.clearTimeout(o)
                    }
                })
            },
            function() {
                var t = z.createElement("input"),
                    e = z.createElement("select"),
                    n = e.appendChild(z.createElement("option"));
                t.type = "checkbox", Z.checkOn = "" !== t.value, Z.optSelected = n.selected, e.disabled = !0, Z.optDisabled = !n.disabled, (t = z.createElement("input")).value = "t", t.type = "radio", Z.radioValue = "t" === t.value
            }();
        var ne, ie = tt.expr.attrHandle;
        tt.fn.extend({
            attr: function(t, e) {
                return vt(this, tt.attr, t, e, arguments.length > 1)
            },
            removeAttr: function(t) {
                return this.each(function() {
                    tt.removeAttr(this, t)
                })
            }
        }), tt.extend({
            attr: function(t, e, n) {
                var i, o, r = t.nodeType;
                if (3 !== r && 8 !== r && 2 !== r) return void 0 === t.getAttribute ? tt.prop(t, e, n) : (1 === r && tt.isXMLDoc(t) || (e = e.toLowerCase(), o = tt.attrHooks[e] || (tt.expr.match.bool.test(e) ? ne : void 0)), void 0 !== n ? null === n ? void tt.removeAttr(t, e) : o && "set" in o && void 0 !== (i = o.set(t, n, e)) ? i : (t.setAttribute(e, n + ""), n) : o && "get" in o && null !== (i = o.get(t, e)) ? i : null == (i = tt.find.attr(t, e)) ? void 0 : i)
            },
            attrHooks: {
                type: {
                    set: function(t, e) {
                        if (!Z.radioValue && "radio" === e && tt.nodeName(t, "input")) {
                            var n = t.value;
                            return t.setAttribute("type", e), n && (t.value = n), e
                        }
                    }
                }
            },
            removeAttr: function(t, e) {
                var n, i, o = 0,
                    r = e && e.match(gt);
                if (r && 1 === t.nodeType)
                    for (; n = r[o++];) i = tt.propFix[n] || n, tt.expr.match.bool.test(n) && (t[i] = !1), t.removeAttribute(n)
            }
        }), ne = {
            set: function(t, e, n) {
                return !1 === e ? tt.removeAttr(t, n) : t.setAttribute(n, n), n
            }
        }, tt.each(tt.expr.match.bool.source.match(/\w+/g), function(t, e) {
            var n = ie[e] || tt.find.attr;
            ie[e] = function(t, e, i) {
                var o, r;
                return i || (r = ie[e], ie[e] = o, o = null != n(t, e, i) ? e.toLowerCase() : null, ie[e] = r), o
            }
        });
        var oe = /^(?:input|select|textarea|button)$/i,
            re = /^(?:a|area)$/i;
        tt.fn.extend({
            prop: function(t, e) {
                return vt(this, tt.prop, t, e, arguments.length > 1)
            },
            removeProp: function(t) {
                return this.each(function() {
                    delete this[tt.propFix[t] || t]
                })
            }
        }), tt.extend({
            prop: function(t, e, n) {
                var i, o, r = t.nodeType;
                if (3 !== r && 8 !== r && 2 !== r) return 1 === r && tt.isXMLDoc(t) || (e = tt.propFix[e] || e, o = tt.propHooks[e]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(t, n, e)) ? i : t[e] = n : o && "get" in o && null !== (i = o.get(t, e)) ? i : t[e]
            },
            propHooks: {
                tabIndex: {
                    get: function(t) {
                        var e = tt.find.attr(t, "tabindex");
                        return e ? parseInt(e, 10) : oe.test(t.nodeName) || re.test(t.nodeName) && t.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }), Z.optSelected || (tt.propHooks.selected = {
            get: function(t) {
                var e = t.parentNode;
                return e && e.parentNode && e.parentNode.selectedIndex, null
            },
            set: function(t) {
                var e = t.parentNode;
                e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
            }
        }), tt.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            tt.propFix[this.toLowerCase()] = this
        });
        var se = /[\t\r\n\f]/g;
        tt.fn.extend({
            addClass: function(t) {
                var e, n, i, o, r, s, a, l = 0;
                if (tt.isFunction(t)) return this.each(function(e) {
                    tt(this).addClass(t.call(this, e, L(this)))
                });
                if ("string" == typeof t && t)
                    for (e = t.match(gt) || []; n = this[l++];)
                        if (o = L(n), i = 1 === n.nodeType && (" " + o + " ").replace(se, " ")) {
                            for (s = 0; r = e[s++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                            o !== (a = tt.trim(i)) && n.setAttribute("class", a)
                        } return this
            },
            removeClass: function(t) {
                var e, n, i, o, r, s, a, l = 0;
                if (tt.isFunction(t)) return this.each(function(e) {
                    tt(this).removeClass(t.call(this, e, L(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof t && t)
                    for (e = t.match(gt) || []; n = this[l++];)
                        if (o = L(n), i = 1 === n.nodeType && (" " + o + " ").replace(se, " ")) {
                            for (s = 0; r = e[s++];)
                                for (; i.indexOf(" " + r + " ") > -1;) i = i.replace(" " + r + " ", " ");
                            o !== (a = tt.trim(i)) && n.setAttribute("class", a)
                        } return this
            },
            toggleClass: function(t, e) {
                var n = typeof t;
                return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : tt.isFunction(t) ? this.each(function(n) {
                    tt(this).toggleClass(t.call(this, n, L(this), e), e)
                }) : this.each(function() {
                    var e, i, o, r;
                    if ("string" === n)
                        for (i = 0, o = tt(this), r = t.match(gt) || []; e = r[i++];) o.hasClass(e) ? o.removeClass(e) : o.addClass(e);
                    else void 0 !== t && "boolean" !== n || ((e = L(this)) && xt.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === t ? "" : xt.get(this, "__className__") || ""))
                })
            },
            hasClass: function(t) {
                var e, n, i = 0;
                for (e = " " + t + " "; n = this[i++];)
                    if (1 === n.nodeType && (" " + L(n) + " ").replace(se, " ").indexOf(e) > -1) return !0;
                return !1
            }
        });
        var ae = /\r/g,
            le = /[\x20\t\r\n\f]+/g;
        tt.fn.extend({
            val: function(t) {
                var e, n, i, o = this[0];
                return arguments.length ? (i = tt.isFunction(t), this.each(function(n) {
                    var o;
                    1 === this.nodeType && (null == (o = i ? t.call(this, n, tt(this).val()) : t) ? o = "" : "number" == typeof o ? o += "" : tt.isArray(o) && (o = tt.map(o, function(t) {
                        return null == t ? "" : t + ""
                    })), (e = tt.valHooks[this.type] || tt.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, o, "value") || (this.value = o))
                })) : o ? (e = tt.valHooks[o.type] || tt.valHooks[o.nodeName.toLowerCase()]) && "get" in e && void 0 !== (n = e.get(o, "value")) ? n : "string" == typeof(n = o.value) ? n.replace(ae, "") : null == n ? "" : n : void 0
            }
        }), tt.extend({
            valHooks: {
                option: {
                    get: function(t) {
                        var e = tt.find.attr(t, "value");
                        return null != e ? e : tt.trim(tt.text(t)).replace(le, " ")
                    }
                },
                select: {
                    get: function(t) {
                        for (var e, n, i = t.options, o = t.selectedIndex, r = "select-one" === t.type || 0 > o, s = r ? null : [], a = r ? o + 1 : i.length, l = 0 > o ? a : r ? o : 0; a > l; l++)
                            if (((n = i[l]).selected || l === o) && (Z.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !tt.nodeName(n.parentNode, "optgroup"))) {
                                if (e = tt(n).val(), r) return e;
                                s.push(e)
                            } return s
                    },
                    set: function(t, e) {
                        for (var n, i, o = t.options, r = tt.makeArray(e), s = o.length; s--;) i = o[s], (i.selected = tt.inArray(tt.valHooks.option.get(i), r) > -1) && (n = !0);
                        return n || (t.selectedIndex = -1), r
                    }
                }
            }
        }), tt.each(["radio", "checkbox"], function() {
            tt.valHooks[this] = {
                set: function(t, e) {
                    return tt.isArray(e) ? t.checked = tt.inArray(tt(t).val(), e) > -1 : void 0
                }
            }, Z.checkOn || (tt.valHooks[this].get = function(t) {
                return null === t.getAttribute("value") ? "on" : t.value
            })
        });
        var ce = /^(?:focusinfocus|focusoutblur)$/;
        tt.extend(tt.event, {
            trigger: function(e, n, i, o) {
                var r, s, a, l, c, d, u, f = [i || z],
                    p = K.call(e, "type") ? e.type : e,
                    h = K.call(e, "namespace") ? e.namespace.split(".") : [];
                if (s = a = i = i || z, 3 !== i.nodeType && 8 !== i.nodeType && !ce.test(p + tt.event.triggered) && (p.indexOf(".") > -1 && (h = p.split("."), p = h.shift(), h.sort()), c = p.indexOf(":") < 0 && "on" + p, e = e[tt.expando] ? e : new tt.Event(p, "object" == typeof e && e), e.isTrigger = o ? 2 : 3, e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = i), n = null == n ? [e] : tt.makeArray(n, [e]), u = tt.event.special[p] || {}, o || !u.trigger || !1 !== u.trigger.apply(i, n))) {
                    if (!o && !u.noBubble && !tt.isWindow(i)) {
                        for (l = u.delegateType || p, ce.test(l + p) || (s = s.parentNode); s; s = s.parentNode) f.push(s), a = s;
                        a === (i.ownerDocument || z) && f.push(a.defaultView || a.parentWindow || t)
                    }
                    for (r = 0;
                        (s = f[r++]) && !e.isPropagationStopped();) e.type = r > 1 ? l : u.bindType || p, (d = (xt.get(s, "events") || {})[e.type] && xt.get(s, "handle")) && d.apply(s, n), (d = c && s[c]) && d.apply && yt(s) && (e.result = d.apply(s, n), !1 === e.result && e.preventDefault());
                    return e.type = p, o || e.isDefaultPrevented() || u._default && !1 !== u._default.apply(f.pop(), n) || !yt(i) || c && tt.isFunction(i[p]) && !tt.isWindow(i) && ((a = i[c]) && (i[c] = null), tt.event.triggered = p, i[p](), tt.event.triggered = void 0, a && (i[c] = a)), e.result
                }
            },
            simulate: function(t, e, n) {
                var i = tt.extend(new tt.Event, n, {
                    type: t,
                    isSimulated: !0
                });
                tt.event.trigger(i, null, e)
            }
        }), tt.fn.extend({
            trigger: function(t, e) {
                return this.each(function() {
                    tt.event.trigger(t, e, this)
                })
            },
            triggerHandler: function(t, e) {
                var n = this[0];
                return n ? tt.event.trigger(t, e, n, !0) : void 0
            }
        }), tt.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
            tt.fn[e] = function(t, n) {
                return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
            }
        }), tt.fn.extend({
            hover: function(t, e) {
                return this.mouseenter(t).mouseleave(e || t)
            }
        }), Z.focusin = "onfocusin" in t, Z.focusin || tt.each({
            focus: "focusin",
            blur: "focusout"
        }, function(t, e) {
            var n = function(t) {
                tt.event.simulate(e, t.target, tt.event.fix(t))
            };
            tt.event.special[e] = {
                setup: function() {
                    var i = this.ownerDocument || this,
                        o = xt.access(i, e);
                    o || i.addEventListener(t, n, !0), xt.access(i, e, (o || 0) + 1)
                },
                teardown: function() {
                    var i = this.ownerDocument || this,
                        o = xt.access(i, e) - 1;
                    o ? xt.access(i, e, o) : (i.removeEventListener(t, n, !0), xt.remove(i, e))
                }
            }
        });
        var de = t.location,
            ue = tt.now(),
            fe = /\?/;
        tt.parseJSON = function(t) {
            return JSON.parse(t + "")
        }, tt.parseXML = function(e) {
            var n;
            if (!e || "string" != typeof e) return null;
            try {
                n = (new t.DOMParser).parseFromString(e, "text/xml")
            } catch (t) {
                n = void 0
            }
            return n && !n.getElementsByTagName("parsererror").length || tt.error("Invalid XML: " + e), n
        };
        var pe = /#.*$/,
            he = /([?&])_=[^&]*/,
            ge = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            me = /^(?:GET|HEAD)$/,
            ve = /^\/\//,
            ye = {},
            xe = {},
            be = "*/".concat("*"),
            we = z.createElement("a");
        we.href = de.href, tt.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: de.href,
                type: "GET",
                isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(de.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": be,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": tt.parseJSON,
                    "text xml": tt.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(t, e) {
                return e ? q(q(t, tt.ajaxSettings), e) : q(tt.ajaxSettings, t)
            },
            ajaxPrefilter: P(ye),
            ajaxTransport: P(xe),
            ajax: function(e, n) {
                function i(e, n, i, a) {
                    var c, u, y, x, w, C = n;
                    2 !== b && (b = 2, l && t.clearTimeout(l), o = void 0, s = a || "", S.readyState = e > 0 ? 4 : 0, c = e >= 200 && 300 > e || 304 === e, i && (x = function(t, e, n) {
                        for (var i, o, r, s, a = t.contents, l = t.dataTypes;
                            "*" === l[0];) l.shift(), void 0 === i && (i = t.mimeType || e.getResponseHeader("Content-Type"));
                        if (i)
                            for (o in a)
                                if (a[o] && a[o].test(i)) {
                                    l.unshift(o);
                                    break
                                } if (l[0] in n) r = l[0];
                        else {
                            for (o in n) {
                                if (!l[0] || t.converters[o + " " + l[0]]) {
                                    r = o;
                                    break
                                }
                                s || (s = o)
                            }
                            r = r || s
                        }
                        return r ? (r !== l[0] && l.unshift(r), n[r]) : void 0
                    }(f, S, i)), x = function(t, e, n, i) {
                        var o, r, s, a, l, c = {},
                            d = t.dataTypes.slice();
                        if (d[1])
                            for (s in t.converters) c[s.toLowerCase()] = t.converters[s];
                        for (r = d.shift(); r;)
                            if (t.responseFields[r] && (n[t.responseFields[r]] = e), !l && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = r, r = d.shift())
                                if ("*" === r) r = l;
                                else if ("*" !== l && l !== r) {
                            if (!(s = c[l + " " + r] || c["* " + r]))
                                for (o in c)
                                    if ((a = o.split(" "))[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                                        !0 === s ? s = c[o] : !0 !== c[o] && (r = a[0], d.unshift(a[1]));
                                        break
                                    } if (!0 !== s)
                                if (s && t.throws) e = s(e);
                                else try {
                                    e = s(e)
                                } catch (t) {
                                    return {
                                        state: "parsererror",
                                        error: s ? t : "No conversion from " + l + " to " + r
                                    }
                                }
                        }
                        return {
                            state: "success",
                            data: e
                        }
                    }(f, x, S, c), c ? (f.ifModified && ((w = S.getResponseHeader("Last-Modified")) && (tt.lastModified[r] = w), (w = S.getResponseHeader("etag")) && (tt.etag[r] = w)), 204 === e || "HEAD" === f.type ? C = "nocontent" : 304 === e ? C = "notmodified" : (C = x.state, u = x.data, y = x.error, c = !y)) : (y = C, !e && C || (C = "error", 0 > e && (e = 0))), S.status = e, S.statusText = (n || C) + "", c ? g.resolveWith(p, [u, C, S]) : g.rejectWith(p, [S, C, y]), S.statusCode(v), v = void 0, d && h.trigger(c ? "ajaxSuccess" : "ajaxError", [S, f, c ? u : y]), m.fireWith(p, [S, C]), d && (h.trigger("ajaxComplete", [S, f]), --tt.active || tt.event.trigger("ajaxStop")))
                }
                "object" == typeof e && (n = e, e = void 0), n = n || {};
                var o, r, s, a, l, c, d, u, f = tt.ajaxSetup({}, n),
                    p = f.context || f,
                    h = f.context && (p.nodeType || p.jquery) ? tt(p) : tt.event,
                    g = tt.Deferred(),
                    m = tt.Callbacks("once memory"),
                    v = f.statusCode || {},
                    y = {},
                    x = {},
                    b = 0,
                    w = "canceled",
                    S = {
                        readyState: 0,
                        getResponseHeader: function(t) {
                            var e;
                            if (2 === b) {
                                if (!a)
                                    for (a = {}; e = ge.exec(s);) a[e[1].toLowerCase()] = e[2];
                                e = a[t.toLowerCase()]
                            }
                            return null == e ? null : e
                        },
                        getAllResponseHeaders: function() {
                            return 2 === b ? s : null
                        },
                        setRequestHeader: function(t, e) {
                            var n = t.toLowerCase();
                            return b || (t = x[n] = x[n] || t, y[t] = e), this
                        },
                        overrideMimeType: function(t) {
                            return b || (f.mimeType = t), this
                        },
                        statusCode: function(t) {
                            var e;
                            if (t)
                                if (2 > b)
                                    for (e in t) v[e] = [v[e], t[e]];
                                else S.always(t[S.status]);
                            return this
                        },
                        abort: function(t) {
                            var e = t || w;
                            return o && o.abort(e), i(0, e), this
                        }
                    };
                if (g.promise(S).complete = m.add, S.success = S.done, S.error = S.fail, f.url = ((e || f.url || de.href) + "").replace(pe, "").replace(ve, de.protocol + "//"), f.type = n.method || n.type || f.method || f.type, f.dataTypes = tt.trim(f.dataType || "*").toLowerCase().match(gt) || [""], null == f.crossDomain) {
                    c = z.createElement("a");
                    try {
                        c.href = f.url, c.href = c.href, f.crossDomain = we.protocol + "//" + we.host != c.protocol + "//" + c.host
                    } catch (t) {
                        f.crossDomain = !0
                    }
                }
                if (f.data && f.processData && "string" != typeof f.data && (f.data = tt.param(f.data, f.traditional)), R(ye, f, n, S), 2 === b) return S;
                (d = tt.event && f.global) && 0 == tt.active++ && tt.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !me.test(f.type), r = f.url, f.hasContent || (f.data && (r = f.url += (fe.test(r) ? "&" : "?") + f.data, delete f.data), !1 === f.cache && (f.url = he.test(r) ? r.replace(he, "$1_=" + ue++) : r + (fe.test(r) ? "&" : "?") + "_=" + ue++)), f.ifModified && (tt.lastModified[r] && S.setRequestHeader("If-Modified-Since", tt.lastModified[r]), tt.etag[r] && S.setRequestHeader("If-None-Match", tt.etag[r])), (f.data && f.hasContent && !1 !== f.contentType || n.contentType) && S.setRequestHeader("Content-Type", f.contentType), S.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + be + "; q=0.01" : "") : f.accepts["*"]);
                for (u in f.headers) S.setRequestHeader(u, f.headers[u]);
                if (f.beforeSend && (!1 === f.beforeSend.call(p, S, f) || 2 === b)) return S.abort();
                w = "abort";
                for (u in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) S[u](f[u]);
                if (o = R(xe, f, n, S)) {
                    if (S.readyState = 1, d && h.trigger("ajaxSend", [S, f]), 2 === b) return S;
                    f.async && f.timeout > 0 && (l = t.setTimeout(function() {
                        S.abort("timeout")
                    }, f.timeout));
                    try {
                        b = 1, o.send(y, i)
                    } catch (t) {
                        if (!(2 > b)) throw t;
                        i(-1, t)
                    }
                } else i(-1, "No Transport");
                return S
            },
            getJSON: function(t, e, n) {
                return tt.get(t, e, n, "json")
            },
            getScript: function(t, e) {
                return tt.get(t, void 0, e, "script")
            }
        }), tt.each(["get", "post"], function(t, e) {
            tt[e] = function(t, n, i, o) {
                return tt.isFunction(n) && (o = o || i, i = n, n = void 0), tt.ajax(tt.extend({
                    url: t,
                    type: e,
                    dataType: o,
                    data: n,
                    success: i
                }, tt.isPlainObject(t) && t))
            }
        }), tt._evalUrl = function(t) {
            return tt.ajax({
                url: t,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                throws: !0
            })
        }, tt.fn.extend({
            wrapAll: function(t) {
                var e;
                return tt.isFunction(t) ? this.each(function(e) {
                    tt(this).wrapAll(t.call(this, e))
                }) : (this[0] && (e = tt(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                    for (var t = this; t.firstElementChild;) t = t.firstElementChild;
                    return t
                }).append(this)), this)
            },
            wrapInner: function(t) {
                return tt.isFunction(t) ? this.each(function(e) {
                    tt(this).wrapInner(t.call(this, e))
                }) : this.each(function() {
                    var e = tt(this),
                        n = e.contents();
                    n.length ? n.wrapAll(t) : e.append(t)
                })
            },
            wrap: function(t) {
                var e = tt.isFunction(t);
                return this.each(function(n) {
                    tt(this).wrapAll(e ? t.call(this, n) : t)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    tt.nodeName(this, "body") || tt(this).replaceWith(this.childNodes)
                }).end()
            }
        }), tt.expr.filters.hidden = function(t) {
            return !tt.expr.filters.visible(t)
        }, tt.expr.filters.visible = function(t) {
            return t.offsetWidth > 0 || t.offsetHeight > 0 || t.getClientRects().length > 0
        };
        var Se = /%20/g,
            Ce = /\[\]$/,
            Te = /\r?\n/g,
            ke = /^(?:submit|button|image|reset|file)$/i,
            Ee = /^(?:input|select|textarea|keygen)/i;
        tt.param = function(t, e) {
            var n, i = [],
                o = function(t, e) {
                    e = tt.isFunction(e) ? e() : null == e ? "" : e, i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
                };
            if (void 0 === e && (e = tt.ajaxSettings && tt.ajaxSettings.traditional), tt.isArray(t) || t.jquery && !tt.isPlainObject(t)) tt.each(t, function() {
                o(this.name, this.value)
            });
            else
                for (n in t) H(n, t[n], e, o);
            return i.join("&").replace(Se, "+")
        }, tt.fn.extend({
            serialize: function() {
                return tt.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var t = tt.prop(this, "elements");
                    return t ? tt.makeArray(t) : this
                }).filter(function() {
                    var t = this.type;
                    return this.name && !tt(this).is(":disabled") && Ee.test(this.nodeName) && !ke.test(t) && (this.checked || !_t.test(t))
                }).map(function(t, e) {
                    var n = tt(this).val();
                    return null == n ? null : tt.isArray(n) ? tt.map(n, function(t) {
                        return {
                            name: e.name,
                            value: t.replace(Te, "\r\n")
                        }
                    }) : {
                        name: e.name,
                        value: n.replace(Te, "\r\n")
                    }
                }).get()
            }
        }), tt.ajaxSettings.xhr = function() {
            try {
                return new t.XMLHttpRequest
            } catch (t) {}
        };
        var _e = {
                0: 200,
                1223: 204
            },
            De = tt.ajaxSettings.xhr();
        Z.cors = !!De && "withCredentials" in De, Z.ajax = De = !!De, tt.ajaxTransport(function(e) {
            var n, i;
            return Z.cors || De && !e.crossDomain ? {
                send: function(o, r) {
                    var s, a = e.xhr();
                    if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                        for (s in e.xhrFields) a[s] = e.xhrFields[s];
                    e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest");
                    for (s in o) a.setRequestHeader(s, o[s]);
                    n = function(t) {
                        return function() {
                            n && (n = i = a.onload = a.onerror = a.onabort = a.onreadystatechange = null, "abort" === t ? a.abort() : "error" === t ? "number" != typeof a.status ? r(0, "error") : r(a.status, a.statusText) : r(_e[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                                binary: a.response
                            } : {
                                text: a.responseText
                            }, a.getAllResponseHeaders()))
                        }
                    }, a.onload = n(), i = a.onerror = n("error"), void 0 !== a.onabort ? a.onabort = i : a.onreadystatechange = function() {
                        4 === a.readyState && t.setTimeout(function() {
                            n && i()
                        })
                    }, n = n("abort");
                    try {
                        a.send(e.hasContent && e.data || null)
                    } catch (t) {
                        if (n) throw t
                    }
                },
                abort: function() {
                    n && n()
                }
            } : void 0
        }), tt.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(t) {
                    return tt.globalEval(t), t
                }
            }
        }), tt.ajaxPrefilter("script", function(t) {
            void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
        }), tt.ajaxTransport("script", function(t) {
            if (t.crossDomain) {
                var e, n;
                return {
                    send: function(i, o) {
                        e = tt("<script>").prop({
                            charset: t.scriptCharset,
                            src: t.url
                        }).on("load error", n = function(t) {
                            e.remove(), n = null, t && o("error" === t.type ? 404 : 200, t.type)
                        }), z.head.appendChild(e[0])
                    },
                    abort: function() {
                        n && n()
                    }
                }
            }
        });
        var $e = [],
            Ae = /(=)\?(?=&|$)|\?\?/;
        tt.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var t = $e.pop() || tt.expando + "_" + ue++;
                return this[t] = !0, t
            }
        }), tt.ajaxPrefilter("json jsonp", function(e, n, i) {
            var o, r, s, a = !1 !== e.jsonp && (Ae.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Ae.test(e.data) && "data");
            return a || "jsonp" === e.dataTypes[0] ? (o = e.jsonpCallback = tt.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Ae, "$1" + o) : !1 !== e.jsonp && (e.url += (fe.test(e.url) ? "&" : "?") + e.jsonp + "=" + o), e.converters["script json"] = function() {
                return s || tt.error(o + " was not called"), s[0]
            }, e.dataTypes[0] = "json", r = t[o], t[o] = function() {
                s = arguments
            }, i.always(function() {
                void 0 === r ? tt(t).removeProp(o) : t[o] = r, e[o] && (e.jsonpCallback = n.jsonpCallback, $e.push(o)), s && tt.isFunction(r) && r(s[0]), s = r = void 0
            }), "script") : void 0
        }), tt.parseHTML = function(t, e, n) {
            if (!t || "string" != typeof t) return null;
            "boolean" == typeof e && (n = e, e = !1), e = e || z;
            var i = ct.exec(t),
                o = !n && [];
            return i ? [e.createElement(i[1])] : (i = u([t], e, o), o && o.length && tt(o).remove(), tt.merge([], i.childNodes))
        };
        var Ie = tt.fn.load;
        tt.fn.load = function(t, e, n) {
            if ("string" != typeof t && Ie) return Ie.apply(this, arguments);
            var i, o, r, s = this,
                a = t.indexOf(" ");
            return a > -1 && (i = tt.trim(t.slice(a)), t = t.slice(0, a)), tt.isFunction(e) ? (n = e, e = void 0) : e && "object" == typeof e && (o = "POST"), s.length > 0 && tt.ajax({
                url: t,
                type: o || "GET",
                dataType: "html",
                data: e
            }).done(function(t) {
                r = arguments, s.html(i ? tt("<div>").append(tt.parseHTML(t)).find(i) : t)
            }).always(n && function(t, e) {
                s.each(function() {
                    n.apply(this, r || [t.responseText, e, t])
                })
            }), this
        }, tt.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
            tt.fn[e] = function(t) {
                return this.on(e, t)
            }
        }), tt.expr.filters.animated = function(t) {
            return tt.grep(tt.timers, function(e) {
                return t === e.elem
            }).length
        }, tt.offset = {
            setOffset: function(t, e, n) {
                var i, o, r, s, a, l, c = tt.css(t, "position"),
                    d = tt(t),
                    u = {};
                "static" === c && (t.style.position = "relative"), a = d.offset(), r = tt.css(t, "top"), l = tt.css(t, "left"), ("absolute" === c || "fixed" === c) && (r + l).indexOf("auto") > -1 ? (i = d.position(), s = i.top, o = i.left) : (s = parseFloat(r) || 0, o = parseFloat(l) || 0), tt.isFunction(e) && (e = e.call(t, n, tt.extend({}, a))), null != e.top && (u.top = e.top - a.top + s), null != e.left && (u.left = e.left - a.left + o), "using" in e ? e.using.call(t, u) : d.css(u)
            }
        }, tt.fn.extend({
            offset: function(t) {
                if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                    tt.offset.setOffset(this, t, e)
                });
                var e, n, i = this[0],
                    o = {
                        top: 0,
                        left: 0
                    },
                    r = i && i.ownerDocument;
                return r ? (e = r.documentElement, tt.contains(e, i) ? (o = i.getBoundingClientRect(), n = W(r), {
                    top: o.top + n.pageYOffset - e.clientTop,
                    left: o.left + n.pageXOffset - e.clientLeft
                }) : o) : void 0
            },
            position: function() {
                if (this[0]) {
                    var t, e, n = this[0],
                        i = {
                            top: 0,
                            left: 0
                        };
                    return "fixed" === tt.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), tt.nodeName(t[0], "html") || (i = t.offset()), i.top += tt.css(t[0], "borderTopWidth", !0), i.left += tt.css(t[0], "borderLeftWidth", !0)), {
                        top: e.top - i.top - tt.css(n, "marginTop", !0),
                        left: e.left - i.left - tt.css(n, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent; t && "static" === tt.css(t, "position");) t = t.offsetParent;
                    return t || Xt
                })
            }
        }), tt.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(t, e) {
            var n = "pageYOffset" === e;
            tt.fn[t] = function(i) {
                return vt(this, function(t, i, o) {
                    var r = W(t);
                    return void 0 === o ? r ? r[e] : t[i] : void(r ? r.scrollTo(n ? r.pageXOffset : o, n ? o : r.pageYOffset) : t[i] = o)
                }, t, i, arguments.length)
            }
        }), tt.each(["top", "left"], function(t, e) {
            tt.cssHooks[e] = E(Z.pixelPosition, function(t, n) {
                return n ? (n = k(t, e), Ft.test(n) ? tt(t).position()[e] + "px" : n) : void 0
            })
        }), tt.each({
            Height: "height",
            Width: "width"
        }, function(t, e) {
            tt.each({
                padding: "inner" + t,
                content: e,
                "": "outer" + t
            }, function(n, i) {
                tt.fn[i] = function(i, o) {
                    var r = arguments.length && (n || "boolean" != typeof i),
                        s = n || (!0 === i || !0 === o ? "margin" : "border");
                    return vt(this, function(e, n, i) {
                        var o;
                        return tt.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (o = e.documentElement, Math.max(e.body["scroll" + t], o["scroll" + t], e.body["offset" + t], o["offset" + t], o["client" + t])) : void 0 === i ? tt.css(e, n, s) : tt.style(e, n, i, s)
                    }, e, r ? i : void 0, r, null)
                }
            })
        }), tt.fn.extend({
            bind: function(t, e, n) {
                return this.on(t, null, e, n)
            },
            unbind: function(t, e) {
                return this.off(t, null, e)
            },
            delegate: function(t, e, n, i) {
                return this.on(e, t, n, i)
            },
            undelegate: function(t, e, n) {
                return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
            },
            size: function() {
                return this.length
            }
        }), tt.fn.andSelf = tt.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
            return tt
        });
        var Oe = t.jQuery,
            Ne = t.$;
        return tt.noConflict = function(e) {
            return t.$ === tt && (t.$ = Ne), e && t.jQuery === tt && (t.jQuery = Oe), tt
        }, e || (t.jQuery = t.$ = tt), tt
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(t) {
    "use strict";
    var e = jQuery.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(),
function(t) {
    "use strict";
    t.fn.emulateTransitionEnd = function(e) {
        var n = !1,
            i = this;
        t(this).one("bsTransitionEnd", function() {
            n = !0
        });
        return setTimeout(function() {
            n || t(i).trigger(t.support.transition.end)
        }, e), this
    }, t(function() {
        t.support.transition = function() {
            var t = document.createElement("bootstrap"),
                e = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var n in e)
                if (void 0 !== t.style[n]) return {
                    end: e[n]
                };
            return !1
        }(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(e) {
                if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery),
function(t) {
    "use strict";
    var e = '[data-dismiss="alert"]',
        n = function(n) {
            t(n).on("click", e, this.close)
        };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 150, n.prototype.close = function(e) {
        function i() {
            s.detach().trigger("closed.bs.alert").remove()
        }
        var o = t(this),
            r = o.attr("data-target");
        r || (r = o.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
        var s = t("#" === r ? [] : r);
        e && e.preventDefault(), s.length || (s = o.closest(".alert")), s.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (s.removeClass("in"), t.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", i).emulateTransitionEnd(n.TRANSITION_DURATION) : i())
    };
    var i = t.fn.alert;
    t.fn.alert = function(e) {
        return this.each(function() {
            var i = t(this),
                o = i.data("bs.alert");
            o || i.data("bs.alert", o = new n(this)), "string" == typeof e && o[e].call(i)
        })
    }, t.fn.alert.Constructor = n, t.fn.alert.noConflict = function() {
        return t.fn.alert = i, this
    }, t(document).on("click.bs.alert.data-api", e, n.prototype.close)
}(jQuery),
function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                o = i.data("bs.button"),
                r = "object" == typeof e && e;
            o || i.data("bs.button", o = new n(this, r)), "toggle" == e ? o.toggle() : e && o.setState(e)
        })
    }
    var n = function(e, i) {
        this.$element = t(e), this.options = t.extend({}, n.DEFAULTS, i), this.isLoading = !1
    };
    n.VERSION = "3.3.7", n.DEFAULTS = {
        loadingText: "loading..."
    }, n.prototype.setState = function(e) {
        var n = "disabled",
            i = this.$element,
            o = i.is("input") ? "val" : "html",
            r = i.data();
        e += "Text", null == r.resetText && i.data("resetText", i[o]()), setTimeout(t.proxy(function() {
            i[o](null == r[e] ? this.options[e] : r[e]), "loadingText" == e ? (this.isLoading = !0, i.addClass(n).attr(n, n).prop(n, !0)) : this.isLoading && (this.isLoading = !1, i.removeClass(n).removeAttr(n).prop(n, !1))
        }, this), 0)
    }, n.prototype.toggle = function() {
        var t = !0,
            e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var n = this.$element.find("input");
            "radio" == n.prop("type") ? (n.prop("checked") && (t = !1), e.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == n.prop("type") && (n.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), n.prop("checked", this.$element.hasClass("active")), t && n.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var i = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = n, t.fn.button.noConflict = function() {
        return t.fn.button = i, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(n) {
        var i = t(n.target).closest(".btn");
        e.call(i, "toggle"), t(n.target).is('input[type="radio"], input[type="checkbox"]') || (n.preventDefault(), i.is("input,button") ? i.trigger("focus") : i.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery),
function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                o = i.data("bs.carousel"),
                r = t.extend({}, n.DEFAULTS, i.data(), "object" == typeof e && e),
                s = "string" == typeof e ? e : r.slide;
            o || i.data("bs.carousel", o = new n(this, r)), "number" == typeof e ? o.to(e) : s ? o[s]() : r.interval && o.pause().cycle()
        })
    }
    var n = function(e, n) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 600, n.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, n.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, n.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, n.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, n.prototype.getItemForDirection = function(t, e) {
        var n = this.getItemIndex(e);
        if (("prev" == t && 0 === n || "next" == t && n == this.$items.length - 1) && !this.options.wrap) return e;
        var i = (n + ("prev" == t ? -1 : 1)) % this.$items.length;
        return this.$items.eq(i)
    }, n.prototype.to = function(t) {
        var e = this,
            n = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(t > this.$items.length - 1 || t < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
            e.to(t)
        }) : n == t ? this.pause().cycle() : this.slide(t > n ? "next" : "prev", this.$items.eq(t))
    }, n.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, n.prototype.next = function() {
        if (!this.sliding) return this.slide("next")
    }, n.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev")
    }, n.prototype.slide = function(e, i) {
        var o = this.$element.find(".item.active"),
            r = i || this.getItemForDirection(e, o),
            s = this.interval,
            a = "next" == e ? "left" : "right",
            l = this;
        if (r.hasClass("active")) return this.sliding = !1;
        var c = r[0],
            d = t.Event("slide.bs.carousel", {
                relatedTarget: c,
                direction: a
            });
        if (this.$element.trigger(d), !d.isDefaultPrevented()) {
            if (this.sliding = !0, s && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var u = t(this.$indicators.children()[this.getItemIndex(r)]);
                u && u.addClass("active")
            }
            var f = t.Event("slid.bs.carousel", {
                relatedTarget: c,
                direction: a
            });
            return t.support.transition && this.$element.hasClass("slide") ? (r.addClass(e), r[0].offsetWidth, o.addClass(a), r.addClass(a), o.one("bsTransitionEnd", function() {
                r.removeClass([e, a].join(" ")).addClass("active"), o.removeClass(["active", a].join(" ")), l.sliding = !1, setTimeout(function() {
                    l.$element.trigger(f)
                }, 0)
            }).emulateTransitionEnd(n.TRANSITION_DURATION)) : (o.removeClass("active"), r.addClass("active"), this.sliding = !1, this.$element.trigger(f)), s && this.cycle(), this
        }
    };
    var i = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = n, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = i, this
    };
    var o = function(n) {
        var i, o = t(this),
            r = t(o.attr("data-target") || (i = o.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""));
        if (r.hasClass("carousel")) {
            var s = t.extend({}, r.data(), o.data()),
                a = o.attr("data-slide-to");
            a && (s.interval = !1), e.call(r, s), a && r.data("bs.carousel").to(a), n.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", o).on("click.bs.carousel.data-api", "[data-slide-to]", o), t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var n = t(this);
            e.call(n, n.data())
        })
    })
}(jQuery),
function(t) {
    "use strict";

    function e(e) {
        var n, i = e.attr("data-target") || (n = e.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "");
        return t(i)
    }

    function n(e) {
        return this.each(function() {
            var n = t(this),
                o = n.data("bs.collapse"),
                r = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
            !o && r.toggle && /show|hide/.test(e) && (r.toggle = !1), o || n.data("bs.collapse", o = new i(this, r)), "string" == typeof e && o[e]()
        })
    }
    var i = function(e, n) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, n), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 350, i.DEFAULTS = {
        toggle: !0
    }, i.prototype.dimension = function() {
        return this.$element.hasClass("width") ? "width" : "height"
    }, i.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, o = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(o && o.length && (e = o.data("bs.collapse")) && e.transitioning)) {
                var r = t.Event("show.bs.collapse");
                if (this.$element.trigger(r), !r.isDefaultPrevented()) {
                    o && o.length && (n.call(o, "hide"), e || o.data("bs.collapse", null));
                    var s = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[s](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var a = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[s](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return a.call(this);
                    var l = t.camelCase(["scroll", s].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(i.TRANSITION_DURATION)[s](this.$element[0][l])
                }
            }
        }
    }, i.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var n = this.dimension();
                this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var o = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[n](0).one("bsTransitionEnd", t.proxy(o, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : o.call(this)
            }
        }
    }, i.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, i.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(n, i) {
            var o = t(i);
            this.addAriaAndCollapsedClass(e(o), o)
        }, this)).end()
    }, i.prototype.addAriaAndCollapsedClass = function(t, e) {
        var n = t.hasClass("in");
        t.attr("aria-expanded", n), e.toggleClass("collapsed", !n).attr("aria-expanded", n)
    };
    var o = t.fn.collapse;
    t.fn.collapse = n, t.fn.collapse.Constructor = i, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = o, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(i) {
        var o = t(this);
        o.attr("data-target") || i.preventDefault();
        var r = e(o),
            s = r.data("bs.collapse") ? "toggle" : o.data();
        n.call(r, s)
    })
}(jQuery),
function(t) {
    "use strict";

    function e(e) {
        var n = e.attr("data-target");
        n || (n = e.attr("href"), n = n && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
        var i = n && t(n);
        return i && i.length ? i : e.parent()
    }

    function n(n) {
        n && 3 === n.which || (t(i).remove(), t(o).each(function() {
            var i = t(this),
                o = e(i),
                r = {
                    relatedTarget: this
                };
            o.hasClass("open") && (n && "click" == n.type && /input|textarea/i.test(n.target.tagName) && t.contains(o[0], n.target) || (o.trigger(n = t.Event("hide.bs.dropdown", r)), n.isDefaultPrevented() || (i.attr("aria-expanded", "false"), o.removeClass("open").trigger(t.Event("hidden.bs.dropdown", r)))))
        }))
    }
    var i = ".dropdown-backdrop",
        o = '[data-toggle="dropdown"]',
        r = function(e) {
            t(e).on("click.bs.dropdown", this.toggle)
        };
    r.VERSION = "3.3.7", r.prototype.toggle = function(i) {
        var o = t(this);
        if (!o.is(".disabled, :disabled")) {
            var r = e(o),
                s = r.hasClass("open");
            if (n(), !s) {
                "ontouchstart" in document.documentElement && !r.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", n);
                var a = {
                    relatedTarget: this
                };
                if (r.trigger(i = t.Event("show.bs.dropdown", a)), i.isDefaultPrevented()) return;
                o.trigger("focus").attr("aria-expanded", "true"), r.toggleClass("open").trigger(t.Event("shown.bs.dropdown", a))
            }
            return !1
        }
    }, r.prototype.keydown = function(n) {
        if (/(38|40|27|32)/.test(n.which) && !/input|textarea/i.test(n.target.tagName)) {
            var i = t(this);
            if (n.preventDefault(), n.stopPropagation(), !i.is(".disabled, :disabled")) {
                var r = e(i),
                    s = r.hasClass("open");
                if (!s && 27 != n.which || s && 27 == n.which) return 27 == n.which && r.find(o).trigger("focus"), i.trigger("click");
                var a = r.find(".dropdown-menu li:not(.disabled):visible a");
                if (a.length) {
                    var l = a.index(n.target);
                    38 == n.which && l > 0 && l--, 40 == n.which && l < a.length - 1 && l++, ~l || (l = 0), a.eq(l).trigger("focus")
                }
            }
        }
    };
    var s = t.fn.dropdown;
    t.fn.dropdown = function(e) {
        return this.each(function() {
            var n = t(this),
                i = n.data("bs.dropdown");
            i || n.data("bs.dropdown", i = new r(this)), "string" == typeof e && i[e].call(n)
        })
    }, t.fn.dropdown.Constructor = r, t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = s, this
    }, t(document).on("click.bs.dropdown.data-api", n).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", o, r.prototype.toggle).on("keydown.bs.dropdown.data-api", o, r.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", r.prototype.keydown)
}(jQuery),
function(t) {
    "use strict";

    function e(e, i) {
        return this.each(function() {
            var o = t(this),
                r = o.data("bs.modal"),
                s = t.extend({}, n.DEFAULTS, o.data(), "object" == typeof e && e);
            r || o.data("bs.modal", r = new n(this, s)), "string" == typeof e ? r[e](i) : s.show && r.show(i)
        })
    }
    var n = function(e, n) {
        this.options = n, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 300, n.BACKDROP_TRANSITION_DURATION = 150, n.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, n.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t)
    }, n.prototype.show = function(e) {
        var i = this,
            o = t.Event("show.bs.modal", {
                relatedTarget: e
            });
        this.$element.trigger(o), this.isShown || o.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            i.$element.one("mouseup.dismiss.bs.modal", function(e) {
                t(e.target).is(i.$element) && (i.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var o = t.support.transition && i.$element.hasClass("fade");
            i.$element.parent().length || i.$element.appendTo(i.$body), i.$element.show().scrollTop(0), i.adjustDialog(), o && i.$element[0].offsetWidth, i.$element.addClass("in"), i.enforceFocus();
            var r = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            o ? i.$dialog.one("bsTransitionEnd", function() {
                i.$element.trigger("focus").trigger(r)
            }).emulateTransitionEnd(n.TRANSITION_DURATION) : i.$element.trigger("focus").trigger(r)
        }))
    }, n.prototype.hide = function(e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : this.hideModal())
    }, n.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            document === t.target || this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, n.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, n.prototype.resize = function() {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }, n.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(), this.backdrop(function() {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, n.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, n.prototype.backdrop = function(e) {
        var i = this,
            o = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var r = t.support.transition && o;
            if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + o).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), r && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            r ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var s = function() {
                i.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", s).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : s()
        } else e && e()
    }, n.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, n.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }, n.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, n.prototype.checkScrollbar = function() {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
    }, n.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, n.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, n.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var i = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = n, t.fn.modal.noConflict = function() {
        return t.fn.modal = i, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(n) {
        var i = t(this),
            o = i.attr("href"),
            r = t(i.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, "")),
            s = r.data("bs.modal") ? "toggle" : t.extend({
                remote: !/#/.test(o) && o
            }, r.data(), i.data());
        i.is("a") && n.preventDefault(), r.one("show.bs.modal", function(t) {
            t.isDefaultPrevented() || r.one("hidden.bs.modal", function() {
                i.is(":visible") && i.trigger("focus")
            })
        }), e.call(r, s, this)
    })
}(jQuery),
function(t) {
    "use strict";
    var e = function(t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
    };
    e.VERSION = "3.3.7", e.TRANSITION_DURATION = 150, e.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, e.prototype.init = function(e, n, i) {
        if (this.enabled = !0, this.type = e, this.$element = t(n), this.options = this.getOptions(i), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var o = this.options.trigger.split(" "), r = o.length; r--;) {
            var s = o[r];
            if ("click" == s) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != s) {
                var a = "hover" == s ? "mouseenter" : "focusin",
                    l = "hover" == s ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, e.prototype.getDefaults = function() {
        return e.DEFAULTS
    }, e.prototype.getOptions = function(e) {
        return (e = t.extend({}, this.getDefaults(), this.$element.data(), e)).delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, e.prototype.getDelegateOptions = function() {
        var e = {},
            n = this.getDefaults();
        return this._options && t.each(this._options, function(t, i) {
            n[t] != i && (e[t] = i)
        }), e
    }, e.prototype.enter = function(e) {
        var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), e instanceof t.Event && (n.inState["focusin" == e.type ? "focus" : "hover"] = !0), n.tip().hasClass("in") || "in" == n.hoverState ? void(n.hoverState = "in") : (clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? void(n.timeout = setTimeout(function() {
            "in" == n.hoverState && n.show()
        }, n.options.delay.show)) : n.show())
    }, e.prototype.isInStateTrue = function() {
        for (var t in this.inState)
            if (this.inState[t]) return !0;
        return !1
    }, e.prototype.leave = function(e) {
        var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        if (n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), e instanceof t.Event && (n.inState["focusout" == e.type ? "focus" : "hover"] = !1), !n.isInStateTrue()) return clearTimeout(n.timeout), n.hoverState = "out", n.options.delay && n.options.delay.hide ? void(n.timeout = setTimeout(function() {
            "out" == n.hoverState && n.hide()
        }, n.options.delay.hide)) : n.hide()
    }, e.prototype.show = function() {
        var n = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(n);
            var i = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (n.isDefaultPrevented() || !i) return;
            var o = this,
                r = this.tip(),
                s = this.getUID(this.type);
            this.setContent(), r.attr("id", s), this.$element.attr("aria-describedby", s), this.options.animation && r.addClass("fade");
            var a = "function" == typeof this.options.placement ? this.options.placement.call(this, r[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i,
                c = l.test(a);
            c && (a = a.replace(l, "") || "top"), r.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(a).data("bs." + this.type, this), this.options.container ? r.appendTo(this.options.container) : r.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var d = this.getPosition(),
                u = r[0].offsetWidth,
                f = r[0].offsetHeight;
            if (c) {
                var p = a,
                    h = this.getPosition(this.$viewport);
                a = "bottom" == a && d.bottom + f > h.bottom ? "top" : "top" == a && d.top - f < h.top ? "bottom" : "right" == a && d.right + u > h.width ? "left" : "left" == a && d.left - u < h.left ? "right" : a, r.removeClass(p).addClass(a)
            }
            var g = this.getCalculatedOffset(a, d, u, f);
            this.applyPlacement(g, a);
            var m = function() {
                var t = o.hoverState;
                o.$element.trigger("shown.bs." + o.type), o.hoverState = null, "out" == t && o.leave(o)
            };
            t.support.transition && this.$tip.hasClass("fade") ? r.one("bsTransitionEnd", m).emulateTransitionEnd(e.TRANSITION_DURATION) : m()
        }
    }, e.prototype.applyPlacement = function(e, n) {
        var i = this.tip(),
            o = i[0].offsetWidth,
            r = i[0].offsetHeight,
            s = parseInt(i.css("margin-top"), 10),
            a = parseInt(i.css("margin-left"), 10);
        isNaN(s) && (s = 0), isNaN(a) && (a = 0), e.top += s, e.left += a, t.offset.setOffset(i[0], t.extend({
            using: function(t) {
                i.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0), i.addClass("in");
        var l = i[0].offsetWidth,
            c = i[0].offsetHeight;
        "top" == n && c != r && (e.top = e.top + r - c);
        var d = this.getViewportAdjustedDelta(n, e, l, c);
        d.left ? e.left += d.left : e.top += d.top;
        var u = /top|bottom/.test(n),
            f = u ? 2 * d.left - o + l : 2 * d.top - r + c,
            p = u ? "offsetWidth" : "offsetHeight";
        i.offset(e), this.replaceArrow(f, i[0][p], u)
    }, e.prototype.replaceArrow = function(t, e, n) {
        this.arrow().css(n ? "left" : "top", 50 * (1 - t / e) + "%").css(n ? "top" : "left", "")
    }, e.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, e.prototype.hide = function(n) {
        function i() {
            "in" != o.hoverState && r.detach(), o.$element && o.$element.removeAttr("aria-describedby").trigger("hidden.bs." + o.type), n && n()
        }
        var o = this,
            r = t(this.$tip),
            s = t.Event("hide.bs." + this.type);
        if (this.$element.trigger(s), !s.isDefaultPrevented()) return r.removeClass("in"), t.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", i).emulateTransitionEnd(e.TRANSITION_DURATION) : i(), this.hoverState = null, this
    }, e.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, e.prototype.hasContent = function() {
        return this.getTitle()
    }, e.prototype.getPosition = function(e) {
        var n = (e = e || this.$element)[0],
            i = "BODY" == n.tagName,
            o = n.getBoundingClientRect();
        null == o.width && (o = t.extend({}, o, {
            width: o.right - o.left,
            height: o.bottom - o.top
        }));
        var r = window.SVGElement && n instanceof window.SVGElement,
            s = i ? {
                top: 0,
                left: 0
            } : r ? null : e.offset(),
            a = {
                scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
            },
            l = i ? {
                width: t(window).width(),
                height: t(window).height()
            } : null;
        return t.extend({}, o, a, l, s)
    }, e.prototype.getCalculatedOffset = function(t, e, n, i) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - n / 2
        } : "top" == t ? {
            top: e.top - i,
            left: e.left + e.width / 2 - n / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - i / 2,
            left: e.left - n
        } : {
            top: e.top + e.height / 2 - i / 2,
            left: e.left + e.width
        }
    }, e.prototype.getViewportAdjustedDelta = function(t, e, n, i) {
        var o = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return o;
        var r = this.options.viewport && this.options.viewport.padding || 0,
            s = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var a = e.top - r - s.scroll,
                l = e.top + r - s.scroll + i;
            a < s.top ? o.top = s.top - a : l > s.top + s.height && (o.top = s.top + s.height - l)
        } else {
            var c = e.left - r,
                d = e.left + r + n;
            c < s.left ? o.left = s.left - c : d > s.right && (o.left = s.left + s.width - d)
        }
        return o
    }, e.prototype.getTitle = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
    }, e.prototype.getUID = function(t) {
        do {
            t += ~~(1e6 * Math.random())
        } while (document.getElementById(t));
        return t
    }, e.prototype.tip = function() {
        if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, e.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, e.prototype.enable = function() {
        this.enabled = !0
    }, e.prototype.disable = function() {
        this.enabled = !1
    }, e.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, e.prototype.toggle = function(e) {
        var n = this;
        e && ((n = t(e.currentTarget).data("bs." + this.type)) || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n))), e ? (n.inState.click = !n.inState.click, n.isInStateTrue() ? n.enter(n) : n.leave(n)) : n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
    }, e.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null, t.$element = null
        })
    };
    var n = t.fn.tooltip;
    t.fn.tooltip = function(n) {
        return this.each(function() {
            var i = t(this),
                o = i.data("bs.tooltip"),
                r = "object" == typeof n && n;
            !o && /destroy|hide/.test(n) || (o || i.data("bs.tooltip", o = new e(this, r)), "string" == typeof n && o[n]())
        })
    }, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = n, this
    }
}(jQuery),
function(t) {
    "use strict";
    var e = function(t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    e.VERSION = "3.3.7", e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), e.prototype.constructor = e, e.prototype.getDefaults = function() {
        return e.DEFAULTS
    }, e.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle(),
            n = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof n ? "html" : "append" : "text"](n), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, e.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, e.prototype.getContent = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, e.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var n = t.fn.popover;
    t.fn.popover = function(n) {
        return this.each(function() {
            var i = t(this),
                o = i.data("bs.popover"),
                r = "object" == typeof n && n;
            !o && /destroy|hide/.test(n) || (o || i.data("bs.popover", o = new e(this, r)), "string" == typeof n && o[n]())
        })
    }, t.fn.popover.Constructor = e, t.fn.popover.noConflict = function() {
        return t.fn.popover = n, this
    }
}(jQuery),
function(t) {
    "use strict";

    function e(n, i) {
        this.$body = t(document.body), this.$scrollElement = t(t(n).is(document.body) ? window : n), this.options = t.extend({}, e.DEFAULTS, i), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
    }

    function n(n) {
        return this.each(function() {
            var i = t(this),
                o = i.data("bs.scrollspy"),
                r = "object" == typeof n && n;
            o || i.data("bs.scrollspy", o = new e(this, r)), "string" == typeof n && o[n]()
        })
    }
    e.VERSION = "3.3.7", e.DEFAULTS = {
        offset: 10
    }, e.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function() {
        var e = this,
            n = "offset",
            i = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (n = "position", i = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var e = t(this),
                o = e.data("target") || e.attr("href"),
                r = /^#./.test(o) && t(o);
            return r && r.length && r.is(":visible") && [
                [r[n]().top + i, o]
            ] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            e.offsets.push(this[0]), e.targets.push(this[1])
        })
    }, e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
            n = this.getScrollHeight(),
            i = this.options.offset + n - this.$scrollElement.height(),
            o = this.offsets,
            r = this.targets,
            s = this.activeTarget;
        if (this.scrollHeight != n && this.refresh(), e >= i) return s != (t = r[r.length - 1]) && this.activate(t);
        if (s && e < o[0]) return this.activeTarget = null, this.clear();
        for (t = o.length; t--;) s != r[t] && e >= o[t] && (void 0 === o[t + 1] || e < o[t + 1]) && this.activate(r[t])
    }, e.prototype.activate = function(e) {
        this.activeTarget = e, this.clear();
        var n = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            i = t(n).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function() {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var i = t.fn.scrollspy;
    t.fn.scrollspy = n, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = i, this
    }, t(window).on("load.bs.scrollspy.data-api", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            n.call(e, e.data())
        })
    })
}(jQuery),
function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                o = i.data("bs.tab");
            o || i.data("bs.tab", o = new n(this)), "string" == typeof e && o[e]()
        })
    }
    var n = function(e) {
        this.element = t(e)
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 150, n.prototype.show = function() {
        var e = this.element,
            n = e.closest("ul:not(.dropdown-menu)"),
            i = e.data("target");
        if (i || (i = e.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var o = n.find(".active:last a"),
                r = t.Event("hide.bs.tab", {
                    relatedTarget: e[0]
                }),
                s = t.Event("show.bs.tab", {
                    relatedTarget: o[0]
                });
            if (o.trigger(r), e.trigger(s), !s.isDefaultPrevented() && !r.isDefaultPrevented()) {
                var a = t(i);
                this.activate(e.closest("li"), n), this.activate(a, a.parent(), function() {
                    o.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: o[0]
                    })
                })
            }
        }
    }, n.prototype.activate = function(e, i, o) {
        function r() {
            s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), o && o()
        }
        var s = i.find("> .active"),
            a = o && t.support.transition && (s.length && s.hasClass("fade") || !!i.find("> .fade").length);
        s.length && a ? s.one("bsTransitionEnd", r).emulateTransitionEnd(n.TRANSITION_DURATION) : r(), s.removeClass("in")
    };
    var i = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = n, t.fn.tab.noConflict = function() {
        return t.fn.tab = i, this
    };
    var o = function(n) {
        n.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', o).on("click.bs.tab.data-api", '[data-toggle="pill"]', o)
}(jQuery),
function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                o = i.data("bs.affix"),
                r = "object" == typeof e && e;
            o || i.data("bs.affix", o = new n(this, r)), "string" == typeof e && o[e]()
        })
    }
    var n = function(e, i) {
        this.options = t.extend({}, n.DEFAULTS, i), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    n.VERSION = "3.3.7", n.RESET = "affix affix-top affix-bottom", n.DEFAULTS = {
        offset: 0,
        target: window
    }, n.prototype.getState = function(t, e, n, i) {
        var o = this.$target.scrollTop(),
            r = this.$element.offset(),
            s = this.$target.height();
        if (null != n && "top" == this.affixed) return o < n && "top";
        if ("bottom" == this.affixed) return null != n ? !(o + this.unpin <= r.top) && "bottom" : !(o + s <= t - i) && "bottom";
        var a = null == this.affixed,
            l = a ? o : r.top;
        return null != n && o <= n ? "top" : null != i && l + (a ? s : e) >= t - i && "bottom"
    }, n.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(n.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
            e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, n.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, n.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(),
                i = this.options.offset,
                o = i.top,
                r = i.bottom,
                s = Math.max(t(document).height(), t(document.body).height());
            "object" != typeof i && (r = o = i), "function" == typeof o && (o = i.top(this.$element)), "function" == typeof r && (r = i.bottom(this.$element));
            var a = this.getState(s, e, o, r);
            if (this.affixed != a) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (a ? "-" + a : ""),
                    c = t.Event(l + ".bs.affix");
                if (this.$element.trigger(c), c.isDefaultPrevented()) return;
                this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(n.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == a && this.$element.offset({
                top: s - e - r
            })
        }
    };
    var i = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = n, t.fn.affix.noConflict = function() {
        return t.fn.affix = i, this
    }, t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var n = t(this),
                i = n.data();
            i.offset = i.offset || {}, null != i.offsetBottom && (i.offset.bottom = i.offsetBottom), null != i.offsetTop && (i.offset.top = i.offsetTop), e.call(n, i)
        })
    })
}(jQuery),
function(t) {
    var e = {
        mode: "horizontal",
        slideSelector: "",
        infiniteLoop: !0,
        hideControlOnEnd: !1,
        speed: 500,
        easing: null,
        slideMargin: 0,
        startSlide: 0,
        randomStart: !1,
        captions: !1,
        ticker: !1,
        tickerHover: !1,
        adaptiveHeight: !1,
        adaptiveHeightSpeed: 500,
        video: !1,
        useCSS: !0,
        preloadImages: "visible",
        responsive: !0,
        slideZIndex: 50,
        wrapperClass: "bx-wrapper",
        touchEnabled: !0,
        swipeThreshold: 50,
        oneToOneTouch: !0,
        preventDefaultSwipeX: !0,
        preventDefaultSwipeY: !1,
        ariaLive: !0,
        ariaHidden: !0,
        keyboardEnabled: !1,
        pager: !0,
        pagerType: "full",
        pagerShortSeparator: " / ",
        pagerSelector: null,
        buildPager: null,
        pagerCustom: null,
        controls: !0,
        nextText: "Next",
        prevText: "Prev",
        nextSelector: null,
        prevSelector: null,
        autoControls: !1,
        startText: "Start",
        stopText: "Stop",
        autoControlsCombine: !1,
        autoControlsSelector: null,
        auto: !1,
        pause: 4e3,
        autoStart: !0,
        autoDirection: "next",
        stopAutoOnClick: !1,
        autoHover: !1,
        autoDelay: 0,
        autoSlideForOnePage: !1,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,
        shrinkItems: !1,
        onSliderLoad: function() {
            return !0
        },
        onSlideBefore: function() {
            return !0
        },
        onSlideAfter: function() {
            return !0
        },
        onSlideNext: function() {
            return !0
        },
        onSlidePrev: function() {
            return !0
        },
        onSliderResize: function() {
            return !0
        }
    };
    t.fn.bxSlider = function(n) {
        if (0 === this.length) return this;
        if (this.length > 1) return this.each(function() {
            t(this).bxSlider(n)
        }), this;
        var o = {},
            r = this,
            s = t(window).width(),
            a = t(window).height();
        if (!t(r).data("bxSlider")) {
            var l = function() {
                    t(r).data("bxSlider") || (o.settings = t.extend({}, e, n), o.settings.slideWidth = parseInt(o.settings.slideWidth), o.children = r.children(o.settings.slideSelector), o.children.length < o.settings.minSlides && (o.settings.minSlides = o.children.length), o.children.length < o.settings.maxSlides && (o.settings.maxSlides = o.children.length), o.settings.randomStart && (o.settings.startSlide = Math.floor(Math.random() * o.children.length)), o.active = {
                        index: o.settings.startSlide
                    }, o.carousel = o.settings.minSlides > 1 || o.settings.maxSlides > 1, o.carousel && (o.settings.preloadImages = "all"), o.minThreshold = o.settings.minSlides * o.settings.slideWidth + (o.settings.minSlides - 1) * o.settings.slideMargin, o.maxThreshold = o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin, o.working = !1, o.controls = {}, o.interval = null, o.animProp = "vertical" === o.settings.mode ? "top" : "left", o.usingCSS = o.settings.useCSS && "fade" !== o.settings.mode && function() {
                        for (var t = document.createElement("div"), e = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"], n = 0; n < e.length; n++)
                            if (void 0 !== t.style[e[n]]) return o.cssPrefix = e[n].replace("Perspective", "").toLowerCase(), o.animProp = "-" + o.cssPrefix + "-transform", !0;
                        return !1
                    }(), "vertical" === o.settings.mode && (o.settings.maxSlides = o.settings.minSlides), r.data("origStyle", r.attr("style")), r.children(o.settings.slideSelector).each(function() {
                        t(this).data("origStyle", t(this).attr("style"))
                    }), c())
                },
                c = function() {
                    var e = o.children.eq(o.settings.startSlide);
                    r.wrap('<div class="' + o.settings.wrapperClass + '"><div class="bx-viewport"></div></div>'), o.viewport = r.parent(), o.settings.ariaLive && !o.settings.ticker && o.viewport.attr("aria-live", "polite"), o.loader = t('<div class="bx-loading" />'), o.viewport.prepend(o.loader), r.css({
                        width: "horizontal" === o.settings.mode ? 1e3 * o.children.length + 215 + "%" : "auto",
                        position: "relative"
                    }), o.usingCSS && o.settings.easing ? r.css("-" + o.cssPrefix + "-transition-timing-function", o.settings.easing) : o.settings.easing || (o.settings.easing = "swing"), o.viewport.css({
                        width: "100%",
                        overflow: "hidden",
                        position: "relative"
                    }), o.viewport.parent().css({
                        maxWidth: p()
                    }), o.children.css({
                        float: "horizontal" === o.settings.mode ? "left" : "none",
                        listStyle: "none",
                        position: "relative"
                    }), o.children.css("width", h()), "horizontal" === o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginRight", o.settings.slideMargin), "vertical" === o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginBottom", o.settings.slideMargin), "fade" === o.settings.mode && (o.children.css({
                        position: "absolute",
                        zIndex: 0,
                        display: "none"
                    }), o.children.eq(o.settings.startSlide).css({
                        zIndex: o.settings.slideZIndex,
                        display: "block"
                    })), o.controls.el = t('<div class="bx-controls" />'), o.settings.captions && T(), o.active.last = o.settings.startSlide === m() - 1, o.settings.video && r.fitVids(), ("all" === o.settings.preloadImages || o.settings.ticker) && (e = o.children), o.settings.ticker ? o.settings.pager = !1 : (o.settings.controls && S(), o.settings.auto && o.settings.autoControls && C(), o.settings.pager && w(), (o.settings.controls || o.settings.autoControls || o.settings.pager) && o.viewport.after(o.controls.el)), d(e, u)
                },
                d = function(e, n) {
                    var i = e.find('img:not([src=""]), iframe').length,
                        o = 0;
                    return 0 === i ? void n() : void e.find('img:not([src=""]), iframe').each(function() {
                        t(this).one("load error", function() {
                            ++o === i && n()
                        }).each(function() {
                            this.complete && t(this).trigger("load")
                        })
                    })
                },
                u = function() {
                    if (o.settings.infiniteLoop && "fade" !== o.settings.mode && !o.settings.ticker) {
                        var e = "vertical" === o.settings.mode ? o.settings.minSlides : o.settings.maxSlides,
                            n = o.children.slice(0, e).clone(!0).addClass("bx-clone"),
                            i = o.children.slice(-e).clone(!0).addClass("bx-clone");
                        o.settings.ariaHidden && (n.attr("aria-hidden", !0), i.attr("aria-hidden", !0)), r.append(n).prepend(i)
                    }
                    o.loader.remove(), y(), "vertical" === o.settings.mode && (o.settings.adaptiveHeight = !0), o.viewport.height(f()), r.redrawSlider(), o.settings.onSliderLoad.call(r, o.active.index), o.initialized = !0, o.settings.responsive && t(window).bind("resize", z), o.settings.auto && o.settings.autoStart && (m() > 1 || o.settings.autoSlideForOnePage) && M(), o.settings.ticker && j(), o.settings.pager && A(o.settings.startSlide), o.settings.controls && N(), o.settings.touchEnabled && !o.settings.ticker && R(), o.settings.keyboardEnabled && !o.settings.ticker && t(document).keydown(P)
                },
                f = function() {
                    var e = 0,
                        n = t();
                    if ("vertical" === o.settings.mode || o.settings.adaptiveHeight)
                        if (o.carousel) {
                            var r = 1 === o.settings.moveSlides ? o.active.index : o.active.index * v();
                            for (n = o.children.eq(r), i = 1; i <= o.settings.maxSlides - 1; i++) n = r + i >= o.children.length ? n.add(o.children.eq(i - 1)) : n.add(o.children.eq(r + i))
                        } else n = o.children.eq(o.active.index);
                    else n = o.children;
                    return "vertical" === o.settings.mode ? (n.each(function(n) {
                        e += t(this).outerHeight()
                    }), o.settings.slideMargin > 0 && (e += o.settings.slideMargin * (o.settings.minSlides - 1))) : e = Math.max.apply(Math, n.map(function() {
                        return t(this).outerHeight(!1)
                    }).get()), "border-box" === o.viewport.css("box-sizing") ? e += parseFloat(o.viewport.css("padding-top")) + parseFloat(o.viewport.css("padding-bottom")) + parseFloat(o.viewport.css("border-top-width")) + parseFloat(o.viewport.css("border-bottom-width")) : "padding-box" === o.viewport.css("box-sizing") && (e += parseFloat(o.viewport.css("padding-top")) + parseFloat(o.viewport.css("padding-bottom"))), e
                },
                p = function() {
                    var t = "100%";
                    return o.settings.slideWidth > 0 && (t = "horizontal" === o.settings.mode ? o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin : o.settings.slideWidth), t
                },
                h = function() {
                    var t = o.settings.slideWidth,
                        e = o.viewport.width();
                    if (0 === o.settings.slideWidth || o.settings.slideWidth > e && !o.carousel || "vertical" === o.settings.mode) t = e;
                    else if (o.settings.maxSlides > 1 && "horizontal" === o.settings.mode) {
                        if (e > o.maxThreshold) return t;
                        e < o.minThreshold ? t = (e - o.settings.slideMargin * (o.settings.minSlides - 1)) / o.settings.minSlides : o.settings.shrinkItems && (t = Math.floor((e + o.settings.slideMargin) / Math.ceil((e + o.settings.slideMargin) / (t + o.settings.slideMargin)) - o.settings.slideMargin))
                    }
                    return t
                },
                g = function() {
                    var t = 1,
                        e = null;
                    return "horizontal" === o.settings.mode && o.settings.slideWidth > 0 ? o.viewport.width() < o.minThreshold ? t = o.settings.minSlides : o.viewport.width() > o.maxThreshold ? t = o.settings.maxSlides : (e = o.children.first().width() + o.settings.slideMargin, t = Math.floor((o.viewport.width() + o.settings.slideMargin) / e)) : "vertical" === o.settings.mode && (t = o.settings.minSlides), t
                },
                m = function() {
                    var t = 0,
                        e = 0,
                        n = 0;
                    if (o.settings.moveSlides > 0)
                        if (o.settings.infiniteLoop) t = Math.ceil(o.children.length / v());
                        else
                            for (; e < o.children.length;) ++t, e = n + g(), n += o.settings.moveSlides <= g() ? o.settings.moveSlides : g();
                    else t = Math.ceil(o.children.length / g());
                    return t
                },
                v = function() {
                    return o.settings.moveSlides > 0 && o.settings.moveSlides <= g() ? o.settings.moveSlides : g()
                },
                y = function() {
                    var t, e, n;
                    o.children.length > o.settings.maxSlides && o.active.last && !o.settings.infiniteLoop ? "horizontal" === o.settings.mode ? (e = o.children.last(), t = e.position(), x(-(t.left - (o.viewport.width() - e.outerWidth())), "reset", 0)) : "vertical" === o.settings.mode && (n = o.children.length - o.settings.minSlides, t = o.children.eq(n).position(), x(-t.top, "reset", 0)) : (t = o.children.eq(o.active.index * v()).position(), o.active.index === m() - 1 && (o.active.last = !0), void 0 !== t && ("horizontal" === o.settings.mode ? x(-t.left, "reset", 0) : "vertical" === o.settings.mode && x(-t.top, "reset", 0)))
                },
                x = function(e, n, i, s) {
                    var a, l;
                    o.usingCSS ? (l = "vertical" === o.settings.mode ? "translate3d(0, " + e + "px, 0)" : "translate3d(" + e + "px, 0, 0)", r.css("-" + o.cssPrefix + "-transition-duration", i / 1e3 + "s"), "slide" === n ? (r.css(o.animProp, l), 0 !== i ? r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e) {
                        t(e.target).is(r) && (r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), I())
                    }) : I()) : "reset" === n ? r.css(o.animProp, l) : "ticker" === n && (r.css("-" + o.cssPrefix + "-transition-timing-function", "linear"), r.css(o.animProp, l), 0 !== i ? r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e) {
                        t(e.target).is(r) && (r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), x(s.resetValue, "reset", 0), B())
                    }) : (x(s.resetValue, "reset", 0), B()))) : (a = {}, a[o.animProp] = e, "slide" === n ? r.animate(a, i, o.settings.easing, function() {
                        I()
                    }) : "reset" === n ? r.css(o.animProp, e) : "ticker" === n && r.animate(a, i, "linear", function() {
                        x(s.resetValue, "reset", 0), B()
                    }))
                },
                b = function() {
                    for (var e = "", n = "", i = m(), r = 0; r < i; r++) n = "", o.settings.buildPager && t.isFunction(o.settings.buildPager) || o.settings.pagerCustom ? (n = o.settings.buildPager(r), o.pagerEl.addClass("bx-custom-pager")) : (n = r + 1, o.pagerEl.addClass("bx-default-pager")), e += '<div class="bx-pager-item"><a href="" data-slide-index="' + r + '" class="bx-pager-link">' + n + "</a></div>";
                    o.pagerEl.html(e)
                },
                w = function() {
                    o.settings.pagerCustom ? o.pagerEl = t(o.settings.pagerCustom) : (o.pagerEl = t('<div class="bx-pager" />'), o.settings.pagerSelector ? t(o.settings.pagerSelector).html(o.pagerEl) : o.controls.el.addClass("bx-has-pager").append(o.pagerEl), b()), o.pagerEl.on("click touchend", "a", $)
                },
                S = function() {
                    o.controls.next = t('<a class="bx-next" href="">' + o.settings.nextText + "</a>"), o.controls.prev = t('<a class="bx-prev" href="">' + o.settings.prevText + "</a>"), o.controls.next.bind("click touchend", k), o.controls.prev.bind("click touchend", E), o.settings.nextSelector && t(o.settings.nextSelector).append(o.controls.next), o.settings.prevSelector && t(o.settings.prevSelector).append(o.controls.prev), o.settings.nextSelector || o.settings.prevSelector || (o.controls.directionEl = t('<div class="bx-controls-direction" />'), o.controls.directionEl.append(o.controls.prev).append(o.controls.next), o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))
                },
                C = function() {
                    o.controls.start = t('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + o.settings.startText + "</a></div>"), o.controls.stop = t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + o.settings.stopText + "</a></div>"), o.controls.autoEl = t('<div class="bx-controls-auto" />'), o.controls.autoEl.on("click", ".bx-start", _), o.controls.autoEl.on("click", ".bx-stop", D), o.settings.autoControlsCombine ? o.controls.autoEl.append(o.controls.start) : o.controls.autoEl.append(o.controls.start).append(o.controls.stop), o.settings.autoControlsSelector ? t(o.settings.autoControlsSelector).html(o.controls.autoEl) : o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl), O(o.settings.autoStart ? "stop" : "start")
                },
                T = function() {
                    o.children.each(function(e) {
                        var n = t(this).find("img:first").attr("title");
                        void 0 !== n && ("" + n).length && t(this).append('<div class="bx-caption"><span>' + n + "</span></div>")
                    })
                },
                k = function(t) {
                    t.preventDefault(), o.controls.el.hasClass("disabled") || (o.settings.auto && o.settings.stopAutoOnClick && r.stopAuto(), r.goToNextSlide())
                },
                E = function(t) {
                    t.preventDefault(), o.controls.el.hasClass("disabled") || (o.settings.auto && o.settings.stopAutoOnClick && r.stopAuto(), r.goToPrevSlide())
                },
                _ = function(t) {
                    r.startAuto(), t.preventDefault()
                },
                D = function(t) {
                    r.stopAuto(), t.preventDefault()
                },
                $ = function(e) {
                    var n, i;
                    e.preventDefault(), o.controls.el.hasClass("disabled") || (o.settings.auto && o.settings.stopAutoOnClick && r.stopAuto(), void 0 !== (n = t(e.currentTarget)).attr("data-slide-index") && (i = parseInt(n.attr("data-slide-index"))) !== o.active.index && r.goToSlide(i))
                },
                A = function(e) {
                    var n = o.children.length;
                    return "short" === o.settings.pagerType ? (o.settings.maxSlides > 1 && (n = Math.ceil(o.children.length / o.settings.maxSlides)), void o.pagerEl.html(e + 1 + o.settings.pagerShortSeparator + n)) : (o.pagerEl.find("a").removeClass("active"), void o.pagerEl.each(function(n, i) {
                        t(i).find("a").eq(e).addClass("active")
                    }))
                },
                I = function() {
                    if (o.settings.infiniteLoop) {
                        var t = "";
                        0 === o.active.index ? t = o.children.eq(0).position() : o.active.index === m() - 1 && o.carousel ? t = o.children.eq((m() - 1) * v()).position() : o.active.index === o.children.length - 1 && (t = o.children.eq(o.children.length - 1).position()), t && ("horizontal" === o.settings.mode ? x(-t.left, "reset", 0) : "vertical" === o.settings.mode && x(-t.top, "reset", 0))
                    }
                    o.working = !1, o.settings.onSlideAfter.call(r, o.children.eq(o.active.index), o.oldIndex, o.active.index)
                },
                O = function(t) {
                    o.settings.autoControlsCombine ? o.controls.autoEl.html(o.controls[t]) : (o.controls.autoEl.find("a").removeClass("active"), o.controls.autoEl.find("a:not(.bx-" + t + ")").addClass("active"))
                },
                N = function() {
                    1 === m() ? (o.controls.prev.addClass("disabled"), o.controls.next.addClass("disabled")) : !o.settings.infiniteLoop && o.settings.hideControlOnEnd && (0 === o.active.index ? (o.controls.prev.addClass("disabled"), o.controls.next.removeClass("disabled")) : o.active.index === m() - 1 ? (o.controls.next.addClass("disabled"), o.controls.prev.removeClass("disabled")) : (o.controls.prev.removeClass("disabled"), o.controls.next.removeClass("disabled")))
                },
                M = function() {
                    o.settings.autoDelay > 0 ? setTimeout(r.startAuto, o.settings.autoDelay) : (r.startAuto(), t(window).focus(function() {
                        r.startAuto()
                    }).blur(function() {
                        r.stopAuto()
                    })), o.settings.autoHover && r.hover(function() {
                        o.interval && (r.stopAuto(!0), o.autoPaused = !0)
                    }, function() {
                        o.autoPaused && (r.startAuto(!0), o.autoPaused = null)
                    })
                },
                j = function() {
                    var e, n, i, s, a, l, c, d, u = 0;
                    "next" === o.settings.autoDirection ? r.append(o.children.clone().addClass("bx-clone")) : (r.prepend(o.children.clone().addClass("bx-clone")), e = o.children.first().position(), u = "horizontal" === o.settings.mode ? -e.left : -e.top), x(u, "reset", 0), o.settings.pager = !1, o.settings.controls = !1, o.settings.autoControls = !1, o.settings.tickerHover && (o.usingCSS ? (s = "horizontal" === o.settings.mode ? 4 : 5, o.viewport.hover(function() {
                        n = r.css("-" + o.cssPrefix + "-transform"), i = parseFloat(n.split(",")[s]), x(i, "reset", 0)
                    }, function() {
                        d = 0, o.children.each(function(e) {
                            d += "horizontal" === o.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0)
                        }), a = o.settings.speed / d, l = "horizontal" === o.settings.mode ? "left" : "top", c = a * (d - Math.abs(parseInt(i))), B(c)
                    })) : o.viewport.hover(function() {
                        r.stop()
                    }, function() {
                        d = 0, o.children.each(function(e) {
                            d += "horizontal" === o.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0)
                        }), a = o.settings.speed / d, l = "horizontal" === o.settings.mode ? "left" : "top", c = a * (d - Math.abs(parseInt(r.css(l)))), B(c)
                    })), B()
                },
                B = function(t) {
                    var e, n, i = t || o.settings.speed,
                        s = {
                            left: 0,
                            top: 0
                        },
                        a = {
                            left: 0,
                            top: 0
                        };
                    "next" === o.settings.autoDirection ? s = r.find(".bx-clone").first().position() : a = o.children.first().position(), e = "horizontal" === o.settings.mode ? -s.left : -s.top, n = "horizontal" === o.settings.mode ? -a.left : -a.top, x(e, "ticker", i, {
                        resetValue: n
                    })
                },
                L = function(e) {
                    var n = t(window),
                        i = {
                            top: n.scrollTop(),
                            left: n.scrollLeft()
                        },
                        o = e.offset();
                    return i.right = i.left + n.width(), i.bottom = i.top + n.height(), o.right = o.left + e.outerWidth(), o.bottom = o.top + e.outerHeight(), !(i.right < o.left || i.left > o.right || i.bottom < o.top || i.top > o.bottom)
                },
                P = function(t) {
                    var e = document.activeElement.tagName.toLowerCase();
                    if (null == new RegExp(e, ["i"]).exec("input|textarea") && L(r)) {
                        if (39 === t.keyCode) return k(t), !1;
                        if (37 === t.keyCode) return E(t), !1
                    }
                },
                R = function() {
                    o.touch = {
                        start: {
                            x: 0,
                            y: 0
                        },
                        end: {
                            x: 0,
                            y: 0
                        }
                    }, o.viewport.bind("touchstart MSPointerDown pointerdown", q), o.viewport.on("click", ".bxslider a", function(t) {
                        o.viewport.hasClass("click-disabled") && (t.preventDefault(), o.viewport.removeClass("click-disabled"))
                    })
                },
                q = function(t) {
                    if (o.controls.el.addClass("disabled"), o.working) t.preventDefault(), o.controls.el.removeClass("disabled");
                    else {
                        o.touch.originalPos = r.position();
                        var e = t.originalEvent,
                            n = void 0 !== e.changedTouches ? e.changedTouches : [e];
                        o.touch.start.x = n[0].pageX, o.touch.start.y = n[0].pageY, o.viewport.get(0).setPointerCapture && (o.pointerId = e.pointerId, o.viewport.get(0).setPointerCapture(o.pointerId)), o.viewport.bind("touchmove MSPointerMove pointermove", W), o.viewport.bind("touchend MSPointerUp pointerup", F), o.viewport.bind("MSPointerCancel pointercancel", H)
                    }
                },
                H = function(t) {
                    x(o.touch.originalPos.left, "reset", 0), o.controls.el.removeClass("disabled"), o.viewport.unbind("MSPointerCancel pointercancel", H), o.viewport.unbind("touchmove MSPointerMove pointermove", W), o.viewport.unbind("touchend MSPointerUp pointerup", F), o.viewport.get(0).releasePointerCapture && o.viewport.get(0).releasePointerCapture(o.pointerId)
                },
                W = function(t) {
                    var e = t.originalEvent,
                        n = void 0 !== e.changedTouches ? e.changedTouches : [e],
                        i = Math.abs(n[0].pageX - o.touch.start.x),
                        r = Math.abs(n[0].pageY - o.touch.start.y),
                        s = 0,
                        a = 0;
                    3 * i > r && o.settings.preventDefaultSwipeX ? t.preventDefault() : 3 * r > i && o.settings.preventDefaultSwipeY && t.preventDefault(), "fade" !== o.settings.mode && o.settings.oneToOneTouch && ("horizontal" === o.settings.mode ? (a = n[0].pageX - o.touch.start.x, s = o.touch.originalPos.left + a) : (a = n[0].pageY - o.touch.start.y, s = o.touch.originalPos.top + a), x(s, "reset", 0))
                },
                F = function(t) {
                    o.viewport.unbind("touchmove MSPointerMove pointermove", W), o.controls.el.removeClass("disabled");
                    var e = t.originalEvent,
                        n = void 0 !== e.changedTouches ? e.changedTouches : [e],
                        i = 0,
                        s = 0;
                    o.touch.end.x = n[0].pageX, o.touch.end.y = n[0].pageY, "fade" === o.settings.mode ? (s = Math.abs(o.touch.start.x - o.touch.end.x)) >= o.settings.swipeThreshold && (o.touch.start.x > o.touch.end.x ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto()) : ("horizontal" === o.settings.mode ? (s = o.touch.end.x - o.touch.start.x, i = o.touch.originalPos.left) : (s = o.touch.end.y - o.touch.start.y, i = o.touch.originalPos.top), !o.settings.infiniteLoop && (0 === o.active.index && s > 0 || o.active.last && s < 0) ? x(i, "reset", 200) : Math.abs(s) >= o.settings.swipeThreshold ? (s < 0 ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto()) : x(i, "reset", 200)), o.viewport.unbind("touchend MSPointerUp pointerup", F), o.viewport.get(0).releasePointerCapture && o.viewport.get(0).releasePointerCapture(o.pointerId)
                },
                z = function(e) {
                    if (o.initialized)
                        if (o.working) window.setTimeout(z, 10);
                        else {
                            var n = t(window).width(),
                                i = t(window).height();
                            s === n && a === i || (s = n, a = i, r.redrawSlider(), o.settings.onSliderResize.call(r, o.active.index))
                        }
                },
                U = function(t) {
                    var e = g();
                    o.settings.ariaHidden && !o.settings.ticker && (o.children.attr("aria-hidden", "true"), o.children.slice(t, t + e).attr("aria-hidden", "false"))
                };
            return r.goToSlide = function(e, n) {
                var i, s, a, l, c = !0,
                    d = 0,
                    u = {
                        left: 0,
                        top: 0
                    },
                    p = null;
                if (o.oldIndex = o.active.index, o.active.index = function(t) {
                        return t < 0 ? o.settings.infiniteLoop ? m() - 1 : o.active.index : t >= m() ? o.settings.infiniteLoop ? 0 : o.active.index : t
                    }(e), !o.working && o.active.index !== o.oldIndex) {
                    if (o.working = !0, void 0 !== (c = o.settings.onSlideBefore.call(r, o.children.eq(o.active.index), o.oldIndex, o.active.index)) && !c) return o.active.index = o.oldIndex, void(o.working = !1);
                    "next" === n ? o.settings.onSlideNext.call(r, o.children.eq(o.active.index), o.oldIndex, o.active.index) || (c = !1) : "prev" === n && (o.settings.onSlidePrev.call(r, o.children.eq(o.active.index), o.oldIndex, o.active.index) || (c = !1)), o.active.last = o.active.index >= m() - 1, (o.settings.pager || o.settings.pagerCustom) && A(o.active.index), o.settings.controls && N(), "fade" === o.settings.mode ? (o.settings.adaptiveHeight && o.viewport.height() !== f() && o.viewport.animate({
                        height: f()
                    }, o.settings.adaptiveHeightSpeed), o.children.filter(":visible").fadeOut(o.settings.speed).css({
                        zIndex: 0
                    }), o.children.eq(o.active.index).css("zIndex", o.settings.slideZIndex + 1).fadeIn(o.settings.speed, function() {
                        t(this).css("zIndex", o.settings.slideZIndex), I()
                    })) : (o.settings.adaptiveHeight && o.viewport.height() !== f() && o.viewport.animate({
                        height: f()
                    }, o.settings.adaptiveHeightSpeed), !o.settings.infiniteLoop && o.carousel && o.active.last ? "horizontal" === o.settings.mode ? (p = o.children.eq(o.children.length - 1), u = p.position(), d = o.viewport.width() - p.outerWidth()) : (i = o.children.length - o.settings.minSlides, u = o.children.eq(i).position()) : o.carousel && o.active.last && "prev" === n ? (s = 1 === o.settings.moveSlides ? o.settings.maxSlides - v() : (m() - 1) * v() - (o.children.length - o.settings.maxSlides), p = r.children(".bx-clone").eq(s), u = p.position()) : "next" === n && 0 === o.active.index ? (u = r.find("> .bx-clone").eq(o.settings.maxSlides).position(), o.active.last = !1) : e >= 0 && (l = e * parseInt(v()), u = o.children.eq(l).position()), void 0 !== u ? (a = "horizontal" === o.settings.mode ? -(u.left - d) : -u.top, x(a, "slide", o.settings.speed)) : o.working = !1), o.settings.ariaHidden && U(o.active.index * v())
                }
            }, r.goToNextSlide = function() {
                if (o.settings.infiniteLoop || !o.active.last) {
                    var t = parseInt(o.active.index) + 1;
                    r.goToSlide(t, "next")
                }
            }, r.goToPrevSlide = function() {
                if (o.settings.infiniteLoop || 0 !== o.active.index) {
                    var t = parseInt(o.active.index) - 1;
                    r.goToSlide(t, "prev")
                }
            }, r.startAuto = function(t) {
                o.interval || (o.interval = setInterval(function() {
                    "next" === o.settings.autoDirection ? r.goToNextSlide() : r.goToPrevSlide()
                }, o.settings.pause), o.settings.autoControls && !0 !== t && O("stop"))
            }, r.stopAuto = function(t) {
                o.interval && (clearInterval(o.interval), o.interval = null, o.settings.autoControls && !0 !== t && O("start"))
            }, r.getCurrentSlide = function() {
                return o.active.index
            }, r.getCurrentSlideElement = function() {
                return o.children.eq(o.active.index)
            }, r.getSlideElement = function(t) {
                return o.children.eq(t)
            }, r.getSlideCount = function() {
                return o.children.length
            }, r.isWorking = function() {
                return o.working
            }, r.redrawSlider = function() {
                o.children.add(r.find(".bx-clone")).outerWidth(h()), o.viewport.css("height", f()), o.settings.ticker || y(), o.active.last && (o.active.index = m() - 1), o.active.index >= m() && (o.active.last = !0), o.settings.pager && !o.settings.pagerCustom && (b(), A(o.active.index)), o.settings.ariaHidden && U(o.active.index * v())
            }, r.destroySlider = function() {
                o.initialized && (o.initialized = !1, t(".bx-clone", this).remove(), o.children.each(function() {
                    void 0 !== t(this).data("origStyle") ? t(this).attr("style", t(this).data("origStyle")) : t(this).removeAttr("style")
                }), void 0 !== t(this).data("origStyle") ? this.attr("style", t(this).data("origStyle")) : t(this).removeAttr("style"), t(this).unwrap().unwrap(), o.controls.el && o.controls.el.remove(), o.controls.next && o.controls.next.remove(), o.controls.prev && o.controls.prev.remove(), o.pagerEl && o.settings.controls && !o.settings.pagerCustom && o.pagerEl.remove(), t(".bx-caption", this).remove(), o.controls.autoEl && o.controls.autoEl.remove(), clearInterval(o.interval), o.settings.responsive && t(window).unbind("resize", z), o.settings.keyboardEnabled && t(document).unbind("keydown", P), t(this).removeData("bxSlider"))
            }, r.reloadSlider = function(e) {
                void 0 !== e && (n = e), r.destroySlider(), l(), t(r).data("bxSlider", this)
            }, l(), t(r).data("bxSlider", this), this
        }
    }
}(jQuery),
function(t) {
    "use strict";

    function e(t, e, n) {
        return t === e ? t = e : t === n && (t = n), t
    }

    function n(t) {
        return void 0 !== t
    }

    function i(t, e, n) {
        var i = n / 100 * (e - t);
        return 1 === (i = Math.round(t + i).toString(16)).length && (i = "0" + i), i
    }

    function o(t, e, o) {
        if (!t || !e) return null;
        o = n(o) ? o : 0, t = u(t), e = u(e);
        var r = i(t.r, e.r, o),
            s = i(t.b, e.b, o);
        return "#" + r + i(t.g, e.g, o) + s
    }

    function r(i, s) {
        function l(t) {
            n(t) || (t = s.rating), X = t;
            var e = t / B,
                i = e * P;
            e > 1 && (i += (Math.ceil(e) - 1) * q), h(s.ratedFill), (i = s.rtl ? 100 - i : i) < 0 ? i = 0 : i > 100 && (i = 100), z.css("width", i + "%")
        }

        function d() {
            H = L * s.numStars + R * (s.numStars - 1), P = L / H * 100, q = R / H * 100, i.width(H), l()
        }

        function u(t) {
            var e = s.starWidth = t;
            return L = window.parseFloat(s.starWidth.replace("px", "")), F.find("svg").attr({
                width: s.starWidth,
                height: e
            }), z.find("svg").attr({
                width: s.starWidth,
                height: e
            }), d(), i
        }

        function f(t) {
            return s.spacing = t, R = parseFloat(s.spacing.replace("px", "")), F.find("svg:not(:first-child)").css({
                "margin-left": t
            }), z.find("svg:not(:first-child)").css({
                "margin-left": t
            }), d(), i
        }

        function p(t) {
            return s.normalFill = t, (s.rtl ? z : F).find("svg").attr({
                fill: s.normalFill
            }), i
        }

        function h(t) {
            if (s.multiColor) {
                var e = (X - U) / s.maxValue * 100,
                    n = s.multiColor || {};
                t = o(n.startColor || c.startColor, n.endColor || c.endColor, e)
            } else V = t;
            return s.ratedFill = t, (s.rtl ? F : z).find("svg").attr({
                fill: s.ratedFill
            }), i
        }

        function g(t) {
            t = !!t, s.rtl = t, p(s.normalFill), l()
        }

        function m(t) {
            s.multiColor = t, h(t || V)
        }

        function v(e) {
            s.numStars = e, B = s.maxValue / s.numStars, F.empty(), z.empty();
            for (var n = 0; n < s.numStars; n++) F.append(t(s.starSvg || a)), z.append(t(s.starSvg || a));
            return u(s.starWidth), p(s.normalFill), f(s.spacing), l(), i
        }

        function y(t) {
            return s.maxValue = t, B = s.maxValue / s.numStars, s.rating > t && T(t), l(), i
        }

        function x(t) {
            return s.precision = t, T(s.rating), i
        }

        function b(t) {
            return s.halfStar = t, i
        }

        function w(t) {
            return s.fullStar = t, i
        }

        function S(t) {
            var e = F.offset().left,
                n = e + F.width(),
                i = s.maxValue,
                o = t.pageX,
                r = 0;
            if (o < e) r = U;
            else if (o > n) r = i;
            else {
                var a = (o - e) / (n - e);
                if (R > 0)
                    for (var l = a *= 100; l > 0;) l > P ? (r += B, l -= P + q) : (r += l / P * B, l = 0);
                else r = a * s.maxValue;
                r = function(t) {
                    var e = t % B,
                        n = B / 2,
                        i = s.halfStar,
                        o = s.fullStar;
                    return o || i ? (o || i && e > n ? t += B - e : (t -= e, e > 0 && (t += n)), t) : t
                }(r)
            }
            return s.rtl && (r = i - r), parseFloat(r)
        }

        function C(t) {
            return s.readOnly = t, i.attr("readonly", !0), M(), t || (i.removeAttr("readonly"), i.on("mousemove", D).on("mouseenter", D).on("mouseleave", $).on("click", A).on("rateyo.init", I).on("rateyo.change", O).on("rateyo.set", N)), i
        }

        function T(t) {
            var n = t,
                o = s.maxValue;
            return "string" == typeof n && ("%" === n[n.length - 1] && (n = n.substr(0, n.length - 1), o = 100, y(o)), n = parseFloat(n)),
                function(t, e, n) {
                    if (!(t >= e && t <= n)) throw Error("Invalid Rating, expected value between " + e + " and " + n)
                }(n, U, o), n = parseFloat(n.toFixed(s.precision)), e(parseFloat(n), U, o), s.rating = n, l(), Y && i.trigger("rateyo.set", {
                    rating: n
                }), i
        }

        function k(t) {
            return s.onInit = t, i
        }

        function E(t) {
            return s.onSet = t, i
        }

        function _(t) {
            return s.onChange = t, i
        }

        function D(t) {
            var n = S(t).toFixed(s.precision),
                o = s.maxValue;
            l(n = e(parseFloat(n), U, o)), i.trigger("rateyo.change", {
                rating: n
            })
        }

        function $() {
            (function() {
                var t = !1;
                return function(e) {
                    (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0)
                }(navigator.userAgent || navigator.vendor || window.opera), t
            })() || (l(), i.trigger("rateyo.change", {
                rating: s.rating
            }))
        }

        function A(t) {
            var e = S(t).toFixed(s.precision);
            e = parseFloat(e), j.rating(e)
        }

        function I(t, e) {
            s.onInit && "function" == typeof s.onInit && s.onInit.apply(this, [e.rating, j])
        }

        function O(t, e) {
            s.onChange && "function" == typeof s.onChange && s.onChange.apply(this, [e.rating, j])
        }

        function N(t, e) {
            s.onSet && "function" == typeof s.onSet && s.onSet.apply(this, [e.rating, j])
        }

        function M() {
            i.off("mousemove", D).off("mouseenter", D).off("mouseleave", $).off("click", A).off("rateyo.init", I).off("rateyo.change", O).off("rateyo.set", N)
        }
        this.node = i.get(0);
        var j = this;
        i.empty().addClass("jq-ry-container");
        var B, L, P, R, q, H, W = t("<div/>").addClass("jq-ry-group-wrapper").appendTo(i),
            F = t("<div/>").addClass("jq-ry-normal-group").addClass("jq-ry-group").appendTo(W),
            z = t("<div/>").addClass("jq-ry-rated-group").addClass("jq-ry-group").appendTo(W),
            U = 0,
            X = s.rating,
            Y = !1,
            V = s.ratedFill;
        this.rating = function(t) {
            return n(t) ? (T(t), i) : s.rating
        }, this.destroy = function() {
            return s.readOnly || M(), r.prototype.collection = function(e, n) {
                return t.each(n, function(t) {
                    if (e === this.node) {
                        var i = n.slice(0, t),
                            o = n.slice(t + 1, n.length);
                        return n = i.concat(o), !1
                    }
                }), n
            }(i.get(0), this.collection), i.removeClass("jq-ry-container").children().remove(), i
        }, this.method = function(t) {
            if (!t) throw Error("Method name not specified!");
            if (!n(this[t])) throw Error("Method " + t + " doesn't exist!");
            var e = Array.prototype.slice.apply(arguments, []).slice(1);
            return this[t].apply(this, e)
        }, this.option = function(t, e) {
            if (!n(t)) return s;
            var i;
            switch (t) {
                case "starWidth":
                    i = u;
                    break;
                case "numStars":
                    i = v;
                    break;
                case "normalFill":
                    i = p;
                    break;
                case "ratedFill":
                    i = h;
                    break;
                case "multiColor":
                    i = m;
                    break;
                case "maxValue":
                    i = y;
                    break;
                case "precision":
                    i = x;
                    break;
                case "rating":
                    i = T;
                    break;
                case "halfStar":
                    i = b;
                    break;
                case "fullStar":
                    i = w;
                    break;
                case "readOnly":
                    i = C;
                    break;
                case "spacing":
                    i = f;
                    break;
                case "rtl":
                    i = g;
                    break;
                case "onInit":
                    i = k;
                    break;
                case "onSet":
                    i = E;
                    break;
                case "onChange":
                    i = _;
                    break;
                default:
                    throw Error("No such option as " + t)
            }
            return n(e) ? i(e) : s[t]
        }, v(s.numStars), C(s.readOnly), s.rtl && g(s.rtl), this.collection.push(this), this.rating(s.rating, !0), Y = !0, i.trigger("rateyo.init", {
            rating: s.rating
        })
    }

    function s(e, n) {
        var i;
        return t.each(n, function() {
            if (e === this.node) return i = this, !1
        }), i
    }
    var a = '<?xml version="1.0" encoding="utf-8"?><svg version="1.1"xmlns="http://www.w3.org/2000/svg"viewBox="0 12.705 512 486.59"x="0px" y="0px"xml:space="preserve"><polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "/></svg>',
        l = {
            starWidth: "32px",
            normalFill: "gray",
            ratedFill: "#f39c12",
            numStars: 5,
            maxValue: 5,
            precision: 1,
            rating: 0,
            fullStar: !1,
            halfStar: !1,
            readOnly: !1,
            spacing: "0px",
            rtl: !1,
            multiColor: null,
            onInit: null,
            onChange: null,
            onSet: null,
            starSvg: null
        },
        c = {
            startColor: "#c0392b",
            endColor: "#f1c40f"
        },
        d = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,
        u = function(t) {
            if (!d.test(t)) return null;
            var e = d.exec(t);
            return {
                r: parseInt(e[1], 16),
                g: parseInt(e[2], 16),
                b: parseInt(e[3], 16)
            }
        };
    r.prototype.collection = [], window.RateYo = r, t.fn.rateYo = function() {
        return function(e) {
            var n = r.prototype.collection,
                i = t(this);
            if (0 === i.length) return i;
            var o = Array.prototype.slice.apply(arguments, []);
            if (0 === o.length) e = o[0] = {};
            else {
                if (1 !== o.length || "object" != typeof o[0]) {
                    if (o.length >= 1 && "string" == typeof o[0]) {
                        var a = o[0],
                            c = o.slice(1),
                            d = [];
                        return t.each(i, function(t, e) {
                            var i = s(e, n);
                            if (!i) throw Error("Trying to set options before even initialization");
                            var o = i[a];
                            if (!o) throw Error("Method " + a + " does not exist!");
                            var r = o.apply(i, c);
                            d.push(r)
                        }), d = 1 === d.length ? d[0] : d
                    }
                    throw Error("Invalid Arguments")
                }
                e = o[0]
            }
            return e = t.extend({}, l, e), t.each(i, function() {
                var i = s(this, n);
                if (i) return i;
                var o = t(this),
                    a = {},
                    l = t.extend({}, e);
                return t.each(o.data(), function(t, e) {
                    if (0 === t.indexOf("rateyo")) {
                        var n = t.replace(/^rateyo/, "");
                        n = n[0].toLowerCase() + n.slice(1), a[n] = e, delete l[n]
                    }
                }), new r(t(this), t.extend({}, a, l))
            })
        }.apply(this, Array.prototype.slice.apply(arguments, []))
    }
}(window.jQuery),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t : t(jQuery)
}(function(t) {
    function e(e) {
        var s = e || window.event,
            a = l.call(arguments, 1),
            c = 0,
            u = 0,
            f = 0,
            p = 0,
            h = 0,
            g = 0;
        if (e = t.event.fix(s), e.type = "mousewheel", "detail" in s && (f = -1 * s.detail), "wheelDelta" in s && (f = s.wheelDelta), "wheelDeltaY" in s && (f = s.wheelDeltaY), "wheelDeltaX" in s && (u = -1 * s.wheelDeltaX), "axis" in s && s.axis === s.HORIZONTAL_AXIS && (u = -1 * f, f = 0), c = 0 === f ? u : f, "deltaY" in s && (f = -1 * s.deltaY, c = f), "deltaX" in s && (u = s.deltaX, 0 === f && (c = -1 * u)), 0 !== f || 0 !== u) {
            if (1 === s.deltaMode) {
                var m = t.data(this, "mousewheel-line-height");
                c *= m, f *= m, u *= m
            } else if (2 === s.deltaMode) {
                var v = t.data(this, "mousewheel-page-height");
                c *= v, f *= v, u *= v
            }
            if (p = Math.max(Math.abs(f), Math.abs(u)), (!r || r > p) && (r = p, i(s, p) && (r /= 40)), i(s, p) && (c /= 40, u /= 40, f /= 40), c = Math[c >= 1 ? "floor" : "ceil"](c / r), u = Math[u >= 1 ? "floor" : "ceil"](u / r), f = Math[f >= 1 ? "floor" : "ceil"](f / r), d.settings.normalizeOffset && this.getBoundingClientRect) {
                var y = this.getBoundingClientRect();
                h = e.clientX - y.left, g = e.clientY - y.top
            }
            return e.deltaX = u, e.deltaY = f, e.deltaFactor = r, e.offsetX = h, e.offsetY = g, e.deltaMode = 0, a.unshift(e, c, u, f), o && clearTimeout(o), o = setTimeout(n, 200), (t.event.dispatch || t.event.handle).apply(this, a)
        }
    }

    function n() {
        r = null
    }

    function i(t, e) {
        return d.settings.adjustOldDeltas && "mousewheel" === t.type && e % 120 == 0
    }
    var o, r, s = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        a = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        l = Array.prototype.slice;
    if (t.event.fixHooks)
        for (var c = s.length; c;) t.event.fixHooks[s[--c]] = t.event.mouseHooks;
    var d = t.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var n = a.length; n;) this.addEventListener(a[--n], e, !1);
            else this.onmousewheel = e;
            t.data(this, "mousewheel-line-height", d.getLineHeight(this)), t.data(this, "mousewheel-page-height", d.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var n = a.length; n;) this.removeEventListener(a[--n], e, !1);
            else this.onmousewheel = null;
            t.removeData(this, "mousewheel-line-height"), t.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(e) {
            var n = t(e),
                i = n["offsetParent" in t.fn ? "offsetParent" : "parent"]();
            return i.length || (i = t("body")), parseInt(i.css("fontSize"), 10) || parseInt(n.css("fontSize"), 10) || 16
        },
        getPageHeight: function(e) {
            return t(e).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    t.fn.extend({
        mousewheel: function(t) {
            return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
        },
        unmousewheel: function(t) {
            return this.unbind("mousewheel", t)
        }
    })
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t : t(jQuery)
}(function(t) {
    function e(e) {
        var s = e || window.event,
            a = l.call(arguments, 1),
            c = 0,
            u = 0,
            f = 0,
            p = 0,
            h = 0,
            g = 0;
        if (e = t.event.fix(s), e.type = "mousewheel", "detail" in s && (f = -1 * s.detail), "wheelDelta" in s && (f = s.wheelDelta), "wheelDeltaY" in s && (f = s.wheelDeltaY), "wheelDeltaX" in s && (u = -1 * s.wheelDeltaX), "axis" in s && s.axis === s.HORIZONTAL_AXIS && (u = -1 * f, f = 0), c = 0 === f ? u : f, "deltaY" in s && (f = -1 * s.deltaY, c = f), "deltaX" in s && (u = s.deltaX, 0 === f && (c = -1 * u)), 0 !== f || 0 !== u) {
            if (1 === s.deltaMode) {
                var m = t.data(this, "mousewheel-line-height");
                c *= m, f *= m, u *= m
            } else if (2 === s.deltaMode) {
                var v = t.data(this, "mousewheel-page-height");
                c *= v, f *= v, u *= v
            }
            if (p = Math.max(Math.abs(f), Math.abs(u)), (!r || r > p) && (r = p, i(s, p) && (r /= 40)), i(s, p) && (c /= 40, u /= 40, f /= 40), c = Math[c >= 1 ? "floor" : "ceil"](c / r), u = Math[u >= 1 ? "floor" : "ceil"](u / r), f = Math[f >= 1 ? "floor" : "ceil"](f / r), d.settings.normalizeOffset && this.getBoundingClientRect) {
                var y = this.getBoundingClientRect();
                h = e.clientX - y.left, g = e.clientY - y.top
            }
            return e.deltaX = u, e.deltaY = f, e.deltaFactor = r, e.offsetX = h, e.offsetY = g, e.deltaMode = 0, a.unshift(e, c, u, f), o && clearTimeout(o), o = setTimeout(n, 200), (t.event.dispatch || t.event.handle).apply(this, a)
        }
    }

    function n() {
        r = null
    }

    function i(t, e) {
        return d.settings.adjustOldDeltas && "mousewheel" === t.type && e % 120 == 0
    }
    var o, r, s = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        a = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        l = Array.prototype.slice;
    if (t.event.fixHooks)
        for (var c = s.length; c;) t.event.fixHooks[s[--c]] = t.event.mouseHooks;
    var d = t.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var n = a.length; n;) this.addEventListener(a[--n], e, !1);
            else this.onmousewheel = e;
            t.data(this, "mousewheel-line-height", d.getLineHeight(this)), t.data(this, "mousewheel-page-height", d.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var n = a.length; n;) this.removeEventListener(a[--n], e, !1);
            else this.onmousewheel = null;
            t.removeData(this, "mousewheel-line-height"), t.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(e) {
            var n = t(e),
                i = n["offsetParent" in t.fn ? "offsetParent" : "parent"]();
            return i.length || (i = t("body")), parseInt(i.css("fontSize"), 10) || parseInt(n.css("fontSize"), 10) || 16
        },
        getPageHeight: function(e) {
            return t(e).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    t.fn.extend({
        mousewheel: function(t) {
            return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
        },
        unmousewheel: function(t) {
            return this.unbind("mousewheel", t)
        }
    })
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t : t(jQuery, window, document)
}(function(t) {
    ! function(e) {
        var n = "function" == typeof define && define.amd,
            i = "undefined" != typeof module && module.exports,
            o = "https:" == document.location.protocol ? "https:" : "http:";
        n || (i ? require("jquery-mousewheel")(t) : t.event.special.mousewheel || t("head").append(decodeURI("%3Cscript src=" + o + "//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js%3E%3C/script%3E"))),
            function() {
                var e, n = "mCustomScrollbar",
                    i = "mCS",
                    o = ".mCustomScrollbar",
                    r = {
                        setTop: 0,
                        setLeft: 0,
                        axis: "y",
                        scrollbarPosition: "inside",
                        scrollInertia: 950,
                        autoDraggerLength: !0,
                        alwaysShowScrollbar: 0,
                        snapOffset: 0,
                        mouseWheel: {
                            enable: !0,
                            scrollAmount: "auto",
                            axis: "y",
                            deltaFactor: "auto",
                            disableOver: ["select", "option", "keygen", "datalist", "textarea"]
                        },
                        scrollButtons: {
                            scrollType: "stepless",
                            scrollAmount: "auto"
                        },
                        keyboard: {
                            enable: !0,
                            scrollType: "stepless",
                            scrollAmount: "auto"
                        },
                        contentTouchScroll: 25,
                        documentTouchScroll: !0,
                        advanced: {
                            autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                            updateOnContentResize: !0,
                            updateOnImageLoad: "auto",
                            autoUpdateTimeout: 60
                        },
                        theme: "light",
                        callbacks: {
                            onTotalScrollOffset: 0,
                            onTotalScrollBackOffset: 0,
                            alwaysTriggerOffsets: !0
                        }
                    },
                    s = 0,
                    a = {},
                    l = window.attachEvent && !window.addEventListener ? 1 : 0,
                    c = !1,
                    d = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
                    u = {
                        init: function(e) {
                            var e = t.extend(!0, {}, r, e),
                                n = f.call(this);
                            if (e.live) {
                                var l = e.liveSelector || this.selector || o,
                                    c = t(l);
                                if ("off" === e.live) return void h(l);
                                a[l] = setTimeout(function() {
                                    c.mCustomScrollbar(e), "once" === e.live && c.length && h(l)
                                }, 500)
                            } else h(l);
                            return e.setWidth = e.set_width ? e.set_width : e.setWidth, e.setHeight = e.set_height ? e.set_height : e.setHeight, e.axis = e.horizontalScroll ? "x" : g(e.axis), e.scrollInertia = e.scrollInertia > 0 && e.scrollInertia < 17 ? 17 : e.scrollInertia, "object" != typeof e.mouseWheel && 1 == e.mouseWheel && (e.mouseWheel = {
                                enable: !0,
                                scrollAmount: "auto",
                                axis: "y",
                                preventDefault: !1,
                                deltaFactor: "auto",
                                normalizeDelta: !1,
                                invert: !1
                            }), e.mouseWheel.scrollAmount = e.mouseWheelPixels ? e.mouseWheelPixels : e.mouseWheel.scrollAmount, e.mouseWheel.normalizeDelta = e.advanced.normalizeMouseWheelDelta ? e.advanced.normalizeMouseWheelDelta : e.mouseWheel.normalizeDelta, e.scrollButtons.scrollType = m(e.scrollButtons.scrollType), p(e), t(n).each(function() {
                                var n = t(this);
                                if (!n.data(i)) {
                                    n.data(i, {
                                        idx: ++s,
                                        opt: e,
                                        scrollRatio: {
                                            y: null,
                                            x: null
                                        },
                                        overflowed: null,
                                        contentReset: {
                                            y: null,
                                            x: null
                                        },
                                        bindEvents: !1,
                                        tweenRunning: !1,
                                        sequential: {},
                                        langDir: n.css("direction"),
                                        cbOffsets: null,
                                        trigger: null,
                                        poll: {
                                            size: {
                                                o: 0,
                                                n: 0
                                            },
                                            img: {
                                                o: 0,
                                                n: 0
                                            },
                                            change: {
                                                o: 0,
                                                n: 0
                                            }
                                        }
                                    });
                                    var o = n.data(i),
                                        r = o.opt,
                                        a = n.data("mcs-axis"),
                                        l = n.data("mcs-scrollbar-position"),
                                        c = n.data("mcs-theme");
                                    a && (r.axis = a), l && (r.scrollbarPosition = l), c && (r.theme = c, p(r)), v.call(this), o && r.callbacks.onCreate && "function" == typeof r.callbacks.onCreate && r.callbacks.onCreate.call(this), t("#mCSB_" + o.idx + "_container img:not(." + d[2] + ")").addClass(d[2]), u.update.call(null, n)
                                }
                            })
                        },
                        update: function(e, n) {
                            var o = e || f.call(this);
                            return t(o).each(function() {
                                var e = t(this);
                                if (e.data(i)) {
                                    var o = e.data(i),
                                        r = o.opt,
                                        s = t("#mCSB_" + o.idx + "_container"),
                                        a = t("#mCSB_" + o.idx),
                                        l = [t("#mCSB_" + o.idx + "_dragger_vertical"), t("#mCSB_" + o.idx + "_dragger_horizontal")];
                                    if (!s.length) return;
                                    o.tweenRunning && Y(e), n && o && r.callbacks.onBeforeUpdate && "function" == typeof r.callbacks.onBeforeUpdate && r.callbacks.onBeforeUpdate.call(this), e.hasClass(d[3]) && e.removeClass(d[3]), e.hasClass(d[4]) && e.removeClass(d[4]), a.css("max-height", "none"), a.height() !== e.height() && a.css("max-height", e.height()), x.call(this), "y" === r.axis || r.advanced.autoExpandHorizontalScroll || s.css("width", y(s)), o.overflowed = T.call(this), D.call(this), r.autoDraggerLength && w.call(this), S.call(this), E.call(this);
                                    var c = [Math.abs(s[0].offsetTop), Math.abs(s[0].offsetLeft)];
                                    "x" !== r.axis && (o.overflowed[0] ? l[0].height() > l[0].parent().height() ? k.call(this) : (V(e, c[0].toString(), {
                                        dir: "y",
                                        dur: 0,
                                        overwrite: "none"
                                    }), o.contentReset.y = null) : (k.call(this), "y" === r.axis ? _.call(this) : "yx" === r.axis && o.overflowed[1] && V(e, c[1].toString(), {
                                        dir: "x",
                                        dur: 0,
                                        overwrite: "none"
                                    }))), "y" !== r.axis && (o.overflowed[1] ? l[1].width() > l[1].parent().width() ? k.call(this) : (V(e, c[1].toString(), {
                                        dir: "x",
                                        dur: 0,
                                        overwrite: "none"
                                    }), o.contentReset.x = null) : (k.call(this), "x" === r.axis ? _.call(this) : "yx" === r.axis && o.overflowed[0] && V(e, c[0].toString(), {
                                        dir: "y",
                                        dur: 0,
                                        overwrite: "none"
                                    }))), n && o && (2 === n && r.callbacks.onImageLoad && "function" == typeof r.callbacks.onImageLoad ? r.callbacks.onImageLoad.call(this) : 3 === n && r.callbacks.onSelectorChange && "function" == typeof r.callbacks.onSelectorChange ? r.callbacks.onSelectorChange.call(this) : r.callbacks.onUpdate && "function" == typeof r.callbacks.onUpdate && r.callbacks.onUpdate.call(this)), X.call(this)
                                }
                            })
                        },
                        scrollTo: function(e, n) {
                            if (void 0 !== e && null != e) {
                                var o = f.call(this);
                                return t(o).each(function() {
                                    var o = t(this);
                                    if (o.data(i)) {
                                        var r = o.data(i),
                                            s = r.opt,
                                            a = {
                                                trigger: "external",
                                                scrollInertia: s.scrollInertia,
                                                scrollEasing: "mcsEaseInOut",
                                                moveDragger: !1,
                                                timeout: 60,
                                                callbacks: !0,
                                                onStart: !0,
                                                onUpdate: !0,
                                                onComplete: !0
                                            },
                                            l = t.extend(!0, {}, a, n),
                                            c = z.call(this, e),
                                            d = l.scrollInertia > 0 && l.scrollInertia < 17 ? 17 : l.scrollInertia;
                                        c[0] = U.call(this, c[0], "y"), c[1] = U.call(this, c[1], "x"), l.moveDragger && (c[0] *= r.scrollRatio.y, c[1] *= r.scrollRatio.x), l.dur = it() ? 0 : d, setTimeout(function() {
                                            null !== c[0] && void 0 !== c[0] && "x" !== s.axis && r.overflowed[0] && (l.dir = "y", l.overwrite = "all", V(o, c[0].toString(), l)), null !== c[1] && void 0 !== c[1] && "y" !== s.axis && r.overflowed[1] && (l.dir = "x", l.overwrite = "none", V(o, c[1].toString(), l))
                                        }, l.timeout)
                                    }
                                })
                            }
                        },
                        stop: function() {
                            var e = f.call(this);
                            return t(e).each(function() {
                                var e = t(this);
                                e.data(i) && Y(e)
                            })
                        },
                        disable: function(e) {
                            var n = f.call(this);
                            return t(n).each(function() {
                                var n = t(this);
                                n.data(i) && (n.data(i), X.call(this, "remove"), _.call(this), e && k.call(this), D.call(this, !0), n.addClass(d[3]))
                            })
                        },
                        destroy: function() {
                            var e = f.call(this);
                            return t(e).each(function() {
                                var o = t(this);
                                if (o.data(i)) {
                                    var r = o.data(i),
                                        s = r.opt,
                                        a = t("#mCSB_" + r.idx),
                                        l = t("#mCSB_" + r.idx + "_container"),
                                        c = t(".mCSB_" + r.idx + "_scrollbar");
                                    s.live && h(s.liveSelector || t(e).selector), X.call(this, "remove"), _.call(this), k.call(this), o.removeData(i), Z(this, "mcs"), c.remove(), l.find("img." + d[2]).removeClass(d[2]), a.replaceWith(l.contents()), o.removeClass(n + " _" + i + "_" + r.idx + " " + d[6] + " " + d[7] + " " + d[5] + " " + d[3]).addClass(d[4])
                                }
                            })
                        }
                    },
                    f = function() {
                        return "object" != typeof t(this) || t(this).length < 1 ? o : this
                    },
                    p = function(e) {
                        e.autoDraggerLength = !(t.inArray(e.theme, ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"]) > -1) && e.autoDraggerLength, e.autoExpandScrollbar = !(t.inArray(e.theme, ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"]) > -1) && e.autoExpandScrollbar, e.scrollButtons.enable = !(t.inArray(e.theme, ["minimal", "minimal-dark"]) > -1) && e.scrollButtons.enable, e.autoHideScrollbar = t.inArray(e.theme, ["minimal", "minimal-dark"]) > -1 || e.autoHideScrollbar, e.scrollbarPosition = t.inArray(e.theme, ["minimal", "minimal-dark"]) > -1 ? "outside" : e.scrollbarPosition
                    },
                    h = function(t) {
                        a[t] && (clearTimeout(a[t]), Z(a, t))
                    },
                    g = function(t) {
                        return "yx" === t || "xy" === t || "auto" === t ? "yx" : "x" === t || "horizontal" === t ? "x" : "y"
                    },
                    m = function(t) {
                        return "stepped" === t || "pixels" === t || "step" === t || "click" === t ? "stepped" : "stepless"
                    },
                    v = function() {
                        var e = t(this),
                            o = e.data(i),
                            r = o.opt,
                            s = r.autoExpandScrollbar ? " " + d[1] + "_expand" : "",
                            a = ["<div id='mCSB_" + o.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + o.idx + "_scrollbar mCS-" + r.theme + " mCSB_scrollTools_vertical" + s + "'><div class='" + d[12] + "'><div id='mCSB_" + o.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + o.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + o.idx + "_scrollbar mCS-" + r.theme + " mCSB_scrollTools_horizontal" + s + "'><div class='" + d[12] + "'><div id='mCSB_" + o.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
                            l = "yx" === r.axis ? "mCSB_vertical_horizontal" : "x" === r.axis ? "mCSB_horizontal" : "mCSB_vertical",
                            c = "yx" === r.axis ? a[0] + a[1] : "x" === r.axis ? a[1] : a[0],
                            u = "yx" === r.axis ? "<div id='mCSB_" + o.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
                            f = r.autoHideScrollbar ? " " + d[6] : "",
                            p = "x" !== r.axis && "rtl" === o.langDir ? " " + d[7] : "";
                        r.setWidth && e.css("width", r.setWidth), r.setHeight && e.css("height", r.setHeight), r.setLeft = "y" !== r.axis && "rtl" === o.langDir ? "989999px" : r.setLeft, e.addClass(n + " _" + i + "_" + o.idx + f + p).wrapInner("<div id='mCSB_" + o.idx + "' class='mCustomScrollBox mCS-" + r.theme + " " + l + "'><div id='mCSB_" + o.idx + "_container' class='mCSB_container' style='position:relative; top:" + r.setTop + "; left:" + r.setLeft + ";' dir='" + o.langDir + "' /></div>");
                        var h = t("#mCSB_" + o.idx),
                            g = t("#mCSB_" + o.idx + "_container");
                        "y" === r.axis || r.advanced.autoExpandHorizontalScroll || g.css("width", y(g)), "outside" === r.scrollbarPosition ? ("static" === e.css("position") && e.css("position", "relative"), e.css("overflow", "visible"), h.addClass("mCSB_outside").after(c)) : (h.addClass("mCSB_inside").append(c), g.wrap(u)), b.call(this);
                        var m = [t("#mCSB_" + o.idx + "_dragger_vertical"), t("#mCSB_" + o.idx + "_dragger_horizontal")];
                        m[0].css("min-height", m[0].height()), m[1].css("min-width", m[1].width())
                    },
                    y = function(e) {
                        var n = [e[0].scrollWidth, Math.max.apply(Math, e.children().map(function() {
                                return t(this).outerWidth(!0)
                            }).get())],
                            i = e.parent().width();
                        return n[0] > i ? n[0] : n[1] > i ? n[1] : "100%"
                    },
                    x = function() {
                        var e = t(this).data(i),
                            n = e.opt,
                            o = t("#mCSB_" + e.idx + "_container");
                        if (n.advanced.autoExpandHorizontalScroll && "y" !== n.axis) {
                            o.css({
                                width: "auto",
                                "min-width": 0,
                                "overflow-x": "scroll"
                            });
                            var r = Math.ceil(o[0].scrollWidth);
                            3 === n.advanced.autoExpandHorizontalScroll || 2 !== n.advanced.autoExpandHorizontalScroll && r > o.parent().width() ? o.css({
                                width: r,
                                "min-width": "100%",
                                "overflow-x": "inherit"
                            }) : o.css({
                                "overflow-x": "inherit",
                                position: "absolute"
                            }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                                width: Math.ceil(o[0].getBoundingClientRect().right + .4) - Math.floor(o[0].getBoundingClientRect().left),
                                "min-width": "100%",
                                position: "relative"
                            }).unwrap()
                        }
                    },
                    b = function() {
                        var e = t(this).data(i),
                            n = e.opt,
                            o = t(".mCSB_" + e.idx + "_scrollbar:first"),
                            r = et(n.scrollButtons.tabindex) ? "tabindex='" + n.scrollButtons.tabindex + "'" : "",
                            s = ["<a href='#' class='" + d[13] + "' " + r + " />", "<a href='#' class='" + d[14] + "' " + r + " />", "<a href='#' class='" + d[15] + "' " + r + " />", "<a href='#' class='" + d[16] + "' " + r + " />"],
                            a = ["x" === n.axis ? s[2] : s[0], "x" === n.axis ? s[3] : s[1], s[2], s[3]];
                        n.scrollButtons.enable && o.prepend(a[0]).append(a[1]).next(".mCSB_scrollTools").prepend(a[2]).append(a[3])
                    },
                    w = function() {
                        var e = t(this).data(i),
                            n = t("#mCSB_" + e.idx),
                            o = t("#mCSB_" + e.idx + "_container"),
                            r = [t("#mCSB_" + e.idx + "_dragger_vertical"), t("#mCSB_" + e.idx + "_dragger_horizontal")],
                            s = [n.height() / o.outerHeight(!1), n.width() / o.outerWidth(!1)],
                            a = [parseInt(r[0].css("min-height")), Math.round(s[0] * r[0].parent().height()), parseInt(r[1].css("min-width")), Math.round(s[1] * r[1].parent().width())],
                            c = l && a[1] < a[0] ? a[0] : a[1],
                            d = l && a[3] < a[2] ? a[2] : a[3];
                        r[0].css({
                            height: c,
                            "max-height": r[0].parent().height() - 10
                        }).find(".mCSB_dragger_bar").css({
                            "line-height": a[0] + "px"
                        }), r[1].css({
                            width: d,
                            "max-width": r[1].parent().width() - 10
                        })
                    },
                    S = function() {
                        var e = t(this).data(i),
                            n = t("#mCSB_" + e.idx),
                            o = t("#mCSB_" + e.idx + "_container"),
                            r = [t("#mCSB_" + e.idx + "_dragger_vertical"), t("#mCSB_" + e.idx + "_dragger_horizontal")],
                            s = [o.outerHeight(!1) - n.height(), o.outerWidth(!1) - n.width()],
                            a = [s[0] / (r[0].parent().height() - r[0].height()), s[1] / (r[1].parent().width() - r[1].width())];
                        e.scrollRatio = {
                            y: a[0],
                            x: a[1]
                        }
                    },
                    C = function(t, e, n) {
                        var i = n ? d[0] + "_expanded" : "",
                            o = t.closest(".mCSB_scrollTools");
                        "active" === e ? (t.toggleClass(d[0] + " " + i), o.toggleClass(d[1]), t[0]._draggable = t[0]._draggable ? 0 : 1) : t[0]._draggable || ("hide" === e ? (t.removeClass(d[0]), o.removeClass(d[1])) : (t.addClass(d[0]), o.addClass(d[1])))
                    },
                    T = function() {
                        var e = t(this).data(i),
                            n = t("#mCSB_" + e.idx),
                            o = t("#mCSB_" + e.idx + "_container"),
                            r = null == e.overflowed ? o.height() : o.outerHeight(!1),
                            s = null == e.overflowed ? o.width() : o.outerWidth(!1),
                            a = o[0].scrollHeight,
                            l = o[0].scrollWidth;
                        return a > r && (r = a), l > s && (s = l), [r > n.height(), s > n.width()]
                    },
                    k = function() {
                        var e = t(this),
                            n = e.data(i),
                            o = n.opt,
                            r = t("#mCSB_" + n.idx),
                            s = t("#mCSB_" + n.idx + "_container"),
                            a = [t("#mCSB_" + n.idx + "_dragger_vertical"), t("#mCSB_" + n.idx + "_dragger_horizontal")];
                        if (Y(e), ("x" !== o.axis && !n.overflowed[0] || "y" === o.axis && n.overflowed[0]) && (a[0].add(s).css("top", 0), V(e, "_resetY")), "y" !== o.axis && !n.overflowed[1] || "x" === o.axis && n.overflowed[1]) {
                            var l = dx = 0;
                            "rtl" === n.langDir && (l = r.width() - s.outerWidth(!1), dx = Math.abs(l / n.scrollRatio.x)), s.css("left", l), a[1].css("left", dx), V(e, "_resetX")
                        }
                    },
                    E = function() {
                        function e() {
                            s = setTimeout(function() {
                                t.event.special.mousewheel ? (clearTimeout(s), N.call(n[0])) : e()
                            }, 100)
                        }
                        var n = t(this),
                            o = n.data(i),
                            r = o.opt;
                        if (!o.bindEvents) {
                            if (A.call(this), r.contentTouchScroll && I.call(this), O.call(this), r.mouseWheel.enable) {
                                var s;
                                e()
                            }
                            P.call(this), q.call(this), r.advanced.autoScrollOnFocus && R.call(this), r.scrollButtons.enable && H.call(this), r.keyboard.enable && W.call(this), o.bindEvents = !0
                        }
                    },
                    _ = function() {
                        var e = t(this),
                            n = e.data(i),
                            o = n.opt,
                            r = i + "_" + n.idx,
                            s = ".mCSB_" + n.idx + "_scrollbar",
                            a = t("#mCSB_" + n.idx + ",#mCSB_" + n.idx + "_container,#mCSB_" + n.idx + "_container_wrapper," + s + " ." + d[12] + ",#mCSB_" + n.idx + "_dragger_vertical,#mCSB_" + n.idx + "_dragger_horizontal," + s + ">a"),
                            l = t("#mCSB_" + n.idx + "_container");
                        o.advanced.releaseDraggableSelectors && a.add(t(o.advanced.releaseDraggableSelectors)), o.advanced.extraDraggableSelectors && a.add(t(o.advanced.extraDraggableSelectors)), n.bindEvents && (t(document).add(t(!j() || top.document)).unbind("." + r), a.each(function() {
                            t(this).unbind("." + r)
                        }), clearTimeout(e[0]._focusTimeout), Z(e[0], "_focusTimeout"), clearTimeout(n.sequential.step), Z(n.sequential, "step"), clearTimeout(l[0].onCompleteTimeout), Z(l[0], "onCompleteTimeout"), n.bindEvents = !1)
                    },
                    D = function(e) {
                        var n = t(this),
                            o = n.data(i),
                            r = o.opt,
                            s = t("#mCSB_" + o.idx + "_container_wrapper"),
                            a = s.length ? s : t("#mCSB_" + o.idx + "_container"),
                            l = [t("#mCSB_" + o.idx + "_scrollbar_vertical"), t("#mCSB_" + o.idx + "_scrollbar_horizontal")],
                            c = [l[0].find(".mCSB_dragger"), l[1].find(".mCSB_dragger")];
                        "x" !== r.axis && (o.overflowed[0] && !e ? (l[0].add(c[0]).add(l[0].children("a")).css("display", "block"), a.removeClass(d[8] + " " + d[10])) : (r.alwaysShowScrollbar ? (2 !== r.alwaysShowScrollbar && c[0].css("display", "none"), a.removeClass(d[10])) : (l[0].css("display", "none"), a.addClass(d[10])), a.addClass(d[8]))), "y" !== r.axis && (o.overflowed[1] && !e ? (l[1].add(c[1]).add(l[1].children("a")).css("display", "block"), a.removeClass(d[9] + " " + d[11])) : (r.alwaysShowScrollbar ? (2 !== r.alwaysShowScrollbar && c[1].css("display", "none"), a.removeClass(d[11])) : (l[1].css("display", "none"), a.addClass(d[11])), a.addClass(d[9]))), o.overflowed[0] || o.overflowed[1] ? n.removeClass(d[5]) : n.addClass(d[5])
                    },
                    $ = function(e) {
                        var n = e.type,
                            i = e.target.ownerDocument !== document && null !== frameElement ? [t(frameElement).offset().top, t(frameElement).offset().left] : null,
                            o = j() && e.target.ownerDocument !== top.document && null !== frameElement ? [t(e.view.frameElement).offset().top, t(e.view.frameElement).offset().left] : [0, 0];
                        switch (n) {
                            case "pointerdown":
                            case "MSPointerDown":
                            case "pointermove":
                            case "MSPointerMove":
                            case "pointerup":
                            case "MSPointerUp":
                                return i ? [e.originalEvent.pageY - i[0] + o[0], e.originalEvent.pageX - i[1] + o[1], !1] : [e.originalEvent.pageY, e.originalEvent.pageX, !1];
                            case "touchstart":
                            case "touchmove":
                            case "touchend":
                                var r = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
                                    s = e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
                                return e.target.ownerDocument !== document ? [r.screenY, r.screenX, s > 1] : [r.pageY, r.pageX, s > 1];
                            default:
                                return i ? [e.pageY - i[0] + o[0], e.pageX - i[1] + o[1], !1] : [e.pageY, e.pageX, !1]
                        }
                    },
                    A = function() {
                        function e(t, e, i, o) {
                            if (p[0].idleTimer = d.scrollInertia < 233 ? 250 : 0, n.attr("id") === f[1]) var r = "x",
                                l = (n[0].offsetLeft - e + o) * a.scrollRatio.x;
                            else var r = "y",
                                l = (n[0].offsetTop - t + i) * a.scrollRatio.y;
                            V(s, l.toString(), {
                                dir: r,
                                drag: !0
                            })
                        }
                        var n, o, r, s = t(this),
                            a = s.data(i),
                            d = a.opt,
                            u = i + "_" + a.idx,
                            f = ["mCSB_" + a.idx + "_dragger_vertical", "mCSB_" + a.idx + "_dragger_horizontal"],
                            p = t("#mCSB_" + a.idx + "_container"),
                            h = t("#" + f[0] + ",#" + f[1]),
                            g = d.advanced.releaseDraggableSelectors ? h.add(t(d.advanced.releaseDraggableSelectors)) : h,
                            m = d.advanced.extraDraggableSelectors ? t(!j() || top.document).add(t(d.advanced.extraDraggableSelectors)) : t(!j() || top.document);
                        h.bind("contextmenu." + u, function(t) {
                            t.preventDefault()
                        }).bind("mousedown." + u + " touchstart." + u + " pointerdown." + u + " MSPointerDown." + u, function(e) {
                            if (e.stopImmediatePropagation(), e.preventDefault(), J(e)) {
                                c = !0, l && (document.onselectstart = function() {
                                    return !1
                                }), B.call(p, !1), Y(s);
                                var i = (n = t(this)).offset(),
                                    a = $(e)[0] - i.top,
                                    u = $(e)[1] - i.left,
                                    f = n.height() + i.top,
                                    h = n.width() + i.left;
                                f > a && a > 0 && h > u && u > 0 && (o = a, r = u), C(n, "active", d.autoExpandScrollbar)
                            }
                        }).bind("touchmove." + u, function(t) {
                            t.stopImmediatePropagation(), t.preventDefault();
                            var i = n.offset(),
                                s = $(t)[0] - i.top,
                                a = $(t)[1] - i.left;
                            e(o, r, s, a)
                        }), t(document).add(m).bind("mousemove." + u + " pointermove." + u + " MSPointerMove." + u, function(t) {
                            if (n) {
                                var i = n.offset(),
                                    s = $(t)[0] - i.top,
                                    a = $(t)[1] - i.left;
                                if (o === s && r === a) return;
                                e(o, r, s, a)
                            }
                        }).add(g).bind("mouseup." + u + " touchend." + u + " pointerup." + u + " MSPointerUp." + u, function() {
                            n && (C(n, "active", d.autoExpandScrollbar), n = null), c = !1, l && (document.onselectstart = null), B.call(p, !0)
                        })
                    },
                    I = function() {
                        function n(t) {
                            if (!tt(t) || c || $(t)[2]) e = 0;
                            else {
                                e = 1, S = 0, C = 0, d = 1, T.removeClass("mCS_touch_action");
                                var n = A.offset();
                                u = $(t)[0] - n.top, f = $(t)[1] - n.left, L = [$(t)[0], $(t)[1]]
                            }
                        }

                        function o(t) {
                            if (tt(t) && !c && !$(t)[2] && (E.documentTouchScroll || t.preventDefault(), t.stopImmediatePropagation(), (!C || S) && d)) {
                                m = G();
                                var e = D.offset(),
                                    n = $(t)[0] - e.top,
                                    i = $(t)[1] - e.left,
                                    o = "mcsLinearOut";
                                if (O.push(n), N.push(i), L[2] = Math.abs($(t)[0] - L[0]), L[3] = Math.abs($(t)[1] - L[1]), k.overflowed[0]) var r = I[0].parent().height() - I[0].height(),
                                    s = u - n > 0 && n - u > -r * k.scrollRatio.y && (2 * L[3] < L[2] || "yx" === E.axis);
                                if (k.overflowed[1]) var a = I[1].parent().width() - I[1].width(),
                                    p = f - i > 0 && i - f > -a * k.scrollRatio.x && (2 * L[2] < L[3] || "yx" === E.axis);
                                s || p ? (q || t.preventDefault(), S = 1) : (C = 1, T.addClass("mCS_touch_action")), q && t.preventDefault(), b = "yx" === E.axis ? [u - n, f - i] : "x" === E.axis ? [null, f - i] : [u - n, null], A[0].idleTimer = 250, k.overflowed[0] && l(b[0], M, o, "y", "all", !0), k.overflowed[1] && l(b[1], M, o, "x", B, !0)
                            }
                        }

                        function r(t) {
                            if (!tt(t) || c || $(t)[2]) e = 0;
                            else {
                                e = 1, t.stopImmediatePropagation(), Y(T), g = G();
                                var n = D.offset();
                                p = $(t)[0] - n.top, h = $(t)[1] - n.left, O = [], N = []
                            }
                        }

                        function s(t) {
                            if (tt(t) && !c && !$(t)[2]) {
                                d = 0, t.stopImmediatePropagation(), S = 0, C = 0, v = G();
                                var e = D.offset(),
                                    n = $(t)[0] - e.top,
                                    i = $(t)[1] - e.left;
                                if (!(v - m > 30)) {
                                    var o = "mcsEaseOut",
                                        r = 2.5 > (x = 1e3 / (v - g)),
                                        s = r ? [O[O.length - 2], N[N.length - 2]] : [0, 0];
                                    y = r ? [n - s[0], i - s[1]] : [n - p, i - h];
                                    var u = [Math.abs(y[0]), Math.abs(y[1])];
                                    x = r ? [Math.abs(y[0] / 4), Math.abs(y[1] / 4)] : [x, x];
                                    var f = [Math.abs(A[0].offsetTop) - y[0] * a(u[0] / x[0], x[0]), Math.abs(A[0].offsetLeft) - y[1] * a(u[1] / x[1], x[1])];
                                    b = "yx" === E.axis ? [f[0], f[1]] : "x" === E.axis ? [null, f[1]] : [f[0], null], w = [4 * u[0] + E.scrollInertia, 4 * u[1] + E.scrollInertia];
                                    var T = parseInt(E.contentTouchScroll) || 0;
                                    b[0] = u[0] > T ? b[0] : 0, b[1] = u[1] > T ? b[1] : 0, k.overflowed[0] && l(b[0], w[0], o, "y", B, !1), k.overflowed[1] && l(b[1], w[1], o, "x", B, !1)
                                }
                            }
                        }

                        function a(t, e) {
                            var n = [1.5 * e, 2 * e, e / 1.5, e / 2];
                            return t > 90 ? e > 4 ? n[0] : n[3] : t > 60 ? e > 3 ? n[3] : n[2] : t > 30 ? e > 8 ? n[1] : e > 6 ? n[0] : e > 4 ? e : n[2] : e > 8 ? e : n[3]
                        }

                        function l(t, e, n, i, o, r) {
                            t && V(T, t.toString(), {
                                dur: e,
                                scrollEasing: n,
                                dir: i,
                                overwrite: o,
                                drag: r
                            })
                        }
                        var d, u, f, p, h, g, m, v, y, x, b, w, S, C, T = t(this),
                            k = T.data(i),
                            E = k.opt,
                            _ = i + "_" + k.idx,
                            D = t("#mCSB_" + k.idx),
                            A = t("#mCSB_" + k.idx + "_container"),
                            I = [t("#mCSB_" + k.idx + "_dragger_vertical"), t("#mCSB_" + k.idx + "_dragger_horizontal")],
                            O = [],
                            N = [],
                            M = 0,
                            B = "yx" === E.axis ? "none" : "all",
                            L = [],
                            P = A.find("iframe"),
                            R = ["touchstart." + _ + " pointerdown." + _ + " MSPointerDown." + _, "touchmove." + _ + " pointermove." + _ + " MSPointerMove." + _, "touchend." + _ + " pointerup." + _ + " MSPointerUp." + _],
                            q = void 0 !== document.body.style.touchAction && "" !== document.body.style.touchAction;
                        A.bind(R[0], function(t) {
                            n(t)
                        }).bind(R[1], function(t) {
                            o(t)
                        }), D.bind(R[0], function(t) {
                            r(t)
                        }).bind(R[2], function(t) {
                            s(t)
                        }), P.length && P.each(function() {
                            t(this).bind("load", function() {
                                j(this) && t(this.contentDocument || this.contentWindow.document).bind(R[0], function(t) {
                                    n(t), r(t)
                                }).bind(R[1], function(t) {
                                    o(t)
                                }).bind(R[2], function(t) {
                                    s(t)
                                })
                            })
                        })
                    },
                    O = function() {
                        function n(t, e, n) {
                            l.type = n && o ? "stepped" : "stepless", l.scrollAmount = 10, F(r, t, e, "mcsLinearOut", n ? 60 : null)
                        }
                        var o, r = t(this),
                            s = r.data(i),
                            a = s.opt,
                            l = s.sequential,
                            d = i + "_" + s.idx,
                            u = t("#mCSB_" + s.idx + "_container"),
                            f = u.parent();
                        u.bind("mousedown." + d, function() {
                            e || o || (o = 1, c = !0)
                        }).add(document).bind("mousemove." + d, function(t) {
                            if (!e && o && (window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0)) {
                                var i = u.offset(),
                                    r = $(t)[0] - i.top + u[0].offsetTop,
                                    c = $(t)[1] - i.left + u[0].offsetLeft;
                                r > 0 && r < f.height() && c > 0 && c < f.width() ? l.step && n("off", null, "stepped") : ("x" !== a.axis && s.overflowed[0] && (0 > r ? n("on", 38) : r > f.height() && n("on", 40)), "y" !== a.axis && s.overflowed[1] && (0 > c ? n("on", 37) : c > f.width() && n("on", 39)))
                            }
                        }).bind("mouseup." + d + " dragend." + d, function() {
                            e || (o && (o = 0, n("off", null)), c = !1)
                        })
                    },
                    N = function() {
                        function e(e, i) {
                            if (Y(n), !L(n, e.target)) {
                                var s = "auto" !== r.mouseWheel.deltaFactor ? parseInt(r.mouseWheel.deltaFactor) : l && e.deltaFactor < 100 ? 100 : e.deltaFactor || 100,
                                    d = r.scrollInertia;
                                if ("x" === r.axis || "x" === r.mouseWheel.axis) var u = "x",
                                    f = [Math.round(s * o.scrollRatio.x), parseInt(r.mouseWheel.scrollAmount)],
                                    p = "auto" !== r.mouseWheel.scrollAmount ? f[1] : f[0] >= a.width() ? .9 * a.width() : f[0],
                                    h = Math.abs(t("#mCSB_" + o.idx + "_container")[0].offsetLeft),
                                    g = c[1][0].offsetLeft,
                                    m = c[1].parent().width() - c[1].width(),
                                    v = "y" === r.mouseWheel.axis ? e.deltaY || i : e.deltaX;
                                else var u = "y",
                                    f = [Math.round(s * o.scrollRatio.y), parseInt(r.mouseWheel.scrollAmount)],
                                    p = "auto" !== r.mouseWheel.scrollAmount ? f[1] : f[0] >= a.height() ? .9 * a.height() : f[0],
                                    h = Math.abs(t("#mCSB_" + o.idx + "_container")[0].offsetTop),
                                    g = c[0][0].offsetTop,
                                    m = c[0].parent().height() - c[0].height(),
                                    v = e.deltaY || i;
                                "y" === u && !o.overflowed[0] || "x" === u && !o.overflowed[1] || ((r.mouseWheel.invert || e.webkitDirectionInvertedFromDevice) && (v = -v), r.mouseWheel.normalizeDelta && (v = 0 > v ? -1 : 1), (v > 0 && 0 !== g || 0 > v && g !== m || r.mouseWheel.preventDefault) && (e.stopImmediatePropagation(), e.preventDefault()), e.deltaFactor < 5 && !r.mouseWheel.normalizeDelta && (p = e.deltaFactor, d = 17), V(n, (h - v * p).toString(), {
                                    dir: u,
                                    dur: d
                                }))
                            }
                        }
                        if (t(this).data(i)) {
                            var n = t(this),
                                o = n.data(i),
                                r = o.opt,
                                s = i + "_" + o.idx,
                                a = t("#mCSB_" + o.idx),
                                c = [t("#mCSB_" + o.idx + "_dragger_vertical"), t("#mCSB_" + o.idx + "_dragger_horizontal")],
                                d = t("#mCSB_" + o.idx + "_container").find("iframe");
                            d.length && d.each(function() {
                                t(this).bind("load", function() {
                                    j(this) && t(this.contentDocument || this.contentWindow.document).bind("mousewheel." + s, function(t, n) {
                                        e(t, n)
                                    })
                                })
                            }), a.bind("mousewheel." + s, function(t, n) {
                                e(t, n)
                            })
                        }
                    },
                    M = new Object,
                    j = function(e) {
                        var n = !1,
                            i = !1,
                            o = null;
                        if (void 0 === e ? i = "#empty" : void 0 !== t(e).attr("id") && (i = t(e).attr("id")), !1 !== i && void 0 !== M[i]) return M[i];
                        if (e) {
                            try {
                                r = e.contentDocument || e.contentWindow.document;
                                o = r.body.innerHTML
                            } catch (t) {}
                            n = null !== o
                        } else {
                            try {
                                var r = top.document;
                                o = r.body.innerHTML
                            } catch (t) {}
                            n = null !== o
                        }
                        return !1 !== i && (M[i] = n), n
                    },
                    B = function(t) {
                        var e = this.find("iframe");
                        if (e.length) {
                            var n = t ? "auto" : "none";
                            e.css("pointer-events", n)
                        }
                    },
                    L = function(e, n) {
                        var o = n.nodeName.toLowerCase(),
                            r = e.data(i).opt.mouseWheel.disableOver;
                        return t.inArray(o, r) > -1 && !(t.inArray(o, ["select", "textarea"]) > -1 && !t(n).is(":focus"))
                    },
                    P = function() {
                        var e, n = t(this),
                            o = n.data(i),
                            r = i + "_" + o.idx,
                            s = t("#mCSB_" + o.idx + "_container"),
                            a = s.parent();
                        t(".mCSB_" + o.idx + "_scrollbar ." + d[12]).bind("mousedown." + r + " touchstart." + r + " pointerdown." + r + " MSPointerDown." + r, function(n) {
                            c = !0, t(n.target).hasClass("mCSB_dragger") || (e = 1)
                        }).bind("touchend." + r + " pointerup." + r + " MSPointerUp." + r, function() {
                            c = !1
                        }).bind("click." + r, function(i) {
                            if (e && (e = 0, t(i.target).hasClass(d[12]) || t(i.target).hasClass("mCSB_draggerRail"))) {
                                Y(n);
                                var r = t(this),
                                    l = r.find(".mCSB_dragger");
                                if (r.parent(".mCSB_scrollTools_horizontal").length > 0) {
                                    if (!o.overflowed[1]) return;
                                    var c = "x",
                                        u = i.pageX > l.offset().left ? -1 : 1,
                                        f = Math.abs(s[0].offsetLeft) - u * (.9 * a.width())
                                } else {
                                    if (!o.overflowed[0]) return;
                                    var c = "y",
                                        u = i.pageY > l.offset().top ? -1 : 1,
                                        f = Math.abs(s[0].offsetTop) - u * (.9 * a.height())
                                }
                                V(n, f.toString(), {
                                    dir: c,
                                    scrollEasing: "mcsEaseInOut"
                                })
                            }
                        })
                    },
                    R = function() {
                        var e = t(this),
                            n = e.data(i),
                            o = n.opt,
                            r = i + "_" + n.idx,
                            s = t("#mCSB_" + n.idx + "_container"),
                            a = s.parent();
                        s.bind("focusin." + r, function() {
                            var n = t(document.activeElement),
                                i = s.find(".mCustomScrollBox").length;
                            n.is(o.advanced.autoScrollOnFocus) && (Y(e), clearTimeout(e[0]._focusTimeout), e[0]._focusTimer = i ? 17 * i : 0, e[0]._focusTimeout = setTimeout(function() {
                                var t = [nt(n)[0], nt(n)[1]],
                                    i = [s[0].offsetTop, s[0].offsetLeft],
                                    r = [i[0] + t[0] >= 0 && i[0] + t[0] < a.height() - n.outerHeight(!1), i[1] + t[1] >= 0 && i[0] + t[1] < a.width() - n.outerWidth(!1)],
                                    l = "yx" !== o.axis || r[0] || r[1] ? "all" : "none";
                                "x" === o.axis || r[0] || V(e, t[0].toString(), {
                                    dir: "y",
                                    scrollEasing: "mcsEaseInOut",
                                    overwrite: l,
                                    dur: 0
                                }), "y" === o.axis || r[1] || V(e, t[1].toString(), {
                                    dir: "x",
                                    scrollEasing: "mcsEaseInOut",
                                    overwrite: l,
                                    dur: 0
                                })
                            }, e[0]._focusTimer))
                        })
                    },
                    q = function() {
                        var e = t(this).data(i),
                            n = i + "_" + e.idx,
                            o = t("#mCSB_" + e.idx + "_container").parent();
                        o.bind("scroll." + n, function() {
                            0 === o.scrollTop() && 0 === o.scrollLeft() || t(".mCSB_" + e.idx + "_scrollbar").css("visibility", "hidden")
                        })
                    },
                    H = function() {
                        var e = t(this),
                            n = e.data(i),
                            o = n.opt,
                            r = n.sequential,
                            s = i + "_" + n.idx,
                            a = ".mCSB_" + n.idx + "_scrollbar";
                        t(a + ">a").bind("contextmenu." + s, function(t) {
                            t.preventDefault()
                        }).bind("mousedown." + s + " touchstart." + s + " pointerdown." + s + " MSPointerDown." + s + " mouseup." + s + " touchend." + s + " pointerup." + s + " MSPointerUp." + s + " mouseout." + s + " pointerout." + s + " MSPointerOut." + s + " click." + s, function(i) {
                            function s(t, n) {
                                r.scrollAmount = o.scrollButtons.scrollAmount, F(e, t, n)
                            }
                            if (i.preventDefault(), J(i)) {
                                var a = t(this).attr("class");
                                switch (r.type = o.scrollButtons.scrollType, i.type) {
                                    case "mousedown":
                                    case "touchstart":
                                    case "pointerdown":
                                    case "MSPointerDown":
                                        if ("stepped" === r.type) return;
                                        c = !0, n.tweenRunning = !1, s("on", a);
                                        break;
                                    case "mouseup":
                                    case "touchend":
                                    case "pointerup":
                                    case "MSPointerUp":
                                    case "mouseout":
                                    case "pointerout":
                                    case "MSPointerOut":
                                        if ("stepped" === r.type) return;
                                        c = !1, r.dir && s("off", a);
                                        break;
                                    case "click":
                                        if ("stepped" !== r.type || n.tweenRunning) return;
                                        s("on", a)
                                }
                            }
                        })
                    },
                    W = function() {
                        function e(e) {
                            function i(t, e) {
                                s.type = r.keyboard.scrollType, s.scrollAmount = r.keyboard.scrollAmount, "stepped" === s.type && o.tweenRunning || F(n, t, e)
                            }
                            switch (e.type) {
                                case "blur":
                                    o.tweenRunning && s.dir && i("off", null);
                                    break;
                                case "keydown":
                                case "keyup":
                                    var a = e.keyCode ? e.keyCode : e.which,
                                        l = "on";
                                    if ("x" !== r.axis && (38 === a || 40 === a) || "y" !== r.axis && (37 === a || 39 === a)) {
                                        if ((38 === a || 40 === a) && !o.overflowed[0] || (37 === a || 39 === a) && !o.overflowed[1]) return;
                                        "keyup" === e.type && (l = "off"), t(document.activeElement).is(u) || (e.preventDefault(), e.stopImmediatePropagation(), i(l, a))
                                    } else if (33 === a || 34 === a) {
                                        if ((o.overflowed[0] || o.overflowed[1]) && (e.preventDefault(), e.stopImmediatePropagation()), "keyup" === e.type) {
                                            Y(n);
                                            var f = 34 === a ? -1 : 1;
                                            if ("x" === r.axis || "yx" === r.axis && o.overflowed[1] && !o.overflowed[0]) var p = "x",
                                                h = Math.abs(c[0].offsetLeft) - f * (.9 * d.width());
                                            else var p = "y",
                                                h = Math.abs(c[0].offsetTop) - f * (.9 * d.height());
                                            V(n, h.toString(), {
                                                dir: p,
                                                scrollEasing: "mcsEaseInOut"
                                            })
                                        }
                                    } else if ((35 === a || 36 === a) && !t(document.activeElement).is(u) && ((o.overflowed[0] || o.overflowed[1]) && (e.preventDefault(), e.stopImmediatePropagation()), "keyup" === e.type)) {
                                        if ("x" === r.axis || "yx" === r.axis && o.overflowed[1] && !o.overflowed[0]) var p = "x",
                                            h = 35 === a ? Math.abs(d.width() - c.outerWidth(!1)) : 0;
                                        else var p = "y",
                                            h = 35 === a ? Math.abs(d.height() - c.outerHeight(!1)) : 0;
                                        V(n, h.toString(), {
                                            dir: p,
                                            scrollEasing: "mcsEaseInOut"
                                        })
                                    }
                            }
                        }
                        var n = t(this),
                            o = n.data(i),
                            r = o.opt,
                            s = o.sequential,
                            a = i + "_" + o.idx,
                            l = t("#mCSB_" + o.idx),
                            c = t("#mCSB_" + o.idx + "_container"),
                            d = c.parent(),
                            u = "input,textarea,select,datalist,keygen,[contenteditable='true']",
                            f = c.find("iframe"),
                            p = ["blur." + a + " keydown." + a + " keyup." + a];
                        f.length && f.each(function() {
                            t(this).bind("load", function() {
                                j(this) && t(this.contentDocument || this.contentWindow.document).bind(p[0], function(t) {
                                    e(t)
                                })
                            })
                        }), l.attr("tabindex", "0").bind(p[0], function(t) {
                            e(t)
                        })
                    },
                    F = function(e, n, o, r, s) {
                        function a(t) {
                            c.snapAmount && (u.scrollAmount = c.snapAmount instanceof Array ? "x" === u.dir[0] ? c.snapAmount[1] : c.snapAmount[0] : c.snapAmount);
                            var n = "stepped" !== u.type,
                                i = s || (t ? n ? h / 1.5 : g : 1e3 / 60),
                                o = t ? n ? 7.5 : 40 : 2.5,
                                d = [Math.abs(f[0].offsetTop), Math.abs(f[0].offsetLeft)],
                                p = [l.scrollRatio.y > 10 ? 10 : l.scrollRatio.y, l.scrollRatio.x > 10 ? 10 : l.scrollRatio.x],
                                m = "x" === u.dir[0] ? d[1] + u.dir[1] * (p[1] * o) : d[0] + u.dir[1] * (p[0] * o),
                                v = "x" === u.dir[0] ? d[1] + u.dir[1] * parseInt(u.scrollAmount) : d[0] + u.dir[1] * parseInt(u.scrollAmount),
                                y = "auto" !== u.scrollAmount ? v : m,
                                x = r || (t ? n ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear"),
                                b = !!t;
                            return t && 17 > i && (y = "x" === u.dir[0] ? d[1] : d[0]), V(e, y.toString(), {
                                dir: u.dir[0],
                                scrollEasing: x,
                                dur: i,
                                onComplete: b
                            }), t ? void(u.dir = !1) : (clearTimeout(u.step), void(u.step = setTimeout(function() {
                                a()
                            }, i)))
                        }
                        var l = e.data(i),
                            c = l.opt,
                            u = l.sequential,
                            f = t("#mCSB_" + l.idx + "_container"),
                            p = "stepped" === u.type,
                            h = c.scrollInertia < 26 ? 26 : c.scrollInertia,
                            g = c.scrollInertia < 1 ? 17 : c.scrollInertia;
                        switch (n) {
                            case "on":
                                if (u.dir = [o === d[16] || o === d[15] || 39 === o || 37 === o ? "x" : "y", o === d[13] || o === d[15] || 38 === o || 37 === o ? -1 : 1], Y(e), et(o) && "stepped" === u.type) return;
                                a(p);
                                break;
                            case "off":
                                clearTimeout(u.step), Z(u, "step"), Y(e), (p || l.tweenRunning && u.dir) && a(!0)
                        }
                    },
                    z = function(e) {
                        var n = t(this).data(i).opt,
                            o = [];
                        return "function" == typeof e && (e = e()), e instanceof Array ? o = e.length > 1 ? [e[0], e[1]] : "x" === n.axis ? [null, e[0]] : [e[0], null] : (o[0] = e.y ? e.y : e.x || "x" === n.axis ? null : e, o[1] = e.x ? e.x : e.y || "y" === n.axis ? null : e), "function" == typeof o[0] && (o[0] = o[0]()), "function" == typeof o[1] && (o[1] = o[1]()), o
                    },
                    U = function(e, n) {
                        if (null != e && void 0 !== e) {
                            var o = t(this),
                                r = o.data(i),
                                s = r.opt,
                                a = t("#mCSB_" + r.idx + "_container"),
                                l = a.parent(),
                                c = typeof e;
                            n || (n = "x" === s.axis ? "x" : "y");
                            var d = "x" === n ? a.outerWidth(!1) - l.width() : a.outerHeight(!1) - l.height(),
                                f = "x" === n ? a[0].offsetLeft : a[0].offsetTop,
                                p = "x" === n ? "left" : "top";
                            switch (c) {
                                case "function":
                                    return e();
                                case "object":
                                    if (!(g = e.jquery ? e : t(e)).length) return;
                                    return "x" === n ? nt(g)[1] : nt(g)[0];
                                case "string":
                                case "number":
                                    if (et(e)) return Math.abs(e);
                                    if (-1 !== e.indexOf("%")) return Math.abs(d * parseInt(e) / 100);
                                    if (-1 !== e.indexOf("-=")) return Math.abs(f - parseInt(e.split("-=")[1]));
                                    if (-1 !== e.indexOf("+=")) {
                                        var h = f + parseInt(e.split("+=")[1]);
                                        return h >= 0 ? 0 : Math.abs(h)
                                    }
                                    if (-1 !== e.indexOf("px") && et(e.split("px")[0])) return Math.abs(e.split("px")[0]);
                                    if ("top" === e || "left" === e) return 0;
                                    if ("bottom" === e) return Math.abs(l.height() - a.outerHeight(!1));
                                    if ("right" === e) return Math.abs(l.width() - a.outerWidth(!1));
                                    if ("first" === e || "last" === e) {
                                        var g = a.find(":" + e);
                                        return "x" === n ? nt(g)[1] : nt(g)[0]
                                    }
                                    return t(e).length ? "x" === n ? nt(t(e))[1] : nt(t(e))[0] : (a.css(p, e), void u.update.call(null, o[0]))
                            }
                        }
                    },
                    X = function(e) {
                        function n() {
                            return clearTimeout(l[0].autoUpdate), 0 === r.parents("html").length ? void(r = null) : void(l[0].autoUpdate = setTimeout(function() {
                                return a.advanced.updateOnSelectorChange && (s.poll.change.n = function() {
                                    !0 === a.advanced.updateOnSelectorChange && (a.advanced.updateOnSelectorChange = "*");
                                    var t = 0,
                                        e = l.find(a.advanced.updateOnSelectorChange);
                                    return a.advanced.updateOnSelectorChange && e.length > 0 && e.each(function() {
                                        t += this.offsetHeight + this.offsetWidth
                                    }), t
                                }(), s.poll.change.n !== s.poll.change.o) ? (s.poll.change.o = s.poll.change.n, void o(3)) : a.advanced.updateOnContentResize && (s.poll.size.n = r[0].scrollHeight + r[0].scrollWidth + l[0].offsetHeight + r[0].offsetHeight + r[0].offsetWidth, s.poll.size.n !== s.poll.size.o) ? (s.poll.size.o = s.poll.size.n, void o(1)) : !a.advanced.updateOnImageLoad || "auto" === a.advanced.updateOnImageLoad && "y" === a.axis || (s.poll.img.n = l.find("img").length, s.poll.img.n === s.poll.img.o) ? void((a.advanced.updateOnSelectorChange || a.advanced.updateOnContentResize || a.advanced.updateOnImageLoad) && n()) : (s.poll.img.o = s.poll.img.n, void l.find("img").each(function() {
                                    ! function(e) {
                                        if (t(e).hasClass(d[2])) return void o();
                                        var n = new Image;
                                        n.onload = function(t, e) {
                                            return function() {
                                                return e.apply(t, arguments)
                                            }
                                        }(n, function() {
                                            this.onload = null, t(e).addClass(d[2]), o(2)
                                        }), n.src = e.src
                                    }(this)
                                }))
                            }, a.advanced.autoUpdateTimeout))
                        }

                        function o(t) {
                            clearTimeout(l[0].autoUpdate), u.update.call(null, r[0], t)
                        }
                        var r = t(this),
                            s = r.data(i),
                            a = s.opt,
                            l = t("#mCSB_" + s.idx + "_container");
                        return e ? (clearTimeout(l[0].autoUpdate), void Z(l[0], "autoUpdate")) : void n()
                    },
                    Y = function(e) {
                        var n = e.data(i);
                        t("#mCSB_" + n.idx + "_container,#mCSB_" + n.idx + "_container_wrapper,#mCSB_" + n.idx + "_dragger_vertical,#mCSB_" + n.idx + "_dragger_horizontal").each(function() {
                            K.call(this)
                        })
                    },
                    V = function(e, n, o) {
                        function r(t) {
                            return a && l.callbacks[t] && "function" == typeof l.callbacks[t]
                        }

                        function s() {
                            var t = [f[0].offsetTop, f[0].offsetLeft],
                                n = [v[0].offsetTop, v[0].offsetLeft],
                                i = [f.outerHeight(!1), f.outerWidth(!1)],
                                r = [u.height(), u.width()];
                            e[0].mcs = {
                                content: f,
                                top: t[0],
                                left: t[1],
                                draggerTop: n[0],
                                draggerLeft: n[1],
                                topPct: Math.round(100 * Math.abs(t[0]) / (Math.abs(i[0]) - r[0])),
                                leftPct: Math.round(100 * Math.abs(t[1]) / (Math.abs(i[1]) - r[1])),
                                direction: o.dir
                            }
                        }
                        var a = e.data(i),
                            l = a.opt,
                            c = {
                                trigger: "internal",
                                dir: "y",
                                scrollEasing: "mcsEaseOut",
                                drag: !1,
                                dur: l.scrollInertia,
                                overwrite: "all",
                                callbacks: !0,
                                onStart: !0,
                                onUpdate: !0,
                                onComplete: !0
                            },
                            d = [(o = t.extend(c, o)).dur, o.drag ? 0 : o.dur],
                            u = t("#mCSB_" + a.idx),
                            f = t("#mCSB_" + a.idx + "_container"),
                            p = f.parent(),
                            h = l.callbacks.onTotalScrollOffset ? z.call(e, l.callbacks.onTotalScrollOffset) : [0, 0],
                            g = l.callbacks.onTotalScrollBackOffset ? z.call(e, l.callbacks.onTotalScrollBackOffset) : [0, 0];
                        if (a.trigger = o.trigger, 0 === p.scrollTop() && 0 === p.scrollLeft() || (t(".mCSB_" + a.idx + "_scrollbar").css("visibility", "visible"), p.scrollTop(0).scrollLeft(0)), "_resetY" !== n || a.contentReset.y || (r("onOverflowYNone") && l.callbacks.onOverflowYNone.call(e[0]), a.contentReset.y = 1), "_resetX" !== n || a.contentReset.x || (r("onOverflowXNone") && l.callbacks.onOverflowXNone.call(e[0]), a.contentReset.x = 1), "_resetY" !== n && "_resetX" !== n) {
                            if (!a.contentReset.y && e[0].mcs || !a.overflowed[0] || (r("onOverflowY") && l.callbacks.onOverflowY.call(e[0]), a.contentReset.x = null), !a.contentReset.x && e[0].mcs || !a.overflowed[1] || (r("onOverflowX") && l.callbacks.onOverflowX.call(e[0]), a.contentReset.x = null), l.snapAmount) {
                                var m = l.snapAmount instanceof Array ? "x" === o.dir ? l.snapAmount[1] : l.snapAmount[0] : l.snapAmount;
                                n = function(t, e, n) {
                                    return Math.round(t / e) * e - n
                                }(n, m, l.snapOffset)
                            }
                            switch (o.dir) {
                                case "x":
                                    var v = t("#mCSB_" + a.idx + "_dragger_horizontal"),
                                        y = "left",
                                        x = f[0].offsetLeft,
                                        b = [u.width() - f.outerWidth(!1), v.parent().width() - v.width()],
                                        w = [n, 0 === n ? 0 : n / a.scrollRatio.x],
                                        S = h[1],
                                        T = g[1],
                                        k = S > 0 ? S / a.scrollRatio.x : 0,
                                        E = T > 0 ? T / a.scrollRatio.x : 0;
                                    break;
                                case "y":
                                    var v = t("#mCSB_" + a.idx + "_dragger_vertical"),
                                        y = "top",
                                        x = f[0].offsetTop,
                                        b = [u.height() - f.outerHeight(!1), v.parent().height() - v.height()],
                                        w = [n, 0 === n ? 0 : n / a.scrollRatio.y],
                                        S = h[0],
                                        T = g[0],
                                        k = S > 0 ? S / a.scrollRatio.y : 0,
                                        E = T > 0 ? T / a.scrollRatio.y : 0
                            }
                            w[1] < 0 || 0 === w[0] && 0 === w[1] ? w = [0, 0] : w[1] >= b[1] ? w = [b[0], b[1]] : w[0] = -w[0], e[0].mcs || (s(), r("onInit") && l.callbacks.onInit.call(e[0])), clearTimeout(f[0].onCompleteTimeout), Q(v[0], y, Math.round(w[1]), d[1], o.scrollEasing), !a.tweenRunning && (0 === x && w[0] >= 0 || x === b[0] && w[0] <= b[0]) || Q(f[0], y, Math.round(w[0]), d[0], o.scrollEasing, o.overwrite, {
                                onStart: function() {
                                    o.callbacks && o.onStart && !a.tweenRunning && (r("onScrollStart") && (s(), l.callbacks.onScrollStart.call(e[0])), a.tweenRunning = !0, C(v), a.cbOffsets = [l.callbacks.alwaysTriggerOffsets || x >= b[0] + S, l.callbacks.alwaysTriggerOffsets || -T >= x])
                                },
                                onUpdate: function() {
                                    o.callbacks && o.onUpdate && r("whileScrolling") && (s(), l.callbacks.whileScrolling.call(e[0]))
                                },
                                onComplete: function() {
                                    if (o.callbacks && o.onComplete) {
                                        "yx" === l.axis && clearTimeout(f[0].onCompleteTimeout);
                                        var t = f[0].idleTimer || 0;
                                        f[0].onCompleteTimeout = setTimeout(function() {
                                            r("onScroll") && (s(), l.callbacks.onScroll.call(e[0])), r("onTotalScroll") && w[1] >= b[1] - k && a.cbOffsets[0] && (s(), l.callbacks.onTotalScroll.call(e[0])), r("onTotalScrollBack") && w[1] <= E && a.cbOffsets[1] && (s(), l.callbacks.onTotalScrollBack.call(e[0])), a.tweenRunning = !1, f[0].idleTimer = 0, C(v, "hide")
                                        }, t)
                                    }
                                }
                            })
                        }
                    },
                    Q = function(t, e, n, i, o, r, s) {
                        function a() {
                            y.stop || (g || u.call(), g = G() - h, l(), g >= y.time && (y.time = g > y.time ? g + c - (g - y.time) : g + c - 1, y.time < g + 1 && (y.time = g + 1)), y.time < i ? y.id = d(a) : p.call())
                        }

                        function l() {
                            i > 0 ? (y.currVal = function(t, e, n, i, o) {
                                switch (o) {
                                    case "linear":
                                    case "mcsLinear":
                                        return n * t / i + e;
                                    case "mcsLinearOut":
                                        return t /= i, t--, n * Math.sqrt(1 - t * t) + e;
                                    case "easeInOutSmooth":
                                        return 1 > (t /= i / 2) ? n / 2 * t * t + e : (t--, -n / 2 * (t * (t - 2) - 1) + e);
                                    case "easeInOutStrong":
                                        return 1 > (t /= i / 2) ? n / 2 * Math.pow(2, 10 * (t - 1)) + e : (t--, n / 2 * (2 - Math.pow(2, -10 * t)) + e);
                                    case "easeInOut":
                                    case "mcsEaseInOut":
                                        return 1 > (t /= i / 2) ? n / 2 * t * t * t + e : (t -= 2, n / 2 * (t * t * t + 2) + e);
                                    case "easeOutSmooth":
                                        return t /= i, t--, -n * (t * t * t * t - 1) + e;
                                    case "easeOutStrong":
                                        return n * (1 - Math.pow(2, -10 * t / i)) + e;
                                    case "easeOut":
                                    case "mcsEaseOut":
                                    default:
                                        var r = (t /= i) * t,
                                            s = r * t;
                                        return e + n * (.499999999999997 * s * r + -2.5 * r * r + 5.5 * s + -6.5 * r + 4 * t)
                                }
                            }(y.time, m, x, i, o), v[e] = Math.round(y.currVal) + "px") : v[e] = n + "px", f.call()
                        }
                        t._mTween || (t._mTween = {
                            top: {},
                            left: {}
                        });
                        var c, d, u = (s = s || {}).onStart || function() {},
                            f = s.onUpdate || function() {},
                            p = s.onComplete || function() {},
                            h = G(),
                            g = 0,
                            m = t.offsetTop,
                            v = t.style,
                            y = t._mTween[e];
                        "left" === e && (m = t.offsetLeft);
                        var x = n - m;
                        y.stop = 0, "none" !== r && null != y.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(y.id) : clearTimeout(y.id), y.id = null), c = 1e3 / 60, y.time = g + c, d = window.requestAnimationFrame ? window.requestAnimationFrame : function(t) {
                            return l(), setTimeout(t, .01)
                        }, y.id = d(a)
                    },
                    G = function() {
                        return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
                    },
                    K = function() {
                        var t = this;
                        t._mTween || (t._mTween = {
                            top: {},
                            left: {}
                        });
                        for (var e = ["top", "left"], n = 0; n < e.length; n++) {
                            var i = e[n];
                            t._mTween[i].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(t._mTween[i].id) : clearTimeout(t._mTween[i].id), t._mTween[i].id = null, t._mTween[i].stop = 1)
                        }
                    },
                    Z = function(t, e) {
                        try {
                            delete t[e]
                        } catch (n) {
                            t[e] = null
                        }
                    },
                    J = function(t) {
                        return !(t.which && 1 !== t.which)
                    },
                    tt = function(t) {
                        var e = t.originalEvent.pointerType;
                        return !(e && "touch" !== e && 2 !== e)
                    },
                    et = function(t) {
                        return !isNaN(parseFloat(t)) && isFinite(t)
                    },
                    nt = function(t) {
                        var e = t.parents(".mCSB_container");
                        return [t.offset().top - e.offset().top, t.offset().left - e.offset().left]
                    },
                    it = function() {
                        var t = function() {
                            var t = ["webkit", "moz", "ms", "o"];
                            if ("hidden" in document) return "hidden";
                            for (var e = 0; e < t.length; e++)
                                if (t[e] + "Hidden" in document) return t[e] + "Hidden";
                            return null
                        }();
                        return !!t && document[t]
                    };
                t.fn[n] = function(e) {
                    return u[e] ? u[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void t.error("Method " + e + " does not exist") : u.init.apply(this, arguments)
                }, t[n] = function(e) {
                    return u[e] ? u[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void t.error("Method " + e + " does not exist") : u.init.apply(this, arguments)
                }, t[n].defaults = r, window[n] = !0, t(window).bind("load", function() {
                    t(o)[n](), t.extend(t.expr[":"], {
                        mcsInView: t.expr[":"].mcsInView || function(e) {
                            var n, i, o = t(e),
                                r = o.parents(".mCSB_container");
                            if (r.length) return n = r.parent(), (i = [r[0].offsetTop, r[0].offsetLeft])[0] + nt(o)[0] >= 0 && i[0] + nt(o)[0] < n.height() - o.outerHeight(!1) && i[1] + nt(o)[1] >= 0 && i[1] + nt(o)[1] < n.width() - o.outerWidth(!1)
                        },
                        mcsInSight: t.expr[":"].mcsInSight || function(e, n, i) {
                            var o, r, s, a, l = t(e),
                                c = l.parents(".mCSB_container"),
                                d = "exact" === i[3] ? [
                                    [1, 0],
                                    [1, 0]
                                ] : [
                                    [.9, .1],
                                    [.6, .4]
                                ];
                            if (c.length) return o = [l.outerHeight(!1), l.outerWidth(!1)], s = [c[0].offsetTop + nt(l)[0], c[0].offsetLeft + nt(l)[1]], r = [c.parent()[0].offsetHeight, c.parent()[0].offsetWidth], a = [o[0] < r[0] ? d[0] : d[1], o[1] < r[1] ? d[0] : d[1]], s[0] - r[0] * a[0][0] < 0 && s[0] + o[0] - r[0] * a[0][1] >= 0 && s[1] - r[1] * a[1][0] < 0 && s[1] + o[1] - r[1] * a[1][1] >= 0
                        },
                        mcsOverflow: t.expr[":"].mcsOverflow || function(e) {
                            var n = t(e).data(i);
                            if (n) return n.overflowed[0] || n.overflowed[1]
                        }
                    })
                })
            }()
    }()
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
}(function(t) {
    var e, n = navigator.userAgent,
        i = /iphone/i.test(n),
        o = /chrome/i.test(n),
        r = /android/i.test(n);
    t.mask = {
        definitions: {
            9: "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    }, t.fn.extend({
        caret: function(t, e) {
            var n;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof t ? (e = "number" == typeof e ? e : t, this.each(function() {
                this.setSelectionRange ? this.setSelectionRange(t, e) : this.createTextRange && ((n = this.createTextRange()).collapse(!0), n.moveEnd("character", e), n.moveStart("character", t), n.select())
            })) : (this[0].setSelectionRange ? (t = this[0].selectionStart, e = this[0].selectionEnd) : document.selection && document.selection.createRange && (n = document.selection.createRange(), t = 0 - n.duplicate().moveStart("character", -1e5), e = t + n.text.length), {
                begin: t,
                end: e
            })
        },
        unmask: function() {
            return this.trigger("unmask")
        },
        mask: function(n, s) {
            var a, l, c, d, u, f, p, h;
            if (!n && this.length > 0) {
                var g = (a = t(this[0])).data(t.mask.dataName);
                return g ? g() : void 0
            }
            return s = t.extend({
                autoclear: t.mask.autoclear,
                placeholder: t.mask.placeholder,
                completed: null
            }, s), l = t.mask.definitions, c = [], d = p = n.length, u = null, t.each(n.split(""), function(t, e) {
                "?" == e ? (p--, d = t) : l[e] ? (c.push(new RegExp(l[e])), null === u && (u = c.length - 1), d > t && (f = c.length - 1)) : c.push(null)
            }), this.trigger("unmask").each(function() {
                function a() {
                    if (s.completed) {
                        for (var t = u; f >= t; t++)
                            if (c[t] && C[t] === g(t)) return;
                        s.completed.call(S)
                    }
                }

                function g(t) {
                    return s.placeholder.charAt(t < s.placeholder.length ? t : 0)
                }

                function m(t) {
                    for (; ++t < p && !c[t];);
                    return t
                }

                function v(t, e) {
                    var n, i;
                    if (!(0 > t)) {
                        for (n = t, i = m(e); p > n; n++)
                            if (c[n]) {
                                if (!(p > i && c[n].test(C[i]))) break;
                                C[n] = C[i], C[i] = g(i), i = m(i)
                            } b(), S.caret(Math.max(u, t))
                    }
                }

                function y() {
                    w(), S.val() != k && S.change()
                }

                function x(t, e) {
                    var n;
                    for (n = t; e > n && p > n; n++) c[n] && (C[n] = g(n))
                }

                function b() {
                    S.val(C.join(""))
                }

                function w(t) {
                    var e, n, i, o = S.val(),
                        r = -1;
                    for (e = 0, i = 0; p > e; e++)
                        if (c[e]) {
                            for (C[e] = g(e); i++ < o.length;)
                                if (n = o.charAt(i - 1), c[e].test(n)) {
                                    C[e] = n, r = e;
                                    break
                                } if (i > o.length) {
                                x(e + 1, p);
                                break
                            }
                        } else C[e] === o.charAt(i) && i++, d > e && (r = e);
                    return t ? b() : d > r + 1 ? s.autoclear || C.join("") === T ? (S.val() && S.val(""), x(0, p)) : b() : (b(), S.val(S.val().substring(0, r + 1))), d ? e : u
                }
                var S = t(this),
                    C = t.map(n.split(""), function(t, e) {
                        return "?" != t ? l[t] ? g(e) : t : void 0
                    }),
                    T = C.join(""),
                    k = S.val();
                S.data(t.mask.dataName, function() {
                    return t.map(C, function(t, e) {
                        return c[e] && t != g(e) ? t : null
                    }).join("")
                }), S.one("unmask", function() {
                    S.off(".mask").removeData(t.mask.dataName)
                }).on("focus.mask", function() {
                    if (!S.prop("readonly")) {
                        clearTimeout(e);
                        var t;
                        k = S.val(), t = w(), e = setTimeout(function() {
                            S.get(0) === document.activeElement && (b(), t == n.replace("?", "").length ? S.caret(0, t) : S.caret(t))
                        }, 10)
                    }
                }).on("blur.mask", y).on("keydown.mask", function(t) {
                    if (!S.prop("readonly")) {
                        var e, n, o, r = t.which || t.keyCode;
                        h = S.val(), 8 === r || 46 === r || i && 127 === r ? (e = S.caret(), n = e.begin, (o = e.end) - n == 0 && (n = 46 !== r ? function(t) {
                            for (; --t >= 0 && !c[t];);
                            return t
                        }(n) : o = m(n - 1), o = 46 === r ? m(o) : o), x(n, o), v(n, o - 1), t.preventDefault()) : 13 === r ? y.call(this, t) : 27 === r && (S.val(k), S.caret(0, w()), t.preventDefault())
                    }
                }).on("keypress.mask", function(e) {
                    if (!S.prop("readonly")) {
                        var n, i, o, s = e.which || e.keyCode,
                            l = S.caret();
                        e.ctrlKey || e.altKey || e.metaKey || 32 > s || !s || 13 === s || (l.end - l.begin != 0 && (x(l.begin, l.end), v(l.begin, l.end - 1)), n = m(l.begin - 1), p > n && (i = String.fromCharCode(s), c[n].test(i)) && (function(t) {
                            var e, n, i, o;
                            for (e = t, n = g(t); p > e; e++)
                                if (c[e]) {
                                    if (i = m(e), o = C[e], C[e] = n, !(p > i && c[i].test(o))) break;
                                    n = o
                                }
                        }(n), C[n] = i, b(), o = m(n), r ? setTimeout(function() {
                            t.proxy(t.fn.caret, S, o)()
                        }, 0) : S.caret(o), l.begin <= f && a()), e.preventDefault())
                    }
                }).on("input.mask paste.mask", function() {
                    S.prop("readonly") || setTimeout(function() {
                        var t = w(!0);
                        S.caret(t), a()
                    }, 0)
                }), o && r && S.off("input.mask").on("input.mask", function() {
                    var t = S.val(),
                        e = S.caret();
                    if (h && h.length && h.length > t.length) {
                        for (w(!0); e.begin > 0 && !c[e.begin - 1];) e.begin--;
                        if (0 === e.begin)
                            for (; e.begin < u && !c[e.begin];) e.begin++;
                        S.caret(e.begin, e.begin)
                    } else {
                        for (w(!0); e.begin < p && !c[e.begin];) e.begin++;
                        S.caret(e.begin, e.begin)
                    }
                    a()
                }), w()
            })
        }
    })
}),
function() {
    if ($(".js--bxSlider_1 a").length > 1) $(".js--bxSlider_1").bxSlider({
        auto: !0,
        pager: !0,
        controls: !0,
        pagerType: "full",
        nextSelector: ".slider-next",
        prevSelector: ".slider-prev",
        nextText: "",
        prevText: "",
        marginSlides: 20,
        pause: 7e3
    })
}(), ($(document).on("click", ".js-qty-plus", function() {
    var t = parseInt($(this).parent().find(".js-qty-input").attr("value"));
    t += 1, $(this).parent().find(".js-qty-input").attr("value", t).change(), $(this).parent().find(".js-qty-input").val(t).change()
}), $(document).on("click", ".js-qty-minus", function() {
    var t = parseInt($(this).parent().find(".js-qty-input").attr("value"));
    t = t > 1 ? t - 1 : 1, $(this).parent().find(".js-qty-input").attr("value", t).change(), $(this).parent().find(".js-qty-input").val(t).change()
})), $(".b-product__qty").length && ($(".js-qty-input").focus(function() {
    $(this).val("")
}), $(".js-qty-input").blur(function() {
    "" === $(this).val() ? ($(this).attr("value", 1), $(this).val(1)) : $(this).attr("value", $(this).val())
})), $(".circle_part").on("click", function() {
    $(this).parent().parent().find(".item").removeClass("active"), $(this).parent().addClass("active")
}), $(function() {
    var t = $(".rating").rateYo({
            starSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>',
            starWidth: "16px",
            fullStar: !0,
            readOnly: !0,
            spacing: "4px",
            ratedFill: "#ff7500"
        }),
        e = $(".rating").attr("data-count");
    t.rateYo("rating", e)
}), $(function() {
    var t = $(".rating_value").rateYo({
        starSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>',
        starWidth: "16px",
        fullStar: !0,
        spacing: "4px",
        ratedFill: "#ff7500",
        rating: 5
    });
    t.on("rateyo.set", function(e, n) {
        var i = t.rateYo("rating");
        $(".rating_value").parent().attr("data-star", i)
    })
}), $(function() {
    function t() {
        var t;
        r.hasClass("is--mobile-active") ? (t = -parseInt(r.css("top")), console.log(t), r.css({
            position: "",
            top: ""
        }), $("html, body").animate({
            scrollTop: t
        }, 0)) : (t = o.scrollTop(), r.css({
            position: "fixed",
            top: -t
        }))
    }

    function e() {
        t(), r.removeClass("is--mobile-active"), console.log("remove BG")
    }

    function n() {
        s.addClass("is--visible"), console.log("show Main Menu"), a.addClass("is--active")
    }

    function i() {
        s.removeClass("is--visible"), console.log("hide Main Menu"), a.removeClass("is--active")
    }
    var o = $(window),
        r = $("body"),
        s = $(".js-mobile-nav"),
        a = $(".js-nav-toggle"),
        l = function() {
            i()
        };
    a.on("click", function(o) {
        console.log("----------------"), console.log("menu btn click"), o.stopPropagation(), r.hasClass("is--mobile-active") ? s.hasClass("is--visible") ? (i(), e()) : (l(), n()) : (n(), t(), r.addClass("is--mobile-active"), console.log("add BG"))
    }), s.on("click", function(t) {
        t.stopPropagation()
    }), $("body").on("click", function(t) {
        r.hasClass("is--mobile-active") && (l(), e())
    }), $(".js-mobile-nav").removeAttr("style"), accordion = function(t, e) {
        var n = $(t),
            i = n.find(".js-accordion__item"),
            o = i.find(".js-accordion__trigger"),
            r = o.siblings(".js-accordion__content");
        o.on("click", function() {
            var t = $(this).siblings(".js-accordion__content"),
                o = $(this).parents(".js-accordion__item");
            r.each(function(e, n) {
                var o = i[e];
                n !== t[0] && o.classList.contains("opened") && ($(this).slideUp(300), o.classList.remove("opened"), o.classList.add("closed"))
            }), o.toggleClass("opened").toggleClass("closed"), t.slideToggle(300, function() {
                "function" == typeof e && e(n)
            })
        })
    }, accordion(".b-mobile-nav_wrapper")
}), $(document).ready(function() {
    $(".js-fullScrn").click(function() {
        var t = $(this).attr("src");
        $("body").append("<div class='popup'><div class='popup_bg'></div><img src=" + t + " class='popup_img' /></div>"), $(".popup").fadeIn(800), $(".popup_bg").click(function() {
            $(".popup").fadeOut(800), setTimeout(function() {
                $(".popup").remove()
            }, 800)
        })
    })
}), $(function() {
    function t() {
        if (null == n) {
            for (var t = getComputedStyle(e, ""), o = "", r = 0; r < t.length; r++) 0 != t[r].indexOf("overflow") && 0 != t[r].indexOf("padding") && 0 != t[r].indexOf("border") && 0 != t[r].indexOf("outline") && 0 != t[r].indexOf("box-shadow") && 0 != t[r].indexOf("background") || (o += t[r] + ": " + t.getPropertyValue(t[r]) + "; ");
            (n = document.createElement("div")).style.cssText = o + " box-sizing: border-box; width: " + e.offsetWidth + "px;", e.insertBefore(n, e.firstChild);
            for (var s = e.childNodes.length, r = 1; r < s; r++) n.appendChild(e.childNodes[1]);
            e.style.height = n.getBoundingClientRect().height + "px", e.style.padding = "0", e.style.border = "0"
        }
        var a = e.getBoundingClientRect(),
            l = Math.round(a.top + n.getBoundingClientRect().height - document.querySelector("#article").getBoundingClientRect().bottom) + 20;
        a.top - i <= 0 ? a.top - i <= l ? (n.className = "stop", n.style.top = -l + "px") : (n.className = "sticky", n.style.top = i + "px") : (n.className = "", n.style.top = ""), window.addEventListener("resize", function() {
            e.children[0].style.width = getComputedStyle(e, "").width
        }, !1)
    }
    if ($("#aside1").length > 0) {
        var e = document.querySelector("#aside1"),
            n = null,
            i = 0;
        window.addEventListener("scroll", t, !1), document.body.addEventListener("scroll", t, !1)
    }
}), setTimeout(function() {
    $(".header__basket").removeClass("basket_show")
}, 1e3);
var timer = null;
$(".js-add-to-cart").on("click", function() {
    $(".header__basket").addClass("basket_show"), clearTimeout(timer), timer = setTimeout(function() {
        $(".header__basket").removeClass("basket_show")
    }, 1e3)
}), $(".js--menu-bottom").mCustomScrollbar({
    axis: "x",
    theme: "light",
    advanced: {
        autoExpandHorizontalScroll: !0
    },
    documentTouchScroll: !0,
    manualContinuousScrolling: !0,
    touchScrolling: !0,
    hotSpotScrolling: !1,
    visibleHotSpotBackgrounds: "",
    mousewheelScrollingStep: 45,
    mousewheelScrolling: "allDirections"
}), /*$(".js-phone, #phone_callback, #phone").mask("+389999999999", {
    placeholder: ""
}),*/ $(document).ready(function() {
    $(".js-qty-input").bind("change keyup input click", function(t) {
        var e = parseInt($(this).val());
        this.value.length > 1 ? (this.value.match(/[^0-9]/g) && (this.value = this.value.replace(/[^0-9]/g, "")), e > 100 && (this.value = 100)) : this.value.match(/[^1-9]/g) && (this.value = this.value.replace(/[^1-9]/g, ""))
    })
});