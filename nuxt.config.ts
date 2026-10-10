// https://nuxt.com/docs/api/configuration/nuxt-config
import Inspect from "vite-plugin-inspect";

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
    "@nuxtjs/i18n",
  ],
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-04-03",
  ui: {
    colorMode: false,
  },
  fonts: {
    families: [
      { name: "Instrument Serif", provider: "google", weights: [400] },
      { name: "Inter", provider: "google", weights: [400, 500] },
    ],
  },
  i18n: {
    baseUrl: "https://filipecrespo.dev",
    defaultLocale: "pt-BR",
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
    locales: [
      {
        code: "pt-BR",
        language: "pt-BR",
        name: "Português",
        file: "pt-BR.json",
      },
      { code: "en", language: "en-US", name: "English", file: "en.json" },
      { code: "es", language: "es-ES", name: "Español", file: "es.json" },
    ],
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/en", "/es"],
    },
  },
  vite: {
    plugins: [Inspect()],
  },
});
