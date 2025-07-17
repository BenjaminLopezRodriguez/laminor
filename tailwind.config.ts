// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-special-gothic-expanded)",
          "system-ui",
          "sans-serif",
        ],
        manrope: ["var(--font-manrope)", "sans-serif"],
        sora: ["var(--font-sora)", "sans-serif"],
        worksans: ["var(--font-work-sans)", "sans-serif"],
      },
    },
  },
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [],
  darkMode: "class",
};

export default config;
