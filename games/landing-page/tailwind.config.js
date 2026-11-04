/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "rgb(10 10 12)",
          text: "rgb(255 255 255)",
          textMuted: "rgb(148 163 184)",
          textSecondary: "rgb(203 213 225)",
          accent: "rgb(139 92 246)",
          secondary: "rgb(236 72 153)",
          panel: "rgb(18 18 22)",
          panelHover: "rgb(26 26 32)",
          border: "rgba(255 255 255 / 0.08)",
          borderHover: "rgba(139 92 246 / 0.5)",
        },
      },
      fontFamily: {
        heading: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontWeight: {
        black: "900",
      },
      boxShadow: {
        panel: "0 24px 48px -12px rgba(0, 0, 0, 0.5)",
        "panel-hover": "0 32px 64px -16px rgba(0, 0, 0, 0.6)",
        glow: "0 0 40px rgba(139, 92, 246, 0.25)",
        "glow-hover": "0 0 60px rgba(139, 92, 246, 0.45)",
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
        xl: "28px",
        full: "9999px",
      },
    },
  },
  plugins: [],
}
