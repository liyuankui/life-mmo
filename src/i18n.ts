/**
 * F5 双语文案：zh-CN / en（同 where-is-pi F7 规范）。
 * 漏 key：en 缺失回退 zh，zh 缺失回退 key 本身，不崩。
 */

export type Lang = "zh" | "en";

const zh = {
  "app.title": "地球 Online · 角色面板",
  "app.subtitle": "答 11 道题，生成你的游戏风人生角色面板——可截图，可自嘲",
  "app.disclaimer": "游戏化自评，非测评 · 数值直接映射你的答案，无黑箱",
  "app.footer": "life-mmo · 纯静态单文件 · 无网络请求 · 一条命模式",
  "lang.toggle": "EN",

  "quiz.progress": "进度",
  "quiz.back": "← 上一题",
  "quiz.next": "下一题 →",
  "quiz.finish": "生成角色面板",
  "quiz.restart": "← 重新开号",

  "q1.t": "你遭遇挫败后的回血 CD 大概是？",
  "q1.a": "睡一觉满血复活",
  "q1.b": "一周左右缓过来",
  "q1.c": "数月，缓慢 dot 恢复",
  "q1.d": "还在 bleed，血条缓慢下降中",
  "q2.t": "版本更新了（新环境/新趋势/新规则），你的应对是？",
  "q2.a": "第一时间读完 patch notes，抢先适应",
  "q2.b": "听队友讲讲版本改了啥",
  "q2.c": "等环境逼到脸上才学",
  "q2.d": "已挂机，爱更更",
  "q3.t": "你的核心资源（时间与注意力）是怎么管理的？",
  "q3.a": "日历 + 优先级，资源控盘",
  "q3.b": "心里大致有数",
  "q3.c": "随缘刷，掉哪算哪",
  "q3.d": "时间黑洞常驻，资源持续流失",
  "q4.t": "面对新机会（新项目/新关系/新可能），你的下注风格是？",
  "q4.a": "增加抽卡次数 + 不对称下注，亏小赚大",
  "q4.b": "偶尔试试手气",
  "q4.c": "怕亏，基本不抽",
  "q4.d": "全押单发，all in 传奇",
  "q5.t": "在公会（团队/朋友圈）里，你的定位是？",
  "q5.a": "先做 Buffer，给队友上增益",
  "q5.b": "随叫随到的可靠替补",
  "q5.c": "单排玩家，偶尔组队",
  "q5.d": "已退公会，独狼出没",
  "q6.t": "长期习惯（运动/学习/创作）你的签到记录是？",
  "q6.a": "每日签到，复利滚存",
  "q6.b": "周常玩家，稳定上线",
  "q6.c": "三分钟热度，赛季初弃坑",
  "q6.d": "活跃度 0，回归奖励都没领",
  "q7.t": "你的睡眠策略属于哪档？",
  "q7.a": "规律作息，7-8 小时回血",
  "q7.b": "大体规律，偶尔超时",
  "q7.c": "工作日欠债，周末补觉型",
  "q7.d": "熬夜冠军，凌晨的太阳见过无数次",
  "q8.t": "你的运动（体力活）频率是？",
  "q8.a": "每周 3+ 次，跑图练级",
  "q8.b": "偶尔活动一下筋骨",
  "q8.c": "健身卡已吃灰，但续费了",
  "q8.d": "能躺不坐，能坐不站",
  "q9.t": "学新技能（新工具/新领域）时你是？",
  "q9.a": "主动开 hard 模式，啃硬骨头",
  "q9.b": "需要用到了才学",
  "q9.c": "短视频碎片化学，收藏 = 学会",
  "q9.d": "经验条已冻结多年",
  "q10.t": "你的社交能量条是？",
  "q10.a": "组队增益，人越多越精神",
  "q10.b": "一对一深度局更舒服",
  "q10.c": "能不打字就不打字",
  "q10.d": "已在地图角落 NPC 化",
  "q11.t": "面对诱惑（手机/短视频/拖延），你的抗性是？",
  "q11.a": "屏蔽一切通知，进入勿扰结界",
  "q11.b": "番茄钟偶尔上线",
  "q11.c": "与诱惑谈判，谈判失败",
  "q11.d": "我不是在抵抗诱惑，我就是诱惑本体",

  "panel.title": "角色面板",
  "panel.seed": "出生点 RNG",
  "panel.attrs": "属性",
  "panel.metas": "高玩六维",
  "panel.class": "称号",
  "panel.class2": "副称号",
  "panel.fx": "当前状态",
  "panel.flavor": "冒险日志",
  "panel.hint": "主线提示",
  "panel.note.btn": "机制注解",
  "panel.retake": "← 重新开号",

  "attr.health": "健康",
  "attr.spirit": "精神力",
  "attr.int": "智力",
  "attr.charm": "魅力",
  "attr.luck": "运气",
  "attr.will": "意志力",

  "meta.metaVersion": "版本理解",
  "meta.minmax": "资源控盘",
  "meta.regen": "回血抗性",
  "meta.rng": "RNG 操纵",
  "meta.guild": "公会运营",
  "meta.grind": "Grinding 纪律",

  "meta.metaVersion.note": "高玩机制：读懂版本（meta）比闷头练级值钱——世界规则会变，先看懂再用力。",
  "meta.minmax.note": "高玩机制：min-maxing——把有限点数（时间与注意力）集中投给收益最高的 build。",
  "meta.regen.note": "高玩机制：反脆弱——会回血的 build 不怕掉血，挫败恢复速度是隐藏主属性。",
  "meta.rng.note": "高玩机制：运气不可控，但抽卡次数可控——增加尝试 + 不对称下注 = 操纵 RNG。",
  "meta.guild.note": "高玩机制：先做 Buffer——给队友上增益的人，公会里永远有位置。",
  "meta.grind.note": "高玩机制：复利——每天 1% 的 grinding，一年是 37 倍经验条。",

  "title.metaReader": "版本解读者",
  "title.minMaxer": "资源控盘大师",
  "title.thornsTank": "反伤甲坦克",
  "title.rngWhisperer": "RNG 驯兽师",
  "title.guildSoul": "公会灵魂",
  "title.grindMonk": "复利苦行僧",
  "title.casualFarmer": "休闲玩家 · 种田流",
  "title.allRounder": "均衡开拓者",

  "fx.runRegen": "Buff · 被动技能：跑步回血",
  "fx.runRegen.note": "高玩机制：运动是最便宜的持续回血道具，无冷却，无氪金。",
  "fx.fullMana": "Buff · 被动技能：满蓝出门",
  "fx.fullMana.note": "高玩机制：睡眠是回蓝技能——空蓝放不出任何大招。",
  "fx.hawkEye": "Buff · 被动技能：鹰眼",
  "fx.hawkEye.note": "高玩机制：主动啃硬骨头会永久加智力上限，碎片化输入只加疲劳。",
  "fx.auraChar": "Buff · 光环：组队增益",
  "fx.auraChar.note": "高玩机制：光环类技能不需要释放，站在队伍里就生效。",
  "fx.luckCharm": "Buff · 装备：欧气护符",
  "fx.luckCharm.note": "高玩机制：欧气护符的真身是多抽卡——次数本身就是幸运加成。",
  "fx.ironWill": "Buff · 被动技能：铁人纪律",
  "fx.ironWill.note": "高玩机制：纪律不是抗性值，是提前把诱惑移出物品栏。",
  "fx.lowBattery": "Debuff · 低电量 curse",
  "fx.lowBattery.note": "高玩机制：低电量状态下所有技能伤害减半——先回蓝再战斗。",
  "fx.sedentaryDot": "Debuff · 久坐 DoT",
  "fx.sedentaryDot.note": "高玩机制：DoT 伤害小但无视护甲，多年后结算，一次结清。",
  "fx.infoNoise": "Debuff · 信息噪音",
  "fx.infoNoise.note": "高玩机制：收藏夹不进脑子——信息噪音会挤占真正的法力值。",
  "fx.muteChannel": "Debuff · 组队频道静音",
  "fx.muteChannel.note": "高玩机制：独狼省了社交消耗，也吃不到组队经验加成。",
  "fx.unluckyRng": "Debuff · 非酋光环",
  "fx.unluckyRng.note": "高玩机制：非酋的解法不是转发锦鲤，是增加抽卡次数。",
  "fx.cdReset": "Debuff · 三分钟热度 curse",
  "fx.cdReset.note": "高玩机制：技能升到一半弃练，经验条会缓慢清零——复利需要时间。",

  "flavor.flavor1": "本角色为一条命模式（Permadeath）：不可读档，不可转生，请谨慎操作。",
  "flavor.flavor2": "出生点与初始天赋全靠 RNG——你没抽到的卡，不是你的错。",
  "flavor.flavor3": "服务器已稳定运行 138 亿年，期间 80 亿玩家同时在线，且无一 NPC。",
  "flavor.flavor4": "存档点只有当下。系统提示：主线任务由玩家自定义。",

  "hint.metaVersion": "主线提示：花 30 分钟读一次「版本公告」——这个世界最近更新了什么规则？",
  "hint.minmax": "主线提示：给你的时间与注意力做一次资源盘点，砍掉收益最低的两项日常。",
  "hint.regen": "主线提示：升级你的回血技能——睡眠与运动，是唯一值得优先加点的被动。",
  "hint.rng": "主线提示：别赌单发。把你想要的东西拆成十次小抽卡，RNG 会向你低头。",
  "hint.guild": "主线提示：本周为一位队友上一次增益（帮个小忙）——公会运营从做 Buffer 开始。",
  "hint.grind": "主线提示：挑一件值得复利的事，把目标砍到「小到不可能失败」，连续签到七天。",
} as const;

