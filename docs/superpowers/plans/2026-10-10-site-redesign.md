# Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn filipecrespo.dev into a static, single-page, minimal editorial site in pt-BR/en/es with light animations, featuring Meus Prompts and Brincaki.

**Architecture:** Nuxt 4 prerendered with `nuxt generate` (no server). `@nuxtjs/i18n` serves `/` (pt-BR), `/en`, `/es` from JSON locale files. One page composed of small components; scroll animations via a client-only `v-reveal` directive (IntersectionObserver) and CSS keyframes, all disabled under `prefers-reduced-motion`.

**Tech Stack:** Nuxt 4, @nuxt/ui 4 (Tailwind v4), @nuxtjs/i18n 10, @nuxt/fonts, @nuxt/icon, Bun 1.4 (`bun test` for build-output tests).

**Spec:** `docs/superpowers/specs/2026-10-10-site-redesign-design.md`

## Global Constraints

- Static output only: `bun run build` runs `nuxt generate`; no `server/`, no `runtimeConfig` secrets, no `nitro.preset`.
- Locales: `pt-BR` at `/` (default), `en` at `/en`, `es` at `/es`; `strategy: "prefix_except_default"`; `detectBrowserLanguage: false`; `baseUrl: "https://filipecrespo.dev"`.
- All user-visible copy lives in `i18n/locales/{pt-BR,en,es}.json`; the three files must have identical key sets.
- No new runtime dependencies besides `@nuxtjs/i18n`. Animations use CSS + IntersectionObserver only.
- Every animation/transition is wrapped in `@media (prefers-reduced-motion: no-preference)`; content is visible without JS.
- No contact e-mail is published. Contact = LinkedIn + GitHub only.
- WCAG 2 AA contrast in light and dark (`prefers-color-scheme`).
- Commits follow Conventional Commits (commitlint is enforced by husky); end messages with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **No JavaScript / crawler view** — every section's text must be in the static HTML and not hidden by a class. Pinned in Task 5 (`no element ships with the reveal class`).
2. **Missing translation in one locale** — a key added to pt-BR but not en/es would render the raw key. Pinned in Task 2 (locale key parity test).
3. **Language switcher on a non-default locale** — from `/es`, "PT" must go to `/`, not `/es` or `/pt-BR`. Pinned in Task 3 (switcher hrefs test on each page).
4. **Project without a URL (Brincaki)** — must render as plain text, not an `<a href="undefined">`. Pinned in Task 4.
5. **Accessibility tools running mid-animation** — pa11y/Lighthouse may sample while hero is fading in and flag contrast. Mitigated in Task 6 (pa11y `wait: 2000`, animations ≤ 1.2s total).

---

## File Map

| File | Responsibility |
|---|---|
| `nuxt.config.ts` | Modules, i18n config, prerender routes |
| `package.json` | Scripts (`build` → generate, `test`), deps |
| `tests/static-output.test.ts` | Assertions on generated HTML in `.output/public` |
| `tests/locales.test.ts` | Locale key parity |
| `i18n/locales/{pt-BR,en,es}.json` | All copy |
| `app/app.vue` | Shell: skip link, header, main, footer, locale head/SEO |
| `app/assets/css/main.css` | Design tokens, globals, reveal classes |
| `app/components/AppHeader.vue` | Name + LangSwitcher |
| `app/components/LangSwitcher.vue` | PT · EN · ES links |
| `app/components/AppFooter.vue` | Copyright + back to top |
| `app/components/SectionBlock.vue` | Numbered section wrapper with `v-reveal` |
| `app/components/ProjectItem.vue` | One project row |
| `app/components/AppSocialLinks.vue` | LinkedIn/GitHub links (restyled) |
| `app/data/projects.ts` | Non-translatable project data |
| `app/plugins/reveal.ts` | `v-reveal` directive |
| `app/pages/index.vue` | Hero + three sections |
| `.pa11yci.json`, `lighthouserc.json` | a11y audit routes |

---

### Task 1: Remove blog/server and switch to static generation

**Files:**
- Delete: `server/`, `app/pages/blog/`, `app/pages/projetos.vue`, `content.config.ts`, `insert-posts.sql`, `scripts/migrate-posts-to-supabase.ts`, `app/components/AppSidebar.vue`, `app/components/AppCounter.vue`, `app/components/AppAlert.vue`
- Modify: `nuxt.config.ts`, `package.json`, `.env.example`, `.depcheckrc.json`, `app/app.vue`
- Create: `tests/static-output.test.ts`

**Interfaces:**
- Produces: `bun run build` → `.output/public/index.html`; `tests/static-output.test.ts` exporting nothing, with helper `page(route)` used by later tasks.

- [ ] **Step 1: Write the failing test**

Create `tests/static-output.test.ts`:

```ts
import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const out = join(import.meta.dir, "..", ".output", "public");
const page = (route: string) =>
  readFileSync(join(out, route, "index.html"), "utf8");

describe("static output", () => {
  test("generates the home page", () => {
    expect(existsSync(join(out, "index.html"))).toBe(true);
  });

  test("does not generate blog or projetos pages", () => {
    expect(existsSync(join(out, "blog"))).toBe(false);
    expect(existsSync(join(out, "projetos"))).toBe(false);
  });

  test("home page has no links to removed routes", () => {
    const html = page("");
    expect(html).not.toContain('href="/blog');
    expect(html).not.toContain('href="/projetos');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/static-output.test.ts`
