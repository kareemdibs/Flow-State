import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
      },
      colors: {
        ink: {
          DEFAULT: "#0B0B10",
          soft: "#1A1A22",
          muted: "#6B6B78",
          subtle: "#A0A0AE",
        },
        paper: {
          DEFAULT: "#FAFAF7",
          card: "#FFFFFF",
          warm: "#F4F1EA",
        },
        accent: {
          flame: "#FF5A1F",
          ember: "#FF8A4C",
          glow: "#FFD37A",
          deep: "#1F2937",
          mint: "#7BD3B0",
          sky: "#7AB8FF",
          violet: "#9B8CFF",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,11,16,0.04), 0 8px 24px rgba(11,11,16,0.06)",
        soft: "0 2px 10px rgba(11,11,16,0.05)",
        glow: "0 10px 40px rgba(255,90,31,0.25)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
