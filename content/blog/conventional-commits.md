---
title: 'Conventional Commits: Padronização que Faz Diferença'
description: 'Entenda o padrão Conventional Commits e como ele pode melhorar drasticamente a qualidade do seu histórico Git e automatizar processos.'
publishedAt: '2024-03-25'
tags: ['git', 'conventional-commits', 'automação', 'changelog']
---

# Conventional Commits: Padronização que Faz Diferença

Se você trabalha em equipe ou mantém projetos open source, já deve ter se deparado com históricos de commits desorganizados. **Conventional Commits** é uma especificação que resolve esse problema trazendo padronização, legibilidade e até automação para seu workflow Git.

## O que são Conventional Commits?

Conventional Commits é uma convenção leve sobre mensagens de commit que segue uma estrutura bem definida:

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```

### Exemplo Básico

```
feat(auth): adiciona login com Google
```

## Tipos de Commits

### Tipos Principais

**feat**: Nova funcionalidade
```bash
feat: adiciona filtro de busca avançada
feat(api): implementa endpoint de upload de imagens
```

**fix**: Correção de bug
```bash
fix: corrige cálculo de frete para CEPs especiais
fix(checkout): resolve erro ao aplicar cupom de desconto
```

**docs**: Apenas documentação
```bash
docs: atualiza README com instruções de instalação
docs(api): adiciona exemplos de uso da API
```

**style**: Formatação de código
```bash
style: formata código seguindo ESLint
style(components): organiza imports alfabeticamente
```

**refactor**: Refatoração sem mudar comportamento
```bash
refactor: extrai lógica de validação para service
refactor(database): otimiza queries do repository
```

**perf**: Melhorias de performance
```bash
perf: implementa cache Redis para consultas frequentes
perf(images): adiciona lazy loading nas imagens
```

**test**: Adição ou correção de testes
```bash
test: adiciona testes unitários para UserService
test(e2e): cobre fluxo completo de checkout
```

**chore**: Tarefas de manutenção
```bash
chore: atualiza dependências
chore(deps): faz upgrade do Vue para v3.4
```

**build**: Mudanças no build
```bash
build: configura Vite para produção
build(docker): otimiza Dockerfile
```

**ci**: Mudanças em CI/CD
```bash
ci: adiciona workflow de deploy automático
ci(github): configura PR checks
```

## Escopo: Contextualizando o Commit

O escopo é opcional mas muito útil:

```bash
feat(auth): adiciona login com GitHub
fix(payment): corrige validação de cartão
docs(readme): atualiza seção de contribuição
```

### Exemplos de Escopos

- **Módulos**: `(auth)`, `(payment)`, `(dashboard)`
- **Componentes**: `(button)`, `(modal)`, `(navbar)`
- **Áreas**: `(api)`, `(frontend)`, `(database)`

## Breaking Changes: Mudanças Incompatíveis

Use `!` ou `BREAKING CHANGE:` para indicar mudanças que quebram compatibilidade:

```bash
feat!: muda estrutura de retorno da API

BREAKING CHANGE: a API agora retorna objetos aninhados
ao invés de um array plano. Clientes precisam atualizar
a forma como processam a resposta.
```

Ou no rodapé:

```bash
feat(api): adiciona paginação nos endpoints

BREAKING CHANGE: todos os endpoints de listagem agora
retornam dados paginados com os campos page, perPage e total.
```

## Estrutura Completa

### Template Completo

```
<tipo>(<escopo>): <descrição curta em minúsculas>

<corpo explicativo opcional>
- Pode ter múltiplas linhas
- Explica o PORQUÊ da mudança
- Descreve efeitos colaterais

<rodapé opcional>
Refs: #123
BREAKING CHANGE: descrição da quebra de compatibilidade
```

### Exemplo Real

```bash
feat(checkout): adiciona suporte para cartão virtual

Implementa integração com API de cartão virtual Nubank.
Usuários agora podem pagar usando cartões temporários
gerados pelo app do banco.

- Adiciona validação específica para cartões virtuais
- Implementa tratamento de erro para cartões expirados
- Atualiza UI com ícone de cartão virtual

Refs: #456
Closes: #789
```

## Benefícios Práticos

### 1. Geração Automática de CHANGELOG

Com commits padronizados, ferramentas podem gerar changelogs automaticamente:

```bash
# Usando standard-version
npx standard-version
```

Resultado:

```markdown
## [1.2.0] - 2024-03-25

