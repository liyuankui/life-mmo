/** 构建：编译 TS（IIFE——file:// 下 CORS 安全）并内联进模板，产出零外链 dist/index.html */
const out = await Bun.build({
  entrypoints: ["src/main.ts"],
  target: "browser",
  format: "iife",
  minify: true,
});
if (!out.success) {
  console.error(out.logs);
  process.exit(1);
}
const js = await out.outputs[0].text();
const tpl = await Bun.file("template.html").text();
// 注意：replace 的替换串里 $ 有特殊含义，用函数形式注入原文
const html = tpl.replace("/*__SCRIPT__*/", () => js);
await Bun.write("dist/index.html", html);
console.log(`dist/index.html 写入完成（${(html.length / 1024).toFixed(1)} KB）`);
