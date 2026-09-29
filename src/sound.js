// Sound manager (Web Audio). All settings live in SOUNDS in config/gameConfig.js.
// If a file is missing or can't be decoded, a small synthesized tone plays instead.
import { SOUNDS } from './config/gameConfig';

let ctx = null, master = null, muted = false, wantAmbient = false;
const buffers = {}, failed = {}, loading = {}, streams = {};

function ac() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = muted ? 0 : 1;
  master.connect(ctx.destination);
  return ctx;
}
const decode = (data) => new Promise((res, rej) => {
  const p = ctx.decodeAudioData(data, res, rej);
  if (p && p.catch) p.catch(rej);
});
async function load(name) {
  const cfg = SOUNDS[name];
  if (!cfg || cfg.stream || buffers[name] || loading[name]) return;
  loading[name] = true;
  try {
    const r = await fetch(cfg.file);
    if (!r.ok) throw new Error('missing');
    buffers[name] = await decode(await r.arrayBuffer());
  } catch { failed[name] = true; }
}

const TONES = {
  click: [[660, .05]], error: [[180, .3, 'sawtooth']], success: [[520, .1], [780, .2]],
  transition: [[300, .12], [600, .22]], victory: [[520, .15], [660, .15], [780, .15], [1040, .6]],
};
function synth(name) {
  const c = ac(); if (!c || muted) return;
  let t = c.currentTime;
  for (const [f, d, type] of TONES[name] || []) {
    const o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine'; o.frequency.value = f;
    g.gain.setValueAtTime(.05, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + d); t += d * .8;
  }
}

// Call on the first touch: creates the audio context and loads the short sounds.
export function prepare() {
  const c = ac(); if (!c) return;
  Object.keys(SOUNDS).forEach(load);
}
// Call on any tap/click: iOS only lets audio start from a tap.
export function unlock() {
  const c = ac(); if (!c) return;
  if (c.state !== 'running') c.resume().catch(() => {});
  const s = streams.ambient;
  if (s && s.a.paused && !muted) s.a.play().catch(() => {});
}

function playStream(name, cfg) {
  const c = ac();
  stop(name, 0);
  const a = new Audio(cfg.file);
  a.loop = !!cfg.loop;
  const g = c.createGain(), t = c.currentTime, vol = cfg.volume ?? 1;
  g.gain.setValueAtTime(cfg.fadeInMs ? 0 : vol, t);
  if (cfg.fadeInMs) g.gain.linearRampToValueAtTime(vol, t + cfg.fadeInMs / 1000);
  try { c.createMediaElementSource(a).connect(g); g.connect(master); } catch { a.volume = Math.min(1, vol); }
  a.addEventListener('error', () => { if (name !== 'ambient') synth(name); });
  a.play().catch(() => {});
  streams[name] = { a, g };
}

export function stop(name, fadeMs = 800) {
  const s = streams[name]; if (!s) return;
  delete streams[name];
  const c = ctx, t = c.currentTime;
  s.g.gain.cancelScheduledValues(t);
  s.g.gain.setValueAtTime(s.g.gain.value, t);
  s.g.gain.linearRampToValueAtTime(0, t + fadeMs / 1000);
  setTimeout(() => { s.a.pause(); s.a.src = ''; }, fadeMs + 60);
}
export function stopAll() { Object.keys(streams).forEach((n) => stop(n, 400)); }

export function play(name) {
  const cfg = SOUNDS[name], c = ac();
  if (!cfg || !c || muted) return;
  if (c.state !== 'running') c.resume().catch(() => {});
  if (cfg.stopAmbient) stop('ambient', 1500);
  if (cfg.stream) return playStream(name, cfg);
  const buf = buffers[name];
  if (!buf) { if (failed[name]) synth(name); else load(name); return; }
  const src = c.createBufferSource(); src.buffer = buf;
  const g = c.createGain(); src.connect(g); g.connect(master);
  const t = c.currentTime, vol = cfg.volume ?? 1, dur = buf.duration * 1000;
  const end = cfg.maxMs && cfg.maxMs < dur ? cfg.maxMs : dur;
  g.gain.setValueAtTime(cfg.fadeInMs ? 0 : vol, t);
  if (cfg.fadeInMs) g.gain.linearRampToValueAtTime(vol, t + cfg.fadeInMs / 1000);
  if (end < dur) {
    const f = cfg.fadeOutMs || 500;
    g.gain.setValueAtTime(vol, t + (end - f) / 1000);
    g.gain.linearRampToValueAtTime(0, t + end / 1000);
  }
  src.start(t); src.stop(t + end / 1000 + 0.05);
}

export function startAmbient() {
  wantAmbient = true;
  if (!muted && ac()) play('ambient');
}
export function setMuted(m) {
  muted = m;
  if (master) master.gain.setTargetAtTime(m ? 0 : 1, ctx.currentTime, 0.05);
  if (!m && wantAmbient && !streams.ambient) play('ambient');
}
