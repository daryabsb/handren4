/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    plugin(function ({ addVariant }) {
      // addVariant("blue", "&:blue");
      addVariant("blue", ".blue &");
      addVariant("pink", ".pink &");
      addVariant("green", ".green &");
      addVariant("yellow", ".yellow &");
    }),
  ],
};
