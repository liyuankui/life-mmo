import type { Attr } from "./types";

/**
 * F1 Buff/Debuff 库：属性阈值触发，库内 buff/debuff 数量对称（各 6）。
 * 文案 key = `fx.{key}` / 注解 key = `fx.{key}.note`。
 */
export interface FxRule {
  key: string;
  kind: "buff" | "debuff";
  attr: Attr;
  /** buff 触发：属性 ≥ hi；debuff 触发：属性 ≤ lo（对称：hi + lo = 100） */
  hi: number;
  lo: number;
}

export const FX_RULES: FxRule[] = [
  { key: "runRegen", kind: "buff", attr: "health", hi: 55, lo: 45 }, // 被动技能：跑步回血
  { key: "fullMana", kind: "buff", attr: "spirit", hi: 55, lo: 45 }, // 被动技能：满蓝出门
  { key: "hawkEye", kind: "buff", attr: "int", hi: 55, lo: 45 }, // 被动技能：鹰眼
  { key: "auraChar", kind: "buff", attr: "charm", hi: 55, lo: 45 }, // 光环：组队增益
  { key: "luckCharm", kind: "buff", attr: "luck", hi: 55, lo: 45 }, // 装备：欧气护符
  { key: "ironWill", kind: "buff", attr: "will", hi: 55, lo: 45 }, // 被动技能：铁人纪律
  { key: "lowBattery", kind: "debuff", attr: "spirit", hi: 55, lo: 45 }, // 低电量 curse
  { key: "sedentaryDot", kind: "debuff", attr: "health", hi: 55, lo: 45 }, // 久坐 DoT
  { key: "infoNoise", kind: "debuff", attr: "int", hi: 55, lo: 45 }, // 信息噪音 debuff
  { key: "muteChannel", kind: "debuff", attr: "charm", hi: 55, lo: 45 }, // 组队频道静音
  { key: "unluckyRng", kind: "debuff", attr: "luck", hi: 55, lo: 45 }, // 非酋 debuff
  { key: "cdReset", kind: "debuff", attr: "will", hi: 55, lo: 45 }, // 三分钟热度 curse
];

/** Roguelike 风味语（一条命 / 出生点 RNG），按 seed 确定性选取 */
export const FLAVOR_KEYS = ["flavor1", "flavor2", "flavor3", "flavor4"];

/** 主线提示：按最低六维给一句方向性提示 */
export const HINT_META_KEYS: Record<string, string> = {
  metaVersion: "hint.metaVersion",
  minmax: "hint.minmax",
  regen: "hint.regen",
  rng: "hint.rng",
  guild: "hint.guild",
  grind: "hint.grind",
};
