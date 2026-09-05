import { QUESTIONS } from "./questions";
import { TITLE_RULES, FALLBACK_TITLES } from "./titles";
import { FX_RULES, FLAVOR_KEYS } from "./buffs";
import { ATTRS, METAS, BASELINE, CLAMP_LO, CLAMP_HI } from "./types";
import type { Attr, Meta, Effect } from "./types";

export interface Profile {
  attrs: Record<Attr, number>;
  metas: Record<Meta, number>;
  /** 主称号 i18n key（title.*） */
  titleKey: string;
  /** 副称号 i18n key（可选，第二高分位维） */
  titleKey2: string | null;
  /** Buff/Debuff i18n key（fx.*），2-4 条 */
  fxKeys: { key: string; kind: "buff" | "debuff" }[];
  /** Roguelike 风味语 index（按 seed 确定性） */
  flavorIdx: number;
  /** 最低六维 → 主线提示 meta key */
  hintMeta: Meta;
  /** 出生点 seed（答案哈希，展示用） */
  seed: string;
}

const clamp = (v: number) => Math.max(CLAMP_LO, Math.min(CLAMP_HI, v));

function hashSeed(answers: string[]): string {
  // FNV-1a：小而稳，同答案同 seed
  let h = 0x811c9dc5;
  for (const s of answers) {
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    h ^= 0x2f;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

function addEff(accA: Record<Attr, number>, accM: Record<Meta, number>, eff: Effect) {
  for (const k of ATTRS) accA[k] += eff.attr[k] ?? 0;
  for (const k of METAS) accM[k] += eff.meta[k] ?? 0;
}

/** 入参：答案数组（按题序，元素为选项 id，如 "q1a"）。非法选项 id 抛错。 */
export function computeProfile(answers: string[]): Profile {
  if (answers.length !== QUESTIONS.length) {
    throw new Error(`答案数量不合法：期望 ${QUESTIONS.length}，得到 ${answers.length}`);
  }
  const accA = Object.fromEntries(ATTRS.map((k) => [k, 0])) as Record<Attr, number>;
  const accM = Object.fromEntries(METAS.map((k) => [k, 0])) as Record<Meta, number>;
  QUESTIONS.forEach((q, i) => {
    const opt = q.options.find((o) => o.id === answers[i]);
    if (!opt) throw new Error(`非法选项 id：${answers[i]}`);
    addEff(accA, accM, opt.eff);
  });

  const attrs = Object.fromEntries(ATTRS.map((k) => [k, clamp(BASELINE + accA[k])])) as Record<Attr, number>;
  const metas = Object.fromEntries(METAS.map((k) => [k, clamp(BASELINE + accM[k])])) as Record<Meta, number>;

  // 称号：按六维排序取高分位维
  const sorted = [...METAS].sort((a, b) => metas[b] - metas[a] || a.localeCompare(b));
  let titleKey: string;
  let titleKey2: string | null = null;
  const r1 = TITLE_RULES.find((r) => r.top === sorted[0] && metas[sorted[0]] >= r.min);
  if (r1) {
    titleKey = `title.${r1.key}`;
    const r2 = TITLE_RULES.find((r) => r.top === sorted[1] && metas[sorted[1]] >= r.min);
    if (r2 && r2.key !== r1.key) titleKey2 = `title.${r2.key}`;
  } else {
    const spread = Math.max(...METAS.map((k) => metas[k])) - Math.min(...METAS.map((k) => metas[k]));
    titleKey = `title.${spread <= 4 ? FALLBACK_TITLES.balanced : FALLBACK_TITLES.explorer}`;
  }

  // Buff/Debuff：阈值触发，各取最多 2，保底 2 条（就近补足）
  const triggered = FX_RULES.filter((r) =>
    r.kind === "buff" ? attrs[r.attr] >= r.hi : attrs[r.attr] <= r.lo
  );
  let buffs = triggered.filter((r) => r.kind === "buff");
  let debuffs = triggered.filter((r) => r.kind === "debuff");
  // 补足：按 |属性偏离 50| 排序取最近未触发项
  const byDev = [...FX_RULES].sort(
    (a, b) => Math.abs(attrs[b.attr] - 50) - Math.abs(attrs[a.attr] - 50)
  );
  while (buffs.length < 2) {
    const cand = byDev.find((r) => r.kind === "buff" && !buffs.includes(r));
    if (!cand) break;
    buffs = [...buffs, cand];
  }
  while (debuffs.length < 2 && buffs.length + debuffs.length < 4) {
    const cand = byDev.find((r) => r.kind === "debuff" && !debuffs.includes(r));
    if (!cand) break;
    debuffs = [...debuffs, cand];
  }
  const fxKeys = [...buffs.slice(0, 2), ...debuffs.slice(0, 2)]
    .slice(0, 4)
    .map((r) => ({ key: `fx.${r.key}`, kind: r.kind }));

  const seed = hashSeed(answers);
  const flavorIdx = parseInt(seed.slice(-2), 16) % FLAVOR_KEYS.length;
  const hintMeta = sorted[sorted.length - 1]; // 最低维

  return { attrs, metas, titleKey, titleKey2, fxKeys, flavorIdx, hintMeta, seed };
}
