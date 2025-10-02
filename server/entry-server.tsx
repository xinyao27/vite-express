import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { Router } from "wouter";

import App from "@/app";

const FALLBACK_ORIGIN = "http://127.0.0.1";

type RenderResult = {
  html: string;
  head?: string;
  redirectTo?: string;
};

export function render(url: string): RenderResult {
  const targetUrl = url || "/";
  const parsedUrl = new URL(targetUrl, FALLBACK_ORIGIN);
  const ssrContext: { redirectTo?: string } = {};

  const html = renderToString(
    <StrictMode>
      <Router
        ssrPath={`${parsedUrl.pathname}${parsedUrl.search}`}
        ssrContext={ssrContext}
      >
        <App />
      </Router>
    </StrictMode>,
  );

  return { html, head: "", redirectTo: ssrContext.redirectTo };
}
