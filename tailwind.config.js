/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "600px",
      sm2: "700px",
      md: "980px",
      lg: "1200px",
      xl: "1400px",
    },
    extend: {
      colors: {
        colorPurple: '#4c1d95',
        textblackblue: "#282f3a",
        whitesmoke: "#f9fafb",
        dark: "#15263D",
        // textlightgrey: "#667085",
        textlightgrey: "#7F8EA4",
        grayText: "#7F8EA4",
        purple: "#3F3EED",
        darkslateblue: "#344054",
        textgray: "#475467",
        mediumblue: "#3a00b7",
        textlightsteelblue: "#cdc9fe",
        midnightblue: "#1d2939",
      },
    },
  },
  plugins: [],
};