### Features
- **auth**: adiciona login com Google
- **checkout**: adiciona suporte para cartão virtual

### Bug Fixes
- **payment**: corrige validação de cartão
- corrige cálculo de frete para CEPs especiais
```

### 2. Versionamento Semântico Automático

As ferramentas calculam a próxima versão baseadas nos commits:

- `feat` → aumenta MINOR (1.0.0 → 1.1.0)
- `fix` → aumenta PATCH (1.0.0 → 1.0.1)
- `BREAKING CHANGE` → aumenta MAJOR (1.0.0 → 2.0.0)

### 3. Melhor Navegação no Histórico

```bash
# Ver apenas novas features
git log --oneline --grep="^feat"

# Ver apenas correções
git log --oneline --grep="^fix"

# Ver mudanças em módulo específico
git log --oneline --grep="(auth)"
```

## Ferramentas e Automação

### Commitizen: Assistente Interativo

Instale o Commitizen para ter um wizard de commits:

```bash
npm install -g commitizen cz-conventional-changelog

# Configurar no projeto
commitizen init cz-conventional-changelog --save-dev --save-exact
```

Uso:

```bash
git add .
git cz  # ao invés de git commit
```

### Commitlint: Validação Automática

Garanta que todos os commits seguem o padrão:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

`.commitlintrc.json`:

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

Com Husky para validar no pre-commit:

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

### Standard Version: Release Automática

```bash
npm install --save-dev standard-version
```

Em `package.json`:

```json
{
  "scripts": {
    "release": "standard-version"
  }
}
```

Executar:

```bash
npm run release
```

Isso:
1. Analisa commits desde última release
2. Calcula próxima versão
3. Gera CHANGELOG
4. Cria tag Git
5. Faz commit das mudanças

## Workflow Completo

### 1. Durante Desenvolvimento

```bash
# Trabalha na feature
git add src/features/payment.js

# Commit com Conventional Commits
git commit -m "feat(payment): adiciona integração Stripe"
```

### 2. Antes do Merge

```bash
# Revisa commits
git log --oneline

# Se necessário, ajusta mensagens
git rebase -i HEAD~3
```

### 3. Na Release

```bash
# Gera changelog e versiona
npm run release

# Push com tags
git push --follow-tags origin main
```

## Convenções Customizadas

Você pode adaptar para seu projeto:

```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'wip',      // Adiciona WIP
        'hotfix'    // Adiciona hotfix
      ]
    ],
    'scope-enum': [
      2,
      'always',
      ['auth', 'payment', 'dashboard', 'api', 'database']
    ]
  }
}
```

## Exemplos do Mundo Real

### GitHub Actions

```bash
ci(actions): adiciona workflow de testes automatizados

Configura GitHub Actions para rodar:
- Testes unitários
- Testes E2E
- Análise de código com SonarCloud

O workflow roda em PRs e pushes para main.

Refs: #123
```

### Performance

```bash
perf(images): implementa lazy loading com Intersection Observer

Substitui loading eager por lazy loading nas imagens
da timeline. Reduz tempo de carregamento inicial em 40%.

Closes: #789
```

### Refatoração

```bash
refactor(validation): migra de Joi para Zod

Joi está deprecated, migrando toda validação para Zod.
Mantém mesma interface pública, apenas muda implementação.

BREAKING CHANGE: validadores customizados precisam ser
reescritos usando API do Zod.
```

## Checklist de Commit

- [ ] Tipo está correto (feat, fix, etc)?
- [ ] Escopo identifica a área afetada?
- [ ] Descrição começa com letra minúscula?
- [ ] Descrição é clara e concisa?
- [ ] BREAKING CHANGE está marcado se necessário?
- [ ] Corpo explica o PORQUÊ se relevante?
- [ ] Referências a issues estão no rodapé?

## Conclusão

Conventional Commits transforma commits de simples checkpoints em documentação viva do projeto. Combinado com ferramentas de automação, economiza horas de trabalho manual e melhora drasticamente a qualidade do histórico Git.

Comece adotando aos poucos - mesmo que seu time não use, seus projetos pessoais se beneficiarão enormemente!

---

**Recursos:**
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Commitlint](https://commitlint.js.org/)
- [Standard Version](https://github.com/conventional-changelog/standard-version)
