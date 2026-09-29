import { NextRequest, NextResponse } from "next/server";

let cachedPort: string | null = null;

async function findBackendPort(): Promise<string> {
  const ports = [
    process.env.BACKEND_PORT,
    process.env.NEXT_PUBLIC_BACKEND_PORT,
    "8000",
    "8001"
  ].filter(Boolean) as string[];

  const uniquePorts = Array.from(new Set(ports));

  // If we already found a valid port, test if it's still alive quickly
  if (cachedPort) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 400);
      const res = await fetch(`http://127.0.0.1:${cachedPort}/health`, {
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timeout);
      if (res.ok) return cachedPort;
    } catch {
      cachedPort = null;
    }
  }

  // Probe candidates
  for (const port of uniquePorts) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 600);
      const res = await fetch(`http://127.0.0.1:${port}/health`, {
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timeout);
      if (res.ok) {
        cachedPort = port;
        return port;
      }
    } catch {
      continue;
    }
  }

  return uniquePorts[0] || "8000";
}

export const maxDuration = 60;

async function handleProxy(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const targetPath = (path || []).join("/");
  let rawUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;
  if (rawUrl && (rawUrl.includes("localhost") || rawUrl.includes("127.0.0.1"))) {
    rawUrl = undefined;
  }

  // Normalize protocol
  if (rawUrl && !rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
    rawUrl = `https://${rawUrl}`;
  }

  const isVercel = Boolean(process.env.VERCEL);

  // If on Vercel and no backend URL is set, fail with a clear actionable message
  if (isVercel && !rawUrl) {
    return NextResponse.json(
      {
        error: "BACKEND_URL environment variable is missing in Vercel settings.",
        details: "Go to your Vercel Project Settings > Environment Variables, add BACKEND_URL with your Render URL (e.g. https://bis-setu-backend.onrender.com), and redeploy."
      },
      { status: 500 }
    );
  }

  const search = req.nextUrl.search || "";
  const headers = new Headers(req.headers);
  headers.delete("host");

  let targetUrl: string;
  const forwardHeaders: Record<string, string> = {
    ...Object.fromEntries(headers.entries()),
  };

  if (rawUrl) {
    const cleanBase = rawUrl.replace(/\/+$/, "").replace(/\/api$/, "");
    targetUrl = `${cleanBase}/api/${targetPath}${search}`;
  } else {
    const port = await findBackendPort();
    targetUrl = `http://127.0.0.1:${port}/api/${targetPath}${search}`;
    forwardHeaders.host = `127.0.0.1:${port}`;
  }

  let body: BodyInit | null = null;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await req.arrayBuffer();
  }

  try {
    const upstreamRes = await fetch(targetUrl, {
      method: req.method,
      headers: forwardHeaders,
      body,
      cache: "no-store",
    });

    const resHeaders = new Headers(upstreamRes.headers);
    resHeaders.delete("content-encoding");

    return new NextResponse(upstreamRes.body, {
      status: upstreamRes.status,
      statusText: upstreamRes.statusText,
      headers: resHeaders,
    });
  } catch (err: any) {
    console.error(`[API Proxy Error] Failed to proxy to ${targetUrl}:`, err);
    return NextResponse.json(
      {
        error: "Backend service unreachable",
        details: err?.message || "Failed to connect to backend",
        targetUrl,
        hint: isVercel ? "If your backend is hosted on Render free tier, it may be waking up from sleep (can take ~40s). Please wait and try again." : "Make sure your backend is running locally on port 8000 or 8001."
      },
      { status: 502 }
    );
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
export const OPTIONS = handleProxy;
