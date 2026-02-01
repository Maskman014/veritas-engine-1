"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAnalysis } from "@/hooks/useAnalysis";
import { Terminal } from "@/components/Terminal";
import { Verdict } from "@/components/Verdict";

function AnalyzeContent() {
  const params = useSearchParams();
  const url = params.get("url");
  const { analyze, result, loading, terminal } = useAnalysis();

  useEffect(() => {
    if (url) {
      analyze({ url });
    }
  }, [url, analyze]);

  if (!url) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1020] via-[#020617] to-black text-slate-100">
        <p>No URL provided.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#020617] to-black text-slate-100 px-6 py-10 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 glow-text">
          Veritas Engine — Analysis
        </h1>

        <section className="glass p-6 max-h-[50vh] overflow-y-auto">
          <Terminal logs={terminal} />
        </section>

        {result && (
          <section className="glass p-6 max-h-[60vh] overflow-y-auto">
            <Verdict result={result} loading={loading} />
          </section>
        )}
      </div>
    </main>
  );
}

export default function AnalysePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1020] via-[#020617] to-black text-slate-100">
        <p>Loading...</p>
      </main>
    }>
      <AnalyzeContent />
    </Suspense>
  );
}
