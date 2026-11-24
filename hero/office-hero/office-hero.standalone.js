var e = 1e3, t = 1001, n = 1002, r = 1003, i = 1006, a = 1008, o = 1009, s = 1012, c = 1014, l = 1015, u = 1016, d = 1017, f = 1018, p = 1020, m = 1023, h = 1026, g = 1027, _ = 1028, v = 1029, y = 1030, b = 1031, x = 1033, S = 2300, C = 2301, w = 2302, T = 2303, E = 2400, D = 2401, O = 2402, k = "srgb", A = "srgb-linear", ee = "linear", j = "srgb", M = 7680, N = 35044, te = 35048, ne = 2e3;
function P(e) {
	for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
	return !1;
}
function F(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function re(e) {
	return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
function ie() {
	let e = re("canvas");
	return e.style.display = "block", e;
}
var I = {};
function ae(...e) {
	let t = "THREE." + e.shift();
	console.log(t, ...e);
}
function oe(e) {
	let t = e[0];
	if (typeof t == "string" && t.startsWith("TSL:")) {
		let t = e[1];
		t && t.isStackTrace ? e[0] += " " + t.getLocation() : e[1] = "Stack trace not available. Enable \"THREE.Node.captureStackTrace\" to capture stack traces.";
	}
	return e;
}
function L(...e) {
	e = oe(e);
	let t = "THREE." + e.shift();
	{
		let n = e[0];
		n && n.isStackTrace ? console.warn(n.getError(t)) : console.warn(t, ...e);
	}
}
function R(...e) {
	e = oe(e);
	let t = "THREE." + e.shift();
	{
		let n = e[0];
		n && n.isStackTrace ? console.error(n.getError(t)) : console.error(t, ...e);
	}
}
function se(...e) {
	let t = e.join(" ");
	t in I || (I[t] = !0, L(...e));
}
function ce(e, t, n) {
	return new Promise(function(r, i) {
		function a() {
			switch (e.clientWaitSync(t, e.SYNC_FLUSH_COMMANDS_BIT, 0)) {
				case e.WAIT_FAILED:
					i();
					break;
				case e.TIMEOUT_EXPIRED:
					setTimeout(a, n);
					break;
				default: r();
			}
		}
		setTimeout(a, n);
	});
}
var le = {
	0: 0,
	2: 6,
	4: 4,
	3: 5,
	1: 1,
	6: 2,
	7: 7,
	5: 3
}, z = class {
	addEventListener(e, t) {
		this._listeners === void 0 && (this._listeners = {});
		let n = this._listeners;
		n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
	}
	hasEventListener(e, t) {
		let n = this._listeners;
		return n !== void 0 && n[e] !== void 0 && n[e].indexOf(t) !== -1;
	}
	removeEventListener(e, t) {
		let n = this._listeners;
		if (n === void 0) return;
		let r = n[e];
		if (r !== void 0) {
			let e = r.indexOf(t);
			e !== -1 && r.splice(e, 1);
		}
	}
	dispatchEvent(e) {
		let t = this._listeners;
		if (t === void 0) return;
		let n = t[e.type];
		if (n !== void 0) {
			e.target = this;
			let t = n.slice(0);
			for (let n = 0, r = t.length; n < r; n++) t[n].call(this, e);
			e.target = null;
		}
	}
}, ue = /* @__PURE__ */ "00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff".split("."), B = 1234567, de = Math.PI / 180, fe = 180 / Math.PI;
function V() {
	let e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0, r = Math.random() * 4294967295 | 0;
	return (ue[e & 255] + ue[e >> 8 & 255] + ue[e >> 16 & 255] + ue[e >> 24 & 255] + "-" + ue[t & 255] + ue[t >> 8 & 255] + "-" + ue[t >> 16 & 15 | 64] + ue[t >> 24 & 255] + "-" + ue[n & 63 | 128] + ue[n >> 8 & 255] + "-" + ue[n >> 16 & 255] + ue[n >> 24 & 255] + ue[r & 255] + ue[r >> 8 & 255] + ue[r >> 16 & 255] + ue[r >> 24 & 255]).toLowerCase();
}
function H(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function pe(e, t) {
	return (e % t + t) % t;
}
function me(e, t, n, r, i) {
	return r + (e - t) * (i - r) / (n - t);
}
function he(e, t, n) {
	return e === t ? 0 : (n - e) / (t - e);
}
function ge(e, t, n) {
	return (1 - n) * e + n * t;
}
function _e(e, t, n, r) {
	return ge(e, t, 1 - Math.exp(-n * r));
}
function ve(e, t = 1) {
	return t - Math.abs(pe(e, t * 2) - t);
}
function ye(e, t, n) {
	return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * (3 - 2 * e));
}
function be(e, t, n) {
	return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * e * (e * (e * 6 - 15) + 10));
}
function xe(e, t) {
	return e + Math.floor(Math.random() * (t - e + 1));
}
function Se(e, t) {
	return e + Math.random() * (t - e);
}
function Ce(e) {
	return e * (.5 - Math.random());
}
function we(e) {
	e !== void 0 && (B = e);
	let t = B += 1831565813;
	return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function Te(e) {
	return e * de;
}
function Ee(e) {
	return e * fe;
}
function De(e) {
	return e > 0 && Number.isInteger(e) && 2 ** Math.round(Math.log2(e)) === e;
}
function Oe(e) {
	return 2 ** Math.ceil(Math.log(e) / Math.LN2);
}
function ke(e) {
	return 2 ** Math.floor(Math.log(e) / Math.LN2);
}
function Ae(e, t, n, r, i) {
	let a = Math.cos, o = Math.sin, s = a(n / 2), c = o(n / 2), l = a((t + r) / 2), u = o((t + r) / 2), d = a((t - r) / 2), f = o((t - r) / 2), p = a((r - t) / 2), m = o((r - t) / 2);
	switch (i) {
		case "XYX":
			e.set(s * u, c * d, c * f, s * l);
			break;
		case "YZY":
			e.set(c * f, s * u, c * d, s * l);
			break;
		case "ZXZ":
			e.set(c * d, c * f, s * u, s * l);
			break;
		case "XZX":
			e.set(s * u, c * m, c * p, s * l);
			break;
		case "YXY":
			e.set(c * p, s * u, c * m, s * l);
			break;
		case "ZYZ":
			e.set(c * m, c * p, s * u, s * l);
			break;
		default: L("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + i);
	}
}
function je(e) {
	switch (e.constructor) {
		case Uint32Array: return 4294967295;
		case Uint16Array: return 65535;
		case Uint8Array:
		case Uint8ClampedArray: return 255;
		case Int32Array: return 2147483647;
		case Int16Array: return 32767;
		case Int8Array: return 127;
		default: return;
	}
}
function Me(e, t) {
	if (t.constructor === Float32Array) return e;
	let n = je(t);
	if (n === void 0) throw Error("THREE.MathUtils: Invalid component type.");
	return Math.max(e / n, -1);
}
function Ne(e, t) {
	if (t.constructor === Float32Array) return e;
	let n = je(t);
	if (n === void 0) throw Error("THREE.MathUtils: Invalid component type.");
	return Math.round(e * n);
}
var U = {
	DEG2RAD: de,
	RAD2DEG: fe,
	generateUUID: V,
	clamp: H,
	euclideanModulo: pe,
	mapLinear: me,
	inverseLerp: he,
	lerp: ge,
	damp: _e,
	pingpong: ve,
	smoothstep: ye,
	smootherstep: be,
	randInt: xe,
	randFloat: Se,
	randFloatSpread: Ce,
	seededRandom: we,
	degToRad: Te,
	radToDeg: Ee,
	isPowerOfTwo: De,
	ceilPowerOfTwo: Oe,
	floorPowerOfTwo: ke,
	setQuaternionFromProperEuler: Ae,
	normalize: Ne,
	denormalize: Me
}, W = class {
	static {
		this.prototype.isVector2 = !0;
	}
	constructor(e = 0, t = 0) {
		this.x = e, this.y = t;
	}
	get width() {
		return this.x;
	}
	set width(e) {
		this.x = e;
	}
	get height() {
		return this.y;
	}
	set height(e) {
		this.y = e;
	}
	set(e, t) {
		return this.x = e, this.y = t, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			default: throw Error("THREE.Vector2: index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			default: throw Error("THREE.Vector2: index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this;
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	applyMatrix3(e) {
		let t = this.x, n = this.y, r = e.elements;
		return this.x = r[0] * t + r[3] * n + r[6], this.y = r[1] * t + r[4] * n + r[7], this;
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
	}
	clamp(e, t) {
		return this.x = H(this.x, e.x, t.x), this.y = H(this.y, e.y, t.y), this;
	}
	clampScalar(e, t) {
		return this.x = H(this.x, e, t), this.y = H(this.y, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(H(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y;
	}
	cross(e) {
		return this.x * e.y - this.y * e.x;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	angle() {
		return Math.atan2(-this.y, -this.x) + Math.PI;
	}
	angleTo(e) {
		let t = Math.sqrt(this.lengthSq() * e.lengthSq());
		if (t === 0) return Math.PI / 2;
		let n = this.dot(e) / t;
		return Math.acos(H(n, -1, 1));
	}
	distanceTo(e) {
		return Math.sqrt(this.distanceToSquared(e));
	}
	distanceToSquared(e) {
		let t = this.x - e.x, n = this.y - e.y;
		return t * t + n * n;
	}
	manhattanDistanceTo(e) {
		return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this;
	}
	rotateAround(e, t) {
		let n = Math.cos(t), r = Math.sin(t), i = this.x - e.x, a = this.y - e.y;
		return this.x = i * n - a * r + e.x, this.y = i * r + a * n + e.y, this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y;
	}
}, Pe = class {
	constructor(e = 0, t = 0, n = 0, r = 1) {
		this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r;
	}
	static slerpFlat(e, t, n, r, i, a, o) {
		let s = n[r + 0], c = n[r + 1], l = n[r + 2], u = n[r + 3], d = i[a + 0], f = i[a + 1], p = i[a + 2], m = i[a + 3];
		if (u !== m || s !== d || c !== f || l !== p) {
			let e = s * d + c * f + l * p + u * m;
			e < 0 && (d = -d, f = -f, p = -p, m = -m, e = -e);
			let t = 1 - o;
			if (e < .9995) {
				let n = Math.acos(e), r = Math.sin(n);
				t = Math.sin(t * n) / r, o = Math.sin(o * n) / r, s = s * t + d * o, c = c * t + f * o, l = l * t + p * o, u = u * t + m * o;
			} else {
				s = s * t + d * o, c = c * t + f * o, l = l * t + p * o, u = u * t + m * o;
				let e = 1 / Math.sqrt(s * s + c * c + l * l + u * u);
				s *= e, c *= e, l *= e, u *= e;
			}
		}
		e[t] = s, e[t + 1] = c, e[t + 2] = l, e[t + 3] = u;
	}
	static multiplyQuaternionsFlat(e, t, n, r, i, a) {
		let o = n[r], s = n[r + 1], c = n[r + 2], l = n[r + 3], u = i[a], d = i[a + 1], f = i[a + 2], p = i[a + 3];
		return e[t] = o * p + l * u + s * f - c * d, e[t + 1] = s * p + l * d + c * u - o * f, e[t + 2] = c * p + l * f + o * d - s * u, e[t + 3] = l * p - o * u - s * d - c * f, e;
	}
	get x() {
		return this._x;
	}
	set x(e) {
		this._x = e, this._onChangeCallback();
	}
	get y() {
		return this._y;
	}
	set y(e) {
		this._y = e, this._onChangeCallback();
	}
	get z() {
		return this._z;
	}
	set z(e) {
		this._z = e, this._onChangeCallback();
	}
	get w() {
		return this._w;
	}
	set w(e) {
		this._w = e, this._onChangeCallback();
	}
	set(e, t, n, r) {
		return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this;
	}
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._w);
	}
	copy(e) {
		return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
	}
	setFromEuler(e, t = !0) {
		let n = e._x, r = e._y, i = e._z, a = e._order, o = Math.cos, s = Math.sin, c = o(n / 2), l = o(r / 2), u = o(i / 2), d = s(n / 2), f = s(r / 2), p = s(i / 2);
		switch (a) {
			case "XYZ":
				this._x = d * l * u + c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "YXZ":
				this._x = d * l * u + c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u + d * f * p;
				break;
			case "ZXY":
				this._x = d * l * u - c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "ZYX":
				this._x = d * l * u - c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u + d * f * p;
				break;
			case "YZX":
				this._x = d * l * u + c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "XZY":
				this._x = d * l * u - c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u + d * f * p;
				break;
			default: L("Quaternion: .setFromEuler() encountered an unknown order: " + a);
		}
		return t === !0 && this._onChangeCallback(), this;
	}
	setFromAxisAngle(e, t) {
		let n = t / 2, r = Math.sin(n);
		return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
	}
	setFromRotationMatrix(e) {
		let t = e.elements, n = t[0], r = t[4], i = t[8], a = t[1], o = t[5], s = t[9], c = t[2], l = t[6], u = t[10], d = n + o + u;
		if (d > 0) {
			let e = .5 / Math.sqrt(d + 1);
			this._w = .25 / e, this._x = (l - s) * e, this._y = (i - c) * e, this._z = (a - r) * e;
		} else if (n > o && n > u) {
			let e = 2 * Math.sqrt(1 + n - o - u);
			this._w = (l - s) / e, this._x = .25 * e, this._y = (r + a) / e, this._z = (i + c) / e;
		} else if (o > u) {
			let e = 2 * Math.sqrt(1 + o - n - u);
			this._w = (i - c) / e, this._x = (r + a) / e, this._y = .25 * e, this._z = (s + l) / e;
		} else {
			let e = 2 * Math.sqrt(1 + u - n - o);
			this._w = (a - r) / e, this._x = (i + c) / e, this._y = (s + l) / e, this._z = .25 * e;
		}
		return this._onChangeCallback(), this;
	}
	setFromUnitVectors(e, t) {
		let n = e.dot(t) + 1;
		return n < 1e-8 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
	}
	angleTo(e) {
		return 2 * Math.acos(Math.abs(H(this.dot(e), -1, 1)));
	}
	rotateTowards(e, t) {
		let n = this.angleTo(e);
		if (n === 0) return this;
		let r = Math.min(1, t / n);
		return this.slerp(e, r), this;
	}
	identity() {
		return this.set(0, 0, 0, 1);
	}
	invert() {
		return this.conjugate();
	}
	conjugate() {
		return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
	}
	dot(e) {
		return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
	}
	lengthSq() {
		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
	}
	length() {
		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
	}
	normalize() {
		let e = this.length();
		return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x *= e, this._y *= e, this._z *= e, this._w *= e), this._onChangeCallback(), this;
	}
	multiply(e) {
		return this.multiplyQuaternions(this, e);
	}
	premultiply(e) {
		return this.multiplyQuaternions(e, this);
	}
	multiplyQuaternions(e, t) {
		let n = e._x, r = e._y, i = e._z, a = e._w, o = t._x, s = t._y, c = t._z, l = t._w;
		return this._x = n * l + a * o + r * c - i * s, this._y = r * l + a * s + i * o - n * c, this._z = i * l + a * c + n * s - r * o, this._w = a * l - n * o - r * s - i * c, this._onChangeCallback(), this;
	}
	slerp(e, t) {
		let n = e._x, r = e._y, i = e._z, a = e._w, o = this.dot(e);
		o < 0 && (n = -n, r = -r, i = -i, a = -a, o = -o);
		let s = 1 - t;
		if (o < .9995) {
			let e = Math.acos(o), c = Math.sin(e);
			s = Math.sin(s * e) / c, t = Math.sin(t * e) / c, this._x = this._x * s + n * t, this._y = this._y * s + r * t, this._z = this._z * s + i * t, this._w = this._w * s + a * t, this._onChangeCallback();
		} else this._x = this._x * s + n * t, this._y = this._y * s + r * t, this._z = this._z * s + i * t, this._w = this._w * s + a * t, this.normalize();
		return this;
	}
	slerpQuaternions(e, t, n) {
		return this.copy(e).slerp(t, n);
	}
	random() {
		let e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), r = Math.sqrt(1 - n), i = Math.sqrt(n);
		return this.set(r * Math.sin(e), r * Math.cos(e), i * Math.sin(t), i * Math.cos(t));
	}
	equals(e) {
		return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
	}
	fromArray(e, t = 0) {
		return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
	}
	fromBufferAttribute(e, t) {
		return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
	}
	toJSON() {
		return this.toArray();
	}
	_onChange(e) {
		return this._onChangeCallback = e, this;
	}
	_onChangeCallback() {}
	*[Symbol.iterator]() {
		yield this._x, yield this._y, yield this._z, yield this._w;
	}
}, G = class {
	static {
		this.prototype.isVector3 = !0;
	}
	constructor(e = 0, t = 0, n = 0) {
		this.x = e, this.y = t, this.z = n;
	}
	set(e, t, n) {
		return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this.z = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setZ(e) {
		return this.z = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			case 2:
				this.z = t;
				break;
			default: throw Error("THREE.Vector3: index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw Error("THREE.Vector3: index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y, this.z);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this.z = e.z, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this.z += e.z, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this.z += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this.z -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this.z *= e, this;
	}
	multiplyVectors(e, t) {
		return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
	}
	applyEuler(e) {
		return this.applyQuaternion(K.setFromEuler(e));
	}
	applyAxisAngle(e, t) {
		return this.applyQuaternion(K.setFromAxisAngle(e, t));
	}
	applyMatrix3(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements;
		return this.x = i[0] * t + i[3] * n + i[6] * r, this.y = i[1] * t + i[4] * n + i[7] * r, this.z = i[2] * t + i[5] * n + i[8] * r, this;
	}
	applyNormalMatrix(e) {
		return this.applyMatrix3(e).normalize();
	}
	applyMatrix4(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements, a = 1 / (i[3] * t + i[7] * n + i[11] * r + i[15]);
		return this.x = (i[0] * t + i[4] * n + i[8] * r + i[12]) * a, this.y = (i[1] * t + i[5] * n + i[9] * r + i[13]) * a, this.z = (i[2] * t + i[6] * n + i[10] * r + i[14]) * a, this;
	}
	applyQuaternion(e) {
		let t = this.x, n = this.y, r = this.z, i = e.x, a = e.y, o = e.z, s = e.w, c = 2 * (a * r - o * n), l = 2 * (o * t - i * r), u = 2 * (i * n - a * t);
		return this.x = t + s * c + a * u - o * l, this.y = n + s * l + o * c - i * u, this.z = r + s * u + i * l - a * c, this;
	}
	project(e) {
		return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
	}
	unproject(e) {
		return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
	}
	transformDirection(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements;
		return this.x = i[0] * t + i[4] * n + i[8] * r, this.y = i[1] * t + i[5] * n + i[9] * r, this.z = i[2] * t + i[6] * n + i[10] * r, this.normalize();
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
	}
	clamp(e, t) {
		return this.x = H(this.x, e.x, t.x), this.y = H(this.y, e.y, t.y), this.z = H(this.z, e.z, t.z), this;
	}
	clampScalar(e, t) {
		return this.x = H(this.x, e, t), this.y = H(this.y, e, t), this.z = H(this.z, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(H(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y + this.z * e.z;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
	}
	cross(e) {
		return this.crossVectors(this, e);
	}
	crossVectors(e, t) {
		let n = e.x, r = e.y, i = e.z, a = t.x, o = t.y, s = t.z;
		return this.x = r * s - i * o, this.y = i * a - n * s, this.z = n * o - r * a, this;
	}
	projectOnVector(e) {
		let t = e.lengthSq();
		if (t === 0) return this.set(0, 0, 0);
		let n = e.dot(this) / t;
		return this.copy(e).multiplyScalar(n);
	}
	projectOnPlane(e) {
		return Fe.copy(this).projectOnVector(e), this.sub(Fe);
	}
	reflect(e) {
		return this.sub(Fe.copy(e).multiplyScalar(2 * this.dot(e)));
	}
	angleTo(e) {
		let t = Math.sqrt(this.lengthSq() * e.lengthSq());
		if (t === 0) return Math.PI / 2;
		let n = this.dot(e) / t;
		return Math.acos(H(n, -1, 1));
	}
	distanceTo(e) {
		return Math.sqrt(this.distanceToSquared(e));
	}
	distanceToSquared(e) {
		let t = this.x - e.x, n = this.y - e.y, r = this.z - e.z;
		return t * t + n * n + r * r;
	}
	manhattanDistanceTo(e) {
		return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
	}
	setFromSpherical(e) {
		return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
	}
	setFromSphericalCoords(e, t, n) {
		let r = Math.sin(t) * e;
		return this.x = r * Math.sin(n), this.y = Math.cos(t) * e, this.z = r * Math.cos(n), this;
	}
	setFromCylindrical(e) {
		return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
	}
	setFromCylindricalCoords(e, t, n) {
		return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
	}
	setFromMatrixPosition(e) {
		let t = e.elements;
		return this.x = t[12], this.y = t[13], this.z = t[14], this;
	}
	setFromMatrixScale(e) {
		let t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length();
		return this.x = t, this.y = n, this.z = r, this;
	}
	setFromMatrixColumn(e, t) {
		return this.fromArray(e.elements, t * 4);
	}
	setFromMatrix3Column(e, t) {
		return this.fromArray(e.elements, t * 3);
	}
	setFromEuler(e) {
		return this.x = e._x, this.y = e._y, this.z = e._z, this;
	}
	setFromColor(e) {
		return this.x = e.r, this.y = e.g, this.z = e.b, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y && e.z === this.z;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
	}
	randomDirection() {
		let e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t);
		return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y, yield this.z;
	}
}, Fe = /*@__PURE__*/ new G(), K = /*@__PURE__*/ new Pe(), q = class {
	static {
		this.prototype.isMatrix3 = !0;
	}
	constructor(e, t, n, r, i, a, o, s, c) {
		this.elements = [
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r, i, a, o, s, c);
	}
	set(e, t, n, r, i, a, o, s, c) {
		let l = this.elements;
		return l[0] = e, l[1] = r, l[2] = o, l[3] = t, l[4] = i, l[5] = s, l[6] = n, l[7] = a, l[8] = c, this;
	}
	identity() {
		return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
	}
	copy(e) {
		let t = this.elements, n = e.elements;
		return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
	}
	extractBasis(e, t, n) {
		return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
	}
	setFromMatrix4(e) {
		let t = e.elements;
		return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this;
	}
	multiply(e) {
		return this.multiplyMatrices(this, e);
	}
	premultiply(e) {
		return this.multiplyMatrices(e, this);
	}
	multiplyMatrices(e, t) {
		let n = e.elements, r = t.elements, i = this.elements, a = n[0], o = n[3], s = n[6], c = n[1], l = n[4], u = n[7], d = n[2], f = n[5], p = n[8], m = r[0], h = r[3], g = r[6], _ = r[1], v = r[4], y = r[7], b = r[2], x = r[5], S = r[8];
		return i[0] = a * m + o * _ + s * b, i[3] = a * h + o * v + s * x, i[6] = a * g + o * y + s * S, i[1] = c * m + l * _ + u * b, i[4] = c * h + l * v + u * x, i[7] = c * g + l * y + u * S, i[2] = d * m + f * _ + p * b, i[5] = d * h + f * v + p * x, i[8] = d * g + f * y + p * S, this;
	}
	multiplyScalar(e) {
		let t = this.elements;
		return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
	}
	determinant() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8];
		return t * a * l - t * o * c - n * i * l + n * o * s + r * i * c - r * a * s;
	}
	invert() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8], u = l * a - o * c, d = o * s - l * i, f = c * i - a * s, p = t * u + n * d + r * f;
		if (p === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
		let m = 1 / p;
		return e[0] = u * m, e[1] = (r * c - l * n) * m, e[2] = (o * n - r * a) * m, e[3] = d * m, e[4] = (l * t - r * s) * m, e[5] = (r * i - o * t) * m, e[6] = f * m, e[7] = (n * s - c * t) * m, e[8] = (a * t - n * i) * m, this;
	}
	transpose() {
		let e, t = this.elements;
		return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
	}
	getNormalMatrix(e) {
		return this.setFromMatrix4(e).invert().transpose();
	}
	transposeIntoArray(e) {
		let t = this.elements;
		return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
	}
	setUvTransform(e, t, n, r, i, a, o) {
		let s = Math.cos(i), c = Math.sin(i);
		return this.set(n * s, n * c, -n * (s * a + c * o) + a + e, -r * c, r * s, -r * (-c * a + s * o) + o + t, 0, 0, 1), this;
	}
	scale(e, t) {
		return se("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(Ie.makeScale(e, t)), this;
	}
	rotate(e) {
		return se("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(Ie.makeRotation(-e)), this;
	}
	translate(e, t) {
		return se("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(Ie.makeTranslation(e, t)), this;
	}
	makeTranslation(e, t) {
		return e.isVector2 ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1) : this.set(1, 0, e, 0, 1, t, 0, 0, 1), this;
	}
	makeRotation(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, -n, 0, n, t, 0, 0, 0, 1), this;
	}
	makeScale(e, t) {
		return this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this;
	}
	equals(e) {
		let t = this.elements, n = e.elements;
		for (let e = 0; e < 9; e++) if (t[e] !== n[e]) return !1;
		return !0;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 9; n++) this.elements[n] = e[n + t];
		return this;
	}
	toArray(e = [], t = 0) {
		let n = this.elements;
		return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
	}
	clone() {
		return new this.constructor().fromArray(this.elements);
	}
}, Ie = /*@__PURE__*/ new q(), Le = /*@__PURE__*/ new q().set(.4123908, .3575843, .1804808, .212639, .7151687, .0721923, .0193308, .1191948, .9505322), Re = /*@__PURE__*/ new q().set(3.2409699, -1.5373832, -.4986108, -.9692436, 1.8759675, .0415551, .0556301, -.203977, 1.0569715);
function ze() {
	let e = {
		enabled: !0,
		workingColorSpace: A,
		spaces: {},
		convert: function(e, t, n) {
			return this.enabled === !1 || t === n || !t || !n || (this.spaces[t].transfer === "srgb" && (e.r = Ve(e.r), e.g = Ve(e.g), e.b = Ve(e.b)), this.spaces[t].primaries !== this.spaces[n].primaries && (e.applyMatrix3(this.spaces[t].toXYZ), e.applyMatrix3(this.spaces[n].fromXYZ)), this.spaces[n].transfer === "srgb" && (e.r = He(e.r), e.g = He(e.g), e.b = He(e.b))), e;
		},
		workingToColorSpace: function(e, t) {
			return this.convert(e, this.workingColorSpace, t);
		},
		colorSpaceToWorking: function(e, t) {
			return this.convert(e, t, this.workingColorSpace);
		},
		getPrimaries: function(e) {
			return this.spaces[e].primaries;
		},
		getTransfer: function(e) {
			return e === "" ? ee : this.spaces[e].transfer;
		},
		getToneMappingMode: function(e) {
			return this.spaces[e].outputColorSpaceConfig.toneMappingMode || "standard";
		},
		getLuminanceCoefficients: function(e, t = this.workingColorSpace) {
			return e.fromArray(this.spaces[t].luminanceCoefficients);
		},
		define: function(e) {
			Object.assign(this.spaces, e);
		},
		_getMatrix: function(e, t, n) {
			return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ);
		},
		_getDrawingBufferColorSpace: function(e) {
			return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace;
		},
		_getUnpackColorSpace: function(e = this.workingColorSpace) {
			return this.spaces[e].workingColorSpaceConfig.unpackColorSpace;
		}
	}, t = [
		.64,
		.33,
		.3,
		.6,
		.15,
		.06
	], n = [
		.2126,
		.7152,
		.0722
	], r = [.3127, .329];
	return e.define({
		[A]: {
			primaries: t,
			whitePoint: r,
			transfer: ee,
			toXYZ: Le,
			fromXYZ: Re,
			luminanceCoefficients: n,
			workingColorSpaceConfig: { unpackColorSpace: k },
			outputColorSpaceConfig: { drawingBufferColorSpace: k }
		},
		[k]: {
			primaries: t,
			whitePoint: r,
			transfer: j,
			toXYZ: Le,
			fromXYZ: Re,
			luminanceCoefficients: n,
			outputColorSpaceConfig: { drawingBufferColorSpace: k }
		}
	}), e;
}
var Be = /*@__PURE__*/ ze();
function Ve(e) {
	return e < .04045 ? e * .0773993808 : (e * .9478672986 + .0521327014) ** 2.4;
}
function He(e) {
	return e < .0031308 ? e * 12.92 : 1.055 * e ** .41666 - .055;
}
var Ue, We = class {
	static getDataURL(e, t = "image/png") {
		if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src;
		let n;
		if (e instanceof HTMLCanvasElement) n = e;
		else {
			Ue === void 0 && (Ue = re("canvas")), Ue.width = e.width, Ue.height = e.height;
			let t = Ue.getContext("2d");
			e instanceof ImageData ? t.putImageData(e, 0, 0) : t.drawImage(e, 0, 0, e.width, e.height), n = Ue;
		}
		return n.toDataURL(t);
	}
	static sRGBToLinear(e) {
		if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
			let t = re("canvas");
			t.width = e.width, t.height = e.height;
			let n = t.getContext("2d");
			n.drawImage(e, 0, 0, e.width, e.height);
			let r = n.getImageData(0, 0, e.width, e.height), i = r.data;
			for (let e = 0; e < i.length; e++) i[e] = Ve(i[e] / 255) * 255;
			return n.putImageData(r, 0, 0), t;
		}
		if (e.data) {
			let t = e.data.slice(0);
			for (let e = 0; e < t.length; e++) t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[e] = Math.floor(Ve(t[e] / 255) * 255) : t[e] = Ve(t[e]);
			return {
				data: t,
				width: e.width,
				height: e.height
			};
		}
		return L("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
	}
}, Ge = 0, Ke = class {
	constructor(e = null) {
		this.isTextureSource = !0, Object.defineProperty(this, "id", { value: Ge++ }), this.uuid = V(), this.data = e, this.dataReady = !0, this.version = 0;
	}
	getSize(e) {
		let t = this.data;
		return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < "u" && t instanceof VideoFrame ? e.set(t.displayWidth, t.displayHeight, 0) : t === null ? e.set(0, 0, 0) : e.set(t.width || 0, t.height || 0, t.depth || 0), e;
	}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		if (!t && e.images[this.uuid] !== void 0) return e.images[this.uuid];
		let n = {
			uuid: this.uuid,
			url: ""
		}, r = this.data;
		if (r !== null) {
			let e;
			if (Array.isArray(r)) {
				e = [];
				for (let t = 0, n = r.length; t < n; t++) r[t].isDataTexture ? e.push(qe(r[t].image)) : e.push(qe(r[t]));
			} else e = qe(r);
			n.url = e;
		}
		return t || (e.images[this.uuid] = n), n;
	}
};
function qe(e) {
	return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap ? We.getDataURL(e) : e.data ? {
		data: Array.from(e.data),
		width: e.width,
		height: e.height,
		type: e.data.constructor.name
	} : (L("Texture: Unable to serialize Texture."), {});
}
var Je = 0, Ye = /*@__PURE__*/ new G(), Xe = class r extends z {
	constructor(e = r.DEFAULT_IMAGE, n = r.DEFAULT_MAPPING, s = t, c = t, l = i, u = a, d = m, f = o, p = r.DEFAULT_ANISOTROPY, h = "") {
		super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Je++ }), this.uuid = V(), this.name = "", this.source = new Ke(e), this.mipmaps = [], this.mapping = n, this.channel = 0, this.wrapS = s, this.wrapT = c, this.magFilter = l, this.minFilter = u, this.anisotropy = p, this.format = d, this.internalFormat = null, this.type = f, this.offset = new W(0, 0), this.repeat = new W(1, 1), this.center = new W(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new q(), this.generateMipmaps = !0, this.mipmapsAutoUpdate = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(e && e.depth && e.depth > 1), this.pmremVersion = 0, this.isPMREMTexture = !1, this.normalized = !1;
	}
	get width() {
		return this.source.getSize(Ye).x;
	}
	get height() {
		return this.source.getSize(Ye).y;
	}
	get depth() {
		return this.source.getSize(Ye).z;
	}
	get image() {
		return this.source.data;
	}
	set image(e) {
		this.source.data = e;
	}
	updateMatrix() {
		this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
	}
	addUpdateRange(e, t) {
		this.updateRanges.push({
			start: e,
			count: t
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.normalized = e.normalized, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.mipmapsAutoUpdate = e.mipmapsAutoUpdate, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isPMREMTexture = e.isPMREMTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
	}
	setValues(e) {
		for (let t in e) {
			let n = e[t];
			if (n === void 0) {
				L(`Texture.setValues(): parameter '${t}' has value of undefined.`);
				continue;
			}
			let r = this[t];
			r === void 0 ? L(`Texture.setValues(): property '${t}' does not exist.`) : r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3 ? r.copy(n) : this[t] = n;
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		if (!t && e.textures[this.uuid] !== void 0) return e.textures[this.uuid];
		let n = {
			metadata: {
				version: 4.7,
				type: "Texture",
				generator: "Texture.toJSON"
			},
			uuid: this.uuid,
			name: this.name,
			image: this.source.toJSON(e).uuid,
			mapping: this.mapping,
			channel: this.channel,
			repeat: [this.repeat.x, this.repeat.y],
			offset: [this.offset.x, this.offset.y],
			center: [this.center.x, this.center.y],
			rotation: this.rotation,
			wrap: [this.wrapS, this.wrapT],
			format: this.format,
			internalFormat: this.internalFormat,
			type: this.type,
			normalized: this.normalized,
			colorSpace: this.colorSpace,
			minFilter: this.minFilter,
			magFilter: this.magFilter,
			anisotropy: this.anisotropy,
			flipY: this.flipY,
			generateMipmaps: this.generateMipmaps,
			mipmapsAutoUpdate: this.mipmapsAutoUpdate,
			premultiplyAlpha: this.premultiplyAlpha,
			unpackAlignment: this.unpackAlignment
		};
		return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	transformUv(r) {
		if (this.mapping !== 300) return r;
		if (r.applyMatrix3(this.matrix), r.x < 0 || r.x > 1) switch (this.wrapS) {
			case e:
				r.x -= Math.floor(r.x);
				break;
			case t:
				r.x = r.x < 0 ? 0 : 1;
				break;
			case n: Math.abs(Math.floor(r.x) % 2) === 1 ? r.x = Math.ceil(r.x) - r.x : r.x -= Math.floor(r.x);
		}
		if (r.y < 0 || r.y > 1) switch (this.wrapT) {
			case e:
				r.y -= Math.floor(r.y);
				break;
			case t:
				r.y = r.y < 0 ? 0 : 1;
				break;
			case n: Math.abs(Math.floor(r.y) % 2) === 1 ? r.y = Math.ceil(r.y) - r.y : r.y -= Math.floor(r.y);
		}
		return this.flipY && (r.y = 1 - r.y), r;
	}
	set needsUpdate(e) {
		e === !0 && (this.version++, this.source.needsUpdate = !0);
	}
	set needsPMREMUpdate(e) {
		e === !0 && this.pmremVersion++;
	}
};
Xe.DEFAULT_IMAGE = null, Xe.DEFAULT_MAPPING = 300, Xe.DEFAULT_ANISOTROPY = 1;
var Ze = class {
	static {
		this.prototype.isVector4 = !0;
	}
	constructor(e = 0, t = 0, n = 0, r = 1) {
		this.x = e, this.y = t, this.z = n, this.w = r;
	}
	get width() {
		return this.z;
	}
	set width(e) {
		this.z = e;
	}
	get height() {
		return this.w;
	}
	set height(e) {
		this.w = e;
	}
	set(e, t, n, r) {
		return this.x = e, this.y = t, this.z = n, this.w = r, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this.z = e, this.w = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setZ(e) {
		return this.z = e, this;
	}
	setW(e) {
		return this.w = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			case 2:
				this.z = t;
				break;
			case 3:
				this.w = t;
				break;
			default: throw Error("THREE.Vector4: index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw Error("THREE.Vector4: index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y, this.z, this.w);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w === void 0 ? 1 : e.w, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this.z += e, this.w += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
	}
	applyMatrix4(e) {
		let t = this.x, n = this.y, r = this.z, i = this.w, a = e.elements;
		return this.x = a[0] * t + a[4] * n + a[8] * r + a[12] * i, this.y = a[1] * t + a[5] * n + a[9] * r + a[13] * i, this.z = a[2] * t + a[6] * n + a[10] * r + a[14] * i, this.w = a[3] * t + a[7] * n + a[11] * r + a[15] * i, this;
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	setAxisAngleFromQuaternion(e) {
		this.w = 2 * Math.acos(e.w);
		let t = Math.sqrt(1 - e.w * e.w);
		return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
	}
	setAxisAngleFromRotationMatrix(e) {
		let t, n, r, i, a = .01, o = .1, s = e.elements, c = s[0], l = s[4], u = s[8], d = s[1], f = s[5], p = s[9], m = s[2], h = s[6], g = s[10];
		if (Math.abs(l - d) < a && Math.abs(u - m) < a && Math.abs(p - h) < a) {
			if (Math.abs(l + d) < o && Math.abs(u + m) < o && Math.abs(p + h) < o && Math.abs(c + f + g - 3) < o) return this.set(1, 0, 0, 0), this;
			t = Math.PI;
			let e = (c + 1) / 2, s = (f + 1) / 2, _ = (g + 1) / 2, v = (l + d) / 4, y = (u + m) / 4, b = (p + h) / 4;
			return e > s && e > _ ? e < a ? (n = 0, r = .707106781, i = .707106781) : (n = Math.sqrt(e), r = v / n, i = y / n) : s > _ ? s < a ? (n = .707106781, r = 0, i = .707106781) : (r = Math.sqrt(s), n = v / r, i = b / r) : _ < a ? (n = .707106781, r = .707106781, i = 0) : (i = Math.sqrt(_), n = y / i, r = b / i), this.set(n, r, i, t), this;
		}
		let _ = Math.sqrt((h - p) * (h - p) + (u - m) * (u - m) + (d - l) * (d - l));
		return Math.abs(_) < .001 && (_ = 1), this.x = (h - p) / _, this.y = (u - m) / _, this.z = (d - l) / _, this.w = Math.acos((c + f + g - 1) / 2), this;
	}
	setFromMatrixPosition(e) {
		let t = e.elements;
		return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
	}
	clamp(e, t) {
		return this.x = H(this.x, e.x, t.x), this.y = H(this.y, e.y, t.y), this.z = H(this.z, e.z, t.z), this.w = H(this.w, e.w, t.w), this;
	}
	clampScalar(e, t) {
		return this.x = H(this.x, e, t), this.y = H(this.y, e, t), this.z = H(this.z, e, t), this.w = H(this.w, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(H(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y, yield this.z, yield this.w;
	}
}, Qe = class extends z {
	constructor(e = 1, t = 1, n = {}) {
		super(), n = Object.assign({
			generateMipmaps: !1,
			internalFormat: null,
			minFilter: i,
			depthBuffer: !0,
			stencilBuffer: !1,
			resolveColorBuffer: !0,
			resolveDepthBuffer: !0,
			resolveStencilBuffer: !0,
			storeMultisampledColorBuffer: !0,
			storeMultisampledDepthBuffer: !0,
			storeMultisampledStencilBuffer: !0,
			depthTexture: null,
			samples: 0,
			count: 1,
			depth: 1,
			multiview: !1,
			useArrayDepthTexture: !1
		}, n), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = n.depth, this.scissor = new Ze(0, 0, e, t), this.scissorTest = !1, this.viewport = new Ze(0, 0, e, t), this.textures = [];
		let r = n.count;
		for (let i = 0; i < r; i++) this.textures[i] = new Xe({
			width: e,
			height: t,
			depth: n.depth
		}), this.textures[i].isRenderTargetTexture = !0, this.textures[i].renderTarget = this;
		this._setTextureOptions(n), this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveColorBuffer = n.resolveColorBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this.storeMultisampledColorBuffer = n.storeMultisampledColorBuffer, this.storeMultisampledDepthBuffer = n.storeMultisampledDepthBuffer, this.storeMultisampledStencilBuffer = n.storeMultisampledStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples, this.multiview = n.multiview, this.useArrayDepthTexture = n.useArrayDepthTexture;
	}
	_setTextureOptions(e = {}) {
		let t = {
			minFilter: i,
			generateMipmaps: !1,
			flipY: !1,
			internalFormat: null
		};
		e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.mipmapsAutoUpdate !== void 0 && (t.mipmapsAutoUpdate = e.mipmapsAutoUpdate), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat);
		for (let e = 0; e < this.textures.length; e++) this.textures[e].setValues(t);
	}
	get texture() {
		return this.textures[0];
	}
	set texture(e) {
		this.textures[0] = e;
	}
	set depthTexture(e) {
		this._depthTexture !== null && this._depthTexture.renderTarget === this && (this._depthTexture.renderTarget = null), e !== null && e.renderTarget === null && (e.renderTarget = this), this._depthTexture = e;
	}
	get depthTexture() {
		return this._depthTexture;
	}
	setSize(e, t, n = 1) {
		if (this.width !== e || this.height !== t || this.depth !== n) {
			this.width = e, this.height = t, this.depth = n;
			for (let r = 0, i = this.textures.length; r < i; r++) this.textures[r].image.width = e, this.textures[r].image.height = t, this.textures[r].image.depth = n, this.textures[r].isData3DTexture !== !0 && (this.textures[r].isArrayTexture = this.textures[r].image.depth > 1);
			this.dispose();
		}
		this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
		for (let t = 0, n = e.textures.length; t < n; t++) {
			this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
			let n = Object.assign({}, e.textures[t].image);
			this.textures[t].source = new Ke(n);
		}
		if (this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveColorBuffer = e.resolveColorBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, this.storeMultisampledColorBuffer = e.storeMultisampledColorBuffer, this.storeMultisampledDepthBuffer = e.storeMultisampledDepthBuffer, this.storeMultisampledStencilBuffer = e.storeMultisampledStencilBuffer, e.depthTexture !== null) {
			if (e.depthTexture.renderTarget === e) {
				let t = e.depthTexture.clone();
				t.renderTarget = null, this.depthTexture = t;
			} else this.depthTexture = e.depthTexture;
		} else this.depthTexture = null;
		return this.samples = e.samples, this.multiview = e.multiview, this.useArrayDepthTexture = e.useArrayDepthTexture, this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}, $e = class extends Qe {
	constructor(e = 1, t = 1, n = {}) {
		super(e, t, n), this.isWebGLRenderTarget = !0;
	}
}, et = class extends Xe {
	constructor(e = null, n = 1, i = 1, a = 1) {
		super(null), this.isDataArrayTexture = !0, this.image = {
			data: e,
			width: n,
			height: i,
			depth: a
		}, this.magFilter = r, this.minFilter = r, this.wrapR = t, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
	}
	copy(e) {
		return super.copy(e), this.wrapR = e.wrapR, this;
	}
	addLayerUpdate(e) {
		this.layerUpdates.add(e);
	}
	clearLayerUpdates() {
		this.layerUpdates.clear();
	}
}, tt = class extends Xe {
	constructor(e = null, n = 1, i = 1, a = 1) {
		super(null), this.isData3DTexture = !0, this.image = {
			data: e,
			width: n,
			height: i,
			depth: a
		}, this.magFilter = r, this.minFilter = r, this.wrapR = t, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
	}
	copy(e) {
		return super.copy(e), this.wrapR = e.wrapR, this;
	}
}, nt = class e {
	static {
		this.prototype.isMatrix4 = !0;
	}
	constructor(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		this.elements = [
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h);
	}
	set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		let g = this.elements;
		return g[0] = e, g[4] = t, g[8] = n, g[12] = r, g[1] = i, g[5] = a, g[9] = o, g[13] = s, g[2] = c, g[6] = l, g[10] = u, g[14] = d, g[3] = f, g[7] = p, g[11] = m, g[15] = h, this;
	}
	identity() {
		return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
	}
	clone() {
		return new e().fromArray(this.elements);
	}
	copy(e) {
		let t = this.elements, n = e.elements;
		return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
	}
	copyPosition(e) {
		let t = this.elements, n = e.elements;
		return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
	}
	setFromMatrix3(e) {
		let t = e.elements;
		return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this;
	}
	extractBasis(e, t, n) {
		return this.determinantAffine() === 0 ? (e.set(1, 0, 0), t.set(0, 1, 0), n.set(0, 0, 1), this) : (e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this);
	}
	makeBasis(e, t, n) {
		return this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1), this;
	}
	extractRotation(e) {
		if (e.determinantAffine() === 0) return this.identity();
		let t = this.elements, n = e.elements, r = 1 / rt.setFromMatrixColumn(e, 0).length(), i = 1 / rt.setFromMatrixColumn(e, 1).length(), a = 1 / rt.setFromMatrixColumn(e, 2).length();
		return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * i, t[5] = n[5] * i, t[6] = n[6] * i, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
	}
	makeRotationFromEuler(e) {
		let t = this.elements, n = e.x, r = e.y, i = e.z, a = Math.cos(n), o = Math.sin(n), s = Math.cos(r), c = Math.sin(r), l = Math.cos(i), u = Math.sin(i);
		if (e.order === "XYZ") {
			let e = a * l, n = a * u, r = o * l, i = o * u;
			t[0] = s * l, t[4] = -s * u, t[8] = c, t[1] = n + r * c, t[5] = e - i * c, t[9] = -o * s, t[2] = i - e * c, t[6] = r + n * c, t[10] = a * s;
		} else if (e.order === "YXZ") {
			let e = s * l, n = s * u, r = c * l, i = c * u;
			t[0] = e + i * o, t[4] = r * o - n, t[8] = a * c, t[1] = a * u, t[5] = a * l, t[9] = -o, t[2] = n * o - r, t[6] = i + e * o, t[10] = a * s;
		} else if (e.order === "ZXY") {
			let e = s * l, n = s * u, r = c * l, i = c * u;
			t[0] = e - i * o, t[4] = -a * u, t[8] = r + n * o, t[1] = n + r * o, t[5] = a * l, t[9] = i - e * o, t[2] = -a * c, t[6] = o, t[10] = a * s;
		} else if (e.order === "ZYX") {
			let e = a * l, n = a * u, r = o * l, i = o * u;
			t[0] = s * l, t[4] = r * c - n, t[8] = e * c + i, t[1] = s * u, t[5] = i * c + e, t[9] = n * c - r, t[2] = -c, t[6] = o * s, t[10] = a * s;
		} else if (e.order === "YZX") {
			let e = a * s, n = a * c, r = o * s, i = o * c;
			t[0] = s * l, t[4] = i - e * u, t[8] = r * u + n, t[1] = u, t[5] = a * l, t[9] = -o * l, t[2] = -c * l, t[6] = n * u + r, t[10] = e - i * u;
		} else if (e.order === "XZY") {
			let e = a * s, n = a * c, r = o * s, i = o * c;
			t[0] = s * l, t[4] = -u, t[8] = c * l, t[1] = e * u + i, t[5] = a * l, t[9] = n * u - r, t[2] = r * u - n, t[6] = o * l, t[10] = i * u + e;
		}
		return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
	}
	makeRotationFromQuaternion(e) {
		return this.compose(at, e, ot);
	}
	lookAt(e, t, n) {
		let r = this.elements;
		return lt.subVectors(e, t), lt.lengthSq() === 0 && (lt.z = 1), lt.normalize(), st.crossVectors(n, lt), st.lengthSq() === 0 && (Math.abs(n.z) === 1 ? lt.x += 1e-4 : lt.z += 1e-4, lt.normalize(), st.crossVectors(n, lt)), st.normalize(), ct.crossVectors(lt, st), r[0] = st.x, r[4] = ct.x, r[8] = lt.x, r[1] = st.y, r[5] = ct.y, r[9] = lt.y, r[2] = st.z, r[6] = ct.z, r[10] = lt.z, this;
	}
	multiply(e) {
		return this.multiplyMatrices(this, e);
	}
	premultiply(e) {
		return this.multiplyMatrices(e, this);
	}
	multiplyMatrices(e, t) {
		let n = e.elements, r = t.elements, i = this.elements, a = n[0], o = n[4], s = n[8], c = n[12], l = n[1], u = n[5], d = n[9], f = n[13], p = n[2], m = n[6], h = n[10], g = n[14], _ = n[3], v = n[7], y = n[11], b = n[15], x = r[0], S = r[4], C = r[8], w = r[12], T = r[1], E = r[5], D = r[9], O = r[13], k = r[2], A = r[6], ee = r[10], j = r[14], M = r[3], N = r[7], te = r[11], ne = r[15];
		return i[0] = a * x + o * T + s * k + c * M, i[4] = a * S + o * E + s * A + c * N, i[8] = a * C + o * D + s * ee + c * te, i[12] = a * w + o * O + s * j + c * ne, i[1] = l * x + u * T + d * k + f * M, i[5] = l * S + u * E + d * A + f * N, i[9] = l * C + u * D + d * ee + f * te, i[13] = l * w + u * O + d * j + f * ne, i[2] = p * x + m * T + h * k + g * M, i[6] = p * S + m * E + h * A + g * N, i[10] = p * C + m * D + h * ee + g * te, i[14] = p * w + m * O + h * j + g * ne, i[3] = _ * x + v * T + y * k + b * M, i[7] = _ * S + v * E + y * A + b * N, i[11] = _ * C + v * D + y * ee + b * te, i[15] = _ * w + v * O + y * j + b * ne, this;
	}
	multiplyScalar(e) {
		let t = this.elements;
		return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
	}
	determinant() {
		let e = this.elements, t = e[0], n = e[4], r = e[8], i = e[12], a = e[1], o = e[5], s = e[9], c = e[13], l = e[2], u = e[6], d = e[10], f = e[14], p = e[3], m = e[7], h = e[11], g = e[15], _ = s * f - c * d, v = o * f - c * u, y = o * d - s * u, b = a * f - c * l, x = a * d - s * l, S = a * u - o * l;
		return t * (m * _ - h * v + g * y) - n * (p * _ - h * b + g * x) + r * (p * v - m * b + g * S) - i * (p * y - m * x + h * S);
	}
	determinantAffine() {
		let e = this.elements, t = e[0], n = e[4], r = e[8], i = e[1], a = e[5], o = e[9], s = e[2], c = e[6], l = e[10];
		return t * (a * l - o * c) - n * (i * l - o * s) + r * (i * c - a * s);
	}
	transpose() {
		let e = this.elements, t;
		return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
	}
	setPosition(e, t, n) {
		let r = this.elements;
		return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = n), this;
	}
	invert() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8], u = e[9], d = e[10], f = e[11], p = e[12], m = e[13], h = e[14], g = e[15], _ = t * o - n * a, v = t * s - r * a, y = t * c - i * a, b = n * s - r * o, x = n * c - i * o, S = r * c - i * s, C = l * m - u * p, w = l * h - d * p, T = l * g - f * p, E = u * h - d * m, D = u * g - f * m, O = d * g - f * h, k = _ * O - v * D + y * E + b * T - x * w + S * C;
		if (k === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		let A = 1 / k;
		return e[0] = (o * O - s * D + c * E) * A, e[1] = (r * D - n * O - i * E) * A, e[2] = (m * S - h * x + g * b) * A, e[3] = (d * x - u * S - f * b) * A, e[4] = (s * T - a * O - c * w) * A, e[5] = (t * O - r * T + i * w) * A, e[6] = (h * y - p * S - g * v) * A, e[7] = (l * S - d * y + f * v) * A, e[8] = (a * D - o * T + c * C) * A, e[9] = (n * T - t * D - i * C) * A, e[10] = (p * x - m * y + g * _) * A, e[11] = (u * y - l * x - f * _) * A, e[12] = (o * w - a * E - s * C) * A, e[13] = (t * E - n * w + r * C) * A, e[14] = (m * v - p * b - h * _) * A, e[15] = (l * b - u * v + d * _) * A, this;
	}
	scale(e) {
		let t = this.elements, n = e.x, r = e.y, i = e.z;
		return t[0] *= n, t[4] *= r, t[8] *= i, t[1] *= n, t[5] *= r, t[9] *= i, t[2] *= n, t[6] *= r, t[10] *= i, t[3] *= n, t[7] *= r, t[11] *= i, this;
	}
	getMaxScaleOnAxis() {
		let e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
		return Math.sqrt(Math.max(t, n, r));
	}
	makeTranslation(e, t, n) {
		return e.isVector3 ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1) : this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1), this;
	}
	makeRotationX(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this;
	}
	makeRotationY(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this;
	}
	makeRotationZ(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
	}
	makeRotationAxis(e, t) {
		let n = Math.cos(t), r = Math.sin(t), i = 1 - n, a = e.x, o = e.y, s = e.z, c = i * a, l = i * o;
		return this.set(c * a + n, c * o - r * s, c * s + r * o, 0, c * o + r * s, l * o + n, l * s - r * a, 0, c * s - r * o, l * s + r * a, i * s * s + n, 0, 0, 0, 0, 1), this;
	}
	makeScale(e, t, n) {
		return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
	}
	makeShear(e, t, n, r, i, a) {
		return this.set(1, n, i, 0, e, 1, a, 0, t, r, 1, 0, 0, 0, 0, 1), this;
	}
	compose(e, t, n) {
		let r = this.elements, i = t._x, a = t._y, o = t._z, s = t._w, c = i + i, l = a + a, u = o + o, d = i * c, f = i * l, p = i * u, m = a * l, h = a * u, g = o * u, _ = s * c, v = s * l, y = s * u, b = n.x, x = n.y, S = n.z;
		return r[0] = (1 - (m + g)) * b, r[1] = (f + y) * b, r[2] = (p - v) * b, r[3] = 0, r[4] = (f - y) * x, r[5] = (1 - (d + g)) * x, r[6] = (h + _) * x, r[7] = 0, r[8] = (p + v) * S, r[9] = (h - _) * S, r[10] = (1 - (d + m)) * S, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
	}
	decompose(e, t, n) {
		let r = this.elements;
		e.x = r[12], e.y = r[13], e.z = r[14];
		let i = this.determinantAffine();
		if (i === 0) return n.set(1, 1, 1), t.identity(), this;
		let a = rt.set(r[0], r[1], r[2]).length(), o = rt.set(r[4], r[5], r[6]).length(), s = rt.set(r[8], r[9], r[10]).length();
		i < 0 && (a = -a), it.copy(this);
		let c = 1 / a, l = 1 / o, u = 1 / s;
		return it.elements[0] *= c, it.elements[1] *= c, it.elements[2] *= c, it.elements[4] *= l, it.elements[5] *= l, it.elements[6] *= l, it.elements[8] *= u, it.elements[9] *= u, it.elements[10] *= u, t.setFromRotationMatrix(it), n.x = a, n.y = o, n.z = s, this;
	}
	makePerspective(e, t, n, r, i, a, o = ne, s = !1) {
		let c = this.elements, l = 2 * i / (t - e), u = 2 * i / (n - r), d = (t + e) / (t - e), f = (n + r) / (n - r), p, m;
		if (s) p = i / (a - i), m = a * i / (a - i);
		else if (o === 2e3) p = -(a + i) / (a - i), m = -2 * a * i / (a - i);
		else if (o === 2001) p = -a / (a - i), m = -a * i / (a - i);
		else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
		return c[0] = l, c[4] = 0, c[8] = d, c[12] = 0, c[1] = 0, c[5] = u, c[9] = f, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = p, c[14] = m, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
	}
	makeOrthographic(e, t, n, r, i, a, o = ne, s = !1) {
		let c = this.elements, l = 2 / (t - e), u = 2 / (n - r), d = -(t + e) / (t - e), f = -(n + r) / (n - r), p, m;
		if (s) p = 1 / (a - i), m = a / (a - i);
		else if (o === 2e3) p = -2 / (a - i), m = -(a + i) / (a - i);
		else if (o === 2001) p = -1 / (a - i), m = -i / (a - i);
		else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
		return c[0] = l, c[4] = 0, c[8] = 0, c[12] = d, c[1] = 0, c[5] = u, c[9] = 0, c[13] = f, c[2] = 0, c[6] = 0, c[10] = p, c[14] = m, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this;
	}
	equals(e) {
		let t = this.elements, n = e.elements;
		for (let e = 0; e < 16; e++) if (t[e] !== n[e]) return !1;
		return !0;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 16; n++) this.elements[n] = e[n + t];
		return this;
	}
	toArray(e = [], t = 0) {
		let n = this.elements;
		return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
	}
}, rt = /*@__PURE__*/ new G(), it = /*@__PURE__*/ new nt(), at = /*@__PURE__*/ new G(0, 0, 0), ot = /*@__PURE__*/ new G(1, 1, 1), st = /*@__PURE__*/ new G(), ct = /*@__PURE__*/ new G(), lt = /*@__PURE__*/ new G(), ut = /*@__PURE__*/ new nt(), dt = /*@__PURE__*/ new Pe(), ft = class e {
	constructor(t = 0, n = 0, r = 0, i = e.DEFAULT_ORDER) {
		this.isEuler = !0, this._x = t, this._y = n, this._z = r, this._order = i;
	}
	get x() {
		return this._x;
	}
	set x(e) {
		this._x = e, this._onChangeCallback();
	}
	get y() {
		return this._y;
	}
	set y(e) {
		this._y = e, this._onChangeCallback();
	}
	get z() {
		return this._z;
	}
	set z(e) {
		this._z = e, this._onChangeCallback();
	}
	get order() {
		return this._order;
	}
	set order(e) {
		this._order = e, this._onChangeCallback();
	}
	set(e, t, n, r = this._order) {
		return this._x = e, this._y = t, this._z = n, this._order = r, this._onChangeCallback(), this;
	}
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._order);
	}
	copy(e) {
		return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
	}
	setFromRotationMatrix(e, t = this._order, n = !0) {
		let r = e.elements, i = r[0], a = r[4], o = r[8], s = r[1], c = r[5], l = r[9], u = r[2], d = r[6], f = r[10];
		switch (t) {
			case "XYZ":
				this._y = Math.asin(H(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(-l, f), this._z = Math.atan2(-a, i)) : (this._x = Math.atan2(d, c), this._z = 0);
				break;
			case "YXZ":
				this._x = Math.asin(-H(l, -1, 1)), Math.abs(l) < .9999999 ? (this._y = Math.atan2(o, f), this._z = Math.atan2(s, c)) : (this._y = Math.atan2(-u, i), this._z = 0);
				break;
			case "ZXY":
				this._x = Math.asin(H(d, -1, 1)), Math.abs(d) < .9999999 ? (this._y = Math.atan2(-u, f), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(s, i));
				break;
			case "ZYX":
				this._y = Math.asin(-H(u, -1, 1)), Math.abs(u) < .9999999 ? (this._x = Math.atan2(d, f), this._z = Math.atan2(s, i)) : (this._x = 0, this._z = Math.atan2(-a, c));
				break;
			case "YZX":
				this._z = Math.asin(H(s, -1, 1)), Math.abs(s) < .9999999 ? (this._x = Math.atan2(-l, c), this._y = Math.atan2(-u, i)) : (this._x = 0, this._y = Math.atan2(o, f));
				break;
			case "XZY":
				this._z = Math.asin(-H(a, -1, 1)), Math.abs(a) < .9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(o, i)) : (this._x = Math.atan2(-l, f), this._y = 0);
				break;
			default: L("Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
		}
		return this._order = t, n === !0 && this._onChangeCallback(), this;
	}
	setFromQuaternion(e, t, n) {
		return ut.makeRotationFromQuaternion(e), this.setFromRotationMatrix(ut, t, n);
	}
	setFromVector3(e, t = this._order) {
		return this.set(e.x, e.y, e.z, t);
	}
	reorder(e) {
		return dt.setFromEuler(this), this.setFromQuaternion(dt, e);
	}
	equals(e) {
		return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
	}
	fromArray(e) {
		return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
	}
	_onChange(e) {
		return this._onChangeCallback = e, this;
	}
	_onChangeCallback() {}
	*[Symbol.iterator]() {
		yield this._x, yield this._y, yield this._z, yield this._order;
	}
};
ft.DEFAULT_ORDER = "XYZ";
var pt = class {
	constructor() {
		this.mask = 1;
	}
	set(e) {
		this.mask = 1 << e >>> 0;
	}
	enable(e) {
		this.mask |= 1 << e;
	}
	enableAll() {
		this.mask = -1;
	}
	toggle(e) {
		this.mask ^= 1 << e;
	}
	disable(e) {
		this.mask &= ~(1 << e);
	}
	disableAll() {
		this.mask = 0;
	}
	test(e) {
		return (this.mask & e.mask) !== 0;
	}
	isEnabled(e) {
		return !!(this.mask & 1 << e);
	}
}, mt = 0, ht = /*@__PURE__*/ new G(), gt = /*@__PURE__*/ new Pe(), _t = /*@__PURE__*/ new nt(), vt = /*@__PURE__*/ new G(), yt = /*@__PURE__*/ new G(), bt = /*@__PURE__*/ new G(), xt = /*@__PURE__*/ new Pe(), St = /*@__PURE__*/ new G(1, 0, 0), Ct = /*@__PURE__*/ new G(0, 1, 0), wt = /*@__PURE__*/ new G(0, 0, 1), Tt = { type: "added" }, Et = { type: "removed" }, Dt = {
	type: "childadded",
	child: null
}, Ot = {
	type: "childremoved",
	child: null
}, kt = class e extends z {
	constructor() {
		super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: mt++ }), this.uuid = V(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = e.DEFAULT_UP.clone();
		let t = new G(), n = new ft(), r = new Pe(), i = new G(1, 1, 1);
		function a() {
			r.setFromEuler(n, !1);
		}
		function o() {
			n.setFromQuaternion(r, void 0, !1);
		}
		n._onChange(a), r._onChange(o), Object.defineProperties(this, {
			position: {
				configurable: !0,
				enumerable: !0,
				value: t
			},
			rotation: {
				configurable: !0,
				enumerable: !0,
				value: n
			},
			quaternion: {
				configurable: !0,
				enumerable: !0,
				value: r
			},
			scale: {
				configurable: !0,
				enumerable: !0,
				value: i
			},
			modelViewMatrix: { value: new nt() },
			normalMatrix: { value: new q() }
		}), this.matrix = new nt(), this.matrixWorld = new nt(), this.matrixAutoUpdate = e.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new pt(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
	}
	onBeforeShadow() {}
	onAfterShadow() {}
	onBeforeRender() {}
	onAfterRender() {}
	applyMatrix4(e) {
		this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale), this.pivot !== null && this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot);
	}
	applyQuaternion(e) {
		return this.quaternion.premultiply(e), this;
	}
	setRotationFromAxisAngle(e, t) {
		this.quaternion.setFromAxisAngle(e, t);
	}
	setRotationFromEuler(e) {
		this.quaternion.setFromEuler(e, !0);
	}
	setRotationFromMatrix(e) {
		this.quaternion.setFromRotationMatrix(e);
	}
	setRotationFromQuaternion(e) {
		this.quaternion.copy(e);
	}
	rotateOnAxis(e, t) {
		return gt.setFromAxisAngle(e, t), this.quaternion.multiply(gt), this;
	}
	rotateOnWorldAxis(e, t) {
		return gt.setFromAxisAngle(e, t), this.quaternion.premultiply(gt), this;
	}
	rotateX(e) {
		return this.rotateOnAxis(St, e);
	}
	rotateY(e) {
		return this.rotateOnAxis(Ct, e);
	}
	rotateZ(e) {
		return this.rotateOnAxis(wt, e);
	}
	translateOnAxis(e, t) {
		return ht.copy(e).applyQuaternion(this.quaternion), this.position.add(ht.multiplyScalar(t)), this;
	}
	translateX(e) {
		return this.translateOnAxis(St, e);
	}
	translateY(e) {
		return this.translateOnAxis(Ct, e);
	}
	translateZ(e) {
		return this.translateOnAxis(wt, e);
	}
	localToWorld(e) {
		return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
	}
	worldToLocal(e) {
		return this.updateWorldMatrix(!0, !1), e.applyMatrix4(_t.copy(this.matrixWorld).invert());
	}
	lookAt(e, t, n) {
		e.isVector3 ? vt.copy(e) : vt.set(e, t, n);
		let r = this.parent;
		this.updateWorldMatrix(!0, !1), yt.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? _t.lookAt(yt, vt, this.up) : _t.lookAt(vt, yt, this.up), this.quaternion.setFromRotationMatrix(_t), r && (_t.extractRotation(r.matrixWorld), gt.setFromRotationMatrix(_t), this.quaternion.premultiply(gt.invert()));
	}
	add(e) {
		if (arguments.length > 1) {
			for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
			return this;
		}
		return e === this ? (R("Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(Tt), Dt.child = e, this.dispatchEvent(Dt), Dt.child = null) : R("Object3D.add: object not an instance of THREE.Object3D.", e), this);
	}
	remove(e) {
		if (arguments.length > 1) {
			for (let e = 0; e < arguments.length; e++) this.remove(arguments[e]);
			return this;
		}
		let t = this.children.indexOf(e);
		return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Et), Ot.child = e, this.dispatchEvent(Ot), Ot.child = null), this;
	}
	removeFromParent() {
		let e = this.parent;
		return e !== null && e.remove(this), this;
	}
	clear() {
		return this.remove(...this.children);
	}
	attach(e) {
		return this.updateWorldMatrix(!0, !1), _t.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), _t.multiply(e.parent.matrixWorld)), e.applyMatrix4(_t), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(Tt), Dt.child = e, this.dispatchEvent(Dt), Dt.child = null, this;
	}
	getObjectById(e) {
		return this.getObjectByProperty("id", e);
	}
	getObjectByName(e) {
		return this.getObjectByProperty("name", e);
	}
	getObjectByProperty(e, t) {
		if (this[e] === t) return this;
		for (let n = 0, r = this.children.length; n < r; n++) {
			let r = this.children[n].getObjectByProperty(e, t);
			if (r !== void 0) return r;
		}
	}
	getObjectsByProperty(e, t, n = []) {
		this[e] === t && n.push(this);
		let r = this.children;
		for (let i = 0, a = r.length; i < a; i++) r[i].getObjectsByProperty(e, t, n);
		return n;
	}
	getWorldPosition(e) {
		return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
	}
	getWorldQuaternion(e) {
		return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(yt, e, bt), e;
	}
	getWorldScale(e) {
		return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(yt, xt, e), e;
	}
	getWorldDirection(e) {
		this.updateWorldMatrix(!0, !1);
		let t = this.matrixWorld.elements;
		return e.set(t[8], t[9], t[10]).normalize();
	}
	raycast() {}
	intersectsFrustum() {
		return !0;
	}
	traverse(e) {
		e(this);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].traverse(e);
	}
	traverseVisible(e) {
		if (this.visible === !1) return;
		e(this);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].traverseVisible(e);
	}
	traverseAncestors(e) {
		let t = this.parent;
		t !== null && (e(t), t.traverseAncestors(e));
	}
	updateMatrix() {
		this.matrix.compose(this.position, this.quaternion, this.scale);
		let e = this.pivot;
		if (e !== null) {
			let t = e.x, n = e.y, r = e.z, i = this.matrix.elements;
			i[12] += t - i[0] * t - i[4] * n - i[8] * r, i[13] += n - i[1] * t - i[5] * n - i[9] * r, i[14] += r - i[2] * t - i[6] * n - i[10] * r;
		}
		this.matrixWorldNeedsUpdate = !0;
	}
	updateMatrixWorld(e) {
		this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].updateMatrixWorld(e);
	}
	updateWorldMatrix(e, t, n = !1) {
		let r = this.parent;
		if (e === !0 && r !== null && r.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, n = !0), t === !0) {
			let e = this.children;
			for (let t = 0, r = e.length; t < r; t++) e[t].updateWorldMatrix(!1, !0, n);
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string", n = {};
		t && (e = {
			geometries: {},
			materials: {},
			textures: {},
			images: {},
			shapes: {},
			skeletons: {},
			animations: {},
			nodes: {}
		}, n.metadata = {
			version: 4.7,
			type: "Object",
			generator: "Object3D.toJSON"
		});
		let r = {};
		r.uuid = this.uuid, r.type = this.type, r.name = this.name, r.castShadow = this.castShadow, r.receiveShadow = this.receiveShadow, r.visible = this.visible, r.frustumCulled = this.frustumCulled, r.renderOrder = this.renderOrder, r.static = this.static, r.matrixAutoUpdate = this.matrixAutoUpdate, Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.pivot !== null && (r.pivot = this.pivot.toArray()), this.morphTargetDictionary !== void 0 && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map((e) => ({
			...e,
			boundingBox: e.boundingBox ? e.boundingBox.toJSON() : void 0,
			boundingSphere: e.boundingSphere ? e.boundingSphere.toJSON() : void 0
		})), r.instanceInfo = this._instanceInfo.map((e) => ({ ...e })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(e), r.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
		function i(t, n) {
			return t[n.uuid] === void 0 && (t[n.uuid] = n.toJSON(e)), n.uuid;
		}
		if (this.isScene) this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
		else if (this.isMesh || this.isLine || this.isPoints) {
			r.geometry = i(e.geometries, this.geometry);
			let t = this.geometry.parameters;
			if (t !== void 0 && t.shapes !== void 0) {
				let n = t.shapes;
				if (Array.isArray(n)) for (let t = 0, r = n.length; t < r; t++) {
					let r = n[t];
					i(e.shapes, r);
				}
				else i(e.shapes, n);
			}
		}
		if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (i(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0) {
			if (Array.isArray(this.material)) {
				let t = [];
				for (let n = 0, r = this.material.length; n < r; n++) t.push(i(e.materials, this.material[n]));
				r.material = t;
			} else r.material = i(e.materials, this.material);
		}
		if (this.children.length > 0) {
			r.children = [];
			for (let t = 0; t < this.children.length; t++) r.children.push(this.children[t].toJSON(e).object);
		}
		if (this.animations.length > 0) {
			r.animations = [];
			for (let t = 0; t < this.animations.length; t++) {
				let n = this.animations[t];
				r.animations.push(i(e.animations, n));
			}
		}
		if (t) {
			let t = a(e.geometries), r = a(e.materials), i = a(e.textures), o = a(e.images), s = a(e.shapes), c = a(e.skeletons), l = a(e.animations), u = a(e.nodes);
			t.length > 0 && (n.geometries = t), r.length > 0 && (n.materials = r), i.length > 0 && (n.textures = i), o.length > 0 && (n.images = o), s.length > 0 && (n.shapes = s), c.length > 0 && (n.skeletons = c), l.length > 0 && (n.animations = l), u.length > 0 && (n.nodes = u);
		}
		return n.object = r, n;
		function a(e) {
			let t = [];
			for (let n in e) {
				let r = e[n];
				delete r.metadata, t.push(r);
			}
			return t;
		}
	}
	clone(e) {
		return new this.constructor().copy(this, e);
	}
	copy(e, t = !0) {
		if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.pivot = e.pivot === null ? null : e.pivot.clone(), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.static = e.static, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0) for (let t = 0; t < e.children.length; t++) {
			let n = e.children[t];
			this.add(n.clone());
		}
		return this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
};
kt.DEFAULT_UP = /*@__PURE__*/ new G(0, 1, 0), kt.DEFAULT_MATRIX_AUTO_UPDATE = !0, kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
var At = class extends kt {
	constructor() {
		super(), this.isGroup = !0, this.type = "Group";
	}
}, jt = { type: "move" }, Mt = class {
	constructor() {
		this._targetRay = null, this._grip = null, this._hand = null;
	}
	getHandSpace() {
		return this._hand === null && (this._hand = new At(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
	}
	getTargetRaySpace() {
		return this._targetRay === null && (this._targetRay = new At(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new G(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new G()), this._targetRay;
	}
	getGripSpace() {
		return this._grip === null && (this._grip = new At(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new G(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new G(), this._grip.eventsEnabled = !1), this._grip;
	}
	dispatchEvent(e) {
		return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
	}
	connect(e) {
		if (e && e.hand) {
			let t = this._hand;
			if (t) for (let n of e.hand.values()) this._getHandJoint(t, n);
		}
		return this.dispatchEvent({
			type: "connected",
			data: e
		}), this;
	}
	disconnect(e) {
		return this.dispatchEvent({
			type: "disconnected",
			data: e
		}), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
	}
	update(e, t, n) {
		let r = null, i = null, a = null, o = this._targetRay, s = this._grip, c = this._hand;
		if (e && t.session.visibilityState !== "visible-blurred") {
			if (c && e.hand) {
				a = !0;
				for (let r of e.hand.values()) {
					let e = t.getJointPose(r, n), i = this._getHandJoint(c, r);
					e !== null && (i.matrix.fromArray(e.transform.matrix), i.matrix.decompose(i.position, i.quaternion, i.scale), i.matrixWorldNeedsUpdate = !0, i.jointRadius = e.radius), i.visible = e !== null;
				}
				let r = c.joints["index-finger-tip"], i = c.joints["thumb-tip"], o = r.position.distanceTo(i.position);
				c.inputState.pinching && o > .025 ? (c.inputState.pinching = !1, this.dispatchEvent({
					type: "pinchend",
					handedness: e.handedness,
					target: this
				})) : !c.inputState.pinching && o <= .015 && (c.inputState.pinching = !0, this.dispatchEvent({
					type: "pinchstart",
					handedness: e.handedness,
					target: this
				}));
			} else s !== null && e.gripSpace && (i = t.getPose(e.gripSpace, n), i !== null && (s.matrix.fromArray(i.transform.matrix), s.matrix.decompose(s.position, s.quaternion, s.scale), s.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (s.hasLinearVelocity = !0, s.linearVelocity.copy(i.linearVelocity)) : s.hasLinearVelocity = !1, i.angularVelocity ? (s.hasAngularVelocity = !0, s.angularVelocity.copy(i.angularVelocity)) : s.hasAngularVelocity = !1, s.eventsEnabled && s.dispatchEvent({
				type: "gripUpdated",
				data: e,
				target: this
			})));
			o !== null && (r = t.getPose(e.targetRaySpace, n), r === null && i !== null && (r = i), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.quaternion, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(jt)));
		}
		return o !== null && (o.visible = r !== null), s !== null && (s.visible = i !== null), c !== null && (c.visible = a !== null), this;
	}
	_getHandJoint(e, t) {
		if (e.joints[t.jointName] === void 0) {
			let n = new At();
			n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
		}
		return e.joints[t.jointName];
	}
}, Nt = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
}, Pt = {
	h: 0,
	s: 0,
	l: 0
}, Ft = {
	h: 0,
	s: 0,
	l: 0
};
function It(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - n) : e;
}
var J = class {
	constructor(e, t, n) {
		return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
	}
	set(e, t, n) {
		if (t === void 0 && n === void 0) {
			let t = e;
			t && t.isColor ? this.copy(t) : typeof t == "number" ? this.setHex(t) : typeof t == "string" && this.setStyle(t);
		} else this.setRGB(e, t, n);
		return this;
	}
	setScalar(e) {
		return this.r = e, this.g = e, this.b = e, this;
	}
	setHex(e, t = k) {
		return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, Be.colorSpaceToWorking(this, t), this;
	}
	setRGB(e, t, n, r = Be.workingColorSpace) {
		return this.r = e, this.g = t, this.b = n, Be.colorSpaceToWorking(this, r), this;
	}
	setHSL(e, t, n, r = Be.workingColorSpace) {
		if (e = pe(e, 1), t = H(t, 0, 1), n = H(n, 0, 1), t === 0) this.r = this.g = this.b = n;
		else {
			let r = n <= .5 ? n * (1 + t) : n + t - n * t, i = 2 * n - r;
			this.r = It(i, r, e + 1 / 3), this.g = It(i, r, e), this.b = It(i, r, e - 1 / 3);
		}
		return Be.colorSpaceToWorking(this, r), this;
	}
	setStyle(e, t = k) {
		function n(t) {
			t !== void 0 && parseFloat(t) < 1 && L("Color: Alpha component of " + e + " will be ignored.");
		}
		let r;
		if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
			let i, a = r[1], o = r[2];
			switch (a) {
				case "rgb":
				case "rgba":
					if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o)) return n(i[4]), this.setRGB(Math.min(255, parseInt(i[1], 10)) / 255, Math.min(255, parseInt(i[2], 10)) / 255, Math.min(255, parseInt(i[3], 10)) / 255, t);
					if (i = /^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o)) return n(i[4]), this.setRGB(Math.min(100, parseFloat(i[1])) / 100, Math.min(100, parseFloat(i[2])) / 100, Math.min(100, parseFloat(i[3])) / 100, t);
					break;
				case "hsl":
				case "hsla":
					if (i = /^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o)) return n(i[4]), this.setHSL(parseFloat(i[1]) / 360, parseFloat(i[2]) / 100, parseFloat(i[3]) / 100, t);
					break;
				default: L("Color: Unknown color model " + e);
			}
		} else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
			let n = r[1], i = n.length;
			if (i === 3) return this.setRGB(parseInt(n.charAt(0), 16) / 15, parseInt(n.charAt(1), 16) / 15, parseInt(n.charAt(2), 16) / 15, t);
			if (i === 6) return this.setHex(parseInt(n, 16), t);
			L("Color: Invalid hex color " + e);
		} else if (e && e.length > 0) return this.setColorName(e, t);
		return this;
	}
	setColorName(e, t = k) {
		let n = Nt[e.toLowerCase()];
		return n === void 0 ? L("Color: Unknown color " + e) : this.setHex(n, t), this;
	}
	clone() {
		return new this.constructor(this.r, this.g, this.b);
	}
	copy(e) {
		return this.r = e.r, this.g = e.g, this.b = e.b, this;
	}
	copySRGBToLinear(e) {
		return this.r = Ve(e.r), this.g = Ve(e.g), this.b = Ve(e.b), this;
	}
	copyLinearToSRGB(e) {
		return this.r = He(e.r), this.g = He(e.g), this.b = He(e.b), this;
	}
	convertSRGBToLinear() {
		return this.copySRGBToLinear(this), this;
	}
	convertLinearToSRGB() {
		return this.copyLinearToSRGB(this), this;
	}
	getHex(e = k) {
		return Be.workingToColorSpace(Lt.copy(this), e), Math.round(H(Lt.r * 255, 0, 255)) * 65536 + Math.round(H(Lt.g * 255, 0, 255)) * 256 + Math.round(H(Lt.b * 255, 0, 255));
	}
	getHexString(e = k) {
		return ("000000" + this.getHex(e).toString(16)).slice(-6);
	}
	getHSL(e, t = Be.workingColorSpace) {
		Be.workingToColorSpace(Lt.copy(this), t);
		let n = Lt.r, r = Lt.g, i = Lt.b, a = Math.max(n, r, i), o = Math.min(n, r, i), s, c, l = (o + a) / 2;
		if (o === a) s = 0, c = 0;
		else {
			let e = a - o;
			switch (c = l <= .5 ? e / (a + o) : e / (2 - a - o), a) {
				case n:
					s = (r - i) / e + (r < i ? 6 : 0);
					break;
				case r:
					s = (i - n) / e + 2;
					break;
				case i: s = (n - r) / e + 4;
			}
			s /= 6;
		}
		return e.h = s, e.s = c, e.l = l, e;
	}
	getRGB(e, t = Be.workingColorSpace) {
		return Be.workingToColorSpace(Lt.copy(this), t), e.r = Lt.r, e.g = Lt.g, e.b = Lt.b, e;
	}
	getStyle(e = k) {
		Be.workingToColorSpace(Lt.copy(this), e);
		let t = Lt.r, n = Lt.g, r = Lt.b;
		return e === "srgb" ? `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})` : `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`;
	}
	offsetHSL(e, t, n) {
		return this.getHSL(Pt), this.setHSL(Pt.h + e, Pt.s + t, Pt.l + n);
	}
	add(e) {
		return this.r += e.r, this.g += e.g, this.b += e.b, this;
	}
	addColors(e, t) {
		return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
	}
	addScalar(e) {
		return this.r += e, this.g += e, this.b += e, this;
	}
	sub(e) {
		return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
	}
	multiply(e) {
		return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
	}
	multiplyScalar(e) {
		return this.r *= e, this.g *= e, this.b *= e, this;
	}
	lerp(e, t) {
		return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
	}
	lerpColors(e, t, n) {
		return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
	}
	lerpHSL(e, t) {
		this.getHSL(Pt), e.getHSL(Ft);
		let n = ge(Pt.h, Ft.h, t), r = ge(Pt.s, Ft.s, t), i = ge(Pt.l, Ft.l, t);
		return this.setHSL(n, r, i), this;
	}
	setFromVector3(e) {
		return this.r = e.x, this.g = e.y, this.b = e.z, this;
	}
	applyMatrix3(e) {
		let t = this.r, n = this.g, r = this.b, i = e.elements;
		return this.r = i[0] * t + i[3] * n + i[6] * r, this.g = i[1] * t + i[4] * n + i[7] * r, this.b = i[2] * t + i[5] * n + i[8] * r, this;
	}
	equals(e) {
		return e.r === this.r && e.g === this.g && e.b === this.b;
	}
	fromArray(e, t = 0) {
		return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
	}
	fromBufferAttribute(e, t) {
		return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
	}
	toJSON() {
		return this.getHex();
	}
	*[Symbol.iterator]() {
		yield this.r, yield this.g, yield this.b;
	}
}, Lt = /*@__PURE__*/ new J();
J.NAMES = Nt;
var Rt = class e {
	constructor(e, t = 25e-5) {
		this.isFogExp2 = !0, this.name = "", this.color = new J(e), this.density = t;
	}
	clone() {
		return new e(this.color, this.density);
	}
	toJSON() {
		return {
			type: "FogExp2",
			name: this.name,
			color: this.color.getHex(),
			density: this.density
		};
	}
}, zt = class extends kt {
	constructor() {
		super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new ft(), this.environmentIntensity = 1, this.environmentRotation = new ft(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	copy(e, t) {
		return super.copy(e, t), this.background = e.background === null ? null : e.background.clone(), this.environment = e.environment === null ? null : e.environment.clone(), this.fog = e.fog === null ? null : e.fog.clone(), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), this.overrideMaterial = e.overrideMaterial === null ? null : e.overrideMaterial.clone(), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return this.fog !== null && (t.object.fog = this.fog.toJSON()), t.object.backgroundBlurriness = this.backgroundBlurriness, t.object.backgroundIntensity = this.backgroundIntensity, t.object.backgroundRotation = this.backgroundRotation.toArray(), t.object.environmentIntensity = this.environmentIntensity, t.object.environmentRotation = this.environmentRotation.toArray(), t;
	}
}, Bt = /*@__PURE__*/ new G(), Vt = /*@__PURE__*/ new G(), Ht = /*@__PURE__*/ new G(), Ut = /*@__PURE__*/ new G(), Wt = /*@__PURE__*/ new G(), Gt = /*@__PURE__*/ new G(), Kt = /*@__PURE__*/ new G(), qt = /*@__PURE__*/ new G(), Jt = /*@__PURE__*/ new G(), Yt = /*@__PURE__*/ new G(), Xt = /*@__PURE__*/ new Ze(), Zt = /*@__PURE__*/ new Ze(), Qt = /*@__PURE__*/ new Ze(), $t = class e {
	constructor(e = new G(), t = new G(), n = new G()) {
		this.a = e, this.b = t, this.c = n;
	}
	static getNormal(e, t, n, r) {
		r.subVectors(n, t), Bt.subVectors(e, t), r.cross(Bt);
		let i = r.lengthSq();
		return i > 0 ? r.multiplyScalar(1 / Math.sqrt(i)) : r.set(0, 0, 0);
	}
	static getBarycoord(e, t, n, r, i) {
		Bt.subVectors(r, t), Vt.subVectors(n, t), Ht.subVectors(e, t);
		let a = Bt.dot(Bt), o = Bt.dot(Vt), s = Bt.dot(Ht), c = Vt.dot(Vt), l = Vt.dot(Ht), u = a * c - o * o;
		if (u === 0) return i.set(0, 0, 0), null;
		let d = 1 / u, f = (c * s - o * l) * d, p = (a * l - o * s) * d;
		return i.set(1 - f - p, p, f);
	}
	static containsPoint(e, t, n, r) {
		return this.getBarycoord(e, t, n, r, Ut) !== null && Ut.x >= 0 && Ut.y >= 0 && Ut.x + Ut.y <= 1;
	}
	static getInterpolation(e, t, n, r, i, a, o, s) {
		return this.getBarycoord(e, t, n, r, Ut) === null ? (s.x = 0, s.y = 0, "z" in s && (s.z = 0), "w" in s && (s.w = 0), null) : (s.setScalar(0), s.addScaledVector(i, Ut.x), s.addScaledVector(a, Ut.y), s.addScaledVector(o, Ut.z), s);
	}
	static getInterpolatedAttribute(e, t, n, r, i, a) {
		return Xt.setScalar(0), Zt.setScalar(0), Qt.setScalar(0), Xt.fromBufferAttribute(e, t), Zt.fromBufferAttribute(e, n), Qt.fromBufferAttribute(e, r), a.setScalar(0), a.addScaledVector(Xt, i.x), a.addScaledVector(Zt, i.y), a.addScaledVector(Qt, i.z), a;
	}
	static isFrontFacing(e, t, n, r) {
		return Bt.subVectors(n, t), Vt.subVectors(e, t), Bt.cross(Vt).dot(r) < 0;
	}
	set(e, t, n) {
		return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
	}
	setFromPointsAndIndices(e, t, n, r) {
		return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[r]), this;
	}
	setFromAttributeAndIndices(e, t, n, r) {
		return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, r), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
	}
	getArea() {
		return Bt.subVectors(this.c, this.b), Vt.subVectors(this.a, this.b), Bt.cross(Vt).length() * .5;
	}
	getMidpoint(e) {
		return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
	}
	getNormal(t) {
		return e.getNormal(this.a, this.b, this.c, t);
	}
	getPlane(e) {
		return e.setFromCoplanarPoints(this.a, this.b, this.c);
	}
	getBarycoord(t, n) {
		return e.getBarycoord(t, this.a, this.b, this.c, n);
	}
	getInterpolation(t, n, r, i, a) {
		return e.getInterpolation(t, this.a, this.b, this.c, n, r, i, a);
	}
	containsPoint(t) {
		return e.containsPoint(t, this.a, this.b, this.c);
	}
	isFrontFacing(t) {
		return e.isFrontFacing(this.a, this.b, this.c, t);
	}
	intersectsBox(e) {
		return e.intersectsTriangle(this);
	}
	closestPointToPoint(e, t) {
		let n = this.a, r = this.b, i = this.c, a, o;
		Wt.subVectors(r, n), Gt.subVectors(i, n), qt.subVectors(e, n);
		let s = Wt.dot(qt), c = Gt.dot(qt);
		if (s <= 0 && c <= 0) return t.copy(n);
		Jt.subVectors(e, r);
		let l = Wt.dot(Jt), u = Gt.dot(Jt);
		if (l >= 0 && u <= l) return t.copy(r);
		let d = s * u - l * c;
		if (d <= 0 && s >= 0 && l <= 0 && s - l > 0) return a = s / (s - l), t.copy(n).addScaledVector(Wt, a);
		Yt.subVectors(e, i);
		let f = Wt.dot(Yt), p = Gt.dot(Yt);
		if (p >= 0 && f <= p) return t.copy(i);
		let m = f * c - s * p;
		if (m <= 0 && c >= 0 && p <= 0) return o = c / (c - p), t.copy(n).addScaledVector(Gt, o);
		let h = l * p - f * u;
		if (h <= 0 && u - l >= 0 && f - p >= 0) return Kt.subVectors(i, r), o = (u - l) / (u - l + (f - p)), t.copy(r).addScaledVector(Kt, o);
		let g = 1 / (h + m + d);
		return a = m * g, o = d * g, t.copy(n).addScaledVector(Wt, a).addScaledVector(Gt, o);
	}
	equals(e) {
		return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
	}
}, en = class {
	constructor(e = new G(Infinity, Infinity, Infinity), t = new G(-Infinity, -Infinity, -Infinity)) {
		this.isBox3 = !0, this.min = e, this.max = t;
	}
	set(e, t) {
		return this.min.copy(e), this.max.copy(t), this;
	}
	setFromArray(e) {
		this.makeEmpty();
		for (let t = 0, n = e.length; t < n; t += 3) this.expandByPoint(nn.fromArray(e, t));
		return this;
	}
	setFromBufferAttribute(e) {
		this.makeEmpty();
		for (let t = 0, n = e.count; t < n; t++) this.expandByPoint(nn.fromBufferAttribute(e, t));
		return this;
	}
	setFromPoints(e) {
		this.makeEmpty();
		for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
		return this;
	}
	setFromCenterAndSize(e, t) {
		let n = nn.copy(t).multiplyScalar(.5);
		return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
	}
	setFromObject(e, t = !1) {
		return this.makeEmpty(), this.expandByObject(e, t);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.min.copy(e.min), this.max.copy(e.max), this;
	}
	makeEmpty() {
		return this.min.x = this.min.y = this.min.z = Infinity, this.max.x = this.max.y = this.max.z = -Infinity, this;
	}
	isEmpty() {
		return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
	}
	getCenter(e) {
		return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5);
	}
	getSize(e) {
		return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
	}
	expandByPoint(e) {
		return this.min.min(e), this.max.max(e), this;
	}
	expandByVector(e) {
		return this.min.sub(e), this.max.add(e), this;
	}
	expandByScalar(e) {
		return this.min.addScalar(-e), this.max.addScalar(e), this;
	}
	expandByObject(e, t = !1) {
		e.updateWorldMatrix(!1, !1);
		let n = e.geometry;
		if (n !== void 0) {
			let r = n.getAttribute("position");
			if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0 && e.isBatchedMesh !== !0) for (let t = 0, n = r.count; t < n; t++) e.isMesh === !0 ? e.getVertexPosition(t, nn) : nn.fromBufferAttribute(r, t), nn.applyMatrix4(e.matrixWorld), this.expandByPoint(nn);
			else e.boundingBox === void 0 ? (n.boundingBox === null && n.computeBoundingBox(), rn.copy(n.boundingBox)) : (e.boundingBox === null && e.computeBoundingBox(), rn.copy(e.boundingBox)), rn.applyMatrix4(e.matrixWorld), this.union(rn);
		}
		let r = e.children;
		for (let e = 0, n = r.length; e < n; e++) this.expandByObject(r[e], t);
		return this;
	}
	containsPoint(e) {
		return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
	}
	containsBox(e) {
		return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
	}
	getParameter(e, t) {
		return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z));
	}
	intersectsBox(e) {
		return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
	}
	intersectsSphere(e) {
		return this.clampPoint(e.center, nn), nn.distanceToSquared(e.center) <= e.radius * e.radius;
	}
	intersectsPlane(e) {
		let t, n;
		return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
	}
	intersectsTriangle(e) {
		if (this.isEmpty()) return !1;
		this.getCenter(dn), fn.subVectors(this.max, dn), an.subVectors(e.a, dn), on.subVectors(e.b, dn), sn.subVectors(e.c, dn), cn.subVectors(on, an), ln.subVectors(sn, on), un.subVectors(an, sn);
		let t = [
			0,
			-cn.z,
			cn.y,
			0,
			-ln.z,
			ln.y,
			0,
			-un.z,
			un.y,
			cn.z,
			0,
			-cn.x,
			ln.z,
			0,
			-ln.x,
			un.z,
			0,
			-un.x,
			-cn.y,
			cn.x,
			0,
			-ln.y,
			ln.x,
			0,
			-un.y,
			un.x,
			0
		];
		return !hn(t, an, on, sn, fn) || (t = [
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		], !hn(t, an, on, sn, fn)) ? !1 : (pn.crossVectors(cn, ln), t = [
			pn.x,
			pn.y,
			pn.z
		], hn(t, an, on, sn, fn));
	}
	clampPoint(e, t) {
		return t.copy(e).clamp(this.min, this.max);
	}
	distanceToPoint(e) {
		return this.clampPoint(e, nn).distanceTo(e);
	}
	getBoundingSphere(e) {
		return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(nn).length() * .5), e;
	}
	intersect(e) {
		return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
	}
	union(e) {
		return this.min.min(e.min), this.max.max(e.max), this;
	}
	applyMatrix4(e) {
		return this.isEmpty() || (tn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), tn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), tn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), tn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), tn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), tn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), tn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), tn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(tn)), this;
	}
	translate(e) {
		return this.min.add(e), this.max.add(e), this;
	}
	equals(e) {
		return e.min.equals(this.min) && e.max.equals(this.max);
	}
	toJSON() {
		return {
			min: this.min.toArray(),
			max: this.max.toArray()
		};
	}
	fromJSON(e) {
		return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
	}
}, tn = [
	/*@__PURE__*/ new G(),
	/*@__PURE__*/ new G(),
	/*@__PURE__*/ new G(),
	/*@__PURE__*/ new G(),
	/*@__PURE__*/ new G(),
	/*@__PURE__*/ new G(),
	/*@__PURE__*/ new G(),
	/*@__PURE__*/ new G()
], nn = /*@__PURE__*/ new G(), rn = /*@__PURE__*/ new en(), an = /*@__PURE__*/ new G(), on = /*@__PURE__*/ new G(), sn = /*@__PURE__*/ new G(), cn = /*@__PURE__*/ new G(), ln = /*@__PURE__*/ new G(), un = /*@__PURE__*/ new G(), dn = /*@__PURE__*/ new G(), fn = /*@__PURE__*/ new G(), pn = /*@__PURE__*/ new G(), mn = /*@__PURE__*/ new G();
function hn(e, t, n, r, i) {
	for (let a = 0, o = e.length - 3; a <= o; a += 3) {
		mn.fromArray(e, a);
		let o = i.x * Math.abs(mn.x) + i.y * Math.abs(mn.y) + i.z * Math.abs(mn.z), s = t.dot(mn), c = n.dot(mn), l = r.dot(mn);
		if (Math.max(-Math.max(s, c, l), Math.min(s, c, l)) > o) return !1;
	}
	return !0;
}
var gn = /*@__PURE__*/ new G(), _n = /*@__PURE__*/ new W(), vn = 0, yn = class extends z {
	constructor(e, t, n = !1) {
		if (super(), Array.isArray(e)) throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");
		this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: vn++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e === void 0 ? 0 : e.length / t, this.normalized = n, this.usage = N, this.updateRanges = [], this.gpuType = l, this.version = 0, this._normalizationScale = e === void 0 ? void 0 : je(e);
	}
	onUploadCallback() {}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	setUsage(e) {
		return this.usage = e, this;
	}
	addUpdateRange(e, t) {
		this.updateRanges.push({
			start: e,
			count: t
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	copy(e) {
		return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this._normalizationScale = e._normalizationScale, this;
	}
	copyAt(e, t, n) {
		e *= this.itemSize, n *= t.itemSize;
		for (let r = 0, i = this.itemSize; r < i; r++) this.array[e + r] = t.array[n + r];
		return this;
	}
	copyArray(e) {
		return this.array.set(e), this;
	}
	applyMatrix3(e) {
		if (this.itemSize === 2) for (let t = 0, n = this.count; t < n; t++) _n.fromBufferAttribute(this, t), _n.applyMatrix3(e), this.setXY(t, _n.x, _n.y);
		else if (this.itemSize === 3) for (let t = 0, n = this.count; t < n; t++) gn.fromBufferAttribute(this, t), gn.applyMatrix3(e), this.setXYZ(t, gn.x, gn.y, gn.z);
		return this;
	}
	applyMatrix4(e) {
		for (let t = 0, n = this.count; t < n; t++) gn.fromBufferAttribute(this, t), gn.applyMatrix4(e), this.setXYZ(t, gn.x, gn.y, gn.z);
		return this;
	}
	applyNormalMatrix(e) {
		for (let t = 0, n = this.count; t < n; t++) gn.fromBufferAttribute(this, t), gn.applyNormalMatrix(e), this.setXYZ(t, gn.x, gn.y, gn.z);
		return this;
	}
	transformDirection(e) {
		for (let t = 0, n = this.count; t < n; t++) gn.fromBufferAttribute(this, t), gn.transformDirection(e), this.setXYZ(t, gn.x, gn.y, gn.z);
		return this;
	}
	set(e, t = 0) {
		return this.array.set(e, t), this;
	}
	getComponent(e, t) {
		let n = this.array[e * this.itemSize + t];
		return this.normalized && (n = this._denormalize(n)), n;
	}
	setComponent(e, t, n) {
		return this.normalized && (n = this._normalize(n)), this.array[e * this.itemSize + t] = n, this;
	}
	getX(e) {
		let t = this.array[e * this.itemSize];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	setX(e, t) {
		return this.normalized && (t = this._normalize(t)), this.array[e * this.itemSize] = t, this;
	}
	getY(e) {
		let t = this.array[e * this.itemSize + 1];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	setY(e, t) {
		return this.normalized && (t = this._normalize(t)), this.array[e * this.itemSize + 1] = t, this;
	}
	getZ(e) {
		let t = this.array[e * this.itemSize + 2];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	setZ(e, t) {
		return this.normalized && (t = this._normalize(t)), this.array[e * this.itemSize + 2] = t, this;
	}
	getW(e) {
		let t = this.array[e * this.itemSize + 3];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	setW(e, t) {
		return this.normalized && (t = this._normalize(t)), this.array[e * this.itemSize + 3] = t, this;
	}
	setXY(e, t, n) {
		return e *= this.itemSize, this.normalized && (t = this._normalize(t), n = this._normalize(n)), this.array[e + 0] = t, this.array[e + 1] = n, this;
	}
	setXYZ(e, t, n, r) {
		return e *= this.itemSize, this.normalized && (t = this._normalize(t), n = this._normalize(n), r = this._normalize(r)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
	}
	setXYZW(e, t, n, r, i) {
		return e *= this.itemSize, this.normalized && (t = this._normalize(t), n = this._normalize(n), r = this._normalize(r), i = this._normalize(i)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = i, this;
	}
	onUpload(e) {
		return this.onUploadCallback = e, this;
	}
	clone() {
		return new this.constructor(this.array, this.itemSize).copy(this);
	}
	toJSON() {
		let e = {
			itemSize: this.itemSize,
			type: this.array.constructor.name,
			array: Array.from(this.array),
			normalized: this.normalized
		};
		return e.name = this.name, e.usage = this.usage, e.gpuType = this.gpuType, e;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	_denormalize(e) {
		let t = this._normalizationScale;
		return t === void 0 ? Me(e, this.array) : Math.max(e / t, -1);
	}
	_normalize(e) {
		let t = this._normalizationScale;
		return t === void 0 ? Ne(e, this.array) : Math.round(e * t);
	}
}, bn = class extends yn {
	constructor(e, t, n) {
		super(new Uint16Array(e), t, n);
	}
}, xn = class extends yn {
	constructor(e, t, n) {
		super(new Uint32Array(e), t, n);
	}
}, Sn = class extends yn {
	constructor(e, t, n) {
		super(new Float32Array(e), t, n);
	}
}, Cn = /*@__PURE__*/ new en(), wn = /*@__PURE__*/ new G(), Tn = /*@__PURE__*/ new G(), En = class {
	constructor(e = new G(), t = -1) {
		this.isSphere = !0, this.center = e, this.radius = t;
	}
	set(e, t) {
		return this.center.copy(e), this.radius = t, this;
	}
	setFromPoints(e, t) {
		let n = this.center;
		t === void 0 ? Cn.setFromPoints(e).getCenter(n) : n.copy(t);
		let r = 0;
		for (let t = 0, i = e.length; t < i; t++) r = Math.max(r, n.distanceToSquared(e[t]));
		return this.radius = Math.sqrt(r), this;
	}
	copy(e) {
		return this.center.copy(e.center), this.radius = e.radius, this;
	}
	isEmpty() {
		return this.radius < 0;
	}
	makeEmpty() {
		return this.center.set(0, 0, 0), this.radius = -1, this;
	}
	containsPoint(e) {
		return e.distanceToSquared(this.center) <= this.radius * this.radius;
	}
	distanceToPoint(e) {
		return e.distanceTo(this.center) - this.radius;
	}
	intersectsSphere(e) {
		let t = this.radius + e.radius;
		return e.center.distanceToSquared(this.center) <= t * t;
	}
	intersectsBox(e) {
		return e.intersectsSphere(this);
	}
	intersectsPlane(e) {
		return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
	}
	clampPoint(e, t) {
		let n = this.center.distanceToSquared(e);
		return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
	}
	getBoundingBox(e) {
		return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
	}
	applyMatrix4(e) {
		return this.center.applyMatrix4(e), this.radius *= e.getMaxScaleOnAxis(), this;
	}
	translate(e) {
		return this.center.add(e), this;
	}
	expandByPoint(e) {
		if (this.isEmpty()) return this.center.copy(e), this.radius = 0, this;
		wn.subVectors(e, this.center);
		let t = wn.lengthSq();
		if (t > this.radius * this.radius) {
			let e = Math.sqrt(t), n = (e - this.radius) * .5;
			this.center.addScaledVector(wn, n / e), this.radius += n;
		}
		return this;
	}
	union(e) {
		return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Tn.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(wn.copy(e.center).add(Tn)), this.expandByPoint(wn.copy(e.center).sub(Tn))), this);
	}
	equals(e) {
		return e.center.equals(this.center) && e.radius === this.radius;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		return {
			radius: this.radius,
			center: this.center.toArray()
		};
	}
	fromJSON(e) {
		return this.radius = e.radius, this.center.fromArray(e.center), this;
	}
}, Dn = 0, On = /*@__PURE__*/ new nt(), kn = /*@__PURE__*/ new kt(), An = /*@__PURE__*/ new G(), jn = /*@__PURE__*/ new en(), Mn = /*@__PURE__*/ new en(), Nn = /*@__PURE__*/ new G(), Pn = class e extends z {
	constructor() {
		super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Dn++ }), this.uuid = V(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
			start: 0,
			count: Infinity
		}, this.userData = {}, this._transformed = !1;
	}
	getIndex() {
		return this.index;
	}
	setIndex(e) {
		return this.index = Array.isArray(e) ? new (P(e) ? xn : bn)(e, 1) : e, this;
	}
	setIndirect(e, t = 0) {
		return this.indirect = e, this.indirectOffset = t, this;
	}
	getIndirect() {
		return this.indirect;
	}
	getAttribute(e) {
		return this.attributes[e];
	}
	setAttribute(e, t) {
		return this.attributes[e] = t, this;
	}
	deleteAttribute(e) {
		return delete this.attributes[e], this;
	}
	hasAttribute(e) {
		return this.attributes[e] !== void 0;
	}
	addGroup(e, t, n = 0) {
		this.groups.push({
			start: e,
			count: t,
			materialIndex: n
		});
	}
	clearGroups() {
		this.groups = [];
	}
	setDrawRange(e, t) {
		this.drawRange.start = e, this.drawRange.count = t;
	}
	applyMatrix4(e) {
		let t = this.attributes.position;
		t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
		let n = this.attributes.normal;
		if (n !== void 0) {
			let t = new q().getNormalMatrix(e);
			n.applyNormalMatrix(t), n.needsUpdate = !0;
		}
		let r = this.attributes.tangent;
		return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this._transformed = !0, this;
	}
	applyQuaternion(e) {
		return On.makeRotationFromQuaternion(e), this.applyMatrix4(On), this;
	}
	rotateX(e) {
		return On.makeRotationX(e), this.applyMatrix4(On), this;
	}
	rotateY(e) {
		return On.makeRotationY(e), this.applyMatrix4(On), this;
	}
	rotateZ(e) {
		return On.makeRotationZ(e), this.applyMatrix4(On), this;
	}
	translate(e, t, n) {
		return On.makeTranslation(e, t, n), this.applyMatrix4(On), this;
	}
	scale(e, t, n) {
		return On.makeScale(e, t, n), this.applyMatrix4(On), this;
	}
	lookAt(e) {
		return kn.lookAt(e), kn.updateMatrix(), this.applyMatrix4(kn.matrix), this;
	}
	center() {
		return this.computeBoundingBox(), this.boundingBox.getCenter(An).negate(), this.translate(An.x, An.y, An.z), this;
	}
	setFromPoints(e) {
		let t = this.getAttribute("position");
		if (t === void 0) {
			let t = [];
			for (let n = 0, r = e.length; n < r; n++) {
				let r = e[n];
				t.push(r.x, r.y, r.z || 0);
			}
			this.setAttribute("position", new Sn(t, 3));
		} else {
			let n = Math.min(e.length, t.count);
			for (let r = 0; r < n; r++) {
				let n = e[r];
				t.setXYZ(r, n.x, n.y, n.z || 0);
			}
			e.length > t.count && L("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0;
		}
		return this;
	}
	computeBoundingBox() {
		this.boundingBox === null && (this.boundingBox = new en());
		let e = this.attributes.position, t = this.morphAttributes.position;
		if (e && e.isGLBufferAttribute) R("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new G(-Infinity, -Infinity, -Infinity), new G(Infinity, Infinity, Infinity));
		else {
			if (e !== void 0) {
				if (this.boundingBox.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) {
					let n = t[e];
					jn.setFromBufferAttribute(n), this.morphTargetsRelative ? (Nn.addVectors(this.boundingBox.min, jn.min), this.boundingBox.expandByPoint(Nn), Nn.addVectors(this.boundingBox.max, jn.max), this.boundingBox.expandByPoint(Nn)) : (this.boundingBox.expandByPoint(jn.min), this.boundingBox.expandByPoint(jn.max));
				}
			} else this.boundingBox.makeEmpty();
			(isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && R("BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The \"position\" attribute is likely to have NaN values.", this);
		}
	}
	computeBoundingSphere() {
		this.boundingSphere === null && (this.boundingSphere = new En());
		let e = this.attributes.position, t = this.morphAttributes.position;
		if (e && e.isGLBufferAttribute) R("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new G(), Infinity);
		else if (e) {
			let n = this.boundingSphere.center;
			if (jn.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) {
				let n = t[e];
				Mn.setFromBufferAttribute(n), this.morphTargetsRelative ? (Nn.addVectors(jn.min, Mn.min), jn.expandByPoint(Nn), Nn.addVectors(jn.max, Mn.max), jn.expandByPoint(Nn)) : (jn.expandByPoint(Mn.min), jn.expandByPoint(Mn.max));
			}
			jn.getCenter(n);
			let r = 0;
			for (let t = 0, i = e.count; t < i; t++) Nn.fromBufferAttribute(e, t), r = Math.max(r, n.distanceToSquared(Nn));
			if (t) for (let i = 0, a = t.length; i < a; i++) {
				let a = t[i], o = this.morphTargetsRelative;
				for (let t = 0, i = a.count; t < i; t++) Nn.fromBufferAttribute(a, t), o && (An.fromBufferAttribute(e, t), Nn.add(An)), r = Math.max(r, n.distanceToSquared(Nn));
			}
			this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && R("BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The \"position\" attribute is likely to have NaN values.", this);
		}
	}
	computeTangents() {
		let e = this.index, t = this.attributes;
		if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
			R("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
			return;
		}
		let n = t.position, r = t.normal, i = t.uv, a = this.getAttribute("tangent");
		(a === void 0 || a.count !== n.count) && (a = new yn(new Float32Array(4 * n.count), 4), this.setAttribute("tangent", a));
		let o = [], s = [], c = new Uint8Array(n.count);
		for (let e = 0; e < n.count; e++) o[e] = new G(), s[e] = new G();
		let l = new G(), u = new G(), d = new G(), f = new W(), p = new W(), m = new W(), h = new G(), g = new G();
		function _(e, t, r) {
			c[e] = c[t] = c[r] = 1, l.fromBufferAttribute(n, e), u.fromBufferAttribute(n, t), d.fromBufferAttribute(n, r), f.fromBufferAttribute(i, e), p.fromBufferAttribute(i, t), m.fromBufferAttribute(i, r), u.sub(l), d.sub(l), p.sub(f), m.sub(f);
			let a = 1 / (p.x * m.y - m.x * p.y);
			isFinite(a) && (h.copy(u).multiplyScalar(m.y).addScaledVector(d, -p.y).multiplyScalar(a), g.copy(d).multiplyScalar(p.x).addScaledVector(u, -m.x).multiplyScalar(a), o[e].add(h), o[t].add(h), o[r].add(h), s[e].add(g), s[t].add(g), s[r].add(g));
		}
		let v = this.groups;
		v.length === 0 && (v = [{
			start: 0,
			count: e.count
		}]);
		for (let t = 0, n = v.length; t < n; ++t) {
			let n = v[t], r = n.start, i = n.count;
			for (let t = r, n = r + i; t < n; t += 3) _(e.getX(t + 0), e.getX(t + 1), e.getX(t + 2));
		}
		let y = new G(), b = new G(), x = new G(), S = new G();
		function C(e) {
			x.fromBufferAttribute(r, e), S.copy(x);
			let t = o[e];
			y.copy(t), y.sub(x.multiplyScalar(x.dot(t))).normalize(), b.crossVectors(S, t);
			let n = b.dot(s[e]) < 0 ? -1 : 1;
			a.setXYZW(e, y.x, y.y, y.z, n);
		}
		for (let e = 0, t = n.count; e < t; ++e) c[e] && C(e);
		this._transformed = !0;
	}
	computeVertexNormals() {
		let e = this.index, t = this.getAttribute("position");
		if (t !== void 0) {
			let n = this.getAttribute("normal");
			if (n === void 0 || n.count !== t.count) n = new yn(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
			else for (let e = 0, t = n.count; e < t; e++) n.setXYZ(e, 0, 0, 0);
			let r = new G(), i = new G(), a = new G(), o = new G(), s = new G(), c = new G(), l = new G(), u = new G();
			if (e) for (let d = 0, f = e.count; d < f; d += 3) {
				let f = e.getX(d + 0), p = e.getX(d + 1), m = e.getX(d + 2);
				r.fromBufferAttribute(t, f), i.fromBufferAttribute(t, p), a.fromBufferAttribute(t, m), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), o.fromBufferAttribute(n, f), s.fromBufferAttribute(n, p), c.fromBufferAttribute(n, m), o.add(l), s.add(l), c.add(l), n.setXYZ(f, o.x, o.y, o.z), n.setXYZ(p, s.x, s.y, s.z), n.setXYZ(m, c.x, c.y, c.z);
			}
			else for (let e = 0, o = t.count; e < o; e += 3) r.fromBufferAttribute(t, e + 0), i.fromBufferAttribute(t, e + 1), a.fromBufferAttribute(t, e + 2), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), n.setXYZ(e + 0, l.x, l.y, l.z), n.setXYZ(e + 1, l.x, l.y, l.z), n.setXYZ(e + 2, l.x, l.y, l.z);
			this.normalizeNormals(), n.needsUpdate = !0;
		}
	}
	normalizeNormals() {
		let e = this.attributes.normal;
		for (let t = 0, n = e.count; t < n; t++) Nn.fromBufferAttribute(e, t), Nn.normalize(), e.setXYZ(t, Nn.x, Nn.y, Nn.z);
	}
	toNonIndexed() {
		function t(e, t) {
			let n = e.array, r = e.itemSize, i = e.normalized, a = new n.constructor(t.length * r), o = 0, s = 0;
			for (let i = 0, c = t.length; i < c; i++) {
				o = e.isInterleavedBufferAttribute ? t[i] * e.data.stride + e.offset : t[i] * r;
				for (let e = 0; e < r; e++) a[s++] = n[o++];
			}
			return new yn(a, r, i);
		}
		if (this.index === null) return L("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
		let n = new e(), r = this.index.array, i = this.attributes;
		for (let e in i) {
			let a = i[e], o = t(a, r);
			n.setAttribute(e, o);
		}
		let a = this.morphAttributes;
		for (let e in a) {
			let i = [], o = a[e];
			for (let e = 0, n = o.length; e < n; e++) {
				let n = o[e], a = t(n, r);
				i.push(a);
			}
			n.morphAttributes[e] = i;
		}
		n.morphTargetsRelative = this.morphTargetsRelative;
		let o = this.groups;
		for (let e = 0, t = o.length; e < t; e++) {
			let t = o[e];
			n.addGroup(t.start, t.count, t.materialIndex);
		}
		return n;
	}
	toJSON() {
		let e = { metadata: {
			version: 4.7,
			type: "BufferGeometry",
			generator: "BufferGeometry.toJSON"
		} };
		if (e.uuid = this.uuid, e.type = this.parameters !== void 0 && this._transformed === !0 ? "BufferGeometry" : this.type, e.name = this.name, Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0 && this._transformed !== !0) {
			let t = this.parameters;
			for (let n in t) t[n] !== void 0 && (e[n] = t[n]);
			return e;
		}
		e.data = { attributes: {} };
		let t = this.index;
		t !== null && (e.data.index = {
			type: t.array.constructor.name,
			array: Array.prototype.slice.call(t.array)
		});
		let n = this.attributes;
		for (let t in n) {
			let r = n[t];
			e.data.attributes[t] = r.toJSON(e.data);
		}
		let r = {}, i = !1;
		for (let t in this.morphAttributes) {
			let n = this.morphAttributes[t], a = [];
			for (let t = 0, r = n.length; t < r; t++) {
				let r = n[t];
				a.push(r.toJSON(e.data));
			}
			a.length > 0 && (r[t] = a, i = !0);
		}
		i && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
		let a = this.groups;
		a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
		let o = this.boundingSphere;
		return o !== null && (e.data.boundingSphere = o.toJSON()), e;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
		let t = {};
		this.name = e.name;
		let n = e.index;
		n !== null && this.setIndex(n.clone());
		let r = e.attributes;
		for (let e in r) {
			let n = r[e];
			this.setAttribute(e, n.clone(t));
		}
		let i = e.morphAttributes;
		for (let e in i) {
			let n = [], r = i[e];
			for (let e = 0, i = r.length; e < i; e++) n.push(r[e].clone(t));
			this.morphAttributes[e] = n;
		}
		this.morphTargetsRelative = e.morphTargetsRelative;
		let a = e.groups;
		for (let e = 0, t = a.length; e < t; e++) {
			let t = a[e];
			this.addGroup(t.start, t.count, t.materialIndex);
		}
		let o = e.boundingBox;
		o !== null && (this.boundingBox = o.clone());
		let s = e.boundingSphere;
		return s !== null && (this.boundingSphere = s.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this._transformed = e._transformed, this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}, Fn = class {
	constructor(e, t) {
		this.isInterleavedBuffer = !0, this.array = e, this.stride = t, this.count = e === void 0 ? 0 : e.length / t, this.usage = N, this.updateRanges = [], this.version = 0, this.uuid = V();
	}
	onUploadCallback() {}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	setUsage(e) {
		return this.usage = e, this;
	}
	addUpdateRange(e, t) {
		this.updateRanges.push({
			start: e,
			count: t
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	copy(e) {
		return this.array = new e.array.constructor(e.array), this.count = e.count, this.stride = e.stride, this.usage = e.usage, this;
	}
	copyAt(e, t, n) {
		e *= this.stride, n *= t.stride;
		for (let r = 0, i = this.stride; r < i; r++) this.array[e + r] = t.array[n + r];
		return this;
	}
	set(e, t = 0) {
		return this.array.set(e, t), this;
	}
	clone(e) {
		e.arrayBuffers === void 0 && (e.arrayBuffers = {});
		let t = In(this.array);
		e.arrayBuffers[t] === void 0 && (e.arrayBuffers[t] = this.array.slice(0).buffer);
		let n = new this.array.constructor(e.arrayBuffers[t]), r = new this.constructor(n, this.stride);
		return r.setUsage(this.usage), r;
	}
	onUpload(e) {
		return this.onUploadCallback = e, this;
	}
	toJSON(e) {
		e.arrayBuffers === void 0 && (e.arrayBuffers = {});
		let t = In(this.array);
		e.arrayBuffers[t] === void 0 && (e.arrayBuffers[t] = Array.from(new Uint32Array(this.array.slice(0).buffer)));
		let n = {
			uuid: this.uuid,
			buffer: t,
			type: this.array.constructor.name,
			stride: this.stride
		};
		return n.usage = this.usage, n;
	}
};
function In(e) {
	return e.buffer._uuid === void 0 && (e.buffer._uuid = V()), e.byteOffset === 0 && e.byteLength === e.buffer.byteLength ? e.buffer._uuid : e.buffer._uuid + ":" + e.byteOffset + ":" + e.byteLength;
}
var Ln = /*@__PURE__*/ new G(), Rn = class e {
	constructor(e, t, n, r = !1) {
		this.isInterleavedBufferAttribute = !0, this.name = "", this.data = e, this.itemSize = t, this.offset = n, this.normalized = r, this._normalizationScale = e === void 0 ? void 0 : je(e.array);
	}
	get count() {
		return this.data.count;
	}
	get array() {
		return this.data.array;
	}
	set needsUpdate(e) {
		this.data.needsUpdate = e;
	}
	applyMatrix4(e) {
		for (let t = 0, n = this.data.count; t < n; t++) Ln.fromBufferAttribute(this, t), Ln.applyMatrix4(e), this.setXYZ(t, Ln.x, Ln.y, Ln.z);
		return this;
	}
	applyNormalMatrix(e) {
		for (let t = 0, n = this.count; t < n; t++) Ln.fromBufferAttribute(this, t), Ln.applyNormalMatrix(e), this.setXYZ(t, Ln.x, Ln.y, Ln.z);
		return this;
	}
	transformDirection(e) {
		for (let t = 0, n = this.count; t < n; t++) Ln.fromBufferAttribute(this, t), Ln.transformDirection(e), this.setXYZ(t, Ln.x, Ln.y, Ln.z);
		return this;
	}
	getComponent(e, t) {
		let n = this.array[e * this.data.stride + this.offset + t];
		return this.normalized && (n = this._denormalize(n)), n;
	}
	setComponent(e, t, n) {
		return this.normalized && (n = this._normalize(n)), this.data.array[e * this.data.stride + this.offset + t] = n, this;
	}
	setX(e, t) {
		return this.normalized && (t = this._normalize(t)), this.data.array[e * this.data.stride + this.offset] = t, this;
	}
	setY(e, t) {
		return this.normalized && (t = this._normalize(t)), this.data.array[e * this.data.stride + this.offset + 1] = t, this;
	}
	setZ(e, t) {
		return this.normalized && (t = this._normalize(t)), this.data.array[e * this.data.stride + this.offset + 2] = t, this;
	}
	setW(e, t) {
		return this.normalized && (t = this._normalize(t)), this.data.array[e * this.data.stride + this.offset + 3] = t, this;
	}
	getX(e) {
		let t = this.data.array[e * this.data.stride + this.offset];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	getY(e) {
		let t = this.data.array[e * this.data.stride + this.offset + 1];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	getZ(e) {
		let t = this.data.array[e * this.data.stride + this.offset + 2];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	getW(e) {
		let t = this.data.array[e * this.data.stride + this.offset + 3];
		return this.normalized && (t = this._denormalize(t)), t;
	}
	setXY(e, t, n) {
		return e = e * this.data.stride + this.offset, this.normalized && (t = this._normalize(t), n = this._normalize(n)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this;
	}
	setXYZ(e, t, n, r) {
		return e = e * this.data.stride + this.offset, this.normalized && (t = this._normalize(t), n = this._normalize(n), r = this._normalize(r)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = r, this;
	}
	setXYZW(e, t, n, r, i) {
		return e = e * this.data.stride + this.offset, this.normalized && (t = this._normalize(t), n = this._normalize(n), r = this._normalize(r), i = this._normalize(i)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = r, this.data.array[e + 3] = i, this;
	}
	clone(t) {
		if (t === void 0) {
			ae("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
			let e = [];
			for (let t = 0; t < this.count; t++) {
				let n = t * this.data.stride + this.offset;
				for (let t = 0; t < this.itemSize; t++) e.push(this.data.array[n + t]);
			}
			return new yn(new this.array.constructor(e), this.itemSize, this.normalized);
		}
		return t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}), t.interleavedBuffers[this.data.uuid] === void 0 && (t.interleavedBuffers[this.data.uuid] = this.data.clone(t)), new e(t.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
	}
	toJSON(e) {
		if (e === void 0) {
			ae("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
			let e = [];
			for (let t = 0; t < this.count; t++) {
				let n = t * this.data.stride + this.offset;
				for (let t = 0; t < this.itemSize; t++) e.push(this.data.array[n + t]);
			}
			return {
				itemSize: this.itemSize,
				type: this.array.constructor.name,
				array: e,
				normalized: this.normalized
			};
		}
		return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e)), {
			isInterleavedBufferAttribute: !0,
			itemSize: this.itemSize,
			data: this.data.uuid,
			offset: this.offset,
			normalized: this.normalized
		};
	}
	_denormalize(e) {
		let t = this._normalizationScale;
		return t === void 0 ? Me(e, this.data.array) : Math.max(e / t, -1);
	}
	_normalize(e) {
		let t = this._normalizationScale;
		return t === void 0 ? Ne(e, this.data.array) : Math.round(e * t);
	}
}, zn = /*@__PURE__*/ new G(), Bn = /*@__PURE__*/ new G(), Vn = /*@__PURE__*/ new q(), Hn = class {
	constructor(e = new G(1, 0, 0), t = 0) {
		this.isPlane = !0, this.normal = e, this.constant = t;
	}
	set(e, t) {
		return this.normal.copy(e), this.constant = t, this;
	}
	setComponents(e, t, n, r) {
		return this.normal.set(e, t, n), this.constant = r, this;
	}
	setFromNormalAndCoplanarPoint(e, t) {
		return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
	}
	setFromCoplanarPoints(e, t, n) {
		let r = zn.subVectors(n, t).cross(Bn.subVectors(e, t)).normalize();
		return this.setFromNormalAndCoplanarPoint(r, e), this;
	}
	copy(e) {
		return this.normal.copy(e.normal), this.constant = e.constant, this;
	}
	normalize() {
		let e = 1 / this.normal.length();
		return this.normal.multiplyScalar(e), this.constant *= e, this;
	}
	negate() {
		return this.constant *= -1, this.normal.negate(), this;
	}
	distanceToPoint(e) {
		return this.normal.dot(e) + this.constant;
	}
	distanceToSphere(e) {
		return this.distanceToPoint(e.center) - e.radius;
	}
	projectPoint(e, t) {
		return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
	}
	intersectLine(e, t, n = !0) {
		let r = e.delta(zn), i = this.normal.dot(r);
		if (i === 0) return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
		let a = -(e.start.dot(this.normal) + this.constant) / i;
		return n === !0 && (a < 0 || a > 1) ? null : t.copy(e.start).addScaledVector(r, a);
	}
	intersectsLine(e) {
		let t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
		return t < 0 && n > 0 || n < 0 && t > 0;
	}
	intersectsBox(e) {
		return e.intersectsPlane(this);
	}
	intersectsSphere(e) {
		return e.intersectsPlane(this);
	}
	coplanarPoint(e) {
		return e.copy(this.normal).multiplyScalar(-this.constant);
	}
	applyMatrix4(e, t) {
		let n = t || Vn.getNormalMatrix(e), r = this.coplanarPoint(zn).applyMatrix4(e), i = this.normal.applyMatrix3(n).normalize();
		return this.constant = -r.dot(i), this;
	}
	translate(e) {
		return this.constant -= e.dot(this.normal), this;
	}
	equals(e) {
		return e.normal.equals(this.normal) && e.constant === this.constant;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		return {
			normal: this.normal.toArray(),
			constant: this.constant
		};
	}
	fromJSON(e) {
		return this.normal.fromArray(e.normal), this.constant = e.constant, this;
	}
}, Un = 0, Wn = class extends z {
	constructor() {
		super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Un++ }), this.uuid = V(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new J(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = M, this.stencilZFail = M, this.stencilZPass = M, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
	}
	get alphaTest() {
		return this._alphaTest;
	}
	set alphaTest(e) {
		this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
	}
	onBeforeRender() {}
	onBeforeCompile() {}
	customProgramCacheKey() {
		return this.onBeforeCompile.toString();
	}
	setValues(e) {
		if (e !== void 0) for (let t in e) {
			let n = e[t];
			if (n === void 0) {
				L(`Material: parameter '${t}' has value of undefined.`);
				continue;
			}
			let r = this[t];
			r === void 0 ? L(`Material: '${t}' is not a property of THREE.${this.type}.`) : r && r.isColor ? r.set(n) : r && r.isVector2 && n && n.isVector2 || r && r.isEuler && n && n.isEuler || r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n;
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		t && (e = {
			textures: {},
			images: {}
		});
		let n = { metadata: {
			version: 4.7,
			type: "Material",
			generator: "Material.toJSON"
		} };
		n.uuid = this.uuid, n.type = this.type, n.blending = this.blending, n.side = this.side, n.shadowSide = this.shadowSide, n.vertexColors = this.vertexColors, n.opacity = this.opacity, n.transparent = this.transparent, n.blendSrc = this.blendSrc, n.blendDst = this.blendDst, n.blendEquation = this.blendEquation, n.blendSrcAlpha = this.blendSrcAlpha, n.blendDstAlpha = this.blendDstAlpha, n.blendEquationAlpha = this.blendEquationAlpha, n.blendColor = this.blendColor.getHex(), n.blendAlpha = this.blendAlpha, n.depthFunc = this.depthFunc, n.depthTest = this.depthTest, n.depthWrite = this.depthWrite, n.colorWrite = this.colorWrite, n.clipIntersection = this.clipIntersection, n.clipShadows = this.clipShadows, n.stencilWriteMask = this.stencilWriteMask, n.stencilFunc = this.stencilFunc, n.stencilRef = this.stencilRef, n.stencilFuncMask = this.stencilFuncMask, n.stencilFail = this.stencilFail, n.stencilZFail = this.stencilZFail, n.stencilZPass = this.stencilZPass, n.stencilWrite = this.stencilWrite, n.polygonOffset = this.polygonOffset, n.polygonOffsetFactor = this.polygonOffsetFactor, n.polygonOffsetUnits = this.polygonOffsetUnits, n.dithering = this.dithering, n.alphaTest = this.alphaTest, n.alphaHash = this.alphaHash, n.alphaToCoverage = this.alphaToCoverage, n.premultipliedAlpha = this.premultipliedAlpha, n.forceSinglePass = this.forceSinglePass, n.allowOverride = this.allowOverride, n.visible = this.visible, n.toneMapped = this.toneMapped, n.name = this.name, this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.diffuseRoughness !== void 0 && (n.diffuseRoughness = this.diffuseRoughness), this.diffuseRoughnessMap && this.diffuseRoughnessMap.isTexture && (n.diffuseRoughnessMap = this.diffuseRoughnessMap.toJSON(e).uuid), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.retroreflectivity !== void 0 && (n.retroreflectivity = this.retroreflectivity), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessMinimum !== void 0 && (n.iridescenceThicknessMinimum = this.iridescenceThicknessMinimum), this.iridescenceThicknessMaximum !== void 0 && (n.iridescenceThicknessMaximum = this.iridescenceThicknessMaximum), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), Array.isArray(this.clippingPlanes) && this.clippingPlanes.length > 0 && (n.clippingPlanes = this.clippingPlanes.map((e) => e.toJSON())), this.rotation !== void 0 && (n.rotation = this.rotation), this.depthPacking !== void 0 && (n.depthPacking = this.depthPacking), this.linewidth !== void 0 && (n.linewidth = this.linewidth), this.linecap !== void 0 && (n.linecap = this.linecap), this.linejoin !== void 0 && (n.linejoin = this.linejoin), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.wireframe !== void 0 && (n.wireframe = this.wireframe), this.wireframeLinewidth !== void 0 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== void 0 && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== void 0 && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading !== void 0 && (n.flatShading = this.flatShading), this.fog !== void 0 && (n.fog = this.fog), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
		function r(e) {
			let t = [];
			for (let n in e) {
				let r = e[n];
				delete r.metadata, t.push(r);
			}
			return t;
		}
		if (t) {
			let t = r(e.textures), i = r(e.images);
			t.length > 0 && (n.textures = t), i.length > 0 && (n.images = i);
		}
		return n;
	}
	fromJSON(e, t) {
		if (e.uuid !== void 0 && (this.uuid = e.uuid), e.name !== void 0 && (this.name = e.name), e.color !== void 0 && this.color !== void 0 && this.color.setHex(e.color), e.roughness !== void 0 && (this.roughness = e.roughness), e.metalness !== void 0 && (this.metalness = e.metalness), e.sheen !== void 0 && (this.sheen = e.sheen), e.sheenColor !== void 0 && (this.sheenColor = new J().setHex(e.sheenColor)), e.sheenRoughness !== void 0 && (this.sheenRoughness = e.sheenRoughness), e.emissive !== void 0 && this.emissive !== void 0 && this.emissive.setHex(e.emissive), e.specular !== void 0 && this.specular !== void 0 && this.specular.setHex(e.specular), e.specularIntensity !== void 0 && (this.specularIntensity = e.specularIntensity), e.specularColor !== void 0 && this.specularColor !== void 0 && this.specularColor.setHex(e.specularColor), e.shininess !== void 0 && (this.shininess = e.shininess), e.clearcoat !== void 0 && (this.clearcoat = e.clearcoat), e.clearcoatRoughness !== void 0 && (this.clearcoatRoughness = e.clearcoatRoughness), e.diffuseRoughness !== void 0 && (this.diffuseRoughness = e.diffuseRoughness), e.dispersion !== void 0 && (this.dispersion = e.dispersion), e.retroreflectivity !== void 0 && (this.retroreflectivity = e.retroreflectivity), e.iridescence !== void 0 && (this.iridescence = e.iridescence), e.iridescenceIOR !== void 0 && (this.iridescenceIOR = e.iridescenceIOR), e.iridescenceThicknessMinimum !== void 0 && (this.iridescenceThicknessMinimum = e.iridescenceThicknessMinimum), e.iridescenceThicknessMaximum !== void 0 && (this.iridescenceThicknessMaximum = e.iridescenceThicknessMaximum), e.iridescenceThicknessRange !== void 0 && (this.iridescenceThicknessMinimum = e.iridescenceThicknessRange[0], this.iridescenceThicknessMaximum = e.iridescenceThicknessRange[1]), e.transmission !== void 0 && (this.transmission = e.transmission), e.thickness !== void 0 && (this.thickness = e.thickness), e.attenuationDistance !== void 0 && (this.attenuationDistance = e.attenuationDistance), e.attenuationColor !== void 0 && this.attenuationColor !== void 0 && this.attenuationColor.setHex(e.attenuationColor), e.anisotropy !== void 0 && (this.anisotropy = e.anisotropy), e.anisotropyRotation !== void 0 && (this.anisotropyRotation = e.anisotropyRotation), e.fog !== void 0 && (this.fog = e.fog), e.flatShading !== void 0 && (this.flatShading = e.flatShading), e.blending !== void 0 && (this.blending = e.blending), e.combine !== void 0 && (this.combine = e.combine), e.side !== void 0 && (this.side = e.side), e.shadowSide !== void 0 && (this.shadowSide = e.shadowSide), e.opacity !== void 0 && (this.opacity = e.opacity), e.transparent !== void 0 && (this.transparent = e.transparent), e.alphaTest !== void 0 && (this.alphaTest = e.alphaTest), e.alphaHash !== void 0 && (this.alphaHash = e.alphaHash), e.depthFunc !== void 0 && (this.depthFunc = e.depthFunc), e.depthTest !== void 0 && (this.depthTest = e.depthTest), e.depthWrite !== void 0 && (this.depthWrite = e.depthWrite), e.colorWrite !== void 0 && (this.colorWrite = e.colorWrite), e.clippingPlanes !== void 0 && (this.clippingPlanes = e.clippingPlanes.map((e) => new Hn().fromJSON(e))), e.clipIntersection !== void 0 && (this.clipIntersection = e.clipIntersection), e.clipShadows !== void 0 && (this.clipShadows = e.clipShadows), e.depthPacking !== void 0 && (this.depthPacking = e.depthPacking), e.blendSrc !== void 0 && (this.blendSrc = e.blendSrc), e.blendDst !== void 0 && (this.blendDst = e.blendDst), e.blendEquation !== void 0 && (this.blendEquation = e.blendEquation), e.blendSrcAlpha !== void 0 && (this.blendSrcAlpha = e.blendSrcAlpha), e.blendDstAlpha !== void 0 && (this.blendDstAlpha = e.blendDstAlpha), e.blendEquationAlpha !== void 0 && (this.blendEquationAlpha = e.blendEquationAlpha), e.blendColor !== void 0 && this.blendColor !== void 0 && this.blendColor.setHex(e.blendColor), e.blendAlpha !== void 0 && (this.blendAlpha = e.blendAlpha), e.stencilWriteMask !== void 0 && (this.stencilWriteMask = e.stencilWriteMask), e.stencilFunc !== void 0 && (this.stencilFunc = e.stencilFunc), e.stencilRef !== void 0 && (this.stencilRef = e.stencilRef), e.stencilFuncMask !== void 0 && (this.stencilFuncMask = e.stencilFuncMask), e.stencilFail !== void 0 && (this.stencilFail = e.stencilFail), e.stencilZFail !== void 0 && (this.stencilZFail = e.stencilZFail), e.stencilZPass !== void 0 && (this.stencilZPass = e.stencilZPass), e.stencilWrite !== void 0 && (this.stencilWrite = e.stencilWrite), e.wireframe !== void 0 && (this.wireframe = e.wireframe), e.wireframeLinewidth !== void 0 && (this.wireframeLinewidth = e.wireframeLinewidth), e.wireframeLinecap !== void 0 && (this.wireframeLinecap = e.wireframeLinecap), e.wireframeLinejoin !== void 0 && (this.wireframeLinejoin = e.wireframeLinejoin), e.rotation !== void 0 && (this.rotation = e.rotation), e.linewidth !== void 0 && (this.linewidth = e.linewidth), e.linecap !== void 0 && (this.linecap = e.linecap), e.linejoin !== void 0 && (this.linejoin = e.linejoin), e.dashSize !== void 0 && (this.dashSize = e.dashSize), e.gapSize !== void 0 && (this.gapSize = e.gapSize), e.scale !== void 0 && (this.scale = e.scale), e.polygonOffset !== void 0 && (this.polygonOffset = e.polygonOffset), e.polygonOffsetFactor !== void 0 && (this.polygonOffsetFactor = e.polygonOffsetFactor), e.polygonOffsetUnits !== void 0 && (this.polygonOffsetUnits = e.polygonOffsetUnits), e.dithering !== void 0 && (this.dithering = e.dithering), e.alphaToCoverage !== void 0 && (this.alphaToCoverage = e.alphaToCoverage), e.premultipliedAlpha !== void 0 && (this.premultipliedAlpha = e.premultipliedAlpha), e.forceSinglePass !== void 0 && (this.forceSinglePass = e.forceSinglePass), e.allowOverride !== void 0 && (this.allowOverride = e.allowOverride), e.visible !== void 0 && (this.visible = e.visible), e.toneMapped !== void 0 && (this.toneMapped = e.toneMapped), e.userData !== void 0 && (this.userData = e.userData), e.vertexColors !== void 0 && (this.vertexColors = typeof e.vertexColors == "number" ? e.vertexColors > 0 : e.vertexColors), e.size !== void 0 && (this.size = e.size), e.sizeAttenuation !== void 0 && (this.sizeAttenuation = e.sizeAttenuation), e.map !== void 0 && (this.map = t[e.map] || null), e.matcap !== void 0 && (this.matcap = t[e.matcap] || null), e.alphaMap !== void 0 && (this.alphaMap = t[e.alphaMap] || null), e.bumpMap !== void 0 && (this.bumpMap = t[e.bumpMap] || null), e.bumpScale !== void 0 && (this.bumpScale = e.bumpScale), e.normalMap !== void 0 && (this.normalMap = t[e.normalMap] || null), e.normalMapType !== void 0 && (this.normalMapType = e.normalMapType), e.normalScale !== void 0) {
			let t = e.normalScale;
			Array.isArray(t) === !1 && (t = [t, t]), this.normalScale = new W().fromArray(t);
		}
		return e.displacementMap !== void 0 && (this.displacementMap = t[e.displacementMap] || null), e.displacementScale !== void 0 && (this.displacementScale = e.displacementScale), e.displacementBias !== void 0 && (this.displacementBias = e.displacementBias), e.roughnessMap !== void 0 && (this.roughnessMap = t[e.roughnessMap] || null), e.metalnessMap !== void 0 && (this.metalnessMap = t[e.metalnessMap] || null), e.emissiveMap !== void 0 && (this.emissiveMap = t[e.emissiveMap] || null), e.emissiveIntensity !== void 0 && (this.emissiveIntensity = e.emissiveIntensity), e.specularMap !== void 0 && (this.specularMap = t[e.specularMap] || null), e.specularIntensityMap !== void 0 && (this.specularIntensityMap = t[e.specularIntensityMap] || null), e.specularColorMap !== void 0 && (this.specularColorMap = t[e.specularColorMap] || null), e.envMap !== void 0 && (this.envMap = t[e.envMap] || null), e.envMapRotation !== void 0 && this.envMapRotation.fromArray(e.envMapRotation), e.envMapIntensity !== void 0 && (this.envMapIntensity = e.envMapIntensity), e.reflectivity !== void 0 && (this.reflectivity = e.reflectivity), e.refractionRatio !== void 0 && (this.refractionRatio = e.refractionRatio), e.lightMap !== void 0 && (this.lightMap = t[e.lightMap] || null), e.lightMapIntensity !== void 0 && (this.lightMapIntensity = e.lightMapIntensity), e.aoMap !== void 0 && (this.aoMap = t[e.aoMap] || null), e.aoMapIntensity !== void 0 && (this.aoMapIntensity = e.aoMapIntensity), e.gradientMap !== void 0 && (this.gradientMap = t[e.gradientMap] || null), e.clearcoatMap !== void 0 && (this.clearcoatMap = t[e.clearcoatMap] || null), e.clearcoatRoughnessMap !== void 0 && (this.clearcoatRoughnessMap = t[e.clearcoatRoughnessMap] || null), e.clearcoatNormalMap !== void 0 && (this.clearcoatNormalMap = t[e.clearcoatNormalMap] || null), e.clearcoatNormalScale !== void 0 && (this.clearcoatNormalScale = new W().fromArray(e.clearcoatNormalScale)), e.diffuseRoughnessMap !== void 0 && (this.diffuseRoughnessMap = t[e.diffuseRoughnessMap] || null), e.iridescenceMap !== void 0 && (this.iridescenceMap = t[e.iridescenceMap] || null), e.iridescenceThicknessMap !== void 0 && (this.iridescenceThicknessMap = t[e.iridescenceThicknessMap] || null), e.transmissionMap !== void 0 && (this.transmissionMap = t[e.transmissionMap] || null), e.thicknessMap !== void 0 && (this.thicknessMap = t[e.thicknessMap] || null), e.anisotropyMap !== void 0 && (this.anisotropyMap = t[e.anisotropyMap] || null), e.sheenColorMap !== void 0 && (this.sheenColorMap = t[e.sheenColorMap] || null), e.sheenRoughnessMap !== void 0 && (this.sheenRoughnessMap = t[e.sheenRoughnessMap] || null), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
		let t = e.clippingPlanes, n = null;
		if (t !== null) {
			let e = t.length;
			n = Array(e);
			for (let r = 0; r !== e; ++r) n[r] = t[r].clone();
		}
		return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
}, Gn = class extends Wn {
	constructor(e) {
		super(), this.isSpriteMaterial = !0, this.type = "SpriteMaterial", this.color = new J(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.rotation = e.rotation, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
	}
}, Kn, qn = /*@__PURE__*/ new G(), Jn = /*@__PURE__*/ new G(), Yn = /*@__PURE__*/ new G(), Xn = /*@__PURE__*/ new W(), Zn = /*@__PURE__*/ new W(), Qn = /*@__PURE__*/ new nt(), $n = /*@__PURE__*/ new G(), er = /*@__PURE__*/ new G(), tr = /*@__PURE__*/ new G(), nr = /*@__PURE__*/ new W(), rr = /*@__PURE__*/ new W(), ir = /*@__PURE__*/ new W(), ar = class extends kt {
	constructor(e = new Gn()) {
		if (super(), this.isSprite = !0, this.type = "Sprite", Kn === void 0) {
			Kn = new Pn();
			let e = new Fn(new Float32Array([
				-.5,
				-.5,
				0,
				0,
				0,
				.5,
				-.5,
				0,
				1,
				0,
				.5,
				.5,
				0,
				1,
				1,
				-.5,
				.5,
				0,
				0,
				1
			]), 5);
			Kn.setIndex([
				0,
				1,
				2,
				0,
				2,
				3
			]), Kn.setAttribute("position", new Rn(e, 3, 0, !1)), Kn.setAttribute("uv", new Rn(e, 2, 3, !1));
		}
		this.geometry = Kn, this.material = e, this.center = new W(.5, .5), this.count = 1;
	}
	intersectsFrustum(e) {
		return e.intersectsSprite(this);
	}
	raycast(e, t) {
		e.camera === null && R("Sprite: \"Raycaster.camera\" needs to be set in order to raycast against sprites."), Jn.setFromMatrixScale(this.matrixWorld), Qn.copy(e.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse, this.matrixWorld), Yn.setFromMatrixPosition(this.modelViewMatrix), e.camera.isPerspectiveCamera && this.material.sizeAttenuation === !1 && Jn.multiplyScalar(-Yn.z);
		let n = this.material.rotation, r, i;
		n !== 0 && (i = Math.cos(n), r = Math.sin(n));
		let a = this.center;
		or($n.set(-.5, -.5, 0), Yn, a, Jn, r, i), or(er.set(.5, -.5, 0), Yn, a, Jn, r, i), or(tr.set(.5, .5, 0), Yn, a, Jn, r, i), nr.set(0, 0), rr.set(1, 0), ir.set(1, 1);
		let o = e.ray.intersectTriangle($n, er, tr, !1, qn);
		if (o === null && (or(er.set(-.5, .5, 0), Yn, a, Jn, r, i), rr.set(0, 1), o = e.ray.intersectTriangle($n, tr, er, !1, qn), o === null)) return;
		let s = e.ray.origin.distanceTo(qn);
		s < e.near || s > e.far || t.push({
			distance: s,
			point: qn.clone(),
			uv: $t.getInterpolation(qn, $n, er, tr, nr, rr, ir, new W()),
			face: null,
			object: this
		});
	}
	copy(e, t) {
		return super.copy(e, t), e.center !== void 0 && this.center.copy(e.center), this.material = e.material, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.center = this.center.toArray(), t;
	}
};
function or(e, t, n, r, i, a) {
	Xn.subVectors(e, n).addScalar(.5).multiply(r), i === void 0 ? Zn.copy(Xn) : (Zn.x = a * Xn.x - i * Xn.y, Zn.y = i * Xn.x + a * Xn.y), e.copy(t), e.x += Zn.x, e.y += Zn.y, e.applyMatrix4(Qn);
}
var sr = /*@__PURE__*/ new G(), cr = /*@__PURE__*/ new G(), lr = /*@__PURE__*/ new G(), ur = /*@__PURE__*/ new G(), dr = class {
	constructor(e = new G(), t = new G(0, 0, -1)) {
		this.origin = e, this.direction = t;
	}
	set(e, t) {
		return this.origin.copy(e), this.direction.copy(t), this;
	}
	copy(e) {
		return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
	}
	at(e, t) {
		return t.copy(this.origin).addScaledVector(this.direction, e);
	}
	lookAt(e) {
		return this.direction.copy(e).sub(this.origin).normalize(), this;
	}
	recast(e) {
		return this.origin.copy(this.at(e, sr)), this;
	}
	closestPointToPoint(e, t) {
		t.subVectors(e, this.origin);
		let n = t.dot(this.direction);
		return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
	}
	distanceToPoint(e) {
		return Math.sqrt(this.distanceSqToPoint(e));
	}
	distanceSqToPoint(e) {
		let t = sr.subVectors(e, this.origin).dot(this.direction);
		return t < 0 ? this.origin.distanceToSquared(e) : (sr.copy(this.origin).addScaledVector(this.direction, t), sr.distanceToSquared(e));
	}
	distanceSqToSegment(e, t, n, r) {
		cr.copy(e).add(t).multiplyScalar(.5), lr.copy(t).sub(e).normalize(), ur.copy(this.origin).sub(cr);
		let i = e.distanceTo(t) * .5, a = -this.direction.dot(lr), o = ur.dot(this.direction), s = -ur.dot(lr), c = ur.lengthSq(), l = Math.abs(1 - a * a), u, d, f, p;
		if (l > 0) {
			if (u = a * s - o, d = a * o - s, p = i * l, u >= 0) {
				if (d >= -p) {
					if (d <= p) {
						let e = 1 / l;
						u *= e, d *= e, f = u * (u + a * d + 2 * o) + d * (a * u + d + 2 * s) + c;
					} else d = i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
				} else d = -i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
			} else d <= -p ? (u = Math.max(0, -(-a * i + o)), d = u > 0 ? -i : Math.min(Math.max(-i, -s), i), f = -u * u + d * (d + 2 * s) + c) : d <= p ? (u = 0, d = Math.min(Math.max(-i, -s), i), f = d * (d + 2 * s) + c) : (u = Math.max(0, -(a * i + o)), d = u > 0 ? i : Math.min(Math.max(-i, -s), i), f = -u * u + d * (d + 2 * s) + c);
		} else d = a > 0 ? -i : i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
		return n && n.copy(this.origin).addScaledVector(this.direction, u), r && r.copy(cr).addScaledVector(lr, d), f;
	}
	intersectSphere(e, t) {
		if (e.radius < 0) return null;
		sr.subVectors(e.center, this.origin);
		let n = sr.dot(this.direction), r = sr.dot(sr) - n * n, i = e.radius * e.radius;
		if (r > i) return null;
		let a = Math.sqrt(i - r), o = n - a, s = n + a;
		return s < 0 ? null : o < 0 ? this.at(s, t) : this.at(o, t);
	}
	intersectsSphere(e) {
		return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius;
	}
	distanceToPlane(e) {
		let t = e.normal.dot(this.direction);
		if (t === 0) return e.distanceToPoint(this.origin) === 0 ? 0 : null;
		let n = -(this.origin.dot(e.normal) + e.constant) / t;
		return n >= 0 ? n : null;
	}
	intersectPlane(e, t) {
		let n = this.distanceToPlane(e);
		return n === null ? null : this.at(n, t);
	}
	intersectsPlane(e) {
		let t = e.distanceToPoint(this.origin);
		return t === 0 || e.normal.dot(this.direction) * t < 0;
	}
	intersectBox(e, t) {
		let n, r, i, a, o, s, c = 1 / this.direction.x, l = 1 / this.direction.y, u = 1 / this.direction.z, d = this.origin;
		return c >= 0 ? (n = (e.min.x - d.x) * c, r = (e.max.x - d.x) * c) : (n = (e.max.x - d.x) * c, r = (e.min.x - d.x) * c), l >= 0 ? (i = (e.min.y - d.y) * l, a = (e.max.y - d.y) * l) : (i = (e.max.y - d.y) * l, a = (e.min.y - d.y) * l), n > a || i > r || ((i > n || isNaN(n)) && (n = i), (a < r || isNaN(r)) && (r = a), u >= 0 ? (o = (e.min.z - d.z) * u, s = (e.max.z - d.z) * u) : (o = (e.max.z - d.z) * u, s = (e.min.z - d.z) * u), n > s || o > r) || ((o > n || n !== n) && (n = o), (s < r || r !== r) && (r = s), r < 0) ? null : this.at(n >= 0 ? n : r, t);
	}
	intersectsBox(e) {
		return this.intersectBox(e, sr) !== null;
	}
	intersectTriangle(e, t, n, r, i) {
		let a = this.origin, o = this.direction, s = o.x, c = o.y, l = o.z, u = e.x - a.x, d = e.y - a.y, f = e.z - a.z, p = t.x - a.x, m = t.y - a.y, h = t.z - a.z, g = n.x - a.x, _ = n.y - a.y, v = n.z - a.z, y = Math.abs(s), b = Math.abs(c), x = Math.abs(l), S, C, w, T, E, D, O, k, A, ee, j, M;
		if (y >= b && y >= x ? (w = s, D = u, A = p, M = g, s >= 0 ? (S = c, C = l, T = d, E = f, O = m, k = h, ee = _, j = v) : (S = l, C = c, T = f, E = d, O = h, k = m, ee = v, j = _)) : b >= x ? (w = c, D = d, A = m, M = _, c >= 0 ? (S = l, C = s, T = f, E = u, O = h, k = p, ee = v, j = g) : (S = s, C = l, T = u, E = f, O = p, k = h, ee = g, j = v)) : (w = l, D = f, A = h, M = v, l >= 0 ? (S = s, C = c, T = u, E = d, O = p, k = m, ee = g, j = _) : (S = c, C = s, T = d, E = u, O = m, k = p, ee = _, j = g)), w === 0) return null;
		let N = S / w, te = C / w, ne = 1 / w, P = T - N * D, F = E - te * D, re = O - N * A, ie = k - te * A, I = ee - N * M, ae = j - te * M, oe = I * ie - ae * re, L = P * ae - F * I, R = re * F - ie * P;
		if (r) {
			if (oe < 0 || L < 0 || R < 0) return null;
		} else if ((oe < 0 || L < 0 || R < 0) && (oe > 0 || L > 0 || R > 0)) return null;
		let se = oe + L + R;
		if (se === 0) return null;
		let ce = ne * (oe * D + L * A + R * M);
		return (se > 0 ? ce < 0 : ce > 0) ? null : this.at(ce / se, i);
	}
	applyMatrix4(e) {
		return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
	}
	equals(e) {
		return e.origin.equals(this.origin) && e.direction.equals(this.direction);
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, fr = class extends Wn {
	constructor(e) {
		super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new J(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new ft(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
	}
}, pr = /*@__PURE__*/ new nt(), mr = /*@__PURE__*/ new dr(), hr = /*@__PURE__*/ new En(), gr = /*@__PURE__*/ new G(), _r = /*@__PURE__*/ new G(), vr = /*@__PURE__*/ new G(), yr = /*@__PURE__*/ new G(), br = /*@__PURE__*/ new G(), xr = /*@__PURE__*/ new G(), Sr = /*@__PURE__*/ new G(), Cr = /*@__PURE__*/ new G(), Y = class extends kt {
	constructor(e = new Pn(), t = new fr()) {
		super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
	}
	copy(e, t) {
		return super.copy(e, t), this.morphTargetInfluences = e.morphTargetInfluences === void 0 ? void 0 : e.morphTargetInfluences.slice(), this.morphTargetDictionary = e.morphTargetDictionary === void 0 ? void 0 : Object.assign({}, e.morphTargetDictionary), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
	}
	updateMorphTargets() {
		let e = this.geometry.morphAttributes, t = Object.keys(e);
		if (t.length > 0) {
			let n = e[t[0]];
			if (n !== void 0) {
				this.morphTargetInfluences = [], this.morphTargetDictionary = {};
				for (let e = 0, t = n.length; e < t; e++) {
					let t = n[e].name || String(e);
					this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
				}
			}
		}
	}
	getVertexPosition(e, t) {
		let n = this.geometry, r = n.attributes.position, i = n.morphAttributes.position, a = n.morphTargetsRelative;
		t.fromBufferAttribute(r, e);
		let o = this.morphTargetInfluences;
		if (i && o) {
			xr.set(0, 0, 0);
			for (let n = 0, r = i.length; n < r; n++) {
				let r = o[n], s = i[n];
				r !== 0 && (br.fromBufferAttribute(s, e), a ? xr.addScaledVector(br, r) : xr.addScaledVector(br.sub(t), r));
			}
			t.add(xr);
		}
		return t;
	}
	intersectsFrustum(e) {
		return e.intersectsObject(this);
	}
	raycast(e, t) {
		let n = this.geometry, r = this.material, i = this.matrixWorld;
		r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), hr.copy(n.boundingSphere), hr.applyMatrix4(i), mr.copy(e.ray).recast(e.near), hr.containsPoint(mr.origin) === !1 && (mr.intersectSphere(hr, gr) === null || mr.origin.distanceToSquared(gr) > (e.far - e.near) ** 2) || (pr.copy(i).invert(), mr.copy(e.ray).applyMatrix4(pr), (n.boundingBox === null || mr.intersectsBox(n.boundingBox) !== !1) && this._computeIntersections(e, t, mr)));
	}
	_computeIntersections(e, t, n) {
		let r, i = this.geometry, a = this.material, o = i.index, s = i.attributes.position, c = i.attributes.uv, l = i.attributes.uv1, u = i.attributes.normal, d = i.groups, f = i.drawRange;
		if (o !== null) {
			if (Array.isArray(a)) for (let i = 0, s = d.length; i < s; i++) {
				let s = d[i], p = a[s.materialIndex], m = Math.max(s.start, f.start), h = Math.min(o.count, Math.min(s.start + s.count, f.start + f.count));
				for (let i = m, a = h; i < a; i += 3) {
					let a = o.getX(i), d = o.getX(i + 1), f = o.getX(i + 2);
					r = Tr(this, p, e, n, c, l, u, a, d, f), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = s.materialIndex, t.push(r));
				}
			}
			else {
				let i = Math.max(0, f.start), s = Math.min(o.count, f.start + f.count);
				for (let d = i, f = s; d < f; d += 3) {
					let i = o.getX(d), s = o.getX(d + 1), f = o.getX(d + 2);
					r = Tr(this, a, e, n, c, l, u, i, s, f), r && (r.faceIndex = Math.floor(d / 3), t.push(r));
				}
			}
		} else if (s !== void 0) {
			if (Array.isArray(a)) for (let i = 0, o = d.length; i < o; i++) {
				let o = d[i], p = a[o.materialIndex], m = Math.max(o.start, f.start), h = Math.min(s.count, Math.min(o.start + o.count, f.start + f.count));
				for (let i = m, a = h; i < a; i += 3) {
					let a = i, s = i + 1, d = i + 2;
					r = Tr(this, p, e, n, c, l, u, a, s, d), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = o.materialIndex, t.push(r));
				}
			}
			else {
				let i = Math.max(0, f.start), o = Math.min(s.count, f.start + f.count);
				for (let s = i, d = o; s < d; s += 3) {
					let i = s, o = s + 1, d = s + 2;
					r = Tr(this, a, e, n, c, l, u, i, o, d), r && (r.faceIndex = Math.floor(s / 3), t.push(r));
				}
			}
		}
	}
};
function wr(e, t, n, r, i, a, o, s) {
	let c;
	if (c = t.side === 1 ? r.intersectTriangle(o, a, i, !0, s) : r.intersectTriangle(i, a, o, t.side === 0, s), c === null) return null;
	Cr.copy(s), Cr.applyMatrix4(e.matrixWorld);
	let l = n.ray.origin.distanceTo(Cr);
	return l < n.near || l > n.far ? null : {
		distance: l,
		point: Cr.clone(),
		object: e
	};
}
function Tr(e, t, n, r, i, a, o, s, c, l) {
	e.getVertexPosition(s, _r), e.getVertexPosition(c, vr), e.getVertexPosition(l, yr);
	let u = wr(e, t, n, r, _r, vr, yr, Sr);
	if (u) {
		let e = new G();
		$t.getBarycoord(Sr, _r, vr, yr, e), i && (u.uv = $t.getInterpolatedAttribute(i, s, c, l, e, new W())), a && (u.uv1 = $t.getInterpolatedAttribute(a, s, c, l, e, new W())), o && (u.normal = $t.getInterpolatedAttribute(o, s, c, l, e, new G()), u.normal.dot(r.direction) > 0 && u.normal.multiplyScalar(-1));
		let t = {
			a: s,
			b: c,
			c: l,
			normal: new G(),
			materialIndex: 0
		};
		$t.getNormal(_r, vr, yr, t.normal), u.face = t, u.barycoord = e;
	}
	return u;
}
var Er = class extends Xe {
	constructor(e = null, t = 1, n = 1, i, a, o, s, c, l = r, u = r, d, f) {
		super(null, o, s, c, l, u, i, a, d, f), this.isDataTexture = !0, this.image = {
			data: e,
			width: t,
			height: n
		}, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
	}
}, Dr = class extends yn {
	constructor(e, t, n, r = 1) {
		super(e, t, n), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = r;
	}
	copy(e) {
		return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e;
	}
}, Or = /*@__PURE__*/ new nt(), kr = /*@__PURE__*/ new nt(), Ar = [], jr = /*@__PURE__*/ new en(), Mr = /*@__PURE__*/ new nt(), Nr = /*@__PURE__*/ new Y(), Pr = /*@__PURE__*/ new En(), Fr = class extends Y {
	constructor(e, t, n) {
		super(e, t), this.isInstancedMesh = !0, this.instanceMatrix = new Dr(new Float32Array(n * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null;
		for (let e = 0; e < n; e++) this.setMatrixAt(e, Mr);
	}
	computeBoundingBox() {
		let e = this.geometry, t = this.count;
		this.boundingBox === null && (this.boundingBox = new en()), e.boundingBox === null && e.computeBoundingBox(), this.boundingBox.makeEmpty();
		for (let n = 0; n < t; n++) this.getMatrixAt(n, Or), jr.copy(e.boundingBox).applyMatrix4(Or), this.boundingBox.union(jr);
	}
	computeBoundingSphere() {
		let e = this.geometry, t = this.count;
		this.boundingSphere === null && (this.boundingSphere = new En()), e.boundingSphere === null && e.computeBoundingSphere(), this.boundingSphere.makeEmpty();
		for (let n = 0; n < t; n++) this.getMatrixAt(n, Or), Pr.copy(e.boundingSphere).applyMatrix4(Or), this.boundingSphere.union(Pr);
	}
	copy(e, t) {
		return super.copy(e, t), this.instanceMatrix.copy(e.instanceMatrix), this.morphTexture = e.morphTexture === null ? null : e.morphTexture.clone(), this.instanceColor = e.instanceColor === null ? null : e.instanceColor.clone(), this.count = e.count, this.boundingBox = e.boundingBox === null ? null : e.boundingBox.clone(), this.boundingSphere = e.boundingSphere === null ? null : e.boundingSphere.clone(), this;
	}
	getColorAt(e, t) {
		return this.instanceColor === null ? t.setRGB(1, 1, 1) : t.fromArray(this.instanceColor.array, e * 3);
	}
	getMatrixAt(e, t) {
		return t.fromArray(this.instanceMatrix.array, e * 16);
	}
	getMorphAt(e, t) {
		let n = t.morphTargetInfluences, r = this.morphTexture.source.data.data, i = e * (n.length + 1) + 1;
		for (let e = 0; e < n.length; e++) n[e] = r[i + e];
	}
	raycast(e, t) {
		let n = this.matrixWorld, r = this.count;
		if (Nr.geometry = this.geometry, Nr.material = this.material, Nr.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), Pr.copy(this.boundingSphere), Pr.applyMatrix4(n), e.ray.intersectsSphere(Pr) !== !1)) for (let i = 0; i < r; i++) {
			this.getMatrixAt(i, Or), kr.multiplyMatrices(n, Or), Nr.matrixWorld = kr, Nr.raycast(e, Ar);
			for (let e = 0, n = Ar.length; e < n; e++) {
				let n = Ar[e];
				n.instanceId = i, n.object = this, t.push(n);
			}
			Ar.length = 0;
		}
	}
	setColorAt(e, t) {
		return this.instanceColor === null && (this.instanceColor = new Dr(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), t.toArray(this.instanceColor.array, e * 3), this;
	}
	setMatrixAt(e, t) {
		return t.toArray(this.instanceMatrix.array, e * 16), this;
	}
	setMorphAt(e, t) {
		let n = t.morphTargetInfluences, r = n.length + 1;
		this.morphTexture === null && (this.morphTexture = new Er(new Float32Array(r * this.count), r, this.count, _, l));
		let i = this.morphTexture.source.data.data, a = 0;
		for (let e = 0; e < n.length; e++) a += n[e];
		let o = this.geometry.morphTargetsRelative ? 1 : 1 - a, s = r * e;
		return i[s] = o, i.set(n, s + 1), this;
	}
	updateMorphTargets() {}
	dispose() {
		super.dispose(), this.instanceMatrix.dispose(), this.instanceColor !== null && this.instanceColor.dispose(), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null);
	}
}, Ir = /*@__PURE__*/ new En(), Lr = /*@__PURE__*/ new W(.5, .5), Rr = /*@__PURE__*/ new G(), zr = class {
	constructor(e = new Hn(), t = new Hn(), n = new Hn(), r = new Hn(), i = new Hn(), a = new Hn()) {
		this.planes = [
			e,
			t,
			n,
			r,
			i,
			a
		];
	}
	set(e, t, n, r, i, a) {
		let o = this.planes;
		return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(r), o[4].copy(i), o[5].copy(a), this;
	}
	copy(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) t[n].copy(e.planes[n]);
		return this;
	}
	setFromProjectionMatrix(e, t = ne, n = !1) {
		let r = this.planes, i = e.elements, a = i[0], o = i[1], s = i[2], c = i[3], l = i[4], u = i[5], d = i[6], f = i[7], p = i[8], m = i[9], h = i[10], g = i[11], _ = i[12], v = i[13], y = i[14], b = i[15];
		if (r[0].setComponents(c - a, f - l, g - p, b - _).normalize(), r[1].setComponents(c + a, f + l, g + p, b + _).normalize(), r[2].setComponents(c + o, f + u, g + m, b + v).normalize(), r[3].setComponents(c - o, f - u, g - m, b - v).normalize(), n) r[4].setComponents(s, d, h, y).normalize(), r[5].setComponents(c - s, f - d, g - h, b - y).normalize();
		else if (r[4].setComponents(c - s, f - d, g - h, b - y).normalize(), t === 2e3) r[5].setComponents(c + s, f + d, g + h, b + y).normalize();
		else if (t === 2001) r[5].setComponents(s, d, h, y).normalize();
		else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
		return this;
	}
	intersectsObject(e) {
		if (e.boundingSphere !== void 0) e.boundingSphere === null && e.computeBoundingSphere(), Ir.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
		else {
			let t = e.geometry;
			t.boundingSphere === null && t.computeBoundingSphere(), Ir.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
		}
		return this.intersectsSphere(Ir);
	}
	intersectsSprite(e) {
		return Ir.center.set(0, 0, 0), Ir.radius = .7071067811865476 + Lr.distanceTo(e.center), Ir.applyMatrix4(e.matrixWorld), this.intersectsSphere(Ir);
	}
	intersectsSphere(e) {
		let t = this.planes, n = e.center, r = -e.radius;
		for (let e = 0; e < 6; e++) if (t[e].distanceToPoint(n) < r) return !1;
		return !0;
	}
	intersectsBox(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) {
			let r = t[n];
			if (Rr.x = r.normal.x > 0 ? e.max.x : e.min.x, Rr.y = r.normal.y > 0 ? e.max.y : e.min.y, Rr.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(Rr) < 0) return !1;
		}
		return !0;
	}
	containsPoint(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) if (t[n].distanceToPoint(e) < 0) return !1;
		return !0;
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, Br = /*@__PURE__*/ new nt(), Vr = class e {
	constructor() {
		this.coordinateSystem = ne, this._frustums = [], this._count = 0;
	}
	setFromArrayCamera(e) {
		let t = e.cameras, n = this._frustums;
		for (let e = 0; e < t.length; e++) {
			let r = t[e];
			Br.multiplyMatrices(r.projectionMatrix, r.matrixWorldInverse), n[e] === void 0 && (n[e] = new zr()), n[e].setFromProjectionMatrix(Br, r.coordinateSystem, r.reversedDepth);
		}
		return this._count = t.length, this;
	}
	getFrustum(e) {
		return this._frustums[e];
	}
	intersectsObject(e) {
		let t = this._frustums;
		for (let n = 0; n < this._count; n++) if (t[n].intersectsObject(e)) return !0;
		return !1;
	}
	intersectsSprite(e) {
		let t = this._frustums;
		for (let n = 0; n < this._count; n++) if (t[n].intersectsSprite(e)) return !0;
		return !1;
	}
	intersectsSphere(e) {
		let t = this._frustums;
		for (let n = 0; n < this._count; n++) if (t[n].intersectsSphere(e)) return !0;
		return !1;
	}
	intersectsBox(e) {
		let t = this._frustums;
		for (let n = 0; n < this._count; n++) if (t[n].intersectsBox(e)) return !0;
		return !1;
	}
	containsPoint(e) {
		let t = this._frustums;
		for (let n = 0; n < this._count; n++) if (t[n].containsPoint(e)) return !0;
		return !1;
	}
	copy(e) {
		this.coordinateSystem = e.coordinateSystem;
		let t = this._frustums, n = e._frustums;
		for (let r = 0; r < e._count; r++) t[r] === void 0 && (t[r] = new zr()), t[r].copy(n[r]);
		return this._count = e._count, this;
	}
	clone() {
		return new e().copy(this);
	}
}, Hr = class extends Wn {
	constructor(e) {
		super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new J(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this;
	}
}, Ur = /*@__PURE__*/ new G(), Wr = /*@__PURE__*/ new G(), Gr = /*@__PURE__*/ new nt(), Kr = /*@__PURE__*/ new dr(), qr = /*@__PURE__*/ new En(), Jr = /*@__PURE__*/ new G(), Yr = /*@__PURE__*/ new G(), Xr = class extends kt {
	constructor(e = new Pn(), t = new Hr()) {
		super(), this.isLine = !0, this.type = "Line", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
	}
	copy(e, t) {
		return super.copy(e, t), this.morphTargetInfluences = e.morphTargetInfluences === void 0 ? void 0 : e.morphTargetInfluences.slice(), this.morphTargetDictionary = e.morphTargetDictionary === void 0 ? void 0 : Object.assign({}, e.morphTargetDictionary), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
	}
	computeLineDistances() {
		let e = this.geometry;
		if (e.index === null) {
			let t = e.attributes.position, n = [0];
			for (let e = 1, r = t.count; e < r; e++) Ur.fromBufferAttribute(t, e - 1), Wr.fromBufferAttribute(t, e), n[e] = n[e - 1], n[e] += Ur.distanceTo(Wr);
			e.setAttribute("lineDistance", new Sn(n, 1));
		} else L("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
		return this;
	}
	intersectsFrustum(e) {
		return e.intersectsObject(this);
	}
	raycast(e, t) {
		let n = this.geometry, r = this.matrixWorld, i = e.params.Line.threshold, a = n.drawRange;
		if (n.boundingSphere === null && n.computeBoundingSphere(), qr.copy(n.boundingSphere), qr.applyMatrix4(r), qr.radius += i, e.ray.intersectsSphere(qr) === !1) return;
		Gr.copy(r).invert(), Kr.copy(e.ray).applyMatrix4(Gr);
		let o = i / ((this.scale.x + this.scale.y + this.scale.z) / 3), s = o * o, c = this.isLineSegments ? 2 : 1, l = n.index, u = n.attributes.position;
		if (l !== null) {
			let n = Math.max(0, a.start), r = Math.min(l.count, a.start + a.count);
			for (let i = n, a = r - 1; i < a; i += c) {
				let n = l.getX(i), r = l.getX(i + 1), a = Zr(this, e, Kr, s, n, r, i);
				a && t.push(a);
			}
			if (this.isLineLoop) {
				let i = l.getX(r - 1), a = l.getX(n), o = Zr(this, e, Kr, s, i, a, r - 1);
				o && t.push(o);
			}
		} else {
			let n = Math.max(0, a.start), r = Math.min(u.count, a.start + a.count);
			for (let i = n, a = r - 1; i < a; i += c) {
				let n = Zr(this, e, Kr, s, i, i + 1, i);
				n && t.push(n);
			}
			if (this.isLineLoop) {
				let i = Zr(this, e, Kr, s, r - 1, n, r - 1);
				i && t.push(i);
			}
		}
	}
	updateMorphTargets() {
		let e = this.geometry.morphAttributes, t = Object.keys(e);
		if (t.length > 0) {
			let n = e[t[0]];
			if (n !== void 0) {
				this.morphTargetInfluences = [], this.morphTargetDictionary = {};
				for (let e = 0, t = n.length; e < t; e++) {
					let t = n[e].name || String(e);
					this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
				}
			}
		}
	}
};
function Zr(e, t, n, r, i, a, o) {
	let s = e.geometry.attributes.position;
	if (Ur.fromBufferAttribute(s, i), Wr.fromBufferAttribute(s, a), n.distanceSqToSegment(Ur, Wr, Jr, Yr) > r) return;
	Jr.applyMatrix4(e.matrixWorld);
	let c = t.ray.origin.distanceTo(Jr);
	if (!(c < t.near || c > t.far)) return {
		distance: c,
		point: Yr.clone().applyMatrix4(e.matrixWorld),
		index: o,
		face: null,
		faceIndex: null,
		barycoord: null,
		object: e
	};
}
var Qr = /*@__PURE__*/ new G(), $r = /*@__PURE__*/ new G(), ei = class extends Xr {
	constructor(e, t) {
		super(e, t), this.isLineSegments = !0, this.type = "LineSegments";
	}
	computeLineDistances() {
		let e = this.geometry;
		if (e.index === null) {
			let t = e.attributes.position, n = [];
			for (let e = 0, r = t.count; e < r; e += 2) Qr.fromBufferAttribute(t, e), $r.fromBufferAttribute(t, e + 1), n[e] = e === 0 ? 0 : n[e - 1], n[e + 1] = n[e] + Qr.distanceTo($r);
			e.setAttribute("lineDistance", new Sn(n, 1));
		} else L("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
		return this;
	}
}, ti = class extends Wn {
	constructor(e) {
		super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new J(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
	}
}, ni = /*@__PURE__*/ new nt(), ri = /*@__PURE__*/ new dr(), ii = /*@__PURE__*/ new En(), ai = /*@__PURE__*/ new G(), oi = class extends kt {
	constructor(e = new Pn(), t = new ti()) {
		super(), this.isPoints = !0, this.type = "Points", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
	}
	copy(e, t) {
		return super.copy(e, t), this.morphTargetInfluences = e.morphTargetInfluences === void 0 ? void 0 : e.morphTargetInfluences.slice(), this.morphTargetDictionary = e.morphTargetDictionary === void 0 ? void 0 : Object.assign({}, e.morphTargetDictionary), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
	}
	intersectsFrustum(e) {
		return e.intersectsObject(this);
	}
	raycast(e, t) {
		let n = this.geometry, r = this.matrixWorld, i = e.params.Points.threshold, a = n.drawRange;
		if (n.boundingSphere === null && n.computeBoundingSphere(), ii.copy(n.boundingSphere), ii.applyMatrix4(r), ii.radius += i, e.ray.intersectsSphere(ii) === !1) return;
		ni.copy(r).invert(), ri.copy(e.ray).applyMatrix4(ni);
		let o = i / ((this.scale.x + this.scale.y + this.scale.z) / 3), s = o * o, c = n.index, l = n.attributes.position;
		if (c !== null) {
			let n = Math.max(0, a.start), i = Math.min(c.count, a.start + a.count);
			for (let a = n, o = i; a < o; a++) {
				let n = c.getX(a);
				ai.fromBufferAttribute(l, n), si(ai, n, s, r, e, t, this);
			}
		} else {
			let n = Math.max(0, a.start), i = Math.min(l.count, a.start + a.count);
			for (let a = n, o = i; a < o; a++) ai.fromBufferAttribute(l, a), si(ai, a, s, r, e, t, this);
		}
	}
	updateMorphTargets() {
		let e = this.geometry.morphAttributes, t = Object.keys(e);
		if (t.length > 0) {
			let n = e[t[0]];
			if (n !== void 0) {
				this.morphTargetInfluences = [], this.morphTargetDictionary = {};
				for (let e = 0, t = n.length; e < t; e++) {
					let t = n[e].name || String(e);
					this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
				}
			}
		}
	}
};
function si(e, t, n, r, i, a, o) {
	let s = ri.distanceSqToPoint(e);
	if (s < n) {
		let n = new G();
		ri.closestPointToPoint(e, n), n.applyMatrix4(r);
		let c = i.ray.origin.distanceTo(n);
		if (c < i.near || c > i.far) return;
		a.push({
			distance: c,
			distanceToRay: Math.sqrt(s),
			point: n,
			index: t,
			face: null,
			faceIndex: null,
			barycoord: null,
			object: o
		});
	}
}
var ci = class extends Xe {
	constructor(e = [], t = 301, n, r, i, a, o, s, c, l) {
		super(e, t, n, r, i, a, o, s, c, l), this.isCubeTexture = !0, this.flipY = !1;
	}
	get images() {
		return this.image;
	}
	set images(e) {
		this.image = e;
	}
}, li = class extends Xe {
	constructor(e, t, n, r, i, a, o, s, c) {
		super(e, t, n, r, i, a, o, s, c), this.isCanvasTexture = !0, this.needsUpdate = !0;
	}
}, ui = class extends Xe {
	constructor(e, t, n = c, i, a, o, s = r, l = r, u, d = h, f = 1) {
		if (d !== 1026 && d !== 1027) throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
		super({
			width: e,
			height: t,
			depth: f
		}, i, a, o, s, l, d, n, u), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
	}
	copy(e) {
		return super.copy(e), this.source = new Ke(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.compareFunction = this.compareFunction, t;
	}
}, di = class extends ui {
	constructor(e, t = c, n = 301, i, a, o = r, s = r, l, u = h) {
		let d = {
			width: e,
			height: e,
			depth: 1
		}, f = [
			d,
			d,
			d,
			d,
			d,
			d
		];
		super(e, e, t, n, i, a, o, s, l, u), this.image = f, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
	}
	get images() {
		return this.image;
	}
	set images(e) {
		this.image = e;
	}
}, fi = class extends Xe {
	constructor(e = null) {
		super(), this.sourceTexture = e, this.isExternalTexture = !0;
	}
	copy(e) {
		return super.copy(e), this.sourceTexture = e.sourceTexture, this;
	}
}, pi = class e extends Pn {
	constructor(e = 1, t = 1, n = 1, r = 1, i = 1, a = 1) {
		super(), this.type = "BoxGeometry", this.parameters = {
			width: e,
			height: t,
			depth: n,
			widthSegments: r,
			heightSegments: i,
			depthSegments: a
		};
		let o = this;
		r = Math.floor(r), i = Math.floor(i), a = Math.floor(a);
		let s = [], c = [], l = [], u = [], d = 0, f = 0;
		p("z", "y", "x", -1, -1, n, t, e, a, i, 0), p("z", "y", "x", 1, -1, n, t, -e, a, i, 1), p("x", "z", "y", 1, 1, e, n, t, r, a, 2), p("x", "z", "y", 1, -1, e, n, -t, r, a, 3), p("x", "y", "z", 1, -1, e, t, n, r, i, 4), p("x", "y", "z", -1, -1, e, t, -n, r, i, 5), this.setIndex(s), this.setAttribute("position", new Sn(c, 3)), this.setAttribute("normal", new Sn(l, 3)), this.setAttribute("uv", new Sn(u, 2));
		function p(e, t, n, r, i, a, p, m, h, g, _) {
			let v = a / h, y = p / g, b = a / 2, x = p / 2, S = m / 2, C = h + 1, w = g + 1, T = 0, E = 0, D = new G();
			for (let a = 0; a < w; a++) {
				let o = a * y - x;
				for (let s = 0; s < C; s++) D[e] = (s * v - b) * r, D[t] = o * i, D[n] = S, c.push(D.x, D.y, D.z), D[e] = 0, D[t] = 0, D[n] = m > 0 ? 1 : -1, l.push(D.x, D.y, D.z), u.push(s / h), u.push(1 - a / g), T += 1;
			}
			for (let e = 0; e < g; e++) for (let t = 0; t < h; t++) {
				let n = d + t + C * e, r = d + t + C * (e + 1), i = d + (t + 1) + C * (e + 1), a = d + (t + 1) + C * e;
				s.push(n, r, a), s.push(r, i, a), E += 6;
			}
			o.addGroup(f, E, _), f += E, d += T;
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
	}
}, mi = class e extends Pn {
	constructor(e = 1, t = 32, n = 0, r = Math.PI * 2) {
		super(), this.type = "CircleGeometry", this.parameters = {
			radius: e,
			segments: t,
			thetaStart: n,
			thetaLength: r
		}, t = Math.max(3, t);
		let i = [], a = [], o = [], s = [], c = new G(), l = new W();
		a.push(0, 0, 0), o.push(0, 0, 1), s.push(.5, .5);
		for (let i = 0, u = 3; i <= t; i++, u += 3) {
			let d = n + i / t * r;
			c.x = e * Math.cos(d), c.y = e * Math.sin(d), a.push(c.x, c.y, c.z), o.push(0, 0, 1), l.x = (a[u] / e + 1) / 2, l.y = (a[u + 1] / e + 1) / 2, s.push(l.x, l.y);
		}
		for (let e = 1; e <= t; e++) i.push(e, e + 1, 0);
		this.setIndex(i), this.setAttribute("position", new Sn(a, 3)), this.setAttribute("normal", new Sn(o, 3)), this.setAttribute("uv", new Sn(s, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radius, t.segments, t.thetaStart, t.thetaLength);
	}
}, hi = class e extends Pn {
	constructor(e = 1, t = 1, n = 1, r = 32, i = 1, a = !1, o = 0, s = Math.PI * 2) {
		super(), this.type = "CylinderGeometry", this.parameters = {
			radiusTop: e,
			radiusBottom: t,
			height: n,
			radialSegments: r,
			heightSegments: i,
			openEnded: a,
			thetaStart: o,
			thetaLength: s
		};
		let c = this;
		r = Math.floor(r), i = Math.floor(i);
		let l = [], u = [], d = [], f = [], p = 0, m = [], h = n / 2, g = 0;
		_(), a === !1 && (e > 0 && v(!0), t > 0 && v(!1)), this.setIndex(l), this.setAttribute("position", new Sn(u, 3)), this.setAttribute("normal", new Sn(d, 3)), this.setAttribute("uv", new Sn(f, 2));
		function _() {
			let a = new G(), _ = new G(), v = 0, y = (t - e) / n;
			for (let c = 0; c <= i; c++) {
				let l = [], g = c / i, v = g * (t - e) + e;
				for (let e = 0; e <= r; e++) {
					let t = e / r, i = t * s + o, c = Math.sin(i), m = Math.cos(i);
					_.x = v * c, _.y = -g * n + h, _.z = v * m, u.push(_.x, _.y, _.z), a.set(c, y, m).normalize(), d.push(a.x, a.y, a.z), f.push(t, 1 - g), l.push(p++);
				}
				m.push(l);
			}
			for (let n = 0; n < r; n++) for (let r = 0; r < i; r++) {
				let a = m[r][n], o = m[r + 1][n], s = m[r + 1][n + 1], c = m[r][n + 1];
				(e > 0 || r !== 0) && (l.push(a, o, c), v += 3), (t > 0 || r !== i - 1) && (l.push(o, s, c), v += 3);
			}
			c.addGroup(g, v, 0), g += v;
		}
		function v(n) {
			let i = p, a = new W(), m = new G(), _ = 0, v = n === !0 ? e : t, y = n === !0 ? 1 : -1;
			for (let e = 1; e <= r; e++) u.push(0, h * y, 0), d.push(0, y, 0), f.push(.5, .5), p++;
			let b = p;
			for (let e = 0; e <= r; e++) {
				let t = e / r * s + o, n = Math.cos(t), i = Math.sin(t);
				m.x = v * i, m.y = h * y, m.z = v * n, u.push(m.x, m.y, m.z), d.push(0, y, 0), a.x = n * .5 + .5, a.y = i * .5 * y + .5, f.push(a.x, a.y), p++;
			}
			for (let e = 0; e < r; e++) {
				let t = i + e, r = b + e;
				n === !0 ? l.push(r, r + 1, t) : l.push(r + 1, r, t), _ += 3;
			}
			c.addGroup(g, _, n === !0 ? 1 : 2), g += _;
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
	}
}, gi = class e extends hi {
	constructor(e = 1, t = 1, n = 32, r = 1, i = !1, a = 0, o = Math.PI * 2) {
		super(0, e, t, n, r, i, a, o), this.type = "ConeGeometry", this.parameters = {
			radius: e,
			height: t,
			radialSegments: n,
			heightSegments: r,
			openEnded: i,
			thetaStart: a,
			thetaLength: o
		};
	}
	static fromJSON(t) {
		return new e(t.radius, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
	}
}, _i = class e extends Pn {
	constructor(e = [], t = [], n = 1, r = 0) {
		super(), this.type = "PolyhedronGeometry", this.parameters = {
			vertices: e,
			indices: t,
			radius: n,
			detail: r
		};
		let i = [], a = [];
		o(r), c(n), l(), this.setAttribute("position", new Sn(i, 3)), this.setAttribute("normal", new Sn(i.slice(), 3)), this.setAttribute("uv", new Sn(a, 2)), r === 0 ? this.computeVertexNormals() : this.normalizeNormals();
		function o(e) {
			let n = new G(), r = new G(), i = new G();
			for (let a = 0; a < t.length; a += 3) f(t[a + 0], n), f(t[a + 1], r), f(t[a + 2], i), s(n, r, i, e);
		}
		function s(e, t, n, r) {
			let i = r + 1, a = [];
			for (let r = 0; r <= i; r++) {
				a[r] = [];
				let o = e.clone().lerp(n, r / i), s = t.clone().lerp(n, r / i), c = i - r;
				for (let e = 0; e <= c; e++) e === 0 && r === i ? a[r][e] = o : a[r][e] = o.clone().lerp(s, e / c);
			}
			for (let e = 0; e < i; e++) for (let t = 0; t < 2 * (i - e) - 1; t++) {
				let n = Math.floor(t / 2);
				t % 2 == 0 ? (d(a[e][n + 1]), d(a[e + 1][n]), d(a[e][n])) : (d(a[e][n + 1]), d(a[e + 1][n + 1]), d(a[e + 1][n]));
			}
		}
		function c(e) {
			let t = new G();
			for (let n = 0; n < i.length; n += 3) t.x = i[n + 0], t.y = i[n + 1], t.z = i[n + 2], t.normalize().multiplyScalar(e), i[n + 0] = t.x, i[n + 1] = t.y, i[n + 2] = t.z;
		}
		function l() {
			let e = new G();
			for (let t = 0; t < i.length; t += 3) {
				e.x = i[t + 0], e.y = i[t + 1], e.z = i[t + 2];
				let n = h(e) / 2 / Math.PI + .5, r = g(e) / Math.PI + .5;
				a.push(n, 1 - r);
			}
			p(), u();
		}
		function u() {
			for (let e = 0; e < a.length; e += 6) {
				let t = a[e + 0], n = a[e + 2], r = a[e + 4];
				Math.max(t, n, r) > .9 && Math.min(t, n, r) < .1 && (t < .2 && (a[e + 0] += 1), n < .2 && (a[e + 2] += 1), r < .2 && (a[e + 4] += 1));
			}
		}
		function d(e) {
			i.push(e.x, e.y, e.z);
		}
		function f(t, n) {
			let r = t * 3;
			n.x = e[r + 0], n.y = e[r + 1], n.z = e[r + 2];
		}
		function p() {
			let e = new G(), t = new G(), n = new G(), r = new G(), o = new W(), s = new W(), c = new W();
			for (let l = 0, u = 0; l < i.length; l += 9, u += 6) {
				e.set(i[l + 0], i[l + 1], i[l + 2]), t.set(i[l + 3], i[l + 4], i[l + 5]), n.set(i[l + 6], i[l + 7], i[l + 8]), o.set(a[u + 0], a[u + 1]), s.set(a[u + 2], a[u + 3]), c.set(a[u + 4], a[u + 5]), r.copy(e).add(t).add(n).divideScalar(3);
				let d = h(r);
				m(o, u + 0, e, d), m(s, u + 2, t, d), m(c, u + 4, n, d);
			}
		}
		function m(e, t, n, r) {
			r < 0 && e.x === 1 && (a[t] = e.x - 1), n.x === 0 && n.z === 0 && (a[t] = r / 2 / Math.PI + .5);
		}
		function h(e) {
			return Math.atan2(e.z, -e.x);
		}
		function g(e) {
			return Math.atan2(-e.y, Math.sqrt(e.x * e.x + e.z * e.z));
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.vertices, t.indices, t.radius, t.detail);
	}
}, vi = /*@__PURE__*/ new G(), yi = /*@__PURE__*/ new G(), bi = /*@__PURE__*/ new G(), xi = /*@__PURE__*/ new $t(), Si = class extends Pn {
	constructor(e = null, t = 1) {
		if (super(), this.type = "EdgesGeometry", this.parameters = {
			geometry: e,
			thresholdAngle: t
		}, e !== null) {
			let n = 1e4, r = Math.cos(de * t), i = e.getIndex(), a = e.getAttribute("position"), o = i ? i.count : a.count, s = [
				0,
				0,
				0
			], c = [
				"a",
				"b",
				"c"
			], l = [
				,
				,
				,
			], u = /* @__PURE__ */ new Map(), d = [];
			for (let e = 0; e < o; e += 3) {
				i ? (s[0] = i.getX(e), s[1] = i.getX(e + 1), s[2] = i.getX(e + 2)) : (s[0] = e, s[1] = e + 1, s[2] = e + 2);
				let { a: t, b: o, c: f } = xi;
				if (t.fromBufferAttribute(a, s[0]), o.fromBufferAttribute(a, s[1]), f.fromBufferAttribute(a, s[2]), xi.getNormal(bi), l[0] = `${Math.round(t.x * n)},${Math.round(t.y * n)},${Math.round(t.z * n)}`, l[1] = `${Math.round(o.x * n)},${Math.round(o.y * n)},${Math.round(o.z * n)}`, l[2] = `${Math.round(f.x * n)},${Math.round(f.y * n)},${Math.round(f.z * n)}`, l[0] !== l[1] && l[1] !== l[2] && l[2] !== l[0]) for (let e = 0; e < 3; e++) {
					let t = (e + 1) % 3, n = l[e], i = l[t], a = xi[c[e]], o = xi[c[t]], f = `${n}_${i}`, p = `${i}_${n}`, m = u.get(p);
					m ? (bi.dot(m.normal) <= r && (d.push(a.x, a.y, a.z), d.push(o.x, o.y, o.z)), u.set(p, null)) : u.has(f) || u.set(f, {
						index0: s[e],
						index1: s[t],
						normal: bi.clone()
					});
				}
			}
			for (let e of u.values()) if (e) {
				let { index0: t, index1: n } = e;
				vi.fromBufferAttribute(a, t), yi.fromBufferAttribute(a, n), d.push(vi.x, vi.y, vi.z), d.push(yi.x, yi.y, yi.z);
			}
			this.setAttribute("position", new Sn(d, 3));
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
}, Ci = class e extends _i {
	constructor(e = 1, t = 0) {
		super([
			1,
			0,
			0,
			-1,
			0,
			0,
			0,
			1,
			0,
			0,
			-1,
			0,
			0,
			0,
			1,
			0,
			0,
			-1
		], [
			0,
			2,
			4,
			0,
			4,
			3,
			0,
			3,
			5,
			0,
			5,
			2,
			1,
			2,
			5,
			1,
			5,
			3,
			1,
			3,
			4,
			1,
			4,
			2
		], e, t), this.type = "OctahedronGeometry", this.parameters = {
			radius: e,
			detail: t
		};
	}
	static fromJSON(t) {
		return new e(t.radius, t.detail);
	}
}, wi = class e extends Pn {
	constructor(e = 1, t = 1, n = 1, r = 1) {
		super(), this.type = "PlaneGeometry", this.parameters = {
			width: e,
			height: t,
			widthSegments: n,
			heightSegments: r
		};
		let i = e / 2, a = t / 2, o = Math.floor(n), s = Math.floor(r), c = o + 1, l = s + 1, u = e / o, d = t / s, f = [], p = [], m = [], h = [];
		for (let e = 0; e < l; e++) {
			let t = e * d - a;
			for (let n = 0; n < c; n++) {
				let r = n * u - i;
				p.push(r, -t, 0), m.push(0, 0, 1), h.push(n / o), h.push(1 - e / s);
			}
		}
		for (let e = 0; e < s; e++) for (let t = 0; t < o; t++) {
			let n = t + c * e, r = t + c * (e + 1), i = t + 1 + c * (e + 1), a = t + 1 + c * e;
			f.push(n, r, a), f.push(r, i, a);
		}
		this.setIndex(f), this.setAttribute("position", new Sn(p, 3)), this.setAttribute("normal", new Sn(m, 3)), this.setAttribute("uv", new Sn(h, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.width, t.height, t.widthSegments, t.heightSegments);
	}
}, Ti = class e extends Pn {
	constructor(e = .5, t = 1, n = 32, r = 1, i = 0, a = Math.PI * 2) {
		super(), this.type = "RingGeometry", this.parameters = {
			innerRadius: e,
			outerRadius: t,
			thetaSegments: n,
			phiSegments: r,
			thetaStart: i,
			thetaLength: a
		}, n = Math.max(3, n), r = Math.max(1, r);
		let o = [], s = [], c = [], l = [], u = e, d = (t - e) / r, f = new G(), p = new W();
		for (let e = 0; e <= r; e++) {
			for (let e = 0; e <= n; e++) {
				let r = i + e / n * a;
				f.x = u * Math.cos(r), f.y = u * Math.sin(r), s.push(f.x, f.y, f.z), c.push(0, 0, 1), p.x = (f.x / t + 1) / 2, p.y = (f.y / t + 1) / 2, l.push(p.x, p.y);
			}
			u += d;
		}
		for (let e = 0; e < r; e++) {
			let t = e * (n + 1);
			for (let e = 0; e < n; e++) {
				let r = e + t, i = r, a = r + n + 1, s = r + n + 2, c = r + 1;
				o.push(i, a, c), o.push(a, s, c);
			}
		}
		this.setIndex(o), this.setAttribute("position", new Sn(s, 3)), this.setAttribute("normal", new Sn(c, 3)), this.setAttribute("uv", new Sn(l, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.innerRadius, t.outerRadius, t.thetaSegments, t.phiSegments, t.thetaStart, t.thetaLength);
	}
}, Ei = class e extends Pn {
	constructor(e = 1, t = 32, n = 16, r = 0, i = Math.PI * 2, a = 0, o = Math.PI) {
		super(), this.type = "SphereGeometry", this.parameters = {
			radius: e,
			widthSegments: t,
			heightSegments: n,
			phiStart: r,
			phiLength: i,
			thetaStart: a,
			thetaLength: o
		}, t = Math.max(3, Math.floor(t)), n = Math.max(2, Math.floor(n));
		let s = Math.min(a + o, Math.PI), c = 0, l = [], u = new G(), d = new G(), f = [], p = [], m = [], h = [];
		for (let f = 0; f <= n; f++) {
			let g = [], _ = f / n, v = a + _ * o, y = e * Math.cos(v), b = Math.sqrt(e * e - y * y), x = 0;
			f === 0 && a === 0 ? x = .5 / t : f === n && s === Math.PI && (x = -.5 / t);
			for (let e = 0; e <= t; e++) {
				let n = e / t, a = r + n * i;
				u.x = -b * Math.cos(a), u.y = y, u.z = b * Math.sin(a), p.push(u.x, u.y, u.z), d.copy(u).normalize(), m.push(d.x, d.y, d.z), h.push(n + x, 1 - _), g.push(c++);
			}
			l.push(g);
		}
		for (let e = 0; e < n; e++) for (let r = 0; r < t; r++) {
			let t = l[e][r + 1], i = l[e][r], o = l[e + 1][r], c = l[e + 1][r + 1];
			(e !== 0 || a > 0) && f.push(t, i, c), (e !== n - 1 || s < Math.PI) && f.push(i, o, c);
		}
		this.setIndex(f), this.setAttribute("position", new Sn(p, 3)), this.setAttribute("normal", new Sn(m, 3)), this.setAttribute("uv", new Sn(h, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
	}
}, Di = class e extends Pn {
	constructor(e = 1, t = .4, n = 12, r = 48, i = Math.PI * 2, a = 0, o = Math.PI * 2) {
		super(), this.type = "TorusGeometry", this.parameters = {
			radius: e,
			tube: t,
			radialSegments: n,
			tubularSegments: r,
			arc: i,
			thetaStart: a,
			thetaLength: o
		}, n = Math.floor(n), r = Math.floor(r);
		let s = [], c = [], l = [], u = [], d = new G(), f = new G(), p = new G();
		for (let s = 0; s <= n; s++) {
			let m = a + s / n * o;
			for (let a = 0; a <= r; a++) {
				let o = a / r * i;
				f.x = (e + t * Math.cos(m)) * Math.cos(o), f.y = (e + t * Math.cos(m)) * Math.sin(o), f.z = t * Math.sin(m), c.push(f.x, f.y, f.z), d.x = e * Math.cos(o), d.y = e * Math.sin(o), p.subVectors(f, d).normalize(), l.push(p.x, p.y, p.z), u.push(a / r), u.push(s / n);
			}
		}
		for (let e = 1; e <= n; e++) for (let t = 1; t <= r; t++) {
			let n = (r + 1) * e + t - 1, i = (r + 1) * (e - 1) + t - 1, a = (r + 1) * (e - 1) + t, o = (r + 1) * e + t;
			s.push(n, i, o), s.push(i, a, o);
		}
		this.setIndex(s), this.setAttribute("position", new Sn(c, 3)), this.setAttribute("normal", new Sn(l, 3)), this.setAttribute("uv", new Sn(u, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radius, t.tube, t.radialSegments, t.tubularSegments, t.arc, t.thetaStart, t.thetaLength);
	}
};
function Oi(e) {
	let t = {};
	for (let n in e) {
		t[n] = {};
		for (let r in e[n]) {
			let i = e[n][r];
			if (Ai(i)) i.isRenderTargetTexture ? (L("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[n][r] = null) : t[n][r] = i.clone();
			else if (Array.isArray(i)) {
				if (Ai(i[0])) {
					let e = [];
					for (let t = 0, n = i.length; t < n; t++) e[t] = i[t].clone();
					t[n][r] = e;
				} else t[n][r] = i.slice();
			} else t[n][r] = i;
		}
	}
	return t;
}
function ki(e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = Oi(e[n]);
		for (let e in r) t[e] = r[e];
	}
	return t;
}
function Ai(e) {
	return e && (e.isColor || e.isMatrix3 || e.isMatrix4 || e.isVector2 || e.isVector3 || e.isVector4 || e.isTexture || e.isQuaternion);
}
function ji(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) t.push(e[n].clone());
	return t;
}
function Mi(e) {
	let t = e.getRenderTarget();
	return t === null ? e.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : Be.workingColorSpace;
}
var Ni = {
	clone: Oi,
	merge: ki
}, Pi = "void main() {\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", Fi = "void main() {\n	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", Ii = class extends Wn {
	constructor(e) {
		super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Pi, this.fragmentShader = Fi, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
			clipCullDistance: !1,
			multiDraw: !1
		}, this.defaultAttributeValues = {
			color: [
				1,
				1,
				1
			],
			uv: [0, 0],
			uv1: [0, 0]
		}, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = Oi(e.uniforms), this.uniformsGroups = ji(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		t.glslVersion = this.glslVersion, t.uniforms = {};
		for (let n in this.uniforms) {
			let r = this.uniforms[n].value;
			r && r.isTexture ? t.uniforms[n] = {
				type: "t",
				value: r.toJSON(e).uuid
			} : r && r.isColor ? t.uniforms[n] = {
				type: "c",
				value: r.getHex()
			} : r && r.isVector2 ? t.uniforms[n] = {
				type: "v2",
				value: r.toArray()
			} : r && r.isVector3 ? t.uniforms[n] = {
				type: "v3",
				value: r.toArray()
			} : r && r.isVector4 ? t.uniforms[n] = {
				type: "v4",
				value: r.toArray()
			} : r && r.isMatrix3 ? t.uniforms[n] = {
				type: "m3",
				value: r.toArray()
			} : r && r.isMatrix4 ? t.uniforms[n] = {
				type: "m4",
				value: r.toArray()
			} : t.uniforms[n] = { value: r };
		}
		Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
		let n = {};
		for (let e in this.extensions) this.extensions[e] === !0 && (n[e] = !0);
		return Object.keys(n).length > 0 && (t.extensions = n), t;
	}
	fromJSON(e, t) {
		if (super.fromJSON(e, t), e.uniforms !== void 0) for (let n in e.uniforms) {
			let r = e.uniforms[n];
			switch (this.uniforms[n] = {}, r.type) {
				case "t":
					this.uniforms[n].value = t[r.value] || null;
					break;
				case "c":
					this.uniforms[n].value = new J().setHex(r.value);
					break;
				case "v2":
					this.uniforms[n].value = new W().fromArray(r.value);
					break;
				case "v3":
					this.uniforms[n].value = new G().fromArray(r.value);
					break;
				case "v4":
					this.uniforms[n].value = new Ze().fromArray(r.value);
					break;
				case "m3":
					this.uniforms[n].value = new q().fromArray(r.value);
					break;
				case "m4":
					this.uniforms[n].value = new nt().fromArray(r.value);
					break;
				default: this.uniforms[n].value = r.value;
			}
		}
		if (e.defines !== void 0 && (this.defines = e.defines), e.vertexShader !== void 0 && (this.vertexShader = e.vertexShader), e.fragmentShader !== void 0 && (this.fragmentShader = e.fragmentShader), e.glslVersion !== void 0 && (this.glslVersion = e.glslVersion), e.extensions !== void 0) for (let t in e.extensions) this.extensions[t] = e.extensions[t];
		return e.lights !== void 0 && (this.lights = e.lights), e.clipping !== void 0 && (this.clipping = e.clipping), this;
	}
}, Li = class extends Ii {
	constructor(e) {
		super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
	}
}, Ri = class extends Wn {
	constructor(e) {
		super(), this.isMeshStandardMaterial = !0, this.type = "MeshStandardMaterial", this.defines = { STANDARD: "" }, this.color = new J(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new J(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new W(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new ft(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
	}
}, zi = class extends Ri {
	constructor(e) {
		super(), this.isMeshPhysicalMaterial = !0, this.defines = {
			STANDARD: "",
			PHYSICAL: ""
		}, this.type = "MeshPhysicalMaterial", this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new W(1, 1), this.clearcoatNormalMap = null, this.diffuseRoughnessMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
			get: function() {
				return H(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
			},
			set: function(e) {
				this.ior = (1 + .4 * e) / (1 - .4 * e);
			}
		}), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessMinimum = 100, this.iridescenceThicknessMaximum = 400, this.iridescenceThicknessMap = null, this.sheenColor = new J(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = Infinity, this.attenuationColor = new J(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new J(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._diffuseRoughness = 0, this._dispersion = 0, this._iridescence = 0, this._retroreflectivity = 0, this._sheen = 0, this._transmission = 0, this.setValues(e);
	}
	get anisotropy() {
		return this._anisotropy;
	}
	set anisotropy(e) {
		this._anisotropy > 0 != e > 0 && this.version++, this._anisotropy = e;
	}
	get clearcoat() {
		return this._clearcoat;
	}
	set clearcoat(e) {
		this._clearcoat > 0 != e > 0 && this.version++, this._clearcoat = e;
	}
	get diffuseRoughness() {
		return this._diffuseRoughness;
	}
	set diffuseRoughness(e) {
		this._diffuseRoughness > 0 != e > 0 && this.version++, this._diffuseRoughness = e;
	}
	get iridescence() {
		return this._iridescence;
	}
	set iridescence(e) {
		this._iridescence > 0 != e > 0 && this.version++, this._iridescence = e;
	}
	get dispersion() {
		return this._dispersion;
	}
	set dispersion(e) {
		this._dispersion > 0 != e > 0 && this.version++, this._dispersion = e;
	}
	get retroreflectivity() {
		return this._retroreflectivity;
	}
	set retroreflectivity(e) {
		this._retroreflectivity > 0 != e > 0 && this.version++, this._retroreflectivity = e;
	}
	get sheen() {
		return this._sheen;
	}
	set sheen(e) {
		this._sheen > 0 != e > 0 && this.version++, this._sheen = e;
	}
	get transmission() {
		return this._transmission;
	}
	set transmission(e) {
		this._transmission > 0 != e > 0 && this.version++, this._transmission = e;
	}
	get iridescenceThicknessRange() {
		return se("MeshPhysicalMaterial: The \"iridescenceThicknessRange\" property has been replaced by \"iridescenceThicknessMinimum\" and \"iridescenceThicknessMaximum\"."), [this.iridescenceThicknessMinimum, this.iridescenceThicknessMaximum];
	}
	set iridescenceThicknessRange(e) {
		se("MeshPhysicalMaterial: The \"iridescenceThicknessRange\" property has been replaced by \"iridescenceThicknessMinimum\" and \"iridescenceThicknessMaximum\"."), this.iridescenceThicknessMinimum = e[0], this.iridescenceThicknessMaximum = e[1];
	}
	copy(e) {
		return super.copy(e), this.defines = {
			STANDARD: "",
			PHYSICAL: ""
		}, this.anisotropy = e.anisotropy, this.anisotropyRotation = e.anisotropyRotation, this.anisotropyMap = e.anisotropyMap, this.clearcoat = e.clearcoat, this.clearcoatMap = e.clearcoatMap, this.clearcoatRoughness = e.clearcoatRoughness, this.clearcoatRoughnessMap = e.clearcoatRoughnessMap, this.clearcoatNormalMap = e.clearcoatNormalMap, this.clearcoatNormalScale.copy(e.clearcoatNormalScale), this.diffuseRoughness = e.diffuseRoughness, this.diffuseRoughnessMap = e.diffuseRoughnessMap, this.dispersion = e.dispersion, this.ior = e.ior, this.iridescence = e.iridescence, this.iridescenceMap = e.iridescenceMap, this.iridescenceIOR = e.iridescenceIOR, this.iridescenceThicknessMinimum = e.iridescenceThicknessMinimum, this.iridescenceThicknessMaximum = e.iridescenceThicknessMaximum, this.iridescenceThicknessMap = e.iridescenceThicknessMap, this.retroreflectivity = e.retroreflectivity, this.sheen = e.sheen, this.sheenColor.copy(e.sheenColor), this.sheenColorMap = e.sheenColorMap, this.sheenRoughness = e.sheenRoughness, this.sheenRoughnessMap = e.sheenRoughnessMap, this.transmission = e.transmission, this.transmissionMap = e.transmissionMap, this.thickness = e.thickness, this.thicknessMap = e.thicknessMap, this.attenuationDistance = e.attenuationDistance, this.attenuationColor.copy(e.attenuationColor), this.specularIntensity = e.specularIntensity, this.specularIntensityMap = e.specularIntensityMap, this.specularColor.copy(e.specularColor), this.specularColorMap = e.specularColorMap, this;
	}
}, Bi = class extends Wn {
	constructor(e) {
		super(), this.isMeshLambertMaterial = !0, this.type = "MeshLambertMaterial", this.color = new J(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new J(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new W(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new ft(), this.combine = 0, this.reflectivity = 1, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.envMapIntensity = e.envMapIntensity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
	}
}, Vi = class extends Wn {
	constructor(e) {
		super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
	}
}, Hi = class extends Wn {
	constructor(e) {
		super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
	}
};
function Ui(e, t) {
	return !e || e.constructor === t ? e : typeof t.BYTES_PER_ELEMENT == "number" ? new t(e) : Array.prototype.slice.call(e);
}
function Wi(e) {
	return e !== void 0 && e.inTangents !== void 0 && e.outTangents !== void 0;
}
var Gi = class {
	constructor(e, t, n, r) {
		this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = r === void 0 ? new t.constructor(n) : r, this.sampleValues = t, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {};
	}
	evaluate(e) {
		let t = this.parameterPositions, n = this._cachedIndex, r = t[n], i = t[n - 1];
		validate_interval: {
			seek: {
				let a;
				linear_scan: {
					forward_scan: if (!(e < r)) {
						for (let a = n + 2;;) {
							if (r === void 0) {
								if (e < i) break forward_scan;
								return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
							}
							if (n === a) break;
							if (i = r, r = t[++n], e < r) break seek;
						}
						a = t.length;
						break linear_scan;
					}
					if (!(e >= i)) {
						let o = t[1];
						e < o && (n = 2, i = o);
						for (let a = n - 2;;) {
							if (i === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
							if (n === a) break;
							if (r = i, i = t[--n - 1], e >= i) break seek;
						}
						a = n, n = 0;
						break linear_scan;
					}
					break validate_interval;
				}
				for (; n < a;) {
					let r = n + a >>> 1;
					e < t[r] ? a = r : n = r + 1;
				}
				if (r = t[n], i = t[n - 1], i === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
				if (r === void 0) return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
			}
			this._cachedIndex = n, this.intervalChanged_(n, i, r);
		}
		return this.interpolate_(n, i, e, r);
	}
	getSettings_() {
		return this.settings || this.DefaultSettings_;
	}
	copySampleValue_(e) {
		let t = this.resultBuffer, n = this.sampleValues, r = this.valueSize, i = e * r;
		for (let e = 0; e !== r; ++e) t[e] = n[i + e];
		return t;
	}
	interpolate_() {
		throw Error("THREE.Interpolant: Call to abstract method.");
	}
	intervalChanged_() {}
}, Ki = class extends Gi {
	constructor(e, t, n, r) {
		super(e, t, n, r), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
			endingStart: E,
			endingEnd: E
		};
	}
	intervalChanged_(e, t, n) {
		let r = this.parameterPositions, i = e - 2, a = e + 1, o = r[i], s = r[a];
		if (o === void 0) switch (this.getSettings_().endingStart) {
			case D:
				i = e, o = 2 * t - n;
				break;
			case O:
				i = r.length - 2, o = t + r[i] - r[i + 1];
				break;
			default: i = e, o = n;
		}
		if (s === void 0) switch (this.getSettings_().endingEnd) {
			case D:
				a = e, s = 2 * n - t;
				break;
			case O:
				a = 1, s = n + r[1] - r[0];
				break;
			default: a = e - 1, s = t;
		}
		let c = (n - t) * .5, l = this.valueSize;
		this._weightPrev = c / (t - o), this._weightNext = c / (s - n), this._offsetPrev = i * l, this._offsetNext = a * l;
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = this._offsetPrev, u = this._offsetNext, d = this._weightPrev, f = this._weightNext, p = (n - t) / (r - t), m = p * p, h = m * p, g = -d * h + 2 * d * m - d * p, _ = (1 + d) * h + (-1.5 - 2 * d) * m + (-.5 + d) * p + 1, v = (-1 - f) * h + (1.5 + f) * m + .5 * p, y = f * h - f * m;
		for (let e = 0; e !== o; ++e) i[e] = g * a[l + e] + _ * a[c + e] + v * a[s + e] + y * a[u + e];
		return i;
	}
}, qi = class extends Gi {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = (n - t) / (r - t), u = 1 - l;
		for (let e = 0; e !== o; ++e) i[e] = a[c + e] * u + a[s + e] * l;
		return i;
	}
}, Ji = class extends Gi {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e) {
		return this.copySampleValue_(e - 1);
	}
}, Yi = class extends Gi {
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = this.inTangents, u = this.outTangents;
		if (!l || !u) {
			let e = (n - t) / (r - t), l = 1 - e;
			for (let t = 0; t !== o; ++t) i[t] = a[c + t] * l + a[s + t] * e;
			return i;
		}
		let d = o * 2, f = e - 1;
		for (let p = 0; p !== o; ++p) {
			let o = a[c + p], m = a[s + p], h = f * d + p * 2, g = u[h], _ = u[h + 1], v = e * d + p * 2, y = l[v], b = l[v + 1], x = Qi(n, t, g, y, r);
			i[p] = Xi(x, o, _, b, m);
		}
		return i;
	}
};
function Xi(e, t, n, r, i) {
	let a = 1 - e;
	return a * a * a * t + 3 * a * a * e * n + 3 * a * e * e * r + e * e * e * i;
}
function Zi(e, t, n, r, i) {
	let a = 1 - e;
	return 3 * a * a * (n - t) + 6 * a * e * (r - n) + 3 * e * e * (i - r);
}
function Qi(e, t, n, r, i) {
	let a = (e - t) / (i - t);
	for (let o = 0; o < 8; o++) {
		let o = Xi(a, t, n, r, i) - e;
		if (Math.abs(o) < 1e-10) break;
		let s = Zi(a, t, n, r, i);
		if (Math.abs(s) < 1e-10) break;
		a = Math.max(0, Math.min(1, a - o / s));
	}
	return a;
}
var $i = class {
	constructor(e, t, n, r) {
		if (e === void 0) throw Error("THREE.KeyframeTrack: track name is undefined");
		if (t === void 0 || t.length === 0) throw Error("THREE.KeyframeTrack: no keyframes in track named " + e);
		this.name = e, this.times = Ui(t, this.TimeBufferType), this.values = Ui(n, this.ValueBufferType), this.setInterpolation(r || this.DefaultInterpolation);
	}
	static toJSON(e) {
		let t = e.constructor, n;
		if (t.toJSON !== this.toJSON) n = t.toJSON(e);
		else {
			n = {
				name: e.name,
				times: Ui(e.times, Array),
				values: Ui(e.values, Array)
			};
			let t = e.getInterpolation();
			t !== e.DefaultInterpolation && (n.interpolation = t), Wi(e.settings) && (n.settings = {
				inTangents: Ui(e.settings.inTangents, Array),
				outTangents: Ui(e.settings.outTangents, Array)
			});
		}
		return n.type = e.ValueTypeName, n;
	}
	InterpolantFactoryMethodDiscrete(e) {
		return new Ji(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodLinear(e) {
		return new qi(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodSmooth(e) {
		return new Ki(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodBezier(e) {
		let t = new Yi(this.times, this.values, this.getValueSize(), e);
		return this.settings && (t.inTangents = this.settings.inTangents, t.outTangents = this.settings.outTangents), t;
	}
	setInterpolation(e) {
		let t;
		switch (e) {
			case S:
				t = this.InterpolantFactoryMethodDiscrete;
				break;
			case C:
				t = this.InterpolantFactoryMethodLinear;
				break;
			case w:
				t = this.InterpolantFactoryMethodSmooth;
				break;
			case T: t = this.InterpolantFactoryMethodBezier;
		}
		if (t === void 0) {
			let t = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
			if (this.createInterpolant === void 0) {
				if (e !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
				else throw Error(t);
			}
			return L("KeyframeTrack:", t), this;
		}
		return this.createInterpolant = t, this;
	}
	getInterpolation() {
		switch (this.createInterpolant) {
			case this.InterpolantFactoryMethodDiscrete: return S;
			case this.InterpolantFactoryMethodLinear: return C;
			case this.InterpolantFactoryMethodSmooth: return w;
			case this.InterpolantFactoryMethodBezier: return T;
		}
	}
	getValueSize() {
		return this.values.length / this.times.length;
	}
	shift(e) {
		if (e !== 0) {
			let t = this.times;
			for (let n = 0, r = t.length; n !== r; ++n) t[n] += e;
			Wi(this.settings) && (ea(this.settings.inTangents, e), ea(this.settings.outTangents, e));
		}
		return this;
	}
	scale(e) {
		if (e !== 1) {
			let t = this.times;
			for (let n = 0, r = t.length; n !== r; ++n) t[n] *= e;
			Wi(this.settings) && (ta(this.settings.inTangents, e), ta(this.settings.outTangents, e));
		}
		return this;
	}
	trim(e, t) {
		let n = this.times, r = n.length, i = 0, a = r - 1;
		for (; i !== r && n[i] < e;) ++i;
		for (; a !== -1 && n[a] > t;) --a;
		if (++a, i !== 0 || a !== r) {
			i >= a && (a = Math.max(a, 1), i = a - 1);
			let e = this.getValueSize();
			this.times = n.slice(i, a), this.values = this.values.slice(i * e, a * e);
		}
		return this;
	}
	validate() {
		let e = !0, t = this.getValueSize();
		t - Math.floor(t) !== 0 && (R("KeyframeTrack: Invalid value size in track.", this), e = !1);
		let n = this.times, r = this.values, i = n.length;
		i === 0 && (R("KeyframeTrack: Track is empty.", this), e = !1);
		let a = null;
		for (let t = 0; t !== i; t++) {
			let r = n[t];
			if (typeof r == "number" && isNaN(r)) {
				R("KeyframeTrack: Time is not a valid number.", this, t, r), e = !1;
				break;
			}
			if (a !== null && a > r) {
				R("KeyframeTrack: Out of order keys.", this, t, r, a), e = !1;
				break;
			}
			a = r;
		}
		if (r !== void 0 && F(r)) for (let t = 0, n = r.length; t !== n; ++t) {
			let n = r[t];
			if (isNaN(n)) {
				R("KeyframeTrack: Value is not a valid number.", this, t, n), e = !1;
				break;
			}
		}
		return e;
	}
	optimize() {
		let e = this.times.slice(), t = this.values.slice(), n = this.getValueSize(), r = this.getInterpolation() === w, i = e.length - 1, a = 1;
		for (let o = 1; o < i; ++o) {
			let i = !1, s = e[o];
			if (s !== e[o + 1] && (o !== 1 || s !== e[0])) {
				if (r) i = !0;
				else {
					let e = o * n, r = e - n, a = e + n;
					for (let o = 0; o !== n; ++o) {
						let n = t[e + o];
						if (n !== t[r + o] || n !== t[a + o]) {
							i = !0;
							break;
						}
					}
				}
			}
			if (i) {
				if (o !== a) {
					e[a] = e[o];
					let r = o * n, i = a * n;
					for (let e = 0; e !== n; ++e) t[i + e] = t[r + e];
				}
				++a;
			}
		}
		if (i > 0) {
			e[a] = e[i];
			for (let e = i * n, r = a * n, o = 0; o !== n; ++o) t[r + o] = t[e + o];
			++a;
		}
		return a === e.length ? (this.times = e, this.values = t) : (this.times = e.slice(0, a), this.values = t.slice(0, a * n)), this;
	}
	clone() {
		let e = this.times.slice(), t = this.values.slice(), n = this.constructor, r = new n(this.name, e, t);
		return r.createInterpolant = this.createInterpolant, Wi(this.settings) && (r.settings = {
			inTangents: this.settings.inTangents.slice(),
			outTangents: this.settings.outTangents.slice()
		}), r;
	}
};
function ea(e, t) {
	for (let n = 0, r = e.length; n !== r; n += 2) e[n] += t;
}
function ta(e, t) {
	for (let n = 0, r = e.length; n !== r; n += 2) e[n] *= t;
}
$i.prototype.ValueTypeName = "", $i.prototype.TimeBufferType = Float32Array, $i.prototype.ValueBufferType = Float32Array, $i.prototype.DefaultInterpolation = C;
var na = class extends $i {
	constructor(e, t, n) {
		super(e, t, n);
	}
};
na.prototype.ValueTypeName = "bool", na.prototype.ValueBufferType = Array, na.prototype.DefaultInterpolation = S, na.prototype.InterpolantFactoryMethodLinear = void 0, na.prototype.InterpolantFactoryMethodSmooth = void 0;
var ra = class extends $i {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
ra.prototype.ValueTypeName = "color";
var ia = class extends $i {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
ia.prototype.ValueTypeName = "number";
var aa = class extends Gi {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = (n - t) / (r - t), c = e * o;
		for (let e = c + o; c !== e; c += 4) Pe.slerpFlat(i, 0, a, c - o, a, c, s);
		return i;
	}
}, oa = class extends $i {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	InterpolantFactoryMethodLinear(e) {
		return new aa(this.times, this.values, this.getValueSize(), e);
	}
};
oa.prototype.ValueTypeName = "quaternion", oa.prototype.InterpolantFactoryMethodSmooth = void 0;
var sa = class extends $i {
	constructor(e, t, n) {
		super(e, t, n);
	}
};
sa.prototype.ValueTypeName = "string", sa.prototype.ValueBufferType = Array, sa.prototype.DefaultInterpolation = S, sa.prototype.InterpolantFactoryMethodLinear = void 0, sa.prototype.InterpolantFactoryMethodSmooth = void 0;
var ca = class extends $i {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
ca.prototype.ValueTypeName = "vector";
var la = class extends kt {
	static registerNode(e) {
		this.prototype._lightNode = e;
	}
	constructor(e, t = 1) {
		super(), this.isLight = !0, this.type = "Light", this.color = new J(e), this.intensity = t;
	}
	copy(e, t) {
		return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, t;
	}
}, ua = class extends la {
	constructor(e, t, n) {
		super(e, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(kt.DEFAULT_UP), this.updateMatrix(), this.groundColor = new J(t);
	}
	copy(e, t) {
		return super.copy(e, t), this.groundColor.copy(e.groundColor), this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.groundColor = this.groundColor.getHex(), t;
	}
}, da = /*@__PURE__*/ new nt(), fa = /*@__PURE__*/ new G(), pa = /*@__PURE__*/ new G(), ma = class {
	constructor(e) {
		this.camera = e, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new W(512, 512), this.mapType = o, this.map = null, this.mapPass = null, this.matrix = new nt(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new zr(), this._frameExtents = new W(1, 1), this._viewportCount = 1, this._viewports = [new Ze(0, 0, 1, 1)];
	}
	getViewportCount() {
		return this._viewportCount;
	}
	getCamera() {
		return this.camera;
	}
	getFrustum() {
		return this._frustum;
	}
	updateMatrices(e) {
		let t = this.camera;
		fa.setFromMatrixPosition(e.matrixWorld), t.position.copy(fa), pa.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(pa), t.updateMatrixWorld(), this._updateMatrix(t, this.matrix, this._frustum);
	}
	_updateMatrix(e, t, n, r) {
		da.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), n.setFromProjectionMatrix(da, e.coordinateSystem, e.reversedDepth);
		let i = this._frameExtents, a = r ? r.z / i.x : 1, o = r ? r.w / i.y : 1, s = r ? r.x / i.x : 0, c = r ? r.y / i.y : 0;
		e.coordinateSystem === 2001 || e.reversedDepth ? t.set(.5 * a, 0, 0, .5 * a + s, 0, .5 * o, 0, .5 * o + c, 0, 0, 1, 0, 0, 0, 0, 1) : t.set(.5 * a, 0, 0, .5 * a + s, 0, .5 * o, 0, .5 * o + c, 0, 0, .5, .5, 0, 0, 0, 1), t.multiply(da);
	}
	getViewport(e) {
		return this._viewports[e];
	}
	getFrameExtents() {
		return this._frameExtents;
	}
	dispose() {
		this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
	}
	copy(e) {
		return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.autoUpdate = e.autoUpdate, this.needsUpdate = e.needsUpdate, this.normalBias = e.normalBias, this.blurSamples = e.blurSamples, this.mapSize.copy(e.mapSize), this.mapType = e.mapType, this.biasNode = e.biasNode, this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		let e = {};
		return e.intensity = this.intensity, e.bias = this.bias, e.normalBias = this.normalBias, e.radius = this.radius, e.blurSamples = this.blurSamples, e.mapSize = this.mapSize.toArray(), e.mapType = this.mapType, e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
	}
}, ha = /*@__PURE__*/ new G(), ga = /*@__PURE__*/ new Pe(), _a = /*@__PURE__*/ new G(), va = class extends kt {
	constructor() {
		super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new nt(), this.projectionMatrix = new nt(), this.projectionMatrixInverse = new nt(), this.coordinateSystem = ne, this._reversedDepth = !1;
	}
	get reversedDepth() {
		return this._reversedDepth;
	}
	copy(e, t) {
		return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
	}
	getWorldDirection(e) {
		return super.getWorldDirection(e).negate();
	}
	updateMatrixWorld(e) {
		super.updateMatrixWorld(e), this.matrixWorld.decompose(ha, ga, _a), _a.x === 1 && _a.y === 1 && _a.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(ha, ga, _a.set(1, 1, 1)).invert();
	}
	updateWorldMatrix(e, t, n = !1) {
		super.updateWorldMatrix(e, t, n), this.matrixWorld.decompose(ha, ga, _a), _a.x === 1 && _a.y === 1 && _a.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(ha, ga, _a.set(1, 1, 1)).invert();
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, ya = /*@__PURE__*/ new G(), ba = /*@__PURE__*/ new W(), xa = /*@__PURE__*/ new W(), Sa = class extends va {
	constructor(e = 50, t = 1, n = .1, r = 2e3) {
		super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
	}
	copy(e, t) {
		return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
	}
	setFocalLength(e) {
		let t = .5 * this.getFilmHeight() / e;
		this.fov = fe * 2 * Math.atan(t), this.updateProjectionMatrix();
	}
	getFocalLength() {
		let e = Math.tan(de * .5 * this.fov);
		return .5 * this.getFilmHeight() / e;
	}
	getEffectiveFOV() {
		return fe * 2 * Math.atan(Math.tan(de * .5 * this.fov) / this.zoom);
	}
	getFilmWidth() {
		return this.filmGauge * Math.min(this.aspect, 1);
	}
	getFilmHeight() {
		return this.filmGauge / Math.max(this.aspect, 1);
	}
	getViewBounds(e, t, n) {
		ya.set(-1, -1, .5).applyMatrix4(this.projectionMatrixInverse), t.set(ya.x, ya.y).multiplyScalar(-e / ya.z), ya.set(1, 1, .5).applyMatrix4(this.projectionMatrixInverse), n.set(ya.x, ya.y).multiplyScalar(-e / ya.z);
	}
	getViewSize(e, t) {
		return this.getViewBounds(e, ba, xa), t.subVectors(xa, ba);
	}
	setViewOffset(e, t, n, r, i, a) {
		this.aspect = e / t, this.view === null && (this.view = {
			enabled: !0,
			fullWidth: 1,
			fullHeight: 1,
			offsetX: 0,
			offsetY: 0,
			width: 1,
			height: 1
		}), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix();
	}
	clearViewOffset() {
		this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
	}
	updateProjectionMatrix() {
		let e = this.near, t = e * Math.tan(de * .5 * this.fov) / this.zoom, n = 2 * t, r = this.aspect * n, i = -.5 * r, a = this.view;
		if (this.view !== null && this.view.enabled) {
			let e = a.fullWidth, o = a.fullHeight;
			i += a.offsetX * r / e, t -= a.offsetY * n / o, r *= a.width / e, n *= a.height / o;
		}
		let o = this.filmOffset;
		o !== 0 && (i += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(i, i + r, t, t - n, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
	}
}, Ca = class extends ma {
	constructor() {
		super(new Sa(50, 1, .5, 500)), this.isSpotLightShadow = !0, this.focus = 1, this.aspect = 1;
	}
	updateMatrices(e) {
		let t = this.camera, n = fe * 2 * e.angle * this.focus, r = this.mapSize.width / this.mapSize.height * this.aspect, i = e.distance || t.far;
		(n !== t.fov || r !== t.aspect || i !== t.far) && (t.fov = n, t.aspect = r, t.far = i, t.updateProjectionMatrix()), super.updateMatrices(e);
	}
	copy(e) {
		return super.copy(e), this.focus = e.focus, this.aspect = e.aspect, this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.focus = this.focus, e.aspect = this.aspect, e;
	}
}, wa = class extends la {
	constructor(e, t, n = 0, r = Math.PI / 3, i = 0, a = 2) {
		super(e, t), this.isSpotLight = !0, this.type = "SpotLight", this.position.copy(kt.DEFAULT_UP), this.updateMatrix(), this.target = new kt(), this.distance = n, this.angle = r, this.penumbra = i, this.decay = a, this.map = null, this.shadow = new Ca();
	}
	get power() {
		return this.intensity * Math.PI;
	}
	set power(e) {
		this.intensity = e / Math.PI;
	}
	dispose() {
		super.dispose(), this.shadow.dispose();
	}
	copy(e, t) {
		return super.copy(e, t), this.distance = e.distance, this.angle = e.angle, this.penumbra = e.penumbra, this.decay = e.decay, this.target = e.target.clone(), this.map = e.map, this.shadow = e.shadow.clone(), this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.distance = this.distance, t.object.angle = this.angle, t.object.decay = this.decay, t.object.penumbra = this.penumbra, t.object.target = this.target.uuid, this.map && this.map.isTexture && (t.object.map = this.map.toJSON(e).uuid), t.object.shadow = this.shadow.toJSON(), t;
	}
}, Ta = class extends ma {
	constructor() {
		super(new Sa(90, 1, .5, 500)), this.isPointLightShadow = !0;
	}
}, Ea = class extends la {
	constructor(e, t, n = 0, r = 2) {
		super(e, t), this.isPointLight = !0, this.type = "PointLight", this.distance = n, this.decay = r, this.shadow = new Ta();
	}
	get power() {
		return this.intensity * 4 * Math.PI;
	}
	set power(e) {
		this.intensity = e / (4 * Math.PI);
	}
	dispose() {
		super.dispose(), this.shadow.dispose();
	}
	copy(e, t) {
		return super.copy(e, t), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.distance = this.distance, t.object.decay = this.decay, t.object.shadow = this.shadow.toJSON(), t;
	}
}, Da = class extends va {
	constructor(e = -1, t = 1, n = 1, r = -1, i = .1, a = 2e3) {
		super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = r, this.near = i, this.far = a, this.updateProjectionMatrix();
	}
	copy(e, t) {
		return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
	}
	setViewOffset(e, t, n, r, i, a) {
		this.view === null && (this.view = {
			enabled: !0,
			fullWidth: 1,
			fullHeight: 1,
			offsetX: 0,
			offsetY: 0,
			width: 1,
			height: 1
		}), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix();
	}
	clearViewOffset() {
		this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
	}
	updateProjectionMatrix() {
		let e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2, i = n - e, a = n + e, o = r + t, s = r - t;
		if (this.view !== null && this.view.enabled) {
			let e = (this.right - this.left) / this.view.fullWidth / this.zoom, t = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
			i += e * this.view.offsetX, a = i + e * this.view.width, o -= t * this.view.offsetY, s = o - t * this.view.height;
		}
		this.projectionMatrix.makeOrthographic(i, a, o, s, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
	}
}, Oa = class extends ma {
	constructor() {
		super(new Da(-5, 5, 5, -5, .5, 500)), this.isDirectionalLightShadow = !0;
	}
}, ka = class extends la {
	constructor(e, t) {
		super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(kt.DEFAULT_UP), this.updateMatrix(), this.target = new kt(), this.shadow = new Oa();
	}
	dispose() {
		super.dispose(), this.shadow.dispose();
	}
	copy(e) {
		return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.shadow = this.shadow.toJSON(), t.object.target = this.target.uuid, t;
	}
}, Aa = -90, ja = 1, Ma = class extends kt {
	constructor(e, t, n) {
		super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
		let r = new Sa(Aa, ja, e, t);
		r.layers = this.layers, this.add(r);
		let i = new Sa(Aa, ja, e, t);
		i.layers = this.layers, this.add(i);
		let a = new Sa(Aa, ja, e, t);
		a.layers = this.layers, this.add(a);
		let o = new Sa(Aa, ja, e, t);
		o.layers = this.layers, this.add(o);
		let s = new Sa(Aa, ja, e, t);
		s.layers = this.layers, this.add(s);
		let c = new Sa(Aa, ja, e, t);
		c.layers = this.layers, this.add(c);
	}
	updateCoordinateSystem() {
		let e = this.coordinateSystem, t = this.children.concat(), [n, r, i, a, o, s] = t;
		for (let e of t) this.remove(e);
		if (e === 2e3) n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), i.up.set(0, 0, -1), i.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), s.up.set(0, 1, 0), s.lookAt(0, 0, -1);
		else if (e === 2001) n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), i.up.set(0, 0, 1), i.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), s.up.set(0, -1, 0), s.lookAt(0, 0, -1);
		else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
		for (let e of t) this.add(e), e.updateMatrixWorld();
	}
	update(e, t) {
		this.parent === null && this.updateMatrixWorld();
		let { renderTarget: n, activeMipmapLevel: r } = this;
		this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
		let [i, a, o, s, c, l] = this.children, u = e.getRenderTarget(), d = e.getActiveCubeFace(), f = e.getActiveMipmapLevel(), p = e.xr.enabled;
		e.xr.enabled = !1;
		let m = n.texture.mipmapsAutoUpdate;
		n.texture.mipmapsAutoUpdate = !1;
		let h = !1;
		h = e.isWebGLRenderer === !0 ? e.state.buffers.depth.getReversed() : e.reversedDepthBuffer, e.setRenderTarget(n, 0, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, i), e.setRenderTarget(n, 1, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, a), e.setRenderTarget(n, 2, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, o), e.setRenderTarget(n, 3, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, s), e.setRenderTarget(n, 4, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, c), n.texture.mipmapsAutoUpdate = m, e.setRenderTarget(n, 5, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, l), e.setRenderTarget(u, d, f), e.xr.enabled = p, n.texture.needsPMREMUpdate = !0;
	}
}, Na = class extends Sa {
	constructor(e = []) {
		super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e, this.perCameraFrustumCulled = !1;
	}
}, Pa = class {
	constructor() {
		this._previousTime = 0, this._currentTime = 0, this._startTime = performance.now(), this._delta = 0, this._elapsed = 0, this._timescale = 1, this._document = null, this._pageVisibilityHandler = null;
	}
	connect(e) {
		this._document = e, e.hidden !== void 0 && (this._pageVisibilityHandler = Fa.bind(this), e.addEventListener("visibilitychange", this._pageVisibilityHandler, !1));
	}
	disconnect() {
		this._pageVisibilityHandler !== null && (this._document.removeEventListener("visibilitychange", this._pageVisibilityHandler), this._pageVisibilityHandler = null), this._document = null;
	}
	getDelta() {
		return this._delta / 1e3;
	}
	getElapsed() {
		return this._elapsed / 1e3;
	}
	getTimescale() {
		return this._timescale;
	}
	setTimescale(e) {
		return this._timescale = e, this;
	}
	reset() {
		return this._currentTime = performance.now() - this._startTime, this;
	}
	dispose() {
		this.disconnect();
	}
	update(e) {
		return this._pageVisibilityHandler !== null && this._document.hidden === !0 ? this._delta = 0 : (this._previousTime = this._currentTime, this._currentTime = (e === void 0 ? performance.now() : e) - this._startTime, this._delta = (this._currentTime - this._previousTime) * this._timescale, this._elapsed += this._delta), this;
	}
};
function Fa() {
	this._document.hidden === !1 && this.reset();
}
var Ia = "\\[\\]\\.:\\/", La = /* @__PURE__ */ RegExp("[\\[\\]\\.:\\/]", "g"), Ra = "[^\\[\\]\\.:\\/]", za = "[^" + Ia.replace("\\.", "") + "]", Ba = /*@__PURE__*/ "((?:WC+[\\/:])*)".replace("WC", Ra), Va = /*@__PURE__*/ "(WCOD+)?".replace("WCOD", za), Ha = /*@__PURE__*/ "(?:\\.(WC+)(?:\\[(.+)\\])?)?".replace("WC", Ra), Ua = /*@__PURE__*/ "\\.(WC+)(?:\\[(.+)\\])?".replace("WC", Ra), Wa = RegExp("^" + Ba + Va + Ha + Ua + "$"), Ga = [
	"material",
	"materials",
	"bones",
	"map"
], Ka = class {
	constructor(e, t, n) {
		let r = n || qa.parseTrackName(t);
		this._targetGroup = e, this._bindings = e.subscribe_(t, r);
	}
	getValue(e, t) {
		this.bind();
		let n = this._targetGroup.nCachedObjects_, r = this._bindings[n];
		r !== void 0 && r.getValue(e, t);
	}
	setValue(e, t) {
		let n = this._bindings;
		for (let r = this._targetGroup.nCachedObjects_, i = n.length; r !== i; ++r) n[r].setValue(e, t);
	}
	bind() {
		let e = this._bindings;
		for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].bind();
	}
	unbind() {
		let e = this._bindings;
		for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].unbind();
	}
}, qa = class e {
	constructor(t, n, r) {
		this.path = n, this.parsedPath = r || e.parseTrackName(n), this.node = e.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
	}
	static create(t, n, r) {
		return t && t.isAnimationObjectGroup ? new e.Composite(t, n, r) : new e(t, n, r);
	}
	static sanitizeNodeName(e) {
		return e.replace(/\s/g, "_").replace(La, "");
	}
	static parseTrackName(e) {
		let t = Wa.exec(e);
		if (t === null) throw Error("THREE.PropertyBinding: Cannot parse trackName: " + e);
		let n = {
			nodeName: t[2],
			objectName: t[3],
			objectIndex: t[4],
			propertyName: t[5],
			propertyIndex: t[6]
		}, r = n.nodeName && n.nodeName.lastIndexOf(".");
		if (r !== void 0 && r !== -1) {
			let e = n.nodeName.substring(r + 1);
			Ga.indexOf(e) !== -1 && (n.nodeName = n.nodeName.substring(0, r), n.objectName = e);
		}
		if (n.propertyName === null || n.propertyName.length === 0) throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: " + e);
		return n;
	}
	static findNode(e, t) {
		if (t === void 0 || t === "" || t === "." || t === -1 || t === e.name || t === e.uuid) return e;
		if (e.skeleton) {
			let n = e.skeleton.getBoneByName(t);
			if (n !== void 0) return n;
		}
		if (e.children) {
			let n = function(e) {
				for (let r = 0; r < e.length; r++) {
					let i = e[r];
					if (i.name === t || i.uuid === t) return i;
					let a = n(i.children);
					if (a) return a;
				}
				return null;
			}, r = n(e.children);
			if (r) return r;
		}
		return null;
	}
	_getValue_unavailable() {}
	_setValue_unavailable() {}
	_getValue_direct(e, t) {
		e[t] = this.targetObject[this.propertyName];
	}
	_getValue_array(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) e[t++] = n[r];
	}
	_getValue_arrayElement(e, t) {
		e[t] = this.resolvedProperty[this.propertyIndex];
	}
	_getValue_toArray(e, t) {
		this.resolvedProperty.toArray(e, t);
	}
	_setValue_direct(e, t) {
		this.targetObject[this.propertyName] = e[t];
	}
	_setValue_direct_setNeedsUpdate(e, t) {
		this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0;
	}
	_setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
		this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_array(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
	}
	_setValue_array_setNeedsUpdate(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
		this.targetObject.needsUpdate = !0;
	}
	_setValue_array_setMatrixWorldNeedsUpdate(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
		this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_arrayElement(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t];
	}
	_setValue_arrayElement_setNeedsUpdate(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0;
	}
	_setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_fromArray(e, t) {
		this.resolvedProperty.fromArray(e, t);
	}
	_setValue_fromArray_setNeedsUpdate(e, t) {
		this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0;
	}
	_setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
		this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_getValue_unbound(e, t) {
		this.bind(), this.getValue(e, t);
	}
	_setValue_unbound(e, t) {
		this.bind(), this.setValue(e, t);
	}
	bind() {
		let t = this.node, n = this.parsedPath, r = n.objectName, i = n.propertyName, a = n.propertyIndex;
		if (t || (t = e.findNode(this.rootNode, n.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
			L("PropertyBinding: No target node found for track: " + this.path + ".");
			return;
		}
		if (r) {
			let e = n.objectIndex;
			switch (r) {
				case "materials":
					if (!t.material) {
						R("PropertyBinding: Can not bind to material as node does not have a material.", this);
						return;
					}
					if (!t.material.materials) {
						R("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
						return;
					}
					t = t.material.materials;
					break;
				case "bones":
					if (!t.skeleton) {
						R("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
						return;
					}
					t = t.skeleton.bones;
					for (let n = 0; n < t.length; n++) if (t[n].name === e) {
						e = n;
						break;
					}
					break;
				case "map":
					if ("map" in t) {
						t = t.map;
						break;
					}
					if (!t.material) {
						R("PropertyBinding: Can not bind to material as node does not have a material.", this);
						return;
					}
					if (!t.material.map) {
						R("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
						return;
					}
					t = t.material.map;
					break;
				default:
					if (t[r] === void 0) {
						R("PropertyBinding: Can not bind to objectName of node undefined.", this);
						return;
					}
					t = t[r];
			}
			if (e !== void 0) {
				if (t[e] === void 0) {
					R("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
					return;
				}
				t = t[e];
			}
		}
		let o = t[i];
		if (o === void 0) {
			let e = n.nodeName;
			R("PropertyBinding: Trying to update property for track: " + e + "." + i + " but it wasn't found.", t);
			return;
		}
		let s = this.Versioning.None;
		this.targetObject = t, t.isMaterial === !0 ? s = this.Versioning.NeedsUpdate : t.isObject3D === !0 && (s = this.Versioning.MatrixWorldNeedsUpdate);
		let c = this.BindingType.Direct;
		if (a !== void 0) {
			if (i === "morphTargetInfluences") {
				if (!t.geometry) {
					R("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
					return;
				}
				if (!t.geometry.morphAttributes) {
					R("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
					return;
				}
				t.morphTargetDictionary[a] !== void 0 && (a = t.morphTargetDictionary[a]);
			}
			c = this.BindingType.ArrayElement, this.resolvedProperty = o, this.propertyIndex = a;
		} else o.fromArray !== void 0 && o.toArray !== void 0 ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = o) : Array.isArray(o) ? (c = this.BindingType.EntireArray, this.resolvedProperty = o) : this.propertyName = i;
		this.getValue = this.GetterByBindingType[c], this.setValue = this.SetterByBindingTypeAndVersioning[c][s];
	}
	unbind() {
		this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
	}
};
qa.Composite = Ka, qa.prototype.BindingType = {
	Direct: 0,
	EntireArray: 1,
	ArrayElement: 2,
	HasFromToArray: 3
}, qa.prototype.Versioning = {
	None: 0,
	NeedsUpdate: 1,
	MatrixWorldNeedsUpdate: 2
}, qa.prototype.GetterByBindingType = [
	qa.prototype._getValue_direct,
	qa.prototype._getValue_array,
	qa.prototype._getValue_arrayElement,
	qa.prototype._getValue_toArray
], qa.prototype.SetterByBindingTypeAndVersioning = [
	[
		qa.prototype._setValue_direct,
		qa.prototype._setValue_direct_setNeedsUpdate,
		qa.prototype._setValue_direct_setMatrixWorldNeedsUpdate
	],
	[
		qa.prototype._setValue_array,
		qa.prototype._setValue_array_setNeedsUpdate,
		qa.prototype._setValue_array_setMatrixWorldNeedsUpdate
	],
	[
		qa.prototype._setValue_arrayElement,
		qa.prototype._setValue_arrayElement_setNeedsUpdate,
		qa.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
	],
	[
		qa.prototype._setValue_fromArray,
		qa.prototype._setValue_fromArray_setNeedsUpdate,
		qa.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
	]
], class {
	static {
		this.prototype.isMatrix2 = !0;
	}
	constructor(e, t, n, r) {
		this.elements = [
			1,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r);
	}
	identity() {
		return this.set(1, 0, 0, 1), this;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 4; n++) this.elements[n] = e[n + t];
		return this;
	}
	set(e, t, n, r) {
		let i = this.elements;
		return i[0] = e, i[2] = t, i[1] = n, i[3] = r, this;
	}
};
function Ja(e, t, n, r) {
	let i = Ya(r);
	switch (n) {
		case 1021: return e * t;
		case _: return e * t / i.components * i.byteLength;
		case v: return e * t / i.components * i.byteLength;
		case y: return e * t * 2 / i.components * i.byteLength;
		case b: return e * t * 2 / i.components * i.byteLength;
		case 1022: return e * t * 3 / i.components * i.byteLength;
		case m: return e * t * 4 / i.components * i.byteLength;
		case x: return e * t * 4 / i.components * i.byteLength;
		case 33776:
		case 33777: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
		case 33778:
		case 33779: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
		case 35841:
		case 35843: return Math.max(e, 16) * Math.max(t, 8) / 4;
		case 35840:
		case 35842: return Math.max(e, 8) * Math.max(t, 8) / 2;
		case 36196:
		case 37492:
		case 37488:
		case 37489: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
		case 37496:
		case 37490:
		case 37491: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
		case 37808: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
		case 37809: return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16;
		case 37810: return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16;
		case 37811: return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16;
		case 37812: return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16;
		case 37813: return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16;
		case 37814: return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16;
		case 37815: return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16;
		case 37816: return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16;
		case 37817: return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16;
		case 37818: return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16;
		case 37819: return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16;
		case 37820: return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16;
		case 37821: return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16;
		case 36492:
		case 36494:
		case 36495: return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
		case 36283:
		case 36284: return Math.ceil(e / 4) * Math.ceil(t / 4) * 8;
		case 36285:
		case 36286: return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
	}
	throw Error(`Unable to determine texture byte length for ${n} format.`);
}
function Ya(e) {
	switch (e) {
		case o:
		case 1010: return {
			byteLength: 1,
			components: 1
		};
		case s:
		case 1011:
		case u: return {
			byteLength: 2,
			components: 1
		};
		case d:
		case f: return {
			byteLength: 2,
			components: 4
		};
		case c:
		case 1013:
		case l: return {
			byteLength: 4,
			components: 1
		};
		case 35902:
		case 35899: return {
			byteLength: 4,
			components: 3
		};
	}
	throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "187" } })), typeof window < "u" && (window.__THREE__ ? L("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "187");
// ../../node_modules/.pnpm/three@0.187.0/node_modules/three/build/three.module.js
function Xa() {
	let e = null, t = !1, n = null, r = null;
	function i(t, a) {
		r = e.requestAnimationFrame(i), n(t, a);
	}
	return {
		start: function() {
			t !== !0 && n !== null && e !== null && (r = e.requestAnimationFrame(i), t = !0);
		},
		stop: function() {
			e !== null && e.cancelAnimationFrame(r), t = !1;
		},
		setAnimationLoop: function(e) {
			n = e;
		},
		setContext: function(t) {
			e = t;
		}
	};
}
function Za(e) {
	let t = /* @__PURE__ */ new WeakMap();
	function n(t, n) {
		let r = t.array, i = t.usage, a = r.byteLength, o = e.createBuffer();
		e.bindBuffer(n, o), e.bufferData(n, r, i), t.onUploadCallback();
		let s;
		if (r instanceof Float32Array) s = e.FLOAT;
		else if (typeof Float16Array < "u" && r instanceof Float16Array) s = e.HALF_FLOAT;
		else if (r instanceof Uint16Array) s = t.isFloat16BufferAttribute ? e.HALF_FLOAT : e.UNSIGNED_SHORT;
		else if (r instanceof Int16Array) s = e.SHORT;
		else if (r instanceof Uint32Array) s = e.UNSIGNED_INT;
		else if (r instanceof Int32Array) s = e.INT;
		else if (r instanceof Int8Array) s = e.BYTE;
		else if (r instanceof Uint8Array) s = e.UNSIGNED_BYTE;
		else if (r instanceof Uint8ClampedArray) s = e.UNSIGNED_BYTE;
		else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: " + r);
		return {
			buffer: o,
			type: s,
			bytesPerElement: r.BYTES_PER_ELEMENT,
			version: t.version,
			size: a
		};
	}
	function r(t, n, r) {
		let i = n.array, a = n.updateRanges;
		if (e.bindBuffer(r, t), a.length === 0) e.bufferSubData(r, 0, i);
		else {
			a.sort((e, t) => e.start - t.start);
			let t = 0;
			for (let e = 1; e < a.length; e++) {
				let n = a[t], r = a[e];
				r.start <= n.start + n.count + 1 ? n.count = Math.max(n.count, r.start + r.count - n.start) : (++t, a[t] = r);
			}
			a.length = t + 1;
			for (let t = 0, n = a.length; t < n; t++) {
				let n = a[t];
				e.bufferSubData(r, n.start * i.BYTES_PER_ELEMENT, i, n.start, n.count);
			}
			n.clearUpdateRanges();
		}
		n.onUploadCallback();
	}
	function i(e) {
		return e.isInterleavedBufferAttribute && (e = e.data), t.get(e);
	}
	function a(n) {
		n.isInterleavedBufferAttribute && (n = n.data);
		let r = t.get(n);
		r && (e.deleteBuffer(r.buffer), t.delete(n));
	}
	function o(e, i) {
		if (e.isInterleavedBufferAttribute && (e = e.data), e.isGLBufferAttribute) {
			let n = t.get(e);
			(!n || n.version < e.version) && t.set(e, {
				buffer: e.buffer,
				type: e.type,
				bytesPerElement: e.elementSize,
				version: e.version
			});
			return;
		}
		let a = t.get(e);
		if (a === void 0) t.set(e, n(e, i));
		else if (a.version < e.version) {
			if (a.size !== e.array.byteLength) throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
			r(a.buffer, e, i), a.version = e.version;
		}
	}
	return {
		get: i,
		remove: a,
		update: o
	};
}
var Qa = {
	alphahash_fragment: "#ifdef USE_ALPHAHASH\n	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif",
	alphahash_pars_fragment: "#ifdef USE_ALPHAHASH\n	const float ALPHA_HASH_SCALE = 0.05;\n	float hash2D( vec2 value ) {\n		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n	}\n	float hash3D( vec3 value ) {\n		return hash2D( vec2( hash2D( value.xy ), value.z ) );\n	}\n	float getAlphaHashThreshold( vec3 position ) {\n		float maxDeriv = max(\n			length( dFdx( position.xyz ) ),\n			length( dFdy( position.xyz ) )\n		);\n		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n		vec2 pixScales = vec2(\n			exp2( floor( log2( pixScale ) ) ),\n			exp2( ceil( log2( pixScale ) ) )\n		);\n		vec2 alpha = vec2(\n			hash3D( floor( pixScales.x * position.xyz ) ),\n			hash3D( floor( pixScales.y * position.xyz ) )\n		);\n		float lerpFactor = fract( log2( pixScale ) );\n		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n		float a = min( lerpFactor, 1.0 - lerpFactor );\n		vec3 cases = vec3(\n			x * x / ( 2.0 * a * ( 1.0 - a ) ),\n			( x - 0.5 * a ) / ( 1.0 - a ),\n			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n		);\n		float threshold = ( x < ( 1.0 - a ) )\n			? ( ( x < a ) ? cases.x : cases.y )\n			: cases.z;\n		return clamp( threshold , 1.0e-6, 1.0 );\n	}\n#endif",
	alphamap_fragment: "#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif",
	alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif",
	alphatest_fragment: "#ifdef USE_ALPHATEST\n	#ifdef ALPHA_TO_COVERAGE\n	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );\n	if ( diffuseColor.a == 0.0 ) discard;\n	#else\n	if ( diffuseColor.a < alphaTest ) discard;\n	#endif\n#endif",
	alphatest_pars_fragment: "#ifdef USE_ALPHATEST\n	uniform float alphaTest;\n#endif",
	aomap_fragment: "#ifdef USE_AOMAP\n	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n	reflectedLight.indirectDiffuse *= ambientOcclusion;\n	#if defined( USE_CLEARCOAT ) \n		clearcoatSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_SHEEN ) \n		sheenSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( STANDARD )\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n	#endif\n#endif",
	aomap_pars_fragment: "#ifdef USE_AOMAP\n	uniform sampler2D aoMap;\n	uniform float aoMapIntensity;\n#endif",
	batching_pars_vertex: "#ifdef USE_BATCHING\n	#if ! defined( GL_ANGLE_multi_draw )\n	#define gl_DrawID _gl_DrawID\n	uniform int _gl_DrawID;\n	#endif\n	uniform highp sampler2D batchingTexture;\n	uniform highp usampler2D batchingIdTexture;\n	mat4 getBatchingMatrix( const in float i ) {\n		int size = textureSize( batchingTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n	float getIndirectIndex( const in int i ) {\n		int size = textureSize( batchingIdTexture, 0 ).x;\n		int x = i % size;\n		int y = i / size;\n		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );\n	}\n#endif\n#ifdef USE_BATCHING_COLOR\n	uniform sampler2D batchingColorTexture;\n	vec4 getBatchingColor( const in float i ) {\n		int size = textureSize( batchingColorTexture, 0 ).x;\n		int j = int( i );\n		int x = j % size;\n		int y = j / size;\n		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );\n	}\n#endif",
	batching_vertex: "#ifdef USE_BATCHING\n	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );\n#endif",
	begin_vertex: "vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n	vPosition = vec3( position );\n#endif",
	beginnormal_vertex: "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n	vec3 objectTangent = vec3( tangent.xyz );\n#endif",
	bsdfs: "float G_BlinnPhong_Implicit( ) {\n	return 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( specularColor, 1.0, dotVH );\n	float G = G_BlinnPhong_Implicit( );\n	float D = D_BlinnPhong( shininess, dotNH );\n	return F * ( G * D );\n} // validated",
	iridescence_fragment: "#ifdef USE_IRIDESCENCE\n	const mat3 XYZ_TO_REC709 = mat3(\n		 3.2404542, -0.9692660,  0.0556434,\n		-1.5371385,  1.8760108, -0.2040259,\n		-0.4985314,  0.0415560,  1.0572252\n	);\n	vec3 Fresnel0ToIor( vec3 fresnel0 ) {\n		vec3 sqrtF0 = sqrt( fresnel0 );\n		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n	}\n	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n	}\n	float IorToFresnel0( float transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n	}\n	vec3 evalSensitivity( float OPD, vec3 shift ) {\n		float phase = 2.0 * PI * OPD * 1.0e-9;\n		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n		xyz /= 1.0685e-7;\n		vec3 rgb = XYZ_TO_REC709 * xyz;\n		return rgb;\n	}\n	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n		vec3 I;\n		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n		float cosTheta2Sq = 1.0 - sinTheta2Sq;\n		if ( cosTheta2Sq < 0.0 ) {\n			return vec3( 1.0 );\n		}\n		float cosTheta2 = sqrt( cosTheta2Sq );\n		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n		float R12 = F_Schlick( R0, 1.0, cosTheta1 );\n		float T121 = 1.0 - R12;\n		float phi12 = 0.0;\n		if ( iridescenceIOR < outsideIOR ) phi12 = PI;\n		float phi21 = PI - phi12;\n		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n		vec3 phi23 = vec3( 0.0 );\n		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n		vec3 phi = vec3( phi21 ) + phi23;\n		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n		vec3 r123 = sqrt( R123 );\n		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n		vec3 C0 = R12 + Rs;\n		I = C0;\n		vec3 Cm = Rs - T121;\n		for ( int m = 1; m <= 2; ++ m ) {\n			Cm *= r123;\n			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n			I += Cm * Sm;\n		}\n		return max( I, vec3( 0.0 ) );\n	}\n#endif",
	bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n	vec2 dHdxy_fwd() {\n		vec2 dSTdx = dFdx( vBumpMapUv );\n		vec2 dSTdy = dFdy( vBumpMapUv );\n		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n		return vec2( dBx, dBy );\n	}\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n		vec3 vN = surf_norm;\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n		float fDet = dot( vSigmaX, R1 ) * faceDirection;\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n	}\n#endif",
	clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n	vec4 plane;\n	#ifdef ALPHA_TO_COVERAGE\n		float distanceToPlane, distanceGradient;\n		float clipOpacity = 1.0;\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n			distanceGradient = fwidth( distanceToPlane ) / 2.0;\n			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			if ( clipOpacity == 0.0 ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			float unionClipOpacity = 1.0;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n				distanceGradient = fwidth( distanceToPlane ) / 2.0;\n				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			}\n			#pragma unroll_loop_end\n			clipOpacity *= 1.0 - unionClipOpacity;\n		#endif\n		diffuseColor.a *= clipOpacity;\n		if ( diffuseColor.a == 0.0 ) discard;\n	#else\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			bool clipped = true;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n			}\n			#pragma unroll_loop_end\n			if ( clipped ) discard;\n		#endif\n	#endif\n#endif",
	clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",
	clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n#endif",
	clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0\n	vClipPosition = - mvPosition.xyz;\n#endif",
	color_fragment: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n	diffuseColor *= vColor;\n#endif",
	color_pars_fragment: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n	varying vec4 vColor;\n#endif",
	color_pars_vertex: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	varying vec4 vColor;\n#endif",
	color_vertex: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	vColor = vec4( 1.0 );\n#endif\n#ifdef USE_COLOR_ALPHA\n	vColor *= color;\n#elif defined( USE_COLOR )\n	vColor.rgb *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n	vColor.rgb *= instanceColor.rgb;\n#endif\n#ifdef USE_BATCHING_COLOR\n	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );\n#endif",
	common: "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n	const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n	return fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n	float precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n	float precisionSafeLength( vec3 v ) {\n		float maxComponent = max3( abs( v ) );\n		return length( v / maxComponent ) * maxComponent;\n	}\n#endif\nstruct IncidentLight {\n	vec3 color;\n	vec3 direction;\n	bool visible;\n};\nstruct ReflectedLight {\n	vec3 directDiffuse;\n	vec3 directSpecular;\n	vec3 indirectDiffuse;\n	vec3 indirectSpecular;\n};\n#ifdef USE_ALPHAHASH\n	varying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\n#define inverseTransformDirection transformDirectionByInverseViewMatrix\nvec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {\n	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );\n}\nvec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {\n	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n	return m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n	return vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n	return RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated",
	defaultnormal_vertex: "vec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n	vec3 transformedTangent = objectTangent;\n#endif\n#ifdef USE_BATCHING\n	mat3 bm = mat3( batchingMatrix );\n	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n	transformedNormal = bm * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = bm * transformedTangent;\n	#endif\n#endif\n#ifdef USE_INSTANCING\n	mat3 im = mat3( instanceMatrix );\n	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n	transformedNormal = im * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = im * transformedTangent;\n	#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n	transformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n#endif",
	displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n	uniform sampler2D displacementMap;\n	uniform float displacementScale;\n	uniform float displacementBias;\n#endif",
	displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif",
	emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE\n		emissiveColor = sRGBTransferEOTF( emissiveColor );\n	#endif\n	totalEmissiveRadiance *= emissiveColor.rgb;\n#endif",
	emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n	uniform sampler2D emissiveMap;\n#endif",
	colorspace_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
	colorspace_pars_fragment: "vec4 LinearTransferOETF( in vec4 value ) {\n	return value;\n}\nvec4 sRGBTransferEOTF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 sRGBTransferOETF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}",
	envmap_fragment: "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vec3 cameraToFrag;\n		if ( isOrthographic ) {\n			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToFrag = normalize( vWorldPosition - cameraPosition );\n		}\n		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vec3 reflectVec = reflect( cameraToFrag, worldNormal );\n		#else\n			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n		#endif\n	#else\n		vec3 reflectVec = vReflect;\n	#endif\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );\n		#ifdef ENVMAP_BLENDING_MULTIPLY\n			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n		#elif defined( ENVMAP_BLENDING_MIX )\n			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n		#elif defined( ENVMAP_BLENDING_ADD )\n			outgoingLight += envColor.xyz * specularStrength * reflectivity;\n		#endif\n	#endif\n#endif",
	envmap_common_pars_fragment: "#ifdef USE_ENVMAP\n	uniform float envMapIntensity;\n	uniform mat3 envMapRotation;\n	uniform samplerCube envMap;\n	#ifdef ENVMAP_TYPE_PMREM\n		float roughnessToMip( const in float roughness ) {\n			float r = clamp( roughness, 0.0, 1.0 );\n			return ENVMAP_MAX_LOD * r * ( 2.0 - r );\n		}\n	#endif\n#endif",
	envmap_pars_fragment: "#ifdef USE_ENVMAP\n	uniform float reflectivity;\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		varying vec3 vWorldPosition;\n		uniform float refractionRatio;\n	#else\n		varying vec3 vReflect;\n	#endif\n#endif",
	envmap_pars_vertex: "#ifdef USE_ENVMAP\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		\n		varying vec3 vWorldPosition;\n	#else\n		varying vec3 vReflect;\n		uniform float refractionRatio;\n	#endif\n#endif",
	envmap_physical_pars_fragment: "#ifdef USE_ENVMAP\n	vec3 getIBLIrradiance( const in vec3 normal ) {\n		#ifdef ENVMAP_TYPE_PMREM\n			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );\n			return PI * envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n		#ifdef ENVMAP_TYPE_PMREM\n			vec3 reflectVec = reflect( - viewDir, normal );\n			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );\n			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );\n			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );\n			return envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	#ifdef USE_RETROREFLECTION\n		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n			#ifdef ENVMAP_TYPE_PMREM\n				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );\n				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );\n				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );\n				return envMapColor.rgb * envMapIntensity;\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n	#endif\n	#ifdef USE_ANISOTROPY\n		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n			#ifdef ENVMAP_TYPE_PMREM\n				vec3 bentNormal = cross( bitangent, viewDir );\n				bentNormal = normalize( cross( bentNormal, bitangent ) );\n				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n				return getIBLRadiance( viewDir, bentNormal, roughness );\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n		#ifdef USE_RETROREFLECTION\n			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n				#ifdef ENVMAP_TYPE_PMREM\n					vec3 bentNormal = cross( bitangent, viewDir );\n					bentNormal = normalize( cross( bentNormal, bitangent ) );\n					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n					return getIBLRetroRadiance( viewDir, bentNormal, roughness );\n				#else\n					return vec3( 0.0 );\n				#endif\n			}\n		#endif\n	#endif\n#endif",
	envmap_vertex: "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vWorldPosition = worldPosition.xyz;\n	#else\n		vec3 cameraToVertex;\n		if ( isOrthographic ) {\n			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n		}\n		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vReflect = reflect( cameraToVertex, worldNormal );\n		#else\n			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n		#endif\n	#endif\n#endif",
	fog_vertex: "#ifdef USE_FOG\n	vFogDepth = - mvPosition.z;\n#endif",
	fog_pars_vertex: "#ifdef USE_FOG\n	varying float vFogDepth;\n#endif",
	fog_fragment: "#ifdef USE_FOG\n	#ifdef FOG_EXP2\n		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n	#else\n		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n	#endif\n	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",
	fog_pars_fragment: "#ifdef USE_FOG\n	uniform vec3 fogColor;\n	varying float vFogDepth;\n	#ifdef FOG_EXP2\n		uniform float fogDensity;\n	#else\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n#endif",
	gradientmap_pars_fragment: "#ifdef USE_GRADIENTMAP\n	uniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n	float dotNL = dot( normal, lightDirection );\n	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n	#ifdef USE_GRADIENTMAP\n		return vec3( texture2D( gradientMap, coord ).r );\n	#else\n		vec2 fw = fwidth( coord ) * 0.5;\n		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n	#endif\n}",
	lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n	uniform sampler2D lightMap;\n	uniform float lightMapIntensity;\n#endif",
	lights_lambert_fragment: "LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;",
	lights_lambert_pars_fragment: "varying vec3 vViewPosition;\nstruct LambertMaterial {\n	vec3 diffuseColor;\n	float specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Lambert\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert",
	lights_pars_begin: "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n#if defined( USE_LIGHT_PROBES )\n	uniform vec3 lightProbe[ 9 ];\n#endif\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n	float x = normal.x, y = normal.y, z = normal.z;\n	vec3 result = shCoefficients[ 0 ] * 0.886227;\n	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n	return result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n	return irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n	vec3 irradiance = ambientLightColor;\n	return irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n	if ( cutoffDistance > 0.0 ) {\n		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n	}\n	return distanceFalloff;\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n	return smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_SUN_LIGHTS > 0\n	struct SunLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];\n	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {\n		light.color = sunLight.color;\n		light.direction = sunLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_DIR_LIGHTS > 0\n	struct DirectionalLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n		light.color = directionalLight.color;\n		light.direction = directionalLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_POINT_LIGHTS > 0\n	struct PointLight {\n		vec3 position;\n		vec3 color;\n		float distance;\n		float decay;\n	};\n	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = pointLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float lightDistance = length( lVector );\n		light.color = pointLight.color;\n		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n		light.visible = ( light.color != vec3( 0.0 ) );\n	}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n	struct SpotLight {\n		vec3 position;\n		vec3 direction;\n		vec3 color;\n		float distance;\n		float decay;\n		float coneCos;\n		float penumbraCos;\n	};\n	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = spotLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float angleCos = dot( light.direction, spotLight.direction );\n		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n		if ( spotAttenuation > 0.0 ) {\n			float lightDistance = length( lVector );\n			light.color = spotLight.color * spotAttenuation;\n			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n			light.visible = ( light.color != vec3( 0.0 ) );\n		} else {\n			light.color = vec3( 0.0 );\n			light.visible = false;\n		}\n	}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n	struct RectAreaLight {\n		vec3 color;\n		vec3 position;\n		vec3 halfWidth;\n		vec3 halfHeight;\n	};\n	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;\n	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n	struct HemisphereLight {\n		vec3 direction;\n		vec3 skyColor;\n		vec3 groundColor;\n	};\n	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n		float dotNL = dot( normal, hemiLight.direction );\n		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n		return irradiance;\n	}\n#endif\n#include <lightprobes_pars_fragment>",
	lights_toon_fragment: "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;",
	lights_toon_pars_fragment: "varying vec3 vViewPosition;\nstruct ToonMaterial {\n	vec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Toon\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon",
	lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",
	lights_phong_pars_fragment: "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n	vec3 diffuseColor;\n	vec3 specularColor;\n	float specularShininess;\n	float specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong",
	lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.metalness = metalnessFactor;\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.045 );\nmaterial.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef USE_DIFFUSE_ROUGHNESS\n	float diffuseRoughnessFactor = diffuseRoughness;\n	#ifdef USE_DIFFUSE_ROUGHNESSMAP\n		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;\n	#endif\n	material.diffuseRoughness = saturate( diffuseRoughnessFactor );\n#endif\n#ifdef IOR\n	material.ior = ior;\n	#ifdef USE_SPECULAR\n		float specularIntensityFactor = specularIntensity;\n		vec3 specularColorFactor = specularColor;\n		#ifdef USE_SPECULAR_COLORMAP\n			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n		#endif\n		#ifdef USE_SPECULAR_INTENSITYMAP\n			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n		#endif\n		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n	#else\n		float specularIntensityFactor = 1.0;\n		vec3 specularColorFactor = vec3( 1.0 );\n		material.specularF90 = 1.0;\n	#endif\n	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;\n	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n#else\n	material.specularColor = vec3( 0.04 );\n	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n	material.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n	material.clearcoat = clearcoat;\n	material.clearcoatRoughness = clearcoatRoughness;\n	material.clearcoatF0 = vec3( 0.04 );\n	material.clearcoatF90 = 1.0;\n	#ifdef USE_CLEARCOATMAP\n		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n	#endif\n	#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n	#endif\n	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );\n	material.clearcoatRoughness += geometryRoughness;\n	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_DISPERSION\n	material.dispersion = dispersion;\n#endif\n#ifdef USE_RETROREFLECTION\n	material.retroreflectivity = retroreflectivity;\n#endif\n#ifdef USE_IRIDESCENCE\n	material.iridescence = iridescence;\n	material.iridescenceIOR = iridescenceIOR;\n	#ifdef USE_IRIDESCENCEMAP\n		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n	#endif\n	#ifdef USE_IRIDESCENCE_THICKNESSMAP\n		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n	#else\n		material.iridescenceThickness = iridescenceThicknessMaximum;\n	#endif\n#endif\n#ifdef USE_SHEEN\n	material.sheenColor = sheenColor;\n	#ifdef USE_SHEEN_COLORMAP\n		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n	#endif\n	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	#ifdef USE_ANISOTROPYMAP\n		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n	#else\n		vec2 anisotropyV = anisotropyVector;\n	#endif\n	material.anisotropy = length( anisotropyV );\n	if( material.anisotropy == 0.0 ) {\n		anisotropyV = vec2( 1.0, 0.0 );\n	} else {\n		anisotropyV /= material.anisotropy;\n		material.anisotropy = saturate( material.anisotropy );\n	}\n	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n#endif",
	lights_physical_pars_fragment: "uniform sampler2D dfgLUT;\nstruct PhysicalMaterial {\n	vec3 diffuseColor;\n	vec3 diffuseContribution;\n	vec3 specularColor;\n	vec3 specularColorBlended;\n	float roughness;\n	float metalness;\n	float specularF90;\n	float dispersion;\n	vec2 dfg;\n	vec3 multiScatteringCompensation;\n	#ifdef USE_DIFFUSE_ROUGHNESS\n		float diffuseRoughness;\n	#endif\n	#ifdef USE_RETROREFLECTION\n		float retroreflectivity;\n	#endif\n	#ifdef USE_CLEARCOAT\n		float clearcoat;\n		float clearcoatRoughness;\n		vec3 clearcoatF0;\n		float clearcoatF90;\n	#endif\n	#ifdef USE_IRIDESCENCE\n		float iridescence;\n		float iridescenceIOR;\n		float iridescenceThickness;\n		vec3 iridescenceFresnel;\n		vec3 iridescenceF0Dielectric;\n		vec3 iridescenceF0Metallic;\n	#endif\n	#ifdef USE_SHEEN\n		vec3 sheenColor;\n		float sheenRoughness;\n	#endif\n	#ifdef IOR\n		float ior;\n	#endif\n	#ifdef USE_TRANSMISSION\n		float transmission;\n		float transmissionAlpha;\n		float thickness;\n		float attenuationDistance;\n		vec3 attenuationColor;\n	#endif\n	#ifdef USE_ANISOTROPY\n		float anisotropy;\n		float alphaT;\n		vec3 anisotropyT;\n		vec3 anisotropyB;\n	#endif\n};\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\n#ifdef USE_DIFFUSE_ROUGHNESS\n	const float EON_EPSILON = 1e-7;\n	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {\n		float muComp = 1.0 - mu;\n		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );\n		return A * ( 1.0 + roughness * gOverPi );\n	}\n	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {\n		vec3 rho = saturate( diffuseColor );\n		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );\n		float dotNL = saturate( dot( normal, lightDir ) );\n		float dotNV = saturate( dot( normal, viewDir ) );\n		float s = dot( lightDir, viewDir ) - dotNL * dotNV;\n		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;\n		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );\n		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );\n		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );\n		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );\n		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );\n		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );\n		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI\n			* max( EON_EPSILON, 1.0 - albedoV )\n			* max( EON_EPSILON, 1.0 - albedoL )\n			/ max( EON_EPSILON, 1.0 - averageAlbedo );\n		return singleScatter + multiScatter;\n	}\n	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {\n		vec3 rho = saturate( diffuseColor );\n		if ( roughness <= EON_EPSILON ) return rho;\n		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );\n		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );\n		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );\n		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );\n		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );\n	}\n#endif\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n	float a2 = pow2( alpha );\n	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n	return 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n	float a2 = pow2( alpha );\n	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n	return RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n		return 0.5 / max( gv + gl, EPSILON );\n	}\n	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n		float a2 = alphaT * alphaB;\n		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n		highp float v2 = dot( v, v );\n		float w2 = a2 / v2;\n		return RECIPROCAL_PI * a2 * pow2 ( w2 );\n	}\n#endif\n#ifdef USE_CLEARCOAT\n	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n		vec3 f0 = material.clearcoatF0;\n		float f90 = material.clearcoatF90;\n		float roughness = max( material.clearcoatRoughness, 0.045 );\n		float alpha = pow2( roughness );\n		vec3 halfDir = normalize( lightDir + viewDir );\n		float dotNL = saturate( dot( normal, lightDir ) );\n		float dotNV = saturate( dot( normal, viewDir ) );\n		float dotNH = saturate( dot( normal, halfDir ) );\n		float dotVH = saturate( dot( viewDir, halfDir ) );\n		vec3 F = F_Schlick( f0, f90, dotVH );\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n		return F * ( V * D );\n	}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n	vec3 f0 = material.specularColorBlended;\n	float f90 = material.specularF90;\n	float roughness = max( material.roughness, 0.045 );\n	float alpha = pow2( roughness );\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( f0, f90, dotVH );\n	#ifdef USE_IRIDESCENCE\n		F = mix( F, material.iridescenceFresnel, material.iridescence );\n	#endif\n	#ifdef USE_ANISOTROPY\n		float dotTL = dot( material.anisotropyT, lightDir );\n		float dotTV = dot( material.anisotropyT, viewDir );\n		float dotTH = dot( material.anisotropyT, halfDir );\n		float dotBL = dot( material.anisotropyB, lightDir );\n		float dotBV = dot( material.anisotropyB, viewDir );\n		float dotBH = dot( material.anisotropyB, halfDir );\n		float alphaT = max( material.alphaT, alpha );\n		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );\n	#else\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n	#endif\n	return F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n	const float LUT_SIZE = 64.0;\n	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n	const float LUT_BIAS = 0.5 / LUT_SIZE;\n	float dotNV = saturate( dot( N, V ) );\n	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n	uv = uv * LUT_SCALE + LUT_BIAS;\n	return uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n	float l = length( f );\n	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n	float x = dot( v1, v2 );\n	float y = abs( x );\n	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n	float b = 3.4175940 + ( 4.1616724 + y ) * y;\n	float v = a / b;\n	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n	return cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n	vec3 lightNormal = cross( v1, v2 );\n	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n	vec3 T1, T2;\n	T1 = normalize( V - N * dot( V, N ) );\n	T2 = - cross( N, T1 );\n	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );\n	vec3 coords[ 4 ];\n	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n	coords[ 0 ] = normalize( coords[ 0 ] );\n	coords[ 1 ] = normalize( coords[ 1 ] );\n	coords[ 2 ] = normalize( coords[ 2 ] );\n	coords[ 3 ] = normalize( coords[ 3 ] );\n	vec3 vectorFormFactor = vec3( 0.0 );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n	return vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n	float alpha = pow2( roughness );\n	float invAlpha = 1.0 / alpha;\n	float cos2h = dotNH * dotNH;\n	float sin2h = max( 1.0 - cos2h, 0.0078125 );\n	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float D = D_Charlie( sheenRoughness, dotNH );\n	float V = V_Neubelt( dotNV, dotNL );\n	return sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float r2 = roughness * roughness;\n	float rInv = 1.0 / ( roughness + 0.1 );\n	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;\n	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;\n	float DG = exp( a * dotNV + b );\n	return saturate( DG );\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;\n	return specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n	#ifdef USE_IRIDESCENCE\n		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n	#else\n		vec3 Fr = specularColor;\n	#endif\n	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n	float Ess = fab.x + fab.y;\n	float Ems = 1.0 - Ess;\n	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n	singleScatter += FssEss;\n	multiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n		vec3 normal = geometryNormal;\n		vec3 viewDir = geometryViewDir;\n		vec3 position = geometryPosition;\n		vec3 lightPos = rectAreaLight.position;\n		vec3 halfWidth = rectAreaLight.halfWidth;\n		vec3 halfHeight = rectAreaLight.halfHeight;\n		vec3 lightColor = rectAreaLight.color;\n		float roughness = material.roughness;\n		vec3 rectCoords[ 4 ];\n		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n		vec2 uv = LTC_Uv( normal, viewDir, roughness );\n		vec4 t1 = texture2D( ltc_1, uv );\n		vec4 t2 = texture2D( ltc_2, uv );\n		mat3 mInv = mat3(\n			vec3( t1.x, 0, t1.y ),\n			vec3(    0, 1,    0 ),\n			vec3( t1.z, 0, t1.w )\n		);\n		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );\n		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n		#ifdef USE_CLEARCOAT\n			vec3 Ncc = geometryClearcoatNormal;\n			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );\n			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );\n			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );\n			mat3 mInvClearcoat = mat3(\n				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),\n				vec3(             0, 1,             0 ),\n				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )\n			);\n			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;\n			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );\n		#endif\n	}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	#ifdef USE_CLEARCOAT\n		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n		vec3 ccIrradiance = dotNLcc * directLight.color;\n		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n	#endif\n	#ifdef USE_SHEEN\n \n 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n \n 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );\n \n 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );\n \n 		irradiance *= sheenEnergyComp;\n \n 	#endif\n	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n	#ifdef USE_RETROREFLECTION\n		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );\n		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );\n		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );\n	#endif\n	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;\n	vec3 halfDir = normalize( directLight.direction + geometryViewDir );\n	float dotVH = saturate( dot( geometryViewDir, halfDir ) );\n	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );\n	#ifdef USE_RETROREFLECTION\n		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );\n		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );\n		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );\n		F = mix( F, retroF, saturate( material.retroreflectivity ) );\n	#endif\n	#ifdef USE_DIFFUSE_ROUGHNESS\n		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );\n	#else\n		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );\n	#endif\n	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 singleScattering = vec3( 0.0 );\n	vec3 multiScattering = vec3( 0.0 );\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );\n	#else\n		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );\n	#endif\n	#ifdef USE_DIFFUSE_ROUGHNESS\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );\n		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );\n	#else\n		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );\n	#endif\n	#ifdef USE_SHEEN\n		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;\n		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n		diffuse *= sheenEnergyComp;\n	#endif\n	reflectedLight.indirectDiffuse += diffuse;\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n	#ifdef USE_CLEARCOAT\n		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n	#endif\n	#ifdef USE_SHEEN\n		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;\n 	#endif\n	vec3 singleScatteringDielectric = vec3( 0.0 );\n	vec3 multiScatteringDielectric = vec3( 0.0 );\n	vec3 singleScatteringMetallic = vec3( 0.0 );\n	vec3 multiScatteringMetallic = vec3( 0.0 );\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );\n		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );\n	#else\n		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );\n		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );\n	#endif\n	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );\n	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );\n	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;\n	#ifdef USE_DIFFUSE_ROUGHNESS\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );\n	#else\n		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );\n	#endif\n	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n	vec3 indirectSpecular = radiance * singleScattering;\n	indirectSpecular += multiScattering * cosineWeightedIrradiance;\n	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;\n	#ifdef USE_SHEEN\n		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n		indirectSpecular *= sheenEnergyComp;\n		indirectDiffuse *= sheenEnergyComp;\n	#endif\n	reflectedLight.indirectSpecular += indirectSpecular;\n	reflectedLight.indirectDiffuse += indirectDiffuse;\n}\n#define RE_Direct				RE_Direct_Physical\n#define RE_Direct_RectArea		RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular		RE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",
	lights_fragment_begin: "\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n#ifdef USE_CLEARCOAT\n	geometryClearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n	float dotNVi = saturate( dot( normal, geometryViewDir ) );\n	if ( material.iridescenceThickness == 0.0 ) {\n		material.iridescence = 0.0;\n	} else {\n		material.iridescence = saturate( material.iridescence );\n	}\n	if ( material.iridescence > 0.0 ) {\n		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );\n		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );\n		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );\n		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );\n	}\n#endif\n#ifdef STANDARD\n	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );\n	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;\n	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )\n		float EssMs = material.dfg.x + material.dfg.y;\n		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );\n	#endif\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n	PointLight pointLight;\n	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n	PointLightShadow pointLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n		pointLight = pointLights[ i ];\n		getPointLightInfo( pointLight, geometryPosition, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n		pointLightShadow = pointLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n	SpotLight spotLight;\n	vec4 spotColor;\n	vec3 spotLightCoord;\n	bool inSpotLightMap;\n	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n		spotLight = spotLights[ i ];\n		getSpotLightInfo( spotLight, geometryPosition, directLight );\n		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n		#else\n		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#endif\n		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n		#endif\n		#undef SPOT_LIGHT_MAP_INDEX\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		spotLightShadow = spotLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )\n	SunLight sunLight;\n	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0\n	SunLightShadow sunLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {\n		sunLight = sunLights[ i ];\n		getSunLightInfo( sunLight, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )\n		sunLightShadow = sunLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n	DirectionalLight directionalLight;\n	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n		directionalLight = directionalLights[ i ];\n		getDirectionalLightInfo( directionalLight, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n		directionalLightShadow = directionalLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n	RectAreaLight rectAreaLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n		rectAreaLight = rectAreaLights[ i ];\n		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n	vec3 iblIrradiance = vec3( 0.0 );\n	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n	#if defined( USE_LIGHT_PROBES )\n		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n	#endif\n	#if ( NUM_HEMI_LIGHTS > 0 )\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n		}\n		#pragma unroll_loop_end\n	#endif\n	#if NUM_LIGHT_PROBE_GRIDS > 0\n		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;\n		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );\n		int probeGrid = - 1;\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {\n			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;\n		}\n		#pragma unroll_loop_end\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {\n			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if defined( RE_IndirectSpecular )\n	vec3 radiance = vec3( 0.0 );\n	vec3 clearcoatRadiance = vec3( 0.0 );\n#endif",
	lights_fragment_maps: "#if defined( RE_IndirectDiffuse )\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n		irradiance += lightMapIrradiance;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )\n		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )\n			iblIrradiance += getIBLIrradiance( geometryNormal );\n		#endif\n	#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n	#ifdef USE_ANISOTROPY\n		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n	#else\n		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n	#endif\n	#ifdef USE_RETROREFLECTION\n		#ifdef USE_ANISOTROPY\n			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n		#else\n			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );\n		#endif\n		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );\n	#endif\n	radiance += iblRadiance;\n	#ifdef USE_CLEARCOAT\n		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n	#endif\n#endif",
	lights_fragment_end: "#if defined( RE_IndirectDiffuse )\n	#if defined( LAMBERT ) || defined( PHONG )\n		irradiance += iblIrradiance;\n	#endif\n	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif",
	lightprobes_pars_fragment: "#if NUM_LIGHT_PROBE_GRIDS > 0\nuniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];\nuniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];\nuniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];\nuniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];\nbool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {\n	vec3 spacing = ( probesMax - probesMin ) / probesResolution;\n	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;\n	vec3 margin = spacing * 0.01;\n	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );\n}\nvec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {\n	vec3 res = probesResolution;\n	vec3 gridRange = probesMax - probesMin;\n	vec3 probeSpacing = gridRange / res;\n	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;\n	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );\n	float nz          = res.z;\n	float paddedSlices = nz + 2.0;\n	float atlasDepth  = 7.0 * paddedSlices;\n	float uvZBase     = uvw.z * nz + 1.0;\n	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );\n	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );\n	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );\n	vec3 c0 = s0.xyz;\n	vec3 c1 = vec3( s0.w, s1.xy );\n	vec3 c2 = vec3( s1.zw, s2.x );\n	vec3 c3 = s2.yzw;\n	vec3 c4 = s3.xyz;\n	vec3 c5 = vec3( s3.w, s4.xy );\n	vec3 c6 = vec3( s4.zw, s5.x );\n	vec3 c7 = s5.yzw;\n	vec3 c8 = s6.xyz;\n	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;\n	vec3 result = c0 * 0.886227;\n	result += c1 * 2.0 * 0.511664 * y;\n	result += c2 * 2.0 * 0.511664 * z;\n	result += c3 * 2.0 * 0.511664 * x;\n	result += c4 * 2.0 * 0.429043 * x * y;\n	result += c5 * 2.0 * 0.429043 * y * z;\n	result += c6 * ( 0.743125 * z * z - 0.247708 );\n	result += c7 * 2.0 * 0.429043 * x * z;\n	result += c8 * 0.429043 * ( x * x - y * y );\n	return max( result, vec3( 0.0 ) );\n}\n#endif",
	logdepthbuf_fragment: "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
	logdepthbuf_pars_fragment: "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	uniform float logDepthBufFC;\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif",
	logdepthbuf_pars_vertex: "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif",
	logdepthbuf_vertex: "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	vFragDepth = 1.0 + gl_Position.w;\n	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n#endif",
	map_fragment: "#ifdef USE_MAP\n	vec4 sampledDiffuseColor = texture2D( map, vMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );\n	#endif\n	diffuseColor *= sampledDiffuseColor;\n#endif",
	map_pars_fragment: "#ifdef USE_MAP\n	uniform sampler2D map;\n#endif",
	map_particle_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n	#if defined( USE_POINTS_UV )\n		vec2 uv = vUv;\n	#else\n		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n	#endif\n#endif\n#ifdef USE_MAP\n	diffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",
	map_particle_pars_fragment: "#if defined( USE_POINTS_UV )\n	varying vec2 vUv;\n#else\n	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n		uniform mat3 uvTransform;\n	#endif\n#endif\n#ifdef USE_MAP\n	uniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif",
	metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n	metalnessFactor *= texelMetalness.b;\n#endif",
	metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n	uniform sampler2D metalnessMap;\n#endif",
	morphinstance_vertex: "#ifdef USE_INSTANCING_MORPH\n	float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;\n	}\n#endif",
	morphcolor_vertex: "#if defined( USE_MORPHCOLORS )\n	#if defined( USE_COLOR_ALPHA )\n		vColor *= morphTargetBaseInfluence;\n	#elif defined( USE_COLOR )\n		vColor.rgb *= morphTargetBaseInfluence;\n	#endif\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		#if defined( USE_COLOR_ALPHA )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n		#elif defined( USE_COLOR )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n		#endif\n	}\n#endif",
	morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n	objectNormal *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif",
	morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n	#ifndef USE_INSTANCING_MORPH\n		uniform float morphTargetBaseInfluence;\n		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	#endif\n	uniform sampler2DArray morphTargetsTexture;\n	uniform ivec2 morphTargetsTextureSize;\n	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n		int y = texelIndex / morphTargetsTextureSize.x;\n		int x = texelIndex - y * morphTargetsTextureSize.x;\n		ivec3 morphUV = ivec3( x, y, morphTargetIndex );\n		return texelFetch( morphTargetsTexture, morphUV, 0 );\n	}\n#endif",
	morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n	transformed *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif",
	normal_fragment_begin: "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n	vec3 fdx = dFdx( vViewPosition );\n	vec3 fdy = dFdy( vViewPosition );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n#else\n	vec3 normal = normalize( vNormal );\n	#ifdef DOUBLE_SIDED\n		normal *= faceDirection;\n	#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n	#ifdef USE_TANGENT\n		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn = getTangentFrame( - vViewPosition, normal,\n		#if defined( USE_NORMALMAP )\n			vNormalMapUv\n		#elif defined( USE_CLEARCOAT_NORMALMAP )\n			vClearcoatNormalMapUv\n		#else\n			vUv\n		#endif\n		);\n	#endif\n	#ifdef DOUBLE_SIDED\n		tbn[0] *= faceDirection;\n		tbn[1] *= faceDirection;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	#ifdef USE_TANGENT\n		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n	#endif\n	#ifdef DOUBLE_SIDED\n		tbn2[0] *= faceDirection;\n		tbn2[1] *= faceDirection;\n	#endif\n#endif\nvec3 nonPerturbedNormal = normal;",
	normal_fragment_maps: "#ifdef USE_NORMALMAP_OBJECTSPACE\n	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#ifdef FLIP_SIDED\n		normal = - normal;\n	#endif\n	#ifdef DOUBLE_SIDED\n		normal = normal * faceDirection;\n	#endif\n	normal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#if defined( USE_PACKED_NORMALMAP )\n		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );\n	#endif\n	mapN.xy *= normalScale;\n	normal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif",
	normal_pars_fragment: "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif",
	normal_pars_vertex: "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif",
	normal_vertex: "#ifndef FLAT_SHADED\n	vNormal = normalize( transformedNormal );\n	#ifdef USE_TANGENT\n		vTangent = normalize( transformedTangent );\n		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n		#ifdef FLIP_SIDED\n			vBitangent = - vBitangent;\n		#endif\n	#endif\n#endif",
	normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n	uniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( uv.st );\n		vec2 st1 = dFdy( uv.st );\n		vec3 N = surf_norm;\n		vec3 q1perp = cross( q1, N );\n		vec3 q0perp = cross( N, q0 );\n		vec3 T = q1perp * st0.x + q0perp * st1.x;\n		vec3 B = q1perp * st0.y + q0perp * st1.y;\n		float det = max( dot( T, T ), dot( B, B ) );\n		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n		return mat3( T * scale, B * scale, N );\n	}\n#endif",
	clearcoat_normal_fragment_begin: "#ifdef USE_CLEARCOAT\n	vec3 clearcoatNormal = nonPerturbedNormal;\n#endif",
	clearcoat_normal_fragment_maps: "#ifdef USE_CLEARCOAT_NORMALMAP\n	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n	clearcoatMapN.xy *= clearcoatNormalScale;\n	clearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif",
	clearcoat_pars_fragment: "#ifdef USE_CLEARCOATMAP\n	uniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform sampler2D clearcoatNormalMap;\n	uniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform sampler2D clearcoatRoughnessMap;\n#endif",
	iridescence_pars_fragment: "#ifdef USE_IRIDESCENCEMAP\n	uniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform sampler2D iridescenceThicknessMap;\n#endif",
	opaque_fragment: "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );",
	packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n	return normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n	return 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;\nconst float Inv255 = 1. / 255.;\nconst vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );\nconst vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );\nconst vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );\nconst vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );\nvec4 packDepthToRGBA( const in float v ) {\n	if( v <= 0.0 )\n		return vec4( 0., 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec4( 1., 1., 1., 1. );\n	float vuf;\n	float af = modf( v * PackFactors.a, vuf );\n	float bf = modf( vuf * ShiftRight8, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );\n}\nvec3 packDepthToRGB( const in float v ) {\n	if( v <= 0.0 )\n		return vec3( 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec3( 1., 1., 1. );\n	float vuf;\n	float bf = modf( v * PackFactors.b, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec3( vuf * Inv255, gf * PackUpscale, bf );\n}\nvec2 packDepthToRG( const in float v ) {\n	if( v <= 0.0 )\n		return vec2( 0., 0. );\n	if( v >= 1.0 )\n		return vec2( 1., 1. );\n	float vuf;\n	float gf = modf( v * 256., vuf );\n	return vec2( vuf * Inv255, gf );\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n	return dot( v, UnpackFactors4 );\n}\nfloat unpackRGBToDepth( const in vec3 v ) {\n	return dot( v, UnpackFactors3 );\n}\nfloat unpackRGToDepth( const in vec2 v ) {\n	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;\n}\nvec4 pack2HalfToRGBA( const in vec2 v ) {\n	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( const in vec4 v ) {\n	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n	\n		return depth * ( far - near ) - far;\n	#else\n		return depth * ( near - far ) - near;\n	#endif\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n		return ( near * far ) / ( ( near - far ) * depth - near );\n	#else\n		return ( near * far ) / ( ( far - near ) * depth - far );\n	#endif\n}",
	premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n	gl_FragColor.rgb *= gl_FragColor.a;\n#endif",
	project_vertex: "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_BATCHING\n	mvPosition = batchingMatrix * mvPosition;\n#endif\n#ifdef USE_INSTANCING\n	mvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",
	dithering_fragment: "#ifdef DITHERING\n	gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",
	dithering_pars_fragment: "#ifdef DITHERING\n	vec3 dithering( vec3 color ) {\n		float grid_position = rand( gl_FragCoord.xy );\n		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n		return color + dither_shift_RGB;\n	}\n#endif",
	roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n	roughnessFactor *= texelRoughness.g;\n#endif",
	roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n	uniform sampler2D roughnessMap;\n#endif",
	shadowmap_pars_fragment: "#if NUM_SPOT_LIGHT_COORDS > 0\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		#define SUN_LIGHT_CASCADES 2\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];\n		#endif\n		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];\n		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];\n		varying vec4 vSunShadowWorldPosition;\n		varying vec3 vSunShadowWorldNormal;\n		struct SunLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		#endif\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		#endif\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		#elif defined( SHADOWMAP_TYPE_BASIC )\n			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		#endif\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n	#if defined( SHADOWMAP_TYPE_PCF )\n		float interleavedGradientNoise( vec2 position ) {\n			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );\n		}\n		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {\n			const float goldenAngle = 2.399963229728653;\n			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );\n			float theta = float( sampleIndex ) * goldenAngle + phi;\n			return vec2( cos( theta ), sin( theta ) ) * r;\n		}\n	#endif\n	#if defined( SHADOWMAP_TYPE_PCF )\n		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n				vec2 radius = shadowRadius * texelSize;\n				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;\n				shadow = (\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )\n				) * 0.2;\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#elif defined( SHADOWMAP_TYPE_VSM )\n		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;\n				float mean = distribution.x;\n				float variance = distribution.y * distribution.y;\n				#ifdef USE_REVERSED_DEPTH_BUFFER\n					float hard_shadow = step( mean, shadowCoord.z );\n				#else\n					float hard_shadow = step( shadowCoord.z, mean );\n				#endif\n				\n				if ( hard_shadow == 1.0 ) {\n					shadow = 1.0;\n				} else {\n					variance = max( variance, 0.0000001 );\n					float d = shadowCoord.z - mean;\n					float p_max = variance / ( variance + d * d );\n					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );\n					shadow = max( hard_shadow, p_max );\n				}\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#else\n		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				float depth = texture2D( shadowMap, shadowCoord.xy ).r;\n				#ifdef USE_REVERSED_DEPTH_BUFFER\n					shadow = step( depth, shadowCoord.z );\n				#else\n					shadow = step( shadowCoord.z, depth );\n				#endif\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#endif\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		float getSunShadow(\n			#if defined( SHADOWMAP_TYPE_PCF )\n				sampler2DShadow shadowMap,\n			#else\n				sampler2D shadowMap,\n			#endif\n			SunLightShadow sunLightShadow,\n			int shadowIndex\n		) {\n			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );\n			float viewDepth = vSunShadowWorldPosition.w;\n			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;\n			float shadow = 1.0;\n			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {\n				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];\n				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {\n					float cascadeShadow = getShadow(\n						shadowMap,\n						sunLightShadow.shadowMapSize,\n						sunLightShadow.shadowIntensity,\n						sunLightShadow.shadowBias,\n						sunLightShadow.shadowRadius,\n						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition\n					);\n					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );\n				}\n			}\n			return shadow;\n		}\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n	#if defined( SHADOWMAP_TYPE_PCF )\n	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 bd3D = normalize( lightToPosition );\n		vec3 absVec = abs( lightToPosition );\n		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n			float lightDistance = length( lightToPosition );\n			float depthRange = shadowCameraFar - shadowCameraNear;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				float depthA = - shadowCameraNear / depthRange - shadowBias;\n				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );\n			#else\n				float depthA = shadowCameraFar / depthRange + shadowBias;\n				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );\n			#endif\n			float texelSize = shadowRadius / shadowMapSize.x;\n			vec3 absDir = abs( bd3D );\n			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );\n			tangent = normalize( cross( bd3D, tangent ) );\n			vec3 bitangent = cross( bd3D, tangent );\n			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;\n			shadow = 0.0;\n			for ( int i = 0; i < 5; i ++ ) {\n				vec2 offset = vogelDiskSample( i, 5, phi );\n				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;\n				vec3 absDirection = abs( direction );\n				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );\n				shadow += texture( shadowMap, vec4( direction, dp ) );\n			}\n			shadow *= 0.2;\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	#elif defined( SHADOWMAP_TYPE_BASIC )\n	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 absVec = abs( lightToPosition );\n		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n			dp += shadowBias;\n			vec3 bd3D = normalize( lightToPosition );\n			float depth = textureCube( shadowMap, bd3D ).r;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				depth = 1.0 - depth;\n			#endif\n			shadow = step( dp, depth );\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	#endif\n	#endif\n#endif",
	shadowmap_pars_vertex: "#if NUM_SPOT_LIGHT_COORDS > 0\n	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		varying vec4 vSunShadowWorldPosition;\n		varying vec3 vSunShadowWorldNormal;\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n#endif",
	shadowmap_vertex: "#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n	#ifdef HAS_NORMAL\n		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );\n	#else\n		vec3 shadowWorldNormal = vec3( 0.0 );\n	#endif\n	vec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );\n		vSunShadowWorldNormal = shadowWorldNormal;\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n		shadowWorldPosition = worldPosition;\n		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n		#endif\n		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n	}\n	#pragma unroll_loop_end\n#endif",
	shadowmask_pars_fragment: "float getShadowMask() {\n	float shadow = 1.0;\n	#ifdef USE_SHADOWMAP\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n	SunLightShadow sunLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {\n		sunLight = sunLightShadows[ i ];\n		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n		directionalLight = directionalLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n		spotLight = spotLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n	PointLightShadow pointLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n		pointLight = pointLightShadows[ i ];\n		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#endif\n	return shadow;\n}",
	skinbase_vertex: "#ifdef USE_SKINNING\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
	skinning_pars_vertex: "#ifdef USE_SKINNING\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n	uniform highp sampler2D boneTexture;\n	mat4 getBoneMatrix( const in float i ) {\n		int size = textureSize( boneTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n#endif",
	skinning_vertex: "#ifdef USE_SKINNING\n	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	transformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",
	skinnormal_vertex: "#ifdef USE_SKINNING\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n	#ifdef USE_TANGENT\n		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n	#endif\n#endif",
	specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n	specularStrength = texelSpecular.r;\n#else\n	specularStrength = 1.0;\n#endif",
	specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n	uniform sampler2D specularMap;\n#endif",
	tonemapping_fragment: "#if defined( TONE_MAPPING )\n	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",
	tonemapping_pars_fragment: "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n	return saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	return saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 CineonToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	color = max( vec3( 0.0 ), color - 0.004 );\n	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n	return a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n	const mat3 ACESInputMat = mat3(\n		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),\n		vec3( 0.04823, 0.01566, 0.83777 )\n	);\n	const mat3 ACESOutputMat = mat3(\n		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),\n		vec3( -0.07367, -0.00605,  1.07602 )\n	);\n	color *= toneMappingExposure / 0.6;\n	color = ACESInputMat * color;\n	color = RRTAndODTFit( color );\n	color = ACESOutputMat * color;\n	return saturate( color );\n}\nconst mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(\n	vec3( 1.6605, - 0.1246, - 0.0182 ),\n	vec3( - 0.5876, 1.1329, - 0.1006 ),\n	vec3( - 0.0728, - 0.0083, 1.1187 )\n);\nconst mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(\n	vec3( 0.6274, 0.0691, 0.0164 ),\n	vec3( 0.3293, 0.9195, 0.0880 ),\n	vec3( 0.0433, 0.0113, 0.8956 )\n);\nvec3 agxDefaultContrastApprox( vec3 x ) {\n	vec3 x2 = x * x;\n	vec3 x4 = x2 * x2;\n	return + 15.5 * x4 * x2\n		- 40.14 * x4 * x\n		+ 31.96 * x4\n		- 6.868 * x2 * x\n		+ 0.4298 * x2\n		+ 0.1191 * x\n		- 0.00232;\n}\nvec3 AgXToneMapping( vec3 color ) {\n	const mat3 AgXInsetMatrix = mat3(\n		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),\n		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),\n		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )\n	);\n	const mat3 AgXOutsetMatrix = mat3(\n		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),\n		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),\n		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )\n	);\n	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;\n	color *= toneMappingExposure;\n	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;\n	color = AgXInsetMatrix * color;\n	color = max( color, 1e-10 );	color = log2( color );\n	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );\n	color = clamp( color, 0.0, 1.0 );\n	color = agxDefaultContrastApprox( color );\n	color = AgXOutsetMatrix * color;\n	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );\n	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;\n	color = clamp( color, 0.0, 1.0 );\n	return color;\n}\nvec3 NeutralToneMapping( vec3 color ) {\n	const float StartCompression = 0.8 - 0.04;\n	const float Desaturation = 0.15;\n	color *= toneMappingExposure;\n	float x = min( color.r, min( color.g, color.b ) );\n	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;\n	color -= offset;\n	float peak = max( color.r, max( color.g, color.b ) );\n	if ( peak < StartCompression ) return color;\n	float d = 1. - StartCompression;\n	float newPeak = 1. - d * d / ( peak + d - StartCompression );\n	color *= newPeak / peak;\n	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );\n	return mix( color, vec3( newPeak ), g );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",
	transmission_fragment: "#ifdef USE_TRANSMISSION\n	material.transmission = transmission;\n	material.transmissionAlpha = 1.0;\n	material.thickness = thickness;\n	material.attenuationDistance = attenuationDistance;\n	material.attenuationColor = attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n	#endif\n	vec3 pos = vWorldPosition;\n	vec3 v = normalize( cameraPosition - pos );\n	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );\n	vec4 transmitted = getIBLVolumeRefraction(\n		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,\n		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,\n		material.attenuationColor, material.attenuationDistance );\n	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif",
	transmission_pars_fragment: "#ifdef USE_TRANSMISSION\n	uniform float transmission;\n	uniform float thickness;\n	uniform float attenuationDistance;\n	uniform vec3 attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		uniform sampler2D transmissionMap;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		uniform sampler2D thicknessMap;\n	#endif\n	uniform vec2 transmissionSamplerSize;\n	uniform sampler2D transmissionSamplerMap;\n	uniform mat4 modelMatrix;\n	uniform mat4 projectionMatrix;\n	varying vec3 vWorldPosition;\n	float w0( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n	}\n	float w1( float a ) {\n		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n	}\n	float w2( float a ){\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n	}\n	float w3( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * a * a );\n	}\n	float g0( float a ) {\n		return w0( a ) + w1( a );\n	}\n	float g1( float a ) {\n		return w2( a ) + w3( a );\n	}\n	float h0( float a ) {\n		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n	}\n	float h1( float a ) {\n		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n	}\n	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n		uv = uv * texelSize.zw + 0.5;\n		vec2 iuv = floor( uv );\n		vec2 fuv = fract( uv );\n		float g0x = g0( fuv.x );\n		float g1x = g1( fuv.x );\n		float h0x = h0( fuv.x );\n		float h1x = h1( fuv.x );\n		float h0y = h0( fuv.y );\n		float h1y = h1( fuv.y );\n		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n	}\n	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n		vec2 fLodSizeInv = 1.0 / fLodSize;\n		vec2 cLodSizeInv = 1.0 / cLodSize;\n		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n		return mix( fSample, cSample, fract( lod ) );\n	}\n	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n		vec3 modelScale;\n		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n		return normalize( refractionVector ) * thickness * modelScale;\n	}\n	float applyIorToRoughness( const in float roughness, const in float ior ) {\n		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n	}\n	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n	}\n	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n		if ( isinf( attenuationDistance ) ) {\n			return vec3( 1.0 );\n		} else {\n			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;\n		}\n	}\n	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,\n		const in vec3 attenuationColor, const in float attenuationDistance ) {\n		vec4 transmittedLight;\n		vec3 transmittance;\n		#ifdef USE_DISPERSION\n			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;\n			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );\n			for ( int i = 0; i < 3; i ++ ) {\n				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );\n				vec3 refractedRayExit = position + transmissionRay;\n				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n				vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n				refractionCoords += 1.0;\n				refractionCoords /= 2.0;\n				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );\n				transmittedLight[ i ] = transmissionSample[ i ];\n				transmittedLight.a += transmissionSample.a;\n				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];\n			}\n			transmittedLight.a /= 3.0;\n		#else\n			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n			vec3 refractedRayExit = position + transmissionRay;\n			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n			vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n			refractionCoords += 1.0;\n			refractionCoords /= 2.0;\n			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n		#endif\n		vec3 attenuatedColor = transmittance * transmittedLight.rgb;\n		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n	}\n#endif",
	uv_pars_fragment: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_DIFFUSE_ROUGHNESSMAP\n	varying vec2 vDiffuseRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif",
	uv_pars_vertex: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	uniform mat3 mapTransform;\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform mat3 alphaMapTransform;\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	uniform mat3 lightMapTransform;\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	uniform mat3 aoMapTransform;\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	uniform mat3 bumpMapTransform;\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	uniform mat3 normalMapTransform;\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	uniform mat3 displacementMapTransform;\n	varying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	uniform mat3 emissiveMapTransform;\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	uniform mat3 metalnessMapTransform;\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	uniform mat3 roughnessMapTransform;\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_DIFFUSE_ROUGHNESSMAP\n	uniform mat3 diffuseRoughnessMapTransform;\n	varying vec2 vDiffuseRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	uniform mat3 anisotropyMapTransform;\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	uniform mat3 clearcoatMapTransform;\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform mat3 clearcoatNormalMapTransform;\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform mat3 clearcoatRoughnessMapTransform;\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	uniform mat3 sheenColorMapTransform;\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	uniform mat3 sheenRoughnessMapTransform;\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	uniform mat3 iridescenceMapTransform;\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform mat3 iridescenceThicknessMapTransform;\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	uniform mat3 specularMapTransform;\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	uniform mat3 specularColorMapTransform;\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	uniform mat3 specularIntensityMapTransform;\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif",
	uv_vertex: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	vUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DIFFUSE_ROUGHNESSMAP\n	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif",
	worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n	vec4 worldPosition = vec4( transformed, 1.0 );\n	#ifdef USE_BATCHING\n		worldPosition = batchingMatrix * worldPosition;\n	#endif\n	#ifdef USE_INSTANCING\n		worldPosition = instanceMatrix * worldPosition;\n	#endif\n	worldPosition = modelMatrix * worldPosition;\n#endif",
	background_vert: "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	gl_Position = vec4( position.xy, 1.0, 1.0 );\n}",
	background_frag: "uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n	vec4 texColor = texture2D( t2D, vUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	backgroundCube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}",
	backgroundCube_frag: "uniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nuniform mat3 backgroundRotation;\nvarying vec3 vWorldDirection;\n#include <envmap_common_pars_fragment>\nvoid main() {\n	#ifdef ENVMAP_TYPE_PMREM\n		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );\n	#else\n		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	cube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}",
	cube_frag: "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n	gl_FragColor = texColor;\n	gl_FragColor.a *= opacity;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	depth_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vHighPrecisionZW = gl_Position.zw;\n}",
	depth_frag: "#if DEPTH_PACKING == 3200\n	uniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#if DEPTH_PACKING == 3200\n		diffuseColor.a = opacity;\n	#endif\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <logdepthbuf_fragment>\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];\n	#else\n		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;\n	#endif\n	#if DEPTH_PACKING == 3200\n		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n	#elif DEPTH_PACKING == 3201\n		gl_FragColor = packDepthToRGBA( fragCoordZ );\n	#elif DEPTH_PACKING == 3202\n		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );\n	#elif DEPTH_PACKING == 3203\n		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );\n	#endif\n}",
	distance_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <worldpos_vertex>\n	#include <clipping_planes_vertex>\n	vWorldPosition = worldPosition.xyz;\n}",
	distance_frag: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	float dist = length( vWorldPosition - referencePosition );\n	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n	dist = saturate( dist );\n	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );\n}",
	equirect_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n}",
	equirect_frag: "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vec3 direction = normalize( vWorldDirection );\n	vec2 sampleUV = equirectUv( direction );\n	gl_FragColor = texture2D( tEquirect, sampleUV );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	vLineDistance = scale * lineDistance;\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}",
	linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	if ( mod( vLineDistance, totalSize ) > dashSize ) {\n		discard;\n	}\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	meshbasic_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinbase_vertex>\n		#include <skinnormal_vertex>\n		#include <defaultnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <fog_vertex>\n}",
	meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n	#else\n		reflectedLight.indirectDiffuse += vec3( 1.0 );\n	#endif\n	#include <aomap_fragment>\n	reflectedLight.indirectDiffuse *= diffuseColor.rgb;\n	vec3 outgoingLight = reflectedLight.indirectDiffuse;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshlambert_vert: "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshlambert_frag: "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_lambert_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshmatcap_vert: "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n	vViewPosition = - mvPosition.xyz;\n}",
	meshmatcap_frag: "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	vec3 viewDir = normalize( vViewPosition );\n	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n	vec3 y = cross( viewDir, x );\n	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n	#ifdef USE_MATCAP\n		vec4 matcapColor = texture2D( matcap, uv );\n	#else\n		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n	#endif\n	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshnormal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	vViewPosition = - mvPosition.xyz;\n#endif\n}",
	meshnormal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );\n	#ifdef OPAQUE\n		gl_FragColor.a = 1.0;\n	#endif\n}",
	meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_phong_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshphysical_vert: "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n	varying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n	vWorldPosition = worldPosition.xyz;\n#endif\n}",
	meshphysical_frag: "#define STANDARD\n#ifdef PHYSICAL\n	#define IOR\n	#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n	uniform float ior;\n#endif\n#ifdef USE_SPECULAR\n	uniform float specularIntensity;\n	uniform vec3 specularColor;\n	#ifdef USE_SPECULAR_COLORMAP\n		uniform sampler2D specularColorMap;\n	#endif\n	#ifdef USE_SPECULAR_INTENSITYMAP\n		uniform sampler2D specularIntensityMap;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT\n	uniform float clearcoat;\n	uniform float clearcoatRoughness;\n#endif\n#ifdef USE_DIFFUSE_ROUGHNESS\n	uniform float diffuseRoughness;\n	#ifdef USE_DIFFUSE_ROUGHNESSMAP\n		uniform sampler2D diffuseRoughnessMap;\n	#endif\n#endif\n#ifdef USE_DISPERSION\n	uniform float dispersion;\n#endif\n#ifdef USE_RETROREFLECTION\n	uniform float retroreflectivity;\n#endif\n#ifdef USE_IRIDESCENCE\n	uniform float iridescence;\n	uniform float iridescenceIOR;\n	uniform float iridescenceThicknessMinimum;\n	uniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n	uniform vec3 sheenColor;\n	uniform float sheenRoughness;\n	#ifdef USE_SHEEN_COLORMAP\n		uniform sampler2D sheenColorMap;\n	#endif\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		uniform sampler2D sheenRoughnessMap;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	uniform vec2 anisotropyVector;\n	#ifdef USE_ANISOTROPYMAP\n		uniform sampler2D anisotropyMap;\n	#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <roughnessmap_fragment>\n	#include <metalnessmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <clearcoat_normal_fragment_begin>\n	#include <clearcoat_normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_physical_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n	#include <transmission_fragment>\n	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n	#ifdef USE_SHEEN\n \n		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;\n \n 	#endif\n	#ifdef USE_CLEARCOAT\n		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n	#endif\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshtoon_vert: "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshtoon_frag: "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_toon_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n	varying vec2 vUv;\n	uniform mat3 uvTransform;\n#endif\nvoid main() {\n	#ifdef USE_POINTS_UV\n		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	#endif\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	gl_PointSize = size;\n	#ifdef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n	#endif\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <fog_vertex>\n}",
	points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_particle_fragment>\n	#include <color_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	shadow_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	shadow_frag: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n	#include <logdepthbuf_fragment>\n	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	sprite_vert: "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	vec4 mvPosition = modelViewMatrix[ 3 ];\n	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );\n	#ifndef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) scale *= - mvPosition.z;\n	#endif\n	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n	vec2 rotatedPosition;\n	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n	mvPosition.xy += rotatedPosition;\n	gl_Position = projectionMatrix * mvPosition;\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}",
	sprite_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n}"
}, X = {
	common: {
		diffuse: { value: /*@__PURE__*/ new J(16777215) },
		opacity: { value: 1 },
		map: { value: null },
		mapTransform: { value: /*@__PURE__*/ new q() },
		alphaMap: { value: null },
		alphaMapTransform: { value: /*@__PURE__*/ new q() },
		alphaTest: { value: 0 }
	},
	specularmap: {
		specularMap: { value: null },
		specularMapTransform: { value: /*@__PURE__*/ new q() }
	},
	envmap: {
		envMap: { value: null },
		envMapRotation: { value: /*@__PURE__*/ new q() },
		reflectivity: { value: 1 },
		ior: { value: 1.5 },
		refractionRatio: { value: .98 },
		dfgLUT: { value: null }
	},
	aomap: {
		aoMap: { value: null },
		aoMapIntensity: { value: 1 },
		aoMapTransform: { value: /*@__PURE__*/ new q() }
	},
	lightmap: {
		lightMap: { value: null },
		lightMapIntensity: { value: 1 },
		lightMapTransform: { value: /*@__PURE__*/ new q() }
	},
	bumpmap: {
		bumpMap: { value: null },
		bumpMapTransform: { value: /*@__PURE__*/ new q() },
		bumpScale: { value: 1 }
	},
	normalmap: {
		normalMap: { value: null },
		normalMapTransform: { value: /*@__PURE__*/ new q() },
		normalScale: { value: /*@__PURE__*/ new W(1, 1) }
	},
	displacementmap: {
		displacementMap: { value: null },
		displacementMapTransform: { value: /*@__PURE__*/ new q() },
		displacementScale: { value: 1 },
		displacementBias: { value: 0 }
	},
	emissivemap: {
		emissiveMap: { value: null },
		emissiveMapTransform: { value: /*@__PURE__*/ new q() }
	},
	metalnessmap: {
		metalnessMap: { value: null },
		metalnessMapTransform: { value: /*@__PURE__*/ new q() }
	},
	roughnessmap: {
		roughnessMap: { value: null },
		roughnessMapTransform: { value: /*@__PURE__*/ new q() }
	},
	gradientmap: { gradientMap: { value: null } },
	fog: {
		fogDensity: { value: 25e-5 },
		fogNear: { value: 1 },
		fogFar: { value: 2e3 },
		fogColor: { value: /*@__PURE__*/ new J(16777215) }
	},
	lights: {
		ambientLightColor: { value: [] },
		lightProbe: { value: [] },
		sunLights: {
			value: [],
			properties: {
				direction: {},
				color: {}
			}
		},
		sunLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},
		sunShadowMatrix: { value: [] },
		sunShadowCascade: { value: [] },
		directionalLights: {
			value: [],
			properties: {
				direction: {},
				color: {}
			}
		},
		directionalLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},
		directionalShadowMatrix: { value: [] },
		spotLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				direction: {},
				distance: {},
				coneCos: {},
				penumbraCos: {},
				decay: {}
			}
		},
		spotLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},
		spotLightMap: { value: [] },
		spotLightMatrix: { value: [] },
		pointLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				decay: {},
				distance: {}
			}
		},
		pointLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {},
				shadowCameraNear: {},
				shadowCameraFar: {}
			}
		},
		pointShadowMatrix: { value: [] },
		hemisphereLights: {
			value: [],
			properties: {
				direction: {},
				skyColor: {},
				groundColor: {}
			}
		},
		rectAreaLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				width: {},
				height: {}
			}
		},
		ltc_1: { value: null },
		ltc_2: { value: null },
		probesSH: { value: [] },
		probesMin: { value: [] },
		probesMax: { value: [] },
		probesResolution: { value: [] }
	},
	points: {
		diffuse: { value: /*@__PURE__*/ new J(16777215) },
		opacity: { value: 1 },
		size: { value: 1 },
		scale: { value: 1 },
		map: { value: null },
		alphaMap: { value: null },
		alphaMapTransform: { value: /*@__PURE__*/ new q() },
		alphaTest: { value: 0 },
		uvTransform: { value: /*@__PURE__*/ new q() }
	},
	sprite: {
		diffuse: { value: /*@__PURE__*/ new J(16777215) },
		opacity: { value: 1 },
		center: { value: /*@__PURE__*/ new W(.5, .5) },
		rotation: { value: 0 },
		map: { value: null },
		mapTransform: { value: /*@__PURE__*/ new q() },
		alphaMap: { value: null },
		alphaMapTransform: { value: /*@__PURE__*/ new q() },
		alphaTest: { value: 0 }
	}
}, $a = {
	basic: {
		uniforms: /*@__PURE__*/ ki([
			X.common,
			X.specularmap,
			X.envmap,
			X.aomap,
			X.lightmap,
			X.fog
		]),
		vertexShader: Qa.meshbasic_vert,
		fragmentShader: Qa.meshbasic_frag
	},
	lambert: {
		uniforms: /*@__PURE__*/ ki([
			X.common,
			X.specularmap,
			X.envmap,
			X.aomap,
			X.lightmap,
			X.emissivemap,
			X.bumpmap,
			X.normalmap,
			X.displacementmap,
			X.fog,
			X.lights,
			{
				emissive: { value: /*@__PURE__*/ new J(0) },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: Qa.meshlambert_vert,
		fragmentShader: Qa.meshlambert_frag
	},
	phong: {
		uniforms: /*@__PURE__*/ ki([
			X.common,
			X.specularmap,
			X.envmap,
			X.aomap,
			X.lightmap,
			X.emissivemap,
			X.bumpmap,
			X.normalmap,
			X.displacementmap,
			X.fog,
			X.lights,
			{
				emissive: { value: /*@__PURE__*/ new J(0) },
				specular: { value: /*@__PURE__*/ new J(1118481) },
				shininess: { value: 30 },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: Qa.meshphong_vert,
		fragmentShader: Qa.meshphong_frag
	},
	standard: {
		uniforms: /*@__PURE__*/ ki([
			X.common,
			X.envmap,
			X.aomap,
			X.lightmap,
			X.emissivemap,
			X.bumpmap,
			X.normalmap,
			X.displacementmap,
			X.roughnessmap,
			X.metalnessmap,
			X.fog,
			X.lights,
			{
				emissive: { value: /*@__PURE__*/ new J(0) },
				roughness: { value: 1 },
				metalness: { value: 0 },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: Qa.meshphysical_vert,
		fragmentShader: Qa.meshphysical_frag
	},
	toon: {
		uniforms: /*@__PURE__*/ ki([
			X.common,
			X.aomap,
			X.lightmap,
			X.emissivemap,
			X.bumpmap,
			X.normalmap,
			X.displacementmap,
			X.gradientmap,
			X.fog,
			X.lights,
			{ emissive: { value: /*@__PURE__*/ new J(0) } }
		]),
		vertexShader: Qa.meshtoon_vert,
		fragmentShader: Qa.meshtoon_frag
	},
	matcap: {
		uniforms: /*@__PURE__*/ ki([
			X.common,
			X.bumpmap,
			X.normalmap,
			X.displacementmap,
			X.fog,
			{ matcap: { value: null } }
		]),
		vertexShader: Qa.meshmatcap_vert,
		fragmentShader: Qa.meshmatcap_frag
	},
	points: {
		uniforms: /*@__PURE__*/ ki([X.points, X.fog]),
		vertexShader: Qa.points_vert,
		fragmentShader: Qa.points_frag
	},
	dashed: {
		uniforms: /*@__PURE__*/ ki([
			X.common,
			X.fog,
			{
				scale: { value: 1 },
				dashSize: { value: 1 },
				totalSize: { value: 2 }
			}
		]),
		vertexShader: Qa.linedashed_vert,
		fragmentShader: Qa.linedashed_frag
	},
	depth: {
		uniforms: /*@__PURE__*/ ki([X.common, X.displacementmap]),
		vertexShader: Qa.depth_vert,
		fragmentShader: Qa.depth_frag
	},
	normal: {
		uniforms: /*@__PURE__*/ ki([
			X.common,
			X.bumpmap,
			X.normalmap,
			X.displacementmap,
			{ opacity: { value: 1 } }
		]),
		vertexShader: Qa.meshnormal_vert,
		fragmentShader: Qa.meshnormal_frag
	},
	sprite: {
		uniforms: /*@__PURE__*/ ki([X.sprite, X.fog]),
		vertexShader: Qa.sprite_vert,
		fragmentShader: Qa.sprite_frag
	},
	background: {
		uniforms: {
			uvTransform: { value: /*@__PURE__*/ new q() },
			t2D: { value: null },
			backgroundIntensity: { value: 1 }
		},
		vertexShader: Qa.background_vert,
		fragmentShader: Qa.background_frag
	},
	backgroundCube: {
		uniforms: {
			envMap: { value: null },
			backgroundBlurriness: { value: 0 },
			backgroundIntensity: { value: 1 },
			backgroundRotation: { value: /*@__PURE__*/ new q() }
		},
		vertexShader: Qa.backgroundCube_vert,
		fragmentShader: Qa.backgroundCube_frag
	},
	cube: {
		uniforms: {
			tCube: { value: null },
			tFlip: { value: -1 },
			opacity: { value: 1 }
		},
		vertexShader: Qa.cube_vert,
		fragmentShader: Qa.cube_frag
	},
	equirect: {
		uniforms: { tEquirect: { value: null } },
		vertexShader: Qa.equirect_vert,
		fragmentShader: Qa.equirect_frag
	},
	distance: {
		uniforms: /*@__PURE__*/ ki([
			X.common,
			X.displacementmap,
			{
				referencePosition: { value: /*@__PURE__*/ new G() },
				nearDistance: { value: 1 },
				farDistance: { value: 1e3 }
			}
		]),
		vertexShader: Qa.distance_vert,
		fragmentShader: Qa.distance_frag
	},
	shadow: {
		uniforms: /*@__PURE__*/ ki([
			X.lights,
			X.fog,
			{
				color: { value: /*@__PURE__*/ new J(0) },
				opacity: { value: 1 }
			}
		]),
		vertexShader: Qa.shadow_vert,
		fragmentShader: Qa.shadow_frag
	}
};
$a.physical = {
	uniforms: /*@__PURE__*/ ki([$a.standard.uniforms, {
		clearcoat: { value: 0 },
		clearcoatMap: { value: null },
		clearcoatMapTransform: { value: /*@__PURE__*/ new q() },
		clearcoatNormalMap: { value: null },
		clearcoatNormalMapTransform: { value: /*@__PURE__*/ new q() },
		clearcoatNormalScale: { value: /*@__PURE__*/ new W(1, 1) },
		clearcoatRoughness: { value: 0 },
		clearcoatRoughnessMap: { value: null },
		clearcoatRoughnessMapTransform: { value: /*@__PURE__*/ new q() },
		diffuseRoughness: { value: 0 },
		diffuseRoughnessMap: { value: null },
		diffuseRoughnessMapTransform: { value: /*@__PURE__*/ new q() },
		dispersion: { value: 0 },
		retroreflectivity: { value: 0 },
		iridescence: { value: 0 },
		iridescenceMap: { value: null },
		iridescenceMapTransform: { value: /*@__PURE__*/ new q() },
		iridescenceIOR: { value: 1.3 },
		iridescenceThicknessMinimum: { value: 100 },
		iridescenceThicknessMaximum: { value: 400 },
		iridescenceThicknessMap: { value: null },
		iridescenceThicknessMapTransform: { value: /*@__PURE__*/ new q() },
		sheen: { value: 0 },
		sheenColor: { value: /*@__PURE__*/ new J(0) },
		sheenColorMap: { value: null },
		sheenColorMapTransform: { value: /*@__PURE__*/ new q() },
		sheenRoughness: { value: 1 },
		sheenRoughnessMap: { value: null },
		sheenRoughnessMapTransform: { value: /*@__PURE__*/ new q() },
		transmission: { value: 0 },
		transmissionMap: { value: null },
		transmissionMapTransform: { value: /*@__PURE__*/ new q() },
		transmissionSamplerSize: { value: /*@__PURE__*/ new W() },
		transmissionSamplerMap: { value: null },
		thickness: { value: 0 },
		thicknessMap: { value: null },
		thicknessMapTransform: { value: /*@__PURE__*/ new q() },
		attenuationDistance: { value: 0 },
		attenuationColor: { value: /*@__PURE__*/ new J(0) },
		specularColor: { value: /*@__PURE__*/ new J(1, 1, 1) },
		specularColorMap: { value: null },
		specularColorMapTransform: { value: /*@__PURE__*/ new q() },
		specularIntensity: { value: 1 },
		specularIntensityMap: { value: null },
		specularIntensityMapTransform: { value: /*@__PURE__*/ new q() },
		anisotropyVector: { value: /*@__PURE__*/ new W() },
		anisotropyMap: { value: null },
		anisotropyMapTransform: { value: /*@__PURE__*/ new q() }
	}]),
	vertexShader: Qa.meshphysical_vert,
	fragmentShader: Qa.meshphysical_frag
};
var eo = {
	r: 0,
	b: 0,
	g: 0
}, to = /*@__PURE__*/ new nt(), no = /*@__PURE__*/ new q();
no.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function ro(e, t, n, r, i, a) {
	let o = new J(0), s = i === !0 ? 0 : 1, c, l, u = null, d = 0, f = null;
	function p(e) {
		let n = e.isScene === !0 ? e.background : null;
		if (n && n.isTexture) {
			let r = e.backgroundBlurriness > 0;
			n = t.get(n, r);
		}
		return n;
	}
	function m(t) {
		let r = !1, i = p(t);
		i === null ? g(o, s) : i && i.isColor && (g(i, 1), r = !0);
		let c = e.xr.getEnvironmentBlendMode();
		c === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, a) : c === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, a), (e.autoClear || r) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil));
	}
	function h(t, n) {
		let i = p(n);
		i && i.isCubeTexture ? (l === void 0 && (l = new Y(new pi(1, 1, 1), new Ii({
			name: "BackgroundCubeMaterial",
			uniforms: Oi($a.backgroundCube.uniforms),
			vertexShader: $a.backgroundCube.vertexShader,
			fragmentShader: $a.backgroundCube.fragmentShader,
			side: 1,
			depthTest: !1,
			depthWrite: !1,
			fog: !1,
			allowOverride: !1
		})), l.geometry.deleteAttribute("normal"), l.geometry.deleteAttribute("uv"), l.onBeforeRender = function(e, t, n) {
			this.matrixWorld.copyPosition(n.matrixWorld);
		}, Object.defineProperty(l.material, "envMap", { get: function() {
			return this.uniforms.envMap.value;
		} }), r.update(l)), l.material.uniforms.envMap.value = i, l.material.uniforms.backgroundBlurriness.value = n.backgroundBlurriness, l.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, l.material.uniforms.backgroundRotation.value.setFromMatrix4(to.makeRotationFromEuler(n.backgroundRotation)).transpose(), i.isRenderTargetTexture === !1 && l.material.uniforms.backgroundRotation.value.premultiply(no), l.material.toneMapped = Be.getTransfer(i.colorSpace) !== j, (u !== i || d !== i.version || f !== e.toneMapping) && (l.material.needsUpdate = !0, u = i, d = i.version, f = e.toneMapping), l.layers.enableAll(), t.unshift(l, l.geometry, l.material, 0, 0, null)) : i && i.isTexture && (c === void 0 && (c = new Y(new wi(2, 2), new Ii({
			name: "BackgroundMaterial",
			uniforms: Oi($a.background.uniforms),
			vertexShader: $a.background.vertexShader,
			fragmentShader: $a.background.fragmentShader,
			side: 0,
			depthTest: !1,
			depthWrite: !1,
			fog: !1,
			allowOverride: !1
		})), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", { get: function() {
			return this.uniforms.t2D.value;
		} }), r.update(c)), c.material.uniforms.t2D.value = i, c.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, c.material.toneMapped = Be.getTransfer(i.colorSpace) !== j, i.matrixAutoUpdate === !0 && i.updateMatrix(), c.material.uniforms.uvTransform.value.copy(i.matrix), (u !== i || d !== i.version || f !== e.toneMapping) && (c.material.needsUpdate = !0, u = i, d = i.version, f = e.toneMapping), c.layers.enableAll(), t.unshift(c, c.geometry, c.material, 0, 0, null));
	}
	function g(t, r) {
		t.getRGB(eo, Mi(e)), n.buffers.color.setClear(eo.r, eo.g, eo.b, r, a);
	}
	function _() {
		l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0), c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0);
	}
	return {
		getClearColor: function() {
			return o;
		},
		setClearColor: function(e, t = 1) {
			o.set(e), s = t, g(o, s);
		},
		getClearAlpha: function() {
			return s;
		},
		setClearAlpha: function(e) {
			s = e, g(o, s);
		},
		render: m,
		addToRenderList: h,
		dispose: _
	};
}
function io(e, t) {
	let n = e.getParameter(e.MAX_VERTEX_ATTRIBS), r = {}, i = f(null), a = i, o = !1;
	function s(n, r, i, s, c) {
		let u = !1, f = d(n, s, i, r);
		a !== f && (a = f, l(a.object)), u = p(n, s, i, c), u && m(n, s, i, c), c !== null && t.update(c, e.ELEMENT_ARRAY_BUFFER), (u || o) && (o = !1, b(n, r, i, s), c !== null && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.get(c).buffer));
	}
	function c() {
		return e.createVertexArray();
	}
	function l(t) {
		return e.bindVertexArray(t);
	}
	function u(t) {
		return e.deleteVertexArray(t);
	}
	function d(e, t, n, i) {
		let a = i.wireframe === !0, o = r[t.id];
		o === void 0 && (o = {}, r[t.id] = o);
		let s = e.isInstancedMesh === !0 ? e.id : 0, l = o[s];
		l === void 0 && (l = {}, o[s] = l);
		let u = l[n.id];
		u === void 0 && (u = {}, l[n.id] = u);
		let d = u[a];
		return d === void 0 && (d = f(c()), u[a] = d), d;
	}
	function f(e) {
		let t = [], r = [], i = [];
		for (let e = 0; e < n; e++) t[e] = 0, r[e] = 0, i[e] = 0;
		return {
			geometry: null,
			program: null,
			wireframe: !1,
			newAttributes: t,
			enabledAttributes: r,
			attributeDivisors: i,
			object: e,
			attributes: {},
			index: null
		};
	}
	function p(e, t, n, r) {
		let i = a.attributes, o = t.attributes, s = 0, c = n.getAttributes();
		for (let t in c) if (c[t].location >= 0) {
			let n = i[t], r = o[t];
			if (r === void 0 && (t === "instanceMatrix" && e.instanceMatrix && (r = e.instanceMatrix), t === "instanceColor" && e.instanceColor && (r = e.instanceColor)), n === void 0 || n.attribute !== r || r && n.data !== r.data) return !0;
			s++;
		}
		return a.attributesNum !== s || a.index !== r;
	}
	function m(e, t, n, r) {
		let i = {}, o = t.attributes, s = 0, c = n.getAttributes();
		for (let t in c) if (c[t].location >= 0) {
			let n = o[t];
			n === void 0 && (t === "instanceMatrix" && e.instanceMatrix && (n = e.instanceMatrix), t === "instanceColor" && e.instanceColor && (n = e.instanceColor));
			let r = {};
			r.attribute = n, n && n.data && (r.data = n.data), i[t] = r, s++;
		}
		a.attributes = i, a.attributesNum = s, a.index = r;
	}
	function h() {
		let e = a.newAttributes;
		for (let t = 0, n = e.length; t < n; t++) e[t] = 0;
	}
	function g(e) {
		_(e, 0);
	}
	function _(t, n) {
		let r = a.newAttributes, i = a.enabledAttributes, o = a.attributeDivisors;
		r[t] = 1, i[t] === 0 && (e.enableVertexAttribArray(t), i[t] = 1), o[t] !== n && (e.vertexAttribDivisor(t, n), o[t] = n);
	}
	function v() {
		let t = a.newAttributes, n = a.enabledAttributes;
		for (let r = 0, i = n.length; r < i; r++) n[r] !== t[r] && (e.disableVertexAttribArray(r), n[r] = 0);
	}
	function y(t, n, r, i, a, o, s) {
		s === !0 ? e.vertexAttribIPointer(t, n, r, a, o) : e.vertexAttribPointer(t, n, r, i, a, o);
	}
	function b(n, r, i, a) {
		h();
		let o = a.attributes, s = i.getAttributes(), c = r.defaultAttributeValues;
		for (let r in s) {
			let i = s[r];
			if (i.location >= 0) {
				let s = o[r];
				if (s === void 0 && (r === "instanceMatrix" && n.instanceMatrix && (s = n.instanceMatrix), r === "instanceColor" && n.instanceColor && (s = n.instanceColor)), s !== void 0) {
					let r = s.normalized, o = s.itemSize, c = t.get(s);
					if (c === void 0) continue;
					let l = c.buffer, u = c.type, d = c.bytesPerElement, f = u === e.INT || u === e.UNSIGNED_INT || s.gpuType === 1013;
					if (s.isInterleavedBufferAttribute) {
						let t = s.data, c = t.isInterleavedBuffer === !0 ? t.stride : t.itemSize, p = s.offset;
						if (t.isInstancedInterleavedBuffer || t.isInstancedBufferAttribute) {
							for (let e = 0; e < i.locationSize; e++) _(i.location + e, t.meshPerAttribute);
							n.isInstancedMesh !== !0 && a._maxInstanceCount === void 0 && (a._maxInstanceCount = t.meshPerAttribute * t.count);
						} else for (let e = 0; e < i.locationSize; e++) g(i.location + e);
						e.bindBuffer(e.ARRAY_BUFFER, l);
						for (let e = 0; e < i.locationSize; e++) y(i.location + e, o / i.locationSize, u, r, c * d, (p + o / i.locationSize * e) * d, f);
					} else {
						if (s.isInstancedBufferAttribute) {
							for (let e = 0; e < i.locationSize; e++) _(i.location + e, s.meshPerAttribute);
							n.isInstancedMesh !== !0 && a._maxInstanceCount === void 0 && (a._maxInstanceCount = s.meshPerAttribute * s.count);
						} else for (let e = 0; e < i.locationSize; e++) g(i.location + e);
						e.bindBuffer(e.ARRAY_BUFFER, l);
						for (let e = 0; e < i.locationSize; e++) y(i.location + e, o / i.locationSize, u, r, o * d, o / i.locationSize * e * d, f);
					}
				} else if (c !== void 0) {
					let t = c[r];
					if (t !== void 0) switch (t.length) {
						case 2:
							e.vertexAttrib2fv(i.location, t);
							break;
						case 3:
							e.vertexAttrib3fv(i.location, t);
							break;
						case 4:
							e.vertexAttrib4fv(i.location, t);
							break;
						default: e.vertexAttrib1fv(i.location, t);
					}
				}
			}
		}
		v();
	}
	function x() {
		T();
		for (let e in r) {
			let t = r[e];
			for (let e in t) {
				let n = t[e];
				for (let e in n) {
					let t = n[e];
					for (let e in t) u(t[e].object), delete t[e];
					delete n[e];
				}
			}
			delete r[e];
		}
	}
	function S(e) {
		if (r[e.id] === void 0) return;
		let t = r[e.id];
		for (let e in t) {
			let n = t[e];
			for (let e in n) {
				let t = n[e];
				for (let e in t) u(t[e].object), delete t[e];
				delete n[e];
			}
		}
		delete r[e.id];
	}
	function C(e) {
		for (let t in r) {
			let n = r[t];
			for (let t in n) {
				let r = n[t];
				if (r[e.id] === void 0) continue;
				let i = r[e.id];
				for (let e in i) u(i[e].object), delete i[e];
				delete r[e.id];
			}
		}
	}
	function w(e) {
		for (let t in r) {
			let n = r[t], i = e.isInstancedMesh === !0 ? e.id : 0, a = n[i];
			if (a !== void 0) {
				for (let e in a) {
					let t = a[e];
					for (let e in t) u(t[e].object), delete t[e];
					delete a[e];
				}
				delete n[i], Object.keys(n).length === 0 && delete r[t];
			}
		}
	}
	function T() {
		E(), o = !0, a !== i && (a = i, l(a.object));
	}
	function E() {
		i.geometry = null, i.program = null, i.wireframe = !1;
	}
	return {
		setup: s,
		reset: T,
		resetDefaultState: E,
		dispose: x,
		releaseStatesOfGeometry: S,
		releaseStatesOfObject: w,
		releaseStatesOfProgram: C,
		initAttributes: h,
		enableAttribute: g,
		disableUnusedAttributes: v
	};
}
function ao(e, t, n) {
	let r;
	function i(e) {
		r = e;
	}
	function a(t, i) {
		e.drawArrays(r, t, i), n.update(i, r, 1);
	}
	function o(t, i, a) {
		a !== 0 && (e.drawArraysInstanced(r, t, i, a), n.update(i, r, a));
	}
	function s(e, i, a) {
		if (a === 0) return;
		t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r, e, 0, i, 0, a);
		let o = 0;
		for (let e = 0; e < a; e++) o += i[e];
		n.update(o, r, 1);
	}
	this.setMode = i, this.render = a, this.renderInstances = o, this.renderMultiDraw = s;
}
function oo(e, t, n, r) {
	let i;
	function a() {
		if (i !== void 0) return i;
		if (t.has("EXT_texture_filter_anisotropic") === !0) {
			let n = t.get("EXT_texture_filter_anisotropic");
			i = e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
		} else i = 0;
		return i;
	}
	function o(t) {
		return t === 1023 || r.convert(t) === e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT);
	}
	function s(n) {
		let i = n === 1016 && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
		return !(n !== 1009 && n !== 1015 && !i && r.convert(n) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE));
	}
	function c(t) {
		if (t === "highp") {
			if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0) return "highp";
			t = "mediump";
		}
		return t === "mediump" && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
	}
	let l = n.precision === void 0 ? "highp" : n.precision, u = c(l);
	u !== l && (L("WebGLRenderer:", l, "not supported, using", u, "instead."), l = u);
	let d = n.reversedDepthBuffer === !0 && t.has("EXT_clip_control"), f = n.logarithmicDepthBuffer === !0 && d === !1;
	n.reversedDepthBuffer === !0 && d === !1 && L("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."), n.logarithmicDepthBuffer === !0 && d === !0 && L("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");
	let p = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), m = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS), h = e.getParameter(e.MAX_TEXTURE_SIZE), g = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE), _ = e.getParameter(e.MAX_VERTEX_ATTRIBS), v = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS), y = e.getParameter(e.MAX_VARYING_VECTORS), b = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS), x = e.getParameter(e.MAX_SAMPLES), S = e.getParameter(e.SAMPLES);
	return {
		isWebGL2: !0,
		getMaxAnisotropy: a,
		getMaxPrecision: c,
		textureFormatReadable: o,
		textureTypeReadable: s,
		precision: l,
		logarithmicDepthBuffer: f,
		reversedDepthBuffer: d,
		maxTextures: p,
		maxVertexTextures: m,
		maxTextureSize: h,
		maxCubemapSize: g,
		maxAttributes: _,
		maxVertexUniforms: v,
		maxVaryings: y,
		maxFragmentUniforms: b,
		maxSamples: x,
		samples: S
	};
}
function so(e) {
	let t = this, n = null, r = 0, i = !1, a = !1, o = new Hn(), s = new q(), c = {
		value: null,
		needsUpdate: !1
	};
	this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function(e, t) {
		let n = e.length !== 0 || t || r !== 0 || i;
		return i = t, r = e.length, n;
	}, this.beginShadows = function() {
		a = !0, u(null);
	}, this.endShadows = function() {
		a = !1;
	}, this.setGlobalState = function(e, t) {
		n = u(e, t, 0);
	}, this.setState = function(t, o, s) {
		let d = t.clippingPlanes, f = t.clipIntersection, p = t.clipShadows, m = e.get(t);
		if (!i || d === null || d.length === 0 || a && !p) a ? u(null) : l();
		else {
			let e = a ? 0 : r, t = e * 4, i = m.clippingState || null;
			c.value = i, i = u(d, o, t, s);
			for (let e = 0; e !== t; ++e) i[e] = n[e];
			m.clippingState = i, this.numIntersection = f ? this.numPlanes : 0, this.numPlanes += e;
		}
	};
	function l() {
		c.value !== n && (c.value = n, c.needsUpdate = r > 0), t.numPlanes = r, t.numIntersection = 0;
	}
	function u(e, n, r, i) {
		let a = e === null ? 0 : e.length, l = null;
		if (a !== 0) {
			if (l = c.value, i !== !0 || l === null) {
				let t = r + a * 4, i = n.matrixWorldInverse;
				s.getNormalMatrix(i), (l === null || l.length < t) && (l = new Float32Array(t));
				for (let t = 0, n = r; t !== a; ++t, n += 4) o.copy(e[t]).applyMatrix4(i, s), o.normal.toArray(l, n), l[n + 3] = o.constant;
			}
			c.value = l, c.needsUpdate = !0;
		}
		return t.numPlanes = a, t.numIntersection = 0, l;
	}
}
var co = class extends $e {
	constructor(e = 1, t = {}) {
		super(e, e, t), this.isWebGLCubeRenderTarget = !0;
		let n = {
			width: e,
			height: e,
			depth: 1
		}, r = [
			n,
			n,
			n,
			n,
			n,
			n
		];
		this.texture = new ci(r), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
	}
	fromEquirectangularTexture(e, t) {
		this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
		let n = {
			uniforms: { tEquirect: { value: null } },
			vertexShader: "\n\n				varying vec3 vWorldDirection;\n\n				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n				}\n\n				void main() {\n\n					vWorldDirection = transformDirection( position, modelMatrix );\n\n					#include <begin_vertex>\n					#include <project_vertex>\n\n				}\n			",
			fragmentShader: "\n\n				uniform sampler2D tEquirect;\n\n				varying vec3 vWorldDirection;\n\n				#include <common>\n\n				void main() {\n\n					vec3 direction = normalize( vWorldDirection );\n\n					vec2 sampleUV = equirectUv( direction );\n\n					gl_FragColor = texture2D( tEquirect, sampleUV );\n\n				}\n			"
		}, r = new pi(5, 5, 5), a = new Ii({
			name: "CubemapFromEquirect",
			uniforms: Oi(n.uniforms),
			vertexShader: n.vertexShader,
			fragmentShader: n.fragmentShader,
			side: 1,
			blending: 0
		});
		a.uniforms.tEquirect.value = t;
		let o = new Y(r, a), s = t.minFilter;
		return t.minFilter === 1008 && (t.minFilter = i), new Ma(1, 10, this).update(e, o), t.minFilter = s, o.geometry.dispose(), o.material.dispose(), this;
	}
	clear(e, t = !0, n = !0, r = !0) {
		let i = e.getRenderTarget();
		for (let i = 0; i < 6; i++) e.setRenderTarget(this, i), e.clear(t, n, r);
		e.setRenderTarget(i);
	}
}, lo = 256, uo = 3, fo = 20, po = 256, mo = 16, ho = 3, go = /*@__PURE__*/ new G(), _o = /*@__PURE__*/ new J(), vo = class e {
	constructor(e) {
		this._renderer = e, this._cubeSize = 0, this._sourceTarget = null, this._cubeCamera = new Ma(1, 10, null), this._boxMesh = new Y(new pi(5, 5, 5), null), this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null, this._integrationMaterial = null;
	}
	fromScene(e, t = 0, n = .1, r = 100, i = {}) {
		let { size: a = 256, position: o = go } = i, s = this._renderer;
		this._setSize(a);
		let c = this._allocateTarget(), l = this._getSourceTarget(!0);
		t > 0 && (l.texture.mipmapsAutoUpdate = !1);
		let u = s.autoClear, d = s.autoClearColor, f = s.autoClearDepth, p = s.autoClearStencil, m = e.background;
		s.autoClear = !0, s.autoClearColor = !0, s.autoClearDepth = !0, s.autoClearStencil = !0, m === null && (e.background = s.getClearColor(_o));
		let h = new Ma(n, r, l);
		return h.position.copy(o), h.update(s, e), s.autoClear = u, s.autoClearColor = d, s.autoClearDepth = f, s.autoClearStencil = p, e.background = m, t > 0 && (l.texture.mipmapsAutoUpdate = !0, this._blur(c, t)), this._applyPMREM(c), c;
	}
	fromEquirectangular(e, t = null) {
		return this._fromTexture(e, t);
	}
	fromCubemap(e, t = null) {
		return this._fromTexture(e, t);
	}
	compileCubemapShader() {
		this._cubemapMaterial === null && (this._cubemapMaterial = To(), this._compileMaterial(this._cubemapMaterial));
	}
	compileEquirectangularShader() {
		this._equirectMaterial === null && (this._equirectMaterial = wo(), this._compileMaterial(this._equirectMaterial));
	}
	dispose() {
		this._sourceTarget !== null && this._sourceTarget.dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._integrationMaterial !== null && this._integrationMaterial.dispose(), this._boxMesh.geometry.dispose();
	}
	static lodToRoughness(e, t) {
		return t > 0 ? 1 - Math.sqrt(1 - e / t) : 0;
	}
	_setSize(e) {
		this._cubeSize = Math.max(lo, ke(e));
	}
	_fromTexture(e, t) {
		e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? lo : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4);
		let n = t || this._allocateTarget();
		return this._textureToCubemap(e), this._applyPMREM(n), n;
	}
	_allocateTarget() {
		let e = this._cubeSize, t = yo(e, !1, !1), n = Math.log2(e) - uo;
		for (let r = 0; r <= n; r++) t.texture.mipmaps.push({
			width: e >> r,
			height: e >> r
		});
		return t.texture.name = "PMREM", t.texture.isPMREMTexture = !0, t;
	}
	_getSourceTarget(e = !1) {
		let t = this._cubeSize, n = this._sourceTarget;
		return (n === null || n.width !== t || e && n.depthBuffer === !1) && (n !== null && n.dispose(), this._sourceTarget = yo(t, !0, e)), this._sourceTarget;
	}
	_compileMaterial(e) {
		this._boxMesh.material = e, this._renderer.compile(this._boxMesh, this._cubeCamera.children[0]);
	}
	_renderCube(e, t, n) {
		let r = this._boxMesh, i = this._cubeCamera;
		r.material = n, i.renderTarget = e, i.activeMipmapLevel = t;
		let a = e.width >> t;
		e.viewport.set(0, 0, a, a), i.update(this._renderer, r), e.viewport.set(0, 0, e.width, e.height);
	}
	_textureToCubemap(e) {
		let t;
		e.mapping === 301 || e.mapping === 302 ? (this._cubemapMaterial === null && (this._cubemapMaterial = To()), t = this._cubemapMaterial, t.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : (this._equirectMaterial === null && (this._equirectMaterial = wo()), t = this._equirectMaterial), t.uniforms.envMap.value = e, this._renderCube(this._getSourceTarget(), 0, t);
	}
	_applyPMREM(t) {
		this._ggxMaterial === null && (this._ggxMaterial = xo(), this._integrationMaterial = So());
		let n = this._cubeSize, r = t.texture.mipmaps.length - 1, i = this._ggxMaterial.uniforms;
		i.envMap.value = this._sourceTarget.texture;
		let a = this._integrationMaterial.uniforms;
		a.envMap.value = this._sourceTarget.texture, a.sourceLod.value = Math.log2(n / mo);
		for (let o = 0; o <= r; o++) {
			let s = e.lodToRoughness(o, r);
			if (o > r - ho) a.roughness.value = s, this._renderCube(t, o, this._integrationMaterial);
			else {
				let e = s > 0 ? Math.log2(n) + .5 * Math.log2(6 / (po * s ** 4)) + .5 : 0;
				i.roughness.value = s, i.lodBias.value = e, this._renderCube(t, o, this._ggxMaterial);
			}
		}
	}
	_blur(e, t) {
		this._blurMaterial === null && (this._blurMaterial = Co());
		let n = this._blurMaterial, r = n.uniforms, i = this._sourceTarget;
		r.sigma.value = Math.min(t, Math.PI) / Math.SQRT2, r.envMap.value = i.texture, this._renderCube(e, 0, n), r.envMap.value = e.texture, this._renderCube(i, 0, n);
	}
};
function yo(e, t, n) {
	return new co(e, {
		minFilter: a,
		generateMipmaps: t,
		type: u,
		colorSpace: A,
		depthBuffer: n
	});
}
function bo(e, t, n) {
	return new Ii({
		name: e,
		uniforms: t,
		vertexShader: Qa.cube_vert,
		fragmentShader: n,
		side: 1,
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function xo() {
	return bo("PMREMGGXConvolution", {
		envMap: { value: null },
		roughness: { value: 0 },
		lodBias: { value: 0 }
	}, `

		#define GGX_SAMPLES ${po}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`);
}
function So() {
	return bo("PMREMGGXIntegration", {
		envMap: { value: null },
		roughness: { value: 0 },
		sourceLod: { value: 0 },
		sourceSize: { value: mo }
	}, "\n\n		varying vec3 vWorldDirection;\n\n		uniform samplerCube envMap;\n		uniform float roughness;\n		uniform float sourceLod;\n		uniform int sourceSize;\n\n		void main() {\n\n			vec3 N = normalize( vWorldDirection );\n\n			float alpha = roughness * roughness;\n			float alpha2 = alpha * alpha;\n\n			float texelSize = 2.0 / float( sourceSize );\n\n			vec3 prefilteredColor = vec3( 0.0 );\n			float totalWeight = 0.0;\n\n			// Pair opposite texels: only the one in N's hemisphere contributes.\n			for ( int face = 0; face < 3; face ++ ) {\n\n				for ( int y = 0; y < sourceSize; y ++ ) {\n\n					for ( int x = 0; x < sourceSize; x ++ ) {\n\n						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;\n						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );\n\n						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );\n						float NdotL = dot( N, texelDirection );\n						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;\n						NdotL = abs( NdotL ) * invDistance;\n\n						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors\n						// in the GGX distribution and texel solid angle cancel when normalized.\n						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;\n						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );\n\n						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;\n						totalWeight += weight;\n\n					}\n\n				}\n\n			}\n\n			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );\n\n		}\n	");
}
function Co() {
	return bo("PMREMSphericalGaussianBlur", {
		envMap: { value: null },
		sigma: { value: 0 }
	}, `

		#define SAMPLES ${fo}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`);
}
function wo() {
	return bo("PMREMEquirectangularToCubemap", { envMap: { value: null } }, "\n\n		varying vec3 vWorldDirection;\n\n		uniform sampler2D envMap;\n\n		#include <common>\n\n		void main() {\n\n			// Average four subpixel samples to preserve small, bright features.\n			vec3 direction = normalize( vWorldDirection );\n			vec3 dx = dFdx( direction ) * 0.25;\n			vec3 dy = dFdy( direction ) * 0.25;\n\n			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;\n			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;\n			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;\n			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;\n			gl_FragColor = vec4( color * 0.25, 1.0 );\n\n		}\n	");
}
function To() {
	return bo("PMREMCubemapToCubemap", {
		envMap: { value: null },
		flipEnvMap: { value: -1 }
	}, "\n\n		varying vec3 vWorldDirection;\n\n		uniform samplerCube envMap;\n		uniform float flipEnvMap;\n\n		void main() {\n\n			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );\n\n		}\n	");
}
function Eo(e) {
	let t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r = null;
	function i(e, t = !1) {
		return e == null ? null : t ? o(e) : a(e);
	}
	function a(n) {
		if (n && n.isTexture) {
			let r = n.mapping;
			if (r === 303 || r === 304) {
				if (t.has(n)) {
					let e = t.get(n).texture;
					return s(e, n.mapping);
				}
				{
					let r = n.image;
					if (r && r.height > 0) {
						let i = new co(r.height);
						return i.fromEquirectangularTexture(e, n), t.set(n, i), n.addEventListener("dispose", l), s(i.texture, n.mapping);
					}
					return null;
				}
			}
		}
		return n;
	}
	function o(t) {
		if (t && t.isTexture && t.isPMREMTexture !== !0) {
			let i = t.mapping, a = i === 303 || i === 304, o = i === 301 || i === 302;
			if (a || o) {
				let i = n.get(t), s = i === void 0 ? 0 : i.texture.pmremVersion;
				if (t.isRenderTargetTexture && t.pmremVersion !== s) return r === null && (r = new vo(e)), i = a ? r.fromEquirectangular(t, i) : r.fromCubemap(t, i), i.texture.pmremVersion = t.pmremVersion, n.set(t, i), i.texture;
				if (i !== void 0) return i.texture;
				{
					let s = t.image;
					return a && s && s.height > 0 || o && s && c(s) ? (r === null && (r = new vo(e)), i = a ? r.fromEquirectangular(t) : r.fromCubemap(t), i.texture.pmremVersion = t.pmremVersion, n.set(t, i), t.addEventListener("dispose", u), i.texture) : null;
				}
			}
		}
		return t;
	}
	function s(e, t) {
		return t === 303 ? e.mapping = 301 : t === 304 && (e.mapping = 302), e;
	}
	function c(e) {
		let t = 0;
		for (let n = 0; n < 6; n++) e[n] !== void 0 && t++;
		return t === 6;
	}
	function l(e) {
		let n = e.target;
		n.removeEventListener("dispose", l);
		let r = t.get(n);
		r !== void 0 && (t.delete(n), r.dispose());
	}
	function u(e) {
		let t = e.target;
		t.removeEventListener("dispose", u);
		let r = n.get(t);
		r !== void 0 && (n.delete(t), r.dispose());
	}
	function d() {
		t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r !== null && (r.dispose(), r = null);
	}
	return {
		get: i,
		dispose: d
	};
}
function Do(e) {
	let t = {};
	function n(n) {
		if (t[n] !== void 0) return t[n];
		let r = e.getExtension(n);
		return t[n] = r, r;
	}
	return {
		has: function(e) {
			return n(e) !== null;
		},
		init: function() {
			n("EXT_color_buffer_float"), n("WEBGL_clip_cull_distance"), n("OES_texture_float_linear"), n("EXT_color_buffer_half_float"), n("WEBGL_multisampled_render_to_texture"), n("WEBGL_render_shared_exponent");
		},
		get: function(e) {
			let t = n(e);
			return t === null && se("WebGLRenderer: " + e + " extension not supported."), t;
		}
	};
}
function Oo(e, t, n, r) {
	let i = {}, a = /* @__PURE__ */ new WeakMap(), o = new FinalizationRegistry((e) => delete i[e]);
	function s(e) {
		c(e.target);
	}
	function c(e) {
		e.index !== null && t.remove(e.index);
		for (let n in e.attributes) t.remove(e.attributes[n]);
		e.removeEventListener("dispose", s), delete i[e.id], o.unregister(e);
		let c = a.get(e);
		c && (t.remove(c), a.delete(e)), r.releaseStatesOfGeometry(e), e.isInstancedBufferGeometry === !0 && delete e._maxInstanceCount, n.memory.geometries--;
	}
	function l(e, t) {
		return i[t.id] === void 0 && (t.addEventListener("dispose", s), i[t.id] = new WeakRef(t), o.register(t, t.id, t), n.memory.geometries++), t;
	}
	function u(n) {
		let r = n.attributes;
		for (let n in r) t.update(r[n], e.ARRAY_BUFFER);
	}
	function d(e) {
		let n = e.index, r = e.attributes.position, i = 0;
		if (r === void 0) return;
		let o = n === null ? r.array.length / 3 - 1 : n.array.length, s = new (r.count >= 65535 ? xn : bn)(Math.ceil(o / 3) * 6, 1), c = s.array;
		if (n !== null) {
			let e = n.array;
			i = n.version;
			for (let t = 0, n = 0; t < o; t += 3) {
				let r = e[t + 0], i = e[t + 1], a = e[t + 2];
				c[n++] = r, c[n++] = i, c[n++] = i, c[n++] = a, c[n++] = a, c[n++] = r;
			}
		} else {
			i = r.version;
			for (let e = 0, t = 0; e < o; e += 3) {
				let n = e + 0, r = e + 1, i = e + 2;
				c[t++] = n, c[t++] = r, c[t++] = r, c[t++] = i, c[t++] = i, c[t++] = n;
			}
		}
		s.version = i;
		let l = a.get(e);
		l && t.remove(l), a.set(e, s);
	}
	function f(e) {
		let t = a.get(e);
		if (t) {
			let n = e.index;
			n !== null && t.version < n.version && d(e);
		} else d(e);
		return a.get(e);
	}
	function p() {
		for (let e in i) {
			let t = i[e].deref();
			t !== void 0 && c(t);
		}
	}
	return {
		get: l,
		update: u,
		getWireframeAttribute: f,
		dispose: p
	};
}
function ko(e, t, n) {
	let r;
	function i(e) {
		r = e;
	}
	let a, o;
	function s(e) {
		a = e.type, o = e.bytesPerElement;
	}
	function c(t, i) {
		e.drawElements(r, i, a, t * o), n.update(i, r, 1);
	}
	function l(t, i, s) {
		s !== 0 && (e.drawElementsInstanced(r, i, a, t * o, s), n.update(i, r, s));
	}
	function u(e, i, o) {
		if (o === 0) return;
		t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r, i, 0, a, e, 0, o);
		let s = 0;
		for (let e = 0; e < o; e++) s += i[e];
		n.update(s, r, 1);
	}
	this.setMode = i, this.setIndex = s, this.render = c, this.renderInstances = l, this.renderMultiDraw = u;
}
function Ao(e) {
	let t = {
		geometries: 0,
		textures: 0
	}, n = {
		frame: 0,
		calls: 0,
		triangles: 0,
		points: 0,
		lines: 0
	};
	function r(t, r, i) {
		switch (n.calls++, r) {
			case e.TRIANGLES:
				n.triangles += t / 3 * i;
				break;
			case e.LINES:
				n.lines += t / 2 * i;
				break;
			case e.LINE_STRIP:
				n.lines += i * (t - 1);
				break;
			case e.LINE_LOOP:
				n.lines += i * t;
				break;
			case e.POINTS:
				n.points += i * t;
				break;
			default: R("WebGLInfo: Unknown draw mode:", r);
		}
	}
	function i() {
		n.calls = 0, n.triangles = 0, n.points = 0, n.lines = 0;
	}
	return {
		memory: t,
		render: n,
		programs: null,
		autoReset: !0,
		reset: i,
		update: r
	};
}
function jo(e, t, n) {
	let r = /* @__PURE__ */ new WeakMap(), i = new Ze();
	function a(a, o, s) {
		let c = a.morphTargetInfluences, u = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, d = u === void 0 ? 0 : u.length, f = r.get(o);
		if (f === void 0 || f.count !== d) {
			f !== void 0 && f.texture.dispose();
			let e = o.morphAttributes.position !== void 0, n = o.morphAttributes.normal !== void 0, a = o.morphAttributes.color !== void 0, s = o.morphAttributes.position || [], c = o.morphAttributes.normal || [], u = o.morphAttributes.color || [], p = 0;
			e === !0 && (p = 1), n === !0 && (p = 2), a === !0 && (p = 3);
			let m = o.attributes.position.count * p, h = 1;
			m > t.maxTextureSize && (h = Math.ceil(m / t.maxTextureSize), m = t.maxTextureSize);
			let g = new Float32Array(m * h * 4 * d), _ = new et(g, m, h, d);
			_.type = l, _.needsUpdate = !0;
			let v = p * 4;
			for (let t = 0; t < d; t++) {
				let r = s[t], o = c[t], l = u[t], d = m * h * 4 * t;
				for (let t = 0; t < r.count; t++) {
					let s = t * v;
					e === !0 && (i.fromBufferAttribute(r, t), g[d + s + 0] = i.x, g[d + s + 1] = i.y, g[d + s + 2] = i.z, g[d + s + 3] = 0), n === !0 && (i.fromBufferAttribute(o, t), g[d + s + 4] = i.x, g[d + s + 5] = i.y, g[d + s + 6] = i.z, g[d + s + 7] = 0), a === !0 && (i.fromBufferAttribute(l, t), g[d + s + 8] = i.x, g[d + s + 9] = i.y, g[d + s + 10] = i.z, g[d + s + 11] = l.itemSize === 4 ? i.w : 1);
				}
			}
			f = {
				count: d,
				texture: _,
				size: new W(m, h)
			}, r.set(o, f);
			function y() {
				_.dispose(), r.delete(o), o.removeEventListener("dispose", y);
			}
			o.addEventListener("dispose", y);
		}
		if (a.isInstancedMesh === !0 && a.morphTexture !== null) s.getUniforms().setValue(e, "morphTexture", a.morphTexture, n);
		else {
			let t = 0;
			for (let e = 0; e < c.length; e++) t += c[e];
			let n = o.morphTargetsRelative ? 1 : 1 - t;
			s.getUniforms().setValue(e, "morphTargetBaseInfluence", n), s.getUniforms().setValue(e, "morphTargetInfluences", c);
		}
		s.getUniforms().setValue(e, "morphTargetsTexture", f.texture, n), s.getUniforms().setValue(e, "morphTargetsTextureSize", f.size);
	}
	return { update: a };
}
function Mo(e, t, n, r, i) {
	let a = /* @__PURE__ */ new WeakMap();
	function o(r) {
		let o = i.render.frame, s = r.geometry, l = t.get(r, s);
		if (a.get(l) !== o && (t.update(l), a.set(l, o)), r.isInstancedMesh && (r.hasEventListener("dispose", c) === !1 && r.addEventListener("dispose", c), a.get(r) !== o && (n.update(r.instanceMatrix, e.ARRAY_BUFFER), r.instanceColor !== null && n.update(r.instanceColor, e.ARRAY_BUFFER), a.set(r, o))), r.isSkinnedMesh) {
			let e = r.skeleton;
			a.get(e) !== o && (e.update(), a.set(e, o));
		}
		return l;
	}
	function s() {
		a = /* @__PURE__ */ new WeakMap();
	}
	function c(e) {
		let t = e.target;
		t.removeEventListener("dispose", c), r.releaseStatesOfObject(t), n.remove(t.instanceMatrix), t.instanceColor !== null && n.remove(t.instanceColor);
	}
	return {
		update: o,
		dispose: s
	};
}
var No = {
	1: "LINEAR_TONE_MAPPING",
	2: "REINHARD_TONE_MAPPING",
	3: "CINEON_TONE_MAPPING",
	4: "ACES_FILMIC_TONE_MAPPING",
	6: "AGX_TONE_MAPPING",
	7: "NEUTRAL_TONE_MAPPING",
	5: "CUSTOM_TONE_MAPPING"
};
function Po(e, t, n, r, i, a) {
	let o = new $e(t, n, {
		type: e,
		depthBuffer: i,
		stencilBuffer: a,
		samples: r ? 4 : 0,
		storeMultisampledDepthBuffer: !1,
		storeMultisampledStencilBuffer: !1,
		resolveDepthBuffer: !1,
		resolveStencilBuffer: !1
	}), s = null, c = null, l = null, d = new Pn();
	d.setAttribute("position", new Sn([
		-1,
		3,
		0,
		-1,
		-1,
		0,
		3,
		-1,
		0
	], 3)), d.setAttribute("uv", new Sn([
		0,
		2,
		0,
		0,
		2,
		0
	], 2));
	let f = new Li({
		uniforms: { tDiffuse: { value: null } },
		vertexShader: "\n			precision highp float;\n\n			uniform mat4 modelViewMatrix;\n			uniform mat4 projectionMatrix;\n\n			attribute vec3 position;\n			attribute vec2 uv;\n\n			varying vec2 vUv;\n\n			void main() {\n				vUv = uv;\n				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n			}",
		fragmentShader: "\n			precision highp float;\n\n			uniform sampler2D tDiffuse;\n\n			varying vec2 vUv;\n\n			#include <tonemapping_pars_fragment>\n			#include <colorspace_pars_fragment>\n\n			void main() {\n				gl_FragColor = texture2D( tDiffuse, vUv );\n\n				#ifdef LINEAR_TONE_MAPPING\n					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );\n				#elif defined( REINHARD_TONE_MAPPING )\n					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );\n				#elif defined( CINEON_TONE_MAPPING )\n					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );\n				#elif defined( ACES_FILMIC_TONE_MAPPING )\n					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );\n				#elif defined( AGX_TONE_MAPPING )\n					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );\n				#elif defined( NEUTRAL_TONE_MAPPING )\n					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );\n				#elif defined( CUSTOM_TONE_MAPPING )\n					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );\n				#endif\n\n				#ifdef SRGB_TRANSFER\n					gl_FragColor = sRGBTransferOETF( gl_FragColor );\n				#endif\n			}",
		depthTest: !1,
		depthWrite: !1
	}), m = new Y(d, f), h = new Da(-1, 1, 1, -1, 0, 1), _ = null, v = null, y = !1, b, x = null, S = [], C = !1;
	this.setSize = function(e, t) {
		o.setSize(e, t), s !== null && s.setSize(e, t), c !== null && c.setSize(e, t);
		for (let n = 0; n < S.length; n++) {
			let r = S[n];
			r.setSize && r.setSize(e, t);
		}
	}, this.setEffects = function(e) {
		S = e, C = S.length > 0 && S[0].isRenderPass === !0;
		let t = o.width, n = o.height;
		S.length > 0 && s === null && (s = new $e(t, n, {
			type: u,
			depthBuffer: !1,
			stencilBuffer: !1
		}), c = new $e(t, n, {
			type: u,
			depthBuffer: !1,
			stencilBuffer: !1
		}));
		let r = i === !0 && S.some((e) => e.needsDepthTexture === !0);
		r !== (o.depthTexture !== null) && (r === !0 && l === null && (l = new ui(t, n), a === !0 && (l.format = g, l.type = p)), o.dispose(), o.depthTexture = r ? l : null, o.resolveDepthBuffer = r, o.storeMultisampledDepthBuffer = r);
		for (let e = 0; e < S.length; e++) {
			let i = S[e];
			i.setSize && i.setSize(t, n), r && i.needsDepthTexture === !0 && i.setDepthTexture && i.setDepthTexture(l);
		}
	}, this.begin = function(e, t) {
		if (y || e.toneMapping === 0 && S.length === 0) return !1;
		if (x = t, t !== null) {
			let e = t.width, n = t.height;
			(o.width !== e || o.height !== n) && this.setSize(e, n);
		}
		return C === !1 && e.setRenderTarget(o), b = e.toneMapping, e.toneMapping = 0, !0;
	}, this.hasRenderPass = function() {
		return C;
	}, this.end = function(e, t) {
		e.toneMapping = b, y = !0;
		let n = o, r = s;
		for (let i = 0; i < S.length; i++) {
			let a = S[i];
			a.enabled !== !1 && (a.render(e, r, n, t), a.needsSwap !== !1 && (n = r, r = r === s ? c : s));
		}
		if (_ !== e.outputColorSpace || v !== e.toneMapping) {
			_ = e.outputColorSpace, v = e.toneMapping, f.defines = {}, Be.getTransfer(_) === "srgb" && (f.defines.SRGB_TRANSFER = "");
			let t = No[v];
			t && (f.defines[t] = ""), f.needsUpdate = !0;
		}
		f.uniforms.tDiffuse.value = n.texture, e.setRenderTarget(x), e.render(m, h), x = null, y = !1;
	}, this.isCompositing = function() {
		return y;
	}, this.dispose = function() {
		o.dispose(), s !== null && s.dispose(), c !== null && c.dispose(), d.dispose(), f.dispose();
	};
}
var Fo = /*@__PURE__*/ new Xe(), Io = /*@__PURE__*/ new ui(1, 1), Lo = /*@__PURE__*/ new di(1), Ro = /*@__PURE__*/ new et(), zo = /*@__PURE__*/ new tt(), Bo = /*@__PURE__*/ new ci(), Vo = [], Ho = [], Uo = /* @__PURE__ */ new Float32Array(16), Wo = /* @__PURE__ */ new Float32Array(9), Go = /* @__PURE__ */ new Float32Array(4);
function Ko(e, t, n) {
	let r = e[0];
	if (r <= 0 || r > 0) return e;
	let i = t * n, a = Vo[i];
	if (a === void 0 && (a = new Float32Array(i), Vo[i] = a), t !== 0) {
		r.toArray(a, 0);
		for (let r = 1, i = 0; r !== t; ++r) i += n, e[r].toArray(a, i);
	}
	return a;
}
function qo(e, t) {
	if (e.length !== t.length) return !1;
	for (let n = 0, r = e.length; n < r; n++) if (e[n] !== t[n]) return !1;
	return !0;
}
function Jo(e, t) {
	for (let n = 0, r = t.length; n < r; n++) e[n] = t[n];
}
function Yo(e, t) {
	let n = Ho[t];
	n === void 0 && (n = new Int32Array(t), Ho[t] = n);
	for (let r = 0; r !== t; ++r) n[r] = e.allocateTextureUnit();
	return n;
}
function Xo(e, t) {
	let n = this.cache;
	n[0] !== t && (e.uniform1f(this.addr, t), n[0] = t);
}
function Zo(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2f(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
	else {
		if (qo(n, t)) return;
		e.uniform2fv(this.addr, t), Jo(n, t);
	}
}
function Qo(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3f(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
	else if (t.r !== void 0) (n[0] !== t.r || n[1] !== t.g || n[2] !== t.b) && (e.uniform3f(this.addr, t.r, t.g, t.b), n[0] = t.r, n[1] = t.g, n[2] = t.b);
	else {
		if (qo(n, t)) return;
		e.uniform3fv(this.addr, t), Jo(n, t);
	}
}
function $o(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
	else {
		if (qo(n, t)) return;
		e.uniform4fv(this.addr, t), Jo(n, t);
	}
}
function es(e, t) {
	let n = this.cache, r = t.elements;
	if (r === void 0) {
		if (qo(n, t)) return;
		e.uniformMatrix2fv(this.addr, !1, t), Jo(n, t);
	} else {
		if (qo(n, r)) return;
		Go.set(r), e.uniformMatrix2fv(this.addr, !1, Go), Jo(n, r);
	}
}
function ts(e, t) {
	let n = this.cache, r = t.elements;
	if (r === void 0) {
		if (qo(n, t)) return;
		e.uniformMatrix3fv(this.addr, !1, t), Jo(n, t);
	} else {
		if (qo(n, r)) return;
		Wo.set(r), e.uniformMatrix3fv(this.addr, !1, Wo), Jo(n, r);
	}
}
function ns(e, t) {
	let n = this.cache, r = t.elements;
	if (r === void 0) {
		if (qo(n, t)) return;
		e.uniformMatrix4fv(this.addr, !1, t), Jo(n, t);
	} else {
		if (qo(n, r)) return;
		Uo.set(r), e.uniformMatrix4fv(this.addr, !1, Uo), Jo(n, r);
	}
}
function rs(e, t) {
	let n = this.cache;
	n[0] !== t && (e.uniform1i(this.addr, t), n[0] = t);
}
function is(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2i(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
	else {
		if (qo(n, t)) return;
		e.uniform2iv(this.addr, t), Jo(n, t);
	}
}
function as(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3i(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
	else {
		if (qo(n, t)) return;
		e.uniform3iv(this.addr, t), Jo(n, t);
	}
}
function os(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
	else {
		if (qo(n, t)) return;
		e.uniform4iv(this.addr, t), Jo(n, t);
	}
}
function ss(e, t) {
	let n = this.cache;
	n[0] !== t && (e.uniform1ui(this.addr, t), n[0] = t);
}
function cs(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2ui(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
	else {
		if (qo(n, t)) return;
		e.uniform2uiv(this.addr, t), Jo(n, t);
	}
}
function ls(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3ui(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
	else {
		if (qo(n, t)) return;
		e.uniform3uiv(this.addr, t), Jo(n, t);
	}
}
function us(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
	else {
		if (qo(n, t)) return;
		e.uniform4uiv(this.addr, t), Jo(n, t);
	}
}
function ds(e) {
	return e.version === 0 && (e.compareFunction = 519, e.needsUpdate = !0), e;
}
function fs(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i);
	let a;
	a = this.type === e.SAMPLER_2D_SHADOW ? ds(Io) : Fo, n.setTexture2D(t || a, i);
}
function ps(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTexture3D(t || zo, i);
}
function ms(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i);
	let a;
	a = this.type === e.SAMPLER_CUBE_SHADOW ? ds(Lo) : Bo, n.setTextureCube(t || a, i);
}
function hs(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTexture2DArray(t || Ro, i);
}
function gs(e) {
	switch (e) {
		case 5126: return Xo;
		case 35664: return Zo;
		case 35665: return Qo;
		case 35666: return $o;
		case 35674: return es;
		case 35675: return ts;
		case 35676: return ns;
		case 5124:
		case 35670: return rs;
		case 35667:
		case 35671: return is;
		case 35668:
		case 35672: return as;
		case 35669:
		case 35673: return os;
		case 5125: return ss;
		case 36294: return cs;
		case 36295: return ls;
		case 36296: return us;
		case 35678:
		case 36198:
		case 36298:
		case 36306:
		case 35682: return fs;
		case 35679:
		case 36299:
		case 36307: return ps;
		case 35680:
		case 36300:
		case 36308:
		case 36293: return ms;
		case 36289:
		case 36303:
		case 36311:
		case 36292: return hs;
	}
}
function _s(e, t) {
	e.uniform1fv(this.addr, t);
}
function vs(e, t) {
	let n = Ko(t, this.size, 2);
	e.uniform2fv(this.addr, n);
}
function ys(e, t) {
	let n = Ko(t, this.size, 3);
	e.uniform3fv(this.addr, n);
}
function bs(e, t) {
	let n = Ko(t, this.size, 4);
	e.uniform4fv(this.addr, n);
}
function xs(e, t) {
	let n = Ko(t, this.size, 4);
	e.uniformMatrix2fv(this.addr, !1, n);
}
function Ss(e, t) {
	let n = Ko(t, this.size, 9);
	e.uniformMatrix3fv(this.addr, !1, n);
}
function Cs(e, t) {
	let n = Ko(t, this.size, 16);
	e.uniformMatrix4fv(this.addr, !1, n);
}
function ws(e, t) {
	e.uniform1iv(this.addr, t);
}
function Ts(e, t) {
	e.uniform2iv(this.addr, t);
}
function Es(e, t) {
	e.uniform3iv(this.addr, t);
}
function Ds(e, t) {
	e.uniform4iv(this.addr, t);
}
function Os(e, t) {
	e.uniform1uiv(this.addr, t);
}
function ks(e, t) {
	e.uniform2uiv(this.addr, t);
}
function As(e, t) {
	e.uniform3uiv(this.addr, t);
}
function js(e, t) {
	e.uniform4uiv(this.addr, t);
}
function Ms(e, t, n) {
	let r = this.cache, i = t.length, a = Yo(n, i);
	qo(r, a) || (e.uniform1iv(this.addr, a), Jo(r, a));
	let o;
	o = this.type === e.SAMPLER_2D_SHADOW ? ds(Io) : Fo;
	for (let e = 0; e !== i; ++e) n.setTexture2D(t[e] || o, a[e]);
}
function Ns(e, t, n) {
	let r = this.cache, i = t.length, a = Yo(n, i);
	qo(r, a) || (e.uniform1iv(this.addr, a), Jo(r, a));
	for (let e = 0; e !== i; ++e) n.setTexture3D(t[e] || zo, a[e]);
}
function Ps(e, t, n) {
	let r = this.cache, i = t.length, a = Yo(n, i);
	qo(r, a) || (e.uniform1iv(this.addr, a), Jo(r, a));
	let o;
	o = this.type === e.SAMPLER_CUBE_SHADOW ? ds(Lo) : Bo;
	for (let e = 0; e !== i; ++e) n.setTextureCube(t[e] || o, a[e]);
}
function Fs(e, t, n) {
	let r = this.cache, i = t.length, a = Yo(n, i);
	qo(r, a) || (e.uniform1iv(this.addr, a), Jo(r, a));
	for (let e = 0; e !== i; ++e) n.setTexture2DArray(t[e] || Ro, a[e]);
}
function Is(e) {
	switch (e) {
		case 5126: return _s;
		case 35664: return vs;
		case 35665: return ys;
		case 35666: return bs;
		case 35674: return xs;
		case 35675: return Ss;
		case 35676: return Cs;
		case 5124:
		case 35670: return ws;
		case 35667:
		case 35671: return Ts;
		case 35668:
		case 35672: return Es;
		case 35669:
		case 35673: return Ds;
		case 5125: return Os;
		case 36294: return ks;
		case 36295: return As;
		case 36296: return js;
		case 35678:
		case 36198:
		case 36298:
		case 36306:
		case 35682: return Ms;
		case 35679:
		case 36299:
		case 36307: return Ns;
		case 35680:
		case 36300:
		case 36308:
		case 36293: return Ps;
		case 36289:
		case 36303:
		case 36311:
		case 36292: return Fs;
	}
}
var Ls = class {
	constructor(e, t, n) {
		this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = gs(t.type);
	}
}, Rs = class {
	constructor(e, t, n) {
		this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = Is(t.type);
	}
}, zs = class {
	constructor(e) {
		this.id = e, this.seq = [], this.map = {};
	}
	setValue(e, t, n) {
		let r = this.seq;
		for (let i = 0, a = r.length; i !== a; ++i) {
			let a = r[i];
			a.setValue(e, t[a.id], n);
		}
	}
}, Bs = /(\w+)(\])?(\[|\.)?/g;
function Vs(e, t) {
	e.seq.push(t), e.map[t.id] = t;
}
function Hs(e, t, n) {
	let r = e.name, i = r.length;
	for (Bs.lastIndex = 0;;) {
		let a = Bs.exec(r), o = Bs.lastIndex, s = a[1], c = a[2] === "]", l = a[3];
		if (c && (s |= 0), l === void 0 || l === "[" && o + 2 === i) {
			Vs(n, l === void 0 ? new Ls(s, e, t) : new Rs(s, e, t));
			break;
		}
		{
			let e = n.map[s];
			e === void 0 && (e = new zs(s), Vs(n, e)), n = e;
		}
	}
}
var Us = class {
	constructor(e, t) {
		this.seq = [], this.map = {};
		let n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
		for (let r = 0; r < n; ++r) {
			let n = e.getActiveUniform(t, r);
			Hs(n, e.getUniformLocation(t, n.name), this);
		}
		let r = [], i = [];
		for (let t of this.seq) t.type === e.SAMPLER_2D_SHADOW || t.type === e.SAMPLER_CUBE_SHADOW || t.type === e.SAMPLER_2D_ARRAY_SHADOW ? r.push(t) : i.push(t);
		r.length > 0 && (this.seq = r.concat(i));
	}
	setValue(e, t, n, r) {
		let i = this.map[t];
		i !== void 0 && i.setValue(e, n, r);
	}
	setOptional(e, t, n) {
		let r = t[n];
		r !== void 0 && this.setValue(e, n, r);
	}
	static upload(e, t, n, r) {
		for (let i = 0, a = t.length; i !== a; ++i) {
			let a = t[i], o = n[a.id];
			o.needsUpdate !== !1 && a.setValue(e, o.value, r);
		}
	}
	static seqWithValue(e, t) {
		let n = [];
		for (let r = 0, i = e.length; r !== i; ++r) {
			let i = e[r];
			i.id in t && n.push(i);
		}
		return n;
	}
};
function Ws(e, t, n) {
	let r = e.createShader(t);
	return e.shaderSource(r, n), e.compileShader(r), r;
}
var Gs = 37297, Ks = 0;
function qs(e, t) {
	let n = e.split("\n"), r = [], i = Math.max(t - 6, 0), a = Math.min(t + 6, n.length);
	for (let e = i; e < a; e++) {
		let i = e + 1;
		r.push(`${i === t ? ">" : " "} ${i}: ${n[e]}`);
	}
	return r.join("\n");
}
var Js = /*@__PURE__*/ new q();
function Ys(e) {
	Be._getMatrix(Js, Be.workingColorSpace, e);
	let t = `mat3( ${Js.elements.map((e) => e.toFixed(4))} )`;
	switch (Be.getTransfer(e)) {
		case ee: return [t, "LinearTransferOETF"];
		case j: return [t, "sRGBTransferOETF"];
		default: return L("WebGLProgram: Unsupported color space: ", e), [t, "LinearTransferOETF"];
	}
}
function Xs(e, t, n) {
	let r = e.getShaderParameter(t, e.COMPILE_STATUS), i = (e.getShaderInfoLog(t) || "").trim();
	if (r && i === "") return "";
	let a = /ERROR: 0:(\d+)/.exec(i);
	if (a) {
		let r = parseInt(a[1]);
		return n.toUpperCase() + "\n\n" + i + "\n\n" + qs(e.getShaderSource(t), r);
	}
	return i;
}
function Zs(e, t) {
	let n = Ys(t);
	return [
		`vec4 ${e}( vec4 value ) {`,
		`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,
		"}"
	].join("\n");
}
var Qs = {
	1: "Linear",
	2: "Reinhard",
	3: "Cineon",
	4: "ACESFilmic",
	6: "AgX",
	7: "Neutral",
	5: "Custom"
};
function $s(e, t) {
	let n = Qs[t];
	return n === void 0 ? (L("WebGLProgram: Unsupported toneMapping:", t), "vec3 " + e + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + e + "( vec3 color ) { return " + n + "ToneMapping( color ); }";
}
var ec = /*@__PURE__*/ new G();
function tc() {
	return Be.getLuminanceCoefficients(ec), [
		"float luminance( const in vec3 rgb ) {",
		`	const vec3 weights = vec3( ${ec.x.toFixed(4)}, ${ec.y.toFixed(4)}, ${ec.z.toFixed(4)} );`,
		"	return dot( weights, rgb );",
		"}"
	].join("\n");
}
function nc(e) {
	return [e.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", e.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(ac).join("\n");
}
function rc(e) {
	let t = [];
	for (let n in e) {
		let r = e[n];
		r !== !1 && t.push("#define " + n + " " + r);
	}
	return t.join("\n");
}
function ic(e, t) {
	let n = {}, r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
	for (let i = 0; i < r; i++) {
		let r = e.getActiveAttrib(t, i), a = r.name, o = 1;
		r.type === e.FLOAT_MAT2 && (o = 2), r.type === e.FLOAT_MAT3 && (o = 3), r.type === e.FLOAT_MAT4 && (o = 4), n[a] = {
			type: r.type,
			location: e.getAttribLocation(t, a),
			locationSize: o
		};
	}
	return n;
}
function ac(e) {
	return e !== "";
}
function oc(e, t) {
	let n = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
	return e.replace(/NUM_SUN_LIGHTS/g, t.numSunLights).replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, n).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g, t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g, t.numLightProbeGrids);
}
function sc(e, t) {
	return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
var cc = /^[ \t]*#include +<([\w\d./]+)>/gm;
function lc(e) {
	return e.replace(cc, uc);
}
function uc(e, t) {
	let n = Qa[t];
	if (n === void 0) throw Error("THREE.WebGLProgram: Can not resolve #include <" + t + ">");
	return lc(n);
}
var dc = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function fc(e) {
	return e.replace(dc, pc);
}
function pc(e, t, n, r) {
	let i = "";
	for (let e = parseInt(t); e < parseInt(n); e++) i += r.replace(/\[\s*i\s*\]/g, "[ " + e + " ]").replace(/UNROLLED_LOOP_INDEX/g, e);
	return i;
}
function mc(e) {
	let t = `precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;
	return e.precision === "highp" ? t += "\n#define HIGH_PRECISION" : e.precision === "mediump" ? t += "\n#define MEDIUM_PRECISION" : e.precision === "lowp" && (t += "\n#define LOW_PRECISION"), t;
}
var hc = {
	1: "SHADOWMAP_TYPE_PCF",
	3: "SHADOWMAP_TYPE_VSM"
};
function gc(e) {
	return hc[e.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
var _c = { 302: "ENVMAP_MODE_REFRACTION" };
function vc(e) {
	return e.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : _c[e.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
var yc = {
	0: "ENVMAP_BLENDING_MULTIPLY",
	1: "ENVMAP_BLENDING_MIX",
	2: "ENVMAP_BLENDING_ADD"
};
function bc(e) {
	return e.envMap === !1 ? "ENVMAP_BLENDING_NONE" : yc[e.combine] || "ENVMAP_BLENDING_NONE";
}
function xc(e, t, n, r) {
	let i = e.getContext(), a = n.defines, o = n.vertexShader, s = n.fragmentShader, c = gc(n), l = n.envMapPMREM === !0 ? "ENVMAP_TYPE_PMREM" : "ENVMAP_TYPE_CUBE", u = vc(n), d = bc(n), f = nc(n), p = rc(a), m = i.createProgram(), h, g, _ = n.glslVersion ? "#version " + n.glslVersion + "\n" : "";
	n.isRawShaderMaterial ? (h = [
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		p
	].filter(ac).join("\n"), h.length > 0 && (h += "\n"), g = [
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		p
	].filter(ac).join("\n"), g.length > 0 && (g += "\n")) : (h = [
		mc(n),
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		p,
		n.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
		n.batching ? "#define USE_BATCHING" : "",
		n.batchingColor ? "#define USE_BATCHING_COLOR" : "",
		n.instancing ? "#define USE_INSTANCING" : "",
		n.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
		n.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
		n.useFog && n.fog ? "#define USE_FOG" : "",
		n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
		n.map ? "#define USE_MAP" : "",
		n.envMap ? "#define USE_ENVMAP" : "",
		n.envMap ? "#define " + u : "",
		n.lightMap ? "#define USE_LIGHTMAP" : "",
		n.aoMap ? "#define USE_AOMAP" : "",
		n.bumpMap ? "#define USE_BUMPMAP" : "",
		n.normalMap ? "#define USE_NORMALMAP" : "",
		n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
		n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
		n.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
		n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
		n.anisotropy ? "#define USE_ANISOTROPY" : "",
		n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
		n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
		n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
		n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
		n.diffuseRoughnessMap ? "#define USE_DIFFUSE_ROUGHNESSMAP" : "",
		n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
		n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
		n.specularMap ? "#define USE_SPECULARMAP" : "",
		n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
		n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
		n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
		n.metalnessMap ? "#define USE_METALNESSMAP" : "",
		n.alphaMap ? "#define USE_ALPHAMAP" : "",
		n.alphaHash ? "#define USE_ALPHAHASH" : "",
		n.transmission ? "#define USE_TRANSMISSION" : "",
		n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
		n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
		n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
		n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
		n.mapUv ? "#define MAP_UV " + n.mapUv : "",
		n.alphaMapUv ? "#define ALPHAMAP_UV " + n.alphaMapUv : "",
		n.lightMapUv ? "#define LIGHTMAP_UV " + n.lightMapUv : "",
		n.aoMapUv ? "#define AOMAP_UV " + n.aoMapUv : "",
		n.emissiveMapUv ? "#define EMISSIVEMAP_UV " + n.emissiveMapUv : "",
		n.bumpMapUv ? "#define BUMPMAP_UV " + n.bumpMapUv : "",
		n.normalMapUv ? "#define NORMALMAP_UV " + n.normalMapUv : "",
		n.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + n.displacementMapUv : "",
		n.metalnessMapUv ? "#define METALNESSMAP_UV " + n.metalnessMapUv : "",
		n.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + n.roughnessMapUv : "",
		n.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + n.anisotropyMapUv : "",
		n.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + n.clearcoatMapUv : "",
		n.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + n.clearcoatNormalMapUv : "",
		n.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + n.clearcoatRoughnessMapUv : "",
		n.diffuseRoughnessMapUv ? "#define DIFFUSE_ROUGHNESSMAP_UV " + n.diffuseRoughnessMapUv : "",
		n.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + n.iridescenceMapUv : "",
		n.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + n.iridescenceThicknessMapUv : "",
		n.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + n.sheenColorMapUv : "",
		n.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + n.sheenRoughnessMapUv : "",
		n.specularMapUv ? "#define SPECULARMAP_UV " + n.specularMapUv : "",
		n.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + n.specularColorMapUv : "",
		n.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + n.specularIntensityMapUv : "",
		n.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + n.transmissionMapUv : "",
		n.thicknessMapUv ? "#define THICKNESSMAP_UV " + n.thicknessMapUv : "",
		n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
		n.vertexNormals ? "#define HAS_NORMAL" : "",
		n.vertexColors ? "#define USE_COLOR" : "",
		n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
		n.vertexUv1s ? "#define USE_UV1" : "",
		n.vertexUv2s ? "#define USE_UV2" : "",
		n.vertexUv3s ? "#define USE_UV3" : "",
		n.pointsUvs ? "#define USE_POINTS_UV" : "",
		n.flatShading ? "#define FLAT_SHADED" : "",
		n.skinning ? "#define USE_SKINNING" : "",
		n.morphTargets ? "#define USE_MORPHTARGETS" : "",
		n.morphNormals && n.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
		n.morphColors ? "#define USE_MORPHCOLORS" : "",
		n.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + n.morphTextureStride : "",
		n.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + n.morphTargetsCount : "",
		n.doubleSided ? "#define DOUBLE_SIDED" : "",
		n.flipSided ? "#define FLIP_SIDED" : "",
		n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
		n.shadowMapEnabled ? "#define " + c : "",
		n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
		n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
		n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
		n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
		"uniform mat4 modelMatrix;",
		"uniform mat4 modelViewMatrix;",
		"uniform mat4 projectionMatrix;",
		"uniform mat4 viewMatrix;",
		"uniform mat3 normalMatrix;",
		"uniform vec3 cameraPosition;",
		"uniform bool isOrthographic;",
		"#ifdef USE_INSTANCING",
		"	attribute mat4 instanceMatrix;",
		"#endif",
		"#ifdef USE_INSTANCING_COLOR",
		"	attribute vec3 instanceColor;",
		"#endif",
		"#ifdef USE_INSTANCING_MORPH",
		"	uniform sampler2D morphTexture;",
		"#endif",
		"attribute vec3 position;",
		"attribute vec3 normal;",
		"attribute vec2 uv;",
		"#ifdef USE_UV1",
		"	attribute vec2 uv1;",
		"#endif",
		"#ifdef USE_UV2",
		"	attribute vec2 uv2;",
		"#endif",
		"#ifdef USE_UV3",
		"	attribute vec2 uv3;",
		"#endif",
		"#ifdef USE_TANGENT",
		"	attribute vec4 tangent;",
		"#endif",
		"#if defined( USE_COLOR_ALPHA )",
		"	attribute vec4 color;",
		"#elif defined( USE_COLOR )",
		"	attribute vec3 color;",
		"#endif",
		"#ifdef USE_SKINNING",
		"	attribute vec4 skinIndex;",
		"	attribute vec4 skinWeight;",
		"#endif",
		"\n"
	].filter(ac).join("\n"), g = [
		mc(n),
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		p,
		n.useFog && n.fog ? "#define USE_FOG" : "",
		n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
		n.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
		n.map ? "#define USE_MAP" : "",
		n.matcap ? "#define USE_MATCAP" : "",
		n.envMap ? "#define USE_ENVMAP" : "",
		n.envMap ? "#define " + l : "",
		n.envMap ? "#define " + u : "",
		n.envMap ? "#define " + d : "",
		n.envMapPMREM ? "#define ENVMAP_MAX_LOD " + n.envMapMaxLod + ".0" : "",
		n.envMapPMREM ? "#define ENVMAP_SIZE " + n.envMapSize + ".0" : "",
		n.lightMap ? "#define USE_LIGHTMAP" : "",
		n.aoMap ? "#define USE_AOMAP" : "",
		n.bumpMap ? "#define USE_BUMPMAP" : "",
		n.normalMap ? "#define USE_NORMALMAP" : "",
		n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
		n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
		n.packedNormalMap ? "#define USE_PACKED_NORMALMAP" : "",
		n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
		n.anisotropy ? "#define USE_ANISOTROPY" : "",
		n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
		n.clearcoat ? "#define USE_CLEARCOAT" : "",
		n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
		n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
		n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
		n.diffuseRoughness ? "#define USE_DIFFUSE_ROUGHNESS" : "",
		n.diffuseRoughnessMap ? "#define USE_DIFFUSE_ROUGHNESSMAP" : "",
		n.dispersion ? "#define USE_DISPERSION" : "",
		n.retroreflection ? "#define USE_RETROREFLECTION" : "",
		n.iridescence ? "#define USE_IRIDESCENCE" : "",
		n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
		n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
		n.specularMap ? "#define USE_SPECULARMAP" : "",
		n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
		n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
		n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
		n.metalnessMap ? "#define USE_METALNESSMAP" : "",
		n.alphaMap ? "#define USE_ALPHAMAP" : "",
		n.alphaTest ? "#define USE_ALPHATEST" : "",
		n.alphaHash ? "#define USE_ALPHAHASH" : "",
		n.sheen ? "#define USE_SHEEN" : "",
		n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
		n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
		n.transmission ? "#define USE_TRANSMISSION" : "",
		n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
		n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
		n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
		n.vertexColors || n.instancingColor ? "#define USE_COLOR" : "",
		n.vertexAlphas || n.batchingColor ? "#define USE_COLOR_ALPHA" : "",
		n.vertexUv1s ? "#define USE_UV1" : "",
		n.vertexUv2s ? "#define USE_UV2" : "",
		n.vertexUv3s ? "#define USE_UV3" : "",
		n.pointsUvs ? "#define USE_POINTS_UV" : "",
		n.gradientMap ? "#define USE_GRADIENTMAP" : "",
		n.flatShading ? "#define FLAT_SHADED" : "",
		n.doubleSided ? "#define DOUBLE_SIDED" : "",
		n.flipSided ? "#define FLIP_SIDED" : "",
		n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
		n.shadowMapEnabled ? "#define " + c : "",
		n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
		n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
		n.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
		n.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
		n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
		n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
		"uniform mat4 viewMatrix;",
		"uniform vec3 cameraPosition;",
		"uniform bool isOrthographic;",
		n.toneMapping === 0 ? "" : "#define TONE_MAPPING",
		n.toneMapping === 0 ? "" : Qa.tonemapping_pars_fragment,
		n.toneMapping === 0 ? "" : $s("toneMapping", n.toneMapping),
		n.dithering ? "#define DITHERING" : "",
		n.opaque ? "#define OPAQUE" : "",
		Qa.colorspace_pars_fragment,
		Zs("linearToOutputTexel", n.outputColorSpace),
		tc(),
		n.useDepthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "",
		"\n"
	].filter(ac).join("\n")), o = lc(o), o = oc(o, n), o = sc(o, n), s = lc(s), s = oc(s, n), s = sc(s, n), o = fc(o), s = fc(s), n.isRawShaderMaterial !== !0 && (_ = "#version 300 es\n", h = [
		f,
		"#define attribute in",
		"#define varying out",
		"#define texture2D texture"
	].join("\n") + "\n" + h, g = [
		"#define varying in",
		n.glslVersion === "300 es" ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
		n.glslVersion === "300 es" ? "" : "#define gl_FragColor pc_fragColor",
		"#define gl_FragDepthEXT gl_FragDepth",
		"#define texture2D texture",
		"#define textureCube texture",
		"#define texture2DProj textureProj",
		"#define texture2DLodEXT textureLod",
		"#define texture2DProjLodEXT textureProjLod",
		"#define textureCubeLodEXT textureLod",
		"#define texture2DGradEXT textureGrad",
		"#define texture2DProjGradEXT textureProjGrad",
		"#define textureCubeGradEXT textureGrad"
	].join("\n") + "\n" + g);
	let v = _ + h + o, y = _ + g + s, b = Ws(i, i.VERTEX_SHADER, v), x = Ws(i, i.FRAGMENT_SHADER, y);
	i.attachShader(m, b), i.attachShader(m, x), n.index0AttributeName === void 0 ? n.hasPositionAttribute === !0 && i.bindAttribLocation(m, 0, "position") : i.bindAttribLocation(m, 0, n.index0AttributeName), i.linkProgram(m);
	function S(t) {
		if (e.debug.checkShaderErrors) {
			let n = i.getProgramInfoLog(m) || "", r = i.getShaderInfoLog(b) || "", a = i.getShaderInfoLog(x) || "", o = n.trim(), s = r.trim(), c = a.trim(), l = !0, u = !0;
			if (i.getProgramParameter(m, i.LINK_STATUS) === !1) {
				if (l = !1, typeof e.debug.onShaderError == "function") e.debug.onShaderError(i, m, b, x);
				else {
					let e = Xs(i, b, "vertex"), n = Xs(i, x, "fragment");
					R("WebGLProgram: Shader Error " + i.getError() + " - VALIDATE_STATUS " + i.getProgramParameter(m, i.VALIDATE_STATUS) + "\n\nMaterial Name: " + t.name + "\nMaterial Type: " + t.type + "\n\nProgram Info Log: " + o + "\n" + e + "\n" + n);
				}
			} else o === "" ? (s === "" || c === "") && (u = !1) : L("WebGLProgram: Program Info Log:", o);
			u && (t.diagnostics = {
				runnable: l,
				programLog: o,
				vertexShader: {
					log: s,
					prefix: h
				},
				fragmentShader: {
					log: c,
					prefix: g
				}
			});
		}
		i.deleteShader(b), i.deleteShader(x), C = new Us(i, m), w = ic(i, m);
	}
	let C;
	this.getUniforms = function() {
		return C === void 0 && S(this), C;
	};
	let w;
	this.getAttributes = function() {
		return w === void 0 && S(this), w;
	};
	let T = n.rendererExtensionParallelShaderCompile === !1;
	return this.isReady = function() {
		return T === !1 && (T = i.getProgramParameter(m, Gs)), T;
	}, this.destroy = function() {
		r.releaseStatesOfProgram(this), i.deleteProgram(m), this.program = void 0;
	}, this.type = n.shaderType, this.name = n.shaderName, this.id = Ks++, this.cacheKey = t, this.usedTimes = 1, this.program = m, this.vertexShader = b, this.fragmentShader = x, this;
}
var Sc = 0, Cc = class {
	constructor() {
		this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
	}
	update(e, t, n) {
		let r = this._getShaderCacheForMaterial(e);
		return r.has(t) === !1 && (r.add(t), t.usedTimes++), r.has(n) === !1 && (r.add(n), n.usedTimes++), this;
	}
	remove(e) {
		let t = this.materialCache.get(e);
		for (let e of t) e.usedTimes--, e.usedTimes === 0 && this.shaderCache.delete(e.code);
		return this.materialCache.delete(e), this;
	}
	getVertexShaderStage(e) {
		return this._getShaderStage(e.vertexShader);
	}
	getFragmentShaderStage(e) {
		return this._getShaderStage(e.fragmentShader);
	}
	dispose() {
		this.shaderCache.clear(), this.materialCache.clear();
	}
	_getShaderCacheForMaterial(e) {
		let t = this.materialCache, n = t.get(e);
		return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
	}
	_getShaderStage(e) {
		let t = this.shaderCache, n = t.get(e);
		return n === void 0 && (n = new wc(e), t.set(e, n)), n;
	}
}, wc = class {
	constructor(e) {
		this.id = Sc++, this.code = e, this.usedTimes = 0;
	}
};
function Tc(e) {
	return e === 1030 || e === 37490 || e === 36285;
}
function Ec(e, t, n, r, i, a) {
	let o = new pt(), s = new Cc(), c = /* @__PURE__ */ new Set(), l = [], u = /* @__PURE__ */ new Map(), d = r.logarithmicDepthBuffer, f = {
		MeshDepthMaterial: "depth",
		MeshDistanceMaterial: "distance",
		MeshNormalMaterial: "normal",
		MeshBasicMaterial: "basic",
		MeshLambertMaterial: "lambert",
		MeshPhongMaterial: "phong",
		MeshToonMaterial: "toon",
		MeshStandardMaterial: "physical",
		MeshPhysicalMaterial: "physical",
		MeshMatcapMaterial: "matcap",
		LineBasicMaterial: "basic",
		LineDashedMaterial: "dashed",
		PointsMaterial: "points",
		ShadowMaterial: "shadow",
		SpriteMaterial: "sprite"
	};
	function p(e) {
		return c.add(e), e === 0 ? "uv" : `uv${e}`;
	}
	function m(i, o, l, u, m, h) {
		let g = u.fog, _ = m.geometry, v = i.isMeshStandardMaterial || i.isMeshLambertMaterial || i.isMeshPhongMaterial ? u.environment : null, y = i.isMeshStandardMaterial || i.isMeshLambertMaterial && !i.envMap || i.isMeshPhongMaterial && !i.envMap, b = t.get(i.envMap || v, y), x = f[i.type], S = r.precision;
		i.precision !== null && (S = r.getMaxPrecision(i.precision), S !== i.precision && L("WebGLProgram.getParameters:", i.precision, "not supported, using", S, "instead."));
		let C = _.morphAttributes.position || _.morphAttributes.normal || _.morphAttributes.color, w = C === void 0 ? 0 : C.length, T = 0;
		_.morphAttributes.position !== void 0 && (T = 1), _.morphAttributes.normal !== void 0 && (T = 2), _.morphAttributes.color !== void 0 && (T = 3);
		let E, D, O, k;
		if (x) {
			let e = $a[x];
			E = e.vertexShader, D = e.fragmentShader;
		} else {
			E = i.vertexShader, D = i.fragmentShader;
			let e = s.getVertexShaderStage(i), t = s.getFragmentShaderStage(i);
			s.update(i, e, t), O = e.id, k = t.id;
		}
		let A = e.getRenderTarget(), ee = e.state.buffers.depth.getReversed(), j = m.isInstancedMesh === !0, M = m.isBatchedMesh === !0, N = !!i.map, te = !!i.matcap, ne = !!b, P = ne && b.isPMREMTexture === !0, F = !!i.aoMap, re = !!i.lightMap, ie = !!i.bumpMap && i.wireframe === !1, I = !!i.normalMap, ae = !!i.displacementMap, oe = !!i.emissiveMap, R = !!i.metalnessMap, se = !!i.roughnessMap, ce = i.anisotropy > 0, le = i.clearcoat > 0, z = i.diffuseRoughness > 0, ue = i.dispersion > 0, B = i.retroreflectivity > 0, de = i.iridescence > 0, fe = i.sheen > 0, V = i.transmission > 0, H = ce && !!i.anisotropyMap, pe = le && !!i.clearcoatMap, me = le && !!i.clearcoatNormalMap, he = le && !!i.clearcoatRoughnessMap, ge = z && !!i.diffuseRoughnessMap, _e = de && !!i.iridescenceMap, ve = de && !!i.iridescenceThicknessMap, ye = fe && !!i.sheenColorMap, be = fe && !!i.sheenRoughnessMap, xe = !!i.specularMap, Se = !!i.specularColorMap, Ce = !!i.specularIntensityMap, we = V && !!i.transmissionMap, Te = V && !!i.thicknessMap, Ee = !!i.gradientMap, De = !!i.alphaMap, Oe = i.alphaTest > 0, ke = !!i.alphaHash, Ae = !!i.extensions, je = 0;
		i.toneMapped && (A === null || A.isXRRenderTarget === !0) && (je = e.toneMapping);
		let Me = P ? b.isCompressedCubeTexture ? b.image[0].mipmaps : b.mipmaps : null, Ne = {
			shaderID: x,
			shaderType: i.type,
			shaderName: i.name,
			vertexShader: E,
			fragmentShader: D,
			defines: i.defines,
			customVertexShaderID: O,
			customFragmentShaderID: k,
			isRawShaderMaterial: i.isRawShaderMaterial === !0,
			glslVersion: i.glslVersion,
			precision: S,
			batching: M,
			batchingColor: M && m._colorsTexture !== null,
			instancing: j,
			instancingColor: j && m.instanceColor !== null,
			instancingMorph: j && m.morphTexture !== null,
			outputColorSpace: A === null ? e.outputColorSpace : A.isXRRenderTarget === !0 ? A.texture.colorSpace : Be.workingColorSpace,
			alphaToCoverage: !!i.alphaToCoverage,
			map: N,
			matcap: te,
			envMap: ne,
			envMapMode: ne && b.mapping,
			envMapPMREM: P,
			envMapMaxLod: P ? Me.length - 1 : null,
			envMapSize: P ? Me[0].width : null,
			aoMap: F,
			lightMap: re,
			bumpMap: ie,
			normalMap: I,
			displacementMap: ae,
			emissiveMap: oe,
			normalMapObjectSpace: I && i.normalMapType === 1,
			normalMapTangentSpace: I && i.normalMapType === 0,
			packedNormalMap: I && i.normalMapType === 0 && Tc(i.normalMap.format),
			metalnessMap: R,
			roughnessMap: se,
			anisotropy: ce,
			anisotropyMap: H,
			clearcoat: le,
			clearcoatMap: pe,
			clearcoatNormalMap: me,
			clearcoatRoughnessMap: he,
			diffuseRoughness: z,
			diffuseRoughnessMap: ge,
			dispersion: ue,
			retroreflection: B,
			iridescence: de,
			iridescenceMap: _e,
			iridescenceThicknessMap: ve,
			sheen: fe,
			sheenColorMap: ye,
			sheenRoughnessMap: be,
			specularMap: xe,
			specularColorMap: Se,
			specularIntensityMap: Ce,
			transmission: V,
			transmissionMap: we,
			thicknessMap: Te,
			gradientMap: Ee,
			opaque: i.transparent === !1 && i.blending === 1 && i.alphaToCoverage === !1,
			alphaMap: De,
			alphaTest: Oe,
			alphaHash: ke,
			combine: i.combine,
			mapUv: N && p(i.map.channel),
			aoMapUv: F && p(i.aoMap.channel),
			lightMapUv: re && p(i.lightMap.channel),
			bumpMapUv: ie && p(i.bumpMap.channel),
			normalMapUv: I && p(i.normalMap.channel),
			displacementMapUv: ae && p(i.displacementMap.channel),
			emissiveMapUv: oe && p(i.emissiveMap.channel),
			metalnessMapUv: R && p(i.metalnessMap.channel),
			roughnessMapUv: se && p(i.roughnessMap.channel),
			anisotropyMapUv: H && p(i.anisotropyMap.channel),
			clearcoatMapUv: pe && p(i.clearcoatMap.channel),
			clearcoatNormalMapUv: me && p(i.clearcoatNormalMap.channel),
			clearcoatRoughnessMapUv: he && p(i.clearcoatRoughnessMap.channel),
			diffuseRoughnessMapUv: ge && p(i.diffuseRoughnessMap.channel),
			iridescenceMapUv: _e && p(i.iridescenceMap.channel),
			iridescenceThicknessMapUv: ve && p(i.iridescenceThicknessMap.channel),
			sheenColorMapUv: ye && p(i.sheenColorMap.channel),
			sheenRoughnessMapUv: be && p(i.sheenRoughnessMap.channel),
			specularMapUv: xe && p(i.specularMap.channel),
			specularColorMapUv: Se && p(i.specularColorMap.channel),
			specularIntensityMapUv: Ce && p(i.specularIntensityMap.channel),
			transmissionMapUv: we && p(i.transmissionMap.channel),
			thicknessMapUv: Te && p(i.thicknessMap.channel),
			alphaMapUv: De && p(i.alphaMap.channel),
			vertexTangents: !!_.attributes.tangent && (I || ce),
			vertexNormals: !!_.attributes.normal,
			vertexColors: i.vertexColors,
			vertexAlphas: i.vertexColors === !0 && !!_.attributes.color && _.attributes.color.itemSize === 4,
			pointsUvs: m.isPoints === !0 && !!_.attributes.uv && (N || De),
			fog: !!g,
			useFog: i.fog === !0,
			fogExp2: !!g && g.isFogExp2,
			flatShading: i.wireframe === !1 && (i.flatShading === !0 || _.attributes.normal === void 0 && I === !1 && (i.isMeshLambertMaterial || i.isMeshPhongMaterial || i.isMeshStandardMaterial || i.isMeshPhysicalMaterial)),
			sizeAttenuation: i.sizeAttenuation === !0,
			logarithmicDepthBuffer: d,
			reversedDepthBuffer: ee,
			skinning: m.isSkinnedMesh === !0,
			hasPositionAttribute: _.attributes.position !== void 0,
			morphTargets: _.morphAttributes.position !== void 0,
			morphNormals: _.morphAttributes.normal !== void 0,
			morphColors: _.morphAttributes.color !== void 0,
			morphTargetsCount: w,
			morphTextureStride: T,
			numSunLights: o.sun.length,
			numDirLights: o.directional.length,
			numPointLights: o.point.length,
			numSpotLights: o.spot.length,
			numSpotLightMaps: o.spotLightMap.length,
			numRectAreaLights: o.rectArea.length,
			numHemiLights: o.hemi.length,
			numSunLightShadows: o.sunShadowMap.length,
			numDirLightShadows: o.directionalShadowMap.length,
			numPointLightShadows: o.pointShadowMap.length,
			numSpotLightShadows: o.spotShadowMap.length,
			numSpotLightShadowsWithMaps: o.numSpotLightShadowsWithMaps,
			numLightProbes: o.numLightProbes,
			numLightProbeGrids: h.filter((e) => e.texture !== null).length,
			numClippingPlanes: a.numPlanes,
			numClipIntersection: a.numIntersection,
			dithering: i.dithering,
			shadowMapEnabled: e.shadowMap.enabled && l.length > 0,
			shadowMapType: e.shadowMap.type,
			toneMapping: je,
			decodeVideoTexture: N && i.map.isVideoTexture === !0 && Be.getTransfer(i.map.colorSpace) === "srgb",
			decodeVideoTextureEmissive: oe && i.emissiveMap.isVideoTexture === !0 && Be.getTransfer(i.emissiveMap.colorSpace) === "srgb",
			premultipliedAlpha: i.premultipliedAlpha,
			doubleSided: i.side === 2,
			flipSided: i.side === 1,
			useDepthPacking: i.depthPacking >= 0,
			depthPacking: i.depthPacking || 0,
			index0AttributeName: i.index0AttributeName,
			extensionClipCullDistance: Ae && i.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
			extensionMultiDraw: (Ae && i.extensions.multiDraw === !0 || M) && n.has("WEBGL_multi_draw"),
			rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
			customProgramCacheKey: i.customProgramCacheKey()
		};
		return Ne.vertexUv1s = c.has(1), Ne.vertexUv2s = c.has(2), Ne.vertexUv3s = c.has(3), c.clear(), Ne;
	}
	function h(t) {
		let n = [];
		if (t.shaderID ? n.push(t.shaderID) : (n.push(t.customVertexShaderID), n.push(t.customFragmentShaderID)), t.defines !== void 0) for (let e in t.defines) n.push(e), n.push(t.defines[e]);
		return t.isRawShaderMaterial === !1 && (g(n, t), _(n, t), n.push(e.outputColorSpace)), n.push(t.customProgramCacheKey), n.join();
	}
	function g(e, t) {
		e.push(t.precision), e.push(t.outputColorSpace), e.push(t.envMapMode), e.push(t.envMapPMREM), e.push(t.envMapMaxLod), e.push(t.envMapSize), e.push(t.mapUv), e.push(t.alphaMapUv), e.push(t.lightMapUv), e.push(t.aoMapUv), e.push(t.bumpMapUv), e.push(t.normalMapUv), e.push(t.displacementMapUv), e.push(t.emissiveMapUv), e.push(t.metalnessMapUv), e.push(t.roughnessMapUv), e.push(t.anisotropyMapUv), e.push(t.clearcoatMapUv), e.push(t.clearcoatNormalMapUv), e.push(t.clearcoatRoughnessMapUv), e.push(t.diffuseRoughnessMapUv), e.push(t.iridescenceMapUv), e.push(t.iridescenceThicknessMapUv), e.push(t.sheenColorMapUv), e.push(t.sheenRoughnessMapUv), e.push(t.specularMapUv), e.push(t.specularColorMapUv), e.push(t.specularIntensityMapUv), e.push(t.transmissionMapUv), e.push(t.thicknessMapUv), e.push(t.combine), e.push(t.fogExp2), e.push(t.sizeAttenuation), e.push(t.morphTargetsCount), e.push(t.numSunLights), e.push(t.numDirLights), e.push(t.numPointLights), e.push(t.numSpotLights), e.push(t.numSpotLightMaps), e.push(t.numHemiLights), e.push(t.numRectAreaLights), e.push(t.numSunLightShadows), e.push(t.numDirLightShadows), e.push(t.numPointLightShadows), e.push(t.numSpotLightShadows), e.push(t.numSpotLightShadowsWithMaps), e.push(t.numLightProbes), e.push(t.numLightProbeGrids), e.push(t.shadowMapType), e.push(t.toneMapping), e.push(t.numClippingPlanes), e.push(t.numClipIntersection), e.push(t.depthPacking);
	}
	function _(e, t) {
		o.disableAll(), t.instancing && o.enable(0), t.instancingColor && o.enable(1), t.instancingMorph && o.enable(2), t.matcap && o.enable(3), t.envMap && o.enable(4), t.normalMapObjectSpace && o.enable(5), t.normalMapTangentSpace && o.enable(6), t.clearcoat && o.enable(7), t.iridescence && o.enable(8), t.alphaTest && o.enable(9), t.vertexColors && o.enable(10), t.vertexAlphas && o.enable(11), t.vertexUv1s && o.enable(12), t.vertexUv2s && o.enable(13), t.vertexUv3s && o.enable(14), t.vertexTangents && o.enable(15), t.anisotropy && o.enable(16), t.alphaHash && o.enable(17), t.batching && o.enable(18), t.dispersion && o.enable(19), t.retroreflection && o.enable(24), t.diffuseRoughness && o.enable(25), t.batchingColor && o.enable(20), t.gradientMap && o.enable(21), t.packedNormalMap && o.enable(22), t.vertexNormals && o.enable(23), e.push(o.mask), o.disableAll(), t.fog && o.enable(0), t.useFog && o.enable(1), t.flatShading && o.enable(2), t.logarithmicDepthBuffer && o.enable(3), t.reversedDepthBuffer && o.enable(4), t.skinning && o.enable(5), t.morphTargets && o.enable(6), t.morphNormals && o.enable(7), t.morphColors && o.enable(8), t.premultipliedAlpha && o.enable(9), t.shadowMapEnabled && o.enable(10), t.doubleSided && o.enable(11), t.flipSided && o.enable(12), t.useDepthPacking && o.enable(13), t.dithering && o.enable(14), t.transmission && o.enable(15), t.sheen && o.enable(16), t.opaque && o.enable(17), t.pointsUvs && o.enable(18), t.decodeVideoTexture && o.enable(19), t.decodeVideoTextureEmissive && o.enable(20), t.alphaToCoverage && o.enable(21), t.numLightProbeGrids > 0 && o.enable(22), t.hasPositionAttribute && o.enable(23), e.push(o.mask);
	}
	function v(e) {
		let t = f[e.type], n;
		if (t) {
			let e = $a[t];
			n = Ni.clone(e.uniforms);
		} else n = e.uniforms;
		return n;
	}
	function y(t, n) {
		let r = u.get(n);
		return r === void 0 ? (r = new xc(e, n, t, i), l.push(r), u.set(n, r)) : ++r.usedTimes, r;
	}
	function b(e) {
		if (--e.usedTimes === 0) {
			let t = l.indexOf(e);
			l[t] = l[l.length - 1], l.pop(), u.delete(e.cacheKey), e.destroy();
		}
	}
	function x(e) {
		s.remove(e);
	}
	function S() {
		s.dispose();
	}
	return {
		getParameters: m,
		getProgramCacheKey: h,
		getUniforms: v,
		acquireProgram: y,
		releaseProgram: b,
		releaseShaderCache: x,
		programs: l,
		dispose: S
	};
}
function Dc() {
	let e = /* @__PURE__ */ new WeakMap();
	function t(t) {
		return e.has(t);
	}
	function n(t) {
		let n = e.get(t);
		return n === void 0 && (n = {}, e.set(t, n)), n;
	}
	function r(t) {
		e.delete(t);
	}
	function i(t, n, r) {
		e.get(t)[n] = r;
	}
	function a() {
		e = /* @__PURE__ */ new WeakMap();
	}
	return {
		has: t,
		get: n,
		remove: r,
		update: i,
		dispose: a
	};
}
function Oc(e, t) {
	return e.groupOrder === t.groupOrder ? e.renderOrder === t.renderOrder ? e.material.id === t.material.id ? e.materialVariant === t.materialVariant ? e.z === t.z ? e.id - t.id : e.z - t.z : e.materialVariant - t.materialVariant : e.material.id - t.material.id : e.renderOrder - t.renderOrder : e.groupOrder - t.groupOrder;
}
function kc(e, t) {
	return e.groupOrder === t.groupOrder ? e.renderOrder === t.renderOrder ? e.z === t.z ? e.id - t.id : t.z - e.z : e.renderOrder - t.renderOrder : e.groupOrder - t.groupOrder;
}
function Ac() {
	let e = [], t = 0, n = [], r = [], i = [];
	function a() {
		t = 0, n.length = 0, r.length = 0, i.length = 0;
	}
	function o(e) {
		let t = 0;
		return e.isInstancedMesh && (t += 2), e.isSkinnedMesh && (t += 1), t;
	}
	function s(n, r, i, a, s, c) {
		let l = e[t];
		return l === void 0 ? (l = {
			id: n.id,
			object: n,
			geometry: r,
			material: i,
			materialVariant: o(n),
			groupOrder: a,
			renderOrder: n.renderOrder,
			z: s,
			group: c
		}, e[t] = l) : (l.id = n.id, l.object = n, l.geometry = r, l.material = i, l.materialVariant = o(n), l.groupOrder = a, l.renderOrder = n.renderOrder, l.z = s, l.group = c), t++, l;
	}
	function c(e, t, a, o, c, l, u) {
		u.reversedDepth === !0 && (c = -c);
		let d = s(e, t, a, o, c, l);
		a.transmission > 0 ? r.push(d) : a.transparent === !0 ? i.push(d) : n.push(d);
	}
	function l(e, t, a, o, c, l) {
		let u = s(e, t, a, o, c, l);
		a.transmission > 0 ? r.unshift(u) : a.transparent === !0 ? i.unshift(u) : n.unshift(u);
	}
	function u(e, t) {
		n.length > 1 && n.sort(e || Oc), r.length > 1 && r.sort(t || kc), i.length > 1 && i.sort(t || kc);
	}
	function d() {
		for (let n = t, r = e.length; n < r; n++) {
			let t = e[n];
			if (t.id === null) break;
			t.id = null, t.object = null, t.geometry = null, t.material = null, t.group = null;
		}
	}
	return {
		opaque: n,
		transmissive: r,
		transparent: i,
		init: a,
		push: c,
		unshift: l,
		finish: d,
		sort: u
	};
}
function jc() {
	let e = /* @__PURE__ */ new WeakMap();
	function t(t, n) {
		let r = e.get(t), i;
		return r === void 0 ? (i = new Ac(), e.set(t, [i])) : n >= r.length ? (i = new Ac(), r.push(i)) : i = r[n], i;
	}
	function n() {
		e = /* @__PURE__ */ new WeakMap();
	}
	return {
		get: t,
		dispose: n
	};
}
function Mc() {
	let e = {};
	return { get: function(t) {
		if (e[t.id] !== void 0) return e[t.id];
		let n;
		switch (t.type) {
			case "SunLight":
			case "DirectionalLight":
				n = {
					direction: new G(),
					color: new J()
				};
				break;
			case "SpotLight":
				n = {
					position: new G(),
					direction: new G(),
					color: new J(),
					distance: 0,
					coneCos: 0,
					penumbraCos: 0,
					decay: 0
				};
				break;
			case "PointLight":
				n = {
					position: new G(),
					color: new J(),
					distance: 0,
					decay: 0
				};
				break;
			case "HemisphereLight":
				n = {
					direction: new G(),
					skyColor: new J(),
					groundColor: new J()
				};
				break;
			case "RectAreaLight": n = {
				color: new J(),
				position: new G(),
				halfWidth: new G(),
				halfHeight: new G()
			};
		}
		return e[t.id] = n, n;
	} };
}
function Nc() {
	let e = {};
	return { get: function(t) {
		if (e[t.id] !== void 0) return e[t.id];
		let n;
		switch (t.type) {
			case "SunLight":
			case "DirectionalLight":
				n = {
					shadowIntensity: 1,
					shadowBias: 0,
					shadowNormalBias: 0,
					shadowRadius: 1,
					shadowMapSize: new W()
				};
				break;
			case "SpotLight":
				n = {
					shadowIntensity: 1,
					shadowBias: 0,
					shadowNormalBias: 0,
					shadowRadius: 1,
					shadowMapSize: new W()
				};
				break;
			case "PointLight": n = {
				shadowIntensity: 1,
				shadowBias: 0,
				shadowNormalBias: 0,
				shadowRadius: 1,
				shadowMapSize: new W(),
				shadowCameraNear: 1,
				shadowCameraFar: 1e3
			};
		}
		return e[t.id] = n, n;
	} };
}
var Pc = 0;
function Fc(e, t) {
	return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + +!!t.map - !!e.map;
}
function Ic(e) {
	let t = new Mc(), n = Nc(), r = {
		version: 0,
		hash: {
			sunLength: -1,
			directionalLength: -1,
			pointLength: -1,
			spotLength: -1,
			rectAreaLength: -1,
			hemiLength: -1,
			numSunShadows: -1,
			numDirectionalShadows: -1,
			numPointShadows: -1,
			numSpotShadows: -1,
			numSpotMaps: -1,
			numLightProbes: -1
		},
		ambient: [
			0,
			0,
			0
		],
		probe: [],
		sun: [],
		sunShadow: [],
		sunShadowMap: [],
		sunShadowMatrix: [],
		sunShadowCascade: [],
		directional: [],
		directionalShadow: [],
		directionalShadowMap: [],
		directionalShadowMatrix: [],
		spot: [],
		spotLightMap: [],
		spotShadow: [],
		spotShadowMap: [],
		spotLightMatrix: [],
		rectArea: [],
		rectAreaLTC1: null,
		rectAreaLTC2: null,
		point: [],
		pointShadow: [],
		pointShadowMap: [],
		pointShadowMatrix: [],
		hemi: [],
		numSpotLightShadowsWithMaps: 0,
		numLightProbes: 0
	};
	for (let e = 0; e < 9; e++) r.probe.push(new G());
	let i = new G(), a = new nt(), o = new nt();
	function s(i) {
		let a = 0, o = 0, s = 0;
		for (let e = 0; e < 9; e++) r.probe[e].set(0, 0, 0);
		let c = 0, l = 0, u = 0, d = 0, f = 0, p = 0, m = 0, h = 0, g = 0, _ = 0, v = 0, y = 0, b = 0, x = 0;
		i.sort(Fc);
		for (let e = 0, S = i.length; e < S; e++) {
			let S = i[e], C = S.color, w = S.intensity, T = S.distance, E = null;
			if (S.shadow && S.shadow.map && (E = S.shadow.map.texture.format === 1030 ? S.shadow.map.texture : S.shadow.map.depthTexture || S.shadow.map.texture), S.isAmbientLight) a += C.r * w, o += C.g * w, s += C.b * w;
			else if (S.isLightProbe) {
				for (let e = 0; e < 9; e++) r.probe[e].addScaledVector(S.sh.coefficients[e], w);
				x++;
			} else if (S.isSunLight) {
				let e = t.get(S);
				if (e.color.copy(S.color).multiplyScalar(S.intensity), S.castShadow) {
					let e = S.shadow, t = n.get(S);
					t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()), r.sunShadow[l] = t, r.sunShadowMap[l] = E;
					let i = e.getViewportCount();
					for (let t = 0; t < i; t++) r.sunShadowMatrix[u + t] = e.getMatrix(t), r.sunShadowCascade[u + t] = e._cascadeData[t];
					u += i, l++;
				}
				r.sun[c] = e, c++;
			} else if (S.isDirectionalLight) {
				let e = t.get(S);
				if (e.color.copy(S.color).multiplyScalar(S.intensity), S.castShadow) {
					let e = S.shadow, t = n.get(S);
					t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize = e.mapSize, r.directionalShadow[d] = t, r.directionalShadowMap[d] = E, r.directionalShadowMatrix[d] = S.shadow.matrix, g++;
				}
				r.directional[d] = e, d++;
			} else if (S.isSpotLight) {
				let e = t.get(S);
				e.position.setFromMatrixPosition(S.matrixWorld), e.color.copy(C).multiplyScalar(w), e.distance = T, e.coneCos = Math.cos(S.angle), e.penumbraCos = Math.cos(S.angle * (1 - S.penumbra)), e.decay = S.decay, r.spot[p] = e;
				let i = S.shadow;
				if (S.map && (r.spotLightMap[y] = S.map, y++, i.updateMatrices(S), S.castShadow && b++), r.spotLightMatrix[p] = i.matrix, S.castShadow) {
					let e = n.get(S);
					e.shadowIntensity = i.intensity, e.shadowBias = i.bias, e.shadowNormalBias = i.normalBias, e.shadowRadius = i.radius, e.shadowMapSize = i.mapSize, r.spotShadow[p] = e, r.spotShadowMap[p] = E, v++;
				}
				p++;
			} else if (S.isRectAreaLight) {
				let e = t.get(S);
				e.color.copy(C).multiplyScalar(w), e.halfWidth.set(S.width * .5, 0, 0), e.halfHeight.set(0, S.height * .5, 0), r.rectArea[m] = e, m++;
			} else if (S.isPointLight) {
				let e = t.get(S);
				if (e.color.copy(S.color).multiplyScalar(S.intensity), e.distance = S.distance, e.decay = S.decay, S.castShadow) {
					let e = S.shadow, t = n.get(S);
					t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize = e.mapSize, t.shadowCameraNear = e.camera.near, t.shadowCameraFar = e.camera.far, r.pointShadow[f] = t, r.pointShadowMap[f] = E, r.pointShadowMatrix[f] = S.shadow.matrix, _++;
				}
				r.point[f] = e, f++;
			} else if (S.isHemisphereLight) {
				let e = t.get(S);
				e.skyColor.copy(S.color).multiplyScalar(w), e.groundColor.copy(S.groundColor).multiplyScalar(w), r.hemi[h] = e, h++;
			}
		}
		m > 0 && (e.has("OES_texture_float_linear") === !0 ? (r.rectAreaLTC1 = X.LTC_FLOAT_1, r.rectAreaLTC2 = X.LTC_FLOAT_2) : (r.rectAreaLTC1 = X.LTC_HALF_1, r.rectAreaLTC2 = X.LTC_HALF_2)), r.ambient[0] = a, r.ambient[1] = o, r.ambient[2] = s;
		let S = r.hash;
		(S.sunLength !== c || S.directionalLength !== d || S.pointLength !== f || S.spotLength !== p || S.rectAreaLength !== m || S.hemiLength !== h || S.numSunShadows !== l || S.numDirectionalShadows !== g || S.numPointShadows !== _ || S.numSpotShadows !== v || S.numSpotMaps !== y || S.numLightProbes !== x) && (r.sun.length = c, r.directional.length = d, r.spot.length = p, r.rectArea.length = m, r.point.length = f, r.hemi.length = h, r.sunShadow.length = l, r.sunShadowMap.length = l, r.sunShadowMatrix.length = u, r.sunShadowCascade.length = u, r.directionalShadow.length = g, r.directionalShadowMap.length = g, r.directionalShadowMatrix.length = g, r.pointShadow.length = _, r.pointShadowMap.length = _, r.pointShadowMatrix.length = _, r.spotShadow.length = v, r.spotShadowMap.length = v, r.spotLightMatrix.length = v + y - b, r.spotLightMap.length = y, r.numSpotLightShadowsWithMaps = b, r.numLightProbes = x, S.sunLength = c, S.directionalLength = d, S.pointLength = f, S.spotLength = p, S.rectAreaLength = m, S.hemiLength = h, S.numSunShadows = l, S.numDirectionalShadows = g, S.numPointShadows = _, S.numSpotShadows = v, S.numSpotMaps = y, S.numLightProbes = x, r.version = Pc++);
	}
	function c(e, t) {
		let n = 0, s = 0, c = 0, l = 0, u = 0, d = 0, f = t.matrixWorldInverse;
		for (let t = 0, p = e.length; t < p; t++) {
			let p = e[t];
			if (p.isSunLight) {
				let e = r.sun[n];
				e.direction.setFromMatrixPosition(p.matrixWorld), e.direction.transformDirection(f), n++;
			} else if (p.isDirectionalLight) {
				let e = r.directional[s];
				e.direction.setFromMatrixPosition(p.matrixWorld), i.setFromMatrixPosition(p.target.matrixWorld), e.direction.sub(i), e.direction.transformDirection(f), s++;
			} else if (p.isSpotLight) {
				let e = r.spot[l];
				e.position.setFromMatrixPosition(p.matrixWorld), e.position.applyMatrix4(f), e.direction.setFromMatrixPosition(p.matrixWorld), i.setFromMatrixPosition(p.target.matrixWorld), e.direction.sub(i), e.direction.transformDirection(f), l++;
			} else if (p.isRectAreaLight) {
				let e = r.rectArea[u];
				e.position.setFromMatrixPosition(p.matrixWorld), e.position.applyMatrix4(f), o.identity(), a.copy(p.matrixWorld), a.premultiply(f), o.extractRotation(a), e.halfWidth.set(p.width * .5, 0, 0), e.halfHeight.set(0, p.height * .5, 0), e.halfWidth.applyMatrix4(o), e.halfHeight.applyMatrix4(o), u++;
			} else if (p.isPointLight) {
				let e = r.point[c];
				e.position.setFromMatrixPosition(p.matrixWorld), e.position.applyMatrix4(f), c++;
			} else if (p.isHemisphereLight) {
				let e = r.hemi[d];
				e.direction.setFromMatrixPosition(p.matrixWorld), e.direction.transformDirection(f), d++;
			}
		}
	}
	return {
		setup: s,
		setupView: c,
		state: r
	};
}
function Lc(e) {
	let t = new Ic(e), n = [], r = [], i = [];
	function a(e) {
		u.camera = e, n.length = 0, r.length = 0, i.length = 0;
	}
	function o(e) {
		e.isLightProbeGrid ? i.push(e) : n.push(e);
	}
	function s(e) {
		r.push(e);
	}
	function c() {
		t.setup(n), i.sort((e, t) => e.priority - t.priority || e.id - t.id);
	}
	function l(e) {
		t.setupView(n, e);
	}
	let u = {
		lightsArray: n,
		shadowsArray: r,
		lightProbeGridArray: i,
		camera: null,
		lights: t,
		transmissionRenderTarget: {},
		textureUnits: 0
	};
	return {
		init: a,
		state: u,
		setupLights: c,
		setupLightsView: l,
		pushLight: o,
		pushShadow: s
	};
}
function Rc(e) {
	let t = /* @__PURE__ */ new WeakMap();
	function n(n, r = 0) {
		let i = t.get(n), a;
		return i === void 0 ? (a = new Lc(e), t.set(n, [a])) : r >= i.length ? (a = new Lc(e), i.push(a)) : a = i[r], a;
	}
	function r() {
		t = /* @__PURE__ */ new WeakMap();
	}
	return {
		get: n,
		dispose: r
	};
}
var zc = "void main() {\n	gl_Position = vec4( position, 1.0 );\n}", Bc = "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\nvoid main() {\n	const float samples = float( VSM_SAMPLES );\n	float mean = 0.0;\n	float squared_mean = 0.0;\n	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n	for ( float i = 0.0; i < samples; i ++ ) {\n		float uvOffset = uvStart + i * uvStride;\n		#ifdef HORIZONTAL_PASS\n			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;\n			mean += distribution.x;\n			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n		#else\n			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;\n			mean += depth;\n			squared_mean += depth * depth;\n		#endif\n	}\n	mean = mean / samples;\n	squared_mean = squared_mean / samples;\n	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );\n	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );\n}", Vc = [
	/*@__PURE__*/ new G(1, 0, 0),
	/*@__PURE__*/ new G(-1, 0, 0),
	/*@__PURE__*/ new G(0, 1, 0),
	/*@__PURE__*/ new G(0, -1, 0),
	/*@__PURE__*/ new G(0, 0, 1),
	/*@__PURE__*/ new G(0, 0, -1)
], Hc = [
	/*@__PURE__*/ new G(0, -1, 0),
	/*@__PURE__*/ new G(0, -1, 0),
	/*@__PURE__*/ new G(0, 0, 1),
	/*@__PURE__*/ new G(0, 0, -1),
	/*@__PURE__*/ new G(0, -1, 0),
	/*@__PURE__*/ new G(0, -1, 0)
], Uc = /*@__PURE__*/ new nt(), Wc = /*@__PURE__*/ new G(), Gc = /*@__PURE__*/ new G();
function Kc(e, t, n) {
	let a = new zr(), o = new W(), s = new W(), d = new Ze(), f = new Vi(), p = new Hi(), m = {}, g = n.maxTextureSize, _ = {
		0: 1,
		1: 0,
		2: 2
	}, v = new Ii({
		defines: { VSM_SAMPLES: 8 },
		uniforms: {
			shadow_pass: { value: null },
			resolution: { value: new W() },
			radius: { value: 4 }
		},
		vertexShader: zc,
		fragmentShader: Bc
	}), b = v.clone();
	b.defines.HORIZONTAL_PASS = 1;
	let x = new Pn();
	x.setAttribute("position", new yn(new Float32Array([
		-1,
		-1,
		.5,
		3,
		-1,
		.5,
		-1,
		3,
		.5
	]), 3));
	let S = new Y(x, v), C = this;
	this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
	let w = this.type;
	this.render = function(t, n, f) {
		if (C.enabled === !1 || C.autoUpdate === !1 && C.needsUpdate === !1 || t.length === 0) return;
		this.type === 2 && (L("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."), this.type = 1);
		let p = e.getRenderTarget(), m = e.getActiveCubeFace(), _ = e.getActiveMipmapLevel(), v = e.state;
		v.setBlending(0), v.buffers.depth.getReversed() === !0 ? v.buffers.color.setClear(0, 0, 0, 0) : v.buffers.color.setClear(1, 1, 1, 1), v.buffers.depth.setTest(!0), v.setScissorTest(!1);
		let b = w !== this.type;
		b && n.traverse(function(e) {
			e.material && (Array.isArray(e.material) ? e.material.forEach((e) => e.needsUpdate = !0) : e.material.needsUpdate = !0);
		});
		for (let p = 0, m = t.length; p < m; p++) {
			let m = t[p], _ = m.shadow;
			if (_ === void 0) {
				L("WebGLShadowMap:", m, "has no shadow.");
				continue;
			}
			if (_.autoUpdate === !1 && _.needsUpdate === !1) continue;
			o.copy(_.mapSize);
			let x = _.getFrameExtents();
			o.multiply(x), s.copy(_.mapSize), (o.x > g || o.y > g) && (o.x > g && (s.x = Math.floor(g / x.x), o.x = s.x * x.x, _.mapSize.x = s.x), o.y > g && (s.y = Math.floor(g / x.y), o.y = s.y * x.y, _.mapSize.y = s.y));
			let S = e.state.buffers.depth.getReversed();
			if (_.camera._reversedDepth = S, _.map === null || b === !0) {
				if (_.map !== null && (_.map.depthTexture !== null && (_.map.depthTexture.dispose(), _.map.depthTexture = null), _.map.dispose()), this.type === 3) {
					if (m.isPointLight) {
						L("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
						continue;
					}
					_.map = new $e(o.x, o.y, {
						format: y,
						type: u,
						minFilter: i,
						magFilter: i,
						generateMipmaps: !1
					}), _.map.texture.name = m.name + ".shadowMap", _.map.depthTexture = new ui(o.x, o.y, l), _.map.depthTexture.name = m.name + ".shadowMapDepth", _.map.depthTexture.format = h, _.map.depthTexture.compareFunction = null, _.map.depthTexture.minFilter = r, _.map.depthTexture.magFilter = r;
				} else m.isPointLight ? (_.map = new co(o.x), _.map.depthTexture = new di(o.x, c)) : (_.map = new $e(o.x, o.y), _.map.depthTexture = new ui(o.x, o.y, c)), _.map.depthTexture.name = m.name + ".shadowMap", _.map.depthTexture.format = h, this.type === 1 ? (_.map.depthTexture.compareFunction = S ? 518 : 515, _.map.depthTexture.minFilter = i, _.map.depthTexture.magFilter = i) : (_.map.depthTexture.compareFunction = null, _.map.depthTexture.minFilter = r, _.map.depthTexture.magFilter = r);
				_.camera.updateProjectionMatrix();
			}
			_.map.isWebGLCubeRenderTarget !== !0 && (_.map.width !== o.x || _.map.height !== o.y) && _.map.setSize(o.x, o.y);
			let C = _.map.isWebGLCubeRenderTarget ? 6 : _.getViewportCount();
			m.isPointLight !== !0 && _.updateMatrices(m, f);
			let w = _.camera.layers.mask & 4294967294 ? _.camera.layers : f.layers;
			for (let t = 0; t < C; t++) {
				let r = _.getCamera(t);
				if (m.isPointLight) {
					let e = _.camera, n = _.matrix, r = m.distance || e.far;
					r !== e.far && (e.far = r, e.updateProjectionMatrix()), Wc.setFromMatrixPosition(m.matrixWorld), e.position.copy(Wc), Gc.copy(e.position), Gc.add(Vc[t]), e.up.copy(Hc[t]), e.lookAt(Gc), e.updateMatrixWorld(), n.makeTranslation(-Wc.x, -Wc.y, -Wc.z), Uc.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), _._frustum.setFromProjectionMatrix(Uc, e.coordinateSystem, e.reversedDepth);
				}
				if (_.map.isWebGLCubeRenderTarget) e.setRenderTarget(_.map, t), e.clear();
				else {
					t === 0 && (e.setRenderTarget(_.map), e.clear());
					let n = _.getViewport(t);
					d.set(s.x * n.x, s.y * n.y, s.x * n.z, s.y * n.w), v.viewport(d);
				}
				a = _.getFrustum(t), D(n, f, r, m, w, this.type);
			}
			_.isPointLightShadow !== !0 && this.type === 3 && T(_, f), _.needsUpdate = !1;
		}
		w = this.type, C.needsUpdate = !1, e.setRenderTarget(p, m, _);
	};
	function T(n, r) {
		let i = t.update(S);
		v.defines.VSM_SAMPLES !== n.blurSamples && (v.defines.VSM_SAMPLES = n.blurSamples, b.defines.VSM_SAMPLES = n.blurSamples, v.needsUpdate = !0, b.needsUpdate = !0), n.mapPass === null ? n.mapPass = new $e(o.x, o.y, {
			format: y,
			type: u
		}) : (n.mapPass.width !== n.map.width || n.mapPass.height !== n.map.height) && n.mapPass.setSize(n.map.width, n.map.height), v.uniforms.shadow_pass.value = n.map.depthTexture, v.uniforms.resolution.value.set(n.map.width, n.map.height), v.uniforms.radius.value = n.radius, e.setRenderTarget(n.mapPass), e.clear(), e.renderBufferDirect(r, null, i, v, S, null), b.uniforms.shadow_pass.value = n.mapPass.texture, b.uniforms.resolution.value.set(n.map.width, n.map.height), b.uniforms.radius.value = n.radius, e.setRenderTarget(n.map), e.clear(), e.renderBufferDirect(r, null, i, b, S, null);
	}
	function E(t, n, r, i) {
		let a = null, o = r.isPointLight === !0 ? t.customDistanceMaterial : t.customDepthMaterial;
		if (o !== void 0) a = o;
		else if (a = r.isPointLight === !0 ? p : f, e.localClippingEnabled && n.clipShadows === !0 && Array.isArray(n.clippingPlanes) && n.clippingPlanes.length !== 0 || n.displacementMap && n.displacementScale !== 0 || n.alphaMap && n.alphaTest > 0 || n.map && n.alphaTest > 0 || n.alphaToCoverage === !0) {
			let e = a.uuid, t = n.uuid, r = m[e];
			r === void 0 && (r = {}, m[e] = r);
			let i = r[t];
			i === void 0 && (i = a.clone(), r[t] = i, n.addEventListener("dispose", O)), a = i;
		}
		if (a.visible = n.visible, a.wireframe = n.wireframe, i === 3 ? a.side = n.shadowSide === null ? n.side : n.shadowSide : a.side = n.shadowSide === null ? _[n.side] : n.shadowSide, a.alphaMap = n.alphaMap, a.alphaTest = n.alphaToCoverage === !0 ? .5 : n.alphaTest, a.map = n.map, a.clipShadows = n.clipShadows, a.clippingPlanes = n.clippingPlanes, a.clipIntersection = n.clipIntersection, a.displacementMap = n.displacementMap, a.displacementScale = n.displacementScale, a.displacementBias = n.displacementBias, a.wireframeLinewidth = n.wireframeLinewidth, a.linewidth = n.linewidth, r.isPointLight === !0 && a.isMeshDistanceMaterial === !0) {
			let t = e.properties.get(a);
			t.light = r;
		}
		return a;
	}
	function D(n, r, i, o, s, c) {
		if (n.visible === !1) return;
		if (n.layers.test(s) && (n.isMesh || n.isLine || n.isPoints) && (n.castShadow || n.receiveShadow && c === 3) && (!n.frustumCulled || n.intersectsFrustum(a))) {
			n.modelViewMatrix.multiplyMatrices(i.matrixWorldInverse, n.matrixWorld);
			let a = t.update(n), s = n.material;
			if (Array.isArray(s)) {
				let t = a.groups;
				for (let l = 0, u = t.length; l < u; l++) {
					let u = t[l], d = s[u.materialIndex];
					if (d && d.visible) {
						let t = E(n, d, o, c);
						n.onBeforeShadow(e, n, r, i, a, t, u), e.renderBufferDirect(i, null, a, t, n, u), n.onAfterShadow(e, n, r, i, a, t, u);
					}
				}
			} else if (s.visible) {
				let t = E(n, s, o, c);
				n.onBeforeShadow(e, n, r, i, a, t, null), e.renderBufferDirect(i, null, a, t, n, null), n.onAfterShadow(e, n, r, i, a, t, null);
			}
		}
		let l = n.children;
		for (let e = 0, t = l.length; e < t; e++) D(l[e], r, i, o, s, c);
	}
	function O(e) {
		e.target.removeEventListener("dispose", O);
		for (let t in m) {
			let n = m[t], r = e.target.uuid;
			r in n && (n[r].dispose(), delete n[r]);
		}
	}
}
function qc(e, t) {
	function n() {
		let t = !1, n = new Ze(), r = null, i = new Ze(0, 0, 0, 0);
		return {
			setMask: function(n) {
				r !== n && !t && (e.colorMask(n, n, n, n), r = n);
			},
			setLocked: function(e) {
				t = e;
			},
			setClear: function(t, r, a, o, s) {
				s === !0 && (t *= o, r *= o, a *= o), n.set(t, r, a, o), i.equals(n) === !1 && (e.clearColor(t, r, a, o), i.copy(n));
			},
			reset: function() {
				t = !1, r = null, i.set(-1, 0, 0, 0);
			}
		};
	}
	function r() {
		let n = !1, r = !1, i = null, a = null, o = null;
		return {
			setReversed: function(e) {
				if (r !== e) {
					let n = t.get("EXT_clip_control");
					e ? n.clipControlEXT(n.LOWER_LEFT_EXT, n.ZERO_TO_ONE_EXT) : n.clipControlEXT(n.LOWER_LEFT_EXT, n.NEGATIVE_ONE_TO_ONE_EXT), r = e;
					let i = o;
					o = null, this.setClear(i);
				}
			},
			getReversed: function() {
				return r;
			},
			setTest: function(t) {
				t ? L(e.DEPTH_TEST) : se(e.DEPTH_TEST);
			},
			setMask: function(t) {
				i !== t && !n && (e.depthMask(t), i = t);
			},
			setFunc: function(t) {
				if (r && (t = le[t]), a !== t) {
					switch (t) {
						case 0:
							e.depthFunc(e.NEVER);
							break;
						case 1:
							e.depthFunc(e.ALWAYS);
							break;
						case 2:
							e.depthFunc(e.LESS);
							break;
						case 3:
							e.depthFunc(e.LEQUAL);
							break;
						case 4:
							e.depthFunc(e.EQUAL);
							break;
						case 5:
							e.depthFunc(e.GEQUAL);
							break;
						case 6:
							e.depthFunc(e.GREATER);
							break;
						case 7:
							e.depthFunc(e.NOTEQUAL);
							break;
						default: e.depthFunc(e.LEQUAL);
					}
					a = t;
				}
			},
			setLocked: function(e) {
				n = e;
			},
			setClear: function(t) {
				o !== t && (o = t, r && (t = 1 - t), e.clearDepth(t));
			},
			reset: function() {
				n = !1, i = null, a = null, o = null, r = !1;
			}
		};
	}
	function i() {
		let t = !1, n = null, r = null, i = null, a = null, o = null, s = null, c = null, l = null;
		return {
			setTest: function(n) {
				t || (n ? L(e.STENCIL_TEST) : se(e.STENCIL_TEST));
			},
			setMask: function(r) {
				n !== r && !t && (e.stencilMask(r), n = r);
			},
			setFunc: function(t, n, o) {
				(r !== t || i !== n || a !== o) && (e.stencilFunc(t, n, o), r = t, i = n, a = o);
			},
			setOp: function(t, n, r) {
				(o !== t || s !== n || c !== r) && (e.stencilOp(t, n, r), o = t, s = n, c = r);
			},
			setLocked: function(e) {
				t = e;
			},
			setClear: function(t) {
				l !== t && (e.clearStencil(t), l = t);
			},
			reset: function() {
				t = !1, n = null, r = null, i = null, a = null, o = null, s = null, c = null, l = null;
			}
		};
	}
	let a = new n(), o = new r(), s = new i(), c = {}, l = /* @__PURE__ */ new WeakMap(), u = {}, d = {}, f = {}, p = /* @__PURE__ */ new WeakMap(), m = [], h = null, g = !1, _ = null, v = null, y = null, b = null, x = null, S = null, C = null, w = new J(0, 0, 0), T = 0, E = !1, D = null, O = null, k = null, A = null, ee = null, j = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS), M = !1, N = 0, te = e.getParameter(e.VERSION);
	te.indexOf("WebGL") === -1 ? te.indexOf("OpenGL ES") !== -1 && (N = parseFloat(/^OpenGL ES (\d)/.exec(te)[1]), M = N >= 2) : (N = parseFloat(/^WebGL (\d)/.exec(te)[1]), M = N >= 1);
	let ne = null, P = {}, F = e.getParameter(e.SCISSOR_BOX), re = e.getParameter(e.VIEWPORT), ie = new Ze().fromArray(F), I = new Ze().fromArray(re);
	function ae(t, n, r, i) {
		let a = /* @__PURE__ */ new Uint8Array(4), o = e.createTexture();
		e.bindTexture(t, o), e.texParameteri(t, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(t, e.TEXTURE_MAG_FILTER, e.NEAREST);
		for (let o = 0; o < r; o++) t === e.TEXTURE_3D || t === e.TEXTURE_2D_ARRAY ? e.texImage3D(n, 0, e.RGBA, 1, 1, i, 0, e.RGBA, e.UNSIGNED_BYTE, a) : e.texImage2D(n + o, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, a);
		return o;
	}
	let oe = {};
	oe[e.TEXTURE_2D] = ae(e.TEXTURE_2D, e.TEXTURE_2D, 1), oe[e.TEXTURE_CUBE_MAP] = ae(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6), oe[e.TEXTURE_2D_ARRAY] = ae(e.TEXTURE_2D_ARRAY, e.TEXTURE_2D_ARRAY, 1, 1), oe[e.TEXTURE_3D] = ae(e.TEXTURE_3D, e.TEXTURE_3D, 1, 1), a.setClear(0, 0, 0, 1), o.setClear(1), s.setClear(0), L(e.DEPTH_TEST), o.setFunc(3), H(!1), pe(1), L(e.CULL_FACE), fe(0);
	function L(t) {
		u[t] !== !0 && (e.enable(t), u[t] = !0);
	}
	function se(t) {
		u[t] !== !1 && (e.disable(t), u[t] = !1);
	}
	function ce(t, n) {
		return f[t] !== n && (e.bindFramebuffer(t, n), f[t] = n, t === e.DRAW_FRAMEBUFFER && (f[e.FRAMEBUFFER] = n), t === e.FRAMEBUFFER && (f[e.DRAW_FRAMEBUFFER] = n), !0);
	}
	function z(t, n) {
		let r = m, i = !1;
		if (t) {
			r = p.get(n), r === void 0 && (r = [], p.set(n, r));
			let a = t.textures;
			if (r.length !== a.length || r[0] !== e.COLOR_ATTACHMENT0) {
				for (let t = 0, n = a.length; t < n; t++) r[t] = e.COLOR_ATTACHMENT0 + t;
				r.length = a.length, i = !0;
			}
		} else r[0] !== e.BACK && (r[0] = e.BACK, i = !0);
		i && e.drawBuffers(r);
	}
	function ue(t) {
		return h !== t && (e.useProgram(t), h = t, !0);
	}
	let B = {
		100: e.FUNC_ADD,
		101: e.FUNC_SUBTRACT,
		102: e.FUNC_REVERSE_SUBTRACT
	};
	B[103] = e.MIN, B[104] = e.MAX;
	let de = {
		200: e.ZERO,
		201: e.ONE,
		202: e.SRC_COLOR,
		204: e.SRC_ALPHA,
		210: e.SRC_ALPHA_SATURATE,
		208: e.DST_COLOR,
		206: e.DST_ALPHA,
		203: e.ONE_MINUS_SRC_COLOR,
		205: e.ONE_MINUS_SRC_ALPHA,
		209: e.ONE_MINUS_DST_COLOR,
		207: e.ONE_MINUS_DST_ALPHA,
		211: e.CONSTANT_COLOR,
		212: e.ONE_MINUS_CONSTANT_COLOR,
		213: e.CONSTANT_ALPHA,
		214: e.ONE_MINUS_CONSTANT_ALPHA
	};
	function fe(t, n, r, i, a, o, s, c, l, u) {
		if (t === 0) g === !0 && (se(e.BLEND), g = !1);
		else if (g === !1 && (L(e.BLEND), g = !0), t !== 5) {
			if (t !== _ || u !== E) {
				if ((v !== 100 || x !== 100) && (e.blendEquation(e.FUNC_ADD), v = 100, x = 100), u) switch (t) {
					case 1:
						e.blendFuncSeparate(e.ONE, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
						break;
					case 2:
						e.blendFunc(e.ONE, e.ONE);
						break;
					case 3:
						e.blendFuncSeparate(e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ZERO, e.ONE);
						break;
					case 4:
						e.blendFuncSeparate(e.DST_COLOR, e.ONE_MINUS_SRC_ALPHA, e.ZERO, e.ONE);
						break;
					default: R("WebGLState: Invalid blending: ", t);
				}
				else switch (t) {
					case 1:
						e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
						break;
					case 2:
						e.blendFuncSeparate(e.SRC_ALPHA, e.ONE, e.ONE, e.ONE);
						break;
					case 3:
						R("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
						break;
					case 4:
						R("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
						break;
					default: R("WebGLState: Invalid blending: ", t);
				}
				y = null, b = null, S = null, C = null, w.set(0, 0, 0), T = 0, _ = t, E = u;
			}
		} else a ||= n, o ||= r, s ||= i, (n !== v || a !== x) && (e.blendEquationSeparate(B[n], B[a]), v = n, x = a), (r !== y || i !== b || o !== S || s !== C) && (e.blendFuncSeparate(de[r], de[i], de[o], de[s]), y = r, b = i, S = o, C = s), (c.equals(w) === !1 || l !== T) && (e.blendColor(c.r, c.g, c.b, l), w.copy(c), T = l), _ = t, E = !1;
	}
	function V(t, n) {
		t.side === 2 ? se(e.CULL_FACE) : L(e.CULL_FACE);
		let r = t.side === 1;
		n && (r = !r), H(r), t.blending === 1 && t.transparent === !1 ? fe(0) : fe(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha, t.blendColor, t.blendAlpha, t.premultipliedAlpha), o.setFunc(t.depthFunc), o.setTest(t.depthTest), o.setMask(t.depthWrite), a.setMask(t.colorWrite);
		let i = t.stencilWrite;
		s.setTest(i), i && (s.setMask(t.stencilWriteMask), s.setFunc(t.stencilFunc, t.stencilRef, t.stencilFuncMask), s.setOp(t.stencilFail, t.stencilZFail, t.stencilZPass)), he(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits), t.alphaToCoverage === !0 ? L(e.SAMPLE_ALPHA_TO_COVERAGE) : se(e.SAMPLE_ALPHA_TO_COVERAGE);
	}
	function H(t) {
		D !== t && (t ? e.frontFace(e.CW) : e.frontFace(e.CCW), D = t);
	}
	function pe(t) {
		t === 0 ? se(e.CULL_FACE) : (L(e.CULL_FACE), t !== O && (t === 1 ? e.cullFace(e.BACK) : t === 2 ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))), O = t;
	}
	function me(t) {
		t !== k && (M && e.lineWidth(t), k = t);
	}
	function he(t, n, r) {
		t ? (L(e.POLYGON_OFFSET_FILL), (A !== n || ee !== r) && (A = n, ee = r, o.getReversed() && (n = -n, r = -r), e.polygonOffset(n, r))) : se(e.POLYGON_OFFSET_FILL);
	}
	function ge(t) {
		t ? L(e.SCISSOR_TEST) : se(e.SCISSOR_TEST);
	}
	function _e(t) {
		t === void 0 && (t = e.TEXTURE0 + j - 1), ne !== t && (e.activeTexture(t), ne = t);
	}
	function ve(t, n, r) {
		r === void 0 && (r = ne === null ? e.TEXTURE0 + j - 1 : ne);
		let i = P[r];
		i === void 0 && (i = {
			type: void 0,
			texture: void 0
		}, P[r] = i), (i.type !== t || i.texture !== n) && (ne !== r && (e.activeTexture(r), ne = r), e.bindTexture(t, n || oe[t]), i.type = t, i.texture = n);
	}
	function ye() {
		let t = P[ne];
		t !== void 0 && t.type !== void 0 && (e.bindTexture(t.type, null), t.type = void 0, t.texture = void 0);
	}
	function be() {
		try {
			e.compressedTexImage2D(...arguments);
		} catch (e) {
			R("WebGLState:", e);
		}
	}
	function xe() {
		try {
			e.compressedTexImage3D(...arguments);
		} catch (e) {
			R("WebGLState:", e);
		}
	}
	function Se() {
		try {
			e.texSubImage2D(...arguments);
		} catch (e) {
			R("WebGLState:", e);
		}
	}
	function Ce() {
		try {
			e.texSubImage3D(...arguments);
		} catch (e) {
			R("WebGLState:", e);
		}
	}
	function we() {
		try {
			e.compressedTexSubImage2D(...arguments);
		} catch (e) {
			R("WebGLState:", e);
		}
	}
	function Te() {
		try {
			e.compressedTexSubImage3D(...arguments);
		} catch (e) {
			R("WebGLState:", e);
		}
	}
	function Ee() {
		try {
			e.texStorage2D(...arguments);
		} catch (e) {
			R("WebGLState:", e);
		}
	}
	function De() {
		try {
			e.texStorage3D(...arguments);
		} catch (e) {
			R("WebGLState:", e);
		}
	}
	function Oe() {
		try {
			e.texImage2D(...arguments);
		} catch (e) {
			R("WebGLState:", e);
		}
	}
	function ke() {
		try {
			e.texImage3D(...arguments);
		} catch (e) {
			R("WebGLState:", e);
		}
	}
	function Ae(t) {
		return d[t] === void 0 ? e.getParameter(t) : d[t];
	}
	function je(t, n) {
		d[t] !== n && (e.pixelStorei(t, n), d[t] = n);
	}
	function Me(t) {
		ie.equals(t) === !1 && (e.scissor(t.x, t.y, t.z, t.w), ie.copy(t));
	}
	function Ne(t) {
		I.equals(t) === !1 && (e.viewport(t.x, t.y, t.z, t.w), I.copy(t));
	}
	function U(t, n) {
		let r = l.get(n);
		r === void 0 && (r = /* @__PURE__ */ new WeakMap(), l.set(n, r));
		let i = r.get(t);
		i === void 0 && (i = e.getUniformBlockIndex(n, t.name), e.uniformBlockBinding(n, i, i), r.set(t, i));
	}
	function W(t, n, r) {
		let i = l.get(n).get(t);
		c[i] !== r && (e.bindBufferBase(e.UNIFORM_BUFFER, i, r), c[i] = r);
	}
	function Pe() {
		e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.POLYGON_OFFSET_FILL), e.disable(e.SCISSOR_TEST), e.disable(e.STENCIL_TEST), e.disable(e.SAMPLE_ALPHA_TO_COVERAGE), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO), e.blendColor(0, 0, 0, 0), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(e.LESS), o.setReversed(!1), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.clearStencil(0), e.cullFace(e.BACK), e.frontFace(e.CCW), e.polygonOffset(0, 0), e.activeTexture(e.TEXTURE0), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.bindFramebuffer(e.READ_FRAMEBUFFER, null), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), e.pixelStorei(e.PACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.BROWSER_DEFAULT_WEBGL), e.pixelStorei(e.PACK_ROW_LENGTH, 0), e.pixelStorei(e.PACK_SKIP_PIXELS, 0), e.pixelStorei(e.PACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_ROW_LENGTH, 0), e.pixelStorei(e.UNPACK_IMAGE_HEIGHT, 0), e.pixelStorei(e.UNPACK_SKIP_PIXELS, 0), e.pixelStorei(e.UNPACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_SKIP_IMAGES, 0), u = {}, d = {}, ne = null, P = {}, f = {}, c = {}, p = /* @__PURE__ */ new WeakMap(), m = [], h = null, g = !1, _ = null, v = null, y = null, b = null, x = null, S = null, C = null, w = new J(0, 0, 0), T = 0, E = !1, D = null, O = null, k = null, A = null, ee = null, ie.set(0, 0, e.canvas.width, e.canvas.height), I.set(0, 0, e.canvas.width, e.canvas.height), a.reset(), o.reset(), s.reset();
	}
	return {
		buffers: {
			color: a,
			depth: o,
			stencil: s
		},
		enable: L,
		disable: se,
		bindFramebuffer: ce,
		drawBuffers: z,
		useProgram: ue,
		setBlending: fe,
		setMaterial: V,
		setFlipSided: H,
		setCullFace: pe,
		setLineWidth: me,
		setPolygonOffset: he,
		setScissorTest: ge,
		activeTexture: _e,
		bindTexture: ve,
		unbindTexture: ye,
		compressedTexImage2D: be,
		compressedTexImage3D: xe,
		texImage2D: Oe,
		texImage3D: ke,
		pixelStorei: je,
		getParameter: Ae,
		updateUBOMapping: U,
		uniformBlockBinding: W,
		texStorage2D: Ee,
		texStorage3D: De,
		texSubImage2D: Se,
		texSubImage3D: Ce,
		compressedTexSubImage2D: we,
		compressedTexSubImage3D: Te,
		scissor: Me,
		viewport: Ne,
		reset: Pe
	};
}
function Jc(o, s, c, l, u, d, f) {
	let p = s.has("WEBGL_multisampled_render_to_texture") ? s.get("WEBGL_multisampled_render_to_texture") : null, m = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), h = new W(), _ = /* @__PURE__ */ new WeakMap(), v = /* @__PURE__ */ new Set(), y, b = /* @__PURE__ */ new WeakMap(), x = /* @__PURE__ */ new Set(), S = new FinalizationRegistry((e) => x.delete(e)), C = !1;
	try {
		C = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
	} catch {}
	function w(e, t) {
		return C ? new OffscreenCanvas(e, t) : re("canvas");
	}
	function T(e, t, n) {
		let r = 1, i = Pe(e);
		if ((i.width > n || i.height > n) && (r = n / Math.max(i.width, i.height)), r < 1) {
			if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof VideoFrame < "u" && e instanceof VideoFrame) {
				let n = Math.floor(r * i.width), a = Math.floor(r * i.height);
				y === void 0 && (y = w(n, a));
				let o = t ? w(n, a) : y;
				return o.width = n, o.height = a, o.getContext("2d").drawImage(e, 0, 0, n, a), L("WebGLRenderer: Texture has been resized from (" + i.width + "x" + i.height + ") to (" + n + "x" + a + ")."), o;
			}
			return "data" in e && L("WebGLRenderer: Image in DataTexture is too big (" + i.width + "x" + i.height + ")."), e;
		}
		return e;
	}
	function E(e) {
		return e.generateMipmaps;
	}
	function D(e) {
		o.generateMipmap(e);
	}
	function O(e) {
		return e.isWebGLCubeRenderTarget ? o.TEXTURE_CUBE_MAP : e.isWebGL3DRenderTarget ? o.TEXTURE_3D : e.isWebGLArrayRenderTarget || e.isCompressedArrayTexture ? o.TEXTURE_2D_ARRAY : o.TEXTURE_2D;
	}
	function k(e, t, n, r, i, a = !1) {
		if (e !== null) {
			if (o[e] !== void 0) return o[e];
			L("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + e + "'");
		}
		let c;
		r && (c = s.get("EXT_texture_norm16"), c || L("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
		let l = t;
		if (t === o.RED && (n === o.FLOAT && (l = o.R32F), n === o.HALF_FLOAT && (l = o.R16F), n === o.UNSIGNED_BYTE && (l = o.R8), n === o.UNSIGNED_SHORT && c && (l = c.R16_EXT), n === o.SHORT && c && (l = c.R16_SNORM_EXT)), t === o.RED_INTEGER && (n === o.UNSIGNED_BYTE && (l = o.R8UI), n === o.UNSIGNED_SHORT && (l = o.R16UI), n === o.UNSIGNED_INT && (l = o.R32UI), n === o.BYTE && (l = o.R8I), n === o.SHORT && (l = o.R16I), n === o.INT && (l = o.R32I)), t === o.RG && (n === o.FLOAT && (l = o.RG32F), n === o.HALF_FLOAT && (l = o.RG16F), n === o.UNSIGNED_BYTE && (l = o.RG8), n === o.UNSIGNED_SHORT && c && (l = c.RG16_EXT), n === o.SHORT && c && (l = c.RG16_SNORM_EXT)), t === o.RG_INTEGER && (n === o.UNSIGNED_BYTE && (l = o.RG8UI), n === o.UNSIGNED_SHORT && (l = o.RG16UI), n === o.UNSIGNED_INT && (l = o.RG32UI), n === o.BYTE && (l = o.RG8I), n === o.SHORT && (l = o.RG16I), n === o.INT && (l = o.RG32I)), t === o.RGB_INTEGER && (n === o.UNSIGNED_BYTE && (l = o.RGB8UI), n === o.UNSIGNED_SHORT && (l = o.RGB16UI), n === o.UNSIGNED_INT && (l = o.RGB32UI), n === o.BYTE && (l = o.RGB8I), n === o.SHORT && (l = o.RGB16I), n === o.INT && (l = o.RGB32I)), t === o.RGBA_INTEGER && (n === o.UNSIGNED_BYTE && (l = o.RGBA8UI), n === o.UNSIGNED_SHORT && (l = o.RGBA16UI), n === o.UNSIGNED_INT && (l = o.RGBA32UI), n === o.BYTE && (l = o.RGBA8I), n === o.SHORT && (l = o.RGBA16I), n === o.INT && (l = o.RGBA32I)), t === o.RGB && (n === o.UNSIGNED_SHORT && c && (l = c.RGB16_EXT), n === o.SHORT && c && (l = c.RGB16_SNORM_EXT), n === o.UNSIGNED_INT_5_9_9_9_REV && (l = o.RGB9_E5), n === o.UNSIGNED_INT_10F_11F_11F_REV && (l = o.R11F_G11F_B10F)), t === o.RGBA) {
			let e = a ? ee : Be.getTransfer(i);
			n === o.FLOAT && (l = o.RGBA32F), n === o.HALF_FLOAT && (l = o.RGBA16F), n === o.UNSIGNED_BYTE && (l = e === "srgb" ? o.SRGB8_ALPHA8 : o.RGBA8), n === o.UNSIGNED_SHORT && c && (l = c.RGBA16_EXT), n === o.SHORT && c && (l = c.RGBA16_SNORM_EXT), n === o.UNSIGNED_SHORT_4_4_4_4 && (l = o.RGBA4), n === o.UNSIGNED_SHORT_5_5_5_1 && (l = o.RGB5_A1);
		}
		return (l === o.R16F || l === o.R32F || l === o.RG16F || l === o.RG32F || l === o.RGBA16F || l === o.RGBA32F) && s.get("EXT_color_buffer_float"), l;
	}
	function A(e, t) {
		let n;
		return e ? t === null || t === 1014 || t === 1020 ? n = o.DEPTH24_STENCIL8 : t === 1015 ? n = o.DEPTH32F_STENCIL8 : t === 1012 && (n = o.DEPTH24_STENCIL8, L("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : t === null || t === 1014 || t === 1020 ? n = o.DEPTH_COMPONENT24 : t === 1015 ? n = o.DEPTH_COMPONENT32F : t === 1012 && (n = o.DEPTH_COMPONENT16), n;
	}
	function j(e, t) {
		return E(e) === !0 || e.isFramebufferTexture && e.minFilter !== 1003 && e.minFilter !== 1006 ? Math.log2(Math.max(t.width, t.height)) + 1 : e.mipmaps.length > 0 ? e.mipmaps.length : e.isCompressedTexture && Array.isArray(e.image) ? t.mipmaps.length : 1;
	}
	function M(e) {
		let t = new WeakRef(e);
		l.get(e).__ref = t, x.add(t), S.register(e, t, t);
	}
	function N(e) {
		let t = l.get(e).__ref;
		t !== void 0 && (x.delete(t), S.unregister(t));
	}
	function te(e) {
		P(e.target);
	}
	function ne(e) {
		F(e.target);
	}
	function P(e) {
		e.removeEventListener("dispose", te), N(e), I(e), e.isVideoTexture && _.delete(e), e.isHTMLTexture && v.delete(e);
	}
	function F(e) {
		e.removeEventListener("dispose", ne), N(e), oe(e);
	}
	function ie() {
		for (let e of x) {
			let t = e.deref();
			t !== void 0 && (t.isRenderTarget === !0 ? F(t) : P(t));
		}
		x.clear(), v.clear();
	}
	function I(e) {
		let t = l.get(e);
		if (t.__webglInit === void 0) return;
		let n = e.source, r = b.get(n);
		if (r) {
			let i = r[t.__cacheKey];
			i.usedTimes--, i.usedTimes === 0 && ae(e), Object.keys(r).length === 0 && b.delete(n);
		}
		l.remove(e);
	}
	function ae(e) {
		let t = l.get(e);
		o.deleteTexture(t.__webglTexture);
		let n = e.source, r = b.get(n);
		delete r[t.__cacheKey], f.memory.textures--;
	}
	function oe(e) {
		let t = l.get(e);
		t.__depthDisposeCallback && t.__depthDisposeCallback();
		let n = e.depthTexture;
		if (n && n.renderTarget === e && P(n), e.isWebGLCubeRenderTarget) for (let e = 0; e < 6; e++) {
			if (Array.isArray(t.__webglFramebuffer[e])) for (let n = 0; n < t.__webglFramebuffer[e].length; n++) o.deleteFramebuffer(t.__webglFramebuffer[e][n]);
			else o.deleteFramebuffer(t.__webglFramebuffer[e]);
			t.__webglDepthbuffer && o.deleteRenderbuffer(t.__webglDepthbuffer[e]);
		}
		else {
			if (Array.isArray(t.__webglFramebuffer)) for (let e = 0; e < t.__webglFramebuffer.length; e++) o.deleteFramebuffer(t.__webglFramebuffer[e]);
			else o.deleteFramebuffer(t.__webglFramebuffer);
			if (t.__webglDepthbuffer && o.deleteRenderbuffer(t.__webglDepthbuffer), t.__webglMultisampledFramebuffer && o.deleteFramebuffer(t.__webglMultisampledFramebuffer), t.__webglColorRenderbuffer) for (let e = 0; e < t.__webglColorRenderbuffer.length; e++) t.__webglColorRenderbuffer[e] && o.deleteRenderbuffer(t.__webglColorRenderbuffer[e]);
			t.__webglDepthRenderbuffer && o.deleteRenderbuffer(t.__webglDepthRenderbuffer);
		}
		let r = e.textures;
		for (let e = 0, t = r.length; e < t; e++) {
			let t = l.get(r[e]);
			t.__webglTexture && (o.deleteTexture(t.__webglTexture), f.memory.textures--), l.remove(r[e]);
		}
		l.remove(e);
	}
	let se = 0;
	function ce() {
		se = 0;
	}
	function le() {
		return se;
	}
	function z(e) {
		se = e;
	}
	function ue() {
		let e = se;
		return e >= u.maxTextures && L("WebGLTextures: Trying to use " + (e + 1) + " texture units while this GPU supports only " + u.maxTextures), se += 1, e;
	}
	function B(e) {
		let t = [];
		return t.push(e.wrapS), t.push(e.wrapT), t.push(e.wrapR || 0), t.push(e.magFilter), t.push(e.minFilter), t.push(e.anisotropy), t.push(e.internalFormat), t.push(e.format), t.push(e.type), t.push(e.generateMipmaps), t.push(e.mipmapsAutoUpdate), t.push(e.premultiplyAlpha), t.push(e.flipY), t.push(e.unpackAlignment), t.push(e.colorSpace), t.join();
	}
	function de(e, t) {
		let n = l.get(e);
		if (e.isVideoTexture && Ne(e), e.isRenderTargetTexture === !1 && e.isExternalTexture !== !0 && e.version > 0 && n.__version !== e.version) {
			let r = e.image;
			if (r === null) L("WebGLRenderer: Texture marked for update but no image data found.");
			else if (r.complete === !1) L("WebGLRenderer: Texture marked for update but image is incomplete");
			else {
				be(n, e, t);
				return;
			}
		} else e.isExternalTexture && (n.__webglTexture = e.sourceTexture ? e.sourceTexture : null);
		c.bindTexture(o.TEXTURE_2D, n.__webglTexture, o.TEXTURE0 + t);
	}
	function fe(e, t) {
		let n = l.get(e);
		e.isRenderTargetTexture === !1 && e.version > 0 && n.__version !== e.version ? be(n, e, t) : (e.isExternalTexture && (n.__webglTexture = e.sourceTexture ? e.sourceTexture : null), c.bindTexture(o.TEXTURE_2D_ARRAY, n.__webglTexture, o.TEXTURE0 + t));
	}
	function V(e, t) {
		let n = l.get(e);
		e.isRenderTargetTexture === !1 && e.version > 0 && n.__version !== e.version ? be(n, e, t) : c.bindTexture(o.TEXTURE_3D, n.__webglTexture, o.TEXTURE0 + t);
	}
	function H(e, t) {
		let n = l.get(e);
		e.version > 0 && n.__version !== e.version ? xe(n, e, t) : c.bindTexture(o.TEXTURE_CUBE_MAP, n.__webglTexture, o.TEXTURE0 + t);
	}
	let pe = {
		[e]: o.REPEAT,
		[t]: o.CLAMP_TO_EDGE,
		[n]: o.MIRRORED_REPEAT
	}, me = {
		[r]: o.NEAREST,
		1004: o.NEAREST_MIPMAP_NEAREST,
		1005: o.NEAREST_MIPMAP_LINEAR,
		[i]: o.LINEAR,
		1007: o.LINEAR_MIPMAP_NEAREST,
		[a]: o.LINEAR_MIPMAP_LINEAR
	}, he = {
		512: o.NEVER,
		519: o.ALWAYS,
		513: o.LESS,
		515: o.LEQUAL,
		514: o.EQUAL,
		518: o.GEQUAL,
		516: o.GREATER,
		517: o.NOTEQUAL
	};
	function ge(e, t) {
		if (t.type === 1015 && s.has("OES_texture_float_linear") === !1 && (t.magFilter === 1006 || t.magFilter === 1007 || t.magFilter === 1005 || t.magFilter === 1008 || t.minFilter === 1006 || t.minFilter === 1007 || t.minFilter === 1005 || t.minFilter === 1008) && L("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), o.texParameteri(e, o.TEXTURE_WRAP_S, pe[t.wrapS]), o.texParameteri(e, o.TEXTURE_WRAP_T, pe[t.wrapT]), (e === o.TEXTURE_3D || e === o.TEXTURE_2D_ARRAY) && o.texParameteri(e, o.TEXTURE_WRAP_R, pe[t.wrapR]), o.texParameteri(e, o.TEXTURE_MAG_FILTER, me[t.magFilter]), o.texParameteri(e, o.TEXTURE_MIN_FILTER, me[t.minFilter]), t.compareFunction && (o.texParameteri(e, o.TEXTURE_COMPARE_MODE, o.COMPARE_REF_TO_TEXTURE), o.texParameteri(e, o.TEXTURE_COMPARE_FUNC, he[t.compareFunction])), s.has("EXT_texture_filter_anisotropic") === !0) {
			if (t.magFilter === 1003 || t.minFilter !== 1005 && t.minFilter !== 1008 || t.type === 1015 && s.has("OES_texture_float_linear") === !1) return;
			if (t.anisotropy > 1 || l.get(t).__currentAnisotropy) {
				let n = s.get("EXT_texture_filter_anisotropic");
				o.texParameterf(e, n.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(t.anisotropy, u.getMaxAnisotropy())), l.get(t).__currentAnisotropy = t.anisotropy;
			}
		}
	}
	function _e(e, t) {
		let n = !1;
		e.__webglInit === void 0 && (e.__webglInit = !0, t.addEventListener("dispose", te), M(t));
		let r = t.source, i = b.get(r);
		i === void 0 && (i = {}, b.set(r, i));
		let a = B(t);
		if (a !== e.__cacheKey) {
			i[a] === void 0 && (i[a] = {
				texture: o.createTexture(),
				usedTimes: 0
			}, f.memory.textures++, n = !0), i[a].usedTimes++;
			let r = i[e.__cacheKey];
			r !== void 0 && (i[e.__cacheKey].usedTimes--, r.usedTimes === 0 && ae(t)), e.__cacheKey = a, e.__webglTexture = i[a].texture;
		}
		return n;
	}
	function ve(e, t, n) {
		return Math.floor(Math.floor(e / n) / t);
	}
	function ye(e, t, n, r) {
		let i = e.updateRanges;
		if (i.length === 0) c.texSubImage2D(o.TEXTURE_2D, 0, 0, 0, t.width, t.height, n, r, t.data);
		else {
			i.sort((e, t) => e.start - t.start);
			let a = 0;
			for (let e = 1; e < i.length; e++) {
				let n = i[a], r = i[e], o = n.start + n.count, s = ve(r.start, t.width, 4), c = ve(n.start, t.width, 4);
				r.start <= o + 1 && s === c && ve(r.start + r.count - 1, t.width, 4) === s ? n.count = Math.max(n.count, r.start + r.count - n.start) : (++a, i[a] = r);
			}
			i.length = a + 1;
			let s = c.getParameter(o.UNPACK_ROW_LENGTH), l = c.getParameter(o.UNPACK_SKIP_PIXELS), u = c.getParameter(o.UNPACK_SKIP_ROWS);
			c.pixelStorei(o.UNPACK_ROW_LENGTH, t.width);
			for (let e = 0, a = i.length; e < a; e++) {
				let a = i[e], s = Math.floor(a.start / 4), l = Math.ceil(a.count / 4), u = s % t.width, d = Math.floor(s / t.width), f = l;
				c.pixelStorei(o.UNPACK_SKIP_PIXELS, u), c.pixelStorei(o.UNPACK_SKIP_ROWS, d), c.texSubImage2D(o.TEXTURE_2D, 0, u, d, f, 1, n, r, t.data);
			}
			e.clearUpdateRanges(), c.pixelStorei(o.UNPACK_ROW_LENGTH, s), c.pixelStorei(o.UNPACK_SKIP_PIXELS, l), c.pixelStorei(o.UNPACK_SKIP_ROWS, u);
		}
	}
	function be(e, t, n) {
		let r = o.TEXTURE_2D;
		(t.isDataArrayTexture || t.isCompressedArrayTexture) && (r = o.TEXTURE_2D_ARRAY), t.isData3DTexture && (r = o.TEXTURE_3D);
		let i = _e(e, t), a = t.source;
		c.bindTexture(r, e.__webglTexture, o.TEXTURE0 + n);
		let s = l.get(a);
		if (a.version !== s.__version || i === !0) {
			if (c.activeTexture(o.TEXTURE0 + n), !(typeof ImageBitmap < "u" && t.image instanceof ImageBitmap)) {
				let e = Be.getPrimaries(Be.workingColorSpace), n = t.colorSpace === "" ? null : Be.getPrimaries(t.colorSpace), r = t.colorSpace === "" || e === n ? o.NONE : o.BROWSER_DEFAULT_WEBGL;
				c.pixelStorei(o.UNPACK_FLIP_Y_WEBGL, t.flipY), c.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultiplyAlpha), c.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL, r);
			}
			c.pixelStorei(o.UNPACK_ALIGNMENT, t.unpackAlignment);
			let e = T(t.image, !1, u.maxTextureSize);
			e = U(t, e);
			let l = d.convert(t.format, t.colorSpace), f = d.convert(t.type), p = k(t.internalFormat, l, f, t.normalized, t.colorSpace, t.isVideoTexture);
			ge(r, t);
			let m, h = t.mipmaps, _ = t.isVideoTexture !== !0, y = s.__version === void 0 || i === !0, b = a.dataReady, x = j(t, e);
			if (t.isDepthTexture) p = A(t.format === g, t.type), y && (_ ? c.texStorage2D(o.TEXTURE_2D, 1, p, e.width, e.height) : c.texImage2D(o.TEXTURE_2D, 0, p, e.width, e.height, 0, l, f, null));
			else if (t.isDataTexture) {
				if (h.length > 0) {
					_ && y && c.texStorage2D(o.TEXTURE_2D, x, p, h[0].width, h[0].height);
					for (let e = 0, t = h.length; e < t; e++) m = h[e], _ ? b && c.texSubImage2D(o.TEXTURE_2D, e, 0, 0, m.width, m.height, l, f, m.data) : c.texImage2D(o.TEXTURE_2D, e, p, m.width, m.height, 0, l, f, m.data);
					t.generateMipmaps = !1;
				} else _ ? (y && c.texStorage2D(o.TEXTURE_2D, x, p, e.width, e.height), b && ye(t, e, l, f)) : c.texImage2D(o.TEXTURE_2D, 0, p, e.width, e.height, 0, l, f, e.data);
			} else if (t.isCompressedTexture) {
				if (t.isCompressedArrayTexture) {
					_ && y && c.texStorage3D(o.TEXTURE_2D_ARRAY, x, p, h[0].width, h[0].height, e.depth);
					for (let n = 0, r = h.length; n < r; n++) if (m = h[n], t.format !== 1023) {
						if (l !== null) {
							if (_) {
								if (b) {
									if (t.layerUpdates.size > 0) {
										let e = Ja(m.width, m.height, t.format, t.type);
										for (let r of t.layerUpdates) {
											let t = m.data.subarray(r * e / m.data.BYTES_PER_ELEMENT, (r + 1) * e / m.data.BYTES_PER_ELEMENT);
											c.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY, n, 0, 0, r, m.width, m.height, 1, l, t);
										}
									} else c.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY, n, 0, 0, 0, m.width, m.height, e.depth, l, m.data);
								}
							} else c.compressedTexImage3D(o.TEXTURE_2D_ARRAY, n, p, m.width, m.height, e.depth, 0, m.data, 0, 0);
						} else L("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
					} else _ ? b && c.texSubImage3D(o.TEXTURE_2D_ARRAY, n, 0, 0, 0, m.width, m.height, e.depth, l, f, m.data) : c.texImage3D(o.TEXTURE_2D_ARRAY, n, p, m.width, m.height, e.depth, 0, l, f, m.data);
					t.layerUpdates.size > 0 && t.clearLayerUpdates();
				} else {
					_ && y && c.texStorage2D(o.TEXTURE_2D, x, p, h[0].width, h[0].height);
					for (let e = 0, n = h.length; e < n; e++) m = h[e], t.format === 1023 ? _ ? b && c.texSubImage2D(o.TEXTURE_2D, e, 0, 0, m.width, m.height, l, f, m.data) : c.texImage2D(o.TEXTURE_2D, e, p, m.width, m.height, 0, l, f, m.data) : l === null ? L("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : _ ? b && c.compressedTexSubImage2D(o.TEXTURE_2D, e, 0, 0, m.width, m.height, l, m.data) : c.compressedTexImage2D(o.TEXTURE_2D, e, p, m.width, m.height, 0, m.data);
				}
			} else if (t.isDataArrayTexture) {
				if (_) {
					if (y && c.texStorage3D(o.TEXTURE_2D_ARRAY, x, p, e.width, e.height, e.depth), b) {
						if (t.layerUpdates.size > 0) {
							let n = Ja(e.width, e.height, t.format, t.type);
							for (let r of t.layerUpdates) {
								let t = e.data.subarray(r * n / e.data.BYTES_PER_ELEMENT, (r + 1) * n / e.data.BYTES_PER_ELEMENT);
								c.texSubImage3D(o.TEXTURE_2D_ARRAY, 0, 0, 0, r, e.width, e.height, 1, l, f, t);
							}
							t.clearLayerUpdates();
						} else c.texSubImage3D(o.TEXTURE_2D_ARRAY, 0, 0, 0, 0, e.width, e.height, e.depth, l, f, e.data);
					}
				} else c.texImage3D(o.TEXTURE_2D_ARRAY, 0, p, e.width, e.height, e.depth, 0, l, f, e.data);
			} else if (t.isData3DTexture) _ ? (y && c.texStorage3D(o.TEXTURE_3D, x, p, e.width, e.height, e.depth), b && c.texSubImage3D(o.TEXTURE_3D, 0, 0, 0, 0, e.width, e.height, e.depth, l, f, e.data)) : c.texImage3D(o.TEXTURE_3D, 0, p, e.width, e.height, e.depth, 0, l, f, e.data);
			else if (t.isFramebufferTexture) {
				if (y) {
					if (_) c.texStorage2D(o.TEXTURE_2D, x, p, e.width, e.height);
					else {
						let t = e.width, n = e.height;
						for (let e = 0; e < x; e++) c.texImage2D(o.TEXTURE_2D, e, p, t, n, 0, l, f, null), t >>= 1, n >>= 1;
					}
				}
			} else if (t.isHTMLTexture) {
				if ("texElementImage2D" in o) {
					let n = o.canvas;
					if (n.hasAttribute("layoutsubtree") || n.setAttribute("layoutsubtree", "true"), e.parentNode !== n) {
						n.appendChild(e), v.add(t), n.onpaint = (e) => {
							let t = e.changedElements;
							for (let e of v) t.includes(e.image) && (e.needsUpdate = !0);
						}, n.requestPaint();
						return;
					}
					if (o.texElementImage2D.length === 3) o.texElementImage2D(o.TEXTURE_2D, o.RGBA8, e);
					else {
						let t = o.RGBA, n = o.RGBA, r = o.UNSIGNED_BYTE;
						o.texElementImage2D(o.TEXTURE_2D, 0, t, n, r, e);
					}
					o.texParameteri(o.TEXTURE_2D, o.TEXTURE_MIN_FILTER, o.LINEAR), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_S, o.CLAMP_TO_EDGE), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_T, o.CLAMP_TO_EDGE);
				}
			} else if (h.length > 0) {
				if (_ && y) {
					let e = Pe(h[0]);
					c.texStorage2D(o.TEXTURE_2D, x, p, e.width, e.height);
				}
				for (let e = 0, t = h.length; e < t; e++) m = h[e], _ ? b && c.texSubImage2D(o.TEXTURE_2D, e, 0, 0, l, f, m) : c.texImage2D(o.TEXTURE_2D, e, p, l, f, m);
				t.generateMipmaps = !1;
			} else if (_) {
				if (y) {
					let t = Pe(e);
					c.texStorage2D(o.TEXTURE_2D, x, p, t.width, t.height);
				}
				b && c.texSubImage2D(o.TEXTURE_2D, 0, 0, 0, l, f, e);
			} else c.texImage2D(o.TEXTURE_2D, 0, p, l, f, e);
			E(t) && t.mipmapsAutoUpdate === !0 && D(r), s.__version = a.version, t.onUpdate && t.onUpdate(t);
		}
		e.__version = t.version;
	}
	function xe(e, t, n) {
		if (t.image.length !== 6) return;
		let r = _e(e, t), i = t.source;
		c.bindTexture(o.TEXTURE_CUBE_MAP, e.__webglTexture, o.TEXTURE0 + n);
		let a = l.get(i);
		if (i.version !== a.__version || r === !0) {
			c.activeTexture(o.TEXTURE0 + n);
			let e = Be.getPrimaries(Be.workingColorSpace), s = t.colorSpace === "" ? null : Be.getPrimaries(t.colorSpace), l = t.colorSpace === "" || e === s ? o.NONE : o.BROWSER_DEFAULT_WEBGL;
			c.pixelStorei(o.UNPACK_FLIP_Y_WEBGL, t.flipY), c.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultiplyAlpha), c.pixelStorei(o.UNPACK_ALIGNMENT, t.unpackAlignment), c.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL, l);
			let f = t.isCompressedTexture || t.image[0].isCompressedTexture, p = t.image[0] && t.image[0].isDataTexture, m = [];
			for (let e = 0; e < 6; e++) !f && !p ? m[e] = T(t.image[e], !0, u.maxCubemapSize) : m[e] = p ? t.image[e].image : t.image[e], m[e] = U(t, m[e]);
			let h = m[0], _ = d.convert(t.format, t.colorSpace), v = d.convert(t.type), y = k(t.internalFormat, _, v, t.normalized, t.colorSpace), b = t.isVideoTexture !== !0, x = a.__version === void 0 || r === !0, S = i.dataReady, C = j(t, h);
			ge(o.TEXTURE_CUBE_MAP, t);
			let w;
			if (t.isDepthTexture) {
				if (y = A(t.format === g, t.type), x) {
					if (b) c.texStorage2D(o.TEXTURE_CUBE_MAP, 1, y, h.width, h.height);
					else for (let e = 0; e < 6; e++) c.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, 0, y, h.width, h.height, 0, _, v, null);
				}
			} else if (f) {
				b && x && c.texStorage2D(o.TEXTURE_CUBE_MAP, C, y, h.width, h.height);
				for (let e = 0; e < 6; e++) {
					w = m[e].mipmaps;
					for (let n = 0; n < w.length; n++) {
						let r = w[n];
						t.format === 1023 ? b ? S && c.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, n, 0, 0, r.width, r.height, _, v, r.data) : c.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, n, y, r.width, r.height, 0, _, v, r.data) : _ === null ? L("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : b ? S && c.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, n, 0, 0, r.width, r.height, _, r.data) : c.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, n, y, r.width, r.height, 0, r.data);
					}
				}
			} else {
				if (w = t.mipmaps, b && x) {
					w.length > 0 && C++;
					let e = Pe(m[0]);
					c.texStorage2D(o.TEXTURE_CUBE_MAP, C, y, e.width, e.height);
				}
				for (let e = 0; e < 6; e++) if (p) {
					b ? S && c.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, 0, 0, 0, m[e].width, m[e].height, _, v, m[e].data) : c.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, 0, y, m[e].width, m[e].height, 0, _, v, m[e].data);
					for (let t = 0; t < w.length; t++) {
						let n = w[t].image[e].image;
						b ? S && c.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, t + 1, 0, 0, n.width, n.height, _, v, n.data) : c.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, t + 1, y, n.width, n.height, 0, _, v, n.data);
					}
				} else {
					b ? S && c.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, 0, 0, 0, _, v, m[e]) : c.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, 0, y, _, v, m[e]);
					for (let t = 0; t < w.length; t++) {
						let n = w[t];
						b ? S && c.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, t + 1, 0, 0, _, v, n.image[e]) : c.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, t + 1, y, _, v, n.image[e]);
					}
				}
			}
			E(t) && t.mipmapsAutoUpdate === !0 && D(o.TEXTURE_CUBE_MAP), a.__version = i.version, t.onUpdate && t.onUpdate(t);
		}
		e.__version = t.version;
	}
	function Se(e, t, n, r, i, a) {
		let s = d.convert(n.format, n.colorSpace), u = d.convert(n.type), f = k(n.internalFormat, s, u, n.normalized, n.colorSpace), m = l.get(t), h = l.get(n);
		if (h.__renderTarget = t, !m.__hasExternalTextures) {
			let e = Math.max(1, t.width >> a), n = Math.max(1, t.height >> a);
			i === o.TEXTURE_3D || i === o.TEXTURE_2D_ARRAY ? c.texImage3D(i, a, f, e, n, t.depth, 0, s, u, null) : c.texImage2D(i, a, f, e, n, 0, s, u, null);
		}
		c.bindFramebuffer(o.FRAMEBUFFER, e), Me(t) ? p.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER, r, i, h.__webglTexture, 0, je(t)) : (i === o.TEXTURE_2D || i >= o.TEXTURE_CUBE_MAP_POSITIVE_X && i <= o.TEXTURE_CUBE_MAP_NEGATIVE_Z) && o.framebufferTexture2D(o.FRAMEBUFFER, r, i, h.__webglTexture, a), c.bindFramebuffer(o.FRAMEBUFFER, null);
	}
	function Ce(e, t, n) {
		if (o.bindRenderbuffer(o.RENDERBUFFER, e), t.depthBuffer) {
			let r = t.depthTexture, i = r && r.isDepthTexture ? r.type : null, a = A(t.stencilBuffer, i), s = t.stencilBuffer ? o.DEPTH_STENCIL_ATTACHMENT : o.DEPTH_ATTACHMENT;
			Me(t) ? p.renderbufferStorageMultisampleEXT(o.RENDERBUFFER, je(t), a, t.width, t.height) : n ? o.renderbufferStorageMultisample(o.RENDERBUFFER, je(t), a, t.width, t.height) : o.renderbufferStorage(o.RENDERBUFFER, a, t.width, t.height), o.framebufferRenderbuffer(o.FRAMEBUFFER, s, o.RENDERBUFFER, e);
		} else {
			let e = t.textures;
			for (let r = 0; r < e.length; r++) {
				let i = e[r], a = d.convert(i.format, i.colorSpace), s = d.convert(i.type), c = k(i.internalFormat, a, s, i.normalized, i.colorSpace);
				Me(t) ? p.renderbufferStorageMultisampleEXT(o.RENDERBUFFER, je(t), c, t.width, t.height) : n ? o.renderbufferStorageMultisample(o.RENDERBUFFER, je(t), c, t.width, t.height) : o.renderbufferStorage(o.RENDERBUFFER, c, t.width, t.height);
			}
		}
		o.bindRenderbuffer(o.RENDERBUFFER, null);
	}
	function we(e, t, n) {
		let r = t.isWebGLCubeRenderTarget === !0;
		if (c.bindFramebuffer(o.FRAMEBUFFER, e), !(t.depthTexture && t.depthTexture.isDepthTexture)) throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");
		let i = l.get(t.depthTexture);
		i.__renderTarget = t;
		let a = r ? t.depthTexture.image[0] : t.depthTexture.image;
		i.__webglTexture && a.width === t.width && a.height === t.height || (a.width = t.width, a.height = t.height, t.depthTexture.needsUpdate = !0), r ? H(t.depthTexture, 0) : de(t.depthTexture, 0);
		let s = i.__webglTexture, u = je(t), d = r ? o.TEXTURE_CUBE_MAP_POSITIVE_X + n : o.TEXTURE_2D, f = t.depthTexture.format === 1027 ? o.DEPTH_STENCIL_ATTACHMENT : o.DEPTH_ATTACHMENT;
		if (t.depthTexture.format === 1026) Me(t) ? p.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER, f, d, s, 0, u) : o.framebufferTexture2D(o.FRAMEBUFFER, f, d, s, 0);
		else if (t.depthTexture.format === 1027) Me(t) ? p.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER, f, d, s, 0, u) : o.framebufferTexture2D(o.FRAMEBUFFER, f, d, s, 0);
		else throw Error("THREE.WebGLTextures: Unknown depthTexture format.");
	}
	function Te(e) {
		let t = l.get(e), n = e.isWebGLCubeRenderTarget === !0;
		if (t.__boundDepthTexture !== e.depthTexture) {
			let n = e.depthTexture;
			if (t.__depthDisposeCallback && t.__depthDisposeCallback(), n) {
				let e = () => {
					delete t.__boundDepthTexture, delete t.__depthDisposeCallback, n.removeEventListener("dispose", e);
				};
				n.addEventListener("dispose", e), t.__depthDisposeCallback = e;
			}
			t.__boundDepthTexture = n;
		}
		if (e.depthTexture && !t.__autoAllocateDepthBuffer) {
			if (n) for (let n = 0; n < 6; n++) we(t.__webglFramebuffer[n], e, n);
			else e.texture.mipmaps.length > 0 ? we(t.__webglFramebuffer[0], e, 0) : we(t.__webglFramebuffer, e, 0);
		} else if (n) {
			t.__webglDepthbuffer = [];
			for (let n = 0; n < 6; n++) if (c.bindFramebuffer(o.FRAMEBUFFER, t.__webglFramebuffer[n]), t.__webglDepthbuffer[n] === void 0) t.__webglDepthbuffer[n] = o.createRenderbuffer(), Ce(t.__webglDepthbuffer[n], e, !1);
			else {
				let r = e.stencilBuffer ? o.DEPTH_STENCIL_ATTACHMENT : o.DEPTH_ATTACHMENT, i = t.__webglDepthbuffer[n];
				o.bindRenderbuffer(o.RENDERBUFFER, i), o.framebufferRenderbuffer(o.FRAMEBUFFER, r, o.RENDERBUFFER, i);
			}
		} else if (e.texture.mipmaps.length > 0 ? c.bindFramebuffer(o.FRAMEBUFFER, t.__webglFramebuffer[0]) : c.bindFramebuffer(o.FRAMEBUFFER, t.__webglFramebuffer), t.__webglDepthbuffer === void 0) t.__webglDepthbuffer = o.createRenderbuffer(), Ce(t.__webglDepthbuffer, e, !1);
		else {
			let n = e.stencilBuffer ? o.DEPTH_STENCIL_ATTACHMENT : o.DEPTH_ATTACHMENT, r = t.__webglDepthbuffer;
			o.bindRenderbuffer(o.RENDERBUFFER, r), o.framebufferRenderbuffer(o.FRAMEBUFFER, n, o.RENDERBUFFER, r);
		}
		c.bindFramebuffer(o.FRAMEBUFFER, null);
	}
	function Ee(e, t, n) {
		let r = l.get(e);
		t !== void 0 && Se(r.__webglFramebuffer, e, e.texture, o.COLOR_ATTACHMENT0, o.TEXTURE_2D, 0), n !== void 0 && Te(e);
	}
	function De(e) {
		let t = e.texture, n = l.get(e), r = l.get(t);
		e.addEventListener("dispose", ne), M(e);
		let i = e.textures, a = e.isWebGLCubeRenderTarget === !0, s = i.length > 1;
		if (s || (r.__webglTexture === void 0 && (r.__webglTexture = o.createTexture()), r.__version = t.version, f.memory.textures++), a) {
			n.__webglFramebuffer = [];
			for (let e = 0; e < 6; e++) if (t.mipmaps.length > 0) {
				n.__webglFramebuffer[e] = [];
				for (let r = 0; r < t.mipmaps.length; r++) n.__webglFramebuffer[e][r] = o.createFramebuffer();
			} else n.__webglFramebuffer[e] = o.createFramebuffer();
		} else {
			if (t.mipmaps.length > 0) {
				n.__webglFramebuffer = [];
				for (let e = 0; e < t.mipmaps.length; e++) n.__webglFramebuffer[e] = o.createFramebuffer();
			} else n.__webglFramebuffer = o.createFramebuffer();
			if (s) for (let e = 0, t = i.length; e < t; e++) {
				let t = l.get(i[e]);
				t.__webglTexture === void 0 && (t.__webglTexture = o.createTexture(), f.memory.textures++);
			}
			if (e.samples > 0 && Me(e) === !1) {
				n.__webglMultisampledFramebuffer = o.createFramebuffer(), n.__webglColorRenderbuffer = [], c.bindFramebuffer(o.FRAMEBUFFER, n.__webglMultisampledFramebuffer);
				for (let t = 0; t < i.length; t++) {
					let r = i[t];
					n.__webglColorRenderbuffer[t] = o.createRenderbuffer(), o.bindRenderbuffer(o.RENDERBUFFER, n.__webglColorRenderbuffer[t]);
					let a = d.convert(r.format, r.colorSpace), s = d.convert(r.type), c = k(r.internalFormat, a, s, r.normalized, r.colorSpace, e.isXRRenderTarget === !0), l = je(e);
					o.renderbufferStorageMultisample(o.RENDERBUFFER, l, c, e.width, e.height), o.framebufferRenderbuffer(o.FRAMEBUFFER, o.COLOR_ATTACHMENT0 + t, o.RENDERBUFFER, n.__webglColorRenderbuffer[t]);
				}
				o.bindRenderbuffer(o.RENDERBUFFER, null), e.depthBuffer && (n.__webglDepthRenderbuffer = o.createRenderbuffer(), Ce(n.__webglDepthRenderbuffer, e, !0)), c.bindFramebuffer(o.FRAMEBUFFER, null);
			}
		}
		if (a) {
			c.bindTexture(o.TEXTURE_CUBE_MAP, r.__webglTexture), ge(o.TEXTURE_CUBE_MAP, t);
			for (let r = 0; r < 6; r++) if (t.mipmaps.length > 0) for (let i = 0; i < t.mipmaps.length; i++) Se(n.__webglFramebuffer[r][i], e, t, o.COLOR_ATTACHMENT0, o.TEXTURE_CUBE_MAP_POSITIVE_X + r, i);
			else Se(n.__webglFramebuffer[r], e, t, o.COLOR_ATTACHMENT0, o.TEXTURE_CUBE_MAP_POSITIVE_X + r, 0);
			E(t) ? D(o.TEXTURE_CUBE_MAP) : t.mipmaps.length > 0 && o.texParameteri(o.TEXTURE_CUBE_MAP, o.TEXTURE_MAX_LEVEL, t.mipmaps.length - 1), c.unbindTexture();
		} else if (s) {
			for (let t = 0, r = i.length; t < r; t++) {
				let r = i[t], a = l.get(r), s = o.TEXTURE_2D;
				(e.isWebGL3DRenderTarget || e.isWebGLArrayRenderTarget) && (s = e.isWebGL3DRenderTarget ? o.TEXTURE_3D : o.TEXTURE_2D_ARRAY), c.bindTexture(s, a.__webglTexture), ge(s, r), Se(n.__webglFramebuffer, e, r, o.COLOR_ATTACHMENT0 + t, s, 0), E(r) && D(s);
			}
			c.unbindTexture();
		} else {
			let i = o.TEXTURE_2D;
			if ((e.isWebGL3DRenderTarget || e.isWebGLArrayRenderTarget) && (i = e.isWebGL3DRenderTarget ? o.TEXTURE_3D : o.TEXTURE_2D_ARRAY), c.bindTexture(i, r.__webglTexture), ge(i, t), t.mipmaps.length > 0) for (let r = 0; r < t.mipmaps.length; r++) Se(n.__webglFramebuffer[r], e, t, o.COLOR_ATTACHMENT0, i, r);
			else Se(n.__webglFramebuffer, e, t, o.COLOR_ATTACHMENT0, i, 0);
			E(t) ? D(i) : t.mipmaps.length > 0 && o.texParameteri(i, o.TEXTURE_MAX_LEVEL, t.mipmaps.length - 1), c.unbindTexture();
		}
		e.depthBuffer && Te(e);
	}
	function Oe(e) {
		let t = e.textures;
		for (let n = 0, r = t.length; n < r; n++) {
			let r = t[n];
			if (E(r) && r.mipmapsAutoUpdate === !0) {
				let t = O(e), n = l.get(r).__webglTexture;
				c.bindTexture(t, n), D(t), c.unbindTexture();
			}
		}
	}
	let ke = [];
	function Ae(e) {
		if (e.samples > 0) {
			if (Me(e) === !1) {
				let t = e.textures, n = e.width, r = e.height, i = o.COLOR_BUFFER_BIT, a = e.stencilBuffer ? o.DEPTH_STENCIL_ATTACHMENT : o.DEPTH_ATTACHMENT, s = l.get(e), u = t.length > 1;
				if (u) for (let e = 0; e < t.length; e++) c.bindFramebuffer(o.FRAMEBUFFER, s.__webglMultisampledFramebuffer), o.framebufferRenderbuffer(o.FRAMEBUFFER, o.COLOR_ATTACHMENT0 + e, o.RENDERBUFFER, null), c.bindFramebuffer(o.FRAMEBUFFER, s.__webglFramebuffer), o.framebufferTexture2D(o.DRAW_FRAMEBUFFER, o.COLOR_ATTACHMENT0 + e, o.TEXTURE_2D, null, 0);
				c.bindFramebuffer(o.READ_FRAMEBUFFER, s.__webglMultisampledFramebuffer), e.texture.mipmaps.length > 0 ? c.bindFramebuffer(o.DRAW_FRAMEBUFFER, s.__webglFramebuffer[0]) : c.bindFramebuffer(o.DRAW_FRAMEBUFFER, s.__webglFramebuffer);
				for (let c = 0; c < t.length; c++) {
					if (e.resolveDepthBuffer && (e.depthBuffer && (i |= o.DEPTH_BUFFER_BIT), e.stencilBuffer && e.resolveStencilBuffer && (i |= o.STENCIL_BUFFER_BIT)), u) {
						o.framebufferRenderbuffer(o.READ_FRAMEBUFFER, o.COLOR_ATTACHMENT0, o.RENDERBUFFER, s.__webglColorRenderbuffer[c]);
						let e = l.get(t[c]).__webglTexture;
						o.framebufferTexture2D(o.DRAW_FRAMEBUFFER, o.COLOR_ATTACHMENT0, o.TEXTURE_2D, e, 0);
					}
					o.blitFramebuffer(0, 0, n, r, 0, 0, n, r, i, o.NEAREST), m === !0 && (ke.length = 0, ke.push(o.COLOR_ATTACHMENT0 + c), e.depthBuffer && e.storeMultisampledDepthBuffer === !1 && ke.push(a), o.invalidateFramebuffer(o.READ_FRAMEBUFFER, ke));
				}
				if (c.bindFramebuffer(o.READ_FRAMEBUFFER, null), c.bindFramebuffer(o.DRAW_FRAMEBUFFER, null), u) for (let e = 0; e < t.length; e++) {
					c.bindFramebuffer(o.FRAMEBUFFER, s.__webglMultisampledFramebuffer), o.framebufferRenderbuffer(o.FRAMEBUFFER, o.COLOR_ATTACHMENT0 + e, o.RENDERBUFFER, s.__webglColorRenderbuffer[e]);
					let n = l.get(t[e]).__webglTexture;
					c.bindFramebuffer(o.FRAMEBUFFER, s.__webglFramebuffer), o.framebufferTexture2D(o.DRAW_FRAMEBUFFER, o.COLOR_ATTACHMENT0 + e, o.TEXTURE_2D, n, 0);
				}
				c.bindFramebuffer(o.DRAW_FRAMEBUFFER, s.__webglMultisampledFramebuffer);
			} else if (e.depthBuffer && e.storeMultisampledDepthBuffer === !1 && m) {
				let t = e.stencilBuffer ? o.DEPTH_STENCIL_ATTACHMENT : o.DEPTH_ATTACHMENT;
				o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER, [t]);
			}
		}
	}
	function je(e) {
		return Math.min(u.maxSamples, e.samples);
	}
	function Me(e) {
		let t = l.get(e);
		return e.samples > 0 && s.has("WEBGL_multisampled_render_to_texture") === !0 && t.__useRenderToTexture !== !1;
	}
	function Ne(e) {
		let t = f.render.frame;
		_.get(e) !== t && (_.set(e, t), e.update());
	}
	function U(e, t) {
		let n = e.colorSpace, r = e.format, i = e.type;
		return e.isCompressedTexture === !0 || e.isVideoTexture === !0 || n !== "srgb-linear" && n !== "" && (Be.getTransfer(n) === "srgb" ? (r !== 1023 || i !== 1009) && L("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : R("WebGLTextures: Unsupported texture color space:", n)), t;
	}
	function Pe(e) {
		return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement ? (h.width = e.naturalWidth || e.width, h.height = e.naturalHeight || e.height) : typeof VideoFrame < "u" && e instanceof VideoFrame ? (h.width = e.displayWidth, h.height = e.displayHeight) : (h.width = e.width, h.height = e.height), h;
	}
	this.allocateTextureUnit = ue, this.resetTextureUnits = ce, this.getTextureUnits = le, this.setTextureUnits = z, this.setTexture2D = de, this.setTexture2DArray = fe, this.setTexture3D = V, this.setTextureCube = H, this.rebindTextures = Ee, this.setupRenderTarget = De, this.updateRenderTargetMipmap = Oe, this.updateMultisampleRenderTarget = Ae, this.setupDepthRenderbuffer = Te, this.setupFrameBufferTexture = Se, this.useMultisampledRTT = Me, this.dispose = ie;
}
function Yc(e, t) {
	function n(n, r = "") {
		let i, a = Be.getTransfer(r);
		if (n === 1009) return e.UNSIGNED_BYTE;
		if (n === 1017) return e.UNSIGNED_SHORT_4_4_4_4;
		if (n === 1018) return e.UNSIGNED_SHORT_5_5_5_1;
		if (n === 35902) return e.UNSIGNED_INT_5_9_9_9_REV;
		if (n === 35899) return e.UNSIGNED_INT_10F_11F_11F_REV;
		if (n === 1010) return e.BYTE;
		if (n === 1011) return e.SHORT;
		if (n === 1012) return e.UNSIGNED_SHORT;
		if (n === 1013) return e.INT;
		if (n === 1014) return e.UNSIGNED_INT;
		if (n === 1015) return e.FLOAT;
		if (n === 1016) return e.HALF_FLOAT;
		if (n === 1021) return e.ALPHA;
		if (n === 1022) return e.RGB;
		if (n === 1023) return e.RGBA;
		if (n === 1026) return e.DEPTH_COMPONENT;
		if (n === 1027) return e.DEPTH_STENCIL;
		if (n === 1028) return e.RED;
		if (n === 1029) return e.RED_INTEGER;
		if (n === 1030) return e.RG;
		if (n === 1031) return e.RG_INTEGER;
		if (n === 1033) return e.RGBA_INTEGER;
		if (n === 33776 || n === 33777 || n === 33778 || n === 33779) {
			if (a === "srgb") {
				if (i = t.get("WEBGL_compressed_texture_s3tc_srgb"), i !== null) {
					if (n === 33776) return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;
					if (n === 33777) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
					if (n === 33778) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
					if (n === 33779) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
				} else return null;
			} else if (i = t.get("WEBGL_compressed_texture_s3tc"), i !== null) {
				if (n === 33776) return i.COMPRESSED_RGB_S3TC_DXT1_EXT;
				if (n === 33777) return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;
				if (n === 33778) return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;
				if (n === 33779) return i.COMPRESSED_RGBA_S3TC_DXT5_EXT;
			} else return null;
		}
		if (n === 35840 || n === 35841 || n === 35842 || n === 35843) {
			if (i = t.get("WEBGL_compressed_texture_pvrtc"), i !== null) {
				if (n === 35840) return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
				if (n === 35841) return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
				if (n === 35842) return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
				if (n === 35843) return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
			} else return null;
		}
		if (n === 36196 || n === 37492 || n === 37496 || n === 37488 || n === 37489 || n === 37490 || n === 37491) {
			if (i = t.get("WEBGL_compressed_texture_etc"), i !== null) {
				if (n === 36196 || n === 37492) return a === "srgb" ? i.COMPRESSED_SRGB8_ETC2 : i.COMPRESSED_RGB8_ETC2;
				if (n === 37496) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : i.COMPRESSED_RGBA8_ETC2_EAC;
				if (n === 37488) return i.COMPRESSED_R11_EAC;
				if (n === 37489) return i.COMPRESSED_SIGNED_R11_EAC;
				if (n === 37490) return i.COMPRESSED_RG11_EAC;
				if (n === 37491) return i.COMPRESSED_SIGNED_RG11_EAC;
			} else return null;
		}
		if (n === 37808 || n === 37809 || n === 37810 || n === 37811 || n === 37812 || n === 37813 || n === 37814 || n === 37815 || n === 37816 || n === 37817 || n === 37818 || n === 37819 || n === 37820 || n === 37821) {
			if (i = t.get("WEBGL_compressed_texture_astc"), i !== null) {
				if (n === 37808) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : i.COMPRESSED_RGBA_ASTC_4x4_KHR;
				if (n === 37809) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : i.COMPRESSED_RGBA_ASTC_5x4_KHR;
				if (n === 37810) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : i.COMPRESSED_RGBA_ASTC_5x5_KHR;
				if (n === 37811) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : i.COMPRESSED_RGBA_ASTC_6x5_KHR;
				if (n === 37812) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : i.COMPRESSED_RGBA_ASTC_6x6_KHR;
				if (n === 37813) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : i.COMPRESSED_RGBA_ASTC_8x5_KHR;
				if (n === 37814) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : i.COMPRESSED_RGBA_ASTC_8x6_KHR;
				if (n === 37815) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : i.COMPRESSED_RGBA_ASTC_8x8_KHR;
				if (n === 37816) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : i.COMPRESSED_RGBA_ASTC_10x5_KHR;
				if (n === 37817) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : i.COMPRESSED_RGBA_ASTC_10x6_KHR;
				if (n === 37818) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : i.COMPRESSED_RGBA_ASTC_10x8_KHR;
				if (n === 37819) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : i.COMPRESSED_RGBA_ASTC_10x10_KHR;
				if (n === 37820) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : i.COMPRESSED_RGBA_ASTC_12x10_KHR;
				if (n === 37821) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : i.COMPRESSED_RGBA_ASTC_12x12_KHR;
			} else return null;
		}
		if (n === 36492 || n === 36494 || n === 36495) {
			if (i = t.get("EXT_texture_compression_bptc"), i !== null) {
				if (n === 36492) return a === "srgb" ? i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : i.COMPRESSED_RGBA_BPTC_UNORM_EXT;
				if (n === 36494) return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
				if (n === 36495) return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
			} else return null;
		}
		if (n === 36283 || n === 36284 || n === 36285 || n === 36286) {
			if (i = t.get("EXT_texture_compression_rgtc"), i !== null) {
				if (n === 36283) return i.COMPRESSED_RED_RGTC1_EXT;
				if (n === 36284) return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;
				if (n === 36285) return i.COMPRESSED_RED_GREEN_RGTC2_EXT;
				if (n === 36286) return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
			} else return null;
		}
		return n === 1020 ? e.UNSIGNED_INT_24_8 : e[n] === void 0 ? null : e[n];
	}
	return { convert: n };
}
var Xc = "\nvoid main() {\n\n	gl_Position = vec4( position, 1.0 );\n\n}", Zc = "\nuniform sampler2DArray depthColor;\nuniform float depthWidth;\nuniform float depthHeight;\n\nvoid main() {\n\n	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );\n\n	if ( coord.x >= 1.0 ) {\n\n		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;\n\n	} else {\n\n		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;\n\n	}\n\n}", Qc = class {
	constructor() {
		this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
	}
	init(e, t) {
		if (this.texture === null) {
			let n = new fi(e.texture);
			(e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = n;
		}
	}
	getMesh(e) {
		if (this.texture !== null && this.mesh === null) {
			let t = e.cameras[0].viewport, n = new Ii({
				vertexShader: Xc,
				fragmentShader: Zc,
				uniforms: {
					depthColor: { value: this.texture },
					depthWidth: { value: t.z },
					depthHeight: { value: t.w }
				}
			});
			this.mesh = new Y(new wi(20, 20), n);
		}
		return this.mesh;
	}
	reset() {
		this.texture = null, this.mesh = null;
	}
	getDepthTexture() {
		return this.texture;
	}
}, $c = class extends z {
	constructor(e, t) {
		super();
		let n = this, r = null, i = 1, a = null, s = "local-floor", l = 1, u = null, d = null, f = null, _ = null, v = null, y = null, b = typeof XRWebGLBinding < "u", x = new Qc(), S = {}, C = t.getContextAttributes(), w = null, T = null, E = [], D = [], O = new W(), k = null, A = null, ee = new Sa();
		ee.viewport = new Ze();
		let j = new Sa();
		j.viewport = new Ze();
		let M = [ee, j], N = new Na(), te = null, ne = null;
		this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(e) {
			let t = E[e];
			return t === void 0 && (t = new Mt(), E[e] = t), t.getTargetRaySpace();
		}, this.getControllerGrip = function(e) {
			let t = E[e];
			return t === void 0 && (t = new Mt(), E[e] = t), t.getGripSpace();
		}, this.getHand = function(e) {
			let t = E[e];
			return t === void 0 && (t = new Mt(), E[e] = t), t.getHandSpace();
		};
		function P(e) {
			let t = D.indexOf(e.inputSource);
			if (t === -1) return;
			let n = E[t];
			n !== void 0 && (n.update(e.inputSource, e.frame, u || a), n.dispatchEvent({
				type: e.type,
				data: e.inputSource
			}));
		}
		function F() {
			r.removeEventListener("select", P), r.removeEventListener("selectstart", P), r.removeEventListener("selectend", P), r.removeEventListener("squeeze", P), r.removeEventListener("squeezestart", P), r.removeEventListener("squeezeend", P), r.removeEventListener("end", F), r.removeEventListener("inputsourceschange", re);
			for (let e = 0; e < E.length; e++) {
				let t = D[e];
				t !== null && (D[e] = null, E[e].disconnect(t));
			}
			te = null, ne = null, x.reset();
			for (let e in S) delete S[e];
			if (e.setRenderTarget(w), v = null, _ = null, f = null, r = null, T = null, R.stop(), n.isPresenting = !1, e.setPixelRatio(k), e.setSize(O.width, O.height, !1), A !== null) {
				let e = A.camera;
				e.fov = A.fov, e.zoom = A.zoom, e.updateProjectionMatrix(), A = null;
			}
			n.dispatchEvent({ type: "sessionend" });
		}
		this.setFramebufferScaleFactor = function(e) {
			i = e, n.isPresenting === !0 && L("WebXRManager: Cannot change framebuffer scale while presenting.");
		}, this.setReferenceSpaceType = function(e) {
			s = e, n.isPresenting === !0 && L("WebXRManager: Cannot change reference space type while presenting.");
		}, this.getReferenceSpace = function() {
			return u || a;
		}, this.setReferenceSpace = function(e) {
			u = e;
		}, this.getBaseLayer = function() {
			return _ === null ? v : _;
		}, this.getBinding = function() {
			return f === null && b && (f = new XRWebGLBinding(r, t)), f;
		}, this.getFrame = function() {
			return y;
		}, this.getSession = function() {
			return r;
		}, this.setSession = async function(d) {
			if (r = d, r !== null) {
				if (w = e.getRenderTarget(), r.addEventListener("select", P), r.addEventListener("selectstart", P), r.addEventListener("selectend", P), r.addEventListener("squeeze", P), r.addEventListener("squeezestart", P), r.addEventListener("squeezeend", P), r.addEventListener("end", F), r.addEventListener("inputsourceschange", re), C.xrCompatible !== !0 && await t.makeXRCompatible(), k = e.getPixelRatio(), e.getSize(O), b && "createProjectionLayer" in XRWebGLBinding.prototype) {
					let n = null, a = null, s = null;
					C.depth && (s = C.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, n = C.stencil ? g : h, a = C.stencil ? p : c);
					let l = {
						colorFormat: t.RGBA8,
						depthFormat: s,
						scaleFactor: i
					};
					f = this.getBinding(), _ = f.createProjectionLayer(l), r.updateRenderState({ layers: [_] }), e.setPixelRatio(1), e.setSize(_.textureWidth, _.textureHeight, !1), T = new $e(_.textureWidth, _.textureHeight, {
						format: m,
						type: o,
						depthTexture: new ui(_.textureWidth, _.textureHeight, a, void 0, void 0, void 0, void 0, void 0, void 0, n),
						stencilBuffer: C.stencil,
						colorSpace: e.outputColorSpace,
						samples: C.antialias ? 4 : 0,
						resolveDepthBuffer: _.ignoreDepthValues === !1,
						resolveStencilBuffer: _.ignoreDepthValues === !1,
						storeMultisampledDepthBuffer: _.ignoreDepthValues === !1,
						storeMultisampledStencilBuffer: _.ignoreDepthValues === !1
					});
				} else {
					let n = {
						antialias: C.antialias,
						alpha: !0,
						depth: C.depth,
						stencil: C.stencil,
						framebufferScaleFactor: i
					};
					v = new XRWebGLLayer(r, t, n), r.updateRenderState({ baseLayer: v }), e.setPixelRatio(1), e.setSize(v.framebufferWidth, v.framebufferHeight, !1), T = new $e(v.framebufferWidth, v.framebufferHeight, {
						format: m,
						type: o,
						colorSpace: e.outputColorSpace,
						stencilBuffer: C.stencil,
						resolveDepthBuffer: v.ignoreDepthValues === !1,
						resolveStencilBuffer: v.ignoreDepthValues === !1,
						storeMultisampledDepthBuffer: v.ignoreDepthValues === !1,
						storeMultisampledStencilBuffer: v.ignoreDepthValues === !1
					});
				}
				T.isXRRenderTarget = !0, this.setFoveation(l), u = null, a = await r.requestReferenceSpace(s), R.setContext(r), R.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
			}
		}, this.getEnvironmentBlendMode = function() {
			if (r !== null) return r.environmentBlendMode;
		}, this.getDepthTexture = function() {
			return x.getDepthTexture();
		};
		function re(e) {
			for (let t = 0; t < e.removed.length; t++) {
				let n = e.removed[t], r = D.indexOf(n);
				r >= 0 && (D[r] = null, E[r].disconnect(n));
			}
			for (let t = 0; t < e.added.length; t++) {
				let n = e.added[t], r = D.indexOf(n);
				if (r === -1) {
					for (let e = 0; e < E.length; e++) if (e >= D.length) {
						D.push(n), r = e;
						break;
					} else if (D[e] === null) {
						D[e] = n, r = e;
						break;
					}
					if (r === -1) break;
				}
				let i = E[r];
				i && i.connect(n);
			}
		}
		function ie(e, t) {
			t === null ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix), e.matrixWorldInverse.copy(e.matrixWorld).invert();
		}
		this.updateCamera = function(e) {
			if (r === null) return;
			let t = e.near, n = e.far;
			x.texture !== null && (x.depthNear > 0 && (t = x.depthNear), x.depthFar > 0 && (n = x.depthFar)), N.near = j.near = ee.near = t, N.far = j.far = ee.far = n, (te !== N.near || ne !== N.far) && (r.updateRenderState({
				depthNear: N.near,
				depthFar: N.far
			}), te = N.near, ne = N.far), N.layers.mask = e.layers.mask | 6, ee.layers.mask = N.layers.mask & -5, j.layers.mask = N.layers.mask & -3;
			let i = e.parent, a = N.cameras;
			ie(N, i);
			for (let e = 0; e < a.length; e++) ie(a[e], i);
			N.projectionMatrix.copy(ee.projectionMatrix), N.projectionMatrixInverse.copy(ee.projectionMatrixInverse), A === null && e.isPerspectiveCamera && (A = {
				camera: e,
				fov: e.fov,
				zoom: e.zoom
			}), I(e, N, i);
		};
		function I(e, t, n) {
			n === null ? e.matrix.copy(t.matrixWorld) : (e.matrix.copy(n.matrixWorld), e.matrix.invert(), e.matrix.multiply(t.matrixWorld)), e.matrix.decompose(e.position, e.quaternion, e.scale), e.updateMatrixWorld(!0), e.projectionMatrix.copy(t.projectionMatrix), e.projectionMatrixInverse.copy(t.projectionMatrixInverse), e.isPerspectiveCamera && (e.fov = fe * 2 * Math.atan(1 / e.projectionMatrix.elements[5]), e.zoom = 1);
		}
		this.getCamera = function() {
			return N;
		}, this.getFoveation = function() {
			if (_ !== null || v !== null) return l;
		}, this.setFoveation = function(e) {
			l = e, _ !== null && (_.fixedFoveation = e), v !== null && v.fixedFoveation !== void 0 && (v.fixedFoveation = e);
		}, this.hasDepthSensing = function() {
			return x.texture !== null;
		}, this.getDepthSensingMesh = function() {
			return x.getMesh(N);
		}, this.getCameraTexture = function(e) {
			return S[e];
		};
		let ae = null;
		function oe(t, i) {
			if (d = i.getViewerPose(u || a), y = i, d !== null) {
				let t = d.views;
				v !== null && (e.setRenderTargetFramebuffer(T, v.framebuffer), e.setRenderTarget(T));
				let i = !1;
				t.length !== N.cameras.length && (N.cameras.length = 0, i = !0);
				for (let n = 0; n < t.length; n++) {
					let r = t[n], a = null;
					if (v !== null) a = v.getViewport(r);
					else {
						let t = f.getViewSubImage(_, r);
						a = t.viewport, n === 0 && (e.setRenderTargetTextures(T, t.colorTexture, t.depthStencilTexture), e.setRenderTarget(T));
					}
					let o = M[n];
					o === void 0 && (o = new Sa(), o.layers.enable(n), o.viewport = new Ze(), M[n] = o), o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.quaternion, o.scale), o.projectionMatrix.fromArray(r.projectionMatrix), o.projectionMatrixInverse.copy(o.projectionMatrix).invert(), o.viewport.set(a.x, a.y, a.width, a.height), n === 0 && (N.matrix.copy(o.matrix), N.matrix.decompose(N.position, N.quaternion, N.scale)), i === !0 && N.cameras.push(o);
				}
				let a = r.enabledFeatures;
				if (a && a.includes("depth-sensing") && r.depthUsage == "gpu-optimized" && b) {
					f = n.getBinding();
					let e = f.getDepthInformation(t[0]);
					e && e.isValid && e.texture && x.init(e, r.renderState);
				}
				if (a && a.includes("camera-access") && b) {
					e.state.unbindTexture(), f = n.getBinding();
					for (let e = 0; e < t.length; e++) {
						let n = t[e].camera;
						if (n) {
							let e = S[n];
							e || (e = new fi(), S[n] = e);
							let t = f.getCameraImage(n);
							e.sourceTexture = t;
						}
					}
				}
			}
			for (let e = 0; e < E.length; e++) {
				let t = D[e], n = E[e];
				t !== null && n !== void 0 && n.update(t, i, u || a);
			}
			ae && ae(t, i), i.detectedPlanes && n.dispatchEvent({
				type: "planesdetected",
				data: i
			}), y = null;
		}
		let R = new Xa();
		R.setAnimationLoop(oe), this.setAnimationLoop = function(e) {
			ae = e;
		}, this.dispose = function() {};
	}
}, el = /*@__PURE__*/ new nt(), tl = /*@__PURE__*/ new q();
tl.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function nl(e, t) {
	function n(e, t) {
		e.matrixAutoUpdate === !0 && e.updateMatrix(), t.value.copy(e.matrix);
	}
	function r(t, n) {
		n.color.getRGB(t.fogColor.value, Mi(e)), n.isFog ? (t.fogNear.value = n.near, t.fogFar.value = n.far) : n.isFogExp2 && (t.fogDensity.value = n.density);
	}
	function i(e, t, n, r, i) {
		t.isNodeMaterial ? t.uniformsNeedUpdate = !1 : t.isMeshBasicMaterial ? a(e, t) : t.isMeshLambertMaterial ? (a(e, t), t.envMap && (e.envMapIntensity.value = t.envMapIntensity)) : t.isMeshToonMaterial ? (a(e, t), d(e, t)) : t.isMeshPhongMaterial ? (a(e, t), u(e, t), t.envMap && (e.envMapIntensity.value = t.envMapIntensity)) : t.isMeshStandardMaterial ? (a(e, t), f(e, t), t.isMeshPhysicalMaterial && p(e, t, i)) : t.isMeshMatcapMaterial ? (a(e, t), m(e, t)) : t.isMeshDepthMaterial ? a(e, t) : t.isMeshDistanceMaterial ? (a(e, t), h(e, t)) : t.isMeshNormalMaterial ? a(e, t) : t.isLineBasicMaterial ? (o(e, t), t.isLineDashedMaterial && s(e, t)) : t.isPointsMaterial ? c(e, t, n, r) : t.isSpriteMaterial ? l(e, t) : t.isShadowMaterial ? (e.color.value.copy(t.color), e.opacity.value = t.opacity) : t.isShaderMaterial && (t.uniformsNeedUpdate = !1);
	}
	function a(e, r) {
		e.opacity.value = r.opacity, r.color && e.diffuse.value.copy(r.color), r.emissive && e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity), r.map && (e.map.value = r.map, n(r.map, e.mapTransform)), r.alphaMap && (e.alphaMap.value = r.alphaMap, n(r.alphaMap, e.alphaMapTransform)), r.bumpMap && (e.bumpMap.value = r.bumpMap, n(r.bumpMap, e.bumpMapTransform), e.bumpScale.value = r.bumpScale, r.side === 1 && (e.bumpScale.value *= -1)), r.normalMap && (e.normalMap.value = r.normalMap, n(r.normalMap, e.normalMapTransform), e.normalScale.value.copy(r.normalScale), r.side === 1 && e.normalScale.value.negate()), r.displacementMap && (e.displacementMap.value = r.displacementMap, n(r.displacementMap, e.displacementMapTransform), e.displacementScale.value = r.displacementScale, e.displacementBias.value = r.displacementBias), r.emissiveMap && (e.emissiveMap.value = r.emissiveMap, n(r.emissiveMap, e.emissiveMapTransform)), r.specularMap && (e.specularMap.value = r.specularMap, n(r.specularMap, e.specularMapTransform)), r.alphaTest > 0 && (e.alphaTest.value = r.alphaTest);
		let i = t.get(r), a = i.envMap, o = i.envMapRotation;
		a && (e.envMap.value = a, e.envMapRotation.value.setFromMatrix4(el.makeRotationFromEuler(o)).transpose(), a.isCubeTexture && a.isRenderTargetTexture === !1 && e.envMapRotation.value.premultiply(tl), e.reflectivity.value = r.reflectivity, e.ior.value = r.ior, e.refractionRatio.value = r.refractionRatio), r.lightMap && (e.lightMap.value = r.lightMap, e.lightMapIntensity.value = r.lightMapIntensity, n(r.lightMap, e.lightMapTransform)), r.aoMap && (e.aoMap.value = r.aoMap, e.aoMapIntensity.value = r.aoMapIntensity, n(r.aoMap, e.aoMapTransform));
	}
	function o(e, t) {
		e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, t.map && (e.map.value = t.map, n(t.map, e.mapTransform));
	}
	function s(e, t) {
		e.dashSize.value = t.dashSize, e.totalSize.value = t.dashSize + t.gapSize, e.scale.value = t.scale;
	}
	function c(e, t, r, i) {
		e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.size.value = t.size * r, e.scale.value = i * .5, t.map && (e.map.value = t.map, n(t.map, e.uvTransform)), t.alphaMap && (e.alphaMap.value = t.alphaMap, n(t.alphaMap, e.alphaMapTransform)), t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
	}
	function l(e, t) {
		e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.rotation.value = t.rotation, t.map && (e.map.value = t.map, n(t.map, e.mapTransform)), t.alphaMap && (e.alphaMap.value = t.alphaMap, n(t.alphaMap, e.alphaMapTransform)), t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
	}
	function u(e, t) {
		e.specular.value.copy(t.specular), e.shininess.value = Math.max(t.shininess, 1e-4);
	}
	function d(e, t) {
		t.gradientMap && (e.gradientMap.value = t.gradientMap);
	}
	function f(e, t) {
		e.metalness.value = t.metalness, t.metalnessMap && (e.metalnessMap.value = t.metalnessMap, n(t.metalnessMap, e.metalnessMapTransform)), e.roughness.value = t.roughness, t.roughnessMap && (e.roughnessMap.value = t.roughnessMap, n(t.roughnessMap, e.roughnessMapTransform)), t.envMap && (e.envMapIntensity.value = t.envMapIntensity);
	}
	function p(e, t, r) {
		e.ior.value = t.ior, t.diffuseRoughness > 0 && (e.diffuseRoughness.value = t.diffuseRoughness, t.diffuseRoughnessMap && (e.diffuseRoughnessMap.value = t.diffuseRoughnessMap, n(t.diffuseRoughnessMap, e.diffuseRoughnessMapTransform))), t.sheen > 0 && (e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen), e.sheenRoughness.value = t.sheenRoughness, t.sheenColorMap && (e.sheenColorMap.value = t.sheenColorMap, n(t.sheenColorMap, e.sheenColorMapTransform)), t.sheenRoughnessMap && (e.sheenRoughnessMap.value = t.sheenRoughnessMap, n(t.sheenRoughnessMap, e.sheenRoughnessMapTransform))), t.clearcoat > 0 && (e.clearcoat.value = t.clearcoat, e.clearcoatRoughness.value = t.clearcoatRoughness, t.clearcoatMap && (e.clearcoatMap.value = t.clearcoatMap, n(t.clearcoatMap, e.clearcoatMapTransform)), t.clearcoatRoughnessMap && (e.clearcoatRoughnessMap.value = t.clearcoatRoughnessMap, n(t.clearcoatRoughnessMap, e.clearcoatRoughnessMapTransform)), t.clearcoatNormalMap && (e.clearcoatNormalMap.value = t.clearcoatNormalMap, n(t.clearcoatNormalMap, e.clearcoatNormalMapTransform), e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale), t.side === 1 && e.clearcoatNormalScale.value.negate())), t.dispersion > 0 && (e.dispersion.value = t.dispersion), t.retroreflectivity > 0 && (e.retroreflectivity.value = t.retroreflectivity), t.iridescence > 0 && (e.iridescence.value = t.iridescence, e.iridescenceIOR.value = t.iridescenceIOR, e.iridescenceThicknessMinimum.value = t.iridescenceThicknessMinimum, e.iridescenceThicknessMaximum.value = t.iridescenceThicknessMaximum, t.iridescenceMap && (e.iridescenceMap.value = t.iridescenceMap, n(t.iridescenceMap, e.iridescenceMapTransform)), t.iridescenceThicknessMap && (e.iridescenceThicknessMap.value = t.iridescenceThicknessMap, n(t.iridescenceThicknessMap, e.iridescenceThicknessMapTransform))), t.transmission > 0 && (e.transmission.value = t.transmission, e.transmissionSamplerMap.value = r.texture, e.transmissionSamplerSize.value.set(r.width, r.height), t.transmissionMap && (e.transmissionMap.value = t.transmissionMap, n(t.transmissionMap, e.transmissionMapTransform)), e.thickness.value = t.thickness, t.thicknessMap && (e.thicknessMap.value = t.thicknessMap, n(t.thicknessMap, e.thicknessMapTransform)), e.attenuationDistance.value = t.attenuationDistance, e.attenuationColor.value.copy(t.attenuationColor)), t.anisotropy > 0 && (e.anisotropyVector.value.set(t.anisotropy * Math.cos(t.anisotropyRotation), t.anisotropy * Math.sin(t.anisotropyRotation)), t.anisotropyMap && (e.anisotropyMap.value = t.anisotropyMap, n(t.anisotropyMap, e.anisotropyMapTransform))), e.specularIntensity.value = t.specularIntensity, e.specularColor.value.copy(t.specularColor), t.specularColorMap && (e.specularColorMap.value = t.specularColorMap, n(t.specularColorMap, e.specularColorMapTransform)), t.specularIntensityMap && (e.specularIntensityMap.value = t.specularIntensityMap, n(t.specularIntensityMap, e.specularIntensityMapTransform));
	}
	function m(e, t) {
		t.matcap && (e.matcap.value = t.matcap);
	}
	function h(e, n) {
		let r = t.get(n).light;
		e.referencePosition.value.setFromMatrixPosition(r.matrixWorld), e.nearDistance.value = r.shadow.camera.near, e.farDistance.value = r.shadow.camera.far;
	}
	return {
		refreshFogUniforms: r,
		refreshMaterialUniforms: i
	};
}
function rl(e, t, n, r) {
	let i = {}, a = {};
	function o(e, t) {
		let n = t.program;
		r.uniformBlockBinding(e, n, i[e.id]);
	}
	function s(e, n) {
		let o = i[e.id];
		o === void 0 && (m(e), o = c(e), i[e.id] = o, e.addEventListener("dispose", g));
		let s = n.program;
		r.updateUBOMapping(e, s);
		let u = t.render.frame;
		a[e.id] !== u && (l(e), a[e.id] = u);
	}
	function c(t) {
		let n = e.createBuffer(), r = t.__size, i = t.usage;
		return e.bindBuffer(e.UNIFORM_BUFFER, n), e.bufferData(e.UNIFORM_BUFFER, r, i), e.bindBuffer(e.UNIFORM_BUFFER, null), n;
	}
	function l(t) {
		let n = i[t.id], r = t.uniforms, a = t.__cache;
		e.bindBuffer(e.UNIFORM_BUFFER, n);
		for (let e = 0, t = r.length; e < t; e++) {
			let t = r[e];
			if (Array.isArray(t)) for (let n = 0, r = t.length; n < r; n++) u(t[n], e, n, a);
			else u(t, e, 0, a);
		}
		e.bindBuffer(e.UNIFORM_BUFFER, null);
	}
	function u(t, n, r, i) {
		if (f(t, n, r, i) === !0) {
			let n = t.__offset, r = t.value;
			if (Array.isArray(r)) {
				let e = 0;
				for (let n = 0; n < r.length; n++) {
					let i = r[n], a = h(i, !0);
					d(i, t.__data, e), e += a.storage / Float32Array.BYTES_PER_ELEMENT;
				}
			} else d(r, t.__data, 0);
			e.bufferSubData(e.UNIFORM_BUFFER, n, t.__data);
		}
	}
	function d(e, t, n) {
		typeof e == "number" || typeof e == "boolean" ? t[n] = e : e.isMatrix3 ? (t[n] = e.elements[0], t[n + 1] = e.elements[1], t[n + 2] = e.elements[2], t[n + 3] = 0, t[n + 4] = e.elements[3], t[n + 5] = e.elements[4], t[n + 6] = e.elements[5], t[n + 7] = 0, t[n + 8] = e.elements[6], t[n + 9] = e.elements[7], t[n + 10] = e.elements[8], t[n + 11] = 0) : ArrayBuffer.isView(e) ? t.set(e.subarray(0, t.length - n), n) : e.toArray(t, n);
	}
	function f(e, t, n, r) {
		let i = e.value, a = t + "_" + n;
		if (Array.isArray(i)) {
			r[a] === void 0 && (r[a] = []);
			let e = r[a], t = !1;
			for (let n = 0; n < i.length; n++) p(i[n], e, n) === !0 && (t = !0);
			return t;
		}
		return p(i, r, a);
	}
	function p(e, t, n) {
		if (t[n] === void 0) return t[n] = typeof e == "number" || typeof e == "boolean" ? e : ArrayBuffer.isView(e) ? e.slice() : e.clone(), !0;
		{
			let r = t[n];
			if (typeof e == "number" || typeof e == "boolean") {
				if (r !== e) return t[n] = e, !0;
			} else if (ArrayBuffer.isView(e)) return !0;
			else if (r.equals(e) === !1) return r.copy(e), !0;
		}
		return !1;
	}
	function m(e) {
		let t = e.uniforms, n = 0;
		for (let e = 0, r = t.length; e < r; e++) {
			let r = Array.isArray(t[e]) ? t[e] : [t[e]];
			for (let i = 0, a = r.length; i < a; i++) {
				let a = r[i], o = Array.isArray(a.value) ? a.value : [a.value], s = Array.isArray(t[e]) || Array.isArray(a.value), c = n;
				for (let e = 0, t = o.length; e < t; e++) {
					let t = o[e], r = h(t, s), i = n % 16, a = i % r.boundary, l = i + a;
					n += a, l !== 0 && 16 - l < r.storage && (n += 16 - l), e === 0 && (c = n), n += r.storage;
				}
				a.__data = new (a.type === "int" ? Int32Array : a.type === "uint" ? Uint32Array : Float32Array)((n - c) / Float32Array.BYTES_PER_ELEMENT), a.__offset = c;
			}
		}
		let r = n % 16;
		return r > 0 && (n += 16 - r), e.__size = n, e.__cache = {}, this;
	}
	function h(e, t) {
		let n = {
			boundary: 0,
			storage: 0
		};
		return typeof e == "number" || typeof e == "boolean" ? (n.boundary = 4, n.storage = 4) : e.isVector2 ? (n.boundary = 8, n.storage = 8) : e.isVector3 || e.isColor ? (n.boundary = 16, n.storage = 12) : e.isVector4 ? (n.boundary = 16, n.storage = 16) : e.isMatrix3 ? (n.boundary = 16, n.storage = 48) : e.isMatrix4 ? (n.boundary = 16, n.storage = 64) : e.isTexture ? L("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : ArrayBuffer.isView(e) ? (n.boundary = 16, n.storage = e.byteLength) : L("WebGLRenderer: Unsupported uniform value type.", e), t === !0 && (n.boundary = 16, n.storage = Math.ceil(n.storage / 16) * 16), n;
	}
	function g(t) {
		let n = t.target;
		n.removeEventListener("dispose", g), e.deleteBuffer(i[n.id]), delete i[n.id], delete a[n.id];
	}
	function _() {
		for (let t in i) e.deleteBuffer(i[t]);
		i = {}, a = {};
	}
	return {
		bind: o,
		update: s,
		dispose: _
	};
}
var il = new Uint16Array([
	12469,
	15057,
	12620,
	14925,
	13266,
	14620,
	13807,
	14376,
	14323,
	13990,
	14545,
	13625,
	14713,
	13328,
	14840,
	12882,
	14931,
	12528,
	14996,
	12233,
	15039,
	11829,
	15066,
	11525,
	15080,
	11295,
	15085,
	10976,
	15082,
	10705,
	15073,
	10495,
	13880,
	14564,
	13898,
	14542,
	13977,
	14430,
	14158,
	14124,
	14393,
	13732,
	14556,
	13410,
	14702,
	12996,
	14814,
	12596,
	14891,
	12291,
	14937,
	11834,
	14957,
	11489,
	14958,
	11194,
	14943,
	10803,
	14921,
	10506,
	14893,
	10278,
	14858,
	9960,
	14484,
	14039,
	14487,
	14025,
	14499,
	13941,
	14524,
	13740,
	14574,
	13468,
	14654,
	13106,
	14743,
	12678,
	14818,
	12344,
	14867,
	11893,
	14889,
	11509,
	14893,
	11180,
	14881,
	10751,
	14852,
	10428,
	14812,
	10128,
	14765,
	9754,
	14712,
	9466,
	14764,
	13480,
	14764,
	13475,
	14766,
	13440,
	14766,
	13347,
	14769,
	13070,
	14786,
	12713,
	14816,
	12387,
	14844,
	11957,
	14860,
	11549,
	14868,
	11215,
	14855,
	10751,
	14825,
	10403,
	14782,
	10044,
	14729,
	9651,
	14666,
	9352,
	14599,
	9029,
	14967,
	12835,
	14966,
	12831,
	14963,
	12804,
	14954,
	12723,
	14936,
	12564,
	14917,
	12347,
	14900,
	11958,
	14886,
	11569,
	14878,
	11247,
	14859,
	10765,
	14828,
	10401,
	14784,
	10011,
	14727,
	9600,
	14660,
	9289,
	14586,
	8893,
	14508,
	8533,
	15111,
	12234,
	15110,
	12234,
	15104,
	12216,
	15092,
	12156,
	15067,
	12010,
	15028,
	11776,
	14981,
	11500,
	14942,
	11205,
	14902,
	10752,
	14861,
	10393,
	14812,
	9991,
	14752,
	9570,
	14682,
	9252,
	14603,
	8808,
	14519,
	8445,
	14431,
	8145,
	15209,
	11449,
	15208,
	11451,
	15202,
	11451,
	15190,
	11438,
	15163,
	11384,
	15117,
	11274,
	15055,
	10979,
	14994,
	10648,
	14932,
	10343,
	14871,
	9936,
	14803,
	9532,
	14729,
	9218,
	14645,
	8742,
	14556,
	8381,
	14461,
	8020,
	14365,
	7603,
	15273,
	10603,
	15272,
	10607,
	15267,
	10619,
	15256,
	10631,
	15231,
	10614,
	15182,
	10535,
	15118,
	10389,
	15042,
	10167,
	14963,
	9787,
	14883,
	9447,
	14800,
	9115,
	14710,
	8665,
	14615,
	8318,
	14514,
	7911,
	14411,
	7507,
	14279,
	7198,
	15314,
	9675,
	15313,
	9683,
	15309,
	9712,
	15298,
	9759,
	15277,
	9797,
	15229,
	9773,
	15166,
	9668,
	15084,
	9487,
	14995,
	9274,
	14898,
	8910,
	14800,
	8539,
	14697,
	8234,
	14590,
	7790,
	14479,
	7409,
	14367,
	7067,
	14178,
	6621,
	15337,
	8619,
	15337,
	8631,
	15333,
	8677,
	15325,
	8769,
	15305,
	8871,
	15264,
	8940,
	15202,
	8909,
	15119,
	8775,
	15022,
	8565,
	14916,
	8328,
	14804,
	8009,
	14688,
	7614,
	14569,
	7287,
	14448,
	6888,
	14321,
	6483,
	14088,
	6171,
	15350,
	7402,
	15350,
	7419,
	15347,
	7480,
	15340,
	7613,
	15322,
	7804,
	15287,
	7973,
	15229,
	8057,
	15148,
	8012,
	15046,
	7846,
	14933,
	7611,
	14810,
	7357,
	14682,
	7069,
	14552,
	6656,
	14421,
	6316,
	14251,
	5948,
	14007,
	5528,
	15356,
	5942,
	15356,
	5977,
	15353,
	6119,
	15348,
	6294,
	15332,
	6551,
	15302,
	6824,
	15249,
	7044,
	15171,
	7122,
	15070,
	7050,
	14949,
	6861,
	14818,
	6611,
	14679,
	6349,
	14538,
	6067,
	14398,
	5651,
	14189,
	5311,
	13935,
	4958,
	15359,
	4123,
	15359,
	4153,
	15356,
	4296,
	15353,
	4646,
	15338,
	5160,
	15311,
	5508,
	15263,
	5829,
	15188,
	6042,
	15088,
	6094,
	14966,
	6001,
	14826,
	5796,
	14678,
	5543,
	14527,
	5287,
	14377,
	4985,
	14133,
	4586,
	13869,
	4257,
	15360,
	1563,
	15360,
	1642,
	15358,
	2076,
	15354,
	2636,
	15341,
	3350,
	15317,
	4019,
	15273,
	4429,
	15203,
	4732,
	15105,
	4911,
	14981,
	4932,
	14836,
	4818,
	14679,
	4621,
	14517,
	4386,
	14359,
	4156,
	14083,
	3795,
	13808,
	3437,
	15360,
	122,
	15360,
	137,
	15358,
	285,
	15355,
	636,
	15344,
	1274,
	15322,
	2177,
	15281,
	2765,
	15215,
	3223,
	15120,
	3451,
	14995,
	3569,
	14846,
	3567,
	14681,
	3466,
	14511,
	3305,
	14344,
	3121,
	14037,
	2800,
	13753,
	2467,
	15360,
	0,
	15360,
	1,
	15359,
	21,
	15355,
	89,
	15346,
	253,
	15325,
	479,
	15287,
	796,
	15225,
	1148,
	15133,
	1492,
	15008,
	1749,
	14856,
	1882,
	14685,
	1886,
	14506,
	1783,
	14324,
	1608,
	13996,
	1398,
	13702,
	1183
]), al = null;
function ol() {
	return al === null && (al = new Er(il, 16, 16, y, u), al.name = "DFG_LUT", al.minFilter = i, al.magFilter = i, al.wrapS = t, al.wrapT = t, al.generateMipmaps = !1, al.needsUpdate = !0), al;
}
var sl = class {
	constructor(e = {}) {
		let { canvas: t = ie(), context: n = null, depth: r = !0, stencil: i = !1, alpha: l = !1, antialias: m = !1, premultipliedAlpha: h = !0, preserveDrawingBuffer: g = !1, powerPreference: _ = "default", failIfMajorPerformanceCaveat: y = !1, reversedDepthBuffer: S = !1, outputBufferType: C = o } = e;
		this.isWebGLRenderer = !0;
		let w;
		if (n !== null) {
			if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext) throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
			w = n.getContextAttributes().alpha;
		} else w = l;
		let T = C, E = /* @__PURE__ */ new Set([
			x,
			b,
			v
		]), D = /* @__PURE__ */ new Set([
			o,
			c,
			s,
			p,
			d,
			f
		]), O = /* @__PURE__ */ new Uint32Array(4), A = /* @__PURE__ */ new Int32Array(4), ee = {
			textures: [],
			min: [],
			max: [],
			resolution: []
		}, j = null, M = null, N = [], te = [], P = null;
		this.domElement = t, this.debug = {
			checkShaderErrors: !0,
			diagnostics: { keywords: !1 },
			onShaderError: null
		}, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
		let F = this, re = !1, I = null, oe = null, se = null, le = null;
		this._outputColorSpace = k;
		let z = 0, ue = 0, B = null, de = -1, fe = null, V = new Ze(), H = new Ze(), pe = null, me = new J(0), he = 0, ge = t.width, _e = t.height, ve = 1, ye = null, be = null, xe = new Ze(0, 0, ge, _e), Se = new Ze(0, 0, ge, _e), Ce = !1, we = new zr(), Te = new Vr(), Ee = !1, De = !1, Oe = new nt(), ke = new G(), Ae = new Ze(), je = {
			background: null,
			fog: null,
			environment: null,
			overrideMaterial: null,
			isScene: !0
		}, Me = !1;
		function Ne() {
			return B === null ? ve : 1;
		}
		let U = n;
		function W(e, n) {
			return t.getContext(e, n);
		}
		let Pe, Fe, K, q, Ie, Le, Re, ze, Ve, He, Ue, We, Ge, Ke, qe, Je, Ye, Xe, Qe, et, tt, rt, it;
		try {
			let e = {
				alpha: !0,
				depth: r,
				stencil: i,
				antialias: m,
				premultipliedAlpha: h,
				preserveDrawingBuffer: g,
				powerPreference: _,
				failIfMajorPerformanceCaveat: y
			};
			if ("setAttribute" in t && t.setAttribute("data-engine", "three.js r187"), t.addEventListener("webglcontextlost", st, !1), t.addEventListener("webglcontextrestored", ct, !1), t.addEventListener("webglcontextcreationerror", lt, !1), U === null) {
				let t = "webgl2";
				if (U = W(t, e), U === null) throw W(t) ? Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.") : Error("THREE.WebGLRenderer: Error creating WebGL context.");
			}
			at();
		} catch (e) {
			throw t.removeEventListener("webglcontextlost", st, !1), t.removeEventListener("webglcontextrestored", ct, !1), t.removeEventListener("webglcontextcreationerror", lt, !1), R("WebGLRenderer: " + e.message), e;
		}
		function at() {
			Pe = new Do(U), Pe.init(), tt = new Yc(U, Pe), Fe = new oo(U, Pe, e, tt), K = new qc(U, Pe), Fe.reversedDepthBuffer && S && K.buffers.depth.setReversed(!0), oe = U.createFramebuffer(), se = U.createFramebuffer(), le = U.createFramebuffer(), q = new Ao(U), Ie = new Dc(), Le = new Jc(U, Pe, K, Ie, Fe, tt, q), Re = new Eo(F), ze = new Za(U), rt = new io(U, ze), Ve = new Oo(U, ze, q, rt), He = new Mo(U, Ve, ze, rt, q), Xe = new jo(U, Fe, Le), qe = new so(Ie), Ue = new Ec(F, Re, Pe, Fe, rt, qe), We = new nl(F, Ie), Ge = new jc(), Ke = new Rc(Pe), Ye = new ro(F, Re, K, He, w, h), Je = new Kc(F, He, Fe), it = new rl(U, q, Fe, K), Qe = new ao(U, Pe, q), et = new ko(U, Pe, q), q.programs = Ue.programs, F.capabilities = Fe, F.extensions = Pe, F.properties = Ie, F.renderLists = Ge, F.shadowMap = Je, F.state = K, F.info = q;
		}
		T !== 1009 && (P = new Po(T, t.width, t.height, m, r, i));
		let ot = new $c(F, U);
		this.xr = ot, this.getContext = function() {
			return U;
		}, this.getContextAttributes = function() {
			return U.getContextAttributes();
		}, this.forceContextLoss = function() {
			let e = Pe.get("WEBGL_lose_context");
			e && e.loseContext();
		}, this.forceContextRestore = function() {
			let e = Pe.get("WEBGL_lose_context");
			e && e.restoreContext();
		}, this.getPixelRatio = function() {
			return ve;
		}, this.setPixelRatio = function(e) {
			e !== void 0 && (ve = e, this.setSize(ge, _e, !1));
		}, this.getSize = function(e) {
			return e.set(ge, _e);
		}, this.setSize = function(e, n, r = !0) {
			ot.isPresenting ? L("WebGLRenderer: Can't change size while VR device is presenting.") : (ge = e, _e = n, t.width = Math.floor(e * ve), t.height = Math.floor(n * ve), r === !0 && (t.style.width = e + "px", t.style.height = n + "px"), P !== null && P.setSize(t.width, t.height), this.setViewport(0, 0, e, n));
		}, this.getDrawingBufferSize = function(e) {
			return e.set(ge * ve, _e * ve).floor();
		}, this.setDrawingBufferSize = function(e, n, r) {
			ge = e, _e = n, ve = r, t.width = Math.floor(e * r), t.height = Math.floor(n * r), this.setViewport(0, 0, e, n);
		}, this.setEffects = function(e) {
			if (T === 1009) R("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
			else {
				if (e) {
					for (let t = 0; t < e.length; t++) if (e[t].isOutputPass === !0) {
						L("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
						break;
					}
				}
				P.setEffects(e || []);
			}
		}, this.getCurrentViewport = function(e) {
			return e.copy(V);
		}, this.getViewport = function(e) {
			return e.copy(xe);
		}, this.setViewport = function(e, t, n, r) {
			e.isVector4 ? xe.set(e.x, e.y, e.z, e.w) : xe.set(e, t, n, r), K.viewport(V.copy(xe).multiplyScalar(Ne()).round());
		}, this.getScissor = function(e) {
			return e.copy(Se);
		}, this.setScissor = function(e, t, n, r) {
			e.isVector4 ? Se.set(e.x, e.y, e.z, e.w) : Se.set(e, t, n, r), K.scissor(H.copy(Se).multiplyScalar(Ne()).round());
		}, this.getScissorTest = function() {
			return Ce;
		}, this.setScissorTest = function(e) {
			K.setScissorTest(Ce = e);
		}, this.setOpaqueSort = function(e) {
			ye = e;
		}, this.setTransparentSort = function(e) {
			be = e;
		}, this.getClearColor = function(e) {
			return e.copy(Ye.getClearColor());
		}, this.setClearColor = function() {
			Ye.setClearColor(...arguments);
		}, this.getClearAlpha = function() {
			return Ye.getClearAlpha();
		}, this.setClearAlpha = function() {
			Ye.setClearAlpha(...arguments);
		}, this.clear = function(e = !0, t = !0, n = !0) {
			let r = 0;
			if (e) {
				let e = !1;
				if (B !== null) {
					let t = B.texture.format;
					e = E.has(t);
				}
				if (e) {
					let e = B.texture.type, t = D.has(e), n = Ye.getClearColor(), r = Ye.getClearAlpha(), i = n.r, a = n.g, o = n.b;
					t ? (O[0] = i, O[1] = a, O[2] = o, O[3] = r, U.clearBufferuiv(U.COLOR, 0, O)) : (A[0] = i, A[1] = a, A[2] = o, A[3] = r, U.clearBufferiv(U.COLOR, 0, A));
				} else r |= U.COLOR_BUFFER_BIT;
			}
			t && (r |= U.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(!0)), n && (r |= U.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), r !== 0 && U.clear(r);
		}, this.clearColor = function() {
			this.clear(!0, !1, !1);
		}, this.clearDepth = function() {
			this.clear(!1, !0, !1);
		}, this.clearStencil = function() {
			this.clear(!1, !1, !0);
		}, this.setNodesHandler = function(e) {
			e.setRenderer(this), I = e;
		}, this.dispose = function() {
			t.removeEventListener("webglcontextlost", st, !1), t.removeEventListener("webglcontextrestored", ct, !1), t.removeEventListener("webglcontextcreationerror", lt, !1), Ye.dispose(), Ge.dispose(), Ke.dispose(), Le.dispose(), Ie.dispose(), Re.dispose(), He.dispose(), Ve.dispose(), rt.dispose(), it.dispose(), Ue.dispose(), ot.dispose(), ot.removeEventListener("sessionstart", gt), ot.removeEventListener("sessionend", _t), vt.stop();
		};
		function st(e) {
			e.preventDefault(), ae("WebGLRenderer: Context Lost."), re = !0;
		}
		function ct() {
			ae("WebGLRenderer: Context Restored."), re = !1;
			let e = q.autoReset, t = Je.enabled, n = Je.autoUpdate, r = Je.needsUpdate, i = Je.type;
			at(), q.autoReset = e, Je.enabled = t, Je.autoUpdate = n, Je.needsUpdate = r, Je.type = i;
		}
		function lt(e) {
			R("WebGLRenderer: A WebGL context could not be created. Reason: ", e.statusMessage);
		}
		function ut(e) {
			let t = e.target;
			t.removeEventListener("dispose", ut), dt(t);
		}
		function dt(e) {
			ft(e), Ie.remove(e);
		}
		function ft(e) {
			let t = Ie.get(e).programs;
			t !== void 0 && (t.forEach(function(e) {
				Ue.releaseProgram(e);
			}), e.isShaderMaterial && Ue.releaseShaderCache(e));
		}
		this.renderBufferDirect = function(e, t, n, r, i, a) {
			t === null && (t = je);
			let o = i.isMesh && i.matrixWorld.determinantAffine() < 0, s = kt(e, t, n, r, i);
			K.setMaterial(r, o);
			let c = n.index, l = 1;
			if (r.wireframe === !0) {
				if (c = Ve.getWireframeAttribute(n), c === void 0) return;
				l = 2;
			}
			let u = n.drawRange, d = n.attributes.position, f = u.start * l, p = (u.start + u.count) * l;
			a !== null && (f = Math.max(f, a.start * l), p = Math.min(p, (a.start + a.count) * l)), c === null ? d != null && (f = Math.max(f, 0), p = Math.min(p, d.count)) : (f = Math.max(f, 0), p = Math.min(p, c.count));
			let m = p - f;
			if (m < 0 || m === Infinity) return;
			rt.setup(i, r, s, n, c);
			let h, g = Qe;
			if (c !== null && (h = ze.get(c), g = et, g.setIndex(h)), i.isMesh) r.wireframe === !0 ? (K.setLineWidth(r.wireframeLinewidth * Ne()), g.setMode(U.LINES)) : g.setMode(U.TRIANGLES);
			else if (i.isLine) {
				let e = r.linewidth;
				e === void 0 && (e = 1), K.setLineWidth(e * Ne()), i.isLineSegments ? g.setMode(U.LINES) : i.isLineLoop ? g.setMode(U.LINE_LOOP) : g.setMode(U.LINE_STRIP);
			} else i.isPoints ? g.setMode(U.POINTS) : i.isSprite && g.setMode(U.TRIANGLES);
			if (i.isBatchedMesh) {
				if (Pe.get("WEBGL_multi_draw")) g.renderMultiDraw(i._multiDrawStarts, i._multiDrawCounts, i._multiDrawCount);
				else {
					let e = i._multiDrawStarts, t = i._multiDrawCounts, n = i._multiDrawCount, a = c ? ze.get(c).bytesPerElement : 1, o = Ie.get(r).currentProgram.getUniforms();
					for (let r = 0; r < n; r++) o.setValue(U, "_gl_DrawID", r), g.render(e[r] / a, t[r]);
				}
			} else if (i.isInstancedMesh) g.renderInstances(f, m, i.count);
			else if (n.isInstancedBufferGeometry) {
				let e = n._maxInstanceCount === void 0 ? Infinity : n._maxInstanceCount, t = Math.min(n.instanceCount, e);
				g.renderInstances(f, m, t);
			} else g.render(f, m);
		};
		function pt(e, t, n, r) {
			I !== null && e.isNodeMaterial && I.setObject(r, e), Ee === !0 && qe.setState(e, n, !1), e.transparent === !0 && e.side === 2 && e.forceSinglePass === !1 ? (e.side = 1, e.needsUpdate = !0, Tt(e, t, r), e.side = 0, e.needsUpdate = !0, Tt(e, t, r), e.side = 2) : Tt(e, t, r);
		}
		this.compile = function(e, t, n = null) {
			n === null && (n = e), I !== null && I.renderStart(e, t, n), M = Ke.get(n), M.init(t), te.push(M), n.traverseVisible(function(e) {
				e.isLight && e.layers.test(t.layers) && (M.pushLight(e), e.castShadow && M.pushShadow(e));
			}), e !== n && e.traverseVisible(function(e) {
				e.isLight && e.layers.test(t.layers) && (M.pushLight(e), e.castShadow && M.pushShadow(e));
			}), M.setupLights(), I !== null && I.updateLights(M.state.lightsArray), De = this.localClippingEnabled, Ee = qe.init(this.clippingPlanes, De), Ee === !0 && qe.setGlobalState(this.clippingPlanes, t), I !== null && Je.render(M.state.shadowsArray, n, t);
			let r = /* @__PURE__ */ new Set();
			return e.traverse(function(e) {
				if (!(e.isMesh || e.isPoints || e.isLine || e.isSprite)) return;
				let i = e.material;
				if (i) {
					if (Array.isArray(i)) for (let a = 0; a < i.length; a++) {
						let o = i[a];
						pt(o, n, t, e), r.add(o);
					}
					else pt(i, n, t, e), r.add(i);
				}
			}), M = te.pop(), I !== null && I.renderEnd(), r;
		}, this.compileAsync = function(e, t, n = null) {
			let r = this.compile(e, t, n);
			return new Promise((t) => {
				function n() {
					r.forEach(function(e) {
						let t = Ie.get(e).currentProgram;
						(t === void 0 || t.isReady()) && r.delete(e);
					}), r.size === 0 ? t(e) : setTimeout(n, 10);
				}
				Pe.get("KHR_parallel_shader_compile") === null ? setTimeout(n, 10) : n();
			});
		};
		let mt = null;
		function ht(e) {
			mt && mt(e);
		}
		function gt() {
			vt.stop();
		}
		function _t() {
			vt.start();
		}
		let vt = new Xa();
		vt.setAnimationLoop(ht), typeof self < "u" && vt.setContext(self), this.setAnimationLoop = function(e) {
			mt = e, ot.setAnimationLoop(e), e === null ? vt.stop() : vt.start();
		}, ot.addEventListener("sessionstart", gt), ot.addEventListener("sessionend", _t), this.render = function(e, t) {
			if (t !== void 0 && t.isCamera !== !0) {
				R("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
				return;
			}
			if (re === !0) return;
			I !== null && I.renderStart(e, t);
			let n = ot.enabled === !0 && ot.isPresenting === !0, r = P !== null && (B === null || n) && P.begin(F, B);
			if (e.matrixWorldAutoUpdate === !0 && e.updateMatrixWorld(), t.parent === null && t.matrixWorldAutoUpdate === !0 && t.updateMatrixWorld(), ot.enabled === !0 && ot.isPresenting === !0 && (P === null || P.isCompositing() === !1) && (ot.cameraAutoUpdate === !0 && ot.updateCamera(t), t = ot.getCamera()), e.isScene === !0 && e.onBeforeRender(F, e, t, B), M = Ke.get(e, te.length), M.init(t), M.state.textureUnits = Le.getTextureUnits(), te.push(M), Oe.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), t.isArrayCamera ? Te.setFromArrayCamera(t) : we.setFromProjectionMatrix(Oe, ne, t.reversedDepth), De = this.localClippingEnabled, Ee = qe.init(this.clippingPlanes, De), j = Ge.get(e, N.length), j.init(), N.push(j), this.info.render.frame++, ot.enabled === !0 && ot.isPresenting === !0) {
				let e = F.xr.getDepthSensingMesh();
				e !== null && yt(e, t, -Infinity, F.sortObjects);
			}
			yt(e, t, 0, F.sortObjects), j.finish(), I !== null && I.updateLights(M.state.lightsArray), F.sortObjects === !0 && j.sort(ye, be), Me = ot.enabled === !1 || ot.isPresenting === !1 || ot.hasDepthSensing() === !1, Me && Ye.addToRenderList(j, e), this.info.autoReset === !0 && this.info.reset(), Ee === !0 && qe.beginShadows();
			let i = M.state.shadowsArray;
			if (Je.render(i, e, t), Ee === !0 && qe.endShadows(), (r && P.hasRenderPass()) === !1) {
				let n = j.opaque, r = j.transmissive;
				if (M.setupLights(), t.isArrayCamera) {
					let i = t.cameras;
					if (r.length > 0) for (let t = 0, a = i.length; t < a; t++) {
						let a = i[t];
						xt(n, r, e, a);
					}
					Me && Ye.render(e);
					for (let t = 0, n = i.length; t < n; t++) {
						let n = i[t];
						bt(j, e, n, n.viewport);
					}
				} else r.length > 0 && xt(n, r, e, t), Me && Ye.render(e), bt(j, e, t);
			}
			B !== null && ue === 0 && (Le.updateMultisampleRenderTarget(B), Le.updateRenderTargetMipmap(B)), r && P.end(F), e.isScene === !0 && e.onAfterRender(F, e, t), rt.resetDefaultState(), de = -1, fe = null, te.pop(), te.length > 0 ? (M = te[te.length - 1], Le.setTextureUnits(M.state.textureUnits), Ee === !0 && qe.setGlobalState(F.clippingPlanes, M.state.camera)) : M = null, N.pop(), j = N.length > 0 ? N[N.length - 1] : null, I !== null && I.renderEnd();
		};
		function yt(e, t, n, r) {
			if (e.visible === !1) return;
			if (e.layers.test(t.layers)) {
				if (e.isGroup) n = e.renderOrder;
				else if (e.isLOD) e.autoUpdate === !0 && e.update(t);
				else if (e.isLight) M.pushLight(e), e.castShadow && M.pushShadow(e);
				else if (e.isSprite) {
					let i = t.isArrayCamera ? Te : we;
					if (!e.frustumCulled || e.intersectsFrustum(i)) {
						r && Ae.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Oe);
						let i = He.update(e), a = e.material;
						a.visible && j.push(e, i, a, n, Ae.z, null, t);
					}
				} else if (e.isMesh || e.isLine || e.isPoints) {
					let i = t.isArrayCamera ? Te : we;
					if (!e.frustumCulled || e.intersectsFrustum(i)) {
						let i = He.update(e), a = e.material;
						if (r && (e.boundingSphere === void 0 ? (i.boundingSphere === null && i.computeBoundingSphere(), Ae.copy(i.boundingSphere.center)) : (e.boundingSphere === null && e.computeBoundingSphere(), Ae.copy(e.boundingSphere.center)), Ae.applyMatrix4(e.matrixWorld).applyMatrix4(Oe)), Array.isArray(a)) {
							let r = i.groups;
							for (let o = 0, s = r.length; o < s; o++) {
								let s = r[o], c = a[s.materialIndex];
								c && c.visible && j.push(e, i, c, n, Ae.z, s, t);
							}
						} else a.visible && j.push(e, i, a, n, Ae.z, null, t);
					}
				}
			}
			let i = e.children;
			for (let e = 0, a = i.length; e < a; e++) yt(i[e], t, n, r);
		}
		function bt(e, t, n, r) {
			let { opaque: i, transmissive: a, transparent: o } = e;
			M.setupLightsView(n), Ee === !0 && qe.setGlobalState(F.clippingPlanes, n), r && K.viewport(V.copy(r)), i.length > 0 && St(i, t, n), a.length > 0 && St(a, t, n), o.length > 0 && St(o, t, n), K.buffers.depth.setTest(!0), K.buffers.depth.setMask(!0), K.buffers.color.setMask(!0), K.setPolygonOffset(!1);
		}
		function xt(e, t, n, r) {
			if ((n.isScene === !0 ? n.overrideMaterial : null) !== null) return;
			if (M.state.transmissionRenderTarget[r.id] === void 0) {
				let e = Pe.has("EXT_color_buffer_half_float") || Pe.has("EXT_color_buffer_float");
				M.state.transmissionRenderTarget[r.id] = new $e(1, 1, {
					generateMipmaps: !0,
					type: e ? u : o,
					minFilter: a,
					samples: Math.max(4, Fe.samples),
					stencilBuffer: i,
					resolveDepthBuffer: !1,
					resolveStencilBuffer: !1,
					storeMultisampledDepthBuffer: !1,
					storeMultisampledStencilBuffer: !1,
					colorSpace: Be.workingColorSpace
				});
			}
			let s = M.state.transmissionRenderTarget[r.id], c = r.viewport || V;
			s.setSize(c.z * F.transmissionResolutionScale, c.w * F.transmissionResolutionScale);
			let l = F.getRenderTarget(), d = F.getActiveCubeFace(), f = F.getActiveMipmapLevel();
			F.setRenderTarget(s), F.getClearColor(me), he = F.getClearAlpha(), he < 1 && F.setClearColor(16777215, .5), F.clear(), Me && Ye.render(n);
			let p = F.toneMapping;
			F.toneMapping = 0;
			let m = r.viewport;
			if (r.viewport !== void 0 && (r.viewport = void 0), M.setupLightsView(r), Ee === !0 && qe.setGlobalState(F.clippingPlanes, r), St(e, n, r), Le.updateMultisampleRenderTarget(s), Le.updateRenderTargetMipmap(s), Pe.has("WEBGL_multisampled_render_to_texture") === !1) {
				let e = !1;
				for (let i = 0, a = t.length; i < a; i++) {
					let { object: a, geometry: o, material: s, group: c } = t[i];
					if (s.side === 2 && a.layers.test(r.layers)) {
						let t = s.side;
						s.side = 1, s.needsUpdate = !0, Ct(a, n, r, o, s, c), s.side = t, s.needsUpdate = !0, e = !0;
					}
				}
				e === !0 && (Le.updateMultisampleRenderTarget(s), Le.updateRenderTargetMipmap(s));
			}
			F.setRenderTarget(l, d, f), F.setClearColor(me, he), m !== void 0 && (r.viewport = m), F.toneMapping = p;
		}
		function St(e, t, n) {
			let r = t.isScene === !0 ? t.overrideMaterial : null;
			for (let i = 0, a = e.length; i < a; i++) {
				let a = e[i], { object: o, geometry: s, group: c } = a, l = a.material;
				l.allowOverride === !0 && r !== null && (l = r), o.layers.test(n.layers) && Ct(o, t, n, s, l, c);
			}
		}
		function Ct(e, t, n, r, i, a) {
			I !== null && i.isNodeMaterial && I.setObject(e, i), e.onBeforeRender(F, t, n, r, i, a), e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, e.matrixWorld), e.normalMatrix.getNormalMatrix(e.modelViewMatrix), i.onBeforeRender(F, t, n, r, e, a), i.transparent === !0 && i.side === 2 && i.forceSinglePass === !1 ? (i.side = 1, i.needsUpdate = !0, F.renderBufferDirect(n, t, r, i, e, a), i.side = 0, i.needsUpdate = !0, F.renderBufferDirect(n, t, r, i, e, a), i.side = 2) : F.renderBufferDirect(n, t, r, i, e, a), e.onAfterRender(F, t, n, r, i, a);
		}
		function wt(e) {
			let t = 0;
			for (let n of e) n.texture !== null && t++;
			return t;
		}
		function Tt(e, t, n) {
			t.isScene !== !0 && (t = je);
			let r = Ie.get(e), i = M.state.lights, a = M.state.shadowsArray, o = i.state.version, s = Ue.getParameters(e, i.state, a, t, n, M.state.lightProbeGridArray), c = Ue.getProgramCacheKey(s), l = r.programs;
			r.environment = e.isMeshStandardMaterial || e.isMeshLambertMaterial || e.isMeshPhongMaterial ? t.environment : null, r.fog = t.fog;
			let u = e.isMeshStandardMaterial || e.isMeshLambertMaterial && !e.envMap || e.isMeshPhongMaterial && !e.envMap;
			r.envMap = Re.get(e.envMap || r.environment, u), r.envMapRotation = r.environment !== null && e.envMap === null ? t.environmentRotation : e.envMapRotation, l === void 0 && (e.addEventListener("dispose", ut), l = /* @__PURE__ */ new Map(), r.programs = l, r.programVariants = /* @__PURE__ */ new Map());
			let d = l.get(c);
			if (d !== void 0) {
				if (r.currentProgram === d && r.lightsStateVersion === o) return Ot(e, s), d;
			} else s.uniforms = Ue.getUniforms(e), I !== null && e.isNodeMaterial && I.build(e, n, s), e.onBeforeCompile(s, F), d = Ue.acquireProgram(s, c), l.set(c, d), r.uniforms = s.uniforms;
			let f = r.uniforms;
			return (!e.isShaderMaterial && !e.isRawShaderMaterial || e.clipping === !0) && (f.clippingPlanes = qe.uniform), Ot(e, s), r.needsLights = jt(e), r.lightsStateVersion = o, r.needsLights && (f.ambientLightColor.value = i.state.ambient, f.lightProbe.value = i.state.probe, f.sunLights.value = i.state.sun, f.sunLightShadows.value = i.state.sunShadow, f.directionalLights.value = i.state.directional, f.directionalLightShadows.value = i.state.directionalShadow, f.spotLights.value = i.state.spot, f.spotLightShadows.value = i.state.spotShadow, f.rectAreaLights.value = i.state.rectArea, f.ltc_1.value = i.state.rectAreaLTC1, f.ltc_2.value = i.state.rectAreaLTC2, f.pointLights.value = i.state.point, f.pointLightShadows.value = i.state.pointShadow, f.hemisphereLights.value = i.state.hemi, f.sunShadowMatrix.value = i.state.sunShadowMatrix, f.sunShadowCascade.value = i.state.sunShadowCascade, f.directionalShadowMatrix.value = i.state.directionalShadowMatrix, f.spotLightMatrix.value = i.state.spotLightMatrix, f.spotLightMap.value = i.state.spotLightMap, f.pointShadowMatrix.value = i.state.pointShadowMatrix), r.numLightProbeGrids = wt(M.state.lightProbeGridArray), r.currentProgram = d, r.uniformsList = null, d;
		}
		function Et(e, t, n, r, i) {
			let a = Ie.get(e), o = a.currentProgram.id + "," + r + "," + i, s = a.programVariants.get(o);
			return s === void 0 ? (s = Tt(e, t, n), a.programVariants.set(o, s)) : (a.currentProgram = s, a.uniformsList = null, a.outputColorSpace = r, a.toneMapping = i), s;
		}
		function Dt(e) {
			if (e.uniformsList === null) {
				let t = e.currentProgram.getUniforms();
				e.uniformsList = Us.seqWithValue(t.seq, e.uniforms);
			}
			return e.uniformsList;
		}
		function Ot(e, t) {
			let n = Ie.get(e);
			n.outputColorSpace = t.outputColorSpace, n.batching = t.batching, n.batchingColor = t.batchingColor, n.instancing = t.instancing, n.instancingColor = t.instancingColor, n.instancingMorph = t.instancingMorph, n.skinning = t.skinning, n.morphTargets = t.morphTargets, n.morphNormals = t.morphNormals, n.morphColors = t.morphColors, n.morphTargetsCount = t.morphTargetsCount, n.numClippingPlanes = t.numClippingPlanes, n.numIntersection = t.numClipIntersection, n.vertexAlphas = t.vertexAlphas, n.vertexTangents = t.vertexTangents, n.toneMapping = t.toneMapping;
		}
		function kt(e, t, n, r, i) {
			t.isScene !== !0 && (t = je), Le.resetTextureUnits();
			let a = t.fog, o = r.isMeshStandardMaterial || r.isMeshLambertMaterial || r.isMeshPhongMaterial ? t.environment : null, s = B === null ? F.outputColorSpace : B.isXRRenderTarget === !0 ? B.texture.colorSpace : Be.workingColorSpace, c = r.isMeshStandardMaterial || r.isMeshLambertMaterial && !r.envMap || r.isMeshPhongMaterial && !r.envMap, l = Re.get(r.envMap || o, c), u = r.vertexColors === !0 && !!n.attributes.color && n.attributes.color.itemSize === 4, d = !!n.attributes.tangent && (!!r.normalMap || r.anisotropy > 0), f = !!n.morphAttributes.position, p = !!n.morphAttributes.normal, m = !!n.morphAttributes.color, h = 0;
			r.toneMapped && (B === null || B.isXRRenderTarget === !0) && (h = F.toneMapping);
			let g = n.morphAttributes.position || n.morphAttributes.normal || n.morphAttributes.color, _ = g === void 0 ? 0 : g.length, v = Ie.get(r), y = M.state.lights;
			if (Ee === !0 && (De === !0 || e !== fe)) {
				let t = e === fe && r.id === de;
				qe.setState(r, e, t);
			}
			let b = !1, x = !1;
			r.version === v.__version ? v.needsLights && v.lightsStateVersion !== y.state.version || i.isBatchedMesh && v.batching === !1 || !i.isBatchedMesh && v.batching === !0 || i.isBatchedMesh && v.batchingColor === !0 && i._colorsTexture === null || i.isBatchedMesh && v.batchingColor === !1 && i._colorsTexture !== null || i.isInstancedMesh && v.instancing === !1 || !i.isInstancedMesh && v.instancing === !0 || i.isSkinnedMesh && v.skinning === !1 || !i.isSkinnedMesh && v.skinning === !0 || i.isInstancedMesh && v.instancingColor === !0 && i.instanceColor === null || i.isInstancedMesh && v.instancingColor === !1 && i.instanceColor !== null || i.isInstancedMesh && v.instancingMorph === !0 && i.morphTexture === null || i.isInstancedMesh && v.instancingMorph === !1 && i.morphTexture !== null ? b = !0 : v.envMap === l ? r.fog === !0 && v.fog !== a || v.numClippingPlanes !== void 0 && (v.numClippingPlanes !== qe.numPlanes || v.numIntersection !== qe.numIntersection) ? b = !0 : v.vertexAlphas === u && v.vertexTangents === d && v.morphTargets === f && v.morphNormals === p && v.morphColors === m && v.morphTargetsCount === _ && v.numLightProbeGrids === wt(M.state.lightProbeGridArray) ? (v.outputColorSpace !== s || v.toneMapping !== h) && (x = !0) : b = !0 : b = !0 : (b = !0, v.__version = r.version);
			let S = v.currentProgram;
			(b === !0 || x === !0) && (S = x === !0 ? Et(r, t, i, s, h) : Tt(r, t, i), I && r.isNodeMaterial && I.onUpdateProgram(r, S, v));
			let C = !1, w = !1, T = !1, E = S.getUniforms(), D = v.uniforms;
			if (K.useProgram(S.program) && (C = !0, w = !0, T = !0), r.id !== de && (de = r.id, w = !0), C || fe !== e) {
				K.buffers.depth.getReversed() && e.reversedDepth !== !0 && (e._reversedDepth = !0, e.updateProjectionMatrix()), E.setValue(U, "projectionMatrix", e.projectionMatrix), E.setValue(U, "viewMatrix", e.matrixWorldInverse);
				let t = E.map.cameraPosition;
				t !== void 0 && t.setValue(U, ke.setFromMatrixPosition(e.matrixWorld)), Fe.logarithmicDepthBuffer && E.setValue(U, "logDepthBufFC", 2 / (Math.log(e.far + 1) / Math.LN2)), (r.isMeshPhongMaterial || r.isMeshToonMaterial || r.isMeshLambertMaterial || r.isMeshBasicMaterial || r.isMeshStandardMaterial || r.isShaderMaterial) && E.setValue(U, "isOrthographic", e.isOrthographicCamera === !0), fe !== e && (fe = e, w = !0, T = !0);
			}
			if (v.needsLights && (y.state.sunShadowMap.length > 0 && E.setValue(U, "sunShadowMap", y.state.sunShadowMap, Le), y.state.directionalShadowMap.length > 0 && E.setValue(U, "directionalShadowMap", y.state.directionalShadowMap, Le), y.state.spotShadowMap.length > 0 && E.setValue(U, "spotShadowMap", y.state.spotShadowMap, Le), y.state.pointShadowMap.length > 0 && E.setValue(U, "pointShadowMap", y.state.pointShadowMap, Le)), i.isSkinnedMesh) {
				E.setOptional(U, i, "bindMatrix"), E.setOptional(U, i, "bindMatrixInverse");
				let e = i.skeleton;
				e && (e.boneTexture === null && e.computeBoneTexture(), E.setValue(U, "boneTexture", e.boneTexture, Le));
			}
			i.isBatchedMesh && (E.setOptional(U, i, "batchingTexture"), E.setValue(U, "batchingTexture", i._matricesTexture, Le), E.setOptional(U, i, "batchingIdTexture"), E.setValue(U, "batchingIdTexture", i._indirectTexture, Le), E.setOptional(U, i, "batchingColorTexture"), i._colorsTexture !== null && E.setValue(U, "batchingColorTexture", i._colorsTexture, Le));
			let O = n.morphAttributes;
			if ((O.position !== void 0 || O.normal !== void 0 || O.color !== void 0) && Xe.update(i, n, S), (w || v.receiveShadow !== i.receiveShadow) && (v.receiveShadow = i.receiveShadow, E.setValue(U, "receiveShadow", i.receiveShadow)), (r.isMeshStandardMaterial || r.isMeshLambertMaterial || r.isMeshPhongMaterial) && r.envMap === null && t.environment !== null && (D.envMapIntensity.value = t.environmentIntensity), D.dfgLUT !== void 0 && (D.dfgLUT.value = ol()), w) {
				if (E.setValue(U, "toneMappingExposure", F.toneMappingExposure), v.needsLights && At(D, T), a && r.fog === !0 && We.refreshFogUniforms(D, a), We.refreshMaterialUniforms(D, r, ve, _e, M.state.transmissionRenderTarget[e.id]), v.needsLights && v.numLightProbeGrids > 0) {
					let e = ee, t = 0;
					for (let n of M.state.lightProbeGridArray) n.texture !== null && (e.textures[t] = n.texture, e.min[t] = n.boundingBox.min, e.max[t] = n.boundingBox.max, e.resolution[t] = n.resolution, t++);
					for (let n in e) e[n].length = t;
					D.probesSH.value = e.textures, D.probesMin.value = e.min, D.probesMax.value = e.max, D.probesResolution.value = e.resolution;
				}
				Us.upload(U, Dt(v), D, Le);
			}
			if (r.isShaderMaterial && r.uniformsNeedUpdate === !0 && (Us.upload(U, Dt(v), D, Le), r.uniformsNeedUpdate = !1), r.isSpriteMaterial && E.setValue(U, "center", i.center), E.setValue(U, "modelViewMatrix", i.modelViewMatrix), E.setValue(U, "normalMatrix", i.normalMatrix), E.setValue(U, "modelMatrix", i.matrixWorld), r.uniformsGroups !== void 0) {
				let e = r.uniformsGroups;
				for (let t = 0, n = e.length; t < n; t++) {
					let n = e[t];
					it.update(n, S), it.bind(n, S);
				}
			}
			return S;
		}
		function At(e, t) {
			e.ambientLightColor.needsUpdate = t, e.lightProbe.needsUpdate = t, e.sunLights.needsUpdate = t, e.sunLightShadows.needsUpdate = t, e.directionalLights.needsUpdate = t, e.directionalLightShadows.needsUpdate = t, e.pointLights.needsUpdate = t, e.pointLightShadows.needsUpdate = t, e.spotLights.needsUpdate = t, e.spotLightShadows.needsUpdate = t, e.rectAreaLights.needsUpdate = t, e.hemisphereLights.needsUpdate = t;
		}
		function jt(e) {
			return e.isMeshLambertMaterial || e.isMeshToonMaterial || e.isMeshPhongMaterial || e.isMeshStandardMaterial || e.isShadowMaterial || e.isShaderMaterial && e.lights === !0;
		}
		this.getActiveCubeFace = function() {
			return z;
		}, this.getActiveMipmapLevel = function() {
			return ue;
		}, this.getRenderTarget = function() {
			return B;
		}, this.setRenderTargetTextures = function(e, t, n) {
			let r = Ie.get(e);
			r.__autoAllocateDepthBuffer = e.resolveDepthBuffer === !1, r.__autoAllocateDepthBuffer === !1 && (r.__useRenderToTexture = !1), Ie.get(e.texture).__webglTexture = t, Ie.get(e.depthTexture).__webglTexture = r.__autoAllocateDepthBuffer ? void 0 : n, r.__hasExternalTextures = !0;
		}, this.setRenderTargetFramebuffer = function(e, t) {
			let n = Ie.get(e);
			n.__webglFramebuffer = t, n.__useDefaultFramebuffer = t === void 0;
		}, this.setRenderTarget = function(e, t = 0, n = 0) {
			B = e, z = t, ue = n;
			let r = null, i = !1, a = !1;
			if (e) {
				let o = Ie.get(e);
				if (o.__useDefaultFramebuffer !== void 0) {
					K.bindFramebuffer(U.FRAMEBUFFER, o.__webglFramebuffer), V.copy(e.viewport), H.copy(e.scissor), pe = e.scissorTest, K.viewport(V), K.scissor(H), K.setScissorTest(pe), de = -1;
					return;
				}
				if (o.__webglFramebuffer === void 0) Le.setupRenderTarget(e);
				else if (o.__hasExternalTextures) Le.rebindTextures(e, Ie.get(e.texture).__webglTexture, Ie.get(e.depthTexture).__webglTexture);
				else if (e.depthBuffer) {
					let t = e.depthTexture;
					if (o.__boundDepthTexture !== t) {
						if (t !== null && Ie.has(t) && (e.width !== t.image.width || e.height !== t.image.height)) throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");
						Le.setupDepthRenderbuffer(e);
					}
				}
				let s = e.texture;
				(s.isData3DTexture || s.isDataArrayTexture || s.isCompressedArrayTexture) && (a = !0);
				let c = Ie.get(e).__webglFramebuffer;
				e.isWebGLCubeRenderTarget ? (r = Array.isArray(c[t]) ? c[t][n] : c[t], i = !0) : r = e.samples > 0 && Le.useMultisampledRTT(e) === !1 ? Ie.get(e).__webglMultisampledFramebuffer : Array.isArray(c) ? c[n] : c, V.copy(e.viewport), H.copy(e.scissor), pe = e.scissorTest;
			} else V.copy(xe).multiplyScalar(ve).floor(), H.copy(Se).multiplyScalar(ve).floor(), pe = Ce;
			if (n !== 0 && (r = oe), K.bindFramebuffer(U.FRAMEBUFFER, r) && K.drawBuffers(e, r), K.viewport(V), K.scissor(H), K.setScissorTest(pe), i) {
				let r = Ie.get(e.texture);
				U.framebufferTexture2D(U.FRAMEBUFFER, U.COLOR_ATTACHMENT0, U.TEXTURE_CUBE_MAP_POSITIVE_X + t, r.__webglTexture, n);
			} else if (a) {
				let r = t;
				for (let t = 0; t < e.textures.length; t++) {
					let i = Ie.get(e.textures[t]);
					U.framebufferTextureLayer(U.FRAMEBUFFER, U.COLOR_ATTACHMENT0 + t, i.__webglTexture, n, r);
				}
			} else if (e !== null && n !== 0) {
				let t = Ie.get(e.texture);
				U.framebufferTexture2D(U.FRAMEBUFFER, U.COLOR_ATTACHMENT0, U.TEXTURE_2D, t.__webglTexture, n);
			}
			de = -1;
		};
		function Mt(e) {
			let t = Ie.get(e);
			return (t.__readFormat !== e.format || t.__readType !== e.type) && (t.__readFormat = e.format, t.__readType = e.type, t.__formatReadable = Fe.textureFormatReadable(e.format), t.__typeReadable = Fe.textureTypeReadable(e.type)), t;
		}
		this.readRenderTargetPixels = function(e, t, n, r, i, a, o, s = 0) {
			if (!(e && e.isWebGLRenderTarget)) {
				R("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
				return;
			}
			let c = Ie.get(e).__webglFramebuffer;
			if (e.isWebGLCubeRenderTarget && o !== void 0 && (c = c[o], Array.isArray(c) && (c = c[0])), c) {
				K.bindFramebuffer(U.FRAMEBUFFER, c);
				try {
					let o = e.textures[s], c = o.format, l = o.type;
					e.textures.length > 1 && U.readBuffer(U.COLOR_ATTACHMENT0 + s);
					let u = Mt(o);
					if (u.__formatReadable === !1) {
						R("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
						return;
					}
					if (u.__typeReadable === !1) {
						R("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
						return;
					}
					t >= 0 && t <= e.width - r && n >= 0 && n <= e.height - i && U.readPixels(t, n, r, i, tt.convert(c), tt.convert(l), a);
				} finally {
					let e = B === null ? null : Ie.get(B).__webglFramebuffer;
					K.bindFramebuffer(U.FRAMEBUFFER, e);
				}
			}
		}, this.readRenderTargetPixelsAsync = async function(e, t, n, r, i, a, o, s = 0) {
			if (!(e && e.isWebGLRenderTarget)) throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
			let c = Ie.get(e).__webglFramebuffer;
			if (e.isWebGLCubeRenderTarget && o !== void 0 && (c = c[o], Array.isArray(c) && (c = c[0])), c) {
				if (t >= 0 && t <= e.width - r && n >= 0 && n <= e.height - i) {
					K.bindFramebuffer(U.FRAMEBUFFER, c);
					let o = e.textures[s], l = o.format, u = o.type;
					e.textures.length > 1 && U.readBuffer(U.COLOR_ATTACHMENT0 + s);
					let d = Mt(o);
					if (d.__formatReadable === !1) throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
					if (d.__typeReadable === !1) throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
					let f = U.createBuffer();
					U.bindBuffer(U.PIXEL_PACK_BUFFER, f), U.bufferData(U.PIXEL_PACK_BUFFER, a.byteLength, U.STREAM_READ), U.readPixels(t, n, r, i, tt.convert(l), tt.convert(u), 0), U.bindBuffer(U.PIXEL_PACK_BUFFER, null);
					let p = B === null ? null : Ie.get(B).__webglFramebuffer;
					K.bindFramebuffer(U.FRAMEBUFFER, p);
					let m = U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE, 0);
					return U.flush(), await ce(U, m, 4), U.bindBuffer(U.PIXEL_PACK_BUFFER, f), U.getBufferSubData(U.PIXEL_PACK_BUFFER, 0, a), U.bindBuffer(U.PIXEL_PACK_BUFFER, null), U.deleteBuffer(f), U.deleteSync(m), a;
				}
				throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
			}
		}, this.copyFramebufferToTexture = function(e, t = null, n = 0) {
			let r = 2 ** -n, i = Math.floor(e.image.width * r), a = Math.floor(e.image.height * r), o = t === null ? 0 : t.x, s = t === null ? 0 : t.y;
			Le.setTexture2D(e, 0), U.copyTexSubImage2D(U.TEXTURE_2D, n, 0, 0, o, s, i, a), K.unbindTexture();
		}, this.copyTextureToTexture = function(e, t, n = null, r = null, i = 0, a = 0) {
			let o, s, c, l, u, d, f, p, m, h = e.isCompressedTexture ? e.mipmaps[a] : e.image;
			if (n !== null) o = n.max.x - n.min.x, s = n.max.y - n.min.y, c = n.isBox3 ? n.max.z - n.min.z : 1, l = n.min.x, u = n.min.y, d = n.isBox3 ? n.min.z : 0;
			else {
				let t = 2 ** -i;
				o = Math.floor(h.width * t), s = Math.floor(h.height * t), c = e.isDataArrayTexture ? h.depth : e.isData3DTexture ? Math.floor(h.depth * t) : 1, l = 0, u = 0, d = 0;
			}
			r === null ? (f = 0, p = 0, m = 0) : (f = r.x, p = r.y, m = r.z);
			let g = tt.convert(t.format), _ = tt.convert(t.type), v;
			t.isData3DTexture ? (Le.setTexture3D(t, 0), v = U.TEXTURE_3D) : t.isDataArrayTexture || t.isCompressedArrayTexture ? (Le.setTexture2DArray(t, 0), v = U.TEXTURE_2D_ARRAY) : (Le.setTexture2D(t, 0), v = U.TEXTURE_2D), K.activeTexture(U.TEXTURE0), K.pixelStorei(U.UNPACK_FLIP_Y_WEBGL, t.flipY), K.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultiplyAlpha), K.pixelStorei(U.UNPACK_ALIGNMENT, t.unpackAlignment);
			let y = K.getParameter(U.UNPACK_ROW_LENGTH), b = K.getParameter(U.UNPACK_IMAGE_HEIGHT), x = K.getParameter(U.UNPACK_SKIP_PIXELS), S = K.getParameter(U.UNPACK_SKIP_ROWS), C = K.getParameter(U.UNPACK_SKIP_IMAGES);
			K.pixelStorei(U.UNPACK_ROW_LENGTH, h.width), K.pixelStorei(U.UNPACK_IMAGE_HEIGHT, h.height), K.pixelStorei(U.UNPACK_SKIP_PIXELS, l), K.pixelStorei(U.UNPACK_SKIP_ROWS, u), K.pixelStorei(U.UNPACK_SKIP_IMAGES, d);
			let w = e.isDataArrayTexture || e.isData3DTexture, T = t.isDataArrayTexture || t.isData3DTexture;
			if (e.isDepthTexture) {
				let n = Ie.get(e), r = Ie.get(t), h = Ie.get(n.__renderTarget), g = Ie.get(r.__renderTarget);
				K.bindFramebuffer(U.READ_FRAMEBUFFER, h.__webglFramebuffer), K.bindFramebuffer(U.DRAW_FRAMEBUFFER, g.__webglFramebuffer);
				for (let n = 0; n < c; n++) w && (U.framebufferTextureLayer(U.READ_FRAMEBUFFER, U.COLOR_ATTACHMENT0, Ie.get(e).__webglTexture, i, d + n), U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER, U.COLOR_ATTACHMENT0, Ie.get(t).__webglTexture, a, m + n)), U.blitFramebuffer(l, u, l + o, u + s, f, p, f + o, p + s, U.DEPTH_BUFFER_BIT, U.NEAREST);
				K.bindFramebuffer(U.READ_FRAMEBUFFER, null), K.bindFramebuffer(U.DRAW_FRAMEBUFFER, null);
			} else if (i !== 0 || e.isRenderTargetTexture || Ie.has(e)) {
				let n = Ie.get(e), r = Ie.get(t);
				K.bindFramebuffer(U.READ_FRAMEBUFFER, se), K.bindFramebuffer(U.DRAW_FRAMEBUFFER, le);
				for (let e = 0; e < c; e++) w ? U.framebufferTextureLayer(U.READ_FRAMEBUFFER, U.COLOR_ATTACHMENT0, n.__webglTexture, i, d + e) : U.framebufferTexture2D(U.READ_FRAMEBUFFER, U.COLOR_ATTACHMENT0, U.TEXTURE_2D, n.__webglTexture, i), T ? U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER, U.COLOR_ATTACHMENT0, r.__webglTexture, a, m + e) : U.framebufferTexture2D(U.DRAW_FRAMEBUFFER, U.COLOR_ATTACHMENT0, U.TEXTURE_2D, r.__webglTexture, a), i === 0 ? T ? U.copyTexSubImage3D(v, a, f, p, m + e, l, u, o, s) : U.copyTexSubImage2D(v, a, f, p, l, u, o, s) : U.blitFramebuffer(l, u, l + o, u + s, f, p, f + o, p + s, U.COLOR_BUFFER_BIT, U.NEAREST);
				K.bindFramebuffer(U.READ_FRAMEBUFFER, null), K.bindFramebuffer(U.DRAW_FRAMEBUFFER, null);
			} else T ? e.isDataTexture || e.isData3DTexture ? U.texSubImage3D(v, a, f, p, m, o, s, c, g, _, h.data) : t.isCompressedArrayTexture ? U.compressedTexSubImage3D(v, a, f, p, m, o, s, c, g, h.data) : U.texSubImage3D(v, a, f, p, m, o, s, c, g, _, h) : e.isDataTexture ? U.texSubImage2D(U.TEXTURE_2D, a, f, p, o, s, g, _, h.data) : e.isCompressedTexture ? U.compressedTexSubImage2D(U.TEXTURE_2D, a, f, p, h.width, h.height, g, h.data) : U.texSubImage2D(U.TEXTURE_2D, a, f, p, o, s, g, _, h);
			K.pixelStorei(U.UNPACK_ROW_LENGTH, y), K.pixelStorei(U.UNPACK_IMAGE_HEIGHT, b), K.pixelStorei(U.UNPACK_SKIP_PIXELS, x), K.pixelStorei(U.UNPACK_SKIP_ROWS, S), K.pixelStorei(U.UNPACK_SKIP_IMAGES, C), a === 0 && t.generateMipmaps === !0 && t.mipmapsAutoUpdate === !0 && U.generateMipmap(v), K.unbindTexture();
		}, this.initRenderTarget = function(e) {
			Ie.get(e).__webglFramebuffer === void 0 && Le.setupRenderTarget(e);
		}, this.initTexture = function(e) {
			e.isCubeTexture ? Le.setTextureCube(e, 0) : e.isData3DTexture ? Le.setTexture3D(e, 0) : e.isDataArrayTexture || e.isCompressedArrayTexture ? Le.setTexture2DArray(e, 0) : Le.setTexture2D(e, 0), K.unbindTexture();
		}, this.resetState = function() {
			z = 0, ue = 0, B = null, K.reset(), rt.reset();
		}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	get coordinateSystem() {
		return ne;
	}
	get outputColorSpace() {
		return this._outputColorSpace;
	}
	set outputColorSpace(e) {
		this._outputColorSpace = e;
		let t = this.getContext();
		t.drawingBufferColorSpace = Be._getDrawingBufferColorSpace(e), t.unpackColorSpace = Be._getUnpackColorSpace();
	}
}, cl = ["masculine", "feminine"], ll = [
	"short",
	"long",
	"bun",
	"ponytail",
	"curly",
	"bald"
], ul = [
	"#f6d7c3",
	"#eec1a2",
	"#d9a47c",
	"#c08a5e",
	"#a06a44",
	"#7c4f33",
	"#5a3825",
	"#3d2618"
], dl = [
	"#17130f",
	"#3a2618",
	"#6b4226",
	"#a8703c",
	"#d8b26a",
	"#b5432e",
	"#8e8e99",
	"#f1efe9",
	"#ff2e88",
	"#7b5cff"
], fl = [
	"#f4f4f6",
	"#1f1f25",
	"#8e8e99",
	"#2b4a7d",
	"#2f7a50",
	"#b5432e",
	"#ff4a12",
	"#ff2e88",
	"#7b5cff",
	"#ffb08f",
	"#d8b26a",
	"#2bd576"
], pl = [
	"#1b1b20",
	"#2a3550",
	"#3e4a5c",
	"#5a5a64",
	"#6b5136",
	"#8a7a62",
	"#c9c9d1",
	"#3a2b3f"
], ml = /^#[0-9a-f]{6}$/i, hl = (e, t) => e.includes(t);
function gl(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return null;
	let t = e;
	if (!hl(cl, t.build) || !hl(ll, t.hair)) return null;
	for (let e of [
		"skin",
		"hairColor",
		"top",
		"bottom"
	]) if (typeof t[e] != "string" || !ml.test(t[e])) return null;
	return typeof t.glasses != "boolean" || typeof t.beard != "boolean" ? null : {
		build: t.build,
		skin: t.skin.toLowerCase(),
		hair: t.hair,
		hairColor: t.hairColor.toLowerCase(),
		glasses: t.glasses,
		beard: t.beard,
		top: t.top.toLowerCase(),
		bottom: t.bottom.toLowerCase()
	};
}
function _l(e) {
	if (typeof e != "string") return null;
	let t = e.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
	return !t || t.length > 24 ? null : t;
}
function vl(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return {
		ok: !1,
		error: "send an object with \"name\", \"appearance\", or both"
	};
	let t = e, n = {};
	if (t.name !== void 0) {
		let e = _l(t.name);
		if (!e) return {
			ok: !1,
			error: "\"name\" must be 1 to 24 characters"
		};
		n.name = e;
	}
	if (t.appearance !== void 0) {
		let e = gl(t.appearance);
		if (!e) return {
			ok: !1,
			error: "\"appearance\" is incomplete or has a value that is not allowed"
		};
		n.appearance = e;
	}
	return n.name === void 0 && n.appearance === void 0 ? {
		ok: !1,
		error: "nothing to change: send \"name\", \"appearance\", or both"
	} : {
		ok: !0,
		change: n
	};
}
function yl(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n++) t = Math.imul(t ^ e.charCodeAt(n), 16777619);
	return t >>> 0;
}
var bl = {
	"exec.ceo": {
		build: "masculine",
		skin: "#eec1a2",
		hair: "short",
		hairColor: "#17130f",
		glasses: !1,
		beard: !1,
		top: "#1f1f25",
		bottom: "#1b1b20"
	},
	"exec.chief-of-staff": {
		build: "feminine",
		skin: "#f6d7c3",
		hair: "long",
		hairColor: "#3a2618",
		glasses: !1,
		beard: !1,
		top: "#f4f4f6",
		bottom: "#2a3550"
	}
};
function xl(e) {
	if (bl[e]) return { ...bl[e] };
	let t = (t, n) => t[yl(`${e}:${n}`) % t.length], n = t(cl, "build"), r = t(n === "feminine" ? [
		"long",
		"bun",
		"ponytail",
		"curly",
		"short"
	] : [
		"short",
		"short",
		"curly",
		"bald",
		"ponytail"
	], "hair");
	return {
		build: n,
		skin: t(ul, "skin"),
		hair: r,
		hairColor: t(dl.slice(0, 7), "hair-colour"),
		glasses: yl(`${e}:glasses`) % 4 == 0,
		beard: n === "masculine" && yl(`${e}:beard`) % 3 == 0,
		top: t(fl, "top"),
		bottom: t(pl, "bottom")
	};
}
// ../shared/src/events.ts
var Sl = [
	"start",
	"stage",
	"close"
], Cl = "exec.chief-of-staff", wl = "exec.project-coordinator", Tl = [
	{
		id: "exec.ceo",
		name: "Stephen",
		role: "CEO",
		human: !0
	},
	{
		id: Cl,
		name: "Sophia",
		role: "Chief of Staff"
	},
	{
		id: wl,
		name: "Theo",
		role: "Project Coordinator"
	},
	{
		id: "design.lead",
		name: "Mika",
		role: "Design Lead"
	},
	{
		id: "design.ui-ux",
		name: "Noor",
		role: "UI/UX Designer"
	},
	{
		id: "design.motion-3d",
		name: "Kai",
		role: "3D / Motion Designer"
	},
	{
		id: "dev.lead",
		name: "Ada",
		role: "Dev Lead / Architect"
	},
	{
		id: "dev.frontend",
		name: "Leo",
		role: "Frontend Developer"
	},
	{
		id: "dev.integrations",
		name: "Ravi",
		role: "Integrations Engineer"
	},
	{
		id: "dev.qa",
		name: "Tess",
		role: "QA Tester"
	},
	{
		id: "content.manager",
		name: "Maya",
		role: "Content Manager"
	},
	{
		id: "content.script-writer",
		name: "Jun",
		role: "Video Script Writer"
	},
	{
		id: "content.title-thumbnail",
		name: "Zoe",
		role: "Title & Thumbnail Specialist"
	},
	{
		id: "content.social-copy",
		name: "Lin",
		role: "Social / Copywriter"
	},
	{
		id: "sales.manager",
		name: "Marco",
		role: "Sales Manager"
	},
	{
		id: "sales.client-success",
		name: "Hana",
		role: "Client Success"
	},
	{
		id: "research.scout",
		name: "Iris",
		role: "Research Scout"
	},
	{
		id: "research.analyst",
		name: "Otto",
		role: "Competitor / Market Analyst"
	}
], El = Tl.filter((e) => !e.human), Dl = {
	missions: 4,
	tasks: 6,
	outputs: 10
}, Ol = 60, kl = 20;
function Al() {
	let e = {};
	for (let t of El) e[t.id] = {
		state: "idle",
		since: null
	};
	return {
		seq: 0,
		updatedAt: null,
		agents: e,
		missions: [],
		activity: {},
		profiles: {},
		recent: [],
		usage: {
			costUsd: 0,
			runs: 0
		},
		approvals: []
	};
}
function jl(e) {
	return e === "lounge" || !!e?.startsWith("lounge.");
}
function Ml(e, t, n) {
	if (n) return n;
	if (t === "collaborating" || t === "idle" && jl(e)) return e;
}
function Nl(e, t, n, r) {
	let i = e.findIndex(n);
	i >= 0 && e.splice(i, 1), e.push(t), e.length > r && e.splice(0, e.length - r);
}
function Pl(e, t) {
	let n = t.type === "agent.state" && t.state !== "idle" && !!t.task, r = t.type === "agent.output" && !!t.meta?.path;
	if (!n && !r) return;
	e.activity ??= {};
	let i = e.activity[t.agentId] ??= {
		missions: [],
		tasks: [],
		outputs: []
	}, a = t.missionId ?? e.agents[t.agentId]?.missionId;
	if (a && Nl(i.missions, a, (e) => e === a, Dl.missions), n) {
		let e = {
			label: t.task,
			ts: t.ts
		};
		a && (e.missionId = a), Nl(i.tasks, e, (t) => t.label === e.label && t.missionId === e.missionId, Dl.tasks);
	} else {
		let e = {
			path: t.meta.path,
			ts: t.ts
		};
		t.task && (e.label = t.task), a && (e.missionId = a), Nl(i.outputs, e, (t) => t.path === e.path, Dl.outputs);
	}
}
function Fl(e, t) {
	e.recent ??= [], e.usage ??= {
		costUsd: 0,
		runs: 0
	};
	let n = t.type === "agent.state", r = n && typeof t.meta?.costUsd == "number" && t.meta.costUsd >= 0 ? t.meta.costUsd : void 0, i = n && typeof t.meta?.durationMs == "number" && t.meta.durationMs >= 0 ? t.meta.durationMs : void 0;
	if (r !== void 0 && (e.usage.costUsd += r, e.usage.runs += 1), t.type === "agent.moved" || t.type === "agent.profile" || t.type === "agent.state" && t.state === "idle") return;
	let a = {
		ts: t.ts,
		type: t.type,
		agentId: t.agentId
	};
	t.state && (a.state = t.state), t.task && (a.task = t.task), t.missionId && (a.missionId = t.missionId), typeof t.meta?.path == "string" && (a.path = t.meta.path), t.type === "approval.decided" && typeof t.meta?.decision == "string" && (a.decision = t.meta.decision), n && typeof t.meta?.verdict == "string" && (a.verdict = t.meta.verdict), r !== void 0 && (a.costUsd = r), i !== void 0 && (a.durationMs = i), e.recent.push(a), e.recent.length > Ol && e.recent.splice(0, e.recent.length - Ol);
}
function Il(e, t) {
	if (e.seq += 1, e.updatedAt = t.ts, Pl(e, t), Fl(e, t), t.type === "agent.state" && t.state) {
		let n = e.agents[t.agentId], r = {
			state: t.state,
			since: t.ts
		}, i = t.state === "idle" ? void 0 : t.task ?? n?.task, a = Ml(n?.at, t.state, t.deskId), o = t.state === "idle" ? void 0 : t.missionId ?? n?.missionId;
		i && (r.task = i), a && a !== t.agentId && (r.at = a), o && (r.missionId = o), e.agents[t.agentId] = r;
		let s = t.meta?.verdict;
		if (typeof s == "string" && s !== "done" && o) {
			let n = e.missions.find((e) => e.id === o);
			n && (n.problems = [...(n.problems ?? []).filter((e) => e.agentId !== t.agentId), {
				agentId: t.agentId,
				verdict: s,
				note: t.task ?? s
			}]);
		}
	} else if (t.type === "agent.moved" && t.deskId) {
		let n = e.agents[t.agentId] ?? {
			state: "idle",
			since: t.ts
		}, r = t.deskId === t.agentId ? void 0 : t.deskId, i = { ...n };
		r ? i.at = r : delete i.at, e.agents[t.agentId] = i;
	} else if (t.type === "agent.profile") {
		let n = vl({
			name: t.meta?.name,
			appearance: t.meta?.appearance
		});
		n.ok && (e.profiles ??= {}, e.profiles[t.agentId] = {
			...e.profiles[t.agentId],
			...n.change
		});
	} else if (t.type === "approval.requested" || t.type === "approval.decided") {
		e.approvals ??= [];
		let n = typeof t.meta?.approvalId == "string" ? t.meta.approvalId : "";
		e.approvals = e.approvals.filter((e) => e.id !== n);
		let r = t.meta?.kind;
		if (t.type === "approval.requested" && n && t.missionId && Sl.includes(r)) {
			let i = t.meta ?? {}, a = {
				id: n,
				kind: r,
				missionId: t.missionId,
				title: t.task ?? n,
				requestedAt: t.ts,
				requestedBy: t.agentId,
				items: []
			};
			typeof i.project == "string" && (a.project = i.project), typeof i.stage == "number" && (a.stage = i.stage), typeof i.stages == "number" && (a.stages = i.stages), typeof i.costUsd == "number" && (a.costUsd = i.costUsd), typeof i.files == "number" && (a.files = i.files), typeof i.problems == "number" && i.problems > 0 && (a.problems = i.problems);
			for (let e of Array.isArray(i.items) ? i.items : []) {
				let t = e;
				typeof t?.agentId == "string" && typeof t.task == "string" && a.items.push({
					agentId: t.agentId,
					task: t.task,
					...typeof t.stage == "number" ? { stage: t.stage } : {},
					...typeof t.risk == "string" && t.risk ? { risk: t.risk } : {}
				});
			}
			e.approvals.push(a);
		}
	} else if (t.type.startsWith("mission.") && t.missionId) {
		let n = e.missions.findIndex((e) => e.id === t.missionId), r = (n >= 0 ? e.missions.splice(n, 1)[0] : void 0) ?? {
			id: t.missionId,
			title: t.task ?? t.missionId,
			status: "active",
			createdAt: t.ts,
			updatedAt: t.ts
		};
		t.task && (r.title = t.task), typeof t.meta?.project == "string" && t.meta.project && (r.project = t.meta.project), Array.isArray(t.meta?.assignments) && (r.assignments = t.meta.assignments.filter((e) => {
			let t = e;
			return typeof t?.agentId == "string" && typeof t.task == "string" && typeof t.stage == "number";
		}).map(({ agentId: e, task: t, stage: n }) => ({
			agentId: e,
			task: t,
			stage: n
		}))), t.type === "mission.closed" ? r.status = "done" : t.meta?.status && (r.status = t.meta.status), r.updatedAt = t.ts, e.missions.push(r);
		let i = e.missions.filter((e) => e.status === "done").length;
		for (let t = 0; t < e.missions.length && i > kl;) e.missions[t].status === "done" ? (e.missions.splice(t, 1), --i) : t += 1;
	}
	return e;
}
// ../shared/src/demo-script.ts
function Ll(e, t, n, r) {
	return {
		at: e,
		event: {
			type: "agent.output",
			agentId: t,
			task: r,
			meta: { path: n }
		}
	};
}
function Z(e, t, n, r, i = {}) {
	let a = {
		type: "agent.state",
		agentId: t,
		state: n,
		...i
	};
	return r && (a.task = r), {
		at: e,
		event: a
	};
}
var Rl = [
	{
		at: 1.5,
		event: {
			type: "mission.created",
			agentId: Cl,
			missionId: "{1}",
			task: "Pixel Bytes homepage refresh"
		}
	},
	Z(1.6, Cl, "working", "Briefing: homepage refresh", { missionId: "{1}" }),
	Z(3, wl, "working", "Breaking the mission into tasks", { missionId: "{1}" }),
	Z(5, "design.lead", "working", "Moodboard and hero direction", { missionId: "{1}" }),
	Z(6.5, "design.ui-ux", "working", "Wireframe: homepage sections", { missionId: "{1}" }),
	Z(8, "dev.lead", "working", "Repo and deploy setup", { missionId: "{1}" }),
	{
		at: 10,
		event: {
			type: "mission.created",
			agentId: Cl,
			missionId: "{2}",
			task: "YouTube: AI office build log"
		}
	},
	Z(10.2, "content.manager", "working", "Outline: build log episode", { missionId: "{2}" }),
	Z(12, "content.script-writer", "working", "Drafting hook and intro", { missionId: "{2}" }),
	Z(14, "research.scout", "working", "Scanning Three.js showcases", { missionId: "{2}" }),
	Z(16, "dev.frontend", "working", "Building hero section", { missionId: "{1}" }),
	Ll(9, "design.lead", "clients/pixel-bytes/design/moodboard.fig", "Moodboard"),
	Ll(11, "design.ui-ux", "clients/pixel-bytes/design/wireframes.fig", "Homepage wireframes"),
	Ll(12.5, "dev.lead", "clients/pixel-bytes/site/README.md", "Repo set up"),
	Ll(15, "content.manager", "content/build-log/outline.md", "Episode outline"),
	Ll(17, wl, "missions/M-homepage/tasks.md", "Task breakdown"),
	Z(18, "design.motion-3d", "collaborating", "Hero animation handoff", {
		missionId: "{1}",
		deskId: "dev.frontend"
	}),
	Z(18.4, Cl, "idle"),
	{
		at: 22,
		event: {
			type: "mission.created",
			agentId: Cl,
			missionId: "{3}",
			task: "Lead follow-up: Relay"
		}
	},
	Z(22.2, "sales.manager", "working", "Proposal draft: Relay", { missionId: "{3}" }),
	Z(24, "research.analyst", "working", "Pricing benchmarks: Taiwan studios", { missionId: "{3}" }),
	Z(27, "dev.qa", "blocked", "Staging URL returns 404", { missionId: "{1}" }),
	Z(28.5, wl, "collaborating", "Unblocking QA", {
		missionId: "{1}",
		deskId: "dev.qa"
	}),
	Ll(21, "dev.frontend", "clients/pixel-bytes/site/src/Hero.tsx", "Hero component"),
	Ll(23, "content.script-writer", "content/build-log/script.md", "Hook and intro draft"),
	Ll(26, "research.scout", "research/threejs-showcases.md", "Showcase notes"),
	Ll(30, "dev.frontend", "clients/pixel-bytes/site/src/hero.css", "Hero styles"),
	Ll(31, "sales.manager", "sales/relay/proposal.md", "Proposal draft"),
	Z(32, "content.title-thumbnail", "working", "Title and thumbnail variants", { missionId: "{2}" }),
	Z(34, "design.motion-3d", "working", "Hero animation: scroll timeline", { missionId: "{1}" }),
	Z(37, "dev.qa", "working", "Testing hero on mobile", { missionId: "{1}" }),
	Z(37.5, wl, "working", "Updating the mission board", { missionId: "{1}" }),
	Z(40, "design.lead", "collaborating", "Sync: homepage launch plan", {
		missionId: "{1}",
		deskId: "meeting"
	}),
	Z(41, "dev.lead", "collaborating", "Sync: homepage launch plan", {
		missionId: "{1}",
		deskId: "meeting"
	}),
	Z(42, "content.manager", "collaborating", "Sync: homepage launch plan", {
		missionId: "{1}",
		deskId: "meeting"
	}),
	Ll(36, "research.analyst", "research/pricing-taiwan-studios.md", "Pricing benchmarks"),
	Ll(39, "design.motion-3d", "clients/pixel-bytes/design/hero-timeline.json", "Scroll timeline"),
	Ll(44, "content.title-thumbnail", "content/build-log/titles.md", "Title variants"),
	Ll(46, "dev.qa", "clients/pixel-bytes/qa/mobile-report.md", "Mobile test report"),
	Z(47, "sales.client-success", "working", "Onboarding checklist: Relay", { missionId: "{3}" }),
	Z(50, "dev.integrations", "working", "Contact form to CRM", { missionId: "{1}" }),
	Z(52, "content.social-copy", "working", "Launch posts, Mandarin and English", { missionId: "{2}" }),
	Ll(53, "dev.frontend", "clients/pixel-bytes/site/src/Hero.test.tsx", "Hero tests"),
	Ll(54, "dev.integrations", "clients/pixel-bytes/site/src/contact-form.ts", "Form to CRM"),
	Ll(55, "content.social-copy", "content/build-log/launch-posts.md", "Launch posts"),
	Z(56, "design.lead", "reporting", "Hero direction approved", { missionId: "{1}" }),
	Z(56.5, "dev.lead", "working", "Reviewing pull request", { missionId: "{1}" }),
	Z(57, "content.manager", "working", "Episode outline, second pass", { missionId: "{2}" }),
	Z(63, "design.lead", "idle"),
	Z(64, "content.script-writer", "reporting", "Script draft ready for review", { missionId: "{2}" }),
	Z(66, "research.scout", "idle", void 0, { deskId: "lounge" }),
	Z(70, "content.script-writer", "idle", void 0, { deskId: "lounge" }),
	Z(71, "sales.manager", "reporting", "Proposal sent: Relay", { missionId: "{3}" }),
	Z(72, "research.analyst", "idle"),
	Z(73, "sales.client-success", "idle"),
	{
		at: 77,
		event: {
			type: "mission.closed",
			agentId: Cl,
			missionId: "{3}"
		}
	},
	Z(77.2, "sales.manager", "idle"),
	Z(79, "dev.frontend", "reporting", "Hero section live on staging", { missionId: "{1}" }),
	Z(80, "design.ui-ux", "idle"),
	Z(81, "design.motion-3d", "idle", void 0, { deskId: "lounge" }),
	Z(82, "dev.integrations", "idle"),
	Z(83, "dev.qa", "idle"),
	{
		at: 85,
		event: {
			type: "mission.closed",
			agentId: Cl,
			missionId: "{1}"
		}
	},
	Z(85.2, "dev.frontend", "idle"),
	Z(85.6, "dev.lead", "idle"),
	Z(86, wl, "idle"),
	Z(87, "content.title-thumbnail", "idle"),
	Z(88, "content.social-copy", "idle"),
	{
		at: 90,
		event: {
			type: "mission.closed",
			agentId: Cl,
			missionId: "{2}"
		}
	},
	Z(90.2, "content.manager", "idle"),
	Z(93, "research.scout", "idle", void 0, { deskId: "research.scout" }),
	Z(93.5, "content.script-writer", "idle", void 0, { deskId: "content.script-writer" }),
	Z(94, "design.motion-3d", "idle", void 0, { deskId: "design.motion-3d" })
], zl = {
	at: 27,
	event: {
		type: "approval.requested",
		agentId: wl,
		missionId: "{1}",
		task: "Start stage 2: Pixel Bytes homepage refresh",
		meta: {
			approvalId: "demo-stage-2",
			kind: "stage",
			project: "pixel-bytes",
			stage: 2,
			stages: 3,
			files: 4,
			costUsd: .38,
			items: [{
				agentId: "dev.frontend",
				task: "Build the homepage from the wireframes",
				stage: 2,
				risk: "Replaces the current home page"
			}, {
				agentId: "dev.integrations",
				task: "Wire the contact form to the inbox",
				stage: 2
			}]
		}
	}
};
function Bl(e, t, n = /* @__PURE__ */ new Date()) {
	let r = {
		...e.event,
		ts: n.toISOString()
	};
	return e.event.missionId && (r.missionId = e.event.missionId.replace(/\{(\d)\}/, (e, n) => `M-${101 + t * 3 + (Number(n) - 1)}`)), r;
}
// ../../node_modules/.pnpm/three@0.187.0/node_modules/three/examples/jsm/renderers/CSS2DRenderer.js
var Vl = class extends kt {
	constructor(e = document.createElement("div")) {
		super(), this.isCSS2DObject = !0, this.element = e, this.element.style.position = "absolute", this.element.style.userSelect = "none", this.element.setAttribute("draggable", !1), this.center = new W(.5, .5), this.rotation2D = 0, this.addEventListener("removed", function() {
			this.traverse(function(e) {
				e.element && e.element instanceof e.element.ownerDocument.defaultView.Element && e.element.parentNode !== null && e.element.remove();
			});
		});
	}
	copy(e, t) {
		return super.copy(e, t), this.element = e.element.cloneNode(!0), this.center = e.center, this.rotation2D = e.rotation2D, this;
	}
};
new G(), new nt(), new nt(), new G(), new G();
// src/layout.ts
var Hl = {
	width: 60,
	depth: 40
}, Ul = 1.2, Wl = {
	thickness: .5,
	height: 4.2,
	sill: .9
}, Q = {
	void: "#020202",
	white: "#FFFFFF",
	orange: "#FF4A12",
	pink: "#FF2E88",
	violet: "#7B5CFF",
	lightViolet: "#8F75FF",
	soft: "#C9C9D1",
	mist: "#B4B4BE",
	steel: "#8E8E99",
	peach: "#FFB08F",
	ember: "#FF6A3A",
	green: "#2BD576",
	alert: "#FF3B5C"
}, Gl = [
	Q.orange,
	Q.pink,
	Q.lightViolet
], Kl = Array.from({ length: 6 }, (e, t) => {
	let n = t / 6 * Math.PI * 2 + Math.PI / 6;
	return {
		id: `meeting.seat-${t + 1}`,
		position: {
			x: +(Math.cos(n) * 2.45).toFixed(3),
			z: +(Math.sin(n) * 2.45).toFixed(3)
		}
	};
}), ql = [
	{
		id: "executive",
		name: "Executive Office",
		shortName: "Exec",
		kind: "executive",
		accent: Q.white,
		position: {
			x: 0,
			z: 0
		},
		size: {
			width: 12,
			depth: 7
		},
		elevation: .3,
		desks: [{
			id: "exec.ceo",
			role: "CEO · Stephen",
			position: {
				x: -2.9,
				z: .1
			},
			rotation: .14,
			size: "executive"
		}, {
			id: "exec.chief-of-staff",
			role: "Chief of Staff",
			position: {
				x: 3.1,
				z: .1
			},
			rotation: -.14
		}],
		spots: [
			{
				id: "exec.report-1",
				position: {
					x: 1.45,
					z: 1.15
				},
				posture: "stand"
			},
			{
				id: "exec.report-2",
				position: {
					x: 1.7,
					z: 2.35
				},
				posture: "stand"
			},
			{
				id: "exec.report-3",
				position: {
					x: 3.1,
					z: 2.75
				},
				posture: "stand"
			}
		]
	},
	{
		id: "coordination",
		name: "Project Coordination",
		shortName: "PM",
		kind: "coordinator",
		accent: Q.white,
		position: {
			x: 0,
			z: 8.4
		},
		size: {
			width: 7,
			depth: 4.6
		},
		desks: [{
			id: "exec.project-coordinator",
			role: "Project Coordinator",
			position: {
				x: 0,
				z: .5
			},
			rotation: -.12
		}]
	},
	{
		id: "design",
		name: "Design",
		shortName: "Design",
		kind: "department",
		accent: Q.pink,
		position: {
			x: -20,
			z: -12.5
		},
		size: {
			width: 15,
			depth: 10
		},
		desks: [
			{
				id: "design.lead",
				role: "Design Lead",
				position: {
					x: 0,
					z: -2.4
				},
				rotation: .1
			},
			{
				id: "design.ui-ux",
				role: "UI/UX Designer",
				position: {
					x: -3.7,
					z: 1.4
				},
				rotation: .3
			},
			{
				id: "design.motion-3d",
				role: "3D / Motion Designer",
				position: {
					x: 3.7,
					z: 1.4
				},
				rotation: -.24
			}
		]
	},
	{
		id: "development",
		name: "Development",
		shortName: "Dev",
		kind: "department",
		accent: Q.violet,
		position: {
			x: 0,
			z: -13
		},
		size: {
			width: 15,
			depth: 10
		},
		desks: [
			{
				id: "dev.lead",
				role: "Dev Lead / Architect",
				position: {
					x: 0,
					z: -2.6
				},
				rotation: -.09
			},
			{
				id: "dev.frontend",
				role: "Frontend Developer",
				position: {
					x: -4.6,
					z: 1.4
				},
				rotation: .27
			},
			{
				id: "dev.integrations",
				role: "Integrations Engineer",
				position: {
					x: 0,
					z: 1.4
				},
				rotation: .07
			},
			{
				id: "dev.qa",
				role: "QA Tester",
				position: {
					x: 4.6,
					z: 1.4
				},
				rotation: -.31
			}
		]
	},
	{
		id: "content",
		name: "Content & Marketing",
		shortName: "Content",
		kind: "department",
		accent: Q.orange,
		position: {
			x: 20,
			z: -12.5
		},
		size: {
			width: 15,
			depth: 10
		},
		desks: [
			{
				id: "content.manager",
				role: "Content Manager",
				position: {
					x: 0,
					z: -2.6
				},
				rotation: .12
			},
			{
				id: "content.script-writer",
				role: "Video Script Writer",
				position: {
					x: -4.6,
					z: 1.4
				},
				rotation: .22
			},
			{
				id: "content.title-thumbnail",
				role: "Title & Thumbnail Specialist",
				position: {
					x: 0,
					z: 1.4
				},
				rotation: -.1
			},
			{
				id: "content.social-copy",
				role: "Social / Copywriter",
				position: {
					x: 4.6,
					z: 1.4
				},
				rotation: -.28
			}
		]
	},
	{
		id: "sales",
		name: "Sales & Client Care",
		shortName: "Sales",
		kind: "department",
		accent: Q.peach,
		position: {
			x: -21.5,
			z: 2.6
		},
		size: {
			width: 13,
			depth: 9
		},
		desks: [
			{
				id: "sales.manager",
				role: "Sales Manager",
				position: {
					x: 0,
					z: -2
				},
				rotation: -.14
			},
			{
				id: "sales.client-success",
				role: "Client Success",
				position: {
					x: -3.3,
					z: 1.4
				},
				rotation: .29
			},
			{
				id: "sales.open",
				role: "Open desk",
				position: {
					x: 3.3,
					z: 1.4
				},
				rotation: -.2,
				vacant: !0
			}
		]
	},
	{
		id: "research",
		name: "Research & Intelligence",
		shortName: "Research",
		kind: "department",
		accent: Q.green,
		position: {
			x: 21.5,
			z: 2.6
		},
		size: {
			width: 13,
			depth: 9
		},
		desks: [
			{
				id: "research.scout",
				role: "Research Scout",
				position: {
					x: 0,
					z: -2
				},
				rotation: .11
			},
			{
				id: "research.analyst",
				role: "Competitor / Market Analyst",
				position: {
					x: -3.3,
					z: 1.4
				},
				rotation: .24
			},
			{
				id: "research.open",
				role: "Open desk",
				position: {
					x: 3.3,
					z: 1.4
				},
				rotation: -.3,
				vacant: !0
			}
		]
	},
	{
		id: "meeting",
		name: "Meeting Room",
		shortName: "Meeting",
		kind: "meeting",
		accent: Q.soft,
		position: {
			x: -20,
			z: 13.6
		},
		size: {
			width: 10,
			depth: 7
		},
		desks: [],
		spots: Kl,
		door: {
			side: "east",
			width: 1.8
		}
	},
	{
		id: "lounge",
		name: "Lounge",
		shortName: "Lounge",
		kind: "lounge",
		accent: null,
		position: {
			x: 21,
			z: 14
		},
		size: {
			width: 11,
			depth: 7
		},
		desks: [],
		spots: [
			{
				id: "lounge.sofa-1",
				position: {
					x: -2.6,
					z: -1.3
				}
			},
			{
				id: "lounge.sofa-2",
				position: {
					x: -.4,
					z: -1.3
				}
			},
			{
				id: "lounge.sofa-3",
				position: {
					x: 1.8,
					z: -1.3
				}
			},
			{
				id: "lounge.side-1",
				position: {
					x: 3,
					z: .7
				}
			},
			{
				id: "lounge.ottoman-1",
				position: {
					x: -3.2,
					z: 1.5
				}
			},
			{
				id: "lounge.ottoman-2",
				position: {
					x: -1.1,
					z: 2.3
				}
			}
		]
	}
];
ql.push({
	id: "cafe",
	name: "Café & Bar",
	shortName: "Café",
	kind: "cafe",
	accent: Q.peach,
	position: {
		x: 8.6,
		z: 14.6
	},
	size: {
		width: 8.4,
		depth: 8.2
	},
	desks: [],
	spots: [
		...[
			-2.4,
			-1.2,
			0,
			1.2,
			2.4
		].map((e, t) => ({
			id: `cafe.stool-${t + 1}`,
			position: {
				x: e,
				z: -.9
			}
		})),
		{
			id: "cafe.pong-1",
			position: {
				x: -2.35,
				z: 2.1
			},
			posture: "stand"
		},
		{
			id: "cafe.pong-2",
			position: {
				x: 2.35,
				z: 2.1
			},
			posture: "stand"
		}
	]
});
var Jl = {
	x: 0,
	z: 2.1,
	length: 3.2,
	width: 1.76,
	height: .92
}, Yl = (() => {
	let e = [], t = (t, n, r, i, a = 1) => e.push({
		id: t,
		kind: n,
		position: {
			x: +r.toFixed(2),
			z: +i.toFixed(2)
		},
		scale: a
	});
	for (let e of ql) {
		let { x: n, z: r } = e.position, i = e.size.width / 2, a = e.size.depth / 2;
		if (e.kind === "department") t(`tree.${e.id}`, "tree", n + i + .7, r - a + .7, 1.05);
		else if (e.kind === "executive") for (let o of [-1, 1]) for (let s of [-1, 1]) t(`shrub.${e.id}-${o < 0 ? "w" : "e"}${s < 0 ? "n" : "s"}`, "shrub", n + o * (i + .9), r + s * (a + .8), .9);
		else if (e.kind === "coordinator") for (let a of [-1, 1]) t(`shrub.${e.id}-${a < 0 ? "west" : "east"}`, "shrub", n + a * (i + .9), r + .6);
		else (e.kind === "meeting" || e.kind === "lounge") && t(`tree.${e.id}`, "tree", n + (i * Ul + 1.1), r - a * Ul + .9);
	}
	return t("tree.entrance-west", "tree", -10.6, Hl.depth / 2 - 2.6, 1.05), e;
})(), Xl = {
	width: .56,
	height: .5
}, Zl = (() => {
	let e = [], t = Xl.width / 2 + .08, n = 2.4;
	for (let r of ql) {
		if (r.kind !== "department") continue;
		let { x: i, z: a } = r.position, o = r.size.width / 2, s = r.size.depth / 2, c = a - s + 1.3, l = a + s - t - Xl.width / 2;
		for (let u of [-1, 1]) {
			let d = u < 0 ? "west" : "east";
			e.push({
				id: `${r.id}.${d}`,
				position: {
					x: i + u * (o - t),
					z: (c + l) / 2
				},
				length: l - c,
				along: "z"
			}), e.push({
				id: `${r.id}.${d}-front`,
				position: {
					x: i + u * (o - t + Xl.width / 2 - n / 2),
					z: a + s - t
				},
				length: n,
				along: "x"
			});
		}
	}
	for (let t of [-1, 1]) e.push({
		id: `entry.${t < 0 ? "west" : "east"}`,
		position: {
			x: t * 3.3,
			z: 15
		},
		length: 4.8,
		along: "z"
	});
	return e;
})(), Ql = {
	standard: {
		width: 2.8,
		depth: 1.3,
		height: .74
	},
	executive: {
		width: 3.4,
		depth: 1.4,
		height: .76
	}
}, $l = .6;
function eu(e) {
	return Ql[e.size ?? "standard"];
}
function tu(e, t) {
	return {
		x: e.position.x + t.position.x,
		y: e.elevation ?? 0,
		z: e.position.z + t.position.z
	};
}
function nu(e, t) {
	let n = tu(e, t), r = (eu(t).depth / 2 + $l) * Ul, i = t.rotation ?? 0;
	return {
		x: n.x + Math.sin(i) * r,
		y: n.y,
		z: n.z + Math.cos(i) * r
	};
}
function ru(e) {
	return e.kind === "meeting" || e.kind === "lounge" ? Ul : 1;
}
function iu(e, t) {
	let n = ru(e);
	return {
		x: e.position.x + t.position.x * n,
		y: e.elevation ?? 0,
		z: e.position.z + t.position.z * n
	};
}
// ../../node_modules/.pnpm/three@0.187.0/node_modules/three/examples/jsm/utils/BufferGeometryUtils.js
function au(e, t = !1) {
	let n = e[0].index !== null, r = new Set(Object.keys(e[0].attributes)), i = new Set(Object.keys(e[0].morphAttributes)), a = {}, o = {}, s = e[0].morphTargetsRelative, c = new Pn();
	c.morphTargetsRelative = s;
	let l = 0;
	for (let u = 0; u < e.length; ++u) {
		let d = e[u], f = 0, p = 0;
		if (n !== (d.index !== null)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
		for (let e in d.attributes) {
			if (!r.has(e)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". All geometries must have compatible attributes; make sure \"" + e + "\" attribute exists among all geometries, or in none of them."), null;
			a[e] === void 0 && (a[e] = []), a[e].push(d.attributes[e]), f++;
		}
		if (f !== r.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". Make sure all geometries have the same number of attributes."), null;
		if (s !== d.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
		for (let t in d.morphAttributes) {
			if (!i.has(t)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ".  .morphAttributes must be consistent throughout all geometries."), null;
			if (d.morphAttributes[t].length !== e[0].morphAttributes[t].length) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". All geometries must have the same number of morph targets for the \"" + t + "\" morph attribute."), null;
			o[t] === void 0 && (o[t] = []), o[t].push(d.morphAttributes[t]), p++;
		}
		if (p !== i.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". Make sure all geometries have the same number of morph attributes."), null;
		if (t) {
			let e;
			if (n) e = d.index.count;
			else if (d.attributes.position !== void 0) e = d.attributes.position.count;
			else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". The geometry must have either an index or a position attribute"), null;
			c.addGroup(l, e, u), l += e;
		}
	}
	if (n) {
		let t = 0, n = [];
		for (let r = 0; r < e.length; ++r) {
			let i = e[r].index;
			for (let e = 0; e < i.count; ++e) n.push(i.getX(e) + t);
			t += e[r].attributes.position.count;
		}
		c.setIndex(n);
	}
	for (let e in a) {
		let t = ou(a[e]);
		if (!t) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " attribute."), null;
		c.setAttribute(e, t);
	}
	for (let e in o) {
		let t = o[e][0].length;
		if (t !== 0) {
			c.morphAttributes = c.morphAttributes || {}, c.morphAttributes[e] = [];
			for (let n = 0; n < t; ++n) {
				let t = [];
				for (let r = 0; r < o[e].length; ++r) t.push(o[e][r][n]);
				let r = ou(t);
				if (!r) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
				c.morphAttributes[e].push(r);
			}
		}
	}
	return c;
}
function ou(e) {
	let t, n, r, i = -1, a = 0;
	for (let o = 0; o < e.length; ++o) {
		let s = e[o];
		if (t === void 0 && (t = s.array.constructor), t !== s.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
		if (n === void 0 && (n = s.itemSize), n !== s.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
		if (r === void 0 && (r = s.normalized), r !== s.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
		if (i === -1 && (i = s.gpuType), i !== s.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
		a += s.count * n;
	}
	let o = new t(a), s = new yn(o, n, r), c = 0;
	for (let t = 0; t < e.length; ++t) {
		let r = e[t];
		if (r.isInterleavedBufferAttribute) {
			let e = c / n;
			for (let t = 0, i = r.count; t < i; t++) for (let i = 0; i < n; i++) {
				let n = r.getComponent(t, i);
				s.setComponent(t + e, i, n);
			}
		} else o.set(r.array, c);
		c += r.count * n;
	}
	return i !== void 0 && (s.gpuType = i), s;
}
// src/daylight.ts
var su = 6.5, cu = 18, lu = (e) => Math.min(1, Math.max(0, e)), uu = (e, t, n) => {
	let r = lu((e - t) / (n - t));
	return r * r * (3 - 2 * r);
}, du = (e, t, n) => lu(1 - Math.abs(e - t) / n);
function fu(e) {
	return {
		daylight: uu(e, 5.5, 7.5) * (1 - uu(e, 17, 19)),
		warmth: Math.max(du(e, su, 1.6), du(e, cu, 1.6)),
		sunAngle: (.06 + .88 * lu((e - su) / 11.5)) * Math.PI
	};
}
function pu(e) {
	let t = lu((e - .08) / (.35 - .08));
	return 1 - t * t * (3 - 2 * t);
}
function mu(e, t = /* @__PURE__ */ new Date()) {
	return fu(e === "day" ? 12.5 : e === "dusk" ? 17.9 : e === "night" ? 0 : t.getHours() + t.getMinutes() / 60);
}
function hu(e, t, n, r = 1.6) {
	let i = 1 - Math.exp(-n * r);
	return e.daylight += (t.daylight - e.daylight) * i, e.warmth += (t.warmth - e.warmth) * i, e.sunAngle += (t.sunAngle - e.sunAngle) * i, e;
}
// src/life.ts
var gu = [
	"#c99a74",
	"#a8744e",
	"#75492e",
	"#d4ae8a",
	"#8e5f40"
], _u = [
	"#b8443a",
	"#2f78b0",
	"#c9a02a",
	"#c8c4b8",
	"#2a9068",
	"#7560cc",
	"#d0652a",
	"#27303c",
	"#c05a84"
], vu = [
	"#27323f",
	"#34507c",
	"#b3a583",
	"#6a2a26",
	"#1e5f5c",
	"#3c3c44"
], yu = [
	"#1a1410",
	"#2e1c12",
	"#5a3e1e",
	"#a8843c",
	"#4a4a4e"
], bu = [
	"#b8443a",
	"#c9a02a",
	"#2a9068",
	"#c8c4b8",
	"#2f78b0",
	"#d0652a"
], xu = "#1c1c22", Su = 860;
function Cu(e, t) {
	let n = new Fr(new pi(1, 1, 1), new Ri({
		roughness: 1,
		metalness: 0,
		flatShading: !0
	}), Su);
	n.name = "life", n.frustumCulled = !1;
	let r = 45, i = () => (r = r * 16807 % 2147483647) / 2147483647, a = (e) => e[Math.floor(i() * e.length)], o = (e, t) => e + i() * (t - e), s = new J(), c = 0;
	function l(e) {
		let t = c;
		for (let t of e) {
			if (c >= Su) throw Error("life: out of instances");
			n.setColorAt(c++, s.set(t));
		}
		return t;
	}
	let u = new nt(), d = new nt(), f = new nt(), p = new G();
	function m(e, t, n, r, i = 1) {
		u.makeRotationY(r).scale(p.set(i, i, i)).setPosition(e, t, n);
	}
	function h(e, t, r, i, a, o, s) {
		d.makeScale(a, o, s).setPosition(t, r, i).premultiply(u), n.setMatrixAt(e, d);
	}
	function g(e, t, r, i, a, o, s) {
		d.makeTranslation(0, -o / 2, 0).scale(p.set(s, o, s)), d.premultiply(f.makeRotationZ(a)).premultiply(f.makeTranslation(t, r, i)).premultiply(u), n.setMatrixAt(e, d);
	}
	function _(e, t = 1) {
		d.makeScale(0, 0, 0);
		for (let r = 0; r < t; r++) n.setMatrixAt(e + r, d);
	}
	function v(e, t, r, i, a, o, s, c) {
		d.makeRotationX(c).scale(p.set(a, o, s)).setPosition(t, r, i).premultiply(u), n.setMatrixAt(e, d);
	}
	let y = new Fr(new pi(1, 1, 1), new fr(), 40);
	y.name = "life-glow", y.frustumCulled = !1;
	let b = 0;
	function x(e) {
		let t = b;
		if (b + e > 40) throw Error("life: out of glowing instances");
		return b += e, t;
	}
	function S(e, t, n, r, i, a, o) {
		d.makeScale(i, a, o).setPosition(t, n, r).premultiply(u), y.setMatrixAt(e, d);
	}
	function C(e = 1, t = a(_u)) {
		let n = a(gu), r = a(vu);
		return {
			at: l([
				t,
				n,
				a(yu),
				r,
				r,
				n,
				n
			]),
			scale: e
		};
	}
	function w(e, t, n, r, i, a, o, s, c) {
		let l = e.at;
		m(t, n, r, i, e.scale), h(l, 0, 1.12, 0, .26, .6, .5), h(l + 1, 0, 1.6, 0, .34, .34, .34), h(l + 2, -.05, 1.79, 0, .36, .1, .4), g(l + 3, 0, .84, -.13, a, .84, .21), g(l + 4, 0, .84, .13, o, .84, .21), g(l + 5, 0, 1.4, -.33, s, .58, .15), g(l + 6, 0, 1.4, .33, c, .58, .15);
	}
	function T(e) {
		let t = (e % 2 + 2) % 2;
		return t < 1 ? {
			at: t,
			forward: !0
		} : {
			at: 2 - t,
			forward: !1
		};
	}
	let { ground: E } = t, D = [], O = E + .2, k = E + .14;
	for (let e = 0; e < 7; e++) {
		let e = o(-110, -20);
		D.push({
			who: C(),
			along: "x",
			fixed: o(t.boardwalk.from, t.boardwalk.to),
			from: e,
			to: e + o(60, 130),
			speed: o(1, 1.5),
			phase: i() * 2,
			y: O
		});
	}
	for (let e = 0; e < 8; e++) {
		let e = o(-90, -10);
		D.push({
			who: C(),
			along: "x",
			fixed: o(t.sand.from, t.sand.to),
			from: e,
			to: e + o(50, 110),
			speed: o(.9, 1.35),
			phase: i() * 2,
			y: k
		});
	}
	D.push({
		who: C(1, "#c8c4b8"),
		along: "x",
		fixed: t.boardwalk.to,
		from: -120,
		to: 120,
		speed: 3.3,
		phase: .3,
		y: O
	}), D.push({
		who: C(.62),
		along: "x",
		fixed: t.sand.to - 2,
		from: -8,
		to: 22,
		speed: 2.5,
		phase: 1.1,
		y: k
	}), D.push({
		who: C(),
		along: "z",
		fixed: 2.5,
		from: t.boardwalk.to + 2,
		to: t.shore + 1.5,
		speed: 1.1,
		phase: .2,
		y: k
	}), D.push({
		who: C(),
		along: "z",
		fixed: 46,
		from: t.boardwalk.to + 14,
		to: t.shore + 1,
		speed: 1,
		phase: 1.4,
		y: k
	});
	let A = {
		at: l([
			"#6a4a2a",
			"#6a4a2a",
			"#4a3018",
			"#4a3018",
			"#4a3018",
			"#4a3018",
			"#4a3018"
		]),
		owner: D[7]
	}, ee = [
		0,
		1,
		2
	].map((e) => ({
		who: C(1, a([
			"#27303c",
			"#2f78b0",
			"#b8443a"
		])),
		board: l([[
			"#e8e4d6",
			"#e0b02a",
			"#e0702a"
		][e]]),
		spray: l([
			"#eef4f4",
			"#eef4f4",
			"#eef4f4"
		]),
		line: e,
		way: e % 2 ? -1 : 1
	})), { court: j } = t, M = [
		{
			who: C(1, "#b8443a"),
			x: j.x - 4.6,
			z: j.z - 1.8,
			heading: 0
		},
		{
			who: C(1, "#2f78b0"),
			x: j.x + 4.6,
			z: j.z + 1.7,
			heading: Math.PI
		},
		{
			who: C(1, "#b8443a"),
			x: j.x - 3.4,
			z: j.z + 2,
			heading: 0
		},
		{
			who: C(1, "#2f78b0"),
			x: j.x + 3.5,
			z: j.z - 2.1,
			heading: Math.PI
		}
	], N = l(["#d8cf8a"]), te = 1.9, ne = C(1, "#27303c"), P = C(1, "#c9a02a"), F = l([
		"#6c7078",
		xu,
		xu
	]), re = C(1, "#2a9068"), ie = t.seats.slice(0, 20).map((e, t) => ({
		who: C(),
		seat: e,
		phase: t * 1.7
	})), I = l([
		"#8e8e92",
		"#9a9a9e",
		"#8e8e92",
		"#a4a4a8",
		"#9a9a9e"
	]);
	function ae(e, t, n, r) {
		let i = a(bu), o = a(gu), s = a(_u), c = a(vu);
		return {
			at: l([
				i,
				i,
				xu,
				i,
				xu,
				"#d8d0a8",
				xu,
				xu,
				s,
				o,
				a(bu),
				c,
				c,
				s,
				s
			]),
			z: e,
			sign: t,
			speed: n,
			offset: r
		};
	}
	let oe = [
		ae(t.front + .45, 1, 10.5, 20),
		ae(t.front + .45, 1, 8.6, 170),
		ae(t.front - .45, -1, 11.4, 90),
		ae(t.front - .45, -1, 9.2, 240),
		ae(t.back + 1, 1, 9.8, 130),
		ae(t.back - 1, -1, 10.8, 60)
	], L = [0, 1].map((e) => ({
		at: l(Array.from({ length: 14 }, () => "#d4dcdc")),
		line: e
	})), R = [
		0,
		1,
		2
	].map((e) => ({
		at: l(Array.from({ length: 14 }, () => "#5aa6c0")),
		face: l(Array.from({ length: 14 }, () => "#6cb4cc")),
		crest: l(Array.from({ length: 14 }, () => "#dfe8e8")),
		line: e
	})), se = [{
		at: l([
			"#c8c4b8",
			"#8a5a34",
			"#d8d4c8",
			"#b8443a"
		]),
		z: t.shore + 58,
		speed: .9,
		offset: 40
	}, {
		at: l([
			"#2f78b0",
			"#8a5a34",
			"#d8d4c8",
			"#c9a02a"
		]),
		z: t.shore + 84,
		speed: -.6,
		offset: 150
	}], ce = [], le = Math.PI / 2;
	for (let e of [{
		way: 1,
		speed: 8.5,
		offset: 60,
		z: t.shore + 13,
		height: 10.5
	}, {
		way: -1,
		speed: 7.4,
		offset: 215,
		z: t.shore + 25,
		height: 14.5
	}]) for (let t = 0; t < 5; t++) {
		let n = t * 3.4 + o(-.6, .6), r = o(-1.6, 1.6), a = o(-.7, .7), s = i() * 6;
		ce.push({
			at: l([
				"#e2e2dc",
				"#c6c9cc",
				"#c6c9cc"
			]),
			beat: i() * 6,
			size: 1.25,
			fly: (t) => ({
				x: ((t * e.speed + e.offset - n + 1440) % 360 - 180) * e.way,
				y: E + e.height + a + Math.sin(t * .31 + e.offset) * 1.6 + Math.sin(t * .9 + s) * .25,
				z: e.z + r + Math.sin(t * .17 + e.offset) * 3.5,
				heading: e.way > 0 ? 0 : Math.PI
			})
		});
	}
	let { party: z } = t, ue = [], B = [
		"#ff4fa3",
		"#3fe0d0",
		"#ffd21e",
		"#7cff6a",
		"#8b7cff",
		"#ff8a1e"
	], de = [], fe = (e) => {
		let t = e.x < z.x ? -1 : 1;
		return {
			from: {
				x: z.x + t * o(7.6, 10.4),
				z: z.dj.z - o(.6, 3)
			},
			via: {
				x: z.x + t * o(6.4, 7.4),
				z: z.dj.z + o(2.6, 3.4)
			}
		};
	};
	for (let e = 0; e < 12; e++) {
		let t = {
			x: z.x + (e % 4 - 1.5) * 2.5 + o(-.7, .7),
			z: z.z - 2.2 + Math.floor(e / 4) * 2.1 + o(-.5, .5)
		}, n = C(o(.94, 1.04)), r = {
			who: n,
			size: n.scale,
			...fe(t),
			spot: t,
			heading: le + o(-.7, .7),
			phase: i() * 6,
			style: e % 3,
			order: i()
		};
		e % 2 == 0 && (r.stick = x(1), de.push({
			at: r.stick,
			hex: B[e / 2 % B.length]
		})), ue.push(r);
	}
	for (let e of z.logs.slice(0, 4)) {
		let t = C(), n = {
			x: e.x,
			z: e.z
		};
		ue.push({
			who: t,
			size: t.scale,
			...fe(n),
			spot: n,
			heading: e.heading,
			phase: i() * 6,
			style: 0,
			order: i(),
			seat: e
		});
	}
	let V = C(1, "#27303c"), H = [
		"#ff6a1e",
		"#ff8a1e",
		"#ffb02e",
		"#ff7a1e",
		"#ffd86a",
		"#ff9a2e",
		"#ffe08a"
	], pe = x(H.length), me = x(6), he = x(z.lamps.length);
	for (let e = 0; e < 40; e++) y.setColorAt(e, s.set("#000000"));
	H.forEach((e, t) => y.setColorAt(pe + t, s.set(e).multiplyScalar(1.5)));
	for (let e = 0; e < 6; e++) y.setColorAt(me + e, s.set("#ffc45a").multiplyScalar(1.6));
	for (let e of de) y.setColorAt(e.at, s.set(e.hex).multiplyScalar(1.5));
	y.count = b, d.makeScale(0, 0, 0);
	for (let e = 0; e < b; e++) y.setMatrixAt(e, d);
	y.visible = !1, e.add(y);
	let ge = new Fr(new mi(1, 20).rotateX(-Math.PI / 2), new fr({
		map: t.poolMap,
		transparent: !0,
		opacity: .42,
		blending: 2,
		depthWrite: !1
	}), 5);
	ge.name = "life-sweeps", ge.frustumCulled = !1, ge.renderOrder = 1, ge.visible = !1;
	for (let e = 0; e < 5; e++) ge.setColorAt(e, s.set("#000000"));
	e.add(ge);
	let _e = new Ea("#ff8a3c", 0, 44, 1.5);
	_e.position.set(z.fire.x, E + 2.3, z.fire.z), _e.visible = !1, e.add(_e);
	let ve = t.lean ? null : new Ea("#ff4fa3", 0, 30, 1.5);
	ve && (ve.position.set(z.x, E + 4.6, z.z - 1.5), ve.visible = !1, e.add(ve));
	let ye = {
		x: z.x,
		half: 8.5,
		run: 14,
		from: z.dj.z - 1.4,
		to: z.fire.z + 3.8
	};
	function be(e, t) {
		if (t <= ye.from || t >= ye.to) return t;
		let n = U.clamp((ye.half + ye.run - Math.abs(e - ye.x)) / ye.run, 0, 1);
		if (n <= 0) return t;
		let r = (ye.from + ye.to) / 2, i = Math.abs(t - r) / ((ye.to - ye.from) / 2);
		return t + ((t < r ? ye.from - (1 - i) * 1.2 : ye.to + (1 - i) * 1.2) - t) * n * n * (3 - 2 * n);
	}
	n.count = c;
	for (let e = 0; e < c; e++) _(e);
	n.instanceColor && (n.instanceColor.needsUpdate = !0), e.add(n);
	let xe = {
		far: 34,
		run: 30,
		speed: 1.3
	}, Se = {
		from: 5,
		to: 22
	}, Ce = {
		from: 1.05,
		depth: 1.9
	}, we = E + .05;
	function Te(e, n) {
		let r = (e * xe.speed + n * (xe.run / 3)) % xe.run, i = Math.sin(Math.min(1, r / (xe.run * .66)) * le) * Math.min(1, (xe.run - r) / 5) * .67;
		return {
			travel: r,
			z: t.shore + xe.far - r,
			height: i
		};
	}
	let Ee = 0, De = -1, Oe = -1, ke = 0, Ae = new J(), je = (e, t, n) => U.smoothstep(e, t, n);
	return {
		setNight(e) {
			Ee = U.clamp(e, 0, 1);
		},
		update(e) {
			let r = Number.isFinite(e) ? Math.max(e, 0) : 0, i = U.clamp(r - ke, 0, .1);
			ke = r;
			let a = +(Ee > .55);
			De = De < 0 ? a : U.clamp(De + Math.sign(a - De) * (i / 12), 0, 1);
			for (let e of D) {
				let t = e.to - e.from, { at: n, forward: i } = T(r * e.speed / t + e.phase), a = e.from + n * t, o = Math.sin(r * e.speed * 2.6 + e.phase * 9) * Math.min(.75, .42 + e.speed * .1), s = e.along === "x" ? a : e.fixed, c = e.along === "x" ? e.fixed : a, l = e.along === "x" ? i ? 0 : Math.PI : i ? -le : le;
				if (e.along === "x" && e.y === k) {
					let t = i ? .4 : -.4;
					c = be(s, e.fixed), l = Math.atan2(-(be(s + t, e.fixed) - c), t);
				}
				if (w(e.who, s, e.y, c, l, o, -o, -o * .8, o * .8), e === A.owner) {
					m(s + (i ? 1 : -1) * .9, e.y, c + .8, l, 1);
					let t = Math.sin(r * 9) * .5;
					h(A.at, 0, .42, 0, .7, .26, .26), h(A.at + 1, .42, .56, 0, .26, .24, .24), g(A.at + 2, -.36, .52, 0, -2.2 + Math.sin(r * 7) * .3, .28, .07), g(A.at + 3, .24, .32, -.09, t, .32, .08), g(A.at + 4, .24, .32, .09, -t, .32, .08), g(A.at + 5, -.24, .32, -.09, -t, .32, .08), g(A.at + 6, -.24, .32, .09, t, .32, .08);
				}
			}
			Oe = U.clamp(Oe < 0 ? +(Ee < .3) : Oe + i / 10 * (Ee < .3 ? 1 : -1), 0, 1);
			let o = Oe * Oe * (3 - 2 * Oe);
			for (let e of ee) {
				if (Oe <= 0) {
					_(e.who.at, 7), _(e.board), _(e.spray, 3);
					continue;
				}
				let n = Te(r, e.line), i = Oe >= 1 && n.travel > Se.from && n.travel < Se.to, a = -21 + e.line * 11;
				if (e.who.scale = Math.min(1, Oe * 5), i) {
					let t = (n.travel - Se.from) / (Se.to - Se.from), i = a + e.way * (t - .5) * 16, o = .52 + Math.sin(r * 1.1 + e.line * 2) * .14, s = n.z - Ce.from - Ce.depth * o, c = we + n.height * (1 - o) + .12, l = Math.atan2(n.height, Ce.depth), u = Math.sin(r * 2.3 + e.line) * .12;
					m(i, c, s, 0), v(e.board, 0, 0, 0, 2.5, .09, .62, -l);
					for (let t = 0; t < 3; t++) {
						let i = (r * 2.6 + t / 3 + e.line * .37) % 1, a = (.34 - i * .2) * Math.min(1, n.height * 2.4);
						h(e.spray + t, -e.way * (1.25 + i * 1.5), .1 + i * (.5 - i) * 1.6, .12 + (t - 1) * .16 - i * .3, a, a, a);
					}
					w(e.who, i, c + .04, s, le, .5 + u, -.35 + u, le + .3, -le - .3);
				} else {
					let i = n.travel >= Se.to ? (n.travel - Se.to) / (xe.run - Se.to + Se.from) : (n.travel + xe.run - Se.to) / (xe.run - Se.to + Se.from), s = i - Math.floor(i), c = a + e.way * (.5 - s) * 16, l = t.shore + 2 + (xe.far - Se.to + (Se.to - Se.from) * s - 2) * o, u = E + .15 + Math.sin(r * 1.7 + e.line) * .04;
					m(c, u, l, -le), h(e.board, 0, 0, 0, 2.5, .09, .62), _(e.spray, 3);
					let d = r * 4 + e.line;
					w(e.who, c, u - .72, l, -le, .5, .5, 1.2 + Math.sin(d) * .7, 1.2 - Math.sin(d) * .7);
				}
			}
			let c = Math.floor(r / te), l = r / te - c, b = M[c % 4], x = M[(c + 1) % 4];
			m(0, 0, 0, 0), h(N, b.x + (x.x - b.x) * l, E + 2.25 + 10.8 * l * (1 - l), b.z + (x.z - b.z) * l, .3, .3, .3);
			for (let e of M) {
				let t = 0;
				e === x && l > .72 && (t = Math.sin((l - .72) / .28 * le)), e === b && l < .28 && (t = Math.cos(l / .28 * le));
				let n = Math.sin(r * 3.1 + e.x) * .22 * (1 - t), i = t > .05 ? Math.PI - .25 : .5 + Math.sin(r * 2 + e.z) * .15;
				w(e.who, e.x + Math.sin(r * .9 + e.z) * .5, k + t * .5, e.z, e.heading, n, -n, i, i);
			}
			let C = .5 - .5 * Math.cos(r * 2.4);
			w(ne, t.pullUp.x, E + t.pullUp.bar - 1.96 + C * .34, t.pullUp.z, -le, -.25 - C * .3, -.25 - C * .3, Math.PI, Math.PI);
			let O = 2.25 + (.5 - .5 * Math.cos(r * 1.8)) * (Math.PI - 2.25);
			w(P, t.mat.x - 1.2, E + .23, t.mat.z, -le, .12, -.12, O, O);
			{
				let e = 1.4 - Math.cos(O) * .58, n = Math.sin(O) * .58;
				m(t.mat.x - 1.2, E + .23, t.mat.z, -le), h(F, n, e + .04, 0, .06, .06, 1.7), h(F + 1, n, e + .04, -.78, .1, .42, .1), h(F + 2, n, e + .04, .78, .1, .42, .1);
			}
			let j = Math.sin(r * 6.5);
			w(re, t.mat.x + 1.6, E + .23 + Math.abs(Math.sin(r * 5)) * .06, t.mat.z + .6, Math.PI * .75, .25, -.25, j > 0 ? le + .2 : .9, j > 0 ? .9 : le + .2);
			for (let e of ie) {
				let t = 1 + Math.max(0, Math.sin(r * 1.3 + e.phase)) * .9;
				w(e.who, e.seat.x, e.seat.y - .74, e.seat.z, e.seat.heading, 1.45, 1.45, .9, t);
			}
			m(0, 0, 0, 0);
			for (let e = 0; e < 5; e++) {
				let n = (r * .22 + e / 5) % 1, i = (.22 + n * .75) * (1 - n * n);
				h(I + e, t.grill.x + 2.9 + n * n * 2.2, E + 2.9 + n * 4.2, t.grill.z + Math.sin(e * 2.4 + n * 3) * .3, i, i, i);
			}
			for (let e of oe) {
				let n = (r * e.speed + e.offset) % (t.reach * 2) - t.reach, i = e.at;
				m(n * e.sign, E + .04, e.z, e.sign > 0 ? 0 : Math.PI), h(i, .02, .32, 0, .9, .1, .36), h(i + 1, -.44, .54, 0, .62, .4, .4), h(i + 2, -.38, .79, 0, .66, .1, .36), h(i + 3, .5, .66, 0, .14, .78, .42), h(i + 4, .5, 1.1, 0, .1, .08, .64), h(i + 5, .59, .94, 0, .08, .14, .2), h(i + 6, .7, .22, 0, .44, .44, .14), h(i + 7, -.62, .22, 0, .44, .44, .14), h(i + 8, -.32, 1.16, 0, .26, .58, .46), h(i + 9, -.3, 1.62, 0, .32, .32, .32), h(i + 10, -.3, 1.72, 0, .38, .22, .38), g(i + 11, -.3, .92, -.15, 1.15, .66, .19), g(i + 12, -.3, .92, .15, 1.15, .66, .19), g(i + 13, -.26, 1.4, -.3, 1.25, .72, .14), g(i + 14, -.26, 1.4, .3, 1.25, .72, .14);
			}
			m(0, 0, 0, 0);
			for (let { at: e, line: n } of L) for (let i = 0; i < 14; i++) {
				let a = Math.sin(r * .55 + n * 2.2 + i * .35), o = t.shore + 2.2 + n * 2.6 + a * 1.5;
				h(e + i, -250 + i * 38 + n * 17 + Math.sin(r * .1 + i) * 2, E + .17 - n * .015, o, 24 + (i * 7 + n * 3) % 10, .04, .5 + (a + 1) * .25);
			}
			for (let { at: e, face: t, crest: n, line: i } of R) {
				let a = Te(r, i);
				for (let r = 0; r < 14; r++) {
					let o = -255 + r * 39 + i * 11, s = 26 + (r * 5 + i * 4) % 9, c = a.z + (r === 6 ? 0 : Math.sin(r * 1.9 + i) * .8);
					if (a.height < .07) {
						_(e + r), _(t + r), _(n + r);
						continue;
					}
					h(e + r, o, we + a.height / 2 - .2, c, s, a.height + .4, 2.2), v(t + r, o, we + a.height / 2 - .08, c - Ce.from - Ce.depth / 2, s - .3, .1, Math.hypot(Ce.depth, a.height) + .5, -Math.atan2(a.height, Ce.depth));
					let l = Math.max(0, a.height - .25);
					l > .02 ? h(n + r, o, we + a.height + l * .25, c - .62, s * .94, l * .5 + .06, .9) : _(n + r);
				}
			}
			for (let e of se) m(((r * e.speed + e.offset) % 420 + 420) % 420 - 210, E + .09 + Math.sin(r * .9 + e.offset) * .06, e.z, e.speed > 0 ? 0 : Math.PI), h(e.at, 0, .3, 0, 4.4, .6, 1.5), h(e.at + 1, .3, 2.6, 0, .12, 4, .12), h(e.at + 2, -.75, 2.5, 0, 1.9, 2.9, .06), h(e.at + 3, .3, 4.75, 0, .5, .3, .04);
			let ae = 1 - je(Ee, .15, .55);
			for (let e of ce) {
				if (ae <= .01) {
					_(e.at, 3);
					continue;
				}
				let { x: t, y: i, z: a, heading: o } = e.fly(r);
				m(t, i + (1 - ae) * 26, a, o, e.size * ae), h(e.at, 0, 0, 0, .5, .12, .14);
				let s = Math.sin(r * .7 + e.beat) > -.2 ? Math.sin(r * 9 + e.beat) * .7 : .12;
				for (let t of [-1, 1]) d.makeTranslation(0, 0, t * .4).scale(p.set(.3, .035, .8)), d.premultiply(f.makeRotationX(-t * s)).premultiply(f.makeTranslation(.02, .04, t * .06)).premultiply(u), n.setMatrixAt(e.at + (t < 0 ? 1 : 2), d);
			}
			let B = r * Math.PI * 4, de = De > 0;
			for (let e of ue) {
				let t = U.clamp(De * 1.5 - e.order * .5, 0, 1);
				if (t <= 0) {
					_(e.who.at, 7), e.stick !== void 0 && S(e.stick, 0, -50, 0, 0, 0, 0);
					continue;
				}
				let n = E + .14, i = .5, o = .5;
				if (t < 1) {
					e.who.scale = e.size * Math.min(1, t * 10);
					let o = Math.hypot(e.via.x - e.from.x, e.via.z - e.from.z), s = Math.hypot(e.spot.x - e.via.x, e.spot.z - e.via.z), c = t * (o + s), [l, u, d] = c < o ? [
						e.from,
						e.via,
						c / o
					] : [
						e.via,
						e.spot,
						(c - o) / s
					], f = l.x + (u.x - l.x) * d, p = l.z + (u.z - l.z) * d, m = a === 1 ? 1 : -1, h = Math.sin(r * 7 + e.phase) * .6;
					w(e.who, f, n, p, Math.atan2(-(u.z - l.z) * m, (u.x - l.x) * m), h, -h, -h * .8, h * .8), i = -h * .8;
				} else if (e.seat) {
					e.who.scale = e.size;
					let t = 1.15 + Math.sin(r * .8 + e.phase) * .15;
					w(e.who, e.seat.x, e.seat.y - .74 + Math.abs(Math.sin(B / 2 + e.phase)) * .03, e.seat.z, e.seat.heading, 1.45, 1.45, t, t), i = t;
				} else {
					e.who.scale = e.size;
					let t = Math.abs(Math.sin(B / 2 + e.phase)), a = Math.sin(B / 4 + e.phase), s = e.heading, c = t * .08, l = a * .25;
					e.style === 0 ? (c = t * .24, i = Math.PI - .35 + Math.sin(B + e.phase) * .25, o = Math.PI - .35 - Math.sin(B + e.phase) * .25, l = .12) : e.style === 1 ? (i = 1 + a * .8, o = 1 - a * .8) : (s += Math.sin(r * .6 + e.phase) * 1.1, i = Math.PI - .5 + Math.sin(B + e.phase) * .4, o = .7 + t * .3), w(e.who, e.spot.x + a * .22, n + c, e.spot.z, s, l, -l, i, o);
				}
				e.stick !== void 0 && S(e.stick, Math.sin(i) * .74, 1.4 - Math.cos(i) * .74, -.33, .07, .3, .07);
			}
			if (de) {
				V.scale = Math.min(1, De * 6);
				let e = Math.abs(Math.sin(B / 2));
				w(V, z.dj.x + Math.sin(B / 8) * .25, z.dj.y + e * .05, z.dj.z, -le, .1, -.1, Math.PI - .6 + Math.sin(B) * .35, 1.25);
			} else _(V.at, 7);
			let fe = je(Ee, .35, .8), ye = fe > .01;
			if (y.visible = ge.visible = ye, _e.visible = ye, ve && (ve.visible = ye), ye) {
				m(z.fire.x, E + .3, z.fire.z, 0);
				for (let e = 0; e < H.length; e++) {
					let t = .5 + .5 * Math.sin(r * (7 + e * 1.3) + e * 2.1), n = e >= 4, i = (n ? 1 : .55) * (.55 + t * .45) * fe, a = e * 1.57 + r * .4, o = n ? .08 * (e - 5) : .3;
					S(pe + e, Math.cos(a) * o, i / 2, Math.sin(a) * o, n ? .3 : .34, i, n ? .3 : .34);
				}
				for (let e = 0; e < 6; e++) {
					let t = (r * .45 + e / 6) % 1, n = .09 * (1 - t) * fe;
					S(me + e, Math.sin(e * 2.4 + t * 5) * .5, .9 + t * 3.4, Math.cos(e * 1.7 + t * 4) * .5, n, n, n);
				}
				_e.intensity = 20 * fe * (.86 + .14 * Math.sin(r * 11) * Math.sin(r * 7.3));
				let e = .75 + .25 * Math.abs(Math.sin(B / 2)) ** 3;
				m(0, 0, 0, 0), z.lamps.forEach((t, n) => {
					Ae.setHSL((r * .07 + n / z.lamps.length) % 1, 1, .55), S(he + n, t.x, t.y, t.z, .36, .3, .36), y.setColorAt(he + n, s.copy(Ae).multiplyScalar(1.7 * fe * e)), n < 5 && (d.makeScale(3.1, 1, 3.1).setPosition(z.x + Math.sin(r * .6 + n * 1.26) * 5, E + .2 + n * .004, z.z + Math.sin(r * .83 + n * 2.1) * 2.8), ge.setMatrixAt(n, d), ge.setColorAt(n, s.copy(Ae).multiplyScalar(fe * e)));
				}), ve && (ve.color.setHSL(r * .07 % 1, .85, .6), ve.intensity = 34 * fe * e), y.instanceMatrix.needsUpdate = !0, ge.instanceMatrix.needsUpdate = !0, y.instanceColor && (y.instanceColor.needsUpdate = !0), ge.instanceColor && (ge.instanceColor.needsUpdate = !0);
			}
			n.instanceMatrix.needsUpdate = !0;
		}
	};
}
// src/pixel.ts
function wu(e, t = 6, n = .12) {
	return e.onBeforeCompile = (e) => {
		e.uniforms.uPix = { value: new W(t, n) }, e.vertexShader = e.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vPixPos;").replace("#include <begin_vertex>", "#include <begin_vertex>\n        vec4 pixWorld = vec4(transformed, 1.0);\n        #ifdef USE_INSTANCING\n          pixWorld = instanceMatrix * pixWorld;\n        #endif\n        vPixPos = (modelMatrix * pixWorld).xyz;"), e.fragmentShader = e.fragmentShader.replace("#include <common>", "#include <common>\n        varying vec3 vPixPos;\n        uniform vec2 uPix;\n        float pixHash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }").replace("#include <map_fragment>", "#include <map_fragment>\n        {\n          // Nudged off the grid, so a face lying exactly on a cell boundary does not flicker between two cells.\n          vec3 pixCell = floor(vPixPos * uPix.x + 0.013);\n          // How many cells one screen pixel covers: past about one, the pattern would only shimmer.\n          float pixDensity = max(fwidth(vPixPos.x), max(fwidth(vPixPos.y), fwidth(vPixPos.z))) * uPix.x;\n          diffuseColor.rgb *= 1.0 + (pixHash(pixCell) - 0.5) * 2.0 * uPix.y * clamp(1.3 - pixDensity, 0.0, 1.0);\n        }");
	}, e.customProgramCacheKey = () => `pixelate:${t}:${n}`, e;
}
// src/outdoors.ts
var Tu = -.5, Eu = 150, Du = {
	front: {
		z: 30,
		width: 9
	},
	back: {
		z: -31,
		width: 8
	},
	side: {
		x: 44,
		width: 8
	}
}, Ou = 1.9;
function ku() {
	let e = document.createElement("canvas");
	e.width = e.height = 128;
	let t = e.getContext("2d"), n = t.createRadialGradient(64, 64, 0, 64, 64, 64);
	return n.addColorStop(0, "rgba(255,255,255,1)"), n.addColorStop(.35, "rgba(255,255,255,0.45)"), n.addColorStop(1, "rgba(255,255,255,0)"), t.fillStyle = n, t.fillRect(0, 0, 128, 128), new li(e);
}
var Au = typeof window < "u" && window.matchMedia?.("(pointer: coarse)").matches === !0;
function ju(t, n) {
	let i = (e, t = 1, n = 3, r = .12) => wu(new Ri({
		color: e,
		roughness: t,
		metalness: 0,
		flatShading: !0
	}), n, r), a = (e) => new fr({ color: e }), o = {
		grass: i("#3d6a4a", 1, 2, .16),
		park: i("#4f8a5e", 1, 2, .16),
		road: i("#34343c", 1, 2, .14),
		walk: i("#8d8d98", 1, 2, .1),
		line: i("#cfcfc8", .9, 4, .04),
		wallA: i("#b3a898"),
		wallB: i("#8f99a6"),
		wallC: i("#b89a7c"),
		roofA: i("#4a3f46"),
		roofB: i("#8a4e3a"),
		wood: i("#7a5232"),
		dark: i("#26262c", .6),
		window: a(n("#ffc887", .78)),
		windowOff: a("#0d1016"),
		leafA: i("#3f9a62", 1, 3, .2),
		leafB: i("#2f8055", 1, 3, .2),
		palm: i("#3a9460", 1, 3, .18),
		water: new Ri({
			color: "#2a7fa8",
			roughness: .3,
			metalness: .1
		}),
		lamp: a(n(Q.peach, .95)),
		hill: i("#2a3a3c"),
		ridgeNear: i("#2f4a42", 1, .5, .1),
		ridgeMid: i("#476560", 1, .5, .08),
		ridgeFar: i("#64818a", 1, .5, .06),
		concrete: i("#8c8f96", 1, 1, .08),
		jade: i("#3f8a86", .5, 1, .1),
		jadeDark: i("#2a5f60", .5, 1, .1),
		signPink: a(n(Q.pink, .9)),
		signTeal: a(n("#3fe0d0", .85)),
		carWhite: i("#d4d4d0", .35, 6, .03),
		leather: i("#6a1422", .7),
		carGlass: new Ri({
			color: "#cfe4f2",
			transparent: !0,
			opacity: .42,
			roughness: .04,
			metalness: .35,
			depthWrite: !1
		}),
		carA: i("#7d2f2a", .5),
		carB: i("#2f4f7d", .5),
		carC: i("#8a8a92", .5),
		sand: i("#b8975c", 1, 2, .1),
		wetSand: i("#8f7a52", 1, 2, .1),
		sea: new Ri({
			color: "#1f86ad",
			roughness: .82,
			metalness: 0
		}),
		deck: i("#8f6a42", 1, 2, .16),
		white: i("#b9b6ae"),
		coral: i("#b5503c"),
		teal: i("#2c8a86"),
		sun: i("#c2962a"),
		thatch: i("#9a8048", 1, 3, .22),
		steel: i("#6c7078", .5),
		ember: a("#ff7a2a"),
		flame: a(n("#ff9a3c", .95)),
		net: new fr({
			color: "#e8e8e8",
			transparent: !0,
			opacity: .45,
			depthWrite: !1
		}),
		pool: new fr({
			color: "#ffb877",
			map: ku(),
			transparent: !0,
			opacity: .16,
			blending: 2,
			depthWrite: !1
		}),
		poolBeach: new fr({
			color: "#ffb066",
			map: ku(),
			transparent: !0,
			opacity: 0,
			blending: 2,
			depthWrite: !1
		})
	}, s = new pi(1, 1, 1).toNonIndexed(), c = new pi(1, 1, 1).translate(.5, 0, 0).toNonIndexed(), l = new gi(Math.SQRT1_2, 1, 4).rotateY(Math.PI / 4).toNonIndexed(), u = s, d = new mi(1, 20).rotateX(-Math.PI / 2).toNonIndexed(), f = /* @__PURE__ */ new Map(), p = new nt(), m = new Pe(), h = new ft(0, 0, 0, "YXZ");
	function g(e, t, n = 0, r = Tu) {
		let i = new nt().makeRotationY(n).setPosition(e, r, t);
		return (e, t, n, r, a, o, s, c, l = 0, u = 0, d = 0) => {
			m.setFromEuler(h.set(d, l, u)), p.compose(new G(n, r, a), m, new G(o, s, c));
			let g = t.clone().applyMatrix4(p.premultiply(i)), _ = f.get(e);
			_ || f.set(e, _ = []), _.push(g);
		};
	}
	let _ = g(0, 0), v = {
		across: 8,
		up: 8,
		width: 3.2,
		height: 3.6
	};
	function y(t, n, i, a) {
		let o = a, s = () => (o = o * 16807 % 2147483647) / 2147483647, c = (e, t) => {
			let n = document.createElement("canvas");
			n.width = n.height = 128;
			let r = n.getContext("2d");
			return r.fillStyle = t, r.fillRect(0, 0, 128, 128), {
				canvas: n,
				g: r,
				paint: e
			};
		}, l = c((e, n, r, i, a) => {
			e.fillStyle = t, e.fillRect(n, r, i, a), e.fillStyle = "rgba(255,255,255,0.10)", e.fillRect(n, r, i, a / 3);
		}, n), u = c((e, t, n, r, i, a) => {
			a && (e.fillStyle = s() < .8 ? "#e0b070" : "#a8c4e0", e.fillRect(t, n, r, i));
		}, "#000000"), d = 128 / v.across;
		for (let e = 0; e < v.up; e++) {
			let t = i * (.55 + s() * .9);
			for (let n = 0; n < v.across; n++) {
				let r = s() < t;
				for (let t of [l, u]) t.paint(t.g, n * d + 2, e * d + 3, d - 4, d - 6, r);
			}
		}
		let f = (t) => {
			let n = new li(t);
			return n.wrapS = n.wrapT = e, n.magFilter = r, n.colorSpace = k, n;
		};
		return {
			map: f(l.canvas),
			emissive: f(u.canvas)
		};
	}
	let b = [
		y("#5f86a8", "#2c3a48", .8, 11),
		y("#7a6a58", "#3a322c", .72, 23),
		y("#6a8a8c", "#8c8f96", .66, 37)
	].map(({ map: e, emissive: t }) => new Ri({
		map: e,
		emissiveMap: t,
		emissive: new J("#ffffff"),
		emissiveIntensity: 0,
		roughness: .45,
		metalness: .1
	})), x = b.map(() => []);
	function S(e, t, n, r, i, a, o = 0) {
		let c = s.clone(), l = c.getAttribute("uv");
		for (let e = 0; e < 6; e++) {
			let t = e < 2 ? a : r;
			for (let n = 0; n < 6; n++) {
				let r = e * 6 + n;
				e === 2 || e === 3 ? l.setXY(r, .01, .01) : l.setXY(r, l.getX(r) * t / (v.across * v.width), l.getY(r) * i / (v.up * v.height));
			}
		}
		c.applyMatrix4(new nt().makeScale(r, i, a).setPosition(t, Tu + o + i / 2, n)), x[e % b.length].push(c);
	}
	let C = 20261114, w = () => (C = C * 16807 % 2147483647) / 2147483647, T = (e) => e[Math.floor(w() * e.length)];
	_("grass", s, 0, -.5, 0, 1800, 1, 1800);
	let { front: E, back: D, side: O } = Du;
	for (let e of [E, D]) _("road", s, 0, .025, e.z, 300, .05, e.width);
	for (let e of [-1, 1]) _("road", s, e * O.x, .02, (E.z - Eu) / 2, O.width, .04, Eu + E.z);
	function A(e) {
		let t = e.map((e) => [e.centre - e.width / 2 - Ou, e.centre + e.width / 2 + Ou]).sort((e, t) => e[0] - t[0]), n = [], r = -150;
		for (let [e, i] of t) n.push([r, e]), r = i;
		return n.push([r, Eu]), n;
	}
	let ee = A([{
		centre: -O.x,
		width: O.width
	}, {
		centre: O.x,
		width: O.width
	}]), j = A([{
		centre: D.z,
		width: D.width
	}, {
		centre: E.z,
		width: E.width
	}]).slice(0, 2);
	for (let e of [E, D]) for (let t of [-1, 1]) {
		let n = e.z + t * (e.width / 2 + Ou / 2);
		if (e === E && t === 1) _("walk", s, 0, .06, n, 300, .12, Ou);
		else for (let [e, t] of A([{
			centre: -O.x,
			width: O.width - Ou * 2
		}, {
			centre: O.x,
			width: O.width - Ou * 2
		}])) _("walk", s, (e + t) / 2, .06, n, t - e, .12, Ou);
	}
	for (let e of [-1, 1]) for (let t of [-1, 1]) {
		let n = e * O.x + t * (O.width / 2 + Ou / 2);
		for (let [e, t] of j) _("walk", s, n, .06, (e + t) / 2, Ou, .12, t - e);
	}
	for (let e of [E, D]) for (let [t, n] of ee) for (let r = t + 2; r < n - 2; r += 6) _("line", s, r, .07, e.z, 2.6, .04, .24);
	for (let e of [-1, 1]) for (let [t, n] of j) for (let r = t + 2; r < n - 2; r += 6) _("line", s, e * O.x, .06, r, .24, .04, 2.6);
	let M = Hl.depth / 2;
	for (let e = 0; e < 3; e++) {
		let t = .5 - (e + 1) * .125;
		_("walk", s, 0, t / 2, M + .3 + e * .6, 7 + e * .5, t, .6);
	}
	let N = E.z - E.width / 2 - Ou;
	_("walk", s, 0, .05, (M + 1.8 + N) / 2, 5, .1, N - M - 1.8);
	function te(e, t, n = 1) {
		let r = g(e, t, Math.floor(w() * 4) * (Math.PI / 2)), i = (1.6 + w() * .8) * n;
		r("wood", u, 0, i / 2, 0, .32 * n, i, .32 * n);
		let a = (1.5 + w() * .5) * n, o = ["leafA", "leafB"], c = Math.floor(w() * 2);
		r(o[c], s, 0, i + a * .35, 0, a * 2.1, a * .9, a * 2.1), r(o[1 - c], s, (w() - .5) * a * .3, i + a * 1.1, (w() - .5) * a * .3, a * 1.5, a * .7, a * 1.5), r(o[c], s, (w() - .5) * a * .3, i + a * 1.7, (w() - .5) * a * .3, a * .85, a * .55, a * .85);
	}
	function ne(e, t, n = 1) {
		let r = g(e, t, 0);
		r(T(["leafA", "leafB"]), s, 0, .45 * n, 0, 1.6 * n, .9 * n, 1.4 * n), r(T(["leafA", "leafB"]), s, .1 * n, 1.05 * n, -.1 * n, .9 * n, .4 * n, .8 * n);
	}
	function P(e, t, n = 7) {
		let r = g(e, t, w() * Math.PI * 2), i = (w() - .5) * .12;
		r("wood", u, i * n * .5, n / 2, 0, .3, n, .3, 0, -i);
		for (let e = 0; e < 7; e++) {
			let t = e / 7 * Math.PI * 2;
			r("palm", c, i * n, n, 0, 2.3 + w() * .6, .07, .55, t, -.38 - w() * .25);
		}
	}
	function F(e, t, n) {
		let r = g(e, t, n);
		r("dark", u, 0, 2.1, 0, .14, 4.2, .14), r("dark", s, 0, 4.2, .6, .1, .1, 1.3), r("lamp", s, 0, 4.12, 1.1, .34, .07, .5), r("pool", d, 0, .14, 1.4, 5.5, 1, 5.5);
	}
	function re(e, t, n) {
		let r = g(e, t, n);
		r(T([
			"carA",
			"carB",
			"carC"
		]), s, 0, .62, 0, 4.1, .7, 1.8), r("dark", s, -.2, 1.2, 0, 2.2, .55, 1.6), r("dark", s, 0, .2, 0, 3.4, .4, 1.9);
	}
	let ie = E.z + E.width / 2 + Ou, I = D.z - D.width / 2 - Ou, ae = O.x + O.width / 2 + Ou, oe = 4545, L = () => (oe = oe * 16807 % 2147483647) / 2147483647;
	function R(e, t, n, r, i) {
		let a = Math.floor(w() * b.length), o = g(e, t, 0);
		o("concrete", s, 0, 1.6, 0, n + 1.2, 3.2, r + 1.2), o("windowOff", s, 0, 1.5, r / 2 + .62, n * .5, 2.4, .06), o("windowOff", s, 0, 1.5, -r / 2 - .62, n * .5, 2.4, .06);
		let c = i > 26 && w() < .7 ? i * (.55 + w() * .2) : i;
		S(a, e, t, n, c - 3.2, r, 3.2), c < i && S(a, e, t, n * .74, i - c, r * .74, c);
		let l = c < i ? .74 : 1;
		o("concrete", s, 0, i + .25, 0, n * l + .4, .5, r * l + .4);
		let d = L();
		if (d < .75) {
			let e = d < .4 ? "lamp" : d < .58 ? "signTeal" : "signPink", t = (t, n, r) => {
				for (let i of [-1, 1]) o(e, s, 0, t, i * r / 2, n + .3, .3, .3);
				for (let i of [-1, 1]) o(e, s, i * n / 2, t, 0, .3, .3, r - .3);
			};
			t(i + .72, n * l + .4, r * l + .4), c < i && t(c + .2, n + .3, r + .3);
		}
		o("dark", s, (w() - .5) * n * .3, i + 1.5, (w() - .5) * r * .3, n * l * .4, 2, r * l * .4), i > 30 && w() < .6 && (o("steel", u, 0, i + 5.5, 0, .3, 7, .3), o("ember", s, 0, i + 9.2, 0, .5, .5, .5));
	}
	function se(e, t, n, r, i) {
		let a = g(e, t, n);
		a("white", s, 0, 11 / 2, 0, r, 11, i), a("concrete", s, 0, 11.3, 0, r + .8, .6, i + .8), a("window", s, 0, 3.4, i / 2 + .04, r * .86, 5.6, .08);
		for (let e = 0; e <= 8; e++) a("dark", s, -r * .43 + e * r * .86 / 8, 3.4, i / 2 + .1, .24, 5.6, .1);
		a("dark", s, 0, 3.4, i / 2 + .1, r * .86, .22, .1), a("dark", s, 0, 6.5, i / 2 + 1.6, r * .5, .3, 3.2), a("signPink", s, -r * .2, 8.6, i / 2 + .1, r * .3, 1.5, .16), a("signTeal", s, r * .24, 8.6, i / 2 + .1, r * .2, 1.5, .16), a("lamp", s, 0, 6.3, i / 2 + 3.1, r * .5, .1, .1), a("concrete", s, r / 2 - 2, 15, i / 2 - 2, 3, 8, 3), a("signPink", s, r / 2 - 2, 16, i / 2 - .44, 2.2, 4.4, .12), a("signTeal", s, r / 2 - .44, 16, i / 2 - 2, .12, 4.4, 2.2);
		for (let e of [-1, 1]) a("windowOff", s, e * (r / 2 + .04), 6.2, 0, .08, 2, i * .7);
		for (let e = 0; e < 4; e++) a("steel", s, -r * .3 + e * r * .18, 12.3, -i * .2, 3, 1.4, 2.4);
		for (let a = -2; a <= 2; a++) {
			if (a === 0) continue;
			let o = a * r / 6;
			te(e + Math.cos(n) * o + Math.sin(n) * (i / 2 + 5), t - Math.sin(n) * o + Math.cos(n) * (i / 2 + 5), .9);
		}
	}
	se(-4, I - 17, 0, 46, 24);
	for (let e of [
		-104,
		-84,
		-64,
		62,
		82,
		102,
		122
	]) R(e + (w() - .5) * 3, I - 13, 13 + w() * 3, 12 + w() * 3, 12 + w() * 8);
	for (let e of [
		-118,
		-96,
		-74,
		-30,
		30,
		54,
		76,
		98,
		120
	]) R(e + (w() - .5) * 4, I - 46 - w() * 6, 15 + w() * 4, 14 + w() * 4, 24 + w() * 20);
	for (let e of [
		-132,
		-108,
		-84,
		-58,
		38,
		62,
		88,
		112,
		136
	]) R(e + (w() - .5) * 5, I - 80 - w() * 10, 16 + w() * 5, 16 + w() * 5, 34 + w() * 28);
	for (let e = 0; e < 12; e++) {
		let t = -150 + e * 27 + (w() - .5) * 8;
		Math.abs(t + 6) < 34 || R(t, I - 118 - w() * 24, 16 + w() * 6, 16 + w() * 6, 28 + w() * 36);
	}
	se(ae + 15, -4, -Math.PI / 2, 40, 22);
	for (let e of [
		-19,
		-1,
		16
	]) R(-ae - 11, e, 14 + w() * 2, 13 + w() * 2, 11 + w() * 6);
	for (let e of [-1, 1]) {
		for (let t of [
			-22,
			0,
			20
		]) R(e * (ae + 44 + w() * 4), t + (w() - .5) * 4, 15 + w() * 4, 15 + w() * 4, 20 + w() * 18);
		for (let t of [
			-30,
			-4,
			22
		]) R(e * (ae + 74 + w() * 8), t + (w() - .5) * 6, 16 + w() * 5, 16 + w() * 5, 30 + w() * 26);
	}
	let ce = [
		"#ffc887",
		"#ff3b30",
		"#ff8a1e",
		"#ffd21e",
		"#3ddc62",
		"#22d3ee",
		"#4b8dff",
		"#9b6cff",
		"#ff4fa3",
		"#fff1d6"
	], le = [], z = [];
	{
		let e = {
			x: -6,
			z: I - 96
		}, t = (t, n, r, i) => {
			le.push(s.clone().applyMatrix4(new nt().makeScale(r, i, r).setPosition(e.x, Tu + n, e.z))), z.push(t);
		}, n = g(e.x, e.z, 0);
		n("concrete", s, 0, 4, 0, 40, 8, 40), n("window", s, 0, 3.4, 20.05, 26, 4.4, .1);
		let r = 8;
		for (let e = 0; e < 5; e++) {
			let i = 27 - e * 1.5;
			n(e % 2 ? "jadeDark" : "jade", s, 0, r + 2.6, 0, i, 5.2, i), r += 5.2, t(0, r - .55, i + .6, .5);
		}
		for (let e = 0; e < 8; e++) {
			for (let i = 0; i < 3; i++) {
				let a = 17.2 + i * 1.7;
				n(i === 1 ? "jadeDark" : "jade", s, 0, r + 1.6, 0, a, 3.2, a), r += 3.2, i < 2 && t(e + 1, r - .5, a + .6, .5);
			}
			t(e + 1, r - .9, 21.6, 1.2);
			for (let [e, t] of [
				[0, 1],
				[0, -1],
				[1, 0],
				[-1, 0]
			]) n("sun", s, e * 10.4, r - 4.6, t * 10.4, e ? .4 : 2.2, 2.2, t ? .4 : 2.2);
		}
		for (let [e, i, a] of [
			[
				14,
				6,
				"jade"
			],
			[
				10.5,
				5,
				"jadeDark"
			],
			[
				7,
				5,
				"jade"
			],
			[
				4,
				6,
				"jadeDark"
			]
		]) n(a, s, 0, r + i / 2, 0, e, i, e), r += i, t(9, r - .4, e + .4, .34);
		t(9, r + 7, 1.9, 13), t(9, r + 18, .9, 7.6), n("steel", u, 0, r + 7, 0, 1.6, 14, 1.6), n("steel", u, 0, r + 18, 0, .6, 8, .6), n("ember", s, 0, r + 22.4, 0, 1, 1, 1);
	}
	{
		let e = 1.2, t = {
			x: 8.8,
			z: M + 1.95
		};
		_("walk", s, t.x, .04, t.z, 7.2, .08, 3.3), _("line", s, t.x, .1, t.z - 1.55, 7.2, .04, .12);
		for (let e of [-1, 1]) _("line", s, t.x + e * 3.54, .1, t.z, .12, .04, 3.3);
		_("walk", s, t.x + 2.4, .04, t.z + 2.2, 2.6, .08, 1.2), _("dark", u, t.x - 3.9, .8, t.z - 1.3, .1, 1.6, .1), _("white", s, t.x - 3.9, 1.5, t.z - 1.24, .6, .5, .05), _("coral", s, t.x - 3.9, 1.66, t.z - 1.21, .6, .14, .02);
		let n = g(t.x, t.z, 0, -.42), r = (t, r, i, a, o, c, l, u = 0) => n(t, s, r * e, i * e, a * e, o * e, c * e, l * e, 0, u);
		r("carWhite", 0, .46, 0, 4.56, .44, 1.8), r("carWhite", 1.42, .76, 0, 1.6, .16, 1.72), r("carWhite", 1.36, .86, 0, 1, .07, .56), r("carWhite", -1.78, .76, 0, 1, .16, 1.72), r("carWhite", -1.12, .8, 0, .36, .16, 1.66);
		for (let e of [-1, 1]) {
			r("carWhite", -.12, .78, e * .82, 1.7, .2, .16), r("carWhite", .74, .92, e * .98, .14, .1, .2);
			for (let t of [-1.42, 1.44]) r("dark", t, .33, e * .84, .68, .66, .26), r("steel", t, .33, e * .98, .34, .34, .03);
			r("dark", 0, .26, e * .9, 2.1, .1, .06);
		}
		r("leather", -.14, .7, 0, 1.72, .08, 1.46);
		for (let e of [-1, 1]) r("leather", .1, .86, e * .38, .5, .26, .5), r("leather", -.12, 1.08, e * .38, .14, .62, .48), r("leather", -.14, 1.44, e * .38, .12, .16, .26), r("leather", -.72, .96, e * .38, .14, .44, .5);
		r("dark", .66, .84, 0, .3, .3, 1.5), r("dark", .44, 1, -.38, .05, .3, .3), r("carGlass", .78, 1.1, 0, .04, .56, 1.5, .55);
		for (let e of [-1, 1]) r("dark", .78, 1.1, e * .78, .06, .6, .05, .55);
		r("dark", .63, 1.35, 0, .06, .05, 1.6);
		for (let e of [-1, 1]) {
			r("dark", 2.29, .62, e * .2, .04, .2, .34), r("window", 2.27, .66, e * .66, .06, .14, .36), r("coral", -2.29, .68, e * .62, .04, .14, .44);
			for (let t of [.42, .58]) r("steel", -2.31, .3, e * t, .08, .1, .1);
		}
		r("dark", 2.3, .36, 0, .05, .2, 1.5), r("dark", -2.3, .34, 0, .05, .16, 1.4), r("carWhite", -2.22, .88, 0, .14, .05, 1.3), r("steel", -2.3, .72, 0, .03, .12, .12);
	}
	for (let e of [
		-24,
		-12,
		0,
		12,
		24
	]) te(e + (w() - .5) * 3, -Hl.depth / 2 - 3.4, .95);
	for (let e of [
		-13,
		-1,
		11
	]) te(Hl.width / 2 + 4, e + (w() - .5) * 3, .9), te(-Hl.width / 2 - 4, e + (w() - .5) * 3, .9);
	for (let e of [
		-27,
		-21,
		-15,
		15,
		21,
		27
	]) ne(e + (w() - .5) * 2, M + 1.6, 1 + w() * .4);
	for (let e = -36; e <= 36; e += 12) P(e, ie - Ou / 2, 6.5 + w() * 1.5);
	for (let e = -138; e <= 138; e += 12) Math.abs(Math.abs(e) - O.x) < 8 || (P(e, I + Ou / 2, 6.5 + w() * 2), Math.abs(e) > 50 && P(e, ie - Ou / 2, 6.5 + w() * 1.5));
	for (let e of [-1, 1]) for (let t = -20; t <= 22; t += 10.5) P(e * (ae - Ou / 2), t, 6.5 + w() * 1.5);
	for (let e of [
		-30,
		-10,
		10,
		30
	]) F(e, E.z - E.width / 2 - Ou / 2, 0);
	for (let e of [
		-100,
		-70,
		70,
		100
	]) F(e, E.z - E.width / 2 - Ou / 2, 0);
	for (let e = -110; e <= 110; e += 22) F(e, D.z - D.width / 2 - Ou / 2, 0);
	for (let e of [-1, 1]) for (let t of [
		-18,
		0,
		18
	]) F(e * (O.x - O.width / 2 - Ou / 2), t, Math.PI / 2 * e);
	re(-22, E.z - E.width / 2 + 1, 0), re(17, E.z - E.width / 2 + 1, 0), re(-33, E.z + E.width / 2 - 1, Math.PI), re(-14, D.z + D.width / 2 - 1.2, Math.PI), re(21, D.z - D.width / 2 + 1.2, 0), re(O.x + O.width / 2 - 1.2, -8, Math.PI / 2), re(-O.x - O.width / 2 + 1.2, 9, -Math.PI / 2);
	let ue = [], B = ie, de = 4.6, fe = B + de, V = B + 40, H = {
		x: 9,
		z: B + 19,
		halfLength: 8,
		halfWidth: 4
	}, pe = {
		x: 31,
		z: B + 14
	}, me = {
		x: -13,
		z: B + 12.4
	}, he = {
		x: -13,
		z: V - 12
	}, ge = {
		x: he.x,
		z: he.z - 5.2
	}, _e = {
		x: he.x + .5,
		z: he.z + 6.2
	}, ve = [], ye = [], be = [];
	function xe(e, t, n = .14) {
		let r = g(e, t, 0, Tu + n);
		r("wood", u, 0, .95, 0, .1, 1.9, .1), r("dark", s, 0, 1.92, 0, .24, .16, .24), r("flame", s, 0, 2.16, 0, .2, .34, .2), r("poolBeach", d, 0, .06, 0, 5, 1, 5);
	}
	function Se(e, t, n, r, i = ["lamp"]) {
		for (let a = 1; a <= n; a++) {
			let o = a / (n + 1);
			_(i[a % i.length], s, e[0] + (t[0] - e[0]) * o, e[1] + (t[1] - e[1]) * o - r * 4 * o * (1 - o), e[2] + (t[2] - e[2]) * o, .17, .17, .17);
		}
	}
	{
		_("deck", s, 0, .1, B + de / 2, 300, .2, de);
		for (let e = -149; e < Eu; e += 2.5) _("wood", s, e, .203, B + de / 2, .08, .01, de);
		_("sand", s, 0, .07, (fe + V) / 2, 900, .14, V - fe), _("wetSand", s, 0, .06, V + 2.5, 900, .12, 5), _("sea", s, 0, .045, V + 4 + 450, 1800, .09, 900);
		let e = [
			"coral",
			"teal",
			"sun",
			"white"
		];
		function t(t, n, r, i = 0) {
			let a = g(t, n, 0, Tu + i);
			if (a("wood", s, 0, .72, 0, 1.1, .08, 1.1), a("dark", u, 0, .36, 0, .12, .72, .12), r) {
				a("white", u, 0, 1.5, 0, .07, 1.6, .07);
				let t = T(e);
				a(t, s, 0, 2.32, 0, 2.6, .12, 2.6), a(t, s, 0, 2.46, 0, 1.4, .16, 1.4);
			}
			for (let [e, r] of [
				[-1, 0],
				[1, 0],
				[0, -1],
				[0, 1]
			]) a("wood", s, e * .95, .24, r * .95, .42, .48, .42), w() < .5 && ue.push({
				x: t + e * .95,
				y: Tu + i + .48,
				z: n + r * .95,
				heading: Math.atan2(r, -e)
			});
		}
		function n(e, n, r, i) {
			let a = g(e, n, 0);
			a("deck", s, 0, .2, 3.5, 15, .4, 13), a("white", s, 0, 1.75, -1.2, 14, 3.1, 3.4), a(r, s, 0, 3.42, -1, 15, .24, 4.4), a("window", s, 0, 3.86, .9, 6.4, .62, .12), a("dark", s, 0, 3.86, .82, 6.8, .86, .1), a("wood", s, 0, .95, .75, 12, 1.1, .5);
			for (let e of [
				-4.6,
				0,
				4.6
			]) a("window", s, e, 2.3, .52, 2.6, 1, .06);
			for (let e of [-4.6, 4.6]) a("window", s, e, 2.1, -2.92, 2.2, 1, .06);
			a("wood", s, 0, 1.25, -2.92, 1.1, 2.1, .06);
			for (let e of [-7, 15 / 2 - .5]) for (let t of [1.6, 9.2]) a("white", u, e, 1.75, t, .16, 3.1, .16);
			for (let e = 0; e < 10; e++) a(e % 2 ? "white" : i, s, -6.75 + e * 1.5, 3.3, 5.3, 1.5, .1, 8.2);
			for (let e = 0; e <= 10; e++) if (a("lamp", s, -7.3 + e * 1.46, 3.14, 9.42, .16, .16, .16), e < 6) for (let t of [-7.3, 15 / 2 - .2]) a("lamp", s, t, 3.14, 1.6 + e * 1.5, .16, .16, .16);
			for (let r of [
				-4.8,
				0,
				4.8
			]) t(e + r, n + 3.4, !1, .4), t(e + r, n + 7.2, !1, .4);
			a("deck", s, 0, .13, 10.3, 5, .26, .6), a("poolBeach", d, 0, .2, 15, 11, 1, 8);
			for (let e of [
				-4.8,
				0,
				4.8
			]) for (let t of [3.4, 7.2]) a("lamp", s, e, 2.9, t, .3, .34, .3);
		}
		function r(e, t) {
			let n = g(e, t, 0);
			n("deck", s, 0, .16, 0, 9, .32, 6);
			for (let e of [-4, 4]) for (let t of [-2.6, 2.6]) n("wood", u, e, 1.7, t, .24, 3.1, .24);
			n("thatch", s, 0, 3.35, 0, 10.4, .3, 7.4), n("thatch", l, 0, 4.4, 0, 9.4, 1.9, 6.6), n("roofB", s, 0, .8, .4, 5, .96, 1.2), n("ember", s, 0, 1.3, .4, 4.4, .06, .8);
			for (let e = 0; e < 9; e++) n("dark", s, -2 + e * .5, 1.36, .4, .06, .04, .9);
			for (let [e, t] of [
				[-1.4, "coral"],
				[-.5, "roofB"],
				[.6, "coral"],
				[1.5, "roofB"]
			]) n(t, s, e, 1.42, .4, .5, .08, .3);
			n("dark", s, 2.9, 1.5, .4, .5, 2.4, .5), n("wood", s, 0, .9, -1.9, 6, .1, .8), n("wood", s, 0, .6, -1.9, 5.6, .6, .5), n("window", s, 0, 2.86, -3.72, 4.2, .5, .1);
			for (let e = 0; e <= 6; e++) n("lamp", s, -4.5 + e * 1.5, 3.1, 3.7, .16, .16, .16);
			for (let e of [-1, 1]) for (let t = 0; t <= 4; t++) n("lamp", s, e * 5.1, 3.1, -3 + t * 1.5, .16, .16, .16);
			n("lamp", s, 0, 2.9, -.6, .34, .36, .34), n("poolBeach", d, 0, .2, 0, 12, 1, 9);
			for (let [n, r] of [
				[-7.4, 3.2],
				[-7.4, -1],
				[7.6, 2.4],
				[-2.4, 6.6],
				[3, 6.8]
			]) {
				let i = g(e + n, t + r, 0);
				i("wood", s, 0, .74, 0, 2.2, .08, .9);
				for (let a of [-1, 1]) {
					i("wood", s, 0, .42, a * .75, 2.2, .07, .34);
					for (let e of [-.8, .8]) i("dark", s, e, .36, a * .4, .1, .72, .1);
					w() < .7 && ue.push({
						x: e + n + (w() - .5) * 1.2,
						y: -.03999999999999998,
						z: t + r + a * .75,
						heading: a > 0 ? Math.PI / 2 : -Math.PI / 2
					});
				}
			}
		}
		n(-36, B + 9.4, "coral", "coral"), r(me.x, me.z - .4), n(56, B + 9.4, "teal", "teal");
		{
			let e = g(H.x, H.z, 0), { halfLength: t, halfWidth: n } = H;
			for (let r of [-n, n]) e("white", s, 0, .16, r, t * 2, .05, .14);
			for (let r of [-t, t]) e("white", s, r, .16, 0, .14, .05, n * 2);
			for (let t of [-n - .5, n + .5]) e("dark", u, 0, 1.3, t, .14, 2.6, .14);
			e("net", s, 0, 1.95, 0, .04, 1, n * 2 + 1), e("white", s, 0, 2.46, 0, .06, .06, n * 2 + 1), e("white", s, 0, 1.44, 0, .06, .06, n * 2 + 1), e("wood", s, 0, .9, -n - 1.5, .8, 1.8, .8), e("wood", s, 0, 2.1, -n - 1.75, .8, .7, .1), e("wood", s, -t + 3, .4, n + 2, 3, .1, .5), e("wood", s, t - 3, .4, n + 2, 3, .1, .5);
			for (let r of [-t - 1.2, t + 1.2]) e("dark", u, r, 3.2, -n - 1.4, .16, 6.4, .16), e("dark", s, r, 6.4, -n - .9, .12, .12, 1.1), e("lamp", s, r, 6.3, -n - .5, .7, .1, .5);
			e("poolBeach", d, 0, .21000000000000002, 0, t + 5, 1, n + 5);
		}
		{
			let e = g(pe.x, pe.z, 0);
			e("dark", s, 0, .185, 0, 13, .09, 8), e("coral", s, 0, .16, 0, 13.4, .04, 8.4), e("steel", u, 2.4, 1.3, .2, .14, 2.6, .14), e("steel", s, 2.4, .26, .2, 1, .08, 1), e("steel", s, 1.95, 2.56, .2, 1, .1, .1), e("dark", u, 1.5, 2.36, .2, .03, .34, .03), e("coral", s, 1.5, 1.66, .2, .38, 1.06, .38);
			for (let t of [-1.2, 1.2]) e("steel", u, -3.6 + t, 1.4, 2.4, .16, 2.8, .16);
			e("steel", s, -3.6, 2.72, 2.4, 2.7, .08, .08);
			for (let t of [-.4, .4]) {
				e("steel", s, 3.4, 1.3, 2.4 + t, 2.6, .08, .08);
				for (let n of [-1.2, 1.2]) e("steel", u, 3.4 + n, .65, 2.4 + t, .1, 1.3, .1);
			}
			e("dark", s, -3.4, .55, -1.8, .6, .14, 2);
			for (let t of [-.55, .55]) e("steel", u, -3.4 + t, .75, -2.5, .1, 1.2, .1);
			e("steel", s, -3.4, 1.34, -2.5, 2.4, .07, .07);
			for (let t of [-1.05, 1.05]) e("dark", s, -3.4 + t, 1.34, -2.5, .12, .62, .62);
			e("steel", s, 3.6, .5, -2.8, 3, .08, .5), e("steel", s, 3.6, .9, -2.8, 3, .08, .5);
			for (let t of [-1.3, 1.3]) e("steel", u, 3.6 + t, .5, -2.8, .1, 1, .5);
			for (let t = 0; t < 5; t++) e("dark", s, 2.5 + t * .55, .64, -2.8, .3, .2, .44), e("dark", s, 2.5 + t * .55, 1.04, -2.8, .26, .2, .4);
			for (let t of [.2, .9]) e("dark", s, t, .34, -.4, .34, .34, .34);
			for (let t of [-2, 2]) e("teal", u, t, 1.5, -4.2, .2, 3, .2);
			e("teal", s, 0, 3.1, -4.2, 4.6, .6, .24), e("window", s, 0, 3.1, -4.34, 3.4, .3, .06), e("lamp", s, 0, 2.74, -4, 3.6, .08, .2);
			for (let t of [-6.3, 6.3]) e("dark", u, t, 2.4, 3.9, .14, 4.8, .14), e("lamp", s, t, 4.74, 3.7, .5, .1, .5);
			e("poolBeach", d, 0, .3, 0, 10.5, 1, 7.5);
		}
		{
			let e = g(-1, V - 6, 0);
			for (let t of [-1, 1]) for (let n of [-1, 1]) e("wood", u, t * .9, 1.2, n * .9, .16, 2.4, .16);
			e("wood", s, 0, 2.45, .2, 2.6, .12, 3), e("white", s, 0, 3.3, -.2, 2.2, 1.6, 1.8), e("coral", s, 0, 4.2, -.1, 2.8, .18, 2.6), e("window", s, 0, 3.4, .72, 1.5, .7, .04), e("lamp", s, 0, 4.02, 1.1, .5, .12, .3), e("poolBeach", d, 0, .2, 1.2, 5, 1, 5), e("wood", s, 0, 1.2, 2.3, .9, .1, 2.9, 0, 0, .72), e("coral", s, 1.5, 3.2, 1.4, .06, 1.8, .06), e("sun", s, 1.5, 3.8, 1.72, .04, .5, .7);
		}
		{
			let e = {
				x: -62,
				from: V - 4,
				to: V + 30
			};
			_("deck", s, e.x, .9, (e.from + e.to) / 2, 3.4, .16, e.to - e.from), _("deck", s, e.x, .5, e.from - 1.4, 3.4, .16, 3.4, 0, 0, -.3);
			for (let t = e.from + 1; t <= e.to; t += 5.5) for (let n of [-1.5, 1.5]) _("wood", u, e.x + n, .3, t, .24, 1.6, .24);
			for (let t of [-1.6, 1.6]) _("wood", s, e.x + t, 1.5, (e.from + e.to) / 2 + 1, .08, .08, e.to - e.from - 2);
			for (let t = e.from + 1; t <= e.to; t += 2.75) for (let n of [-1.6, 1.6]) _("wood", u, e.x + n, 1.24, t, .08, .56, .08);
			_("deck", s, e.x, .9, e.to + 2, 7, .16, 5);
			for (let t = e.from + 1; t <= e.to; t += 5.5) for (let n of [-1.6, 1.6]) _("lamp", s, e.x + n, 1.68, t, .2, .24, .2);
			F(e.x - 2.6, e.to + 2, -Math.PI / 2);
		}
		for (let [t, n] of [
			[-52, -24],
			[18, 44],
			[66, 100],
			[-108, -72]
		]) for (let r = t; r <= n; r += 6.5) {
			let t = V - 5 - w() * 3, n = g(r + (w() - .5), t, (w() - .5) * .3), i = T(e);
			n("white", u, 0, 1.2, 0, .08, 2.4, .08), n(i, s, 0, 2.4, 0, 2.8, .12, 2.8), n(i, s, 0, 2.55, 0, 1.5, .16, 1.5), n("lamp", s, 0, 2.16, 0, .26, .26, .26), n("poolBeach", d, 0, .19, 0, 3.4, 1, 3.4);
			for (let e of [-1.1, 1.1]) n("white", s, e, .4, .3, .7, .1, 1.9), n("white", s, e, .62, -.78, .7, .1, .7, 0, 0, .7), n(i, s, e, .47, .5, .6, .04, 1.2);
		}
		for (let [e, t, n] of [
			[
				-25.6,
				B + 16,
				"coral"
			],
			[
				-24.8,
				B + 16.4,
				"sun"
			],
			[
				-24.1,
				B + 15.8,
				"teal"
			],
			[
				45.4,
				B + 15,
				"white"
			],
			[
				46.2,
				B + 15.5,
				"coral"
			]
		]) g(e, t, w() * .6)(n, s, 0, 1.15, 0, .5, 2.1, .08, 0, 0, -.12);
		_("walk", s, 0, .03, E.z, 5, .07, E.width), _("deck", s, 0, .1, fe + .5, 6, .2, 1);
		for (let e = -132; e <= 132; e += 11) [
			[-36, 9],
			[me.x, 6],
			[56, 9],
			[pe.x, 4]
		].some(([t, n]) => Math.abs(e - t) < n) || P(e + (w() - .5) * 2, fe + 1.6 + w() * 1.5, 6 + w() * 2);
		for (let e = -120; e <= 120; e += 20) F(e + 10, B + de - .5, Math.PI);
		{
			let e = B + de - .2;
			for (let t = -120; t <= 120; t += 20) _("dark", u, t, 1.95, e, .1, 3.7, .1), Se([
				t,
				3.72,
				e
			], [
				t + 10,
				3.72,
				e
			], 7, .5), t > -120 && Se([
				t - 10,
				3.72,
				e
			], [
				t,
				3.72,
				e
			], 7, .5);
			for (let e = -108; e <= 108; e += 12) Math.abs(e + 62) < 5 || Math.abs(e + 1) < 3 || xe(e, V - .3);
			for (let [e, t] of [
				[-46, fe + 16.2],
				[20.5, fe + 16.6],
				[84, fe + 14]
			]) {
				let n = g(e, t, 0, -.36);
				n("dark", u, 0, 4.4, 0, .2, 8.8, .2), n("dark", s, 0, 8.8, 0, 1.5, .14, .3);
				for (let e of [-.5, .5]) n("lamp", s, e, 8.66, .25, .7, .14, .5);
				n("poolBeach", d, 0, .07, 6, 17, 1, 15), be.push({
					x: e,
					y: -.36 + 8.4,
					z: t + 2
				});
			}
		}
		{
			let e = g(_e.x, _e.z, 0, -.36);
			for (let t = 0; t < 8; t++) {
				let n = t / 8 * Math.PI * 2;
				e("concrete", s, Math.cos(n) * .95, .13, Math.sin(n) * .95, .44, .26, .44, -n);
			}
			e("dark", d, 0, .03, 0, .85, 1, .85);
			for (let [t, n] of [
				[.3, .42],
				[1.4, -.42],
				[2.5, .4]
			]) e("wood", s, 0, .28, 0, 1.35, .16, .16, t, n);
			e("poolBeach", d, 0, .08, 0, 6.5, 1, 6.5);
			for (let t of [
				.42,
				Math.PI / 2,
				Math.PI - .42
			]) {
				let n = Math.cos(t) * 2.9, r = Math.sin(t) * 2.9;
				e("wood", s, n, .22, r, 2.4, .44, .5, Math.PI / 2 - t);
				for (let e of [-.6, .6]) ve.push({
					x: _e.x + n - Math.sin(t) * e,
					y: -.36 + .44,
					z: _e.z + r + Math.cos(t) * e,
					heading: Math.PI - t
				});
			}
			let t = g(ge.x, ge.z, 0, -.36);
			t("deck", s, 0, .12, -.5, 6.6, .24, 3.2), t("dark", s, 0, .8, .5, 3.6, 1.1, .16), t("signPink", s, 0, 1.02, .6, 3.2, .14, .06), t("signTeal", s, 0, .62, .6, 3.2, .14, .06), t("dark", s, 0, 1.38, .1, 3.6, .08, .95);
			for (let e of [-.95, .95]) t("steel", s, e, 1.47, .05, .8, .1, .7), t("dark", s, e, 1.535, .05, .5, .03, .5);
			t("steel", s, 0, 1.47, .05, .5, .1, .6);
			for (let e of [-3.9, 3.9]) t("dark", s, e, 1.1, .5, 1.2, 2.2, 1), t("steel", s, e, 1.62, 1.02, .66, .66, .05), t("steel", s, e, .66, 1.02, .86, .86, .05);
			for (let e of [-2.9, 2.9]) t("steel", u, e, 2.25, -1.3, .16, 4.5, .16);
			t("steel", s, 0, 4.42, -1.3, 6, .18, .18);
			for (let e = 0; e < 5; e++) ye.push({
				x: ge.x - 2.2 + e * 1.1,
				y: 3.82,
				z: ge.z - 1.2
			});
			let n = [
				"lamp",
				"signPink",
				"lamp",
				"signTeal"
			], r = [-1, 1].map((e) => ({
				x: he.x + e * 7.6,
				z: he.z + 4.6
			}));
			for (let [e, t] of r.entries()) _("dark", u, t.x, 2.24, t.z, .12, 4.2, .12), Se([
				ge.x + (e ? 2.9 : -2.9),
				4.54,
				ge.z - 1.3
			], [
				t.x,
				4.239999999999999,
				t.z
			], 11, .7, n);
			Se([
				r[0].x,
				4.239999999999999,
				r[0].z
			], [
				r[1].x,
				4.239999999999999,
				r[1].z
			], 13, .8, n);
			for (let e of [-1, 1]) for (let t of [-1, 1]) xe(he.x + e * 8.6, he.z + t * 2.6 - .6);
		}
		for (let [e, t] of [
			[-46, V - 14],
			[-22, V - 13],
			[20, V - 9],
			[44, V - 15],
			[70, V - 12],
			[-80, V - 16],
			[96, V - 8]
		]) P(e, t, 5.5 + w() * 2);
	}
	for (let e = 0; e < 14; e++) {
		let t = Math.PI * (1.02 + e / 13 * .96), n = 190 + w() * 60, r = 45 + w() * 40, i = Math.cos(t) * n, a = Math.sin(t) * n, o = 10 + w() * 16, c = r * (.7 + w() * .5);
		for (let e = 0; e < 3; e++) {
			let t = 1 - e * .3;
			_("hill", s, i, o / 3 * (e + .5), a, r * 2 * t, o / 3, c * 2 * t);
		}
	}
	for (let [e, t, n, r, i] of [
		[
			"ridgeNear",
			300,
			40,
			95,
			20
		],
		[
			"ridgeMid",
			385,
			70,
			150,
			18
		],
		[
			"ridgeFar",
			480,
			110,
			215,
			16
		]
	]) for (let a = 0; a < i; a++) {
		let o = Math.PI * (.94 + a / (i - 1) * 1.12) + (w() - .5) * .05, c = t + (w() - .5) * 50, l = n + w() * (r - n), u = l * (1.5 + w() * .9), d = Math.cos(o) * c, f = Math.sin(o) * c;
		for (let t = 0; t < 5; t++) {
			let n = 1 - t / 5 * .82;
			g(d, f, -o + Math.PI / 2)(e, s, (w() - .5) * u * .12, l / 5 * (t + .5), 0, u * 2 * n, l / 5, u * 1.1 * n);
		}
	}
	let Ce = new At();
	Ce.name = "outdoors";
	for (let [e, t] of f) {
		let n = new Y(au(t, !1), o[e]);
		n.name = `outdoors:${e}`, (e === "pool" || e === "poolBeach") && (n.renderOrder = 1), Ce.add(n);
		for (let e of t) e.dispose();
	}
	b.forEach((e, t) => {
		if (x[t].length === 0) return;
		let n = new Y(au(x[t], !1), e);
		n.name = `outdoors:tower-${t}`, Ce.add(n);
		for (let e of x[t]) e.dispose();
	});
	let we = new Y(au(le, !1), new fr({ vertexColors: !0 }));
	we.name = "outdoors:neon";
	for (let e of le) e.dispose();
	let Te = new yn(new Float32Array(z.length * 36 * 3), 3);
	we.geometry.setAttribute("color", Te);
	let Ee = ce.map((e) => n(e, 1.1)), De = new J("#5c5e62"), Oe = new J();
	function ke(e, t) {
		for (let n = 0; n < z.length; n++) {
			let r = z[n], i = .68 + .32 * (.5 + .5 * Math.sin(e * 1.5 - r * .75));
			Oe.copy(Ee[r]).multiplyScalar(i).lerp(De, 1 - t);
			for (let e = 0; e < 36; e++) Te.setXYZ(n * 36 + e, Oe.r, Oe.g, Oe.b);
		}
		Te.needsUpdate = !0;
	}
	ke(0, 0), Ce.add(we);
	let Ae = null;
	{
		let e = /* @__PURE__ */ new Float32Array(1260);
		for (let t = 0; t < 420; t++) {
			let n = w() * Math.PI * 2, r = Math.asin(.1 + w() * .9);
			e.set([
				Math.cos(n) * Math.cos(r) * 620,
				Math.sin(r) * 620,
				Math.sin(n) * Math.cos(r) * 620
			], t * 3);
		}
		let t = new Pn();
		t.setAttribute("position", new yn(e, 3)), Ae = new oi(t, new ti({
			color: Q.steel,
			size: 1.4,
			sizeAttenuation: !1,
			fog: !1,
			transparent: !0,
			opacity: .7
		})), Ae.name = "stars", Ce.add(Ae);
	}
	let je = new pi(1, 1, 1), Me = a(n("#fff1d6", 1)), Ne = a(n(Q.ember, .8));
	function W(e) {
		let t = new At(), n = (e, n, r, i, a, o, s) => {
			let c = new Y(je, e);
			c.scale.set(n, r, i), c.position.set(a, o, s), t.add(c);
		};
		n(e, 4.1, .7, 1.8, 0, .62, 0), n(o.dark, 2.2, .55, 1.6, -.2, 1.2, 0), n(o.dark, 3.4, .4, 1.9, 0, .2, 0);
		for (let e of [-.6, .6]) n(Me, .06, .16, .36, 2.06, .66, e), n(Ne, .06, .14, .36, -2.06, .7, e);
		return Ce.add(t), t;
	}
	let Fe = 1.7, K = 1.5, q = Eu - (O.x + K), Ie = [
		{
			car: W(o.carC),
			speed: 7.5,
			offset: 40,
			place: (e, t) => e.position.set(t, Tu, E.z + Fe)
		},
		{
			car: W(o.carA),
			speed: 6.2,
			offset: 190,
			place: (e, t) => e.position.set(-t, Tu, E.z - Fe)
		},
		{
			car: W(o.carB),
			speed: 6.8,
			offset: 110,
			place: (e, t) => {
				let n = t + Eu;
				n < q ? (e.position.set(Eu - n, Tu, E.z - Fe), e.rotation.y = Math.PI) : (e.position.set(O.x + K, Tu, E.z - Fe - (n - q)), e.rotation.y = Math.PI / 2);
			}
		}
	];
	Ie[1].car.rotation.y = Math.PI;
	let Le = Cu(Ce, {
		ground: Tu,
		reach: Eu,
		front: E.z,
		back: D.z,
		side: O.x,
		boardwalk: {
			from: B + .9,
			to: B + de - 1.2
		},
		sand: {
			from: fe + 17,
			to: V - 1
		},
		shore: V,
		court: H,
		pullUp: {
			x: pe.x - 3.6,
			z: pe.z + 2.4,
			bar: 2.72
		},
		mat: {
			x: pe.x + .4,
			z: pe.z + .4
		},
		grill: {
			x: me.x,
			z: me.z
		},
		seats: ue,
		party: {
			x: he.x,
			z: he.z,
			dj: {
				x: ge.x,
				y: -.12,
				z: ge.z - .75
			},
			fire: _e,
			logs: ve,
			lamps: ye
		},
		poolMap: o.pool.map,
		lean: Au
	}), Re = Au ? [] : be.map((e) => {
		let t = new Ea("#ffd2a0", 0, 70, 1.5);
		return t.position.set(e.x, e.y, e.z), t.visible = !1, Ce.add(t), t;
	});
	t.add(Ce);
	let ze = [
		{
			material: o.window,
			on: o.window.color.clone(),
			off: new J("#2c3c4c")
		},
		{
			material: o.lamp,
			on: o.lamp.color.clone(),
			off: new J("#4a4640")
		},
		{
			material: Me,
			on: Me.color.clone(),
			off: new J("#6a6a70")
		},
		{
			material: Ne,
			on: Ne.color.clone(),
			off: new J("#4a1a14")
		},
		{
			material: o.signPink,
			on: o.signPink.color.clone(),
			off: new J("#8a3a5c")
		},
		{
			material: o.signTeal,
			on: o.signTeal.color.clone(),
			off: new J("#3a7f7a")
		},
		{
			material: o.flame,
			on: o.flame.color.clone(),
			off: new J("#3a2c22")
		}
	], Be = 0, Ve = !1;
	return {
		setDaylight(e) {
			let t = 1 - U.smoothstep(e, .25, .7);
			for (let { material: e, on: n, off: r } of ze) e.color.lerpColors(r, n, t);
			o.pool.opacity = .16 * t, o.poolBeach.opacity = .2 * t;
			for (let e of b) e.emissiveIntensity = .62 * t;
			for (let n of Re) n.visible = e < .96, n.intensity = 46 * t;
			o.jade.emissive.set("#1c7a74").multiplyScalar(.5 * t), o.jadeDark.emissive.set("#125e5a").multiplyScalar(.5 * t), Be = t, Le.setNight(t), Ae && (Ae.material.opacity = .7 * (1 - U.smoothstep(e, 0, .4)));
		},
		update(e) {
			for (let { car: t, speed: n, offset: r, place: i } of Ie) i(t, (e * n + r) % 300 - Eu);
			Be > .01 ? (ke(e, Be), Ve = !0) : Ve &&= (ke(0, 0), !1), Le.update(e);
		}
	};
}
// src/scene.ts
var Mu = new pi(1, 1, 1), Nu = new wi(1, 1), Pu = "\"Space Grotesk\", system-ui, sans-serif", Fu = "\"JetBrains Mono\", ui-monospace, Menlo, monospace", Iu = {
	floorDark: "#3b2415",
	floorLight: "#8b5a33",
	deckDark: "#6b4527",
	deckLight: "#a67646",
	oak: "#a87a4b",
	slat: "#9a6b40",
	trunk: "#5a3a22"
}, Lu = 2.4;
function Ru(e, t = 1) {
	let n = new J(e), r = .2126 * n.r + .7152 * n.g + .0722 * n.b, i = U.clamp(.62 / Math.max(r, .05), .8, 3.2);
	return n.multiplyScalar(i * t);
}
function zu(e, t = new J()) {
	let n = Gl.map((e) => new J(e)), r = U.clamp(e, 0, 1) * (n.length - 1), i = Math.min(Math.floor(r), n.length - 2);
	return t.lerpColors(n[i], n[i + 1], r - i);
}
var Bu = "\n  varying vec2 vWoodXZ;\n  uniform vec3 uWoodDark;\n  uniform vec3 uWoodLight;\n  uniform vec2 uPlank; // x = plank width, y = plank length\n  uniform float uAlongZ;\n\n  float woodHash(vec2 p) {\n    p = fract(p * vec2(123.34, 456.21));\n    p += dot(p, p + 45.32);\n    return fract(p.x * p.y);\n  }\n\n  float woodNoise(vec2 p) {\n    vec2 i = floor(p);\n    vec2 f = fract(p);\n    f = f * f * (3.0 - 2.0 * f);\n    return mix(\n      mix(woodHash(i), woodHash(i + vec2(1.0, 0.0)), f.x),\n      mix(woodHash(i + vec2(0.0, 1.0)), woodHash(i + vec2(1.0, 1.0)), f.x),\n      f.y\n    );\n  }\n\n  // Pixel-art planks: the floor is divided into small squares, and everything (which plank,\n  // its tone, its grain, the dark seam along two of its edges) is decided per square.\n  // Grain and seams fade out with distance, so the overview stays clean.\n  const float WOOD_PIX = 8.0; // squares per metre\n  vec3 woodColor(vec2 world) {\n    float pixel = max(fwidth(world.x), fwidth(world.y));\n    vec2 q = (floor(world * WOOD_PIX) + 0.5) / WOOD_PIX; // the centre of this square\n    vec2 p = uAlongZ > 0.5 ? q.yx : q.xy; // p.x runs along the plank\n    float row = floor(p.y / uPlank.x);\n    float shift = floor(woodHash(vec2(row, 3.7)) * uPlank.y * WOOD_PIX) / WOOD_PIX;\n    float along = (p.x + shift) / uPlank.y;\n    float tone = woodHash(vec2(floor(along), row));\n    vec2 cell = vec2(fract(along) * uPlank.y, fract(p.y / uPlank.x) * uPlank.x);\n\n    // Grain: short streaks running along the plank, and single-square specks.\n    float streak = woodHash(vec2(floor(p.x * WOOD_PIX / 4.0), floor(p.y * WOOD_PIX)) + tone * 31.0);\n    float speck = woodHash(floor(q * WOOD_PIX) + tone * 17.0);\n    float grain = mix(0.5, 0.62 * streak + 0.38 * speck, clamp(0.02 / pixel, 0.0, 1.0));\n\n    vec3 color = mix(uWoodDark, uWoodLight, clamp(0.16 + 0.54 * tone + 0.3 * grain, 0.0, 1.0));\n\n    // The seam is exactly one square wide, along one long edge and one end of each plank.\n    float seam = 0.99 / WOOD_PIX;\n    float open = step(seam, cell.y) * step(seam, cell.x);\n    color *= mix(1.0, mix(0.52, 1.0, open), clamp(0.03 / pixel, 0.0, 1.0));\n    return color;\n  }\n";
function Vu(e) {
	let t = new Ri({
		color: "#ffffff",
		roughness: e.roughness ?? .7,
		metalness: 0
	}), n = {
		uWoodDark: { value: new J(e.dark) },
		uWoodLight: { value: new J(e.light) },
		uPlank: { value: new W(e.plankWidth, e.plankLength) },
		uAlongZ: { value: +!!e.alongZ }
	};
	return t.onBeforeCompile = (e) => {
		Object.assign(e.uniforms, n), e.vertexShader = e.vertexShader.replace("#include <common>", "#include <common>\nvarying vec2 vWoodXZ;").replace("#include <begin_vertex>", "#include <begin_vertex>\nvWoodXZ = (modelMatrix * vec4(position, 1.0)).xz;"), e.fragmentShader = e.fragmentShader.replace("#include <common>", `#include <common>\n${Bu}`).replace("#include <map_fragment>", "#include <map_fragment>\ndiffuseColor.rgb = woodColor(vWoodXZ);");
	}, t;
}
function $(e, t, n, r, i, a, o, s) {
	let c = new Y(Mu, t);
	return c.scale.set(n, r, i), c.position.set(a, o, s), e.add(c), c;
}
function Hu(e, t, n, r, i, a) {
	$(e, t, n + a, .03, a, 0, i, -r / 2), $(e, t, n + a, .03, a, 0, i, r / 2), $(e, t, a, .03, r - a, -n / 2, i, 0), $(e, t, a, .03, r - a, n / 2, i, 0);
}
function Uu(e, t, n, r, i) {
	let a = 1.1, o = .16;
	for (let s of [-1, 1]) for (let c of [-1, 1]) $(e, t, a, .035, o, s * (n / 2 - a / 2), i, r / 2 * c), $(e, t, o, .035, a, n / 2 * s, i, c * (r / 2 - a / 2));
}
function Wu(e, t, n) {
	let r = document.createElement("div");
	return r.className = t, r.textContent = e, n && r.style.setProperty("--accent", n), new Vl(r);
}
function Gu(e, t) {
	"letterSpacing" in e && (e.letterSpacing = t);
}
function Ku(e, t, n) {
	if (e.measureText(t).width <= n) return t;
	let r = t.length;
	for (; r > 1 && e.measureText(`${t.slice(0, r)}\u2026`).width > n;) --r;
	return `${t.slice(0, r).trimEnd()}\u2026`;
}
function qu(e, t, n, r) {
	let i = e.createLinearGradient(0, 0, t, 0);
	i.addColorStop(0, Gl[0]), i.addColorStop(.5, Gl[1]), i.addColorStop(1, Gl[2]), e.clearRect(0, 0, t, n), e.globalAlpha = 1, e.fillStyle = "rgba(255, 255, 255, 0.05)", e.fillRect(0, 0, t, n), e.strokeStyle = i, e.lineWidth = 4, e.strokeRect(2, 2, t - 4, n - 4), e.textBaseline = "middle", e.textAlign = "left", e.fillStyle = i, e.font = `600 34px ${Pu}`, Gu(e, "6px"), e.fillText("MISSION BOARD", 32, 48), e.fillStyle = "#ffffff", e.textAlign = "right", e.font = `500 24px ${Fu}`, Gu(e, "2px"), e.fillText(`${r.filter((e) => e.status === "active").length} ACTIVE`, t - 32, 48);
	let a = [
		{
			name: "QUEUED",
			status: "queued"
		},
		{
			name: "IN PROGRESS",
			status: "active"
		},
		{
			name: "DONE",
			status: "done"
		}
	], o = (t - 64 - 40) / a.length;
	a.forEach((t, a) => {
		let s = 32 + a * (o + 20);
		e.globalAlpha = .9, e.fillStyle = "#ffffff", e.strokeStyle = "#ffffff", e.textAlign = "left", e.font = `500 20px ${Fu}`, Gu(e, "2px"), e.fillText(t.name, s, 102), e.globalAlpha = .45, e.lineWidth = 2, e.strokeRect(s, 124, o, n - 88 - 36 - 30);
		let c = r.filter((e) => e.status === t.status).slice(-3).reverse();
		for (let n = 0; n < 3; n++) {
			let r = s + 12, a = 138 + n * 62, l = o - 24, u = c[n];
			u ? (e.globalAlpha = t.status === "done" ? .16 : .26, e.fillStyle = t.status === "active" ? i : "#ffffff", e.fillRect(r, a, l, 48), e.globalAlpha = t.status === "done" ? .6 : 1, e.fillStyle = "#ffffff", Gu(e, "0px"), e.font = `500 14px ${Fu}`, e.fillText(u.id, r + 10, a + 14), e.font = `500 17px ${Pu}`, e.fillText(Ku(e, u.title, l - 20), r + 10, a + 33)) : (e.globalAlpha = .24, e.setLineDash([8, 8]), e.strokeStyle = "#ffffff", e.strokeRect(r, a, l, 48), e.setLineDash([]));
		}
	}), e.globalAlpha = 1;
}
function Ju(e, t, n) {
	e.clearRect(0, 0, t, n), e.textBaseline = "alphabetic", e.textAlign = "left";
	let r = Math.round(n * .62), i = `400 ${r}px ${Pu}`, a = `600 ${r}px ${Pu}`;
	Gu(e, `${-Math.round(r * .03)}px`), e.font = i;
	let o = e.measureText("Start ").width;
	e.font = a;
	let s = e.measureText("Creating").width, c = e.measureText(".").width, l = (t - o - s - c) / 2, u = n * .72;
	e.font = i, e.fillStyle = "#ffffff", e.fillText("Start", l, u), e.font = a;
	let d = e.createLinearGradient(l + o, 0, l + o + s, 0);
	Gl.forEach((e, t) => d.addColorStop(t / (Gl.length - 1), e)), e.fillStyle = d, e.fillText("Creating", l + o, u), e.fillStyle = Q.orange, e.fillText(".", l + o + s, u);
}
function Yu(e, t, n) {
	e.clearRect(0, 0, t, n), e.textBaseline = "alphabetic", e.textAlign = "left";
	let r = Math.round(n * .46);
	e.font = `600 ${r}px ${Pu}`, Gu(e, `${Math.round(r * .2)}px`);
	let i = e.measureText("SC45").width, a = e.measureText("WORKS").width, o = (t - i - a) / 2 + r * .1, s = n * .58;
	e.fillStyle = "#ffffff", e.fillText("SC45", o, s);
	let c = e.createLinearGradient(o + i, 0, o + i + a, 0);
	Gl.forEach((e, t) => c.addColorStop(t / (Gl.length - 1), e)), e.fillStyle = c, e.fillText("WORKS", o + i, s), e.font = `500 ${Math.round(n * .11)}px ${Fu}`, Gu(e, `${Math.round(n * .05)}px`), e.textAlign = "center", e.fillStyle = Q.steel, e.fillText("NO. 45  ·  SOLO CREATOR STUDIO", t / 2, n * .84);
}
function Xu(e, t, n, r, i, a) {
	e.fillStyle = "#0b0c10", e.fillRect(0, 0, t, n), e.fillStyle = "#16181f", e.fillRect(0, 0, t, 34), e.fillStyle = r.blocked ? Q.alert : i, e.fillRect(12, 12, 10, 10), e.textBaseline = "middle", e.textAlign = "left", Gu(e, "0px"), e.font = `500 15px ${Fu}`;
	let o = 32;
	r.missionId && (e.fillStyle = i, e.fillText(r.missionId, o, 18), o += e.measureText(r.missionId).width + 10), e.fillStyle = "#ffffff", e.fillText(Ku(e, r.title, t - o - 12), o, 18), e.font = `400 14px ${Fu}`;
	let s = Math.floor((n - 34 - 14) / 22) - 1, c = r.lines.slice(-s), l = 54;
	for (let n of c) e.fillStyle = Q.green, e.fillText("✓", 12, l), e.fillStyle = Q.soft, e.fillText(Ku(e, n, t - 44), 32, l), l += 22;
	e.fillStyle = r.blocked ? Q.alert : i, e.fillText(r.blocked ? "!" : ">", 12, l), e.fillStyle = r.blocked ? Q.alert : "#ffffff";
	let u = r.blocked ? "waiting" : c.length === 0 ? "starting" : "working";
	e.fillText(u, 32, l), a && e.fillRect(32 + e.measureText(u).width + 6, l - 8, 9, 16);
}
function Zu(e, t, n, r) {
	e.fillStyle = "#141a3a", e.fillRect(0, 0, t, n), e.fillStyle = "#5a6bb8";
	for (let n = 0; n < 14; n++) e.fillRect((n * 37 - Math.floor(r / 4)) % t + (n * 37 - Math.floor(r / 4) < 0 ? t : 0), n * 13 % 22 + 2, 1, 1);
	e.fillStyle = "#2b3a7a";
	for (let n = 0; n < 6; n++) {
		let i = ((n * 24 - Math.floor(r / 2)) % (t + 24) + t + 24) % (t + 24) - 24;
		e.fillRect(i, 30 - n % 3 * 4, 18, 14 + n % 3 * 4);
	}
	e.fillStyle = "#2f7a50", e.fillRect(0, 44, t, 10), e.fillStyle = "#3f9a62";
	for (let n = -(r * 2 % 8); n < t; n += 8) e.fillRect(n, 44, 4, 2);
	let i = r * 2 % 48, a = t - 10 - i * 2 + 20;
	e.fillStyle = Q.orange, e.fillRect(a, 38, 5, 6);
	let o = a - 22, s = o > -8 && o < 16 ? Math.round(Math.sin((16 - o) / 24 * Math.PI) * 11) : 0;
	e.fillStyle = Q.pink, e.fillRect(22, 37 - s, 5, 7), e.fillStyle = "#ffffff", e.fillRect(25, 38 - s, 1, 1), e.fillStyle = Q.peach;
	for (let t = 0; t < Math.floor(r * 2 / 48) % 8 + 1; t++) e.fillRect(3 + t * 4, 3, 3, 3);
}
function Qu(e, t, n) {
	e.fillStyle = "#17181d", e.fillRect(0, 0, t, n), e.fillStyle = Q.orange, e.fillRect(8, 8, t - 16, 30), e.fillStyle = "#16100c", e.textAlign = "center", e.textBaseline = "middle", Gu(e, "3px"), e.font = `600 17px ${Pu}`, e.fillText("SNACKS", t / 2, 24), e.fillStyle = "#e9eef6", e.fillRect(8, 46, t - 52, 176);
	let r = [
		Q.orange,
		Q.pink,
		Q.lightViolet,
		Q.green,
		Q.peach,
		"#2b4a7d",
		"#f4c542",
		"#b5432e"
	];
	for (let n = 0; n < 4; n++) {
		let i = 52 + n * 43;
		for (let t = 0; t < 5; t++) e.fillStyle = r[(n * 3 + t * 5) % r.length], n < 2 ? (e.fillRect(14 + t * 19, i, 13, 30), e.fillStyle = "rgba(255,255,255,0.55)", e.fillRect(14 + t * 19, i + 10, 13, 5)) : (e.fillRect(13 + t * 19, i + 6, 15, 24), e.fillStyle = "rgba(0,0,0,0.25)", e.fillRect(13 + t * 19, i + 6, 15, 4));
		e.fillStyle = "#9aa3b2", e.fillRect(8, i + 32, t - 52, 4);
	}
	e.fillStyle = "#2a2c35", e.fillRect(t - 38, 46, 30, 176), e.fillStyle = Q.green, e.fillRect(t - 33, 54, 20, 12), e.fillStyle = "#c9c9d1";
	for (let n = 0; n < 9; n++) e.fillRect(t - 33 + n % 3 * 7, 76 + Math.floor(n / 3) * 8, 5, 5);
	e.fillStyle = "#0b0b0d", e.fillRect(t - 28, 112, 10, 3), e.fillRect(16, 234, t - 32, 38), e.fillStyle = "#3a3d48", e.fillRect(20, 238, t - 40, 6);
}
var $u = {
	executive(e) {
		e.beginPath();
		for (let [t, n] of [
			[-72, 52],
			[-82, -38],
			[-36, 8],
			[0, -58],
			[36, 8],
			[82, -38],
			[72, 52]
		]) e.lineTo(t, n);
		e.closePath(), e.stroke();
	},
	coordination(e) {
		for (let [t, n] of [
			[-62, 120],
			[0, 72],
			[62, 100]
		]) e.strokeRect(t - 22, -62, 44, n);
	},
	design(e) {
		e.beginPath();
		for (let [t, n] of [
			[0, -84],
			[50, -8],
			[28, 76],
			[-28, 76],
			[-50, -8]
		]) e.lineTo(t, n);
		e.closePath(), e.moveTo(0, -84), e.lineTo(0, 6), e.stroke(), e.beginPath(), e.arc(0, 20, 12, 0, Math.PI * 2), e.fill();
	},
	development(e) {
		e.beginPath(), e.moveTo(-34, -52), e.lineTo(-84, 0), e.lineTo(-34, 52), e.moveTo(34, -52), e.lineTo(84, 0), e.lineTo(34, 52), e.moveTo(16, -70), e.lineTo(-16, 70), e.stroke();
	},
	content(e) {
		e.beginPath(), e.arc(0, 0, 76, 0, Math.PI * 2), e.stroke(), e.beginPath(), e.moveTo(-22, -36), e.lineTo(40, 0), e.lineTo(-22, 36), e.closePath(), e.fill();
	},
	sales(e) {
		e.beginPath(), e.roundRect(-78, -62, 156, 104, 26), e.moveTo(-30, 42), e.lineTo(-44, 80), e.lineTo(6, 42), e.stroke();
		for (let t of [
			-36,
			0,
			36
		]) e.beginPath(), e.arc(t, -10, 9, 0, Math.PI * 2), e.fill();
	},
	research(e) {
		e.beginPath(), e.arc(-14, -14, 52, 0, Math.PI * 2), e.moveTo(24, 24), e.lineTo(76, 76), e.stroke();
	},
	meeting(e) {
		e.beginPath(), e.arc(0, 0, 36, 0, Math.PI * 2), e.stroke();
		for (let t = 0; t < 6; t++) e.beginPath(), e.arc(Math.cos(t / 6 * Math.PI * 2) * 72, Math.sin(t / 6 * Math.PI * 2) * 72, 11, 0, Math.PI * 2), e.fill();
	},
	cafe(e) {
		e.beginPath(), e.moveTo(-70, -60), e.lineTo(-10, -60), e.lineTo(-40, -6), e.closePath(), e.moveTo(-40, -6), e.lineTo(-40, 62), e.moveTo(-66, 62), e.lineTo(-14, 62), e.moveTo(34, -84), e.lineTo(34, -44), e.lineTo(14, -20), e.lineTo(14, 62), e.lineTo(70, 62), e.lineTo(70, -20), e.lineTo(50, -44), e.lineTo(50, -84), e.closePath(), e.stroke();
	},
	lounge(e) {
		e.beginPath(), e.moveTo(-58, -10), e.lineTo(-48, 62), e.lineTo(28, 62), e.lineTo(38, -10), e.closePath(), e.moveTo(38, 4), e.bezierCurveTo(86, 0, 86, 46, 32, 44), e.moveTo(-30, -36), e.bezierCurveTo(-42, -52, -18, -62, -30, -80), e.moveTo(8, -36), e.bezierCurveTo(-4, -52, 20, -62, 8, -80), e.stroke();
	}
};
function ed(e, t, n, r, i) {
	e.clearRect(0, 0, t, n);
	let a = t * .34;
	e.beginPath(), e.moveTo(0, 0), e.lineTo(t, 0), e.lineTo(t, n), e.lineTo(t / 2, n - a), e.lineTo(0, n), e.closePath(), e.fillStyle = "#0d0d11", e.fill(), e.save(), e.clip();
	let o = new J(i), s = Math.max(o.r, o.g, o.b) - Math.min(o.r, o.g, o.b) < .15;
	e.fillStyle = s ? "#34343c" : i, e.globalAlpha = s ? 1 : .8, e.fillRect(0, 0, t, n), e.globalAlpha = 1, e.fillStyle = i, e.fillRect(0, 0, t, 14), e.restore(), e.save(), e.translate(t / 2, 34 + t * .36), e.scale(t / 300, t / 300), e.strokeStyle = "#ffffff", e.fillStyle = "#ffffff", e.lineWidth = 15, e.lineCap = "round", e.lineJoin = "round", $u[r.id]?.(e), e.restore(), e.save(), e.translate(t / 2, 34 + t * .78), e.rotate(Math.PI / 2), e.fillStyle = "#ffffff", e.textAlign = "left", e.textBaseline = "middle";
	let c = n - a - (34 + t * .78) - 16, l = Math.round(t * .3), u = r.shortName.toUpperCase();
	do
		e.font = `600 ${l}px ${Pu}`, Gu(e, `${Math.round(l * .14)}px`), l -= 2;
	while (e.measureText(u).width > c && l > 16);
	e.fillText(u, 0, 4), e.restore();
}
var td = {
	night: new J(Q.void),
	day: new J("#7cc8ff"),
	golden: new J("#f0a070"),
	roomLight: new J("#ffe1c2"),
	dayLight: new J("#eaf3ff"),
	goldenLight: new J("#ffc79a"),
	roomBounce: new J("#1d120a"),
	dayBounce: new J("#8a7c6c"),
	sunNoon: new J("#fff1d8"),
	sunLow: new J("#ffb070")
}, nd = new J();
function rd() {
	let e = new zt();
	e.background = new J(Q.void);
	let t = new Rt(Q.void, .006);
	e.fog = t;
	let n = [], i = [], a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = [], c = [], l = [], u = null, d = (e, t) => u ? t + (e - t) * u.by : e, f = (e) => u ? e * u.by : e;
	function p(e, t, n, r) {
		let i = d(e, u?.x ?? 0), a = d(t, u?.z ?? 0);
		c.push({
			shape: "rect",
			minX: i - f(n) / 2,
			maxX: i + f(n) / 2,
			minZ: a - f(r) / 2,
			maxZ: a + f(r) / 2
		});
	}
	function m(e, t, n) {
		c.push({
			shape: "circle",
			x: d(e, u?.x ?? 0),
			z: d(t, u?.z ?? 0),
			radius: f(n)
		});
	}
	let h = {
		floor: Vu({
			dark: Iu.floorDark,
			light: Iu.floorLight,
			plankWidth: .625,
			plankLength: 5,
			roughness: .74
		}),
		deck: Vu({
			dark: Iu.deckDark,
			light: Iu.deckLight,
			plankWidth: .375,
			plankLength: 3.5,
			alongZ: !0,
			roughness: .66
		}),
		oak: wu(new Ri({
			color: Iu.oak,
			roughness: .62,
			metalness: 0
		}), 8, .13),
		slat: wu(new Ri({
			color: Iu.slat,
			roughness: .7,
			metalness: 0
		}), 8, .14),
		trunk: wu(new Ri({
			color: Iu.trunk,
			roughness: .85,
			metalness: 0
		}), 8, .18),
		body: new Ri({
			color: "#1c1c20",
			roughness: .5,
			metalness: .4
		}),
		soft: wu(new Ri({
			color: "#26262b",
			roughness: .95,
			metalness: 0
		}), 8, .16),
		soil: new Ri({
			color: "#17110c",
			roughness: 1,
			metalness: 0
		}),
		plaster: wu(new Ri({
			color: "#b8ad9c",
			roughness: .95,
			metalness: 0
		}), 4, .07),
		glass: new zi({
			color: "#ffffff",
			transparent: !0,
			opacity: .09,
			roughness: .08,
			metalness: 0,
			clearcoat: 1,
			side: 2,
			depthWrite: !1
		}),
		screenOff: new fr({ color: "#0b0b0d" }),
		dimLine: new fr({ color: new J(Q.steel).multiplyScalar(.28) }),
		foliage: [
			"#3f9a62",
			"#52b877",
			"#2f8055"
		].map((e) => wu(new Ri({
			color: e,
			roughness: .9,
			metalness: 0,
			flatShading: !0
		}), 5, .2))
	}, g = /* @__PURE__ */ new Map();
	function _(e, t = 1) {
		let n = `${e}:${t}`, r = g.get(n);
		if (!r) {
			let i = Ru(e, t);
			r = {
				material: new fr({ color: i.clone() }),
				on: i,
				off: new J(e).multiplyScalar(.22).lerp(new J("#3a2a1e"), .35)
			}, g.set(n, r);
		}
		return r.material;
	}
	let v = /* @__PURE__ */ new Map();
	function y(e) {
		let t = v.get(e);
		return t || (t = new fr({
			color: e,
			transparent: !0,
			opacity: .06,
			blending: 2,
			depthWrite: !1
		}), v.set(e, t)), t;
	}
	let b = new ua("#ffe1c2", "#1d120a", 1.2);
	e.add(b);
	let x = new ka("#ffffff", 0);
	x.castShadow = !0, x.shadow.mapSize.set(4096, 4096), x.shadow.camera.left = -175, x.shadow.camera.right = 175, x.shadow.camera.top = 175, x.shadow.camera.bottom = -175, x.shadow.camera.near = 20, x.shadow.camera.far = 620, x.shadow.bias = -4e-4, x.shadow.normalBias = .22, x.shadow.radius = 3.2, x.target.position.set(0, 0, -35), e.add(x, x.target);
	let S = !0, C = new G(), w = new ar(new Gn({
		map: (() => {
			let e = document.createElement("canvas");
			e.width = e.height = 256;
			let t = e.getContext("2d"), n = t.createRadialGradient(128, 128, 0, 128, 128, 128);
			n.addColorStop(0, "rgba(255,255,255,1)"), n.addColorStop(.09, "rgba(255,255,255,1)"), n.addColorStop(.13, "rgba(255,244,214,0.55)"), n.addColorStop(.4, "rgba(255,226,170,0.16)"), n.addColorStop(1, "rgba(255,220,160,0)"), t.fillStyle = n, t.fillRect(0, 0, 256, 256);
			let r = new li(e);
			return r.colorSpace = k, r;
		})(),
		transparent: !0,
		depthWrite: !1,
		fog: !1,
		blending: 2
	}));
	w.name = "sun-disc", w.scale.setScalar(260), w.renderOrder = -1, e.add(w);
	let T = [], E = [], D = null, O = new J("#ffc999");
	function A(t, n, r, i, a = 12) {
		let o = O.clone();
		t && o.lerp(new J(t), .18);
		let s = new wa(o, i, 36, .74, 1, 1.5);
		s.position.set(n, a, r + 1.5), s.target.position.set(n, 0, r), e.add(s, s.target), T.push({
			light: s,
			base: i
		});
	}
	$(e, h.floor, Hl.width, .5, Hl.depth, 0, -.25, 0), Hu(e, h.dimLine, Hl.width, Hl.depth, .012, .07);
	let ee = ju(e, Ru);
	n.push((e) => ee.update(e));
	function j(t) {
		let n = new At();
		return n.name = `zone:${t.id}`, n.position.set(t.position.x, 0, t.position.z), n.scale.setScalar(ru(t)), e.add(n), n;
	}
	let M = 5.7, N = {
		width: 1.7,
		height: 3.5
	}, te = new pi(.12, 1, .12);
	function ne(t) {
		let r = t.accent ?? Q.mist, a = t.position.x - t.size.width / 2 * ru(t) - .3, o = t.position.z - t.size.depth / 2 * ru(t), s = new At();
		s.name = `banner:${t.id}`, s.position.set(a, 0, o), e.add(s);
		let c = u;
		u = null, m(a, o, .2), u = c;
		let l = new Y(te, h.body);
		l.scale.y = M, l.position.y = M / 2, s.add(l), $(s, h.oak, .34, .12, .34, 0, .06, 0), $(s, _(r, .9), .16, .16, .16, 0, 5.78, 0), $(s, h.body, N.width + .5, .07, .07, (N.width + .5) / 2 - .05, 5.48, 0);
		let d = document.createElement("canvas");
		d.width = 300, d.height = Math.round(300 * N.height / N.width);
		let f = d.getContext("2d"), p = new li(d);
		p.colorSpace = k, p.anisotropy = 8;
		let g = () => {
			ed(f, d.width, d.height, t, r), p.needsUpdate = !0;
		};
		g(), i.push(g);
		let v = new Bi({
			map: p,
			alphaTest: .5,
			emissive: "#ffffff",
			emissiveMap: p,
			emissiveIntensity: .16
		}), y = new At();
		y.position.set(.3 + N.width / 2, 5.44, 0);
		for (let e of [0, Math.PI]) {
			let t = new Y(Nu, v);
			t.scale.set(N.width, N.height, 1), t.position.set(0, -N.height / 2, e === 0 ? .012 : -.012), t.rotation.y = e, y.add(t);
		}
		y.userData.dynamic = !0, s.add(y);
		let b = t.position.x * .37 + t.position.z * .21;
		n.push((e) => {
			y.rotation.x = Math.sin(e * .9 + b) * .035, y.rotation.y = Math.sin(e * .6 + b * 1.3) * .05;
		});
		let x = Wu("", "zone-label", r), S = document.createElement("span");
		S.className = "name-full", S.textContent = t.name;
		let C = document.createElement("span");
		C.className = "name-short", C.textContent = t.shortName, x.element.append(S, C), x.center.set(.5, 1), x.position.set(0, 6, 0), s.add(x);
	}
	function P() {
		let t = -5.7, n = Hl.depth / 2 - 1.9, a = new At();
		a.name = "vending", a.position.set(t, 0, n), a.rotation.y = Math.PI / 2, a.scale.setScalar(Ul), e.add(a), p(t, n, .95 * Ul, 1.25 * Ul), $(a, h.body, 1.15, 2.05, .86, 0, 1.025, 0), $(a, h.screenOff, 1.19, .1, .9, 0, .05, 0), $(a, _(Q.orange, .9), 1.17, .05, .88, 0, 2.07, 0);
		let o = document.createElement("canvas");
		o.width = 160, o.height = 288;
		let s = new li(o);
		s.colorSpace = k, s.magFilter = r;
		let c = () => {
			Qu(o.getContext("2d"), o.width, o.height), s.needsUpdate = !0;
		};
		c(), i.push(c);
		let l = new Y(Nu, new fr({ map: s }));
		return l.scale.set(1.03, 1.86, 1), l.position.set(0, 1.07, .432), a.add(l), new G(t + 1.25 * Ul, 0, n);
	}
	function F() {
		let t = 6.2, n = 1.5, r = new At();
		r.name = "monument", r.position.set(-7.9, -.5, Hl.depth / 2 + 2.6), e.add(r);
		let a = new Ri({
			color: "#2a2a30",
			roughness: .85,
			metalness: .05
		});
		$(r, h.oak, 6.7, .22, 1, 0, .11, 0), $(r, a, t, n, .5, 0, .97, 0);
		for (let e of [-1, 1]) $(r, _(Q.peach, .85), 5.8, .04, .05, 0, .245, e * .36);
		let o = document.createElement("canvas");
		o.width = 1240, o.height = 300;
		let s = o.getContext("2d"), c = new li(o);
		c.colorSpace = k, c.anisotropy = 8;
		let l = () => {
			Yu(s, o.width, o.height), c.needsUpdate = !0;
		};
		l(), i.push(l);
		let u = new fr({
			map: c,
			transparent: !0,
			depthWrite: !1,
			color: new J(.62, .62, .62)
		});
		E.push(u);
		for (let e of [0, Math.PI]) {
			let i = new Y(Nu, u);
			i.scale.set(t, n, 1), i.position.set(0, .97, e === 0 ? .256 : -.256), i.rotation.y = e, r.add(i);
		}
	}
	function re() {
		let t = Hl.depth / 2 - .8, n = new At();
		n.name = "entrance", n.position.set(0, 0, t), e.add(n);
		let r = new zi({
			color: "#ffffff",
			transparent: !0,
			opacity: .08,
			roughness: .08,
			metalness: 0,
			clearcoat: 1,
			side: 2,
			depthWrite: !1
		}), a = 6.4, o = 3.5;
		for (let e of [-1, 1]) {
			let i = e * 3.45;
			$(n, h.oak, .5, o, .5, i, o / 2, 0), p(i, t, .5, .5);
			let s = 5.6, c = i + e * 3.05;
			$(n, r, s, 2.9, .05, c, 1.45, 0).renderOrder = 2, $(n, h.oak, s, .12, .18, c, 2.96, 0), $(n, h.oak, s, .1, .18, c, .05, 0), $(n, h.oak, .18, 3.02, .18, i + e * 5.85, 1.51, 0), p(c, t, s, .3);
			let l = new At();
			l.position.set(a / 2 * e, 0, .25), l.rotation.y = e * -1.25, $(l, r, 1.5, 2.7, .04, e * -.75, 1.4, 0).renderOrder = 2, $(l, h.body, .05, .9, .08, e * -1.38, 1.3, 0), n.add(l);
		}
		$(n, h.oak, 9.8, .26, 2, 0, 3.63, .6), $(n, h.slat, 9.9, .08, 2.1, 0, 3.8, .6), $(n, _(Q.peach, .9), 5.800000000000001, .04, .07, 0, 3.47, 1.2), Gl.forEach((e, t) => $(n, _(e, .9), a / Gl.length, .03, .08, (t - 1) * (a / Gl.length), .016, .55));
		let s = document.createElement("canvas");
		s.width = 1792, s.height = 320;
		let c = s.getContext("2d"), l = new li(s);
		l.colorSpace = k, l.anisotropy = 8;
		let u = () => {
			Ju(c, s.width, s.height), l.needsUpdate = !0;
		};
		u(), i.push(u);
		let d = new fr({
			map: l,
			transparent: !0,
			depthWrite: !1,
			color: new J(.62, .62, .62)
		});
		E.push(d);
		let f = 9.600000000000001, m = f * s.height / s.width;
		for (let e of [0, Math.PI]) {
			let t = new Y(Nu, d);
			t.scale.set(f, m, 1), t.position.set(0, 3.84 + m / 2, 1.55 + (e === 0 ? .01 : -.01)), t.rotation.y = e, t.renderOrder = 3, n.add(t);
		}
		$(n, h.body, f, .06, .12, 0, 3.87, 1.55);
	}
	function ie(e, t, n, r, i = 1) {
		let { width: a, depth: o } = t.size;
		if (Hu(e, _(n, .8 * i), a, o, .02, .06), Uu(e, _(n, i), a, o, .022), !r) return;
		let s = new Y(Nu, y(n));
		s.scale.set(a, o, 1), s.rotation.x = -Math.PI / 2, s.position.y = .012, e.add(s);
	}
	let I = /* @__PURE__ */ new Map(), ae = !0;
	function oe(e) {
		e.content && e.canvas && e.texture && (Xu(e.canvas.getContext("2d"), e.canvas.width, e.canvas.height, e.content, e.accent, ae), e.texture.needsUpdate = !0);
	}
	function L(e, t) {
		let n = I.get(e);
		if (!n) return;
		let r = JSON.stringify(n.content) === JSON.stringify(t);
		if (n.content = t, !t) for (let e of n.displays) e.material = h.screenOff;
		else {
			n.material ||= (n.canvas = document.createElement("canvas"), n.canvas.width = 288, n.canvas.height = 160, n.texture = new li(n.canvas), n.texture.colorSpace = k, n.texture.anisotropy = 4, new fr({ map: n.texture }));
			for (let e of n.displays) e.material = n.material;
			r || oe(n);
		}
	}
	let R = -1;
	n.push((e) => {
		let t = Math.floor(e * 2);
		if (t !== R) {
			R = t, ae = t % 2 == 0;
			for (let e of I.values()) oe(e);
		}
	}), i.push(() => {
		for (let e of I.values()) oe(e);
	});
	let se = [];
	function ce(e, t) {
		let n = t.size.width - 1.6, r = -t.size.depth / 2 + .22;
		$(e, h.body, n, Lu, .06, 0, Lu / 2, r), $(e, h.oak, n + .12, .06, .22, 0, 2.4299999999999997, r + .04), p(t.position.x, t.position.z + r + .04, n, .24);
		let i = .26, a = Math.floor(n / i), o = -((a - 1) * i) / 2, s = new G(.13, 2.34, .07), c = new Pe();
		for (let e = 0; e < a; e++) {
			let n = new G(t.position.x + o + e * i, 2.34 / 2, t.position.z + r + .065);
			se.push(new nt().compose(n, c, s));
		}
	}
	let le = /* @__PURE__ */ new Map();
	function z(e) {
		let t = le.get(e);
		return t || le.set(e, t = new Ri({
			color: e,
			roughness: .85,
			metalness: 0
		})), t;
	}
	function ue(e, t, n, r, i) {
		let a = 0;
		for (let e of n.id) a = a * 31 + e.charCodeAt(0) >>> 0;
		let o = a % 2 == 0 ? 1 : -1, s = r / 2 / 1.4, c = (t, n, r, a, c, l, u = 0, d = 0) => {
			let f = $(e, z(t), n, r, a, c * s * o, i + d + r / 2, l);
			return f.rotation.y = u * o, f;
		}, l = "#dedbd2", u = "#30343c", d = "#1c1c20", f = (e, t, n, r, i = 0) => {
			c(l, .4, .008, .3, e, t, n, i), r.forEach((r, o) => {
				let s = .14 + (a >> o + 1) % 4 * .045, l = -.1 + o * .045, u = Math.cos(n), d = Math.sin(n), f = -.15 + s / 2;
				c(r, s, .004, .018, e + f * u + l * d, t - f * d + l * u, n, i + .008);
			});
		};
		switch (c(d, .5, .025, .17, 0, .1), c("#3a3a44", .46, .006, .13, 0, .1, 0, .025), c(d, .07, .03, .11, .37, .12), t.id) {
			case "design":
				f(-.98, -.2, -.18, [
					Q.pink,
					u,
					u
				]), c(l, .4, .008, .3, -.92, .2, .22, .004), [
					Q.pink,
					Q.violet,
					Q.orange,
					"#2bd576"
				].forEach((e, t) => c(e, .075, .006, .075, -1.03 + t % 2 * .11, .13 + Math.floor(t / 2) * .11, .22, .012)), [
					"#ff2e88",
					"#ff6a3a",
					"#ffb08f",
					"#8f75ff",
					"#2bd576"
				].forEach((e, t) => c(e, .05, .008, .16, .7 + t * .045, -.36, -.25 + t * .12, t * .002)), c(d, .42, .022, .3, .96, .14, -.12), c("#3a3a44", .34, .004, .22, .96, .14, -.12, .022), c(l, .014, .014, .17, 1.24, .1, -.3), c("#c2962a", .08, .11, .08, -.66, -.46), [
					Q.pink,
					"#2c8a86",
					l
				].forEach((e, t) => c(e, .014, .08, .014, -.685 + t * .025, -.46 + (t - 1) * .02, 0, .11));
				break;
			case "development":
				c(l, .4, .008, .3, -.98, .02, .14), c(l, .4, .008, .3, -.95, .04, -.08, .008), f(-.96, .05, .05, [
					Q.violet,
					u,
					"#2bd576",
					u,
					u,
					Q.violet
				], .016), c("#2f4f7d", .32, .06, .23, .98, -.32, -.1), c(Q.violet, .29, .05, .21, .97, -.31, .12, .06), c(l, .085, .095, .085, .72, .3), c("#3a2416", .065, .004, .065, .72, .3, 0, .095), c(d, .17, .045, .12, 1.12, .22, .3), c("#2bd576", .025, .012, .025, 1.16, .2, .3, .045), c("#d8c23a", .08, .008, .08, -.68, -.4, .2), c("#ff8a5a", .08, .008, .08, -.6, -.33, -.15, .002);
				break;
			case "content":
				c(d, .03, .12, .03, -.98, -.26), c(d, .2, .13, .11, -.98, -.26, .3, .12), c("#3a3a44", .09, .09, .08, -.955, -.175, .3, .14), c("#ff3b5c", .02, .02, .02, -1.06, -.3, .3, .25), c(d, .11, .02, .11, .82, -.34), c("#6c7078", .02, .2, .02, .82, -.34, 0, .02), c("#8e8e99", .06, .1, .06, .82, -.34, 0, .22), c(d, .28, .014, .2, 1, .2, -.3), [
					0,
					1,
					2,
					3
				].forEach((e) => c(e % 2 ? d : l, .07, .016, .05, .92 + e * .066, .1 - e * .02, -.3, .004)), f(-.9, .24, .2, [
					Q.orange,
					u,
					u,
					u
				]);
				break;
			case "sales":
				c("#2a2a30", .17, .024, .23, -.78, .2, .2), c("#9fd8b0", .13, .004, .045, -.76, .115, .2, .024), [
					0,
					1,
					2
				].forEach((e) => c("#b9b6ae", .13, .008, .032, -.79 + e * .011, .185 + e * .05, .2, .024)), c(d, .085, .014, .17, -1.1, -.08, -.25), c("#2f78b0", .07, .003, .14, -1.1, -.08, -.25, .014), c(d, .24, .025, .03, .92, .2, .35, .03), c(d, .07, .085, .085, .81, .24, .35), c(d, .07, .085, .085, 1.03, .16, .35), c(Q.peach, .02, .07, .07, .85, .225, .35, .008), c(d, .012, .012, .13, .78, .31, .6, .03), f(-.95, -.36, -.1, [
					Q.peach,
					u,
					u
				]), c("#2f4f7d", .014, .014, .15, -.72, -.34, .5, .008), c(l, .095, .022, .058, .74, -.38, .1);
				break;
			case "research":
				c("#2c8a86", .3, .055, .22, -.98, -.28, .1), c("#7a2f2a", .28, .05, .2, -.97, -.27, -.12, .055), c("#c2962a", .24, .04, .18, -.98, -.28, .2, .105), c(l, .4, .008, .3, .95, .08, -.15), [
					.06,
					.12,
					.09,
					.17
				].forEach((e, t) => c("#2bd576", .045, .004, e, .84 + t * .07, .15 - e / 2, -.15, .008)), c(d, .12, .014, .12, -.8, .26, .4), c("#9fc4d8", .085, .004, .085, -.8, .26, .4, .014), c(d, .022, .014, .14, -.72, .36, .4), c("#d8c23a", .08, .008, .08, .7, -.38, .2), c("#ff8a5a", .08, .008, .08, .79, -.42, -.1);
				break;
			default: f(-.95, .1, .12, [
				u,
				u,
				Q.pink
			]), c(d, .08, .1, .08, -.7, -.42), c(l, .014, .07, .014, -.7, -.42, 0, .1), n.id === "exec.ceo" ? (c(Iu.slat, .34, .07, .06, .95, .42), c("#c2962a", .26, .035, .004, .95, .452, 0, .018)) : (c("#3a2a1e", .36, .012, .28, .95, .1, -.15), [
				"#d8c23a",
				"#ff8a5a",
				"#2bd576",
				"#8f75ff",
				"#d8c23a",
				"#ff2e88"
			].forEach((e, t) => c(e, .07, .006, .07, .86 + t % 3 * .1, .03 + Math.floor(t / 3) * .11, -.15, .012)));
		}
	}
	function B(t, n) {
		let r = t.accent ?? Q.soft, { width: i, depth: o, height: s } = eu(n), c = tu(t, n), l = nu(t, n), u = n.rotation ?? 0, d = new At();
		d.name = `desk:${n.id}`, d.position.set(c.x, c.y, c.z), d.rotation.y = u, d.scale.setScalar(Ul), e.add(d), p(c.x, c.z, (Math.abs(Math.cos(u)) * i + Math.abs(Math.sin(u)) * o) * Ul, (Math.abs(Math.sin(u)) * i + Math.abs(Math.cos(u)) * o) * Ul), $(d, h.oak, i, .11, o, 0, s - .055, 0), $(d, _(r, n.vacant ? .22 : 1), i + .04, .04, o + .04, 0, s - .13, 0);
		let f = s - .15;
		$(d, h.body, .16, f, o - .16, -(i / 2 - .16), f / 2, 0), $(d, h.body, .16, f, o - .16, i / 2 - .16, f / 2, 0), $(d, h.body, i - .32, f * .62, .08, 0, f * .69, -(o / 2 - .16));
		let m = n.size === "executive" ? [-.62, .62] : [0];
		for (let e of m) {
			let t = new At();
			t.position.set(e, s, -(o / 2 - .3)), t.rotation.y = -e * .3, d.add(t), $(t, h.body, .36, .05, .24, 0, .025, 0), $(t, h.body, .1, .3, .08, 0, .16, -.03), $(t, h.body, 1, .6, .09, 0, .56, -.025);
			let i = new Y(Nu, h.screenOff);
			n.vacant || (I.get(n.id) ?? I.set(n.id, {
				accent: r,
				displays: [],
				content: null
			}).get(n.id)).displays.push(i), i.userData.dynamic = !0, i.scale.set(.9, .5, 1), i.position.set(0, .56, .021), t.add(i);
		}
		n.vacant || ue(d, t, n, i, s);
		let g = o / 2 + $l;
		$(d, h.soft, .54, .12, .52, 0, .44, g), $(d, h.body, .14, .38, .14, 0, .19, g), $(d, h.body, .4, .05, .4, 0, .025, g), $(d, h.soft, .54, .54, .11, 0, .77, g + .26);
		let v = Wu(n.role, n.vacant ? "desk-label is-vacant" : "desk-label", r);
		v.position.set(0, s + 1.2, 0), d.add(v), a.set(n.id, {
			deskId: n.id,
			zoneId: t.id,
			role: n.role,
			accent: r,
			vacant: !!n.vacant,
			position: new G(c.x, c.y, c.z),
			seat: new G(l.x, l.y, l.z),
			rotation: u,
			group: d,
			label: v
		});
	}
	let de = new pi(.17, 1, .17);
	function fe(t, n) {
		let r = (t.scale ?? 1) * Ul, i = t.kind === "tree", a = new At();
		a.name = `plant:${t.id}`, a.position.set(t.position.x, 0, t.position.z), e.add(a);
		let o = 101 + n * 37, s = () => (o = o * 16807 % 2147483647) / 2147483647, c = (i ? .95 : .72) * r, l = (i ? .6 : .46) * r;
		$(a, h.oak, c, l, c, 0, l / 2, 0), $(a, h.soil, c - .12, .04, c - .12, 0, l + .005, 0), p(t.position.x, t.position.z, c, c);
		let u = new At();
		a.add(u);
		let d = l;
		if (i) {
			let e = (1.5 + s() * .5) * r, t = new Y(de, h.trunk);
			t.scale.set(r, e, r), t.position.y = l + e / 2, a.add(t), d = l + e;
		}
		u.position.y = d;
		let f = (i ? .78 : .42) * r;
		(i ? [
			[
				2.1,
				.8,
				.5
			],
			[
				1.5,
				.6,
				1.2
			],
			[
				.85,
				.5,
				1.75
			]
		] : [[
			2,
			1.1,
			.75
		], [
			1.2,
			.6,
			1.6
		]]).forEach(([e, t, n], r) => {
			let i = new Y(Mu, h.foliage[(r + Math.floor(s() * h.foliage.length)) % h.foliage.length]);
			i.scale.set(e * f, t * f, e * f);
			let a = r === 0 ? 0 : f * .18;
			i.position.set((s() - .5) * 2 * a, n * f, (s() - .5) * 2 * a), u.add(i);
		});
	}
	let V = [
		"#e8742a",
		"#e8c22e",
		"#c8362e",
		"#e86aa0",
		"#8a5cd0"
	];
	function H(t) {
		let n = new At();
		n.name = `planter:${t.id}`, n.position.set(t.position.x, 0, t.position.z), t.along === "z" && (n.rotation.y = Math.PI / 2), e.add(n);
		let { width: r, height: i } = Xl, { length: a } = t;
		p(t.position.x, t.position.z, t.along === "x" ? a : r, t.along === "x" ? r : a);
		let o = 7;
		for (let e of t.id) o = (o * 31 + e.charCodeAt(0)) % 2147483647;
		let s = () => (o = o * 16807 % 2147483647) / 2147483647;
		$(n, h.oak, a, i, r, 0, i / 2, 0), $(n, h.slat, a + .06, .07, r + .06, 0, i - .035, 0), $(n, h.soil, a - .1, .02, r - .12, 0, i + .005, 0);
		let c = Math.max(1, Math.round((a - .1) / .6)), l = (a - .1) / c, u = V[Math.floor(s() * V.length)], d = Math.floor(s() * 4);
		for (let e = 0; e < c; e++) {
			e % 3 == 0 && e > 0 && (u = V[(V.indexOf(u) + 1 + Math.floor(s() * (V.length - 1))) % V.length], d = (d + 1 + Math.floor(s() * 3)) % 4);
			let t = -a / 2 + .05 + (e + .5) * l, o = .2 + s() * .14;
			$(n, h.foliage[e % h.foliage.length], l + .02, o, r - .1, t, i + o / 2, 0);
			let c = i + o, f = (e, r, i, a, o, s, c) => $(n, z(e), r, i, a, t + o, s + i / 2, c);
			if (d === 0) for (let e = 0; e < 3; e++) {
				let t = (e - 1) * .18 + (s() - .5) * .06, n = (s() - .5) * .24, r = .14 + s() * .12;
				f("#3f8a52", .03, r, .03, t, c, n), f(u, .11, .12, .11, t, c + r, n);
			}
			else if (d === 1) for (let e = 0; e < 5; e++) f(u, .1, .06, .1, (s() - .5) * (l - .1), c, (s() - .5) * .3);
			else if (d === 2) for (let e = 0; e < 4; e++) {
				let t = (e - 1.5) * .13, n = (s() - .5) * .26, r = .24 + s() * .16;
				f("#3f8a52", .03, .08, .03, t, c, n), f(u, .07, r, .07, t, c + .08, n);
			}
			else for (let e = 0; e < 2; e++) {
				let t = (e - .5) * .26, n = (s() - .5) * .2, r = .12 + s() * .1;
				f("#3f8a52", .03, r, .03, t, c, n), f(u, .18, .05, .18, t, c + r, n), f("#3a2416", .07, .03, .07, t, c + r + .05, n);
			}
		}
	}
	function pe(t, n, r) {
		let i = new At();
		i.name = `bench:${r}`, i.position.set(t, 0, n), e.add(i), $(i, h.oak, .7, .1, 2.6, 0, .52, .2), $(i, h.oak, .08, .5, 2.6, -.34, .82, .2);
		for (let e of [-.8, 1.2]) $(i, h.body, .6, .47, .1, 0, .235, e);
		$(i, z("#b5503c"), .5, .06, .9, .02, .6, .7), p(t, n + .2, .8, 2.7), H({
			id: `bench.${r}`,
			position: {
				x: t,
				z: n - 1.5
			},
			length: .8,
			along: "x"
		});
	}
	function me(t, n, r) {
		let i = new At();
		i.name = "shelving:lounge", i.position.set(t, 0, n), e.add(i);
		let a = .44, o = [
			.06,
			.52,
			.98,
			1.44
		];
		for (let e of o) $(i, h.oak, a, .05, r, 0, e, 0);
		for (let e = 0; e <= 4; e++) $(i, h.oak, a, 1.44, .05, 0, .74, -r / 2 + e * r / 4);
		p(t, n, .54, r);
		let s = 99, c = () => (s = s * 16807 % 2147483647) / 2147483647, l = [
			"#2f4f7d",
			"#b5503c",
			"#c2962a",
			"#2c8a86",
			"#dedbd2",
			"#5a3a22",
			"#8a5cd0",
			"#30343c"
		];
		for (let e = 0; e < 4; e++) {
			let t = -r / 2 + e * r / 4 + .08, n = r / 4 - .16;
			for (let r = 0; r < 3; r++) {
				let a = o[r] + .025, s = (e * 2 + r * 3) % 5;
				if (s !== 4) {
					if (s < 3) {
						let e = t;
						for (; e < t + n - .3;) {
							let t = .05 + c() * .05, n = .26 + c() * .1;
							$(i, z(l[Math.floor(c() * l.length)]), .3, n, t, 0, a + n / 2, e + t / 2), e += t + .004;
						}
					} else $(i, z("#b9b6ae"), .33999999999999997, .24, .4, 0, a + .12, t + .25), $(i, z("#5a3a22"), .32, .18, .3, 0, a + .09, t + n - .2);
				}
			}
		}
		for (let e of [
			-r / 2 + .5,
			.1,
			r / 2 - .6
		]) $(i, z("#dedbd2"), .24, .2, .24, 0, 1.565, e), $(i, h.foliage[1], .36, .26, .36, 0, 1.79, e), $(i, h.foliage[0], .22, .16, .22, .02, 1.98, e + .02);
	}
	function he(e, t, n) {
		t.updateWorldMatrix(!0, !1);
		let r = new nt().copy(t.matrixWorld).invert(), i = /* @__PURE__ */ new Map(), a = (e) => {
			if (e.userData.dynamic || !e.visible) return;
			let t = e;
			if (t.isMesh && !t.isInstancedMesh && !Array.isArray(t.material) && t.material.visible) {
				let e = Object.keys(t.geometry.attributes).sort().join(","), n = `${t.material.uuid}:${t.renderOrder}:${e}`, a = i.get(n);
				a || i.set(n, a = {
					material: t.material,
					renderOrder: t.renderOrder,
					parts: [],
					meshes: []
				}), t.updateWorldMatrix(!0, !1);
				let o = (t.geometry.index ? t.geometry.toNonIndexed() : t.geometry.clone()).applyMatrix4(new nt().multiplyMatrices(r, t.matrixWorld));
				a.parts.push(o), a.meshes.push(t);
			}
			for (let t of [...e.children]) a(t);
		};
		for (let t of e) for (let e of [...t.children]) a(e);
		let o = 0;
		for (let e of i.values()) {
			if (e.meshes.length < 2) {
				for (let t of e.parts) t.dispose();
				continue;
			}
			let r = au(e.parts, !1);
			for (let t of e.parts) t.dispose();
			if (!r) continue;
			let i = new Y(r, e.material);
			i.name = `${n}:${o++}`, i.renderOrder = e.renderOrder, t.add(i);
			for (let t of e.meshes) {
				let e = t.parent;
				if (e) {
					for (let n of [...t.children]) {
						let t = n.matrixWorld.clone();
						e.add(n), e.updateWorldMatrix(!0, !1), t.premultiply(new nt().copy(e.matrixWorld).invert()).decompose(n.position, n.quaternion, n.scale);
					}
					e.remove(t);
				}
			}
		}
	}
	let ge = [];
	function _e() {
		let { thickness: t, height: n, sill: r } = Wl, i = Hl.width / 2, a = Hl.depth / 2, o = a - .8, s = (i, a, o, s, c, l) => {
			let u = new At();
			u.name = `wall:${i}`, u.position.set(o, 0, s), u.rotation.y = c, e.add(u), $(u, h.plaster, a, r, t, 0, r / 2, 0), $(u, h.oak, a, .14, .06, 0, .07, t / 2 + .03), $(u, h.oak, a, .06, t + .08, 0, r + .03, 0);
			let d = new At();
			d.position.y = r + .06, d.userData.dynamic = !0, u.add(d);
			let f = n - r - .06, p = Math.max(1, Math.round(a / 6)), m = a / p, g = 1.5, _ = .7;
			$(d, h.plaster, a, _, t, 0, f - _ / 2, 0), $(d, h.oak, a + .1, .12, t + .14, 0, f + .06, 0);
			for (let e = 0; e <= p; e++) {
				let n = -a / 2 + e * m, r = e === 0 || e === p ? g / 2 : g;
				$(d, h.plaster, r, f - _, t, n + (e === 0 ? r / 2 : e === p ? -r / 2 : 0), (f - _) / 2, 0);
			}
			for (let e = 0; e < p; e++) {
				let t = -a / 2 + (e + .5) * m, n = m - g;
				$(d, h.glass, n, f - _, .05, t, (f - _) / 2, 0).renderOrder = 2, $(d, h.oak, .08, f - _, .1, t, (f - _) / 2, 0);
			}
			he([d], d, `wall:${i}`), ge.push({
				tall: d,
				normal: l,
				at: new G(o, 0, s),
				shown: 1
			});
		}, c = t / 2;
		s("back", Hl.width, 0, -a + c, 0, new G(0, 0, -1)), s("left", o + a - t, -i + c, (o - a + t) / 2, Math.PI / 2, new G(-1, 0, 0)), s("right", o + a - t, i - c, (o - a + t) / 2, -Math.PI / 2, new G(1, 0, 0)), p(0, -a + c, Hl.width, t), p(-i + c, 0, t, Hl.depth), p(i - c, 0, t, Hl.depth);
		let l = new At();
		l.name = "wall:front", l.position.set(0, 0, o), e.add(l);
		let u = 9.14, d = i - t, f = (d - u) / 4;
		for (let e of [-1, 1]) {
			let t = e * (u + d) / 2;
			$(l, h.glass, d - u, 2.9, .05, t, 1.45, 0).renderOrder = 2, $(l, h.oak, d - u, .12, .18, t, 2.96, 0), $(l, h.oak, d - u, .1, .18, t, .05, 0);
			for (let t = 1; t <= 4; t++) $(l, h.oak, .18, 3.02, .18, e * (u + t * f), 1.51, 0);
			p(t, o, d - u, .3);
		}
	}
	let ve = () => {};
	function ye(e) {
		let t = e.accent ?? Q.soft, n = j(e);
		ie(n, e, t, !0), ce(n, e), e.desks.forEach((t) => B(e, t)), A(t, e.position.x, e.position.z, 150), ne(e);
	}
	function be(e) {
		let t = e.elevation ?? 0, { width: r, depth: i } = e.size, a = j(e);
		$(a, h.deck, r, t, i, 0, t / 2, 0);
		let o = 2.6;
		$(a, h.deck, o, t / 2, .7, 0, t / 4, i / 2 + .35);
		let { x: s, z: c } = e.position;
		l.push({
			minX: s - r / 2,
			maxX: s + r / 2,
			minZ: c - i / 2,
			maxZ: c + i / 2,
			height: t
		}), l.push({
			minX: s - o / 2,
			maxX: s + o / 2,
			minZ: c + i / 2,
			maxZ: c + i / 2 + .7,
			height: t / 2
		});
		let u = .3;
		p(s, c - i / 2, r, u), p(s - r / 2, c, u, i), p(s + r / 2, c, u, i);
		let d = (r - o) / 2;
		p(s - (o + d) / 2, c + i / 2, d, u), p(s + (o + d) / 2, c + i / 2, d, u);
		let f = new pi(1, 1, 1, 48, 1, 1), g = f.getAttribute("position"), v = new Float32Array(g.count * 3), y = new J();
		for (let e = 0; e < g.count; e++) {
			zu(g.getX(e) + .5, y);
			let t = Ru(`#${y.getHexString()}`);
			v.set([
				t.r,
				t.g,
				t.b
			], e * 3);
		}
		f.setAttribute("color", new yn(v, 3));
		let b = new Y(f, new fr({ vertexColors: !0 }));
		b.scale.set(r + .06, .045, i + .06), b.position.y = t - .06, a.add(b);
		let x = .1, S = -2.2, C = new At();
		C.position.set(x, t, S), $(C, h.body, 1.3, .14, 1.3, 0, .07, 0), $(C, h.body, 1, .1, 1, 0, .19, 0);
		let w = new At();
		w.position.set(x, t + .245, S), Hu(w, _(Q.pink), .8, .8, 0, .05);
		let T = (e, t, n) => new ei(new Si(new pi(e, e, e)), new Hr({
			color: Ru(t, n),
			transparent: !0,
			opacity: .9
		})), E = T(.95, Q.lightViolet, .6), O = T(.56, Q.pink, .6);
		E.add(O);
		let k = new Y(Mu, _(Q.orange, 1.1));
		k.scale.setScalar(.2);
		let ee = t + 1.75;
		E.position.set(x, ee, S), k.position.set(x, ee, S);
		for (let e of [E, k]) e.userData.dynamic = !0;
		a.add(C, w, E, k);
		let M = new Y(new Ei(.95, 12, 8), new fr({ visible: !1 }));
		M.position.set(x, ee, S), a.add(M), D = {
			position: new G(s + x, t + .3, c + S),
			pick: M
		}, m(s + x, c + S, .66), n.push((e) => {
			let t = Math.sin(e * .9) * .06;
			E.position.y = ee + t, k.position.y = ee + t, E.rotation.set(Math.sin(e * .23) * .3, e * .35, 0), O.rotation.set(e * .5, -e * .8, 0), k.rotation.set(e * .4, -e * .6, 0);
		}), e.desks.forEach((t) => B(e, t)), A(null, e.position.x, e.position.z, 165, 13), ne(e);
	}
	function xe(e) {
		let t = e.accent ?? Q.white, r = j(e);
		ie(r, e, t, !1, .72), e.desks.forEach((t) => B(e, t));
		let a = document.createElement("canvas");
		a.width = 1024, a.height = 512;
		let o = a.getContext("2d"), c = new li(a);
		c.colorSpace = k, c.anisotropy = 8;
		let l = () => {
			qu(o, a.width, a.height, s), c.needsUpdate = !0;
		};
		l(), i.push(l), ve = l;
		let u = new fr({
			map: c,
			color: new J(1.7, 1.7, 1.7),
			transparent: !0,
			opacity: .92,
			blending: 2,
			depthWrite: !1,
			side: 2
		}), d = new Y(Nu, u), f = -1.5, m = 2.75;
		d.scale.set(4.4, 2.2, 1), d.position.set(0, m, f), d.renderOrder = 4, d.userData.dynamic = !0, r.add(d);
		let h = new Y(Nu, new fr({
			color: Q.void,
			transparent: !0,
			opacity: .62,
			depthWrite: !1,
			side: 2
		}));
		h.scale.copy(d.scale), h.renderOrder = 3, d.add(h), h.scale.set(1, 1, 1), h.position.z = -.004, $(r, _(Q.pink), 4.4, .04, .1, 0, .03, f), p(e.position.x, e.position.z + f, 4.4, .2), n.push((e) => {
			d.position.y = m + Math.sin(e * .8) * .04;
			let t = Math.sin(e * 1.7) + Math.sin(e * 4.3 + 1);
			u.opacity = t > 1.88 ? .7 : .92;
		}), ne(e);
	}
	function Se(e) {
		let t = e.accent ?? Q.soft, { width: n, depth: r } = e.size, i = j(e), a = new zi({
			color: "#ffffff",
			transparent: !0,
			opacity: .07,
			roughness: .08,
			metalness: 0,
			clearcoat: 1,
			side: 2,
			depthWrite: !1
		}), o = (e, t, n, r, o, s) => {
			$(i, a, e, t, n, r, o, s).renderOrder = 2;
		}, { x: s, z: c } = e.position, l = .2;
		o(n, 3, .02, 0, 3 / 2, -r / 2), o(n, 3, .02, 0, 3 / 2, r / 2), o(.02, 3, r, -n / 2, 3 / 2, 0), o(n, .02, r, 0, 3, 0), p(s, c - r / 2, n, l), p(s, c + r / 2, n, l), p(s - n / 2, c, l, r);
		let u = e.door?.width ?? 0, d = 2.2, f = (r - u) / 2;
		for (let e of [-1, 1]) {
			let t = e * (u / 2 + f / 2);
			o(.02, 3, f, n / 2, 3 / 2, t), p(s + n / 2, c + t, l, f);
		}
		u > 0 && o(.02, .7999999999999998, u, n / 2, 2.6, 0);
		let g = _(t, .6);
		Hu(i, g, n, r, .02, .06), Hu(i, g, n, r, 3, .05);
		for (let e of [-1, 1]) for (let t of [-1, 1]) $(i, g, .05, 3, .05, e * n / 2, 3 / 2, t * r / 2);
		u > 0 && ($(i, g, .05, d, .05, n / 2, d / 2, -u / 2), $(i, g, .05, d, .05, n / 2, d / 2, u / 2), $(i, g, .05, .05, u, n / 2, d, 0)), $(i, h.oak, 3.4, .12, 2.2, 0, .72, 0), $(i, h.oak, 2.2, .12, 3.4, 0, .72, 0), $(i, g, 3.44, .03, 2.24, 0, .65, 0), $(i, g, 2.24, .03, 3.44, 0, .65, 0), $(i, h.body, .9, .66, .9, 0, .33, 0), m(s, c, 1.7);
		for (let t of e.spots ?? []) {
			let e = $(i, h.soft, .5, .46, .5, t.position.x, .23, t.position.z);
			e.rotation.y = Math.atan2(t.position.x, t.position.z);
		}
		A(null, e.position.x, e.position.z, 110), ne(e);
	}
	function Ce(e) {
		let { width: t, depth: i } = e.size, a = j(e);
		Hu(a, h.dimLine, t, i, .02, .06), $(a, h.soft, 6.6, .42, 1.25, -.4, .21, -1.6), $(a, h.soft, 6.6, .85, .3, -.4, .425, -2.35), $(a, h.soft, 1.25, .42, 3, 3.3, .21, .6), $(a, h.soft, .3, .85, 3, 4.05, .425, .6), $(a, h.body, 1.8, .3, .8, -.4, .15, .5), $(a, h.oak, 2.2, .06, 1.2, -.4, .33, .5), $(a, h.soft, .9, .4, .9, -3.2, .2, 1.5), $(a, h.soft, .9, .4, .9, -1.1, .2, 2.3);
		let { x: o, z: s } = e.position;
		p(o - .4, s - 1.75, 6.6, 1.55), p(o + 3.45, s + .6, 1.55, 3), p(o - .4, s + .5, 2.2, 1.2), p(o - 4.7, s - 2.4, .3, .3);
		let c = 3.05;
		$(a, h.oak, 2.8, .42, .5, -.4, .21, c), $(a, h.body, 2.84, .06, .54, -.4, .45, c), $(a, h.body, .5, .1, .3, -.4, .53, c), $(a, h.body, 2.3, 1.32, .1, -.4, 1.24, c), p(o - .4, s + c, 2.9, .6);
		let l = document.createElement("canvas");
		l.width = 96, l.height = 54;
		let u = new li(l);
		u.colorSpace = k, u.magFilter = r;
		let d = new Y(Nu, new fr({ map: u }));
		d.scale.set(2.16, 1.2, 1), d.position.set(-.4, 1.24, 2.9979999999999998), d.rotation.y = Math.PI, d.userData.dynamic = !0, a.add(d);
		let f = -1;
		n.push((e) => {
			let t = Math.floor(e * 8);
			t !== f && (f = t, Zu(l.getContext("2d"), l.width, l.height, t), u.needsUpdate = !0);
		}), $(a, h.screenOff, .42, .08, .3, .5, .52, c), $(a, _(Q.green, .9), .05, .02, .02, .36, .53, 2.895);
		for (let [e, t] of [[-.85, "#f4f4f6"], [.05, "#26262b"]]) {
			let n = new At();
			n.position.set(e, .385, .42), n.rotation.y = e < -.4 ? .3 : -.25, $(n, new Ri({
				color: t,
				roughness: .6
			}), .3, .05, .16, 0, 0, 0), $(n, new Ri({
				color: t,
				roughness: .6
			}), .07, .05, .1, -.12, -.005, .1), $(n, new Ri({
				color: t,
				roughness: .6
			}), .07, .05, .1, .12, -.005, .1), $(n, h.screenOff, .05, .02, .05, -.08, .03, -.01), $(n, new fr({ color: Q.pink }), .03, .02, .03, .07, .03, .01), $(n, new fr({ color: Q.lightViolet }), .03, .02, .03, .11, .03, -.03), a.add(n);
		}
		$(a, h.body, .06, 1.5, .06, -4.7, .75, -2.4), $(a, _(Q.peach, .75), .26, .3, .26, -4.7, 1.65, -2.4), A(Q.peach, e.position.x, e.position.z, 80), ne(e);
	}
	let we = !1;
	function Te(e) {
		let { width: t, depth: r } = e.size, { x: i, z: a } = e.position, o = j(e);
		Hu(o, h.dimLine, t, r, .02, .06);
		let s = (e, t, n, r, i, a, s) => $(o, z(e), t, n, r, i, a + n / 2, s), c = "#8e8e99", l = "#dedbd2", u = -3.7;
		$(o, h.body, 6.6, 1, .62, -.3, .5, u), $(o, h.oak, 6.7, .06, .7, -.3, 1.03, u), $(o, h.slat, 6.6, 1.55, .08, -.3, 1.83, -4);
		for (let e of [1.62, 2.18]) $(o, h.oak, 6.5, .05, .34, -.3, e, -3.8000000000000003), $(o, _(Q.peach, .8), 6.3, .025, .03, -.3, e - .04, -3.6500000000000004);
		$(o, h.oak, 6.8, .1, .42, -.3, 2.66, -3.8200000000000003), p(i - .3, a + u - .05, 6.8, .9);
		let d = [
			"#b5742a",
			"#2f6e4a",
			"#c9d6dc",
			"#8a2f2a",
			"#2f4f7d",
			"#c2962a",
			"#3a2416",
			"#b9b6ae"
		];
		for (let [e, t] of [1.645, 2.205].entries()) for (let n = 0; n < 9; n++) {
			let r = d[(n * 3 + e * 5) % d.length], i = .24 + (n + e) % 3 * .05, a = .25 + n * .3;
			s(r, .1, i, .1, a, t, -3.8000000000000003), s(r, .045, .09, .045, a, t + i, -3.8000000000000003);
		}
		for (let e = 0; e < 5; e++) s(l, .11, .09, .11, -3.2 + e * .2, 1.645, -3.8000000000000003), e % 2 == 0 && s(l, .11, .09, .11, -3.2 + e * .2, 1.745, -3.8000000000000003);
		for (let e = 0; e < 4; e++) s("#5a3a22", .16, .22, .16, -1.9 + e * .3, 1.645, -3.8000000000000003), s(c, .17, .03, .17, -1.9 + e * .3, 1.865, -3.8000000000000003);
		for (let e = 0; e < 6; e++) s([
			"#c2962a",
			"#8a2f2a",
			"#3a2416"
		][e % 3], .08, .26, .08, -3.2 + e * .24, 2.205, -3.8000000000000003);
		for (let e = 0; e < 4; e++) s(l, .2, .2, .02, -1.5 + e * .3, 2.205, -3.9000000000000004);
		s(c, .95, .5, .5, -2.5, 1.06, u), s("#1c1c20", .99, .08, .54, -2.5, 1.56, u), s("#1c1c20", .8, .04, .2, -2.5, 1.06, -3.3800000000000003);
		for (let e of [-.22, .22]) s("#1c1c20", .12, .1, .12, -2.5 + e, 1.36, -3.4000000000000004), s("#3a2416", .03, .05, .2, -2.5 + e, 1.3, -3.2800000000000002);
		for (let e = 0; e < 4; e++) s(l, .1, .08, .1, -2.8 + e * .2, 1.64, u);
		s("#1c1c20", .24, .42, .26, -1.55, 1.06, u), s("#5a3a22", .18, .16, .18, -1.55, 1.48, u), s("#1c1c20", .95, 1.95, .7, 3.6, 0, u), $(o, _("#cfe6ff", .5), .75, 1.5, .02, 3.6, 1.05, -3.3400000000000003);
		for (let e = 0; e < 4; e++) for (let t = 0; t < 5; t++) s([
			"#b5432e",
			"#2c8a86",
			"#c2962a"
		][(e + t) % 3], .09, .15, .03, 3.33 + t * .135, .42 + e * .36, -3.325);
		p(i + 3.6, a + u, 1, .8), $(o, h.body, 6.6, .96, .7, 0, .48, -2), $(o, h.slat, 6.6, .8, .04, 0, .5, -1.63), $(o, h.oak, 6.9, .08, .9, 0, 1, -2), $(o, _(Q.peach, .9), 6.4, .03, .04, 0, .05, -1.6), p(i, a + -2, 6.9, .95);
		for (let [e, t] of [
			[-2.4, "#3a2416"],
			[-1.1, "#3a2416"],
			[1.3, "#c2962a"]
		]) s(l, .2, .02, .2, e, 1.04, -1.88), s(l, .1, .09, .1, e, 1.06, -1.88), s(t, .07, .01, .07, e, 1.15, -1.88);
		s(c, .1, .26, .1, 2.5, 1.04, -2.1), s(c, .07, .07, .07, 2.5, 1.3, -2.1);
		for (let e of [
			.3,
			.5,
			2.9
		]) s("#c9d6dc", .08, .14, .08, e, 1.04, -2.12);
		s("#1c1c20", .5, .03, .3, -.2, 1.04, -2.1);
		for (let e of [
			-2.2,
			0,
			2.2
		]) $(o, h.body, .02, 1.1, .02, e, 3.15, -2), $(o, h.body, .3, .16, .3, e, 2.56, -2), $(o, _(Q.peach, 1), .2, .04, .2, e, 2.46, -2);
		for (let t of e.spots ?? []) {
			if (!t.id.includes("stool")) continue;
			let { x: e, z: n } = t.position;
			$(o, h.body, .4, .04, .4, e, .02, n), $(o, h.body, .1, .48, .1, e, .26, n), $(o, h.soft, .5, .1, .5, e, .53, n);
		}
		let f = Jl, m = f.height;
		$(o, z("#1f5f8a"), f.length, .06, f.width, f.x, m - .03, f.z);
		for (let e of [-1, 1]) s(l, f.length, .004, .035, f.x, m, f.z + e * (f.width / 2 - .02));
		for (let e of [-1, 1]) s(l, .035, .004, f.width, f.x + e * (f.length / 2 - .02), m, f.z);
		s(l, f.length, .004, .02, f.x, m, f.z), s(l, .02, .17, f.width + .16, f.x, m, f.z);
		for (let e of [-1, 1]) s("#1c1c20", .04, .2, .04, f.x, m, f.z + e * (f.width / 2 + .08));
		for (let e of [-1, 1]) {
			for (let t of [-1, 1]) $(o, h.body, .08, m - .06, .08, f.x + e * (f.length / 2 - .3), (m - .06) / 2, f.z + t * (f.width / 2 - .25));
			let t = s("#b5432e", .17, .02, .17, f.x + e * 1.2, m, f.z + e * .45);
			t.rotation.y = .5 * e;
			let n = s("#a87a4b", .035, .02, .13, f.x + e * 1.26, m, f.z + e * .45 + .14);
			n.rotation.y = .5 * e;
		}
		p(i + f.x, a + f.z, f.length, f.width);
		let g = $(o, z("#f2efe8"), .07, .07, .07, f.x - .6, m + .035, f.z + .3);
		g.userData.dynamic = !0, n.push((e) => {
			if (!we) {
				g.position.set(f.x - .6, m + .035, f.z + .3);
				return;
			}
			let t = e / .8, n = Math.cos(t * Math.PI), r = t - Math.floor(t);
			g.position.set(f.x + n * (f.length / 2 + .25), m + .06 + Math.abs(Math.sin(r * Math.PI * 2)) * .34, f.z + Math.sin(t * 1.9) * .45);
		}), ne(e);
	}
	for (let e of ql) {
		switch (e.kind) {
			case "executive":
				be(e);
				break;
			case "coordinator":
				xe(e);
				break;
			case "department":
				ye(e);
				break;
			case "meeting":
				u = {
					x: e.position.x,
					z: e.position.z,
					by: ru(e)
				}, Se(e);
				break;
			case "cafe":
				Te(e);
				break;
			case "lounge": u = {
				x: e.position.x,
				z: e.position.z,
				by: ru(e)
			}, Ce(e);
		}
		u = null;
		let t = a.get(Cl), n = e.kind === "executive" && t ? t.seat.clone() : e.kind === "lounge" ? new G(e.position.x - .4 * ru(e), 0, e.position.z + .5 * ru(e)) : new G(e.position.x, e.elevation ?? 0, e.position.z);
		for (let t of e.spots ?? []) {
			let r = iu(e, t), i = e.kind === "cafe" ? t.id.includes("pong") ? new G(e.position.x + Jl.x, 0, e.position.z + Jl.z) : new G(r.x, 0, r.z - 4) : n;
			o.set(t.id, {
				spotId: t.id,
				zoneId: e.id,
				position: new G(r.x, r.y, r.z),
				posture: t.posture ?? "sit",
				focus: i
			});
		}
	}
	let Ee = new At();
	Ee.name = "review-tray";
	let De = new fr({ color: Ru(Q.orange, 1.15) }), Oe = Wu("", "review-label", Q.orange), ke = new Y(Mu, new fr({ visible: !1 })), Ae = new Y(new Ci(.11), De), je = 0, Me = !1;
	{
		let t = a.get("exec.ceo");
		if (t) {
			let { height: r } = eu({
				id: "exec.ceo",
				role: "",
				position: {
					x: 0,
					z: 0
				},
				size: "executive"
			});
			Ee.position.copy(t.position), Ee.rotation.y = t.rotation, Ee.scale.setScalar(Ul);
			let i = new At();
			i.name = "review-pile", i.position.set(.72, r, .34), Ee.add(i), ke.scale.set(.62, .7, .5), ke.position.set(.72, r + .3, .34), Ae.position.set(.72, r + .62, .34), Oe.position.set(.72, r + .9, .34), Ee.add(ke, Ae, Oe), Ee.visible = !1, e.add(Ee), n.push((e) => {
				if (!Ee.visible) return;
				Ae.rotation.y = e * 1.6, Ae.position.y = r + .62 + Math.sin(e * 2.2) * .05;
				let t = 1 + Math.sin(e * (Me ? 5.5 : 3.1)) * (Me ? .22 : .12);
				De.color.copy(Ru(Me ? Q.alert : Q.orange, 1.15)).multiplyScalar(t);
			});
		}
	}
	function Ne(e, t = !1) {
		let n = Ee.getObjectByName("review-pile");
		if (!n) return;
		je = e.length, Me = t, Ee.visible = je > 0, n.clear(), e.slice(0, 5).forEach((e, t) => {
			let r = new At();
			r.position.y = t * .038, r.rotation.y = t * 37 % 7 * .09 - .25, $(r, z("#d99a3a"), .36, .03, .26, 0, .015, 0), $(r, z("#e8b45a"), .13, .03, .035, -.09, .015, -.145), $(r, De, .37, .008, .27, 0, .034, 0), $(r, z("#dedbd2"), .3, .006, .2, .01, .031, .01), n.add(r);
		});
		let r = Oe.element;
		r.textContent = `${je === 1 ? `${e[0]} · ` : `${je} `}${t ? "needs attention" : "for review"}`, r.dataset.troubled = String(t);
	}
	Yl.forEach(fe), Zl.forEach(H), pe(-10, -11, "west"), pe(10, -11, "east"), me(13.6, 14.4, 4.4), _e(), re(), F();
	let W = P();
	if (!D) throw Error("The layout has no executive zone, so there is no company core");
	if (se.length > 0) {
		let t = new Fr(Mu, h.slat, se.length);
		se.forEach((e, n) => t.setMatrixAt(n, e)), t.instanceMatrix.needsUpdate = !0, t.computeBoundingSphere(), t.name = "slat-walls", e.add(t);
	}
	e.updateMatrixWorld(!0), he(e.children.filter((e) => /^(zone|desk|banner|plant|planter|bench|shelving|entrance|monument|vending|wall):/.test(`${e.name}:`)), e, "office");
	let Fe = /^outdoors:(grass|road|walk|sand|wetSand|sea|line|hill|ridge\w+)$/;
	return e.traverse((e) => {
		let t = e;
		if (!t.isMesh || Array.isArray(t.material) || t.isInstancedMesh) return;
		let n = t.material;
		if (!n.isMeshStandardMaterial) return;
		let r = !1;
		for (let e = t; e; e = e.parent) e.name === "outdoors" && (r = !0);
		(!r || t.name.startsWith("outdoors:")) && (t.receiveShadow = !0, t.castShadow = !n.transparent && n.visible && !Fe.test(t.name));
	}), {
		scene: e,
		fog: t,
		desks: a,
		spots: o,
		obstacles: c,
		core: D,
		vending: { dock: W },
		setDeskScreen: L,
		floorHeightAt(e, t) {
			let n = 0;
			for (let r of l) e >= r.minX && e <= r.maxX && t >= r.minZ && t <= r.maxZ && (n = Math.max(n, r.height));
			return n;
		},
		setMissions(e) {
			s = e, ve();
		},
		update(e, t) {
			for (let t of n) t(e);
			for (let e of ge) {
				let n = (t.position.x - e.at.x) * e.normal.x + (t.position.z - e.at.z) * e.normal.z > 0 ? 0 : 1;
				e.shown !== n && (e.shown += Math.sign(n - e.shown) * Math.min(Math.abs(n - e.shown), .08), e.tall.visible = e.shown > .01, e.tall.scale.y = Math.max(e.shown, .001), S = !0);
			}
		},
		setSky(n) {
			let { daylight: r, warmth: i } = n;
			nd.lerpColors(td.night, td.day, r).lerp(td.golden, i * .55 * Math.min(1, r * 3)), e.background.copy(nd), t.color.copy(nd), b.color.lerpColors(td.roomLight, td.dayLight, r).lerp(td.goldenLight, i * .5 * r), b.groundColor.lerpColors(td.roomBounce, td.dayBounce, r), b.intensity = U.lerp(1.2, 2.15, r), x.position.set(Math.cos(n.sunAngle) * 78 + 26, Math.sin(n.sunAngle) * 62 + 8, 92).multiplyScalar(2.4).add(x.target.position), x.color.lerpColors(td.sunNoon, td.sunLow, i), x.intensity = r * U.lerp(5.3, 2.5, i), r > .02 && C.angleTo(x.position) > .006 && (C.copy(x.position), S = !0), x.castShadow = r > .02, w.position.copy(x.position).sub(x.target.position).normalize().multiplyScalar(640), w.material.color.lerpColors(td.sunNoon, td.sunLow, i), w.material.opacity = Math.min(1, r * 1.6), w.visible = r > .02;
			let a = U.lerp(1, .22, r) * (1 - U.smoothstep(r, .8, .96)), o = r < .96;
			for (let { light: e, base: t } of T) e.intensity = t * a, e.visible = o;
			for (let e of E) e.color.setScalar(U.lerp(.62, 1, r));
			let s = pu(r);
			for (let { material: e, on: t, off: n } of g.values()) e.color.lerpColors(n, t, s);
			for (let e of v.values()) e.opacity = .06 * s;
			ee.setDaylight(r);
		},
		redrawText() {
			for (let e of i) e();
		},
		setPong(e) {
			we = e;
		},
		setReviews: Ne,
		reviewTargets: () => je > 0 ? [ke] : [],
		shadowsStale() {
			let e = S;
			return S = !1, e;
		}
	};
}
// src/agents.ts
var id = .78, ad = {
	width: .4,
	height: .56,
	depth: .22
}, od = {
	width: .15,
	length: .52,
	depth: .15
}, sd = {
	wood: new Ri({
		color: "#b98a54",
		roughness: .8
	}),
	rubber: new Ri({
		color: "#c8372d",
		roughness: .7
	})
}, cd = .18, ld = .024, ud = 1.75, dd = 22, fd = new pi(1, 1, 1), pd = fd, md = new Ti(.66, .76, 48), hd = new fr({ visible: !1 }), gd = () => new Ri({
	color: "#1a1a1f",
	roughness: .9,
	metalness: 0,
	flatShading: !0
}), _d = new Ri({
	color: "#101014",
	roughness: .4,
	metalness: .2
}), vd = {
	idle: .28,
	working: 1,
	collaborating: .9,
	blocked: 1,
	reporting: 1
};
function yd(e, t, n, r) {
	return e + (t - e) * (1 - Math.exp(-n * r));
}
function bd(e, t, n, r) {
	return e + Math.atan2(Math.sin(t - e), Math.cos(t - e)) * (1 - Math.exp(-n * r));
}
var xd = (e) => e * e * (3 - 2 * e);
function Sd(e, t, n, r, i, a, o) {
	let s = new Y(t, r);
	s.scale.set(i[0] + o, i[1] + o, i[2] + o), s.position.set(...a);
	let c = new Y(t, n);
	c.scale.set(...i), c.position.set(...a), e.add(s, c);
}
function Cd(e, t, n, r, i, a, o) {
	let s = new At();
	if (s.position.set(n, r, 0), Sd(s, fd, a, t, i, [
		0,
		-i[1] / 2,
		0
	], ld * 2), o) {
		let e = new Y(fd, o);
		e.scale.set(i[0] + .006, .13, i[2] + .006), e.position.set(0, -i[1] + .062, 0), s.add(e);
	}
	return e.add(s), s;
}
var wd = .184;
function Td(e, t, n) {
	if (e.clear(), t === "bald") return;
	let r = (t, r, i, a, o, s) => {
		let c = new Y(fd, n);
		c.scale.set(t, r, i), c.position.set(a, o, s), e.add(c);
	}, i = .39, a = -.192;
	if (t === "curly") r(.49, .22, .49, 0, .41000000000000003, 0), r(.49, .2, .09, 0, .23, -.212);
	else {
		if (r(i, .11, i, 0, .37, 0), r(i, .06, .03, 0, .335, .188), t === "short" && r(i, .2, .05, 0, .26, a), t === "long") {
			r(i, .46, .07, 0, .15000000000000002, -.202);
			for (let e of [-1, 1]) r(.05, .36, .3, e * .194, .19, -.04);
		}
		t === "bun" && (r(i, .16, .05, 0, .28, a), r(.15, .15, .15, 0, .47000000000000003, -.07)), t === "ponytail" && (r(i, .16, .05, 0, .28, a), r(.1, .34, .1, 0, .17, -.262));
	}
}
function Ed(e, t, n) {
	let { look: r } = e;
	r.skin.color.set(t.skin), r.top.color.set(t.top), r.bottom.color.set(t.bottom), r.hairColor.color.set(t.hairColor), Td(r.hair, t.hair, r.hairColor), r.glasses.visible = t.glasses, r.beard.visible = t.beard;
	let i = t.build === "feminine", a = n * Ul;
	e.root.scale.set(a * (i ? .9 : 1), a * (i ? .96 : 1), a * (i ? .9 : 1));
}
function Dd(e, t, n) {
	let r = new fr({
		color: "#000000",
		side: 1
	}), i = new fr({ color: "#000000" }), a = gd(), o = gd(), s = gd(), c = gd(), l = new At();
	l.name = `agent:${e.id}`;
	let u = new At();
	l.add(u), Sd(u, fd, o, r, [
		ad.width,
		ad.height,
		ad.depth
	], [
		0,
		id + ad.height / 2,
		0
	], ld * 2);
	let d = [Cd(u, r, -.1, id, [
		.18,
		id,
		.18
	], s), Cd(u, r, .1, id, [
		.18,
		id,
		.18
	], s)], f = ad.width / 2 + od.width / 2 + .012, p = [Cd(u, r, -f, id + ad.height - .04, [
		od.width,
		od.length,
		od.depth
	], o, a), Cd(u, r, f, id + ad.height - .04, [
		od.width,
		od.length,
		od.depth
	], o, a)], m = new At(), h = new Y(fd, sd.wood);
	h.scale.set(.04, .13, .04), h.position.y = -.05;
	let g = new Y(fd, sd.rubber);
	g.scale.set(.19, .2, .03), g.position.y = -.21, m.add(h, g), m.position.set(0, -od.length + .02, .03), m.visible = !1, p[1].add(m);
	let _ = new At();
	_.position.set(0, id + ad.height, 0), u.add(_), Sd(_, pd, a, r, [
		cd * 2,
		cd * 2,
		cd * 2
	], [
		0,
		.21,
		0
	], ld * 2);
	for (let e of [-1, 1]) {
		let t = new Y(fd, i);
		t.scale.set(.07, .07, .03), t.position.set(e * .08, .25, wd), _.add(t);
	}
	let v = new At();
	_.add(v);
	let y = new At();
	for (let e of [-1, 1]) {
		let t = new Y(fd, _d);
		t.scale.set(.125, .115, .016), t.position.set(e * .08, .25, .176), y.add(t);
	}
	let b = new Y(fd, _d);
	b.scale.set(.05, .025, .016), b.position.set(0, .265, .176), y.add(b), _.add(y);
	let x = new Y(fd, c);
	x.scale.set(.38, .13, .05), x.position.set(0, .1, .16799999999999998), _.add(x);
	let S = null;
	if (n) {
		let e = new Di(.27, .016, 6, 64), t = e.getAttribute("position"), n = new Float32Array(t.count * 3), r = new J();
		for (let e = 0; e < t.count; e++) {
			let i = (Math.atan2(t.getY(e), t.getX(e)) / Math.PI + 1) / 2;
			zu(1 - Math.abs(i * 2 - 1), r);
			let a = Ru(`#${r.getHexString()}`);
			n.set([
				a.r,
				a.g,
				a.b
			], e * 3);
		}
		e.setAttribute("color", new yn(n, 3)), S = new Y(e, new fr({ vertexColors: !0 })), S.rotation.x = Math.PI / 2, S.position.y = .56, _.add(S);
	}
	let C = new fr({
		color: Ru(Q.alert),
		transparent: !0,
		opacity: 0,
		blending: 2,
		depthWrite: !1,
		side: 2
	}), w = new Y(md, C);
	w.rotation.x = -Math.PI / 2, w.position.y = .05, w.visible = !1, l.add(w);
	let T = new Y(fd, hd);
	T.scale.set(1, 2, 1), T.position.y = 1, T.userData.agentId = e.id, l.add(T);
	let E = document.createElement("div");
	E.className = "agent-tag", E.style.setProperty("--accent", t);
	let D = document.createElement("span");
	D.className = "agent-name";
	let O = document.createElement("span");
	O.textContent = e.name, D.append(O);
	let k = document.createElement("span");
	k.className = "agent-badge", D.append(k);
	let A = document.createElement("span");
	A.className = "agent-sub", E.append(D, A);
	let ee = new Vl(E);
	ee.center.set(.5, 1), ee.position.y = cd * 2 + (n ? .42 : .26), _.add(ee);
	let j = document.createElement("div");
	j.className = "agent-zzz", j.setAttribute("aria-hidden", "true");
	for (let e = 0; e < 3; e++) j.append(Object.assign(document.createElement("span"), { textContent: "z" }));
	let M = new Vl(j);
	return M.center.set(0, 1), M.position.set(.16, .41, 0), _.add(M), {
		root: l,
		body: u,
		legs: d,
		arms: p,
		bat: m,
		head: _,
		outline: r,
		glow: i,
		ring: w,
		ringMaterial: C,
		halo: S,
		look: {
			skin: a,
			top: o,
			bottom: s,
			hairColor: c,
			hair: v,
			glasses: y,
			beard: x,
			name: O
		},
		tag: E,
		zzz: j,
		badge: k,
		sub: A,
		pick: T
	};
}
var Od = (() => {
	let e = new pi(1, 1, 1, 1, 1, 24), t = e.getAttribute("position"), n = new Float32Array(t.count * 3), r = new J();
	for (let e = 0; e < t.count; e++) {
		zu(t.getZ(e) + .5, r);
		let i = Ru(`#${r.getHexString()}`);
		n.set([
			i.r,
			i.g,
			i.b
		], e * 3);
	}
	return e.setAttribute("color", new yn(n, 3)), e;
})();
function kd() {
	let e = new Pn();
	e.setAttribute("position", new yn(/* @__PURE__ */ new Float32Array(132), 3).setUsage(te)), e.setAttribute("color", new yn(/* @__PURE__ */ new Float32Array(132), 3).setUsage(te));
	let t = [];
	for (let e = 0; e < 21; e++) {
		let n = e * 2;
		t.push(n, n + 1, n + 2, n + 1, n + 3, n + 2);
	}
	e.setIndex(t), e.setDrawRange(0, 0);
	let n = new Y(e, new fr({
		vertexColors: !0,
		blending: 2,
		transparent: !0,
		depthWrite: !1,
		side: 2
	}));
	return n.frustumCulled = !1, n.renderOrder = 1, n;
}
function Ad(e, t, n = {}) {
	let r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = n.instant ?? (() => !1), o = Math.max(1, n.pace ?? 1);
	function s(e) {
		return {
			key: `desk:${e.deskId}`,
			point: e.seat.clone(),
			posture: "sit",
			heading: e.rotation + Math.PI,
			exclusive: !1
		};
	}
	function c(e) {
		return {
			key: `spot:${e.spotId}`,
			point: e.position.clone(),
			posture: e.posture,
			heading: Math.atan2(e.focus.x - e.position.x, e.focus.z - e.position.z),
			exclusive: !0
		};
	}
	function l(e, n) {
		let r = n.rotation + Math.PI, a = new G(Math.cos(r), 0, -Math.sin(r)), o = new G(-Math.sin(r), 0, -Math.cos(r)), s = null, c = Infinity;
		for (let r of [-1, 1]) {
			let l = `beside:${n.deskId}:${r}`, u = i.get(l);
			if (u && u !== e.profile.id) continue;
			let d = n.seat.clone().addScaledVector(a, r * 1.05).addScaledVector(o, .2), f = d.distanceTo(e.rig.root.position) + (t.isBlocked(d.x, d.z) ? 100 : 0);
			f < c && (c = f, s = {
				key: l,
				point: d,
				posture: "stand",
				heading: Math.atan2(n.seat.x - d.x, n.seat.z - d.z),
				exclusive: !0
			});
		}
		return s ?? e.home;
	}
	function u(t, n) {
		let r = null;
		for (let a of e.spots.values()) {
			if (a.zoneId !== t) continue;
			let e = i.get(`spot:${a.spotId}`);
			if (e === n.profile.id) return c(a);
			!e && !r && (r = a);
		}
		return r ? c(r) : null;
	}
	function d(t, n) {
		if (n === t.profile.id) return t.home;
		let r = e.desks.get(n);
		if (r) return l(t, r);
		let a = e.spots.get(n);
		if (a) {
			let e = i.get(`spot:${a.spotId}`);
			return !e || e === t.profile.id ? c(a) : u(a.zoneId, t);
		}
		return u(n, t);
	}
	function f(e, t, n, r = a()) {
		t.key !== e.destination.key && (i.get(e.destination.key) === e.profile.id && i.delete(e.destination.key), t.exclusive && i.set(t.key, e.profile.id), e.destination = t, e.arrived = !1, e.path = null, e.trailOn = n, r && (e.rig.root.position.copy(t.point), e.arrived = !0, e.sit = +(t.posture === "sit"), e.heading = e.wantHeading = t.heading));
	}
	function p(e) {
		let { tag: t, badge: n, sub: r } = e.rig;
		t.dataset.state = e.state, t.dataset.active = String(e.state !== "idle");
		let i = e.state === "blocked" && !!e.task?.startsWith("Waiting for Stephen");
		t.dataset.needsYou = String(i);
		let a = i ? "needs you" : "blocked";
		n.textContent = e.state === "idle" ? "idle" : e.state === "blocked" ? e.missionId ? `${e.missionId} ${a}` : a : e.missionId ?? "busy", r.textContent = e.task ?? e.profile.role, r.classList.toggle("is-task", e.task !== null);
	}
	function m(e, t, n, r, i = a()) {
		e.breakLeft = 0, e.idleFor = 0, e.state = t, e.task = t === "idle" ? null : n, e.at = r && r !== e.profile.id ? r : void 0;
		let o = e.at ? d(e, e.at) : null;
		o ||= t === "reporting" && e.profile.id !== "exec.chief-of-staff" ? u("executive", e) ?? e.home : e.home, f(e, o, t === "collaborating" || t === "reporting", i), p(e);
	}
	function h(e, t, n) {
		t && t !== e.name && (e.name = t, e.rig.look.name.textContent = t), n && (e.appearance = n, Ed(e.rig, n, e.profile.id === "exec.chief-of-staff" ? 1.08 : 1));
	}
	let g = () => 110 + Math.random() * 90, _ = () => 150 + Math.random() * 240, v = (e) => !e.profile.human && e.profile.id !== "exec.chief-of-staff", y = (e) => v(e) && e.state === "idle" && !e.at && e.breakLeft === 0 && e.arrived && e.destination.key === e.home.key;
	function b(t) {
		let n = [...e.spots.values()].filter((e) => t(e.spotId) && !i.has(`spot:${e.spotId}`));
		return n.length > 0 ? c(n[Math.floor(Math.random() * n.length)]) : null;
	}
	function x(e, t, n) {
		f(e, t, !1), e.breakLeft = n, e.idleFor = 0, e.breakAfter = _();
	}
	function S(t) {
		let n = 0;
		for (let e of r.values()) e.breakLeft > 0 && (n += 1);
		for (let e of r.values()) {
			if (!v(e)) continue;
			if (e.breakLeft > 0) {
				if (!e.arrived) continue;
				e.breakLeft -= t, e.breakLeft <= 0 && (e.breakLeft = 0, f(e, e.home, !1));
				continue;
			}
			if (!y(e) || (e.idleFor += t, e.idleFor < e.breakAfter || n >= 5 || a())) continue;
			let i = Math.random();
			if (i < .3 && n + 2 <= 5) {
				let t = [...r.values()].find((t) => t !== e && y(t) && t.idleFor > 45), i = b((e) => e === "cafe.pong-1"), a = b((e) => e === "cafe.pong-2");
				if (t && i && a) {
					let r = 80 + Math.random() * 70;
					x(e, i, r), x(t, a, r), n += 2;
					continue;
				}
			}
			let o = b(i < .68 ? (e) => e.startsWith("cafe.stool") : (e) => e.startsWith("lounge."));
			o ? (x(e, o, 100 + Math.random() * 140), n += 1) : e.idleFor = e.breakAfter - 20;
		}
		e.setPong(["spot:cafe.pong-1", "spot:cafe.pong-2"].every((e) => {
			let t = r.get(i.get(e) ?? "");
			return !!(t && t.arrived && t.destination.key === e);
		}));
	}
	let C = !1, w = null, T = null, E = 50;
	function D() {
		let e = [
			"sales",
			"design",
			"development",
			"content",
			"research"
		], t = [];
		for (let n of e) {
			let e = ql.find((e) => e.id === n);
			if (!e) continue;
			let r = new G(e.position.x, 0, e.position.z + e.size.depth / 2 - .7);
			t.push({
				key: `round:${n}`,
				point: r,
				posture: "stand",
				heading: Math.PI,
				exclusive: !1
			});
		}
		let n = ql.find((e) => e.id === "cafe");
		return n && t.push({
			key: "round:cafe",
			point: new G(n.position.x - 3.4, 0, n.position.z - .6),
			posture: "stand",
			heading: Math.PI,
			exclusive: !1
		}), t;
	}
	function O(e) {
		let t = [...r.values()].find((e) => e.profile.human);
		if (t) {
			if (T) t.arrived && (T.pause += e, T.pause < 6 || (T.pause = 0, T.index += 1, T.index < T.stops.length ? f(t, T.stops[T.index], !1) : (f(t, t.home, !1), T = null, E = C ? 4 : 200 + Math.random() * 200)));
			else {
				if (E -= e, E > 0 || a()) return;
				let n = D();
				if (n.length === 0) return;
				T = {
					stops: n,
					index: 0,
					pause: 0
				}, f(t, n[0], !1);
			}
		}
	}
	Tl.forEach((t, n) => {
		let i = e.desks.get(t.id);
		if (!i) {
			console.warn(`[agents] ${t.id} has no desk in layout.ts; skipped.`);
			return;
		}
		let a = t.id === Cl, o = Dd(t, i.accent, a), c = xl(t.id);
		Ed(o, c, a ? 1.08 : 1);
		let l = s(i);
		o.root.position.copy(l.point), o.root.rotation.y = l.heading, e.scene.add(o.root), i.label.visible = !1;
		let u = kd();
		e.scene.add(u);
		let d = {
			profile: t,
			name: t.name,
			appearance: c,
			accent: Ru(i.accent),
			accentHex: i.accent,
			rig: o,
			home: l,
			state: "idle",
			task: null,
			missionId: null,
			at: void 0,
			speed: ud * (t.id === "exec.project-coordinator" ? 1.25 : 1),
			phase: n * 1.37,
			destination: l,
			arrived: !0,
			path: null,
			leg: 0,
			heading: l.heading,
			wantHeading: l.heading,
			sit: 1,
			walk: 0,
			stride: n,
			armL: -.32,
			armR: -.32,
			yaw: 0,
			pitch: 0,
			roll: 0,
			sleep: 0,
			wave: 0,
			idleFor: 0,
			breakAfter: g(),
			breakLeft: 0,
			level: t.human ? .62 : vd.idle,
			alert: 0,
			beam: null,
			beamAmount: 0,
			trail: u,
			trailPoints: [],
			trailOn: !1,
			trailTimer: 0
		};
		r.set(t.id, d), p(d);
	});
	let k = Ru(Q.alert), A = new J("#15151a"), ee = 1, j = new J(), M = new G(), N = new G(), te = new G();
	function ne(n, r) {
		let i = n.rig.root.position, a = !1;
		if (n.arrived) {
			n.wantHeading = n.destination.heading, w && (n.profile.human || n.profile.id === "exec.chief-of-staff") && (n.wantHeading = Math.atan2(w.x - i.x, w.z - i.z));
			let e = +(n.destination.posture === "sit");
			n.sit = e > n.sit ? Math.min(e, n.sit + r / .35) : Math.max(e, n.sit - r / .35);
		} else if (n.sit > .1) n.sit = Math.max(0, n.sit - r / .3);
		else {
			n.sit = 0, n.path || (n.path = t.findPath(i, n.destination.point), n.leg = 0);
			let e = n.speed * r;
			for (; e > 0 && n.leg < n.path.length;) {
				let t = n.path[n.leg], r = t.x - i.x, a = t.z - i.z, o = Math.hypot(r, a);
				o <= e ? (i.x = t.x, i.z = t.z, e -= o, n.leg += 1) : (i.x += r / o * e, i.z += a / o * e, n.wantHeading = Math.atan2(r, a), e = 0);
			}
			n.stride += n.speed * r * 3.4, a = !0, n.leg >= n.path.length && (n.arrived = !0, n.path = null);
		}
		n.walk = yd(n.walk, +!!a, 10, r), n.heading = bd(n.heading, n.wantHeading, a ? 9 : 6, r), i.y = yd(i.y, e.floorHeightAt(i.x, i.z), 12, r), n.rig.root.rotation.y = n.heading;
	}
	function P() {
		for (let e of r.values()) if (e.state === "reporting" && e.arrived && e.profile.id !== "exec.chief-of-staff") return e;
		return null;
	}
	function F(e, t, n, r) {
		let { rig: i } = e, a = xd(e.sit), o = n + e.phase, s = e.sit > .5, c = 0, l = 0, u = 0, d = 0, f = 0;
		if (e.arrived) switch (e.state) {
			case "working":
				s && (c = -1.12 + Math.sin(o * 11) * .07, l = -1.12 + Math.sin(o * 11 + 2.1) * .07, d = .2, u = Math.sin(o * .5) * .06);
				break;
			case "idle":
				if (c = l = s ? -.32 : 0, u = Math.sin(o * .33) * .32, d = Math.sin(o * .21) * .05, e.destination.key.startsWith("spot:cafe.pong")) {
					let t = Math.cos(n / .8 * Math.PI) * (e.destination.key.endsWith("1") ? -1 : 1);
					l = -.55 - Math.max(0, t) ** 3 * 1.25 + Math.max(0, -t) * .15, c = -.25, u = Math.sin(n / .8 * Math.PI) * .2, d = .12;
				} else e.destination.key.startsWith("spot:cafe.stool") && (c = -.9, l = -.9 - Math.max(0, Math.sin(o * .8)) * 1.1, u = Math.sin(o * .4) * .45);
				break;
			case "collaborating":
				c = s ? -.35 : 0, l = (s ? -.7 : -.45) - Math.max(0, Math.sin(o * 1.9)) * .55, u = Math.sin(o * .7) * .2, d = Math.sin(o * 2.3) * .05;
				break;
			case "blocked":
				c = l = -.12, d = .3, f = .2 + Math.sin(o * 1.3) * .05, u = Math.sin(o * .9) * .12;
				break;
			case "reporting": l = -.5 - Math.max(0, Math.sin(o * 2.1)) * .45;
		}
		let p = !C && e.arrived && e.state === "idle" && s && !e.profile.human && e.profile.id !== "exec.chief-of-staff" && e.destination.key === e.home.key;
		p && (c = l = -2.45, u = 0, d = .45, f = e.phase % 2 > 1 ? .5 : -.5), e.sleep = yd(e.sleep, +!!p, p ? 2.2 : 6, t);
		let m = xd(e.sleep) * (.9 + Math.sin(o * 1.1) * .025);
		if (i.zzz.dataset.on = String(e.sleep > .7), e.profile.id === "exec.chief-of-staff" && r && e.arrived) {
			let t = r.rig.root.position, n = i.root.position, a = Math.atan2(t.x - n.x, t.z - n.z) - e.heading;
			u = U.clamp(Math.atan2(Math.sin(a), Math.cos(a)), -1.15, 1.15), d = 0, c = l = -.32;
		}
		let h = w !== null && e.arrived && (e.profile.human || e.profile.id === "exec.chief-of-staff");
		if (h && w) {
			let t = i.root.position, n = Math.atan2(w.x - t.x, w.z - t.z) - e.heading;
			u = U.clamp(Math.atan2(Math.sin(n), Math.cos(n)), -1.15, 1.15), d = -.08, f = 0, l = -2.75, c = s ? -.32 : 0;
		}
		e.wave = yd(e.wave, +!!h, 7, t), i.arms[1].rotation.z = e.wave * (.35 + Math.sin(o * 8.5) * .4), i.bat.visible = e.arrived && e.walk < .2 && e.destination.key.startsWith("spot:cafe.pong");
		let g = Math.sin(e.stride) * .62 * e.walk;
		e.armL = yd(e.armL, c, 12, t), e.armR = yd(e.armR, l, 12, t), e.yaw = yd(e.yaw, u, 6, t), e.pitch = yd(e.pitch, d, 6, t), e.roll = yd(e.roll, f, 6, t), i.body.rotation.x = m, i.body.position.z = -.78 * Math.sin(m), i.legs[0].rotation.x = U.lerp(g, -1.45 - m, a), i.legs[1].rotation.x = U.lerp(-g, -1.45 - m, a), i.arms[0].rotation.x = U.lerp(e.armL, -g * .75, e.walk), i.arms[1].rotation.x = U.lerp(e.armR, g * .75, e.walk), i.head.rotation.set(e.pitch, e.yaw, e.roll), i.body.position.y = -.28 * a + Math.abs(Math.sin(e.stride)) * .035 * e.walk + id * (1 - Math.cos(m)), i.halo && (i.halo.rotation.z = n * .6, i.halo.position.y = .56 + Math.sin(n * 1.4) * .015);
	}
	function re(e, t, n) {
		let { rig: r } = e, i = Math.sin(n * 2.6), a = vd[e.state];
		e.profile.human ? a = .62 : e.state === "idle" && !e.arrived ? a = .5 : e.state === "blocked" && (a = .8 + .2 * i), e.level = yd(e.level, a, 4, t), e.alert = yd(e.alert, +(e.state === "blocked"), 5, t), j.copy(e.accent).lerp(k, e.alert).multiplyScalar(e.level * ee), r.outline.color.copy(j), r.outline.visible = ee > .02, r.glow.color.copy(A).lerp(j.copy(e.accent).lerp(k, e.alert).multiplyScalar(e.level), ee), r.ring.visible = e.alert > .02, r.ring.visible && (r.ringMaterial.opacity = e.alert * (.55 + .3 * i), r.ring.scale.setScalar(1 + .12 * i));
	}
	function ie(t, n, r, i) {
		let a = t.state === "reporting" && t.arrived && i && t !== i ? 1 : 0;
		t.beamAmount = yd(t.beamAmount, a, 5, n), t.beamAmount < .02 || !i ? t.beam && (t.beam.visible = !1) : (t.beam || (t.beam = new Y(Od, new fr({
			vertexColors: !0,
			transparent: !0,
			blending: 2,
			depthWrite: !1
		})), t.beam.frustumCulled = !1, e.scene.add(t.beam)), M.copy(t.rig.root.position).setY(t.rig.root.position.y + 1.15), N.copy(i.rig.root.position).setY(i.rig.root.position.y + 1.02), t.beam.visible = !0, t.beam.position.lerpVectors(M, N, .5), t.beam.lookAt(N), t.beam.scale.set(.035, .035, M.distanceTo(N)), t.beam.material.opacity = t.beamAmount * (.6 + .25 * Math.sin(r * 3)));
	}
	function I(e, t) {
		let n = e.trailPoints, r = e.rig.root.position;
		if (e.trailOn && !e.arrived && e.walk > .4) {
			let e = n[n.length - 1];
			(!e || e.distanceTo(r) > .2) && (n.push(new G(r.x, r.y + .05, r.z)), n.length > dd && n.shift());
		} else if (n.length > 0) for (e.trailTimer += t; e.trailTimer > .045 && n.length > 0;) n.shift(), e.trailTimer -= .045;
		let i = e.trail.geometry;
		if (n.length < 2) {
			i.setDrawRange(0, 0);
			return;
		}
		let a = i.getAttribute("position"), o = i.getAttribute("color");
		for (let t = 0; t < n.length; t++) {
			let r = n[t], i = n[Math.min(t + 1, n.length - 1)], s = n[Math.max(t - 1, 0)];
			te.set(-(i.z - s.z), 0, i.x - s.x).normalize().multiplyScalar(.075), a.setXYZ(t * 2, r.x + te.x, r.y, r.z + te.z), a.setXYZ(t * 2 + 1, r.x - te.x, r.y, r.z - te.z);
			let c = (t / (n.length - 1)) ** 1.6 * .85;
			o.setXYZ(t * 2, e.accent.r * c, e.accent.g * c, e.accent.b * c), o.setXYZ(t * 2 + 1, e.accent.r * c, e.accent.g * c, e.accent.b * c);
		}
		a.needsUpdate = !0, o.needsUpdate = !0, i.setDrawRange(0, (n.length - 1) * 6);
	}
	return {
		apply(e) {
			let t = r.get(e.agentId);
			t && (e.type === "agent.profile" ? h(t, e.meta?.name, e.meta?.appearance) : t.profile.human || C || (e.type === "agent.state" && e.state ? (t.missionId = e.state === "idle" ? null : e.missionId ?? t.missionId, m(t, e.state, e.task ?? t.task, Ml(t.at, e.state, e.deskId))) : e.type === "agent.moved" && e.deskId && m(t, t.state, t.task, e.deskId)));
		},
		sync(e) {
			if (!C) {
				i.clear();
				for (let e of r.values()) e.destination = {
					...e.home,
					key: ""
				}, f(e, e.home, !1, !0), e.breakLeft = 0, e.idleFor = 0, e.trailPoints.length = 0;
				for (let t of r.values()) {
					let n = e.profiles?.[t.profile.id];
					if (h(t, n?.name ?? t.profile.name, n?.appearance ?? xl(t.profile.id)), t.profile.human) continue;
					let r = e.agents[t.profile.id];
					t.missionId = r?.missionId ?? null, m(t, r?.state ?? "idle", r?.task ?? null, r?.at, !0);
				}
			}
		},
		update(e, t) {
			let n = r.get(Cl);
			S(e * o), O(e * o);
			for (let t of r.values()) ne(t, e);
			let i = P();
			for (let a of r.values()) F(a, e, t, i), re(a, e, t), ie(a, e, t, n), I(a, e);
		},
		list() {
			return [...r.values()].map((e) => ({
				id: e.profile.id,
				name: e.name,
				state: e.state,
				task: e.task,
				settled: e.arrived
			}));
		},
		nameOf(e) {
			return r.get(e)?.name;
		},
		pickTargets() {
			return [...r.values()].map((e) => e.rig.pick);
		},
		get(e) {
			let t = r.get(e);
			return t && {
				profile: t.profile,
				name: t.name,
				appearance: t.appearance,
				accent: t.accentHex,
				position: t.rig.root.position
			};
		},
		setNight(e) {
			ee = e;
		},
		setProfile(e, t, n) {
			let i = r.get(e);
			i && h(i, t, n);
		},
		setSelected(e) {
			for (let t of r.values()) t.rig.tag.dataset.selected = String(t.profile.id === e);
		},
		stage(e) {
			if (C = e, !e) return [];
			let t = [...r.values()].find((e) => e.profile.human);
			t && (T = null, f(t, t.home, !1, !0)), E = 46;
			let n = [], i = [
				"cafe.pong-1",
				"cafe.pong-2",
				"cafe.stool-2",
				"lounge.",
				"cafe.stool-4",
				"lounge.",
				"cafe.stool-1",
				"lounge.",
				"cafe.stool-5",
				"lounge."
			], a = 0;
			for (let e of r.values()) {
				if (e.profile.human) continue;
				let t = e.profile.id === "exec.chief-of-staff" || a++ % 3 == 0 ? null : i.shift(), r = t ? b((e) => e.startsWith(t)) : null;
				r ? (m(e, "idle", null, void 0), x(e, r, 1e5)) : (m(e, "working", e.task ?? "Working", void 0), n.push(e.profile.id));
			}
			return n;
		},
		wave(e) {
			w && !e && C && (E = Math.min(E, .4)), w = e ? (w ?? new G()).copy(e) : null;
		},
		leading() {
			return T ? [...r.values()].find((e) => e.profile.human)?.rig.root.position ?? null : null;
		}
	};
}
// src/events.ts
function jd(e = {}) {
	let t = e.speed ?? 1, n = [...Rl].sort((e, t) => e.at - t.at), r = null, i = 0, a = 0, o = 0;
	return {
		kind: "mock",
		start(e) {
			r = e, i = 0, a = 0, o = 0, r.onStatus("demo"), r.onSnapshot(Al());
		},
		update(e) {
			if (!r) return;
			i += e * t;
			let s = i - e * t;
			for (; a < n.length && n[a].at <= i;) r.onEvent(Bl(n[a++], o));
			o === 0 && s < zl.at && i >= zl.at && r.onEvent(Bl(zl, o)), i >= 99 && (i -= 99, a = 0, o += 1);
		},
		stop() {
			r = null;
		}
	};
}
// src/navigation.ts
var Md = .4, Nd = .32, Pd = .6;
function Fd(e, t, n) {
	let r = Math.ceil(t.width / Md), i = Math.ceil(t.depth / Md), a = r * i, o = -t.width / 2, s = -t.depth / 2, c = new Uint8Array(a), l = (e) => o + (e + .5) * Md, u = (e) => s + (e + .5) * Md, d = (e) => Math.floor((e - o) / Md), f = (e) => Math.floor((e - s) / Md), p = (e, t) => e >= 0 && t >= 0 && e < r && t < i;
	for (let e = 0; e < i; e++) for (let n = 0; n < r; n++) {
		let i = l(n), a = u(e);
		(Math.abs(i) > t.width / 2 - Pd || Math.abs(a) > t.depth / 2 - Pd) && (c[e * r + n] = 1);
	}
	for (let t of e) {
		let e = t.shape === "rect" ? t.minX - Nd : t.x - t.radius - Nd, n = t.shape === "rect" ? t.maxX + Nd : t.x + t.radius + Nd, a = t.shape === "rect" ? t.minZ - Nd : t.z - t.radius - Nd, o = t.shape === "rect" ? t.maxZ + Nd : t.z + t.radius + Nd;
		for (let s = Math.max(0, f(a)); s <= Math.min(i - 1, f(o)); s++) for (let i = Math.max(0, d(e)); i <= Math.min(r - 1, d(n)); i++) {
			let d = l(i), f = u(s);
			(t.shape === "rect" ? d >= e && d <= n && f >= a && f <= o : Math.hypot(d - t.x, f - t.z) <= t.radius + Nd) && (c[s * r + i] = 1);
		}
	}
	function m(e, t) {
		let n = d(e), i = f(t);
		return !p(n, i) || c[i * r + n] === 1;
	}
	function h(e, t) {
		let n = U.clamp(d(e), 0, r - 1), a = U.clamp(f(t), 0, i - 1);
		if (!c[a * r + n]) return a * r + n;
		let o = -1, s = Infinity;
		for (let i = 1; i <= 16 && o < 0; i++) for (let d = -i; d <= i; d++) for (let f = -i; f <= i; f++) {
			if (Math.max(Math.abs(d), Math.abs(f)) !== i) continue;
			let m = n + f, h = a + d;
			if (!p(m, h) || c[h * r + m]) continue;
			let g = Math.hypot(l(m) - e, u(h) - t);
			g < s && (s = g, o = h * r + m);
		}
		return o;
	}
	function g(e, t, n, r) {
		let i = Math.max(1, Math.ceil(Math.hypot(n - e, r - t) / (Md * .2)));
		for (let a = 0; a <= i; a++) {
			let o = a / i;
			if (m(e + (n - e) * o, t + (r - t) * o)) return !1;
		}
		return !0;
	}
	let _ = new Float32Array(a), v = new Float32Array(a), y = new Int32Array(a), b = new Uint32Array(a), x = new Uint32Array(a), S = 0, C = [];
	function w(e) {
		C.push(e);
		let t = C.length - 1;
		for (; t > 0;) {
			let e = t - 1 >> 1;
			if (v[C[e]] <= v[C[t]]) break;
			[C[e], C[t]] = [C[t], C[e]], t = e;
		}
	}
	function T() {
		let e = C[0], t = C.pop();
		if (C.length > 0) {
			C[0] = t;
			let e = 0;
			for (;;) {
				let t = e * 2 + 1, n = t + 1, r = e;
				if (t < C.length && v[C[t]] < v[C[r]] && (r = t), n < C.length && v[C[n]] < v[C[r]] && (r = n), r === e) break;
				[C[r], C[e]] = [C[e], C[r]], e = r;
			}
		}
		return e;
	}
	let E = [
		[
			1,
			0,
			1
		],
		[
			-1,
			0,
			1
		],
		[
			0,
			1,
			1
		],
		[
			0,
			-1,
			1
		],
		[
			1,
			1,
			Math.SQRT2
		],
		[
			1,
			-1,
			Math.SQRT2
		],
		[
			-1,
			1,
			Math.SQRT2
		],
		[
			-1,
			-1,
			Math.SQRT2
		]
	];
	function D(e, t) {
		S += 1, C.length = 0;
		let n = t % r, i = (t - n) / r, a = (e) => {
			let t = Math.abs(e % r - n), a = Math.abs(Math.floor(e / r) - i);
			return Math.max(t, a) + (Math.SQRT2 - 1) * Math.min(t, a);
		};
		for (_[e] = 0, v[e] = a(e), y[e] = -1, b[e] = S, w(e); C.length > 0;) {
			let e = T();
			if (x[e] === S) continue;
			if (x[e] = S, e === t) {
				let e = [];
				for (let n = t; n !== -1; n = y[n]) e.push(n);
				return e.reverse();
			}
			let n = e % r, i = (e - n) / r;
			for (let [t, o, s] of E) {
				let l = n + t, u = i + o;
				if (!p(l, u)) continue;
				let d = u * r + l;
				if (c[d] || x[d] === S || t !== 0 && o !== 0 && (c[i * r + l] || c[u * r + n])) continue;
				let f = _[e] + s;
				b[d] === S && f >= _[d] || (b[d] = S, _[d] = f, v[d] = f + a(d), y[d] = e, w(d));
			}
		}
		return null;
	}
	let O = (e, t) => new G(e, n(e, t), t);
	function k(e, t) {
		let n = O(t.x, t.z);
		if (!m(e.x, e.z) && g(e.x, e.z, t.x, t.z)) return [n];
		let i = h(e.x, e.z), a = h(t.x, t.z);
		if (i < 0 || a < 0) return [n];
		let o = D(i, a);
		if (!o) return [n];
		let s = o.map((e) => l(e % r)), c = o.map((e) => u(Math.floor(e / r))), d = [], f = 0;
		for (d.push(O(s[0], c[0])); f < o.length - 1;) {
			let e = f + 1;
			for (let t = o.length - 1; t > f + 1; t--) if (g(s[f], c[f], s[t], c[t])) {
				e = t;
				break;
			}
			d.push(O(s[e], c[e])), f = e;
		}
		return d.length > 1 && g(e.x, e.z, d[1].x, d[1].z) && d.shift(), d.length > 1 && g(d[d.length - 2].x, d[d.length - 2].z, n.x, n.z) && d.pop(), d.push(n), d;
	}
	return {
		findPath: k,
		isBlocked: m
	};
}
// src/pets.ts
var Id = new pi(1, 1, 1), Ld = /* @__PURE__ */ new Map();
function Rd(e) {
	let t = Ld.get(e);
	return t || Ld.set(e, t = wu(new Ri({
		color: e,
		roughness: .95,
		metalness: 0,
		flatShading: !0
	}), 14, .14)), t;
}
function zd(e, t, n, r, i, a, o, s) {
	let c = new Y(Id, t.startsWith("glow:") ? new fr({ color: t.slice(5) }) : Rd(t));
	return c.scale.set(n, r, i), c.position.set(a, o, s), e.add(c), c;
}
function Bd(e, t) {
	let n = new At();
	n.name = `pet:${e}`, n.scale.setScalar(t.scale * Ul);
	let [r, i, a] = t.body, o = t.leg, s = new At();
	s.position.set(0, o, -a * .32), n.add(s);
	let c = a * .32;
	zd(s, t.coat, r, i, a, 0, i / 2, c);
	let l = [];
	for (let [e, n] of [
		[-1, 1],
		[1, 1],
		[-1, -1],
		[1, -1]
	]) {
		let i = new At();
		i.position.set(e * (r / 2 - .06), .02, c + n * (a / 2 - .08)), zd(i, t.coat, .11, t.leg, .11, 0, -t.leg / 2, 0), t.socks && zd(i, t.marking, .118, t.leg * .38, .118, 0, -t.leg * .81, 0), s.add(i), l.push(i);
	}
	let [u, d, f] = t.head, p = new At();
	p.position.set(0, i * .8, c + a / 2 - .02), s.add(p), zd(p, t.coat, u, d, f, 0, d * .35, f * .4);
	let [m, h, g] = t.muzzle;
	zd(p, t.marking, m, h, g, 0, d * .12, f * .9 + g / 2 - .01), zd(p, "#0c0c0e", m * .4, h * .34, .03, 0, d * .12 + h * .33, f * .9 + g);
	for (let e of [-1, 1]) zd(p, t.eyes, .045, .045, .02, e * u * .26, d * .5, f * .9 + .006), t.ears === "folded" ? zd(p, t.earColor, .07, d * .5, f * .42, e * (u / 2 + .02), d * .58, f * .25) : zd(p, t.earColor, u * .3, d * .42, .05, e * u * .32, d * .85 + d * .2, f * .25);
	let [_, v, y] = t.tail, b = new At();
	return b.position.set(0, i * .85, c - a / 2 + .02), b.rotation.x = y, zd(b, t.coat, _, _, v, 0, 0, -v / 2), s.add(b), t.extras?.({
		body: s,
		head: p,
		shape: t
	}), {
		root: n,
		body: s,
		head: p,
		tail: b,
		legs: l,
		leg: t.leg,
		hip: o
	};
}
var Vd = (e, t, n, r) => e + (t - e) * (1 - Math.exp(-n * r)), Hd = (e, t) => e + Math.random() * (t - e);
function Ud(e, t, n = {}) {
	let r = n.still ?? (() => !1), i = n.leader ?? (() => null), a = {
		following: !1,
		rethink: 0
	}, o = (e, n) => !t.isBlocked(e, n), s = (t, n) => new G(t, e.floorHeightAt(t, n), n);
	function c(e, t, n) {
		let r = document.createElement("div");
		r.className = "pet-tag", r.textContent = t;
		let i = new Vl(r);
		i.center.set(.5, 1), i.position.set(0, n, 0), e.head.add(i);
	}
	function l(t, n, r, i, a, o) {
		let s = Bd(t, n);
		return s.root.position.copy(r), e.scene.add(s.root), c(s, t, n.head[1] + .34), {
			name: t,
			rig: s,
			speed: i,
			mode: "rest",
			path: [],
			step: 0,
			wait: Hd(6, 20),
			pose: o,
			sit: +(o === "sit"),
			lie: +(o === "lie"),
			stride: Math.random() * 6,
			heading: Math.random() * 6,
			hop: null,
			choose: a,
			wag: 0
		};
	}
	function u(e, n, r) {
		e.path = t.findPath(e.rig.root.position.clone().setY(0), n.clone().setY(0)), e.step = 0, e.mode = "walk", e.pose = "stand", e.arrive = r;
	}
	let d = [
		[-7.3, 1.2],
		[7.2, 1.4],
		[2.8, 15],
		[-4.2, 13.2],
		[14.4, 9.2],
		[-12.5, 5.5]
	].filter(([e, t]) => o(e, t)).map(([e, t]) => s(e, t)), f = l("Cash", {
		scale: 1,
		coat: "#1c1b1d",
		marking: "#a56a37",
		body: [
			.4,
			.38,
			.86
		],
		leg: .34,
		head: [
			.32,
			.3,
			.3
		],
		muzzle: [
			.18,
			.14,
			.17
		],
		ears: "folded",
		earColor: "#1c1b1d",
		tail: [
			.08,
			.14,
			.5
		],
		socks: !0,
		eyes: "#3a2414",
		extras: ({ body: e, head: t, shape: n }) => {
			zd(e, n.marking, .24, .18, .02, 0, .12, n.body[2] * .82 + .005);
			for (let e of [-1, 1]) zd(t, n.marking, .05, .035, .02, e * .083, .2, .277);
			zd(e, "#b5432e", .42, .05, .06, 0, .3, n.body[2] * .76);
		}
	}, d[0] ?? s(-7.3, 1.2), 1.25, (e) => {
		let t = d.filter((t) => t.distanceTo(e.rig.root.position) > 2);
		t.length !== 0 && u(e, t[Math.floor(Math.random() * t.length)], (e) => {
			e.pose = "lie", e.wait = Hd(50, 110);
		});
	}, "lie");
	f.wait = Hd(25, 50), f.heading = .6;
	let p = [
		[-20, -6.4],
		[0, -7],
		[20, -6.4],
		[-21.5, 8.2],
		[21.5, 8.2],
		[4.2, 12.4],
		[0, 16.4],
		[-13.6, 13.6],
		[16.6, 12],
		[-9.5, 0],
		[9.5, 0]
	].filter(([e, t]) => o(e, t)).map(([e, t]) => s(e, t)), m = l("Milo", {
		scale: .56,
		coat: "#f2efe8",
		marking: "#f2efe8",
		body: [
			.36,
			.34,
			.74
		],
		leg: .32,
		head: [
			.3,
			.28,
			.28
		],
		muzzle: [
			.16,
			.13,
			.18
		],
		ears: "folded",
		earColor: "#8a5a33",
		tail: [
			.07,
			.3,
			1.25
		],
		socks: !1,
		eyes: "#1a1310",
		extras: ({ body: e, head: t, shape: n }) => {
			zd(t, "#8a5a33", .165, .2, .2, -.075, .2, .165), zd(e, "#8a5a33", n.body[0] + .01, .2, .26, 0, n.body[1] - .095, n.body[2] * .12), zd(e, "#2b4a7d", n.body[0] + .02, .05, .06, 0, .27, n.body[2] * .76);
		}
	}, p[5] ?? s(4.2, 12.4), 2.7, (e) => {
		let t = p.filter((t) => t.distanceTo(e.rig.root.position) > 3);
		t.length !== 0 && u(e, t[Math.floor(Math.random() * t.length)], (e) => {
			e.pose = Math.random() < .5 ? "sit" : "stand", e.wait = Hd(3, 10);
		});
	}, "stand");
	m.wait = Hd(2, 5);
	let h = [];
	for (let t of e.desks.values()) t.vacant && h.push({
		point: new G(t.position.x - .55, t.position.y + .745, t.position.z + .12),
		from: t.seat.clone(),
		heading: t.rotation + .5
	});
	for (let [e, t] of [
		[18.2, 16.6],
		[24.6, 12.2],
		[-25.6, 8.4]
	]) o(e, t) && h.push({
		point: s(e, t),
		heading: Hd(-1, 1)
	});
	let g = h[0] ?? null, _ = l("Tom", {
		scale: .5,
		coat: "#7d8ba4",
		marking: "#d3dae5",
		body: [
			.3,
			.3,
			.7
		],
		leg: .24,
		head: [
			.32,
			.27,
			.26
		],
		muzzle: [
			.15,
			.1,
			.06
		],
		ears: "pointed",
		earColor: "#7d8ba4",
		tail: [
			.07,
			.62,
			1.05
		],
		socks: !0,
		eyes: "glow:#b8e04a",
		extras: ({ body: e, shape: t }) => {
			zd(e, t.marking, .2, .16, .02, 0, .1, t.body[2] * .82 + .005);
		}
	}, g?.point ?? s(18.2, 16.6), 1.6, (e) => {
		let t = h.filter((e) => e !== g);
		if (t.length === 0) return;
		let n = t[Math.floor(Math.random() * t.length)], r = (e) => {
			g = n, e.heading = n.heading, e.pose = Math.random() < .7 ? "lie" : "sit", e.wait = Hd(50, 120);
		}, i = () => u(e, n.from ?? n.point, (e) => {
			if (!n.from) return r(e);
			v(e, n.point, () => r(e));
		});
		g?.from ? v(e, s(g.from.x, g.from.z), i) : i();
	}, "lie");
	_.heading = g?.heading ?? 0, _.wait = Hd(30, 60);
	function v(e, t, n) {
		e.mode = "hop", e.pose = "stand", e.hop = {
			from: e.rig.root.position.clone(),
			to: t.clone(),
			t: 0,
			then: n
		}, e.heading = Math.atan2(t.x - e.rig.root.position.x, t.z - e.rig.root.position.z);
	}
	let y = [
		f,
		m,
		_
	];
	for (let e of y) e.rig.root.rotation.y = e.heading;
	return { update(n, o) {
		for (let s of y) {
			let { rig: c } = s, l = c.root.position, u = s === f && s.mode !== "hop" ? i() : null;
			if (s === f) {
				if (u) {
					a.following = !0, a.rethink -= n;
					let e = Math.hypot(u.x - l.x, u.z - l.z);
					s.speed = e > 7 ? 2.6 : 1.6, e > 3.4 && a.rethink <= 0 ? (s.path = t.findPath(l.clone().setY(0), u.clone().setY(0)), s.step = 0, s.mode = "walk", s.pose = "stand", s.arrive = (e) => {
						e.pose = "sit";
					}, a.rethink = .7) : e <= 2.6 && s.mode === "walk" && (s.path = [], s.mode = "rest", s.pose = "sit"), s.mode === "rest" && (s.wait = 30);
				} else a.following && (a = {
					following: !1,
					rethink: 0
				}, s.speed = 1.25, s.mode === "rest" && (s.wait = 2));
			}
			if (s.mode === "rest") s.wait -= n, s.wait <= 0 && !r() && s.choose(s), s.wait <= 0 && s.mode === "rest" && (s.wait = Hd(10, 20));
			else if (s.mode === "walk") {
				let t = s.path[s.step];
				if (!t) s.mode = "rest", s.arrive?.(s);
				else {
					let r = t.x - l.x, i = t.z - l.z, a = Math.hypot(r, i), o = s.speed * n;
					a <= o ? (l.x = t.x, l.z = t.z, s.step += 1) : (l.x += r / a * o, l.z += i / a * o, s.heading = Math.atan2(r, i)), l.y = e.floorHeightAt(l.x, l.z), s.stride += n * s.speed * 7;
				}
			} else if (s.hop) {
				s.hop.t = Math.min(1, s.hop.t + n / .45);
				let e = s.hop.t;
				if (l.lerpVectors(s.hop.from, s.hop.to, e), l.y += Math.sin(e * Math.PI) * .35, e >= 1) {
					let { then: e } = s.hop;
					s.hop = null, s.mode = "rest", s.wait = .4, e();
				}
			}
			let d = Math.atan2(Math.sin(s.heading - c.root.rotation.y), Math.cos(s.heading - c.root.rotation.y));
			c.root.rotation.y += d * (1 - Math.exp(-9 * n));
			let p = s.mode !== "rest";
			s.sit = Vd(s.sit, +(!p && s.pose === "sit"), 6, n), s.lie = Vd(s.lie, +(!p && s.pose === "lie"), 4, n);
			let m = p ? Math.sin(s.stride) * .6 : 0, h = -.52 * s.sit, g = Math.sin(o * 1.3 + s.stride) * .012 * s.lie;
			c.body.rotation.x = h, c.body.position.y = c.hip * (1 - .55 * s.sit - .86 * s.lie) + g;
			let _ = m - h - 1.45 * s.lie, v = -m - h - 1.25 * s.sit + 1.45 * s.lie;
			c.legs[0].rotation.x = _, c.legs[1].rotation.x = -m - h - 1.45 * s.lie, c.legs[2].rotation.x = v, c.legs[3].rotation.x = m - h - 1.25 * s.sit + 1.45 * s.lie, c.head.rotation.x = -h + .42 * s.lie + (p ? Math.sin(s.stride * 2) * .04 : Math.sin(o * .5 + s.stride) * .06 * (1 - s.lie)), s.wag = Vd(s.wag, s.lie > .5 ? .1 : 1, 3, n), c.tail.rotation.y = Math.sin(o * (s.name === "Tom" ? 1.1 : 9) + s.stride) * (s.name === "Tom" ? .35 : .45) * s.wag;
		}
	} };
}
// ../../node_modules/.pnpm/three@0.187.0/node_modules/three/examples/jsm/shaders/CopyShader.js
var Wd = {
	name: "CopyShader",
	uniforms: {
		tDiffuse: { value: null },
		opacity: { value: 1 }
	},
	vertexShader: "\n\n		varying vec2 vUv;\n\n		void main() {\n\n			vUv = uv;\n			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n		}",
	fragmentShader: "\n\n		uniform float opacity;\n\n		uniform sampler2D tDiffuse;\n\n		varying vec2 vUv;\n\n		void main() {\n\n			vec4 texel = texture2D( tDiffuse, vUv );\n			gl_FragColor = opacity * texel;\n\n\n		}"
}, Gd = class {
	constructor() {
		this.isPass = !0, this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1;
	}
	setSize() {}
	render() {
		console.error("THREE.Pass: .render() must be implemented in derived pass.");
	}
	dispose() {}
}, Kd = new Da(-1, 1, 1, -1, 0, 1), qd = new class extends Pn {
	constructor() {
		super(), this.setAttribute("position", new Sn([
			-1,
			3,
			0,
			-1,
			-1,
			0,
			3,
			-1,
			0
		], 3)), this.setAttribute("uv", new Sn([
			0,
			2,
			0,
			0,
			2,
			0
		], 2));
	}
}(), Jd = class {
	constructor(e) {
		this._mesh = new Y(qd, e);
	}
	dispose() {
		this._mesh.geometry.dispose();
	}
	render(e) {
		e.render(this._mesh, Kd);
	}
	get material() {
		return this._mesh.material;
	}
	set material(e) {
		this._mesh.material = e;
	}
}, Yd = class extends Gd {
	constructor(e, t = "tDiffuse") {
		super(), this.textureID = t, this.uniforms = null, this.material = null, e instanceof Ii ? (this.uniforms = e.uniforms, this.material = e) : e && (this.uniforms = Ni.clone(e.uniforms), this.material = new Ii({
			name: e.name === void 0 ? "unspecified" : e.name,
			defines: Object.assign({}, e.defines),
			uniforms: this.uniforms,
			vertexShader: e.vertexShader,
			fragmentShader: e.fragmentShader
		})), this._fsQuad = new Jd(this.material);
	}
	render(e, t, n) {
		this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = n.texture), this._fsQuad.material = this.material, this.renderToScreen ? (e.setRenderTarget(null), this._fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this._fsQuad.render(e));
	}
	dispose() {
		this.material.dispose(), this._fsQuad.dispose();
	}
}, Xd = class extends Gd {
	constructor(e, t) {
		super(), this.scene = e, this.camera = t, this.clear = !0, this.needsSwap = !1, this.inverse = !1;
	}
	render(e, t, n) {
		let r = e.getContext(), i = e.state;
		i.buffers.color.setMask(!1), i.buffers.depth.setMask(!1), i.buffers.color.setLocked(!0), i.buffers.depth.setLocked(!0);
		let a, o;
		this.inverse ? (a = 0, o = 1) : (a = 1, o = 0), i.buffers.stencil.setTest(!0), i.buffers.stencil.setOp(r.REPLACE, r.REPLACE, r.REPLACE), i.buffers.stencil.setFunc(r.ALWAYS, a, 4294967295), i.buffers.stencil.setClear(o), i.buffers.stencil.setLocked(!0), e.setRenderTarget(n), this.clear && e.clear(), e.render(this.scene, this.camera), e.setRenderTarget(t), this.clear && e.clear(), e.render(this.scene, this.camera), i.buffers.color.setLocked(!1), i.buffers.depth.setLocked(!1), i.buffers.color.setMask(!0), i.buffers.depth.setMask(!0), i.buffers.stencil.setLocked(!1), i.buffers.stencil.setFunc(r.EQUAL, 1, 4294967295), i.buffers.stencil.setOp(r.KEEP, r.KEEP, r.KEEP), i.buffers.stencil.setLocked(!0);
	}
}, Zd = class extends Gd {
	constructor() {
		super(), this.needsSwap = !1;
	}
	render(e) {
		e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1);
	}
}, Qd = class {
	constructor(e, t) {
		if (this.renderer = e, this._pixelRatio = e.getPixelRatio(), t === void 0) {
			let n = e.getSize(new W());
			this._width = n.width, this._height = n.height, t = new $e(this._width * this._pixelRatio, this._height * this._pixelRatio, { type: u }), t.texture.name = "EffectComposer.rt1";
		} else this._width = t.width, this._height = t.height;
		this.renderTarget1 = t, this.renderTarget2 = t.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], this.copyPass = new Yd(Wd), this.copyPass.material.blending = 0, this.timer = new Pa();
	}
	swapBuffers() {
		let e = this.readBuffer;
		this.readBuffer = this.writeBuffer, this.writeBuffer = e;
	}
	addPass(e) {
		this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
	}
	insertPass(e, t) {
		this.passes.splice(t, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
	}
	removePass(e) {
		let t = this.passes.indexOf(e);
		t !== -1 && this.passes.splice(t, 1);
	}
	isLastEnabledPass(e) {
		for (let t = e + 1; t < this.passes.length; t++) if (this.passes[t].enabled) return !1;
		return !0;
	}
	render(e) {
		this.timer.update(), e === void 0 && (e = this.timer.getDelta());
		let t = this.renderer.getRenderTarget(), n = !1;
		for (let t = 0, r = this.passes.length; t < r; t++) {
			let r = this.passes[t];
			if (r.enabled !== !1) {
				if (r.renderToScreen = this.renderToScreen && this.isLastEnabledPass(t), r.render(this.renderer, this.writeBuffer, this.readBuffer, e, n), r.needsSwap) {
					if (n) {
						let t = this.renderer.getContext(), n = this.renderer.state.buffers.stencil;
						n.setFunc(t.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), n.setFunc(t.EQUAL, 1, 4294967295);
					}
					this.swapBuffers();
				}
				Xd !== void 0 && (r instanceof Xd ? n = !0 : r instanceof Zd && (n = !1));
			}
		}
		this.renderer.setRenderTarget(t);
	}
	reset(e) {
		if (e === void 0) {
			let t = this.renderer.getSize(new W());
			this._pixelRatio = this.renderer.getPixelRatio(), this._width = t.width, this._height = t.height, e = this.renderTarget1.clone(), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
		}
		this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2;
	}
	setSize(e, t) {
		this._width = e, this._height = t;
		let n = this._width * this._pixelRatio, r = this._height * this._pixelRatio;
		this.renderTarget1.setSize(n, r), this.renderTarget2.setSize(n, r);
		for (let e = 0; e < this.passes.length; e++) this.passes[e].setSize(n, r);
	}
	setPixelRatio(e) {
		this._pixelRatio = e, this.setSize(this._width, this._height);
	}
	dispose() {
		this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose();
	}
}, $d = class extends Gd {
	constructor(e, t, n = null, r = null, i = null) {
		super(), this.scene = e, this.camera = t, this.overrideMaterial = n, this.clearColor = r, this.clearAlpha = i, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this.isRenderPass = !0, this._oldClearColor = new J();
	}
	render(e, t, n) {
		let r = e.autoClear;
		e.autoClear = !1;
		let i, a;
		this.overrideMaterial !== null && (a = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), this.clearColor !== null && (e.getClearColor(this._oldClearColor), e.setClearColor(this.clearColor, e.getClearAlpha())), this.clearAlpha !== null && (i = e.getClearAlpha(), e.setClearAlpha(this.clearAlpha)), this.clearDepth == 1 && e.clearDepth(), e.setRenderTarget(this.renderToScreen ? null : n), this.clear === !0 && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), e.render(this.scene, this.camera), this.clearColor !== null && e.setClearColor(this._oldClearColor), this.clearAlpha !== null && e.setClearAlpha(i), this.overrideMaterial !== null && (this.scene.overrideMaterial = a), e.autoClear = r;
	}
}, ef = {
	name: "LuminosityHighPassShader",
	uniforms: {
		tDiffuse: { value: null },
		luminosityThreshold: { value: 1 },
		smoothWidth: { value: 1 },
		defaultColor: { value: new J(0) },
		defaultOpacity: { value: 0 }
	},
	vertexShader: "\n\n		varying vec2 vUv;\n\n		void main() {\n\n			vUv = uv;\n\n			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n		}",
	fragmentShader: "\n\n		uniform sampler2D tDiffuse;\n		uniform vec3 defaultColor;\n		uniform float defaultOpacity;\n		uniform float luminosityThreshold;\n		uniform float smoothWidth;\n\n		varying vec2 vUv;\n\n		void main() {\n\n			vec4 texel = texture2D( tDiffuse, vUv );\n\n			float v = luminance( texel.xyz );\n\n			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );\n\n			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );\n\n			gl_FragColor = mix( outputColor, texel, alpha );\n\n		}"
}, tf = class e extends Gd {
	constructor(e, t = 1, n, r) {
		super(), this.strength = t, this.radius = n, this.threshold = r, this.resolution = e === void 0 ? new W(256, 256) : new W(e.x, e.y), this.clearColor = new J(0, 0, 0), this.needsSwap = !1, this.renderTargetsHorizontal = [], this.renderTargetsVertical = [], this.nMips = 5;
		let i = Math.round(this.resolution.x / 2), a = Math.round(this.resolution.y / 2);
		this.renderTargetBright = new $e(i, a, {
			type: u,
			depthBuffer: !1
		}), this.renderTargetBright.texture.name = "UnrealBloomPass.bright", this.renderTargetBright.texture.generateMipmaps = !1;
		for (let e = 0; e < this.nMips; e++) {
			let t = new $e(i, a, {
				type: u,
				depthBuffer: !1
			});
			t.texture.name = "UnrealBloomPass.h" + e, t.texture.generateMipmaps = !1, this.renderTargetsHorizontal.push(t);
			let n = new $e(i, a, {
				type: u,
				depthBuffer: !1
			});
			n.texture.name = "UnrealBloomPass.v" + e, n.texture.generateMipmaps = !1, this.renderTargetsVertical.push(n), i = Math.round(i / 2), a = Math.round(a / 2);
		}
		let o = ef;
		this.highPassUniforms = Ni.clone(o.uniforms), this.highPassUniforms.luminosityThreshold.value = r, this.highPassUniforms.smoothWidth.value = .01, this.materialHighPassFilter = new Ii({
			uniforms: this.highPassUniforms,
			vertexShader: o.vertexShader,
			fragmentShader: o.fragmentShader
		}), this.separableBlurMaterials = [];
		let s = [
			6,
			10,
			14,
			18,
			22
		];
		i = Math.round(this.resolution.x / 2), a = Math.round(this.resolution.y / 2);
		for (let e = 0; e < this.nMips; e++) this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])), this.separableBlurMaterials[e].uniforms.invSize.value = new W(1 / i, 1 / a), i = Math.round(i / 2), a = Math.round(a / 2);
		this.compositeMaterial = this._getCompositeMaterial(this.nMips), this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture, this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture, this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture, this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture, this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture, this.compositeMaterial.uniforms.bloomStrength.value = t, this.compositeMaterial.uniforms.bloomRadius.value = .1;
		let c = [
			1,
			.8,
			.6,
			.4,
			.2
		];
		this.compositeMaterial.uniforms.bloomFactors.value = c, this.bloomTintColors = [
			new G(1, 1, 1),
			new G(1, 1, 1),
			new G(1, 1, 1),
			new G(1, 1, 1),
			new G(1, 1, 1)
		], this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, this.copyUniforms = Ni.clone(Wd.uniforms), this.blendMaterial = new Ii({
			uniforms: this.copyUniforms,
			vertexShader: Wd.vertexShader,
			fragmentShader: Wd.fragmentShader,
			premultipliedAlpha: !0,
			blending: 2,
			depthTest: !1,
			depthWrite: !1,
			transparent: !0
		}), this._oldClearColor = new J(), this._oldClearAlpha = 1, this._basic = new fr(), this._fsQuad = new Jd(null);
	}
	dispose() {
		for (let e = 0; e < this.renderTargetsHorizontal.length; e++) this.renderTargetsHorizontal[e].dispose();
		for (let e = 0; e < this.renderTargetsVertical.length; e++) this.renderTargetsVertical[e].dispose();
		this.renderTargetBright.dispose();
		for (let e = 0; e < this.separableBlurMaterials.length; e++) this.separableBlurMaterials[e].dispose();
		this.compositeMaterial.dispose(), this.blendMaterial.dispose(), this._basic.dispose(), this._fsQuad.dispose();
	}
	setSize(e, t) {
		let n = Math.round(e / 2), r = Math.round(t / 2);
		this.renderTargetBright.setSize(n, r);
		for (let e = 0; e < this.nMips; e++) this.renderTargetsHorizontal[e].setSize(n, r), this.renderTargetsVertical[e].setSize(n, r), this.separableBlurMaterials[e].uniforms.invSize.value = new W(1 / n, 1 / r), n = Math.round(n / 2), r = Math.round(r / 2);
	}
	render(t, n, r, i, a) {
		t.getClearColor(this._oldClearColor), this._oldClearAlpha = t.getClearAlpha();
		let o = t.autoClear;
		t.autoClear = !1, t.setClearColor(this.clearColor, 0), a && t.state.buffers.stencil.setTest(!1), this.renderToScreen && (this._fsQuad.material = this._basic, this._basic.map = r.texture, t.setRenderTarget(null), t.clear(), this._fsQuad.render(t)), this.highPassUniforms.tDiffuse.value = r.texture, this.highPassUniforms.luminosityThreshold.value = this.threshold, this._fsQuad.material = this.materialHighPassFilter, t.setRenderTarget(this.renderTargetBright), t.clear(), this._fsQuad.render(t);
		let s = this.renderTargetBright;
		for (let n = 0; n < this.nMips; n++) this._fsQuad.material = this.separableBlurMaterials[n], this.separableBlurMaterials[n].uniforms.colorTexture.value = s.texture, this.separableBlurMaterials[n].uniforms.direction.value = e.BlurDirectionX, t.setRenderTarget(this.renderTargetsHorizontal[n]), t.clear(), this._fsQuad.render(t), this.separableBlurMaterials[n].uniforms.colorTexture.value = this.renderTargetsHorizontal[n].texture, this.separableBlurMaterials[n].uniforms.direction.value = e.BlurDirectionY, t.setRenderTarget(this.renderTargetsVertical[n]), t.clear(), this._fsQuad.render(t), s = this.renderTargetsVertical[n];
		this._fsQuad.material = this.compositeMaterial, this.compositeMaterial.uniforms.bloomStrength.value = this.strength, this.compositeMaterial.uniforms.bloomRadius.value = this.radius, this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, t.setRenderTarget(this.renderTargetsHorizontal[0]), t.clear(), this._fsQuad.render(t), this._fsQuad.material = this.blendMaterial, this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture, a && t.state.buffers.stencil.setTest(!0), this.renderToScreen ? (t.setRenderTarget(null), this._fsQuad.render(t)) : (t.setRenderTarget(r), this._fsQuad.render(t)), t.setClearColor(this._oldClearColor, this._oldClearAlpha), t.autoClear = o;
	}
	_getSeparableBlurMaterial(e) {
		let t = [], n = e / 3;
		for (let r = 0; r < e; r++) t.push(.39894 * Math.exp(-.5 * r * r / (n * n)) / n);
		let r = [], i = [];
		for (let n = 1; n < e; n += 2) {
			let a = t[n], o = n + 1 < e ? t[n + 1] : 0, s = a + o;
			r.push((n * a + (n + 1) * o) / s), i.push(s);
		}
		return new Ii({
			defines: { KERNEL_PAIRS: r.length },
			uniforms: {
				colorTexture: { value: null },
				invSize: { value: new W(.5, .5) },
				direction: { value: new W(.5, .5) },
				centerWeight: { value: t[0] },
				gaussianOffsets: { value: r },
				gaussianWeights: { value: i }
			},
			vertexShader: "\n\n				varying vec2 vUv;\n\n				void main() {\n\n					vUv = uv;\n					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n				}",
			fragmentShader: "\n\n				#include <common>\n\n				varying vec2 vUv;\n\n				uniform sampler2D colorTexture;\n				uniform vec2 invSize;\n				uniform vec2 direction;\n				uniform float centerWeight;\n				uniform float gaussianOffsets[KERNEL_PAIRS];\n				uniform float gaussianWeights[KERNEL_PAIRS];\n\n				void main() {\n\n					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;\n\n					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {\n\n						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];\n						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;\n						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;\n						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];\n\n					}\n\n					gl_FragColor = vec4( diffuseSum, 1.0 );\n\n				}"
		});
	}
	_getCompositeMaterial(e) {
		return new Ii({
			defines: { NUM_MIPS: e },
			uniforms: {
				blurTexture1: { value: null },
				blurTexture2: { value: null },
				blurTexture3: { value: null },
				blurTexture4: { value: null },
				blurTexture5: { value: null },
				bloomStrength: { value: 1 },
				bloomFactors: { value: null },
				bloomTintColors: { value: null },
				bloomRadius: { value: 0 }
			},
			vertexShader: "\n\n				varying vec2 vUv;\n\n				void main() {\n\n					vUv = uv;\n					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n				}",
			fragmentShader: "\n\n				varying vec2 vUv;\n\n				uniform sampler2D blurTexture1;\n				uniform sampler2D blurTexture2;\n				uniform sampler2D blurTexture3;\n				uniform sampler2D blurTexture4;\n				uniform sampler2D blurTexture5;\n				uniform float bloomStrength;\n				uniform float bloomRadius;\n				uniform float bloomFactors[NUM_MIPS];\n				uniform vec3 bloomTintColors[NUM_MIPS];\n\n				float lerpBloomFactor( const in float factor ) {\n\n					float mirrorFactor = 1.2 - factor;\n					return mix( factor, mirrorFactor, bloomRadius );\n\n				}\n\n				void main() {\n\n					// 3.0 for backwards compatibility with previous alpha-based intensity\n					vec3 bloom = 3.0 * bloomStrength * (\n						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +\n						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +\n						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +\n						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +\n						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb\n					);\n\n					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );\n					gl_FragColor = vec4( bloom, bloomAlpha );\n\n				}"
		});
	}
};
tf.BlurDirectionX = new W(1, 0), tf.BlurDirectionY = new W(0, 1);
// ../../node_modules/.pnpm/three@0.187.0/node_modules/three/examples/jsm/shaders/OutputShader.js
var nf = {
	name: "OutputShader",
	uniforms: {
		tDiffuse: { value: null },
		toneMappingExposure: { value: 1 }
	},
	vertexShader: "\n		precision highp float;\n\n		uniform mat4 modelViewMatrix;\n		uniform mat4 projectionMatrix;\n\n		attribute vec3 position;\n		attribute vec2 uv;\n\n		varying vec2 vUv;\n\n		void main() {\n\n			vUv = uv;\n			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n		}",
	fragmentShader: "\n\n		precision highp float;\n\n		uniform sampler2D tDiffuse;\n\n		#include <tonemapping_pars_fragment>\n		#include <colorspace_pars_fragment>\n\n		varying vec2 vUv;\n\n		void main() {\n\n			gl_FragColor = texture2D( tDiffuse, vUv );\n\n			// tone mapping\n\n			#ifdef LINEAR_TONE_MAPPING\n\n				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );\n\n			#elif defined( REINHARD_TONE_MAPPING )\n\n				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );\n\n			#elif defined( CINEON_TONE_MAPPING )\n\n				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );\n\n			#elif defined( ACES_FILMIC_TONE_MAPPING )\n\n				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );\n\n			#elif defined( AGX_TONE_MAPPING )\n\n				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );\n\n			#elif defined( NEUTRAL_TONE_MAPPING )\n\n				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );\n\n			#elif defined( CUSTOM_TONE_MAPPING )\n\n				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );\n\n			#endif\n\n			// color space\n\n			#ifdef SRGB_TRANSFER\n\n				gl_FragColor = sRGBTransferOETF( gl_FragColor );\n\n			#endif\n\n		}"
}, rf = class extends Gd {
	constructor() {
		super(), this.isOutputPass = !0, this.uniforms = Ni.clone(nf.uniforms), this.material = new Li({
			name: nf.name,
			uniforms: this.uniforms,
			vertexShader: nf.vertexShader,
			fragmentShader: nf.fragmentShader
		}), this._fsQuad = new Jd(this.material), this._outputColorSpace = null, this._toneMapping = null;
	}
	render(e, t, n) {
		this.uniforms.tDiffuse.value = n.texture, this.uniforms.toneMappingExposure.value = e.toneMappingExposure, (this._outputColorSpace !== e.outputColorSpace || this._toneMapping !== e.toneMapping) && (this._outputColorSpace = e.outputColorSpace, this._toneMapping = e.toneMapping, this.material.defines = {}, Be.getTransfer(this._outputColorSpace) === "srgb" && (this.material.defines.SRGB_TRANSFER = ""), this._toneMapping === 1 ? this.material.defines.LINEAR_TONE_MAPPING = "" : this._toneMapping === 2 ? this.material.defines.REINHARD_TONE_MAPPING = "" : this._toneMapping === 3 ? this.material.defines.CINEON_TONE_MAPPING = "" : this._toneMapping === 4 ? this.material.defines.ACES_FILMIC_TONE_MAPPING = "" : this._toneMapping === 6 ? this.material.defines.AGX_TONE_MAPPING = "" : this._toneMapping === 7 ? this.material.defines.NEUTRAL_TONE_MAPPING = "" : this._toneMapping === 5 && (this.material.defines.CUSTOM_TONE_MAPPING = ""), this.material.needsUpdate = !0), this.renderToScreen === !0 ? (e.setRenderTarget(null), this._fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this._fsQuad.render(e));
	}
	dispose() {
		this.material.dispose(), this._fsQuad.dispose();
	}
}, af = {
	threshold: .42,
	strength: .8,
	radius: .4
}, of = {
	uniforms: {
		tDiffuse: { value: null },
		uStrength: { value: .32 }
	},
	vertexShader: "\n    varying vec2 vUv;\n    void main() {\n      vUv = uv;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    }\n  ",
	fragmentShader: "\n    uniform sampler2D tDiffuse;\n    uniform float uStrength;\n    varying vec2 vUv;\n    void main() {\n      vec4 color = texture2D(tDiffuse, vUv);\n      float falloff = smoothstep(0.9, 0.3, length(vUv - 0.5));\n      color.rgb *= mix(1.0 - uStrength, 1.0, falloff);\n      gl_FragColor = color;\n    }\n  "
};
function sf(e, t, n) {
	let r = e.getDrawingBufferSize(new W()), i = new Qd(e, new $e(r.x, r.y, {
		type: u,
		samples: e.getPixelRatio() >= 1.5 ? 2 : 4
	})), a = new tf(new W(r.x, r.y), af.strength, af.radius, af.threshold);
	return i.addPass(new $d(t, n)), i.addPass(a), i.addPass(new Yd(of)), i.addPass(new rf()), {
		bloom: a,
		render() {
			i.render();
		},
		setSize(e, t, n) {
			i.setPixelRatio(n), i.setSize(e, t);
		}
	};
}
// src/robot.ts
var cf = new pi(1, 1, 1), lf = 2.3, uf = [
	Q.orange,
	Q.pink,
	Q.lightViolet,
	Q.green,
	Q.peach,
	"#f4c542"
], df = 150, ff = (e, t) => e + Math.random() * (t - e);
function pf(e, t, n, r = {}) {
	let i = r.still ?? (() => !1), a = e.vending.dock.clone(), o = new At();
	o.name = "snack-robot", o.position.copy(a), o.rotation.y = Math.PI / 2, o.scale.setScalar(Ul), e.scene.add(o);
	let s = new Ri({
		color: "#dfe2ea",
		roughness: .5,
		metalness: .1,
		flatShading: !0
	}), c = new Ri({
		color: "#1d1e24",
		roughness: .6,
		metalness: .2,
		flatShading: !0
	}), l = new fr({ color: Q.peach }), u = (e, t, n, r, i, a, o, s) => {
		let c = new Y(cf, t);
		return c.scale.set(n, r, i), c.position.set(a, o, s), e.add(c), c;
	}, d = new At();
	o.add(d), u(d, s, .46, .36, .5, 0, .3, 0), u(d, c, .5, .05, .54, 0, .5, 0), u(d, c, .34, .16, .02, 0, .34, .255);
	for (let e of [-1, 1]) u(d, l, .06, .06, .02, e * .08, .35, .262);
	u(d, new fr({ color: Q.orange }), .47, .04, .51, 0, .16, 0);
	for (let [e, t] of [
		[-1, 1],
		[1, 1],
		[-1, -1],
		[1, -1]
	]) u(o, c, .08, .16, .16, e * .25, .08, t * .16);
	u(d, c, .02, .18, .02, .16, .6, -.18);
	let f = u(d, new fr({ color: Q.green }), .05, .05, .05, .16, .71, -.18), p = new Ri({
		color: uf[0],
		roughness: .4,
		metalness: .3
	}), m = u(d, p, .1, .17, .1, 0, .61, .05);
	m.visible = !1;
	let h = /* @__PURE__ */ new Map();
	function g(t, n) {
		let r = e.desks.get(t);
		if (!r) return;
		let i = h.get(t);
		if (!i) {
			let e = new Y(cf, new Ri({
				roughness: .4,
				metalness: .3
			}));
			e.scale.set(.1, .17, .1), e.position.set(.82, .84, .22), r.group.add(e), h.set(t, i = {
				mesh: e,
				left: 0
			});
		}
		i.mesh.material.color.set(n), i.mesh.visible = !0, i.left = df;
	}
	let _ = "docked", v = ff(8, 16), y = [], b = 0, x = null, S = o.rotation.y;
	function C() {
		let t = n.list().filter((t) => {
			if (t.state === "idle" || !t.settled || h.get(t.id)?.mesh.visible) return !1;
			let r = e.desks.get(t.id), i = n.get(t.id)?.position;
			return !!(r && i && i.distanceTo(r.seat) < .6);
		});
		return t.length ? t[Math.floor(Math.random() * t.length)].id : null;
	}
	function w(e) {
		let n = t.findPath(o.position.clone().setY(0), e.clone().setY(0)), r = n.at(-1), i = n.at(-2) ?? o.position;
		if (r) {
			let e = new G().subVectors(i, r).setY(0);
			e.length() > .9 ? r.add(e.normalize().multiplyScalar(.8)) : n.pop();
		}
		return n;
	}
	return { update(n, r) {
		for (let e of h.values()) e.mesh.visible && (e.left -= n, e.left <= 0 && (e.mesh.visible = !1));
		if (f.visible = _ === "docked" || Math.floor(r * 3) % 2 == 0, _ === "docked") v -= n, v <= 0 && !i() && (x = C(), x ? (_ = "loading", v = 1.4, p.color.set(uf[Math.floor(Math.random() * uf.length)]), S = -Math.PI / 2) : v = ff(10, 20));
		else if (_ === "loading") {
			if (v -= n, v <= .7 && (m.visible = !0), v <= 0) {
				let t = x ? e.desks.get(x)?.seat : void 0;
				t ? (y = w(t), b = 0, _ = "out") : _ = "docked";
			}
		} else if (_ === "out" || _ === "back") {
			let t = y[b];
			if (t) {
				let r = t.x - o.position.x, i = t.z - o.position.z, a = Math.hypot(r, i), s = lf * n;
				a <= s ? (o.position.x = t.x, o.position.z = t.z, b += 1) : (o.position.x += r / a * s, o.position.z += i / a * s, S = Math.atan2(r, i)), o.position.y = e.floorHeightAt(o.position.x, o.position.z);
			} else if (_ === "out") {
				_ = "serving", v = 1.6;
				let t = x ? e.desks.get(x) : void 0;
				t && (S = Math.atan2(t.position.x - o.position.x, t.position.z - o.position.z));
			} else _ = "docked", v = ff(35, 80), S = Math.PI / 2;
		} else _ === "serving" && (v -= n, v <= .8 && m.visible && x && (m.visible = !1, g(x, `#${p.color.getHexString()}`)), v <= 0 && (y = t.findPath(o.position.clone().setY(0), a), b = 0, _ = "back", x = null));
		let s = Math.atan2(Math.sin(S - o.rotation.y), Math.cos(S - o.rotation.y));
		o.rotation.y += s * (1 - Math.exp(-8 * n)), d.position.y = _ === "out" || _ === "back" ? Math.abs(Math.sin(r * 14)) * .012 : 0;
	} };
}
// src/hero.ts
function mf() {
	try {
		return !!document.createElement("canvas").getContext("webgl2");
	} catch {
		return !1;
	}
}
function hf(e, t = {}) {
	let n = window.matchMedia("(pointer: coarse)").matches, r = window.matchMedia("(prefers-reduced-motion: reduce)"), i = Math.max(t.period ?? 90, 1), a = t.motion ?? "sway", o = U.degToRad(t.angle ?? 45), s = U.degToRad(t.swing ?? 28), c = U.degToRad(t.elevation ?? 33), l = Math.max(t.zoom ?? 1, .2), u = t.sky ?? "auto", d = new sl({
		antialias: !1,
		powerPreference: "default"
	});
	d.toneMapping = 7, d.shadowMap.enabled = !n, d.shadowMap.type = 1, d.shadowMap.autoUpdate = !1;
	let f = () => Math.min(window.devicePixelRatio || 1, t.maxPixelRatio ?? (n ? 1.25 : 1.5));
	d.setPixelRatio(f());
	let p = d.domElement;
	p.setAttribute("role", "img"), p.setAttribute("aria-label", "The SC45 AI Office: a 3D office by the sea, with agents at work"), Object.assign(p.style, {
		display: "block",
		width: "100%",
		height: "100%",
		pointerEvents: "none"
	}), e.append(p);
	let m = rd(), h = new Sa(32, 1, .5, 800), g = sf(d, m.scene, h), _ = Fd(m.obstacles, Hl, m.floorHeightAt), v = () => r.matches, y = Ad(m, _, { instant: v }), b = Ud(m, _, {
		still: v,
		leader: () => y.leading()
	}), x = pf(m, _, y, { still: v }), S = Al(), C = /* @__PURE__ */ new Set(), w = t.lively !== !1;
	function T() {
		for (let e of y.list()) {
			let t = S.agents[e.id];
			t && t.state !== "idle" ? m.setDeskScreen(e.id, {
				title: t.task ?? t.state,
				missionId: t.missionId,
				lines: [],
				blocked: t.state === "blocked"
			}) : m.setDeskScreen(e.id, C.has(e.id) ? {
				title: "Working",
				lines: [],
				blocked: !1
			} : null);
		}
	}
	let E = jd();
	E.start({
		onSnapshot(e) {
			S = e, S.profiles ??= {}, S.approvals ??= [], w ? C.size === 0 && (y.sync(S), C = new Set(y.stage(!0))) : y.sync(S), m.setMissions(S.missions), T();
		},
		onEvent(e) {
			Il(S, e), y.apply(e), e.type.startsWith("mission.") && m.setMissions(S.missions), e.type === "agent.state" && T();
		},
		onStatus() {}
	});
	let D = new G(0, 1, 1.5), O = Math.hypot(Hl.width, Hl.depth) / 2;
	function k(e, n) {
		h.aspect = e / n;
		let r = Math.tan(U.degToRad(h.fov / 2)), i = O * 1.08 / (r * Math.min(1, h.aspect * .92)) / l;
		h.userData.distance = i;
		let a = t.offset?.x ?? 0, o = t.offset?.y ?? 0;
		a || o ? h.setViewOffset(e, n, -a * e, o * n, e, n) : h.clearViewOffset(), h.updateProjectionMatrix();
	}
	function A(e) {
		let t = e / i * Math.PI * 2, n = a === "orbit" ? o + t : a === "sway" ? o + Math.sin(t) * s : o, r = h.userData.distance;
		h.position.set(D.x + Math.sin(n) * Math.cos(c) * r, D.y + Math.sin(c) * r, D.z + Math.cos(n) * Math.cos(c) * r), h.lookAt(D), h.near = U.clamp(r * .04, .5, 8), h.updateProjectionMatrix();
	}
	function ee() {
		let t = Math.max(e.clientWidth, 1), n = Math.max(e.clientHeight, 1);
		d.setPixelRatio(f()), d.setSize(t, n, !1), g.setSize(t, n, d.getPixelRatio()), k(t, n);
	}
	let j = new ResizeObserver(() => {
		ee(), re || F(performance.now());
	});
	j.observe(e), ee(), document.fonts?.ready.then(() => !oe && m.redrawText());
	let M = mu(u), N = !1, te = 0, ne = 0, P = !1;
	function F(e) {
		let n = ne ? Math.min((e - ne) / 1e3, .1) : 0;
		ne = e, v() || (te += n), A(v() ? 0 : te);
		let r = h.userData.distance, i = mu(u);
		N ? hu(M, i, n) : Object.assign(M, i), N = !0, m.fog.density = U.clamp(.42 / r, .0025, .012) * U.lerp(1, .18, M.daylight), m.setSky(M), y.setNight(pu(M.daylight)), g.bloom.enabled = M.daylight < .97, g.bloom.threshold = U.lerp(af.threshold, 1.6, M.daylight), g.bloom.strength = af.strength * U.lerp(.3, 1, U.smoothstep(r, 12, 60)) * U.lerp(1, .32, M.daylight), E.update(n), y.update(n, te), b.update(n, te), x.update(n, te), m.update(te, h), m.shadowsStale() && (d.shadowMap.needsUpdate = !0), g.render(), P || (P = !0, t.onReady?.());
	}
	let re = !1, ie = !0, I = !0, ae = 0, oe = !1;
	function L(e) {
		re && (F(e), ae = requestAnimationFrame(L));
	}
	function R() {
		let e = ie && I && !document.hidden && !oe;
		e !== re && (re = e, re ? (ne = 0, ae = requestAnimationFrame(L)) : cancelAnimationFrame(ae));
	}
	let se = new IntersectionObserver((e) => {
		I = e.some((e) => e.isIntersecting), R();
	});
	se.observe(e);
	let ce = () => R();
	document.addEventListener("visibilitychange", ce);
	let le = (e) => {
		e.preventDefault(), ie = !1, R();
	};
	return p.addEventListener("webglcontextlost", le), R(), {
		pause() {
			ie = !1, R();
		},
		resume() {
			ie = !0, R();
		},
		setSky(e) {
			u = e;
		},
		dispose() {
			oe || (oe = !0, R(), E.stop(), se.disconnect(), j.disconnect(), document.removeEventListener("visibilitychange", ce), p.removeEventListener("webglcontextlost", le), m.scene.traverse((e) => {
				let t = e;
				t.geometry?.dispose();
				for (let e of Array.isArray(t.material) ? t.material : t.material ? [t.material] : []) {
					for (let t of Object.values(e)) t instanceof Xe && t.dispose();
					e.dispose();
				}
			}), d.dispose(), d.forceContextLoss(), p.remove());
		}
	};
}
export { hf as mountOfficeHero, mf as officeHeroSupported };
