# Redesign do filipecrespo.dev — Design

Data: 2026-10-10

## Objetivo

Transformar o site atual (Nuxt 4 com SSR, blog em Supabase, currículo longo) em um
site pessoal minimalista de uma página, no estilo editorial de lucasmontano.com,
com animações leves, três idiomas (pt-BR, en, es) e foco em projetos próprios —
inicialmente **Meus Prompts** e **Brincaki**.

### Pedido do usuário
- Remover o blog.
- Visual mais moderno, com animações.
- Conteúdo minimalista inspirado em lucasmontano.com.
- Destacar Meus Prompts e Brincaki (outros projetos serão escolhidos depois).
- Manter Nuxt, sem SSR.
- Adicionar inglês e espanhol.

### Critérios de sucesso
- `bun run generate` produz HTML estático para `/`, `/en` e `/es`, sem servidor.
- Cada rota tem `<html lang>`, `<title>`, meta description e `hreflang` corretos no idioma.
- `bun run validate` passa (type-check, eslint, stylelint, prettier).
- pa11y-ci (WCAG2AA) e Lighthouse a11y (≥ 0.9) passam nas três rotas.
- Com `prefers-reduced-motion: reduce`, nenhum conteúdo depende de animação para aparecer.

## Stack

- **Nuxt 4**, renderização por pré-renderização estática (`nuxt generate`).
  Não é SPA (`ssr: false`): cada idioma precisa de HTML próprio para SEO.
- **@nuxtjs/i18n** com `strategy: "prefix_except_default"`, `defaultLocale: "pt-BR"`,
  locales `pt-BR` (`/`), `en` (`/en`), `es` (`/es`); `baseUrl` = `https://filipecrespo.dev`
  para gerar `hreflang`/canonical. Detecção automática de idioma do navegador desligada
  (`detectBrowserLanguage: false`) para que a URL seja a única fonte do idioma.
- Mantidos: `@nuxt/ui` (Tailwind v4 + tokens de cor), `@nuxt/icon`, `@nuxt/fonts`,
  `@nuxt/image`, `@nuxt/eslint`, ferramentas de lint/a11y/husky/commitlint.
- Animações sem novas dependências: CSS + `IntersectionObserver`.

## Remoções

- `server/` (API do blog e util Supabase).
- `app/pages/blog/`, `app/pages/projetos.vue`.
- `content.config.ts`, `insert-posts.sql`, `scripts/migrate-posts-to-supabase.ts`
  e o script `migrate:posts` do `package.json`.
- `runtimeConfig` de banco no `nuxt.config.ts`; variáveis `DB_*` do `.env.example`.
- Dependências: `@supabase/supabase-js`, `better-sqlite3`, `gray-matter`, `marked`, `tsx`
  (se não houver outro uso), `dotenv` (se não houver outro uso).
- Componentes sem uso após o redesign (`AppSidebar`, `AppCounter`, `AppAlert`).
- Plugin `vite-plugin-inspect` e módulos de dev não usados pela página podem
  permanecer; não fazem parte deste escopo.

## Estrutura da página

Uma única página (`app/pages/index.vue`), servida nos três idiomas.

1. **Header** (fixo no topo, discreto): "Filipe Crespo" à esquerda;
   seletor `PT · EN · ES` à direita (links via `switchLocalePath`, idioma atual
   marcado com `aria-current="true"`).
2. **Hero**: nome em tipografia display grande, tagline "Software Engineer",
   bio de 2–3 linhas, foto `profile.jpeg` em preto e branco (filtro CSS
   `grayscale`, volta à cor no hover; sem transição sob reduced-motion).
3. **01 / Sobre**: título curto + um parágrafo (10+ anos, engenharia de software,
   PHP/Laravel/Vue/TypeScript, palestras PHP Summit 2020 e TheDevConference).
