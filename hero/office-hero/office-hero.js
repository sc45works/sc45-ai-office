import * as e from "three";
import { CSS2DObject as t } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { mergeGeometries as n } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { EffectComposer as r } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass as i } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass as a } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass as o } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass as s } from "three/examples/jsm/postprocessing/OutputPass.js";
// ../shared/src/appearance.ts
var c = ["masculine", "feminine"], l = [
	"short",
	"long",
	"bun",
	"ponytail",
	"curly",
	"bald"
], u = [
	"#f6d7c3",
	"#eec1a2",
	"#d9a47c",
	"#c08a5e",
	"#a06a44",
	"#7c4f33",
	"#5a3825",
	"#3d2618"
], d = [
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
], f = [
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
], p = [
	"#1b1b20",
	"#2a3550",
	"#3e4a5c",
	"#5a5a64",
	"#6b5136",
	"#8a7a62",
	"#c9c9d1",
	"#3a2b3f"
], m = /^#[0-9a-f]{6}$/i, h = (e, t) => e.includes(t);
function g(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return null;
	let t = e;
	if (!h(c, t.build) || !h(l, t.hair)) return null;
	for (let e of [
		"skin",
		"hairColor",
		"top",
		"bottom"
	]) if (typeof t[e] != "string" || !m.test(t[e])) return null;
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
function _(e) {
	if (typeof e != "string") return null;
	let t = e.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
	return !t || t.length > 24 ? null : t;
}
function v(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return {
		ok: !1,
		error: "send an object with \"name\", \"appearance\", or both"
	};
	let t = e, n = {};
	if (t.name !== void 0) {
		let e = _(t.name);
		if (!e) return {
			ok: !1,
			error: "\"name\" must be 1 to 24 characters"
		};
		n.name = e;
	}
	if (t.appearance !== void 0) {
		let e = g(t.appearance);
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
function y(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n++) t = Math.imul(t ^ e.charCodeAt(n), 16777619);
	return t >>> 0;
}
var b = {
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
function x(e) {
	if (b[e]) return { ...b[e] };
	let t = (t, n) => t[y(`${e}:${n}`) % t.length], n = t(c, "build"), r = t(n === "feminine" ? [
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
		skin: t(u, "skin"),
		hair: r,
		hairColor: t(d.slice(0, 7), "hair-colour"),
		glasses: y(`${e}:glasses`) % 4 == 0,
		beard: n === "masculine" && y(`${e}:beard`) % 3 == 0,
		top: t(f, "top"),
		bottom: t(p, "bottom")
	};
}
// ../shared/src/events.ts
var S = [
	"start",
	"stage",
	"close"
], C = "exec.chief-of-staff", w = "exec.project-coordinator", T = [
	{
		id: "exec.ceo",
		name: "Stephen",
		role: "CEO",
		human: !0
	},
	{
		id: C,
		name: "Sophia",
		role: "Chief of Staff"
	},
	{
		id: w,
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
], E = T.filter((e) => !e.human), D = {
	missions: 4,
	tasks: 6,
	outputs: 10
}, O = 60, k = 20;
function A() {
	let e = {};
	for (let t of E) e[t.id] = {
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
function j(e) {
	return e === "lounge" || !!e?.startsWith("lounge.");
}
function M(e, t, n) {
	if (n) return n;
	if (t === "collaborating" || t === "idle" && j(e)) return e;
}
function N(e, t, n, r) {
	let i = e.findIndex(n);
	i >= 0 && e.splice(i, 1), e.push(t), e.length > r && e.splice(0, e.length - r);
}
function P(e, t) {
	let n = t.type === "agent.state" && t.state !== "idle" && !!t.task, r = t.type === "agent.output" && !!t.meta?.path;
	if (!n && !r) return;
	e.activity ??= {};
	let i = e.activity[t.agentId] ??= {
		missions: [],
		tasks: [],
		outputs: []
	}, a = t.missionId ?? e.agents[t.agentId]?.missionId;
	if (a && N(i.missions, a, (e) => e === a, D.missions), n) {
		let e = {
			label: t.task,
			ts: t.ts
		};
		a && (e.missionId = a), N(i.tasks, e, (t) => t.label === e.label && t.missionId === e.missionId, D.tasks);
	} else {
		let e = {
			path: t.meta.path,
			ts: t.ts
		};
		t.task && (e.label = t.task), a && (e.missionId = a), N(i.outputs, e, (t) => t.path === e.path, D.outputs);
	}
}
function F(e, t) {
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
	t.state && (a.state = t.state), t.task && (a.task = t.task), t.missionId && (a.missionId = t.missionId), typeof t.meta?.path == "string" && (a.path = t.meta.path), t.type === "approval.decided" && typeof t.meta?.decision == "string" && (a.decision = t.meta.decision), n && typeof t.meta?.verdict == "string" && (a.verdict = t.meta.verdict), r !== void 0 && (a.costUsd = r), i !== void 0 && (a.durationMs = i), e.recent.push(a), e.recent.length > O && e.recent.splice(0, e.recent.length - O);
}
function ee(e, t) {
	if (e.seq += 1, e.updatedAt = t.ts, P(e, t), F(e, t), t.type === "agent.state" && t.state) {
		let n = e.agents[t.agentId], r = {
			state: t.state,
			since: t.ts
		}, i = t.state === "idle" ? void 0 : t.task ?? n?.task, a = M(n?.at, t.state, t.deskId), o = t.state === "idle" ? void 0 : t.missionId ?? n?.missionId;
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
		let n = v({
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
		if (t.type === "approval.requested" && n && t.missionId && S.includes(r)) {
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
		for (let t = 0; t < e.missions.length && i > k;) e.missions[t].status === "done" ? (e.missions.splice(t, 1), --i) : t += 1;
	}
	return e;
}
// ../shared/src/demo-script.ts
function I(e, t, n, r) {
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
function L(e, t, n, r, i = {}) {
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
var te = [
	{
		at: 1.5,
		event: {
			type: "mission.created",
			agentId: C,
			missionId: "{1}",
			task: "Pixel Bytes homepage refresh"
		}
	},
	L(1.6, C, "working", "Briefing: homepage refresh", { missionId: "{1}" }),
	L(3, w, "working", "Breaking the mission into tasks", { missionId: "{1}" }),
	L(5, "design.lead", "working", "Moodboard and hero direction", { missionId: "{1}" }),
	L(6.5, "design.ui-ux", "working", "Wireframe: homepage sections", { missionId: "{1}" }),
	L(8, "dev.lead", "working", "Repo and deploy setup", { missionId: "{1}" }),
	{
		at: 10,
		event: {
			type: "mission.created",
			agentId: C,
			missionId: "{2}",
			task: "YouTube: AI office build log"
		}
	},
	L(10.2, "content.manager", "working", "Outline: build log episode", { missionId: "{2}" }),
	L(12, "content.script-writer", "working", "Drafting hook and intro", { missionId: "{2}" }),
	L(14, "research.scout", "working", "Scanning Three.js showcases", { missionId: "{2}" }),
	L(16, "dev.frontend", "working", "Building hero section", { missionId: "{1}" }),
	I(9, "design.lead", "clients/pixel-bytes/design/moodboard.fig", "Moodboard"),
	I(11, "design.ui-ux", "clients/pixel-bytes/design/wireframes.fig", "Homepage wireframes"),
	I(12.5, "dev.lead", "clients/pixel-bytes/site/README.md", "Repo set up"),
	I(15, "content.manager", "content/build-log/outline.md", "Episode outline"),
	I(17, w, "missions/M-homepage/tasks.md", "Task breakdown"),
	L(18, "design.motion-3d", "collaborating", "Hero animation handoff", {
		missionId: "{1}",
		deskId: "dev.frontend"
	}),
	L(18.4, C, "idle"),
	{
		at: 22,
		event: {
			type: "mission.created",
			agentId: C,
			missionId: "{3}",
			task: "Lead follow-up: Relay"
		}
	},
	L(22.2, "sales.manager", "working", "Proposal draft: Relay", { missionId: "{3}" }),
	L(24, "research.analyst", "working", "Pricing benchmarks: Taiwan studios", { missionId: "{3}" }),
	L(27, "dev.qa", "blocked", "Staging URL returns 404", { missionId: "{1}" }),
	L(28.5, w, "collaborating", "Unblocking QA", {
		missionId: "{1}",
		deskId: "dev.qa"
	}),
	I(21, "dev.frontend", "clients/pixel-bytes/site/src/Hero.tsx", "Hero component"),
	I(23, "content.script-writer", "content/build-log/script.md", "Hook and intro draft"),
	I(26, "research.scout", "research/threejs-showcases.md", "Showcase notes"),
	I(30, "dev.frontend", "clients/pixel-bytes/site/src/hero.css", "Hero styles"),
	I(31, "sales.manager", "sales/relay/proposal.md", "Proposal draft"),
	L(32, "content.title-thumbnail", "working", "Title and thumbnail variants", { missionId: "{2}" }),
	L(34, "design.motion-3d", "working", "Hero animation: scroll timeline", { missionId: "{1}" }),
	L(37, "dev.qa", "working", "Testing hero on mobile", { missionId: "{1}" }),
	L(37.5, w, "working", "Updating the mission board", { missionId: "{1}" }),
	L(40, "design.lead", "collaborating", "Sync: homepage launch plan", {
		missionId: "{1}",
		deskId: "meeting"
	}),
	L(41, "dev.lead", "collaborating", "Sync: homepage launch plan", {
		missionId: "{1}",
		deskId: "meeting"
	}),
	L(42, "content.manager", "collaborating", "Sync: homepage launch plan", {
		missionId: "{1}",
		deskId: "meeting"
	}),
	I(36, "research.analyst", "research/pricing-taiwan-studios.md", "Pricing benchmarks"),
	I(39, "design.motion-3d", "clients/pixel-bytes/design/hero-timeline.json", "Scroll timeline"),
	I(44, "content.title-thumbnail", "content/build-log/titles.md", "Title variants"),
	I(46, "dev.qa", "clients/pixel-bytes/qa/mobile-report.md", "Mobile test report"),
	L(47, "sales.client-success", "working", "Onboarding checklist: Relay", { missionId: "{3}" }),
	L(50, "dev.integrations", "working", "Contact form to CRM", { missionId: "{1}" }),
	L(52, "content.social-copy", "working", "Launch posts, Mandarin and English", { missionId: "{2}" }),
	I(53, "dev.frontend", "clients/pixel-bytes/site/src/Hero.test.tsx", "Hero tests"),
	I(54, "dev.integrations", "clients/pixel-bytes/site/src/contact-form.ts", "Form to CRM"),
	I(55, "content.social-copy", "content/build-log/launch-posts.md", "Launch posts"),
	L(56, "design.lead", "reporting", "Hero direction approved", { missionId: "{1}" }),
	L(56.5, "dev.lead", "working", "Reviewing pull request", { missionId: "{1}" }),
	L(57, "content.manager", "working", "Episode outline, second pass", { missionId: "{2}" }),
	L(63, "design.lead", "idle"),
	L(64, "content.script-writer", "reporting", "Script draft ready for review", { missionId: "{2}" }),
	L(66, "research.scout", "idle", void 0, { deskId: "lounge" }),
	L(70, "content.script-writer", "idle", void 0, { deskId: "lounge" }),
	L(71, "sales.manager", "reporting", "Proposal sent: Relay", { missionId: "{3}" }),
	L(72, "research.analyst", "idle"),
	L(73, "sales.client-success", "idle"),
	{
		at: 77,
		event: {
			type: "mission.closed",
			agentId: C,
			missionId: "{3}"
		}
	},
	L(77.2, "sales.manager", "idle"),
	L(79, "dev.frontend", "reporting", "Hero section live on staging", { missionId: "{1}" }),
	L(80, "design.ui-ux", "idle"),
	L(81, "design.motion-3d", "idle", void 0, { deskId: "lounge" }),
	L(82, "dev.integrations", "idle"),
	L(83, "dev.qa", "idle"),
	{
		at: 85,
		event: {
			type: "mission.closed",
			agentId: C,
			missionId: "{1}"
		}
	},
	L(85.2, "dev.frontend", "idle"),
	L(85.6, "dev.lead", "idle"),
	L(86, w, "idle"),
	L(87, "content.title-thumbnail", "idle"),
	L(88, "content.social-copy", "idle"),
	{
		at: 90,
		event: {
			type: "mission.closed",
			agentId: C,
			missionId: "{2}"
		}
	},
	L(90.2, "content.manager", "idle"),
	L(93, "research.scout", "idle", void 0, { deskId: "research.scout" }),
	L(93.5, "content.script-writer", "idle", void 0, { deskId: "content.script-writer" }),
	L(94, "design.motion-3d", "idle", void 0, { deskId: "design.motion-3d" })
], R = {
	at: 27,
	event: {
		type: "approval.requested",
		agentId: w,
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
function ne(e, t, n = /* @__PURE__ */ new Date()) {
	let r = {
		...e.event,
		ts: n.toISOString()
	};
	return e.event.missionId && (r.missionId = e.event.missionId.replace(/\{(\d)\}/, (e, n) => `M-${101 + t * 3 + (Number(n) - 1)}`)), r;
}
// src/layout.ts
var z = {
	width: 60,
	depth: 40
}, B = 1.2, re = {
	thickness: .5,
	height: 4.2,
	sill: .9
}, V = {
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
}, H = [
	V.orange,
	V.pink,
	V.lightViolet
], ie = Array.from({ length: 6 }, (e, t) => {
	let n = t / 6 * Math.PI * 2 + Math.PI / 6;
	return {
		id: `meeting.seat-${t + 1}`,
		position: {
			x: +(Math.cos(n) * 2.45).toFixed(3),
			z: +(Math.sin(n) * 2.45).toFixed(3)
		}
	};
}), ae = [
	{
		id: "executive",
		name: "Executive Office",
		shortName: "Exec",
		kind: "executive",
		accent: V.white,
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
		accent: V.white,
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
		accent: V.pink,
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
		accent: V.violet,
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
		accent: V.orange,
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
		accent: V.peach,
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
		accent: V.green,
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
		accent: V.soft,
		position: {
			x: -20,
			z: 13.6
		},
		size: {
			width: 10,
			depth: 7
		},
		desks: [],
		spots: ie,
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
ae.push({
	id: "cafe",
	name: "Café & Bar",
	shortName: "Café",
	kind: "cafe",
	accent: V.peach,
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
var U = {
	x: 0,
	z: 2.1,
	length: 3.2,
	width: 1.76,
	height: .92
}, W = (() => {
	let e = [], t = (t, n, r, i, a = 1) => e.push({
		id: t,
		kind: n,
		position: {
			x: +r.toFixed(2),
			z: +i.toFixed(2)
		},
		scale: a
	});
	for (let e of ae) {
		let { x: n, z: r } = e.position, i = e.size.width / 2, a = e.size.depth / 2;
		if (e.kind === "department") t(`tree.${e.id}`, "tree", n + i + .7, r - a + .7, 1.05);
		else if (e.kind === "executive") for (let o of [-1, 1]) for (let s of [-1, 1]) t(`shrub.${e.id}-${o < 0 ? "w" : "e"}${s < 0 ? "n" : "s"}`, "shrub", n + o * (i + .9), r + s * (a + .8), .9);
		else if (e.kind === "coordinator") for (let a of [-1, 1]) t(`shrub.${e.id}-${a < 0 ? "west" : "east"}`, "shrub", n + a * (i + .9), r + .6);
		else (e.kind === "meeting" || e.kind === "lounge") && t(`tree.${e.id}`, "tree", n + (i * B + 1.1), r - a * B + .9);
	}
	return t("tree.entrance-west", "tree", -10.6, z.depth / 2 - 2.6, 1.05), e;
})(), oe = {
	width: .56,
	height: .5
}, G = (() => {
	let e = [], t = oe.width / 2 + .08, n = 2.4;
	for (let r of ae) {
		if (r.kind !== "department") continue;
		let { x: i, z: a } = r.position, o = r.size.width / 2, s = r.size.depth / 2, c = a - s + 1.3, l = a + s - t - oe.width / 2;
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
					x: i + u * (o - t + oe.width / 2 - n / 2),
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
})(), se = {
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
}, ce = .6;
function K(e) {
	return se[e.size ?? "standard"];
}
function le(e, t) {
	return {
		x: e.position.x + t.position.x,
		y: e.elevation ?? 0,
		z: e.position.z + t.position.z
	};
}
function ue(e, t) {
	let n = le(e, t), r = (K(t).depth / 2 + ce) * B, i = t.rotation ?? 0;
	return {
		x: n.x + Math.sin(i) * r,
		y: n.y,
		z: n.z + Math.cos(i) * r
	};
}
function de(e) {
	return e.kind === "meeting" || e.kind === "lounge" ? B : 1;
}
function fe(e, t) {
	let n = de(e);
	return {
		x: e.position.x + t.position.x * n,
		y: e.elevation ?? 0,
		z: e.position.z + t.position.z * n
	};
}
// src/daylight.ts
var q = 6.5, pe = 18, me = (e) => Math.min(1, Math.max(0, e)), J = (e, t, n) => {
	let r = me((e - t) / (n - t));
	return r * r * (3 - 2 * r);
}, he = (e, t, n) => me(1 - Math.abs(e - t) / n);
function ge(e) {
	return {
		daylight: J(e, 5.5, 7.5) * (1 - J(e, 17, 19)),
		warmth: Math.max(he(e, q, 1.6), he(e, pe, 1.6)),
		sunAngle: (.06 + .88 * me((e - q) / 11.5)) * Math.PI
	};
}
function Y(e) {
	let t = me((e - .08) / (.35 - .08));
	return 1 - t * t * (3 - 2 * t);
}
function X(e, t = /* @__PURE__ */ new Date()) {
	return ge(e === "day" ? 12.5 : e === "dusk" ? 17.9 : e === "night" ? 0 : t.getHours() + t.getMinutes() / 60);
}
function _e(e, t, n, r = 1.6) {
	let i = 1 - Math.exp(-n * r);
	return e.daylight += (t.daylight - e.daylight) * i, e.warmth += (t.warmth - e.warmth) * i, e.sunAngle += (t.sunAngle - e.sunAngle) * i, e;
}
// src/life.ts
var ve = [
	"#c99a74",
	"#a8744e",
	"#75492e",
	"#d4ae8a",
	"#8e5f40"
], ye = [
	"#b8443a",
	"#2f78b0",
	"#c9a02a",
	"#c8c4b8",
	"#2a9068",
	"#7560cc",
	"#d0652a",
	"#27303c",
	"#c05a84"
], be = [
	"#27323f",
	"#34507c",
	"#b3a583",
	"#6a2a26",
	"#1e5f5c",
	"#3c3c44"
], xe = [
	"#1a1410",
	"#2e1c12",
	"#5a3e1e",
	"#a8843c",
	"#4a4a4e"
], Se = [
	"#b8443a",
	"#c9a02a",
	"#2a9068",
	"#c8c4b8",
	"#2f78b0",
	"#d0652a"
], Ce = "#1c1c22", we = 860;
function Te(t, n) {
	let r = new e.InstancedMesh(new e.BoxGeometry(1, 1, 1), new e.MeshStandardMaterial({
		roughness: 1,
		metalness: 0,
		flatShading: !0
	}), we);
	r.name = "life", r.frustumCulled = !1;
	let i = 45, a = () => (i = i * 16807 % 2147483647) / 2147483647, o = (e) => e[Math.floor(a() * e.length)], s = (e, t) => e + a() * (t - e), c = new e.Color(), l = 0;
	function u(e) {
		let t = l;
		for (let t of e) {
			if (l >= we) throw Error("life: out of instances");
			r.setColorAt(l++, c.set(t));
		}
		return t;
	}
	let d = new e.Matrix4(), f = new e.Matrix4(), p = new e.Matrix4(), m = new e.Vector3();
	function h(e, t, n, r, i = 1) {
		d.makeRotationY(r).scale(m.set(i, i, i)).setPosition(e, t, n);
	}
	function g(e, t, n, i, a, o, s) {
		f.makeScale(a, o, s).setPosition(t, n, i).premultiply(d), r.setMatrixAt(e, f);
	}
	function _(e, t, n, i, a, o, s) {
		f.makeTranslation(0, -o / 2, 0).scale(m.set(s, o, s)), f.premultiply(p.makeRotationZ(a)).premultiply(p.makeTranslation(t, n, i)).premultiply(d), r.setMatrixAt(e, f);
	}
	function v(e, t = 1) {
		f.makeScale(0, 0, 0);
		for (let n = 0; n < t; n++) r.setMatrixAt(e + n, f);
	}
	function y(e, t, n, i, a, o, s, c) {
		f.makeRotationX(c).scale(m.set(a, o, s)).setPosition(t, n, i).premultiply(d), r.setMatrixAt(e, f);
	}
	let b = new e.InstancedMesh(new e.BoxGeometry(1, 1, 1), new e.MeshBasicMaterial(), 40);
	b.name = "life-glow", b.frustumCulled = !1;
	let x = 0;
	function S(e) {
		let t = x;
		if (x + e > 40) throw Error("life: out of glowing instances");
		return x += e, t;
	}
	function C(e, t, n, r, i, a, o) {
		f.makeScale(i, a, o).setPosition(t, n, r).premultiply(d), b.setMatrixAt(e, f);
	}
	function w(e = 1, t = o(ye)) {
		let n = o(ve), r = o(be);
		return {
			at: u([
				t,
				n,
				o(xe),
				r,
				r,
				n,
				n
			]),
			scale: e
		};
	}
	function T(e, t, n, r, i, a, o, s, c) {
		let l = e.at;
		h(t, n, r, i, e.scale), g(l, 0, 1.12, 0, .26, .6, .5), g(l + 1, 0, 1.6, 0, .34, .34, .34), g(l + 2, -.05, 1.79, 0, .36, .1, .4), _(l + 3, 0, .84, -.13, a, .84, .21), _(l + 4, 0, .84, .13, o, .84, .21), _(l + 5, 0, 1.4, -.33, s, .58, .15), _(l + 6, 0, 1.4, .33, c, .58, .15);
	}
	function E(e) {
		let t = (e % 2 + 2) % 2;
		return t < 1 ? {
			at: t,
			forward: !0
		} : {
			at: 2 - t,
			forward: !1
		};
	}
	let { ground: D } = n, O = [], k = D + .2, A = D + .14;
	for (let e = 0; e < 7; e++) {
		let e = s(-110, -20);
		O.push({
			who: w(),
			along: "x",
			fixed: s(n.boardwalk.from, n.boardwalk.to),
			from: e,
			to: e + s(60, 130),
			speed: s(1, 1.5),
			phase: a() * 2,
			y: k
		});
	}
	for (let e = 0; e < 8; e++) {
		let e = s(-90, -10);
		O.push({
			who: w(),
			along: "x",
			fixed: s(n.sand.from, n.sand.to),
			from: e,
			to: e + s(50, 110),
			speed: s(.9, 1.35),
			phase: a() * 2,
			y: A
		});
	}
	O.push({
		who: w(1, "#c8c4b8"),
		along: "x",
		fixed: n.boardwalk.to,
		from: -120,
		to: 120,
		speed: 3.3,
		phase: .3,
		y: k
	}), O.push({
		who: w(.62),
		along: "x",
		fixed: n.sand.to - 2,
		from: -8,
		to: 22,
		speed: 2.5,
		phase: 1.1,
		y: A
	}), O.push({
		who: w(),
		along: "z",
		fixed: 2.5,
		from: n.boardwalk.to + 2,
		to: n.shore + 1.5,
		speed: 1.1,
		phase: .2,
		y: A
	}), O.push({
		who: w(),
		along: "z",
		fixed: 46,
		from: n.boardwalk.to + 14,
		to: n.shore + 1,
		speed: 1,
		phase: 1.4,
		y: A
	});
	let j = {
		at: u([
			"#6a4a2a",
			"#6a4a2a",
			"#4a3018",
			"#4a3018",
			"#4a3018",
			"#4a3018",
			"#4a3018"
		]),
		owner: O[7]
	}, M = [
		0,
		1,
		2
	].map((e) => ({
		who: w(1, o([
			"#27303c",
			"#2f78b0",
			"#b8443a"
		])),
		board: u([[
			"#e8e4d6",
			"#e0b02a",
			"#e0702a"
		][e]]),
		spray: u([
			"#eef4f4",
			"#eef4f4",
			"#eef4f4"
		]),
		line: e,
		way: e % 2 ? -1 : 1
	})), { court: N } = n, P = [
		{
			who: w(1, "#b8443a"),
			x: N.x - 4.6,
			z: N.z - 1.8,
			heading: 0
		},
		{
			who: w(1, "#2f78b0"),
			x: N.x + 4.6,
			z: N.z + 1.7,
			heading: Math.PI
		},
		{
			who: w(1, "#b8443a"),
			x: N.x - 3.4,
			z: N.z + 2,
			heading: 0
		},
		{
			who: w(1, "#2f78b0"),
			x: N.x + 3.5,
			z: N.z - 2.1,
			heading: Math.PI
		}
	], F = u(["#d8cf8a"]), ee = 1.9, I = w(1, "#27303c"), L = w(1, "#c9a02a"), te = u([
		"#6c7078",
		Ce,
		Ce
	]), R = w(1, "#2a9068"), ne = n.seats.slice(0, 20).map((e, t) => ({
		who: w(),
		seat: e,
		phase: t * 1.7
	})), z = u([
		"#8e8e92",
		"#9a9a9e",
		"#8e8e92",
		"#a4a4a8",
		"#9a9a9e"
	]);
	function B(e, t, n, r) {
		let i = o(Se), a = o(ve), s = o(ye), c = o(be);
		return {
			at: u([
				i,
				i,
				Ce,
				i,
				Ce,
				"#d8d0a8",
				Ce,
				Ce,
				s,
				a,
				o(Se),
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
	let re = [
		B(n.front + .45, 1, 10.5, 20),
		B(n.front + .45, 1, 8.6, 170),
		B(n.front - .45, -1, 11.4, 90),
		B(n.front - .45, -1, 9.2, 240),
		B(n.back + 1, 1, 9.8, 130),
		B(n.back - 1, -1, 10.8, 60)
	], V = [0, 1].map((e) => ({
		at: u(Array.from({ length: 14 }, () => "#d4dcdc")),
		line: e
	})), H = [
		0,
		1,
		2
	].map((e) => ({
		at: u(Array.from({ length: 14 }, () => "#5aa6c0")),
		face: u(Array.from({ length: 14 }, () => "#6cb4cc")),
		crest: u(Array.from({ length: 14 }, () => "#dfe8e8")),
		line: e
	})), ie = [{
		at: u([
			"#c8c4b8",
			"#8a5a34",
			"#d8d4c8",
			"#b8443a"
		]),
		z: n.shore + 58,
		speed: .9,
		offset: 40
	}, {
		at: u([
			"#2f78b0",
			"#8a5a34",
			"#d8d4c8",
			"#c9a02a"
		]),
		z: n.shore + 84,
		speed: -.6,
		offset: 150
	}], ae = [], U = Math.PI / 2;
	for (let e of [{
		way: 1,
		speed: 8.5,
		offset: 60,
		z: n.shore + 13,
		height: 10.5
	}, {
		way: -1,
		speed: 7.4,
		offset: 215,
		z: n.shore + 25,
		height: 14.5
	}]) for (let t = 0; t < 5; t++) {
		let n = t * 3.4 + s(-.6, .6), r = s(-1.6, 1.6), i = s(-.7, .7), o = a() * 6;
		ae.push({
			at: u([
				"#e2e2dc",
				"#c6c9cc",
				"#c6c9cc"
			]),
			beat: a() * 6,
			size: 1.25,
			fly: (t) => ({
				x: ((t * e.speed + e.offset - n + 1440) % 360 - 180) * e.way,
				y: D + e.height + i + Math.sin(t * .31 + e.offset) * 1.6 + Math.sin(t * .9 + o) * .25,
				z: e.z + r + Math.sin(t * .17 + e.offset) * 3.5,
				heading: e.way > 0 ? 0 : Math.PI
			})
		});
	}
	let { party: W } = n, oe = [], G = [
		"#ff4fa3",
		"#3fe0d0",
		"#ffd21e",
		"#7cff6a",
		"#8b7cff",
		"#ff8a1e"
	], se = [], ce = (e) => {
		let t = e.x < W.x ? -1 : 1;
		return {
			from: {
				x: W.x + t * s(7.6, 10.4),
				z: W.dj.z - s(.6, 3)
			},
			via: {
				x: W.x + t * s(6.4, 7.4),
				z: W.dj.z + s(2.6, 3.4)
			}
		};
	};
	for (let e = 0; e < 12; e++) {
		let t = {
			x: W.x + (e % 4 - 1.5) * 2.5 + s(-.7, .7),
			z: W.z - 2.2 + Math.floor(e / 4) * 2.1 + s(-.5, .5)
		}, n = w(s(.94, 1.04)), r = {
			who: n,
			size: n.scale,
			...ce(t),
			spot: t,
			heading: U + s(-.7, .7),
			phase: a() * 6,
			style: e % 3,
			order: a()
		};
		e % 2 == 0 && (r.stick = S(1), se.push({
			at: r.stick,
			hex: G[e / 2 % G.length]
		})), oe.push(r);
	}
	for (let e of W.logs.slice(0, 4)) {
		let t = w(), n = {
			x: e.x,
			z: e.z
		};
		oe.push({
			who: t,
			size: t.scale,
			...ce(n),
			spot: n,
			heading: e.heading,
			phase: a() * 6,
			style: 0,
			order: a(),
			seat: e
		});
	}
	let K = w(1, "#27303c"), le = [
		"#ff6a1e",
		"#ff8a1e",
		"#ffb02e",
		"#ff7a1e",
		"#ffd86a",
		"#ff9a2e",
		"#ffe08a"
	], ue = S(le.length), de = S(6), fe = S(W.lamps.length);
	for (let e = 0; e < 40; e++) b.setColorAt(e, c.set("#000000"));
	le.forEach((e, t) => b.setColorAt(ue + t, c.set(e).multiplyScalar(1.5)));
	for (let e = 0; e < 6; e++) b.setColorAt(de + e, c.set("#ffc45a").multiplyScalar(1.6));
	for (let e of se) b.setColorAt(e.at, c.set(e.hex).multiplyScalar(1.5));
	b.count = x, f.makeScale(0, 0, 0);
	for (let e = 0; e < x; e++) b.setMatrixAt(e, f);
	b.visible = !1, t.add(b);
	let q = new e.InstancedMesh(new e.CircleGeometry(1, 20).rotateX(-Math.PI / 2), new e.MeshBasicMaterial({
		map: n.poolMap,
		transparent: !0,
		opacity: .42,
		blending: e.AdditiveBlending,
		depthWrite: !1
	}), 5);
	q.name = "life-sweeps", q.frustumCulled = !1, q.renderOrder = 1, q.visible = !1;
	for (let e = 0; e < 5; e++) q.setColorAt(e, c.set("#000000"));
	t.add(q);
	let pe = new e.PointLight("#ff8a3c", 0, 44, 1.5);
	pe.position.set(W.fire.x, D + 2.3, W.fire.z), pe.visible = !1, t.add(pe);
	let me = n.lean ? null : new e.PointLight("#ff4fa3", 0, 30, 1.5);
	me && (me.position.set(W.x, D + 4.6, W.z - 1.5), me.visible = !1, t.add(me));
	let J = {
		x: W.x,
		half: 8.5,
		run: 14,
		from: W.dj.z - 1.4,
		to: W.fire.z + 3.8
	};
	function he(t, n) {
		if (n <= J.from || n >= J.to) return n;
		let r = e.MathUtils.clamp((J.half + J.run - Math.abs(t - J.x)) / J.run, 0, 1);
		if (r <= 0) return n;
		let i = (J.from + J.to) / 2, a = Math.abs(n - i) / ((J.to - J.from) / 2);
		return n + ((n < i ? J.from - (1 - a) * 1.2 : J.to + (1 - a) * 1.2) - n) * r * r * (3 - 2 * r);
	}
	r.count = l;
	for (let e = 0; e < l; e++) v(e);
	r.instanceColor && (r.instanceColor.needsUpdate = !0), t.add(r);
	let ge = {
		far: 34,
		run: 30,
		speed: 1.3
	}, Y = {
		from: 5,
		to: 22
	}, X = {
		from: 1.05,
		depth: 1.9
	}, _e = D + .05;
	function Te(e, t) {
		let r = (e * ge.speed + t * (ge.run / 3)) % ge.run, i = Math.sin(Math.min(1, r / (ge.run * .66)) * U) * Math.min(1, (ge.run - r) / 5) * .67;
		return {
			travel: r,
			z: n.shore + ge.far - r,
			height: i
		};
	}
	let Ee = 0, Z = -1, De = -1, Oe = 0, Q = new e.Color(), ke = (t, n, r) => e.MathUtils.smoothstep(t, n, r);
	return {
		setNight(t) {
			Ee = e.MathUtils.clamp(t, 0, 1);
		},
		update(t) {
			let i = Number.isFinite(t) ? Math.max(t, 0) : 0, a = e.MathUtils.clamp(i - Oe, 0, .1);
			Oe = i;
			let o = +(Ee > .55);
			Z = Z < 0 ? o : e.MathUtils.clamp(Z + Math.sign(o - Z) * (a / 12), 0, 1);
			for (let e of O) {
				let t = e.to - e.from, { at: n, forward: r } = E(i * e.speed / t + e.phase), a = e.from + n * t, o = Math.sin(i * e.speed * 2.6 + e.phase * 9) * Math.min(.75, .42 + e.speed * .1), s = e.along === "x" ? a : e.fixed, c = e.along === "x" ? e.fixed : a, l = e.along === "x" ? r ? 0 : Math.PI : r ? -U : U;
				if (e.along === "x" && e.y === A) {
					let t = r ? .4 : -.4;
					c = he(s, e.fixed), l = Math.atan2(-(he(s + t, e.fixed) - c), t);
				}
				if (T(e.who, s, e.y, c, l, o, -o, -o * .8, o * .8), e === j.owner) {
					h(s + (r ? 1 : -1) * .9, e.y, c + .8, l, 1);
					let t = Math.sin(i * 9) * .5;
					g(j.at, 0, .42, 0, .7, .26, .26), g(j.at + 1, .42, .56, 0, .26, .24, .24), _(j.at + 2, -.36, .52, 0, -2.2 + Math.sin(i * 7) * .3, .28, .07), _(j.at + 3, .24, .32, -.09, t, .32, .08), _(j.at + 4, .24, .32, .09, -t, .32, .08), _(j.at + 5, -.24, .32, -.09, -t, .32, .08), _(j.at + 6, -.24, .32, .09, t, .32, .08);
				}
			}
			De = e.MathUtils.clamp(De < 0 ? +(Ee < .3) : De + a / 10 * (Ee < .3 ? 1 : -1), 0, 1);
			let s = De * De * (3 - 2 * De);
			for (let e of M) {
				if (De <= 0) {
					v(e.who.at, 7), v(e.board), v(e.spray, 3);
					continue;
				}
				let t = Te(i, e.line), r = De >= 1 && t.travel > Y.from && t.travel < Y.to, a = -21 + e.line * 11;
				if (e.who.scale = Math.min(1, De * 5), r) {
					let n = (t.travel - Y.from) / (Y.to - Y.from), r = a + e.way * (n - .5) * 16, o = .52 + Math.sin(i * 1.1 + e.line * 2) * .14, s = t.z - X.from - X.depth * o, c = _e + t.height * (1 - o) + .12, l = Math.atan2(t.height, X.depth), u = Math.sin(i * 2.3 + e.line) * .12;
					h(r, c, s, 0), y(e.board, 0, 0, 0, 2.5, .09, .62, -l);
					for (let n = 0; n < 3; n++) {
						let r = (i * 2.6 + n / 3 + e.line * .37) % 1, a = (.34 - r * .2) * Math.min(1, t.height * 2.4);
						g(e.spray + n, -e.way * (1.25 + r * 1.5), .1 + r * (.5 - r) * 1.6, .12 + (n - 1) * .16 - r * .3, a, a, a);
					}
					T(e.who, r, c + .04, s, U, .5 + u, -.35 + u, U + .3, -U - .3);
				} else {
					let r = t.travel >= Y.to ? (t.travel - Y.to) / (ge.run - Y.to + Y.from) : (t.travel + ge.run - Y.to) / (ge.run - Y.to + Y.from), o = r - Math.floor(r), c = a + e.way * (.5 - o) * 16, l = n.shore + 2 + (ge.far - Y.to + (Y.to - Y.from) * o - 2) * s, u = D + .15 + Math.sin(i * 1.7 + e.line) * .04;
					h(c, u, l, -U), g(e.board, 0, 0, 0, 2.5, .09, .62), v(e.spray, 3);
					let d = i * 4 + e.line;
					T(e.who, c, u - .72, l, -U, .5, .5, 1.2 + Math.sin(d) * .7, 1.2 - Math.sin(d) * .7);
				}
			}
			let l = Math.floor(i / ee), u = i / ee - l, x = P[l % 4], S = P[(l + 1) % 4];
			h(0, 0, 0, 0), g(F, x.x + (S.x - x.x) * u, D + 2.25 + 10.8 * u * (1 - u), x.z + (S.z - x.z) * u, .3, .3, .3);
			for (let e of P) {
				let t = 0;
				e === S && u > .72 && (t = Math.sin((u - .72) / .28 * U)), e === x && u < .28 && (t = Math.cos(u / .28 * U));
				let n = Math.sin(i * 3.1 + e.x) * .22 * (1 - t), r = t > .05 ? Math.PI - .25 : .5 + Math.sin(i * 2 + e.z) * .15;
				T(e.who, e.x + Math.sin(i * .9 + e.z) * .5, A + t * .5, e.z, e.heading, n, -n, r, r);
			}
			let w = .5 - .5 * Math.cos(i * 2.4);
			T(I, n.pullUp.x, D + n.pullUp.bar - 1.96 + w * .34, n.pullUp.z, -U, -.25 - w * .3, -.25 - w * .3, Math.PI, Math.PI);
			let k = 2.25 + (.5 - .5 * Math.cos(i * 1.8)) * (Math.PI - 2.25);
			T(L, n.mat.x - 1.2, D + .23, n.mat.z, -U, .12, -.12, k, k);
			{
				let e = 1.4 - Math.cos(k) * .58, t = Math.sin(k) * .58;
				h(n.mat.x - 1.2, D + .23, n.mat.z, -U), g(te, t, e + .04, 0, .06, .06, 1.7), g(te + 1, t, e + .04, -.78, .1, .42, .1), g(te + 2, t, e + .04, .78, .1, .42, .1);
			}
			let N = Math.sin(i * 6.5);
			T(R, n.mat.x + 1.6, D + .23 + Math.abs(Math.sin(i * 5)) * .06, n.mat.z + .6, Math.PI * .75, .25, -.25, N > 0 ? U + .2 : .9, N > 0 ? .9 : U + .2);
			for (let e of ne) {
				let t = 1 + Math.max(0, Math.sin(i * 1.3 + e.phase)) * .9;
				T(e.who, e.seat.x, e.seat.y - .74, e.seat.z, e.seat.heading, 1.45, 1.45, .9, t);
			}
			h(0, 0, 0, 0);
			for (let e = 0; e < 5; e++) {
				let t = (i * .22 + e / 5) % 1, r = (.22 + t * .75) * (1 - t * t);
				g(z + e, n.grill.x + 2.9 + t * t * 2.2, D + 2.9 + t * 4.2, n.grill.z + Math.sin(e * 2.4 + t * 3) * .3, r, r, r);
			}
			for (let e of re) {
				let t = (i * e.speed + e.offset) % (n.reach * 2) - n.reach, r = e.at;
				h(t * e.sign, D + .04, e.z, e.sign > 0 ? 0 : Math.PI), g(r, .02, .32, 0, .9, .1, .36), g(r + 1, -.44, .54, 0, .62, .4, .4), g(r + 2, -.38, .79, 0, .66, .1, .36), g(r + 3, .5, .66, 0, .14, .78, .42), g(r + 4, .5, 1.1, 0, .1, .08, .64), g(r + 5, .59, .94, 0, .08, .14, .2), g(r + 6, .7, .22, 0, .44, .44, .14), g(r + 7, -.62, .22, 0, .44, .44, .14), g(r + 8, -.32, 1.16, 0, .26, .58, .46), g(r + 9, -.3, 1.62, 0, .32, .32, .32), g(r + 10, -.3, 1.72, 0, .38, .22, .38), _(r + 11, -.3, .92, -.15, 1.15, .66, .19), _(r + 12, -.3, .92, .15, 1.15, .66, .19), _(r + 13, -.26, 1.4, -.3, 1.25, .72, .14), _(r + 14, -.26, 1.4, .3, 1.25, .72, .14);
			}
			h(0, 0, 0, 0);
			for (let { at: e, line: t } of V) for (let r = 0; r < 14; r++) {
				let a = Math.sin(i * .55 + t * 2.2 + r * .35), o = n.shore + 2.2 + t * 2.6 + a * 1.5;
				g(e + r, -250 + r * 38 + t * 17 + Math.sin(i * .1 + r) * 2, D + .17 - t * .015, o, 24 + (r * 7 + t * 3) % 10, .04, .5 + (a + 1) * .25);
			}
			for (let { at: e, face: t, crest: n, line: r } of H) {
				let a = Te(i, r);
				for (let i = 0; i < 14; i++) {
					let o = -255 + i * 39 + r * 11, s = 26 + (i * 5 + r * 4) % 9, c = a.z + (i === 6 ? 0 : Math.sin(i * 1.9 + r) * .8);
					if (a.height < .07) {
						v(e + i), v(t + i), v(n + i);
						continue;
					}
					g(e + i, o, _e + a.height / 2 - .2, c, s, a.height + .4, 2.2), y(t + i, o, _e + a.height / 2 - .08, c - X.from - X.depth / 2, s - .3, .1, Math.hypot(X.depth, a.height) + .5, -Math.atan2(a.height, X.depth));
					let l = Math.max(0, a.height - .25);
					l > .02 ? g(n + i, o, _e + a.height + l * .25, c - .62, s * .94, l * .5 + .06, .9) : v(n + i);
				}
			}
			for (let e of ie) h(((i * e.speed + e.offset) % 420 + 420) % 420 - 210, D + .09 + Math.sin(i * .9 + e.offset) * .06, e.z, e.speed > 0 ? 0 : Math.PI), g(e.at, 0, .3, 0, 4.4, .6, 1.5), g(e.at + 1, .3, 2.6, 0, .12, 4, .12), g(e.at + 2, -.75, 2.5, 0, 1.9, 2.9, .06), g(e.at + 3, .3, 4.75, 0, .5, .3, .04);
			let B = 1 - ke(Ee, .15, .55);
			for (let e of ae) {
				if (B <= .01) {
					v(e.at, 3);
					continue;
				}
				let { x: t, y: n, z: a, heading: o } = e.fly(i);
				h(t, n + (1 - B) * 26, a, o, e.size * B), g(e.at, 0, 0, 0, .5, .12, .14);
				let s = Math.sin(i * .7 + e.beat) > -.2 ? Math.sin(i * 9 + e.beat) * .7 : .12;
				for (let t of [-1, 1]) f.makeTranslation(0, 0, t * .4).scale(m.set(.3, .035, .8)), f.premultiply(p.makeRotationX(-t * s)).premultiply(p.makeTranslation(.02, .04, t * .06)).premultiply(d), r.setMatrixAt(e.at + (t < 0 ? 1 : 2), f);
			}
			let G = i * Math.PI * 4, se = Z > 0;
			for (let t of oe) {
				let n = e.MathUtils.clamp(Z * 1.5 - t.order * .5, 0, 1);
				if (n <= 0) {
					v(t.who.at, 7), t.stick !== void 0 && C(t.stick, 0, -50, 0, 0, 0, 0);
					continue;
				}
				let r = D + .14, a = .5, s = .5;
				if (n < 1) {
					t.who.scale = t.size * Math.min(1, n * 10);
					let e = Math.hypot(t.via.x - t.from.x, t.via.z - t.from.z), s = Math.hypot(t.spot.x - t.via.x, t.spot.z - t.via.z), c = n * (e + s), [l, u, d] = c < e ? [
						t.from,
						t.via,
						c / e
					] : [
						t.via,
						t.spot,
						(c - e) / s
					], f = l.x + (u.x - l.x) * d, p = l.z + (u.z - l.z) * d, m = o === 1 ? 1 : -1, h = Math.sin(i * 7 + t.phase) * .6;
					T(t.who, f, r, p, Math.atan2(-(u.z - l.z) * m, (u.x - l.x) * m), h, -h, -h * .8, h * .8), a = -h * .8;
				} else if (t.seat) {
					t.who.scale = t.size;
					let e = 1.15 + Math.sin(i * .8 + t.phase) * .15;
					T(t.who, t.seat.x, t.seat.y - .74 + Math.abs(Math.sin(G / 2 + t.phase)) * .03, t.seat.z, t.seat.heading, 1.45, 1.45, e, e), a = e;
				} else {
					t.who.scale = t.size;
					let e = Math.abs(Math.sin(G / 2 + t.phase)), n = Math.sin(G / 4 + t.phase), o = t.heading, c = e * .08, l = n * .25;
					t.style === 0 ? (c = e * .24, a = Math.PI - .35 + Math.sin(G + t.phase) * .25, s = Math.PI - .35 - Math.sin(G + t.phase) * .25, l = .12) : t.style === 1 ? (a = 1 + n * .8, s = 1 - n * .8) : (o += Math.sin(i * .6 + t.phase) * 1.1, a = Math.PI - .5 + Math.sin(G + t.phase) * .4, s = .7 + e * .3), T(t.who, t.spot.x + n * .22, r + c, t.spot.z, o, l, -l, a, s);
				}
				t.stick !== void 0 && C(t.stick, Math.sin(a) * .74, 1.4 - Math.cos(a) * .74, -.33, .07, .3, .07);
			}
			if (se) {
				K.scale = Math.min(1, Z * 6);
				let e = Math.abs(Math.sin(G / 2));
				T(K, W.dj.x + Math.sin(G / 8) * .25, W.dj.y + e * .05, W.dj.z, -U, .1, -.1, Math.PI - .6 + Math.sin(G) * .35, 1.25);
			} else v(K.at, 7);
			let ce = ke(Ee, .35, .8), J = ce > .01;
			if (b.visible = q.visible = J, pe.visible = J, me && (me.visible = J), J) {
				h(W.fire.x, D + .3, W.fire.z, 0);
				for (let e = 0; e < le.length; e++) {
					let t = .5 + .5 * Math.sin(i * (7 + e * 1.3) + e * 2.1), n = e >= 4, r = (n ? 1 : .55) * (.55 + t * .45) * ce, a = e * 1.57 + i * .4, o = n ? .08 * (e - 5) : .3;
					C(ue + e, Math.cos(a) * o, r / 2, Math.sin(a) * o, n ? .3 : .34, r, n ? .3 : .34);
				}
				for (let e = 0; e < 6; e++) {
					let t = (i * .45 + e / 6) % 1, n = .09 * (1 - t) * ce;
					C(de + e, Math.sin(e * 2.4 + t * 5) * .5, .9 + t * 3.4, Math.cos(e * 1.7 + t * 4) * .5, n, n, n);
				}
				pe.intensity = 20 * ce * (.86 + .14 * Math.sin(i * 11) * Math.sin(i * 7.3));
				let e = .75 + .25 * Math.abs(Math.sin(G / 2)) ** 3;
				h(0, 0, 0, 0), W.lamps.forEach((t, n) => {
					Q.setHSL((i * .07 + n / W.lamps.length) % 1, 1, .55), C(fe + n, t.x, t.y, t.z, .36, .3, .36), b.setColorAt(fe + n, c.copy(Q).multiplyScalar(1.7 * ce * e)), n < 5 && (f.makeScale(3.1, 1, 3.1).setPosition(W.x + Math.sin(i * .6 + n * 1.26) * 5, D + .2 + n * .004, W.z + Math.sin(i * .83 + n * 2.1) * 2.8), q.setMatrixAt(n, f), q.setColorAt(n, c.copy(Q).multiplyScalar(ce * e)));
				}), me && (me.color.setHSL(i * .07 % 1, .85, .6), me.intensity = 34 * ce * e), b.instanceMatrix.needsUpdate = !0, q.instanceMatrix.needsUpdate = !0, b.instanceColor && (b.instanceColor.needsUpdate = !0), q.instanceColor && (q.instanceColor.needsUpdate = !0);
			}
			r.instanceMatrix.needsUpdate = !0;
		}
	};
}
// src/pixel.ts
function Ee(t, n = 6, r = .12) {
	return t.onBeforeCompile = (t) => {
		t.uniforms.uPix = { value: new e.Vector2(n, r) }, t.vertexShader = t.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vPixPos;").replace("#include <begin_vertex>", "#include <begin_vertex>\n        vec4 pixWorld = vec4(transformed, 1.0);\n        #ifdef USE_INSTANCING\n          pixWorld = instanceMatrix * pixWorld;\n        #endif\n        vPixPos = (modelMatrix * pixWorld).xyz;"), t.fragmentShader = t.fragmentShader.replace("#include <common>", "#include <common>\n        varying vec3 vPixPos;\n        uniform vec2 uPix;\n        float pixHash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }").replace("#include <map_fragment>", "#include <map_fragment>\n        {\n          // Nudged off the grid, so a face lying exactly on a cell boundary does not flicker between two cells.\n          vec3 pixCell = floor(vPixPos * uPix.x + 0.013);\n          // How many cells one screen pixel covers: past about one, the pattern would only shimmer.\n          float pixDensity = max(fwidth(vPixPos.x), max(fwidth(vPixPos.y), fwidth(vPixPos.z))) * uPix.x;\n          diffuseColor.rgb *= 1.0 + (pixHash(pixCell) - 0.5) * 2.0 * uPix.y * clamp(1.3 - pixDensity, 0.0, 1.0);\n        }");
	}, t.customProgramCacheKey = () => `pixelate:${n}:${r}`, t;
}
// src/outdoors.ts
var Z = -.5, De = 150, Oe = {
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
}, Q = 1.9;
function ke() {
	let t = document.createElement("canvas");
	t.width = t.height = 128;
	let n = t.getContext("2d"), r = n.createRadialGradient(64, 64, 0, 64, 64, 64);
	return r.addColorStop(0, "rgba(255,255,255,1)"), r.addColorStop(.35, "rgba(255,255,255,0.45)"), r.addColorStop(1, "rgba(255,255,255,0)"), n.fillStyle = r, n.fillRect(0, 0, 128, 128), new e.CanvasTexture(t);
}
var Ae = typeof window < "u" && window.matchMedia?.("(pointer: coarse)").matches === !0;
function je(t, r) {
	let i = (t, n = 1, r = 3, i = .12) => Ee(new e.MeshStandardMaterial({
		color: t,
		roughness: n,
		metalness: 0,
		flatShading: !0
	}), r, i), a = (t) => new e.MeshBasicMaterial({ color: t }), o = {
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
		window: a(r("#ffc887", .78)),
		windowOff: a("#0d1016"),
		leafA: i("#3f9a62", 1, 3, .2),
		leafB: i("#2f8055", 1, 3, .2),
		palm: i("#3a9460", 1, 3, .18),
		water: new e.MeshStandardMaterial({
			color: "#2a7fa8",
			roughness: .3,
			metalness: .1
		}),
		lamp: a(r(V.peach, .95)),
		hill: i("#2a3a3c"),
		ridgeNear: i("#2f4a42", 1, .5, .1),
		ridgeMid: i("#476560", 1, .5, .08),
		ridgeFar: i("#64818a", 1, .5, .06),
		concrete: i("#8c8f96", 1, 1, .08),
		jade: i("#3f8a86", .5, 1, .1),
		jadeDark: i("#2a5f60", .5, 1, .1),
		signPink: a(r(V.pink, .9)),
		signTeal: a(r("#3fe0d0", .85)),
		carWhite: i("#d4d4d0", .35, 6, .03),
		leather: i("#6a1422", .7),
		carGlass: new e.MeshStandardMaterial({
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
		sea: new e.MeshStandardMaterial({
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
		flame: a(r("#ff9a3c", .95)),
		net: new e.MeshBasicMaterial({
			color: "#e8e8e8",
			transparent: !0,
			opacity: .45,
			depthWrite: !1
		}),
		pool: new e.MeshBasicMaterial({
			color: "#ffb877",
			map: ke(),
			transparent: !0,
			opacity: .16,
			blending: e.AdditiveBlending,
			depthWrite: !1
		}),
		poolBeach: new e.MeshBasicMaterial({
			color: "#ffb066",
			map: ke(),
			transparent: !0,
			opacity: 0,
			blending: e.AdditiveBlending,
			depthWrite: !1
		})
	}, s = new e.BoxGeometry(1, 1, 1).toNonIndexed(), c = new e.BoxGeometry(1, 1, 1).translate(.5, 0, 0).toNonIndexed(), l = new e.ConeGeometry(Math.SQRT1_2, 1, 4).rotateY(Math.PI / 4).toNonIndexed(), u = s, d = new e.CircleGeometry(1, 20).rotateX(-Math.PI / 2).toNonIndexed(), f = /* @__PURE__ */ new Map(), p = new e.Matrix4(), m = new e.Quaternion(), h = new e.Euler(0, 0, 0, "YXZ");
	function g(t, n, r = 0, i = Z) {
		let a = new e.Matrix4().makeRotationY(r).setPosition(t, i, n);
		return (t, n, r, i, o, s, c, l, u = 0, d = 0, g = 0) => {
			m.setFromEuler(h.set(g, u, d)), p.compose(new e.Vector3(r, i, o), m, new e.Vector3(s, c, l));
			let _ = n.clone().applyMatrix4(p.premultiply(a)), v = f.get(t);
			v || f.set(t, v = []), v.push(_);
		};
	}
	let _ = g(0, 0), v = {
		across: 8,
		up: 8,
		width: 3.2,
		height: 3.6
	};
	function y(t, n, r, i) {
		let a = i, o = () => (a = a * 16807 % 2147483647) / 2147483647, s = (e, t) => {
			let n = document.createElement("canvas");
			n.width = n.height = 128;
			let r = n.getContext("2d");
			return r.fillStyle = t, r.fillRect(0, 0, 128, 128), {
				canvas: n,
				g: r,
				paint: e
			};
		}, c = s((e, n, r, i, a) => {
			e.fillStyle = t, e.fillRect(n, r, i, a), e.fillStyle = "rgba(255,255,255,0.10)", e.fillRect(n, r, i, a / 3);
		}, n), l = s((e, t, n, r, i, a) => {
			a && (e.fillStyle = o() < .8 ? "#e0b070" : "#a8c4e0", e.fillRect(t, n, r, i));
		}, "#000000"), u = 128 / v.across;
		for (let e = 0; e < v.up; e++) {
			let t = r * (.55 + o() * .9);
			for (let n = 0; n < v.across; n++) {
				let r = o() < t;
				for (let t of [c, l]) t.paint(t.g, n * u + 2, e * u + 3, u - 4, u - 6, r);
			}
		}
		let d = (t) => {
			let n = new e.CanvasTexture(t);
			return n.wrapS = n.wrapT = e.RepeatWrapping, n.magFilter = e.NearestFilter, n.colorSpace = e.SRGBColorSpace, n;
		};
		return {
			map: d(c.canvas),
			emissive: d(l.canvas)
		};
	}
	let b = [
		y("#5f86a8", "#2c3a48", .8, 11),
		y("#7a6a58", "#3a322c", .72, 23),
		y("#6a8a8c", "#8c8f96", .66, 37)
	].map(({ map: t, emissive: n }) => new e.MeshStandardMaterial({
		map: t,
		emissiveMap: n,
		emissive: new e.Color("#ffffff"),
		emissiveIntensity: 0,
		roughness: .45,
		metalness: .1
	})), x = b.map(() => []);
	function S(t, n, r, i, a, o, c = 0) {
		let l = s.clone(), u = l.getAttribute("uv");
		for (let e = 0; e < 6; e++) {
			let t = e < 2 ? o : i;
			for (let n = 0; n < 6; n++) {
				let r = e * 6 + n;
				e === 2 || e === 3 ? u.setXY(r, .01, .01) : u.setXY(r, u.getX(r) * t / (v.across * v.width), u.getY(r) * a / (v.up * v.height));
			}
		}
		l.applyMatrix4(new e.Matrix4().makeScale(i, a, o).setPosition(n, Z + c + a / 2, r)), x[t % b.length].push(l);
	}
	let C = 20261114, w = () => (C = C * 16807 % 2147483647) / 2147483647, T = (e) => e[Math.floor(w() * e.length)];
	_("grass", s, 0, -.5, 0, 1800, 1, 1800);
	let { front: E, back: D, side: O } = Oe;
	for (let e of [E, D]) _("road", s, 0, .025, e.z, 300, .05, e.width);
	for (let e of [-1, 1]) _("road", s, e * O.x, .02, (E.z - De) / 2, O.width, .04, De + E.z);
	function k(e) {
		let t = e.map((e) => [e.centre - e.width / 2 - Q, e.centre + e.width / 2 + Q]).sort((e, t) => e[0] - t[0]), n = [], r = -150;
		for (let [e, i] of t) n.push([r, e]), r = i;
		return n.push([r, De]), n;
	}
	let A = k([{
		centre: -O.x,
		width: O.width
	}, {
		centre: O.x,
		width: O.width
	}]), j = k([{
		centre: D.z,
		width: D.width
	}, {
		centre: E.z,
		width: E.width
	}]).slice(0, 2);
	for (let e of [E, D]) for (let t of [-1, 1]) {
		let n = e.z + t * (e.width / 2 + Q / 2);
		if (e === E && t === 1) _("walk", s, 0, .06, n, 300, .12, Q);
		else for (let [e, t] of k([{
			centre: -O.x,
			width: O.width - Q * 2
		}, {
			centre: O.x,
			width: O.width - Q * 2
		}])) _("walk", s, (e + t) / 2, .06, n, t - e, .12, Q);
	}
	for (let e of [-1, 1]) for (let t of [-1, 1]) {
		let n = e * O.x + t * (O.width / 2 + Q / 2);
		for (let [e, t] of j) _("walk", s, n, .06, (e + t) / 2, Q, .12, t - e);
	}
	for (let e of [E, D]) for (let [t, n] of A) for (let r = t + 2; r < n - 2; r += 6) _("line", s, r, .07, e.z, 2.6, .04, .24);
	for (let e of [-1, 1]) for (let [t, n] of j) for (let r = t + 2; r < n - 2; r += 6) _("line", s, e * O.x, .06, r, .24, .04, 2.6);
	let M = z.depth / 2;
	for (let e = 0; e < 3; e++) {
		let t = .5 - (e + 1) * .125;
		_("walk", s, 0, t / 2, M + .3 + e * .6, 7 + e * .5, t, .6);
	}
	let N = E.z - E.width / 2 - Q;
	_("walk", s, 0, .05, (M + 1.8 + N) / 2, 5, .1, N - M - 1.8);
	function P(e, t, n = 1) {
		let r = g(e, t, Math.floor(w() * 4) * (Math.PI / 2)), i = (1.6 + w() * .8) * n;
		r("wood", u, 0, i / 2, 0, .32 * n, i, .32 * n);
		let a = (1.5 + w() * .5) * n, o = ["leafA", "leafB"], c = Math.floor(w() * 2);
		r(o[c], s, 0, i + a * .35, 0, a * 2.1, a * .9, a * 2.1), r(o[1 - c], s, (w() - .5) * a * .3, i + a * 1.1, (w() - .5) * a * .3, a * 1.5, a * .7, a * 1.5), r(o[c], s, (w() - .5) * a * .3, i + a * 1.7, (w() - .5) * a * .3, a * .85, a * .55, a * .85);
	}
	function F(e, t, n = 1) {
		let r = g(e, t, 0);
		r(T(["leafA", "leafB"]), s, 0, .45 * n, 0, 1.6 * n, .9 * n, 1.4 * n), r(T(["leafA", "leafB"]), s, .1 * n, 1.05 * n, -.1 * n, .9 * n, .4 * n, .8 * n);
	}
	function ee(e, t, n = 7) {
		let r = g(e, t, w() * Math.PI * 2), i = (w() - .5) * .12;
		r("wood", u, i * n * .5, n / 2, 0, .3, n, .3, 0, -i);
		for (let e = 0; e < 7; e++) {
			let t = e / 7 * Math.PI * 2;
			r("palm", c, i * n, n, 0, 2.3 + w() * .6, .07, .55, t, -.38 - w() * .25);
		}
	}
	function I(e, t, n) {
		let r = g(e, t, n);
		r("dark", u, 0, 2.1, 0, .14, 4.2, .14), r("dark", s, 0, 4.2, .6, .1, .1, 1.3), r("lamp", s, 0, 4.12, 1.1, .34, .07, .5), r("pool", d, 0, .14, 1.4, 5.5, 1, 5.5);
	}
	function L(e, t, n) {
		let r = g(e, t, n);
		r(T([
			"carA",
			"carB",
			"carC"
		]), s, 0, .62, 0, 4.1, .7, 1.8), r("dark", s, -.2, 1.2, 0, 2.2, .55, 1.6), r("dark", s, 0, .2, 0, 3.4, .4, 1.9);
	}
	let te = E.z + E.width / 2 + Q, R = D.z - D.width / 2 - Q, ne = O.x + O.width / 2 + Q, B = 4545, re = () => (B = B * 16807 % 2147483647) / 2147483647;
	function H(e, t, n, r, i) {
		let a = Math.floor(w() * b.length), o = g(e, t, 0);
		o("concrete", s, 0, 1.6, 0, n + 1.2, 3.2, r + 1.2), o("windowOff", s, 0, 1.5, r / 2 + .62, n * .5, 2.4, .06), o("windowOff", s, 0, 1.5, -r / 2 - .62, n * .5, 2.4, .06);
		let c = i > 26 && w() < .7 ? i * (.55 + w() * .2) : i;
		S(a, e, t, n, c - 3.2, r, 3.2), c < i && S(a, e, t, n * .74, i - c, r * .74, c);
		let l = c < i ? .74 : 1;
		o("concrete", s, 0, i + .25, 0, n * l + .4, .5, r * l + .4);
		let d = re();
		if (d < .75) {
			let e = d < .4 ? "lamp" : d < .58 ? "signTeal" : "signPink", t = (t, n, r) => {
				for (let i of [-1, 1]) o(e, s, 0, t, i * r / 2, n + .3, .3, .3);
				for (let i of [-1, 1]) o(e, s, i * n / 2, t, 0, .3, .3, r - .3);
			};
			t(i + .72, n * l + .4, r * l + .4), c < i && t(c + .2, n + .3, r + .3);
		}
		o("dark", s, (w() - .5) * n * .3, i + 1.5, (w() - .5) * r * .3, n * l * .4, 2, r * l * .4), i > 30 && w() < .6 && (o("steel", u, 0, i + 5.5, 0, .3, 7, .3), o("ember", s, 0, i + 9.2, 0, .5, .5, .5));
	}
	function ie(e, t, n, r, i) {
		let a = g(e, t, n);
		a("white", s, 0, 11 / 2, 0, r, 11, i), a("concrete", s, 0, 11.3, 0, r + .8, .6, i + .8), a("window", s, 0, 3.4, i / 2 + .04, r * .86, 5.6, .08);
		for (let e = 0; e <= 8; e++) a("dark", s, -r * .43 + e * r * .86 / 8, 3.4, i / 2 + .1, .24, 5.6, .1);
		a("dark", s, 0, 3.4, i / 2 + .1, r * .86, .22, .1), a("dark", s, 0, 6.5, i / 2 + 1.6, r * .5, .3, 3.2), a("signPink", s, -r * .2, 8.6, i / 2 + .1, r * .3, 1.5, .16), a("signTeal", s, r * .24, 8.6, i / 2 + .1, r * .2, 1.5, .16), a("lamp", s, 0, 6.3, i / 2 + 3.1, r * .5, .1, .1), a("concrete", s, r / 2 - 2, 15, i / 2 - 2, 3, 8, 3), a("signPink", s, r / 2 - 2, 16, i / 2 - .44, 2.2, 4.4, .12), a("signTeal", s, r / 2 - .44, 16, i / 2 - 2, .12, 4.4, 2.2);
		for (let e of [-1, 1]) a("windowOff", s, e * (r / 2 + .04), 6.2, 0, .08, 2, i * .7);
		for (let e = 0; e < 4; e++) a("steel", s, -r * .3 + e * r * .18, 12.3, -i * .2, 3, 1.4, 2.4);
		for (let a = -2; a <= 2; a++) {
			if (a === 0) continue;
			let o = a * r / 6;
			P(e + Math.cos(n) * o + Math.sin(n) * (i / 2 + 5), t - Math.sin(n) * o + Math.cos(n) * (i / 2 + 5), .9);
		}
	}
	ie(-4, R - 17, 0, 46, 24);
	for (let e of [
		-104,
		-84,
		-64,
		62,
		82,
		102,
		122
	]) H(e + (w() - .5) * 3, R - 13, 13 + w() * 3, 12 + w() * 3, 12 + w() * 8);
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
	]) H(e + (w() - .5) * 4, R - 46 - w() * 6, 15 + w() * 4, 14 + w() * 4, 24 + w() * 20);
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
	]) H(e + (w() - .5) * 5, R - 80 - w() * 10, 16 + w() * 5, 16 + w() * 5, 34 + w() * 28);
	for (let e = 0; e < 12; e++) {
		let t = -150 + e * 27 + (w() - .5) * 8;
		Math.abs(t + 6) < 34 || H(t, R - 118 - w() * 24, 16 + w() * 6, 16 + w() * 6, 28 + w() * 36);
	}
	ie(ne + 15, -4, -Math.PI / 2, 40, 22);
	for (let e of [
		-19,
		-1,
		16
	]) H(-ne - 11, e, 14 + w() * 2, 13 + w() * 2, 11 + w() * 6);
	for (let e of [-1, 1]) {
		for (let t of [
			-22,
			0,
			20
		]) H(e * (ne + 44 + w() * 4), t + (w() - .5) * 4, 15 + w() * 4, 15 + w() * 4, 20 + w() * 18);
		for (let t of [
			-30,
			-4,
			22
		]) H(e * (ne + 74 + w() * 8), t + (w() - .5) * 6, 16 + w() * 5, 16 + w() * 5, 30 + w() * 26);
	}
	let ae = [
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
	], U = [], W = [];
	{
		let t = {
			x: -6,
			z: R - 96
		}, n = (n, r, i, a) => {
			U.push(s.clone().applyMatrix4(new e.Matrix4().makeScale(i, a, i).setPosition(t.x, Z + r, t.z))), W.push(n);
		}, r = g(t.x, t.z, 0);
		r("concrete", s, 0, 4, 0, 40, 8, 40), r("window", s, 0, 3.4, 20.05, 26, 4.4, .1);
		let i = 8;
		for (let e = 0; e < 5; e++) {
			let t = 27 - e * 1.5;
			r(e % 2 ? "jadeDark" : "jade", s, 0, i + 2.6, 0, t, 5.2, t), i += 5.2, n(0, i - .55, t + .6, .5);
		}
		for (let e = 0; e < 8; e++) {
			for (let t = 0; t < 3; t++) {
				let a = 17.2 + t * 1.7;
				r(t === 1 ? "jadeDark" : "jade", s, 0, i + 1.6, 0, a, 3.2, a), i += 3.2, t < 2 && n(e + 1, i - .5, a + .6, .5);
			}
			n(e + 1, i - .9, 21.6, 1.2);
			for (let [e, t] of [
				[0, 1],
				[0, -1],
				[1, 0],
				[-1, 0]
			]) r("sun", s, e * 10.4, i - 4.6, t * 10.4, e ? .4 : 2.2, 2.2, t ? .4 : 2.2);
		}
		for (let [e, t, a] of [
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
		]) r(a, s, 0, i + t / 2, 0, e, t, e), i += t, n(9, i - .4, e + .4, .34);
		n(9, i + 7, 1.9, 13), n(9, i + 18, .9, 7.6), r("steel", u, 0, i + 7, 0, 1.6, 14, 1.6), r("steel", u, 0, i + 18, 0, .6, 8, .6), r("ember", s, 0, i + 22.4, 0, 1, 1, 1);
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
	]) P(e + (w() - .5) * 3, -z.depth / 2 - 3.4, .95);
	for (let e of [
		-13,
		-1,
		11
	]) P(z.width / 2 + 4, e + (w() - .5) * 3, .9), P(-z.width / 2 - 4, e + (w() - .5) * 3, .9);
	for (let e of [
		-27,
		-21,
		-15,
		15,
		21,
		27
	]) F(e + (w() - .5) * 2, M + 1.6, 1 + w() * .4);
	for (let e = -36; e <= 36; e += 12) ee(e, te - Q / 2, 6.5 + w() * 1.5);
	for (let e = -138; e <= 138; e += 12) Math.abs(Math.abs(e) - O.x) < 8 || (ee(e, R + Q / 2, 6.5 + w() * 2), Math.abs(e) > 50 && ee(e, te - Q / 2, 6.5 + w() * 1.5));
	for (let e of [-1, 1]) for (let t = -20; t <= 22; t += 10.5) ee(e * (ne - Q / 2), t, 6.5 + w() * 1.5);
	for (let e of [
		-30,
		-10,
		10,
		30
	]) I(e, E.z - E.width / 2 - Q / 2, 0);
	for (let e of [
		-100,
		-70,
		70,
		100
	]) I(e, E.z - E.width / 2 - Q / 2, 0);
	for (let e = -110; e <= 110; e += 22) I(e, D.z - D.width / 2 - Q / 2, 0);
	for (let e of [-1, 1]) for (let t of [
		-18,
		0,
		18
	]) I(e * (O.x - O.width / 2 - Q / 2), t, Math.PI / 2 * e);
	L(-22, E.z - E.width / 2 + 1, 0), L(17, E.z - E.width / 2 + 1, 0), L(-33, E.z + E.width / 2 - 1, Math.PI), L(-14, D.z + D.width / 2 - 1.2, Math.PI), L(21, D.z - D.width / 2 + 1.2, 0), L(O.x + O.width / 2 - 1.2, -8, Math.PI / 2), L(-O.x - O.width / 2 + 1.2, 9, -Math.PI / 2);
	let oe = [], G = te, se = 4.6, ce = G + se, K = G + 40, le = {
		x: 9,
		z: G + 19,
		halfLength: 8,
		halfWidth: 4
	}, ue = {
		x: 31,
		z: G + 14
	}, de = {
		x: -13,
		z: G + 12.4
	}, fe = {
		x: -13,
		z: K - 12
	}, q = {
		x: fe.x,
		z: fe.z - 5.2
	}, pe = {
		x: fe.x + .5,
		z: fe.z + 6.2
	}, me = [], J = [], he = [];
	function ge(e, t, n = .14) {
		let r = g(e, t, 0, Z + n);
		r("wood", u, 0, .95, 0, .1, 1.9, .1), r("dark", s, 0, 1.92, 0, .24, .16, .24), r("flame", s, 0, 2.16, 0, .2, .34, .2), r("poolBeach", d, 0, .06, 0, 5, 1, 5);
	}
	function Y(e, t, n, r, i = ["lamp"]) {
		for (let a = 1; a <= n; a++) {
			let o = a / (n + 1);
			_(i[a % i.length], s, e[0] + (t[0] - e[0]) * o, e[1] + (t[1] - e[1]) * o - r * 4 * o * (1 - o), e[2] + (t[2] - e[2]) * o, .17, .17, .17);
		}
	}
	{
		_("deck", s, 0, .1, G + se / 2, 300, .2, se);
		for (let e = -149; e < De; e += 2.5) _("wood", s, e, .203, G + se / 2, .08, .01, se);
		_("sand", s, 0, .07, (ce + K) / 2, 900, .14, K - ce), _("wetSand", s, 0, .06, K + 2.5, 900, .12, 5), _("sea", s, 0, .045, K + 4 + 450, 1800, .09, 900);
		let e = [
			"coral",
			"teal",
			"sun",
			"white"
		];
		function t(t, n, r, i = 0) {
			let a = g(t, n, 0, Z + i);
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
			]) a("wood", s, e * .95, .24, r * .95, .42, .48, .42), w() < .5 && oe.push({
				x: t + e * .95,
				y: Z + i + .48,
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
					w() < .7 && oe.push({
						x: e + n + (w() - .5) * 1.2,
						y: -.03999999999999998,
						z: t + r + a * .75,
						heading: a > 0 ? Math.PI / 2 : -Math.PI / 2
					});
				}
			}
		}
		n(-36, G + 9.4, "coral", "coral"), r(de.x, de.z - .4), n(56, G + 9.4, "teal", "teal");
		{
			let e = g(le.x, le.z, 0), { halfLength: t, halfWidth: n } = le;
			for (let r of [-n, n]) e("white", s, 0, .16, r, t * 2, .05, .14);
			for (let r of [-t, t]) e("white", s, r, .16, 0, .14, .05, n * 2);
			for (let t of [-n - .5, n + .5]) e("dark", u, 0, 1.3, t, .14, 2.6, .14);
			e("net", s, 0, 1.95, 0, .04, 1, n * 2 + 1), e("white", s, 0, 2.46, 0, .06, .06, n * 2 + 1), e("white", s, 0, 1.44, 0, .06, .06, n * 2 + 1), e("wood", s, 0, .9, -n - 1.5, .8, 1.8, .8), e("wood", s, 0, 2.1, -n - 1.75, .8, .7, .1), e("wood", s, -t + 3, .4, n + 2, 3, .1, .5), e("wood", s, t - 3, .4, n + 2, 3, .1, .5);
			for (let r of [-t - 1.2, t + 1.2]) e("dark", u, r, 3.2, -n - 1.4, .16, 6.4, .16), e("dark", s, r, 6.4, -n - .9, .12, .12, 1.1), e("lamp", s, r, 6.3, -n - .5, .7, .1, .5);
			e("poolBeach", d, 0, .21000000000000002, 0, t + 5, 1, n + 5);
		}
		{
			let e = g(ue.x, ue.z, 0);
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
			let e = g(-1, K - 6, 0);
			for (let t of [-1, 1]) for (let n of [-1, 1]) e("wood", u, t * .9, 1.2, n * .9, .16, 2.4, .16);
			e("wood", s, 0, 2.45, .2, 2.6, .12, 3), e("white", s, 0, 3.3, -.2, 2.2, 1.6, 1.8), e("coral", s, 0, 4.2, -.1, 2.8, .18, 2.6), e("window", s, 0, 3.4, .72, 1.5, .7, .04), e("lamp", s, 0, 4.02, 1.1, .5, .12, .3), e("poolBeach", d, 0, .2, 1.2, 5, 1, 5), e("wood", s, 0, 1.2, 2.3, .9, .1, 2.9, 0, 0, .72), e("coral", s, 1.5, 3.2, 1.4, .06, 1.8, .06), e("sun", s, 1.5, 3.8, 1.72, .04, .5, .7);
		}
		{
			let e = {
				x: -62,
				from: K - 4,
				to: K + 30
			};
			_("deck", s, e.x, .9, (e.from + e.to) / 2, 3.4, .16, e.to - e.from), _("deck", s, e.x, .5, e.from - 1.4, 3.4, .16, 3.4, 0, 0, -.3);
			for (let t = e.from + 1; t <= e.to; t += 5.5) for (let n of [-1.5, 1.5]) _("wood", u, e.x + n, .3, t, .24, 1.6, .24);
			for (let t of [-1.6, 1.6]) _("wood", s, e.x + t, 1.5, (e.from + e.to) / 2 + 1, .08, .08, e.to - e.from - 2);
			for (let t = e.from + 1; t <= e.to; t += 2.75) for (let n of [-1.6, 1.6]) _("wood", u, e.x + n, 1.24, t, .08, .56, .08);
			_("deck", s, e.x, .9, e.to + 2, 7, .16, 5);
			for (let t = e.from + 1; t <= e.to; t += 5.5) for (let n of [-1.6, 1.6]) _("lamp", s, e.x + n, 1.68, t, .2, .24, .2);
			I(e.x - 2.6, e.to + 2, -Math.PI / 2);
		}
		for (let [t, n] of [
			[-52, -24],
			[18, 44],
			[66, 100],
			[-108, -72]
		]) for (let r = t; r <= n; r += 6.5) {
			let t = K - 5 - w() * 3, n = g(r + (w() - .5), t, (w() - .5) * .3), i = T(e);
			n("white", u, 0, 1.2, 0, .08, 2.4, .08), n(i, s, 0, 2.4, 0, 2.8, .12, 2.8), n(i, s, 0, 2.55, 0, 1.5, .16, 1.5), n("lamp", s, 0, 2.16, 0, .26, .26, .26), n("poolBeach", d, 0, .19, 0, 3.4, 1, 3.4);
			for (let e of [-1.1, 1.1]) n("white", s, e, .4, .3, .7, .1, 1.9), n("white", s, e, .62, -.78, .7, .1, .7, 0, 0, .7), n(i, s, e, .47, .5, .6, .04, 1.2);
		}
		for (let [e, t, n] of [
			[
				-25.6,
				G + 16,
				"coral"
			],
			[
				-24.8,
				G + 16.4,
				"sun"
			],
			[
				-24.1,
				G + 15.8,
				"teal"
			],
			[
				45.4,
				G + 15,
				"white"
			],
			[
				46.2,
				G + 15.5,
				"coral"
			]
		]) g(e, t, w() * .6)(n, s, 0, 1.15, 0, .5, 2.1, .08, 0, 0, -.12);
		_("walk", s, 0, .03, E.z, 5, .07, E.width), _("deck", s, 0, .1, ce + .5, 6, .2, 1);
		for (let e = -132; e <= 132; e += 11) [
			[-36, 9],
			[de.x, 6],
			[56, 9],
			[ue.x, 4]
		].some(([t, n]) => Math.abs(e - t) < n) || ee(e + (w() - .5) * 2, ce + 1.6 + w() * 1.5, 6 + w() * 2);
		for (let e = -120; e <= 120; e += 20) I(e + 10, G + se - .5, Math.PI);
		{
			let e = G + se - .2;
			for (let t = -120; t <= 120; t += 20) _("dark", u, t, 1.95, e, .1, 3.7, .1), Y([
				t,
				3.72,
				e
			], [
				t + 10,
				3.72,
				e
			], 7, .5), t > -120 && Y([
				t - 10,
				3.72,
				e
			], [
				t,
				3.72,
				e
			], 7, .5);
			for (let e = -108; e <= 108; e += 12) Math.abs(e + 62) < 5 || Math.abs(e + 1) < 3 || ge(e, K - .3);
			for (let [e, t] of [
				[-46, ce + 16.2],
				[20.5, ce + 16.6],
				[84, ce + 14]
			]) {
				let n = g(e, t, 0, -.36);
				n("dark", u, 0, 4.4, 0, .2, 8.8, .2), n("dark", s, 0, 8.8, 0, 1.5, .14, .3);
				for (let e of [-.5, .5]) n("lamp", s, e, 8.66, .25, .7, .14, .5);
				n("poolBeach", d, 0, .07, 6, 17, 1, 15), he.push({
					x: e,
					y: -.36 + 8.4,
					z: t + 2
				});
			}
		}
		{
			let e = g(pe.x, pe.z, 0, -.36);
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
				for (let e of [-.6, .6]) me.push({
					x: pe.x + n - Math.sin(t) * e,
					y: -.36 + .44,
					z: pe.z + r + Math.cos(t) * e,
					heading: Math.PI - t
				});
			}
			let t = g(q.x, q.z, 0, -.36);
			t("deck", s, 0, .12, -.5, 6.6, .24, 3.2), t("dark", s, 0, .8, .5, 3.6, 1.1, .16), t("signPink", s, 0, 1.02, .6, 3.2, .14, .06), t("signTeal", s, 0, .62, .6, 3.2, .14, .06), t("dark", s, 0, 1.38, .1, 3.6, .08, .95);
			for (let e of [-.95, .95]) t("steel", s, e, 1.47, .05, .8, .1, .7), t("dark", s, e, 1.535, .05, .5, .03, .5);
			t("steel", s, 0, 1.47, .05, .5, .1, .6);
			for (let e of [-3.9, 3.9]) t("dark", s, e, 1.1, .5, 1.2, 2.2, 1), t("steel", s, e, 1.62, 1.02, .66, .66, .05), t("steel", s, e, .66, 1.02, .86, .86, .05);
			for (let e of [-2.9, 2.9]) t("steel", u, e, 2.25, -1.3, .16, 4.5, .16);
			t("steel", s, 0, 4.42, -1.3, 6, .18, .18);
			for (let e = 0; e < 5; e++) J.push({
				x: q.x - 2.2 + e * 1.1,
				y: 3.82,
				z: q.z - 1.2
			});
			let n = [
				"lamp",
				"signPink",
				"lamp",
				"signTeal"
			], r = [-1, 1].map((e) => ({
				x: fe.x + e * 7.6,
				z: fe.z + 4.6
			}));
			for (let [e, t] of r.entries()) _("dark", u, t.x, 2.24, t.z, .12, 4.2, .12), Y([
				q.x + (e ? 2.9 : -2.9),
				4.54,
				q.z - 1.3
			], [
				t.x,
				4.239999999999999,
				t.z
			], 11, .7, n);
			Y([
				r[0].x,
				4.239999999999999,
				r[0].z
			], [
				r[1].x,
				4.239999999999999,
				r[1].z
			], 13, .8, n);
			for (let e of [-1, 1]) for (let t of [-1, 1]) ge(fe.x + e * 8.6, fe.z + t * 2.6 - .6);
		}
		for (let [e, t] of [
			[-46, K - 14],
			[-22, K - 13],
			[20, K - 9],
			[44, K - 15],
			[70, K - 12],
			[-80, K - 16],
			[96, K - 8]
		]) ee(e, t, 5.5 + w() * 2);
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
	let X = new e.Group();
	X.name = "outdoors";
	for (let [t, r] of f) {
		let i = new e.Mesh(n(r, !1), o[t]);
		i.name = `outdoors:${t}`, (t === "pool" || t === "poolBeach") && (i.renderOrder = 1), X.add(i);
		for (let e of r) e.dispose();
	}
	b.forEach((t, r) => {
		if (x[r].length === 0) return;
		let i = new e.Mesh(n(x[r], !1), t);
		i.name = `outdoors:tower-${r}`, X.add(i);
		for (let e of x[r]) e.dispose();
	});
	let _e = new e.Mesh(n(U, !1), new e.MeshBasicMaterial({ vertexColors: !0 }));
	_e.name = "outdoors:neon";
	for (let e of U) e.dispose();
	let ve = new e.BufferAttribute(new Float32Array(W.length * 36 * 3), 3);
	_e.geometry.setAttribute("color", ve);
	let ye = ae.map((e) => r(e, 1.1)), be = new e.Color("#5c5e62"), xe = new e.Color();
	function Se(e, t) {
		for (let n = 0; n < W.length; n++) {
			let r = W[n], i = .68 + .32 * (.5 + .5 * Math.sin(e * 1.5 - r * .75));
			xe.copy(ye[r]).multiplyScalar(i).lerp(be, 1 - t);
			for (let e = 0; e < 36; e++) ve.setXYZ(n * 36 + e, xe.r, xe.g, xe.b);
		}
		ve.needsUpdate = !0;
	}
	Se(0, 0), X.add(_e);
	let Ce = null;
	{
		let t = /* @__PURE__ */ new Float32Array(1260);
		for (let e = 0; e < 420; e++) {
			let n = w() * Math.PI * 2, r = Math.asin(.1 + w() * .9);
			t.set([
				Math.cos(n) * Math.cos(r) * 620,
				Math.sin(r) * 620,
				Math.sin(n) * Math.cos(r) * 620
			], e * 3);
		}
		let n = new e.BufferGeometry();
		n.setAttribute("position", new e.BufferAttribute(t, 3)), Ce = new e.Points(n, new e.PointsMaterial({
			color: V.steel,
			size: 1.4,
			sizeAttenuation: !1,
			fog: !1,
			transparent: !0,
			opacity: .7
		})), Ce.name = "stars", X.add(Ce);
	}
	let we = new e.BoxGeometry(1, 1, 1), je = a(r("#fff1d6", 1)), Me = a(r(V.ember, .8));
	function Ne(t) {
		let n = new e.Group(), r = (t, r, i, a, o, s, c) => {
			let l = new e.Mesh(we, t);
			l.scale.set(r, i, a), l.position.set(o, s, c), n.add(l);
		};
		r(t, 4.1, .7, 1.8, 0, .62, 0), r(o.dark, 2.2, .55, 1.6, -.2, 1.2, 0), r(o.dark, 3.4, .4, 1.9, 0, .2, 0);
		for (let e of [-.6, .6]) r(je, .06, .16, .36, 2.06, .66, e), r(Me, .06, .14, .36, -2.06, .7, e);
		return X.add(n), n;
	}
	let Pe = 1.7, Fe = 1.5, Ie = De - (O.x + Fe), Le = [
		{
			car: Ne(o.carC),
			speed: 7.5,
			offset: 40,
			place: (e, t) => e.position.set(t, Z, E.z + Pe)
		},
		{
			car: Ne(o.carA),
			speed: 6.2,
			offset: 190,
			place: (e, t) => e.position.set(-t, Z, E.z - Pe)
		},
		{
			car: Ne(o.carB),
			speed: 6.8,
			offset: 110,
			place: (e, t) => {
				let n = t + De;
				n < Ie ? (e.position.set(De - n, Z, E.z - Pe), e.rotation.y = Math.PI) : (e.position.set(O.x + Fe, Z, E.z - Pe - (n - Ie)), e.rotation.y = Math.PI / 2);
			}
		}
	];
	Le[1].car.rotation.y = Math.PI;
	let Re = Te(X, {
		ground: Z,
		reach: De,
		front: E.z,
		back: D.z,
		side: O.x,
		boardwalk: {
			from: G + .9,
			to: G + se - 1.2
		},
		sand: {
			from: ce + 17,
			to: K - 1
		},
		shore: K,
		court: le,
		pullUp: {
			x: ue.x - 3.6,
			z: ue.z + 2.4,
			bar: 2.72
		},
		mat: {
			x: ue.x + .4,
			z: ue.z + .4
		},
		grill: {
			x: de.x,
			z: de.z
		},
		seats: oe,
		party: {
			x: fe.x,
			z: fe.z,
			dj: {
				x: q.x,
				y: -.12,
				z: q.z - .75
			},
			fire: pe,
			logs: me,
			lamps: J
		},
		poolMap: o.pool.map,
		lean: Ae
	}), ze = Ae ? [] : he.map((t) => {
		let n = new e.PointLight("#ffd2a0", 0, 70, 1.5);
		return n.position.set(t.x, t.y, t.z), n.visible = !1, X.add(n), n;
	});
	t.add(X);
	let Be = [
		{
			material: o.window,
			on: o.window.color.clone(),
			off: new e.Color("#2c3c4c")
		},
		{
			material: o.lamp,
			on: o.lamp.color.clone(),
			off: new e.Color("#4a4640")
		},
		{
			material: je,
			on: je.color.clone(),
			off: new e.Color("#6a6a70")
		},
		{
			material: Me,
			on: Me.color.clone(),
			off: new e.Color("#4a1a14")
		},
		{
			material: o.signPink,
			on: o.signPink.color.clone(),
			off: new e.Color("#8a3a5c")
		},
		{
			material: o.signTeal,
			on: o.signTeal.color.clone(),
			off: new e.Color("#3a7f7a")
		},
		{
			material: o.flame,
			on: o.flame.color.clone(),
			off: new e.Color("#3a2c22")
		}
	], Ve = 0, $ = !1;
	return {
		setDaylight(t) {
			let n = 1 - e.MathUtils.smoothstep(t, .25, .7);
			for (let { material: e, on: t, off: r } of Be) e.color.lerpColors(r, t, n);
			o.pool.opacity = .16 * n, o.poolBeach.opacity = .2 * n;
			for (let e of b) e.emissiveIntensity = .62 * n;
			for (let e of ze) e.visible = t < .96, e.intensity = 46 * n;
			o.jade.emissive.set("#1c7a74").multiplyScalar(.5 * n), o.jadeDark.emissive.set("#125e5a").multiplyScalar(.5 * n), Ve = n, Re.setNight(n), Ce && (Ce.material.opacity = .7 * (1 - e.MathUtils.smoothstep(t, 0, .4)));
		},
		update(e) {
			for (let { car: t, speed: n, offset: r, place: i } of Le) i(t, (e * n + r) % 300 - De);
			Ve > .01 ? (Se(e, Ve), $ = !0) : $ &&= (Se(0, 0), !1), Re.update(e);
		}
	};
}
// src/scene.ts
var Me = new e.BoxGeometry(1, 1, 1), Ne = new e.PlaneGeometry(1, 1), Pe = "\"Space Grotesk\", system-ui, sans-serif", Fe = "\"JetBrains Mono\", ui-monospace, Menlo, monospace", Ie = {
	floorDark: "#3b2415",
	floorLight: "#8b5a33",
	deckDark: "#6b4527",
	deckLight: "#a67646",
	oak: "#a87a4b",
	slat: "#9a6b40",
	trunk: "#5a3a22"
}, Le = 2.4;
function Re(t, n = 1) {
	let r = new e.Color(t), i = .2126 * r.r + .7152 * r.g + .0722 * r.b, a = e.MathUtils.clamp(.62 / Math.max(i, .05), .8, 3.2);
	return r.multiplyScalar(a * n);
}
function ze(t, n = new e.Color()) {
	let r = H.map((t) => new e.Color(t)), i = e.MathUtils.clamp(t, 0, 1) * (r.length - 1), a = Math.min(Math.floor(i), r.length - 2);
	return n.lerpColors(r[a], r[a + 1], i - a);
}
var Be = "\n  varying vec2 vWoodXZ;\n  uniform vec3 uWoodDark;\n  uniform vec3 uWoodLight;\n  uniform vec2 uPlank; // x = plank width, y = plank length\n  uniform float uAlongZ;\n\n  float woodHash(vec2 p) {\n    p = fract(p * vec2(123.34, 456.21));\n    p += dot(p, p + 45.32);\n    return fract(p.x * p.y);\n  }\n\n  float woodNoise(vec2 p) {\n    vec2 i = floor(p);\n    vec2 f = fract(p);\n    f = f * f * (3.0 - 2.0 * f);\n    return mix(\n      mix(woodHash(i), woodHash(i + vec2(1.0, 0.0)), f.x),\n      mix(woodHash(i + vec2(0.0, 1.0)), woodHash(i + vec2(1.0, 1.0)), f.x),\n      f.y\n    );\n  }\n\n  // Pixel-art planks: the floor is divided into small squares, and everything (which plank,\n  // its tone, its grain, the dark seam along two of its edges) is decided per square.\n  // Grain and seams fade out with distance, so the overview stays clean.\n  const float WOOD_PIX = 8.0; // squares per metre\n  vec3 woodColor(vec2 world) {\n    float pixel = max(fwidth(world.x), fwidth(world.y));\n    vec2 q = (floor(world * WOOD_PIX) + 0.5) / WOOD_PIX; // the centre of this square\n    vec2 p = uAlongZ > 0.5 ? q.yx : q.xy; // p.x runs along the plank\n    float row = floor(p.y / uPlank.x);\n    float shift = floor(woodHash(vec2(row, 3.7)) * uPlank.y * WOOD_PIX) / WOOD_PIX;\n    float along = (p.x + shift) / uPlank.y;\n    float tone = woodHash(vec2(floor(along), row));\n    vec2 cell = vec2(fract(along) * uPlank.y, fract(p.y / uPlank.x) * uPlank.x);\n\n    // Grain: short streaks running along the plank, and single-square specks.\n    float streak = woodHash(vec2(floor(p.x * WOOD_PIX / 4.0), floor(p.y * WOOD_PIX)) + tone * 31.0);\n    float speck = woodHash(floor(q * WOOD_PIX) + tone * 17.0);\n    float grain = mix(0.5, 0.62 * streak + 0.38 * speck, clamp(0.02 / pixel, 0.0, 1.0));\n\n    vec3 color = mix(uWoodDark, uWoodLight, clamp(0.16 + 0.54 * tone + 0.3 * grain, 0.0, 1.0));\n\n    // The seam is exactly one square wide, along one long edge and one end of each plank.\n    float seam = 0.99 / WOOD_PIX;\n    float open = step(seam, cell.y) * step(seam, cell.x);\n    color *= mix(1.0, mix(0.52, 1.0, open), clamp(0.03 / pixel, 0.0, 1.0));\n    return color;\n  }\n";
function Ve(t) {
	let n = new e.MeshStandardMaterial({
		color: "#ffffff",
		roughness: t.roughness ?? .7,
		metalness: 0
	}), r = {
		uWoodDark: { value: new e.Color(t.dark) },
		uWoodLight: { value: new e.Color(t.light) },
		uPlank: { value: new e.Vector2(t.plankWidth, t.plankLength) },
		uAlongZ: { value: +!!t.alongZ }
	};
	return n.onBeforeCompile = (e) => {
		Object.assign(e.uniforms, r), e.vertexShader = e.vertexShader.replace("#include <common>", "#include <common>\nvarying vec2 vWoodXZ;").replace("#include <begin_vertex>", "#include <begin_vertex>\nvWoodXZ = (modelMatrix * vec4(position, 1.0)).xz;"), e.fragmentShader = e.fragmentShader.replace("#include <common>", `#include <common>\n${Be}`).replace("#include <map_fragment>", "#include <map_fragment>\ndiffuseColor.rgb = woodColor(vWoodXZ);");
	}, n;
}
function $(t, n, r, i, a, o, s, c) {
	let l = new e.Mesh(Me, n);
	return l.scale.set(r, i, a), l.position.set(o, s, c), t.add(l), l;
}
function He(e, t, n, r, i, a) {
	$(e, t, n + a, .03, a, 0, i, -r / 2), $(e, t, n + a, .03, a, 0, i, r / 2), $(e, t, a, .03, r - a, -n / 2, i, 0), $(e, t, a, .03, r - a, n / 2, i, 0);
}
function Ue(e, t, n, r, i) {
	let a = 1.1, o = .16;
	for (let s of [-1, 1]) for (let c of [-1, 1]) $(e, t, a, .035, o, s * (n / 2 - a / 2), i, r / 2 * c), $(e, t, o, .035, a, n / 2 * s, i, c * (r / 2 - a / 2));
}
function We(e, n, r) {
	let i = document.createElement("div");
	return i.className = n, i.textContent = e, r && i.style.setProperty("--accent", r), new t(i);
}
function Ge(e, t) {
	"letterSpacing" in e && (e.letterSpacing = t);
}
function Ke(e, t, n) {
	if (e.measureText(t).width <= n) return t;
	let r = t.length;
	for (; r > 1 && e.measureText(`${t.slice(0, r)}\u2026`).width > n;) --r;
	return `${t.slice(0, r).trimEnd()}\u2026`;
}
function qe(e, t, n, r) {
	let i = e.createLinearGradient(0, 0, t, 0);
	i.addColorStop(0, H[0]), i.addColorStop(.5, H[1]), i.addColorStop(1, H[2]), e.clearRect(0, 0, t, n), e.globalAlpha = 1, e.fillStyle = "rgba(255, 255, 255, 0.05)", e.fillRect(0, 0, t, n), e.strokeStyle = i, e.lineWidth = 4, e.strokeRect(2, 2, t - 4, n - 4), e.textBaseline = "middle", e.textAlign = "left", e.fillStyle = i, e.font = `600 34px ${Pe}`, Ge(e, "6px"), e.fillText("MISSION BOARD", 32, 48), e.fillStyle = "#ffffff", e.textAlign = "right", e.font = `500 24px ${Fe}`, Ge(e, "2px"), e.fillText(`${r.filter((e) => e.status === "active").length} ACTIVE`, t - 32, 48);
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
		e.globalAlpha = .9, e.fillStyle = "#ffffff", e.strokeStyle = "#ffffff", e.textAlign = "left", e.font = `500 20px ${Fe}`, Ge(e, "2px"), e.fillText(t.name, s, 102), e.globalAlpha = .45, e.lineWidth = 2, e.strokeRect(s, 124, o, n - 88 - 36 - 30);
		let c = r.filter((e) => e.status === t.status).slice(-3).reverse();
		for (let n = 0; n < 3; n++) {
			let r = s + 12, a = 138 + n * 62, l = o - 24, u = c[n];
			u ? (e.globalAlpha = t.status === "done" ? .16 : .26, e.fillStyle = t.status === "active" ? i : "#ffffff", e.fillRect(r, a, l, 48), e.globalAlpha = t.status === "done" ? .6 : 1, e.fillStyle = "#ffffff", Ge(e, "0px"), e.font = `500 14px ${Fe}`, e.fillText(u.id, r + 10, a + 14), e.font = `500 17px ${Pe}`, e.fillText(Ke(e, u.title, l - 20), r + 10, a + 33)) : (e.globalAlpha = .24, e.setLineDash([8, 8]), e.strokeStyle = "#ffffff", e.strokeRect(r, a, l, 48), e.setLineDash([]));
		}
	}), e.globalAlpha = 1;
}
function Je(e, t, n) {
	e.clearRect(0, 0, t, n), e.textBaseline = "alphabetic", e.textAlign = "left";
	let r = Math.round(n * .62), i = `400 ${r}px ${Pe}`, a = `600 ${r}px ${Pe}`;
	Ge(e, `${-Math.round(r * .03)}px`), e.font = i;
	let o = e.measureText("Start ").width;
	e.font = a;
	let s = e.measureText("Creating").width, c = e.measureText(".").width, l = (t - o - s - c) / 2, u = n * .72;
	e.font = i, e.fillStyle = "#ffffff", e.fillText("Start", l, u), e.font = a;
	let d = e.createLinearGradient(l + o, 0, l + o + s, 0);
	H.forEach((e, t) => d.addColorStop(t / (H.length - 1), e)), e.fillStyle = d, e.fillText("Creating", l + o, u), e.fillStyle = V.orange, e.fillText(".", l + o + s, u);
}
function Ye(e, t, n) {
	e.clearRect(0, 0, t, n), e.textBaseline = "alphabetic", e.textAlign = "left";
	let r = Math.round(n * .46);
	e.font = `600 ${r}px ${Pe}`, Ge(e, `${Math.round(r * .2)}px`);
	let i = e.measureText("SC45").width, a = e.measureText("WORKS").width, o = (t - i - a) / 2 + r * .1, s = n * .58;
	e.fillStyle = "#ffffff", e.fillText("SC45", o, s);
	let c = e.createLinearGradient(o + i, 0, o + i + a, 0);
	H.forEach((e, t) => c.addColorStop(t / (H.length - 1), e)), e.fillStyle = c, e.fillText("WORKS", o + i, s), e.font = `500 ${Math.round(n * .11)}px ${Fe}`, Ge(e, `${Math.round(n * .05)}px`), e.textAlign = "center", e.fillStyle = V.steel, e.fillText("NO. 45  ·  SOLO CREATOR STUDIO", t / 2, n * .84);
}
function Xe(e, t, n, r, i, a) {
	e.fillStyle = "#0b0c10", e.fillRect(0, 0, t, n), e.fillStyle = "#16181f", e.fillRect(0, 0, t, 34), e.fillStyle = r.blocked ? V.alert : i, e.fillRect(12, 12, 10, 10), e.textBaseline = "middle", e.textAlign = "left", Ge(e, "0px"), e.font = `500 15px ${Fe}`;
	let o = 32;
	r.missionId && (e.fillStyle = i, e.fillText(r.missionId, o, 18), o += e.measureText(r.missionId).width + 10), e.fillStyle = "#ffffff", e.fillText(Ke(e, r.title, t - o - 12), o, 18), e.font = `400 14px ${Fe}`;
	let s = Math.floor((n - 34 - 14) / 22) - 1, c = r.lines.slice(-s), l = 54;
	for (let n of c) e.fillStyle = V.green, e.fillText("✓", 12, l), e.fillStyle = V.soft, e.fillText(Ke(e, n, t - 44), 32, l), l += 22;
	e.fillStyle = r.blocked ? V.alert : i, e.fillText(r.blocked ? "!" : ">", 12, l), e.fillStyle = r.blocked ? V.alert : "#ffffff";
	let u = r.blocked ? "waiting" : c.length === 0 ? "starting" : "working";
	e.fillText(u, 32, l), a && e.fillRect(32 + e.measureText(u).width + 6, l - 8, 9, 16);
}
function Ze(e, t, n, r) {
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
	e.fillStyle = V.orange, e.fillRect(a, 38, 5, 6);
	let o = a - 22, s = o > -8 && o < 16 ? Math.round(Math.sin((16 - o) / 24 * Math.PI) * 11) : 0;
	e.fillStyle = V.pink, e.fillRect(22, 37 - s, 5, 7), e.fillStyle = "#ffffff", e.fillRect(25, 38 - s, 1, 1), e.fillStyle = V.peach;
	for (let t = 0; t < Math.floor(r * 2 / 48) % 8 + 1; t++) e.fillRect(3 + t * 4, 3, 3, 3);
}
function Qe(e, t, n) {
	e.fillStyle = "#17181d", e.fillRect(0, 0, t, n), e.fillStyle = V.orange, e.fillRect(8, 8, t - 16, 30), e.fillStyle = "#16100c", e.textAlign = "center", e.textBaseline = "middle", Ge(e, "3px"), e.font = `600 17px ${Pe}`, e.fillText("SNACKS", t / 2, 24), e.fillStyle = "#e9eef6", e.fillRect(8, 46, t - 52, 176);
	let r = [
		V.orange,
		V.pink,
		V.lightViolet,
		V.green,
		V.peach,
		"#2b4a7d",
		"#f4c542",
		"#b5432e"
	];
	for (let n = 0; n < 4; n++) {
		let i = 52 + n * 43;
		for (let t = 0; t < 5; t++) e.fillStyle = r[(n * 3 + t * 5) % r.length], n < 2 ? (e.fillRect(14 + t * 19, i, 13, 30), e.fillStyle = "rgba(255,255,255,0.55)", e.fillRect(14 + t * 19, i + 10, 13, 5)) : (e.fillRect(13 + t * 19, i + 6, 15, 24), e.fillStyle = "rgba(0,0,0,0.25)", e.fillRect(13 + t * 19, i + 6, 15, 4));
		e.fillStyle = "#9aa3b2", e.fillRect(8, i + 32, t - 52, 4);
	}
	e.fillStyle = "#2a2c35", e.fillRect(t - 38, 46, 30, 176), e.fillStyle = V.green, e.fillRect(t - 33, 54, 20, 12), e.fillStyle = "#c9c9d1";
	for (let n = 0; n < 9; n++) e.fillRect(t - 33 + n % 3 * 7, 76 + Math.floor(n / 3) * 8, 5, 5);
	e.fillStyle = "#0b0b0d", e.fillRect(t - 28, 112, 10, 3), e.fillRect(16, 234, t - 32, 38), e.fillStyle = "#3a3d48", e.fillRect(20, 238, t - 40, 6);
}
var $e = {
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
function et(t, n, r, i, a) {
	t.clearRect(0, 0, n, r);
	let o = n * .34;
	t.beginPath(), t.moveTo(0, 0), t.lineTo(n, 0), t.lineTo(n, r), t.lineTo(n / 2, r - o), t.lineTo(0, r), t.closePath(), t.fillStyle = "#0d0d11", t.fill(), t.save(), t.clip();
	let s = new e.Color(a), c = Math.max(s.r, s.g, s.b) - Math.min(s.r, s.g, s.b) < .15;
	t.fillStyle = c ? "#34343c" : a, t.globalAlpha = c ? 1 : .8, t.fillRect(0, 0, n, r), t.globalAlpha = 1, t.fillStyle = a, t.fillRect(0, 0, n, 14), t.restore(), t.save(), t.translate(n / 2, 34 + n * .36), t.scale(n / 300, n / 300), t.strokeStyle = "#ffffff", t.fillStyle = "#ffffff", t.lineWidth = 15, t.lineCap = "round", t.lineJoin = "round", $e[i.id]?.(t), t.restore(), t.save(), t.translate(n / 2, 34 + n * .78), t.rotate(Math.PI / 2), t.fillStyle = "#ffffff", t.textAlign = "left", t.textBaseline = "middle";
	let l = r - o - (34 + n * .78) - 16, u = Math.round(n * .3), d = i.shortName.toUpperCase();
	do
		t.font = `600 ${u}px ${Pe}`, Ge(t, `${Math.round(u * .14)}px`), u -= 2;
	while (t.measureText(d).width > l && u > 16);
	t.fillText(d, 0, 4), t.restore();
}
var tt = {
	night: new e.Color(V.void),
	day: new e.Color("#7cc8ff"),
	golden: new e.Color("#f0a070"),
	roomLight: new e.Color("#ffe1c2"),
	dayLight: new e.Color("#eaf3ff"),
	goldenLight: new e.Color("#ffc79a"),
	roomBounce: new e.Color("#1d120a"),
	dayBounce: new e.Color("#8a7c6c"),
	sunNoon: new e.Color("#fff1d8"),
	sunLow: new e.Color("#ffb070")
}, nt = new e.Color();
function rt() {
	let t = new e.Scene();
	t.background = new e.Color(V.void);
	let r = new e.FogExp2(V.void, .006);
	t.fog = r;
	let i = [], a = [], o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = [], l = [], u = [], d = null, f = (e, t) => d ? t + (e - t) * d.by : e, p = (e) => d ? e * d.by : e;
	function m(e, t, n, r) {
		let i = f(e, d?.x ?? 0), a = f(t, d?.z ?? 0);
		l.push({
			shape: "rect",
			minX: i - p(n) / 2,
			maxX: i + p(n) / 2,
			minZ: a - p(r) / 2,
			maxZ: a + p(r) / 2
		});
	}
	function h(e, t, n) {
		l.push({
			shape: "circle",
			x: f(e, d?.x ?? 0),
			z: f(t, d?.z ?? 0),
			radius: p(n)
		});
	}
	let g = {
		floor: Ve({
			dark: Ie.floorDark,
			light: Ie.floorLight,
			plankWidth: .625,
			plankLength: 5,
			roughness: .74
		}),
		deck: Ve({
			dark: Ie.deckDark,
			light: Ie.deckLight,
			plankWidth: .375,
			plankLength: 3.5,
			alongZ: !0,
			roughness: .66
		}),
		oak: Ee(new e.MeshStandardMaterial({
			color: Ie.oak,
			roughness: .62,
			metalness: 0
		}), 8, .13),
		slat: Ee(new e.MeshStandardMaterial({
			color: Ie.slat,
			roughness: .7,
			metalness: 0
		}), 8, .14),
		trunk: Ee(new e.MeshStandardMaterial({
			color: Ie.trunk,
			roughness: .85,
			metalness: 0
		}), 8, .18),
		body: new e.MeshStandardMaterial({
			color: "#1c1c20",
			roughness: .5,
			metalness: .4
		}),
		soft: Ee(new e.MeshStandardMaterial({
			color: "#26262b",
			roughness: .95,
			metalness: 0
		}), 8, .16),
		soil: new e.MeshStandardMaterial({
			color: "#17110c",
			roughness: 1,
			metalness: 0
		}),
		plaster: Ee(new e.MeshStandardMaterial({
			color: "#b8ad9c",
			roughness: .95,
			metalness: 0
		}), 4, .07),
		glass: new e.MeshPhysicalMaterial({
			color: "#ffffff",
			transparent: !0,
			opacity: .09,
			roughness: .08,
			metalness: 0,
			clearcoat: 1,
			side: e.DoubleSide,
			depthWrite: !1
		}),
		screenOff: new e.MeshBasicMaterial({ color: "#0b0b0d" }),
		dimLine: new e.MeshBasicMaterial({ color: new e.Color(V.steel).multiplyScalar(.28) }),
		foliage: [
			"#3f9a62",
			"#52b877",
			"#2f8055"
		].map((t) => Ee(new e.MeshStandardMaterial({
			color: t,
			roughness: .9,
			metalness: 0,
			flatShading: !0
		}), 5, .2))
	}, _ = /* @__PURE__ */ new Map();
	function v(t, n = 1) {
		let r = `${t}:${n}`, i = _.get(r);
		if (!i) {
			let a = Re(t, n);
			i = {
				material: new e.MeshBasicMaterial({ color: a.clone() }),
				on: a,
				off: new e.Color(t).multiplyScalar(.22).lerp(new e.Color("#3a2a1e"), .35)
			}, _.set(r, i);
		}
		return i.material;
	}
	let y = /* @__PURE__ */ new Map();
	function b(t) {
		let n = y.get(t);
		return n || (n = new e.MeshBasicMaterial({
			color: t,
			transparent: !0,
			opacity: .06,
			blending: e.AdditiveBlending,
			depthWrite: !1
		}), y.set(t, n)), n;
	}
	let x = new e.HemisphereLight("#ffe1c2", "#1d120a", 1.2);
	t.add(x);
	let S = new e.DirectionalLight("#ffffff", 0);
	S.castShadow = !0, S.shadow.mapSize.set(4096, 4096), S.shadow.camera.left = -175, S.shadow.camera.right = 175, S.shadow.camera.top = 175, S.shadow.camera.bottom = -175, S.shadow.camera.near = 20, S.shadow.camera.far = 620, S.shadow.bias = -4e-4, S.shadow.normalBias = .22, S.shadow.radius = 3.2, S.target.position.set(0, 0, -35), t.add(S, S.target);
	let w = !0, T = new e.Vector3(), E = new e.Sprite(new e.SpriteMaterial({
		map: (() => {
			let t = document.createElement("canvas");
			t.width = t.height = 256;
			let n = t.getContext("2d"), r = n.createRadialGradient(128, 128, 0, 128, 128, 128);
			r.addColorStop(0, "rgba(255,255,255,1)"), r.addColorStop(.09, "rgba(255,255,255,1)"), r.addColorStop(.13, "rgba(255,244,214,0.55)"), r.addColorStop(.4, "rgba(255,226,170,0.16)"), r.addColorStop(1, "rgba(255,220,160,0)"), n.fillStyle = r, n.fillRect(0, 0, 256, 256);
			let i = new e.CanvasTexture(t);
			return i.colorSpace = e.SRGBColorSpace, i;
		})(),
		transparent: !0,
		depthWrite: !1,
		fog: !1,
		blending: e.AdditiveBlending
	}));
	E.name = "sun-disc", E.scale.setScalar(260), E.renderOrder = -1, t.add(E);
	let D = [], O = [], k = null, A = new e.Color("#ffc999");
	function j(n, r, i, a, o = 12) {
		let s = A.clone();
		n && s.lerp(new e.Color(n), .18);
		let c = new e.SpotLight(s, a, 36, .74, 1, 1.5);
		c.position.set(r, o, i + 1.5), c.target.position.set(r, 0, i), t.add(c, c.target), D.push({
			light: c,
			base: a
		});
	}
	$(t, g.floor, z.width, .5, z.depth, 0, -.25, 0), He(t, g.dimLine, z.width, z.depth, .012, .07);
	let M = je(t, Re);
	i.push((e) => M.update(e));
	function N(n) {
		let r = new e.Group();
		return r.name = `zone:${n.id}`, r.position.set(n.position.x, 0, n.position.z), r.scale.setScalar(de(n)), t.add(r), r;
	}
	let P = 5.7, F = {
		width: 1.7,
		height: 3.5
	}, ee = new e.BoxGeometry(.12, 1, .12);
	function I(n) {
		let r = n.accent ?? V.mist, o = n.position.x - n.size.width / 2 * de(n) - .3, s = n.position.z - n.size.depth / 2 * de(n), c = new e.Group();
		c.name = `banner:${n.id}`, c.position.set(o, 0, s), t.add(c);
		let l = d;
		d = null, h(o, s, .2), d = l;
		let u = new e.Mesh(ee, g.body);
		u.scale.y = P, u.position.y = P / 2, c.add(u), $(c, g.oak, .34, .12, .34, 0, .06, 0), $(c, v(r, .9), .16, .16, .16, 0, 5.78, 0), $(c, g.body, F.width + .5, .07, .07, (F.width + .5) / 2 - .05, 5.48, 0);
		let f = document.createElement("canvas");
		f.width = 300, f.height = Math.round(300 * F.height / F.width);
		let p = f.getContext("2d"), m = new e.CanvasTexture(f);
		m.colorSpace = e.SRGBColorSpace, m.anisotropy = 8;
		let _ = () => {
			et(p, f.width, f.height, n, r), m.needsUpdate = !0;
		};
		_(), a.push(_);
		let y = new e.MeshLambertMaterial({
			map: m,
			alphaTest: .5,
			emissive: "#ffffff",
			emissiveMap: m,
			emissiveIntensity: .16
		}), b = new e.Group();
		b.position.set(.3 + F.width / 2, 5.44, 0);
		for (let t of [0, Math.PI]) {
			let n = new e.Mesh(Ne, y);
			n.scale.set(F.width, F.height, 1), n.position.set(0, -F.height / 2, t === 0 ? .012 : -.012), n.rotation.y = t, b.add(n);
		}
		b.userData.dynamic = !0, c.add(b);
		let x = n.position.x * .37 + n.position.z * .21;
		i.push((e) => {
			b.rotation.x = Math.sin(e * .9 + x) * .035, b.rotation.y = Math.sin(e * .6 + x * 1.3) * .05;
		});
		let S = We("", "zone-label", r), C = document.createElement("span");
		C.className = "name-full", C.textContent = n.name;
		let w = document.createElement("span");
		w.className = "name-short", w.textContent = n.shortName, S.element.append(C, w), S.center.set(.5, 1), S.position.set(0, 6, 0), c.add(S);
	}
	function L() {
		let n = -5.7, r = z.depth / 2 - 1.9, i = new e.Group();
		i.name = "vending", i.position.set(n, 0, r), i.rotation.y = Math.PI / 2, i.scale.setScalar(B), t.add(i), m(n, r, .95 * B, 1.25 * B), $(i, g.body, 1.15, 2.05, .86, 0, 1.025, 0), $(i, g.screenOff, 1.19, .1, .9, 0, .05, 0), $(i, v(V.orange, .9), 1.17, .05, .88, 0, 2.07, 0);
		let o = document.createElement("canvas");
		o.width = 160, o.height = 288;
		let s = new e.CanvasTexture(o);
		s.colorSpace = e.SRGBColorSpace, s.magFilter = e.NearestFilter;
		let c = () => {
			Qe(o.getContext("2d"), o.width, o.height), s.needsUpdate = !0;
		};
		c(), a.push(c);
		let l = new e.Mesh(Ne, new e.MeshBasicMaterial({ map: s }));
		return l.scale.set(1.03, 1.86, 1), l.position.set(0, 1.07, .432), i.add(l), new e.Vector3(n + 1.25 * B, 0, r);
	}
	function te() {
		let n = 6.2, r = 1.5, i = new e.Group();
		i.name = "monument", i.position.set(-7.9, -.5, z.depth / 2 + 2.6), t.add(i);
		let o = new e.MeshStandardMaterial({
			color: "#2a2a30",
			roughness: .85,
			metalness: .05
		});
		$(i, g.oak, 6.7, .22, 1, 0, .11, 0), $(i, o, n, r, .5, 0, .97, 0);
		for (let e of [-1, 1]) $(i, v(V.peach, .85), 5.8, .04, .05, 0, .245, e * .36);
		let s = document.createElement("canvas");
		s.width = 1240, s.height = 300;
		let c = s.getContext("2d"), l = new e.CanvasTexture(s);
		l.colorSpace = e.SRGBColorSpace, l.anisotropy = 8;
		let u = () => {
			Ye(c, s.width, s.height), l.needsUpdate = !0;
		};
		u(), a.push(u);
		let d = new e.MeshBasicMaterial({
			map: l,
			transparent: !0,
			depthWrite: !1,
			color: new e.Color(.62, .62, .62)
		});
		O.push(d);
		for (let t of [0, Math.PI]) {
			let a = new e.Mesh(Ne, d);
			a.scale.set(n, r, 1), a.position.set(0, .97, t === 0 ? .256 : -.256), a.rotation.y = t, i.add(a);
		}
	}
	function R() {
		let n = z.depth / 2 - .8, r = new e.Group();
		r.name = "entrance", r.position.set(0, 0, n), t.add(r);
		let i = new e.MeshPhysicalMaterial({
			color: "#ffffff",
			transparent: !0,
			opacity: .08,
			roughness: .08,
			metalness: 0,
			clearcoat: 1,
			side: e.DoubleSide,
			depthWrite: !1
		}), o = 6.4, s = 3.5;
		for (let t of [-1, 1]) {
			let a = t * 3.45;
			$(r, g.oak, .5, s, .5, a, s / 2, 0), m(a, n, .5, .5);
			let c = 5.6, l = a + t * 3.05;
			$(r, i, c, 2.9, .05, l, 1.45, 0).renderOrder = 2, $(r, g.oak, c, .12, .18, l, 2.96, 0), $(r, g.oak, c, .1, .18, l, .05, 0), $(r, g.oak, .18, 3.02, .18, a + t * 5.85, 1.51, 0), m(l, n, c, .3);
			let u = new e.Group();
			u.position.set(o / 2 * t, 0, .25), u.rotation.y = t * -1.25, $(u, i, 1.5, 2.7, .04, t * -.75, 1.4, 0).renderOrder = 2, $(u, g.body, .05, .9, .08, t * -1.38, 1.3, 0), r.add(u);
		}
		$(r, g.oak, 9.8, .26, 2, 0, 3.63, .6), $(r, g.slat, 9.9, .08, 2.1, 0, 3.8, .6), $(r, v(V.peach, .9), 5.800000000000001, .04, .07, 0, 3.47, 1.2), H.forEach((e, t) => $(r, v(e, .9), o / H.length, .03, .08, (t - 1) * (o / H.length), .016, .55));
		let c = document.createElement("canvas");
		c.width = 1792, c.height = 320;
		let l = c.getContext("2d"), u = new e.CanvasTexture(c);
		u.colorSpace = e.SRGBColorSpace, u.anisotropy = 8;
		let d = () => {
			Je(l, c.width, c.height), u.needsUpdate = !0;
		};
		d(), a.push(d);
		let f = new e.MeshBasicMaterial({
			map: u,
			transparent: !0,
			depthWrite: !1,
			color: new e.Color(.62, .62, .62)
		});
		O.push(f);
		let p = 9.600000000000001, h = p * c.height / c.width;
		for (let t of [0, Math.PI]) {
			let n = new e.Mesh(Ne, f);
			n.scale.set(p, h, 1), n.position.set(0, 3.84 + h / 2, 1.55 + (t === 0 ? .01 : -.01)), n.rotation.y = t, n.renderOrder = 3, r.add(n);
		}
		$(r, g.body, p, .06, .12, 0, 3.87, 1.55);
	}
	function ne(t, n, r, i, a = 1) {
		let { width: o, depth: s } = n.size;
		if (He(t, v(r, .8 * a), o, s, .02, .06), Ue(t, v(r, a), o, s, .022), !i) return;
		let c = new e.Mesh(Ne, b(r));
		c.scale.set(o, s, 1), c.rotation.x = -Math.PI / 2, c.position.y = .012, t.add(c);
	}
	let ie = /* @__PURE__ */ new Map(), se = !0;
	function q(e) {
		e.content && e.canvas && e.texture && (Xe(e.canvas.getContext("2d"), e.canvas.width, e.canvas.height, e.content, e.accent, se), e.texture.needsUpdate = !0);
	}
	function pe(t, n) {
		let r = ie.get(t);
		if (!r) return;
		let i = JSON.stringify(r.content) === JSON.stringify(n);
		if (r.content = n, !n) for (let e of r.displays) e.material = g.screenOff;
		else {
			r.material ||= (r.canvas = document.createElement("canvas"), r.canvas.width = 288, r.canvas.height = 160, r.texture = new e.CanvasTexture(r.canvas), r.texture.colorSpace = e.SRGBColorSpace, r.texture.anisotropy = 4, new e.MeshBasicMaterial({ map: r.texture }));
			for (let e of r.displays) e.material = r.material;
			i || q(r);
		}
	}
	let me = -1;
	i.push((e) => {
		let t = Math.floor(e * 2);
		if (t !== me) {
			me = t, se = t % 2 == 0;
			for (let e of ie.values()) q(e);
		}
	}), a.push(() => {
		for (let e of ie.values()) q(e);
	});
	let J = [];
	function he(t, n) {
		let r = n.size.width - 1.6, i = -n.size.depth / 2 + .22;
		$(t, g.body, r, Le, .06, 0, Le / 2, i), $(t, g.oak, r + .12, .06, .22, 0, 2.4299999999999997, i + .04), m(n.position.x, n.position.z + i + .04, r, .24);
		let a = .26, o = Math.floor(r / a), s = -((o - 1) * a) / 2, c = new e.Vector3(.13, 2.34, .07), l = new e.Quaternion();
		for (let t = 0; t < o; t++) {
			let r = new e.Vector3(n.position.x + s + t * a, 2.34 / 2, n.position.z + i + .065);
			J.push(new e.Matrix4().compose(r, l, c));
		}
	}
	let ge = /* @__PURE__ */ new Map();
	function X(t) {
		let n = ge.get(t);
		return n || ge.set(t, n = new e.MeshStandardMaterial({
			color: t,
			roughness: .85,
			metalness: 0
		})), n;
	}
	function _e(e, t, n, r, i) {
		let a = 0;
		for (let e of n.id) a = a * 31 + e.charCodeAt(0) >>> 0;
		let o = a % 2 == 0 ? 1 : -1, s = r / 2 / 1.4, c = (t, n, r, a, c, l, u = 0, d = 0) => {
			let f = $(e, X(t), n, r, a, c * s * o, i + d + r / 2, l);
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
					V.pink,
					u,
					u
				]), c(l, .4, .008, .3, -.92, .2, .22, .004), [
					V.pink,
					V.violet,
					V.orange,
					"#2bd576"
				].forEach((e, t) => c(e, .075, .006, .075, -1.03 + t % 2 * .11, .13 + Math.floor(t / 2) * .11, .22, .012)), [
					"#ff2e88",
					"#ff6a3a",
					"#ffb08f",
					"#8f75ff",
					"#2bd576"
				].forEach((e, t) => c(e, .05, .008, .16, .7 + t * .045, -.36, -.25 + t * .12, t * .002)), c(d, .42, .022, .3, .96, .14, -.12), c("#3a3a44", .34, .004, .22, .96, .14, -.12, .022), c(l, .014, .014, .17, 1.24, .1, -.3), c("#c2962a", .08, .11, .08, -.66, -.46), [
					V.pink,
					"#2c8a86",
					l
				].forEach((e, t) => c(e, .014, .08, .014, -.685 + t * .025, -.46 + (t - 1) * .02, 0, .11));
				break;
			case "development":
				c(l, .4, .008, .3, -.98, .02, .14), c(l, .4, .008, .3, -.95, .04, -.08, .008), f(-.96, .05, .05, [
					V.violet,
					u,
					"#2bd576",
					u,
					u,
					V.violet
				], .016), c("#2f4f7d", .32, .06, .23, .98, -.32, -.1), c(V.violet, .29, .05, .21, .97, -.31, .12, .06), c(l, .085, .095, .085, .72, .3), c("#3a2416", .065, .004, .065, .72, .3, 0, .095), c(d, .17, .045, .12, 1.12, .22, .3), c("#2bd576", .025, .012, .025, 1.16, .2, .3, .045), c("#d8c23a", .08, .008, .08, -.68, -.4, .2), c("#ff8a5a", .08, .008, .08, -.6, -.33, -.15, .002);
				break;
			case "content":
				c(d, .03, .12, .03, -.98, -.26), c(d, .2, .13, .11, -.98, -.26, .3, .12), c("#3a3a44", .09, .09, .08, -.955, -.175, .3, .14), c("#ff3b5c", .02, .02, .02, -1.06, -.3, .3, .25), c(d, .11, .02, .11, .82, -.34), c("#6c7078", .02, .2, .02, .82, -.34, 0, .02), c("#8e8e99", .06, .1, .06, .82, -.34, 0, .22), c(d, .28, .014, .2, 1, .2, -.3), [
					0,
					1,
					2,
					3
				].forEach((e) => c(e % 2 ? d : l, .07, .016, .05, .92 + e * .066, .1 - e * .02, -.3, .004)), f(-.9, .24, .2, [
					V.orange,
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
				].forEach((e) => c("#b9b6ae", .13, .008, .032, -.79 + e * .011, .185 + e * .05, .2, .024)), c(d, .085, .014, .17, -1.1, -.08, -.25), c("#2f78b0", .07, .003, .14, -1.1, -.08, -.25, .014), c(d, .24, .025, .03, .92, .2, .35, .03), c(d, .07, .085, .085, .81, .24, .35), c(d, .07, .085, .085, 1.03, .16, .35), c(V.peach, .02, .07, .07, .85, .225, .35, .008), c(d, .012, .012, .13, .78, .31, .6, .03), f(-.95, -.36, -.1, [
					V.peach,
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
				V.pink
			]), c(d, .08, .1, .08, -.7, -.42), c(l, .014, .07, .014, -.7, -.42, 0, .1), n.id === "exec.ceo" ? (c(Ie.slat, .34, .07, .06, .95, .42), c("#c2962a", .26, .035, .004, .95, .452, 0, .018)) : (c("#3a2a1e", .36, .012, .28, .95, .1, -.15), [
				"#d8c23a",
				"#ff8a5a",
				"#2bd576",
				"#8f75ff",
				"#d8c23a",
				"#ff2e88"
			].forEach((e, t) => c(e, .07, .006, .07, .86 + t % 3 * .1, .03 + Math.floor(t / 3) * .11, -.15, .012)));
		}
	}
	function ve(n, r) {
		let i = n.accent ?? V.soft, { width: a, depth: s, height: c } = K(r), l = le(n, r), u = ue(n, r), d = r.rotation ?? 0, f = new e.Group();
		f.name = `desk:${r.id}`, f.position.set(l.x, l.y, l.z), f.rotation.y = d, f.scale.setScalar(B), t.add(f), m(l.x, l.z, (Math.abs(Math.cos(d)) * a + Math.abs(Math.sin(d)) * s) * B, (Math.abs(Math.sin(d)) * a + Math.abs(Math.cos(d)) * s) * B), $(f, g.oak, a, .11, s, 0, c - .055, 0), $(f, v(i, r.vacant ? .22 : 1), a + .04, .04, s + .04, 0, c - .13, 0);
		let p = c - .15;
		$(f, g.body, .16, p, s - .16, -(a / 2 - .16), p / 2, 0), $(f, g.body, .16, p, s - .16, a / 2 - .16, p / 2, 0), $(f, g.body, a - .32, p * .62, .08, 0, p * .69, -(s / 2 - .16));
		let h = r.size === "executive" ? [-.62, .62] : [0];
		for (let t of h) {
			let n = new e.Group();
			n.position.set(t, c, -(s / 2 - .3)), n.rotation.y = -t * .3, f.add(n), $(n, g.body, .36, .05, .24, 0, .025, 0), $(n, g.body, .1, .3, .08, 0, .16, -.03), $(n, g.body, 1, .6, .09, 0, .56, -.025);
			let a = new e.Mesh(Ne, g.screenOff);
			r.vacant || (ie.get(r.id) ?? ie.set(r.id, {
				accent: i,
				displays: [],
				content: null
			}).get(r.id)).displays.push(a), a.userData.dynamic = !0, a.scale.set(.9, .5, 1), a.position.set(0, .56, .021), n.add(a);
		}
		r.vacant || _e(f, n, r, a, c);
		let _ = s / 2 + ce;
		$(f, g.soft, .54, .12, .52, 0, .44, _), $(f, g.body, .14, .38, .14, 0, .19, _), $(f, g.body, .4, .05, .4, 0, .025, _), $(f, g.soft, .54, .54, .11, 0, .77, _ + .26);
		let y = We(r.role, r.vacant ? "desk-label is-vacant" : "desk-label", i);
		y.position.set(0, c + 1.2, 0), f.add(y), o.set(r.id, {
			deskId: r.id,
			zoneId: n.id,
			role: r.role,
			accent: i,
			vacant: !!r.vacant,
			position: new e.Vector3(l.x, l.y, l.z),
			seat: new e.Vector3(u.x, u.y, u.z),
			rotation: d,
			group: f,
			label: y
		});
	}
	let ye = new e.BoxGeometry(.17, 1, .17);
	function be(n, r) {
		let i = (n.scale ?? 1) * B, a = n.kind === "tree", o = new e.Group();
		o.name = `plant:${n.id}`, o.position.set(n.position.x, 0, n.position.z), t.add(o);
		let s = 101 + r * 37, c = () => (s = s * 16807 % 2147483647) / 2147483647, l = (a ? .95 : .72) * i, u = (a ? .6 : .46) * i;
		$(o, g.oak, l, u, l, 0, u / 2, 0), $(o, g.soil, l - .12, .04, l - .12, 0, u + .005, 0), m(n.position.x, n.position.z, l, l);
		let d = new e.Group();
		o.add(d);
		let f = u;
		if (a) {
			let t = (1.5 + c() * .5) * i, n = new e.Mesh(ye, g.trunk);
			n.scale.set(i, t, i), n.position.y = u + t / 2, o.add(n), f = u + t;
		}
		d.position.y = f;
		let p = (a ? .78 : .42) * i;
		(a ? [
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
		]]).forEach(([t, n, r], i) => {
			let a = new e.Mesh(Me, g.foliage[(i + Math.floor(c() * g.foliage.length)) % g.foliage.length]);
			a.scale.set(t * p, n * p, t * p);
			let o = i === 0 ? 0 : p * .18;
			a.position.set((c() - .5) * 2 * o, r * p, (c() - .5) * 2 * o), d.add(a);
		});
	}
	let xe = [
		"#e8742a",
		"#e8c22e",
		"#c8362e",
		"#e86aa0",
		"#8a5cd0"
	];
	function Se(n) {
		let r = new e.Group();
		r.name = `planter:${n.id}`, r.position.set(n.position.x, 0, n.position.z), n.along === "z" && (r.rotation.y = Math.PI / 2), t.add(r);
		let { width: i, height: a } = oe, { length: o } = n;
		m(n.position.x, n.position.z, n.along === "x" ? o : i, n.along === "x" ? i : o);
		let s = 7;
		for (let e of n.id) s = (s * 31 + e.charCodeAt(0)) % 2147483647;
		let c = () => (s = s * 16807 % 2147483647) / 2147483647;
		$(r, g.oak, o, a, i, 0, a / 2, 0), $(r, g.slat, o + .06, .07, i + .06, 0, a - .035, 0), $(r, g.soil, o - .1, .02, i - .12, 0, a + .005, 0);
		let l = Math.max(1, Math.round((o - .1) / .6)), u = (o - .1) / l, d = xe[Math.floor(c() * xe.length)], f = Math.floor(c() * 4);
		for (let e = 0; e < l; e++) {
			e % 3 == 0 && e > 0 && (d = xe[(xe.indexOf(d) + 1 + Math.floor(c() * (xe.length - 1))) % xe.length], f = (f + 1 + Math.floor(c() * 3)) % 4);
			let t = -o / 2 + .05 + (e + .5) * u, n = .2 + c() * .14;
			$(r, g.foliage[e % g.foliage.length], u + .02, n, i - .1, t, a + n / 2, 0);
			let s = a + n, l = (e, n, i, a, o, s, c) => $(r, X(e), n, i, a, t + o, s + i / 2, c);
			if (f === 0) for (let e = 0; e < 3; e++) {
				let t = (e - 1) * .18 + (c() - .5) * .06, n = (c() - .5) * .24, r = .14 + c() * .12;
				l("#3f8a52", .03, r, .03, t, s, n), l(d, .11, .12, .11, t, s + r, n);
			}
			else if (f === 1) for (let e = 0; e < 5; e++) l(d, .1, .06, .1, (c() - .5) * (u - .1), s, (c() - .5) * .3);
			else if (f === 2) for (let e = 0; e < 4; e++) {
				let t = (e - 1.5) * .13, n = (c() - .5) * .26, r = .24 + c() * .16;
				l("#3f8a52", .03, .08, .03, t, s, n), l(d, .07, r, .07, t, s + .08, n);
			}
			else for (let e = 0; e < 2; e++) {
				let t = (e - .5) * .26, n = (c() - .5) * .2, r = .12 + c() * .1;
				l("#3f8a52", .03, r, .03, t, s, n), l(d, .18, .05, .18, t, s + r, n), l("#3a2416", .07, .03, .07, t, s + r + .05, n);
			}
		}
	}
	function Ce(n, r, i) {
		let a = new e.Group();
		a.name = `bench:${i}`, a.position.set(n, 0, r), t.add(a), $(a, g.oak, .7, .1, 2.6, 0, .52, .2), $(a, g.oak, .08, .5, 2.6, -.34, .82, .2);
		for (let e of [-.8, 1.2]) $(a, g.body, .6, .47, .1, 0, .235, e);
		$(a, X("#b5503c"), .5, .06, .9, .02, .6, .7), m(n, r + .2, .8, 2.7), Se({
			id: `bench.${i}`,
			position: {
				x: n,
				z: r - 1.5
			},
			length: .8,
			along: "x"
		});
	}
	function we(n, r, i) {
		let a = new e.Group();
		a.name = "shelving:lounge", a.position.set(n, 0, r), t.add(a);
		let o = .44, s = [
			.06,
			.52,
			.98,
			1.44
		];
		for (let e of s) $(a, g.oak, o, .05, i, 0, e, 0);
		for (let e = 0; e <= 4; e++) $(a, g.oak, o, 1.44, .05, 0, .74, -i / 2 + e * i / 4);
		m(n, r, .54, i);
		let c = 99, l = () => (c = c * 16807 % 2147483647) / 2147483647, u = [
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
			let t = -i / 2 + e * i / 4 + .08, n = i / 4 - .16;
			for (let r = 0; r < 3; r++) {
				let i = s[r] + .025, o = (e * 2 + r * 3) % 5;
				if (o !== 4) {
					if (o < 3) {
						let e = t;
						for (; e < t + n - .3;) {
							let t = .05 + l() * .05, n = .26 + l() * .1;
							$(a, X(u[Math.floor(l() * u.length)]), .3, n, t, 0, i + n / 2, e + t / 2), e += t + .004;
						}
					} else $(a, X("#b9b6ae"), .33999999999999997, .24, .4, 0, i + .12, t + .25), $(a, X("#5a3a22"), .32, .18, .3, 0, i + .09, t + n - .2);
				}
			}
		}
		for (let e of [
			-i / 2 + .5,
			.1,
			i / 2 - .6
		]) $(a, X("#dedbd2"), .24, .2, .24, 0, 1.565, e), $(a, g.foliage[1], .36, .26, .36, 0, 1.79, e), $(a, g.foliage[0], .22, .16, .22, .02, 1.98, e + .02);
	}
	function Te(t, r, i) {
		r.updateWorldMatrix(!0, !1);
		let a = new e.Matrix4().copy(r.matrixWorld).invert(), o = /* @__PURE__ */ new Map(), s = (t) => {
			if (t.userData.dynamic || !t.visible) return;
			let n = t;
			if (n.isMesh && !n.isInstancedMesh && !Array.isArray(n.material) && n.material.visible) {
				let t = Object.keys(n.geometry.attributes).sort().join(","), r = `${n.material.uuid}:${n.renderOrder}:${t}`, i = o.get(r);
				i || o.set(r, i = {
					material: n.material,
					renderOrder: n.renderOrder,
					parts: [],
					meshes: []
				}), n.updateWorldMatrix(!0, !1);
				let s = (n.geometry.index ? n.geometry.toNonIndexed() : n.geometry.clone()).applyMatrix4(new e.Matrix4().multiplyMatrices(a, n.matrixWorld));
				i.parts.push(s), i.meshes.push(n);
			}
			for (let e of [...t.children]) s(e);
		};
		for (let e of t) for (let t of [...e.children]) s(t);
		let c = 0;
		for (let t of o.values()) {
			if (t.meshes.length < 2) {
				for (let e of t.parts) e.dispose();
				continue;
			}
			let a = n(t.parts, !1);
			for (let e of t.parts) e.dispose();
			if (!a) continue;
			let o = new e.Mesh(a, t.material);
			o.name = `${i}:${c++}`, o.renderOrder = t.renderOrder, r.add(o);
			for (let n of t.meshes) {
				let t = n.parent;
				if (t) {
					for (let r of [...n.children]) {
						let n = r.matrixWorld.clone();
						t.add(r), t.updateWorldMatrix(!0, !1), n.premultiply(new e.Matrix4().copy(t.matrixWorld).invert()).decompose(r.position, r.quaternion, r.scale);
					}
					t.remove(n);
				}
			}
		}
	}
	let Z = [];
	function De() {
		let { thickness: n, height: r, sill: i } = re, a = z.width / 2, o = z.depth / 2, s = o - .8, c = (a, o, s, c, l, u) => {
			let d = new e.Group();
			d.name = `wall:${a}`, d.position.set(s, 0, c), d.rotation.y = l, t.add(d), $(d, g.plaster, o, i, n, 0, i / 2, 0), $(d, g.oak, o, .14, .06, 0, .07, n / 2 + .03), $(d, g.oak, o, .06, n + .08, 0, i + .03, 0);
			let f = new e.Group();
			f.position.y = i + .06, f.userData.dynamic = !0, d.add(f);
			let p = r - i - .06, m = Math.max(1, Math.round(o / 6)), h = o / m, _ = 1.5, v = .7;
			$(f, g.plaster, o, v, n, 0, p - v / 2, 0), $(f, g.oak, o + .1, .12, n + .14, 0, p + .06, 0);
			for (let e = 0; e <= m; e++) {
				let t = -o / 2 + e * h, r = e === 0 || e === m ? _ / 2 : _;
				$(f, g.plaster, r, p - v, n, t + (e === 0 ? r / 2 : e === m ? -r / 2 : 0), (p - v) / 2, 0);
			}
			for (let e = 0; e < m; e++) {
				let t = -o / 2 + (e + .5) * h, n = h - _;
				$(f, g.glass, n, p - v, .05, t, (p - v) / 2, 0).renderOrder = 2, $(f, g.oak, .08, p - v, .1, t, (p - v) / 2, 0);
			}
			Te([f], f, `wall:${a}`), Z.push({
				tall: f,
				normal: u,
				at: new e.Vector3(s, 0, c),
				shown: 1
			});
		}, l = n / 2;
		c("back", z.width, 0, -o + l, 0, new e.Vector3(0, 0, -1)), c("left", s + o - n, -a + l, (s - o + n) / 2, Math.PI / 2, new e.Vector3(-1, 0, 0)), c("right", s + o - n, a - l, (s - o + n) / 2, -Math.PI / 2, new e.Vector3(1, 0, 0)), m(0, -o + l, z.width, n), m(-a + l, 0, n, z.depth), m(a - l, 0, n, z.depth);
		let u = new e.Group();
		u.name = "wall:front", u.position.set(0, 0, s), t.add(u);
		let d = 9.14, f = a - n, p = (f - d) / 4;
		for (let e of [-1, 1]) {
			let t = e * (d + f) / 2;
			$(u, g.glass, f - d, 2.9, .05, t, 1.45, 0).renderOrder = 2, $(u, g.oak, f - d, .12, .18, t, 2.96, 0), $(u, g.oak, f - d, .1, .18, t, .05, 0);
			for (let t = 1; t <= 4; t++) $(u, g.oak, .18, 3.02, .18, e * (d + t * p), 1.51, 0);
			m(t, s, f - d, .3);
		}
	}
	let Oe = () => {};
	function Q(e) {
		let t = e.accent ?? V.soft, n = N(e);
		ne(n, e, t, !0), he(n, e), e.desks.forEach((t) => ve(e, t)), j(t, e.position.x, e.position.z, 150), I(e);
	}
	function ke(t) {
		let n = t.elevation ?? 0, { width: r, depth: a } = t.size, o = N(t);
		$(o, g.deck, r, n, a, 0, n / 2, 0);
		let s = 2.6;
		$(o, g.deck, s, n / 2, .7, 0, n / 4, a / 2 + .35);
		let { x: c, z: l } = t.position;
		u.push({
			minX: c - r / 2,
			maxX: c + r / 2,
			minZ: l - a / 2,
			maxZ: l + a / 2,
			height: n
		}), u.push({
			minX: c - s / 2,
			maxX: c + s / 2,
			minZ: l + a / 2,
			maxZ: l + a / 2 + .7,
			height: n / 2
		});
		let d = .3;
		m(c, l - a / 2, r, d), m(c - r / 2, l, d, a), m(c + r / 2, l, d, a);
		let f = (r - s) / 2;
		m(c - (s + f) / 2, l + a / 2, f, d), m(c + (s + f) / 2, l + a / 2, f, d);
		let p = new e.BoxGeometry(1, 1, 1, 48, 1, 1), _ = p.getAttribute("position"), y = new Float32Array(_.count * 3), b = new e.Color();
		for (let e = 0; e < _.count; e++) {
			ze(_.getX(e) + .5, b);
			let t = Re(`#${b.getHexString()}`);
			y.set([
				t.r,
				t.g,
				t.b
			], e * 3);
		}
		p.setAttribute("color", new e.BufferAttribute(y, 3));
		let x = new e.Mesh(p, new e.MeshBasicMaterial({ vertexColors: !0 }));
		x.scale.set(r + .06, .045, a + .06), x.position.y = n - .06, o.add(x);
		let S = .1, C = -2.2, w = new e.Group();
		w.position.set(S, n, C), $(w, g.body, 1.3, .14, 1.3, 0, .07, 0), $(w, g.body, 1, .1, 1, 0, .19, 0);
		let T = new e.Group();
		T.position.set(S, n + .245, C), He(T, v(V.pink), .8, .8, 0, .05);
		let E = (t, n, r) => new e.LineSegments(new e.EdgesGeometry(new e.BoxGeometry(t, t, t)), new e.LineBasicMaterial({
			color: Re(n, r),
			transparent: !0,
			opacity: .9
		})), D = E(.95, V.lightViolet, .6), O = E(.56, V.pink, .6);
		D.add(O);
		let A = new e.Mesh(Me, v(V.orange, 1.1));
		A.scale.setScalar(.2);
		let M = n + 1.75;
		D.position.set(S, M, C), A.position.set(S, M, C);
		for (let e of [D, A]) e.userData.dynamic = !0;
		o.add(w, T, D, A);
		let P = new e.Mesh(new e.SphereGeometry(.95, 12, 8), new e.MeshBasicMaterial({ visible: !1 }));
		P.position.set(S, M, C), o.add(P), k = {
			position: new e.Vector3(c + S, n + .3, l + C),
			pick: P
		}, h(c + S, l + C, .66), i.push((e) => {
			let t = Math.sin(e * .9) * .06;
			D.position.y = M + t, A.position.y = M + t, D.rotation.set(Math.sin(e * .23) * .3, e * .35, 0), O.rotation.set(e * .5, -e * .8, 0), A.rotation.set(e * .4, -e * .6, 0);
		}), t.desks.forEach((e) => ve(t, e)), j(null, t.position.x, t.position.z, 165, 13), I(t);
	}
	function Ae(t) {
		let n = t.accent ?? V.white, r = N(t);
		ne(r, t, n, !1, .72), t.desks.forEach((e) => ve(t, e));
		let o = document.createElement("canvas");
		o.width = 1024, o.height = 512;
		let s = o.getContext("2d"), l = new e.CanvasTexture(o);
		l.colorSpace = e.SRGBColorSpace, l.anisotropy = 8;
		let u = () => {
			qe(s, o.width, o.height, c), l.needsUpdate = !0;
		};
		u(), a.push(u), Oe = u;
		let d = new e.MeshBasicMaterial({
			map: l,
			color: new e.Color(1.7, 1.7, 1.7),
			transparent: !0,
			opacity: .92,
			blending: e.AdditiveBlending,
			depthWrite: !1,
			side: e.DoubleSide
		}), f = new e.Mesh(Ne, d), p = -1.5, h = 2.75;
		f.scale.set(4.4, 2.2, 1), f.position.set(0, h, p), f.renderOrder = 4, f.userData.dynamic = !0, r.add(f);
		let g = new e.Mesh(Ne, new e.MeshBasicMaterial({
			color: V.void,
			transparent: !0,
			opacity: .62,
			depthWrite: !1,
			side: e.DoubleSide
		}));
		g.scale.copy(f.scale), g.renderOrder = 3, f.add(g), g.scale.set(1, 1, 1), g.position.z = -.004, $(r, v(V.pink), 4.4, .04, .1, 0, .03, p), m(t.position.x, t.position.z + p, 4.4, .2), i.push((e) => {
			f.position.y = h + Math.sin(e * .8) * .04;
			let t = Math.sin(e * 1.7) + Math.sin(e * 4.3 + 1);
			d.opacity = t > 1.88 ? .7 : .92;
		}), I(t);
	}
	function Pe(t) {
		let n = t.accent ?? V.soft, { width: r, depth: i } = t.size, a = N(t), o = new e.MeshPhysicalMaterial({
			color: "#ffffff",
			transparent: !0,
			opacity: .07,
			roughness: .08,
			metalness: 0,
			clearcoat: 1,
			side: e.DoubleSide,
			depthWrite: !1
		}), s = (e, t, n, r, i, s) => {
			$(a, o, e, t, n, r, i, s).renderOrder = 2;
		}, { x: c, z: l } = t.position, u = .2;
		s(r, 3, .02, 0, 3 / 2, -i / 2), s(r, 3, .02, 0, 3 / 2, i / 2), s(.02, 3, i, -r / 2, 3 / 2, 0), s(r, .02, i, 0, 3, 0), m(c, l - i / 2, r, u), m(c, l + i / 2, r, u), m(c - r / 2, l, u, i);
		let d = t.door?.width ?? 0, f = 2.2, p = (i - d) / 2;
		for (let e of [-1, 1]) {
			let t = e * (d / 2 + p / 2);
			s(.02, 3, p, r / 2, 3 / 2, t), m(c + r / 2, l + t, u, p);
		}
		d > 0 && s(.02, .7999999999999998, d, r / 2, 2.6, 0);
		let _ = v(n, .6);
		He(a, _, r, i, .02, .06), He(a, _, r, i, 3, .05);
		for (let e of [-1, 1]) for (let t of [-1, 1]) $(a, _, .05, 3, .05, e * r / 2, 3 / 2, t * i / 2);
		d > 0 && ($(a, _, .05, f, .05, r / 2, f / 2, -d / 2), $(a, _, .05, f, .05, r / 2, f / 2, d / 2), $(a, _, .05, .05, d, r / 2, f, 0)), $(a, g.oak, 3.4, .12, 2.2, 0, .72, 0), $(a, g.oak, 2.2, .12, 3.4, 0, .72, 0), $(a, _, 3.44, .03, 2.24, 0, .65, 0), $(a, _, 2.24, .03, 3.44, 0, .65, 0), $(a, g.body, .9, .66, .9, 0, .33, 0), h(c, l, 1.7);
		for (let e of t.spots ?? []) {
			let t = $(a, g.soft, .5, .46, .5, e.position.x, .23, e.position.z);
			t.rotation.y = Math.atan2(e.position.x, e.position.z);
		}
		j(null, t.position.x, t.position.z, 110), I(t);
	}
	function Fe(t) {
		let { width: n, depth: r } = t.size, a = N(t);
		He(a, g.dimLine, n, r, .02, .06), $(a, g.soft, 6.6, .42, 1.25, -.4, .21, -1.6), $(a, g.soft, 6.6, .85, .3, -.4, .425, -2.35), $(a, g.soft, 1.25, .42, 3, 3.3, .21, .6), $(a, g.soft, .3, .85, 3, 4.05, .425, .6), $(a, g.body, 1.8, .3, .8, -.4, .15, .5), $(a, g.oak, 2.2, .06, 1.2, -.4, .33, .5), $(a, g.soft, .9, .4, .9, -3.2, .2, 1.5), $(a, g.soft, .9, .4, .9, -1.1, .2, 2.3);
		let { x: o, z: s } = t.position;
		m(o - .4, s - 1.75, 6.6, 1.55), m(o + 3.45, s + .6, 1.55, 3), m(o - .4, s + .5, 2.2, 1.2), m(o - 4.7, s - 2.4, .3, .3);
		let c = 3.05;
		$(a, g.oak, 2.8, .42, .5, -.4, .21, c), $(a, g.body, 2.84, .06, .54, -.4, .45, c), $(a, g.body, .5, .1, .3, -.4, .53, c), $(a, g.body, 2.3, 1.32, .1, -.4, 1.24, c), m(o - .4, s + c, 2.9, .6);
		let l = document.createElement("canvas");
		l.width = 96, l.height = 54;
		let u = new e.CanvasTexture(l);
		u.colorSpace = e.SRGBColorSpace, u.magFilter = e.NearestFilter;
		let d = new e.Mesh(Ne, new e.MeshBasicMaterial({ map: u }));
		d.scale.set(2.16, 1.2, 1), d.position.set(-.4, 1.24, 2.9979999999999998), d.rotation.y = Math.PI, d.userData.dynamic = !0, a.add(d);
		let f = -1;
		i.push((e) => {
			let t = Math.floor(e * 8);
			t !== f && (f = t, Ze(l.getContext("2d"), l.width, l.height, t), u.needsUpdate = !0);
		}), $(a, g.screenOff, .42, .08, .3, .5, .52, c), $(a, v(V.green, .9), .05, .02, .02, .36, .53, 2.895);
		for (let [t, n] of [[-.85, "#f4f4f6"], [.05, "#26262b"]]) {
			let r = new e.Group();
			r.position.set(t, .385, .42), r.rotation.y = t < -.4 ? .3 : -.25, $(r, new e.MeshStandardMaterial({
				color: n,
				roughness: .6
			}), .3, .05, .16, 0, 0, 0), $(r, new e.MeshStandardMaterial({
				color: n,
				roughness: .6
			}), .07, .05, .1, -.12, -.005, .1), $(r, new e.MeshStandardMaterial({
				color: n,
				roughness: .6
			}), .07, .05, .1, .12, -.005, .1), $(r, g.screenOff, .05, .02, .05, -.08, .03, -.01), $(r, new e.MeshBasicMaterial({ color: V.pink }), .03, .02, .03, .07, .03, .01), $(r, new e.MeshBasicMaterial({ color: V.lightViolet }), .03, .02, .03, .11, .03, -.03), a.add(r);
		}
		$(a, g.body, .06, 1.5, .06, -4.7, .75, -2.4), $(a, v(V.peach, .75), .26, .3, .26, -4.7, 1.65, -2.4), j(V.peach, t.position.x, t.position.z, 80), I(t);
	}
	let Be = !1;
	function Ge(e) {
		let { width: t, depth: n } = e.size, { x: r, z: a } = e.position, o = N(e);
		He(o, g.dimLine, t, n, .02, .06);
		let s = (e, t, n, r, i, a, s) => $(o, X(e), t, n, r, i, a + n / 2, s), c = "#8e8e99", l = "#dedbd2", u = -3.7;
		$(o, g.body, 6.6, 1, .62, -.3, .5, u), $(o, g.oak, 6.7, .06, .7, -.3, 1.03, u), $(o, g.slat, 6.6, 1.55, .08, -.3, 1.83, -4);
		for (let e of [1.62, 2.18]) $(o, g.oak, 6.5, .05, .34, -.3, e, -3.8000000000000003), $(o, v(V.peach, .8), 6.3, .025, .03, -.3, e - .04, -3.6500000000000004);
		$(o, g.oak, 6.8, .1, .42, -.3, 2.66, -3.8200000000000003), m(r - .3, a + u - .05, 6.8, .9);
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
		s("#1c1c20", .24, .42, .26, -1.55, 1.06, u), s("#5a3a22", .18, .16, .18, -1.55, 1.48, u), s("#1c1c20", .95, 1.95, .7, 3.6, 0, u), $(o, v("#cfe6ff", .5), .75, 1.5, .02, 3.6, 1.05, -3.3400000000000003);
		for (let e = 0; e < 4; e++) for (let t = 0; t < 5; t++) s([
			"#b5432e",
			"#2c8a86",
			"#c2962a"
		][(e + t) % 3], .09, .15, .03, 3.33 + t * .135, .42 + e * .36, -3.325);
		m(r + 3.6, a + u, 1, .8), $(o, g.body, 6.6, .96, .7, 0, .48, -2), $(o, g.slat, 6.6, .8, .04, 0, .5, -1.63), $(o, g.oak, 6.9, .08, .9, 0, 1, -2), $(o, v(V.peach, .9), 6.4, .03, .04, 0, .05, -1.6), m(r, a + -2, 6.9, .95);
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
		]) $(o, g.body, .02, 1.1, .02, e, 3.15, -2), $(o, g.body, .3, .16, .3, e, 2.56, -2), $(o, v(V.peach, 1), .2, .04, .2, e, 2.46, -2);
		for (let t of e.spots ?? []) {
			if (!t.id.includes("stool")) continue;
			let { x: e, z: n } = t.position;
			$(o, g.body, .4, .04, .4, e, .02, n), $(o, g.body, .1, .48, .1, e, .26, n), $(o, g.soft, .5, .1, .5, e, .53, n);
		}
		let f = U, p = f.height;
		$(o, X("#1f5f8a"), f.length, .06, f.width, f.x, p - .03, f.z);
		for (let e of [-1, 1]) s(l, f.length, .004, .035, f.x, p, f.z + e * (f.width / 2 - .02));
		for (let e of [-1, 1]) s(l, .035, .004, f.width, f.x + e * (f.length / 2 - .02), p, f.z);
		s(l, f.length, .004, .02, f.x, p, f.z), s(l, .02, .17, f.width + .16, f.x, p, f.z);
		for (let e of [-1, 1]) s("#1c1c20", .04, .2, .04, f.x, p, f.z + e * (f.width / 2 + .08));
		for (let e of [-1, 1]) {
			for (let t of [-1, 1]) $(o, g.body, .08, p - .06, .08, f.x + e * (f.length / 2 - .3), (p - .06) / 2, f.z + t * (f.width / 2 - .25));
			let t = s("#b5432e", .17, .02, .17, f.x + e * 1.2, p, f.z + e * .45);
			t.rotation.y = .5 * e;
			let n = s("#a87a4b", .035, .02, .13, f.x + e * 1.26, p, f.z + e * .45 + .14);
			n.rotation.y = .5 * e;
		}
		m(r + f.x, a + f.z, f.length, f.width);
		let h = $(o, X("#f2efe8"), .07, .07, .07, f.x - .6, p + .035, f.z + .3);
		h.userData.dynamic = !0, i.push((e) => {
			if (!Be) {
				h.position.set(f.x - .6, p + .035, f.z + .3);
				return;
			}
			let t = e / .8, n = Math.cos(t * Math.PI), r = t - Math.floor(t);
			h.position.set(f.x + n * (f.length / 2 + .25), p + .06 + Math.abs(Math.sin(r * Math.PI * 2)) * .34, f.z + Math.sin(t * 1.9) * .45);
		}), I(e);
	}
	for (let t of ae) {
		switch (t.kind) {
			case "executive":
				ke(t);
				break;
			case "coordinator":
				Ae(t);
				break;
			case "department":
				Q(t);
				break;
			case "meeting":
				d = {
					x: t.position.x,
					z: t.position.z,
					by: de(t)
				}, Pe(t);
				break;
			case "cafe":
				Ge(t);
				break;
			case "lounge": d = {
				x: t.position.x,
				z: t.position.z,
				by: de(t)
			}, Fe(t);
		}
		d = null;
		let n = o.get(C), r = t.kind === "executive" && n ? n.seat.clone() : t.kind === "lounge" ? new e.Vector3(t.position.x - .4 * de(t), 0, t.position.z + .5 * de(t)) : new e.Vector3(t.position.x, t.elevation ?? 0, t.position.z);
		for (let n of t.spots ?? []) {
			let i = fe(t, n), a = t.kind === "cafe" ? n.id.includes("pong") ? new e.Vector3(t.position.x + U.x, 0, t.position.z + U.z) : new e.Vector3(i.x, 0, i.z - 4) : r;
			s.set(n.id, {
				spotId: n.id,
				zoneId: t.id,
				position: new e.Vector3(i.x, i.y, i.z),
				posture: n.posture ?? "sit",
				focus: a
			});
		}
	}
	let Ke = new e.Group();
	Ke.name = "review-tray";
	let $e = new e.MeshBasicMaterial({ color: Re(V.orange, 1.15) }), rt = We("", "review-label", V.orange), it = new e.Mesh(Me, new e.MeshBasicMaterial({ visible: !1 })), at = new e.Mesh(new e.OctahedronGeometry(.11), $e), ot = 0, st = !1;
	{
		let n = o.get("exec.ceo");
		if (n) {
			let { height: r } = K({
				id: "exec.ceo",
				role: "",
				position: {
					x: 0,
					z: 0
				},
				size: "executive"
			});
			Ke.position.copy(n.position), Ke.rotation.y = n.rotation, Ke.scale.setScalar(B);
			let a = new e.Group();
			a.name = "review-pile", a.position.set(.72, r, .34), Ke.add(a), it.scale.set(.62, .7, .5), it.position.set(.72, r + .3, .34), at.position.set(.72, r + .62, .34), rt.position.set(.72, r + .9, .34), Ke.add(it, at, rt), Ke.visible = !1, t.add(Ke), i.push((e) => {
				if (!Ke.visible) return;
				at.rotation.y = e * 1.6, at.position.y = r + .62 + Math.sin(e * 2.2) * .05;
				let t = 1 + Math.sin(e * (st ? 5.5 : 3.1)) * (st ? .22 : .12);
				$e.color.copy(Re(st ? V.alert : V.orange, 1.15)).multiplyScalar(t);
			});
		}
	}
	function ct(t, n = !1) {
		let r = Ke.getObjectByName("review-pile");
		if (!r) return;
		ot = t.length, st = n, Ke.visible = ot > 0, r.clear(), t.slice(0, 5).forEach((t, n) => {
			let i = new e.Group();
			i.position.y = n * .038, i.rotation.y = n * 37 % 7 * .09 - .25, $(i, X("#d99a3a"), .36, .03, .26, 0, .015, 0), $(i, X("#e8b45a"), .13, .03, .035, -.09, .015, -.145), $(i, $e, .37, .008, .27, 0, .034, 0), $(i, X("#dedbd2"), .3, .006, .2, .01, .031, .01), r.add(i);
		});
		let i = rt.element;
		i.textContent = `${ot === 1 ? `${t[0]} · ` : `${ot} `}${n ? "needs attention" : "for review"}`, i.dataset.troubled = String(n);
	}
	W.forEach(be), G.forEach(Se), Ce(-10, -11, "west"), Ce(10, -11, "east"), we(13.6, 14.4, 4.4), De(), R(), te();
	let lt = L();
	if (!k) throw Error("The layout has no executive zone, so there is no company core");
	if (J.length > 0) {
		let n = new e.InstancedMesh(Me, g.slat, J.length);
		J.forEach((e, t) => n.setMatrixAt(t, e)), n.instanceMatrix.needsUpdate = !0, n.computeBoundingSphere(), n.name = "slat-walls", t.add(n);
	}
	t.updateMatrixWorld(!0), Te(t.children.filter((e) => /^(zone|desk|banner|plant|planter|bench|shelving|entrance|monument|vending|wall):/.test(`${e.name}:`)), t, "office");
	let ut = /^outdoors:(grass|road|walk|sand|wetSand|sea|line|hill|ridge\w+)$/;
	return t.traverse((e) => {
		let t = e;
		if (!t.isMesh || Array.isArray(t.material) || t.isInstancedMesh) return;
		let n = t.material;
		if (!n.isMeshStandardMaterial) return;
		let r = !1;
		for (let e = t; e; e = e.parent) e.name === "outdoors" && (r = !0);
		(!r || t.name.startsWith("outdoors:")) && (t.receiveShadow = !0, t.castShadow = !n.transparent && n.visible && !ut.test(t.name));
	}), {
		scene: t,
		fog: r,
		desks: o,
		spots: s,
		obstacles: l,
		core: k,
		vending: { dock: lt },
		setDeskScreen: pe,
		floorHeightAt(e, t) {
			let n = 0;
			for (let r of u) e >= r.minX && e <= r.maxX && t >= r.minZ && t <= r.maxZ && (n = Math.max(n, r.height));
			return n;
		},
		setMissions(e) {
			c = e, Oe();
		},
		update(e, t) {
			for (let t of i) t(e);
			for (let e of Z) {
				let n = (t.position.x - e.at.x) * e.normal.x + (t.position.z - e.at.z) * e.normal.z > 0 ? 0 : 1;
				e.shown !== n && (e.shown += Math.sign(n - e.shown) * Math.min(Math.abs(n - e.shown), .08), e.tall.visible = e.shown > .01, e.tall.scale.y = Math.max(e.shown, .001), w = !0);
			}
		},
		setSky(n) {
			let { daylight: i, warmth: a } = n;
			nt.lerpColors(tt.night, tt.day, i).lerp(tt.golden, a * .55 * Math.min(1, i * 3)), t.background.copy(nt), r.color.copy(nt), x.color.lerpColors(tt.roomLight, tt.dayLight, i).lerp(tt.goldenLight, a * .5 * i), x.groundColor.lerpColors(tt.roomBounce, tt.dayBounce, i), x.intensity = e.MathUtils.lerp(1.2, 2.15, i), S.position.set(Math.cos(n.sunAngle) * 78 + 26, Math.sin(n.sunAngle) * 62 + 8, 92).multiplyScalar(2.4).add(S.target.position), S.color.lerpColors(tt.sunNoon, tt.sunLow, a), S.intensity = i * e.MathUtils.lerp(5.3, 2.5, a), i > .02 && T.angleTo(S.position) > .006 && (T.copy(S.position), w = !0), S.castShadow = i > .02, E.position.copy(S.position).sub(S.target.position).normalize().multiplyScalar(640), E.material.color.lerpColors(tt.sunNoon, tt.sunLow, a), E.material.opacity = Math.min(1, i * 1.6), E.visible = i > .02;
			let o = e.MathUtils.lerp(1, .22, i) * (1 - e.MathUtils.smoothstep(i, .8, .96)), s = i < .96;
			for (let { light: e, base: t } of D) e.intensity = t * o, e.visible = s;
			for (let t of O) t.color.setScalar(e.MathUtils.lerp(.62, 1, i));
			let c = Y(i);
			for (let { material: e, on: t, off: n } of _.values()) e.color.lerpColors(n, t, c);
			for (let e of y.values()) e.opacity = .06 * c;
			M.setDaylight(i);
		},
		redrawText() {
			for (let e of a) e();
		},
		setPong(e) {
			Be = e;
		},
		setReviews: ct,
		reviewTargets: () => ot > 0 ? [it] : [],
		shadowsStale() {
			let e = w;
			return w = !1, e;
		}
	};
}
// src/agents.ts
var it = .78, at = {
	width: .4,
	height: .56,
	depth: .22
}, ot = {
	width: .15,
	length: .52,
	depth: .15
}, st = {
	wood: new e.MeshStandardMaterial({
		color: "#b98a54",
		roughness: .8
	}),
	rubber: new e.MeshStandardMaterial({
		color: "#c8372d",
		roughness: .7
	})
}, ct = .18, lt = .024, ut = 1.75, dt = 22, ft = new e.BoxGeometry(1, 1, 1), pt = ft, mt = new e.RingGeometry(.66, .76, 48), ht = new e.MeshBasicMaterial({ visible: !1 }), gt = () => new e.MeshStandardMaterial({
	color: "#1a1a1f",
	roughness: .9,
	metalness: 0,
	flatShading: !0
}), _t = new e.MeshStandardMaterial({
	color: "#101014",
	roughness: .4,
	metalness: .2
}), vt = {
	idle: .28,
	working: 1,
	collaborating: .9,
	blocked: 1,
	reporting: 1
};
function yt(e, t, n, r) {
	return e + (t - e) * (1 - Math.exp(-n * r));
}
function bt(e, t, n, r) {
	return e + Math.atan2(Math.sin(t - e), Math.cos(t - e)) * (1 - Math.exp(-n * r));
}
var xt = (e) => e * e * (3 - 2 * e);
function St(t, n, r, i, a, o, s) {
	let c = new e.Mesh(n, i);
	c.scale.set(a[0] + s, a[1] + s, a[2] + s), c.position.set(...o);
	let l = new e.Mesh(n, r);
	l.scale.set(...a), l.position.set(...o), t.add(c, l);
}
function Ct(t, n, r, i, a, o, s) {
	let c = new e.Group();
	if (c.position.set(r, i, 0), St(c, ft, o, n, a, [
		0,
		-a[1] / 2,
		0
	], lt * 2), s) {
		let t = new e.Mesh(ft, s);
		t.scale.set(a[0] + .006, .13, a[2] + .006), t.position.set(0, -a[1] + .062, 0), c.add(t);
	}
	return t.add(c), c;
}
var wt = .184;
function Tt(t, n, r) {
	if (t.clear(), n === "bald") return;
	let i = (n, i, a, o, s, c) => {
		let l = new e.Mesh(ft, r);
		l.scale.set(n, i, a), l.position.set(o, s, c), t.add(l);
	}, a = .39, o = -.192;
	if (n === "curly") i(.49, .22, .49, 0, .41000000000000003, 0), i(.49, .2, .09, 0, .23, -.212);
	else {
		if (i(a, .11, a, 0, .37, 0), i(a, .06, .03, 0, .335, .188), n === "short" && i(a, .2, .05, 0, .26, o), n === "long") {
			i(a, .46, .07, 0, .15000000000000002, -.202);
			for (let e of [-1, 1]) i(.05, .36, .3, e * .194, .19, -.04);
		}
		n === "bun" && (i(a, .16, .05, 0, .28, o), i(.15, .15, .15, 0, .47000000000000003, -.07)), n === "ponytail" && (i(a, .16, .05, 0, .28, o), i(.1, .34, .1, 0, .17, -.262));
	}
}
function Et(e, t, n) {
	let { look: r } = e;
	r.skin.color.set(t.skin), r.top.color.set(t.top), r.bottom.color.set(t.bottom), r.hairColor.color.set(t.hairColor), Tt(r.hair, t.hair, r.hairColor), r.glasses.visible = t.glasses, r.beard.visible = t.beard;
	let i = t.build === "feminine", a = n * B;
	e.root.scale.set(a * (i ? .9 : 1), a * (i ? .96 : 1), a * (i ? .9 : 1));
}
function Dt(n, r, i) {
	let a = new e.MeshBasicMaterial({
		color: "#000000",
		side: e.BackSide
	}), o = new e.MeshBasicMaterial({ color: "#000000" }), s = gt(), c = gt(), l = gt(), u = gt(), d = new e.Group();
	d.name = `agent:${n.id}`;
	let f = new e.Group();
	d.add(f), St(f, ft, c, a, [
		at.width,
		at.height,
		at.depth
	], [
		0,
		it + at.height / 2,
		0
	], lt * 2);
	let p = [Ct(f, a, -.1, it, [
		.18,
		it,
		.18
	], l), Ct(f, a, .1, it, [
		.18,
		it,
		.18
	], l)], m = at.width / 2 + ot.width / 2 + .012, h = [Ct(f, a, -m, it + at.height - .04, [
		ot.width,
		ot.length,
		ot.depth
	], c, s), Ct(f, a, m, it + at.height - .04, [
		ot.width,
		ot.length,
		ot.depth
	], c, s)], g = new e.Group(), _ = new e.Mesh(ft, st.wood);
	_.scale.set(.04, .13, .04), _.position.y = -.05;
	let v = new e.Mesh(ft, st.rubber);
	v.scale.set(.19, .2, .03), v.position.y = -.21, g.add(_, v), g.position.set(0, -ot.length + .02, .03), g.visible = !1, h[1].add(g);
	let y = new e.Group();
	y.position.set(0, it + at.height, 0), f.add(y), St(y, pt, s, a, [
		ct * 2,
		ct * 2,
		ct * 2
	], [
		0,
		.21,
		0
	], lt * 2);
	for (let t of [-1, 1]) {
		let n = new e.Mesh(ft, o);
		n.scale.set(.07, .07, .03), n.position.set(t * .08, .25, wt), y.add(n);
	}
	let b = new e.Group();
	y.add(b);
	let x = new e.Group();
	for (let t of [-1, 1]) {
		let n = new e.Mesh(ft, _t);
		n.scale.set(.125, .115, .016), n.position.set(t * .08, .25, .176), x.add(n);
	}
	let S = new e.Mesh(ft, _t);
	S.scale.set(.05, .025, .016), S.position.set(0, .265, .176), x.add(S), y.add(x);
	let C = new e.Mesh(ft, u);
	C.scale.set(.38, .13, .05), C.position.set(0, .1, .16799999999999998), y.add(C);
	let w = null;
	if (i) {
		let t = new e.TorusGeometry(.27, .016, 6, 64), n = t.getAttribute("position"), r = new Float32Array(n.count * 3), i = new e.Color();
		for (let e = 0; e < n.count; e++) {
			let t = (Math.atan2(n.getY(e), n.getX(e)) / Math.PI + 1) / 2;
			ze(1 - Math.abs(t * 2 - 1), i);
			let a = Re(`#${i.getHexString()}`);
			r.set([
				a.r,
				a.g,
				a.b
			], e * 3);
		}
		t.setAttribute("color", new e.BufferAttribute(r, 3)), w = new e.Mesh(t, new e.MeshBasicMaterial({ vertexColors: !0 })), w.rotation.x = Math.PI / 2, w.position.y = .56, y.add(w);
	}
	let T = new e.MeshBasicMaterial({
		color: Re(V.alert),
		transparent: !0,
		opacity: 0,
		blending: e.AdditiveBlending,
		depthWrite: !1,
		side: e.DoubleSide
	}), E = new e.Mesh(mt, T);
	E.rotation.x = -Math.PI / 2, E.position.y = .05, E.visible = !1, d.add(E);
	let D = new e.Mesh(ft, ht);
	D.scale.set(1, 2, 1), D.position.y = 1, D.userData.agentId = n.id, d.add(D);
	let O = document.createElement("div");
	O.className = "agent-tag", O.style.setProperty("--accent", r);
	let k = document.createElement("span");
	k.className = "agent-name";
	let A = document.createElement("span");
	A.textContent = n.name, k.append(A);
	let j = document.createElement("span");
	j.className = "agent-badge", k.append(j);
	let M = document.createElement("span");
	M.className = "agent-sub", O.append(k, M);
	let N = new t(O);
	N.center.set(.5, 1), N.position.y = ct * 2 + (i ? .42 : .26), y.add(N);
	let P = document.createElement("div");
	P.className = "agent-zzz", P.setAttribute("aria-hidden", "true");
	for (let e = 0; e < 3; e++) P.append(Object.assign(document.createElement("span"), { textContent: "z" }));
	let F = new t(P);
	return F.center.set(0, 1), F.position.set(.16, .41, 0), y.add(F), {
		root: d,
		body: f,
		legs: p,
		arms: h,
		bat: g,
		head: y,
		outline: a,
		glow: o,
		ring: E,
		ringMaterial: T,
		halo: w,
		look: {
			skin: s,
			top: c,
			bottom: l,
			hairColor: u,
			hair: b,
			glasses: x,
			beard: C,
			name: A
		},
		tag: O,
		zzz: P,
		badge: j,
		sub: M,
		pick: D
	};
}
var Ot = (() => {
	let t = new e.BoxGeometry(1, 1, 1, 1, 1, 24), n = t.getAttribute("position"), r = new Float32Array(n.count * 3), i = new e.Color();
	for (let e = 0; e < n.count; e++) {
		ze(n.getZ(e) + .5, i);
		let t = Re(`#${i.getHexString()}`);
		r.set([
			t.r,
			t.g,
			t.b
		], e * 3);
	}
	return t.setAttribute("color", new e.BufferAttribute(r, 3)), t;
})();
function kt() {
	let t = new e.BufferGeometry();
	t.setAttribute("position", new e.BufferAttribute(/* @__PURE__ */ new Float32Array(132), 3).setUsage(e.DynamicDrawUsage)), t.setAttribute("color", new e.BufferAttribute(/* @__PURE__ */ new Float32Array(132), 3).setUsage(e.DynamicDrawUsage));
	let n = [];
	for (let e = 0; e < 21; e++) {
		let t = e * 2;
		n.push(t, t + 1, t + 2, t + 1, t + 3, t + 2);
	}
	t.setIndex(n), t.setDrawRange(0, 0);
	let r = new e.Mesh(t, new e.MeshBasicMaterial({
		vertexColors: !0,
		blending: e.AdditiveBlending,
		transparent: !0,
		depthWrite: !1,
		side: e.DoubleSide
	}));
	return r.frustumCulled = !1, r.renderOrder = 1, r;
}
function At(t, n, r = {}) {
	let i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = r.instant ?? (() => !1), s = Math.max(1, r.pace ?? 1);
	function c(e) {
		return {
			key: `desk:${e.deskId}`,
			point: e.seat.clone(),
			posture: "sit",
			heading: e.rotation + Math.PI,
			exclusive: !1
		};
	}
	function l(e) {
		return {
			key: `spot:${e.spotId}`,
			point: e.position.clone(),
			posture: e.posture,
			heading: Math.atan2(e.focus.x - e.position.x, e.focus.z - e.position.z),
			exclusive: !0
		};
	}
	function u(t, r) {
		let i = r.rotation + Math.PI, o = new e.Vector3(Math.cos(i), 0, -Math.sin(i)), s = new e.Vector3(-Math.sin(i), 0, -Math.cos(i)), c = null, l = Infinity;
		for (let e of [-1, 1]) {
			let i = `beside:${r.deskId}:${e}`, u = a.get(i);
			if (u && u !== t.profile.id) continue;
			let d = r.seat.clone().addScaledVector(o, e * 1.05).addScaledVector(s, .2), f = d.distanceTo(t.rig.root.position) + (n.isBlocked(d.x, d.z) ? 100 : 0);
			f < l && (l = f, c = {
				key: i,
				point: d,
				posture: "stand",
				heading: Math.atan2(r.seat.x - d.x, r.seat.z - d.z),
				exclusive: !0
			});
		}
		return c ?? t.home;
	}
	function d(e, n) {
		let r = null;
		for (let i of t.spots.values()) {
			if (i.zoneId !== e) continue;
			let t = a.get(`spot:${i.spotId}`);
			if (t === n.profile.id) return l(i);
			!t && !r && (r = i);
		}
		return r ? l(r) : null;
	}
	function f(e, n) {
		if (n === e.profile.id) return e.home;
		let r = t.desks.get(n);
		if (r) return u(e, r);
		let i = t.spots.get(n);
		if (i) {
			let t = a.get(`spot:${i.spotId}`);
			return !t || t === e.profile.id ? l(i) : d(i.zoneId, e);
		}
		return d(n, e);
	}
	function p(e, t, n, r = o()) {
		t.key !== e.destination.key && (a.get(e.destination.key) === e.profile.id && a.delete(e.destination.key), t.exclusive && a.set(t.key, e.profile.id), e.destination = t, e.arrived = !1, e.path = null, e.trailOn = n, r && (e.rig.root.position.copy(t.point), e.arrived = !0, e.sit = +(t.posture === "sit"), e.heading = e.wantHeading = t.heading));
	}
	function m(e) {
		let { tag: t, badge: n, sub: r } = e.rig;
		t.dataset.state = e.state, t.dataset.active = String(e.state !== "idle");
		let i = e.state === "blocked" && !!e.task?.startsWith("Waiting for Stephen");
		t.dataset.needsYou = String(i);
		let a = i ? "needs you" : "blocked";
		n.textContent = e.state === "idle" ? "idle" : e.state === "blocked" ? e.missionId ? `${e.missionId} ${a}` : a : e.missionId ?? "busy", r.textContent = e.task ?? e.profile.role, r.classList.toggle("is-task", e.task !== null);
	}
	function h(e, t, n, r, i = o()) {
		e.breakLeft = 0, e.idleFor = 0, e.state = t, e.task = t === "idle" ? null : n, e.at = r && r !== e.profile.id ? r : void 0;
		let a = e.at ? f(e, e.at) : null;
		a ||= t === "reporting" && e.profile.id !== "exec.chief-of-staff" ? d("executive", e) ?? e.home : e.home, p(e, a, t === "collaborating" || t === "reporting", i), m(e);
	}
	function g(e, t, n) {
		t && t !== e.name && (e.name = t, e.rig.look.name.textContent = t), n && (e.appearance = n, Et(e.rig, n, e.profile.id === "exec.chief-of-staff" ? 1.08 : 1));
	}
	let _ = () => 110 + Math.random() * 90, v = () => 150 + Math.random() * 240, y = (e) => !e.profile.human && e.profile.id !== "exec.chief-of-staff", b = (e) => y(e) && e.state === "idle" && !e.at && e.breakLeft === 0 && e.arrived && e.destination.key === e.home.key;
	function S(e) {
		let n = [...t.spots.values()].filter((t) => e(t.spotId) && !a.has(`spot:${t.spotId}`));
		return n.length > 0 ? l(n[Math.floor(Math.random() * n.length)]) : null;
	}
	function w(e, t, n) {
		p(e, t, !1), e.breakLeft = n, e.idleFor = 0, e.breakAfter = v();
	}
	function E(e) {
		let n = 0;
		for (let e of i.values()) e.breakLeft > 0 && (n += 1);
		for (let t of i.values()) {
			if (!y(t)) continue;
			if (t.breakLeft > 0) {
				if (!t.arrived) continue;
				t.breakLeft -= e, t.breakLeft <= 0 && (t.breakLeft = 0, p(t, t.home, !1));
				continue;
			}
			if (!b(t) || (t.idleFor += e, t.idleFor < t.breakAfter || n >= 5 || o())) continue;
			let r = Math.random();
			if (r < .3 && n + 2 <= 5) {
				let e = [...i.values()].find((e) => e !== t && b(e) && e.idleFor > 45), r = S((e) => e === "cafe.pong-1"), a = S((e) => e === "cafe.pong-2");
				if (e && r && a) {
					let i = 80 + Math.random() * 70;
					w(t, r, i), w(e, a, i), n += 2;
					continue;
				}
			}
			let a = S(r < .68 ? (e) => e.startsWith("cafe.stool") : (e) => e.startsWith("lounge."));
			a ? (w(t, a, 100 + Math.random() * 140), n += 1) : t.idleFor = t.breakAfter - 20;
		}
		t.setPong(["spot:cafe.pong-1", "spot:cafe.pong-2"].every((e) => {
			let t = i.get(a.get(e) ?? "");
			return !!(t && t.arrived && t.destination.key === e);
		}));
	}
	let D = !1, O = null, k = null, A = 50;
	function j() {
		let t = [
			"sales",
			"design",
			"development",
			"content",
			"research"
		], n = [];
		for (let r of t) {
			let t = ae.find((e) => e.id === r);
			if (!t) continue;
			let i = new e.Vector3(t.position.x, 0, t.position.z + t.size.depth / 2 - .7);
			n.push({
				key: `round:${r}`,
				point: i,
				posture: "stand",
				heading: Math.PI,
				exclusive: !1
			});
		}
		let r = ae.find((e) => e.id === "cafe");
		return r && n.push({
			key: "round:cafe",
			point: new e.Vector3(r.position.x - 3.4, 0, r.position.z - .6),
			posture: "stand",
			heading: Math.PI,
			exclusive: !1
		}), n;
	}
	function N(e) {
		let t = [...i.values()].find((e) => e.profile.human);
		if (t) {
			if (k) t.arrived && (k.pause += e, k.pause < 6 || (k.pause = 0, k.index += 1, k.index < k.stops.length ? p(t, k.stops[k.index], !1) : (p(t, t.home, !1), k = null, A = D ? 4 : 200 + Math.random() * 200)));
			else {
				if (A -= e, A > 0 || o()) return;
				let n = j();
				if (n.length === 0) return;
				k = {
					stops: n,
					index: 0,
					pause: 0
				}, p(t, n[0], !1);
			}
		}
	}
	T.forEach((e, n) => {
		let r = t.desks.get(e.id);
		if (!r) {
			console.warn(`[agents] ${e.id} has no desk in layout.ts; skipped.`);
			return;
		}
		let a = e.id === C, o = Dt(e, r.accent, a), s = x(e.id);
		Et(o, s, a ? 1.08 : 1);
		let l = c(r);
		o.root.position.copy(l.point), o.root.rotation.y = l.heading, t.scene.add(o.root), r.label.visible = !1;
		let u = kt();
		t.scene.add(u);
		let d = {
			profile: e,
			name: e.name,
			appearance: s,
			accent: Re(r.accent),
			accentHex: r.accent,
			rig: o,
			home: l,
			state: "idle",
			task: null,
			missionId: null,
			at: void 0,
			speed: ut * (e.id === "exec.project-coordinator" ? 1.25 : 1),
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
			breakAfter: _(),
			breakLeft: 0,
			level: e.human ? .62 : vt.idle,
			alert: 0,
			beam: null,
			beamAmount: 0,
			trail: u,
			trailPoints: [],
			trailOn: !1,
			trailTimer: 0
		};
		i.set(e.id, d), m(d);
	});
	let P = Re(V.alert), F = new e.Color("#15151a"), ee = 1, I = new e.Color(), L = new e.Vector3(), te = new e.Vector3(), R = new e.Vector3();
	function ne(e, r) {
		let i = e.rig.root.position, a = !1;
		if (e.arrived) {
			e.wantHeading = e.destination.heading, O && (e.profile.human || e.profile.id === "exec.chief-of-staff") && (e.wantHeading = Math.atan2(O.x - i.x, O.z - i.z));
			let t = +(e.destination.posture === "sit");
			e.sit = t > e.sit ? Math.min(t, e.sit + r / .35) : Math.max(t, e.sit - r / .35);
		} else if (e.sit > .1) e.sit = Math.max(0, e.sit - r / .3);
		else {
			e.sit = 0, e.path || (e.path = n.findPath(i, e.destination.point), e.leg = 0);
			let t = e.speed * r;
			for (; t > 0 && e.leg < e.path.length;) {
				let n = e.path[e.leg], r = n.x - i.x, a = n.z - i.z, o = Math.hypot(r, a);
				o <= t ? (i.x = n.x, i.z = n.z, t -= o, e.leg += 1) : (i.x += r / o * t, i.z += a / o * t, e.wantHeading = Math.atan2(r, a), t = 0);
			}
			e.stride += e.speed * r * 3.4, a = !0, e.leg >= e.path.length && (e.arrived = !0, e.path = null);
		}
		e.walk = yt(e.walk, +!!a, 10, r), e.heading = bt(e.heading, e.wantHeading, a ? 9 : 6, r), i.y = yt(i.y, t.floorHeightAt(i.x, i.z), 12, r), e.rig.root.rotation.y = e.heading;
	}
	function z() {
		for (let e of i.values()) if (e.state === "reporting" && e.arrived && e.profile.id !== "exec.chief-of-staff") return e;
		return null;
	}
	function B(t, n, r, i) {
		let { rig: a } = t, o = xt(t.sit), s = r + t.phase, c = t.sit > .5, l = 0, u = 0, d = 0, f = 0, p = 0;
		if (t.arrived) switch (t.state) {
			case "working":
				c && (l = -1.12 + Math.sin(s * 11) * .07, u = -1.12 + Math.sin(s * 11 + 2.1) * .07, f = .2, d = Math.sin(s * .5) * .06);
				break;
			case "idle":
				if (l = u = c ? -.32 : 0, d = Math.sin(s * .33) * .32, f = Math.sin(s * .21) * .05, t.destination.key.startsWith("spot:cafe.pong")) {
					let e = Math.cos(r / .8 * Math.PI) * (t.destination.key.endsWith("1") ? -1 : 1);
					u = -.55 - Math.max(0, e) ** 3 * 1.25 + Math.max(0, -e) * .15, l = -.25, d = Math.sin(r / .8 * Math.PI) * .2, f = .12;
				} else t.destination.key.startsWith("spot:cafe.stool") && (l = -.9, u = -.9 - Math.max(0, Math.sin(s * .8)) * 1.1, d = Math.sin(s * .4) * .45);
				break;
			case "collaborating":
				l = c ? -.35 : 0, u = (c ? -.7 : -.45) - Math.max(0, Math.sin(s * 1.9)) * .55, d = Math.sin(s * .7) * .2, f = Math.sin(s * 2.3) * .05;
				break;
			case "blocked":
				l = u = -.12, f = .3, p = .2 + Math.sin(s * 1.3) * .05, d = Math.sin(s * .9) * .12;
				break;
			case "reporting": u = -.5 - Math.max(0, Math.sin(s * 2.1)) * .45;
		}
		let m = !D && t.arrived && t.state === "idle" && c && !t.profile.human && t.profile.id !== "exec.chief-of-staff" && t.destination.key === t.home.key;
		m && (l = u = -2.45, d = 0, f = .45, p = t.phase % 2 > 1 ? .5 : -.5), t.sleep = yt(t.sleep, +!!m, m ? 2.2 : 6, n);
		let h = xt(t.sleep) * (.9 + Math.sin(s * 1.1) * .025);
		if (a.zzz.dataset.on = String(t.sleep > .7), t.profile.id === "exec.chief-of-staff" && i && t.arrived) {
			let n = i.rig.root.position, r = a.root.position, o = Math.atan2(n.x - r.x, n.z - r.z) - t.heading;
			d = e.MathUtils.clamp(Math.atan2(Math.sin(o), Math.cos(o)), -1.15, 1.15), f = 0, l = u = -.32;
		}
		let g = O !== null && t.arrived && (t.profile.human || t.profile.id === "exec.chief-of-staff");
		if (g && O) {
			let n = a.root.position, r = Math.atan2(O.x - n.x, O.z - n.z) - t.heading;
			d = e.MathUtils.clamp(Math.atan2(Math.sin(r), Math.cos(r)), -1.15, 1.15), f = -.08, p = 0, u = -2.75, l = c ? -.32 : 0;
		}
		t.wave = yt(t.wave, +!!g, 7, n), a.arms[1].rotation.z = t.wave * (.35 + Math.sin(s * 8.5) * .4), a.bat.visible = t.arrived && t.walk < .2 && t.destination.key.startsWith("spot:cafe.pong");
		let _ = Math.sin(t.stride) * .62 * t.walk;
		t.armL = yt(t.armL, l, 12, n), t.armR = yt(t.armR, u, 12, n), t.yaw = yt(t.yaw, d, 6, n), t.pitch = yt(t.pitch, f, 6, n), t.roll = yt(t.roll, p, 6, n), a.body.rotation.x = h, a.body.position.z = -.78 * Math.sin(h), a.legs[0].rotation.x = e.MathUtils.lerp(_, -1.45 - h, o), a.legs[1].rotation.x = e.MathUtils.lerp(-_, -1.45 - h, o), a.arms[0].rotation.x = e.MathUtils.lerp(t.armL, -_ * .75, t.walk), a.arms[1].rotation.x = e.MathUtils.lerp(t.armR, _ * .75, t.walk), a.head.rotation.set(t.pitch, t.yaw, t.roll), a.body.position.y = -.28 * o + Math.abs(Math.sin(t.stride)) * .035 * t.walk + it * (1 - Math.cos(h)), a.halo && (a.halo.rotation.z = r * .6, a.halo.position.y = .56 + Math.sin(r * 1.4) * .015);
	}
	function re(e, t, n) {
		let { rig: r } = e, i = Math.sin(n * 2.6), a = vt[e.state];
		e.profile.human ? a = .62 : e.state === "idle" && !e.arrived ? a = .5 : e.state === "blocked" && (a = .8 + .2 * i), e.level = yt(e.level, a, 4, t), e.alert = yt(e.alert, +(e.state === "blocked"), 5, t), I.copy(e.accent).lerp(P, e.alert).multiplyScalar(e.level * ee), r.outline.color.copy(I), r.outline.visible = ee > .02, r.glow.color.copy(F).lerp(I.copy(e.accent).lerp(P, e.alert).multiplyScalar(e.level), ee), r.ring.visible = e.alert > .02, r.ring.visible && (r.ringMaterial.opacity = e.alert * (.55 + .3 * i), r.ring.scale.setScalar(1 + .12 * i));
	}
	function H(n, r, i, a) {
		let o = n.state === "reporting" && n.arrived && a && n !== a ? 1 : 0;
		n.beamAmount = yt(n.beamAmount, o, 5, r), n.beamAmount < .02 || !a ? n.beam && (n.beam.visible = !1) : (n.beam || (n.beam = new e.Mesh(Ot, new e.MeshBasicMaterial({
			vertexColors: !0,
			transparent: !0,
			blending: e.AdditiveBlending,
			depthWrite: !1
		})), n.beam.frustumCulled = !1, t.scene.add(n.beam)), L.copy(n.rig.root.position).setY(n.rig.root.position.y + 1.15), te.copy(a.rig.root.position).setY(a.rig.root.position.y + 1.02), n.beam.visible = !0, n.beam.position.lerpVectors(L, te, .5), n.beam.lookAt(te), n.beam.scale.set(.035, .035, L.distanceTo(te)), n.beam.material.opacity = n.beamAmount * (.6 + .25 * Math.sin(i * 3)));
	}
	function ie(t, n) {
		let r = t.trailPoints, i = t.rig.root.position;
		if (t.trailOn && !t.arrived && t.walk > .4) {
			let t = r[r.length - 1];
			(!t || t.distanceTo(i) > .2) && (r.push(new e.Vector3(i.x, i.y + .05, i.z)), r.length > dt && r.shift());
		} else if (r.length > 0) for (t.trailTimer += n; t.trailTimer > .045 && r.length > 0;) r.shift(), t.trailTimer -= .045;
		let a = t.trail.geometry;
		if (r.length < 2) {
			a.setDrawRange(0, 0);
			return;
		}
		let o = a.getAttribute("position"), s = a.getAttribute("color");
		for (let e = 0; e < r.length; e++) {
			let n = r[e], i = r[Math.min(e + 1, r.length - 1)], a = r[Math.max(e - 1, 0)];
			R.set(-(i.z - a.z), 0, i.x - a.x).normalize().multiplyScalar(.075), o.setXYZ(e * 2, n.x + R.x, n.y, n.z + R.z), o.setXYZ(e * 2 + 1, n.x - R.x, n.y, n.z - R.z);
			let c = (e / (r.length - 1)) ** 1.6 * .85;
			s.setXYZ(e * 2, t.accent.r * c, t.accent.g * c, t.accent.b * c), s.setXYZ(e * 2 + 1, t.accent.r * c, t.accent.g * c, t.accent.b * c);
		}
		o.needsUpdate = !0, s.needsUpdate = !0, a.setDrawRange(0, (r.length - 1) * 6);
	}
	return {
		apply(e) {
			let t = i.get(e.agentId);
			t && (e.type === "agent.profile" ? g(t, e.meta?.name, e.meta?.appearance) : t.profile.human || D || (e.type === "agent.state" && e.state ? (t.missionId = e.state === "idle" ? null : e.missionId ?? t.missionId, h(t, e.state, e.task ?? t.task, M(t.at, e.state, e.deskId))) : e.type === "agent.moved" && e.deskId && h(t, t.state, t.task, e.deskId)));
		},
		sync(e) {
			if (!D) {
				a.clear();
				for (let e of i.values()) e.destination = {
					...e.home,
					key: ""
				}, p(e, e.home, !1, !0), e.breakLeft = 0, e.idleFor = 0, e.trailPoints.length = 0;
				for (let t of i.values()) {
					let n = e.profiles?.[t.profile.id];
					if (g(t, n?.name ?? t.profile.name, n?.appearance ?? x(t.profile.id)), t.profile.human) continue;
					let r = e.agents[t.profile.id];
					t.missionId = r?.missionId ?? null, h(t, r?.state ?? "idle", r?.task ?? null, r?.at, !0);
				}
			}
		},
		update(e, t) {
			let n = i.get(C);
			E(e * s), N(e * s);
			for (let t of i.values()) ne(t, e);
			let r = z();
			for (let a of i.values()) B(a, e, t, r), re(a, e, t), H(a, e, t, n), ie(a, e);
		},
		list() {
			return [...i.values()].map((e) => ({
				id: e.profile.id,
				name: e.name,
				state: e.state,
				task: e.task,
				settled: e.arrived
			}));
		},
		nameOf(e) {
			return i.get(e)?.name;
		},
		pickTargets() {
			return [...i.values()].map((e) => e.rig.pick);
		},
		get(e) {
			let t = i.get(e);
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
			let r = i.get(e);
			r && g(r, t, n);
		},
		setSelected(e) {
			for (let t of i.values()) t.rig.tag.dataset.selected = String(t.profile.id === e);
		},
		stage(e) {
			if (D = e, !e) return [];
			let t = [...i.values()].find((e) => e.profile.human);
			t && (k = null, p(t, t.home, !1, !0)), A = 46;
			let n = [], r = [
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
			for (let e of i.values()) {
				if (e.profile.human) continue;
				let t = e.profile.id === "exec.chief-of-staff" || a++ % 3 == 0 ? null : r.shift(), i = t ? S((e) => e.startsWith(t)) : null;
				i ? (h(e, "idle", null, void 0), w(e, i, 1e5)) : (h(e, "working", e.task ?? "Working", void 0), n.push(e.profile.id));
			}
			return n;
		},
		wave(t) {
			O && !t && D && (A = Math.min(A, .4)), O = t ? (O ?? new e.Vector3()).copy(t) : null;
		},
		leading() {
			return k ? [...i.values()].find((e) => e.profile.human)?.rig.root.position ?? null : null;
		}
	};
}
// src/events.ts
function jt(e = {}) {
	let t = e.speed ?? 1, n = [...te].sort((e, t) => e.at - t.at), r = null, i = 0, a = 0, o = 0;
	return {
		kind: "mock",
		start(e) {
			r = e, i = 0, a = 0, o = 0, r.onStatus("demo"), r.onSnapshot(A());
		},
		update(e) {
			if (!r) return;
			i += e * t;
			let s = i - e * t;
			for (; a < n.length && n[a].at <= i;) r.onEvent(ne(n[a++], o));
			o === 0 && s < R.at && i >= R.at && r.onEvent(ne(R, o)), i >= 99 && (i -= 99, a = 0, o += 1);
		},
		stop() {
			r = null;
		}
	};
}
// src/navigation.ts
var Mt = .4, Nt = .32, Pt = .6;
function Ft(t, n, r) {
	let i = Math.ceil(n.width / Mt), a = Math.ceil(n.depth / Mt), o = i * a, s = -n.width / 2, c = -n.depth / 2, l = new Uint8Array(o), u = (e) => s + (e + .5) * Mt, d = (e) => c + (e + .5) * Mt, f = (e) => Math.floor((e - s) / Mt), p = (e) => Math.floor((e - c) / Mt), m = (e, t) => e >= 0 && t >= 0 && e < i && t < a;
	for (let e = 0; e < a; e++) for (let t = 0; t < i; t++) {
		let r = u(t), a = d(e);
		(Math.abs(r) > n.width / 2 - Pt || Math.abs(a) > n.depth / 2 - Pt) && (l[e * i + t] = 1);
	}
	for (let e of t) {
		let t = e.shape === "rect" ? e.minX - Nt : e.x - e.radius - Nt, n = e.shape === "rect" ? e.maxX + Nt : e.x + e.radius + Nt, r = e.shape === "rect" ? e.minZ - Nt : e.z - e.radius - Nt, o = e.shape === "rect" ? e.maxZ + Nt : e.z + e.radius + Nt;
		for (let s = Math.max(0, p(r)); s <= Math.min(a - 1, p(o)); s++) for (let a = Math.max(0, f(t)); a <= Math.min(i - 1, f(n)); a++) {
			let c = u(a), f = d(s);
			(e.shape === "rect" ? c >= t && c <= n && f >= r && f <= o : Math.hypot(c - e.x, f - e.z) <= e.radius + Nt) && (l[s * i + a] = 1);
		}
	}
	function h(e, t) {
		let n = f(e), r = p(t);
		return !m(n, r) || l[r * i + n] === 1;
	}
	function g(t, n) {
		let r = e.MathUtils.clamp(f(t), 0, i - 1), o = e.MathUtils.clamp(p(n), 0, a - 1);
		if (!l[o * i + r]) return o * i + r;
		let s = -1, c = Infinity;
		for (let e = 1; e <= 16 && s < 0; e++) for (let a = -e; a <= e; a++) for (let f = -e; f <= e; f++) {
			if (Math.max(Math.abs(a), Math.abs(f)) !== e) continue;
			let p = r + f, h = o + a;
			if (!m(p, h) || l[h * i + p]) continue;
			let g = Math.hypot(u(p) - t, d(h) - n);
			g < c && (c = g, s = h * i + p);
		}
		return s;
	}
	function _(e, t, n, r) {
		let i = Math.max(1, Math.ceil(Math.hypot(n - e, r - t) / (Mt * .2)));
		for (let a = 0; a <= i; a++) {
			let o = a / i;
			if (h(e + (n - e) * o, t + (r - t) * o)) return !1;
		}
		return !0;
	}
	let v = new Float32Array(o), y = new Float32Array(o), b = new Int32Array(o), x = new Uint32Array(o), S = new Uint32Array(o), C = 0, w = [];
	function T(e) {
		w.push(e);
		let t = w.length - 1;
		for (; t > 0;) {
			let e = t - 1 >> 1;
			if (y[w[e]] <= y[w[t]]) break;
			[w[e], w[t]] = [w[t], w[e]], t = e;
		}
	}
	function E() {
		let e = w[0], t = w.pop();
		if (w.length > 0) {
			w[0] = t;
			let e = 0;
			for (;;) {
				let t = e * 2 + 1, n = t + 1, r = e;
				if (t < w.length && y[w[t]] < y[w[r]] && (r = t), n < w.length && y[w[n]] < y[w[r]] && (r = n), r === e) break;
				[w[r], w[e]] = [w[e], w[r]], e = r;
			}
		}
		return e;
	}
	let D = [
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
	function O(e, t) {
		C += 1, w.length = 0;
		let n = t % i, r = (t - n) / i, a = (e) => {
			let t = Math.abs(e % i - n), a = Math.abs(Math.floor(e / i) - r);
			return Math.max(t, a) + (Math.SQRT2 - 1) * Math.min(t, a);
		};
		for (v[e] = 0, y[e] = a(e), b[e] = -1, x[e] = C, T(e); w.length > 0;) {
			let e = E();
			if (S[e] === C) continue;
			if (S[e] = C, e === t) {
				let e = [];
				for (let n = t; n !== -1; n = b[n]) e.push(n);
				return e.reverse();
			}
			let n = e % i, r = (e - n) / i;
			for (let [t, o, s] of D) {
				let c = n + t, u = r + o;
				if (!m(c, u)) continue;
				let d = u * i + c;
				if (l[d] || S[d] === C || t !== 0 && o !== 0 && (l[r * i + c] || l[u * i + n])) continue;
				let f = v[e] + s;
				x[d] === C && f >= v[d] || (x[d] = C, v[d] = f, y[d] = f + a(d), b[d] = e, T(d));
			}
		}
		return null;
	}
	let k = (t, n) => new e.Vector3(t, r(t, n), n);
	function A(e, t) {
		let n = k(t.x, t.z);
		if (!h(e.x, e.z) && _(e.x, e.z, t.x, t.z)) return [n];
		let r = g(e.x, e.z), a = g(t.x, t.z);
		if (r < 0 || a < 0) return [n];
		let o = O(r, a);
		if (!o) return [n];
		let s = o.map((e) => u(e % i)), c = o.map((e) => d(Math.floor(e / i))), l = [], f = 0;
		for (l.push(k(s[0], c[0])); f < o.length - 1;) {
			let e = f + 1;
			for (let t = o.length - 1; t > f + 1; t--) if (_(s[f], c[f], s[t], c[t])) {
				e = t;
				break;
			}
			l.push(k(s[e], c[e])), f = e;
		}
		return l.length > 1 && _(e.x, e.z, l[1].x, l[1].z) && l.shift(), l.length > 1 && _(l[l.length - 2].x, l[l.length - 2].z, n.x, n.z) && l.pop(), l.push(n), l;
	}
	return {
		findPath: A,
		isBlocked: h
	};
}
// src/pets.ts
var It = new e.BoxGeometry(1, 1, 1), Lt = /* @__PURE__ */ new Map();
function Rt(t) {
	let n = Lt.get(t);
	return n || Lt.set(t, n = Ee(new e.MeshStandardMaterial({
		color: t,
		roughness: .95,
		metalness: 0,
		flatShading: !0
	}), 14, .14)), n;
}
function zt(t, n, r, i, a, o, s, c) {
	let l = new e.Mesh(It, n.startsWith("glow:") ? new e.MeshBasicMaterial({ color: n.slice(5) }) : Rt(n));
	return l.scale.set(r, i, a), l.position.set(o, s, c), t.add(l), l;
}
function Bt(t, n) {
	let r = new e.Group();
	r.name = `pet:${t}`, r.scale.setScalar(n.scale * B);
	let [i, a, o] = n.body, s = n.leg, c = new e.Group();
	c.position.set(0, s, -o * .32), r.add(c);
	let l = o * .32;
	zt(c, n.coat, i, a, o, 0, a / 2, l);
	let u = [];
	for (let [t, r] of [
		[-1, 1],
		[1, 1],
		[-1, -1],
		[1, -1]
	]) {
		let a = new e.Group();
		a.position.set(t * (i / 2 - .06), .02, l + r * (o / 2 - .08)), zt(a, n.coat, .11, n.leg, .11, 0, -n.leg / 2, 0), n.socks && zt(a, n.marking, .118, n.leg * .38, .118, 0, -n.leg * .81, 0), c.add(a), u.push(a);
	}
	let [d, f, p] = n.head, m = new e.Group();
	m.position.set(0, a * .8, l + o / 2 - .02), c.add(m), zt(m, n.coat, d, f, p, 0, f * .35, p * .4);
	let [h, g, _] = n.muzzle;
	zt(m, n.marking, h, g, _, 0, f * .12, p * .9 + _ / 2 - .01), zt(m, "#0c0c0e", h * .4, g * .34, .03, 0, f * .12 + g * .33, p * .9 + _);
	for (let e of [-1, 1]) zt(m, n.eyes, .045, .045, .02, e * d * .26, f * .5, p * .9 + .006), n.ears === "folded" ? zt(m, n.earColor, .07, f * .5, p * .42, e * (d / 2 + .02), f * .58, p * .25) : zt(m, n.earColor, d * .3, f * .42, .05, e * d * .32, f * .85 + f * .2, p * .25);
	let [v, y, b] = n.tail, x = new e.Group();
	return x.position.set(0, a * .85, l - o / 2 + .02), x.rotation.x = b, zt(x, n.coat, v, v, y, 0, 0, -y / 2), c.add(x), n.extras?.({
		body: c,
		head: m,
		shape: n
	}), {
		root: r,
		body: c,
		head: m,
		tail: x,
		legs: u,
		leg: n.leg,
		hip: s
	};
}
var Vt = (e, t, n, r) => e + (t - e) * (1 - Math.exp(-n * r)), Ht = (e, t) => e + Math.random() * (t - e);
function Ut(n, r, i = {}) {
	let a = i.still ?? (() => !1), o = i.leader ?? (() => null), s = {
		following: !1,
		rethink: 0
	}, c = (e, t) => !r.isBlocked(e, t), l = (t, r) => new e.Vector3(t, n.floorHeightAt(t, r), r);
	function u(e, n, r) {
		let i = document.createElement("div");
		i.className = "pet-tag", i.textContent = n;
		let a = new t(i);
		a.center.set(.5, 1), a.position.set(0, r, 0), e.head.add(a);
	}
	function d(e, t, r, i, a, o) {
		let s = Bt(e, t);
		return s.root.position.copy(r), n.scene.add(s.root), u(s, e, t.head[1] + .34), {
			name: e,
			rig: s,
			speed: i,
			mode: "rest",
			path: [],
			step: 0,
			wait: Ht(6, 20),
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
	function f(e, t, n) {
		e.path = r.findPath(e.rig.root.position.clone().setY(0), t.clone().setY(0)), e.step = 0, e.mode = "walk", e.pose = "stand", e.arrive = n;
	}
	let p = [
		[-7.3, 1.2],
		[7.2, 1.4],
		[2.8, 15],
		[-4.2, 13.2],
		[14.4, 9.2],
		[-12.5, 5.5]
	].filter(([e, t]) => c(e, t)).map(([e, t]) => l(e, t)), m = d("Cash", {
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
			zt(e, n.marking, .24, .18, .02, 0, .12, n.body[2] * .82 + .005);
			for (let e of [-1, 1]) zt(t, n.marking, .05, .035, .02, e * .083, .2, .277);
			zt(e, "#b5432e", .42, .05, .06, 0, .3, n.body[2] * .76);
		}
	}, p[0] ?? l(-7.3, 1.2), 1.25, (e) => {
		let t = p.filter((t) => t.distanceTo(e.rig.root.position) > 2);
		t.length !== 0 && f(e, t[Math.floor(Math.random() * t.length)], (e) => {
			e.pose = "lie", e.wait = Ht(50, 110);
		});
	}, "lie");
	m.wait = Ht(25, 50), m.heading = .6;
	let h = [
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
	].filter(([e, t]) => c(e, t)).map(([e, t]) => l(e, t)), g = d("Milo", {
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
			zt(t, "#8a5a33", .165, .2, .2, -.075, .2, .165), zt(e, "#8a5a33", n.body[0] + .01, .2, .26, 0, n.body[1] - .095, n.body[2] * .12), zt(e, "#2b4a7d", n.body[0] + .02, .05, .06, 0, .27, n.body[2] * .76);
		}
	}, h[5] ?? l(4.2, 12.4), 2.7, (e) => {
		let t = h.filter((t) => t.distanceTo(e.rig.root.position) > 3);
		t.length !== 0 && f(e, t[Math.floor(Math.random() * t.length)], (e) => {
			e.pose = Math.random() < .5 ? "sit" : "stand", e.wait = Ht(3, 10);
		});
	}, "stand");
	g.wait = Ht(2, 5);
	let _ = [];
	for (let t of n.desks.values()) t.vacant && _.push({
		point: new e.Vector3(t.position.x - .55, t.position.y + .745, t.position.z + .12),
		from: t.seat.clone(),
		heading: t.rotation + .5
	});
	for (let [e, t] of [
		[18.2, 16.6],
		[24.6, 12.2],
		[-25.6, 8.4]
	]) c(e, t) && _.push({
		point: l(e, t),
		heading: Ht(-1, 1)
	});
	let v = _[0] ?? null, y = d("Tom", {
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
			zt(e, t.marking, .2, .16, .02, 0, .1, t.body[2] * .82 + .005);
		}
	}, v?.point ?? l(18.2, 16.6), 1.6, (e) => {
		let t = _.filter((e) => e !== v);
		if (t.length === 0) return;
		let n = t[Math.floor(Math.random() * t.length)], r = (e) => {
			v = n, e.heading = n.heading, e.pose = Math.random() < .7 ? "lie" : "sit", e.wait = Ht(50, 120);
		}, i = () => f(e, n.from ?? n.point, (e) => {
			if (!n.from) return r(e);
			b(e, n.point, () => r(e));
		});
		v?.from ? b(e, l(v.from.x, v.from.z), i) : i();
	}, "lie");
	y.heading = v?.heading ?? 0, y.wait = Ht(30, 60);
	function b(e, t, n) {
		e.mode = "hop", e.pose = "stand", e.hop = {
			from: e.rig.root.position.clone(),
			to: t.clone(),
			t: 0,
			then: n
		}, e.heading = Math.atan2(t.x - e.rig.root.position.x, t.z - e.rig.root.position.z);
	}
	let x = [
		m,
		g,
		y
	];
	for (let e of x) e.rig.root.rotation.y = e.heading;
	return { update(e, t) {
		for (let i of x) {
			let { rig: c } = i, l = c.root.position, u = i === m && i.mode !== "hop" ? o() : null;
			if (i === m) {
				if (u) {
					s.following = !0, s.rethink -= e;
					let t = Math.hypot(u.x - l.x, u.z - l.z);
					i.speed = t > 7 ? 2.6 : 1.6, t > 3.4 && s.rethink <= 0 ? (i.path = r.findPath(l.clone().setY(0), u.clone().setY(0)), i.step = 0, i.mode = "walk", i.pose = "stand", i.arrive = (e) => {
						e.pose = "sit";
					}, s.rethink = .7) : t <= 2.6 && i.mode === "walk" && (i.path = [], i.mode = "rest", i.pose = "sit"), i.mode === "rest" && (i.wait = 30);
				} else s.following && (s = {
					following: !1,
					rethink: 0
				}, i.speed = 1.25, i.mode === "rest" && (i.wait = 2));
			}
			if (i.mode === "rest") i.wait -= e, i.wait <= 0 && !a() && i.choose(i), i.wait <= 0 && i.mode === "rest" && (i.wait = Ht(10, 20));
			else if (i.mode === "walk") {
				let t = i.path[i.step];
				if (!t) i.mode = "rest", i.arrive?.(i);
				else {
					let r = t.x - l.x, a = t.z - l.z, o = Math.hypot(r, a), s = i.speed * e;
					o <= s ? (l.x = t.x, l.z = t.z, i.step += 1) : (l.x += r / o * s, l.z += a / o * s, i.heading = Math.atan2(r, a)), l.y = n.floorHeightAt(l.x, l.z), i.stride += e * i.speed * 7;
				}
			} else if (i.hop) {
				i.hop.t = Math.min(1, i.hop.t + e / .45);
				let t = i.hop.t;
				if (l.lerpVectors(i.hop.from, i.hop.to, t), l.y += Math.sin(t * Math.PI) * .35, t >= 1) {
					let { then: e } = i.hop;
					i.hop = null, i.mode = "rest", i.wait = .4, e();
				}
			}
			let d = Math.atan2(Math.sin(i.heading - c.root.rotation.y), Math.cos(i.heading - c.root.rotation.y));
			c.root.rotation.y += d * (1 - Math.exp(-9 * e));
			let f = i.mode !== "rest";
			i.sit = Vt(i.sit, +(!f && i.pose === "sit"), 6, e), i.lie = Vt(i.lie, +(!f && i.pose === "lie"), 4, e);
			let p = f ? Math.sin(i.stride) * .6 : 0, h = -.52 * i.sit, g = Math.sin(t * 1.3 + i.stride) * .012 * i.lie;
			c.body.rotation.x = h, c.body.position.y = c.hip * (1 - .55 * i.sit - .86 * i.lie) + g;
			let _ = p - h - 1.45 * i.lie, v = -p - h - 1.25 * i.sit + 1.45 * i.lie;
			c.legs[0].rotation.x = _, c.legs[1].rotation.x = -p - h - 1.45 * i.lie, c.legs[2].rotation.x = v, c.legs[3].rotation.x = p - h - 1.25 * i.sit + 1.45 * i.lie, c.head.rotation.x = -h + .42 * i.lie + (f ? Math.sin(i.stride * 2) * .04 : Math.sin(t * .5 + i.stride) * .06 * (1 - i.lie)), i.wag = Vt(i.wag, i.lie > .5 ? .1 : 1, 3, e), c.tail.rotation.y = Math.sin(t * (i.name === "Tom" ? 1.1 : 9) + i.stride) * (i.name === "Tom" ? .35 : .45) * i.wag;
		}
	} };
}
// src/postfx.ts
var Wt = {
	threshold: .42,
	strength: .8,
	radius: .4
}, Gt = {
	uniforms: {
		tDiffuse: { value: null },
		uStrength: { value: .32 }
	},
	vertexShader: "\n    varying vec2 vUv;\n    void main() {\n      vUv = uv;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    }\n  ",
	fragmentShader: "\n    uniform sampler2D tDiffuse;\n    uniform float uStrength;\n    varying vec2 vUv;\n    void main() {\n      vec4 color = texture2D(tDiffuse, vUv);\n      float falloff = smoothstep(0.9, 0.3, length(vUv - 0.5));\n      color.rgb *= mix(1.0 - uStrength, 1.0, falloff);\n      gl_FragColor = color;\n    }\n  "
};
function Kt(t, n, c) {
	let l = t.getDrawingBufferSize(new e.Vector2()), u = new e.WebGLRenderTarget(l.x, l.y, {
		type: e.HalfFloatType,
		samples: t.getPixelRatio() >= 1.5 ? 2 : 4
	}), d = new r(t, u), f = new a(new e.Vector2(l.x, l.y), Wt.strength, Wt.radius, Wt.threshold);
	return d.addPass(new i(n, c)), d.addPass(f), d.addPass(new o(Gt)), d.addPass(new s()), {
		bloom: f,
		render() {
			d.render();
		},
		setSize(e, t, n) {
			d.setPixelRatio(n), d.setSize(e, t);
		}
	};
}
// src/robot.ts
var qt = new e.BoxGeometry(1, 1, 1), Jt = 2.3, Yt = [
	V.orange,
	V.pink,
	V.lightViolet,
	V.green,
	V.peach,
	"#f4c542"
], Xt = 150, Zt = (e, t) => e + Math.random() * (t - e);
function Qt(t, n, r, i = {}) {
	let a = i.still ?? (() => !1), o = t.vending.dock.clone(), s = new e.Group();
	s.name = "snack-robot", s.position.copy(o), s.rotation.y = Math.PI / 2, s.scale.setScalar(B), t.scene.add(s);
	let c = new e.MeshStandardMaterial({
		color: "#dfe2ea",
		roughness: .5,
		metalness: .1,
		flatShading: !0
	}), l = new e.MeshStandardMaterial({
		color: "#1d1e24",
		roughness: .6,
		metalness: .2,
		flatShading: !0
	}), u = new e.MeshBasicMaterial({ color: V.peach }), d = (t, n, r, i, a, o, s, c) => {
		let l = new e.Mesh(qt, n);
		return l.scale.set(r, i, a), l.position.set(o, s, c), t.add(l), l;
	}, f = new e.Group();
	s.add(f), d(f, c, .46, .36, .5, 0, .3, 0), d(f, l, .5, .05, .54, 0, .5, 0), d(f, l, .34, .16, .02, 0, .34, .255);
	for (let e of [-1, 1]) d(f, u, .06, .06, .02, e * .08, .35, .262);
	d(f, new e.MeshBasicMaterial({ color: V.orange }), .47, .04, .51, 0, .16, 0);
	for (let [e, t] of [
		[-1, 1],
		[1, 1],
		[-1, -1],
		[1, -1]
	]) d(s, l, .08, .16, .16, e * .25, .08, t * .16);
	d(f, l, .02, .18, .02, .16, .6, -.18);
	let p = d(f, new e.MeshBasicMaterial({ color: V.green }), .05, .05, .05, .16, .71, -.18), m = new e.MeshStandardMaterial({
		color: Yt[0],
		roughness: .4,
		metalness: .3
	}), h = d(f, m, .1, .17, .1, 0, .61, .05);
	h.visible = !1;
	let g = /* @__PURE__ */ new Map();
	function _(n, r) {
		let i = t.desks.get(n);
		if (!i) return;
		let a = g.get(n);
		if (!a) {
			let t = new e.Mesh(qt, new e.MeshStandardMaterial({
				roughness: .4,
				metalness: .3
			}));
			t.scale.set(.1, .17, .1), t.position.set(.82, .84, .22), i.group.add(t), g.set(n, a = {
				mesh: t,
				left: 0
			});
		}
		a.mesh.material.color.set(r), a.mesh.visible = !0, a.left = Xt;
	}
	let v = "docked", y = Zt(8, 16), b = [], x = 0, S = null, C = s.rotation.y;
	function w() {
		let e = r.list().filter((e) => {
			if (e.state === "idle" || !e.settled || g.get(e.id)?.mesh.visible) return !1;
			let n = t.desks.get(e.id), i = r.get(e.id)?.position;
			return !!(n && i && i.distanceTo(n.seat) < .6);
		});
		return e.length ? e[Math.floor(Math.random() * e.length)].id : null;
	}
	function T(t) {
		let r = n.findPath(s.position.clone().setY(0), t.clone().setY(0)), i = r.at(-1), a = r.at(-2) ?? s.position;
		if (i) {
			let t = new e.Vector3().subVectors(a, i).setY(0);
			t.length() > .9 ? i.add(t.normalize().multiplyScalar(.8)) : r.pop();
		}
		return r;
	}
	return { update(e, r) {
		for (let t of g.values()) t.mesh.visible && (t.left -= e, t.left <= 0 && (t.mesh.visible = !1));
		if (p.visible = v === "docked" || Math.floor(r * 3) % 2 == 0, v === "docked") y -= e, y <= 0 && !a() && (S = w(), S ? (v = "loading", y = 1.4, m.color.set(Yt[Math.floor(Math.random() * Yt.length)]), C = -Math.PI / 2) : y = Zt(10, 20));
		else if (v === "loading") {
			if (y -= e, y <= .7 && (h.visible = !0), y <= 0) {
				let e = S ? t.desks.get(S)?.seat : void 0;
				e ? (b = T(e), x = 0, v = "out") : v = "docked";
			}
		} else if (v === "out" || v === "back") {
			let n = b[x];
			if (n) {
				let r = n.x - s.position.x, i = n.z - s.position.z, a = Math.hypot(r, i), o = Jt * e;
				a <= o ? (s.position.x = n.x, s.position.z = n.z, x += 1) : (s.position.x += r / a * o, s.position.z += i / a * o, C = Math.atan2(r, i)), s.position.y = t.floorHeightAt(s.position.x, s.position.z);
			} else if (v === "out") {
				v = "serving", y = 1.6;
				let e = S ? t.desks.get(S) : void 0;
				e && (C = Math.atan2(e.position.x - s.position.x, e.position.z - s.position.z));
			} else v = "docked", y = Zt(35, 80), C = Math.PI / 2;
		} else v === "serving" && (y -= e, y <= .8 && h.visible && S && (h.visible = !1, _(S, `#${m.color.getHexString()}`)), y <= 0 && (b = n.findPath(s.position.clone().setY(0), o), x = 0, v = "back", S = null));
		let i = Math.atan2(Math.sin(C - s.rotation.y), Math.cos(C - s.rotation.y));
		s.rotation.y += i * (1 - Math.exp(-8 * e)), f.position.y = v === "out" || v === "back" ? Math.abs(Math.sin(r * 14)) * .012 : 0;
	} };
}
// src/hero.ts
function $t() {
	try {
		return !!document.createElement("canvas").getContext("webgl2");
	} catch {
		return !1;
	}
}
function en(t, n = {}) {
	let r = window.matchMedia("(pointer: coarse)").matches, i = window.matchMedia("(prefers-reduced-motion: reduce)"), a = Math.max(n.period ?? 90, 1), o = n.motion ?? "sway", s = e.MathUtils.degToRad(n.angle ?? 45), c = e.MathUtils.degToRad(n.swing ?? 28), l = e.MathUtils.degToRad(n.elevation ?? 33), u = Math.max(n.zoom ?? 1, .2), d = n.sky ?? "auto", f = new e.WebGLRenderer({
		antialias: !1,
		powerPreference: "default"
	});
	f.toneMapping = e.NeutralToneMapping, f.shadowMap.enabled = !r, f.shadowMap.type = e.PCFShadowMap, f.shadowMap.autoUpdate = !1;
	let p = () => Math.min(window.devicePixelRatio || 1, n.maxPixelRatio ?? (r ? 1.25 : 1.5));
	f.setPixelRatio(p());
	let m = f.domElement;
	m.setAttribute("role", "img"), m.setAttribute("aria-label", "The SC45 AI Office: a 3D office by the sea, with agents at work"), Object.assign(m.style, {
		display: "block",
		width: "100%",
		height: "100%",
		pointerEvents: "none"
	}), t.append(m);
	let h = rt(), g = new e.PerspectiveCamera(32, 1, .5, 800), _ = Kt(f, h.scene, g), v = Ft(h.obstacles, z, h.floorHeightAt), y = () => i.matches, b = At(h, v, { instant: y }), x = Ut(h, v, {
		still: y,
		leader: () => b.leading()
	}), S = Qt(h, v, b, { still: y }), C = A(), w = /* @__PURE__ */ new Set(), T = n.lively !== !1;
	function E() {
		for (let e of b.list()) {
			let t = C.agents[e.id];
			t && t.state !== "idle" ? h.setDeskScreen(e.id, {
				title: t.task ?? t.state,
				missionId: t.missionId,
				lines: [],
				blocked: t.state === "blocked"
			}) : h.setDeskScreen(e.id, w.has(e.id) ? {
				title: "Working",
				lines: [],
				blocked: !1
			} : null);
		}
	}
	let D = jt();
	D.start({
		onSnapshot(e) {
			C = e, C.profiles ??= {}, C.approvals ??= [], T ? w.size === 0 && (b.sync(C), w = new Set(b.stage(!0))) : b.sync(C), h.setMissions(C.missions), E();
		},
		onEvent(e) {
			ee(C, e), b.apply(e), e.type.startsWith("mission.") && h.setMissions(C.missions), e.type === "agent.state" && E();
		},
		onStatus() {}
	});
	let O = new e.Vector3(0, 1, 1.5), k = Math.hypot(z.width, z.depth) / 2;
	function j(t, r) {
		g.aspect = t / r;
		let i = Math.tan(e.MathUtils.degToRad(g.fov / 2)), a = k * 1.08 / (i * Math.min(1, g.aspect * .92)) / u;
		g.userData.distance = a;
		let o = n.offset?.x ?? 0, s = n.offset?.y ?? 0;
		o || s ? g.setViewOffset(t, r, -o * t, s * r, t, r) : g.clearViewOffset(), g.updateProjectionMatrix();
	}
	function M(t) {
		let n = t / a * Math.PI * 2, r = o === "orbit" ? s + n : o === "sway" ? s + Math.sin(n) * c : s, i = g.userData.distance;
		g.position.set(O.x + Math.sin(r) * Math.cos(l) * i, O.y + Math.sin(l) * i, O.z + Math.cos(r) * Math.cos(l) * i), g.lookAt(O), g.near = e.MathUtils.clamp(i * .04, .5, 8), g.updateProjectionMatrix();
	}
	function N() {
		let e = Math.max(t.clientWidth, 1), n = Math.max(t.clientHeight, 1);
		f.setPixelRatio(p()), f.setSize(e, n, !1), _.setSize(e, n, f.getPixelRatio()), j(e, n);
	}
	let P = new ResizeObserver(() => {
		N(), B || ne(performance.now());
	});
	P.observe(t), N(), document.fonts?.ready.then(() => !ie && h.redrawText());
	let F = X(d), I = !1, L = 0, te = 0, R = !1;
	function ne(t) {
		let r = te ? Math.min((t - te) / 1e3, .1) : 0;
		te = t, y() || (L += r), M(y() ? 0 : L);
		let i = g.userData.distance, a = X(d);
		I ? _e(F, a, r) : Object.assign(F, a), I = !0, h.fog.density = e.MathUtils.clamp(.42 / i, .0025, .012) * e.MathUtils.lerp(1, .18, F.daylight), h.setSky(F), b.setNight(Y(F.daylight)), _.bloom.enabled = F.daylight < .97, _.bloom.threshold = e.MathUtils.lerp(Wt.threshold, 1.6, F.daylight), _.bloom.strength = Wt.strength * e.MathUtils.lerp(.3, 1, e.MathUtils.smoothstep(i, 12, 60)) * e.MathUtils.lerp(1, .32, F.daylight), D.update(r), b.update(r, L), x.update(r, L), S.update(r, L), h.update(L, g), h.shadowsStale() && (f.shadowMap.needsUpdate = !0), _.render(), R || (R = !0, n.onReady?.());
	}
	let B = !1, re = !0, V = !0, H = 0, ie = !1;
	function ae(e) {
		B && (ne(e), H = requestAnimationFrame(ae));
	}
	function U() {
		let e = re && V && !document.hidden && !ie;
		e !== B && (B = e, B ? (te = 0, H = requestAnimationFrame(ae)) : cancelAnimationFrame(H));
	}
	let W = new IntersectionObserver((e) => {
		V = e.some((e) => e.isIntersecting), U();
	});
	W.observe(t);
	let oe = () => U();
	document.addEventListener("visibilitychange", oe);
	let G = (e) => {
		e.preventDefault(), re = !1, U();
	};
	return m.addEventListener("webglcontextlost", G), U(), {
		pause() {
			re = !1, U();
		},
		resume() {
			re = !0, U();
		},
		setSky(e) {
			d = e;
		},
		dispose() {
			ie || (ie = !0, U(), D.stop(), W.disconnect(), P.disconnect(), document.removeEventListener("visibilitychange", oe), m.removeEventListener("webglcontextlost", G), h.scene.traverse((t) => {
				let n = t;
				n.geometry?.dispose();
				for (let t of Array.isArray(n.material) ? n.material : n.material ? [n.material] : []) {
					for (let n of Object.values(t)) n instanceof e.Texture && n.dispose();
					t.dispose();
				}
			}), f.dispose(), f.forceContextLoss(), m.remove());
		}
	};
}
export { en as mountOfficeHero, $t as officeHeroSupported };
