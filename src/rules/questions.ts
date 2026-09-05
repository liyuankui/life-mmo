import type { QuestionDef } from "./types";

/**
 * F1 题库：11 道单选题。
 * 文案走 i18n（key = `q{N}.t` / `q{N}.{a|b|c|d}`），此处只放数值映射（纯数据）。
 * 分值设计：每选项 attr/meta 各 0-3 档微调，总和经 clamp 落在 40-60。
 */
export const QUESTIONS: QuestionDef[] = [
  {
    id: "q1",
    options: [
      { id: "q1a", eff: { attr: { health: 2, spirit: 1 }, meta: { regen: 3 } } }, // 睡一觉满血
      { id: "q1b", eff: { attr: { spirit: 1 }, meta: { regen: 1 } } }, // 一周
      { id: "q1c", eff: { attr: {}, meta: { regen: -2 } } }, // 数月
      { id: "q1d", eff: { attr: { spirit: -1 }, meta: { regen: -3 } } }, // 还在 bleed
    ],
  },
  {
    id: "q2",
    options: [
      { id: "q2a", eff: { attr: { int: 1 }, meta: { metaVersion: 3 } } }, // 第一时间读 patch notes
      { id: "q2b", eff: { attr: {}, meta: { metaVersion: 1 } } }, // 听队友讲版本
      { id: "q2c", eff: { attr: {}, meta: { metaVersion: -2 } } }, // 等环境逼着学
      { id: "q2d", eff: { attr: {}, meta: { metaVersion: -3 } } }, // 已挂机
    ],
  },
  {
    id: "q3",
    options: [
      { id: "q3a", eff: { attr: { will: 1 }, meta: { minmax: 3 } } }, // 日历+优先级
      { id: "q3b", eff: { attr: {}, meta: { minmax: 1 } } }, // 大致有数
      { id: "q3c", eff: { attr: {}, meta: { minmax: -2 } } }, // 随缘刷
      { id: "q3d", eff: { attr: {}, meta: { minmax: -3 } } }, // 时间黑洞常驻
    ],
  },
  {
    id: "q4",
    options: [
      { id: "q4a", eff: { attr: { luck: 1 }, meta: { rng: 3 } } }, // 加抽卡次数+不对称下注
      { id: "q4b", eff: { attr: {}, meta: { rng: 1 } } }, // 偶尔试试手气
      { id: "q4c", eff: { attr: {}, meta: { rng: -2 } } }, // 怕亏不抽
      { id: "q4d", eff: { attr: { luck: -1 }, meta: { rng: -3 } } }, // 全押单发
    ],
  },
  {
    id: "q5",
    options: [
      { id: "q5a", eff: { attr: { charm: 1 }, meta: { guild: 3 } } }, // 先做 Buffer
      { id: "q5b", eff: { attr: { charm: 1, will: -1 }, meta: { guild: 1 } } }, // 随叫随到
      { id: "q5c", eff: { attr: {}, meta: { guild: -2 } } }, // 单排玩家
      { id: "q5d", eff: { attr: {}, meta: { guild: -3 } } }, // 已退公会
    ],
  },
  {
    id: "q6",
    options: [
      { id: "q6a", eff: { attr: { health: 1, will: 1 }, meta: { grind: 3 } } }, // 每日签到复利
      { id: "q6b", eff: { attr: {}, meta: { grind: 1 } } }, // 周常
      { id: "q6c", eff: { attr: { will: -1 }, meta: { grind: -2 } } }, // 三分钟热度
      { id: "q6d", eff: { attr: { health: -1 }, meta: { grind: -3 } } }, // 活跃度 0
    ],
  },
  {
    id: "q7",
    options: [
      { id: "q7a", eff: { attr: { health: 2, spirit: 2 }, meta: { regen: 1 } } }, // 规律 7-8h
      { id: "q7b", eff: { attr: { spirit: 1 }, meta: {} } }, // 大体规律
      { id: "q7c", eff: { attr: { health: -1, spirit: -1 }, meta: {} } }, // 周末补觉型
      { id: "q7d", eff: { attr: { health: -2, spirit: -2 }, meta: { regen: -1 } } }, // 熬夜冠军
    ],
  },
  {
    id: "q8",
    options: [
      { id: "q8a", eff: { attr: { health: 2 }, meta: { regen: 1 } } }, // 每周 3+ 次
      { id: "q8b", eff: { attr: { health: 1 }, meta: {} } }, // 偶尔活动
      { id: "q8c", eff: { attr: { will: -1 }, meta: {} } }, // 办卡吃灰
      { id: "q8d", eff: { attr: { health: -2 }, meta: { grind: -1 } } }, // 能躺不坐
    ],
  },
  {
    id: "q9",
    options: [
      { id: "q9a", eff: { attr: { int: 2 }, meta: { metaVersion: 1 } } }, // 主动开 hard 模式
      { id: "q9b", eff: { attr: { int: 1 }, meta: {} } }, // 需要才学
      { id: "q9c", eff: { attr: { int: -1 }, meta: {} } }, // 短视频碎片学
      { id: "q9d", eff: { attr: { int: -2 }, meta: { metaVersion: -1 } } }, // 经验条冻结
    ],
  },
  {
    id: "q10",
    options: [
      { id: "q10a", eff: { attr: { charm: 2 }, meta: { guild: 1 } } }, // 组队增益
      { id: "q10b", eff: { attr: { charm: 1 }, meta: {} } }, // 一对一深度局
      { id: "q10c", eff: { attr: { charm: -1 }, meta: { guild: -1 } } }, // 能不打字就不打
      { id: "q10d", eff: { attr: { charm: -2 }, meta: { guild: -1 } } }, // NPC 化
    ],
  },
  {
    id: "q11",
    options: [
      { id: "q11a", eff: { attr: { will: 2 }, meta: { minmax: 1 } } }, // 屏蔽一切通知
      { id: "q11b", eff: { attr: { will: 1 }, meta: {} } }, // 番茄钟偶尔上线
      { id: "q11c", eff: { attr: { will: -2, spirit: -1 }, meta: {} } }, // 与诱惑谈判失败
      { id: "q11d", eff: { attr: { will: -3 }, meta: { grind: -1 } } }, // 诱惑本体
    ],
  },
];
