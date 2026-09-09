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

async function handleProxy(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const targetPath = (path || []).join("/");
  const search = req.nextUrl.search || "";
  const port = await findBackendPort();
  const targetUrl = `http://127.0.0.1:${port}/api/${targetPath}${search}`;

  const headers = new Headers(req.headers);
  headers.delete("host");

  let body: BodyInit | null = null;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await req.arrayBuffer();
  }

  try {
    const upstreamRes = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...Object.fromEntries(headers.entries()),
        host: `127.0.0.1:${port}`,
      },
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
      { error: "Backend service unreachable", details: err?.message, targetUrl },
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