Expected: FAIL — `.output/public/index.html` does not exist (project currently builds with the `vercel` preset, not static).

- [ ] **Step 3: Delete blog/server files**

```bash
git rm -r server app/pages/blog app/pages/projetos.vue content.config.ts insert-posts.sql scripts/migrate-posts-to-supabase.ts app/components/AppSidebar.vue app/components/AppCounter.vue app/components/AppAlert.vue
```

If `scripts/` is now empty, git already dropped it.

- [ ] **Step 4: Simplify `app/app.vue`** (temporary shell; Task 3 replaces it)

```vue
<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
```

- [ ] **Step 5: Update `nuxt.config.ts`**

Replace the whole file with:

```ts
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
```

(`ui.colorMode: false` — theme follows `prefers-color-scheme` via CSS tokens instead of a `.dark` class.)

- [ ] **Step 6: Update `package.json`**

In `scripts`: set `"build": "nuxt generate"`, add `"test": "bun test"`, remove `"migrate:posts"`.
In `dependencies`: remove `@supabase/supabase-js`, `better-sqlite3`, `gray-matter`, `marked`.
In `devDependencies`: remove `tsx`, `dotenv`; add `"@types/bun": "^1.3.0"`.

Then run: `bun install`
Expected: lockfile updated, no errors. Also delete the stale `package-lock.json` only if the user confirms — **do not delete it in this task** (out of scope).

- [ ] **Step 7: Update `.env.example` and `.depcheckrc.json`**

`.env.example` — replace contents with an empty file (no env vars needed):

```bash
: > .env.example
```

`.depcheckrc.json` — in `ignores`, remove `"tsx"` and `"dotenv"`, add `"@types/bun"`.

- [ ] **Step 8: Generate and run the test**

Run: `bun run build && bun test tests/static-output.test.ts`
Expected: generate finishes with "Prerendered N routes"; 3 tests PASS.

- [ ] **Step 9: Run validate**

Run: `bun run validate`
Expected: PASS. If `vue-tsc` complains about `bun:test` types, add `"types": ["bun"]` via a `tests/tsconfig.json`:

```json
{ "compilerOptions": { "types": ["bun"], "module": "ESNext", "moduleResolution": "Bundler", "strict": true, "noEmit": true }, "include": ["./**/*.ts"] }
```

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "refactor: remove blog and switch to static generation

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: i18n with pt-BR, en, es

**Files:**
- Modify: `nuxt.config.ts`, `package.json`, `.depcheckrc.json`, `app/app.vue`, `tests/static-output.test.ts`
- Create: `i18n/locales/pt-BR.json`, `i18n/locales/en.json`, `i18n/locales/es.json`, `tests/locales.test.ts`

**Interfaces:**
- Consumes: Task 1 `page(route)` helper.
- Produces: message keys used by Tasks 3–5 (exact list in the JSON below); `useI18n()`, `useSwitchLocalePath()`, `useLocalePath()` available.

- [ ] **Step 1: Write failing tests**

Create `tests/locales.test.ts`:

```ts
import { expect, test } from "bun:test";
import ptBR from "../i18n/locales/pt-BR.json";
import en from "../i18n/locales/en.json";
import es from "../i18n/locales/es.json";

type Messages = { [key: string]: string | Messages };

const keys = (obj: Messages, prefix = ""): string[] =>
  Object.entries(obj).flatMap(([k, v]) =>
    typeof v === "string" ? [`${prefix}${k}`] : keys(v, `${prefix}${k}.`),
  );

test("en has the same keys as pt-BR", () => {
  expect(keys(en).sort()).toEqual(keys(ptBR).sort());
});

test("es has the same keys as pt-BR", () => {
  expect(keys(es).sort()).toEqual(keys(ptBR).sort());
});

test("no message is empty", () => {
  for (const messages of [ptBR, en, es]) {
    for (const key of keys(messages)) {
      const value = key
        .split(".")
        .reduce<unknown>((o, k) => (o as Messages)[k], messages);
      expect(String(value).trim().length).toBeGreaterThan(0);
    }
  }
});
```

Append to `tests/static-output.test.ts` (inside the file, after the existing `describe`):

```ts
describe("i18n", () => {
  const cases = [
    { route: "", lang: "pt-BR", title: "Filipe Crespo — Engenheiro de Software" },
    { route: "en", lang: "en-US", title: "Filipe Crespo — Software Engineer" },
    { route: "es", lang: "es-ES", title: "Filipe Crespo — Ingeniero de Software" },
  ];

  for (const { route, lang, title } of cases) {
    test(`/${route} has lang ${lang} and localized title`, () => {
      const html = page(route);
      expect(html).toContain(`lang="${lang}"`);
      expect(html).toContain(`<title>${title}</title>`);
      expect(html).toMatch(/<meta name="description" content="[^"]+"/);
    });

    test(`/${route} has hreflang alternates`, () => {
      const html = page(route);
      expect(html).toContain('hreflang="pt-BR" href="https://filipecrespo.dev"');
      expect(html).toContain('hreflang="en-US" href="https://filipecrespo.dev/en"');
      expect(html).toContain('hreflang="es-ES" href="https://filipecrespo.dev/es"');
      expect(html).toContain('hreflang="x-default"');
    });
  }
});
```

