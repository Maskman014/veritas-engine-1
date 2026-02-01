export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    const data = await res.json();
    console.log("🔥 AVAILABLE MODELS:", data);
    return NextResponse.json(data);
  } catch (err) {
    console.error("🔥 LIST MODELS FAILED:", err);
    return NextResponse.json({ error: "Failed to list models" }, { status: 500 });
  }
}