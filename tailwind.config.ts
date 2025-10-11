import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#00288B",
        cream: "#F5F5F0",
        "gray-dark": "#1A1A1A",
        gray: "#666666",
        "gray-light": "#E5E5E5",
      },
    },
  },
  plugins: [],
};

export default config;

