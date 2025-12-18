---
title: "Commits Organizados: A Arte de Versionar Código"
description: "Aprenda como criar commits separados e bem organizados que facilitam o trabalho em equipe e a manutenção do código."
publishedAt: "2024-03-20"
tags: ["git", "boas-práticas", "versionamento", "desenvolvimento"]
---

# Commits Organizados: A Arte de Versionar Código

Um dos maiores diferenciais entre desenvolvedores iniciantes e experientes está na qualidade dos commits. Commits bem organizados não são apenas uma questão de estética - eles facilitam code review, simplificam rollbacks e tornam o histórico do projeto uma ferramenta poderosa de documentação.

## Por que Commits Organizados Importam?

### 1. Facilitam Code Review

Quando você separa mudanças em commits lógicos, os revisores conseguem entender cada alteração no contexto correto. Um commit que mistura refatoração com nova funcionalidade é confuso e difícil de revisar.

### 2. Simplificam Rollbacks

Se um bug é introduzido, commits organizados permitem fazer rollback apenas da mudança problemática, sem perder outras melhorias.

### 3. Documentam Decisões

O histórico de commits bem escritos conta a história do projeto, explicando não apenas o que mudou, mas por quê.

## Princípios de Commits Organizados

### Regra de Ouro: Um Commit = Uma Mudança Lógica

Cada commit deve representar uma única mudança lógica e completa. Exemplos:

**Bom:**

- ✅ "Adiciona validação de email no formulário de cadastro"
- ✅ "Corrige bug de timezone na exibição de datas"
- ✅ "Refatora função de cálculo de desconto para usar Strategy Pattern"

**Ruim:**

- ❌ "Várias mudanças"
- ❌ "WIP"
- ❌ "Adiciona validação, corrige bug e refatora código"

## Técnicas para Commits Separados

### 1. Git Add Interativo

Use `git add -p` para adicionar mudanças específicas ao staging:

```bash
git add -p arquivo.js
```

Isso permite revisar cada alteração e decidir o que incluir em cada commit.

### 2. Staging Seletivo

Adicione apenas os arquivos relacionados a uma mudança específica:

```bash
# Commit 1: Nova funcionalidade
git add src/features/login.js
git add src/components/LoginForm.vue
git commit -m "feat: adiciona página de login"

# Commit 2: Correção de bug
git add src/utils/format.js
git commit -m "fix: corrige formatação de data em português"
```

### 3. Git Stash para Organizar

Se você tem mudanças misturadas, use stash para organizá-las:

```bash
# Salva todas as mudanças
git stash

# Aplica mudanças de volta e seleciona o que commitar
git stash pop
git add -p
```

## Anatomia de uma Boa Mensagem de Commit

### Estrutura Básica

```
<tipo>: <descrição curta>

<corpo opcional explicando o porquê>

<rodapé opcional com referências>
```

### Exemplo Completo

```
feat: adiciona autenticação com JWT

Implementa sistema de autenticação usando JSON Web Tokens
para substituir o sistema anterior baseado em sessões.
Isso permite autenticação stateless e melhor escalabilidade.

Closes #123
```

## Workflow Prático

### 1. Desenvolva em Pequenos Passos

```bash
# Passo 1: Adiciona model
git add src/models/User.js
git commit -m "feat: adiciona model User"

# Passo 2: Adiciona repository
git add src/repositories/UserRepository.js
git commit -m "feat: adiciona UserRepository"

# Passo 3: Adiciona service
git add src/services/UserService.js
git commit -m "feat: adiciona UserService"
```

### 2. Refatore em Commits Separados

```bash
# Primeiro: refatoração
git add src/utils/validators.js
git commit -m "refactor: extrai validadores para arquivo separado"

# Depois: usa a refatoração
git add src/components/Form.vue
git commit -m "feat: usa validadores no formulário"
```

### 3. Testes em Commits Separados (Opcional)

Alguns times preferem commits separados para testes:

```bash
# Implementação
git commit -m "feat: adiciona função de cálculo de frete"

# Testes
git commit -m "test: adiciona testes para cálculo de frete"
```

## Comandos Úteis

### Desfazer Último Commit (Mantendo Mudanças)

```bash
git reset --soft HEAD~1
```

### Editar Último Commit

```bash
# Adiciona mudanças esquecidas
git add arquivo-esquecido.js
git commit --amend --no-edit
```

### Ver Histórico Limpo

```bash
git log --oneline --graph --decorate
```

### Squash de Commits Antes de Merge

```bash
# Combina últimos 3 commits
git rebase -i HEAD~3
```

## Checklist do Commit Perfeito

Antes de fazer commit, pergunte:

- [ ] Este commit faz apenas uma coisa?
- [ ] A mensagem explica claramente o que mudou?
- [ ] O código compila/funciona após este commit?
- [ ] Os testes passam?
- [ ] Removi logs de debug e comentários temporários?
- [ ] A mensagem segue o padrão do projeto?

## Erros Comuns a Evitar

### 1. Commits Muito Grandes

❌ "Adiciona todo sistema de pagamento"
✅ Quebrar em: setup, integração API, validação, testes

### 2. Commits Muito Pequenos

❌ Um commit por linha alterada
✅ Agrupar mudanças relacionadas

### 3. Mensagens Vagas

❌ "Atualiza código"
✅ "Otimiza consulta SQL de listagem de produtos"

### 4. Commits com Erros

❌ Commitar código que não compila
✅ Sempre testar antes de commitar

## Bônus: Aliases Úteis

Adicione ao seu `.gitconfig`:

```bash
[alias]
    # Commit com mensagem curta
    cm = commit -m

    # Add interativo
    ap = add -p

    # Status curto
    st = status -sb

    # Log bonito
    lg = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

## Conclusão

Commits bem organizados são uma habilidade fundamental que separa desenvolvedores profissionais de amadores. Invista tempo nisso - seu eu futuro e seus colegas de equipe agradecerão!

No próximo artigo, vamos explorar **Conventional Commits**, um padrão que leva a organização de commits para o próximo nível.

---

**Referências:**

- [Git Documentation](https://git-scm.com/doc)
- [Conventional Commits](https://www.conventionalcommits.org/)