4. **02 / Projetos**: lista numerada; cada item tem número, nome, descrição de
   uma linha, status e link externo (`target="_blank" rel="noopener"`,
   com texto acessível indicando que abre em nova aba).
   - 01 / **Meus Prompts** — plataforma para criar, publicar e compartilhar prompts
     de IA, com métricas e comunidade. Link: `https://meusprompts.vercel.app`
     (hoje retorna 404 — usuário deve confirmar a URL).
   - 02 / **Brincaki** — texto provisório; sem link até o usuário fornecer.
     Item sem `url` renderiza sem link e sem seta.
5. **03 / Contato**: frase curta convidando a conversar + links LinkedIn e GitHub
   (componente `AppSocialLinks` existente). Sem e-mail publicado até o usuário decidir.
6. **Footer**: "© 2026 Filipe Soares Crespo" + "Voltar ao topo ↑" (âncora `#top`).

## Dados e i18n

- Textos em `i18n/locales/pt-BR.json`, `en.json`, `es.json`, com chaves:
  `meta.title`, `meta.description`, `hero.*`, `about.*`, `projects.title`,
  `projects.items.<id>.description`, `projects.items.<id>.status`,
  `contact.*`, `footer.*`, `a11y.newTab`, `a11y.language`.
- Lista de projetos estruturada em `app/data/projects.ts`
  (`id`, `name`, `url?`) — campos não traduzíveis; textos vêm do i18n por `id`.
  Adicionar um projeto = um item em `projects.ts` + uma chave em cada locale.
- SEO por idioma via `useSeoMeta` + `useLocaleHead` no `app.vue`
  (`lang`, `hreflang`, canonical, `og:locale`).

## Componentes

- `AppHeader.vue` — nome + `LangSwitcher`.
- `LangSwitcher.vue` — links PT/EN/ES.
- `SectionBlock.vue` — wrapper com número (`01`), título e slot; aplica `v-reveal`.
- `ProjectItem.vue` — linha de projeto (número, nome, descrição, status, seta).
- `AppSocialLinks.vue` — mantido, ajustado ao novo visual.
- `AppFooter.vue` — copyright + voltar ao topo.
- Diretiva `v-reveal` (`app/directives` ou plugin) — adiciona classe `is-visible`
  quando o elemento entra na viewport (IntersectionObserver, `once`).
  Sem JS ou sob reduced-motion, o conteúdo é visível por padrão (estado inicial
  oculto só é aplicado via classe adicionada pelo JS no cliente).

## Visual

- Editorial, monocromático, uma cor de destaque; muito espaço em branco;
  coluna de leitura ~ 720px.
- Tipografia: serifada display para nome e títulos (ex.: Instrument Serif),
  sans para corpo (ex.: Inter), via `@nuxt/fonts`.
- Tema claro/escuro por `prefers-color-scheme`, tokens em `:root` no `main.css`.
- Contraste mínimo WCAG AA em ambos os temas.

## Animações

- Hero: entrada escalonada (nome, tagline, bio, foto) com fade + translateY, ~600ms.
- Seções: fade + translateY ao entrar na viewport (`v-reveal`).
- Projetos: hover/focus com sublinhado animado e seta deslizando.
- Foto: grayscale → cor no hover.
- `@media (prefers-reduced-motion: reduce)`: sem transições/animações.

## Verificação

- `bun run generate` e conferir `.output/public/index.html`, `en/index.html`,
  `es/index.html` com `lang`, título e textos do idioma.
- Atualizar `.pa11yci.json` e `lighthouserc.json` para `/`, `/en`, `/es`
  (remover `/blog` e `/projetos`); rodar contra `bunx serve .output/public`.
- `bun run validate`.
- Checagem visual manual no navegador (claro/escuro, mobile 375px, reduced-motion).

## Fora de escopo

- Escolha de outros projetos além dos dois iniciais.
- Formulário de contato, analytics, CMS.
- Redirecionamentos de `/blog/*` e `/projetos` (podem ser adicionados depois na Vercel).

## Pendências do usuário

- URL correta do Meus Prompts.
- Descrição, status e link do Brincaki.
- Se deseja publicar um e-mail de contato.
- Revisar traduções en/es.
