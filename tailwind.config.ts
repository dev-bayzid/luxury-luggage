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
        primary: {
          DEFAULT: "#111111",
          light: "#1A1A1A",
          dark: "#080808",
          muted: "#2B2B2B",
        },
        secondary: {
          DEFAULT: "#FFFFFF",
          offwhite: "#F8F8F8",
          subtle: "#F2F2F2",
        },
        accent: {
          DEFAULT: "#C8A96A",
          light: "#DDC48F",
          dark: "#A5874B",
          glow: "rgba(200, 169, 106, 0.15)",
        },
        neutral: {
          950: "#0D0D0D",
          900: "#111111",
          850: "#171717",
          800: "#222222",
          700: "#3F3F46",
          600: "#52525B",
          500: "#71717A",
          400: "#A1A1AA",
          300: "#D4D4D8",
          200: "#E4E4E7",
          100: "#F4F4F5",
          50: "#FAFAFA",
        }
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-cormorant)", "serif"],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.05), 0 0 1px 1px rgba(0,0,0,0.03)',
        'luxury-hover': '0 30px 60px -20px rgba(0, 0, 0, 0.12), 0 0 1px 1px rgba(200, 169, 106, 0.2)',
        'gold-glow': '0 0 25px -5px rgba(200, 169, 106, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
      },
      letterSpacing: {
        'widest-luxury': '0.25em',
        'ultra-wide': '0.35em',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
