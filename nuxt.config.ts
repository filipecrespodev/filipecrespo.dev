// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/hints",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
  ],
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-04-03",
  runtimeConfig: {
    dbUrl: process.env.DB_URL,
    dbApi: process.env.DB_API,
    dbPass: process.env.DB_PASS,
  },
  nitro: {
    preset: "vercel",
  },
});
