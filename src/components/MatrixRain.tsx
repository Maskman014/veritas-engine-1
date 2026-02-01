"use client";

import React, { useEffect, useState } from "react";

export const MatrixRain: React.FC = () => {
  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    const characters = "ｦｧｨｩｪｫｬｭｮｯﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾙﾜ";

    const generate = () =>
      Array.from({ length: 50 }, () =>
        characters.charAt(Math.floor(Math.random() * characters.length))
      );

    setChars(generate());

    const interval = setInterval(() => {
      setChars(generate());
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
    >
      {chars.map((char, idx) => (
        <span
          key={idx}
          className="absolute text-green-500 opacity-40 animate-matrix"
          style={{
            left: `${(idx / chars.length) * 100}%`,
            top: `-${Math.random() * 20}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};
