import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAF8F3",
        ink: {
          DEFAULT: "#16213E",
          soft: "#3C4A6B",
          faint: "#8892AB",
        },
        surveyor: {
          DEFAULT: "#1F6F54",
          dark: "#175943",
          light: "#EAF3EF",
        },
        compass: {
          DEFAULT: "#C1440E",
          light: "#FBEAE1",
        },
        hairline: "#E4DFD3",
        surface: "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "0.75rem",
      },
      keyframes: {
        reveal: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        reveal: "reveal 320ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
