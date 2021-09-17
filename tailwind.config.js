module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      flex: {
        "1/2": "0 0 100%/2",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
