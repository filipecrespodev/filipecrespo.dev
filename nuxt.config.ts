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
  app: {
    head: {
      htmlAttrs: {
        lang: "pt-BR",
      },
      title: "Filipe Soares Crespo - Software Engineer",
      meta: [
        {
          name: "description",
          content:
            "Engenheiro de software com mais de 10 anos de experiência em desenvolvimento web, arquitetura de software e metodologias ágeis. Especializado em PHP, Laravel, Vue.js, Docker e DevOps.",
        },
        {
          name: "keywords",
          content:
            "Software Engineer, Desenvolvedor, PHP, Laravel, Vue.js, Docker, DevOps, Scrum, JavaScript, TypeScript",
        },
        { name: "author", content: "Filipe Soares Crespo" },
      ],
    },
  },
  runtimeConfig: {
    dbUrl: process.env.DB_URL,
    dbApi: process.env.DB_API,
    dbPass: process.env.DB_PASS,
  },
  nitro: {
    preset: "vercel",
  },
  vite: {
    plugins: [Inspect()],
  },
});
