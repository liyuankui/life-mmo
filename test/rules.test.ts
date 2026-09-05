import { describe, test, expect } from "bun:test";
import { QUESTIONS } from "../src/rules/questions";
import { TITLE_RULES, FALLBACK_TITLES } from "../src/rules/titles";
import { FX_RULES, FLAVOR_KEYS } from "../src/rules/buffs";
import { computeProfile } from "../src/rules/engine";
import { ATTRS, METAS, ATTR_LO, ATTR_HI, META_LO, META_HI, FX_BUFF_AT, FX_DEBUFF_AT } from "../src/rules/types";
import { zhDict, enDict } from "../src/i18n";
import type { MsgKey } from "../src/i18n";

describe("F1 规则库完整性", () => {
  test("题目数量在 10-12 之间", () => {
    expect(QUESTIONS.length).toBeGreaterThanOrEqual(10);
    expect(QUESTIONS.length).toBeLessThanOrEqual(12);
  });

  test("每题 4-5 个选项，选项 id 唯一且合法", () => {
    for (const q of QUESTIONS) {
      expect(q.options.length).toBeGreaterThanOrEqual(4);
      expect(q.options.length).toBeLessThanOrEqual(5);
      const ids = q.options.map((o) => o.id);
      expect(new Set(ids).size).toBe(ids.length);
      for (const id of ids) expect(id).toStartWith(`${q.id}`);
    }
  });

  test("分值合法：attr/meta 微调在 ±3 内", () => {
    for (const q of QUESTIONS) {
      for (const o of q.options) {
        for (const k of ATTRS) {
          const v = o.eff.attr[k];
          if (v !== undefined) {
            expect(Math.abs(v)).toBeLessThanOrEqual(3);
            expect(Number.isInteger(v)).toBe(true);
          }
        }
        for (const k of METAS) {
          const v = o.eff.meta[k];
          if (v !== undefined) {
            expect(Math.abs(v)).toBeLessThanOrEqual(3);
            expect(Number.isInteger(v)).toBe(true);
          }
        }
      }
    }
  });

  test("采样约束：每个属性至少 2 题喂分（区分度前提）", () => {
    for (const a of ATTRS) {
      const feeders = QUESTIONS.filter((q) =>
        q.options.some((o) => (o.eff.attr[a] ?? 0) !== 0)
      );
      expect(feeders.length).toBeGreaterThanOrEqual(2);
    }
  });

  test("称号规则覆盖全部六维 + 兜底/解读/攻略/图鉴短句文案存在", () => {
    expect(TITLE_RULES.length).toBe(METAS.length);
    for (const m of METAS) expect(TITLE_RULES.some((r) => r.top === m)).toBe(true);
    const allKeys = [...TITLE_RULES.map((r) => r.key), ...Object.values(FALLBACK_TITLES)];
    expect(new Set(allKeys).size).toBe(8); // 全职业图鉴：6 + 2 隐藏
    for (const key of allKeys) {
      for (const suffix of ["", ".desc", ".guide", ".short"]) {
        expect(zhDict[`title.${key}${suffix}` as MsgKey]).toBeTruthy();
        expect(enDict[`title.${key}${suffix}` as MsgKey]).toBeTruthy();
      }
    }
    for (const key of ["gallery.title", "gallery.hint", "gallery.cur", "gallery.unlock",
      "gallery.unlock.casualFarmer", "gallery.unlock.allRounder", "panel.guide"]) {
      expect(zhDict[key as MsgKey]).toBeTruthy();
      expect(enDict[key as MsgKey]).toBeTruthy();
    }
  });

  test("Buff/Debuff 库数量对称且阈值联动新范围（65/38）", () => {
    const buffs = FX_RULES.filter((r) => r.kind === "buff");
    const debuffs = FX_RULES.filter((r) => r.kind === "debuff");
    expect(buffs.length).toBe(debuffs.length);
    for (const r of FX_RULES) {
      expect(r.hi).toBe(FX_BUFF_AT);
      expect(r.lo).toBe(FX_DEBUFF_AT);
    }
  });
});