Note: unhead may emit attributes in a different order (`href` before `hreflang`). If the hreflang test fails only on attribute order, change those assertions to regexes like `/<link[^>]*hreflang="en-US"[^>]*>/` plus a separate check that the matched tag contains `href="https://filipecrespo.dev/en"`. Do not change the expected values.

- [ ] **Step 2: Run tests to verify they fail**

Run: `bun test`
Expected: FAIL — `Cannot find module '../i18n/locales/pt-BR.json'`.

- [ ] **Step 3: Install i18n**

Run: `bun add @nuxtjs/i18n@^10.6.0`
Add `"@nuxtjs/*"` to `.depcheckrc.json` `ignores`.

- [ ] **Step 4: Create locale files**

`i18n/locales/pt-BR.json`:

```json
{
  "meta": {
    "title": "Filipe Crespo — Engenheiro de Software",
    "description": "Engenheiro de software há mais de 10 anos. Construo produtos web simples e úteis, como o Meus Prompts e o Brincaki."
  },
  "a11y": {
    "skip": "Pular para o conteúdo",
    "language": "Idioma",
    "newTab": "(abre em nova aba)",
    "social": "Redes sociais"
  },
  "hero": {
    "role": "Engenheiro de Software",
    "bio": "Pai, marido e engenheiro de software há mais de 10 anos. Gosto de transformar ideias em produtos simples, úteis e bem feitos.",
    "photoAlt": "Retrato em preto e branco de Filipe Soares Crespo"
  },
  "about": {
    "label": "Sobre",
    "title": "Engenharia, produto e comunidade.",
    "body": "Comecei construindo sistemas web com PHP e Laravel e hoje trabalho com TypeScript, Vue e arquitetura de software. Já palestrei no PHP Summit e no TheDevConference, e gosto de compartilhar o que aprendo construindo produtos de ponta a ponta."
  },
  "projects": {
    "label": "Projetos",
    "title": "O que estou construindo.",
    "items": {
      "meusprompts": {
        "description": "Plataforma para criar, publicar e compartilhar prompts de IA, com métricas e comunidade.",
        "status": "No ar"
      },
      "brincaki": {
        "description": "Novo projeto em construção. Mais detalhes em breve.",
        "status": "Em breve"
      }
    }
  },
  "contact": {
    "label": "Contato",
    "title": "Vamos conversar.",
    "body": "Aberto a conversas sobre produto, engenharia e novas ideias. Me encontre nas redes abaixo."
  },
  "footer": {
    "backToTop": "Voltar ao topo"
  }
}
```

`i18n/locales/en.json`:

```json
{
  "meta": {
    "title": "Filipe Crespo — Software Engineer",
    "description": "Software engineer with 10+ years of experience. I build simple, useful web products like Meus Prompts and Brincaki."
  },
  "a11y": {
    "skip": "Skip to content",
    "language": "Language",
    "newTab": "(opens in a new tab)",
    "social": "Social links"
  },
  "hero": {
    "role": "Software Engineer",
    "bio": "Father, husband and software engineer for over 10 years. I like turning ideas into simple, useful, well-crafted products.",
    "photoAlt": "Black and white portrait of Filipe Soares Crespo"
  },
  "about": {
    "label": "About",
    "title": "Engineering, product and community.",
    "body": "I started building web systems with PHP and Laravel and now work with TypeScript, Vue and software architecture. I have spoken at PHP Summit and TheDevConference, and I enjoy sharing what I learn while building products end to end."
  },
  "projects": {
    "label": "Projects",
    "title": "What I'm building.",
    "items": {
      "meusprompts": {
        "description": "A platform to create, publish and share AI prompts, with metrics and a community.",
        "status": "Live"
      },
      "brincaki": {
        "description": "A new project in the works. More details soon.",
        "status": "Coming soon"
      }
    }
  },
  "contact": {
    "label": "Contact",
    "title": "Let's talk.",
    "body": "Open to conversations about product, engineering and new ideas. Find me on the links below."
  },
  "footer": {
    "backToTop": "Back to top"
  }
}
```

`i18n/locales/es.json`:

```json
{
  "meta": {
    "title": "Filipe Crespo — Ingeniero de Software",
    "description": "Ingeniero de software con más de 10 años de experiencia. Construyo productos web simples y útiles, como Meus Prompts y Brincaki."
  },
  "a11y": {
    "skip": "Saltar al contenido",
    "language": "Idioma",
    "newTab": "(se abre en una nueva pestaña)",
    "social": "Redes sociales"
  },
  "hero": {
    "role": "Ingeniero de Software",
    "bio": "Padre, esposo e ingeniero de software desde hace más de 10 años. Me gusta convertir ideas en productos simples, útiles y bien hechos.",
    "photoAlt": "Retrato en blanco y negro de Filipe Soares Crespo"
  },
  "about": {
    "label": "Sobre mí",
    "title": "Ingeniería, producto y comunidad.",
    "body": "Empecé construyendo sistemas web con PHP y Laravel y hoy trabajo con TypeScript, Vue y arquitectura de software. He dado charlas en PHP Summit y TheDevConference, y me gusta compartir lo que aprendo construyendo productos de principio a fin."
  },
  "projects": {
    "label": "Proyectos",
    "title": "Lo que estoy construyendo.",
    "items": {
      "meusprompts": {
        "description": "Plataforma para crear, publicar y compartir prompts de IA, con métricas y comunidad.",
        "status": "En línea"
      },
      "brincaki": {
        "description": "Un nuevo proyecto en construcción. Más detalles pronto.",
        "status": "Próximamente"
      }
    }
  },
  "contact": {
    "label": "Contacto",
    "title": "Hablemos.",
    "body": "Abierto a conversaciones sobre producto, ingeniería y nuevas ideas. Encuéntrame en los enlaces de abajo."
  },
  "footer": {
    "backToTop": "Volver arriba"
  }
}
```

