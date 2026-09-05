/** life-mmo 入口：F2 答题 → F3 面板（v0.2 叙事版）→ F4 注解 → F5 双语 */
import { QUESTIONS } from "./rules/questions";
import { computeProfile } from "./rules/engine";
import type { Profile } from "./rules/engine";
import { ATTRS, METAS, FX_BUFF_AT, FX_DEBUFF_AT } from "./rules/types";
import type { Attr, Meta } from "./rules/types";
import { TITLE_RULES, FALLBACK_TITLES } from "./rules/titles";
import { FLAVOR_KEYS } from "./rules/buffs";
import { t, detectLang, setLang, getLang } from "./i18n";
import type { MsgKey } from "./i18n";
import { drawRadar } from "./radar";

const OPT_IDS = ["a", "b", "c", "d"] as const;

// ---- F2 答题状态（内存 + localStorage 恢复，切语言不丢） ----
let answers: (string | null)[] = Array(QUESTIONS.length).fill(null);
let idx = 0;
let inPanel = false;
/** 最近一次面板结果：窗口 resize 时只重绘雷达，不整页重渲染（保留折叠态） */
let lastProfile: Profile | null = null;

const elViewQuiz = document.getElementById("view-quiz")!;
const elViewPanel = document.getElementById("view-panel")!;

function restoreProgress() {
  try {
    const saved = localStorage.getItem("progress");
    if (!saved) return;
    const p = JSON.parse(saved) as { answers: (string | null)[] };
    if (Array.isArray(p.answers) && p.answers.length === QUESTIONS.length) {
      // 逐项校验合法性，防脏数据
      answers = p.answers.map((a, i) => {
        if (a === null) return null;
        return QUESTIONS[i]?.options.some((o) => o.id === a) ? a : null;
      });
      idx = answers.findIndex((a) => a === null);
      if (idx === -1) idx = QUESTIONS.length - 1;
    }
  } catch { /* 忽略 */ }
}

function saveProgress() {
  try {
    localStorage.setItem("progress", JSON.stringify({ answers }));
  } catch { /* 忽略 */ }
}

function renderQuiz() {
  inPanel = false;
  elViewQuiz.hidden = false;
  elViewPanel.hidden = true;
  renderGallery(null);
  const q = QUESTIONS[idx];
  const pct = Math.round(
    (answers.filter(Boolean).length / QUESTIONS.length) * 100
  );
  const bar = document.getElementById("quiz-progress-bar")!;
  bar.style.width = `${pct}%`;
  document.getElementById("quiz-progress-num")!.textContent =
    `${t("quiz.progress")} ${idx + 1}/${QUESTIONS.length}`;
  document.getElementById("quiz-q")!.textContent = t(`${q.id}.t` as MsgKey);

  const opts = document.getElementById("quiz-opts")!;
  opts.innerHTML = "";
  q.options.forEach((o, i) => {
    const btn = document.createElement("button");
    btn.className = "opt" + (answers[idx] === o.id ? " selected" : "");
    btn.textContent = t(`${q.id}.${OPT_IDS[i]}` as MsgKey);
    btn.addEventListener("click", () => {
      answers[idx] = o.id;
      saveProgress();
      if (idx < QUESTIONS.length - 1) {
        idx++;
        renderQuiz();
      } else {
        renderPanel();
      }
    });
    opts.appendChild(btn);
  });

  const back = document.getElementById("quiz-back")! as HTMLButtonElement;
  back.disabled = idx === 0;
  const next = document.getElementById("quiz-next")! as HTMLButtonElement;
  next.disabled = answers[idx] === null;
  next.textContent = idx === QUESTIONS.length - 1 ? t("quiz.finish") : t("quiz.next");
}

document.getElementById("quiz-back")!.addEventListener("click", () => {
  if (idx > 0) {
    idx--;
    renderQuiz();
  }
});
document.getElementById("quiz-next")!.addEventListener("click", () => {
  if (answers[idx] !== null && idx < QUESTIONS.length - 1) {
    idx++;
    renderQuiz();
  } else if (answers[idx] !== null) {
    renderPanel();
  }
});