describe("映射确定性与区分度（v0.2）", () => {
  const optLetter = (i: number, qIdx: number) =>
    QUESTIONS[qIdx].options[i % QUESTIONS[qIdx].options.length].id;

  test("固定答案组合 → 属性/六维数值确定性（独立复算）", () => {
    const answers = QUESTIONS.map((_, i) => optLetter(0, i)); // 全选 A
    const p = computeProfile(answers);
    // 独立复算（数值诚实）：直接从题库原始数据重算，不经过引擎
    const expA = Object.fromEntries(ATTRS.map((k) => [k, 0])) as Record<string, number>;
    const expM = Object.fromEntries(METAS.map((k) => [k, 0])) as Record<string, number>;
    QUESTIONS.forEach((q, i) => {
      const opt = q.options.find((o) => o.id === answers[i])!;
      for (const k of ATTRS) expA[k] += opt.eff.attr[k] ?? 0;
      for (const k of METAS) expM[k] += opt.eff.meta[k] ?? 0;
    });
    for (const k of ATTRS)
      expect(p.attrs[k]).toBe(Math.max(ATTR_LO, Math.min(ATTR_HI, 50 + expA[k] * 6)));
    for (const k of METAS)
      expect(p.metas[k]).toBe(Math.max(META_LO, Math.min(META_HI, 50 + expM[k] * 5)));
  });

  test("同答案同 seed：两次计算结果完全一致", () => {
    const a = QUESTIONS.map((_, i) => optLetter(i % 2 ? 3 : 1, i));
    expect(computeProfile(a)).toEqual(computeProfile(a));
  });

  test("全最低分 / 全最高分不溢出（attr 25-95 / meta 30-90 clamp）", () => {
    for (const pick of [0, 3]) {
      const answers = QUESTIONS.map((_, i) => optLetter(pick, i));
      const p = computeProfile(answers);
      for (const k of ATTRS) {
        expect(p.attrs[k]).toBeGreaterThanOrEqual(ATTR_LO);
        expect(p.attrs[k]).toBeLessThanOrEqual(ATTR_HI);
      }
      for (const k of METAS) {
        expect(p.metas[k]).toBeGreaterThanOrEqual(META_LO);
        expect(p.metas[k]).toBeLessThanOrEqual(META_HI);
      }
      expect(p.fxKeys.length).toBeGreaterThanOrEqual(2);
      expect(p.fxKeys.length).toBeLessThanOrEqual(4);
      expect(p.titleKey).toStartWith("title.");
      // 冒险日志 3 行且不重复
      expect(new Set(p.flavorIdx).size).toBe(3);
    }
  });

  test("区分度断言：全最高 vs 全最低，每个属性差 ≥40", () => {
    const hi = computeProfile(QUESTIONS.map((_, i) => optLetter(0, i)));
    const lo = computeProfile(QUESTIONS.map((_, i) => optLetter(3, i)));
    for (const k of ATTRS) {
      expect(hi.attrs[k] - lo.attrs[k]).toBeGreaterThanOrEqual(40);
    }
  });

  test("区分度断言：随机组合面板有起伏且互不相同（不会千篇一律）", () => {
    let s = 7;
    const rnd = () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648;
    const seen = new Set<string>();
    for (let n = 0; n < 20; n++) {
      const answers = QUESTIONS.map((q, i) => optLetter(Math.floor(rnd() * 4), i));
      const p = computeProfile(answers);
      const vals = ATTRS.map((k) => p.attrs[k]);
      const mean = vals.reduce((a, b) => a + b) / vals.length;
      const sd = Math.sqrt(vals.reduce((a, b) => a + (b - mean) ** 2, 0) / vals.length);
      expect(sd).toBeGreaterThan(5);
      // 单面板内属性极差 ≥15（有层次，不是平的）
      expect(Math.max(...vals) - Math.min(...vals)).toBeGreaterThanOrEqual(15);
      seen.add(vals.join(","));
    }
    expect(seen.size).toBe(20); // 20 组随机答案 → 20 张不同面板
  });

  test("非法选项 id 拒绝", () => {
    const bad = QUESTIONS.map((q) => q.options[0].id);
    bad[2] = "q99z";
    expect(() => computeProfile(bad)).toThrow();
    expect(() => computeProfile(["q1a"])).toThrow(); // 数量不符
  });

  test("称号规则覆盖：200 组伪随机答案组合均有称号且有解读", () => {
    let s = 42;
    const rnd = () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648;
    for (let n = 0; n < 200; n++) {
      const answers = QUESTIONS.map((q, i) => optLetter(Math.floor(rnd() * 4), i));
      const p = computeProfile(answers);
      expect(p.titleKey.startsWith("title.")).toBe(true);
      expect(zhDict[p.titleKey as MsgKey]).toBeTruthy();
      expect(zhDict[`${p.titleKey}.desc` as MsgKey]).toBeTruthy();
    }
  });
});

