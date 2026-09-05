/** F3 六维雷达：canvas + dpr 缩放（高分屏不模糊） */
export function drawRadar(
  canvas: HTMLCanvasElement,
  dims: { label: string; value: number }[]
) {
  const dpr = Math.min(window.devicePixelRatio || 1, 4);
  const w = canvas.clientWidth || 320;
  const ctx = canvas.getContext("2d")!;

  // 标签先量宽：侧标签在 ±30° 顶点（横向仅占 cos30°≈0.866），
  // 按 0.866·(R+26) + 标签宽 ≤ 半宽 反解 R，比按水平轴预留整标签宽更省
  ctx.font = "12px 'Songti SC', 'Noto Serif SC', Georgia, serif";
  const maxLabelW = Math.max(...dims.map(d => ctx.measureText(d.label).width));
  const R = Math.max(48, Math.round((w / 2 - maxLabelW - 4) / 0.866 - 26));
  // 高度随半径走：上下各留 32px 给顶/底标签（标签竖向偏移 20 + 半字高 7）
  const h = Math.round(R * 2 + 64);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;
  const n = dims.length;
  const ang = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, r: number) => [cx + r * Math.cos(ang(i)), cy + r * Math.sin(ang(i))] as const;

  // 网格（3 圈）
  ctx.strokeStyle = "#d8d4cc";
  ctx.lineWidth = 1;
  for (let ring = 1; ring <= 3; ring++) {
    const r = (R * ring) / 3;
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const [x, y] = pt(i % n, r);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  // 轴线
  for (let i = 0; i < n; i++) {
    const [x, y] = pt(i, R);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  // 数据面
  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    // 数值范围 30-90 → 归一化 0.1-1
    const norm = Math.max(0.1, Math.min(1, (dims[i % n].value - 30) / 60));
    const [x, y] = pt(i % n, R * norm);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = "rgba(196, 90, 74, 0.25)";
  ctx.fill();
  ctx.strokeStyle = "#c45a4a";
  ctx.lineWidth = 2;
  ctx.stroke();

  // 标签（左右分侧，防重叠）
  ctx.fillStyle = "#2b2b2b";
  ctx.font = "12px 'Songti SC', 'Noto Serif SC', Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = 0; i < n; i++) {
    const a = ang(i);
    const lx = cx + (R + 26) * Math.cos(a);
    const ly = cy + (R + 20) * Math.sin(a);
    ctx.textAlign = Math.abs(Math.cos(a)) < 0.3 ? "center" : Math.cos(a) > 0 ? "left" : "right";
    ctx.fillText(dims[i].label, lx, ly);
  }
}
