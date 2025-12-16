---
title: 'Organização de Código com Git: Estratégias Vencedoras'
description: 'Descubra estratégias práticas para organizar seu código usando Git, desde estrutura de branches até workflows que escalam.'
publishedAt: '2024-03-30'
tags: ['git', 'workflow', 'branches', 'organização']
---

# Organização de Código com Git: Estratégias Vencedoras

Git não é apenas uma ferramenta de versionamento - é um sistema poderoso de organização de código. Dominar estratégias de organização com Git pode ser a diferença entre um projeto caótico e um projeto que escala com elegância.

## A Importância da Organização

### Problemas Comuns

- Commits misturando múltiplas funcionalidades
- Branches desorganizadas sem padrão
- Histórico difícil de navegar
- Dificuldade em fazer rollback de mudanças específicas
- Code review complexo e demorado

### Benefícios da Boa Organização

- **Código limpo**: Cada mudança é isolada e bem documentada
- **Colaboração eficiente**: Times trabalham em paralelo sem conflitos
- **Releases confiáveis**: Sabemos exatamente o que está em cada versão
- **Manutenção simplificada**: Fácil encontrar quando e por que algo mudou

## Estratégias de Branches

### Git Flow: Para Projetos com Releases Programadas

Estrutura de branches bem definida:

```
main (produção)
  └── develop (desenvolvimento)
      ├── feature/login
      ├── feature/payment
      └── feature/dashboard

  └── release/v1.2.0
  └── hotfix/critical-bug
```

**Quando usar**: Projetos com ciclos de release definidos (mensal, trimestral)

**Branches principais:**

```bash
# Main - produção
git checkout main

# Develop - integração
git checkout develop

# Feature - nova funcionalidade
git checkout -b feature/user-profile develop

# Release - preparação para produção
git checkout -b release/v1.2.0 develop

# Hotfix - correção urgente em produção
git checkout -b hotfix/payment-bug main
```

### GitHub Flow: Para Deploy Contínuo

Fluxo simplificado para times que fazem deploy frequente:

```
main (sempre deployável)
  ├── feature/add-search
  ├── feature/improve-performance
  └── fix/button-alignment
```

**Workflow:**

```bash
# 1. Cria branch da main
git checkout -b feature/notifications main

# 2. Desenvolve e commita
git commit -m "feat: adiciona sistema de notificações"

# 3. Abre Pull Request
# 4. Code review
# 5. Merge para main
# 6. Deploy automático
```

**Quando usar**: Aplicações web com CD, SaaS, APIs

### Trunk-Based Development: Para Times Experientes

Desenvolvimento direto na main com branches de vida curta:

```
main (trunk)
  ├── feature/quick-fix (< 1 dia)
  └── feature/small-feature (< 2 dias)
```

**Regras:**
- Branches vivem no máximo 1-2 dias
- Integração contínua constante
- Feature flags para funcionalidades incompletas

```bash
# Branch de vida curta
git checkout -b add-tooltip main

# Trabalha rapidamente
git commit -m "feat: adiciona tooltip no botão"

# Merge rápido
git checkout main
git merge add-tooltip
git push
```

## Estrutura de Commits Atômica

### Princípio: Commits Atômicos

Cada commit deve ser:
- **Completo**: Funciona isoladamente
- **Focado**: Uma mudança lógica
- **Testável**: Testes passam após o commit
- **Revertível**: Pode ser desfeito sem efeitos colaterais

### Exemplo Prático

❌ **Ruim - Commit Gigante:**

```bash
git add .
git commit -m "Implementa todo sistema de autenticação"
```

✅ **Bom - Commits Atômicos:**

```bash
# Commit 1: Modelo
git add src/models/User.js
git commit -m "feat(auth): adiciona modelo User"

# Commit 2: Repository
git add src/repositories/UserRepository.js
git commit -m "feat(auth): implementa UserRepository"

# Commit 3: Service
git add src/services/AuthService.js
git commit -m "feat(auth): adiciona AuthService com login/logout"

# Commit 4: Controller
git add src/controllers/AuthController.js
git commit -m "feat(auth): implementa endpoints de autenticação"

# Commit 5: Testes
git add tests/auth/*.test.js
git commit -m "test(auth): adiciona testes de autenticação"

# Commit 6: Documentação
git add docs/api/auth.md
git commit -m "docs(auth): documenta endpoints de autenticação"
```

## Organizando Mudanças com Git Add

### Git Add Interativo (-p)

Controle granular sobre o que entra em cada commit:

```bash
git add -p arquivo.js
```

Opções:
- `y` - adiciona este hunk
- `n` - não adiciona
- `s` - divide em hunks menores
- `e` - edita manualmente o hunk

### Exemplo Prático

Arquivo com duas mudanças não relacionadas:

```javascript
// Mudança 1: Nova validação
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Mudança 2: Formatação de telefone
function formatPhone(phone) {
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}
```

Separar em commits diferentes:

```bash
# Adiciona apenas validação de email
git add -p utils.js
# Seleciona apenas o bloco da função validateEmail

git commit -m "feat(validation): adiciona validação de email"

# Adiciona formatação de telefone
git add utils.js
git commit -m "feat(format): adiciona formatação de telefone"
```

## Workflow de Organização Diária

### Metodologia Commit-Per-Task

