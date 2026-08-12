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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#26AE61",
          hover: "#219b55",
          light: "#dcf6e7",
        }
      },
      fontFamily: {
        serif: ["var(--font-lora)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
