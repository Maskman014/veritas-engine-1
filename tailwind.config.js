module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        matrix: {
          green: "#00ff41",
          cyan: "#00ffff",
          red: "#ff0055",
          dark: "#000000",
          darker: "#0a0e27",
        },
      },
      fontFamily: {
        mono: ["Space Mono", "monospace"],
      },
      textShadow: {
        glow: "0 0 20px #00ff41",
        "glow-cyan": "0 0 20px #00ffff",
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 255, 65, 0.4)",
        "glow-inner": "inset 0 0 20px rgba(0, 255, 65, 0.05)",
      },
    },
  },
  plugins: [],
};
