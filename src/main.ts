/** life-mmo 入口：F2 答题 → F3 面板 → F4 注解 → F5 双语 */
import { QUESTIONS } from "./rules/questions";
import { computeProfile } from "./rules/engine";
import { ATTRS, METAS } from "./rules/types";
import type { Attr, Meta } from "./rules/types";
import { FLAVOR_KEYS } from "./rules/buffs";
import { t, detectLang, setLang, getLang } from "./i18n";
import type { MsgKey } from "./i18n";
import { drawRadar } from "./radar";

const OPT_IDS = ["a", "b", "c", "d"] as const;

// ---- F2 答题状态（内存 + localStorage 恢复，切语言不丢） ----
let answers: (string | null)[] = Array(QUESTIONS.length).fill(null);
let idx = 0;
let inPanel = false;

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

// ---- F3 面板 ----
function renderPanel() {
  inPanel = true;
  if (answers.some((a) => a === null)) {
    idx = answers.findIndex((a) => a === null);
    renderQuiz();
    return;
  }
  const list = answers as string[];
  const p = computeProfile(list);
  elViewQuiz.hidden = true;
  elViewPanel.hidden = false;

  document.getElementById("panel-seed")!.textContent = `${t("panel.seed")}: #${p.seed}`;

  // 称号
  document.getElementById("panel-class")!.textContent = t(p.titleKey as MsgKey);
  const elClass2 = document.getElementById("panel-class2")!;
  if (p.titleKey2) {
    elClass2.hidden = false;
    elClass2.textContent = `${t("panel.class2")}: ${t(p.titleKey2 as MsgKey)}`;
  } else {
    elClass2.hidden = true;
  }

  // 属性条
  const attrBox = document.getElementById("panel-attrs")!;
  attrBox.innerHTML = "";
  for (const k of ATTRS) {
    const row = document.createElement("div");
    row.className = "stat";
    const label = document.createElement("span");
    label.className = "stat-label";
    label.textContent = t(`attr.${k}` as MsgKey);
    const bar = document.createElement("div");
    bar.className = "stat-bar";
    const fill = document.createElement("div");
    fill.className = "stat-fill";
    fill.style.width = `${p.attrs[k as Attr]}%`;
    bar.appendChild(fill);
    const val = document.createElement("span");
    val.className = "stat-val";
    val.textContent = String(p.attrs[k as Attr]);
    row.append(label, bar, val);
    attrBox.appendChild(row);
  }

  // 六维雷达 + 可展开注解列表
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

  // Roguelike 风味语 + 主线提示
  document.getElementById("panel-flavor")!.textContent =
    t(`flavor.${FLAVOR_KEYS[p.flavorIdx]}` as MsgKey);
  document.getElementById("panel-hint")!.textContent =
    t(`hint.${p.hintMeta}` as MsgKey);
}

document.getElementById("panel-retake")!.addEventListener("click", () => {
  answers = Array(QUESTIONS.length).fill(null);
  idx = 0;
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

// ---- 启动 ----
setLang(detectLang(), false);
restoreProgress();
renderQuiz();
