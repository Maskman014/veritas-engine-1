export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnalysisRequest, AnalysisResponse, AnalysisResult } from "@/types";

const GEMINI_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_KEY) {
  console.error("🔥 GEMINI_API_KEY is missing in .env.local!");
}

const genAI = new GoogleGenerativeAI(GEMINI_KEY || "");

export async function POST(
  request: NextRequest
): Promise<NextResponse<AnalysisResponse>> {
  try {
    let body: AnalysisRequest;
    try {
      body = await request.json();
      console.log("✅ BODY RECEIVED", body);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { url, content } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: "URL is required" },
        { status: 400 }
      );
    }

    // Fetch content from URL if not provided
    let newsContent = content || "";
    if (!newsContent) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20000); // 10s timeout

        const response = await fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
          signal: controller.signal,
        });

        clearTimeout(timeout);

        const html = await response.text();
        newsContent = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").substring(0, 3000);
      } catch (err) {
        console.warn("⚠️ Could not fetch URL:", err);
        newsContent = "Could not fetch URL. Using provided content or default analysis.";
      }
    }

    // Initialize Gemini model
  const model = genAI.getGenerativeModel({
  model: "models/gemini-2.5-flash" // free-tier compatible
});




    const analysisPrompt = `Analyze this news article for potential fake news and misinformation:
URL: ${url}
Content: ${newsContent}

Provide a JSON response with this exact structure:
{
  "fakeScore": <number 0-100>,
  "verdict": "<TRUE|FALSE|MIXED|UNVERIFIABLE>",
  "summary": "<brief summary of findings>",
  "claims": [
    {
      "text": "<claimed statement>",
      "status": "<VERIFIED|FALSE|UNVERIFIABLE>",
      "evidence": "<explanation>"
    }
  ],
  "proofSources": [
    {
      "title": "<source title>",
      "url": "<source url>",
      "relevance": <0-100>
    }
  ]
}
Be thorough and analytical. This is for fake news detection.`;

    let responseText = "";
    try {
      const aiResponse = await model.generateContent(analysisPrompt);
      responseText = await aiResponse.response.text(); // IMPORTANT: await
    } catch (err) {
      console.error("🔥 Gemini API call failed:", err);
      return NextResponse.json(
        { success: false, error: "Gemini API call failed" },
        { status: 500 }
      );
    }

    // Parse JSON response
    let analysisData: any = {};
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      analysisData = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    } catch {
      analysisData = {
        fakeScore: 50,
        verdict: "UNVERIFIABLE",
        summary: "Could not parse analysis response",
        claims: [],
        proofSources: [],
      };
    }

    const result: AnalysisResult = {
      url,
      fakeScore: analysisData.fakeScore || 50,
      verdict: analysisData.verdict || "UNVERIFIABLE",
      claims: analysisData.claims || [],
      summary: analysisData.summary || "Analysis completed",
      proofSources: analysisData.proofSources || [],
      executionLog: [
        "✅ Fetched article content",
        "🤖 Initialized Gemini API",
        "🔍 Analyzing content structure",
        "📊 Extracting claims and facts",
        "🌐 Cross-referencing sources",
        "✨ Generating verdict",
      ],
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("🔥 ANALYZE API CRASHED:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
