import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#f4f7f4",
          100: "#e4ebe4",
          200: "#c9d7c9",
          300: "#a3b8a3",
          400: "#7a967a",
          500: "#5a7a5a",
          600: "#466146",
          700: "#394e39",
          800: "#2f3f2f",
          900: "#283528",
        },
        cream: {
          50: "#fdfcfa",
          100: "#f9f6f0",
          200: "#f2ebe0",
          300: "#e8dcc8",
          400: "#d9c7a8",
          500: "#c9b08a",
        },
        gold: {
          400: "#d4a853",
          500: "#c49a3c",
          600: "#a67c2e",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
