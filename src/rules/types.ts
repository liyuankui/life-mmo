/** F1 规则库类型：纯 TS 数据，加题不改引擎 */

export const ATTRS = ["health", "spirit", "int", "charm", "luck", "will"] as const;
export type Attr = (typeof ATTRS)[number];

export const METAS = ["metaVersion", "minmax", "regen", "rng", "guild", "grind"] as const;
export type Meta = (typeof METAS)[number];

/** 单个选项：对六属性与高玩六维的微调（±3 内） */
export interface Effect {
  attr: Partial<Record<Attr, number>>;
  meta: Partial<Record<Meta, number>>;
}

export interface QuestionDef {
  id: string; // "q1"...
  options: { id: string; eff: Effect }[]; // "q1a"...
}

/** 基线 50；区分度重做：attr ×6 clamp 25-95，meta ×5 clamp 30-90 */
export const BASELINE = 50;
export const ATTR_SCALE = 6;
export const META_SCALE = 5;
export const ATTR_LO = 25;
export const ATTR_HI = 95;
export const META_LO = 30;
export const META_HI = 90;
/** Buff/Debuff 触发阈值（联动新范围） */
export const FX_BUFF_AT = 65;
export const FX_DEBUFF_AT = 38;
