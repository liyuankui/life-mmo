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

/** 基线 50，±10 内浮动（AI 盲区约束：不让人感觉被贬低） */
export const BASELINE = 50;
export const CLAMP_LO = 40;
export const CLAMP_HI = 60;
