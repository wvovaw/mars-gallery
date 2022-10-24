// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon"],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "/api",
      apiKey: process.env.NUXT_PUBLIC_API_KEY,
    },
  },
  routes: {
    "*": { cors: true },
  },
});