/** 属性三档点评：高 ≥65 / 低 ≤38 / 其余中 */
function attrTier(v: number): "hi" | "mid" | "lo" {
  if (v >= FX_BUFF_AT) return "hi";
  if (v <= FX_DEBUFF_AT) return "lo";
  return "mid";
}

// ---- F3 面板（v0.2 叙事版） ----
function renderPanel() {
  inPanel = true;
  if (answers.some((a) => a === null)) {
    idx = answers.findIndex((a) => a === null);
    renderQuiz();
    return;
  }
  const list = answers as string[];
  const p = computeProfile(list);
  lastProfile = p;
  elViewQuiz.hidden = true;
  elViewPanel.hidden = false;

  document.getElementById("panel-seed")!.textContent = `${t("panel.seed")}: #${p.seed}`;

  // 称号 + 解读段
  document.getElementById("panel-class")!.textContent = t(p.titleKey as MsgKey);
  const elClass2 = document.getElementById("panel-class2")!;
  if (p.titleKey2) {
    elClass2.hidden = false;
    elClass2.textContent = `${t("panel.class2")}: ${t(p.titleKey2 as MsgKey)}`;
  } else {
    elClass2.hidden = true;
  }
  const descBase = p.titleKey.replace(/^title\./, "");
  document.getElementById("panel-class-desc")!.textContent =
    t(`title.${descBase}.desc` as MsgKey);

  // 职业攻略：按主称号给一条可执行打法
  const guide = document.getElementById("panel-class-guide")!;
  guide.textContent = "";
  const gb = document.createElement("b");
  gb.textContent = `${t("panel.guide")}：`;
  guide.append(gb, document.createTextNode(t(`title.${descBase}.guide` as MsgKey)));
  renderGallery(p.titleKey);

  // 属性条 + 每属性一句点评
  const attrBox = document.getElementById("panel-attrs")!;
  attrBox.innerHTML = "";
  for (const k of ATTRS) {
    const v = p.attrs[k as Attr];
    const row = document.createElement("div");
    row.className = "stat";
    const label = document.createElement("span");
    label.className = "stat-label";
    label.textContent = t(`attr.${k}` as MsgKey);
    const bar = document.createElement("div");
    bar.className = "stat-bar";
    const fill = document.createElement("div");
    fill.className = "stat-fill";
    fill.style.width = `${v}%`;
    bar.appendChild(fill);
    const val = document.createElement("span");
    val.className = "stat-val";
    val.textContent = String(v);
    row.append(label, bar, val);
    attrBox.appendChild(row);
    const cmt = document.createElement("p");
    cmt.className = "stat-cmt";
    cmt.textContent = t(`attr.${k}.${attrTier(v)}` as MsgKey);
    attrBox.appendChild(cmt);
  }

  // 六维雷达 + 注解 + 最高/最低维点评
  drawRadar(document.getElementById("radar") as HTMLCanvasElement, METAS.map((m) => ({
    label: t(`meta.${m}` as MsgKey),
    value: p.metas[m as Meta],
  })));
  const metaList = document.getElementById("panel-metas")!;
  metaList.innerHTML = "";
  for (const m of METAS) {
    const d = document.createElement("details");
    d.className = "meta-item";
    const sum = document.createElement("summary");
    sum.textContent = `${t(`meta.${m}` as MsgKey)}  ${p.metas[m as Meta]}`;
    const note = document.createElement("p");
    note.className = "note";
    note.textContent = t(`meta.${m}.note` as MsgKey);
    d.append(sum, note);
    metaList.appendChild(d);
  }
  const cmtBox = document.getElementById("panel-meta-cmts")!;
  cmtBox.innerHTML = "";
  cmtBox.append(makeCmt(t("panel.metaTop"), t(`meta.${p.metaTop}.hi` as MsgKey), "top"));
  const lowM = p.hintMetas[0];
  cmtBox.append(makeCmt(t("panel.metaLow"), t(`meta.${lowM}.lo` as MsgKey), "low"));

  // Buff/Debuff（含注解）
  const fxBox = document.getElementById("panel-fx")!;
  fxBox.innerHTML = "";
  for (const fx of p.fxKeys) {
    const d = document.createElement("details");
    d.className = `fx-item ${fx.kind}`;
    const sum = document.createElement("summary");
    sum.textContent = t(fx.key as MsgKey);
    const note = document.createElement("p");
    note.className = "note";
    note.textContent = t(`${fx.key}.note` as MsgKey);
    d.append(sum, note);
    fxBox.appendChild(d);
  }

  // 冒险日志 3 行（seed 确定性）
  const flBox = document.getElementById("panel-flavor")!;
  flBox.innerHTML = "";
  for (const fi of p.flavorIdx) {
    const li = document.createElement("p");
    li.className = "flavor";
    li.textContent = t(`flavor.${FLAVOR_KEYS[fi]}` as MsgKey);
    flBox.appendChild(li);
  }

  // 任务提示：主线①②（最低两维）+ 支线（最低属性）
  document.getElementById("panel-hint1")!.textContent = t(`hint.${p.hintMetas[0]}` as MsgKey);
  document.getElementById("panel-hint2")!.textContent = t(`hint2.${p.hintMetas[1]}` as MsgKey);
  document.getElementById("panel-side")!.textContent = t(`side.${p.sideAttr}` as MsgKey);
}