export type MsgKey = keyof typeof zh;

const en: Record<MsgKey, string> = {
  "app.title": "Earth Online · Character Sheet",
  "app.subtitle": "Answer 11 questions and roll a game-style character sheet for your life — screenshot it, roast it",
  "app.disclaimer": "Gamified self-check, not an assessment · every stat maps directly to your answers, no black box",
  "app.footer": "life-mmo · static single file · no network requests · permadeath mode",
  "lang.toggle": "中",

  "quiz.progress": "Progress",
  "quiz.back": "← Previous",
  "quiz.next": "Next →",
  "quiz.finish": "Generate Character Sheet",
  "quiz.restart": "← New Character",

  "q1.t": "After a brutal defeat, roughly how long is your recovery CD?",
  "q1.a": "One good night's sleep, full HP",
  "q1.b": "About a week to regen",
  "q1.c": "Months — slow HoT tick",
  "q1.d": "Still bleeding out, HP bar slowly draining",
  "q2.t": "The meta shifts (new environment / trend / rules). Your response?",
  "q2.a": "Read the patch notes first, adapt early",
  "q2.b": "Let teammates explain what changed",
  "q2.c": "Learn it only when it's forced on me",
  "q2.d": "AFK — patch who?",
  "q3.t": "How do you manage your core resources (time and attention)?",
  "q3.a": "Calendar + priorities — full min-maxing",
  "q3.b": "Rough mental model, mostly works",
  "q3.c": "Drift wherever the grind takes me",
  "q3.d": "Permanent time black hole, resources leaking",
  "q4.t": "New opportunities appear (project / relationship / possibility). Your betting style?",
  "q4.a": "More lottery tickets + asymmetric bets — small downside, big upside",
  "q4.b": "Occasionally try my luck",
  "q4.c": "Too afraid of losses, rarely buy in",
  "q4.d": "All-in on one legendary pull",
  "q5.t": "In your guild (team / friend circle), what's your role?",
  "q5.a": "The Buffer — buff the party first",
  "q5.b": "Reliable backup, always answers the call",
  "q5.c": "Solo queue, occasionally LFG",
  "q5.d": "Left the guild — lone wolf sighting",
  "q6.t": "Your long-term habits (exercise / learning / creating): check-in record?",
  "q6.a": "Daily login, compounding XP",
  "q6.b": "Weekly raider, steady",
  "q6.c": "Three-minute enthusiasm, quit by week two",
  "q6.d": "Zero activity — haven't even claimed the return rewards",
  "q7.t": "Your sleep strategy?",
  "q7.a": "Regular schedule, 7-8h full heal",
  "q7.b": "Mostly regular, occasional overtime",
  "q7.c": "Borrow on weekdays, repay on weekends",
  "q7.d": "Night-owl champion — seen every 3 a.m. sunrise",
  "q8.t": "Your exercise frequency?",
  "q8.a": "3+ times a week, map-running",
  "q8.b": "Occasional stretching",
  "q8.c": "Gym card gathering dust — but auto-renewed",
  "q8.d": "If I can lie, I won't sit; if I can sit, I won't stand",
  "q9.t": "When learning a new skill, you are…",
  "q9.a": "Hard mode enjoyer — chew the tough stuff first",
  "q9.b": "Learn when the quest demands it",
  "q9.c": "Short-video fragments — bookmarked means learned",
  "q9.d": "XP bar frozen for years",
  "q10.t": "Your social energy bar?",
  "q10.a": "Party buffs — the more people, the livelier",
  "q10.b": "One-on-one deep conversations",
  "q10.c": "If I can avoid typing, I will",
  "q10.d": "Fully NPC-ed in a quiet corner of the map",
  "q11.t": "Vs. temptation (phone / feeds / procrastination), your resistance is…",
  "q11.a": "Mute everything, enter Do-Not-Disturb bubble",
  "q11.b": "Pomodoro, occasionally online",
  "q11.c": "Negotiated with temptation — negotiation failed",
  "q11.d": "I don't resist temptation, I AM the temptation",

  "panel.title": "Character Sheet",
  "panel.seed": "Spawn RNG",
  "panel.attrs": "Attributes",
  "panel.metas": "The Six Pro Skills",
  "panel.class": "Class",
  "panel.class2": "Secondary Class",
  "panel.fx": "Active Effects",
  "panel.flavor": "Adventure Log",
  "panel.hint": "Main Quest Hint",
  "panel.note.btn": "Mechanics note",
  "panel.retake": "← New Character",

  "attr.health": "Health",
  "attr.spirit": "Spirit",
  "attr.int": "Intellect",
  "attr.charm": "Charisma",
  "attr.luck": "Luck",
  "attr.will": "Willpower",

  "meta.metaVersion": "Meta Reading",
  "meta.minmax": "Resource Min-Max",
  "meta.regen": "Regen Resistance",
  "meta.rng": "RNG Manipulation",
  "meta.guild": "Guild Ops",
  "meta.grind": "Grinding Discipline",

  "meta.metaVersion.note": "Pro mechanic: reading the meta beats mindless grinding — the world's rules change; understand first, then push.",
  "meta.minmax.note": "Pro mechanic: min-maxing — concentrate your limited points (time and attention) into the highest-ROI build.",
  "meta.regen.note": "Pro mechanic: antifragile builds don't fear damage — recovery speed from setbacks is a hidden primary stat.",
  "meta.rng.note": "Pro mechanic: luck is uncontrollable, ticket count is — more attempts + asymmetric bets = manipulating RNG.",
  "meta.guild.note": "Pro mechanic: be the Buffer first — the one who buffs teammates always has a spot in the raid.",
  "meta.grind.note": "Pro mechanic: compounding — 1% daily grinding is a 37x XP bar in a year.",

  "title.metaReader": "Meta Reader",
  "title.minMaxer": "Resource Min-Maxer",
  "title.thornsTank": "Thorns Tank",
  "title.rngWhisperer": "RNG Whisperer",
  "title.guildSoul": "Soul of the Guild",
  "title.grindMonk": "Monk of Compounding",
  "title.casualFarmer": "Casual Player · Farm Build",
  "title.allRounder": "All-Round Explorer",

  "fx.runRegen": "Buff · Passive: Run to Heal",
  "fx.runRegen.note": "Pro mechanic: exercise is the cheapest HoT item — no cooldown, no pay-to-win.",
  "fx.fullMana": "Buff · Passive: Full Mana",
  "fx.fullMana.note": "Pro mechanic: sleep is your mana regen — you can't cast ultimates on empty.",
  "fx.hawkEye": "Buff · Passive: Hawkeye",
  "fx.hawkEye.note": "Pro mechanic: chewing hard problems raises your intellect cap permanently; fragmented input only raises fatigue.",
  "fx.auraChar": "Buff · Aura: Party Buff",
  "fx.auraChar.note": "Pro mechanic: auras don't need casting — they work by standing in the party.",
  "fx.luckCharm": "Buff · Gear: Luck Charm",
  "fx.luckCharm.note": "Pro mechanic: the real luck charm is more attempts — volume is itself a luck bonus.",
  "fx.ironWill": "Buff · Passive: Iron Discipline",
  "fx.ironWill.note": "Pro mechanic: discipline isn't a resistance stat — it's removing temptation from your inventory beforehand.",
  "fx.lowBattery": "Debuff · Low Battery Curse",
  "fx.lowBattery.note": "Pro mechanic: at low battery every skill deals half damage — regen mana before fighting.",
  "fx.sedentaryDot": "Debuff · Sedentary DoT",
  "fx.sedentaryDot.note": "Pro mechanic: DoT damage ignores armor, settles years later, all at once.",
  "fx.infoNoise": "Debuff · Info Noise",
  "fx.infoNoise.note": "Pro mechanic: bookmarks don't enter the brain — info noise drains your actual mana pool.",
  "fx.muteChannel": "Debuff · Muted Party Channel",
  "fx.muteChannel.note": "Pro mechanic: the lone wolf saves social cost, but forfeits the party XP bonus.",
  "fx.unluckyRng": "Debuff · Unlucky Aura",
  "fx.unluckyRng.note": "Pro mechanic: the cure for bad luck isn't a lucky charm post — it's more lottery tickets.",
  "fx.cdReset": "Debuff · Three-Minute Curse",
  "fx.cdReset.note": "Pro mechanic: abandon a skill halfway and the XP bar slowly resets — compounding needs time.",

  "flavor.flavor1": "This character runs permadeath mode: no saves, no respawns, no rerolls. Play carefully.",
  "flavor.flavor2": "Spawn point and starting talents are pure RNG — the cards you didn't draw were never your fault.",
  "flavor.flavor3": "Server uptime: 13.8 billion years. 8 billion players online, zero NPCs.",
  "flavor.flavor4": "The only save point is now. System notice: the main quest is player-defined.",

  "hint.metaVersion": "Main quest: spend 30 minutes reading the 'patch notes' — what rules did this world update recently?",
  "hint.minmax": "Main quest: audit your time and attention, cut the two lowest-ROI dailies.",
  "hint.regen": "Main quest: level up your regen skills — sleep and exercise, the only passives worth early points.",
  "hint.rng": "Main quest: stop betting single pulls. Split what you want into ten cheap lottery tickets — RNG will bow.",
  "hint.guild": "Main quest: buff one teammate this week (a small favor) — guild ops starts with being the Buffer.",
  "hint.grind": "Main quest: pick one compounding habit, shrink it until it's impossible to fail, then keep a 7-day streak.",
};

