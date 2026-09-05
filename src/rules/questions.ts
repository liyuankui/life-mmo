import type { QuestionDef } from "./types";

/**
 * F1 题库（v0.2 区分度重做）：12 道单选题。
 * - attr 效应 -3..+3，属性 = 50 + Σ×6，clamp 25-95；meta ×5 clamp 30-90
 * - 采样约束：每个属性至少 2 题主喂（health: q7/q8，spirit: q1/q7，int: q2/q9，
 *   charm: q5/q10，luck: q4/q12，will: q3/q6/q11）
 * - 去 jargon：游戏词保留但选项上下文自明（B 案）
 */
export const QUESTIONS: QuestionDef[] = [
  {
    id: "q1",
    options: [
      { id: "q1a", eff: { attr: { spirit: 3 }, meta: { regen: 3 } } }, // 一觉恢复
      { id: "q1b", eff: { attr: { spirit: 1 }, meta: { regen: 1 } } }, // 一周缓慢恢复
      { id: "q1c", eff: { attr: { spirit: -1 }, meta: { regen: -2 } } }, // 数月缓慢恢复
      { id: "q1d", eff: { attr: { spirit: -3 }, meta: { regen: -3 } } }, // 还在恶化
    ],
  },
  {
    id: "q2",
    options: [
      { id: "q2a", eff: { attr: { int: 3 }, meta: { metaVersion: 3 } } }, // 第一时间研究
      { id: "q2b", eff: { attr: { int: 1 }, meta: { metaVersion: 1 } } }, // 听同事朋友聊起才知道
      { id: "q2c", eff: { attr: { int: -1 }, meta: { metaVersion: -2 } } }, // 等被逼着学
      { id: "q2d", eff: { attr: { int: -3 }, meta: { metaVersion: -3 } } }, // 没注意
    ],
  },
  {
    id: "q3",
    options: [
      { id: "q3a", eff: { attr: { will: 3 }, meta: { minmax: 3 } } }, // 日历+优先级
      { id: "q3b", eff: { attr: { will: 1 }, meta: { minmax: 1 } } }, // 心里大致有数
      { id: "q3c", eff: { attr: { will: -1 }, meta: { minmax: -2 } } }, // 随缘
      { id: "q3d", eff: { attr: { will: -3 }, meta: { minmax: -3 } } }, // 时间黑洞
    ],
  },
  {
    id: "q4",
    options: [
      { id: "q4a", eff: { attr: { luck: 2 }, meta: { rng: 3, minmax: 1 } } }, // 多次小尝试+亏小赚大
      { id: "q4b", eff: { attr: { luck: 0 }, meta: { rng: 1, minmax: 0 } } }, // 偶尔试试手气
      { id: "q4c", eff: { attr: { luck: -1 }, meta: { rng: -2, minmax: -1 } } }, // 怕亏基本不试
      { id: "q4d", eff: { attr: { luck: -2 }, meta: { rng: -3, minmax: -2 } } }, // 全押一把
    ],
  },
  {
    id: "q5",
    options: [
      { id: "q5a", eff: { attr: { charm: 2 }, meta: { guild: 3 } } }, // 先帮忙垫场
      { id: "q5b", eff: { attr: { charm: 1 }, meta: { guild: 1 } } }, // 随叫随到
      { id: "q5c", eff: { attr: { charm: -1 }, meta: { guild: -2 } } }, // 偶尔露面
      { id: "q5d", eff: { attr: { charm: -2 }, meta: { guild: -3 } } }, // 独行侠
    ],
  },
  {
    id: "q6",
    options: [
      { id: "q6a", eff: { attr: { will: 1 }, meta: { grind: 3 } } }, // 每日坚持
      { id: "q6b", eff: { attr: { will: 0 }, meta: { grind: 1 } } }, // 每周一两次
      { id: "q6c", eff: { attr: { will: -1 }, meta: { grind: -2 } } }, // 三分钟热度
      { id: "q6d", eff: { attr: { will: -2 }, meta: { grind: -3 } } }, // 基本没有
    ],
  },
  {
    id: "q7",
    options: [
      { id: "q7a", eff: { attr: { health: 3, spirit: 2 }, meta: { regen: 1 } } }, // 规律 7-8h
      { id: "q7b", eff: { attr: { health: 1, spirit: 1 }, meta: {} } }, // 大体规律
      { id: "q7c", eff: { attr: { health: -1, spirit: -1 }, meta: {} } }, // 周末补觉
      { id: "q7d", eff: { attr: { health: -3, spirit: -2 }, meta: { regen: -1 } } }, // 熬夜冠军
    ],
  },
  {
    id: "q8",
    options: [
      { id: "q8a", eff: { attr: { health: 3 }, meta: { regen: 1 } } }, // 每周 3+ 次
      { id: "q8b", eff: { attr: { health: 1 }, meta: {} } }, // 偶尔活动
      { id: "q8c", eff: { attr: { health: -1 }, meta: {} } }, // 办卡吃灰
      { id: "q8d", eff: { attr: { health: -3 }, meta: { regen: -2 } } }, // 能躺不坐
    ],
  },
  {
    id: "q9",
    options: [
      { id: "q9a", eff: { attr: { int: 3 }, meta: { metaVersion: 1, grind: 1 } } }, // 主动啃硬骨头
      { id: "q9b", eff: { attr: { int: 1 }, meta: { metaVersion: 0, grind: 0 } } }, // 需要才学
      { id: "q9c", eff: { attr: { int: -1 }, meta: { metaVersion: -1, grind: -1 } } }, // 碎片化学
      { id: "q9d", eff: { attr: { int: -3 }, meta: { metaVersion: -2, grind: -2 } } }, // 经验条冻结
    ],
  },
  {
    id: "q10",
    options: [
      { id: "q10a", eff: { attr: { charm: 3 }, meta: { guild: 1 } } }, // 人多越精神
      { id: "q10b", eff: { attr: { charm: 1 }, meta: { guild: 0 } } }, // 一对一更舒服
      { id: "q10c", eff: { attr: { charm: -1 }, meta: { guild: -1 } } }, // 能不打字不打字
      { id: "q10d", eff: { attr: { charm: -3 }, meta: { guild: -2 } } }, // 独处充电
    ],
  },
  {
    id: "q11",
    options: [
      { id: "q11a", eff: { attr: { will: 3 }, meta: { minmax: 1 } } }, // 屏蔽通知
      { id: "q11b", eff: { attr: { will: 1 }, meta: { minmax: 0 } } }, // 番茄钟
      { id: "q11c", eff: { attr: { will: -2 }, meta: { minmax: -1 } } }, // 谈判失败
      { id: "q11d", eff: { attr: { will: -3 }, meta: { minmax: -1 } } }, // 诱惑本体
    ],
  },
  {
    id: "q12",
    options: [
      { id: "q12a", eff: { attr: { luck: 3 }, meta: { rng: 2 } } }, // 十几次以上
      { id: "q12b", eff: { attr: { luck: 1 }, meta: { rng: 0 } } }, // 几次
      { id: "q12c", eff: { attr: { luck: -1 }, meta: { rng: -1 } } }, // 几乎没有
      { id: "q12d", eff: { attr: { luck: -3 }, meta: { rng: -2 } } }, // 零次
    ],
  },
];