- [ ] **Step 5: Configure i18n in `nuxt.config.ts`**

Add `"@nuxtjs/i18n"` to the end of `modules`. Remove the `app.head` block (i18n now owns `lang` and title). Change `nitro.prerender.routes` to `["/", "/en", "/es"]`. Add:

```ts
  i18n: {
    baseUrl: "https://filipecrespo.dev",
    defaultLocale: "pt-BR",
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
    locales: [
      { code: "pt-BR", language: "pt-BR", name: "Português", file: "pt-BR.json" },
      { code: "en", language: "en-US", name: "English", file: "en.json" },
      { code: "es", language: "es-ES", name: "Español", file: "es.json" },
    ],
  },
```

- [ ] **Step 6: Wire head/SEO in `app/app.vue`**

```vue
<script setup lang="ts">
const { t } = useI18n();
const head = useLocaleHead({ dir: true, lang: true, seo: true });

useHead(() => ({
  htmlAttrs: head.value.htmlAttrs,
  link: head.value.link,
  meta: head.value.meta,
}));

useSeoMeta({
  title: () => t("meta.title"),
  description: () => t("meta.description"),
  ogTitle: () => t("meta.title"),
  ogDescription: () => t("meta.description"),
  ogType: "website",
  author: "Filipe Soares Crespo",
});
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
```

- [ ] **Step 7: Run build and tests**

Run: `bun run build && bun test`
Expected: all tests PASS; `.output/public/en/index.html` and `.output/public/es/index.html` exist.

- [ ] **Step 8: Validate and commit**

Run: `bun run validate` → PASS.

```bash
git add -A
git commit -m "feat: add i18n with pt-BR, en and es

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Design tokens, header, language switcher, footer

**Files:**
- Modify: `app/assets/css/main.css`, `app/app.vue`, `tests/static-output.test.ts`
- Create: `app/components/AppHeader.vue`, `app/components/LangSwitcher.vue`, `app/components/AppFooter.vue`

**Interfaces:**
- Consumes: i18n keys `a11y.skip`, `a11y.language`, `footer.backToTop`, `hero.role`.
- Produces: CSS tokens `--bg --fg --muted --line --accent --font-display --font-body --ease-out`, global `.container` class, `#top` anchor on header, `#main` on `<main>`.

- [ ] **Step 1: Write failing tests**

Append to `tests/static-output.test.ts`:

```ts
describe("layout", () => {
  const switcherHrefs = { "": "/", en: "/en", es: "/es" };

  for (const route of ["", "en", "es"]) {
    test(`/${route} language switcher links to all locales`, () => {
      const html = page(route);
      for (const href of Object.values(switcherHrefs)) {
        expect(html).toMatch(new RegExp(`<a[^>]*href="${href}"[^>]*class="lang-link`));
      }
    });

    test(`/${route} marks the current locale with aria-current`, () => {
      const html = page(route);
      const current = switcherHrefs[route as keyof typeof switcherHrefs];
      expect(html).toMatch(
        new RegExp(`<a[^>]*href="${current}"[^>]*aria-current="page"|<a[^>]*aria-current="page"[^>]*href="${current}"`),
      );
    });

    test(`/${route} has skip link, header anchor and footer back-to-top`, () => {
      const html = page(route);
      expect(html).toContain('href="#main"');
      expect(html).toContain('id="main"');
      expect(html).toContain('id="top"');
      expect(html).toContain('href="#top"');
    });
  }
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `bun run build && bun test`
Expected: FAIL in `layout` (no `lang-link`, no `#main`).

- [ ] **Step 3: Write `app/assets/css/main.css`**

```css
@import "tailwindcss";
@import "@nuxt/ui";

:root {
  --bg: #fafaf9;
  --fg: #1c1917;
  --muted: #57534e;
  --line: #e7e5e4;
  --accent: #c2410c;
  --font-display: "Instrument Serif", ui-serif, georgia, serif;
  --font-body: "Inter", ui-sans-serif, system-ui, sans-serif;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0c0a09;
    --fg: #f5f5f4;
    --muted: #a8a29e;
    --line: #292524;
    --accent: #fb923c;
  }
}

html {
  background: var(--bg);
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: var(--accent);
  color: var(--bg);
}

a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 2px;
}

.container {
  width: 100%;
  max-width: 45rem;
  margin-inline: auto;
  padding-inline: 1.25rem;
}

.skip-link {
  position: absolute;
  top: -100px;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: var(--fg);
  color: var(--bg);
  z-index: 100;
}

.skip-link:focus {
  top: 1rem;
}
```

- [ ] **Step 3b: Declare fonts in `nuxt.config.ts`**

`@nuxt/fonts` may not resolve families referenced only through CSS custom properties, so declare them. Add at top level of the config:

