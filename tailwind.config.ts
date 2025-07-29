import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base color scale using CSS variables from @layer base
        base: {
          50: "var(--base-50)",
          100: "var(--base-100)",
          150: "var(--base-150)",
          200: "var(--base-200)",
          300: "var(--base-300)",
          400: "var(--base-400)",
          500: "var(--base-500)",
          600: "var(--base-600)",
          700: "var(--base-700)",
          800: "var(--base-800)",
          900: "var(--base-900)",
          950: "var(--base-950)",
        },
        // Primary color scale
        primary: {
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          950: "var(--primary-950)",
          DEFAULT: "var(--primary-600)",
          foreground: "var(--primary-100)",
        },
        // Secondary color scale
        secondary: {
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          800: "var(--secondary-800)",
          900: "var(--secondary-900)",
          950: "var(--secondary-950)",
          DEFAULT: "var(--secondary-600)",
          foreground: "var(--secondary-200)",
        },
        // Tertiary color scale
        tertiary: {
          50: "var(--tertiary-50)",
          100: "var(--tertiary-100)",
          200: "var(--tertiary-200)",
          300: "var(--tertiary-300)",
          400: "var(--tertiary-400)",
          500: "var(--tertiary-500)",
          600: "var(--tertiary-600)",
          700: "var(--tertiary-700)",
          800: "var(--tertiary-800)",
          900: "var(--tertiary-900)",
          950: "var(--tertiary-950)",
          DEFAULT: "var(--tertiary-600)",
          foreground: "var(--tertiary-200)",
        },
        // Accent color scale
        accent: {
          50: "var(--accent-50)",
          100: "var(--accent-100)",
          200: "var(--accent-200)",
          300: "var(--accent-300)",
          400: "var(--accent-400)",
          500: "var(--accent-500)",
          600: "var(--accent-600)",
          700: "var(--accent-700)",
          800: "var(--accent-800)",
          900: "var(--accent-900)",
          950: "var(--accent-950)",
          DEFAULT: "var(--accent-600)",
          foreground: "var(--accent-200)",
        },
        // Semantic colors
        paper: "var(--accent-950)",
        ink: "var(--base-100)",
   
        muted: {
          DEFAULT: "var(--base-800)",
          foreground: "var(--base-300)",
        },
        // Status colors
        destructive: {
          DEFAULT: "hsla(0, 100%, var(--status-lightness), 1)",
          foreground: "hsla(0, 100%, var(--status-foreground-lightness), 1)",
        },
        warning: {
          DEFAULT: "hsla(60, 100%, var(--status-lightness), 1)",
          foreground: "hsla(60, 100%, var(--status-foreground-lightness), 1)",
        },
        success: {
          DEFAULT: "hsla(127, 100%, var(--status-lightness), 1)",
          foreground: "hsla(127, 100%, var(--status-foreground-lightness), 1)",
        },
        info: {
          DEFAULT: "hsla(200, 100%, var(--status-lightness), 1)",
          foreground: "hsla(200, 100%, var(--status-foreground-lightness), 1)",
        },
        // Component colors (shadcn)
		  background: "var(--paper)",
        foreground: "var(--ink)",
        card: {
          DEFAULT: "var(--primary-950)",
          foreground: "var(--ink)",
        },
        popover: {
          DEFAULT: "var(--primary-950)",
          foreground: "var(--ink)",
        },
        sidebar: {
          DEFAULT: "var(--primary-950)",
          foreground: "var(--ink)",
          primary: {
            DEFAULT: "var(--primary-700)",
            foreground: "var(--primary-100)",
          },
          secondary: {
            DEFAULT: "var(--secondary-700)",
            foreground: "var(--secondary-200)",
          },
          accent: {
            DEFAULT: "var(--accent-700)",
            foreground: "var(--accent-200)",
          },
          border: "var(--base-800)",
          ring: "var(--base-800)",
        },
        border: "var(--base-800)",
        input: "var(--base-800)",
        ring: "var(--base-800)",
        // Chart colors (these would need to be defined in CSS or use defaults)
        chart: {
          1: "var(--primary-500)",
          2: "var(--secondary-500)",
          3: "var(--tertiary-500)",
          4: "var(--accent-500)",
          5: "var(--base-500)",
        },
        // Legacy colors (kept for compatibility)
        "yellow-100": "#ffc657",
        "blue-100": "#5362ac",
        "white-15": "rgba(255,255,255,0.15)",
        "custom-1": "rgb(250, 250, 250)",
        "custom-2": "rgb(160, 160, 159)",
        "custom-3": "rgb(47, 46, 46)",
        site: "rgb(256, 256, 256)",
      },
      borderRadius: {
        xs: "calc(var(--base-radius) - 4px)",
        sm: "calc(var(--base-radius) - 2px)",
        md: "var(--base-radius)",
        lg: "calc(var(--base-radius) + 4px)",
        xl: "calc(var(--base-radius) + 8px)",
        "2xl": "calc(var(--base-radius) + 16px)",
        "3xl": "calc(var(--base-radius) + 24px)",
        "4xl": "calc(var(--base-radius) + 32px)",
      },
      fontSize: {
        12: "12px",
        18: "18px",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        mono: "var(--font-mono)",
        primary: "var(--font-primary)",
        secondary: "var(--font-secondary)",
        // Legacy fonts (kept for compatibility)
        roboto: ["Roboto", "sans-serif"],
        libre: ["Libre Baskerville", "serif"],
        madefor: ["Wix Madefor Display", "sans-serif"],
      },
      transitionDuration: {
        fast: "150ms",
        normal: "250ms",
        slow: "350ms",
      },
      transitionTimingFunction: {
        bounce: "cubic-bezier(0.47, 1.64, 0.41, 0.8)",
      },
      boxShadow: {
        primary:
          "0 0 0.625em var(--primary-500), 0 0 1.25em var(--primary-400), 0 0 2.5em var(--primary-300), 0 0 5em var(--primary-200)",
        "border-glow":
          "0 0 0.1rem var(--base-100), 0 0 0.1rem var(--base-100), 0 0 1rem var(--tw-shadow-color), 0 0 0.1rem var(--tw-shadow-color), 0 0 0.15rem var(--tw-shadow-color), inset 0 0 0.2rem var(--tw-shadow-color)",
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade 3s ease-in-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "bg-img-1": "var(--bg-img-1)",
        "bg-img-2": "var(--bg-img-2)",
        "bg-img-3": "var(--bg-img-3)",
        "bg-img-4": "var(--bg-img-4)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;