import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0E0E10",
        surface: "#17171A",
        ink: "#F2EFE9",
        muted: "#8B8B90",
        accent: "#6EC1D6",
        "accent-dim": "#2E4A52",
      },
      fontFamily: {
        sans: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "78rem",
      },
      transitionTimingFunction: {
        // the site's one easing curve — power3-ish, no overshoot anywhere
        smooth: "cubic-bezier(0.33, 1, 0.68, 1)",
        gate: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
