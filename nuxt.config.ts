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
  app: {
    head: {
      htmlAttrs: { lang: "pt-BR" },
      title: "Filipe Crespo — Software Engineer",
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
  vite: {
    plugins: [Inspect()],
  },
});