function makeCmt(tag: string, text: string, cls: string): HTMLElement {
  const p = document.createElement("p");
  p.className = `meta-cmt ${cls}`;
  const b = document.createElement("b");
  b.textContent = `${tag}：`;
  p.append(b, document.createTextNode(text));
  return p;
}

// ---- 全职业图鉴：8 职业 + 解锁条件；面板页高亮当前职业 ----
const GALLERY_KEYS = [
  ...TITLE_RULES.map((r) => r.key),
  FALLBACK_TITLES.balanced,
  FALLBACK_TITLES.explorer,
];

function renderGallery(currentTitleKey: string | null) {
  const box = document.getElementById("gallery-list")!;
  box.innerHTML = "";
  for (const key of GALLERY_KEYS) {
    const cur = currentTitleKey === `title.${key}`;
    const item = document.createElement("div");
    item.className = "g-item" + (cur ? " cur" : "");
    const name = document.createElement("div");
    name.className = "g-name";
    name.textContent = t(`title.${key}` as MsgKey);
    if (cur) {
      const tag = document.createElement("span");
      tag.className = "g-tag";
      tag.textContent = t("gallery.cur");
      name.appendChild(tag);
    }
    const short = document.createElement("div");
    short.className = "g-short";
    short.textContent = t(`title.${key}.short` as MsgKey);
    const cond = document.createElement("div");
    cond.className = "g-cond";
    const rule = TITLE_RULES.find((r) => r.key === key);
    cond.textContent = rule
      ? `${t("gallery.unlock")}：${t(`meta.${rule.top}` as MsgKey)} ≥ ${rule.min}`
      : t(`gallery.unlock.${key}` as MsgKey);
    item.append(name, short, cond);
    box.appendChild(item);
  }
}

document.getElementById("panel-retake")!.addEventListener("click", () => {
  answers = Array(QUESTIONS.length).fill(null);
  idx = 0;
  lastProfile = null;
  saveProgress();
  renderQuiz();
});

// ---- F5 语言切换 ----
document.getElementById("lang-toggle")!.addEventListener("click", () => {
  setLang(getLang() === "zh" ? "en" : "zh");
});
window.addEventListener("langchange", () => {
  // 切语言不丢进度：仅重渲染当前视图
  if (inPanel && answers.every(Boolean)) renderPanel();
  else renderQuiz();
});

// ---- resize：只重绘雷达（画布尺寸随容器宽度变化） ----
let resizeTimer: ReturnType<typeof setTimeout> | undefined;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (!inPanel || !lastProfile) return;
    drawRadar(
      document.getElementById("radar") as HTMLCanvasElement,
      METAS.map((m) => ({ label: t(`meta.${m}` as MsgKey), value: lastProfile!.metas[m as Meta] }))
    );
  }, 150);
});

// ---- 启动 ----
setLang(detectLang(), false);
restoreProgress();
renderQuiz();
