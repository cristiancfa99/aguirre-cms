import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#000000", surface: "#121212", surface2: "#1A1A1A",
        border: "#262626", muted: "#B5B5B5", accent: "#FF4500", wa: "#25D366"
      },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] }
    }
  },
  plugins: []
};
export default config;
