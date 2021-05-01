const windmill = require("@windmill/react-ui/config");

module.exports = windmill({
  corePlugins: {
    ringColor: false
  },
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
      },
      colors: {
        gray: {
          50: "#FAFAFA",
          100: "#F4F4F5",
          200: "#E4E4E7",
          300: "#D4D4D8",
          400: "#A2A2A8",
          500: "#6E6E76",
          600: "#52525A",
          700: "#3F3F45",
          800: "#2E2E33",
          900: "#1D1D20",
        },
        indigo: {
          50: "#F8FBFF",
          100: "#EBF4FF",
          200: "#C3DAFE",
          300: "#A3BFFA",
          400: "#7F9CF5",
          500: "#667EEA",
          600: "#5A67D8",
          700: "#4C51BF",
          800: "#34399B",
          900: "#1E2156",
        },
        purple: {
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D8FD",
          300: "#D6BCFA",
          400: "#B794F4",
          500: "#9F7AEA",
          600: "#805AD5",
          700: "#6B46C1",
          800: "#553C9A",
          900: "#44337A",
        },
        pink: {
          50: "#FFF5F7",
          100: "#FFEBEF",
          200: "#FED7E2",
          300: "#FBB6CE",
          400: "#F687B3",
          500: "#ED64A6",
          600: "#D53F8C",
          700: "#B83280",
          800: "#97266D",
          900: "#702459",
        },
        // BRAND COLORS:
        orange: {
          brand: "#f0802b"
        },
        teal: {
          brand: "#5499ab"
        }
      },
      spacing: {
        128: "32rem",
        "9/16": "56.25%",
        "3/4": "75%",
        "1/1": "100%",
      },
      inset: {
        "1/2": "50%",
        full: "100%",
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.01em",
        wider: "0.02em",
        widest: "0.4em",
      },
      minWidth: {
        10: "2.5rem",
      },
      scale: {
        98: ".98",
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10%)" },
        },
      },
      zIndex: {
        "-1": "-1",
        "-10": "-10",
        "100": "100"
      },
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ["dark"],
      display: ["dark"],
      opacity: ["dark"],
      rotate: ["group-hover"],
      translate: ["group-hover"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
});
