/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#0077D4",
        // primary: "#3f3c65",
        secondary: "#90cce2",
        tertiary: "#151030",
        quaternary: "#0d0c18",
        placeholder: "#131027",
        toggle1: "#00a1bb",
        toggle2: "#00b35b",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/bg/lab1.jpg')",
      },
    },
  },
  plugins: [],
};
