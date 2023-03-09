/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#00353E",
        grey: "#E5EBEC",
        lightgreen: "#008768",
        red: "#E52713",
        black: "#000000",
        darkgrey: "#E3E3E3",
        bordercolor: "#C4C4C4",
        bgcolor: "#F5F5F5",
        bggreen: "#59A089",
        lightgraygreen: "#ADC6CB",
        hoverbgcolor: "#e5ebec9e",
        lightgrey: "#646363",
        darkred: "#FF685F",
        lightred: "#FFD7D5",
        lightgreen1: "#0087684D",
        darkgrey1: "#ECF3DA",
        darkgreen: "#00606A",
        bglighrgreen: "#CFDFD7",
        earthgreen: "#CFDFD7",
        lightpurple: "#DFD8FC",
        darkpurple: "#140073",
        lightyellow: "#FFF7D4",
        darkyellow: "#732A00",
        lightblue: "#CFE4FF",
        darkblue: "#2F89FC",
        lightpink: "#E7AFCC",
        darkpink: "#C70C6F"
      },

      fontFamily: {
        Jockey: ["Jockey one"],
        Aktiv: ["Aktiv Grotesk Corp"],
        Inter: ["Inter"],
      },
      zIndex: {
        100: "100",
      },
      width: {
        "screenvh/2" : "50px"
      }
    },
  },
  plugins: [],
  variants: {
    display: ["group-hover"],
  },
};
