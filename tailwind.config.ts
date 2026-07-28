// import type { Config } from "tailwindcss"

// const config: Config = {
//   theme: {
//     extend: {
//  keyframes: {
//   marquee: {
//     from: { transform: "translateX(0%)" },
//     to: { transform: "translateX(-100%)" },   // left scroll
//   },
//   "marquee-reverse": {
//     from: { transform: "translateX(-100%)" }, // ✅ right scroll
//     to: { transform: "translateX(0%)" },
//   },
//   "marquee-vertical": {
//     from: { transform: "translateY(0%)" },
//     to: { transform: "translateY(-100%)" },
//   },
// },
// animation: {
//   marquee: "marquee var(--duration) linear infinite",
//   "marquee-reverse": "marquee-reverse var(--duration) linear infinite",
//   "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
// },
//     //   animation: {
//     //     marquee: "marquee var(--duration) linear infinite",
//     //     "marquee-vertical":
//     //       "marquee-vertical var(--duration) linear infinite",
//     //   },
//     },
//   },
// }

// export default config

import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      keyframes: {
        marquee: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(-100%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0%)" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0%)" },
          to: { transform: "translateY(-100%)" },
        },
      },

      animation: {
        marquee:
          "marquee var(--duration) linear infinite",

        "marquee-reverse":
          "marquee-reverse var(--duration) linear infinite",

        "marquee-vertical":
          "marquee-vertical var(--duration) linear infinite",
      },
    },
  },

  plugins: [typography],
};

export default config;