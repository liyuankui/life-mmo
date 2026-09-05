import { QUESTIONS } from "./questions";
import { TITLE_RULES, FALLBACK_TITLES, BALANCED_SPREAD } from "./titles";
import { FX_RULES, FLAVOR_KEYS, FLAVOR_LINES } from "./buffs";
import {
  ATTRS,
  METAS,
  BASELINE,
  ATTR_SCALE,
  META_SCALE,
  ATTR_LO,
  ATTR_HI,
  META_LO,
  META_HI,
  FX_BUFF_AT,
  FX_DEBUFF_AT,
} from "./types";
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
  /** 冒险日志 3 行的 flavor key 下标（seed 确定性，不重复） */
  flavorIdx: number[];
  /** 六维最高维（点评用） */
  metaTop: Meta;
  /** 六维最低两维（主线提示①②用）：[最低, 次低] */
  hintMetas: [Meta, Meta];
  /** 最低属性（支线任务用） */
  sideAttr: Attr;
  /** 出生点 seed（答案哈希，展示用） */
  seed: string;
}

const clampAttr = (v: number) => Math.max(ATTR_LO, Math.min(ATTR_HI, v));
const clampMeta = (v: number) => Math.max(META_LO, Math.min(META_HI, v));

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

  const attrs = Object.fromEntries(
    ATTRS.map((k) => [k, clampAttr(BASELINE + accA[k] * ATTR_SCALE)])
  ) as Record<Attr, number>;
  const metas = Object.fromEntries(
    METAS.map((k) => [k, clampMeta(BASELINE + accM[k] * META_SCALE)])
  ) as Record<Meta, number>;

  // 称号：六维降序（同分按名稳定排序），高分位维 ≥60
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
    titleKey = `title.${spread <= BALANCED_SPREAD ? FALLBACK_TITLES.balanced : FALLBACK_TITLES.explorer}`;
  }

  // Buff/Debuff：阈值触发（≥65 buff / ≤38 debuff），保底 2 条（仅按总数补，不硬凑 buff）
  const triggered = FX_RULES.filter((r) =>
    r.kind === "buff" ? attrs[r.attr] >= FX_BUFF_AT : attrs[r.attr] <= FX_DEBUFF_AT
  );
  let fx = [...triggered];
  const byDev = [...FX_RULES].sort(
    (a, b) => Math.abs(attrs[b.attr] - BASELINE) - Math.abs(attrs[a.attr] - BASELINE)
  );
  while (fx.length < 2) {
    const cand = byDev.find((r) => !fx.includes(r));
    if (!cand) break;
    fx = [...fx, cand];
  }
  // 展示：buff 优先在前，最多 4 条
  const buffs = fx.filter((r) => r.kind === "buff").slice(0, 2);
  const debuffs = fx.filter((r) => r.kind === "debuff").slice(0, 2);
  const fxKeys = [...buffs, ...debuffs]
    .slice(0, 4)
    .map((r) => ({ key: `fx.${r.key}`, kind: r.kind }));

  // 冒险日志：seed 派生 3 个不重复行号
  const seed = hashSeed(answers);
  const flavorIdx: number[] = [];
  const h = parseInt(seed, 16);
  for (let i = 0; i < FLAVOR_LINES; i++) {
    // 用 seed 的不同比特段，保证确定性且互异
    let idx = (h >>> (i * 8)) % FLAVOR_KEYS.length;
    while (flavorIdx.includes(idx)) idx = (idx + 1) % FLAVOR_KEYS.length;
    flavorIdx.push(idx);
  }

  const metaTop = sorted[0];
  const hintMetas: [Meta, Meta] = [sorted[sorted.length - 1], sorted[sorted.length - 2]];
  const sideAttr = [...ATTRS].sort(
    (a, b) => attrs[a] - attrs[b] || a.localeCompare(b)
  )[0];

  return { attrs, metas, titleKey, titleKey2, fxKeys, flavorIdx, metaTop, hintMetas, sideAttr, seed };
}
