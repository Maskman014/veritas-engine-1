"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { AnalysisResult, AnalysisRequest } from "@/types";

export const useAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [terminal, setTerminal] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // ← Add this
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setTerminal((prev) => [...prev, `[${timestamp}] ${message}`]);
  }, []);

  // ← Scroll to bottom whenever terminal changes
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminal]);

  const analyze = useCallback(
    async (request: AnalysisRequest) => {
      setLoading(true);
      setError(null);
      setTerminal([]);
      setResult(null);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000); // 30s

      try {
        addLog("🔍 Initializing analysis...");
        addLog(`📍 Target: ${request.url}`);
        addLog("🌐 Sending request to backend...");

        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(request),
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Server error");
        }

        addLog("✅ Analysis complete");
        setResult(data.data);
        return data.data;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.name === "AbortError"
              ? "Request timed out"
              : err.message
            : "Analysis failed";

        setError(message);
        addLog(`❌ Error: ${message}`);
      } finally {
        clearTimeout(timeout);
        setLoading(false);
      }
    },
    [addLog]
  );

  return { analyze, result, loading, terminal, error, terminalEndRef }; // ← Return ref
};
