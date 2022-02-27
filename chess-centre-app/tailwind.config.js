const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const windmill = require("@windmill/react-ui/config");

module.exports = windmill({
  corePlugins: {
    ringColor: true
  },
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    listStyleType: {
      none: 'none'
    },
    extend: {
      sans: [defaultTheme.fontFamily.sans],
      boxShadow: {
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
      },
      colors: {
        ...colors,
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
        red: {
          '50': '#fdf2f2',
          '100': '#fde8e8',
          '200': '#fbd5d5',
          '300': '#f8b4b4',
          '400': '#f98080',
          '500': '#f05252',
          '600': '#e02424',
          '700': '#c81e1e',
          '800': '#9b1c1c',
          '900': '#771d1d',
        },
        orange: {
          '50': '#fff8f1',
          '100': '#feecdc',
          '200': '#fcd9bd',
          '300': '#fdba8c',
          '400': '#ff8a4c',
          '500': '#ff5a1f',
          '600': '#d03801',
          '700': '#b43403',
          '800': '#8a2c0d',
          '900': '#771d1d',
        },
        yellow: {
          '50': '#fdfdea',
          '100': '#fdf6b2',
          '200': '#fce96a',
          '300': '#faca15',
          '400': '#e3a008',
          '500': '#c27803',
          '600': '#9f580a',
          '700': '#8e4b10',
          '800': '#723b13',
          '900': '#633112',
        },
        green: {
          '50': '#f3faf7',
          '100': '#def7ec',
          '200': '#bcf0da',
          '300': '#84e1bc',
          '400': '#31c48d',
          '500': '#0e9f6e',
          '600': '#057a55',
          '700': '#046c4e',
          '800': '#03543f',
          '900': '#014737',
        },
        // BRAND COLORS:
        orange: {
          brand: "#f0802b",
          '50': '#fff8f1',
          '100': '#feecdc',
          '200': '#fcd9bd',
          '300': '#fdba8c',
          '400': '#ff8a4c',
          '500': '#ff5a1f',
          '600': '#d03801',
          '700': '#b43403',
          '800': '#8a2c0d',
          '900': '#771d1d',
        },
        teal: {
          brand: "#5499ab",
          '50': '#edfafa',
          '100': '#d5f5f6',
          '200': '#afecef',
          '300': '#7edce2',
          '400': '#16bdca',
          '500': '#0694a2',
          '600': '#047481',
          '700': '#036672',
          '800': '#05505c',
          '900': '#014451'
        },
        blue: {
          brand: "#2b374b",
          '50': '#ebf5ff',
          '100': '#e1effe',
          '200': '#c3ddfd',
          '300': '#a4cafe',
          '400': '#76a9fa',
          '500': '#3f83f8',
          '600': '#1c64f2',
          '700': '#1a56db',
          '800': '#1e429f',
          '900': '#233876',
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
