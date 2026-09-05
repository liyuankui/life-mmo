import type { Meta } from "./types";

/**
 * F1 称号规则库：组合分位 → 游戏化称号。
 * 品味红线：全部游戏化措辞，可自嘲，禁人格定性/贬损词。
 * 文案 key = `title.{key}`（i18n）。
 */
/** 主称号：某六维进入高分位（≥60，新范围 30-90 下） */
export interface TitleRule {
  key: string;
  top: Meta;
  min: number;
}

/** 高维 → 称号（无重叠，按 top 维唯一） */
export const TITLE_RULES: TitleRule[] = [
  { key: "metaReader", top: "metaVersion", min: 60 }, // 版本解读者
  { key: "minMaxer", top: "minmax", min: 60 }, // 资源控盘大师
  { key: "thornsTank", top: "regen", min: 60 }, // 反伤甲坦克
  { key: "rngWhisperer", top: "rng", min: 60 }, // RNG 驯兽师
  { key: "guildSoul", top: "guild", min: 60 }, // 公会灵魂
  { key: "grindMonk", top: "grind", min: 60 }, // 复利苦行僧
];

/** 兜底称号（无六维 ≥60 时）：按整体形态 */
export const FALLBACK_TITLES = {
  balanced: "casualFarmer", // 休闲玩家·种田流（各维起伏小，极差 ≤6）
  explorer: "allRounder", // 均衡开拓者（有起伏但无突出维）
} as const;
export const BALANCED_SPREAD = 6;