```ts
  fonts: {
    families: [
      { name: "Instrument Serif", provider: "google", weights: [400] },
      { name: "Inter", provider: "google", weights: [400, 500] },
    ],
  },
```

- [ ] **Step 4: Create `app/components/LangSwitcher.vue`**

```vue
<script setup lang="ts">
const { locales, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const labels: Record<string, string> = { "pt-BR": "PT", en: "EN", es: "ES" };
</script>

<template>
  <nav :aria-label="t('a11y.language')">
    <ul class="lang-switcher">
      <li v-for="item in locales" :key="item.code">
        <NuxtLink
          :to="switchLocalePath(item.code)"
          :lang="item.language"
          :hreflang="item.language"
          class="lang-link"
        >
          {{ labels[item.code] }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.lang-switcher {
  display: flex;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
}

.lang-switcher li + li::before {
  content: "·";
  margin-right: 0.25rem;
  color: var(--muted);
}

.lang-link {
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.lang-link:hover,
.lang-link[aria-current="page"] {
  color: var(--fg);
}
</style>
```

(NuxtLink sets `aria-current="page"` on the exact-active route automatically.)

- [ ] **Step 5: Create `app/components/AppHeader.vue`**

```vue
<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
</script>

<template>
  <header id="top" class="site-header container">
    <NuxtLink :to="localePath('/')" class="site-name">
      Filipe Crespo
      <span class="site-role">— {{ t("hero.role") }}</span>
    </NuxtLink>
    <LangSwitcher />
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 1.5rem;
}

.site-name {
  color: var(--fg);
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
}

.site-role {
  color: var(--muted);
  font-weight: 400;
}

@media (width <= 480px) {
  .site-role {
    display: none;
  }
}
</style>
```

- [ ] **Step 6: Create `app/components/AppFooter.vue`**

```vue
<script setup lang="ts">
const { t } = useI18n();
const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer container">
    <p>© {{ year }} Filipe Soares Crespo</p>
    <a href="#top" class="back-to-top">
      {{ t("footer.backToTop") }} <span aria-hidden="true">↑</span>
    </a>
  </footer>
</template>

<style scoped>
.site-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 3rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.875rem;
}

.site-footer p {
  margin: 0;
}

.back-to-top {
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.back-to-top:hover {
  color: var(--fg);
}
</style>
```

- [ ] **Step 7: Update `app/app.vue` template**

Keep the `<script setup>` from Task 2; replace the template with:

```vue
<template>
  <UApp>
    <a href="#main" class="skip-link">{{ t("a11y.skip") }}</a>
    <AppHeader />
    <main id="main" class="site-main">
      <NuxtPage />
    </main>
    <AppFooter />
  </UApp>
</template>
```

- [ ] **Step 8: Run build and tests**

Run: `bun run build && bun test`
Expected: all PASS.

- [ ] **Step 9: Validate and commit**

Run: `bun run validate` → PASS.