const dicts: Record<Lang, Partial<Record<MsgKey, string>>> = { zh, en };

/** 供 locale 完整性测试使用 */
export const zhDict: Record<MsgKey, string> = { ...zh };
export const enDict: Record<MsgKey, string> = { ...en };

let lang: Lang = "zh";

export function t(key: MsgKey): string {
  return dicts[lang][key] ?? zh[key] ?? key;
}

export function getLang(): Lang {
  return lang;
}

export function detectLang(): Lang {
  // 优先级：?lang= → localStorage → navigator.language
  try {
    const p = new URLSearchParams(window.location.search).get("lang");
    if (p === "en" || p === "zh") return p;
  } catch { /* no window */ }
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "zh") return saved;
  } catch { /* file:// 等环境可能禁 localStorage */ }
  try {
    if (navigator.language?.toLowerCase().startsWith("zh")) return "zh";
  } catch { /* no navigator */ }
  return "en";
}

export function setLang(l: Lang, persist = true) {
  lang = l;
  if (persist) {
    try {
      localStorage.setItem("lang", l);
    } catch { /* 忽略 */ }
  }
  applyDom();
  if (typeof window !== "undefined") window.dispatchEvent(new Event("langchange"));
}

export function applyDom() {
  if (typeof document === "undefined") return; // 测试环境无 DOM
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = t("app.title");
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n as MsgKey);
  });
}
