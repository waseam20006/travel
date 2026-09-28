import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#DF6951",
          hover: "#c8533c",
          light: "#FFF1EE",
        },
        secondary: {
          DEFAULT: "#F1A501",
          hover: "#d89201",
          light: "#FEF7E6",
        },
        dark: {
          DEFAULT: "#181E4B",
          heading: "#14183E",
          body: "#5E6282",
          surface: "#0F142E",
          card: "#161D3F",
          border: "#232D5B",
        }
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        volkhov: ["Volkhov", "serif"],
      },
      boxShadow: {
        primary: "0px 20px 35px rgba(241, 165, 1, 0.22)",
        danger: "0px 15px 30px rgba(223, 105, 81, 0.35)",
        card: "0px 25px 45px rgba(0, 0, 0, 0.06)",
        cardHover: "0px 35px 65px rgba(0, 0, 0, 0.12)",
      }
    },
  },
  plugins: [],
};
export default config;
