/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/views/**/*.ejs"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addComponents }) {
      addComponents({
        //flex grid system
        ".row": {
          "--gutter-x": "1.5rem",
          "--gutter-y": 0,
          "display": "flex",
          "flex-wrap": "wrap",
          "margin-top": "calc(-1 * var(--gutter-y))",
          "margin-right": "calc(-0.5 * var(--gutter-x))",
          "margin-left": "calc(-0.5 * var(--gutter-x))",
        },
        ".row > *": {
          "box-sizing": "border-box",
          "flex-shrink": 0,
          "width": "100%",
          "max-width": "100%",
          "padding-right": "calc(var(--gutter-x) * 0.5)",
          "padding-left": "calc(var(--gutter-x) * 0.5)",
          "margin-top": "var(--gutter-y)",
        },
        ".col": {
          flex: "1 0 0%",
        },
        ".row-cols-auto > *": {
          flex: "0 0 auto",
          width: "auto",
        },
        ".row-cols-1 > *": {
          flex: "0 0 auto",
          width: "100%",
        },
        ".row-cols-2 > *": {
          flex: "0 0 auto",
          width: "50%",
        },
        ".row-cols-3 > *": {
          flex: "0 0 auto",
          width: "33.3333333333%",
        },
        ".row-cols-4 > *": {
          flex: "0 0 auto",
          width: "25%",
        },
        ".row-cols-5 > *": {
          flex: "0 0 auto",
          width: "20%",
        },
        ".row-cols-6 > *": {
          flex: "0 0 auto",
          width: "16.6666666667%",
        },
        ".col-auto": {
          flex: "0 0 auto",
          width: "auto",
        },
        ".col-1": {
          flex: "0 0 auto",
          width: "8.33333333%",
        },
        ".col-2": {
          flex: "0 0 auto",
          width: "16.66666667%",
        },
        ".col-3": {
          flex: "0 0 auto",
          width: "25%",
        },
        ".col-4": {
          flex: "0 0 auto",
          width: "33.33333333%",
        },
        ".col-5": {
          flex: "0 0 auto",
          width: "41.66666667%",
        },
        ".col-6": {
          flex: "0 0 auto",
          width: "50%",
        },
        ".col-7": {
          flex: "0 0 auto",
          width: "58.33333333%",
        },
        ".col-8": {
          flex: "0 0 auto",
          width: "66.66666667%",
        },
        ".col-9": {
          flex: "0 0 auto",
          width: "75%",
        },
        ".col-10": {
          flex: "0 0 auto",
          width: "83.33333333%",
        },
        ".col-11": {
          flex: "0 0 auto",
          width: "91.66666667%",
        },
        ".col-12": {
          flex: "0 0 auto",
          width: "100%",
        },
        ".g-0, .gx-0": {
          "--gutter-x": 0,
        },
        ".g-0, .gy-0": {
          "--gutter-y": 0,
        },
        ".g-1, .gx-1": {
          "--gutter-x": "0.25rem",
        },
        ".g-1, .gy-1": {
          "--gutter-y": "0.25rem",
        },
        ".g-2, .gx-2": {
          "--gutter-x": "0.5rem",
        },
        ".g-2, .gy-2": {
          "--gutter-y": "0.5rem",
        },
        ".g-3, .gx-3": {
          "--gutter-x": "1rem",
        },
        ".g-3, .gy-3": {
          "--gutter-y": "1rem",
        },
        ".g-4, .gx-4": {
          "--gutter-x": "1.5rem",
        },
        ".g-4, .gy-4": {
          "--gutter-y": "1.5rem",
        },
        ".g-5, .gx-5": {
          "--gutter-x": "3rem",
        },
        ".g-5, .gy-5": {
          "--gutter-y": "3rem",
        },
      });
    }),
  ],
};