describe("i18n key 集一致（F5）", () => {
  test("zh / en key 集完全一致", () => {
    expect(Object.keys(enDict).sort()).toEqual(Object.keys(zhDict).sort());
  });

  test("每题题干与选项 key 双语齐全", () => {
    for (const q of QUESTIONS) {
      expect(zhDict[`${q.id}.t` as MsgKey]).toBeTruthy();
      q.options.forEach((o, i) => {
        const letter = "abcd"[i];
        expect(zhDict[`${q.id}.${letter}` as MsgKey]).toBeTruthy();
        expect(enDict[`${q.id}.${letter}` as MsgKey]).toBeTruthy();
      });
    }
  });

  test("六维/属性/注解/Buff/风味语/任务提示全量 key 双语齐全（叙事版）", () => {
    for (const m of METAS) {
      for (const suffix of ["", ".note", ".hi", ".lo"]) {
        const k = `meta.${m}${suffix}` as MsgKey;
        expect(zhDict[k]).toBeTruthy();
        expect(enDict[k]).toBeTruthy();
      }
      expect(zhDict[`hint.${m}` as MsgKey]).toBeTruthy();
      expect(zhDict[`hint2.${m}` as MsgKey]).toBeTruthy();
      expect(enDict[`hint2.${m}` as MsgKey]).toBeTruthy();
    }
    for (const a of ATTRS) {
      for (const suffix of ["", ".hi", ".mid", ".lo"]) {
        const k = `attr.${a}${suffix}` as MsgKey;
        expect(zhDict[k]).toBeTruthy();
        expect(enDict[k]).toBeTruthy();
      }
      expect(zhDict[`side.${a}` as MsgKey]).toBeTruthy();
      expect(enDict[`side.${a}` as MsgKey]).toBeTruthy();
    }
    for (const r of FX_RULES) {
      expect(zhDict[`fx.${r.key}` as MsgKey]).toBeTruthy();
      expect(enDict[`fx.${r.key}.note` as MsgKey]).toBeTruthy();
    }
    for (const f of FLAVOR_KEYS) {
      expect(zhDict[`flavor.${f}` as MsgKey]).toBeTruthy();
      expect(enDict[`flavor.${f}` as MsgKey]).toBeTruthy();
    }
  });
});

describe("F6 产物零外链", () => {
  test("dist/index.html 存在且无外部资源引用", async () => {
    const file = Bun.file("dist/index.html");
    expect(file.exists()).resolves.toBe(true);
    const html = await file.text();
    expect(html).toContain("life-mmo");
    // 所有 src=/href= 引用均非外链（无 http(s)://、无 //、无外链文件）
    const refs = [...html.matchAll(/(?:src|href)\s*=\s*"([^"]+)"/g)].map((m) => m[1]);
    expect(refs.length).toBe(0); // 单文件：不应引用任何外部资源
    expect(html).not.toMatch(/https?:\/\//);
  });
});
