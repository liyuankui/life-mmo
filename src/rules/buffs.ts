import type { Attr } from "./types";
import { FX_BUFF_AT, FX_DEBUFF_AT } from "./types";

/**
 * F1 Buff/Debuff 库（v0.2 阈值联动新范围）：buff ≥65 / debuff ≤38，库内数量对称（各 6）。
 * 文案 key = `fx.{key}` / 注解 key = `fx.{key}.note`。
 */
export interface FxRule {
  key: string;
  kind: "buff" | "debuff";
  attr: Attr;
  hi: number; // = FX_BUFF_AT
  lo: number; // = FX_DEBUFF_AT
}

export const FX_RULES: FxRule[] = [
  { key: "runRegen", kind: "buff", attr: "health", hi: FX_BUFF_AT, lo: FX_DEBUFF_AT }, // 被动技能：跑步回血
  { key: "fullMana", kind: "buff", attr: "spirit", hi: FX_BUFF_AT, lo: FX_DEBUFF_AT }, // 被动技能：满蓝出门
  { key: "hawkEye", kind: "buff", attr: "int", hi: FX_BUFF_AT, lo: FX_DEBUFF_AT }, // 被动技能：鹰眼
  { key: "auraChar", kind: "buff", attr: "charm", hi: FX_BUFF_AT, lo: FX_DEBUFF_AT }, // 光环：组队增益
  { key: "luckCharm", kind: "buff", attr: "luck", hi: FX_BUFF_AT, lo: FX_DEBUFF_AT }, // 装备：欧气护符
  { key: "ironWill", kind: "buff", attr: "will", hi: FX_BUFF_AT, lo: FX_DEBUFF_AT }, // 被动技能：铁人纪律
  { key: "lowBattery", kind: "debuff", attr: "spirit", hi: FX_BUFF_AT, lo: FX_DEBUFF_AT }, // 低电量 curse
  { key: "sedentaryDot", kind: "debuff", attr: "health", hi: FX_BUFF_AT, lo: FX_DEBUFF_AT }, // 久坐 DoT
  { key: "infoNoise", kind: "debuff", attr: "int", hi: FX_BUFF_AT, lo: FX_DEBUFF_AT }, // 信息噪音 debuff
  { key: "muteChannel", kind: "debuff", attr: "charm", hi: FX_BUFF_AT, lo: FX_DEBUFF_AT }, // 组队频道静音
  { key: "unluckyRng", kind: "debuff", attr: "luck", hi: FX_BUFF_AT, lo: FX_DEBUFF_AT }, // 非酋 debuff
  { key: "cdReset", kind: "debuff", attr: "will", hi: FX_BUFF_AT, lo: FX_DEBUFF_AT }, // 三分钟热度 curse
];

/** Roguelike 风味语池（冒险日志 3 行按 seed 确定性不重复选取） */
export const FLAVOR_KEYS = [
  "flavor1",
  "flavor2",
  "flavor3",
  "flavor4",
  "flavor5",
  "flavor6",
];
export const FLAVOR_LINES = 3;
