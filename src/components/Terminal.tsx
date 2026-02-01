"use client";

import React, { useEffect, useRef } from "react";

interface TerminalProps {
  logs: string[];
}

export const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full max-w-3xl">
      <div
        ref={terminalRef}
        className="bg-black text-green-400 font-mono border border-green-600 rounded-lg p-4
                   max-h-[60vh] overflow-y-auto"
      >
        <div className="flex justify-between mb-3">
          <span className="font-bold">█ EXECUTION CHAMBER</span>
          <div className="flex space-x-1">
            <span className="text-red-500">●</span>
            <span className="text-yellow-400">●</span>
            <span className="text-green-500">●</span>
          </div>
        </div>

        {logs.length === 0 ? (
          <p>$ Waiting for analysis…</p>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="mb-1">
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
