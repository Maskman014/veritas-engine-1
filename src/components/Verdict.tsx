"use client";

import React from "react";
import { AnalysisResult } from "@/types";

interface VerdictProps {
  result: AnalysisResult | null;
  loading: boolean;
}

export const Verdict: React.FC<VerdictProps> = ({ result, loading }) => {
  if (loading || !result) return null;

  // Color based on fake probability
  const fakeColor = result.fakeScore > 50 ? "text-red-500" : "text-green-400";

  return (
    <div className="bg-gray-900 text-green-400 font-sans rounded-xl p-6 mt-6 max-w-3xl w-full border border-green-600 shadow-lg overflow-y-auto max-h-[60vh] mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🧾 Analysis Verdict</h2>

      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold">Fake Probability:</span>
        <span className={`text-xl font-bold ${fakeColor}`}>{result.fakeScore}%</span>
      </div>

      <p className="mb-2">
        <span className="font-semibold">Verdict:</span>{" "}
        <span className={fakeColor}>{result.verdict}</span>
      </p>

      <p className="mb-4">
        <span className="font-semibold">Summary:</span> {result.summary}
      </p>

      {result.claims.length > 0 && (
        <div className="mb-4 max-h-48 overflow-y-auto">
          <h3 className="font-semibold mb-2">🔍 Claims:</h3>
          <ul className="list-disc list-inside space-y-1">
            {result.claims.map((c, i) => (
              <li key={i}>
                <span className="font-medium">{c.text}</span> -{" "}
                <span
                  className={
                    c.status === "FALSE"
                      ? "text-red-500"
                      : c.status === "VERIFIED"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }
                >
                  {c.status.toUpperCase()}
                </span>{" "}
                ({c.evidence})
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.proofSources.length > 0 && (
        <div className="mb-2 max-h-40 overflow-y-auto">
          <h3 className="font-semibold mb-2">📚 Proof Sources:</h3>
          <ul className="list-disc list-inside space-y-1">
            {result.proofSources.map((s, i) => (
              <li key={i}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-green-300"
                >
                  {s.title}
                </a>{" "}
                - Relevance: {s.relevance}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
