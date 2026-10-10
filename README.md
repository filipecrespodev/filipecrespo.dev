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

Se o puppeteer não encontrar o Chrome, use o do sistema:
`PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome bun run a11y:test`.

## Conteúdo

- Textos: `i18n/locales/{pt-BR,en,es}.json` (as três precisam ter as mesmas chaves).
- Projetos: `app/data/projects.ts` + `projects.items.<id>` em cada locale.
