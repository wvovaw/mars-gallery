/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    prefix: "",
    darkTheme: "dark",
    themes: [
      "light",
      "dark", // Nice dark theme
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate", // Nice light theme
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua", // Nice blueprint
      "lofi", // Nice minimal b&w
      "pastel", // girls gonna like this theme
      "fantasy",
      "wireframe", // Nice minimal light theme witch comic sans font
      "black", // True black theme
      "luxury",
      "dracula", // Nice dark theme
      "cmyk",
      "autumn",
      "business", // Nice strict black theme (opposite to corporate)
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
  },
};
