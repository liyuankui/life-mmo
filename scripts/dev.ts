/** dev server：每次请求即时构建（毫秒级），浏览器打开 http://localhost:3142 */

async function buildOnce(): Promise<string> {
  const out = await Bun.build({
    entrypoints: ["src/main.ts"],
    target: "browser",
    format: "iife",
    root: process.cwd(),
  });
  if (!out.success) {
    console.error(out.logs);
    return "<h1>构建失败，看终端日志</h1>";
  }
  const js = await out.outputs[0].text();
  const tpl = await Bun.file("template.html").text();
  return tpl.replace("/*__SCRIPT__*/", () => js);
}

const server = Bun.serve({
  port: 3142,
  async fetch(req) {
    if (new URL(req.url).pathname === "/") {
      return new Response(await buildOnce(), {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
    return new Response("404", { status: 404 });
  },
});
console.log(`dev server: http://localhost:${server.port}`);
