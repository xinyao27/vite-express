import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { ViteDevServer } from "vite";
import dotenv from 'dotenv';
import { fileURLToPath } from "node:url";

// Load environment variables from .env file
dotenv.config();

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";
const __dirname: string = path.dirname(fileURLToPath(import.meta.url));

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile(path.join(__dirname, "../client/index.html"), "utf-8")
  : "";

// Create http server
const app = express();

// Parse JSON requests
app.use(express.json());

// Add Vite or respective production middlewares
let vite: ViteDevServer;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
  app.use("/api", (await vite.ssrLoadModule("/server/api/index.ts")).router);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  const router = (await import("./api")).router;
  app.use(compression());
  app.use(base, sirv(path.join(__dirname, "../client"), { extensions: [] }));
  app.use("/api", router);
}

// Serve HTML
app.use("*all", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    let template: string;
    let render: typeof import("./entry-server").render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/server/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./entry-server")).render;
    }

    const rendered = await render(url);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e: any) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
