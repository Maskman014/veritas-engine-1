"use client";

import { useRouter } from "next/navigation";
import { URLInput } from "@/components/URLInput";

export default function Home() {
  const router = useRouter();

  const handleAnalyze = (url: string) => {
    if (!url) return;
    // Navigate to Execution page in the same tab
    router.push(`/analyze?url=${encodeURIComponent(url)}`);
  };

  return (
    <main className="min-h-screen overflow-y-auto bg-gradient-to-br from-[#0b1020] via-[#020617] to-black text-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-14">

        {/* HEADER */}
        <header className="text-center">
          <h1 className="text-5xl font-bold mb-4 tracking-tight text-white">
            Veritas Engine
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Real-time credibility analysis for news articles using Gemini AI.
          </p>
        </header>

        {/* URL INPUT */}
        <section className="glass p-8">
          <URLInput onAnalyze={handleAnalyze} loading={false} />
        </section>

      </div>
    </main>
  );
}