```bash
# 1. Puxa últimas mudanças
git checkout develop
git pull origin develop

# 2. Cria branch para task específica
git checkout -b feature/user-settings

# 3. Trabalha em pequenos incrementos
# Task 1: UI
git add src/components/UserSettings.vue
git commit -m "feat(settings): adiciona componente UserSettings"

# Task 2: Lógica
git add src/composables/useUserSettings.js
git commit -m "feat(settings): implementa composable de configurações"

# Task 3: Integração
git add src/views/SettingsPage.vue
git commit -m "feat(settings): integra settings na página"

# 4. Push e PR
git push -u origin feature/user-settings
```

### Organizando com Git Stash

Quando precisa pausar o trabalho:

```bash
# Trabalhando em feature A
git add .
git stash push -m "WIP: feature A - implementação pela metade"

# Muda para correção urgente
git checkout -b hotfix/critical-bug main
# ... faz correção ...
git commit -m "fix: corrige erro crítico no checkout"

# Volta para feature A
git checkout feature/feature-a
git stash pop
```

## Mantendo Histórico Limpo

### Rebase Interativo

Limpa histórico antes do merge:

```bash
# Últimos 5 commits
git rebase -i HEAD~5
```

Opções no editor:

```
pick  abc1234  feat: adiciona validação
squash def5678  fix: typo
squash ghi9012  fix: outro typo
reword jkl3456  feat: implementa API
pick  mno7890  test: adiciona testes
```

Resultado: 5 commits → 3 commits limpos

### Rebase vs Merge

**Merge**: Preserva histórico completo
```bash
git checkout main
git merge feature/user-profile
# Cria merge commit
```

**Rebase**: História linear
```bash
git checkout feature/user-profile
git rebase main
# Reaplica commits sobre main
```

**Quando usar cada um:**

- **Merge**: Features grandes, colaboração em branches
- **Rebase**: Atualizar branch pessoal, limpar histórico

## Estrutura de Projeto Organizada

### .gitignore Bem Estruturado

```bash
# Dependencies
node_modules/
vendor/

# Build
dist/
build/
*.min.js

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Testing
coverage/
.nyc_output/
```

### .gitattributes para Consistência

```bash
# Auto detect text files
* text=auto

# Force LF para scripts
*.sh text eol=lf
*.bash text eol=lf

# Windows batch files
*.bat text eol=crlf

# Mark binary files
*.png binary
*.jpg binary
*.pdf binary
```

## Aliases para Produtividade

Configure aliases úteis:

```bash
[alias]
    # Status limpo
    st = status -sb

    # Log bonito
    lg = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'

    # Undo último commit
    undo = reset --soft HEAD~1

    # Commits de hoje
    today = log --since=midnight --author='Filipe' --oneline

    # Branch atual
    current = rev-parse --abbrev-ref HEAD

    # Limpa branches mergeadas
    cleanup = !git branch --merged | grep -v '\\*\\|main\\|develop' | xargs -n 1 git branch -d
```

## Estratégias por Tipo de Projeto

### Projeto Pessoal / Freelancer

```bash
main
  ├── feature/homepage
  ├── feature/blog
  └── fix/mobile-menu
```

Simples e direto, GitHub Flow funciona bem.

### Produto SaaS

```bash
main (produção)
  └── develop
      ├── feature/analytics
      ├── feature/billing
      └── release/v2.1.0
```

Git Flow com releases controladas.

### Open Source

```bash
main
  ├── feature/contributor-1
  ├── feature/contributor-2
  ├── docs/update-readme
  └── fix/issue-123
```

GitHub Flow + Forks.

## Checklist de Organização

### Antes de Commitar
- [ ] Código está formatado?
- [ ] Testes passam?
- [ ] Commit é atômico?
- [ ] Mensagem segue padrão?
- [ ] Removeu debug code?

### Antes de Push
- [ ] Rebase com branch principal?
- [ ] Histórico está limpo?
- [ ] Todos commits são relevantes?
- [ ] .gitignore está correto?

### Antes de PR
- [ ] Branch está atualizada?
- [ ] Descrição do PR está clara?
- [ ] Commits estão organizados?
- [ ] Testes automatizados passam?

## Ferramentas de Organização

### Husky: Git Hooks

Automatize validações:

```bash
# Pre-commit: formata código
#!/bin/sh
npm run lint-staged

# Commit-msg: valida mensagem
#!/bin/sh
npx --no -- commitlint --edit "$1"
```

### Git Cola / GitKraken

GUIs para staging seletivo e organização visual.

### GitHub CLI

Gerencia PRs pela linha de comando:

```bash
# Cria PR
gh pr create --title "feat: user settings" --body "Implementa configurações"

# Lista PRs
gh pr list

# Merge PR
gh pr merge 123 --squash
```

## Conclusão

Organização de código com Git vai muito além de fazer commits. É sobre criar um sistema que:

- **Facilita colaboração**: Todos sabem onde e como trabalhar
- **Documenta decisões**: Histórico conta a história do projeto
- **Permite evolução**: Código cresce de forma sustentável
- **Reduz bugs**: Mudanças isoladas são mais fáceis de testar

Comece implementando uma estratégia de branches adequada ao seu projeto, adote Conventional Commits, e veja como seu workflow se transforma!

---

**Ferramentas Mencionadas:**
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Husky](https://typicode.github.io/husky/)
- [GitHub CLI](https://cli.github.com/)