```bash
git add -A
git commit -m "feat: add design tokens, header, language switcher and footer

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Home page content (hero, about, projects, contact)

**Files:**
- Create: `app/data/projects.ts`, `app/components/SectionBlock.vue`, `app/components/ProjectItem.vue`
- Modify: `app/pages/index.vue` (full rewrite), `app/components/AppSocialLinks.vue`, `tests/static-output.test.ts`

**Interfaces:**
- Consumes: tokens and `.container` from Task 3; i18n keys `hero.*`, `about.*`, `projects.*`, `contact.*`, `a11y.newTab`, `a11y.social`.
- Produces: `Project` type `{ id: string; name: string; url?: string }`, `projects: Project[]` from `~/data/projects`; `SectionBlock` props `{ id: string; number: string; label: string; title: string }` with root `<section>` (Task 5 adds `v-reveal` here); `ProjectItem` props `{ project: Project; index: number }`.

- [ ] **Step 1: Write failing tests**

Append to `tests/static-output.test.ts`:

```ts
describe("home content", () => {
  test("hero shows the name as h1", () => {
    expect(page("")).toMatch(/<h1[^>]*>[\s\S]*Filipe[\s\S]*Crespo[\s\S]*<\/h1>/);
  });

  test("sections are numbered 01, 02, 03 in every locale", () => {
    for (const route of ["", "en", "es"]) {
      const html = page(route);
      for (const id of ["about", "projects", "contact"]) {
        expect(html).toContain(`id="${id}"`);
      }
      expect(html.indexOf(">01<")).toBeLessThan(html.indexOf(">02<"));
      expect(html.indexOf(">02<")).toBeLessThan(html.indexOf(">03<"));
    }
  });

  test("Meus Prompts links out safely in a new tab", () => {
    const html = page("");
    expect(html).toMatch(
      /<a[^>]*href="https:\/\/meusprompts\.vercel\.app"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/,
    );
    expect(html).toContain("(abre em nova aba)");
  });

  test("Brincaki renders without a link", () => {
    const html = page("");
    expect(html).toContain("Brincaki");
    expect(html).not.toContain('href="undefined"');
    expect(html).not.toMatch(/<a[^>]*>[^<]*(<[^a][^>]*>[^<]*)*Brincaki/);
  });

  test("project descriptions are localized", () => {
    expect(page("en")).toContain("A platform to create, publish and share AI prompts");
    expect(page("es")).toContain("Plataforma para crear, publicar y compartir prompts");
  });

  test("contact has LinkedIn and GitHub but no e-mail", () => {
    const html = page("");
    expect(html).toContain("https://pt.linkedin.com/in/filipescrespo");
    expect(html).toContain("https://github.com/filipecrespodev");
    expect(html).not.toContain("mailto:");
  });

  test("portrait has localized alt text", () => {
    expect(page("en")).toContain('alt="Black and white portrait of Filipe Soares Crespo"');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `bun run build && bun test`
Expected: FAIL in `home content` (old page has no `id="about"`).

- [ ] **Step 3: Create `app/data/projects.ts`**

```ts
export interface Project {
  id: string;
  name: string;
  url?: string;
}

// Descriptions and status live in i18n/locales under projects.items.<id>.
export const projects: Project[] = [
  {
    id: "meusprompts",
    name: "Meus Prompts",
    url: "https://meusprompts.vercel.app",
  },
  { id: "brincaki", name: "Brincaki" },
];
```

- [ ] **Step 4: Create `app/components/SectionBlock.vue`**

```vue
<script setup lang="ts">
const { id, number, label, title } = defineProps<{
  id: string;
  number: string;
  label: string;
  title: string;
}>();
</script>

<template>
  <section :id="id" class="section" :aria-labelledby="`${id}-title`">
    <p class="section-label">
      <span class="section-number">{{ number }}</span> / {{ label }}
    </p>
    <h2 :id="`${id}-title`" class="section-title">{{ title }}</h2>
    <slot />
  </section>
</template>

<style scoped>
.section {
  padding-block: 4rem;
  border-top: 1px solid var(--line);
}

.section-label {
  margin: 0 0 1rem;
  color: var(--muted);
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-number {
  color: var(--accent);
}

.section-title {
  margin: 0 0 1.5rem;
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 400;
  line-height: 1.1;
}
</style>
```

- [ ] **Step 5: Create `app/components/ProjectItem.vue`**

```vue
<script setup lang="ts">
import type { Project } from "~/data/projects";

const { project, index } = defineProps<{ project: Project; index: number }>();
const { t } = useI18n();

const number = computed(() => String(index + 1).padStart(2, "0"));
const description = computed(() =>
  t(`projects.items.${project.id}.description`),
);
const status = computed(() => t(`projects.items.${project.id}.status`));
</script>

<template>
  <li class="project">
    <a
      v-if="project.url"
      :href="project.url"
      target="_blank"
      rel="noopener noreferrer"
      class="project-row project-row--link"
    >
      <span class="project-number">{{ number }}</span>
      <span class="project-body">
        <span class="project-name">{{ project.name }}</span>
        <span class="project-description">{{ description }}</span>
      </span>
      <span class="project-status">{{ status }}</span>
      <span class="project-arrow" aria-hidden="true">↗</span>
      <span class="sr-only">{{ t("a11y.newTab") }}</span>
    </a>
    <div v-else class="project-row">
      <span class="project-number">{{ number }}</span>
      <span class="project-body">
        <span class="project-name">{{ project.name }}</span>
        <span class="project-description">{{ description }}</span>
      </span>
      <span class="project-status">{{ status }}</span>
    </div>
  </li>
</template>

<style scoped>
.project + .project {
  border-top: 1px solid var(--line);
}

.project-row {
  display: grid;
  grid-template-columns: 2.5rem 1fr auto 1.25rem;
  align-items: baseline;
  gap: 1rem;
  padding-block: 1.25rem;
  color: var(--fg);
  text-decoration: none;
}

.project-number,
.project-status {
  color: var(--muted);
  font-size: 0.8125rem;
}

.project-body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.project-name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(currentcolor, currentcolor) 0 100% / 0 1px
    no-repeat;
}

.project-description {
  color: var(--muted);
  font-size: 0.9375rem;
}

.project-arrow {
  color: var(--accent);
}

@media (prefers-reduced-motion: no-preference) {
  .project-name {
    transition: background-size 0.4s var(--ease-out);
  }

  .project-arrow {
    transition: transform 0.3s var(--ease-out);
  }
}

.project-row--link:hover .project-name,
.project-row--link:focus-visible .project-name {
  background-size: 100% 1px;
}

.project-row--link:hover .project-arrow,
.project-row--link:focus-visible .project-arrow {
  transform: translate(3px, -3px);
}

@media (width <= 480px) {
  .project-row {
    grid-template-columns: 2rem 1fr 1.25rem;
  }

  .project-status {
    display: none;
  }
}
</style>
```

- [ ] **Step 6: Restyle `app/components/AppSocialLinks.vue`**

Replace the whole file with (props removed — no caller uses variants anymore):

```vue
<script setup lang="ts">
const { t } = useI18n();

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://pt.linkedin.com/in/filipescrespo",
    icon: "mdi:linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/filipecrespodev",
    icon: "mdi:github",
  },
];
</script>

<template>
  <ul class="social-links" :aria-label="t('a11y.social')">
    <li v-for="social in socialLinks" :key="social.name">
      <a
        :href="social.url"
        target="_blank"
        rel="noopener noreferrer"
        class="social-link"
      >
        <Icon :name="social.icon" class="social-icon" aria-hidden="true" />
        <span>{{ social.name }}</span>
        <span class="sr-only">{{ t("a11y.newTab") }}</span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--fg);
  text-decoration: underline;
  text-decoration-color: var(--line);
  text-underline-offset: 4px;
}

.social-link:hover {
  text-decoration-color: var(--accent);
}

.social-icon {
  font-size: 1.25rem;
}

@media (prefers-reduced-motion: no-preference) {
  .social-link {
    transition: text-decoration-color 0.2s ease;
  }
}
</style>
```

- [ ] **Step 7: Rewrite `app/pages/index.vue`**

```vue
<script setup lang="ts">
import { projects } from "~/data/projects";

const { t } = useI18n();
</script>

<template>
  <div class="container">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-text">
        <h1 id="hero-title" class="hero-name">
          <span class="hero-line">Filipe</span>
          <span class="hero-line">Crespo</span>
        </h1>
        <p class="hero-role">{{ t("hero.role") }}</p>
        <p class="hero-bio">{{ t("hero.bio") }}</p>
      </div>
      <img
        src="/profile.jpeg"
        :alt="t('hero.photoAlt')"
        width="200"
        height="200"
        class="hero-photo"
      />
    </section>

    <SectionBlock
      id="about"
      number="01"
      :label="t('about.label')"
      :title="t('about.title')"
    >
      <p class="prose">{{ t("about.body") }}</p>
    </SectionBlock>

    <SectionBlock
      id="projects"
      number="02"
      :label="t('projects.label')"
      :title="t('projects.title')"
    >
      <ol class="project-list">
        <ProjectItem
          v-for="(project, index) in projects"
          :key="project.id"
          :project="project"
          :index="index"
        />
      </ol>
    </SectionBlock>

    <SectionBlock
      id="contact"
      number="03"
      :label="t('contact.label')"
      :title="t('contact.title')"
    >
      <p class="prose">{{ t("contact.body") }}</p>
      <AppSocialLinks />
    </SectionBlock>
  </div>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 2rem;
  padding-block: 5rem 4rem;
}

.hero-name {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 12vw, 6.5rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.02em;
}

.hero-line {
  display: block;
}

.hero-role {
  margin: 1.25rem 0 0;
  color: var(--accent);
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-bio {
  max-width: 32rem;
  margin: 1rem 0 0;
  color: var(--muted);
  font-size: 1.125rem;
}

.hero-photo {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 2px;
  filter: grayscale(1);
}

.hero-photo:hover {
  filter: grayscale(0);
}

.prose {
  max-width: 36rem;
  margin: 0 0 1.5rem;
  color: var(--muted);
  font-size: 1.0625rem;
}

.project-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (width <= 640px) {
  .hero {
    grid-template-columns: 1fr;
    padding-block: 3rem;
  }

  .hero-photo {
    grid-row: 1;
    width: 112px;
    height: 112px;
  }
}
</style>
```

- [ ] **Step 8: Run build and tests**

Run: `bun run build && bun test`
Expected: all PASS. If the Brincaki "not inside an <a>" regex is too clever and false-fails, replace it with: find the `Brincaki` index and assert the nearest preceding `<li` tag's slice up to `</li>` does not contain `<a `. Do not drop the assertion.

- [ ] **Step 9: Visual check**

Run: `bun run dev`, open `http://localhost:3000`, `/en`, `/es`. Check light and dark (OS setting), width 375px (no horizontal scroll), keyboard tab order (skip link → name → PT/EN/ES → Meus Prompts → LinkedIn → GitHub → back to top).

- [ ] **Step 10: Validate and commit**

Run: `bun run validate` → PASS.

```bash
git add -A
git commit -m "feat: rebuild home with hero, about, projects and contact

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Animations

**Files:**
- Create: `app/plugins/reveal.ts`
- Modify: `app/components/SectionBlock.vue`, `app/pages/index.vue`, `app/assets/css/main.css`, `tests/static-output.test.ts`

**Interfaces:**
- Consumes: `SectionBlock` root `<section>`; token `--ease-out`.
- Produces: global directive `v-reveal` (client adds `reveal`, then `is-visible`).

- [ ] **Step 1: Write failing tests**

In `tests/static-output.test.ts`, change the fs import to `import { existsSync, readdirSync, readFileSync } from "node:fs";`, then append:

```ts
describe("animations", () => {
  test("no element ships hidden in the static HTML", () => {
    for (const route of ["", "en", "es"]) {
      const html = page(route);
      expect(html).not.toMatch(/class="[^"]*\breveal\b/);
    }
  });

  test("motion is gated behind prefers-reduced-motion", () => {
    const cssDir = join(out, "_nuxt");
    const css = readdirSync(cssDir)
      .filter((f) => f.endsWith(".css"))
      .map((f) => readFileSync(join(cssDir, f), "utf8"))
      .join("\n");
    expect(css).toContain("@keyframes hero-rise");
    expect(css).toMatch(/prefers-reduced-motion:\s*no-preference/);
    expect(css).toContain(".reveal.is-visible");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `bun run build && bun test`
Expected: the "no element ships hidden" test PASSES already (good — it guards regressions); the "motion is gated" test FAILS (`hero-rise` not found).

- [ ] **Step 3: Create `app/plugins/reveal.ts`**

```ts
import type { Directive } from "vue";

const observers = new WeakMap<HTMLElement, IntersectionObserver>();

const reveal: Directive<HTMLElement> = {
  getSSRProps: () => ({}),
  mounted(el) {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion || !("IntersectionObserver" in window)) return;

    // Already on screen at load: leave it visible instead of hiding and re-showing.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add("reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.classList.add("is-visible");
          observer.disconnect();
          observers.delete(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    observers.set(el, observer);
  },
  unmounted(el) {
    observers.get(el)?.disconnect();
    observers.delete(el);
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("reveal", reveal);
});
```

- [ ] **Step 4: Add reveal CSS to `app/assets/css/main.css`** (append)

```css
@media (prefers-reduced-motion: no-preference) {
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition:
      opacity 0.7s var(--ease-out),
      transform 0.7s var(--ease-out);
  }

  .reveal.is-visible {
    opacity: 1;
    transform: none;
  }
}
```

- [ ] **Step 5: Apply `v-reveal` in `SectionBlock.vue`**

Change the root element to:

```vue
  <section
    :id="id"
    v-reveal
    class="section"
    :aria-labelledby="`${id}-title`"
  >
```

- [ ] **Step 6: Add hero entrance + photo transition in `app/pages/index.vue`** (append inside `<style scoped>`)

```css
@media (prefers-reduced-motion: no-preference) {
  .hero-line,
  .hero-role,
  .hero-bio,
  .hero-photo {
    animation: hero-rise 0.8s var(--ease-out) both;
  }

  .hero-line:nth-child(2) {
    animation-delay: 0.08s;
  }

  .hero-role {
    animation-delay: 0.16s;
  }

  .hero-bio {
    animation-delay: 0.24s;
  }

  .hero-photo {
    animation-delay: 0.32s;
    transition: filter 0.5s ease;
  }
}

@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
```

Total hero animation: 0.32s + 0.8s = 1.12s.

- [ ] **Step 7: Run build and tests**

Run: `bun run build && bun test`
Expected: all PASS. (Scoped CSS keeps `@keyframes hero-rise` name but may suffix it with a scope id like `hero-rise-<hash>`; if so, change the assertion to `toMatch(/@keyframes hero-rise/)` — it still matches the prefix.)

- [ ] **Step 8: Manual motion check**

Run `bun run dev`. Reload: hero lines rise in sequence; scroll: sections fade up once. Enable OS "reduce motion" (or DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`): everything static and visible.

- [ ] **Step 9: Validate and commit**

Run: `bun run validate` → PASS.

```bash
git add -A
git commit -m "feat: add hero entrance and scroll reveal animations

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Accessibility audits, fonts check and README

**Files:**
- Modify: `.pa11yci.json`, `lighthouserc.json`, `package.json`, `README.md`

**Interfaces:**
- Consumes: generated `.output/public`.

- [ ] **Step 1: Point audits at the new routes**

`.pa11yci.json` — set `"wait": 2000` and:

```json
  "urls": [
    "http://localhost:3000",
    "http://localhost:3000/en",
    "http://localhost:3000/es"
  ]
```

`lighthouserc.json` — set `ci.collect.url` to the same three URLs.

- [ ] **Step 2: Add a static preview script**

In `package.json` scripts, add `"serve:static": "bunx serve .output/public -l 3000"`.

- [ ] **Step 3: Run pa11y against the static build**

Run (two terminals, or background the server):

```bash
bun run build
bun run serve:static &
bun run a11y:test
```

Expected: `3/3 URLs passed`. Fix any reported issue in the owning component and re-run before continuing. Then stop the server (`kill %1`).

- [ ] **Step 4: Run Lighthouse a11y**

```bash
bun run serve:static &
bun run a11y:audit
kill %1
```

Expected: accessibility ≥ 0.9 on all three URLs, all asserted audits pass.

- [ ] **Step 5: Confirm fonts load**

Open `.output/public/index.html` CSS in `_nuxt/` and check `@nuxt/fonts` emitted `@font-face` for `Instrument Serif` and `Inter`:

Run: `grep -l "Instrument Serif" .output/public/_nuxt/*.css`
Expected: at least one file listed.

- [ ] **Step 6: Rewrite `README.md`**

```markdown
# filipecrespo.dev

Site pessoal de Filipe Soares Crespo — Nuxt 4, gerado como HTML estático, em pt-BR, en e es.

## Desenvolvimento

    bun install
    bun run dev

## Build estático

    bun run build          # nuxt generate → .output/public
    bun run serve:static   # serve o build em http://localhost:3000

## Testes e qualidade

    bun run build && bun test   # testes sobre o HTML gerado e as traduções
    bun run validate            # type-check, eslint, stylelint, prettier
    bun run a11y:test           # pa11y (com serve:static rodando)
    bun run a11y:audit          # Lighthouse (com serve:static rodando)

## Conteúdo

- Textos: `i18n/locales/{pt-BR,en,es}.json` (as três precisam ter as mesmas chaves).
- Projetos: `app/data/projects.ts` + `projects.items.<id>` em cada locale.
```

- [ ] **Step 7: Full verification**

Run: `bun run build && bun test && bun run validate && bun run depcheck`
Expected: all PASS.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: update a11y audits and README for the new site

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

## Deploy note (not a task)

Vercel runs `bun run build` (`nuxt generate`) and detects the static output automatically; no `nitro.preset` is needed. Confirm on the first preview deploy that `/en` and `/es` resolve.
